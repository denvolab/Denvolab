# `marquee-tagline/` — Scrolling Tagline Strip

Figma: "Home Page" frame, node `230:4231`, y 1080-1300 (directly under the hero). Five phrases ("WE DON'T DESIGN" / "WE DO CRAFT" / ...) interleaved with a repeating icon, scrolling infinitely.

- `marquee-tagline.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## Why this loops in CSS, not GSAP

The Figma source is static — it shows one copy of the 5-phrase sequence, not a pre-duplicated scrolling track. The infinite-scroll behavior is implemented here as a pure CSS animation (`animate-marquee-scroll`, defined once in `app/globals.css` so any future marquee — the partner-logos strip, for instance — reuses the same keyframes instead of redefining them). The technique: render the sequence **twice** back to back in one `w-max` flex track, then animate `translateX(0 → -50%)` — since the track is exactly two copies wide, sliding by half its width always lands exactly on the seam between copy 1 and copy 2, so the loop is invisible.

This didn't need GSAP (no scroll-linking, no easing beyond linear, no interaction) — plain CSS keeps it a Server Component and one less thing shipped to the client.

## Responsive (mobile/tablet, `<lg`)

Per the homepage-responsive-tablet-mobile project doc, both the mobile (390px) and tablet (768px) Figma frames replace the 120px infinite marquee with a single static, wrapping line at a normal readable size (`text-label-md`, uppercase, no animation) — the full multi-phrase strip doesn't translate to a narrow viewport. The mobile frame's own line joins two of the five phrases with a middle dot ("CRAFT IS NOT AN ART · WE DO CRAFT"); rather than hardcode which two, this joins every phrase from `lib/data/homepage.ts` the same way, so the line stays correct if the phrase list ever changes.

## The icon

The repeating icon is the lime asterisk (Figma node `431:6142`, "icon_vector"), saved as `public/icons/marquee-spark.svg` and set as each item's `iconSrc` in `lib/data/homepage.ts` (`MARQUEE_ITEMS`). It was rebuilt from the vector's own path data in Figma. If an item ever has no `iconSrc`, a plain brand-tinted ring holds the 96px slot instead.

## Also used on

The About page (`app/about/page.tsx`) reuses this section unchanged: the "About us" frame's marquee (node `431:6140`) has the same phrases and icon.

## Slower strip and spinning icon (Oct 2026)

The user asked for the asterisk to keep turning like a gear and for this strip to move slower.

- **Spinning icon**: each asterisk has `animate-spark-spin`, one full clockwise turn every 6s, forever (`--animate-spark-spin` and `@keyframes spark-spin` in `app/globals.css`). The shape's centre of mass sits within half a pixel of the middle of its 96px box, so it spins in place without wobbling, and its farthest tip (about 43px from the centre) never leaves the box, so it never touches the text. To change the speed, change the `6s` in `globals.css`.
- **Slower strip**: this strip now takes 76s per loop instead of the site default 38s, half the old speed (about 83px a second instead of 166, the same at every desktop width since the text is a fixed 120px). It's set on the track itself (`[animation-duration:76s]` in `marquee-tagline.tsx`), so other marquees that share `animate-marquee-scroll` keep their speed. Raise the number to slow it more.
- **Seam fix**: the loop used to jump 28px every time it restarted. The track is two copies with a 56px gap between items, but there was no gap after the last item, so half the track was half a gap shorter than one copy. `pr-14` adds that last gap; the jump is now 0 (measured).
- **Reduce motion**: with "Reduce motion" turned on, both the strip and the spinning stop, like before.

Verified with Playwright at 1024 and 1920: 76s loop, 83px a second, 60 degrees a second on the icons, seam jump 0, both paused under reduced motion. No sideways scroll on any page from 360 to 1920. Applies to the About page too, which uses this same section.
