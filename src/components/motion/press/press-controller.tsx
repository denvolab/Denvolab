"use client";

// ---------------------------------------------------------------------------
// PressController: the press feedback of interactive cards (data-press-card),
// eased the way Lenis eases the scroll (the user, Oct 7, 2026: the CSS
// transition felt abrupt; "lenis jevabe heavy smooth"). Mounted once in
// app/layout.tsx.
//
// The card's `scale` chases a target with Lenis's lerp, frame-rate
// independent: each 60fps frame closes LERP of the gap. Pressing sets the
// target to PRESSED; letting go sets it back to 1, but not before the press
// has lasted MIN_PRESS_MS, so even a quick tap visibly sinks and rises. The
// separate `scale` property adds to any transform the card already has.
//
// data-press-target="<selector>" on the pressed element moves those
// descendants instead of the element itself: the drag carousels use it so
// every card sinks a little while you drag and rises when you let go.
// "Reduce motion": nothing.
// ---------------------------------------------------------------------------
import { useEffect } from "react";

const SELECTOR = "[data-press-card]";
const PRESSED = 0.975;
const LERP = 0.14; // per 60fps frame, like Lenis's lerp
const MIN_PRESS_MS = 180;

interface Press {
  el: HTMLElement;
  /** What actually scales: the element, or its data-press-target matches. */
  targets: HTMLElement[];
  value: number;
  target: number;
  downAt: number;
  release: number;
}

export function PressController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const presses = new Map<HTMLElement, Press>();
    let raf = 0;
    let last = 0;

    const tick = (time: number) => {
      const step = last ? Math.min(time - last, 50) / 16.667 : 1;
      last = time;
      const ease = 1 - Math.pow(1 - LERP, step);
      for (const press of presses.values()) {
        press.value += (press.target - press.value) * ease;
        if (press.target === 1 && Math.abs(1 - press.value) < 0.0005) {
          press.targets.forEach((t) => t.style.removeProperty("scale"));
          presses.delete(press.el);
          continue;
        }
        const value = press.value.toFixed(4);
        press.targets.forEach((t) => (t.style.scale = value));
      }
      raf = presses.size ? requestAnimationFrame(tick) : 0;
      if (!raf) last = 0;
    };
    const run = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const insideCarousel = (event.target as Element | null)?.closest('.loop-carousel, [aria-roledescription="carousel"]');
      if (insideCarousel && (event.pointerType === "touch" || window.matchMedia("(max-width: 767px), (pointer: coarse)").matches)) return;
      const el = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR);
      if (!el) return;
      const selector = el.dataset.pressTarget;
      const targets = selector ? Array.from(el.querySelectorAll<HTMLElement>(selector)) : [el];
      const press = presses.get(el) ?? { el, targets, value: 1, target: 1, downAt: 0, release: 0 };
      press.targets = targets;
      window.clearTimeout(press.release);
      press.target = PRESSED;
      press.downAt = performance.now();
      presses.set(el, press);
      run();
    };
    const up = () => {
      for (const press of presses.values()) {
        if (press.target !== PRESSED) continue;
        const wait = Math.max(0, MIN_PRESS_MS - (performance.now() - press.downAt));
        window.clearTimeout(press.release);
        press.release = window.setTimeout(() => {
          press.target = 1;
          run();
        }, wait);
      }
    };

    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointercancel", up, { passive: true });
    window.addEventListener("blur", up);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", up);
      cancelAnimationFrame(raf);
      for (const press of presses.values()) {
        window.clearTimeout(press.release);
        press.targets.forEach((t) => t.style.removeProperty("scale"));
      }
    };
  }, []);

  return null;
}
