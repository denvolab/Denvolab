"use client";

// ---------------------------------------------------------------------------
// CountUp: a stat like "40+" or "24%" counts up from 0 when it comes into
// view (the user, Oct 7, 2026, About page stats). The number is the first run
// of digits; what comes before and after it ("+", "%", "$") stays as it is.
// The server renders the final value, so no-JS visitors and search engines
// see it. With "Reduce motion" it simply stays at the final value.
//
// The text is changed directly in the DOM (not React state), and it is marked
// data-no-text-reveal so the site-wide line animation (motion/text-reveal)
// leaves it alone.
// ---------------------------------------------------------------------------
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DURATION = 2; // seconds
const EASE = "power3.out";
const START = "top 90%";

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, before, digits, after] = match;
    const target = Number(digits);
    const decimals = digits.split(".")[1]?.length ?? 0;
    const counter = { n: 0 };
    const render = () => (el.textContent = `${before}${counter.n.toFixed(decimals)}${after}`);
    render();

    const tween = gsap.to(counter, {
      n: target,
      duration: DURATION,
      ease: EASE,
      onUpdate: render,
      paused: true,
    });
    const trigger = ScrollTrigger.create({ trigger: el, start: START, once: true, onEnter: () => tween.play() });
    return () => {
      trigger.kill();
      tween.kill();
      el.textContent = value;
    };
  }, [value]);

  // Fixed width digits, so the text doesn't jiggle while it counts.
  return (
    <span ref={ref} data-no-text-reveal="" aria-label={value} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}
