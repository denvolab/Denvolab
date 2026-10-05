# `services-hero/` — Services Page Opening Band

Figma: "Service page" frame, node `437:8298`. This section is the dark background rect (`437:8299`) and the staggered "Services & Solutions" heading (`437:8705`) sitting on top of it — both direct children of the page frame, not a wrapped "Hero" sub-frame — y 0-1031.

- `services-hero.tsx` — the component (Server Component; content from `lib/data/services.ts`)
- `index.ts` — barrel export

## Layout

Unlike a normal heading, "Services" and "Solutions" aren't stacked on separate lines with a line-break — they're a precise 2D overlap: "Services" sits top-left, "Solutions" is staggered down and to the right by a fixed pixel offset, and a small "&" glyph tucks into the gap between them. That composition can't be reproduced with ordinary text flow, so it's positioned the same way `hero/`'s many overlapping elements are (see that folder's README "Layout approach"): the whole section is one fixed-aspect box (`aspect-[1920/1031]`) and every child is a % of that box, converted 1:1 from the Figma frame's pixel coordinates.

Unlike `hero/`, there's no separate mobile/tablet frame for this section in Figma, and none is needed — there's no content to drop at narrow widths (no wordmark, no mockup, no service list, just the one heading), so the single fixed-aspect box, with the fluid `text-display-services-hero` token doing all the size scaling, holds up at every viewport width on its own without a second `lg:hidden` layout.

## Accessibility

"Services" and "Solutions" are two separately-positioned text nodes with a decorative "&" between them — not one sentence a screen reader could piece back together correctly on its own. An `sr-only` `<h1>` carries the real heading text ("Services & Solutions"); the positioned/staggered treatment below it is `aria-hidden`.

## Typography

"Services"/"Solutions" use a new one-off token, `display-services-hero` (`tokens/typography.css`), since 220px / weight 600 / -0.04em tracking doesn't match any of the site's existing named styles — same treatment as `hero/`'s `display-wordmark` and `contact-cta/`'s `display-jumbo` one-offs (see `typography.css`'s comments for the shared clamp() formula). Min size (40px) was chosen to match `display-wordmark`'s proportional min-to-max ratio (64/360 ≈ 0.178), applied to this style's 220px max.

The "&" reuses that same token's fluid scaling by taking a fixed fraction of it (`calc(var(--text-display-services-hero) * 0.2682)`, i.e. 59/220 of the main size, per Figma) rather than getting its own token, since it's a single decorative glyph used nowhere else. Its tracking is the same -0.04em ratio, expressed in `em` so it scales automatically with the smaller font size. Its color is `text-icon-disabled` (`--color-icon-disabled`, `#b4c0cc` in light mode, the mode this app runs in) — confirmed via `get_design_context`'s literal bound color, not just the Figma layer/variable name, which reads as a light-mode value bound directly for use against this section's dark background (matching how `text-foreground-inverse` is used elsewhere in the codebase for the same reason).

## Known gaps

None — every value here is either an existing token or documented above.
