"use client";

import { useEffect, useRef, useState } from "react";

/** Reserve the real label's width while its hover letters scramble into place. */
export function ButtonText({ text, wrap = false }: { text: string; wrap?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const button = ref.current?.closest<HTMLElement>("a, button");
    if (!button) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      setDisplay(text);
    };
    const play = () => {
      stop();
      if (motion.matches || button.matches(":disabled")) return;
      const start = performance.now();
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const update = () => {
        const progress = Math.min((performance.now() - start) / 500, 1);
        const resolved = Math.floor(progress * text.length);
        setDisplay(Array.from(text, (letter, index) => {
          if (index < resolved || !/[a-z0-9]/i.test(letter)) return letter;
          const next = alphabet[Math.floor(Math.random() * alphabet.length)];
          return /[a-z]/.test(letter) ? next.toLowerCase() : next;
        }).join(""));
        if (progress === 1) stop();
      };
      update();
      timer = setInterval(update, 30);
    };
    button.addEventListener("pointerenter", play);
    button.addEventListener("pointerleave", stop);
    button.addEventListener("focus", play);
    button.addEventListener("blur", stop);
    motion.addEventListener("change", stop);
    return () => {
      if (timer !== undefined) clearInterval(timer);
      button.removeEventListener("pointerenter", play);
      button.removeEventListener("pointerleave", stop);
      button.removeEventListener("focus", play);
      button.removeEventListener("blur", stop);
      motion.removeEventListener("change", stop);
    };
  }, [text]);

  return <span ref={ref} className={wrap ? "button-text button-text--link" : "button-text"}>
    <span className="sr-only">{text}</span>
    <span className="button-text-measure" aria-hidden="true">{text}</span>
    <span className="button-text-live" aria-hidden="true">{display}</span>
  </span>;
}
