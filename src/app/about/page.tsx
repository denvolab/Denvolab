import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { MarqueeTagline } from "@/components/sections/marquee-tagline";
import { AboutStory } from "@/components/sections/about-story";
import { AboutDifference } from "@/components/sections/about-difference";
import { AboutValues } from "@/components/sections/about-values";
import { AboutBenefits } from "@/components/sections/about-benefits";
import { AboutTeam } from "@/components/sections/about-team";
import { SitePage, SiteConversation } from "@/components/sections/site-page/site-page";
import { ProcessSteps } from "@/components/sections/process-steps";

// The root layout's `title.template` ("%s | Denvo Lab") applies here, because
// this page is in a different route segment from the layout that defines it.
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Denvo Lab is a UI/UX design and development agency. Meet the team, see what makes us different, and learn how we work with clients around the world.",
};

// -----------------------------------------------------------------------------
// About page — assembled from components/sections/*, top to bottom in the same
// order as the Figma "About us" frame (node 431:6130). Header and Footer come
// from the root layout. The marquee and the closing contact section are the
// same components the homepage uses.
// -----------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <SitePage path="/about">
      <AboutHero />
      <MarqueeTagline about />
      <AboutStory />
      <AboutValues />
      <AboutDifference />
      <AboutBenefits />
      <ProcessSteps heading="We keep the next step clear." />
      <AboutTeam />
      <SiteConversation />
    </SitePage>
  );
}
