// ---------------------------------------------------------------------------
// IndustriesServed: "Different fields. Everyday needs." (Figma 483:1256 on
// the Services page; tablet and mobile in 903:17483 / 903:16728). A heading,
// subtext and outline button, then six industry cards in a looping carousel.
// Server Component: content from lib/data/services.ts. Used on /services and
// /case-studies.
//
// Every size, gap and image height is Figma's, in industries-served.css (one
// file for this section since Oct 7, 2026; the rules used to be spread over
// app/services/services.css and app/site-pages.css and keyed to the image's
// data-image-reveal, so the pictures shrank when that reveal was taken off).
// The pictures have no entrance animation and the card text isn't
// line-animated: the cards already slide sideways.
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import { getIndustriesServed } from "@/lib/data/services";
import { LoopCarousel } from "@/components/ui/loop-carousel";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

export async function IndustriesServed() {
  const industries = await getIndustriesServed();

  return (
    <section className="industries" data-figma-node="483:1256">
      <div className="industries-inner">
        <div className="industries-header">
          <div className="industries-header-text">
            <h2 className="industries-title"><AnimatedText>{industries.heading}</AnimatedText></h2>
            <p className="industries-subtext"><AnimatedText>{industries.description}</AnimatedText></p>
          </div>
          <Button href={industries.cta.href} variant="outline">{industries.cta.label}</Button>
        </div>

        <LoopCarousel className="industries-carousel" label="Industries we serve"><div className="industries-carousel-items">
          {industries.items.map((industry) => (
            <div key={industry.name} className="industries-card">
              <div className="industries-image">
                {industry.imageSrc ? (
                  <Image
                    src={industry.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 325px, 480px"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <h3 className="industries-name">{industry.name}</h3>
              <p className="industries-description">{industry.description}</p>
            </div>
          ))}
        </div></LoopCarousel>
      </div>
    </section>
  );
}
