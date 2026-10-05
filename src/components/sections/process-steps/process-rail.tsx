"use client";

// ---------------------------------------------------------------------------
// ProcessRail — the vertical progress track beside the "60 Days Process"
// cards. Split out of process-steps.tsx (a Server Component) because this is
// the only piece of that section that needs client-side interactivity.
//
// Rebuilt from the reference site's OWN markup and CSS, read directly off
// its live DOM (getComputedStyle + getBoundingClientRect on
// designmonks.co/services/ui-ux — not guessed from the pasted HTML alone,
// since the pasted <style> blocks didn't include the rules that actually
// position `.process-bar`/`.process-timeline`). What that inspection found,
// and what this file now mirrors exactly:
//
//   .process-bar { display:flex; flex-direction:column; align-items:center;
//                  position:sticky; top:100px; } // badge + track TOGETHER
//     svg.process-logo { width:56px; height:56px; }        // badge: plain
//                                                           // flow child #1
//     .process-timeline { position:relative; width:4px; height:385px; }
//       .process-timeline-active { height:0%; /* -> 100%, GSAP scrub */ }
//
// The critical fact that isn't obvious from a screenshot: the badge and the
// track are NOT two independently-positioned elements. They're both plain,
// static-flow children of ONE `position: sticky` box. And `.process-timeline`
// has a small, fixed CSS height (385px) — it does NOT stretch to match the
// full card column. Only the innermost `.process-timeline-active` div's
// height (0% -> 100% of that fixed 385px) is what GSAP ScrollTrigger `scrub`
// animates, keyed to scroll through `.process-wapper` (verified live: the
// fill reaches ~100% at the exact scroll offset the sticky box itself
// releases — i.e. trigger `top top+=100` / `bottom top+=100` on the card
// column, not on the badge or the fill).
//
// This is *why* the reference never has a "fill runs past the badge" bug —
// the bug this file used to have, and used to fix with pixel-rate-matching
// math (an absolute fill height set to exactly one rail-height, so it grew
// at 1:1 with scroll). That fix worked, but only because it was solving a
// problem the reference's own architecture doesn't create in the first
// place: badge and track can't drift apart in rate here, because they were
// never separately positioned to begin with — sticking the whole column
// keeps them rigidly attached, and the track's fixed (small) height means
// the fill is physically incapable of extending past where the track ends,
// let alone past the badge above it.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// The track's own fixed height, in px — a deliberate design constant, same
// role as the reference's own 385px (not derived from the card column's
// length, and not re-measured on resize). This is the one "how long is the
// pinned line" knob in this file; 320px was chosen to read comfortably under
// the 72px badge without dwarfing a single card. Free to retune.
const TRACK_HEIGHT_PX = 320;

interface ProcessRailProps {
  /** Position/size classes from process-steps.tsx (the `self-stretch` column
   *  that makes this match the card list's height, so the sticky box below
   *  has the full column's worth of scroll range to stay pinned across) —
   *  kept separate from this file's own behavior, same split as
   *  hero/moving-visual.tsx. */
  className?: string;
  /** The viewport-top pixel offset the FIRST card sticks at
   *  (`PROCESS_CARD_STICKY_TOP_PX` in process-steps.tsx) — reused as this
   *  rail's own sticky `top` offset (matching the reference's `.process-bar`
   *  sticking at the same offset its `.process-box`es do), so "the badge+
   *  track lock into place" and "card 1 locks into its stack" happen on the
   *  same frame instead of two independently-tuned thresholds drifting
   *  apart. Also used as the scroll-trigger's start/end reference point. */
  firstCardTopPx: number;
}

export function ProcessRail({
  className,
  firstCardTopPx,
}: ProcessRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;

    // Same skip as ui/ripple-image/ and hero/moving-visual.tsx (see
    // motion-interaction-references.md): "Reduce motion" gets the plain
    // static rail, not a toned-down scroll animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(fill, { height: 0 });

    // Matches what the reference actually does (confirmed live): the fill
    // is scrubbed from 0 to the track's own fixed height across exactly the
    // same scroll range the sticky box (rail) is pinned for — start when
    // the rail's own top reaches the sticky offset (the same frame it locks
    // into place), end when the rail's own bottom reaches that same offset
    // (the same frame it naturally releases and scrolls away). Both ends
    // are the rail's own top/bottom, so there's nothing external to keep in
    // sync — no last-card lookup, no separately-measured "total height" to
    // rate-match, because the fill's own container (the 320px track) never
    // grows past its fixed size regardless of how this trigger is tuned.
    const tween = gsap.to(fill, {
      height: TRACK_HEIGHT_PX,
      ease: "none",
      scrollTrigger: {
        trigger: rail,
        start: `top ${firstCardTopPx}px`,
        end: `bottom ${firstCardTopPx}px`,
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [firstCardTopPx]);

  return (
    <div ref={railRef} className={className} aria-hidden="true">
      {/* The one sticky unit — badge and track together, exactly like the
          reference's `.process-bar`: a single `position: sticky` flex
          column, not two independently-positioned pieces. Sticking the
          WHOLE column (rather than just the badge) is what makes the fill
          physically incapable of drawing past the badge — the track is
          always the same fixed distance below it, inside the same rigid,
          pinned box. Releases once the rail's own bottom edge (self-stretch
          tall, matching the card column) reaches this same offset. */}
      <div
        className="sticky flex flex-col items-center gap-4"
        style={{ top: `${firstCardTopPx}px` }}
      >
        <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-surface-accent">
          <Image src="/icons/process/imgFrame18.svg" alt="" width={36} height={36} />
        </div>
        {/* The track — a small, FIXED height (see TRACK_HEIGHT_PX), same
            role as the reference's `.process-timeline`. Not stretched to
            the card column; only the fill inside it grows.
            data-wash="keep": the page colour wash leaves the track and its
            olive fill as designed in both modes, so the progress stays
            visible on the dark page (components/motion/color-wash). */}
        <div
          data-wash="keep"
          className="relative w-1 shrink-0 rounded-full bg-gray-200"
          style={{ height: `${TRACK_HEIGHT_PX}px` }}
        >
          <div ref={fillRef} className="absolute left-0 top-0 w-full rounded-full bg-surface-accent" />
        </div>
      </div>
    </div>
  );
}
