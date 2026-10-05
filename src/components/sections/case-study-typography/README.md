# case-study-typography

The type and colour band: a giant "A" in the product's font, a tinted panel with the font specimen and a picture, and four colour swatches.

- The "A" is Figma's own outline, exported as `public/images/case-studies/<page>/glyph.svg`. Figma clips the letter at its 567 x 702 box; the SVG's viewBox does the same.
- Specimen fonts: SF Pro (Denvo Hotel, Pro Budget Tracker), Inter, Roboto, Frank Ruhl Libre, DM Sans (Metro HR, Job Sea). SF Pro is Apple's system font and cannot be hosted, so it shows on Apple devices and falls back to Inter elsewhere (`--font-sf`).
- From `xl` the panel is a size container: the specimen's size, line height and position are container units of its 1213px width, so the whole panel scales as one piece. Below `xl` the text sits above the picture at a normal reading size.
- Swatches carry their hex code for screen readers.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the letter box and the specimen panel. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
