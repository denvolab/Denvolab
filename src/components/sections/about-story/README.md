# `about-story/` — The Statement, the Photo and the Numbers

Figma: "About us" frame, node `431:6225` (the white block under the marquee).

- `about-story.tsx` — the section (content from `lib/data/about.ts`)
- `index.ts` — barrel export

## Layout

The block is 1530px wide. The heading (72/80, semibold) sits in a 1216px box, left aligned, with the box centered. 180px below it is the row: a 743 x 848 photo with 24px corners and a 744px text column, 40px apart. The text column is centered against the photo: two paragraphs (24/32, semibold, gray), then two stats. Each stat is a big number (96px, regular) with its label under it on the left and a 314px description on the right, centered against each other.

Below `xl` (1280px) the photo and the text stack. The heading uses the smaller `display-xl` size until `xl`, then `display-2xl`.

## Photo

A real team photo (not a Figma export, Figma's own image fill for this section could not be downloaded, see the Known asset gap in `sections/README.md`), supplied by the user and saved as `public/images/about/story.png`, wired in via `imageSrc` on `STORY.image` in `lib/data/about.ts`.

## Heading (added Sept 23, 2026)

The statement heading (`story.heading`) is wrapped in `ScrollTextReveal` (`src/components/ui/scroll-text-reveal/`) instead of rendering as plain static text: its words dim on mount and light up one by one as the section scrolls through the viewport. Reference: studiors.be's "(The principle)" `.stud-say__text` effect, see `claude/motion-interaction-references.md` reference 7. The `<h2>`'s own className (size, color, max width) is unchanged; only the text node inside it changed from `{story.heading}` to `<ScrollTextReveal text={story.heading} />`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

Pictures rise into place (from 5em lower, fading in, 0.8s) the first time they reach 70% of the screen: `data-image-reveal` is on the team photo frame (the statement keeps its own `scroll-text-reveal`). See `components/motion/image-reveal/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
