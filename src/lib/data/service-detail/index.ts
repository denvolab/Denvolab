// ---------------------------------------------------------------------------
// Service detail pages: one data file per page, listed here in the Figma
// order (Service Detail / 01 to 07). Same API-ready shape as the other files
// in lib/data: swap these function bodies for a fetch() once the admin panel
// manages this content.
// ---------------------------------------------------------------------------
import type { ContactCtaContent } from "@/types/homepage";
import type { ServiceDetailPage } from "@/types/service-detail";
import { brandingVisualIdentity } from "./branding-visual-identity";
import { uiUxDesign } from "./ui-ux-design";
import { mobileAppDevelopment } from "./mobile-app-development";
import { saasDevelopment } from "./saas-development";
import { webDevelopment } from "./web-development";
import { mvpDevelopment } from "./mvp-development";
import { aiAgentCustomCms } from "./ai-agent-custom-cms";

const SERVICE_DETAIL_PAGES: ServiceDetailPage[] = [
  brandingVisualIdentity,
  uiUxDesign,
  mobileAppDevelopment,
  saasDevelopment,
  webDevelopment,
  mvpDevelopment,
  aiAgentCustomCms,
];

export async function getServiceDetailSlugs(): Promise<string[]> {
  return SERVICE_DETAIL_PAGES.map((page) => page.slug);
}

export async function getServiceDetail(slug: string): Promise<ServiceDetailPage | null> {
  return SERVICE_DETAIL_PAGES.find((page) => page.slug === slug) ?? null;
}

// The closing "Let’s Craft Together" block under every service page (Figma
// "Frame 2147229480", drawn by the shared ContactCta) and the icon credit
// that sits in its bottom-left corner. The Streamline icons are CC BY 4.0,
// so the credit has to stay on the pages that show them.
const SERVICE_DETAIL_CTA: { content: ContactCtaContent; attribution: string } = {
  content: {
    heading: "Let’s Craft Together",
    description:
      "Have a challenge worth solving? Let’s bring strategy, design and development together to build your next chapter.",
    cta: { label: "SAY HELLO", href: "/contact" },
  },
  attribution: "Icons by Streamline · CC BY 4.0",
};

export async function getServiceDetailCta() {
  return SERVICE_DETAIL_CTA;
}
