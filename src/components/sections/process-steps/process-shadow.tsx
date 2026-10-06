"use client";
import { useEffect, useRef } from "react";

/** Only the exposed card casts a shadow while the sticky cards overlap. */
export function ProcessShadow() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const cards = Array.from(marker.current!.closest("section")!.querySelectorAll<HTMLElement>("ol > li"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = cards.map(card => card.getBoundingClientRect());
      cards.forEach((card, index) => {
        const covered = String(index < cards.length-1 && bounds[index+1].top < bounds[index].bottom);
        if (card.dataset.shadowCovered !== covered) card.dataset.shadowCovered = covered;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, {passive:true});
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll",schedule);
      window.removeEventListener("resize",schedule);
      cards.forEach(card => delete card.dataset.shadowCovered);
    };
  },[]);
  return <span ref={marker} hidden aria-hidden="true"/>;
}
