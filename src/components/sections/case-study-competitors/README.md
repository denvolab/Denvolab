# case-study-competitors

My Crew's "Competitor Analysis": a gradient eyebrow, a 72px title and four columns (Facebook, Instagram, Snapchat, MyCrew) with UI/UX, Strength and Weakness notes. Logos are cropped from the Figma export (`public/images/case-studies/my-crew/logo-*.webp`).

Set in SF Pro through `--font-sf`: Apple devices show SF Pro as designed, other systems show Inter. Four columns from `xl`, two from `md`, one on phones. Figma starts the Facebook column 20px higher than the rest; here all columns start level.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Its one-off Figma text colours are written as `wash-ink [--ink:#hex]` instead of `text-[#hex]`, so they stay readable when the page colour wash turns the screen the other way. In the section's own colour they are exactly the same hex. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
