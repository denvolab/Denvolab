// AI agent & CMS page: "Your workflows. Your content. Your system." Figma
// node 701:15331. Left half: title + six icon rows, each followed by a
// hairline. Right half: grey card with the CMS picture and a "human
// checkpoint" note. The halves are 48px apart and share the width.
import Image from "next/image";
import { ServiceIconTile } from "@/components/ui/service-icon";
import type { CapabilitiesListFeature } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ListFeature({ block }: { block: CapabilitiesListFeature }) {
  return (
    <div className="flex flex-col gap-12 xl:flex-row xl:items-start">
      <div className="flex min-w-0 flex-1 flex-col gap-12">
        <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary">
          <AnimatedText>
            {block.title}
          </AnimatedText>
        </h2>

        <div className="flex flex-col gap-8">
          {block.items.flatMap((item) => [
            <div key={item.title} className="flex items-center gap-6">
              <ServiceIconTile name={item.icon} size={56} className="bg-brand-100" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="font-sans text-heading-4 text-text-primary">{item.title}</h3>
                <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{item.description}</AnimatedText></p>
              </div>
            </div>,
            <span key={`${item.title}-rule`} aria-hidden="true" className="h-px w-full bg-border-primary" />,
          ])}
        </div>
      </div>

      <div data-image-reveal="" className="flex min-w-0 flex-1 flex-col gap-8 rounded-3xl bg-surface-secondary">
        <div className="relative aspect-[896/680] w-full overflow-hidden rounded-[12px]">
          <Image
            src={block.feature.image.src}
            alt={block.feature.image.alt}
            fill
            sizes="(min-width: 1920px) 896px, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-4 p-6 md:p-10">
          <ServiceIconTile name={block.feature.icon} size={56} className="bg-white" />
          <h3 className="whitespace-pre-line font-sans text-heading-2 text-text-primary">{block.feature.title}</h3>
          <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{block.feature.description}</AnimatedText></p>
        </div>
      </div>
    </div>
  );
}
