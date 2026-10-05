# `case-studies-hero/` — "Designed by Denvo Lab"

Figma: "Work" frame, node `431:6534`, the dark block at the top (y 0-625).

- `case-studies-hero.tsx` — the section (heading + paragraph from `lib/data/case-studies.ts`), a Server Component
- `index.ts` — barrel export

## What this is

The opening band of the Case Studies page (`/case-studies`): a headline ("Designed by Denvo Lab") on the left and a short paragraph on the right, on the same dark `bg-surface-dark` (`#1a2128`) background as `hero/` and `about-hero/`, with the same 14-bar decorative pattern as `hero/` and `contact-cta/` (duplicated here rather than shared, per this project's per-section-independence convention — see `contact-cta.tsx`'s own comment for why).

Figma draws its own nav bar at the top of this frame ("Home / About / Services / Case Studies / Become a Client"). It isn't repeated here — the site's global `Header` already sits above every page, same as `hero/` and `about-hero/`.

There's no CTA button in this section (unlike `about-hero/`, which has one) — Figma's source doesn't put one here.

## Layout

Headline top-left, paragraph anchored lower on the right (`xl:mt-[141px]`), same two-column pattern as `about-hero/`'s headline + paragraph row. Below `xl` (1280px) it stacks: headline, then paragraph.

## Judgment call: containing the decorative bars

In Figma, the bar frame is 1080px tall but the dark background rectangle behind the heading is only 625px tall — the bars bleed 455px past the bottom of the dark band into the white project grid below it. That reads as the decorative frame simply never having been resized to match (the same kind of drift this project normalizes elsewhere, e.g. `about-values/README.md`'s card-height note), not an intentional bleed, so the bars here are contained to this section's own height (`overflow-hidden` on the section) instead. They're also desktop-only (`lg:flex`), same reasoning as `contact-cta/`: over a heading that's wrapped to two lines on a narrower screen, the bars read as visual noise rather than a flourish.

## The rest of the Case Studies page

This is the only new section on `/case-studies` — everything else in the Figma "Work" frame (the six-project grid, the partner-logo strip, the "Let's Contact" closing block) is pixel-for-pixel the same content already built for the homepage, so `app/case-studies/page.tsx` reuses `portfolio-grid/`, `partner-logos/`, and `contact-cta/` directly rather than rebuilding them. See the `case-studies-page` project doc for the full section-by-section mapping.
