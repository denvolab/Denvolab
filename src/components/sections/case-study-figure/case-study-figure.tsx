// ---------------------------------------------------------------------------
// CaseStudyFigure: one picture band (overview shot, billboard, the stacked
// screens, the AI and My Crew showcase pictures).
//
// FIGMA (1920): each picture has a left edge `x` and a `width` in the frame
// and a corner radius. From xl those become percentages of the page width,
// so the picture keeps its place and size relative to the frame as the page
// narrows. Below xl it fills the content width (20 / 40px side padding),
// except full-bleed pictures (width 1920), which always run edge to edge.
// The radius shrinks a little on small screens. `height` is set when the
// Figma frame crops the picture (the overview shot is a 1035px screen in a
// 1024px frame); the picture then fills the box like Figma's "Fill".
// ---------------------------------------------------------------------------
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { fluid, pctOf } from "@/lib/utils/fluid";
import type { CaseStudyFigureBlock } from "@/types/case-study";

export function CaseStudyFigure({ block }: { block: CaseStudyFigureBlock }) {
  const { image, x, width, radius } = block;
  // Box aspect: the Figma frame's own height when it crops the picture,
  // otherwise the picture's.
  const aspect = block.height ? `${width} / ${block.height}` : `${image.width} / ${image.height}`;
  const fullBleed = x === 0 && width >= 1920;

  return (
    <div className={cn("mx-auto w-full max-w-[1920px]", !fullBleed && "px-5 md:px-10 xl:px-0")}>
      <div
        data-image-reveal=""
        className="relative w-full overflow-hidden xl:ml-[var(--cs-fig-x)] xl:w-[var(--cs-fig-w)]"
        style={
          {
            "--cs-fig-x": pctOf(x),
            "--cs-fig-w": pctOf(width),
            aspectRatio: aspect,
            borderRadius: radius ? fluid(radius, Math.min(radius, 12)) : undefined,
          } as CSSProperties
        }
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={`(min-width: 1920px) ${width}px, ${fullBleed ? "100vw" : `${Math.round((width / 1920) * 100)}vw`}`}
          className="object-cover"
        />
      </div>
    </div>
  );
}
