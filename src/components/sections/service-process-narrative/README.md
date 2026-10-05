# `service-process-narrative/`

The dark "You should know what happens next." section that every service page has (Figma "05 / Process — decisions and tangible outputs", component "3.1 / Process row").

| File | What it is |
|---|---|
| `service-process-narrative.tsx` | `ServiceProcessNarrative` (Server Component). |
| `index.ts` | Barrel export. |

- Gray/900, 96px top/bottom. Left column 640px, right column 1120px, 80px apart.
- Left: optional lime label, the title (Display/XL, white), optional body (560px) and footnote label. Only the first block on the MVP page uses all four.
- Right: four rows, 64px apart. Number (Display/LG, lime, 112px), 32px, then the question label (DM Mono, Gray/300), title (H2, white), body (Body/LG, Gray/300, 880px) and, on the MVP page, the lime "YOU REVIEW / ..." output line. 24px under each row a Gray/700 rule.
- Figma calls the left column "Pin" and the block "Pinned chapter and rolling steps", so on desktop the left column is `sticky` and stays in view while the steps scroll past. It starts exactly where the static design has it.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Below `xl` the two columns stack and the left column no longer sticks. On phones the step number sits above its text instead of in a 112px column, and steps are 40px apart.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
