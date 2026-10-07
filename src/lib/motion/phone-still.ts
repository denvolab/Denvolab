// ---------------------------------------------------------------------------
// Sections marked data-phone-still="" keep still on phones (below 768px):
// no picture reveal, no line-by-line text (the user, Oct 7, 2026: the home
// page's services cards "jhaki marteche" on mobile). Desktop and tablet are
// unchanged. Read by motion/image-reveal, motion/text-reveal and
// ui/animated-text.
// ---------------------------------------------------------------------------
export const PHONE_QUERY = "(width < 768px)";
export const PHONE_STILL = "[data-phone-still]";

export function phoneStill(el: Element): boolean {
  return !!el.closest(PHONE_STILL) && window.matchMedia(PHONE_QUERY).matches;
}
