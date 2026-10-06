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
import finalDesign from "./final-design.json";
import type { ServiceDetailBlock, CapabilitiesEditorialList } from "@/types/service-detail";

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
  const page = SERVICE_DETAIL_PAGES.find((page) => page.slug === slug);
  if (!page) return null;
  const design = finalDesign[slug as keyof typeof finalDesign];
  const originalCapabilities = page.blocks.find(b => b.type === "capabilities")!;
  const icons = originalCapabilities.layout === "anatomy"
    ? [...originalCapabilities.before, ...originalCapabilities.after]
    : originalCapabilities.items;
  const capabilities: CapabilitiesEditorialList = {
    type: "capabilities", layout: "editorial-list", title: design.capabilities.title,
    feature: { ...design.capabilities.feature, image: { src: design.capabilities.feature.image!, alt: `${page.name} — design in practice` } },
    items: design.capabilities.items.map((item, i) => ({ ...item, icon: icons[i].icon })),
  };
  const hero = page.blocks.find(b => b.type === "hero")!;
  const blocks: ServiceDetailBlock[] = [{ ...hero, headline: design.hero.headline, intro: design.hero.intro, introWidth: 520,
    visual: { kind: "image", src: design.hero.image!, alt: `${page.name} — supporting visual`, radius: 24, bordered: false } }];
  for (const section of design.order) {
    let block: ServiceDetailBlock | undefined;
    if (section.startsWith("Capabilities /")) block = capabilities;
    else if (section.startsWith("05 / Process")) block = page.blocks.find(b => b.type === "process-narrative");
    else if (section.startsWith("Process /")) block = page.blocks.find(b => b.type === "process-steps");
    else if (section.startsWith("Perspective /")) block = page.blocks.find(b => b.type === "perspective");
    else if (section.startsWith("UI/UX in practice")) {
      const practice = page.blocks.find(b => b.type === "practice");
      if (practice?.type === "practice") block = { ...practice, image: { ...practice.image, src: design.photos[0] } };
    } else if (section.startsWith("Deliverables /")) {
      const delivery = page.blocks.find(b => b.type === "handover" || b.type === "checklist");
      if (delivery && "deliverables" in design) block = { type: "checklist", tone: "plain", title: delivery.title,
        body: delivery.type === "handover" ? delivery.body : undefined, rowAlign: "center", items: design.deliverables };
    } else if (section.startsWith("Craft /")) {
      if (slug === "branding-visual-identity" && section.endsWith("01")) block = page.blocks.find(b => b.type === "brand-study");
      else {
        const craft = page.blocks.find(b => b.type === "craft-split" || b.type === "showcase");
        if (craft?.type === "craft-split" || craft?.type === "showcase") block = { ...craft, image: { ...craft.image, src: design.photos[0] } };
      }
    } else if (section.startsWith("FAQs /")) {
      const faq = page.blocks.find(b => b.type === "faq")!;
      if (faq.type === "faq") block = { ...faq, eyebrow: "FREQUENTLY ASKED QUESTIONS", ctaTone: "brand", listGap: 32, openBorder: "primary",
        items: design.faq.map((item, i) => ({ ...item, answer: item.answer ?? faq.items.find(old => old.question === item.question)?.answer ?? faq.items[i]?.answer ?? "Tell us about your project and we’ll agree on the scope together." })) };
    }
    if (block) blocks.push(block);
  }
  const conversation = page.blocks.find(b => b.type === "conversation");
  if (conversation) blocks.push(conversation);
  return { ...page, description: design.hero.intro, blocks };
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
