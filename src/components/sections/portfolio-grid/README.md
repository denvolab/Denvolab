# `portfolio-grid/` — Project Showcase Grid

Figma: "Home Page" frame, node `230:4066`, y 1420-4120. Six project cards (Quotable, Denvo Hotel, Budget Pro Tracker, Automation Manager, Sanime, JobSea) in a 2-column grid, each: a 700px-tall image, title + description, and 3 tag chips.

- `portfolio-grid.tsx` — the component (content from `lib/data/homepage.ts`). Each project picture is a `RippleImage` (`components/ui/ripple-image/`): it ripples like water when the cursor moves over it.
- `index.ts` — barrel export

## Hover label and links (Oct 2026)

Each project's `href` points at its case study page (`/case-studies/<slug>`). On hover (and keyboard focus) the picture shows a label: lime "View project" for a project with a page, dark "Coming soon" for one without (`href: null`, today Quotable and Sanime). A "Coming soon" card is not a link. On touch screens, where there is no hover, the label is always visible.

The component takes an optional `projects` prop. The homepage uses the default six; the Case Studies page passes `getCaseStudyGridProjects()` (the six plus the seven other case studies).

Figma replaced "HR Management" with "Automation Manager - Manage everything Automatically" on the homepage grid (picture `716:6235`, now `public/images/portfolio/automation-manager.png`); its case study is the AI Assistant page. `hr-management.png` is kept but no longer used.

## Background

This section sits on the page's plain white background (`bg-background`), not a gray/dark surface — confirmed by reading the "Home Page" frame's own fill directly from Figma (white), since no covering rectangle spans this y-range. Don't add a gray backdrop here; that belongs to `what-we-create/` (Figma's `Rectangle 40`), which starts further down.

## Two normalizations made here (documented judgment calls)

1. **Title/description style.** Figma's own source is inconsistent: 5 of 6 cards hardcode `font-bold text-black` for the title and a literal `#3c3a3a` for the description, while only "Denvo Hotel" uses the file's real Heading/H3 + `text/secondary` tokens. All 6 cards here use the correct token-based style (`text-heading-3 text-foreground` / `text-body-md text-secondary`) — normalizing rather than reproducing what reads as a one-off authoring slip in the design file, consistent with this project's "components only reference the design system by name" rule.
2. **Tag chip background** (`#f2f2f1`) is kept as a literal one-off hex, not rounded to the nearest gray token — because Figma's own source doesn't bind it to a variable either (every other color on these cards is a bound variable; this one specifically isn't), so it reads as an intentionally separate, unlinked value rather than a token this project should adopt.

## Responsive

`grid-cols-1 md:grid-cols-2` — single column on mobile, 2-column from `md` (768px) up through desktop, matching the Figma tablet frame's own 2-column portfolio grid (node `253:1071`) exactly. Side padding is `px-5` (20px, matching the mobile frame) up to `md:px-10` (40px, matching both the tablet frame and the original desktop padding).

## Project pictures

The 6 pictures in `public/images/portfolio/` (`quotable.png`, `denvo-hotel.png`, `budget-pro-tracker.png`, `hr-management.png`, `sanime.png`, `jobsea.png`) are the real project screenshots, exported from Figma (nodes `230:4068`, `230:4081`, `230:4094`, `230:4107`, `230:4120`, `230:4133`) at 3x, 2702 x 2100 each. Next.js resizes them for every screen, so the big files are only downloaded by the server, never by visitors.

To swap one, save the new file over the same name. A different extension also works, change it in `PORTFOLIO_PROJECTS` in `lib/data/homepage.ts`. Set a project's `imageSrc` to `null` to show the bordered "coming soon" box for that card instead.

**If an old picture still shows after you replace a file:** in `npm run dev`, Next.js keeps its resized copies for up to 4 hours (folder `.next/dev/cache/images`) and does not look at the original file in that time. Stop the server, delete `.next/dev/cache/images`, start it again, then hard refresh (Cmd+Shift+R). A production build is not affected by this.

The frame is a fixed 700px tall and the picture fills it (`object-cover`), so on screens narrower than the 1920px design a little of the left and right edge is trimmed. Use `aspect-[900/700]` in place of `h-[700px]` in `portfolio-grid.tsx` to always show the whole picture.

The project descriptions are also identical across all 6 cards in the Figma file itself (placeholder copy, never swapped per project) — reproduced faithfully rather than invented; real per-project write-ups are a content task, not a layout one.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on each project picture (the ripple hover and the label are unchanged). See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
