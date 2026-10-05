# `service-checklist/`

"Everything your team needs next." on the SaaS, web and AI agent pages (Figma "Deliverables / Built to be used").

| File | What it is |
|---|---|
| `service-checklist.tsx` | `ServiceChecklist` (Server Component). |
| `index.ts` | Barrel export. |

White (Brand/50 on the web page), 96px top/bottom. Left 640px: optional eyebrow + title. Right 1120px: six rows 48px apart with a border/primary rule under each (the last one too). A row = 32px check glyph, the format label (DM Mono, grey, 210px) and the deliverable (H4), 24px apart.

The SaaS page centres the row items vertically, the web and AI agent pages align them to the top (so the label sits 6px higher there). Both are as in Figma (`rowAlign` in the data).

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

On phones the format label sits above the deliverable (a 210px label column would leave the deliverable about 60px wide at 390px) and rows are 24px apart. From `md` the Figma row returns.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
