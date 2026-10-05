# `about-values/` — "Our values shape the work we do"

Figma: "About us" frame, node `431:6304`. A centered heading over a row of six cream cards that scrolls sideways forever.

- `about-values.tsx` — the whole section (heading + the looping row), a Server Component
- `index.ts` — barrel export

## Layout

Cards are 400px wide and 660px tall with 16px gaps, 4px corners and a `#f9f8e4` fill. Inside a card: the label, a square illustration (352px), and one line of text, spread top to bottom. On phones the card is 82% of the screen wide so the next card peeks in.

## The loop — a true CSS marquee

This is the same technique as the homepage's `marquee-tagline/` strip (see that component's README for the full explanation), not a scrollable carousel: Figma's source shows the six cards only once, so the row here renders them **twice** back to back in one `w-max` flex track inside an `overflow-hidden` wrapper, then animates the track `translateX(0 → -50%)` with the shared `animate-marquee-scroll` keyframe from `app/globals.css`. Because the track is exactly two copies wide, sliding by half its width always lands on the seam between copy 1 and copy 2, so the loop is invisible and the motion never pauses or steps — it just scrolls, continuously, forever.

Six wide cards of real copy read slower than the tagline's short repeating phrases, so this strip overrides the shared animation's duration with `[animation-duration:70s]` on the track — a judgment call, same situation the tagline's own default duration (38s) was in. Tune it there if 70s ever feels too fast or slow.

The second copy of cards is marked `aria-hidden` and `inert` so a screen reader only ever announces the six cards once (the tagline doesn't need this, since its content is a decorative repeating phrase — these cards carry real copy, so it matters here).

Being pure CSS, this needs no client-side JavaScript at all — no Client Component, no scroll listeners, no timers. `prefers-reduced-motion: reduce` pauses it automatically via the same site-wide override in `app/globals.css` that pauses every other marquee. Without JavaScript the row still renders and still loops, since the animation is CSS, not script-driven.

### What this replaced

Earlier versions of this section used a natively-scrollable, drag/swipe carousel (three duplicated copies, snap points, a hidden scrollbar, and a JS `setInterval` that stepped one card every 4 seconds). That was replaced because it read as a discrete step-then-pause carousel rather than a true marquee. This version has no scrollbar, no snap points, no drag-to-scroll, and no autoplay timer to reason about — the row is simply always moving, exactly like `marquee-tagline/`.

## Judgment calls

- **Cards 3 to 6.** In Figma they are 650px tall and pack their content to the top, while cards 1 and 2 are 660px and spread it out. That looks like drift, so every card uses the card 1 style.
- **Label font.** Figma sets the label in a mono font. The site keeps mono for captions only, so it uses DM Sans Label/MD in capitals.
- **Copy.** The one-line descriptions are reproduced exactly from Figma but do not match their labels (CURIOSITY talks about "quality products", COMMUNITY repeats the AUTHENTICITY line). They look like placeholder copy. Fix them in `lib/data/about.ts`.
- **Marquee speed.** 70s per loop, no timing spec in Figma — see "The loop" above.

## Illustrations (added Sept 23, 2026)

Figma's own 1254 x 1254 image fills for these six cards could never be exported (see the Known asset gap in `sections/README.md`). Instead, the user supplied 6 real illustrations, a matching 3D-render icon set on the same cream background as the cards (`#f9f8e4`), one per value and already named to match (one, `Craftmanship.png`, was a typo for Craftsmanship, corrected on the way in). Saved at `public/images/about/values/<slug>.png` and wired into `imageSrc` for each item in `VALUES` in `lib/data/about.ts`:

| File | Card | Illustration |
|---|---|---|
| `curiosity.png` | Curiosity | a keyhole opening onto a starfield of planets |
| `craftsmanship.png` | Craftsmanship | a chisel carving a stone block into a soap-dish shape |
| `gritty.png` | Gritty | a weathered brass compass |
| `authenticity.png` | Authenticity | a wax seal stamped with the Denvo Lab "D" |
| `community.png` | Community | four interlocking wristbands in different colors |
| `passion.png` | Passion | an hourglass with vivid yellow-green sand |

No layout change was needed: the card's illustration slot already uses `next/image` with `fill` + `object-contain` inside an `aspect-square` box (unlike `what-we-create/`'s cards, which needed an `object-top` fix for their `object-cover` photos — see that folder's README), so any reasonably square image drops in cleanly regardless of its exact pixel size.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
