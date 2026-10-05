# `service-perspective/`

The MVP page's opening statement, "The right first version. Not every possible feature." (Figma "Perspective / Why this service", node `701:15090`).

| File | What it is |
|---|---|
| `service-perspective.tsx` | `ServicePerspective` (Server Component). |
| `index.ts` | Barrel export. |

White, 96px top/bottom. A 400px DM Mono marker ("01 / THE OPPORTUNITY"), 80px, then the title (Display/XL, 1260px box) and the body (Body/LG, 1000px), 32px apart.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Below `xl` the marker label sits above the title.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
