#!/usr/bin/env python3
"""
Second-pass rebuild of all 48 Lusmind E-Liquid bottle assets.

Inputs
------
1. The untouched 2752x1536 Middle East design sheet (24 bottles, 2 rows x 12).
2. The PRE-EDIT US bottle assets, recovered from git commit
   d5481698673fc6499a40eb9690e99ae1494f5679:
       mkdir -p /tmp/us_orig
       for f in $(git ls-tree --name-only d5481698 public/assets/eliquid/us/); do
         git show d5481698:$f > /tmp/us_orig/$(basename $f); done

Outputs
-------
  public/assets/eliquid/me/<slug>.webp   24 cutouts, second-pass edge pipeline
  public/assets/eliquid/us/<slug>.webp   24 bottles built on ONE standardized
                                         physical bottle template
  public/assets/eliquid/hero.webp
  public/assets/eliquid/range.webp

Resampling honesty
------------------
The ME sheet cells are ~165x459 px. Normalising to the shipped 459x1100 canvas
(TARGET_H = 980) IS an upscale of roughly 2.1x. It is done once, with LANCZOS,
directly from the sheet's native pixels (never from an already-resampled
intermediate). No claim of "no upscaling" is made.

Method - ME (part A)
--------------------
per-cell background estimate -> CIE-Lab soft matte (trimap ramp) ->
background-connected component keep -> unmatting decontamination ->
normalisation to 459x1100 -> FINAL SILHOUETTE POLISH:
  * inside distance transform + nearest-stable-interior-colour field
  * outer 6 px band: edge RGB pushed toward the nearest stable interior colour
    and darkened up to 30% at the outermost pixel, tapering to 0 at 6 px
  * ~2 px inward alpha contraction (5x5 grey erosion) + ~0.45 px feather
Label interiors (distance >= 6 px) are never touched.

Method - US (part B) - STANDARDIZED PHYSICAL BOTTLE TEMPLATE
------------------------------------------------------------
No per-target cap registration. Instead:
  1. ONE master bottle (cleaned ME bottle, polished) supplies the complete
     physical geometry: smoked flat cap, neck, collar, shoulder, black glass
     silhouette and the alpha channel. It is byte-identical for all 24.
  2. From each pre-edit US original only the LOWER BODY / LABEL ARTWORK is
     taken. Vertical registration uses two landmarks - the label top row and
     the bottle bottom row - so every label lands on the same canonical row.
     Horizontal registration uses the body's left/right edges.
  3. The transition happens WELL BELOW the collar, in the uniform black-glass
     header region above the label, across a 40 px vertical blend.
  4. The final alpha is the master's alpha, unmodified, so the top silhouette
     and cap height are pixel-identical across all 24 (including Tobacco Nut).
OVERRIDES below allow a manual label-top row per slug when automatic detection
is not trustworthy.

Regenerate with:
    python3 scripts/rebuild-eliquid-assets.py \
        --sheet /path/lusmind-me-eliquid-new-design-sheet.png \
        --us-orig /tmp/us_orig
"""

import argparse
import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_ME = os.path.join(ROOT, "public/assets/eliquid/me")
OUT_US = os.path.join(ROOT, "public/assets/eliquid/us")
OUT_ROOT = os.path.join(ROOT, "public/assets/eliquid")

# Sheet order, row-major left to right. Approved flavour mapping - do not reorder.
ROW1 = ["melon-yogurt-ice", "strawberry-cake", "watermelon-strawberry", "watermelon-ice",
        "double-apple-shisha", "pineapple-coconut-ice", "cool-yuzu-cedar", "niagara-grape",
        "green-coconut", "green-apple", "cool-peppermint", "monster-drink"]
ROW2 = ["coffee-tobacco", "tobacco-nut", "orange-soda", "caramel-custard",
        "cinnamon-apple-pie", "banana-nut", "peach-ice", "kiwi-passionfruit",
        "mango-ice", "arctic-sweet-ice", "blueberry-raspberry", "creamy-rainbow-candy"]
ALL_SLUGS = ROW1 + ROW2

CANVAS = (459, 1100)
TARGET_H = 980
BASELINE = 1050

MASTER_SLUG = "cool-peppermint"   # donor of the standardized physical bottle

# Manual per-slug label-top override (source row in the pre-edit US original).
# Empty = fully automatic; add entries only when detection is not perfect.
US_LABEL_TOP_OVERRIDES: dict[str, int] = {}


# ---------------------------------------------------------------- utilities
def srgb_to_lab(rgb):
    c = rgb / 255.0
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    m = np.array([[0.4124, 0.3576, 0.1805],
                  [0.2126, 0.7152, 0.0722],
                  [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T
    white = np.array([0.95047, 1.0, 1.08883])
    t = xyz / white
    d = 6 / 29
    f = np.where(t > d ** 3, np.cbrt(t), t / (3 * d ** 2) + 4 / 29)
    return np.stack([116 * f[..., 1] - 16,
                     500 * (f[..., 0] - f[..., 1]),
                     200 * (f[..., 1] - f[..., 2])], -1)


def find_runs(profile, thresh):
    runs, start = [], None
    for i, v in enumerate(profile):
        if v > thresh and start is None:
            start = i
        elif v <= thresh and start is not None:
            runs.append((start, i))
            start = None
    if start is not None:
        runs.append((start, len(profile)))
    return runs


def save_webp(rgba, path, quality=95):
    Image.fromarray(rgba.astype(np.uint8), "RGBA").save(
        path, "WEBP", quality=quality, alpha_quality=100, method=6)


# ------------------------------------------------------------------ part A
def cut_bottle(sub):
    border = np.concatenate([sub[:4].reshape(-1, 3), sub[-4:].reshape(-1, 3),
                             sub[:, :4].reshape(-1, 3), sub[:, -4:].reshape(-1, 3)])
    bg = np.median(border, 0)

    lab = srgb_to_lab(sub)
    lab_bg = srgb_to_lab(bg.reshape(1, 1, 3))[0, 0]
    dist = np.linalg.norm(lab - lab_bg, axis=-1)

    T0, T1 = 2.5, 12.0
    alpha = np.clip((dist - T0) / (T1 - T0), 0, 1)

    solid = alpha > 0.55
    lbl, n = ndimage.label(solid)
    if n:
        sizes = ndimage.sum(solid, lbl, range(1, n + 1))
        core = lbl == (np.argmax(sizes) + 1)
        grown = ndimage.binary_dilation(core, np.ones((3, 3)), iterations=4)
        support = ndimage.binary_propagation(core, mask=(alpha > 0.03))
        alpha = np.where(support | grown, alpha, 0.0)

    a = alpha[..., None]
    rgb = np.clip(np.where(a > 0.001, bg + (sub - bg) / np.maximum(a, 0.10), sub), 0, 255)
    alpha = np.clip((alpha - 0.14) / 0.86, 0, 1)
    return np.dstack([rgb, alpha * 255.0])


def normalize(rgba, canvas=CANVAS, target_h=TARGET_H, baseline=BASELINE):
    a = rgba[..., 3]
    ys, xs = np.where(a > 8)
    crop = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = crop.shape[:2]
    nw = max(1, int(round(w * target_h / h)))
    img = Image.fromarray(crop.astype(np.uint8), "RGBA").resize((nw, target_h), Image.LANCZOS)
    out = Image.new("RGBA", canvas, (0, 0, 0, 0))
    out.paste(img, ((canvas[0] - nw) // 2, baseline - target_h), img)
    return np.asarray(out).astype(float)


def edge_polish(rgba, band=6.0, darken=0.30, erode=5, feather=0.45):
    """Final silhouette polish (see module docstring, part A)."""
    rgb = rgba[..., :3].astype(float)
    a = rgba[..., 3].astype(float) / 255.0

    solid = a > 0.5
    if not solid.any():
        return rgba

    # inside distance to transparency, and nearest stable-interior colour field
    dist_in = ndimage.distance_transform_edt(solid)
    stable = dist_in >= band
    if stable.any():
        # distance transform on the complement gives, for every pixel, the
        # index of the nearest stable-interior pixel
        _, idx = ndimage.distance_transform_edt(~stable, return_indices=True)
        near = rgb[idx[0], idx[1]]
    else:
        near = rgb

    w = np.clip((band - dist_in) / band, 0, 1) * solid          # 1 at the rim
    w = w[..., None]
    out_rgb = rgb * (1 - w) + near * w                          # despill
    out_rgb = out_rgb * (1 - darken * w)                        # rim darkening
    # semi-transparent pixels outside the solid core follow the same treatment
    outer = (~solid) & (a > 0)
    if outer.any() and stable.any():
        out_rgb[outer] = near[outer] * (1 - darken)

    # controlled inward alpha contraction + minimal feather
    a2 = ndimage.grey_erosion(a, size=(erode, erode))
    a2 = ndimage.gaussian_filter(a2, feather)
    a2 = np.clip(a2, 0, 1)

    return np.dstack([np.clip(out_rgb, 0, 255), a2 * 255.0])


def build_me(sheet_path):
    sheet = np.asarray(Image.open(sheet_path).convert("RGB")).astype(float)
    mask = sheet.mean(2) < 235
    rows = find_runs(mask.sum(1), 5)
    cols = find_runs(mask.sum(0), 5)
    assert len(rows) == 2 and len(cols) == 12, (len(rows), len(cols))

    os.makedirs(OUT_ME, exist_ok=True)
    out = {}
    for names, (ry0, ry1) in zip((ROW1, ROW2), rows):
        for slug, (cx0, cx1) in zip(names, cols):
            sub = sheet[max(0, ry0 - 22):ry1 + 22, max(0, cx0 - 22):cx1 + 22]
            asset = edge_polish(normalize(cut_bottle(sub)))
            out[slug] = asset
            save_webp(asset, os.path.join(OUT_ME, f"{slug}.webp"))
    return out


# ------------------------------------------------------------------ part B
def body_geometry(rgba):
    """left/right body edges (lower body), bottom row, top row."""
    a = rgba[..., 3]
    ys = np.where((a > 40).any(1))[0]
    top, bottom = int(ys.min()), int(ys.max())
    lo = int(top + (bottom - top) * 0.70)
    hi = int(top + (bottom - top) * 0.90)
    lefts, rights = [], []
    for y in range(lo, hi):
        xs = np.where(a[y] > 40)[0]
        if len(xs):
            lefts.append(xs.min())
            rights.append(xs.max())
    return {"top": top, "bottom": bottom,
            "left": int(np.median(lefts)), "right": int(np.median(rights))}


def label_top(rgba, geo):
    """First row of the printed label, below the black-glass shoulder."""
    rgb = rgba[..., :3].astype(float)
    a = rgba[..., 3].astype(float) / 255.0
    x0 = int(geo["left"] + (geo["right"] - geo["left"]) * 0.20)
    x1 = int(geo["left"] + (geo["right"] - geo["left"]) * 0.80)
    top, bottom = geo["top"], geo["bottom"]
    span = bottom - top
    y_from = int(top + span * 0.30)          # never inside the cap/collar
    y_to = int(top + span * 0.85)
    prof = []
    for y in range(y_from, y_to):
        m = a[y, x0:x1] > 0.9
        prof.append(rgb[y, x0:x1][m].max(axis=-1).mean() if m.any() else 0.0)
    prof = np.asarray(prof)
    glass = np.median(prof[:12])             # black-glass reference level
    thr = glass + max(14.0, 0.35 * (prof.max() - glass))
    hit = prof > thr
    # first row where the label level holds for 10 consecutive rows
    for i in range(len(hit) - 10):
        if hit[i:i + 10].all():
            return y_from + i
    return int(top + span * 0.45)


def us_label_top(rgba, geo):
    """Top row of the navy US label band.

    The US label header is strongly blue-shifted (B - R ~ +24) against the
    perfectly neutral black glass above it (B - R == 0), so a blueness step is
    an exact and noise-free landmark on every one of the 24 originals.
    """
    rgb = rgba[..., :3].astype(float)
    a = rgba[..., 3].astype(float) / 255.0
    x0 = int(geo["left"] + (geo["right"] - geo["left"]) * 0.25)
    x1 = int(geo["left"] + (geo["right"] - geo["left"]) * 0.75)
    top, bottom = geo["top"], geo["bottom"]
    span = bottom - top
    y_from, y_to = int(top + span * 0.25), int(top + span * 0.70)
    prof = []
    for y in range(y_from, y_to):
        m = a[y, x0:x1] > 0.9
        prof.append(float((rgb[y, x0:x1, 2] - rgb[y, x0:x1, 0])[m].mean()) if m.any() else 0.0)
    hit = np.asarray(prof) > 6.0
    for i in range(len(hit) - 8):
        if hit[i:i + 8].all():
            return y_from + i
    raise RuntimeError("US label top not found")



def build_us(me_assets, us_orig_dir, blend=40, gap=10):
    master = me_assets[MASTER_SLUG].astype(float)
    mgeo = body_geometry(master)
    m_label = label_top(master, mgeo)
    m_alpha = master[..., 3]

    # canonical rows in the OUTPUT: labels start here for every flavour
    y_label = m_label
    t_end = y_label - gap                      # bottom of the blend band
    t_start = t_end - blend                    # top of the blend band
    assert t_start > mgeo["top"] + 0.20 * (mgeo["bottom"] - mgeo["top"]), \
        "transition must sit well below the collar"

    os.makedirs(OUT_US, exist_ok=True)
    report = []
    for slug in ALL_SLUGS:
        src = np.asarray(Image.open(os.path.join(us_orig_dir, f"{slug}.webp"))
                         .convert("RGBA")).astype(float)
        sgeo = body_geometry(src)
        s_label = US_LABEL_TOP_OVERRIDES.get(slug) or us_label_top(src, sgeo)

        # vertical map: (s_label -> y_label), (src bottom -> master bottom)
        sy = (sgeo["bottom"] - s_label) / max(1.0, (mgeo["bottom"] - y_label))
        def src_y(dy):
            return s_label + (dy - y_label) * sy

        dy0, dy1 = t_start, mgeo["bottom"] + 1
        sy0, sy1 = src_y(dy0), src_y(dy1)
        sx0, sx1 = sgeo["left"], sgeo["right"] + 1
        crop = Image.fromarray(src.astype(np.uint8), "RGBA").resize(
            (mgeo["right"] + 1 - mgeo["left"], dy1 - dy0), Image.LANCZOS,
            box=(sx0, sy0, sx1, sy1))
        warped = np.asarray(crop).astype(float)

        out = master.copy()
        region = out[dy0:dy1, mgeo["left"]:mgeo["right"] + 1, :3]
        ramp = np.clip((np.arange(dy0, dy1) - t_start) / float(blend), 0, 1)[:, None, None]
        out[dy0:dy1, mgeo["left"]:mgeo["right"] + 1, :3] = \
            region * (1 - ramp) + warped[..., :3] * ramp
        out[..., 3] = m_alpha                  # identical silhouette, always

        save_webp(out, os.path.join(OUT_US, f"{slug}.webp"))
        report.append((slug, s_label, round(sy, 4)))
    return report, dict(y_label=y_label, t_start=t_start, t_end=t_end)


# --------------------------------------------------------- hero / range art
def compose(assets, slugs, size, bg_top, bg_bottom, bottle_h, baseline_frac,
            spread, path):
    W, H = size
    grad = np.zeros((H, W, 3), float)
    for y in range(H):
        t = y / (H - 1)
        grad[y] = np.array(bg_top) * (1 - t) + np.array(bg_bottom) * t
    canvas = Image.fromarray(grad.astype(np.uint8), "RGB").convert("RGBA")

    n = len(slugs)
    step = W * spread / n
    x0 = (W - step * (n - 1)) / 2
    base = int(H * baseline_frac)
    import PIL.ImageDraw as D
    for i, slug in enumerate(slugs):
        rgba = assets[slug]
        ys, xs = np.where(rgba[..., 3] > 8)
        crop = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1].astype(np.uint8)
        depth = abs(i - (n - 1) / 2) / max(1, (n - 1) / 2)
        h = int(bottle_h * (1 - 0.12 * depth))
        w = max(1, int(crop.shape[1] * h / crop.shape[0]))
        img = Image.fromarray(crop, "RGBA").resize((w, h), Image.LANCZOS)
        sh = Image.new("RGBA", (w, int(h * 0.10)), (0, 0, 0, 0))
        D.Draw(sh).ellipse([0, 0, w - 1, int(h * 0.10) - 1], fill=(0, 0, 0, 120))
        sh = sh.filter(ImageFilter.GaussianBlur(h * 0.02))
        cx = int(x0 + step * i)
        canvas.alpha_composite(sh, (cx - w // 2, base - int(h * 0.045)))
        canvas.alpha_composite(img, (cx - w // 2, base - h))
    canvas.convert("RGB").save(path, "WEBP", quality=92, method=6)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sheet", required=True)
    ap.add_argument("--us-orig", required=True)
    args = ap.parse_args()

    me = build_me(args.sheet)
    print(f"ME: {len(me)} cutouts -> {OUT_ME}")

    rep, rows = build_us(me, args.us_orig)
    print(f"US: {len(rep)} bottles on the standardized template {rows}")
    for r in rep:
        print("   ", r)

    compose(me, ["melon-yogurt-ice", "strawberry-cake", "peach-ice", "mango-ice",
                 "green-apple", "cool-peppermint", "blueberry-raspberry"],
            (1920, 1080), (12, 14, 13), (5, 7, 6), 760, 0.93, 0.80,
            os.path.join(OUT_ROOT, "hero.webp"))
    compose(me, ROW1[:6] + ROW2[:6], (1600, 1000), (24, 26, 25), (8, 10, 9),
            700, 0.95, 0.92, os.path.join(OUT_ROOT, "range.webp"))
    print("hero.webp / range.webp rebuilt")


if __name__ == "__main__":
    main()
