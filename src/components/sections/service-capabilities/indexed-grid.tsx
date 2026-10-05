// Web page: "Strategy to launch. One cohesive web experience." Figma node
// 701:14868. Centered title, then a 3-column grid (48px gaps both ways).
// Each cell: a big grey index number (100px wide), 32px, then icon,
// title and text 16px apart.
import { ServiceIconTile } from "@/components/ui/service-icon";
import type { CapabilitiesIndexedGrid } from "@/types/service-detail";
import { AnimatedText } from "@/components/ui/animated-text";

export function IndexedGrid({ block }: { block: CapabilitiesIndexedGrid }) {
  return (
    <div className="flex flex-col gap-16">
      <h2 className="whitespace-pre-line text-center font-sans text-display-xl text-text-primary"><AnimatedText>{block.title}</AnimatedText></h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {block.items.map((item) => (
          <div key={item.title} className="flex min-w-0 gap-5 lg:gap-8">
            <p className="w-16 shrink-0 font-sans text-display-xl text-text-tertiary lg:w-[100px]">{item.index}</p>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
              <ServiceIconTile name={item.icon} size={56} className="bg-brand-100" />
              <h3 className="font-sans text-heading-3 text-text-primary">{item.title}</h3>
              <p className="font-sans text-body-lg text-text-secondary">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
