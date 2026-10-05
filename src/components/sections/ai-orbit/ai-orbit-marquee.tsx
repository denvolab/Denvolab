"use client";

// ---------------------------------------------------------------------------
// AiOrbitMarquee -- desktop (lg+) redesign of the "Smarter Design,
// Supercharged by AI" diagram: two opposite-direction marquee rows of real
// AI-tool logos (icons.tsx) feeding a center "0" mark, with a periodic
// "charge" animation (user spec, chat, Sept 2026): each row marquees
// continuously except when it is "stuck" (paused), at which point a bright
// pulse travels along each of its 5 connector lines toward the mark and the
// mark flashes on arrival. The two rows alternate which one is paused and
// charging -- never both at once -- looping forever automatically.
//
// MARQUEE MECHANICS: reuses the site's existing `animate-marquee-scroll` /
// `-reverse` CSS loop (globals.css -- same technique as marquee-tagline/ and
// partner-logos/) for the actual scrolling. "Stuck" is just toggling
// `animationPlayState` on the track element: freezing a running CSS
// animation holds it at its exact current frame, and resuming continues
// from that same frame -- no snap, no jump, no jank, which is what the
// "no jarging" part of the spec asks for. The choreography itself (which
// row is paused, the line-charge pulses, the mark flash) is a GSAP
// timeline, the same tool process-rail.tsx / scroll-text-reveal.tsx /
// moving-visual.tsx already use for everything else in this codebase that
// CSS alone can't orchestrate.
//
// CONNECTOR LINES: 5 fixed "anchor" x-positions per row, not tied to any
// one scrolling icon -- the row's content moves continuously, so a line
// can't track a specific logo. Each is a rounded orthogonal "elbow"
// (vertical - horizontal - vertical, quarter-circle corners) except the
// center one (offset 0), which is a plain straight vertical. This
// construction -- NOT a smooth bezier curve -- was discovered by directly
// inspecting this SAME section's own existing connector lines on the live
// site (Vector 1/2/6/8 etc. in the Figma source; see
// claude/ai-workflow-section-variations.md for the full writeup) rather
// than guessed from a reference screenshot.
//
// ICONS: see icons.tsx -- real simple-icons brand marks for 17 of the 20
// tools; OpenAI, Codex and Antigravity render as a two-letter fallback
// since simple-icons has no entry for any of the three (checked directly,
// not assumed).
//
// The "0" mark's glyph is set as literal text in the heading font, not a
// traced copy of the Figma source's vector ring -- that shape's curve
// handle data wasn't available to this build, the same class of
// simplification as this section's other known gaps (see README.md).
//
// SCALING NOTE: the row badges use fixed pixel sizing (`size-[72px]`) even
// though they sit inside this section's percentage-scaled 1920x1085 box --
// same tradeoff marquee-tagline/ already accepts for its own icons. Between
// this section's `lg` floor (1024px) and its 1920px cap, the badges don't
// shrink at quite the same rate as the rest of the diagram; the connector
// SVG and the mark itself DO scale exactly (percentage/viewBox-based), so
// only the row badges are affected, and only mildly across that ~1.9x range.
// ---------------------------------------------------------------------------
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TOP_ROW_ICONS, BOTTOM_ROW_ICONS, BrandIcon, type AiToolIcon } from "./icons";

// All positions in the same 1920x1085 pixel space as the rest of this
// section's absolutely-positioned children (see ai-orbit.tsx's HUB/
// SATELLITES), converted to percentages via `pct()` for JSX and used as
// raw numbers for the connector SVG's own matching viewBox.
const BOX_W = 1920;
const BOX_H = 1085;

const CENTER_X = 960;
const MARK_CENTER_Y = 660;
const MARK_DIAMETER = 200;

const TOP_ROW_Y = 420;
const BOTTOM_ROW_Y = 900;
const ROW_BADGE = 72;

const FAN_OFFSETS = [-480, -240, 0, 240, 480];
const CORNER_RADIUS = 20;

const MARK_TOP = MARK_CENTER_Y - MARK_DIAMETER / 2;
const MARK_BOTTOM = MARK_CENTER_Y + MARK_DIAMETER / 2;
const TOP_ANCHOR_Y = TOP_ROW_Y + ROW_BADGE / 2 + 14;
const BOTTOM_ANCHOR_Y = BOTTOM_ROW_Y - ROW_BADGE / 2 - 14;

function pct(px: number, axis: "x" | "y") {
  return `${(px / (axis === "x" ? BOX_W : BOX_H)) * 100}%`;
}

// Rounded orthogonal "elbow": leaves (px,py) vertically, bends once
// horizontally at the travel's vertical midpoint, arrives at (qx,qy)
// vertically. Degenerates to a plain straight line when px === qx (the
// center connector, offset 0) since the horizontal segment has zero
// length. `radius` is clamped per corner so it never overruns a short
// segment -- same construction as the elbow connectors already on this
// section's live homepage (see file header).
function elbowPath(px: number, py: number, qx: number, qy: number, radius: number): string {
  if (px === qx) return `M ${px} ${py} L ${qx} ${qy}`;
  const midY = py + (qy - py) / 2;
  const points: [number, number][] = [
    [px, py],
    [px, midY],
    [qx, midY],
    [qx, qy],
  ];
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const d1 = Math.hypot(x1 - x0, y1 - y0);
    const d2 = Math.hypot(x2 - x1, y2 - y1);
    const r = Math.min(radius, d1 / 2, d2 / 2);
    const p1x = x1 - ((x1 - x0) / (d1 || 1)) * r;
    const p1y = y1 - ((y1 - y0) / (d1 || 1)) * r;
    const p2x = x1 + ((x2 - x1) / (d2 || 1)) * r;
    const p2y = y1 + ((y2 - y1) / (d2 || 1)) * r;
    d += ` L ${p1x} ${p1y} Q ${x1} ${y1} ${p2x} ${p2y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

const TOP_PATHS = FAN_OFFSETS.map((o) => elbowPath(CENTER_X + o, TOP_ANCHOR_Y, CENTER_X, MARK_TOP, CORNER_RADIUS));
const BOTTOM_PATHS = FAN_OFFSETS.map((o) =>
  elbowPath(CENTER_X, MARK_BOTTOM, CENTER_X + o, BOTTOM_ANCHOR_Y, CORNER_RADIUS),
);

function MarqueeRow({ icons, y, reverse }: { icons: AiToolIcon[]; y: number; reverse: boolean }) {
  const track = [...icons, ...icons];
  return (
    <div
      className="absolute left-0 w-full overflow-hidden"
      style={{ top: pct(y, "y"), transform: "translateY(-50%)" }}
    >
      <div
        data-marquee-track
        className={`flex w-max items-center gap-6 ${reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll"}`}
      >
        {track.map((icon, i) => (
          <div
            key={`${icon.slug}-${i}`}
            className="flex size-[72px] shrink-0 items-center justify-center rounded-full border border-brand/30 bg-surface-dark"
            title={icon.title}
          >
            <BrandIcon icon={icon} className="size-9" />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[180px] bg-gradient-to-r from-surface-dark-deep to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[180px] bg-gradient-to-l from-surface-dark-deep to-transparent"
      />
    </div>
  );
}

// How long each row gets to marquee before the pause+charge swap (seconds).
// One full loop (top charges, then bottom charges) is 2x this.
const PHASE_SECONDS = 6;
// Visible length of the traveling "comet" pulse, in the same px space as
// the connector paths.
const COMET_LENGTH = 90;

export function AiOrbitMarquee() {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const topPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const bottomPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const haloRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Same skip as ui/ripple-image/, scroll-text-reveal/ and
      // process-steps/process-rail.tsx: reduced motion gets the diagram
      // static (rows frozen via the shared marquee-scroll media query in
      // globals.css already; here we additionally skip the charge pulses
      // and mark flash entirely rather than a toned-down version of them).
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const topTrack = topRowRef.current?.querySelector<HTMLElement>("[data-marquee-track]");
      const bottomTrack = bottomRowRef.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!topTrack || !bottomTrack || !haloRef.current || !markRef.current) return;

      const setPlaying = (el: HTMLElement, playing: boolean) => {
        el.style.animationPlayState = playing ? "running" : "paused";
      };

      // One row's charge pulse: a bright "comet" travels along each of its
      // 5 connector paths toward the mark (staggered so they don't move in
      // perfect lockstep), then the mark flashes once they've arrived, then
      // the pulses fade back out. NOT built paused: nesting it into the
      // master via `.add()` already gives the master full control over when
      // it plays (the master scrubs it by position) -- a `paused: true`
      // nested timeline gates its own rendering and never advances, even
      // while the parent sweeps past its position, which is why the pulses
      // never appeared. Uses `tl.set(...)` (not a bare `gsap.set(...)`) for
      // the reset step so it correctly re-runs every time the master
      // timeline repeats, not just the first time.
      const chargeRow = (paths: (SVGPathElement | null)[]) => {
        const tl = gsap.timeline();
        paths.forEach((p, i) => {
          if (!p) return;
          const len = p.getTotalLength();
          tl.set(p, { strokeDasharray: `${COMET_LENGTH} ${len}`, strokeDashoffset: len + COMET_LENGTH, opacity: 1 }, 0);
          tl.to(p, { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" }, i * 0.15);
        });
        tl.to(haloRef.current, { opacity: 0.55, scale: 1.15, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, 0.55);
        tl.to(markRef.current, { scale: 1.1, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, 0.55);
        paths.forEach((p) => {
          if (!p) return;
          tl.to(p, { opacity: 0, duration: 0.4 }, 1.1);
        });
        return tl;
      };

      const master = gsap.timeline({ repeat: -1 });
      master
        .call(() => {
          setPlaying(topTrack, true);
          setPlaying(bottomTrack, false);
        }, [], 0)
        .add(chargeRow(bottomPathRefs.current), 0.6)
        .call(() => {
          setPlaying(bottomTrack, true);
          setPlaying(topTrack, false);
        }, [], PHASE_SECONDS)
        .add(chargeRow(topPathRefs.current), PHASE_SECONDS + 0.6)
        // Zero-duration marker pins the loop to exactly 2x PHASE_SECONDS
        // regardless of the charge sub-timelines' own length, so `repeat`
        // always restarts cleanly instead of drifting.
        .to({}, { duration: 0 }, PHASE_SECONDS * 2);

      return () => {
        master.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="absolute inset-0" aria-hidden="true">
      <svg className="absolute inset-0 size-full" viewBox={`0 0 ${BOX_W} ${BOX_H}`}>
        {/* Dim base lines -- always visible, same brand-tinted treatment as
            this section's original static connectors. */}
        {[...TOP_PATHS, ...BOTTOM_PATHS].map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="var(--color-brand-default)" strokeOpacity={0.22} strokeWidth={2.5} fill="none" />
        ))}
        {/* Bright comet-pulse overlays, invisible until their row charges. */}
        {TOP_PATHS.map((d, i) => (
          <path
            key={`top-pulse-${i}`}
            ref={(el) => {
              topPathRefs.current[i] = el;
            }}
            d={d}
            stroke="var(--color-brand-default)"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            opacity={0}
            style={{ filter: "drop-shadow(0 0 6px var(--color-brand-default))" }}
          />
        ))}
        {BOTTOM_PATHS.map((d, i) => (
          <path
            key={`bottom-pulse-${i}`}
            ref={(el) => {
              bottomPathRefs.current[i] = el;
            }}
            d={d}
            stroke="var(--color-brand-default)"
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            opacity={0}
            style={{ filter: "drop-shadow(0 0 6px var(--color-brand-default))" }}
          />
        ))}
      </svg>

      <div ref={topRowRef}>
        <MarqueeRow icons={TOP_ROW_ICONS} y={TOP_ROW_Y} reverse={false} />
      </div>
      <div ref={bottomRowRef}>
        <MarqueeRow icons={BOTTOM_ROW_ICONS} y={BOTTOM_ROW_Y} reverse />
      </div>

      <div
        className="absolute flex items-center justify-center rounded-full border border-brand/30 bg-surface-dark"
        style={{
          left: pct(CENTER_X - MARK_DIAMETER / 2, "x"),
          top: pct(MARK_CENTER_Y - MARK_DIAMETER / 2, "y"),
          width: pct(MARK_DIAMETER, "x"),
          height: pct(MARK_DIAMETER, "y"),
        }}
      >
        <div ref={haloRef} className="absolute inset-[-40%] rounded-full bg-brand/25 opacity-20 blur-3xl" />
        <div ref={markRef} className="relative font-heading text-[clamp(56px,6vw,96px)] leading-none text-brand">
          0
        </div>
      </div>
    </div>
  );
}
