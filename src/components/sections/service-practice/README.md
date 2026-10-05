# `service-practice/`

The UI/UX page's "Every request. A clear next step." (Figma component "3.1 / Study / UIUX device story", instance `701:14354`).

| File | What it is |
|---|---|
| `service-practice.tsx` | `ServicePractice` (Server Component). |
| `index.ts` | Barrel export. |

surface/secondary band, 860px tall at 1920, 80px top/bottom and 96px sides (wider than the 40px of the other sections, as in Figma). A 656px text column and the 1008 x 672 device picture (radius 24), 64px apart, vertically centred. The text column: title + intro (560px), then two numbered decisions (DM Mono index, H4 title, Body/MD benefit) between faint rules (text/primary at 12%).

The component also has a hidden eyebrow ("UI/UX IN PRACTICE") and a hidden caption in Figma. Hidden layers are not drawn.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Below `xl` the text column sits above the device picture.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the picture frame. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
