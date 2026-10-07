import { SitePage, SiteHero } from "@/components/sections/site-page/site-page";
import type { Metadata } from "next";
import { ContactFormSection } from "@/components/sections/contact-form";

// The root layout's `title.template` ("%s | Denvo Lab") applies here.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Denvo Lab about your project. Send a short brief, book a call with our founder, or email denvolab@gmail.com. Studio in Rangpur, Bangladesh.",
};

// -----------------------------------------------------------------------------
// Contact page (/contact), built 1:1 from the Figma "Contact" frame (node
// 584:2194). Header and Footer come from the root layout. The homepage's
// closing ContactCta ("Let's work. Together / Say hello") is left out on
// purpose: its button leads to this page, and the Figma frame drops it too.
// -----------------------------------------------------------------------------
export default function ContactPage() {
  return (
    <SitePage path="/contact">
      <SiteHero title={"Tell us what\nyou’re building."} intro="Send us a few lines about your project. Abdur reads every inquiry and replies with next steps and a rough timeline." action="SCROLL TO EXPLORE" href="#contact-form" node="986:3218" />
      <ContactFormSection />
    </SitePage>
  );
}
