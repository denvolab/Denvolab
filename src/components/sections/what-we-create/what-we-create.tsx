import Link from "@/components/ui/animated-link/animated-link";
import { getWhatWeCreateItems } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";
import { RippleImage } from "@/components/ui/ripple-image";
import { AnimatedText } from "@/components/ui/animated-text";
export async function WhatWeCreate() {
  const items = await getWhatWeCreateItems();
  return <section className="home-services" data-figma-node="403:4568" data-phone-still="">
    <div className="home-services-intro"><p className="home-eyebrow">WHAT WE CRAFT</p><h2><AnimatedText>From the first impression to the everyday experience.</AnimatedText></h2><Button href="/services" variant="outline" className="home-outline">FIND YOUR NEXT STEP</Button></div>
    <div className="home-services-grid">{items.map(item => <article key={item.title} className="home-service-card" data-press-card="">
      {/* The reveal is on the picture only, not the whole card: with the
          text inside the revealed box it shifted by the card's padding while
          the picture came in, then jumped back (Oct 8, 2026). */}
      {item.imageSrc && <div className="home-service-image" data-image-reveal=""><RippleImage src={item.imageSrc} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="h-full w-full" objectPosition="top" /></div>}
      <div className="home-service-copy"><h3><Link href={item.cta.href}>{item.title}</Link></h3><p><AnimatedText>{item.description}</AnimatedText></p><Button href={item.cta.href} variant="secondary" size="sm" className="home-service-button">{item.cta.label}</Button></div>
    </article>)}</div>
  </section>;
}
