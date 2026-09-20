# `hero/` — Homepage Opening Section

Figma: "Home Page" frame, node `230:4043`, y 0-1080 (the DENVOLAB wordmark, headline, "SAY HELLO" CTA, service list, and mockup image).

- `hero.tsx` — the component (Server Component; content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## Layout approach

The whole section is one fixed-aspect box (`aspect-[1920/1080]`, capped at `max-w-[1920px]`) and every child inside it is positioned as a **percentage** of that box, converted 1:1 from the Figma frame's pixel coordinates (e.g. a child at `x: 852, w: 352` in a 1920-wide frame becomes `left-[44.38%] w-[18.33%]`). That's what makes it scale smoothly as the viewport shrinks below 1920px, and why nothing here uses a fixed `px` position.

This is the **desktop (`lg`+) version only** — the fixed-aspect box is now wrapped in `hidden lg:block`. Below `lg`, a separate flow layout (`lg:hidden`) renders per the project doc `homepage-responsive-tablet-mobile`'s mobile (390px, node `249:981`) and tablet (768px, node `253:1054`) frames: headline, CTA, and the service list stacked top-to-bottom, no fixed positioning. Both the giant background wordmark and the mockup image are dropped entirely at these widths — neither appears in either Figma frame — and the top-bar (logo + hamburger) isn't repeated here even though Figma draws it inside this frame, since the global `Header` component already covers that role (see `layout/header/README.md`).

## Known gaps (see the TODO comments in `hero.tsx`)

- **Hero mockup image** (Figma node `230:4166`) has no committed asset — the sandbox this was built in can't reach Figma's asset-export host, so the image byte data was never retrievable. It's a plain placeholder box (`bg-surface-dark-deep`, rounded, bordered) until someone exports the real image from Figma and drops it at `public/images/hero-mockup.png`.
- **Wordmark font**: the giant "DENVOLAB" text uses `font-sans` (DM Sans, matching Figma's "DM_Sans:Medium" spec on this element) — not `font-heading` — because that's what this specific text layer uses, even though most large display text on the site pairs with the heading font. Don't "fix" this to `font-heading`; it would be wrong here.
