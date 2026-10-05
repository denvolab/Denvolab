# `comparison/` — "What Do You Get By Choosing Denvo Lab?"

Sits between `process-steps/` (the timeline) and `testimonials/` on the homepage.

## Where this came from

Unlike every other section in `sections/`, this one has no corresponding Figma node — it wasn't part of the original Home Page frame. The user provided two screenshots of a comparison-table section from a different design agency's own marketing site ("Musemind") and asked for the same section, added to this page. The layout, row structure, and copy are reproduced from that reference; only the branding changed (the left column reads "Denvo Lab" instead of the reference's own name), and every color/spacing/type value pulled from this codebase's own design tokens (`styles/tokens/`) rather than the reference's.

## Content

`getComparisonContent()` / `getComparisonRows()` in `lib/data/homepage.ts` — six rows, matching the reference exactly:

1. The best design talent — both
2. Designers with expertise in design for SaaS — Denvo Lab only
3. Team scaling on demand — Denvo Lab only
4. Dedicated account manager — Denvo Lab only
5. It takes days from project request to start — both
6. 3-day FREE trial — both

## The CTA button

The reference's rounded, solid-black "Book an Intro Call →" pill doesn't match any existing `Button` variant (`primary` is the lime brand button, `secondary` is a dark filled rectangle, `ghost` is a text link) — it's a shape unique to this one section, not part of the site's actual Button component spec. Rather than adding a one-off variant to the shared design-system component, it's a plain inline `<a>` using `bg-foreground`/`text-background`, which resolves to the same "solid dark pill, light text" look through this site's own tokens.

## Responsive

No separate mobile/tablet layout — the two-column grid holds at every width; below `sm` the row padding, gap, and check/x icon size step down and text drops to `text-body-sm` so a wrapping feature name (e.g. "Designers with expertise in design for SaaS") doesn't crowd the row on a narrow phone. The heading + CTA row stacks and centers below `lg`, matching the header treatment used by `process-steps/` and `testimonials/`.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
