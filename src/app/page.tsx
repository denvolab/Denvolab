import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { Hero } from "@/components/sections/hero";
import { MarqueeTagline } from "@/components/sections/marquee-tagline";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { WhatWeCreate } from "@/components/sections/what-we-create";
import { AiOrbit } from "@/components/sections/ai-orbit";
import { PartnerLogos } from "@/components/sections/partner-logos";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCta } from "@/components/sections/contact-cta";

// Note: `title.template` from the root layout does NOT apply here — a page
// in the same route segment as the layout that defines it is exempt (see
// Next.js metadata docs). So the homepage sets its own full, keyword-rich
// title directly rather than relying on the "%s | Denvo Lab" template.
export const metadata: Metadata = {
  title: "Denvo Lab | UI/UX Design & Development Agency",
  description: siteConfig.description,
};

// -----------------------------------------------------------------------------
// Home page — assembled from components/sections/*, each mapping 1:1 to a
// section of the Figma "Home Page" frame (node 230:4043), top to bottom.
// SiteHeader/SiteFooter come from the root layout, not here. Sections land
// in this file in the same order they're built; see
// components/sections/README.md for what's done and what's left.
// -----------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeTagline />
      <PortfolioGrid />
      <WhatWeCreate />
      <AiOrbit />
      <PartnerLogos />
      <ProcessSteps />
      <Testimonials />
      <ContactCta />
    </>
  );
}
