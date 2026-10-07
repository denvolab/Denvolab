import { SitePage, SiteHero, SiteConversation } from "@/components/sections/site-page/site-page";
import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { IndustriesServed } from "@/components/sections/industries-served";
import { getCaseStudyGridProjects } from "@/lib/data/case-study";

// The root layout's `title.template` ("%s | Denvo Lab") applies here, because
// this page is in a different route segment from the layout that defines it.
export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See the products Denvo Lab has designed and built: SaaS apps, web apps, and full-stack projects across booking, fintech, health, HR, and more.",
};

// -----------------------------------------------------------------------------
// Case Studies page (/case-studies) — assembled from the Figma "Work" frame
// (node 431:6534). Header and Footer come from the root layout.
//
// Only the top band (CaseStudiesHero) is new. Everything below it in Figma
// is the same content already built for the homepage (project grid,
// partner-logo strip, "Let's Contact" closing section), so this page reuses
// those components directly instead of rebuilding them.
//
// The grid shows the homepage's six projects first, then the seven other
// case studies, so every case study page (/case-studies/<slug>) can be
// reached from here. Cards with a page show the turning "EXPLORE THE STORY"
// wheel on hover (ui/work-wheel); Quotable
// and Sanime have none yet and say "Coming soon". See
// claude/case-studies-page.md (the project doc).
// -----------------------------------------------------------------------------
export default async function CaseStudiesPage() {
  const projects = await getCaseStudyGridProjects();

  return (
    <SitePage path="/case-studies">
      <SiteHero title={"Crafted by\nDenvolab."} intro="Explore the brands, websites, and apps we’ve shaped—and the everyday problems behind them." action="SCROLL TO EXPLORE" href="#projects" node="950:3731" />
      <PortfolioGrid projects={projects} />
      <IndustriesServed />
      <SiteConversation work />
    </SitePage>
  );
}
