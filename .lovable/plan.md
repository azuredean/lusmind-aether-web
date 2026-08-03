## Goal

Rebuild the homepage (`/`) so its layout, section order, and typographic style mirror oakandeden.com. Keep unchanged: the top nicotine warning texture bar and the existing navbar. The hero photo will be a newly generated "all products group still-life" image in the style of the reference (not the whiskey photo).

## Hero image

Generate a new wide still-life photo modeled on the reference hero: warm neutral studio backdrop, soft daylight, a table-top arrangement of LUSMIND products — disposable devices, NG-cigarette device, and e-liquid bottles — with props and hands-free clean composition, matching the existing product designs in `src/assets` (hero-products, disposable-product, premium-eliquids-bottles, me-products flavors) as visual reference. Saved to `src/assets/home-hero-group.jpg` and used full-bleed in the hero.

## New homepage section order (mirroring the reference)

```text
[ warning bar ]      <- unchanged
[ navbar ]           <- unchanged
1  HERO           full-bleed photo, left-aligned oversized condensed
                  serif headline, tiny mono tagline, solid black CTA
2  STORY SPLIT    dark (near-black) band, left arched product image,
                  right eyebrow rule + stacked serif headline +
                  short paragraph + outlined "LEARN MORE" button
3  FEATURED       light band, horizontal product carousel with giant
   FLAVORS        ghost outline wordmark scrolling behind the products
4  PRODUCT LINES  alternating full-width image/text rows (3 rows:
                  E-Liquids, Disposables, NG-cigarette) with black CTAs
5  BRAND VALUES   dark band, centered eyebrow + serif statement +
                  3-column supporting copy
6  EXPERIENCES    light band, 4 use-case cards in a quiet 2x2 grid
7  NEWSLETTER /   centered CTA band with email capture styling
   PRE-FOOTER
[ footer ]        restyled to match (dark, columned)
```

## Typography & tokens

- Headlines: condensed uppercase serif/display, tight leading, large scale.
- Eyebrows, buttons, small labels: uppercase monospace, wide letter-spacing.
- Palette added to `index.css` as semantic tokens: warm cream background (`#EDE6DB`-family), near-black (`#1A1815`), muted ink text, single warm accent. Replaces the cyan/pink gradient text treatment on the home page.

## Technical details

- Rewrite `src/pages/Home.tsx` into the new section order; hero carousel and corner CTA buttons are removed.
- New components: `HomeHero.tsx`, `StorySplit.tsx`, `FeaturedFlavors.tsx` (ghost-type marquee), `ProductLines.tsx`, `BrandValues.tsx`, `NewsletterCTA.tsx` under `src/components/home/`.
- `EcosystemLogos`, `ProblemStatement`, `ProductFeatures`, `UseCases`, `BackedBy`, `PreFooterCTA`, `HeroOrb` are no longer used by Home (left in place for the other pages that import them; unused ones can be deleted later).
- Fonts loaded via Google Fonts in `index.html`; new font families + colors registered in `tailwind.config.ts` and `index.css`.
- Reuse existing flavor artwork in `src/assets/me-products` for the featured carousel.
- Other pages (`/e-liquid`, `/e-cigarette`, `/disposable`) are untouched.
- Update `index.html` title/description to LUSMIND-specific copy.
