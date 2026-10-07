# `image-reveal/`: Pictures Rise Into Place on Scroll

`ImageRevealController` (mounted once in `app/layout.tsx`) gives every box marked `data-image-reveal` the work-card reveal from the two reference sites the user pointed at on Oct 4, 2026:

| Site | What it does | Taken from it |
|---|---|---|
| juice.agency | Each work card has `data-card-reveal`. When the card's top reaches 70% of the screen, once: `gsap.to(card, { opacity: 1, y: 0, duration: .8, ease: "circ.out" })`. | trigger point, duration, easing, plays once |
| zypsy.com | The work cards (`.fade-in`) start at `translate3d(0, 5em, 0)` with opacity 0. | the start position |

So a picture's frame starts lower and invisible, and the first time it comes onto the screen it fades and rises into place. A picture that is already on screen when the page opens (a hero image) plays straight away.

**Smoothed on Oct 7, 2026.** The user found the rise abrupt ("hut kore upore uthe asteche") and the page seemed to shake while scrolling. Measured with a real wheel scroll at 1440px: with juice.agency's values (start at 70%, 0.8s `circ.out`, 5em) a picture stayed invisible until its top was 70% down the screen and then moved ~15px ahead of the page in its first frame, because `circ.out` starts almost vertically. Now: start as the picture's top passes 92% of the screen, rise 4em, 1.1s `power2.out`, kept on the GPU (`force3D`) for the whole rise. The most a picture moves beyond the page in one frame dropped from 15.4px to 2.4px, easing out over about 35 frames, and frames stay at 13-14ms.

## Files

| File | Job |
|---|---|
| `image-reveal-controller.tsx` | The controller. One `ScrollTrigger` per box (`start: "clamp(top 92%)"`, `once: true`). When a box has arrived it gets `data-image-reveal="done"` and its inline styles are cleared, so it is back to plain CSS. A `ResizeObserver` on the page re-measures the trigger points when late pictures or fonts change the page height. Runs again after each page change. |
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
