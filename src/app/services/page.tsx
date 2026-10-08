import { SitePage, SiteHero } from "@/components/sections/site-page/site-page";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { ServicesList } from "@/components/sections/services-list";
import { ServicesBenefits, ServicesConversation } from "./services-page-content";
import "./services.css";
import { IndustriesServed } from "@/components/sections/industries-served";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd, breadcrumbs } from "@/components/seo/json-ld";

// The root layout's `title.template` ("%s | Denvo Lab") applies here, because
// this page is in a different route segment from the layout that defines it.
export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Branding, AI-enhanced UX, SaaS and web development, mobile apps, MVPs, and custom CMS builds — the services Denvo Lab designs and builds end to end.",
  path: "/services",
});

// -----------------------------------------------------------------------------
// Services page (/services) — assembled from the Figma "Service page" frame
// (node 437:8298). Header and Footer come from the root layout.
//
// Benefits and Testimonials reuse the About page's `AboutBenefits` and the
// homepage's `Testimonials` components directly rather than rebuilding
// them: both sections' Figma content (heading, description, all copy) is
// word-for-word identical to what's already built for those pages — see
// claude/services-page.md for how each section of the Figma frame was
// matched to existing code, the same precedent as
// app/case-studies/page.tsx reusing PortfolioGrid/PartnerLogos/ContactCta.
// -----------------------------------------------------------------------------
export default function ServicesPage() {
  return (
    <SitePage path="/services">
      <JsonLd data={breadcrumbs([["Services", "/services"]])} />
      <SiteHero title={"What can we\ncraft for you?"} intro="A clear brand, a useful app, or a website that tells your story. Find the right place to begin." action="EXPLORE OUR SERVICES" href="#services-list" node="986:3155" />
      <ServicesList />
      <ServicesBenefits />
      <IndustriesServed />
      <Testimonials home services />
      <ServicesConversation />
    </SitePage>
  );
}
