// Shared by ai-orbit.tsx (Server Component) and ai-orbit-hub.tsx (Client
// Component), so it lives in a plain module: a Server Component can't call
// functions exported from a "use client" file.
//
// The desktop design is Figma frame 572:1572, 1920 x 1393. At lg+ the
// section's spacing is the frame's px values times one scale factor k, set
// as `--ai-k` on the section (ai-orbit.tsx). k fits the frame into both the
// width (container units of the max-1920 box, an `@container`) and the
// screen height (the section is capped at 100svh). At 1920px wide on a tall
// enough screen k = 1px, so every value equals its Figma px value.

export const FRAME_W = 1920;
export const FRAME_H = 1393;

/** The scale factor k, as a length (px of screen per Figma px). */
export const FRAME_K = `min(calc(100cqw / ${FRAME_W}), calc(100svh / ${FRAME_H}))`;

/**
 * The funnel window's minimum height when the section is capped at the
 * screen height: very short screens (a phone held sideways) get this much
 * funnel and a section slightly taller than the screen, instead of a
 * clipped section.
 */
export const MIN_WINDOW_H = 200;

/** Figma px -> that many Figma px at the current scale (lg+ only). */
export function k(px: number) {
  return `calc(${px} * var(--ai-k))`;
}
