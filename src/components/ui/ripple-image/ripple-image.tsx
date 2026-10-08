"use client";

import Image from "@/components/ui/responsive-image/responsive-image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";
import { attachRippleHover } from "./attach-ripple-hover";

/**
 * RippleImage
 * -----------
 * A picture that ripples like water when the cursor moves over it.
 *
 *   EDGE WOBBLE   the outline jiggles like jelly where the cursor crosses it
 *   WATER RIPPLE  the picture bends around the cursor and settles when it stops
 *
 * Use it anywhere you would use <Image>: project cards, page headers, blog covers.
 * It renders a normal, fast <Image> at rest. The WebGL effect only exists while
 * the cursor is over the picture (see attach-ripple-hover.ts).
 *
 * Example:
 *
 *   <RippleImage
 *     src="/images/about/team.jpg"
 *     alt="The DenvoLab team at work"
 *     sizes="(min-width: 768px) 50vw, 100vw"
 *     className="aspect-[3/2] w-full"
 *     imageClassName="rounded-2xl"
 *   />
 */

type RippleImageProps = {
  /** Image path, e.g. "/images/portfolio/quotable.png" */
  src: string;
  /** Describe the image for screen readers */
  alt: string;
  /**
   * How wide the picture is on screen, so the browser downloads a sensible file size.
   * Example: "(min-width: 768px) 50vw, 100vw" means half the screen on tablet and up,
   * the full screen below that. Default: "100vw".
   */
  sizes?: string;
  /**
   * Sizes the frame around the picture. The frame needs a height or an aspect ratio,
   * for example "h-[700px] w-full" or "aspect-[3/2] w-full".
   */
  className?: string;
  /**
   * Classes for the <img> itself. Put rounded corners here (for example "rounded-2xl"),
   * not on the frame: the effect copies the rounded corners of the <img>.
   */
  imageClassName?: string;
  /**
   * How the picture is cropped when it's taller than the frame needs, same idea as CSS
   * `object-position`. "center" (default) crops evenly top and bottom. "top" keeps the
   * top of the picture and crops from the bottom instead -- the reason you'd otherwise
   * reach for `object-top`. Set this instead of adding `object-top` to `imageClassName`
   * yourself: this prop drives BOTH the resting <img>'s crop AND the hover canvas's
   * crop, so the picture is framed identically before, during and after hovering.
   * Setting only `object-top` on `imageClassName` crops the resting picture correctly
   * but leaves the hover canvas cropping from the center regardless, so the picture
   * visibly jumps to a different part of itself the instant the effect starts.
   */
  objectPosition?: "center" | "top";
  /** Load the picture right away instead of when it scrolls near. Use it for pictures at the top of a page. */
  eager?: boolean;
};

export function RippleImage({
  src,
  alt,
  sizes = "100vw",
  className,
  imageClassName,
  objectPosition = "center",
  eager = false,
}: RippleImageProps) {
  // A handle to the picture frame, so the ripple effect knows which element to use.
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current) return;
    // Starts listening for the cursor. Returns a cleanup function React calls on unmount.
    return attachRippleHover(frameRef.current, { objectPosition });
  }, [objectPosition]);

  return (
    // No "overflow: hidden" on the frame, on purpose: the ripple canvas draws a little
    // outside the frame so the edge can bulge. Rounded corners live on the <img>.
    //
    // "isolate" gives this frame its own stacking context, so the hover canvas's
    // z-index (set in ripple-effect.ts -- needed so its bulge isn't cut off by
    // whatever comes right after the frame) stays contained inside this frame and
    // can never out-rank a sibling OUTSIDE it, such as content a caller overlays on
    // top of the picture (what-we-create's card title/description/button). Without
    // this, an explicit z-index anywhere inside the frame beats an ordinary
    // positioned sibling regardless of DOM order, so that overlaid content would
    // disappear behind the canvas the instant a hover starts.
    <div data-ripple-image="" ref={frameRef} className={cn("relative isolate", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        className={cn("object-cover", objectPosition === "top" && "object-top", imageClassName)}
      />
    </div>
  );
}
