# `process-steps/` — "60 Days Process" Timeline

Figma: node `230:4248`, a 1120px column centered on the page's white background. An intro (eyebrow + 2-line heading) above a vertical progress rail and 6 week-by-week cards (Research → Ideation & Strategy → Style Guide & UI Design → Front-End Development → API Build and Implementation → Final Testing & Refinements).

- `process-steps.tsx` — the component (content from `lib/data/homepage.ts`)
- `index.ts` — barrel export

## A naming mismatch worth knowing about

Figma's own internal frame names for these cards ("Process Card / Week 5", "Process Card / Week 6", "Process Card / Week 7", "Process Card / Week 8") don't match the **visible badge text** inside them ("Week 3", "Week 4", "Week 5", "Week 6"). The visible badge is what a site visitor actually sees, so that's what `lib/data/homepage.ts` uses — the steps are Week 1 through Week 6, not Week 1/2/5/6/7/8. Don't "fix" the data to match the frame names; the frame names are the stale ones (almost certainly left over from reordering cards during design).

## Responsive

Single column at every width (matches the doc: cards are already content-dense, so mobile/tablet don't need a different arrangement, just narrower padding). The progress rail is `hidden lg:block` — neither the mobile nor tablet Figma frame shows a shared rail alongside the cards, only each card's own small icon slot.

## Known gap

The rail is stretch-to-fit (`self-stretch` on the rail column) rather than Figma's fixed 2720px track — that fixed height doesn't match the actual 6-card content height in the source file either, and stretching to fit is more robust if step copy ever changes length.

Every step's icon (6 total; several are multi-layer masked icon graphics in the Figma source, not single exportable SVGs) has no committed asset — same sandbox network limitation as the rest of `components/sections/`. Each renders as a plain bordered placeholder square until real icons are exported and wired in (this would need an `imageSrc`-style field added to `ProcessStep`, matching the pattern already used elsewhere in `lib/data/homepage.ts`).
