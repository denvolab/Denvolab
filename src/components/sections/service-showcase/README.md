# `service-showcase/`

One full-width picture (Figma "Craft / Service concept showcase" holding a single "Original / Service detail concept" image). Used on the branding, web and MVP pages.

| File | What it is |
|---|---|
| `service-showcase.tsx` | `ServiceShowcase` (Server Component). |
| `index.ts` | Barrel export. |

White, 96px top/bottom, 1840px wide picture with radius 12. Height from the data: 850 (branding, web) or 800 (MVP). The picture keeps that aspect ratio on narrower screens.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

The picture keeps its Figma proportions at every width.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the picture frame. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
