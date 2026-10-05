# case-study-facts

Three grey cards under the hero: Industry, Services and Scope (or Timeline). Each has a 64px line icon from `public/images/case-studies/icons/` (exported from Figma as SVG), a title and a value.

Figma quirk kept on purpose: the first card has 32px between icon and text, the other two 24px, so it is 8px taller; the row centres them vertically like Figma does.

Three columns from `md`, stacked below.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Its one-off Figma text colours are written as `wash-ink [--ink:#hex]` instead of `text-[#hex]`, so they stay readable when the page colour wash turns the screen the other way. In the section's own colour they are exactly the same hex. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
