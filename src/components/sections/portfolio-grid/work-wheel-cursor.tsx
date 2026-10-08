"use client";
// ---------------------------------------------------------------------------
// WorkWheelCursor: on a mouse, over a Work project's picture the
// "EXPLORE THE STORY" wheel (ui/work-wheel) rides next to the pointer. It
// works the same way as the carousels' "Drag" cursor (ui/loop-carousel.tsx),
// as the user asked on Oct 7, 2026 ("drag e jevabe use korechi same vabe";
// then: keep the pointer visible, like Drag):
//
//   - one wheel for the whole section, portalled to <body> as a fixed layer
//     and moved with translate3d, so following the mouse never reads layout;
//   - it eases toward the mouse, closing 12% of the gap per 60fps frame
//     (the Drag cursor's 0.88 decay), which gives the heavy, smooth glide,
//     including from one picture to the next;
//   - the pointer stays visible and the wheel sits 18px to its right,
//     level with it (the Drag pill's place);
//   - it grows from 0.4 to full size out of its left edge and fades in with
//     the Drag pill's curve, cubic-bezier(.645,.045,.355,1), 0.5s / 0.35s.
//
// Shown while the mouse is over a picture marked `data-wheel-cursor` (cards
// with a case study). The section gets `data-wheel-cursor-active` once this
// runs: only then is the in-card wheel kept for keyboard focus and touch
// (work-wheel.css), so without JavaScript the old centred hover wheel still
// shows.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { WorkWheel } from "@/components/ui/work-wheel";

const subscribe = () => () => {};
const DECAY = 0.88; // the Drag cursor's follow: 1 - 0.88 = 12% per frame
const TARGET = "[data-wheel-cursor]";
const SETTLE_MS = 350; // after a carousel drag: the "Drag" pill fades out first

export function WorkWheelCursor() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const marker = useRef<HTMLSpanElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = marker.current?.closest<HTMLElement>("section");
    const el = cursor.current;
    if (!section || !el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    section.dataset.wheelCursorActive = "";

    const s = { x: 0, y: 0, mouseX: 0, mouseY: 0, ready: false, visible: false };
    let raf = 0;
    let previous = 0;

    const tick = (time: number) => {
      const step = previous ? Math.min(time - previous, 50) / 16.667 : 1;
      previous = time;
      const ease = reduced.matches ? 1 : 1 - Math.pow(DECAY, step);
      s.x += (s.mouseX - s.x) * ease;
      s.y += (s.mouseY - s.y) * ease;
      const settled = Math.abs(s.mouseX - s.x) < 0.1 && Math.abs(s.mouseY - s.y) < 0.1;
      if (settled) {
        s.x = s.mouseX;
        s.y = s.mouseY;
      }
      el.style.transform = `translate3d(${s.x}px,${s.y}px,0)`;
      // Keep going while shown, and until it has caught up after hiding.
      raf = !settled ? requestAnimationFrame(tick) : 0;
    };
    const run = () => {
      if (raf) return;
      previous = 0;
      raf = requestAnimationFrame(tick);
    };
    const show = (visible: boolean) => {
      if (s.visible === visible) return;
      s.visible = visible;
      el.classList.toggle("is-visible", visible);
      run();
    };

    const track = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      s.mouseX = event.clientX;
      s.mouseY = event.clientY;
      if (!s.ready) {
        s.ready = true;
        s.x = s.mouseX;
        s.y = s.mouseY;
      }
      run();
    };
    // Dragging a carousel (sections/more-crafts): the wheel steps aside once
    // when the drag starts and comes back once it ends, if the pointer is
    // then on a picture. Without this it shrank and grew every time the
    // pointer crossed the gap between two cards, and its glass was redrawn
    // over the moving pictures on every frame ("zoom in, hut kore zoom out"
    // while dragging, Oct 7, 2026).
    let dragging = false;
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target as Element | null)?.closest?.(".loop-carousel")) return;
      dragging = true;
      show(false);
      window.addEventListener("pointerup", up, { once: true });
      window.addEventListener("pointercancel", up, { once: true });
    };
    // Back after the cards' glide has settled (its glass over a still
    // moving picture made that picture jerk), if the pointer is then on one.
    let backTimer = 0;
    const up = () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.clearTimeout(backTimer);
      backTimer = window.setTimeout(() => {
        dragging = false;
        const under = document.elementFromPoint(s.mouseX, s.mouseY);
        show(!!under?.closest(TARGET) && section.contains(under));
      }, SETTLE_MS);
    };

    // Boundary events also arrive when the page scrolls a picture out from
    // under a still mouse, so the wheel hides then too.
    const over = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      track(event);
      if (!dragging) show(!!(event.target as Element | null)?.closest?.(TARGET));
    };
    const out = (event: PointerEvent) => {
      if (dragging) return;
      const next = event.relatedTarget as Element | null;
      if (!next?.closest?.(TARGET)) show(false);
    };
    const leave = () => {
      if (!dragging) show(false);
    };

    section.addEventListener("pointermove", track, { passive: true });
    section.addEventListener("pointerover", over);
    section.addEventListener("pointerout", out);
    section.addEventListener("pointerleave", leave);
    section.addEventListener("pointerdown", down);
    return () => {
      section.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.clearTimeout(backTimer);
      delete section.dataset.wheelCursorActive;
      section.removeEventListener("pointermove", track);
      section.removeEventListener("pointerover", over);
      section.removeEventListener("pointerout", out);
      section.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [mounted]);

  return (
    <>
      <span ref={marker} hidden aria-hidden="true" />
      {mounted &&
        createPortal(
          <div ref={cursor} className="work-wheel-cursor" aria-hidden="true">
            <div className="work-wheel-cursor-scale">
              <WorkWheel pathId="work-wheel-cursor-path" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
