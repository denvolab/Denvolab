"use client";

// ---------------------------------------------------------------------------
// ImageRevealController: the "pictures rise and fade in as you scroll"
// effect the user asked for (Oct 2026), from the two reference sites:
//
//   juice.agency   every work card has `data-card-reveal`; Work.astro's
//                  script runs, once, when the card's top reaches 70% of the
//                  screen:  gsap.to(card, { opacity: 1, y: 0, duration: .8,
//                  ease: "circ.out" })
//   zypsy.com      the work cards (`.fade-in`) start at
//                  translate3d(0, 5em, 0) with opacity 0 and come up to 0.
//
// So: a picture's frame starts 5em lower and invisible (image-reveal.css),
// and the first time its top reaches 70% of the screen it rises into place
// over 0.8s with circ.out.
//
// HOW TO USE: put `data-image-reveal` on the box that holds a picture (its
// rounded frame, or the whole card when the text sits on the picture). One
// instance of this controller, in app/layout.tsx, wires up every such box on
// every page, and again after each client-side page change. Nothing else is
// needed per section, and the box keeps its own classes and children.
//
// Leave it off pictures that already move (the hero's showreel card, the
// About hero photos, the marquee sparks, logo and testimonial marquees, the
// AI section): their own animation stays as it is.
//
// "Reduce motion" and no-JS visitors never get the hidden start state, so
// pictures are always there for them (see image-reveal.css).
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "[data-image-reveal]";
// Smoothed on Oct 7, 2026 (the user: the pictures "hut kore upore uthe
// asteche", and the page seemed to shake while scrolling). Measured with a
// real wheel scroll: with the old values (start at 70%, 0.8s circ.out) a
// picture sat invisible until its top was 70% down the screen, then jumped
// ~15px ahead of the page in the first frame, because circ.out starts almost
// vertically. Now the fade starts as the picture comes onto the screen, and
// a gentle ease over a longer time lets it rise without a jolt.
const START = "clamp(top 92%)"; // clamp(): a picture at the very end of a page still plays
const DURATION = 1.1;
const EASE = "power2.out";

export function ImageRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    const registered = new WeakSet<HTMLElement>();
    const registerFrames = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach((frame) => {
      if (frame.dataset.imageReveal === "done" || registered.has(frame)) return;
      registered.add(frame);
      frame.dataset.imageRevealReady = "";
      triggers.push(
        ScrollTrigger.create({
          trigger: frame,
          start: START,
          once: true,
          onEnter: () => {
            tweens.push(
              gsap.to(frame, {
                opacity: 1,
                y: 0,
                duration: DURATION,
                ease: EASE,
                force3D: true, // stay on the GPU for the whole rise, no 2D switch mid-way
                onComplete: () => {
                  frame.dataset.imageReveal = "done";
                  // Hand the box back to its own CSS once it has arrived, so
                  // no leftover inline transform gets in the way of hovers.
                  gsap.set(frame, { clearProps: "opacity,transform" });
                },
              }),
            );
          },
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
      tweens.forEach((tween) => tween.kill());
    };
  }, [pathname]);

  return null;
}
