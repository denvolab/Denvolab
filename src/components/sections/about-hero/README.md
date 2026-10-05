# `about-hero/` — About Page Opening

Figma: "About us" frame, node `431:6131` (the dark block at the top). A big headline on the left, a paragraph and the "DISCOVER OUR WORK" button on the right, and a row of five photos underneath.

- `about-hero.tsx` — the section (content from `lib/data/about.ts`)
- `about-hero.module.css` — the photo motion
- `index.ts` — barrel export

## Layout

- **xl (1280px) and up:** headline left, paragraph and button right and pushed 220px down, exactly like Figma.
- **Below xl:** headline, then paragraph and button, stacked.
- **Photo row:** the same list of photos has two layouts, so each picture is only in the page once. From `lg` (1024px) up it is the Figma composition: five pictures at different heights inside a box that keeps the 1840 x 368 shape and scales with the window. Each picture's left, top, width and height is a percentage of that box, worked out from Figma's pixel numbers (`PHOTO_LAYOUT` in the component). Below `lg` it is a two-column grid.

The Figma frame draws its own nav bar at the top. The site already has a global Header, so that bar is not repeated. The headline's 215px distance from the top is measured from the bottom of the real header.

## Motion

Each photo fades in and rises 28px, one after the other (140ms apart), then drifts up or down by 5px and back forever (odd photos up, even photos down, 5.2 second cycle). It is off for visitors who ask for reduced motion.

## Photos

Real team photos (not Figma exports, Figma's own image fills for this page could not be downloaded, see the Known asset gap in `sections/README.md`), supplied by the user and wired in via `imageSrc` in `lib/data/about.ts` (`HERO.photos`):

| File | Shown at |
|---|---|
| `public/images/about/hero-1.png` | 292 x 343 |
| `public/images/about/hero-2.png` | 292 x 239 |
| `public/images/about/hero-3.png` | 383 x 288 |
| `public/images/about/hero-4.png` | 467 x 281 |
| `public/images/about/hero-5.png` | 278 x 343 |

If any of these are ever swapped, keep the same file names and PNG format, or update `imageSrc` in `lib/data/about.ts` to match.

## Copy note

The paragraph's last sentence is cut off in Figma ("...to become At our agency"). It is kept word for word in `lib/data/about.ts` so it can be finished in one place. The dash after "passion" in the Figma text is written as a comma.
