# `portfolio-grid/` — Project Showcase Grid

Figma: "Home Page" frame, node `230:4066`, y 1420-4120. Six project cards (Quotable, Denvo Hotel, Budget Pro Tracker, HR Management, Sanime, JobSea) in a 2-column grid, each: a 700px-tall image, title + description, and 3 tag chips.

- `portfolio-grid.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## Background

This section sits on the page's plain white background (`bg-background`), not a gray/dark surface — confirmed by reading the "Home Page" frame's own fill directly from Figma (white), since no covering rectangle spans this y-range. Don't add a gray backdrop here; that belongs to `what-we-create/` (Figma's `Rectangle 40`), which starts further down.

## Two normalizations made here (documented judgment calls)

1. **Title/description style.** Figma's own source is inconsistent: 5 of 6 cards hardcode `font-bold text-black` for the title and a literal `#3c3a3a` for the description, while only "Denvo Hotel" uses the file's real Heading/H3 + `text/secondary` tokens. All 6 cards here use the correct token-based style (`text-heading-3 text-foreground` / `text-body-md text-secondary`) — normalizing rather than reproducing what reads as a one-off authoring slip in the design file, consistent with this project's "components only reference the design system by name" rule.
2. **Tag chip background** (`#f2f2f1`) is kept as a literal one-off hex, not rounded to the nearest gray token — because Figma's own source doesn't bind it to a variable either (every other color on these cards is a bound variable; this one specifically isn't), so it reads as an intentionally separate, unlinked value rather than a token this project should adopt.

## Responsive

`grid-cols-1 md:grid-cols-2` — single column on mobile, 2-column from `md` (768px) up through desktop, matching the Figma tablet frame's own 2-column portfolio grid (node `253:1071`) exactly. Side padding is `px-5` (20px, matching the mobile frame) up to `md:px-10` (40px, matching both the tablet frame and the original desktop padding).

## Known gap

None of the 6 project screenshots (Figma nodes `230:4068`, `230:4081`, `230:4094`, `230:4107`, `230:4120`, `230:4133`) could be exported into this codebase — the sandbox this was built in can't reach Figma's asset-export host. Each card falls back to a bordered placeholder in the exact 700px slot until the real screenshots are exported and dropped at `public/images/portfolio/<slug>.png`, with `imageSrc` set per project in `lib/data/homepage.ts` (`PORTFOLIO_PROJECTS`).

The project descriptions are also identical across all 6 cards in the Figma file itself (placeholder copy, never swapped per project) — reproduced faithfully rather than invented; real per-project write-ups are a content task, not a layout one.
