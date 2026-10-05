"use client";

// ---------------------------------------------------------------------------
// ColorWashController: the black-to-white (and back) section transition the
// user asked for (Oct 2026), copied from two reference sites that do the
// same thing:
//
//   zypsy.com      "Variables Color Scroll" (flowtricks, 1.0.2): when a
//                  section with `animate-body-to` reaches 50% from the top of
//                  the screen, GSAP tweens the body's colour variables to
//                  that section's theme, `speed="0.7" ease="power2.inOut"`,
//                  and back when you scroll up again.
//   juice.agency   textAnimation.js: each section has `data-bg-color`; a
//                  ScrollTrigger from "top center" to "bottom center" swaps
//                  the body's background colour when you enter it from
//                  either side.
//
// So: the section you are in sets the colour of the whole page, faded over
// 0.7s with power2.inOut. The sections themselves don't change; this reads
// their own colours. One instance, in app/layout.tsx, handles every page and
// runs again after each page change.
//
// WHEN IT SWITCHES (the user's rule, replacing the reference sites' "middle
// of the screen"): the colour stays until the section before has left the
// screen completely, and switches the moment it has, when the next
// section's top reaches the top of the screen (TAKEOVER = 0; Oct 4 2026 it
// waited until 20% of the next section had gone past, the user asked on
// Oct 5 for no wait). Same point in both directions, so scrolling back up
// switches back at exactly that spot.
//
// WHAT IT DOES, on each page:
//   1. Finds the sections: every top-level <section> inside <main>, plus the
//      footer. A section can opt out with data-wash="off", or be an
//      "anchor" with data-wash="anchor" (it sets the page colour when it is
//      the active one, but never changes itself: for artwork drawn for one
//      background, the AI section).
//   2. Reads each section's real background colour (the first solid one
//      going up, for sections that are see-through) and calls it dark or
//      light by its brightness (data-wash-kind).
//   3. Sorts the boxes inside each section that have their own background:
//      - a plain box of the section's own family (a white or light-gray
//        card, chip, icon tile or divider in a light section; a dark one in
//        a dark section), with no picture in it: data-wash-tint, which
//        follows the mode one shade off what it sits on (the user's rule,
//        Oct 4 2026: "chip and icon backgrounds one shade lighter than the
//        card in dark mode, as they are in light mode"). The value is the
//        level: a card the same colour as its section is "0" (the page
//        colour itself in the other mode, its own open/hover colours in its
//        own mode), a chip on it "1", a chip on that "2";
//      - the same colour as the section otherwise (a frame behind a
//        picture, a coloured box in a coloured section): data-wash-surface,
//        paints the wash (also the wrappers between the sections and the
//        page);
//      - anything else (buttons and badges in a brand colour, dark boxes in a
//        light section, boxes with pictures, data-driven colours set inline,
//        anything inside data-wash="keep"), and the box around a picture
//        that has text on it: data-wash-island, keeps its own colours.
//      Edge fades over marquees (data-wash-fade) are left alone: their
//      gradient starts from the wash colour (color-wash.css). A light box
//      shadow in a light section (data-wash-shadow) turns black when the
//      page is dark.
//   4. Sets <html class="wash-ready"> and the two variables (see
//      color-wash.css) for the active section, straight away, plus the tint
//      colours for it (--wash-on-dark-0..3 when it is dark, --wash-on-light-
//      0..3 when it is light: plain rgb() worked out here).
//   5. On scroll, when another section takes over, tweens all of them to it
//      in one GSAP tween. Tints are mixed by the same --wash-p as the page
//      and the text, so they change in step with the page colour (the user,
//      Oct 5 2026: "the card color must chnage instant with the dark color").
//      While a kind of section is not fully in its own mode, <html> carries
//      `wash-hold-light` / `wash-hold-dark`, and its tints paint the mix of
//      their own colour (read the moment the hold starts, so an open FAQ
//      item starts from its open colour) and the tint colour.
//
// The first section is the active one until the second takes over. A
// section near the end of the page whose takeover point can't reach the top
// of the screen takes over at the very bottom instead (the same job `clamp()`
// does in the Zypsy script), so the footer still gets its turn.
//
// Skipped with "Reduce motion": the page keeps every section's own colours.
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const DURATION = 0.7; // zypsy.com: speed="0.7"
const EASE = "power2.inOut"; // zypsy.com: ease="power2.inOut"
/** How far into a section (share of its height) the top of the screen has to
 *  be before that section takes over the page colour. 0: as soon as its top
 *  reaches the top of the screen, i.e. the section before has fully left. */
const TAKEOVER = 0;
/** Below this relative luminance a background counts as dark. */
const DARK_LUMINANCE = 0.35;
/** Backgrounds more see-through than this don't count as a background. */
const MIN_ALPHA = 0.3;
/** A tint (see step 3 of the header) is near-gray: its RGB channels differ by
 *  at most this much (the brand-100 icon tiles are 28). */
const TINT_MAX_CHROMA = 32;
/** ...and as light as a light section's boxes, or as dark as a dark one's. */
const TINT_LIGHT_MIN = 0.6;
const TINT_DARK_MAX = 0.1;
/** One shade per tint level: this much white over a dark page colour
 *  (gray-900 becomes about gray-800), this much black over a light one
 *  (white becomes about gray-50). */
const TINT_STEP_ON_DARK = 0.08;
const TINT_STEP_ON_LIGHT = 0.03;

const ATTRS = [
  "data-wash-kind",
  "data-wash-island",
  "data-wash-surface",
  "data-wash-anchor",
  "data-wash-tint",
  "data-wash-shadow",
] as const;
/** The colours in a computed box-shadow (Chromium and Safari write rgb()/rgba()). */
const SHADOW_COLOR = /(?:rgba?|color|oklab|oklch|lab|lch|hsla?)\([^)]*\)|#[0-9a-f]{3,8}\b/gi;
/** A shadow colour brighter than this is a "light" shadow (the process cards' is 0.58). */
const LIGHT_SHADOW_MIN = 0.3;
const MEDIA = "img, video, canvas, picture, iframe";

type Rgba = [number, number, number, number];

interface WashSection {
  el: HTMLElement;
  color: string;
  rgba: Rgba;
  dark: boolean;
}

let probe: CanvasRenderingContext2D | null = null;

/** Any CSS colour string to 0-255 RGBA, through a 1x1 canvas (handles rgb(), oklab(), color(), ...). */
function toRgba(color: string): Rgba {
  if (color === "transparent" || color === "rgba(0, 0, 0, 0)") return [0, 0, 0, 0];
  probe ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!probe) return [0, 0, 0, 0];
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "rgba(0, 0, 0, 0)";
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a / 255];
}

function luminance([r, g, b]: Rgba) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** `rgb` moved toward `to` (0 black, 255 white) by `t` (0-1), as rgb(). */
function mixRgb(rgb: Rgba, to: number, t: number) {
  const c = (i: number) => Math.round(rgb[i] + (to - rgb[i]) * t);
  return `rgb(${c(0)}, ${c(1)}, ${c(2)})`;
}

/** Exactly the same colour (1 step of rounding allowed). Strict on purpose:
 *  a palette swatch a shade off the section colour is content, not wall. */
function sameColor(a: Rgba, b: Rgba) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 2;
}

function hasOwnBackground(style: CSSStyleDeclaration) {
  return toRgba(style.backgroundColor)[3] >= MIN_ALPHA || style.backgroundImage !== "none";
}

/** True when `outer`'s box is (within 2px) the same box as `inner`'s. */
function sameBox(outer: DOMRect, inner: DOMRect) {
  return (
    Math.abs(outer.left - inner.left) <= 2 &&
    Math.abs(outer.top - inner.top) <= 2 &&
    Math.abs(outer.right - inner.right) <= 2 &&
    Math.abs(outer.bottom - inner.bottom) <= 2
  );
}

/** A plain box of its section's own family: see step 3 of the header comment. */
function isTint(box: HTMLElement, style: CSSStyleDeclaration, bg: Rgba, darkSection: boolean) {
  if (style.backgroundImage !== "none" || bg[3] < 0.9) return false;
  if (box.closest('[data-wash="keep"]')) return false;
  if (/background/.test(box.getAttribute("style") ?? "")) return false; // a colour from data
  if (box.matches(MEDIA) || box.querySelector(MEDIA)) return false;
  if (Math.max(bg[0], bg[1], bg[2]) - Math.min(bg[0], bg[1], bg[2]) > TINT_MAX_CHROMA) return false;
  const lum = luminance(bg);
  return darkSection ? lum <= TINT_DARK_MAX : lum >= TINT_LIGHT_MIN;
}

/** The colour a section actually shows: its own, or the first solid one above it. */
function effectiveBackground(el: HTMLElement): Rgba {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    const rgba = toRgba(getComputedStyle(node).backgroundColor);
    if (rgba[3] >= 0.5) return rgba;
  }
  return [255, 255, 255, 1];
}

function collectSections(): HTMLElement[] {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("main section, body > footer"));
  return candidates.filter(
    (el, i) =>
      // An opt-out wrapper also protects its nested sections (the footer).
      !el.closest('[data-wash="off"]') &&
      el.getClientRects().length > 0 &&
      // only the outermost: a <section> inside another one belongs to it
      !candidates.some((other, j) => j !== i && other !== el && other.contains(el)),
  );
}

/** Steps 1-3 of the header comment. Runs with `wash-ready` off, so it reads the real colours. */
function measure(): WashSection[] {
  const html = document.documentElement;
  html.classList.remove("wash-ready");
  html.classList.add("wash-measuring"); // see color-wash.css
  document
    .querySelectorAll<HTMLElement>("[data-wash-shadow]")
    .forEach((node) => node.style.removeProperty("--wash-shadow-own"));
  document
    .querySelectorAll(ATTRS.map((a) => `[${a}]`).join(","))
    .forEach((node) => ATTRS.forEach((a) => node.removeAttribute(a)));

  const sections: WashSection[] = [];
  for (const el of collectSections()) {
    const rgba = effectiveBackground(el);
    const color = `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
    const dark = luminance(rgba) < DARK_LUMINANCE;
    const sectionRect = el.getBoundingClientRect();

    // A picture that fills the whole section (a full-bleed photo band): it
    // shows the photo, not a colour, so it neither changes nor sets the wash.
    const coveredByMedia = Array.from(el.querySelectorAll<HTMLElement>("img, video")).some((media) =>
      sameBox(media.getBoundingClientRect(), sectionRect),
    );
    if (coveredByMedia) continue;

    if (el.dataset.wash === "anchor") {
      el.setAttribute("data-wash-anchor", "");
      sections.push({ el, color, rgba, dark });
      continue;
    }

    el.setAttribute("data-wash-kind", dark ? "dark" : "light");
    sections.push({ el, color, rgba, dark });

    // Wrappers between the section and the page that paint a background.
    for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
      if (toRgba(getComputedStyle(node).backgroundColor)[3] >= 0.5) node.setAttribute("data-wash-surface", "");
    }

    // Inside the section: step 3 of the header comment. querySelectorAll
    // lists parents before children, so a box's tint parents are already
    // marked when it is reached.
    el.querySelectorAll<HTMLElement>("*").forEach((child) => {
      if (child.closest("[data-wash-island]") || child.hasAttribute("data-wash-fade")) return;
      const style = getComputedStyle(child);
      if (style.display === "none" || !hasOwnBackground(style)) return;
      const bg = toRgba(style.backgroundColor);
      const same = style.backgroundImage === "none" && bg[3] >= 0.99 && sameColor(bg, rgba);
      if (same && (child.matches(MEDIA) || child.querySelector(MEDIA))) {
        child.setAttribute("data-wash-surface", "");
      } else if (isTint(child, style, bg, dark)) {
        // Level = the nearest tint around it, plus one shade unless it is
        // the section's own colour (a white card on a white section stays
        // level 0: the page colour itself in the other mode).
        const parent = child.parentElement?.closest<HTMLElement>("[data-wash-tint]");
        const base = parent && el.contains(parent) ? Number(parent.dataset.washTint) : 0;
        child.setAttribute("data-wash-tint", String(Math.min(base + (same ? 0 : 1), 3)));
        // Its own colour, read here while every colour is the real one.
        child.style.setProperty("--wash-tint-own", style.backgroundColor);
      } else if (same) {
        child.setAttribute("data-wash-surface", "");
      } else {
        child.setAttribute("data-wash-island", "");
      }
    });

    // Text laid over a picture keeps its colours: mark the largest box that
    // is the same size as the picture (the card the picture fills).
    el.querySelectorAll<HTMLElement>("img, video").forEach((media) => {
      const box = media.getBoundingClientRect();
      if (box.width < 40 || box.height < 40) return;
      let frame: HTMLElement = media;
      for (let node = media.parentElement; node && node !== el; node = node.parentElement) {
        if (!sameBox(node.getBoundingClientRect(), box)) break;
        frame = node;
      }
      if (frame !== media && frame.textContent?.trim()) {
        frame.setAttribute("data-wash-island", "");
        frame.querySelectorAll("[data-wash-tint]").forEach((node) => node.removeAttribute("data-wash-tint"));
      }
    });

    // A light shadow (a pale glow drawn for a white page, like the homepage
    // process cards') turns black when a light section is shown dark (the
    // user's rule, Oct 4 2026: "shadow tao black hobe"). Its own colour is
    // kept in --wash-shadow-own for color-wash.css.
    if (!dark) {
      [el, ...el.querySelectorAll<HTMLElement>("*")].forEach((node) => {
        if (node.closest("[data-wash-island]")) return;
        const shadow = getComputedStyle(node).boxShadow;
        if (shadow === "none") return;
        const light = (shadow.match(SHADOW_COLOR) ?? []).find((c) => {
          const rgba = toRgba(c);
          return rgba[3] > 0.01 && luminance(rgba) > LIGHT_SHADOW_MIN;
        });
        if (!light) return;
        node.setAttribute("data-wash-shadow", "");
        node.style.setProperty("--wash-shadow-own", light);
      });
    }
  }

  html.classList.remove("wash-measuring");
  html.classList.add("wash-ready");
  return sections;
}

/**
 * The active section (see "WHEN IT SWITCHES" in the header comment): the last
 * one whose takeover point the top of the screen has passed, or the first one.
 */
function findActive(sections: WashSection[]): WashSection | null {
  if (sections.length === 0) return null;
  const y = window.scrollY;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  let active = sections[0];
  for (const section of sections) {
    const rect = section.el.getBoundingClientRect();
    if (rect.height === 0) continue;
    // Scroll position at which this section takes over, clamped to the
    // bottom of the page. 1px of slack for fractional scroll positions.
    const takeover = Math.min(y + rect.top + rect.height * TAKEOVER, max);
    if (y >= takeover - 1) active = section; // sections are in page order
  }
  return active;
}

export function ColorWashController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;

    let sections = measure();
    let active: WashSection | null = null;
    let frame = 0;

    // Tints of one kind of section paint the mix (see step 5 of the header)
    // only while held. measure() keeps each one's own colour; a hold that
    // starts from that kind's own mode reads it again first, so a box in a
    // different state now (an opened FAQ item) starts from that colour.
    const hold = (kind: "light" | "dark", reread: boolean) => {
      const cls = `wash-hold-${kind}`;
      if (html.classList.contains(cls)) return;
      if (reread) {
        const boxes = Array.from(
          document.querySelectorAll<HTMLElement>(`[data-wash-kind="${kind}"] [data-wash-tint]`),
        );
        const own = boxes.map((box) => getComputedStyle(box).backgroundColor);
        boxes.forEach((box, i) => box.style.setProperty("--wash-tint-own", own[i]));
      }
      html.classList.add(cls);
    };
    const release = (kind: "light" | "dark") => html.classList.remove(`wash-hold-${kind}`);

    const apply = (next: WashSection | null, animate: boolean) => {
      if (!next || next === active) return;
      active = next;
      const vars: Record<string, string> = { "--wash-bg": next.color, "--wash-p": next.dark ? "100%" : "0%" };
      // The tint colours of the other kind of section, one shade off this
      // colour per level (level 0 is this colour itself).
      const set = next.dark ? "--wash-on-dark" : "--wash-on-light";
      for (let level = 0; level <= 3; level++) {
        vars[`${set}-${level}`] = next.dark
          ? mixRgb(next.rgba, 255, TINT_STEP_ON_DARK * level)
          : mixRgb(next.rgba, 0, TINT_STEP_ON_LIGHT * level);
      }
      // Kind of section that ends up in its own mode: light when this one is light.
      const home = next.dark ? "dark" : "light";
      const away = next.dark ? "light" : "dark";
      if (animate) {
        // First use of this set: put it in place (nothing shows it yet).
        if (!html.style.getPropertyValue(`${set}-0`)) {
          const first: Record<string, string> = {};
          for (let level = 0; level <= 3; level++) first[`${set}-${level}`] = vars[`${set}-${level}`];
          gsap.set(html, first);
        }
        // Both kinds are partly in the other mode while the colour fades.
        hold("light", true);
        hold("dark", true);
        gsap.to(html, {
          ...vars,
          duration: DURATION,
          ease: EASE,
          overwrite: true,
          onComplete: () => release(home),
        });
      } else {
        gsap.killTweensOf(html);
        gsap.set(html, vars);
        hold(away, false);
        release(home);
      }
    };
    apply(findActive(sections), false);

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        apply(findActive(sections), true);
      });
    };

    // Colours and what counts as a card can change at a breakpoint: measure
    // again when the width changes (debounced).
    let width = window.innerWidth;
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth !== width) {
          width = window.innerWidth;
          release("light");
          release("dark");
          sections = measure();
          active = null;
          apply(findActive(sections), false);
        } else onScroll();
      }, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      if (frame) cancelAnimationFrame(frame);
      gsap.killTweensOf(html);
      html.classList.remove("wash-ready", "wash-hold-light", "wash-hold-dark");
      for (let level = 0; level <= 3; level++) {
        html.style.removeProperty(`--wash-on-dark-${level}`);
        html.style.removeProperty(`--wash-on-light-${level}`);
      }
    };
  }, [pathname]);

  return null;
}
