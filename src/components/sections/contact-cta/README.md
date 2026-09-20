# `contact-cta/` — Homepage Closing Section

Figma: "Home Page" frame, node `230:4740` (decorative bars) + `230:4755` (content), y 12461-13869 (the giant "Let's Contact" heading, body paragraph, and "SAY HELLO" CTA on the dark olive background).

- `contact-cta.tsx` — the component (Server Component; content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## Layout approach

Same fixed-aspect, percentage-positioned box as `hero/` and `ai-orbit/`: `aspect-[1920/1408]` capped at `max-w-[1920px]`, with the content frame's position converted from Figma's own pixel coordinates (`get_metadata` on node `230:4740`/`230:4755` gave the exact numbers — see the comment at the top of `contact-cta.tsx`). Inside the content frame, "Let's Contact" + the right-hand column sum to exactly the frame's width with Figma's own 405px gap, reproduced as `justify-between` rather than a hardcoded gap.

## Background

`bg-surface-accent` — the dark olive CTA background, already anticipated by a token comment in `tokens/colors.css` (`--color-surface-accent`, aliasing `--brand-950` / `#323414`) before this section was even built.

## Typography

- **"Let's Contact"** uses the new one-off `Display/Jumbo` fluid text style (`tokens/typography.css`) — same reasoning as hero/'s `Display/Wordmark`: a genuine text style that only appears once, so it earns a token rather than a bare arbitrary value. Figma's `font-['Mona_Sans:Regular']` naming maps to this project's `font-heading` (the Mona Sans stand-in) at weight 400, which the token already bakes in.
- The body paragraph uses `text-foreground-disabled` (`--color-text-disabled` / gray-300 / `#b4c0cc`) — confirmed an exact hex match against Figma's `text/disabled` variable via `Grep` on `tokens/colors.css` before use.

## Responsive (mobile/tablet, `<lg`)

Per the homepage-responsive-tablet-mobile project doc (Figma nodes `251:2277` mobile / `253:1524` tablet), both narrower frames stack heading -> description -> CTA top-to-bottom instead of the desktop's side-by-side, bottom-aligned row, and drop the 14-bar background pattern entirely — it's a decorative flourish scaled to the huge desktop headline's width and reads as clutter once the heading wraps to fewer, shorter lines at these widths.

## Known gaps

- The 14-bar decorative pattern duplicates hero/'s exact treatment rather than sharing a component, per this project's per-section-independence convention (see `components/sections/README.md`).
- No image/icon assets are used in this section, so there's no asset gap here (unlike most other sections).
