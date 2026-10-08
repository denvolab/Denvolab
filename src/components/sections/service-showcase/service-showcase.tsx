// ---------------------------------------------------------------------------
// ServiceShowcase: one full-width picture (Figma "Craft / Service concept
// showcase" with a single "Original / Service detail concept" image).
// Server Component. White section, 96px top/bottom; the picture is 1840 wide,
// radius 12, and 850 or 800 tall depending on the page (`height`).
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import type { ServiceShowcaseBlock } from "@/types/service-detail";

export function ServiceShowcase({ block }: { block: ServiceShowcaseBlock }) {
  return (
    <section className="w-full bg-surface-primary">
      <div className="mx-auto w-full max-w-[1920px] px-5 py-16 md:px-10 xl:py-24">
        <div data-image-reveal="" className="relative w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: `1840 / ${block.height}` }}>
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(min-width: 1920px) 1840px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
