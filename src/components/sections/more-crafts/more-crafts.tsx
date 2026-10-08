// ---------------------------------------------------------------------------
// MoreCrafts: "Explore more crafts" under every case study (the user,
// Oct 7, 2026: "exactly same as" the Services page's "Different fields.
// Everyday needs."). The other case studies in the same looping carousel,
// with the same classes and so the same Figma sizes, gaps and image heights
// as IndustriesServed (industries-served/industries-served.css). Each card
// opens its case study; the button opens all of them (/case-studies).
//
// HOVER: as the Our Craft cards (portfolio-grid): with a mouse the "Explore
// the story" wheel follows the pointer (WorkWheelCursor); pressing to drag
// swaps it for the carousel's "Drag" pill until the button is released; keyboard focus and touch screens get the wheel in
// the middle of the picture. No water ripple here (Oct 7, 2026): in a drag
// carousel it had to go off on every press and back on after, and the
// picture visibly shrank and grew each time (its bulge); with it off the
// drag was smooth.
// Server Component: projects from lib/data/case-study.
// ---------------------------------------------------------------------------
import Link from "next/link";
import { getCaseStudyGridProjects } from "@/lib/data/case-study";
import { LoopCarousel } from "@/components/ui/loop-carousel";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/responsive-image/responsive-image";
import { WorkWheel } from "@/components/ui/work-wheel";
import { WorkWheelCursor } from "@/components/sections/portfolio-grid/work-wheel-cursor";

const HEADING = "Explore our more crafts.";
const SUBTEXT = "Every project started with a real need. See how we shaped the experience for other teams.";
const CTA = { label: "View all crafts", href: "/case-studies" };

/** "Smart Aqua Farm 360 - Aquaculture Operations" -> "Smart Aqua Farm 360". */
const shortName = (title: string) => title.split(" - ")[0];

export async function MoreCrafts({ currentHref }: { currentHref: string }) {
  const projects = (await getCaseStudyGridProjects()).filter(
    (project): project is typeof project & { href: string } => !!project.href && project.href !== currentHref,
  );
  if (!projects.length) return null;

  return (
    <section className="industries more-crafts" aria-labelledby="more-crafts-title">
      <div className="industries-inner">
        <div className="industries-header">
          <div className="industries-header-text">
            <h2 id="more-crafts-title" className="industries-title"><AnimatedText>{HEADING}</AnimatedText></h2>
            <p className="industries-subtext"><AnimatedText>{SUBTEXT}</AnimatedText></p>
          </div>
          <Button href={CTA.href} variant="outline">{CTA.label}</Button>
        </div>

        <LoopCarousel className="industries-carousel" label="More case studies" dragCursor="press"><div className="industries-carousel-items">
          {projects.map((project, index) => (
            <Link key={project.href} href={project.href} className="group industries-card" draggable={false}>
              <div className="industries-image" data-project-image="" data-wheel-cursor="">
                {project.imageSrc ? (
                  <Image src={project.imageSrc} alt="" fill sizes="(max-width: 1023px) 325px, 480px" className="object-cover" data-no-ripple="" draggable={false} />
                ) : null}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <span className="block translate-y-2 scale-90 transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:scale-100">
                    <WorkWheel pathId={`more-crafts-wheel-${index}`} />
                  </span>
                </span>
              </div>
              <h3 className="industries-name">{shortName(project.title)}</h3>
              <p className="industries-description more-crafts-description">{project.description}</p>
            </Link>
          ))}
        </div></LoopCarousel>
      </div>
      <WorkWheelCursor />
    </section>
  );
}
