"use client";

// ---------------------------------------------------------------------------
// MovingVisual — the hero's mockup/video card, tracking the cursor instead of
// sitting static. Split out of hero.tsx (a Server Component) because this is
// the only piece of the hero that needs client-side interactivity.
//
// Interaction pattern lifted from a reference site the user sent
// (studionamma.com's hero — the `studionamma.com` / `vucko.co` entries in the
// motion-interaction-references project doc, "cursor tracker" / "header
// mouse-tracking video"): the card's center tracks the cursor 1:1 (the
// cursor sits in the middle of the card) with a heavy `power4` ease (so it
// trails rather than snaps), tilts on both axes based on how fast the cursor
// is moving, and settles into a slightly larger "resting" scale whenever the
// cursor stops for a beat.
//
// Adapted for this site's fixed-aspect, percentage-positioned hero (see
// hero/README.md): the reference drives position off the whole viewport
// (`e.clientX - window.innerWidth / 2`); here the card's travel is clamped
// to the hero <section>'s own bounds instead of the whole window, so the
// card never gets pushed outside the section it lives in, and fades out
// when the cursor leaves the hero entirely.
//
// CLICK TO PLAY (Oct 2026): the card is a button. Because it follows the
// cursor, a click anywhere in the empty parts of the hero lands on it and
// opens the full showreel with sound in a player dialog (showreel-dialog.tsx).
// The small muted preview pauses while the player is open and resumes after.
// A lime "PLAY REEL" pill on the card says it can be clicked.
//
// Touch screens (no hover) and "Reduce motion" skip the tracking: the card
// stays visible at its Figma spot and a tap opens the player. Keyboard focus
// also shows the card (the button is a normal tab stop).
// ---------------------------------------------------------------------------
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShowreelDialog, type ShowreelDialogHandle } from "./showreel-dialog";

// How long the cursor has to sit still before the card settles — matches the
// reference's own value.
const IDLE_MS = 66;
// Resting vs settled scale for the inner media element (reference uses
// 1 -> 1.2; toned down here since this card is a small fixed mockup slot,
// not a full-bleed hero video, and 1.2 read as too large a jump at that
// size).
const SETTLED_SCALE = 1.08;

interface MovingVisualProps {
  /** Position/size classes from hero.tsx (the absolute %-based slot this
   *  card rests in) — kept separate from this file's own behavior so the
   *  layout math stays in hero.tsx, next to the rest of the section's
   *  percentage positions. */
  className?: string;
  /** Real video to autoplay. hero.tsx now passes "/videos/hero-showreel.mp4"
   *  (added Sept 23, 2026, see that file). Stays optional and defaults to
   *  `null` — a caller with no clip yet gets the plain placeholder box, same
   *  as this one did before the real video was wired in. */
  videoSrc?: string | null;
}

export function MovingVisual({ className, videoSrc = null }: MovingVisualProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<ShowreelDialogHandle>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const media = mediaRef.current;
    if (!wrapper || !media) return;

    // Same skip as ui/ripple-image/ (see motion-interaction-references.md):
    // a viewer with "Reduce motion" on gets the plain static card, not a
    // toned-down version of the tracking effect. Touch screens skip it too:
    // with no cursor the card would never fade in, so it couldn't be tapped.
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (width < 1024px)").matches) return;

    const xTo = gsap.quickTo(wrapper, "x", { duration: 1, ease: "power4" });
    const yTo = gsap.quickTo(wrapper, "y", { duration: 1, ease: "power4" });
    const rotationYTo = gsap.quickTo(wrapper, "rotationY", { duration: 1, ease: "power4" });
    const rotationXTo = gsap.quickTo(wrapper, "rotationX", { duration: 1, ease: "power4" });
    // GSAP's `scale` shorthand can't be used with quickTo here — it warns
    // "scale not eligible for reset. Try splitting into individual
    // properties" and the tween silently never applies. Splitting into
    // scaleX/scaleY (as the warning itself suggests) fixes it.
    const scaleXTo = gsap.quickTo(media, "scaleX", { duration: 2, ease: "power1" });
    const scaleYTo = gsap.quickTo(media, "scaleY", { duration: 2, ease: "power1" });
    const opacityTo = gsap.quickTo(wrapper, "opacity", { duration: 0.8, ease: "power2" });

    gsap.set(wrapper, { opacity: 0, transformPerspective: 800, x: 0, y: 0 });
    gsap.set(media, { scaleX: 1, scaleY: 1 });

    // The card's own resting box (before any transform) and the hero
    // <section>'s box, both in viewport coordinates. These are measured
    // once up front (and re-measured on resize) rather than read fresh on
    // every mousemove — reading wrapper.getBoundingClientRect() while a
    // transform is already applied bakes the *current* offset into the
    // "center" used to compute the *next* target, which quietly halves the
    // travel distance every frame and made the card look almost frozen in
    // place. x/y are reset to 0 before every measurement to avoid that.
    let restingRect = wrapper.getBoundingClientRect();
    let containerRect = (wrapper.closest("section") ?? document.body).getBoundingClientRect();

    const measure = () => {
      gsap.set(wrapper, { x: 0, y: 0 });
      restingRect = wrapper.getBoundingClientRect();
      containerRect = (wrapper.closest("section") ?? document.body).getBoundingClientRect();
    };
    measure();

    let lastX = 0;
    let lastY = 0;
    let hasEntered = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      const isInsideHero =
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;

      if (!isInsideHero) {
        if (hasEntered) {
          hasEntered = false;
          opacityTo(0);
          xTo(0);
          yTo(0);
          rotationXTo(0);
          rotationYTo(0);
        }
        return;
      }

      if (!hasEntered) {
        hasEntered = true;
        opacityTo(1);
        lastX = e.clientX;
        lastY = e.clientY;
      }

      // The card's center tracks the cursor 1:1 — the cursor sits in the
      // middle of the card — clamped only so the card's edges never leave
      // the hero section (it pins to the nearest edge there instead of
      // spilling out of it).
      const targetLeft = gsap.utils.clamp(
        containerRect.left,
        containerRect.right - restingRect.width,
        e.clientX - restingRect.width / 2,
      );
      const targetTop = gsap.utils.clamp(
        containerRect.top,
        containerRect.bottom - restingRect.height,
        e.clientY - restingRect.height / 2,
      );

      rotationYTo((e.clientX - lastX) * 2);
      rotationXTo(-(e.clientY - lastY) * 2);
      xTo(targetLeft - restingRect.left);
      yTo(targetTop - restingRect.top);
      scaleXTo(1);
      scaleYTo(1);
      lastX = e.clientX;
      lastY = e.clientY;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        rotationYTo(0);
        rotationXTo(0);
        scaleXTo(SETTLED_SCALE);
        scaleYTo(SETTLED_SCALE);
      }, IDLE_MS);
    };

    // The hero is a percentage-scaled box (see hero/README.md), so both
    // rects shift on resize — re-measure (with the transform reset first)
    // rather than let them go stale.
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      clearTimeout(idleTimer);
      clearTimeout(resizeTimer);
    };
  }, []);

  const openPlayer = () => {
    previewRef.current?.pause();
    dialogRef.current?.open();
  };

  return (
    <>
      {/* `has-[:focus-visible]:opacity-100!` beats GSAP's inline opacity, so
          a keyboard user always sees the card they've tabbed to. */}
      <div
        ref={wrapperRef}
        className={`${className ?? ""} has-[:focus-visible]:opacity-100!`}
        data-figma-node="230:4166"
      >
        <button
          ref={mediaRef}
          type="button"
          onClick={videoSrc ? openPlayer : undefined}
          disabled={!videoSrc}
          aria-haspopup="dialog"
          aria-label="Play the Denvo Lab showreel (with sound)"
          className="group/reel relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-foreground-inverse/10 bg-surface-dark-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-default disabled:cursor-default"
        >
          {videoSrc ? (
            <video
              ref={previewRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              tabIndex={-1}
              className="pointer-events-none h-full w-full object-cover"
            />
          ) : null}
          {videoSrc ? (
            <span
              aria-hidden="true"
              className="absolute bottom-[6%] left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-brand-default px-4 py-2 font-mono text-label-md uppercase text-text-on-brand shadow-lg transition-transform duration-300 group-hover/reel:scale-105"
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                <path d="M0 0v12l10-6z" />
              </svg>
              Play reel
            </span>
          ) : null}
        </button>
      </div>

      {videoSrc ? (
        <ShowreelDialog
          ref={dialogRef}
          videoSrc={videoSrc}
          onClosed={() => void previewRef.current?.play().catch(() => {})}
        />
      ) : null}
    </>
  );
}
