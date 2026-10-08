// ---------------------------------------------------------------------------
// Text on the first screen when a page opens (the hero) is shown as it is,
// straight from the page's HTML, and not line-animated (the user, Oct 8,
// 2026: on mobile the hero text came 2-3 seconds late: hidden until the
// JavaScript had loaded, the fonts were ready and the lines were split).
// Everything further down still rises in as it is scrolled to. Shared by
// AnimatedText and motion/text-reveal.
// ---------------------------------------------------------------------------
export function onFirstScreen(el: Element): boolean {
  if (el.closest("[data-hero], [data-no-text-reveal]")) return true;
  return el.getBoundingClientRect().top + window.scrollY < window.innerHeight;
}
