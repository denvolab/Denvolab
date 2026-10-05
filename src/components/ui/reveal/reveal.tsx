"use client";

// ---------------------------------------------------------------------------
// Reveal — wraps its children in a box that fades in and rises a little the
// first time it scrolls into view. Client Component because it needs the
// browser's IntersectionObserver; everything else (the hidden start state,
// the transition, the reduced-motion and no-JS fallbacks) lives in
// reveal.module.css.
//
// It plays once and then stays put. When the box is seen it gets
// `data-in="true"`, which the CSS uses for the entrance and which other
// components can use to start their own animation (about-benefits does).
//
// Props:
//   delay    milliseconds to wait before the entrance starts. Use small
//            steps (100 to 150) to stagger neighbours.
//   distance how many pixels it rises from. Default 30.
// ---------------------------------------------------------------------------
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./reveal.module.css";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export function Reveal({ children, className, delay = 0, distance = 30 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Very old browsers: skip the animation and show the content.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.in = "true";
          observer.disconnect();
        }
      },
      // Wait until a little of the box is really on screen, not just touching
      // the bottom edge of the window.
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.root, className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-distance": `${distance}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
