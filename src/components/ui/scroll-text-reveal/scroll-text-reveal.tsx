"use client";

// ---------------------------------------------------------------------------
// ScrollTextReveal — splits a line of text into words and highlights them
// one by one as the page scrolls, so the sentence reads as "lit up" word by
// word rather than sitting there fully visible from the start. Reference:
// the "(The principle)" statement on studiors.be (a French web-studio site
// the user pasted, see claude/motion-interaction-references.md, reference
// 7) — its `.stud-say__text` does the exact same thing: each word in its
// own element, inline `opacity` tied to scroll position, full sentence
// repeated in an `aria-label` on the parent so the word-split markup can be
// `aria-hidden`. This component reproduces that technique with GSAP
// ScrollTrigger instead of hand-rolled scroll math, same tool the site
// already uses for process-rail.tsx and hero/moving-visual.tsx.
//
// Renders a plain inline `<span>` — put it INSIDE whatever heading/paragraph
// tag and typography classes the caller needs (see about-story.tsx). Word
// spans are `display: inline` with a real space character after them (not
// inline-block + a CSS gap), so the browser wraps lines at exactly the same
// points it would for plain text.
//
// Only `opacity` is animated (0.22 -> 1), same as the reference — no color
// or transform change, so this drops into any existing text color/size
// without fighting it.
// ---------------------------------------------------------------------------
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// How dim the not-yet-reached words are before the scroll animates them to
// full opacity. A design judgment call — dim enough to read as "not lit up
// yet", not so dim it looks broken without JS/before the effect starts.
const DIM_OPACITY = 0.22;

interface ScrollTextRevealProps {
  /** The full sentence. Split on spaces — keep it to one plain sentence,
   *  no manual line breaks. */
  text: string;
  className?: string;
}

export function ScrollTextReveal({ text, className }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Same skip as ui/ripple-image/, hero/moving-visual.tsx and
    // process-steps/process-rail.tsx: reduced motion gets the sentence at
    // full opacity throughout, not a toned-down version of the reveal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wordEls = container.querySelectorAll<HTMLElement>("[data-word]");
    if (wordEls.length === 0) return;

    gsap.set(wordEls, { opacity: DIM_OPACITY });

    const tween = gsap.to(wordEls, {
      opacity: 1,
      ease: "none",
      stagger: 0.05,
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" data-word>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
