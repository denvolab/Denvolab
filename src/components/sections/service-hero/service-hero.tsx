import Image from "next/image";
import { HeroLines } from "@/components/ui/hero-lines";
import type { ServiceHeroBlock } from "@/types/service-detail";

/** Current service hero: headline and introduction share one editorial row. */
export function ServiceHero({ block }: { block: ServiceHeroBlock }) {
  return <section className="service-hero hero-with-lines">
    <HeroLines />
    <div className="service-section-inner service-hero-inner">
      <div className="service-hero-row">
        <h1>{block.headline}</h1>
        <div className="service-hero-intro"><p>{block.intro}</p><p className="service-label service-scroll-cue">{block.scrollLabel}</p></div>
      </div>
      {block.visual.kind === "image" && <div data-image-reveal="" className="service-hero-image"><Image src={block.visual.src} alt={block.visual.alt} fill priority sizes="(min-width: 1920px) 1840px, 100vw" className="object-cover" /></div>}
    </div>
  </section>;
}
