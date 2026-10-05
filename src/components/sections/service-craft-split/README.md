# `service-craft-split/`

The SaaS page's dark showcase (Figma "Craft / Service concept showcase", node `701:14683`).

| File | What it is |
|---|---|
| `service-craft-split.tsx` | `ServiceCraftSplit` (Server Component). |
| `index.ts` | Barrel export. |

Gray/900, 96px top/bottom. A 632px text column next to a 1160 x 800 picture (radius 12), 48px apart. The column is as tall as the picture: title at the top, description (600px, Gray/300) at the bottom.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Below `xl` the text sits above the picture.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the picture frame. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
