// ---------------------------------------------------------------------------
// CaseStudyFacts: the three grey cards under the hero (Industry / Services /
// Scope or Timeline). Figma "Frame 1707479988", e.g. 727:2360.
//
// FIGMA (1920): a row of three 587px cards, 40px apart, centred vertically.
// Card: Gray/100 (#e8ecf0), radius 12, padding 32, a 64px icon, then title
// (32/40, -2.5%, #342f3d) and value (16/24, gray-600) 16px apart. The first
// card has 32px between icon and text, the other two 24px, which makes it
// 8px taller (240 vs 232); kept as designed.
// Tablet: three columns from md. Mobile: stacked.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CaseStudyFactsBlock } from "@/types/case-study";

export function CaseStudyFacts({ block }: { block: CaseStudyFactsBlock }) {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
      <dl className="grid gap-4 md:grid-cols-3 md:items-center md:gap-6 xl:gap-10">
        {block.items.map((item, i) => (
          <div
            key={item.title}
            className={cn("flex flex-col rounded-[12px] bg-gray-100 p-6 md:p-8", i === 0 ? "gap-6 md:gap-8" : "gap-6")}
          >
            <Image
              src={`/images/case-studies/icons/${item.icon}.svg`}
              alt=""
              width={64}
              height={64}
              className="size-12 md:size-16"
            />
            <div className="flex flex-col gap-4">
              <dt className="font-sans text-heading-2 wash-ink [--ink:#342f3d]">{item.title}</dt>
              <dd className="font-sans text-body-md text-gray-600">{item.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
