// ---------------------------------------------------------------------------
// CaseStudyCompetitors: My Crew's "Competitor Analysis" (Figma
// "06 Competitor Analysis", 716:18425). Set in SF Pro (Apple's system font;
// other systems fall back to Inter, see --font-sf).
//
// FIGMA (1920): eyebrow (10px gradient dot + Medium 18 gradient text) and
// title (72/102; Light runs at #312f33, the middle run Medium) at x 96; then
// four 338px columns at x 80 / 554 / 1028 / 1502 (136px apart): logo, then
// rows of title (Semibold 24/32, #121014), 12px, text (Regular 14/20,
// #312f33), 28px to the next row. Figma starts the first column's rows 20px
// higher than the others (its logo is taller); here all columns start level.
// Four columns from xl, two from md, one on phones.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CaseStudyCompetitorsBlock } from "@/types/case-study";
import { AnimatedText } from "@/components/ui/animated-text";

const GRADIENT = "bg-gradient-to-r from-[#ff8d13] to-[#8c22f5] bg-clip-text text-transparent";

export function CaseStudyCompetitors({ block }: { block: CaseStudyCompetitorsBlock }) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 font-sf md:px-10 xl:min-h-[685px] xl:px-[4.1667%] xl:pt-7">
      <div className="flex flex-col gap-3 xl:gap-4 xl:pl-4">
        <p className="flex items-center gap-2 text-base font-medium leading-6 md:text-lg md:leading-6">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-gradient-to-r from-[#ff8d13] to-[#8c22f5]" />
          <span className={GRADIENT}>{block.eyebrow}</span>
        </p>
        <h2 className="text-[length:clamp(2.25rem,1.5rem+3vw,4.5rem)] leading-[1.4167] wash-ink [--ink:#312f33]">
          <AnimatedText>
            {block.title.map((run, i) => (
              <span key={i} className={cn(run.tone === "muted" ? "font-light" : "font-medium")}>
                {run.text}
              </span>
            ))}
          </AnimatedText>
        </h2>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:mt-[108px] xl:grid-cols-4 xl:gap-x-[7.0833%]">
        {block.columns.map((column) => (
          <div key={column.name} className="flex flex-col">
            <div className="flex h-16 items-start xl:h-[95px]">
              <Image
                src={column.logo.src}
                alt={column.logo.alt}
                width={column.logo.width}
                height={column.logo.height}
                className="h-auto"
              />
            </div>
            <dl className="flex flex-col gap-7">
              {column.rows.map((row) => (
                <div key={row.title} className="flex flex-col gap-3">
                  <dt className="text-2xl font-semibold leading-8 wash-ink [--ink:#121014]">{row.title}</dt>
                  <dd className="max-w-[338px] text-sm leading-5 wash-ink [--ink:#312f33]">{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
