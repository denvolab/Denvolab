import { HeroLines } from "@/components/ui/hero-lines";
import Link from "@/components/ui/animated-link/animated-link";
import Image from "@/components/ui/responsive-image/responsive-image";
import { getHeroContent } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";
import { MovingVisual } from "./moving-visual";

/** One responsive composition; the same showreel keeps its player and cursor motion. */
export async function Hero() {
  const hero = await getHeroContent();
  const services = [...hero.services, { label: "AI Integration", href: "/services/ai-agent-custom-cms" }];
  return <section className="home-hero" data-figma-node="906:7023" data-hero="">
    <HeroLines/><div className="home-hero-inner">
      <p className="home-hero-wordmark" aria-hidden="true">{hero.wordmark}</p><Image className="home-hero-tablet-wordmark" src="/images/home/tablet-wordmark.svg" alt="" width={715} height={110} />
      <div className="home-hero-stage">
        <ul className="home-hero-services">{services.map(service => <li key={service.label}><Link href={service.href}>{service.label}</Link></li>)}</ul>
        <MovingVisual className="home-hero-video" videoSrc="/videos/hero-showreel.mp4" />
        <div className="home-hero-copy"><div className="home-hero-heading"><h1>{hero.headline}</h1></div><Button href={hero.cta.href} className="home-button home-hero-cta">LET’S CRAFT YOUR IDEA</Button></div>
      </div>
    </div>
  </section>;
}
