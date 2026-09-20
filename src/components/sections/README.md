# `sections/` — Big, Page-Specific Blocks

This folder holds the large, one-off blocks that make up the homepage (and later, other pages) — the kind of thing that only ever appears in one place, unlike the small reusable pieces in `ui/`. Each is its own folder, following the same pattern as `components/layout/header/`.

## Contents (homepage)

| Folder | Status |
|---|---|
| `hero/` | ✅ built — headline, "Say Hello" CTA, service list, wordmark |
| `marquee-tagline/` | ✅ built — the scrolling tagline strip |
| `portfolio-grid/` | ✅ built — project showcase grid |
| `what-we-create/` | ✅ built — services showcase |
| `ai-orbit/` | ✅ built — "Smarter Design, Supercharged by AI" icon feature section |
| `partner-logos/` | ✅ built — client/partner logo strip |
| `process-steps/` | ✅ built — the "60 Days Process" timeline |
| `testimonials/` | ✅ built — client quote card marquee |
| `contact-cta/` | ✅ built — "Let's Contact" closing section |

The static, pixel-perfect layout for each is being built directly from the Figma source (see the `part-pilot-project`/homepage project docs for the current build plan). The full exotic motion/interaction treatment (cursor tracking, custom transitions — see the `motion-interaction-references` project doc) stays gated on the user's inspect-code specs; a section landing here today gets standard, obviously-implied motion only (e.g. `marquee-tagline`'s scroll loop, which is structural to the design, not a reference-site effect).

## Responsive status

All 9 sections above, plus the global `layout/header/` and `layout/footer/`, now have mobile (390px) and tablet (768px) variants built alongside the original desktop (1920px, `lg:` and up) layout, per the `homepage-responsive-tablet-mobile` project doc. Screenshot-verified at all three widths (390px, 768px, 1920px) with no regressions to the desktop build. See each section's own README for its specific responsive treatment and any judgment calls made. The general pattern: `lg` (1024px) is the single dividing line between flow layout (mobile/tablet) and fixed-aspect absolute-positioned layout (desktop); `md` (768px) is used within the flow layout only where the Figma tablet frame shows an explicit structural change (2-column grids for `portfolio-grid/`, `testimonials/`, and the footer).

## One-off values vs. tokens

Every section here should reach for an existing token (`styles/tokens/`) first. Where the Figma design uses a value that appears **exactly once in the whole page** — a bespoke font-size, an odd one-off gap — and adding a global token for it would be pure token-file sprawl, it's used as a plain arbitrary Tailwind value with a comment linking the Figma node id instead. A value that repeats (even across two sections) gets a real token. See `hero/`'s wordmark treatment (`tokens/typography.css`'s "Display/Wordmark" entry) for an example of a value that, despite appearing once, still earned a token because it's a genuine text style, not an incidental layout number.

## Known asset gap (applies to every section with images/icons)

This project was built in a sandbox whose network blocks `www.figma.com`, so none of the design's exported image/icon assets (`https://www.figma.com/api/mcp/asset/...` URLs) could be downloaded and committed — every section with an image or custom icon ships a documented placeholder instead (see that section's own README for specifics) until someone exports the real asset from Figma and drops it in `public/`.

## Why sections are separate from `ui/`

A `ui/` component (like `Button`) could be dropped into any project. A `sections/` component (like `hero/`) is specific to the Denvo Lab homepage's content and copy — it will never be reused elsewhere, so it doesn't belong in the generic folder.
