"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One scroll engine, synchronized with the site's existing GSAP animations. */
export function SmoothScroll() {
  const pathname = usePathname();
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const configure = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = undefined;
      instance.current = null;
      if (motion.matches) return;

      lenis = new Lenis({
        // html is h-full; observe the growing body so streamed sections and
        // loaded media update the scroll limit without per-frame layout reads.
        content: document.body,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        autoToggle: false,
        // Cache dimensions instead of forcing a document measurement every tick.
        autoResize: true,
        prevent: (node) => node.hasAttribute("data-lenis-prevent") ||
          node.tagName === "TEXTAREA" || node.getAttribute("role") === "dialog" ||
          node.id === "mobile-nav-panel" ||
          ((node === document.body || node === document.documentElement) &&
            ["hidden", "clip"].includes(getComputedStyle(node).overflowY)),
        stopInertiaOnNavigate: true,
        anchors: true,
      });
      instance.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      // Advance scrolling before GSAP renders scroll-linked animation frames.
      gsap.ticker.add(tick, false, true);
      gsap.ticker.lagSmoothing(0);
    };

    configure();
    motion.addEventListener("change", configure);
    return () => {
      motion.removeEventListener("change", configure);
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
