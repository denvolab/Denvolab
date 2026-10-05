"use client";

// ---------------------------------------------------------------------------
// AnimatedText: the heading animation of zypsy.com, line by line, the way the
// user asked for on Oct 5, 2026 (it replaced the juice.agency word-by-word
// fade of Oct 4): "Ekhane jevabe animation ache ami chai amar text gulao exact
// same vabe animated korbe", pointing at Zypsy's
// <h2 js-line-animation="300">.
//
// What zypsy.com does (its inline script and CSS, read from the live site):
//   - only when the window is wider than 991px; smaller screens just show
//     the text (and before the script runs, the heading is
//     `visibility: hidden` from 991px up);
//   - after the page has loaded and the attribute's delay (here 300ms), the
//     heading is split into lines with SplitType: each line is
//     <span class="line"> (`overflow: hidden; padding-bottom: .1em;
//     margin-bottom: -.1em`) with the text in <span class="line-inner">;
//   - a ScrollTrigger on the heading, start "top bottom", end "bottom bottom",
//     toggleActions "none play none reset": it plays once the whole heading
//     is on screen (its bottom has come up past the bottom of the screen) and
//     resets when you scroll back up until it is below the screen again, so
//     it plays again next time;
//   - the animation: every .line-inner from yPercent 110 to 0, 1.25s,
//     "expo.out", stagger { amount: 0.2, ease: "expo.out" };
//   - the lines are split again when the window width changes.
//
// The same here; the lines are cut by ./split-lines.ts, which reads where the
// browser already put every word, so the lines are exactly the drawn ones.
// Usage:
//
//   <h2 className="...">
//     <AnimatedText>{title}</AnimatedText>
//   </h2>
//
// Put it INSIDE the heading, so the heading keeps its tag and classes.
// Children can be text or elements (a <span> with its own colour), and "\n"
// breaks in a `whitespace-pre-line` heading are kept. While split, the
// wrapper is a block as wide as the heading's content was, so a heading that
// sizes itself to its text keeps its width.
//
// Below 992px, with "Reduce motion", or without JavaScript, nothing is split
// and the text is simply there. The split waits for the fonts, and is redone
// when the window width changes or a late font loads.
//
// Don't use it inside LensDistortion (service-conversation): that band copies
// its HTML into a canvas once, and would copy the lines while they are still
// below their masks.
// ---------------------------------------------------------------------------
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils/cn";
import { splitLines, type LineSplit } from "./split-lines";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** zypsy.com: `window.innerWidth > 991`, and nothing for "Reduce motion". */
const QUERY = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";
const FROM_Y_PERCENT = 110; // zypsy.com: { yPercent: 110 }
const DURATION = 1.25; // zypsy.com: duration: 1.25
const EASE = "expo.out"; // zypsy.com: ease: "expo.out"
const STAGGER = { amount: 0.2, ease: "expo.out" }; // zypsy.com
const DEFAULT_DELAY = 300; // zypsy.com: js-line-animation="300" on the referenced heading

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  /** Wait this long (ms) after the fonts are ready before splitting, like the
   *  value of Zypsy's js-line-animation attribute. */
  delay?: number;
}

export function AnimatedText({ children, className, delay = DEFAULT_DELAY }: AnimatedTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(QUERY, () => {
        let split: LineSplit | null = null;
        let timeline: gsap.core.Timeline | null = null;
        let timer = 0;
        let cancelled = false;
        let width = window.innerWidth;

        const teardown = () => {
          timeline?.revert(); // also kills its ScrollTrigger
          timeline = null;
          split?.revert();
          split = null;
          root.style.removeProperty("display");
          root.style.removeProperty("min-width");
        };

        const build = () => {
          teardown();
          const heading = root.parentElement;
          const style = heading ? getComputedStyle(heading) : null;
          const contentWidth = heading && style
            ? heading.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
            : 0;
          split = splitLines(root);
          root.style.display = "block";
          if (contentWidth > 0) root.style.minWidth = `${contentWidth}px`;
          root.dataset.lineAnimation = "ready";
          timeline = gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom bottom",
                toggleActions: "none play none reset",
              },
            })
            .fromTo(
              split.lines,
              { yPercent: FROM_Y_PERCENT },
              { yPercent: 0, duration: DURATION, ease: EASE, stagger: STAGGER },
            );
        };

        // zypsy.com splits again when the window width changes.
        const onResize = () => {
          if (window.innerWidth === width) return;
          width = window.innerWidth;
          if (split) build();
        };
        const onFontsLoaded = () => {
          if (split) build();
        };

        document.fonts.ready.then(() => {
          if (cancelled) return;
          timer = window.setTimeout(build, delay);
        });
        window.addEventListener("resize", onResize);
        document.fonts.addEventListener("loadingdone", onFontsLoaded);

        return () => {
          cancelled = true;
          window.clearTimeout(timer);
          window.removeEventListener("resize", onResize);
          document.fonts.removeEventListener("loadingdone", onFontsLoaded);
          teardown();
          root.dataset.lineAnimation = "";
        };
      });

      // Phones, tablets and "Reduce motion": no split, the text is shown.
      mm.add(`not all and ${QUERY}`, () => {
        root.dataset.lineAnimation = "off";
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <span ref={rootRef} data-line-animation="" className={cn(className)}>
      {children}
    </span>
  );
}
