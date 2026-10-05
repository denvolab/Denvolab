# `service-faq/`

"Good questions. Clear answers." on every service page (Figma "FAQs / Interactive accordion", component "Service / FAQ accordion" with State=Open / State=Closed).

| File | What it is |
|---|---|
| `service-faq.tsx` | `ServiceFaq` (Server Component): heading column + the card list. |
| `faq-accordion.tsx` | `FaqAccordion` (Client Component): the cards and the open/close behaviour. |
| `index.ts` | Barrel export. |

## Layout

White, 96px top/bottom. Heading column 680px (optional eyebrow, title, description, "Let's talk"), card list 1080px, 80px apart.

Card: 1px border, 32px padding, radius 12. Question (H4, 960px) and a 32px plus/minus icon, 24px apart; the answer (Body/LG, 960px) 24px below. Open card: Brand/50 fill; closed card: white.

What changes per page (all in the data): the eyebrow (pages 03-07), description width (524 on 01-02, 680 on the rest), button (lime on 01-02, Gray/900 on 03-07), the gap between cards (32, 24 or 16) and the open card's border (lime focus border on 01-02, grey on 03-07).

## Behaviour

One card open at a time, the first one open on load, as the design shows. Clicking the open card closes it. Each question is a real button (`aria-expanded`, `aria-controls`), the answer a labelled region. The answer slides open with a CSS grid-rows transition, so nothing is measured in JS; with reduced motion it opens instantly. Closed answers stay in the HTML (search engines still see them) but are hidden from screen readers.

## Responsive (Oct 2026)

There is no Figma design below 1920 for these pages, so the smaller layouts follow the site-wide breakpoints (`md` 768, `lg` 1024, `xl` 1280). At 1920 nothing changed.

Cards use 20px padding on phones (32px from `md`); the heading column stacks above the cards below `xl`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.

## Page colour wash: dark-mode chips and shadow, round 2 (Oct 5, 2026)

In dark mode the FAQ items take the page colour (the one that is open when the page loads one shade lighter), and in their own light mode they keep their designed colours, including the lime background of whichever item is opened. Before this, a closed item was painted with the page colour, so an item opened later stayed white. Nothing in this folder changed for it; see "Tints" in `components/motion/color-wash/README.md`.
