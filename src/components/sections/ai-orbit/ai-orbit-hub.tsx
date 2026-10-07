"use client";

// ---------------------------------------------------------------------------
// AiOrbitHub -- desktop (lg+) funnel + brand badge for "Smarter Design,
// Supercharged by AI". Round 5: built 1:1 from the user's Figma frame
// (node 572:1572, "AI Workflow Section — Variation 6: Marquee Data Flow"),
// read layer by layer with the Figma plugin API. Round 4 was built from the
// reference video without access to this frame and got the shape, masking,
// overlay, hub and bottom badge wrong; the user rejected it for exactly that.
//
// LAYER STRUCTURE (same order as Figma, bottom to top):
//   Workflow Canvas (1635 x 680 at 143,422), clipped by the funnel mask
//   ("Rectangle 5434", a VECTOR mask) -> here a CSS mask-image made from
//   the exact exported path, stretched over the canvas box:
//     1. Rectangle 5432: funnel fill, #142030 -> #1E2D42 top to bottom
//     2. the 12 tool badges (96px #26354A circles, Linear is 107px;
//        colors.css --color-ai-orbit-*)
//     3. Rectangle 5433: the fade overlay. Solid #142030 at the top edge,
//        transparent by y~350, solid #1E2D42 again from y~511. This is the
//        user's "top faded overlay and bottom faded overlay": icons fade in
//        at the funnel mouth and fade out into the neck.
//     4. Central Hub: 220px #142030 circle with the lime Denvo mark
//   Brand Badge (below the canvas at 841,1126, hugs its content): small icon
//   badge + tool name + description.
// All art (paths, gradients, icons) comes from funnel-art.ts,
// workflow-tools.ts and public/images/ai-orbit/tools/, all generated from
// the Figma export by script.
//
// MOTION (the frame is static; the motion follows the user's spec + video):
// - Loop, never empty: each icon travels in a straight line, at constant
//   speed, from above the funnel mouth to the hub center, then restarts
//   immediately. All 12 share one duration (TRAVEL), so all 12 are always in
//   the funnel, like the frame.
// - Each icon's line runs from the hub center through its position in the
//   Figma frame, so every icon travels along the direction the design shows.
// - ONE AT A TIME (user, Sept 28 2026: "4/5 icons go in together; I want
//   one icon to go in at a time, and a bit slower"). Starting every icon at
//   its exact Figma spot made arrivals follow the frame's layout, where
//   several icons sit at the same distance from the hub (Claude and Codex
//   are at the same height), so they entered in bursts. Now the icons keep
//   the frame's order but are spaced evenly along the loop: exactly one
//   reaches the hub every TRAVEL / 12 seconds (0.9s). The even spacing is
//   placed as close as it can be to the frame's own layout (least-squares
//   offset, see streamPhases), so the moving layout still looks like it.
// - Static frame = Figma frame: the server renders every icon at its exact
//   Figma position, and with prefers-reduced-motion that's what stays on
//   screen. With motion on, the icons move to their evenly spaced starting
//   points when the page loads (the section is far below the fold, so this
//   happens off-screen).
// - Icons appear and disappear only through the design's own layers: above
//   the mouth they're outside the mask, near the neck the overlay turns
//   solid, and at the end they're behind the hub. No opacity animation.
// - Brand badge: when an icon sinks into the neck, the badge switches to that
//   tool. The old badge zooms up and fades out while the new one zooms in
//   (two slots crossfading), once per arrival. MIN_BADGE_HOLD stays as a
//   safety gap in case two arrivals ever land close together.
//
// LAYOUT / RESPONSIVE: this component is the canvas + brand badge; the
// section around it (ai-orbit.tsx) is a normal flow layout. The canvas keeps
// its 1635 x 680 coordinate system at every width; only its display SCALE
// and the WINDOW onto it change, by one continuous rule (no jumps between
// breakpoints):
//   window width W = max(min(100%, 797px), 1635/1920 of the section)
//   scale        s = max(MIN_SCALE, W / 1635)
// - wide screens (>~936px): the whole funnel, 1635/1920 of the section
//   width, like the frame. At 1920 that's 1635 x 680 with the canvas at
//   x 143, pixel-identical to Figma.
// - narrower: the funnel never shrinks below MIN_SCALE (390/800: a 390px
//   phone shows an 800-unit window, icons ~47px, hub ~107px). When the
//   screen can't fit the whole funnel at that size, the window is the full
//   screen width and the canvas is cropped on both sides, always centered
//   on the hub. The user's own tablet frame for this section (253:1190)
//   crops its diagram off both sides the same way.
// HEIGHT CAP (user, Sept 28 2026: "this section should be max 100vh"): the
// section never grows taller than the screen (100svh, see ai-orbit.tsx). On
// lg+ everything scales together to fit; if the section still has to give,
// this window shrinks (not below MIN_WINDOW_H) and the canvas inside
// shrinks to fit it, staying centered on the hub.
// Same shapes, mask, overlay, hub, icons and motion at every width. No
// Figma design exists for this section below 1920; if one is made, match it.
// The brand badge keeps its Figma px sizes at every width (small UI text;
// scaled down it would be unreadable).
// ---------------------------------------------------------------------------
import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  CANVAS_H,
  CANVAS_W,
  FUNNEL_MASK_PATH,
  HUB,
} from "./funnel-art";
import { FRAME_W, MIN_WINDOW_H } from "./frame";
import {
  INITIAL_BADGE_SLUG,
  SMALL_BADGE,
  WORKFLOW_TOOLS,
  toolIconSrc,
  type WorkflowTool,
} from "./workflow-tools";

function canvasPct(v: number, axis: "x" | "y") {
  return `${(v / (axis === "x" ? CANVAS_W : CANVAS_H)) * 100}%`;
}

// Brand Badge (573:1618): 24px under the canvas (1126 - 1102), hugs its
// content, centered (841 + 238 / 2 = 960 = frame center).

// Hub center, used for the crop windows and the motion (canvas coordinates).
const HUB_CX = HUB.x + HUB.size / 2; // 817
const HUB_CY = HUB.y + HUB.size / 2; // 552

// Display scale floor: a 390px phone shows an 800-unit window of the canvas.
const MIN_SCALE = 390 / 800;

// All in container units of the section's max-1920 box (an @container).
const CANVAS_VARS = {
  // window width W
  "--ai-w": `max(min(100cqw, ${MIN_SCALE * CANVAS_W}px), calc(100cqw * ${CANVAS_W} / ${FRAME_W}))`,
  // px per canvas unit
  "--ai-s": `max(${MIN_SCALE}px, calc(var(--ai-w) / ${CANVAS_W}))`,
} as CSSProperties;

// Motion (canvas coordinates).
const SPAWN_Y = -70; // above the mask's top edge, so a restarting icon is fully clipped
const TRAVEL = 10.8; // seconds from the mouth to the hub center, every icon (was 8.4; slowed down on request)
const ARRIVE_Y = 500; // icon center here = under the overlay's solid neck -> badge switches
const MIN_BADGE_HOLD = 0.5; // seconds each badge stays before the next may replace it
const BADGE_TWEEN = 0.36;

const MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_W} ${CANVAS_H}" preserveAspectRatio="none"><path d="${FUNNEL_MASK_PATH}" fill="#000"/></svg>`,
)}")`;

function toolPath(tool: WorkflowTool) {
  const cx = tool.x + tool.size / 2;
  const cy = tool.y + tool.size / 2;
  // Straight line from the hub center through the tool's Figma position,
  // extended up to SPAWN_Y.
  const slope = (cx - HUB_CX) / (cy - HUB_CY);
  const spawnX = HUB_CX + (SPAWN_Y - HUB_CY) * slope;
  const progressAtStart = (cy - SPAWN_Y) / (HUB_CY - SPAWN_Y);
  return { cx, cy, spawnX, progressAtStart };
}
const ARRIVE_PROGRESS = (ARRIVE_Y - SPAWN_Y) / (HUB_CY - SPAWN_Y);

// Evenly spaced starting phases (header comment, ONE AT A TIME). Tools keep
// the order they have in the frame (closest to the hub first); phase k is
// offset - k / N, with the offset chosen by least squares so the spaced-out
// layout sits as close as possible to the frame's own positions.
function streamPhases(): number[] {
  const n = WORKFLOW_TOOLS.length;
  const figma = WORKFLOW_TOOLS.map((tool) => toolPath(tool).progressAtStart);
  const order = figma.map((_, i) => i).sort((a, b) => figma[b] - figma[a]);
  const offset = order.reduce((sum, toolIndex, rank) => sum + figma[toolIndex] + rank / n, 0) / n;
  const phases = new Array<number>(n);
  order.forEach((toolIndex, rank) => {
    phases[toolIndex] = (((offset - rank / n) % 1) + 1) % 1;
  });
  return phases;
}
const STREAM_PHASES = streamPhases();

const INITIAL_TOOL = WORKFLOW_TOOLS.find((t) => t.slug === INITIAL_BADGE_SLUG) ?? WORKFLOW_TOOLS[0];

export function AiOrbitHub() {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slotIconRefs = useRef<(HTMLImageElement | null)[]>([]);
  const slotNameRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const slotDescRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const slots = slotRefs.current;
      if (!slots[0] || !slots[1]) return;
      gsap.set(slots, { xPercent: -50, x: 0, transformOrigin: "50% 50%" });

      // Two-slot crossfade: outgoing zooms up and fades, incoming zooms in.
      let active = 0;
      const showTool = (tool: WorkflowTool) => {
        const next = 1 - active;
        const incoming = slots[next];
        const outgoing = slots[active];
        if (!incoming || !outgoing) return;
        gsap.killTweensOf([incoming, outgoing]);

        const icon = slotIconRefs.current[next];
        const name = slotNameRefs.current[next];
        const desc = slotDescRefs.current[next];
        if (icon) {
          icon.src = toolIconSrc(tool.slug);
          icon.style.width = `${(tool.svgW / tool.iconFrame) * 100}%`;
          icon.style.height = `${(tool.svgH / tool.iconFrame) * 100}%`;
        }
        if (name) name.textContent = tool.name;
        if (desc) desc.textContent = tool.description;

        gsap.to(outgoing, { scale: 1.14, y: -10, opacity: 0, duration: BADGE_TWEEN, ease: "power2.out" });
        gsap.fromTo(
          incoming,
          { scale: 0.86, y: 12, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: BADGE_TWEEN, ease: "back.out(1.3)" },
        );
        active = next;
      };

      // Arrivals can bunch up (they follow the frame's layout); queue them so
      // each badge holds for at least MIN_BADGE_HOLD.
      let nextFree = 0;
      const delayed: gsap.core.Tween[] = [];
      const announce = (tool: WorkflowTool) => {
        const now = gsap.ticker.time;
        const at = Math.max(now, nextFree);
        nextFree = at + MIN_BADGE_HOLD;
        delayed.push(gsap.delayedCall(at - now, showTool, [tool]));
        if (delayed.length > 24) delayed.splice(0, delayed.length - 24);
      };

      const timelines = WORKFLOW_TOOLS.map((tool, index) => {
        const el = badgeRefs.current[index];
        if (!el) return null;
        const path = toolPath(tool);
        gsap.set(el, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

        const tl = gsap.timeline({ repeat: -1 });
        tl.fromTo(
          el,
          { left: canvasPct(path.spawnX, "x"), top: canvasPct(SPAWN_Y, "y") },
          { left: canvasPct(HUB_CX, "x"), top: canvasPct(HUB_CY, "y"), duration: TRAVEL, ease: "none" },
          0,
        );
        tl.call(announce, [tool], TRAVEL * ARRIVE_PROGRESS);
        // Start at this tool's evenly spaced phase (one arrival at a time).
        tl.totalTime(TRAVEL * STREAM_PHASES[index], true);
        return tl;
      });

      return () => {
        timelines.forEach((tl) => tl?.kill());
        delayed.forEach((d) => d.kill());
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flex min-h-0 w-full flex-col items-center" aria-hidden="true" style={CANVAS_VARS}>
      {/* Window onto the canvas (header comment, LAYOUT), centered. Its
          natural height is the canvas at scale --ai-s; it's the one element
          allowed to shrink when the section hits its 100svh cap (ai-orbit.tsx),
          down to MIN_WINDOW_H. It's a size container so the canvas inside can
          fit whatever height it ends up with. */}
      <div
        className="relative min-h-0 shrink overflow-hidden [container-type:size]"
        style={{
          width: "var(--ai-w)",
          height: `calc(var(--ai-s) * ${CANVAS_H})`,
          minHeight: MIN_WINDOW_H,
        }}
      >
        {/* Workflow Canvas, masked to the funnel shape, centered on the hub
            (at 1920 that puts it exactly at Figma's x 143: 960 - 817).
            Scale: the natural one (window width / 1635, floored at
            MIN_SCALE), or smaller if the window got shorter, so the whole
            funnel always fits the window's height. */}
        <div
          className="absolute top-0"
          style={{
            ["--c-s" as string]: `min(max(${MIN_SCALE}px, calc(100cqw / ${CANVAS_W})), calc(100cqh / ${CANVAS_H}))`,
            width: `calc(var(--c-s) * ${CANVAS_W})`,
            height: `calc(var(--c-s) * ${CANVAS_H})`,
            left: `calc(50% - var(--c-s) * ${HUB_CX})`,
            maskImage: MASK_URL,
            WebkitMaskImage: MASK_URL,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* Exact fill exported from the current Figma section. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative Figma SVG */}
          <img src="/images/ai-orbit/workflow-fill.svg" alt="" className="absolute inset-0 h-full w-full" />

          {/* 2. Tool badges, server-rendered at their exact Figma positions. */}
          {WORKFLOW_TOOLS.map((tool, index) => (
            <div
              key={tool.slug}
              ref={(el) => { badgeRefs.current[index] = el; }}
              className="absolute overflow-hidden rounded-full bg-ai-orbit-badge"
              style={{
                left: canvasPct(tool.x + tool.size / 2, "x"),
                top: canvasPct(tool.y + tool.size / 2, "y"),
                width: canvasPct(tool.size, "x"),
                height: canvasPct(tool.size, "y"),
                transform: "translate(-50%, -50%)",
              }}
              title={tool.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG exported from Figma; next/image adds nothing for a 2KB vector */}
              <img
                src={toolIconSrc(tool.slug)}
                alt=""
                draggable={false}
                className="absolute max-w-none"
                style={{
                  left: `${(tool.iconX / tool.size) * 100}%`,
                  top: `${(tool.iconY / tool.size) * 100}%`,
                  width: `${(tool.svgW / tool.size) * 100}%`,
                  height: `${(tool.svgH / tool.size) * 100}%`,
                }}
              />
            </div>
          ))}

          {/* Figma fades the mouth into the section background. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative Figma SVG */}
          <img src="/images/ai-orbit/workflow-fade.svg" alt="" className="pointer-events-none absolute inset-0 h-full w-full" />

          <div
            className="absolute flex items-center justify-center rounded-full bg-[#24303e]"
            style={{
              left: canvasPct(HUB.x, "x"),
              top: canvasPct(HUB.y, "y"),
              width: canvasPct(HUB.size, "x"),
              height: canvasPct(HUB.size, "y"),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- exact exported Figma hub mark */}
            <img src="/images/ai-orbit/workflow-hub-mark.svg" alt="" className="h-[70.5291%] w-[70.5291%]" />
          </div>
        </div>
      </div>

      {/* Brand Badge: 24px under the canvas, two slots at the same anchor for
          the crossfade, Figma px sizes at every width. Slot 0 is
          server-rendered with the frame's own tool (Framer). */}
      <div className="relative mt-[24px] h-[68px] w-full shrink-0">
        {[0, 1].map((slot) => (
          <div
            key={slot}
            ref={(el) => { slotRefs.current[slot] = el; }}
            className="absolute left-1/2 top-0 flex items-center gap-[12px] whitespace-nowrap rounded-[8px] bg-ai-orbit-card p-[12px]"
            style={{ transform: "translate(-50%, 0)", opacity: slot === 0 ? 1 : 0 }}
          >
            <div
              className="relative shrink-0 overflow-hidden rounded-full bg-ai-orbit-badge"
              style={{ width: SMALL_BADGE.size, height: SMALL_BADGE.size }}
            >
              <div
                className="absolute"
                style={{ left: SMALL_BADGE.iconOffset, top: SMALL_BADGE.iconOffset, width: SMALL_BADGE.iconFrame, height: SMALL_BADGE.iconFrame }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- same static Figma SVG as above */}
                <img
                  ref={(el) => { slotIconRefs.current[slot] = el; }}
                  src={toolIconSrc(INITIAL_TOOL.slug)}
                  alt=""
                  draggable={false}
                  className="absolute left-0 top-0 max-w-none"
                  style={{
                    width: `${(INITIAL_TOOL.svgW / INITIAL_TOOL.iconFrame) * 100}%`,
                    height: `${(INITIAL_TOOL.svgH / INITIAL_TOOL.iconFrame) * 100}%`,
                  }}
                />
              </div>
            </div>
            {/* Swapped by the badge animation above, so the site-wide line animation stays off it. */}
            <div data-no-text-reveal="" className="flex flex-col">
              <p
                ref={(el) => { slotNameRefs.current[slot] = el; }}
                className="font-sans text-[20px] font-semibold leading-[28px] text-foreground-inverse"
              >
                {slot === 0 ? INITIAL_TOOL.name : ""}
              </p>
              <p
                ref={(el) => { slotDescRefs.current[slot] = el; }}
                className="font-mono text-[12px] font-normal leading-[16px] text-ai-orbit-muted"
              >
                {slot === 0 ? INITIAL_TOOL.description : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
