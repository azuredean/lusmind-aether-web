# Slow down homepage hero carousel

## Goal
Make the homepage hero slideshow rotate more slowly so users can absorb each lifestyle frame and its matching slogan.

## Current state
- `src/lusmind/homeScript.ts` line 755 sets `setInterval(() => show(index + 1), 2000)` — a new slide every 2 seconds.
- The crossfade transition and slogan text swap already animate independently.

## Proposed change
Increase the hero slideshow interval from 2 seconds to 5 seconds:

```ts
heroTimer = globalThis.window.setInterval(() => show(index + 1), 5000);
```

Keep the existing pause-on-hidden-tab behavior and click-to-advance behavior unchanged.

## Verification
1. Run the production build to confirm no TypeScript errors.
2. Use the preview to watch the hero: each of the 6 slides should remain visible for roughly 5 seconds before the next crossfade.
3. Confirm the slogan text still updates in sync with the slide change.

## Scope
Single file edit: `src/lusmind/homeScript.ts`. No markup or styling changes required.
