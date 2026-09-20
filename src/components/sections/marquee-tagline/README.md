# `marquee-tagline/` — Scrolling Tagline Strip

Figma: "Home Page" frame, node `230:4231`, y 1080-1300 (directly under the hero). Five phrases ("WE DON'T DESIGN" / "WE DO CRAFT" / ...) interleaved with a repeating icon, scrolling infinitely.

- `marquee-tagline.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## Why this loops in CSS, not GSAP

The Figma source is static — it shows one copy of the 5-phrase sequence, not a pre-duplicated scrolling track. The infinite-scroll behavior is implemented here as a pure CSS animation (`animate-marquee-scroll`, defined once in `app/globals.css` so any future marquee — the partner-logos strip, for instance — reuses the same keyframes instead of redefining them). The technique: render the sequence **twice** back to back in one `w-max` flex track, then animate `translateX(0 → -50%)` — since the track is exactly two copies wide, sliding by half its width always lands exactly on the seam between copy 1 and copy 2, so the loop is invisible.

This didn't need GSAP (no scroll-linking, no easing beyond linear, no interaction) — plain CSS keeps it a Server Component and one less thing shipped to the client.

## Responsive (mobile/tablet, `<lg`)

Per the homepage-responsive-tablet-mobile project doc, both the mobile (390px) and tablet (768px) Figma frames replace the 120px infinite marquee with a single static, wrapping line at a normal readable size (`text-label-md`, uppercase, no animation) — the full multi-phrase strip doesn't translate to a narrow viewport. The mobile frame's own line joins two of the five phrases with a middle dot ("CRAFT IS NOT AN ART · WE DO CRAFT"); rather than hardcode which two, this joins every phrase from `lib/data/homepage.ts` the same way, so the line stays correct if the phrase list ever changes.

## Known gap

The repeating icon (Figma node `231:5215`, "icon_vector") has no committed SVG — this was built in a sandbox that couldn't reach Figma's asset-export host (`www.figma.com` was blocked at the network layer), so the icon's actual vector data was never retrievable, and per the design-to-code rules a placeholder is used rather than a hand-drawn guess at what the icon looks like. It renders as a plain brand-tinted circle in the icon's exact 96px slot. To finish this: export the icon from Figma as an SVG, save it at `public/icons/marquee-spark.svg`, and set each item's `iconSrc` in `lib/data/homepage.ts` (`MARQUEE_ITEMS`) to that path — then swap the placeholder `<span>` in `marquee-tagline.tsx` for an `<img>`/`<Image>` using it.
