"use client";

import { useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { fxOff } from "@/lib/motion/fx-off";

const subscribeToClient = () => () => {};
const DRAG_START_PX = 6; // pointer travel before a press becomes a drag
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Reference motion: 5% drag easing, 0.93 momentum decay and a 12% cursor follower.
 *  `dragCursor`: the "Drag" pill shows on hover (true, default), only while
 *  the carousel is pressed and dragged ("press", for cards with their own
 *  hover cursor: sections/more-crafts, "Explore the story"), or never (false). */
export function LoopCarousel({ children, className = "", label, speed = 24, dragCursor = true }: { children: ReactNode; className?: string; label: string; speed?: number; dragCursor?: boolean | "press" }) {
  const viewport = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribeToClient, clientSnapshot, serverSnapshot);
  const motion = useRef({ current: 0, target: 0, momentum: 0, width: 0, pointer: -1, startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0, distance: 0, suppressClick: false, hover: false, focus: false, cursorX: 0, cursorY: 0, mouseX: 0, mouseY: 0, cursorReady: false, fine: false, reduced: false, touch: false });

  // Links and buttons in the looping copies stay clickable but are skipped
  // by Tab (they repeat the real row, which keeps keyboard access).
  useEffect(() => {
    viewport.current?.querySelectorAll<HTMLElement>("[data-loop-copy] :is(a, button, input, select, textarea, [tabindex])")
      .forEach(el => el.setAttribute("tabindex", "-1"));
  });

  useEffect(() => {
    const el = viewport.current!;
    const track = el.querySelector<HTMLElement>(".loop-carousel-track")!;
    const group = el.querySelector<HTMLElement>(".loop-carousel-group")!;
    const state = motion.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const preferences = () => { state.reduced = reduced.matches || fxOff("carousel"); state.fine = fine.matches; };
    preferences();
    reduced.addEventListener("change", preferences);
    fine.addEventListener("change", preferences);
    // Not RippleImage pictures: the ripple draws the picture unshifted, so a
    // parallax-shifted one would jump when the ripple starts (more-crafts).
    const images = Array.from(el.querySelectorAll<HTMLImageElement>("img.object-cover")).filter(image => !image.closest("[data-ripple-image]"));
    // The track moves with a sub-pixel transform, not scrollLeft: scrollLeft
    // snaps to whole pixels, so the cards stepped 1px at a time while the
    // parallax inside them moved smoothly, and the pictures shook. The
    // geometry the parallax needs (viewport left/width, each frame's offset
    // in the track) is cached here and on resize, so the loop below never
    // reads layout while the page is scrolling.
    const geometry = { left: 0, width: 0, cards: [] as { offset: number; width: number }[] };
    const measure = () => {
      const width = group.getBoundingClientRect().width;
      if (width !== state.width) { state.width = width; state.current = state.target = width; state.momentum = 0; }
      const box = el.getBoundingClientRect();
      const trackLeft = track.getBoundingClientRect().left;
      geometry.left = box.left;
      geometry.width = box.width;
      geometry.cards = images.map(image => {
        const card = image.parentElement!.getBoundingClientRect();
        return { offset: card.left - trackLeft, width: card.width };
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    observer.observe(el);
    measure();
    let visible = false;
    let frame = 0, previous = 0;
    // The frame loop only runs while the carousel is on screen (it used to
    // tick every frame for every carousel on the page; Oct 7, 2026, phones).
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) { previous = 0; frame = requestAnimationFrame(tick); }
    });
    const tick = (time: number) => {
      const dt = previous ? Math.min(time - previous, 50) : 16.667;
      const step = dt / 16.667;
      if (!document.hidden && visible) {
        if (state.pointer === -1 && Math.abs(state.momentum) > .05) {
          state.target += state.momentum * step;
          state.momentum *= Math.pow(.93, step);
          if (Math.abs(state.momentum) < .05) state.momentum = 0;
        } else if (state.pointer === -1 && !state.hover && !state.focus && !state.reduced) {
          state.target += speed * dt / 1000;
        }
        // A finger drags the cards 1:1 (a smoothed follow felt unresponsive on
        // phones, Oct 8, 2026); a mouse keeps the 5% eased follow.
        const follow = state.reduced || (state.touch && state.pointer !== -1) ? 1 : 1 - Math.pow(.95, step);
        state.current += (state.target - state.current) * follow;
        if (Math.abs(state.target - state.current) < .4 && !state.momentum) state.current = state.target;
        // Rebase all drag coordinates together so long drags never hit a scroll edge.
        if (state.width) {
          const shift = Math.floor((state.current - state.width) / state.width) * state.width;
          if (shift) { state.current -= shift; state.target -= shift; state.startScroll -= shift; }
        }
        track.style.transform = `translate3d(${-state.current}px,0,0)`;
        if (el.scrollLeft) el.scrollLeft = 0; // focus can scroll the clipped viewport
        if (!state.reduced) {
          // Card positions from the cached offsets and this frame's
          // translate, so pictures and frames move together in the same frame.
          for (const [index, image] of images.entries()) {
            const card = geometry.cards[index];
            if (!card) continue;
            const left = geometry.left + card.offset - state.current;
            const ratio = Math.max(-1, Math.min(1, -(left + card.width / 2 - geometry.left - geometry.width / 2) / ((geometry.width + card.width) / 2 * .78)));
            const offset = Math.sign(ratio) * Math.pow(Math.abs(ratio), .84) * card.width * .16;
            // The transform itself, not a CSS variable: a variable change
            // restyles the element every frame, a transform only moves it.
            image.style.transform = `translate3d(${offset.toFixed(2)}px,0,0)`;
          }
        }
        if (cursor.current && state.cursorReady) {
          const ease = state.reduced ? 1 : 1 - Math.pow(.88, step);
          state.cursorX += (state.mouseX - state.cursorX) * ease;
          state.cursorY += (state.mouseY - state.cursorY) * ease;
          cursor.current.style.transform = `translate3d(${state.cursorX}px,${state.cursorY}px,0)`;
        }
      }
      previous = time;
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const resume = () => { if (!document.hidden && visible && !frame) { previous = 0; frame = requestAnimationFrame(tick); } };
    document.addEventListener("visibilitychange", resume);
    visibility.observe(el);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect();
      document.removeEventListener("visibilitychange", resume);
      reduced.removeEventListener("change", preferences); fine.removeEventListener("change", preferences);
      images.forEach(image => image.style.removeProperty("transform"));
      track.style.removeProperty("transform");
    };
  }, [speed]);

  const moveCursor = (e: PointerEvent<HTMLDivElement>) => {
    const state = motion.current;
    state.mouseX = e.clientX; state.mouseY = e.clientY;
    if (!state.cursorReady) { state.cursorReady = true; state.cursorX = e.clientX; state.cursorY = e.clientY; }
  };
  const finish = (e: PointerEvent<HTMLDivElement>, cancel = false) => {
    const state = motion.current;
    if (state.pointer !== e.pointerId) return;
    state.pointer = -1;
    state.momentum = cancel || state.reduced ? 0 : -state.velocity * 16;
    state.suppressClick = state.distance > 8;
    e.currentTarget.classList.remove("is-dragging");
    if (dragCursor === "press") cursor.current?.classList.remove("is-visible");
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const bounds = e.currentTarget.getBoundingClientRect();
    if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) {
      state.hover = false; cursor.current?.classList.remove("is-visible");
    }
  };

  return <>
    <div ref={viewport} className={`loop-carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
      data-press-card="" data-press-target=".loop-carousel-group > * > *"
      onPointerEnter={e => { const state = motion.current; state.hover = true; moveCursor(e); if (dragCursor === true && state.fine && e.pointerType !== "touch") cursor.current?.classList.add("is-visible"); }}
      onPointerLeave={() => { if (motion.current.pointer !== -1) return; motion.current.hover = false; cursor.current?.classList.remove("is-visible"); }}
      onFocus={() => { motion.current.focus = true; }} onBlur={() => { motion.current.focus = false; }}
      onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); motion.current.momentum = 0; motion.current.target += (e.key === "ArrowRight" ? 1 : -1) * e.currentTarget.clientWidth * .25; } }}
      onPointerDown={e => {
        if (e.button !== 0 || !e.isPrimary) return;
        const state = motion.current;
        state.pointer = e.pointerId; state.startX = state.lastX = e.clientX; state.startScroll = state.target;
        state.touch = e.pointerType === "touch";
        state.lastTime = e.timeStamp; state.distance = state.velocity = state.momentum = 0; state.suppressClick = false;
        // The pointer is only captured once it has moved (onPointerMove):
        // capturing on press sent the click to the carousel instead of the
        // card's link, so cards that link somewhere didn't open (Oct 8, 2026).
        if (dragCursor === "press" && state.fine && e.pointerType !== "touch") { moveCursor(e); cursor.current?.classList.add("is-visible"); }
      }}
      onPointerMove={e => {
        moveCursor(e);
        const state = motion.current;
        if (state.pointer !== e.pointerId) return;
        const velocity = (e.clientX - state.lastX) / Math.max(1, e.timeStamp - state.lastTime);
        state.velocity = state.velocity * .76 + velocity * .24;
        state.lastX = e.clientX; state.lastTime = e.timeStamp;
        state.distance = Math.max(state.distance, Math.abs(e.clientX - state.startX));
        if (state.distance > DRAG_START_PX && !e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.classList.add("is-dragging"); e.currentTarget.setPointerCapture(e.pointerId);
        }
        state.target = state.startScroll - (e.clientX - state.startX);
      }}
      onPointerUp={e => finish(e)} onPointerCancel={e => finish(e, true)} onLostPointerCapture={e => finish(e, true)}
      onClickCapture={e => { if (motion.current.suppressClick) { e.preventDefault(); e.stopPropagation(); motion.current.suppressClick = false; } }}
      onDragStart={e => e.preventDefault()}>
      {/* The copies either side of the real row (for the endless loop) are
          hidden from screen readers and taken out of the tab order (effect
          above), but not inert: most cards on screen are copies, and inert
          made their links unclickable (Oct 8, 2026). */}
      <div className="loop-carousel-track">{[0, 1, 2].map(i => <div className="loop-carousel-group" key={i} aria-hidden={i !== 1 || undefined} data-loop-copy={i !== 1 || undefined}>{children}</div>)}</div>
    </div>
    {mounted && dragCursor && createPortal(<div ref={cursor} className="carousel-cursor" aria-hidden="true"><div className="carousel-cursor-pill"><span className="carousel-cursor-diamond" /><span>Drag</span></div></div>, document.body)}
  </>;
}
