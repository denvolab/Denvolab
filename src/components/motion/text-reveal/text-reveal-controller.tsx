"use client";

// ---------------------------------------------------------------------------
// TextRevealController: every piece of text in the header, main and footer
// rises in line by line, like AnimatedText (zypsy.com's line animation, see
// ui/animated-text), except buttons. The user asked for "each and every
// text" on Oct 7, 2026. Mounted once in app/layout.tsx; re-scans after page
// changes and when new text appears (an FAQ answer opening, streamed
// sections).
//
// Same motion as AnimatedText: from 992px wide and without "Reduce motion";
// after the fonts are ready and 300ms; yPercent 110 -> 0, 1.25s expo.out,
// stagger 0.2 (expo.out); plays when the text's bottom comes into view,
// resets when it drops below the screen; re-split when the width changes.
//
// What is a piece of text: each text node belongs to its nearest box that
// isn't inline (a heading, paragraph, list item, chip, label...). That box
// is cut into its drawn lines by ui/animated-text/split-lines.ts, which puts
// the original nodes back on revert so React's references stay valid. A box
// that also holds a link, form field or other block boxes is not cut (copies
// would lose their React handlers, or the layout would break); its links
// still animate (below).
//
// Links: their labels are ButtonText (ui/button), whose letters scramble on
// hover through React state, so they are never cut. The whole label rises
// instead, inside a clip on the label (clip-path, so the layout and baseline
// don't move), and the scramble keeps working.
//
// Not animated: buttons (button, .button-sweep, role=button), live or
// self-updating text (aria-live, role=status/timer, <time>), form fields,
// screen-reader-only text, SVG text, the lens-effect bands (they show a
// canvas copy of their HTML), the scroll highlighters (words that light up
// one by one) and anything marked data-no-text-reveal.
//
// No flash on load: an inline script in app/layout.tsx puts
// `text-reveal-pending` on <html> before the first paint (same media query),
// and text-reveal.css keeps text boxes invisible until this has split them.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLines, type LineSplit } from "@/components/ui/animated-text/split-lines";
import { TEXT_REVEAL_PENDING, TEXT_REVEAL_QUERY } from "./text-reveal-config";

gsap.registerPlugin(ScrollTrigger);

const ROOTS = "body > header, header[class], main, footer";
const SKIP = [
  "button",
  ".button-sweep",
  "[role='button']",
  "input",
  "select",
  "textarea",
  "script",
  "style",
  "noscript",
  "svg",
  "time",
  "[aria-live]",
  "[role='status']",
  "[role='timer']",
  ".sr-only",
  "[contenteditable]",
  "[data-no-text-reveal]",
  "[data-line-animation]",
  ".group\\/lens",
  // Scroll highlighters (ui/scroll-text-reveal, case-study-highlighter):
  // their words light up one by one; splitting would break that (the user,
  // Oct 7, 2026: the highlight "must thakbe").
  "[data-word]",
  "[data-highlight-word]",
].join(",");
const NOT_SPLITTABLE_INSIDE = "[data-word], [data-highlight-word], a, button, input, select, textarea, time, svg, img, video, canvas, iframe, .button-text, [aria-live]";
const DELAY = 300; // ms, as AnimatedText
const FROM = { yPercent: 110 };
const TO = { yPercent: 0, duration: 1.25, ease: "expo.out", stagger: { amount: 0.2, ease: "expo.out" } } as const;
const TRIGGER = { start: "top bottom", end: "bottom bottom", toggleActions: "none play none reset" } as const;

const isInline = (el: Element) => {
  const display = getComputedStyle(el).display;
  return display === "inline" || display === "contents";
};

/** A box with block-level boxes inside can't be cut into lines. */
const hasBlockInside = (el: Element) =>
  Array.from(el.querySelectorAll("*")).some((child) => {
    const display = getComputedStyle(child).display;
    return display !== "inline" && display !== "inline-block" && display !== "none" && display !== "contents";
  });

interface Unit {
  el: HTMLElement;
  kind: "split" | "label";
  split: LineSplit | null;
  timeline: gsap.core.Timeline | null;
}

/** Find the text boxes and link labels not handled yet. */
function collect(done: WeakSet<Element>) {
  const splits = new Set<HTMLElement>();
  const labels = new Set<HTMLElement>();
  for (const root of document.querySelectorAll<HTMLElement>(ROOTS)) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent?.trim()) continue;
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP)) continue;

      const label = parent.closest<HTMLElement>(".button-text");
      if (label) {
        if (!done.has(label)) labels.add(label);
        continue;
      }

      let box: HTMLElement | null = parent;
      let inline: HTMLElement | null = null; // outermost inline element under the box
      while (box && box !== root && isInline(box) && box.parentElement) {
        inline = box;
        box = box.parentElement;
      }
      if (!box || box === root || splits.has(box)) continue;
      if (done.has(box) || box.querySelector(NOT_SPLITTABLE_INSIDE) || hasBlockInside(box)) {
        done.add(box);
        // The box can't be cut, but this text sits in its own inline element
        // (a stat number beside a heading): that element rises on its own,
        // as an inline-block.
        if (inline && hasBlockInside(box) && !done.has(inline) && !splits.has(inline) && !inline.querySelector(NOT_SPLITTABLE_INSIDE)) {
          inline.style.display = "inline-block";
          splits.add(inline);
        }
        continue;
      }
      splits.add(box);
    }
  }
  return { splits, labels };
}

export function TextRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reveal = () => root.classList.remove(TEXT_REVEAL_PENDING);
    const mm = gsap.matchMedia();

    mm.add(TEXT_REVEAL_QUERY, () => {
      // A client-side page change: hide the new page's text until it is split.
      root.classList.add(TEXT_REVEAL_PENDING);
      const units: Unit[] = [];
      const done = new WeakSet<Element>();
      let timer = 0;
      let rescanTimer = 0;
      let cancelled = false;
      let width = window.innerWidth;

      const teardown = (unit: Unit) => {
        unit.timeline?.revert();
        unit.timeline = null;
        unit.split?.revert();
        unit.split = null;
        if (unit.kind === "label") unit.el.style.removeProperty("clip-path");
      };
      const build = (unit: Unit) => {
        teardown(unit);
        let targets: HTMLElement[];
        if (unit.kind === "split") {
          unit.split = splitLines(unit.el);
          unit.el.dataset.lineAnimation = "ready";
          targets = unit.split.lines;
        } else {
          // Clip on the label (room for descenders), the live text moves.
          unit.el.style.clipPath = "inset(-0.05em -0.1em -0.2em -0.1em)";
          targets = Array.from(unit.el.querySelectorAll<HTMLElement>(".button-text-live"));
        }
        unit.timeline = gsap.timeline({ scrollTrigger: { trigger: unit.el, ...TRIGGER } }).fromTo(targets, FROM, TO);
      };

      const scan = () => {
        // Text React (or a script) removed: drop its trigger, so the list of
        // scroll triggers doesn't keep growing while the visitor scrolls.
        for (let i = units.length - 1; i >= 0; i--) {
          if (units[i].el.isConnected) continue;
          units[i].timeline?.kill();
          units.splice(i, 1);
        }
        const { splits, labels } = collect(done);
        for (const el of splits) {
          done.add(el);
          const unit: Unit = { el, kind: "split", split: null, timeline: null };
          units.push(unit);
          build(unit);
        }
        for (const el of labels) {
          done.add(el);
          const unit: Unit = { el, kind: "label", split: null, timeline: null };
          units.push(unit);
          build(unit);
        }
      };

      document.fonts.ready.then(() => {
        if (cancelled) return;
        timer = window.setTimeout(() => {
          scan();
          reveal();
        }, DELAY);
      });

      // New text later on (FAQ answers, streamed sections). Ignore the
      // changes the splitting itself makes.
      const additions = new MutationObserver((records) => {
        const fresh = records.some((record) =>
          Array.from(record.addedNodes).some((node) => {
            const el = node instanceof Element ? node : record.target instanceof Element ? record.target : null;
            return el && !el.closest("[data-line-animation]") && !el.closest(SKIP) && !el.classList.contains("line") && !!node.textContent?.trim();
          }),
        );
        if (!fresh) return;
        window.clearTimeout(rescanTimer);
        rescanTimer = window.setTimeout(scan, 200);
      });
      for (const el of document.querySelectorAll(ROOTS)) additions.observe(el, { childList: true, subtree: true });

      const onResize = () => {
        if (window.innerWidth === width) return;
        width = window.innerWidth;
        units.forEach(build);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        window.clearTimeout(rescanTimer);
        additions.disconnect();
        window.removeEventListener("resize", onResize);
        units.forEach((unit) => {
          teardown(unit);
          if (unit.kind === "split") delete unit.el.dataset.lineAnimation;
        });
      };
    });

    // Phones, tablets, "Reduce motion": plain text, shown at once.
    mm.add(`not all and ${TEXT_REVEAL_QUERY}`, reveal);

    // Never leave text hidden if something goes wrong.
    const failsafe = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
      reveal();
    };
  }, [pathname]);

  return null;
}
