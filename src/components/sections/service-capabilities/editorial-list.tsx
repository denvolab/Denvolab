// Branding page: "A complete identity. Every expression considered."
// Figma node 701:14176. Left: title + Brand/50 principles card (520 wide);
// right: six icon rows spread over the same 900px height with hairlines
// between them (Figma "space between").
import Image from "next/image";
import { ServiceIconTile } from "@/components/ui/service-icon";
import type { CapabilitiesEditorialList } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function EditorialList({ block }: { block: CapabilitiesEditorialList }) {
  return (
    <div className="flex flex-col gap-16 xl:flex-row xl:items-center xl:gap-20">
      <div className="flex w-full flex-col gap-8 xl:w-[30.87%] xl:max-w-[568px] xl:shrink-0">
        <h2 className="whitespace-pre-line font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>

        <div data-image-reveal="" className="flex max-w-[520px] flex-col gap-6 rounded-3xl bg-brand-50 px-3 py-3 md:gap-10 md:px-4">
          <div className="relative aspect-[488/248] w-full overflow-hidden rounded-2xl">
            <Image
              src={block.feature.image.src}
              alt={block.feature.image.alt}
              fill
              sizes="488px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 p-3 md:gap-10 md:p-4">
            <p className="max-w-[440px] whitespace-pre-line font-sans text-display-lg text-text-primary">
              {block.feature.statement}
            </p>
            <p className="max-w-[440px] font-sans text-body-lg text-text-secondary">{block.feature.description}</p>
          </div>
        </div>
      </div>

      {/* Rows and hairlines are siblings (a hairline under every row, the
          last one included) so "space between" spaces them all evenly, as
          in Figma. Each row is an h3 + text, so no list markup is needed. */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 self-stretch">
        {block.items.flatMap((item) => [
          // Phones: icon, title and text stacked. md+: one row, as in Figma.
          <div key={item.title} className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <ServiceIconTile name={item.icon} size={56} className="bg-brand-100" />
            <h3 className="font-sans text-heading-3 text-text-primary md:w-[32%] md:max-w-[380px] md:shrink-0">
              {item.title}
            </h3>
            <p className="min-w-0 flex-1 font-sans text-body-lg text-text-secondary">{item.description}</p>
          </div>,
          <span key={`${item.title}-rule`} aria-hidden="true" className="h-px w-full shrink-0 bg-border-primary" />,
        ])}
      </div>
    </div>
  );
}
