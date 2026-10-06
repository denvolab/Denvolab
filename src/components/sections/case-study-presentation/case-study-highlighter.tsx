"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyHighlighter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = ref.current.querySelectorAll("[data-highlight-word]");
    gsap.fromTo(words, { color: "#b4c0cc" }, {
      color: "#0d1216", duration: 1, stagger: 0.15, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 40%", scrub: 0.6 },
    });
  }, { scope: ref, dependencies: [text] });
  return <span ref={ref} aria-label={text}>{text.split(/(\s+)/).map((word, index) =>
    /^\s+$/.test(word) ? word : <span key={index} aria-hidden="true" data-highlight-word>{word}</span>
  )}</span>;
}
