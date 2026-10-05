# case-study-figure

One picture band: the overview shot, the billboard, the six stacked screens, and the AI / My Crew showcase pictures.

Data gives the picture's left edge `x`, `width` and `radius` in the 1920 Figma frame. From `xl` the picture sits at the same share of the page width; below `xl` it fills the content width, and full-bleed pictures (x 0, width 1920) always run edge to edge. The radius shrinks on small screens (never below 12px, or the design value if that is smaller).

Pictures are Figma exports at 1x (`public/images/case-studies/<page>/`), so they already contain any device frame, shadow or rounded backdrop.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the figure frame. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
