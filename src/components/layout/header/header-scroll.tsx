"use client";

// ---------------------------------------------------------------------------
// HeaderScroll: the navbar hides while the page scrolls down and comes back
// as soon as it scrolls up (the user, Oct 7, 2026). Mounted by header.tsx;
// it only sets attributes on the header, header.module.css does the motion
// (a slide with a soft ease-out, on the compositor).
//
//   data-hidden    scrolled down by more than TOLERANCE since the last turn,
//                  and past the header's own height
//   data-scrolled  away from the top
//
// Lenis moves the real scroll position, so plain scroll events are enough.
// Read once per frame at most. Never hidden while the mobile menu is open
// (the page doesn't scroll then) or with keyboard focus inside the header.
// ---------------------------------------------------------------------------
import { useEffect } from "react";

const TOLERANCE = 8; // px of scrolling in one direction before it reacts

export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    let lastY = window.scrollY;
    let turnY = lastY; // where the direction last changed
    let goingDown = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const down = y > lastY;
      if (y !== lastY && down !== goingDown) {
        goingDown = down;
        turnY = lastY;
      }
      lastY = y;

      header.toggleAttribute("data-scrolled", y > 0);
      if (y <= header.offsetHeight) header.removeAttribute("data-hidden");
      else if (header.contains(document.activeElement)) header.removeAttribute("data-hidden");
      else if (goingDown && y - turnY > TOLERANCE) header.setAttribute("data-hidden", "");
      else if (!goingDown && turnY - y > TOLERANCE) header.removeAttribute("data-hidden");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    header.addEventListener("focusin", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onScroll);
      cancelAnimationFrame(frame);
      header.removeAttribute("data-hidden");
      header.removeAttribute("data-scrolled");
    };
  }, []);

  return null;
}
