# `about-difference/` — "What makes us different from others"

Figma: "About us" frame, node `431:6247`. A dark block with the heading on the left and six cards in a 2 x 3 grid on the right.

- `about-difference.tsx` — the section (content from `lib/data/about.ts`)
- `index.ts` — barrel export

## Layout

Cards are `gray-800` with a `gray-700` border and 16px corners. Cards in the same row are the same height and their content is centered inside, which is why a card with a shorter description sits a little lower. That is how Figma does it too.

The side-by-side layout needs about 1500px, so it starts at `2xl` (1536px). Below that the heading sits on top and the cards fill the width: two columns from `md`, one column on phones, with smaller card padding.

## Icons

The six line icons are real SVGs exported from Figma, in `public/icons/about/`: `difference-user-centric.svg`, `difference-expert-team.svg`, `difference-transparent-process.svg`, `difference-responsive-agility.svg`, `difference-strategic-innovation.svg`, `difference-data-driven.svg`. They are wired in `lib/data/about.ts`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.

## Page colour wash: light version of the cards (Oct 5, 2026)

When a light section is the active one, this dark section is shown in light colours. The user's rule for it: "card er bg surface secondary thakbe and text color icon color primary hobe. secondary text color could be as it is."

- **Card:** a tint (the colour wash controller marks it; it has no picture in it now) with `--wash-tint-alt` set to surface/secondary, so it is gray-100 on the light page. Its border follows the ramp flip (gray-700 to gray-300).
- **Title:** `text-foreground-inverse` already turns gray-950, the text primary colour.
- **Description:** `text-foreground-disabled` turns gray-600, the light theme's text secondary, so it stays a secondary colour.
- **Icon:** the six SVGs (single lime stroke, `#DFE94C` = `brand-600`) are now drawn as CSS masks on a `<span>` coloured `text-brand-600`, and under the wash that colour is mixed to the text primary colour by `--wash-p`. An `<img>` can't change colour, a mask can. In the dark colour the icon is the same lime (pixel check against the SVG drawn as an image: mean difference 1.1/255, edge anti-aliasing only).

In the section's own dark colour everything is exactly as designed (checked: 0 colour differences at 1440 and 390px). See `components/motion/color-wash/README.md`.
