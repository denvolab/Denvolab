# case-study-visual

Diagram-like bands on the AI Assistant and My Crew pages: the design process wheel, the user research rings, the two type and colour specimens and My Crew's project timeline.

- From `xl` the band is the Figma artwork exported at 1920px (`image` in the data), so rotated shapes, glass swatches and SF Pro lettering look exactly as designed.
- Below `xl` the same content is shown as real text (`content`): phases as cards, research numbers as a list, the specimen as font name, notes, weights and colour chips.
- The text version stays in the page at every size (`xl:sr-only`), so screen readers and search engines always read real text; the artwork is marked decorative.

To change the copy, update both the data (`content`, `title`, `subtitle`) and the artwork in Figma, then re-export the picture.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the wide desktop picture. See `components/motion/image-reveal/`.

Its one-off Figma text colours are written as `wash-ink [--ink:#hex]` instead of `text-[#hex]`, so they stay readable when the page colour wash turns the screen the other way. In the section's own colour they are exactly the same hex. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
