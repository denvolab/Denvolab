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

export function lineTrigger(text: HTMLElement, play: () => void, reset: () => void) {
  const section = text.closest<HTMLElement>("section") ?? text;
  let textIn = false;
  let sectionIn = false;
  let played = false;
  const update = () => {
    if (textIn && sectionIn && !played) {
      played = true;
      play();
    }
  };

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
  const sectionTrigger = ScrollTrigger.create({
    trigger: section,
    start: `top ${SECTION_START * 100}%`,
    onEnter: () => {
      sectionIn = true;
      update();
    },
    onLeaveBack: () => {
      sectionIn = false;
    },
  });

  // Already there when the page opens (or after a re-split).
  textIn = textTrigger.progress >= 1 || text.getBoundingClientRect().bottom <= window.innerHeight;
  sectionIn = section.getBoundingClientRect().top <= window.innerHeight * SECTION_START;
  update();

  return () => {
    textTrigger.kill();
    sectionTrigger.kill();
  };
}
