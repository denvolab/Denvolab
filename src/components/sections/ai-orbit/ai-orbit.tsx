// ---------------------------------------------------------------------------
// AiOrbit — "Smarter Design, Supercharged by AI" (Figma node group under
// `Rectangle 17`, y 6476-7561 on the page, dark `--color-surface-dark-deep`
// background). Server Component: only the heading is real content (from
// lib/data/homepage.ts) — the hub/satellite layout below is a fixed
// decorative diagram, not editable copy, so it's hardcoded here the same way
// hero's decorative vertical bars are.
//
// LAYOUT: same technique as hero/hero.tsx — one `aspect-[1920/1085]` box
// capped at max-w-[1920px], every child positioned as a % of that box
// (converted 1:1 from the Figma frame's pixel coordinates), so it scales as
// one unit instead of reflowing per breakpoint.
//
// CONNECTOR LINES: Figma's actual connectors are curved bezier vectors
// (`Vector 1`, `Vector 2`, etc.) — vector art this build couldn't export
// (see this folder's README) and, per the design-to-code rules, won't
// hand-trace from memory. What's drawn instead is a straight line from the
// hub's center to each satellite's center, using the real center coordinates
// from the Figma file — an honest structural simplification of the
// hub-and-spoke relationship, not a guess at the curve's exact path.
// ---------------------------------------------------------------------------
import { getAiOrbitContent } from "@/lib/data/homepage";

interface Badge {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

// One large hub (the "AI" node) + 6 orbiting satellites. Figma node ids kept
// in the `id` field for traceability back to the source.
const HUB: Badge = { id: "230:4168", left: 43.05, top: 43.18, width: 13.02, height: 23.04 };
const SATELLITES: Badge[] = [
  { id: "230:4187", left: 21.35, top: 32.44, width: 7.45, height: 13.18 }, // top-left
  { id: "230:4178", left: 69.58, top: 32.44, width: 7.45, height: 13.18 }, // top-right
  { id: "230:4191", left: 25.625, top: 48.11, width: 7.45, height: 13.18 }, // mid-left
  { id: "230:4219", left: 65.81, top: 48.11, width: 7.45, height: 13.18 }, // mid-right
  { id: "230:4184", left: 21.35, top: 65.44, width: 7.45, height: 13.18 }, // bottom-left
  { id: "230:4175", left: 69.58, top: 65.44, width: 7.45, height: 13.18 }, // bottom-right
];

function center(b: Badge) {
  return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
}

export async function AiOrbit() {
  const content = await getAiOrbitContent();
  const hubCenter = center(HUB);

  return (
    <section className="w-full bg-surface-dark-deep py-16 lg:py-24" data-figma-node="230:4044">
      {/* Mobile/tablet (<lg) — Figma nodes 251:1738 (mobile) / 253:1190
          (tablet). Per the homepage-responsive-tablet-mobile project doc,
          the curved hub-and-spoke diagram is replaced with a simple wrapping
          grid of the same 7 circular badges (hub first, slightly larger,
          then the 6 satellites) — the connector lines don't translate to a
          narrow, reflowing viewport, so they're dropped here entirely rather
          than approximated. */}
      <div className="flex flex-col items-center gap-10 px-5 text-center md:px-10 lg:hidden">
        <h2 className="whitespace-pre-line font-heading text-display-2xl text-foreground-inverse">
          {content.heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[HUB, ...SATELLITES].map((badge, i) => (
            <div
              key={badge.id}
              className={
                i === 0
                  ? "flex size-[74px] shrink-0 items-center justify-center rounded-full border border-brand/30 bg-surface-dark"
                  : "flex size-16 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-surface-dark"
              }
              data-figma-node={badge.id}
            />
          ))}
        </div>
      </div>

      {/* Desktop (lg+) — the original fixed-aspect hub-and-spoke diagram. */}
      <div className="relative mx-auto hidden aspect-[1920/1085] w-full max-w-[1920px] lg:block">
        <h2 className="absolute left-[19.22%] top-[9.03%] w-[61.09%] whitespace-pre-line text-center font-heading text-display-2xl text-foreground-inverse">
          {content.heading}
        </h2>

        {/* Connector lines — see the file header for why these are straight
            simplifications rather than a trace of Figma's curved vectors. */}
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {SATELLITES.map((sat) => {
            const c = center(sat);
            return (
              <line
                key={sat.id}
                x1={hubCenter.x}
                y1={hubCenter.y}
                x2={c.x}
                y2={c.y}
                stroke="var(--color-brand-default)"
                strokeOpacity={0.25}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* Badges — every one of these is a complex, multi-layer masked icon
            in the Figma source with no exportable asset (see README); each
            renders as a plain brand-tinted circle in its exact slot. */}
        {[HUB, ...SATELLITES].map((badge) => (
          <div
            key={badge.id}
            className="absolute flex items-center justify-center rounded-full border border-brand/30 bg-surface-dark"
            style={{
              left: `${badge.left}%`,
              top: `${badge.top}%`,
              width: `${badge.width}%`,
              height: `${badge.height}%`,
            }}
            data-figma-node={badge.id}
          />
        ))}
      </div>
    </section>
  );
}
