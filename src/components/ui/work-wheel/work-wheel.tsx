// ---------------------------------------------------------------------------
// WorkWheel: the round "EXPLORE THE STORY" badge shown over a Work card's
// picture on hover (Figma component "Wheel", node 1087:20132, 120x120). It
// replaced the "View project" pill on Oct 7, 2026.
//
// Layers, as in Figma: a translucent outer disc (Ellipse 2) and inner disc
// (Ellipse 3), both #29333D with a glass blur (the outer one stronger and
// dimmed, so the ring text reads over any picture); the ring of text
// "EXPLORE THE STORY EXPLORE THE STORY" on a 99px circle (DM Mono Medium,
// 12px, 12% tracking, text/disabled) with a lime dot in each gap; and the
// lime arrow in the middle. The discs, dots and arrow are the SVGs exported
// from Figma (public/images/work-hover); the ring text is real SVG text on a
// path, so it stays sharp and uses the site's own DM Mono.
//
// MOTION (the user's brief): the text ring turns like a gear, endlessly, the
// dots turning with it; the arrow grows and shrinks in the direction it
// points: its tail stays put and its head reaches out to the top right and
// comes back (Oct 7, 2026: not a zoom from the middle).
// Both run only while the card is hovered or focused (always on touch
// screens, where the badge is always shown), and not with "Reduce motion".
// See work-wheel.css.
//
// `pathId` must be unique on the page (several cards show a wheel).
// Server Component: the motion is CSS only.
// ---------------------------------------------------------------------------
import { cn } from "@/lib/utils/cn";
import "./work-wheel.css";

const ASSETS = "/images/work-hover";
const RING_TEXT = "EXPLORE THE STORY EXPLORE THE STORY";

export function WorkWheel({ pathId, className }: { pathId: string; className?: string }) {
  return (
    <span className={cn("work-wheel", className)} aria-hidden="true" data-figma-node="1087:20132">
      {/* eslint-disable @next/next/no-img-element -- small static SVGs from Figma, no optimisation needed */}
      <span className="work-wheel-disc work-wheel-disc--outer">
        <img src={`${ASSETS}/wheel-outer.svg`} alt="" width={120} height={120} />
      </span>
      <span className="work-wheel-disc work-wheel-disc--inner">
        <img src={`${ASSETS}/wheel-inner.svg`} alt="" width={75.2542} height={75.2542} />
      </span>

      {/* The turning ring: the text and the two dots between its copies. */}
      <span className="work-wheel-ring">
        <svg viewBox="0 0 120 120" width={120} height={120}>
          <defs>
            {/* Figma's text path: a 99px circle at (10, 11), starting at its
                right-hand point and running clockwise, text centred on it. */}
            <path id={pathId} d="M 109 60.5 A 49.5 49.5 0 1 1 10 60.5 A 49.5 49.5 0 1 1 109 60.5" />
          </defs>
          {/* Figma sets the text's middle on the path, not its baseline:
              its exported outlines run from r 45.1 (baseline) to 53.6 (cap
              tops) around the 49.5px path. So the baseline is moved 4.4px
              in (dy 0.366em; on a path, dy moves the letters across it),
              which puts the caps exactly where Figma has them. */}
          <text className="work-wheel-text">
            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
              <tspan dy="0.366em">{RING_TEXT}</tspan>
            </textPath>
          </text>
        </svg>
        <img className="work-wheel-dot work-wheel-dot--right" src={`${ASSETS}/wheel-dot.svg`} alt="" width={4} height={4} />
        <img className="work-wheel-dot work-wheel-dot--left" src={`${ASSETS}/wheel-dot.svg`} alt="" width={4} height={4} />
      </span>

      <span className="work-wheel-arrow">
        <img src={`${ASSETS}/wheel-arrow.svg`} alt="" width={36} height={36} />
      </span>
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
