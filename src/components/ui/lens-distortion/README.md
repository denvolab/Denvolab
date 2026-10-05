# `lens-distortion/`

`LensDistortion` applies Figma's "Lens distortion" shader effect to its children, the way Figma applies it to a frame. Used by `sections/service-conversation`.

```tsx
<LensDistortion aberration={0.03} className="bg-brand-default">
  ...normal HTML...
</LensDistortion>
```

| File | What it is |
|---|---|
| `lens-distortion.tsx` | The Client Component: sets up WebGL2, decides when to render, swaps the HTML for the result. |
| `lens-shader.ts` | The shader, ported line by line from Figma's own source (community shader 1650660511777647690, version 607). |
| `rasterize.ts` | Draws the children (background, button shapes, text) onto a 2D canvas so the shader has a picture to work on. |
| `index.ts` | Barrel export. |

## How it works

1. The children render as plain HTML first, so text is real, links work and nothing depends on JavaScript.
2. Once the fonts have loaded and the band is near the screen, `rasterize()` draws the HTML onto a canvas. Each character is drawn at the exact spot the browser laid it out (measured with a DOM Range), so line breaks and spacing are the browser's own.
3. WebGL runs the shader on that picture and the result is shown on a canvas over the content; the HTML goes to opacity 0 but stays clickable.
4. It renders again on resize and after a hover colour transition on the button ends.

## The shader

Only the path the designs use is ported: Lateral mode, High quality, Aberration under 0.08. For that path Figma uses 16 taps per channel along the line to the centre with a triangle window, 4 jittered sub-samples (1.4px spread), red pushed outwards and blue pulled inwards by `p' = c + (p - c) * (1 + amount * (d2 + d2^2))`. Samples that fall outside the frame count as transparent with the channel forced to 1.0, which makes the bright yellow rim. If the design ever uses another mode or a stronger aberration, port that branch from Figma's `main.ts` too.

## Fallbacks and accessibility

- No WebGL2 or any error: the effect never switches on and the plain HTML stays.
- Desktop only (from `xl`, 1280px). On tablets and phones the text is large next to the band, so the edge smear made the paragraph and button hard to read; the plain HTML is shown there instead (Oct 2026).
- Keyboard focus inside the band hides the effect, so the focus ring is visible on the crisp button.
- The canvas is `aria-hidden`; screen readers read the HTML.
- Canvas text can't take `font-variation-settings`, so text set in DM Sans' fixed opsz-14 cut is drawn from the site's weight-only "DM Sans Variable" file, which is that same cut.
