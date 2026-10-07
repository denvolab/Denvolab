import type { RippleEffect } from "./ripple-effect";

/**
 * attach-ripple-hover.ts
 * ----------------------
 * Decides WHEN the WebGL ripple exists. The drawing itself is in ripple-effect.ts.
 *
 * The idea, in four steps:
 *
 *   1. At rest, the picture is a normal <img>. No WebGL, fast page load.
 *   2. When the cursor enters the picture, we create the WebGL canvas
 *      and hide the <img> (the canvas draws the same picture).
 *   3. While the cursor is over the picture, we pass it the cursor position.
 *   4. After the cursor leaves we wait 2 seconds so the ripples can fade,
 *      then remove the canvas and show the <img> again.
 *
 * Only one picture is hovered at a time, so only one WebGL canvas exists at a time.
 * This file has no React in it, so it works in any page. ripple-image.tsx calls it.
 *
 * @param frame  the element that wraps the <img> (the picture frame)
 * @returns      a cleanup function that removes everything again
 */

/** How long to keep the canvas after the cursor leaves, so ripples can finish fading. */
const LINGER_MS = 2200;

// Wheel scrolling should composite normal images, not upload large textures as
// new images pass under a stationary mouse. The page's scroll (and wheel, which
// arrives before Lenis moves the page) is therefore ALWAYS watched, by one
// passive listener for the whole page, so no effect can start while the page
// is moving or just after. (It used to be watched only while a canvas was
// active, so a scroll with no canvas left `scrollingUntil` at 0: every picture
// that slid under the cursor built a WebGL canvas, uploaded its texture and
// swapped out its <img> mid-scroll, and the pictures jerked.) Active canvases
// also subscribe so a scroll removes them at once.
//
// Hover must start the ripple AT ONCE, though (the user, Oct 7, 2026: it only
// came on after moving the mouse many times). Lenis keeps easing the page for
// a second or so after the wheel stops, and every one of those scroll events
// used to block the effect and kill a running one. Now:
//   - a REAL mouse movement (movementX/Y not 0) starts the effect right away,
//     even during that easing tail. Only a picture sliding under a still
//     cursor waits for the page to settle;
//   - a running effect is removed only when the visitor scrolls again (wheel),
//     not by the easing tail;
//   - three.js is fetched while the browser is idle, and the decoded copy of
//     each picture is kept, so the first hover doesn't wait for downloads.
const SCROLL_QUIET_MS = 150;
const activeScrollStops = new Set<() => void>();
let scrollingUntil = 0;
let watchingScroll = false;
function onPageScroll() {
  scrollingUntil = performance.now() + SCROLL_QUIET_MS;
}
function onWheel() {
  onPageScroll();
  activeScrollStops.forEach(stop => stop());
}
function watchScroll() {
  if (watchingScroll) return;
  watchingScroll = true;
  window.addEventListener("scroll", onPageScroll, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });
}

/** three.js and the effect, downloaded once, while the browser is idle. */
let effectModule: Promise<typeof import("./ripple-effect")> | null = null;
function loadEffect() {
  effectModule ??= import("./ripple-effect");
  return effectModule;
}
let prewarmed = false;
function prewarm() {
  if (prewarmed) return;
  prewarmed = true;
  const idle = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1500));
  idle(() => void loadEffect().catch(() => { effectModule = null; }));
}

/** A real mouse movement, not the page sliding under a still cursor. */
const movedByHand = (event: PointerEvent) => event.movementX !== 0 || event.movementY !== 0;
function subscribeScroll(stop: () => void) {
  activeScrollStops.add(stop);
}
function unsubscribeScroll(stop: () => void) {
  activeScrollStops.delete(stop);
}

/** SVG logos and illustrations keep their original rendering on hover. */
export function isSvgImage(image: HTMLImageElement): boolean {
  return [image.currentSrc, image.getAttribute("src") ?? ""].some(source => {
    if (/^data:image\/svg\+xml/i.test(source)) return true;
    try {
      const url = new URL(source, document.baseURI);
      const original = url.searchParams.get("url") ?? url.pathname;
      return /\.svg$/i.test(original.split(/[?#]/)[0]);
    } catch {
      return /\.svg(?:[?#]|$)/i.test(source);
    }
  });
}

/**
 * How long after the cursor leaves the edge wobble is over (it lasts 1 second).
 * From then on the canvas has no see-through parts, so the <img> can safely be shown
 * underneath it again. That way the normal picture is already on screen, and drawn,
 * well before the canvas is finally removed.
 */
const WOBBLE_MS = 1100;

/**
 * When the effect does not start, the normal picture simply stays, which looks like
 * "nothing happens". While developing (npm run dev), say why in the browser console.
 * Nothing is printed on the live site.
 */
const alreadyExplained = new Set<string>(); // so a page with many pictures does not print the same line many times

function explain(reason: string, error?: unknown) {
  if (process.env.NODE_ENV === "production" || alreadyExplained.has(reason)) return;
  alreadyExplained.add(reason);
  console.info(`[RippleImage] picture effect is off: ${reason}`, error ?? "");
}

/**
 * Loads a plain copy of the picture that is already on screen.
 *
 * Why not draw the visible <img> directly? Next.js's <Image> gives it several sizes
 * (a "srcset"). For such an <img>, the browser reports a size in CSS pixels that can be
 * smaller than the real file (for example 662 wide for a 750 wide file), and WebGL then
 * refuses to upload the picture. A plain copy always reports its real size.
 * The address is the same one the <img> already loaded, so the browser reuses the download.
 */
const decoded = new WeakMap<HTMLImageElement, { src: string; copy: Promise<HTMLImageElement> }>();
function loadPicture(image: HTMLImageElement): Promise<HTMLImageElement> {
  const src = image.currentSrc || image.src;
  const cached = decoded.get(image);
  if (cached?.src === src) return cached.copy;
  const copy = new Image();
  if (image.crossOrigin) copy.crossOrigin = image.crossOrigin;
  copy.src = src;
  const ready = copy.decode().then(() => copy);
  ready.catch(() => decoded.delete(image));
  decoded.set(image, { src, copy: ready });
  return ready;
}

/**
 * Runs `fn` after the browser has drawn `frames` more screen frames (about 16ms each).
 *
 * The <img> and the canvas are swapped in two steps, never in one. A canvas that was just
 * created can take a frame or two to reach the screen, and an <img> that was hidden for a
 * while can take a frame or two to be drawn again. If one is removed in the same instant
 * the other appears, the picture flashes for a moment. That flash looked like blinking.
 * So both are on screen together for a few frames (they show the same picture, so
 * nobody sees the overlap) and only then is one of them removed.
 */
const SWAP_FRAMES = 3;

function afterFrames(frames: number, fn: () => void) {
  if (frames <= 0) fn();
  else requestAnimationFrame(() => afterFrames(frames - 1, fn));
}

export function attachRippleHover(
  frame: HTMLElement,
  options?: { objectPosition?: "center" | "top"; image?: HTMLImageElement; imageBounds?: boolean },
): () => void {
  const image = options?.image ?? frame.querySelector("img");
  if (image && (isSvgImage(image) || image.closest("[data-no-ripple]"))) return () => {};

  // Skip the effect on touch screens, and for people who asked for less motion.
  const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!image || !hasMouse || wantsLessMotion) {
    if (!image) explain("no <img> found inside the picture frame.");
    else if (!hasMouse) explain("this device has no mouse-style hover.");
    else explain("the system setting \"Reduce motion\" is on.");
    return () => {};
  }

  watchScroll();
  prewarm();

  let effect: RippleEffect | null = null; // the WebGL effect, only while hovering
  let loading = false;                    // true while three.js is being downloaded
  let cursorInside = false;
  let removed = false;
  let lingerTimer = 0;
  let revealTimer = 0;
  let retryTimer = 0;
  let last = { x: 0, y: 0 };              // last cursor position inside the frame (px)

  /** Cursor position in pixels from the frame's top-left corner. */
  function positionOf(event: PointerEvent) {
    const rect = options?.imageBounds ? image!.getBoundingClientRect() : frame.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (options?.imageBounds ? image!.offsetWidth / rect.width : 1), y: (event.clientY - rect.top) * (options?.imageBounds ? image!.offsetHeight / rect.height : 1) };
  }

  /** Create the WebGL effect (the first time, this also downloads three.js). */
  /**
   * Started while the page was moving: try again once it is still. Without
   * this a picture the pointer rests on after a scroll stayed flat until the
   * next mouse move or a click (Oct 7, 2026): the browser sends no new
   * pointer event when the page stops under a still mouse.
   */
  function retryAfterScroll() {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(() => {
      if (cursorInside && !effect && !loading && !removed) void start();
    }, Math.max(0, scrollingUntil - performance.now()) + 30);
  }

  async function start(byHand = false) {
    if (!byHand && performance.now() < scrollingUntil) {
      retryAfterScroll();
      return;
    }
    if (isSvgImage(image!) || image!.closest("[data-no-ripple]")) return;
    if (effect || loading) return;
    if (!image!.complete || image!.naturalWidth === 0) {
      explain("the picture has not finished loading yet; it starts when it has.");
      return;
    }

    loading = true;
    try {
      // Both are fetched only now, side by side, so three.js is not part of the first page load.
      const [{ RippleEffect }, picture] = await Promise.all([
        loadEffect(),
        loadPicture(image!),
      ]);
      if (removed || !cursorInside) return;
      if (!byHand && performance.now() < scrollingUntil) {
        retryAfterScroll();
        return;
      }

      const created = new RippleEffect(frame, image!, picture, options?.objectPosition, options?.imageBounds);
      effect = created;
      subscribeScroll(stopForScroll);

      // The canvas now draws the picture. Hide the <img> only once the canvas is really on
      // screen (see SWAP_FRAMES). The canvas sits on top, so nothing shows through meanwhile.
      afterFrames(SWAP_FRAMES, () => {
        if (effect === created) image!.style.visibility = "hidden";
      });

      if (cursorInside) created.enter(last.x, last.y);
      else lingerTimer = window.setTimeout(() => stop(), LINGER_MS); // cursor already left
    } catch (error) {
      explain("WebGL could not start (see the error below). The normal picture stays.", error);
      effect = null; // WebGL not available: the normal <img> simply stays
    } finally {
      loading = false;
    }
  }

  /**
   * Remove the WebGL effect and show the normal <img> again.
   * The <img> comes back first and the canvas is removed a few frames later (see SWAP_FRAMES).
   */
  function stop(immediately = false) {
    unsubscribeScroll(stopForScroll);
    const old = effect;
    effect = null;
    image!.style.visibility = "";
    if (!old) return;
    if (immediately) old.dispose();
    else afterFrames(SWAP_FRAMES, () => old.dispose());
  }

  function stopForScroll() {
    window.clearTimeout(lingerTimer);
    window.clearTimeout(revealTimer);
    stop(true);
    // Back on, under the pointer, once the scroll stops.
    if (cursorInside) retryAfterScroll();
  }

  // ---- The three mouse events ----

  function onEnter(event: PointerEvent) {
    if (options?.imageBounds && !insideImage(event)) return;
    cursorInside = true;
    last = positionOf(event);
    window.clearTimeout(lingerTimer); // came back before the fade finished: keep going
    window.clearTimeout(revealTimer);

    if (effect) {
      image!.style.visibility = "hidden"; // the canvas is on screen already, so this is safe
      effect.enter(last.x, last.y);
    } else void start(movedByHand(event));
  }

  function insideImage(event: PointerEvent) {
    const rect = image!.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  }

  function onMove(event: PointerEvent) {
    if (options?.imageBounds) {
      if (!insideImage(event)) { if (cursorInside) onLeave(); return; }
      if (!cursorInside) { onEnter(event); return; }
    }
    last = positionOf(event);
    if (!effect && !loading && cursorInside) void start(movedByHand(event));
    effect?.move(last.x, last.y);
  }

  function onLeave() {
    if (!cursorInside) return;
    cursorInside = false;
    window.clearTimeout(retryTimer);
    effect?.leave();
    lingerTimer = window.setTimeout(() => stop(), LINGER_MS);

    // When the wobble is over, put the <img> back underneath the canvas (see WOBBLE_MS).
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(() => {
      if (!cursorInside && effect) image!.style.visibility = "";
    }, WOBBLE_MS);
  }

  // Get the picture ready as soon as the cursor reaches its box.
  function onFrameEnter(event: PointerEvent) {
    if (image!.complete && image!.naturalWidth) void loadPicture(image!).catch(() => {});
    onEnter(event);
  }

  frame.addEventListener("pointerenter", onFrameEnter);
  frame.addEventListener("pointermove", onMove);
  frame.addEventListener("pointerleave", onLeave);

  // Responsive srcsets and React image swaps must use the newly loaded texture.
  function onLoad() { stop(true); if (cursorInside) void start(); }
  image.addEventListener("load", onLoad);

  // Cleanup: remove the listeners and the effect.
  return () => {
    removed = true;
    window.clearTimeout(retryTimer);
    image.removeEventListener("load", onLoad);
    window.clearTimeout(lingerTimer);
    window.clearTimeout(revealTimer);
    frame.removeEventListener("pointerenter", onFrameEnter);
    frame.removeEventListener("pointermove", onMove);
    frame.removeEventListener("pointerleave", onLeave);
    stop(true);
  };
}
