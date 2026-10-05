// ---------------------------------------------------------------------------
// ServicePractice: the UI/UX page's "Every request. A clear next step."
// (Figma component "3.1 / Study / UIUX device story", instance 701:14354).
// Server Component.
//
// Grey band (surface/secondary), 860px tall at 1920 with 80px top/bottom
// and 96px sides (wider than the 40px of the other sections, as in Figma).
// Text column (656px) and the 1008 x 672 device picture, 64px apart,
// vertically centred. The text column:
// title + intro, then two numbered "design decisions" between faint rules
// (text/primary at 12%).
// ---------------------------------------------------------------------------
import Image from "next/image";
import type { ServicePracticeBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServicePractice({ block }: { block: ServicePracticeBlock }) {
  return (
    <section className="w-full bg-surface-secondary">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-5 py-16 md:px-10 xl:min-h-[860px] xl:flex-row xl:items-center xl:px-24 xl:py-20">
        <div className="flex w-full flex-col gap-10 xl:w-[35.652%] xl:max-w-[656px] xl:shrink-0">
          <div className="flex flex-col gap-6">
            <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>
            <p className="max-w-[560px] font-sans text-body-lg text-text-secondary">{block.intro}</p>
          </div>

          <div className="flex max-w-[560px] flex-col gap-6">
            {block.decisions.flatMap((decision) => [
              <span key={`${decision.index}-rule`} aria-hidden="true" className="h-px w-full bg-text-primary/12" />,
              <div key={decision.index} className="flex gap-6">
                <p className="w-8 shrink-0 font-mono text-label-md text-text-primary">{decision.index}</p>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="font-sans text-heading-4 text-text-primary">{decision.title}</h3>
                  <p className="font-sans text-body-md text-text-secondary">{decision.benefit}</p>
                </div>
              </div>,
            ])}
          </div>
        </div>

        <div data-image-reveal="" className="relative aspect-[1008/672] w-full min-w-0 overflow-hidden rounded-3xl xl:w-[1008px] xl:shrink">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(min-width: 1920px) 1008px, 55vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
