// ---------------------------------------------------------------------------
// CaseStudyIntro: the big centred statement under the facts (Figma text
// layer, e.g. 727:2396). 968px wide, 60/68, -4% (Display XL), gray-950.
// Job Sea starts with a dark lead-in and greys out the rest (gray-300).
//
// Width: Figma's box is 968px, but Figma and the browser measure a few
// lines differently (e.g. "discovery, stay details and checkout" is 966.6px
// here and still wraps in Figma, "visible emergency request path and" is
// 960.4px and fits). A 964px box gives Figma's line breaks on every page.
//
// `minHeight` is the height Figma gives the text (408px for six lines on most
// pages), so the picture below lands at the same y even when a page's
// sentence breaks into fewer lines. Applied from xl only, and scaled with the
// viewport (full size at 1880px+), so narrower desktops don't get a gap made
// for 1920.
// ---------------------------------------------------------------------------
import type { CSSProperties } from "react";
import { fluid } from "@/lib/utils/fluid";
import type { CaseStudyIntroBlock } from "@/types/case-study";
import { AnimatedText } from "@/components/ui/animated-text";

export function CaseStudyIntro({ block }: { block: CaseStudyIntroBlock }) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
      <p
        className="mx-auto max-w-[964px] font-sans text-display-xl text-gray-950 xl:min-h-[var(--cs-intro-min)]"
        style={{ "--cs-intro-min": fluid(block.minHeight, 0) } as CSSProperties}
      >
        <AnimatedText>
          {block.lead ? (
            <>
              {block.lead}
              <span className="text-gray-300">{block.text}</span>
            </>
          ) : (
            block.text
          )}
        </AnimatedText>
      </p>
    </section>
  );
}
