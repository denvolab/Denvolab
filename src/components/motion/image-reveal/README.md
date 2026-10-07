# `image-reveal/`: Pictures Open From the Corner and Drift on Scroll

`ImageRevealController` (mounted once in `app/layout.tsx`) gives every box marked `data-image-reveal` the work-picture motion of produx.design, which the user asked for on every image on Oct 7, 2026 ("exact same vabe"). The values come from that site's own script:

| | produx.design | Here |
|---|---|---|
| Start | picture clipped to its bottom-left corner, `clip-path: inset(100% 100% 0% 0%)`, and 1.3x from its bottom-left corner | same: the clip on the frame, the 1.3x on the pictures in it (`--reveal-scale` + the `scale` property) |
| Trigger | once, when the picture's top passes 85% of the screen; already that high when the page opens: shown as is | 95% (sooner, Oct 7, 2026) |
| Reveal | clip opens to `inset(0)`, scale to 1, 1.7s `power4.out` | 1.1s `power4.out` (quicker, Oct 7, 2026) |
| Scroll drift | picture 110% of its frame (top -5%), `yPercent` -10 to +10 from "top bottom" to "bottom top", scrubbed | picture 110% (top -5%), drift ±4.5% (`translate` property): ±10% would open an empty strip on this site's shorter frames |

The drift is only on cover-cropped pictures whose frame clips them. The Work cards' ripple pictures (`data-ripple-image`) get the reveal but not the drift, because their frame deliberately doesn't clip (the hover bulge spills out).

Earlier versions: Oct 4, 2026 a juice.agency fade-and-rise (start at 70%, 0.8s `circ.out`, 5em), softened on Oct 7 to start at 92%, 1.1s `power2.out`, 4em, then replaced by the above.

## Files

| File | Job |
|---|---|
| `image-reveal-controller.tsx` | The controller. Per box: one `ScrollTrigger` for the reveal (`start: "top 85%"`, `once: true`) and one scrubbed one for the drift. When a box has arrived it gets `data-image-reveal="done"` and its inline styles are cleared, so it is back to plain CSS. A `ResizeObserver` on the page re-measures the trigger points when late pictures or fonts change the page height. Runs again after each page change. |
| `image-reveal.css` | The hidden start state, imported from `app/globals.css`. Only inside `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`, so with JavaScript off or "Reduce motion" on every picture is simply there. |
| `index.ts` | `export { ImageRevealController }` |

## Using it

Put the attribute on the **box that holds the picture** (its rounded frame), or on the whole card when the card is the picture plus some text:

```tsx
<div data-image-reveal="" className="relative aspect-[1008/672] overflow-hidden rounded-3xl">
  <Image src={...} alt={...} fill className="object-cover" />
</div>
```

Nothing else is needed: no import, no wrapper, and the box keeps its own classes. Don't put it on the `<Image>` itself when the frame has a border or background, or the empty frame would show first. Avoid it on a box that already has its own CSS `transform` or a `transition` on `transform`/`opacity`.

## Where it is used

| Page | Boxes |
|---|---|
| Homepage | Our Work pictures (`portfolio-grid`), What We Create cards (`what-we-create`) |
| `/services` | Service List pictures (`services-list`), Industries We Serve pictures (`industries-served`) |
| `/services/<slug>` | Hero picture or AI workflow drawing (`service-hero`), `service-practice`, `service-craft-split`, `service-showcase`, and the capability layouts with a picture (`service-capabilities`: editorial list card, list feature card, anatomy picture) |
| `/case-studies` | Our Work pictures (`portfolio-grid`) |
| `/case-studies/<slug>` | Hero picture or full cover (`case-study-hero`), every figure (`case-study-figure`), the collage tiles and cards (`case-study-collage`), the typography letter and panel (`case-study-typography`), the solution cards (`case-study-solution`), the wide picture under the process (`case-study-visual`) |
| `/about` | The team photo (`about-story`), the team portrait (`about-team`) |

**Left out on purpose:** pictures that already move (hero showreel card, About hero photos, marquees, the About values row, the logo and testimonial rows, the AI section, the About benefits rows that use `reveal`), and small icons, logos and avatars (About difference icons, case study fact icons and competitor logos, the contact sidebar photo, the footer logo), which aren't pictures in the "work card" sense.

## Checked (Oct 4, 2026)

Playwright on 12 pages at 1440px: every marked box below the first screen starts at opacity 0, every one ends at opacity 1 with no transform and `data-image-reveal="done"` after scrolling to the bottom, and no page errors. Screenshots during the reveal show the pictures fading up together, as on juice.agency.

## Smooth scrolling (Oct 7, 2026)

Nothing writes styles on every frame while the page scrolls. The reveal is a Web Animation: `clip-path` on the frame and `scale` on its pictures, with power4.out as `cubic-bezier(0.22, 1, 0.36, 1)`. The browser runs it off the main thread, so it can't stall Lenis. The drift is a CSS scroll-driven animation (`view-timeline: --image-frame` on the frame, `animation-timeline` on the picture) in `image-reveal.css`. Only browsers without `animation-timeline` get the scrubbed ScrollTrigger and `--reveal-drift`. Drifting pictures have `will-change: translate`, so they move as layers instead of being repainted.
