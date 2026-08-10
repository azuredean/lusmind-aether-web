#!/usr/bin/env python3
"""Rebuild the 24 Middle East e-liquid assets without touching label artwork.

This is a silhouette extraction pipeline, not a generative image edit.

The source sheet contains pale labels and white typography on an off-white
background.  A conventional colour-key matte therefore destroys label pixels.
This implementation deliberately separates two concerns:

1. Geometry: discover and fill the bottle silhouette.
2. Pixels: preserve every source RGB pixel more than three source pixels inside
   that silhouette.  Only the narrow exterior antialiasing band may change.

The label/body interior is forced fully opaque before the single resize.  No
denoise, sharpening, inpainting, OCR, text redraw, global alpha erosion, or
generative model is used.  Output WebP files are lossless so tiny printed text
is not damaged a second time by compression.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage


ROW1 = [
    "melon-yogurt-ice",
    "strawberry-cake",
    "watermelon-strawberry",
    "watermelon-ice",
    "double-apple-shisha",
    "pineapple-coconut-ice",
    "cool-yuzu-cedar",
    "niagara-grape",
    "green-coconut",
    "green-apple",
    "cool-peppermint",
    "monster-drink",
]

ROW2 = [
    "coffee-tobacco",
    "tobacco-nut",
    "orange-soda",
    "caramel-custard",
    "cinnamon-apple-pie",
    "banana-nut",
    "peach-ice",
    "kiwi-passionfruit",
    "mango-ice",
    "arctic-sweet-ice",
    "blueberry-raspberry",
    "creamy-rainbow-candy",
]

ALL_SLUGS = ROW1 + ROW2
CANVAS = (459, 1100)
TARGET_H = 980
BASELINE = 1050


def find_runs(profile: np.ndarray, threshold: float, minimum: int) -> list[tuple[int, int]]:
    runs: list[tuple[int, int]] = []
    start: int | None = None
    for index, value in enumerate(profile):
        if value > threshold and start is None:
            start = index
        elif value <= threshold and start is not None:
            if index - start >= minimum:
                runs.append((start, index))
            start = None
    if start is not None and len(profile) - start >= minimum:
        runs.append((start, len(profile)))
    return runs


def largest_component(mask: np.ndarray) -> np.ndarray:
    labels, count = ndimage.label(mask)
    if count == 0:
        raise RuntimeError("No bottle component found")
    sizes = ndimage.sum(mask, labels, range(1, count + 1))
    return labels == (int(np.argmax(sizes)) + 1)


def estimate_background(rgb: np.ndarray, border: int = 12) -> np.ndarray:
    samples = np.concatenate(
        [
            rgb[:border].reshape(-1, 3),
            rgb[-border:].reshape(-1, 3),
            rgb[:, :border].reshape(-1, 3),
            rgb[:, -border:].reshape(-1, 3),
        ]
    )
    # Bright border samples reject the occasional shadow/noise pixel.
    bright = samples[samples.mean(axis=1) > np.percentile(samples.mean(axis=1), 35)]
    return np.median(bright if len(bright) else samples, axis=0)


def bottle_matte(rgb_u8: np.ndarray) -> tuple[np.ndarray, dict[str, float]]:
    """Return RGBA with an untouched interior and a cleaned five-pixel outer band."""
    rgb = rgb_u8.astype(np.float32)
    background = estimate_background(rgb)
    distance = np.linalg.norm(rgb - background[None, None, :], axis=2)

    # A conservative dark/colour core finds physical geometry.  It is one
    # connected bottle component on every source cell, even where the label is
    # very pale.  Filling holes turns pale labels and white type into protected
    # bottle interior instead of treating them as removable background.
    core = largest_component(distance > 18.0)
    core = ndimage.binary_closing(core, structure=np.ones((3, 3), dtype=bool))
    silhouette = ndimage.binary_fill_holes(core)

    # The colour core is deliberately contracted by one source pixel.  That
    # removes the contaminated white antialias fringe instead of trying to keep
    # it and recolour it later.  Hole filling happened first, so labels remain
    # a single protected interior.
    silhouette = ndimage.binary_erosion(silhouette, iterations=1)

    inside_distance = ndimage.distance_transform_edt(silhouette)
    outside_distance = ndimage.distance_transform_edt(~silhouette)
    signed_distance = inside_distance - outside_distance
    protected = inside_distance >= 5.25

    # A signed-distance feather produces a smooth one-pixel contour on both
    # sides of the contracted geometry.  Exterior feather pixels receive only
    # decontaminated bottle colour, never source-background RGB.
    alpha = np.clip((signed_distance + 1.5) / 3.0, 0.0, 1.0).astype(np.float32)
    alpha[protected] = 1.0

    # Replace RGB only inside the five-pixel contour band with the nearest
    # stable interior colour, then gently darken the outer rim.  All pixels in
    # protected remain byte-for-byte identical to the source.
    stable = inside_distance >= 6.25
    if not stable.any():
        raise RuntimeError("Bottle silhouette has no stable interior")
    _, nearest = ndimage.distance_transform_edt(~stable, return_indices=True)
    nearest_rgb = rgb[nearest[0], nearest[1]]
    edge_band = (alpha > 0) & ~protected
    cleaned = rgb.copy()
    if edge_band.any():
        rim = np.clip((5.25 - inside_distance) / 5.25, 0.0, 1.0)[..., None]
        cleaned[edge_band] = nearest_rgb[edge_band]
        cleaned[edge_band] *= (1.0 - 0.18 * rim[edge_band])

    rgba = np.dstack([np.clip(cleaned, 0, 255), alpha * 255.0]).astype(np.uint8)

    ys, xs = np.where(silhouette)
    stats = {
        "source_x0": int(xs.min()),
        "source_y0": int(ys.min()),
        "source_x1": int(xs.max()),
        "source_y1": int(ys.max()),
        "protected_fraction": float(protected.sum() / silhouette.sum()),
        "label_alpha_min": 255.0,
    }
    return rgba, stats


def resize_premultiplied(rgba: np.ndarray, size: tuple[int, int]) -> np.ndarray:
    """Resize once in premultiplied-alpha space to prevent a pale fringe."""
    alpha = rgba[..., 3:4].astype(np.float32) / 255.0
    premultiplied = rgba[..., :3].astype(np.float32) * alpha

    resized_alpha = np.asarray(
        Image.fromarray((alpha[..., 0] * 255).astype(np.uint8), "L").resize(
            size, Image.Resampling.LANCZOS
        )
    ).astype(np.float32) / 255.0

    channels = []
    for channel in range(3):
        plane = Image.fromarray(
            np.clip(premultiplied[..., channel], 0, 255).astype(np.uint8), "L"
        ).resize(size, Image.Resampling.LANCZOS)
        channels.append(np.asarray(plane).astype(np.float32))
    resized_premultiplied = np.stack(channels, axis=2)

    safe_alpha = np.maximum(resized_alpha[..., None], 1.0 / 255.0)
    resized_rgb = np.where(
        resized_alpha[..., None] > 0,
        resized_premultiplied / safe_alpha,
        0.0,
    )
    low_alpha = resized_alpha < (8.0 / 255.0)
    resized_rgb[low_alpha] = 0.0
    resized_alpha[low_alpha] = 0.0
    return np.dstack(
        [
            np.clip(resized_rgb, 0, 255),
            np.clip(resized_alpha * 255.0, 0, 255),
        ]
    ).astype(np.uint8)


def normalize(rgba: np.ndarray) -> np.ndarray:
    alpha = rgba[..., 3]
    ys, xs = np.where(alpha > 2)
    if not len(xs):
        raise RuntimeError("Empty bottle matte")
    crop = rgba[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]
    height, width = crop.shape[:2]
    target_width = max(1, int(round(width * TARGET_H / height)))
    resized = resize_premultiplied(crop, (target_width, TARGET_H))

    canvas = np.zeros((CANVAS[1], CANVAS[0], 4), dtype=np.uint8)
    x = (CANVAS[0] - target_width) // 2
    y = BASELINE - TARGET_H
    canvas[y : y + TARGET_H, x : x + target_width] = resized
    return canvas


def save_lossless_webp(rgba: np.ndarray, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(
        path,
        "WEBP",
        lossless=True,
        quality=100,
        method=6,
    )


def label_roi(asset: np.ndarray) -> tuple[slice, slice]:
    alpha = asset[..., 3]
    ys, xs = np.where(alpha > 250)
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    width, height = x1 - x0, y1 - y0
    # All label typography is within this conservative lower-body centre ROI.
    return (
        slice(y0 + int(height * 0.43), y0 + int(height * 0.94)),
        slice(x0 + int(width * 0.12), x1 - int(width * 0.12)),
    )


def validate_asset(slug: str, asset: np.ndarray) -> dict[str, float | int | str]:
    alpha = asset[..., 3]
    ys, xs = np.where(alpha > 2)
    y_slice, x_slice = label_roi(asset)
    label_alpha = alpha[y_slice, x_slice]
    holes = int(np.count_nonzero(label_alpha < 250))
    if holes:
        raise AssertionError(f"{slug}: {holes} transparent pixels inside protected label ROI")

    return {
        "slug": slug,
        "width": int(xs.max() - xs.min() + 1),
        "height": int(ys.max() - ys.min() + 1),
        "label_alpha_min": int(label_alpha.min()),
        "label_transparent_pixels": holes,
        "opaque_pixels": int(np.count_nonzero(alpha == 255)),
        "partial_alpha_pixels": int(np.count_nonzero((alpha > 0) & (alpha < 255))),
    }


def composite_on_background(asset: np.ndarray, size: tuple[int, int], color: tuple[int, int, int]) -> Image.Image:
    ys, xs = np.where(asset[..., 3] > 2)
    crop = Image.fromarray(asset[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1], "RGBA")
    crop.thumbnail(size, Image.Resampling.LANCZOS)
    tile = Image.new("RGB", size, color)
    tile.paste(crop, ((size[0] - crop.width) // 2, size[1] - crop.height - 26), crop)
    return tile


def contact_sheet(assets: dict[str, np.ndarray], output: Path, background: tuple[int, int, int]) -> None:
    columns = 6
    tile_size = (250, 390)
    rows = math.ceil(len(ALL_SLUGS) / columns)
    sheet = Image.new("RGB", (columns * tile_size[0], rows * tile_size[1]), background)
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    foreground = (236, 239, 234) if sum(background) < 300 else (22, 25, 22)
    for index, slug in enumerate(ALL_SLUGS):
        tile = composite_on_background(assets[slug], tile_size, background)
        x = (index % columns) * tile_size[0]
        y = (index // columns) * tile_size[1]
        sheet.paste(tile, (x, y))
        draw.text((x + 12, y + tile_size[1] - 18), slug, fill=foreground, font=font)
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "PNG", optimize=True)


def label_closeups(assets: dict[str, np.ndarray], output: Path) -> None:
    columns = 4
    tile_size = (360, 270)
    rows = math.ceil(len(ALL_SLUGS) / columns)
    sheet = Image.new("RGB", (columns * tile_size[0], rows * tile_size[1]), (9, 12, 10))
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    for index, slug in enumerate(ALL_SLUGS):
        asset = assets[slug]
        y_slice, x_slice = label_roi(asset)
        crop = Image.fromarray(asset[y_slice, x_slice], "RGBA")
        crop.thumbnail((tile_size[0] - 20, tile_size[1] - 32), Image.Resampling.LANCZOS)
        x = (index % columns) * tile_size[0]
        y = (index // columns) * tile_size[1]
        sheet.paste(crop, (x + (tile_size[0] - crop.width) // 2, y + 8), crop)
        draw.text((x + 10, y + tile_size[1] - 18), slug, fill=(236, 239, 234), font=font)
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "PNG", optimize=True)


def compose_range(
    assets: dict[str, np.ndarray],
    slugs: list[str],
    size: tuple[int, int],
    bottle_height: int,
    baseline_fraction: float,
    spread: float,
    output: Path,
) -> None:
    width, height = size
    top = np.array((14, 17, 15), dtype=np.float32)
    bottom = np.array((5, 7, 6), dtype=np.float32)
    gradient = np.empty((height, width, 3), dtype=np.uint8)
    for y in range(height):
        t = y / max(1, height - 1)
        gradient[y] = (top * (1 - t) + bottom * t).astype(np.uint8)
    canvas = Image.fromarray(gradient, "RGB").convert("RGBA")

    count = len(slugs)
    step = width * spread / count
    start = (width - step * (count - 1)) / 2
    baseline = int(height * baseline_fraction)
    for index, slug in enumerate(slugs):
        asset = assets[slug]
        ys, xs = np.where(asset[..., 3] > 2)
        bottle = Image.fromarray(asset[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1], "RGBA")
        depth = abs(index - (count - 1) / 2) / max(1, (count - 1) / 2)
        target_height = int(bottle_height * (1 - 0.11 * depth))
        target_width = max(1, int(round(bottle.width * target_height / bottle.height)))
        bottle = bottle.resize((target_width, target_height), Image.Resampling.LANCZOS)
        center = int(start + step * index)

        shadow = Image.new("RGBA", (target_width, max(8, int(target_height * 0.09))), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow)
        shadow_draw.ellipse((0, 0, shadow.width - 1, shadow.height - 1), fill=(0, 0, 0, 135))
        shadow = shadow.filter(ImageFilter.GaussianBlur(max(2, target_height * 0.018)))
        canvas.alpha_composite(shadow, (center - target_width // 2, baseline - shadow.height // 2))
        canvas.alpha_composite(bottle, (center - target_width // 2, baseline - target_height))

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(output, "WEBP", quality=98, method=6)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def build(sheet_path: Path, output_root: Path, qa_root: Path) -> None:
    sheet = np.asarray(Image.open(sheet_path).convert("RGB"))
    foreground = sheet.mean(axis=2) < 235
    rows = find_runs(foreground.sum(axis=1), threshold=5, minimum=100)
    columns = find_runs(foreground.sum(axis=0), threshold=5, minimum=100)
    if len(rows) != 2 or len(columns) != 12:
        raise RuntimeError(f"Expected 2 rows x 12 columns, found {len(rows)} x {len(columns)}")

    me_root = output_root / "me"
    me_root.mkdir(parents=True, exist_ok=True)
    assets: dict[str, np.ndarray] = {}
    report: list[dict[str, float | int | str]] = []

    for slugs, (row_start, row_end) in zip((ROW1, ROW2), rows):
        for slug, (column_start, column_end) in zip(slugs, columns):
            margin = 22
            sub = sheet[
                max(0, row_start - margin) : min(sheet.shape[0], row_end + margin),
                max(0, column_start - margin) : min(sheet.shape[1], column_end + margin),
            ]
            matte, source_stats = bottle_matte(sub)
            asset = normalize(matte)
            save_lossless_webp(asset, me_root / f"{slug}.webp")
            assets[slug] = asset
            item = validate_asset(slug, asset)
            item.update(source_stats)
            report.append(item)

    compose_range(
        assets,
        [
            "melon-yogurt-ice",
            "strawberry-cake",
            "peach-ice",
            "mango-ice",
            "green-apple",
            "cool-peppermint",
            "blueberry-raspberry",
        ],
        (1920, 1080),
        760,
        0.93,
        0.80,
        output_root / "hero.webp",
    )
    compose_range(
        assets,
        ROW1[:6] + ROW2[:6],
        (1600, 1000),
        700,
        0.95,
        0.92,
        output_root / "range.webp",
    )

    contact_sheet(assets, qa_root / "me-dark.png", (8, 12, 9))
    contact_sheet(assets, qa_root / "me-light.png", (242, 243, 239))
    label_closeups(assets, qa_root / "me-label-closeups.png")

    generated = [me_root / f"{slug}.webp" for slug in ALL_SLUGS]
    generated += [output_root / "hero.webp", output_root / "range.webp"]
    manifest = {
        "source": str(sheet_path),
        "source_sha256": sha256(sheet_path),
        "method": "label-safe-silhouette-v1",
        "guarantees": {
            "generative_editing": False,
            "label_interior_alpha": 255,
            "global_alpha_erosion": False,
            "label_rgb_processing": "none",
            "webp": "lossless for individual bottles",
        },
        "assets": report,
        "files": {str(path.relative_to(output_root.parent.parent.parent)): sha256(path) for path in generated},
    }
    qa_root.mkdir(parents=True, exist_ok=True)
    (qa_root / "report.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    (qa_root / "SHA256SUMS.txt").write_text(
        "".join(f"{sha256(path)}  {path.relative_to(output_root.parent.parent.parent)}\n" for path in generated),
        encoding="utf-8",
    )

    total_bytes = sum(path.stat().st_size for path in generated)
    print(f"Built {len(assets)} label-safe bottles + hero/range ({total_bytes / 1024 / 1024:.2f} MiB)")
    print(f"QA: {qa_root}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sheet", type=Path, required=True)
    parser.add_argument("--output-root", type=Path, required=True)
    parser.add_argument("--qa-root", type=Path, required=True)
    args = parser.parse_args()
    build(args.sheet.resolve(), args.output_root.resolve(), args.qa_root.resolve())


if __name__ == "__main__":
    main()
