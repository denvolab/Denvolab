// ---------------------------------------------------------------------------
// Helpers for layouts copied from a 1920px Figma frame.
//
// fluid(96)      -> a length that is exactly 96px on a 1920 screen (from
//                   about 1880px up) and shrinks with the viewport below
//                   that, never under its minimum (default 40% of the value).
// pctOf(470)     -> "24.4792%", i.e. 470px as a share of the 1920 frame,
//                   for offsets and widths that should scale with the page.
// ---------------------------------------------------------------------------

/** Width at which fluid values reach their full Figma size (a little under 1920, so a scrollbar does not shave them). */
const FULL_SIZE_AT = 1880;

export function fluid(px: number, min = Math.round(px * 0.4)): string {
  if (px <= min) return `${px}px`;
  const vw = (px / FULL_SIZE_AT) * 100;
  return `clamp(${min}px, ${vw.toFixed(4)}vw, ${px}px)`;
}

export function pctOf(px: number, of = 1920): string {
  return `${((px / of) * 100).toFixed(4)}%`;
}
