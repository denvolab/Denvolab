"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fxOff } from "@/lib/motion/fx-off";

gsap.registerPlugin(ScrollTrigger);

const WHEEL_IDLE_MS = 160;
const LERP_DESKTOP = 0.04;
const LERP_PHONE = 0.1;

/** One scroll engine, synchronized with the site's existing GSAP animations. */
export function SmoothScroll() {
  const pathname = usePathname();
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(width < 768px)");
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)");
    // The phone's address bar showing and hiding changes the window height
    // while scrolling; ScrollTrigger needn't re-measure for that.
    ScrollTrigger.config({ ignoreMobileResize: true });
    const setLerp = () => {
      if (lenis) lenis.options.lerp = phone.matches ? LERP_PHONE : LERP_DESKTOP;
    };
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    // Keyboard/focus scrolling is native. Cancel wheel inertia first so it
    // cannot pull the viewport back after the browser moves to a focused link.
    const cancelInertia = () => lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (["Tab", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelInertia();
    };

    const configure = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = undefined;
      instance.current = null;
      // Touch screens scroll natively, with no Lenis at all (Oct 8, 2026:
      // on Android and iOS a finger flick only went a short way). Even with
      // touch smoothing off, Lenis listened to every touch move, so the
      // phone waited for JavaScript before each bit of scrolling.
      if (motion.matches || touch.matches || fxOff("lenis")) return;

      lenis = new Lenis({
        // html is h-full; observe the growing body so streamed sections and
        // loaded media update the scroll limit without per-frame layout reads.
        content: document.body,
        // Each frame covers this much of the distance left (lower is
        // heavier, higher is quicker). Desktop: 0.04, a heavy, smooth glide
        // (the user's choice, Oct 7, 2026; was 0.12, duration 1.6, then
        // 0.06). Narrow screens: 0.1, light and quick (the user, Oct 7, 2026:
        // 0.04 felt broken there; 0.9 then moved a mouse wheel in steps, notch
        // by notch). Fingers on a real phone scroll natively (syncTouch off),
        // this only applies to a wheel. Updated live below.
        lerp: phone.matches ? LERP_PHONE : LERP_DESKTOP,
        smoothWheel: true,
        syncTouch: false,
        autoToggle: false,
        // Cache dimensions instead of forcing a document measurement every tick.
        autoResize: true,
        // CAL-*: Cal.com's booking popup (contact page, book-call-button.tsx).
        prevent: (node) => node.hasAttribute("data-lenis-prevent") ||
          node.tagName === "TEXTAREA" || node.getAttribute("role") === "dialog" ||
          node.id === "mobile-nav-panel" || node.tagName.startsWith("CAL-"),
        stopInertiaOnNavigate: true,
        anchors: true,
      });
      instance.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      // Advance scrolling before GSAP renders scroll-linked animation frames.
      gsap.ticker.add(tick, false, true);
      gsap.ticker.lagSmoothing(0);
    };

    // While the wheel turns, the page under a still cursor isn't hovered:
    // every card sliding under it used to start its hover (the Work wheel's
    // blur, picture zoom, ripple) and stop it a moment later, in the middle
    // of the scroll (Oct 7, 2026, "image section a jhaki"). `is-wheeling`
    // (globals.css) turns pointer events off in the page until the wheel
    // has been still for WHEEL_IDLE_MS; clicks work again right after.
    const root = document.documentElement;
    let wheelTimer = 0;
    const onWheel = (event: WheelEvent) => {
      // Sideways swipes belong to a row that scrolls sideways (Industries):
      // it must keep receiving them.
      if (event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      if (!root.classList.contains("is-wheeling")) root.classList.add("is-wheeling");
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => root.classList.remove("is-wheeling"), WHEEL_IDLE_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });

    configure();
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", cancelInertia);
    motion.addEventListener("change", configure);
    touch.addEventListener("change", configure);
    phone.addEventListener("change", setLerp);
    return () => {
      motion.removeEventListener("change", configure);
      touch.removeEventListener("change", configure);
      phone.removeEventListener("change", setLerp);
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(wheelTimer);
      root.classList.remove("is-wheeling");
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", cancelInertia);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    // Keep one engine across routes. Drop outgoing inertia and synchronize to
    // the position chosen by Next's navigation/scroll restoration.
    const frame = requestAnimationFrame(() => {
      const lenis = instance.current;
      if (!lenis) return;
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
