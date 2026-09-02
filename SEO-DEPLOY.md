# LusMind zero-cost SEO deployment

Implemented on 2026-09-02. The changes affect initial HTML, metadata, HTTP routing and crawler discovery without changing the final page content, design or layout.

## Build output

- `npm run build` creates the Vite client bundle and prerenders all 10 canonical routes.
- Every canonical route receives route-specific title, description, canonical, Open Graph and Twitter metadata.
- `dist/404.html` is generated with `noindex,follow`.
- `wrangler.toml` uses Workers Static Assets with trailing slashes removed and real 404 handling.
- `/e-liquid` permanently redirects to `/products/e-liquid` through `_redirects`.
- Google verification, sitemap, robots and the IndexNow key are copied from `public/`.

## Verification

```sh
npm ci
npm run lint
npm run build
npm run seo:check
```

After deployment, run `node scripts/verify-seo.mjs`. IndexNow stays in dry-run mode unless `--confirm` is explicitly provided. Product URLs additionally require `--include-products`.
