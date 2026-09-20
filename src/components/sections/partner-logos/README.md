# `partner-logos/` — Client/Partner Logo Strip

Figma: node `230:4222`, y 7588-7796. Two rows of 22 logos each, scrolling infinitely, with white edge-fade gradients over both ends of each row.

- `partner-logos.tsx` — the section (content from `lib/data/homepage.ts`)
- `partner-logo-row.tsx` — one row (used twice, once reversed)
- `index.ts` — barrel export

## Why the logos aren't Figma's actual assets

The Figma source alternates exactly two logo images across all 44 slots: **Visa's real logo**, and a generic "it-sks" mark. Visa is a real, unaffiliated company — reproducing its logo here would present it as a Denvo Lab client/partner, which isn't true. This ships **generic placeholder slots** (a bordered chip with a "Client One" / "Client Two" / ... label) at the same two alternating widths (144px "wide" / 103px "narrow") instead.

**To finish this section**: replace the entries in `lib/data/homepage.ts` (`PARTNER_LOGOS`) with Denvo Lab's real client/partner list, export their actual logos from wherever they're sourced (not from this Figma file), drop them at `public/images/partners/<slug>.svg` (or `.png`), and set each entry's `logoSrc`.

## Responsive (mobile/tablet, `<lg`)

Per the `homepage-responsive-tablet-mobile` project doc (Figma nodes `251:1791` mobile / `253:1243` tablet), these widths drop the infinite-scroll marquee for simple static rows — the same logo chips, wrapped in a plain `flex flex-wrap` row rather than the animated track, so nothing scrolls.

## Background + scroll direction

This section sits on the page's plain white background (`bg-background`) — confirmed by reading the frame's own fill directly, not assumed from the dark section above it (`ai-orbit/`). The two rows scroll in opposite directions (`reverse` on the second `PartnerLogoRow`), matching Figma's own per-row annotations ("left side carousel" / "right side carousel") and the standard treatment for a 2-row logo strip.
