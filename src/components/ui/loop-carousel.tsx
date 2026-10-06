"use client";

import { useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

const subscribeToClient = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Reference motion: 5% drag easing, 0.93 momentum decay and a 12% cursor follower. */
export function LoopCarousel({ children, className = "", label, speed = 24 }: { children: ReactNode; className?: string; label: string; speed?: number }) {
  const viewport = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribeToClient, clientSnapshot, serverSnapshot);
  const motion = useRef({ current: 0, target: 0, momentum: 0, width: 0, pointer: -1, startX: 0, startScroll: 0, lastX: 0, lastTime: 0, velocity: 0, distance: 0, suppressClick: false, hover: false, focus: false, cursorX: 0, cursorY: 0, mouseX: 0, mouseY: 0, cursorReady: false, fine: false, reduced: false });

  useEffect(() => {
    const el = viewport.current!;
    const group = el.querySelector<HTMLElement>(".loop-carousel-group")!;
    const state = motion.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const preferences = () => { state.reduced = reduced.matches; state.fine = fine.matches; };
    preferences();
    reduced.addEventListener("change", preferences);
    fine.addEventListener("change", preferences);
    const measure = () => {
      const width = group.getBoundingClientRect().width;
      if (width !== state.width) { state.width = width; state.current = state.target = width; state.momentum = 0; el.scrollLeft = width; }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();
    const images = Array.from(el.querySelectorAll<HTMLImageElement>("img.object-cover"));
    let visible = false;
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(el);
    let frame = 0, previous = 0;
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
        state.current += (state.target - state.current) * (state.reduced ? 1 : 1 - Math.pow(.95, step));
        if (Math.abs(state.target - state.current) < .4 && !state.momentum) state.current = state.target;
        // Rebase all drag coordinates together so long drags never hit a scroll edge.
        if (state.width) {
          const shift = Math.floor((state.current - state.width) / state.width) * state.width;
          if (shift) { state.current -= shift; state.target -= shift; state.startScroll -= shift; }
        }
        // Read geometry before writing scroll/styles. Interleaving these for
        // every image forced synchronous layouts during vertical scrolling.
        const bounds = el.getBoundingClientRect();
        const cards = !state.reduced ? images.map(image => image.parentElement!.getBoundingClientRect()) : [];
        el.scrollLeft = state.current;
        if (!state.reduced) {
          if (bounds.bottom > 0 && bounds.top < innerHeight) {
            for (const [index, image] of images.entries()) {
              const card = cards[index];
              const ratio = Math.max(-1, Math.min(1, -(card.left + card.width / 2 - bounds.left - bounds.width / 2) / ((bounds.width + card.width) / 2 * .78)));
              const offset = Math.sign(ratio) * Math.pow(Math.abs(ratio), .84) * card.width * .16;
              image.style.setProperty("--carousel-parallax", `${offset}px`);
            }
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
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect();
      reduced.removeEventListener("change", preferences); fine.removeEventListener("change", preferences);
      images.forEach(image => image.style.removeProperty("--carousel-parallax"));
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
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const bounds = e.currentTarget.getBoundingClientRect();
    if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) {
      state.hover = false; cursor.current?.classList.remove("is-visible");
    }
  };

  return <>
    <div ref={viewport} className={`loop-carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
      onPointerEnter={e => { const state = motion.current; state.hover = true; moveCursor(e); if (state.fine && e.pointerType !== "touch") cursor.current?.classList.add("is-visible"); }}
      onPointerLeave={() => { if (motion.current.pointer !== -1) return; motion.current.hover = false; cursor.current?.classList.remove("is-visible"); }}
      onFocus={() => { motion.current.focus = true; }} onBlur={() => { motion.current.focus = false; }}
      onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); motion.current.momentum = 0; motion.current.target += (e.key === "ArrowRight" ? 1 : -1) * e.currentTarget.clientWidth * .25; } }}
      onPointerDown={e => {
        if (e.button !== 0 || !e.isPrimary) return;
        const state = motion.current;
        state.pointer = e.pointerId; state.startX = state.lastX = e.clientX; state.startScroll = state.target;
        state.lastTime = e.timeStamp; state.distance = state.velocity = state.momentum = 0; state.suppressClick = false;
        e.currentTarget.classList.add("is-dragging"); e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={e => {
        moveCursor(e);
        const state = motion.current;
        if (state.pointer !== e.pointerId) return;
        const velocity = (e.clientX - state.lastX) / Math.max(1, e.timeStamp - state.lastTime);
        state.velocity = state.velocity * .76 + velocity * .24;
        state.lastX = e.clientX; state.lastTime = e.timeStamp;
        state.distance = Math.max(state.distance, Math.abs(e.clientX - state.startX));
        state.target = state.startScroll - (e.clientX - state.startX);
      }}
      onPointerUp={e => finish(e)} onPointerCancel={e => finish(e, true)} onLostPointerCapture={e => finish(e, true)}
      onClickCapture={e => { if (motion.current.suppressClick) { e.preventDefault(); e.stopPropagation(); motion.current.suppressClick = false; } }}
      onDragStart={e => e.preventDefault()}>
      <div className="loop-carousel-track">{[0, 1, 2].map(i => <div className="loop-carousel-group" key={i} aria-hidden={i !== 1 || undefined} inert={i !== 1 || undefined}>{children}</div>)}</div>
    </div>
    {mounted && createPortal(<div ref={cursor} className="carousel-cursor" aria-hidden="true"><div className="carousel-cursor-pill"><span className="carousel-cursor-diamond" /><span>Drag</span></div></div>, document.body)}
  </>;
}
