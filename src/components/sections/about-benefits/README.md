# `about-benefits/` — "Benefits of working with us"

Figma: "About us" frame, node `431:6359`. A dark block with a heading and one line of text at the top, then four rows, each with a big line icon, a title and a paragraph.

- `about-benefits.tsx` — the section (content from `lib/data/about.ts`)
- `about-benefits.module.css` — the icon spin
- `index.ts` — barrel export

## Layout

The heading (60/68) and the 22/34 paragraph share one row and are centered against each other. Each list row has a 1px top border and 48px top and bottom padding. On desktop the 100px icon sits in a column 509px wide (28.3% of the row), then the title and the paragraph are two equal columns with a 48px gap, the title centered against the paragraph. Below `lg` the title sits over the paragraph, and below `md` the icon sits on top of both.

Figma top-aligns the icon in three rows and centers it in one. All four are top aligned here.

## Motion

Adapted from Figma's 5.2 second loop. The heading and the paragraph fade in and rise (46px and 30px), then each row does the same one after the other (120ms apart), and the row's icon makes one full turn, clockwise or counter-clockwise (`spin` in the data, alternating down the list). It plays once when the block scrolls into view instead of looping, so nothing keeps moving while someone reads. The fade comes from `components/ui/reveal/`; the spin is in the CSS module and starts from the `data-in="true"` attribute that `Reveal` sets. All of it is off for reduced motion and without JavaScript.

## Colors

The paragraph gray (`#aab4be`) is a Figma one-off that sits between two gray steps, so it keeps its hex. The row border uses `gray-600` (Figma's `#53616e` is one shade off it).

## Icons

Four real SVGs exported from Figma, in `public/icons/about/`: `benefit-time-zones.svg`, `benefit-impossible.svg`, `benefit-flexible-terms.svg`, `benefit-full-spectrum.svg`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Its one-off Figma text colours are written as `wash-ink [--ink:#hex]` instead of `text-[#hex]`, so they stay readable when the page colour wash turns the screen the other way. In the section's own colour they are exactly the same hex. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
