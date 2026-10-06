# `animated-text/`: Headings That Rise In Line by Line

The heading animation of zypsy.com, which the user asked for on Oct 5, 2026: "Ekhane jevabe animation ache ami chai amar text gulao exact same vabe animated korbe", pointing at Zypsy's `<h2 js-line-animation="300">`. It replaced the juice.agency word-by-word fade from Oct 4.

Each line of the heading sits in its own clipping box and starts just below it. Once the whole heading is on screen, the lines slide up into place one after another. Scroll back up until the heading is below the screen and it resets, so it plays again the next time.

## The values (from zypsy.com's own script and CSS)

| | Value |
|---|---|
| Screen size | only when the window is at least 992px wide (Zypsy: `window.innerWidth > 991`); smaller screens show the plain text |
| Split | after the fonts are ready and a delay of 300ms (the `js-line-animation="300"` value), into lines: `<span class="line">` (`overflow: hidden; padding-bottom: .1em; margin-bottom: -.1em`) holding `<span class="line-inner">` |
| Trigger | ScrollTrigger on the heading, start `top bottom`, end `bottom bottom`, toggleActions `none play none reset`: plays when the heading's bottom comes into view, resets when its top goes back below the screen |
| Motion | every `.line-inner` from `yPercent: 110` to `0`, `duration: 1.25`, `ease: "expo.out"`, `stagger: { amount: 0.2, ease: "expo.out" }` |
| Before the split | `visibility: hidden` from 992px (Zypsy: from 991px, until its script runs) |
| Resize | split again when the window width changes (and when a late font loads) |

## Usage

Put it **inside** the heading, so the heading keeps its own tag, classes and styles:

```tsx
import { AnimatedText } from "@/components/ui/animated-text";

<h2 className="font-sans text-display-xl text-foreground">
  <AnimatedText>{title}</AnimatedText>
</h2>
```

`delay` (ms, default 300) changes the wait before the split, like Zypsy's attribute value. Children can be plain text or elements (a `<span>` with its own colour), and `\n` breaks in a `whitespace-pre-line` heading are kept.

## Files

| File | Job |
|---|---|
| `animated-text.tsx` | The component: waits for the fonts and the delay, splits, runs the GSAP timeline with the ScrollTrigger. Uses `gsap.matchMedia`, so crossing 992px (or turning "Reduce motion" on) puts the plain text back. |
| `split-lines.ts` | Cuts the text into its drawn lines (see below). `revert()` puts the original nodes back. |
| `animated-text.css` | The hidden state before the split, and the `.line` / `.line-inner` styles. Imported from `app/globals.css`. |
| `index.ts` | `export { AnimatedText }` |

## How the lines are cut

`split-lines.ts` reads where the browser already drew every word (a `Range` box per word on the untouched text), groups the words by line, then rebuilds each line, copying nested elements such as a coloured `<span>` into every line they reach. So the lines are exactly the lines on screen. GSAP's own SplitText was tried first and got the case study intro wrong (a lead in one colour, the rest in a nested span): it merged two lines, and the paragraph wrapped differently after the split.

While split, the wrapper is a block with a minimum width equal to the heading's content width, so a heading that sizes itself to its text (a centred heading in a flex column) keeps exactly its width.

## Checked (Oct 5, 2026)

- Every animated heading on all 23 pages at 1440px: the same size as without the split (within 1px). On the homepage, About, a service page and a case study, a screenshot after it has played is pixel-identical to the unsplit heading (apart from one kerning pixel pair in "The Challenge").
- Play, reset and replay sampled on the homepage's "We Make the Complex Simple in 60 Days": lines wait at 110% while the heading's bottom is below the screen, rise once it is in view (the second line 0.2s after the first), are back at 110% after scrolling up past it, and play again on the way down.
- 390px: nothing split, text shown. 1024px: split and animated.

## Where it is used

The section headings (`h2`) on every page: homepage (`what-we-create`, `ai-orbit`, `process-steps`, `comparison`, `testimonials`, `contact-cta`), About (`about-difference`, `about-values`, `about-team`), Services (`industries-served`), every service page (`service-perspective`, `service-practice`, `service-capabilities` in all six layouts, `service-process-steps`, `service-process-narrative`, `service-craft-split`, `service-checklist`, `service-handover`, `service-faq`), every case study page (`case-study-intro`, `case-study-process`, `case-study-competitors`, `case-study-challenge`, `case-study-solution`) and Contact (`contact-form`).

Since Oct 7, 2026 the body text of those sections uses it too (the user: "jeta title a ache seta paragraph text a o hobe"): the description / body `<p>` next to each animated heading, and the card and list descriptions inside the same sections, wrapped the same way (`<p className="..."><AnimatedText>{body}</AnimatedText></p>`). Eyebrows, step numbers, mono labels and form labels are left as they are.

## Where not to use it

| Case | Why |
|---|---|
| Hero headlines (`h1`) | Left as they are: they are on screen when the page opens. Zypsy has a separate "on load" version for those (`js-line-animation-onload`: same motion, plays after a delay instead of on scroll), not built here. |
| The About statement (`about-story`) | Already has its own scroll animation (`scroll-text-reveal`). |
| A heading that is a link with a hover underline (`services-list` titles) | The split breaks the link's text into separate lines. |
| Inside `LensDistortion` (`service-conversation`) | That band copies its HTML into a canvas once, while the lines are still below their masks. |
| `about-benefits` | Its heading already rises in with `reveal`. |
| `case-study-visual` | Its heading is made of separately styled runs (some gradient), and on desktop it is part of the picture. |
