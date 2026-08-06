# Update Google search result title from "Digital Vapor Experience" to "Luxury Vape Experience"

## Current state
- The live site source (`index.html`) currently uses `Lusmind — Wholesale Vape & Heat Platforms` as the `<title>` and contains no occurrence of "Digital Vapor Experience".
- The Google search screenshot shows an old cached title: `LusMind - Digital Vapor Experience`.
- The project is a Vite + React SPA whose homepage markup is injected from `src/lusmind/homeMarkup.ts`; the static `<title>` in `index.html` is the primary signal Googlebot reads for the homepage result.

## Proposed changes
1. Update the `<title>` tag in `index.html` to `LusMind - Luxury Vape Experience`.
2. Update the `<meta name="description">` to include the "Luxury Vape Experience" phrase and keep it B2B/distributor focused.
3. Update `og:title` and `twitter:title` to the same `LusMind - Luxury Vape Experience` string.
4. Update the JSON-LD `Organization` description to include "Luxury Vape Experience" for consistency.
5. Keep the homepage hero headline and H1 in `homeMarkup.ts` unchanged unless the user wants a visible copy change; the homepage already uses "Designed to move markets." which is strong. The metadata change is what directly influences the search result title.
6. Verify the build passes after the edits.

## Caveat
Google controls when its index updates. Changing the title tag is the correct fix, but the search result may continue to show the old text until Google re-crawls and re-renders the page. The user can request re-indexing via Google Search Console once the change is live.
