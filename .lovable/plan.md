# Lusmind responsive + performance audit (audit only, no code changed)

Measured on the current commit with a production build, Playwright resource/paint timings, and a 12-viewport sweep. No Lighthouse or Core Web Vitals numbers are claimed — only directly measured values.

## 1. Production build output

`vite build` output (dev-server config, single entry):

```text
index.html                    2.19 kB  gzip 0.78 kB
assets/index-<hash>.js      265.67 kB  gzip 79.23 kB
(no emitted CSS chunk)
```

- One JS chunk only. `src/App.tsx` imports `Home`, `ProductPage`, `NotFound` statically, so **Home and ProductPage are bundled together**. Confirmed at runtime: loading `/products/royal-slim` still downloads `homeMarkup.ts` (96 kB dev) and `homeScript.ts` (80 kB dev).
- No CSS is emitted by Vite because `src/index.css` is not imported by `src/main.tsx`; all real styling lives in `public/styles.css` (69,226 B) and `public/product-detail.css` (34,717 B), served unhashed from `public/` — **no content hash, so they are cache-unfriendly** (must be revalidated / short max-age to stay correct).
- Bundle weight is dominated by the inlined markup strings (`homeMarkup.ts` 40.5 kB source, `productScript.ts` 47.6 kB source) plus React + react-router.

## 2. Asset inventory (15 largest, with dimensions)

```text
164.2 KB  1672x941   /assets/products/ai-pulse.webp
148.7 KB  1448x1086  /assets/products/arc-leather.webp
144.4 KB  1448x1086  /assets/products/core-20.webp
125.8 KB  (font)     /assets/fonts/ibm-plex-mono-400.ttf
124.5 KB  1717x916   /assets/campaign/core-20-hero.webp
107.2 KB  1448x1086  /assets/products/royal-classic.webp
105.3 KB  1536x1024  /assets/campaign/arc-pod-s-hero.webp
 99.0 KB  1672x941   /assets/campaign/ai-pulse-hero.webp
 98.1 KB  1672x941   /assets/campaign/royal-heat-hero.webp
 92.9 KB  (font)     /assets/fonts/manrope-600.ttf
 92.7 KB  (font)     /assets/fonts/manrope-400.ttf
 92.3 KB  1448x1086  /assets/products/royal-slim.webp
 79.2 KB  1448x1086  /assets/products/arc-metal.webp
 73.9 KB  1672x941   /assets/products/fusion-one.webp
 71.7 KB  1672x941   /assets/campaign/faq-material-bg.webp
```

Totals on disk: campaign 1.4 MB, products 812 KB, fonts 416 KB, brand 64 KB.

**Cold homepage load, before the age gate is accepted:** 29 asset requests, **~2.07 MB** transferred (plus JS). That includes all 6 `age-life-*.webp` (~311 KB), all 6 `hero-life-*.webp` (~311 KB), every campaign background (`faq-material`, `partner-showroom`, `market-readiness`, `contact-partnership`, `brand-materials`), every product-explorer campaign hero (`ai-pulse-hero`, `core-20-hero`, `arc-pod-s-hero`, `royal-heat-hero`, `fusion-one-hero`), `royal-slim.webp`, `royal-classic.webp`, `ai-pulse.webp`, the 2227x508 logo (63.5 KB), and 3 TTF fonts (238 KB). Paints: FP 536 ms, FCP 1132 ms (dev server, local).

**Cold `/products/royal-slim` load:** 8 asset requests, ~700 KB — including two that page does not need: `/assets/campaign/ai-pulse-hero.webp` (99 KB, from the unconditional `index.html` preload) and `/styles.css` (68 KB, homepage-only sheet, also preloaded unconditionally). `royal-classic.webp` (108 KB) is also fetched on the Slim page. FP 500 ms, FCP 660 ms. Zero page errors on both routes.

## 3. Code-level findings

- **`index.html`**: preloads `/styles.css` *and* `/product-detail.css` on every route (one is always wasted), and preloads `/assets/campaign/ai-pulse-hero.webp` which is not the LCP element on any route — it is an explorer image far below the fold. Three of five fonts are preloaded as `font/ttf`.
- **Fonts**: all five faces are raw **TTF** (416 KB total) with `font-display: swap`. WOFF2 typically cuts this by 60–70%. `ibm-plex-mono-400.ttf` alone is 126 KB.
- **`src/App.tsx`**: static imports of both page modules — no route-level code splitting.
- **`src/lusmind/useStylesheet.ts`**: on unmount it removes the `<link>` *and* deletes the href from the `loaded` set, so every SPA route change re-inserts the sheet and re-runs the "hidden until ready" gate — an avoidable blank frame on each navigation even when the file is in HTTP cache. Pages render with `visibility: hidden` until `ready`, which prevents FOUC but delays first meaningful paint for the whole route.
- **Age gate** (`homeMarkup.ts` lines 7–13 + `.age-gate__slide` in `public/styles.css` ~L328–353): six `background-image` layers declared as inline `--age-image` custom properties, all fetched immediately; CSS backgrounds cannot be lazy-loaded. Six infinite CSS animations run behind a modal the user must dismiss.
- **Home markup**: hero slides 2–6 use `loading="lazy"`, but in practice all 6 hero and all campaign backgrounds are fetched during initial load. The nav dropdown / mobile-menu links in `productShellMarkup.ts` are text-only (no hidden images) — but the product-explorer campaign images (`homeMarkup.ts` L136–152) are below the fold and still fetched on load. All `<img>` tags do carry `width`/`height`, so intrinsic-ratio CLS risk is low; `decoding="async"` is absent everywhere.
- **Animations**: 38 animation/transition declarations in `styles.css`; `will-change: opacity, transform` on all six age-gate slides plus infinite `signal-breathe`, `orbit`, `scroll-line` loops. `prefers-reduced-motion` is handled (L3807+) and disables them — that behavior must be preserved.
- **Caching**: `public/*.css` and all `/assets/**` are unhashed paths, so long-lived immutable caching is unsafe as-is.

## 4. Viewport sweep (12 sizes, home + `/products/royal-slim`)

| Viewport | Horizontal overflow | Age-gate panel | Hero height | Product hero | Anchor rail |
|---|---|---|---|---|---|
| 320x568 | none | 296x422, fits | 700 (exceeds vp) | 560 | sticky, 45 |
| 360x800 | none | 336x494 | 800 | 680 | sticky, 45 |
| 390x844 | none | 366x480 | 844 | 680 | sticky, 45 |
| 430x932 | none | 406x480 | 932 | 680 | sticky, 45 |
| 768x1024 | none | 570x429 | 1024 | 680 | sticky, 45 |
| 1024x768 | none | 570x467 | 768 | 640 | sticky, 47 |
| 1280x720 | none | 570x500 | 720 | 640 | sticky, 47 |
| 1366x768 | none | 570x573 | 768 | 640 | sticky, 47 |
| 1440x900 | none | 570x573 | 900 | 702 | sticky, 47 |
| 1920x1080 | none | 570x573 | 1080 | 760 | sticky, 47 |
| 2560x1440 | none | 570x573 | **1440** | 760 | sticky, 47 |
| 844x390 (landscape) | none | 570x330, fits | **390** | 560 | sticky, 45 |

- **No horizontal scrolling at any size** (`scrollWidth === innerWidth` everywhere). The only elements extending past the viewport edge are intentionally clipped decorative layers: `.age-gate__slide` (ken-burns scale) and `.product-hero__media` (parallax transform) — both inside `overflow: hidden` parents, so no clipped text or CTAs.
- **Age gate fits everywhere**, including 320x568 (top 10 / bottom 432) and 844x390 landscape (330 tall).
- **Hero is viewport-locked**: 1440 px tall at 2560x1440 (excessive, forces scroll-past emptiness) and only 390 px at 844x390 landscape (cramped). Everything between behaves.
- Spec tables, product grids, footer and nav/dropdown fit at all sizes; no clipped CTAs observed.

## 5. Prioritized, implementation-ready plan

**P0 — cut the pre-age-gate payload (~2.07 MB now; expect ~0.4–0.5 MB)**
1. `index.html`: drop the `/product-detail.css` preload (or make both route-conditional via a small inline script that preloads based on `location.pathname`); drop the `ai-pulse-hero.webp` preload; preload the first age-gate image instead.
2. `src/lusmind/homeMarkup.ts` (L7–13) + `public/styles.css` `.age-gate__slide`: render only slide 1 with its background at load; set the remaining `--age-image` values from JS (`homeScript.ts`) after the first slide paints or on `requestIdleCallback`. Saves ~260 KB immediately.
3. `src/lusmind/homeMarkup.ts` hero slides 2–6 and explorer campaign images (L90–95, L136–152, L269, L305, L411): keep `loading="lazy"`, add `decoding="async"`, and defer non-active explorer/campaign images by swapping `src` → `data-src` and hydrating in `homeScript.ts` when the section enters the viewport or when the explorer selection changes.
4. Defer the campaign section backgrounds (`faq-material`, `partner-showroom`, `market-readiness`, `contact-partnership`, `brand-materials`) in `public/styles.css` behind an `is-visible` class toggled by the existing IntersectionObserver reveal logic.

**P1 — fonts (416 KB → ~120–150 KB)**
5. Convert all five faces to WOFF2 in `public/assets/fonts/`, update the five `@font-face` blocks at the top of `public/styles.css` (and the copies in `public/product-detail.css` if duplicated) with `format("woff2")`, keep `font-display: swap`, and update the `index.html` preloads to `type="font/woff2"`. Preload only Manrope 400 + Syne 800; let Manrope 600 / Syne 600 / IBM Plex Mono load on demand. Consider dropping IBM Plex Mono (126 KB) if it is only used for small mono labels.

**P2 — routing and CSS lifecycle**
6. `src/App.tsx`: `React.lazy` + `Suspense` for `Home`, `ProductPage`, `NotFound`. Splits `homeMarkup`/`homeScript` (~136 kB dev source) out of the product-page path and vice-versa.
7. `src/lusmind/useStylesheet.ts`: stop removing the `<link>` and stop deleting from `loaded` on unmount — keep sheets resident (they are namespaced by `data-page`, and both are already scoped), so route changes have no re-fetch, no re-gate, and no hidden frame. If teardown is required, keep the `loaded` entry so `ready` starts `true`.
8. `public/styles.css` / `public/product-detail.css`: add content hashes or a versioned query so they can be served `immutable`; same for `/assets/**` via hosting cache rules.

**P3 — responsive polish**
9. Hero height in `public/styles.css` `.hero`: replace the pure `100vh`/`100dvh` sizing with `min-height: clamp(560px, 82svh, 900px)` so 2560x1440 stops reserving 1440 px and 844x390 landscape gets breathing room (add a `@media (orientation: landscape) and (max-height: 460px)` rule allowing scroll instead of squeezing).
10. Image right-sizing: `ai-pulse.webp` (164 KB), `arc-leather`, `core-20` and the 2227x508 logo (63.5 KB) are larger than any rendered slot; re-export at ~1200 px wide and add `srcset`/`sizes` for the hero and explorer slots.
11. Add `decoding="async"` sitewide and `fetchpriority="high"` only on the true above-the-fold image per route (`hero-life-1.webp` on home, `product-hero__media` on product pages).

Everything above is presentation/loading-only: visual identity, product data, URLs, age-gate behavior, lifestyle imagery, and the existing `prefers-reduced-motion` rules stay untouched.
