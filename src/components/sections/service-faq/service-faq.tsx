// ---------------------------------------------------------------------------
// ServiceFaq: "Good questions. Clear answers." (Figma "FAQs / Interactive
// accordion"). Server Component; the cards are the client FaqAccordion.
//
// White, 96px top/bottom. A 680px heading column (optional eyebrow, title,
// description, "Let's talk") and the 1080px card list, 80px apart. The
// pages differ only in small settings, all in the data: the eyebrow, the
// description width (524 or 680), the button (lime on 01-02, Gray/900 on
// 03-07), the gap between cards (32, 24 or 16) and the open card's border.
// ---------------------------------------------------------------------------
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { ServiceFaqBlock } from "@/types/service-detail";
import { FaqAccordion } from "./faq-accordion";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceFaq({ block }: { block: ServiceFaqBlock }) {
  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 py-16 md:px-10 xl:flex-row xl:items-start xl:gap-20 xl:py-24">
        <div className="flex w-full flex-col items-start gap-6 xl:w-[36.957%] xl:max-w-[680px] xl:shrink-0">
          {block.eyebrow ? <p className="font-mono text-label-md text-text-secondary">{block.eyebrow}</p> : null}
          <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
          <p className="font-sans text-body-lg text-text-secondary" style={{ maxWidth: block.descriptionWidth }}>
            <AnimatedText>{block.description}</AnimatedText>
          </p>
          <Button
            href={block.cta.href}
            variant="primary"
            size="lg"
            className={cn(
              "h-[60px] rounded-2xl px-6 font-mono",
              block.ctaTone === "dark" && "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700",
            )}
          >
            {block.cta.label}
          </Button>
        </div>

        <FaqAccordion items={block.items} gap={block.listGap} openBorder={block.openBorder} />
      </div>
    </section>
  );
}
