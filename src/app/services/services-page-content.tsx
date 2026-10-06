import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { LensDistortion } from "@/components/ui/lens-distortion";

export async function ServicesBenefits() {
  const benefits = {
    heading: "A team you can talk things through with.",
    description: "Clear updates, shared decisions, and support from the first conversation to handover.",
    items: [
      { title: "Stay in the loop", description: "We agree on meeting times and share clear updates, so you know where things stand." },
      { title: "Get honest answers", description: "We explain the options, raise questions early, and tell you when something needs another approach." },
      { title: "Know what’s included", description: "We agree on the scope before we begin. If it changes, we discuss the cost and timeline with you first." },
      { title: "Keep the pieces together", description: "Brand, UI/UX, and development stay connected, with fewer details lost between stages." },
    ],
  };
  return <section className="services-benefits"><div className="services-benefits-inner">
    <div className="services-benefits-heading"><h2>{benefits.heading}</h2><p>{benefits.description}</p></div>
    <ul>{benefits.items.map((item, i) => <li key={item.title}><Reveal className="services-benefit-row" distance={30} delay={i * 120}>
      <div className="services-benefit-icon">
        <Image className="services-image-desktop" src={`/images/services/current/benefitDesktop-${i + 1}.svg`} alt="" width={100} height={100} />
        <Image className="services-image-tablet" src={`/images/services/current/benefitTablet-${i + 1}.svg`} alt="" width={64} height={64} />
        <Image className="services-image-mobile" src={`/images/services/current/benefitMobile-${i + 1}.svg`} alt="" width={56} height={56} />
      </div><div className="services-benefit-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
    </Reveal></li>)}</ul>
  </div></section>;
}

export function ServicesConversation() {
  return <section className="services-conversation"><LensDistortion aberration={0.02}><div className="services-conversation-inner"><h2>Not sure where to start?</h2><div><p>Tell us what you want to improve. We’ll help you choose the first step.</p><Button href="/contact" className="services-talk">LET’S TALK</Button></div></div></LensDistortion></section>;
}
