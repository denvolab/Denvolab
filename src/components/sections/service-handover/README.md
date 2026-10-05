# `service-handover/`

"The handover is part of the product." on the UI/UX, mobile and MVP pages (Figma "06 / Deliverables — a usable handover", component "3.1 / Deliverable row").

| File | What it is |
|---|---|
| `service-handover.tsx` | `ServiceHandover` (Server Component). |
| `index.ts` | Barrel export. |

White, 96px top/bottom. Left 640px: optional label (MVP page), title, body (560px). Right 1120px: six rows 48px apart. A row = grey DM Mono index (64px), title (H3, 320px), body (Body/LG), 32px between them; 24px under it a Gray/200 rule.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Below `lg` each row stacks: index, title, then body (the 320px title column would squeeze the body on tablets).

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
