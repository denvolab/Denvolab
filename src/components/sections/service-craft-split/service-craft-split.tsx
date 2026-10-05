// ---------------------------------------------------------------------------
// ServiceCraftSplit: the SaaS page's dark showcase (Figma "Craft / Service
// concept showcase", node 701:14683). Server Component.
//
// Gray/900, 96px top/bottom. A 632px text column and a 1160 x 800 picture,
// 48px apart. The column is as tall as the picture with the title at the
// top and the description at the bottom (Figma "space between").
// ---------------------------------------------------------------------------
import Image from "next/image";
import type { ServiceCraftSplitBlock } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function ServiceCraftSplit({ block }: { block: ServiceCraftSplitBlock }) {
  return (
    <section className="w-full bg-gray-900">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 py-16 md:px-10 xl:flex-row xl:py-24">
        <div className="flex w-full flex-col justify-between gap-8 xl:w-[34.348%] xl:max-w-[632px] xl:shrink-0">
          <h2 className="whitespace-pre-line font-sans text-display-xl text-white"><AnimatedText>{block.title}</AnimatedText></h2>
          <p className="max-w-[600px] font-sans text-body-lg text-gray-300">{block.description}</p>
        </div>
        <div data-image-reveal="" className="relative aspect-[1160/800] min-w-0 flex-1 overflow-hidden rounded-[12px]">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(min-width: 1920px) 1160px, 60vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
