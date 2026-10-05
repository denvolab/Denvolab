# case-study-intro

The large centred statement under the facts cards: 968px wide, Display XL (60/68, -4%). Job Sea's version starts with a dark lead-in and the rest in gray-300.

`minHeight` (from xl) reserves the height the paragraph has in Figma, so the next picture starts at the same y on every page even when a sentence wraps to fewer lines.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The intro statement (the large `text-display-xl` paragraph, lead-in included) now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
