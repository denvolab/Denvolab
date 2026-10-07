// ---------------------------------------------------------------------------
// lineTrigger: when a text's line animation plays (AnimatedText and the
// site-wide motion/text-reveal). Two conditions, both needed:
//
//   1. the text is fully on screen (its bottom has passed the bottom of the
//      screen), as zypsy.com's line animation does;
//   2. its section has come in: the section's top is above 75% of the screen.
//      The user, Oct 7, 2026: only the section being scrolled animates; text
//      of the next section peeking in at the bottom of the screen waits.
//
// Resets once the text is back below the screen, so it plays again next
// time. Returns a function that removes both triggers.
// ---------------------------------------------------------------------------
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION_START = 0.75; // of the screen's height

/** One trigger per section, shared by every text in it (each text used to
 *  add its own: hundreds of triggers on a page, all checked on every scroll
 *  frame, which phones felt; Oct 7, 2026). */
interface SectionWatch {
  trigger: ScrollTrigger;
  inside: boolean;
  listeners: Set<() => void>;
}
const sections = new WeakMap<Element, SectionWatch>();

function watchSection(section: HTMLElement, listener: () => void) {
  let watch = sections.get(section);
  if (!watch) {
    // The trigger is made after the record: ScrollTrigger can call onEnter
    // straight away while creating it (a section already in view).
    const created = {
      inside: section.getBoundingClientRect().top <= window.innerHeight * SECTION_START,
      listeners: new Set<() => void>(),
    } as SectionWatch;
    created.trigger = ScrollTrigger.create({
      trigger: section,
      start: `top ${SECTION_START * 100}%`,
      onEnter: () => {
        created.inside = true;
        created.listeners.forEach((fn) => fn());
      },
      onLeaveBack: () => {
        created.inside = false;
      },
    });
    watch = created;
    sections.set(section, watch);
  }
  const shared = watch;
  shared.listeners.add(listener);
  return {
    isInside: () => shared.inside,
    stop: () => {
      shared.listeners.delete(listener);
      if (!shared.listeners.size) {
        shared.trigger.kill();
        sections.delete(section);
      }
    },
  };
}

export function lineTrigger(text: HTMLElement, play: () => void, reset: () => void) {
  const section = text.closest<HTMLElement>("section") ?? text;
  let textIn = false;
  let played = false;
  const update = () => {
    if (textIn && sectionWatch.isInside() && !played) {
      played = true;
      play();
    }
  };
  const sectionWatch = watchSection(section, update);

  const textTrigger = ScrollTrigger.create({
    trigger: text,
    start: "top bottom",
    end: "bottom bottom",
    onLeave: () => {
      textIn = true;
      update();
    },
    onLeaveBack: () => {
      textIn = false;
      played = false;
      reset();
    },
  });

  // Already there when the page opens (or after a re-split).
  textIn = textTrigger.progress >= 1 || text.getBoundingClientRect().bottom <= window.innerHeight;
  update();

  return () => {
    textTrigger.kill();
    sectionWatch.stop();
  };
}
