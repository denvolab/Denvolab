# `ai-orbit/` — "Smarter Design, Supercharged by AI"

Figma: the section covered by `Rectangle 17` (y 6476-7561 on the page), a dark `--color-surface-dark-deep` background (confirmed by reading the rectangle's actual fill — see the comment on that token in `styles/tokens/colors.css`). One large "hub" badge (node `230:4168`) with 6 smaller satellite badges arranged around it, connected by curved vector lines, under a two-line heading.

- `ai-orbit.tsx` — the component (heading text from `lib/data/homepage.ts`; the hub/satellite layout is hardcoded — see below for why)
- `index.ts` — barrel export

## Why the layout is hardcoded, not in `lib/data`

Everything else on the homepage that's "content" (headline copy, project titles, service names) lives in `lib/data/homepage.ts` so the future admin panel can edit it. The 7-badge hub-and-spoke arrangement here isn't content in that sense — it's a fixed decorative diagram (7 Figma-derived percentage positions), the same category as hero's decorative vertical bars. It stays in the component.

## Responsive (mobile/tablet, `<lg`)

Per the `homepage-responsive-tablet-mobile` project doc (Figma nodes `251:1738` mobile / `253:1190` tablet), the curved hub-and-spoke diagram becomes a simple wrapping `flex flex-wrap` grid of the same 7 circular badges (hub first and slightly larger, then the 6 satellites in source order) — no connector lines. The doc notes the tablet Figma frame's own icon-grid is actually a single row wider than the 768px frame; rather than reproduce that overflow, this uses one continuous wrapping layout that works at both the mobile and tablet widths (and anything in between), consistent with the rest of this codebase's "fluid, not breakpoint-snapped" approach.

## Known gaps

- **Badge icons.** All 7 badges (Figma nodes `230:4168`, `230:4187`, `230:4178`, `230:4191`, `230:4219`, `230:4184`, `230:4175`) are complex, multi-layer masked icon graphics in the source — not simple single-path SVGs — and none could be exported into this codebase (same sandbox network limitation as elsewhere; see `components/sections/README.md`). Each renders as a plain brand-tinted circle in its exact slot and size. To finish: export each icon from Figma as a flattened SVG or PNG, drop them at `public/icons/ai-orbit/<slug>.svg`, and swap the placeholder `<div>` for an `<img>` per badge in `ai-orbit.tsx`.
- **Connector lines.** Figma's actual connectors (`Vector 1`/`2`/`6`/`8`, etc.) are curved bezier shapes with no exportable path data available here. What's drawn is a straight line from the hub's center to each satellite's center, using the real center coordinates read from the Figma file — an honest simplification of the relationship, not a traced copy of the curve. Swap the `<line>` elements in the SVG for `<path>`s once the real curve geometry is available (e.g. exported as SVG and inspected for its `d` attribute).
