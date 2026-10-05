"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Repeated groups preserve the layout while allowing continuous pointer/keyboard scrolling. */
export function LoopCarousel({ children, className = "", label, speed = 24 }: { children: ReactNode; className?: string; label: string; speed?: number }) {
  const viewport = useRef<HTMLDivElement>(null);
  const dragging = useRef<{x:number;scroll:number} | null>(null);
  const paused = useRef(false);
  useEffect(() => {
    const el = viewport.current!;
    const group = el.firstElementChild!.firstElementChild as HTMLElement;
    let width = 0;
    const measure = () => { width = group.getBoundingClientRect().width; el.scrollLeft = width; };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();
    let frame = 0, previous = 0, carry = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tick = (time:number) => {
      if (previous && !paused.current && !dragging.current && !reduced.matches && !document.hidden) { carry += Math.min(time-previous,50)*speed/1000; const pixels=Math.floor(carry); el.scrollLeft += pixels; carry -= pixels; }
      if (width && !dragging.current) {
        if (el.scrollLeft >= width*2) el.scrollLeft -= width;
        else if (el.scrollLeft < width) el.scrollLeft += width;
      }
      previous=time;
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  },[speed]);
  return <div ref={viewport} className={`loop-carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0}
    onMouseEnter={()=>{paused.current=true;}} onMouseLeave={()=>{paused.current=false;}}
    onFocus={()=>{paused.current=true;}} onBlur={()=>{paused.current=false;}}
    onKeyDown={e=>{if(e.key==="ArrowRight" || e.key==="ArrowLeft"){e.preventDefault();e.currentTarget.scrollLeft += (e.key==="ArrowRight"?1:-1)*e.currentTarget.clientWidth*.25;}}}
    onPointerDown={e=>{if(e.button!==0)return;dragging.current={x:e.clientX,scroll:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}}
    onPointerMove={e=>{if(dragging.current)e.currentTarget.scrollLeft=dragging.current.scroll+dragging.current.x-e.clientX;}}
    onPointerUp={()=>{dragging.current=null;}} onPointerCancel={()=>{dragging.current=null;}} onLostPointerCapture={()=>{dragging.current=null;}}
    onDragStart={e=>e.preventDefault()}>
    <div className="loop-carousel-track">{[0,1,2].map(i=><div className="loop-carousel-group" key={i} aria-hidden={i!==1 || undefined} inert={i!==1 || undefined}>{children}</div>)}</div>
  </div>;
}
