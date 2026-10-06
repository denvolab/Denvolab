// ---------------------------------------------------------------------------
// CaseStudySolution: "The Solution" with its picture cards (Figma
// "Frame 1707479919", e.g. 727:2427). Set in Host Grotesk.
//
// FIGMA (1920): same 1097px column as the challenge (x 470, or 397 on My
// Crew). Title Bold 48 / 124%, #342f3d; 24px; body Regular 20 / 120%,
// #524566; 24px; then the cards, 24px apart:
//   compact  3 cards (most pages): 302px picture, radius 16
//   wide     2 cards (My Crew): 489px picture, radius 24
// Card: white, radius 20, 1px #eee0ff inside stroke, soft 36px shadow,
// padding 24 / 24 / 0 / 24 (the picture sits on the bottom edge), title Bold
// 24 / 140%, description Regular 16 / 150%, 8px apart, 16px above the
// picture. Cards in a row share the tallest height; the picture stays at the
// bottom.
//
// Below xl the challenge has no reserved slot, so this section adds its own
// 48 / 64px gap above.
// ---------------------------------------------------------------------------
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { fluid, pctOf } from "@/lib/utils/fluid";
import type { CaseStudySolutionBlock } from "@/types/case-study";
import { AnimatedText } from "@/components/ui/animated-text";

export function CaseStudySolution({ block }: { block: CaseStudySolutionBlock }) {
  const wide = block.variant === "wide";

  return (
    <section className="mx-auto mt-12 w-full max-w-[1920px] px-5 md:mt-16 md:px-10 xl:mt-0 xl:px-0">
      <div
        className="flex max-w-[1097px] flex-col gap-6 xl:ml-[var(--cs-col-x)] xl:min-h-[var(--cs-col-h)] xl:w-[57.1354%]"
        style={{ "--cs-col-x": pctOf(block.x), "--cs-col-h": fluid(block.minHeight, 0) } as CSSProperties}
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="font-grotesk text-[length:clamp(2rem,1.6rem+1.2vw,3rem)] font-bold leading-[1.24] wash-ink [--ink:#342f3d]">
            <AnimatedText>
              {block.title}
            </AnimatedText>
          </h2>
          <p className="font-grotesk text-[length:clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.2] wash-ink [--ink:#524566]">
            <AnimatedText>{block.body}</AnimatedText>
          </p>
        </div>

        <ul className={cn("grid gap-6 md:gap-4 lg:gap-6", wide ? "md:grid-cols-2" : "md:grid-cols-3")}>
          {block.cards.map((card) => (
            <li
              key={card.title}
              data-image-reveal=""
              className="flex flex-col gap-4 overflow-hidden rounded-[20px] bg-white px-6 pt-6 shadow-[0_0_36px_rgba(0,0,0,0.04)] outline outline-1 -outline-offset-1 outline-[#eee0ff] md:px-4 md:pt-4 lg:px-6 lg:pt-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-grotesk text-xl font-bold leading-[1.4] wash-ink [--ink:#342f3d] lg:text-2xl">{card.title}</h3>
                <p className={cn("font-grotesk text-base leading-normal", wide ? "wash-ink [--ink:#312f33]" : "wash-ink [--ink:#524566]")}>
                  <AnimatedText>{card.description}</AnimatedText>
                </p>
              </div>
              <div
                className={cn(
                  "relative mt-auto w-full overflow-hidden",
                  wide ? "aspect-[489/263] rounded-3xl" : "aspect-[302/263] rounded-2xl",
                )}
              >
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes={wide ? "(min-width: 768px) 489px, 100vw" : "(min-width: 768px) 302px, 100vw"}
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
