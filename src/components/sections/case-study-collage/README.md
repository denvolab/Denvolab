# case-study-collage

The tinted band of six tiles under the solution: three 599px columns at 1920 (Figma frame starts at x 3, so the left padding is 43px), 128px top and bottom.

- Left: pictures of 651 and 572px; middle: a 393px card over an 830px picture; right: pictures of 794 and 429px. Tiles keep these aspect ratios, and every column holds the same total, so the columns stay level at any width.
- The card is a brand card (page colour, project name in Inter Bold, one-line statement) or Job Sea's quote card (quote mark, quote, phone picture on the right). Card text uses container units (`@container` + `cqw`), so the card keeps its composition at every size.
- Below `xl` the column wrappers become `display: contents` and the tiles flow as a masonry: one column on phones, two from `md`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on every tile and both cards. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
