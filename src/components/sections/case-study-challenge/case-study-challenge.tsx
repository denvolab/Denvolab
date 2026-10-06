// ---------------------------------------------------------------------------
// CaseStudyChallenge: "The Challenge" (Figma "Frame 1707479920", e.g.
// 727:2424). Title Display LG (48/56, -3.5%), 24px, body Body LG (18/28,
// gray-600; My Crew uses #312f33).
//
// FIGMA (1920): a 1097px column whose left edge is at x 470 (412 on My Crew),
// so it sits a little right of centre. `minHeight` is the slot Figma leaves
// before the next block (253px on most pages), applied from xl.
// ---------------------------------------------------------------------------
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { fluid, pctOf } from "@/lib/utils/fluid";
import type { CaseStudyChallengeBlock } from "@/types/case-study";
import { AnimatedText } from "@/components/ui/animated-text";

export function CaseStudyChallenge({ block }: { block: CaseStudyChallengeBlock }) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 md:px-10 xl:px-0">
      <div
        className="flex max-w-[1097px] flex-col gap-4 md:gap-6 xl:ml-[var(--cs-col-x)] xl:min-h-[var(--cs-col-h)] xl:w-[57.1354%]"
        style={{ "--cs-col-x": pctOf(block.x), "--cs-col-h": fluid(block.minHeight, 0) } as CSSProperties}
      >
        <h2 className="font-sans text-display-lg text-gray-950"><AnimatedText>{block.title}</AnimatedText></h2>
        <p className={cn("font-sans text-body-lg", block.bodyColor === "dark" ? "wash-ink [--ink:#312f33]" : "text-gray-600")}>
          <AnimatedText>{block.body}</AnimatedText>
        </p>
      </div>
    </section>
  );
}
