#!/usr/bin/env python3
"""
Rebuild all Lusmind E-Liquid bottle assets deterministically.

Inputs
------
1. sheets/lusmind-me-eliquid-new-design-sheet.png (2752x1536)
   The untouched Middle East design sheet: 24 bottles, 2 rows x 12 columns,
   on a near-white (254,254,254) background.
2. The ORIGINAL (pre-cap-edit) US bottle assets, recovered from git commit
   d5481698673fc6499a40eb9690e99ae1494f5679:
       git show d5481698:public/assets/eliquid/us/<slug>.webp > <dir>/<slug>.webp

Outputs
-------
  public/assets/eliquid/me/<slug>.webp   24 clean transparent cutouts
  public/assets/eliquid/us/<slug>.webp   24 originals with the cap/neck/collar
                                         assembly replaced by the smoked
                                         flat-top cap master, registered to
                                         each bottle's own silhouette
  public/assets/eliquid/hero.webp        rebuilt from the clean ME cutouts
  public/assets/eliquid/range.webp       rebuilt from the clean ME cutouts

Method
------
ME: per-cell background estimation from the crop border -> soft alpha matte
    from Lab colour distance (trimap-style two-threshold ramp) -> keep only
    the background-connected removal (largest foreground component) ->
    colour decontamination by unmatting  C = bg + (obs-bg)/a  ->
    sub-pixel contraction of the outer semi-transparent ring ->
    normalisation to a common canvas, scale and baseline.

US: a single continuous cap/neck/collar MASTER is cut from one freshly
    cleaned ME bottle (cap top through the black collar and a slice of the
    body below it).  For every original US bottle we measure landmarks
    (body outer edges, centreline, collar seam row) from its own alpha and
    luminance profile, solve a per-asset affine (x-scale, y-scale, dx, dy)
    that maps master landmarks onto the target's, warp the master, and
    composite it with an alpha feather that runs *through* the collar into
    the body so no horizontal rectangular boundary can exist.

Regenerate with:
    python3 scripts/rebuild-eliquid-assets.py --sheet <sheet.png> --us-orig <dir>
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

# Sheet order, row-major left to right. Do not reorder: this is the approved
# flavour mapping.
ROW1 = ["melon-yogurt-ice", "strawberry-cake", "watermelon-strawberry", "watermelon-ice",
        "double-apple-shisha", "pineapple-coconut-ice", "cool-yuzu-cedar", "niagara-grape",
        "green-coconut", "green-apple", "cool-peppermint", "monster-drink"]
ROW2 = ["coffee-tobacco", "tobacco-nut", "orange-soda", "caramel-custard",
        "cinnamon-apple-pie", "banana-nut", "peach-ice", "kiwi-passionfruit",
        "mango-ice", "arctic-sweet-ice", "blueberry-raspberry", "creamy-rainbow-candy"]

CANVAS = (459, 1100)          # keep the shipped intrinsic size (US assets match)
TARGET_H = 980                # bottle height inside the canvas
BASELINE = 1050               # y of the bottle bottom inside the canvas


# ---------------------------------------------------------------- utilities
def srgb_to_lab(rgb):
    """rgb float 0-255 -> CIE Lab (D65)."""
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
    L = 116 * f[..., 1] - 16
    a = 500 * (f[..., 0] - f[..., 1])
    b = 200 * (f[..., 1] - f[..., 2])
    return np.stack([L, a, b], -1)


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
    Image.fromarray(rgba, "RGBA").save(path, "WEBP", quality=quality,
                                       alpha_quality=100, method=6)


# ------------------------------------------------------------------ part A
def cut_bottle(sub):
    """sub: HxWx3 float RGB crop with background margin. -> (rgba float array)."""
    border = np.concatenate([sub[:4].reshape(-1, 3), sub[-4:].reshape(-1, 3),
                             sub[:, :4].reshape(-1, 3), sub[:, -4:].reshape(-1, 3)])
    bg = np.median(border, 0)

    lab = srgb_to_lab(sub)
    lab_bg = srgb_to_lab(bg.reshape(1, 1, 3))[0, 0]
    dist = np.linalg.norm(lab - lab_bg, axis=-1)

    # trimap ramp: below T0 = pure background, above T1 = pure foreground.
    T0, T1 = 2.5, 12.0
    alpha = np.clip((dist - T0) / (T1 - T0), 0, 1)

    # keep only the bottle: drop stray specks / soft cast shadow islands
    solid = alpha > 0.55
    lbl, n = ndimage.label(solid)
    if n:
        sizes = ndimage.sum(solid, lbl, range(1, n + 1))
        keep = (np.argmax(sizes) + 1)
        core = lbl == keep
        # grow the core through the semi-transparent ring it belongs to
        grown = ndimage.binary_dilation(core, np.ones((3, 3)), iterations=4)
        support = ndimage.binary_propagation(core, mask=(alpha > 0.03))
        alpha = np.where(support | grown, alpha, 0.0)

    # colour decontamination: unmat the observed pixel against the measured bg
    a = alpha[..., None]
    safe = np.maximum(a, 0.10)
    rgb = bg + (sub - bg) / safe
    rgb = np.where(a > 0.001, rgb, sub)
    rgb = np.clip(rgb, 0, 255)

    # sub-pixel contraction (~0.7px) of the OUTER transition only
    alpha = np.clip((alpha - 0.14) / 0.86, 0, 1)
    return np.dstack([rgb, alpha * 255.0])


def normalize(rgba, canvas=CANVAS, target_h=TARGET_H, baseline=BASELINE):
    a = rgba[..., 3]
    ys, xs = np.where(a > 8)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = rgba[y0:y1, x0:x1]
    h, w = crop.shape[:2]
    scale = target_h / h
    nw, nh = max(1, int(round(w * scale))), target_h
    img = Image.fromarray(crop.astype(np.uint8), "RGBA").resize((nw, nh), Image.LANCZOS)
    out = Image.new("RGBA", canvas, (0, 0, 0, 0))
    out.paste(img, ((canvas[0] - nw) // 2, baseline - nh), img)
    return np.asarray(out).copy()


def build_me(sheet_path):
    sheet = np.asarray(Image.open(sheet_path).convert("RGB")).astype(float)
    lum = sheet.mean(2)
    mask = lum < 235
    rows = find_runs(mask.sum(1), 5)
    cols = find_runs(mask.sum(0), 5)
    assert len(rows) == 2 and len(cols) == 12, (len(rows), len(cols))

    raw = {}
    for names, (ry0, ry1) in zip((ROW1, ROW2), rows):
        for slug, (cx0, cx1) in zip(names, cols):
            sub = sheet[max(0, ry0 - 22):ry1 + 22, max(0, cx0 - 22):cx1 + 22]
            raw[slug] = cut_bottle(sub)

    os.makedirs(OUT_ME, exist_ok=True)
    out = {}
    for slug, rgba in raw.items():
        norm = normalize(rgba)
        out[slug] = norm
        save_webp(norm, os.path.join(OUT_ME, f"{slug}.webp"))
    return out


# ------------------------------------------------------------------ part B
def alpha_edges(alpha, row, thresh=40):
    xs = np.where(alpha[row] > thresh)[0]
    if len(xs) == 0:
        return None
    return xs.min(), xs.max()


def bottle_landmarks(rgba):
    """Return dict with body edges, centre, top, bottom and collar seam row."""
    a = rgba[..., 3].astype(float)
    ys = np.where((a > 40).any(1))[0]
    top, bottom = ys.min(), ys.max()
    widths = np.array([(a[y] > 40).sum() for y in range(top, bottom + 1)])
    body_w = np.median(widths[int(len(widths) * 0.6):])          # lower body
    # seam: first row from the top (searching downward) whose width reaches the
    # full body width -> the shoulder where the collar meets the body.
    idx = np.where(widths >= body_w * 0.985)[0]
    seam = top + int(idx.min())
    row = min(bottom - 5, seam + int((bottom - seam) * 0.5))
    e = alpha_edges(a, row)
    return {"top": int(top), "bottom": int(bottom), "seam": int(seam),
            "left": int(e[0]), "right": int(e[1]),
            "cx": (e[0] + e[1]) / 2.0, "bw": float(e[1] - e[0])}


def build_us(me_assets, us_orig_dir):
    """Replace the cap/neck/collar assembly of each original US bottle."""
    # ---- master: cap + neck + collar + a slice of body, from a clean ME bottle
    master_slug = "cool-peppermint"
    master = me_assets[master_slug].astype(float)
    mlm = bottle_landmarks(master)
    # take the master from its very top down through the collar and 12% of the
    # body, so the composite always extends past the collar/body junction.
    m_bottom = int(mlm["seam"] + (mlm["bottom"] - mlm["seam"]) * 0.14)
    m_slice = master[mlm["top"]:m_bottom]
    m_h = m_slice.shape[0]
    m_cap_h = mlm["seam"] - mlm["top"]

    os.makedirs(OUT_US, exist_ok=True)
    report = []
    for slug in ROW1 + ROW2:
        src = Image.open(os.path.join(us_orig_dir, f"{slug}.webp")).convert("RGBA")
        tgt = np.asarray(src).astype(float)
        tlm = bottle_landmarks(tgt)

        # per-asset affine: scale x by body width ratio, y by cap height ratio
        sx = tlm["bw"] / mlm["bw"]
        t_cap_h = tlm["seam"] - tlm["top"]
        sy = t_cap_h / m_cap_h
        nw = max(2, int(round(m_slice.shape[1] * sx)))
        nh = max(2, int(round(m_h * sy)))
        warped = np.asarray(
            Image.fromarray(m_slice.astype(np.uint8), "RGBA").resize((nw, nh), Image.LANCZOS)
        ).astype(float)

        # register: master centreline & top -> target centreline & top
        m_cx_local = mlm["cx"] - 0  # master slice keeps full canvas width
        dx = int(round(tlm["cx"] - m_cx_local * sx))
        dy = int(round(tlm["top"]))

        layer = np.zeros_like(tgt)
        x0, y0 = dx, dy
        x1, y1 = min(tgt.shape[1], x0 + nw), min(tgt.shape[0], y0 + nh)
        sx0, sy0 = max(0, -x0), max(0, -y0)
        layer[max(0, y0):y1, max(0, x0):x1] = warped[sy0:sy0 + (y1 - max(0, y0)),
                                                     sx0:sx0 + (x1 - max(0, x0))]

        # blend mask: opaque above the collar, feathered out through the body
        H = tgt.shape[0]
        yy = np.arange(H, dtype=float)
        seam = tlm["seam"]
        feather = max(10.0, (tlm["bottom"] - seam) * 0.035)      # 10-14 px
        m = np.clip((seam + feather * 0.6 - yy) / feather, 0, 1)
        blend = m[:, None, None] * (layer[..., 3:4] / 255.0)

        out = tgt.copy()
        out[..., :3] = tgt[..., :3] * (1 - blend) + layer[..., :3] * blend
        # alpha: union of the original body and the registered cap assembly
        out[..., 3] = np.maximum(tgt[..., 3] * (1 - m) + np.maximum(tgt[..., 3], layer[..., 3]) * m,
                                 layer[..., 3] * m[:, None])
        out = np.clip(out, 0, 255)

        # kill any residual of the OLD cap that pokes outside the new one
        old = (yy < seam - 1)[:, None]
        outside = (layer[..., 3] < 8) & old
        out[..., 3] = np.where(outside, 0, out[..., 3])

        save_webp(out.astype(np.uint8), os.path.join(OUT_US, f"{slug}.webp"))
        report.append((slug, round(sx, 3), round(sy, 3), tlm["seam"]))
    return report


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
    for i, slug in enumerate(slugs):
        rgba = assets[slug]
        a = rgba[..., 3]
        ys, xs = np.where(a > 8)
        crop = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1].astype(np.uint8)
        depth = abs(i - (n - 1) / 2) / max(1, (n - 1) / 2)
        h = int(bottle_h * (1 - 0.12 * depth))
        w = max(1, int(crop.shape[1] * h / crop.shape[0]))
        img = Image.fromarray(crop, "RGBA").resize((w, h), Image.LANCZOS)
        # soft contact shadow
        sh = Image.new("RGBA", (w, int(h * 0.10)), (0, 0, 0, 0))
        import PIL.ImageDraw as D
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
    ap.add_argument("--skip-us", action="store_true")
    args = ap.parse_args()

    me = build_me(args.sheet)
    print(f"ME: {len(me)} cutouts written to {OUT_ME}")

    if not args.skip_us:
        rep = build_us(me, args.us_orig)
        print(f"US: {len(rep)} bottles recapped")

    compose(me, ["melon-yogurt-ice", "strawberry-cake", "peach-ice", "mango-ice",
                 "green-apple", "cool-peppermint", "blueberry-raspberry"],
            (1920, 1080), (12, 14, 13), (5, 7, 6), 760, 0.93, 0.80,
            os.path.join(OUT_ROOT, "hero.webp"))
    compose(me, ROW1[:6] + ROW2[:6], (1600, 1000), (24, 26, 25), (8, 10, 9),
            700, 0.95, 0.92, os.path.join(OUT_ROOT, "range.webp"))
    print("hero.webp / range.webp rebuilt")


if __name__ == "__main__":
    main()
