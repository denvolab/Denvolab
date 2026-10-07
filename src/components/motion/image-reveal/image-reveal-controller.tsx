"use client";

// ---------------------------------------------------------------------------
// ImageRevealController: how every picture on the site comes in, and drifts
// as the page scrolls. Since Oct 7, 2026 it is produx.design's work-picture
// motion, which the user asked for "exact same vabe" on every image. Values
// read from that site's own script:
//
//   reveal    the picture starts clipped to its bottom-left corner,
//             clip-path inset(100% 100% 0% 0%), and enlarged 1.3x from its
//             bottom-left corner. When its top passes 85% of the screen (once)
//             it opens to inset(0) and settles to 1x over 1.7s, power4.out.
//             A picture already that high when the page opens is simply shown.
//             Here (Oct 7, 2026, the user wanted it sooner and quicker): at 95%
//             of the screen and over 1.1s.
//   parallax  the picture is 110% of its frame's height (top -5%) and moves
//             through it as the frame crosses the screen (yPercent -10 to +10
//             there, from "top bottom" to "bottom top", scrubbed).
//
// On this site: the clip is on the frame (the box marked data-image-reveal),
// the 1.3x is on the pictures inside it, through the CSS variable
// --reveal-scale and the separate `scale` property, so it never fights the
// transforms some pictures already have (carousel parallax). The scroll drift
// uses the `translate` property for the same reason, and only on cover-cropped
// pictures inside a frame that clips (so the taller picture never shows past
// its rounded box). It travels ±4.5% instead of ±10%: with the 5% of extra
// picture above and below, ±10% would open an empty strip on this site's
// shorter frames. The Work cards' ripple pictures (data-ripple-image) keep the
// reveal but not the drift: their frame doesn't clip, so the hover bulge can
// spill out.
//
// HOW TO USE: put `data-image-reveal` on the box that holds a picture (its
// rounded frame, or the whole card when the text sits on the picture). One
// instance of this controller, in app/layout.tsx, wires up every such box on
// every page, and again after each client-side page change.
//
// Smooth scrolling (Oct 7, 2026, the user: still "jhaki" in the image
// sections): nothing here writes styles on every frame any more. The reveal
// is a Web Animation (clip-path on the frame, `scale` on its pictures), which
// the browser runs off the main thread, so it can't stall Lenis (Lenis moves
// the page from the main thread). The drift is a CSS scroll-driven animation
// (image-reveal.css) where the browser has them; only older browsers get a
// scrubbed ScrollTrigger.
//
// "Reduce motion" and no-JS visitors never get the start state or the drift,
// so pictures are always there for them (see image-reveal.css).
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "[data-image-reveal]";
const START = "top 95%"; // produx.design: 85%; earlier here (Oct 7, 2026: "kom scroll ei")
const DURATION = 1100; // ms; produx.design: 1.7s; faster here (Oct 7, 2026)
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // GSAP power4.out (produx.design)
const FROM_CLIP = "inset(100% 100% 0% 0%)";
const TO_CLIP = "inset(0% 0% 0% 0%)";
const FROM_SCALE = 1.3; // produx.design
const DRIFT = 4.5; // % of the picture's height either way (produx: 10, see above)

/** Cover-cropped pictures in this frame (not in a frame nested inside it)
 *  whose box clips them, so they can be made taller and drift. */
function driftPictures(frame: HTMLElement) {
  return Array.from(frame.querySelectorAll<HTMLImageElement>("img")).filter((img) => {
    if (img.closest(SELECTOR) !== frame || img.closest("[data-ripple-image]")) return false;
    const style = getComputedStyle(img);
    if (style.position !== "absolute" || style.objectFit !== "cover") return false;
    for (let el = img.parentElement; el; el = el.parentElement) {
      const overflow = getComputedStyle(el).overflow;
      if (overflow.includes("hidden") || overflow.includes("clip")) return true;
      if (el === frame) break;
    }
    return false;
  });
}

export function ImageRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers: ScrollTrigger[] = [];
    const animations: Animation[] = [];
    const cssDrift = CSS.supports("animation-timeline: view()");

    const reveal = (frame: HTMLElement) => {
      const timing: KeyframeAnimationOptions = { duration: DURATION, easing: EASE, fill: "both" };
      const running = [
        frame.animate([{ clipPath: FROM_CLIP }, { clipPath: TO_CLIP }], timing),
        ...Array.from(frame.querySelectorAll<HTMLElement>("img, video"))
          .filter((media) => media.closest(SELECTOR) === frame)
          .map((media) => media.animate([{ scale: String(FROM_SCALE) }, { scale: "1" }], timing)),
      ];
      animations.push(...running);
      running[0].finished
        .then(() => {
          // The start state's CSS stops applying, then the held end frames go.
          frame.dataset.imageReveal = "done";
          running.forEach((animation) => animation.cancel());
        })
        .catch(() => {});
    };

    const registered = new WeakSet<HTMLElement>();
    const registerFrames = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach((frame) => {
      if (registered.has(frame)) return;
      registered.add(frame);

      // Scroll drift, for the frame's whole life (also after the reveal).
      const pictures = driftPictures(frame);
      if (pictures.length) {
        pictures.forEach((img) => (img.dataset.imageDrift = ""));
        if (!cssDrift) triggers.push(
          ScrollTrigger.create({
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => frame.style.setProperty("--reveal-drift", `${-DRIFT + 2 * DRIFT * self.progress}%`),
          }),
        );
      }

      if (frame.dataset.imageReveal === "done") return;
      // Already high on the screen when the page opens: just show it.
      if (frame.getBoundingClientRect().top < 0.95 * window.innerHeight) {
        frame.dataset.imageReveal = "done";
        return;
      }
      frame.dataset.imageRevealReady = "";
      triggers.push(
        ScrollTrigger.create({
          trigger: frame,
          start: START,
          once: true,
          onEnter: () => reveal(frame),
        }),
      );
    });

    registerFrames();
    // App Router can stream sections after this controller mounts.
    const additions = new MutationObserver(records => {
      // Text splitting and hover labels also mutate this tree. They must not
      // rescan every image frame while the visitor is scrolling.
      const addedFrames = records.some(record => Array.from(record.addedNodes).some(node =>
        node instanceof Element && (node.matches(SELECTOR) || node.querySelector(SELECTOR))));
      if (addedFrames) registerFrames();
    });
    additions.observe(document.body, { childList: true, subtree: true });

    // Pictures and fonts that load late can move things down the page after
    // the trigger points were measured: re-measure when the page changes
    // height (debounced).
    let timer = 0;
    let width = document.body.offsetWidth;
    let height = document.body.offsetHeight;
    const observer = new ResizeObserver(() => {
      const nextWidth = document.body.offsetWidth;
      const nextHeight = document.body.offsetHeight;
      if (width === nextWidth && height === nextHeight) return;
      width = nextWidth;
      height = nextHeight;
      window.clearTimeout(timer);
      // A refresh can temporarily reset native scroll positions. Defer it
      // until scrolling finishes rather than interrupting Lenis interpolation.
      timer = window.setTimeout(() => ScrollTrigger.refresh(true), 200);
    });
    observer.observe(document.body);

    return () => {
      additions.disconnect();
      observer.disconnect();
      window.clearTimeout(timer);
      triggers.forEach((trigger) => trigger.kill());
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
