# ripple-image

A picture that ripples like water when the cursor moves over it. Use it anywhere on the site:
the homepage portfolio grid, an about page, a blog cover, a case study header.

The effect is rebuilt from the project pictures on 14islands.com.

## What happens on hover

1. **Edge wobble.** When the cursor crosses the edge of the picture, the outline near that
   spot jiggles like jelly, then settles in about one second. It dents inward when the cursor
   comes in and bulges outward when it leaves.
2. **Water ripple.** While the cursor moves over the picture, it leaves soft rings that bend
   the picture like looking through water. Faster movement bends it more. When the cursor stops,
   the picture settles flat.

## How to use it

```tsx
import { RippleImage } from "@/components/ui/ripple-image";

<RippleImage
  src="/images/about/team.jpg"
  alt="The DenvoLab team at work"
  sizes="(min-width: 768px) 50vw, 100vw"
  className="aspect-[3/2] w-full"
  imageClassName="rounded-2xl"
/>
```

| Prop | What it does |
| --- | --- |
| `src` | Image path, for example `/images/about/team.jpg`. |
| `alt` | Describes the picture for screen readers. |
| `sizes` | How wide the picture is on screen, so the browser downloads a sensible file size. `"(min-width: 768px) 50vw, 100vw"` means half the screen on tablet and up, the full screen below that. Default `100vw`. |
| `className` | Sizes the frame around the picture. **It needs a height or an aspect ratio**, for example `h-[700px] w-full` or `aspect-[3/2] w-full`. |
| `imageClassName` | Classes for the picture itself. **Put rounded corners here**, not on the frame. The effect copies the rounded corners of the picture. |
| `objectPosition` | How the picture is cropped when it's taller than the frame needs, same idea as CSS `object-position`. `"center"` (default) crops evenly top and bottom. `"top"` keeps the top of the picture and crops from the bottom instead. **Set this instead of adding `object-top` to `imageClassName` yourself** — this prop drives both the resting picture's crop and the hover canvas's crop together, so the picture is framed identically before, during and after hovering. Adding `object-top` only to `imageClassName` crops the resting picture correctly but leaves the hover canvas cropping from the center regardless, so the picture visibly jumps to a different part of itself the instant the effect starts (see "Fixed bugs" below). |
| `eager` | Load right away instead of when it scrolls near. Use it for a picture at the top of a page. |

It works inside server components and client components. Nothing else needs to be set up.

### Where it is used now

- `components/ui/project-card/`, the 14islands style card (picture effect plus label effect).
- `components/sections/portfolio-grid/`, the six project pictures on the homepage.
- `components/sections/what-we-create/`, the six service card pictures on the homepage (added Sept 23, 2026). Its cards keep `overflow-hidden` on the card itself (picture fills the whole bordered card with text overlaid, in a dense 3-column grid), which clips the edge-wobble's outward bulge at the card boundary but leaves the water-ripple bend inside the picture untouched — see that folder's own README for why. Uses `objectPosition="top"` (not `object-top` on `imageClassName`) so the resting crop and the hover crop always agree — see "Fixed bugs" below.

### Using it on a plain `<img>`

If a picture is not made with `RippleImage`, wrap it in an element with `position: relative` and a size,
then call the helper once:

```ts
import { attachRippleHover } from "@/components/ui/ripple-image";

const cleanup = attachRippleHover(frameElement); // call cleanup() to remove it again
```

`attachRippleHover` also takes an options object, `{ objectPosition: "center" | "top" }`, matching the
prop of the same name on `RippleImage` — pass it if the `<img>` uses `object-top`.

## Files

| File | What it does |
| --- | --- |
| `ripple-image.tsx` | The component. Builds the frame and the `<Image>`, and starts the effect. |
| `attach-ripple-hover.ts` | Decides WHEN the WebGL effect exists: creates it when the cursor enters, removes it after the cursor leaves. |
| `ripple-effect.ts` | Draws the picture with three.js and runs the effect. **All tweakable numbers are at the top.** |
| `ripple-shaders.ts` | The two small GPU programs (GLSL) that make the wobble and the ripple. Every step is commented. |
| `index.ts` | Lets you import with `@/components/ui/ripple-image`. |

Suggested reading order: `ripple-image.tsx`, then `attach-ripple-hover.ts`, then `ripple-effect.ts`, then `ripple-shaders.ts`.

## How it works, in plain words

1. **At rest it is a normal `<Image>`.** No WebGL runs, so the page loads fast and search
   engines see a normal image.
2. **When the cursor enters the picture,** `attach-ripple-hover.ts` loads three.js and a plain copy of the
   picture (only then), puts a transparent `<canvas>` over the picture, draws the picture on it, and hides the `<img>`.
3. **The picture is drawn on a flat sheet made of a 128 x 128 grid of points.**
   - The **vertex shader** nudges the points near where the cursor crossed the edge. That bends the outline (the wobble).
   - The **fragment shader** works out how "wet" each pixel is from the ripples the cursor left behind,
     and reads the picture from a slightly shifted spot. That bends the inside (the water).
4. **After the cursor leaves,** the ripples get 2 seconds to fade. Then the `<img>` is shown again and,
   a few frames later, the canvas is removed.

## How to change the feel

Open `ripple-effect.ts` and edit `RIPPLE_SETTINGS` at the top. This changes every picture on the site at once.

| I want to... | Change |
| --- | --- |
| Stronger or weaker water bend | `warp` |
| Ripples that last longer or vanish sooner | `fadeSpeed` (lower = longer) |
| Bigger rings | `dropSize` and `growSpeed` |
| More or fewer rings along the cursor path | `dropSpacing` (pixels between rings) |
| Deeper or shallower edge wobble | `edgeDepth` |
| Wider or tighter edge wobble | `edgeReach` and `edgeWavelength` |
| Switch off the edge wobble | `edgeDepth: 0` |
| Keep the canvas alive longer or shorter after leaving | `LINGER_MS` in `attach-ripple-hover.ts` |

## Fixed bugs (Sept 23, 2026)

Both found on the What We Create cards, the first spot to overlay ordinary page content directly on
top of a `RippleImage`. Both fixes live here, in the shared component, so every future use is
protected automatically.

- **Overlaid content disappeared behind the canvas on hover.** The hover canvas has an inline
  `z-index: 2` (see "No `overflow: hidden` on the frame" below for why it needs one). Without a
  stacking context of its own, that `z-index` competed directly against — and beat — any sibling
  content a caller overlaid on the frame, such as What We Create's card title, description and
  button, regardless of DOM order. Fixed by adding `isolate` (CSS `isolation: isolate`) to the
  frame `<div>`: this contains the canvas's `z-index` inside the frame's own stacking context, so
  the frame as a whole now stacks in plain DOM order among its siblings — meaning it renders below
  content that comes after it in the markup, as expected.
- **The picture visibly jumped the instant a hover started.** A caller cropping the resting `<img>`
  with `object-top` (for example by adding `object-top` to `imageClassName`) got a top-anchored crop
  at rest, but the WebGL shader's crop math was hardcoded to always center the crop. The instant a
  hover began, the visible part of the picture would jump from "top-aligned" to "center-aligned" (and
  jump back on leave). Fixed by adding the `objectPosition` prop (see the prop table above), which
  drives both the CSS crop and a new `uAnchorY` shader uniform together, so the two can never disagree.

## Good to know

- **It is close to 14islands, not a copy.** They draw the ripples with a brush image and a crossed
  wave pattern. This version computes rings and a radial wave directly, which is shorter and easier to read.
  The feel is the same: jelly edge on entry, water ripples while moving.
- **Give the frame a size.** The frame has no size of its own, because the `<Image>` fills it. Without a
  height or an aspect ratio in `className`, the picture collapses to nothing.
- **No `overflow: hidden` on the frame.** The canvas has to draw a little outside the frame so the
  edge can bulge (up to 60px). Keep some space around the picture, and put rounded corners on the picture
  itself with `imageClassName`. On the right side the canvas stops at the edge of the page, so a picture
  in the last column never makes the page wider (that made the horizontal scroll bar blink on every hover).
  A caller that needs `overflow: hidden` on its own outer wrapper (What We Create does, see that folder's
  README) can still have it there — just not between the frame and the canvas.
- **The frame isolates its own stacking context (`isolate`), on purpose.** This keeps the hover
  canvas's `z-index` from ever out-ranking a sibling a caller overlays on top of the frame. See
  "Fixed bugs" above.
- **Why it loads its own copy of the picture.** Next.js's `<Image>` gives the `<img>` several file sizes, and for
  those the browser reports a smaller size than the real file. WebGL then rejects the upload and the canvas
  stays blank. A plain copy reports its real size. It uses the same address, so the browser reuses the download.
- **Images from another domain** need `crossOrigin="anonymous"` on the image and CORS headers from
  that server, otherwise WebGL is not allowed to read the pixels. Images in your own `/public` folder are fine.
  If WebGL fails for any reason, the normal picture simply stays.
- **If nothing happens on hover,** open the browser console while `npm run dev` is running. A line that starts
  with `[RippleImage]` says why (Reduce motion is on, no WebGL, picture not loaded yet). Nothing is printed on the live site.
- **Touch screens and "reduce motion":** the picture effect is switched off. Nothing else changes for those visitors.
- **One WebGL canvas at a time.** Browsers allow about 16 at once, so the effect is created on hover and
  freed afterwards, instead of one per picture. A page can hold as many `RippleImage`s as it likes.
- **Two-step swap, on purpose.** The `<img>` and the canvas are never swapped in the same instant. On the way in the
  canvas appears first and the `<img>` is hidden 3 frames later; on the way out the `<img>` comes back first and the
  canvas is removed 3 frames later (`SWAP_FRAMES` in `attach-ripple-hover.ts`). A new canvas can take a frame or two to
  reach the screen, and a hidden `<img>` a frame or two to be drawn again, so a one-step swap made the picture flash.
  The `<img>` is also put back underneath the canvas 1.1 seconds after the cursor leaves (`WOBBLE_MS`), once the edge
  wobble is over, so the normal picture is already drawn long before the canvas goes away.
- **Slight softness difference.** The canvas resamples the picture a little differently from the browser, so it can
  look a hair different for a moment when the effect switches on.
- **Pictures with detail show the effect best.** A flat, single-color picture has nothing to bend.
