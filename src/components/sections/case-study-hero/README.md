# case-study-hero

The dark opening band of a case study page, plus My Crew's full-bleed cover.

- `CaseStudyHero`: tags, title, "Let’s Talk" and the hero picture. Figma draws a 1053px band that includes its own nav bar; the site header (77px, same colour) takes that space, so the band here is 976px tall at 1920 and nothing moves on screen.
- Desktop layout from `xl` (1280px): the text column and the picture keep their 741 : 1057 share of the 1840px content width. `textOffset` (Figma: 195px on most pages, 75 on the AI page) is turned into a percentage of that width, so the text stays level with the picture while the page narrows. Below `xl` the text stacks above the picture.
- The title uses `.cs-hero-title` (96/100, -4%, fluid down to 44px), defined in `styles/tokens/typography.css`.
- `CaseStudyCoverHero`: one full-bleed picture with an `sr-only` h1. The file starts 77px lower than the Figma artwork because the site header covers that strip.

Data: `lib/data/case-study/*`, types in `types/case-study.ts`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the hero picture frame (split layout) and the full-width cover picture (cover layout); both are on screen when the page opens, so they play straight away. See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
