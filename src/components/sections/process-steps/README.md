# `process-steps/` — "60 Days Process" Timeline

Figma: node `230:4248`, a 1120px column centered on the page's white background. An intro (eyebrow + 2-line heading) above a vertical progress rail and 6 week-by-week cards (Research → Ideation & Strategy → Style Guide & UI Design → Front-End Development → API Build and Implementation → Final Testing & Refinements).

- `process-steps.tsx` — the component (Server Component; content from `lib/data/homepage.ts`)
- `process-rail.tsx` — the progress rail beside the cards, split into its own Client Component because it's the only part of this section that scroll-animates (see below)
- `index.ts` — barrel export

## A naming mismatch worth knowing about

Figma's own internal frame names for these cards ("Process Card / Week 5", "Process Card / Week 6", "Process Card / Week 7", "Process Card / Week 8") don't match the **visible badge text** inside them ("Week 3", "Week 4", "Week 5", "Week 6"). The visible badge is what a site visitor actually sees, so that's what `lib/data/homepage.ts` uses — the steps are Week 1 through Week 6, not Week 1/2/5/6/7/8. Don't "fix" the data to match the frame names; the frame names are the stale ones (almost certainly left over from reordering cards during design).

## Responsive

Single column at every width (matches the doc: cards are already content-dense, so mobile/tablet don't need a different arrangement, just narrower padding). The progress rail is `hidden lg:block` — neither the mobile nor tablet Figma frame shows a shared rail alongside the cards, only each card's own small icon slot.

## Scroll-linked progress fill (`process-rail.tsx`)

The user sent a reference site's "Our Work Process" section (a similar week-by-week timeline, 4 weeks/30 days there vs. our 6 weeks/60 days) and asked for its exact rail animation: a badge fixed at the top of the track, and a colored fill inside the gray track that grows from 0% to 100% height as the visitor scrolls past the section, rather than playing on a timer. The reference's own markup makes the intent explicit (`.process-timeline-active` ships inline-styled `height: 0%`, animated on scroll).

Built with GSAP's `ScrollTrigger` plugin (`gsap/ScrollTrigger`, registered once in this file) — a `scrub: 0.6` tween on the fill's `height`, `trigger` the rail itself. `scrub` ties the fill directly to scroll position (not elapsed time), so it works at any content length without retuning a duration.

### The structure is copied from the reference's own DOM/CSS, verified live

Two earlier cuts (a timing-sync fix, then a pixel-rate-matching fix) each solved a real, user-reported bug, but both were compensating for an architecture that didn't have to have that bug in the first place. The user eventually asked to inspect the reference site's *actual* timeline code and match it exactly rather than keep patching an independent reimplementation. Its pasted HTML only had `.process-bar` / `.process-timeline` / `.process-timeline-active` markup, not the CSS that positions them — so rather than guess, the reference's live DOM was inspected directly (`getComputedStyle` + `getBoundingClientRect` on designmonks.co/services/ui-ux). That inspection found:

```
.process-bar { display:flex; flex-direction:column; align-items:center; position:sticky; top:100px; }
  svg.process-logo { width:56px; height:56px; }                 /* badge — plain flow child */
  .process-timeline { position:relative; width:4px; height:385px; }   /* FIXED height, not stretched */
    .process-timeline-active { height:0%; /* -> 100%, GSAP scrub */ }
```

The load-bearing fact: **the badge and the track are not two independently-positioned elements** — they're both plain, static-flow children of one `position: sticky` box, and the track has a small, *fixed* CSS height rather than stretching to match the whole card column. Confirmed by scrubbing the live page and sampling `getBoundingClientRect()` at many scroll depths: the fill's height reaches ~100% at the exact scroll offset the sticky box itself naturally releases (i.e. the trigger is `top top+=100` / `bottom top+=100` against the card column — nothing to do with the badge or fill's own geometry).

`process-rail.tsx` now mirrors this directly: one `sticky` flex column (`top: firstCardTopPx`, same offset the `<li>`s use) contains the badge, then a track (`TRACK_HEIGHT_PX`, a chosen constant — 320px, the same role as the reference's 385px) with the fill absolutely positioned inside it. `ScrollTrigger`'s `start`/`end` are both keyed to the rail's own top/bottom at `firstCardTopPx`, tweening the fill's height from `0` to `TRACK_HEIGHT_PX`.

**Why this eliminates the whole bug class, instead of just this instance of it:** the fill is `position: absolute; top: 0` *inside* the track, tweened only up to the track's own fixed height. `fillBottom = trackTop + fillHeight`, and `fillHeight` is mathematically capped at `TRACK_HEIGHT_PX`, so `fillBottom` can never exceed `trackBottom` — regardless of how the `ScrollTrigger` start/end end up tuned. There's no separate rate to keep matched to the badge's position anymore, because the badge isn't independently positioned at all; it's the first child of the very same sticky box the track lives in. Verified via Playwright across the full scroll range (before card 1 sticks, through 3000px past release): `fillBottom - trackBottom` is negative or zero at every single sample, never positive — confirmed visually with screenshots at two different scroll depths (mid-scroll and just before release) showing the dark segment stopping well short of the track's own end, nowhere near the badge.

### What earlier cuts got right (kept) and what they got wrong (replaced)

- **Kept:** the fill start is synced to card 1's own sticky offset (`firstCardTopPx`, the same `PROCESS_CARD_STICKY_TOP_PX` the `<li>`s use for their own `top`), not an independently-tuned guess.
- **Replaced:** the badge used to be its own separately `sticky`-positioned element, with the fill as a second, independent `absolute` overlay spanning the *entire* rail height (`self-stretch`, matching the `<ol>`'s full un-stacked height, ~2116px). That's what caused both prior bugs — a timing-sync one (start/end drifting from the badge's actual sticky range) and then a rate one (a `0%→100%`-of-2116px tween scrubbed over the actual ~1676px the badge stays visible for grows faster, in viewport pixels, than the badge's position recedes, so the fill overshot the badge by ~440px at the low point). The second bug was fixed correctly at the time (tying the tween to an absolute pixel height matching the rail's own measured height, `end: "+=railHeightPx"`), which is mathematically sound — but only necessary because badge and fill were separate, independently-positioned things that *could* drift. The current structure removes that possibility by construction instead of computing around it. `lastCardTopPx` and the rail's own `getBoundingClientRect()`-based `railHeightPx` measurement are both gone; `TRACK_HEIGHT_PX` is a fixed constant instead.

## Sticky stacked cards (`process-steps.tsx`)

After the rail's badge was fixed, the user clarified what "sticky" actually meant for this section: not just the badge, but the **cards themselves** — "sticky the card, one card overlap with second card, then working gradually." I.e. the classic stacked-card scroll effect: each card locks in place as you scroll to it, then the next card slides up and covers it, with a sliver of every earlier card's top edge left peeking out beneath the stack, rather than the cards just scrolling past each other in a plain list.

Pure CSS, no JS — `position: sticky` already *is* scroll-driven, so there's no `ScrollTrigger` involved here (unlike the rail's fill). Each `<li>` gets `sticky` plus an inline `style={{ top, zIndex }}`: `top` is `PROCESS_CARD_STICKY_TOP_PX + index * PROCESS_CARD_STACK_OFFSET_PX` (96px, then +24px per card) so consecutive cards don't stick at the exact same spot — the small stagger is what produces the "fanned deck" peek instead of one card perfectly and invisibly replacing another — and `zIndex: index + 1` makes the paint order (later card on top) explicit instead of relying on DOM order alone. Verified via Playwright: scrolling into the section shows multiple cards simultaneously stuck at their respective offsets with overlapping y-ranges (confirming the visual stack), and scrolling further brings each subsequent card fully to its resting offset in turn.

Not gated behind `prefers-reduced-motion` — unlike the rail's GSAP tween or the hero's cursor tracking, this is native browser scroll-linked positioning with no animated tween of its own to skip.

## Known gap

The rail is stretch-to-fit (`self-stretch` on the rail column) rather than Figma's fixed 2720px track — that fixed height doesn't match the actual 6-card content height in the source file either, and stretching to fit is more robust if step copy ever changes length.

All six process icons now use the original Figma SVG assets in `public/icons/process/`. `process-icon.tsx` positions multi-layer icons inside their native 64px slots without redrawing or flattening the vectors. The progress rail uses the original 36px Denvo mark instead of the previous AI text. Asset layers were visually checked in a local composite; production build and lint passed. Sticky card and progress animations are preserved.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.

## Page colour wash: fades, chips and tints (Oct 4, 2026)

When the page colour wash turns the page dark, the Week chip, the task chips and the icon tile become one shade lighter than the card (the card itself washes with the page), as the user asked: "card er chip and icon background ... 1 shade light hobe in dark color mood, light a ja ache tai thakbe". In light mode they are exactly as designed. The controller marks them `data-wash-tint`; nothing in this folder sets it. The rail track in `process-rail.tsx` carries `data-wash="keep"`, so it and its olive progress fill stay as designed in both modes and the progress stays visible. See `components/motion/color-wash/README.md`.

## Page colour wash: dark-mode chips and shadow, round 2 (Oct 5, 2026)

The user still saw light chips on the dark page and asked for a black shadow too: "Blck veersion a chip and icon er background card er background theke 1 shade light hobe. And shdow tao black hobe." The chip and icon-tile colours are now plain colours set by the colour wash (the first version used a CSS overlay that didn't show in the user's browser): in dark mode the card is the page colour and the Week chip, task chips and icon tile are one shade lighter. The card's pale `rgba(201,201,201,0.17)` shadow turns black (45%) in dark mode (`data-wash-shadow`, set by the controller). In light mode all of it is exactly as designed. Nothing in this folder changed for it; see `components/motion/color-wash/README.md`.
