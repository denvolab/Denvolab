# `ai-orbit/`: "Smarter Design, Supercharged by AI"

**Design source (current): Figma node `572:1572`** in file `I1pKT66lH6Iiv70gGqh6bH` ("AI Workflow Section, Variation 6: Marquee Data Flow"), a 1920 x 1393 frame on `#142030`. At 1920px the section is that frame, 1:1, set in motion; narrower screens use the same layers with the responsive rules below.

## Files

- `ai-orbit.tsx`: the section (Server Component). Eyebrow + heading from `lib/data/homepage.ts`, the section spacing per breakpoint, and `AiOrbitHub` below the header. One markup for every width (no separate mobile version).
- `ai-orbit-hub.tsx`: the funnel canvas + brand badge (Client Component, GSAP). Its header comment explains the layer structure, the responsive scale/crop rule and the motion.
- `frame.ts`: the frame size (1920 x 1393) and the `u()` helper (Figma px -> container units of the 1920 box), shared by the Server and Client components.
- `funnel-art.ts`: **generated** from the Figma export. Funnel mask path (with Figma's corner radii baked in), funnel fill path + gradient, overlay gradient, hub + Denvo mark path.
- `workflow-tools.ts`: **generated** from the Figma layers. The 12 tools with their exact badge positions/sizes, icon offsets, and the name + description the brand badge shows.
- `public/images/ai-orbit/tools/<slug>.svg`: the 12 icon files, exported from the frame's own icon layers (not redraws). The copies in the repo carry a C2PA `<metadata>` block added by the file transfer; it's provenance data and renders identically (checked).
- `ai-orbit-marquee.tsx` + `icons.tsx`: round 1 (marquee) and its 20 simple-icons marks. Not used by the live section anymore; kept for reference only. Safe to delete.
- `index.ts`: barrel export.

## How the frame is built

The section is a normal flow layout inside a max-1920 box that is a CSS `@container`: header, then the funnel canvas, then the brand badge, all centered. At 1920px every value is the Figma value (200px top padding, header, 52px gap, 1635 x 680 canvas at x 143, 24px gap, 68px badge, 199px bottom) and a screenshot matches Figma's own export of the frame to 0.2/255 on average. `u(px)` = `px * 100cqw / 1920` expresses the frame's spacing as a share of the width for lg+.

Layers, in Figma's order (bottom to top):

| Figma layer | Node | Code |
|---|---|---|
| Header (eyebrow + headline) at (621, 200), 678 wide | `572:1573` | `ai-orbit.tsx`. Eyebrow DM Mono Medium 14/18 `#A6ADBD`; headline DM Sans SemiBold 52/68 white, 16px gap |
| Workflow Canvas, 1635 x 680 at (143, 422) | `574:1534` | the masked `div` in `ai-orbit-hub.tsx` |
| Rectangle 5434, VECTOR mask (funnel shape) | `574:1535` | CSS `mask-image` built from `FUNNEL_MASK_PATH` |
| Rectangle 5432, funnel fill `#142030 -> #1E2D42` | `572:1834` | first SVG in the canvas |
| 12 tool badges, 96px `#26354A` circles (Linear 107px) | `573:1533` ... `573:1600` | badge `div`s + icon `<img>`s |
| Rectangle 5433, fade overlay | `573:1608` | second SVG in the canvas |
| Central Hub, 220px `#142030` circle + lime mark | `574:1541` | third SVG in the canvas |
| Brand Badge at (841, 1126), hugs content | `573:1618` | two crossfading slots in `ai-orbit-hub.tsx` |

**The overlay is the "top faded overlay and bottom faded overlay".** It's one gradient in the funnel's own shape: solid `#142030` at the top edge, fully transparent by y~350, solid `#1E2D42` again from y~511 (canvas coordinates). Icons fade in at the mouth and fade out into the neck through that single layer; the hub sits on top of it.

**Headline font.** The site's default DM Sans file has no optical-size axis, and at 52px it renders about 9% wider than Figma (Figma uses automatic optical sizing, which picks the tighter display cut). This headline uses `"DM Sans Opsz"`, the same font with its opsz axis, registered in `globals.css` from `public/fonts/dm-sans-opsz/`. Measured: 397px (old) vs 362.8px (opsz) vs Figma's 359px ink width for "Smarter Design,". Only this headline uses it for now; switching the whole site over is a separate decision because it changes every large heading's width.

**Fidelity check.** With motion off (first frame / reduced motion), a 1920px screenshot of the section was pixel-diffed against Figma's own PNG export of `572:1572`: mean difference 0.2/255, headline bounding boxes identical. The remaining differences are edge anti-aliasing and the badge text "Framer" (Figma says "Farmer", read as a typo).

## Motion

The frame is static; the motion follows the user's spec (loop, smoothly moving icons, bottom text zooming and fading out, funnel never empty) and the reference video.

- Each icon moves in a straight line at constant speed from above the funnel mouth to the hub center, then restarts immediately. All 12 share one duration (`TRAVEL`, 10.8s), so all 12 are always in the funnel.
- Each icon's line runs from the hub center through its position in the Figma frame, so it travels along the direction the design shows.
- **One at a time (Sept 28, 2026).** The user: "4/5 icons go in together; I want one icon to go in at a time, and a bit slower." Starting every icon at its exact Figma spot made arrivals follow the frame's layout, where several icons sit at the same distance from the hub (Claude and Codex are at the same height), so they entered in bursts. Now the icons keep the frame's order but are spaced evenly along the loop: exactly one reaches the hub every 0.9s (`TRAVEL / 12`). The spacing is placed as close as it can be to the frame's own layout (least-squares offset, `streamPhases()`). Travel was slowed from 8.4s to 10.8s at the same time. Measured in the browser: arrivals 0.89-0.91s apart, badge switching in step.
- The server still renders every icon at its exact Figma position, and with `prefers-reduced-motion` that is what stays on screen (the static section is the Figma frame). With motion on, the icons move to their evenly spaced starting points when the page loads, which happens off-screen since the section is far down the page.
- Icons appear and disappear only through the design's own layers: outside the mask above the mouth, under the overlay's solid neck, behind the hub. No opacity animation.
- When an icon sinks into the neck (canvas y 500), the brand badge switches to that tool: the old badge zooms up and fades out, the new one zooms in. `MIN_BADGE_HOLD` (0.5s) stays as a safety gap.

Tuning: `TRAVEL`, `ARRIVE_Y`, `MIN_BADGE_HOLD`, `BADGE_TWEEN` in `ai-orbit-hub.tsx`.

## Responsive

There is no Figma design of **this** section below 1920 (the only tablet/mobile `ai-orbit` frames, `253:1190` and `251:1738`, are of the old hub-and-spoke design). So the responsive version keeps every layer of `572:1572` exactly (shapes, mask, overlay, hub, icons, badge, motion) and changes only spacing, type size and how much of the funnel is shown. If a tablet/mobile design of this section is made in Figma, match it instead.

**Funnel canvas: one continuous rule, no jumps between breakpoints.** The canvas keeps its 1635 x 680 coordinates; only its scale and the window onto it change:

- window width `W = max(min(100%, 797px), 1635/1920 of the section)`
- scale `s = max(390/800, W / 1635)`

Wide screens (above ~936px) show the whole funnel at 1635/1920 of the width, like the frame. Narrower, the funnel never shrinks below 390/800 of its Figma size (hub ~107px, icons ~47px). When the screen can't fit the whole funnel at that size, the window becomes the full screen width and the canvas is cropped on both sides, always centered on the hub, the same way the user's old tablet frame lets its diagram run off both edges. Measured: 360/390px show an ~740/800-unit window; 768px shows ~1575 units; from 797px the whole funnel.

**Height cap: never taller than the screen (Sept 28, 2026).** The user: "this section should be max 100vh". The section is capped at `100svh` (the visible screen height, so phone browser bars don't push it over):

- lg+: the frame's spacing (paddings, headline, header gap) uses one scale factor `k = min(width / 1920, 100svh / 1393)` (`FRAME_K` in `frame.ts`), so on a screen shorter than 1393px the whole frame scales down evenly instead of being cut. On a 1920x1080 screen the section is exactly 1080px (headline ~40px, hub ~161px).
- If the section still has to give (the eyebrow and badge keep their px size), the funnel window shrinks first and the canvas inside scales to fit it (the window is a CSS size container). It never goes below 200px (`MIN_WINDOW_H`).
- On a screen too short even for that (a phone held sideways, a 600px-tall window), the cap becomes the section's smallest possible height instead, so nothing is ever clipped.
- Measured: 1920x1080 = 1080, 1536x864 = 864, 1440x900 = 900, 1366x768 = 768, 1280x720 = 720, 1024x768 = 768, 768x1024 = 662, 390x844 = 660, 375x667 = 660, all within the screen. 1280x600 = 608, 1440x500 = 580 and 844x390 = 530 are the minimum-height cases, with nothing clipped. At 1920x1500 the section is still exactly the 1393px frame.

**Spacing and type:**

| | base (<768) | md (768-1023) | lg+ (>=1024) |
|---|---|---|---|
| Top / bottom padding | 48 / 48 | 48 / 48 | 200 / 199 times k (see Height cap) |
| Side padding (header) | 20 | 40 | none (centered) |
| Eyebrow (DM Mono Medium) | 12/16 | 14/18 | 14/18 |
| Headline (DM Sans Opsz SemiBold) | 30/38 | 30/38 | 52/68 times k, never below 30 |
| Header gap / header to funnel | 16 / 32 | 16 / 32 | 16 / 52 times k, never below 32 |
| Funnel to badge | 24 | 24 | 24 |
| Badge | Figma px (238 x 68 for Framer) | same | same |

Base and md values come from the user's own mobile/tablet frames for this section (48px vertical padding, 20/40px sides, 30/38 heading, 32px gap). The eyebrow drops to 12/16 on phones so it stays on one line at 360-390px. The badge keeps its Figma px sizes everywhere (it's small UI text).

Verified at 360, 390, 768, 797, 900, 936, 1023, 1024, 1280, 1440 and 1920: no horizontal scroll, eyebrow on one line, headline on two lines, no console errors. On a 390px phone the motion keeps 4-9 icons in view and the badge cycles all 12 tools.

## History

- Static hub-and-spoke diagram, then round 1: two-row marquee + "charge" (`ai-orbit-marquee.tsx`).
- Rounds 2-4 (Sept 24-27, 2026): funnel animations built from a reference screen recording. Round 4 was built without access to the Figma frame (the Figma connector was disconnected) and invented its own funnel shape, fades, glowing icons, lime sphere and pill. The user rejected it: the overlay, masking and shape didn't match the Figma design.
- Round 5 (Sept 27, 2026): the frame was read directly with the Figma plugin API in the browser (see `claude/motion-interaction-references.md`), exported by script, and rebuilt 1:1. Lesson: when a Figma frame exists, build from its layers, never from a description or a video of the idea.
- Responsive (Sept 27, 2026): one flow layout for every width, the continuous scale/crop rule above, and the user's own mobile/tablet spacing for this section. Replaced the static `<lg` icon grid.
- One at a time + height cap (Sept 28, 2026, current): evenly spaced arrivals (one every 0.9s), travel slowed to 10.8s, section capped at the screen height. See "Motion" and "Height cap".

## Verification (round 5)

- `tsc --noEmit` and `eslint` clean on the cloud replica and the Mac repo.
- 1920px reduced-motion screenshot vs Figma's PNG export: mean pixel difference 0.2/255.
- Motion sampled every 0.3s over ~10s: 5-11 icons in the clear part of the funnel at every sample, badge cycles all 12 tools in order, no console errors or hydration warnings.
- 1024px and 1440px: frame keeps its 1920:1393 ratio, no horizontal scroll.
- 390px (round 5, before the responsive pass): the old static grid fallback rendered; replaced since, see "Responsive".
- Every file moved to the Mac was checksum-verified (SVGs after removing the transfer's C2PA block, and their renders compared).

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

The section has `data-wash="anchor"`: when it is the active section the page colour wash turns the whole page this navy, but the section itself never changes colour, since the funnel artwork is drawn for this background. See `components/motion/color-wash/`.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
