import Image from "next/image";
import { ServiceIconTile } from "@/components/ui/service-icon";
import { AnimatedText } from "@/components/ui/animated-text";
import type { CapabilitiesEditorialList } from "@/types/service-detail";

export function EditorialList({ block }: { block: CapabilitiesEditorialList }) {
  return <div className="service-disciplines">
    <div className="service-disciplines-intro">
      <h2 className="service-heading"><AnimatedText>{block.title}</AnimatedText></h2>
      <div className="service-principles">
        <div data-image-reveal="" className="service-principles-image"><Image src={block.feature.image.src} alt={block.feature.image.alt} fill sizes="(min-width: 1024px) 488px, (min-width: 768px) 316px, 100vw" className="object-cover" /></div>
        <div className="service-principles-copy"><h3>{block.feature.statement}</h3><p><AnimatedText>{block.feature.description}</AnimatedText></p></div>
      </div>
    </div>
    <ul className="service-discipline-list">{block.items.map(item => <li key={item.title}>
      {item.iconAsset ? <span className="service-discipline-icon" data-tile={item.tile}>
        {/* Original Figma SVG, retaining its intrinsic dimensions. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.iconAsset} alt="" aria-hidden="true" />
      </span> : <ServiceIconTile name={item.icon} size={56} className="bg-brand-100" />}
      <div className="service-discipline-copy"><h3>{item.title}</h3><p><AnimatedText>{item.description}</AnimatedText></p></div>
    </li>)}</ul>
  </div>;
}
