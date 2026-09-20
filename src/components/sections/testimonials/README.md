# `testimonials/` — Client Quote Cards

Figma: "Home Page" frame, node `230:4436` ("Frame 1000003334"), y 10878-12461 — the "Clients Words About Denvo" section: an intro (eyebrow + heading) over three rows of identical testimonial cards.

- `testimonials.tsx` — the section (content from `lib/data/homepage.ts`)
- `testimonial-row.tsx` — `TestimonialCard` (exported, reused directly by the mobile/tablet grid) + `TestimonialRow`, the marquee row built from it (used 3x on desktop, the middle one reversed)
- `index.ts` — barrel export

## Responsive (mobile/tablet, `<lg`)

Per the homepage-responsive-tablet-mobile project doc (Figma nodes `251:2189` mobile / `253:1436` tablet), these widths drop the marquee for a plain static `grid-cols-1 md:grid-cols-2` grid of 4 cards (matching the mobile Figma frame's own 4 stacked "Container" cards) — `TestimonialCard` is called directly with `fixedWidth={false}` so it fills its grid cell instead of using the marquee's explicit 611px.

## Why this is a marquee, not a static grid

Reading the section's exact node geometry via `get_metadata` settled a question flagged mid-build: each card row is *wider than the 1920px section itself* (row 1 & 3: 3151px for 5 cards; row 2: 2516px for 4 cards) and is centered with **equal overflow on both sides** (row 1/3 overflow ±615.5px, row 2 overflows ±298px — both exactly `(rowWidth - 1920) / 2`). Paired with node `230:4736` ("Shadow"), a `surface/secondary -> transparent -> transparent -> surface/secondary` gradient laid over the full row-wrapper width — this is the exact same signature already confirmed for `partner-logos/`'s infinite-scroll strip (see that folder's README), just with testimonial cards instead of logo chips. So this section reuses that pattern: `TestimonialRow` is `partner-logos/partner-logo-row.tsx`'s sibling — a `w-max` flex track running `animate-marquee-scroll` (or the `-reverse` variant), duplicated ×2 for a seamless loop, with matching edge-fade gradients (`from-surface` here, since this section sits on the gray `bg-surface` rather than `partner-logos/`'s white `bg-background`).

Each row reproduces Figma's own per-row card count (5 / 4 / 5) via the `count` prop, before the track duplicates it for the loop — the middle row runs in reverse, matching the standard alternating treatment used for `partner-logos/`'s two rows.

## Content

All 14 testimonial cards in the Figma source share the exact same name ("Bruno Malkes"), role ("Denvolab"), 5-star rating, and quote — this is placeholder copy the designer never swapped per reviewer, reproduced faithfully rather than invented (same reasoning as `portfolio-grid/`'s repeated project description and `process-steps/`'s repeated Week 4-6 copy). `lib/data/homepage.ts` keeps one `TESTIMONIAL` entry; `getTestimonials()` returns it as a one-item array, and each row repeats it to fill its own card count.

## Typography verification

Two color tokens used here were unverified going into this section and were checked with `Grep` against `tokens/colors.css` before use:
- Card role text ("Denvolab") — Figma's `text/tertiary` (`#6b7a89`) is an exact match for `--gray-500`, aliased as `--color-text-tertiary` / `--color-foreground-subtle` → `text-foreground-subtle`.
- Card name ("Bruno Malkes") uses Figma's actual named style **Heading/H5** (confirmed via the design context response's style list: DM Sans SemiBold 20/28), not a guessed heading step → `text-heading-5`.

## Known gaps

- **Avatar photos** (Figma node `230:2173`, the shared "Avatar" component) and the **star-rating icon** (24px icon frames) are both unexportable assets in this sandbox (see `components/sections/README.md`'s "Known asset gap") — a plain circle and plain filled squares stand in until real assets are dropped in.
- The card's divider line (node `230:4459`) is an unexportable hairline SVG in Figma, reproduced as a plain 1px `bg-border-subtle` rule.
- The "Shadow" background vignette (node `230:4736`) beyond the row edge-fades is a subtle full-section gradient overlay; not reproduced separately since the per-row edge fades already achieve the same visual effect where it matters (the row edges).
