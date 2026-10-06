// Mobile app page: "From the first tap to a lasting habit." Figma node
// 701:14485. Centered title, then three columns 40px apart: three
// capabilities "before the tap" (460), the interaction picture with its
// lime note (840), three "after the tap" (460). Side columns are centered
// against the picture.
import Image from "next/image";
import { ServiceIconTile } from "@/components/ui/service-icon";
import type { CapabilitiesAnatomy, ServiceCapability } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

function Column({ items }: { items: ServiceCapability[] }) {
  return (
    // Phones: one column. md: the three items side by side above / below the
    // picture. xl: Figma's 460px column beside the picture.
    <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 xl:flex xl:w-1/4 xl:max-w-[460px] xl:shrink-0 xl:flex-col xl:gap-16">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col items-start gap-4">
          <ServiceIconTile name={item.icon} size={56} className="bg-brand-100" />
          <h3 className="font-sans text-heading-3 text-text-primary">{item.title}</h3>
          <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{item.description}</AnimatedText></p>
        </div>
      ))}
    </div>
  );
}

export function Anatomy({ block }: { block: CapabilitiesAnatomy }) {
  return (
    <div className="flex flex-col gap-16">
      <h2
        className="mx-auto whitespace-pre-line text-center font-sans text-display-xl text-text-primary"
        style={{ maxWidth: block.titleWidth }}
      >
        <AnimatedText>
          {block.title}
        </AnimatedText>
      </h2>

      <div className="flex flex-col gap-10 xl:flex-row xl:items-center">
        <Column items={block.before} />

        <div className="flex min-w-0 flex-1 flex-col">
          <div data-image-reveal="" className="relative aspect-[840/680] w-full overflow-hidden rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12)]">
            <Image
              src={block.showcase.image.src}
              alt={block.showcase.image.alt}
              fill
              sizes="(min-width: 1920px) 840px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="px-4 md:px-6">
            <div className="flex flex-col gap-4 rounded-b-2xl bg-brand-400 p-6 md:p-8">
              <p className="whitespace-pre-line font-sans text-heading-2 text-text-primary"><AnimatedText>{block.showcase.title}</AnimatedText></p>
              <p className="font-sans text-body-lg text-text-secondary"><AnimatedText>{block.showcase.body}</AnimatedText></p>
            </div>
          </div>
        </div>

        <Column items={block.after} />
      </div>
    </div>
  );
}
