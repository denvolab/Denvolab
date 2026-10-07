// ---------------------------------------------------------------------------
// Footer column content, mirrored 1:1 from the Figma source (SHOP / SERVICES
// / EXPERT DOMAIN / CONTACT). Same API-readiness note as lib/data/navigation:
// swap the body for a `fetch()` once the admin panel can manage these links.
//
// SERVICES links go to the service detail pages (/services/<slug>, Oct
// 2026). "Product Design" has no page of its own, so it goes to /services.
// EXPERT DOMAIN items are plain text, not links (href ""), since Oct 7, 2026:
// the industry pages don't exist.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";
import type { FooterColumn } from "@/types/navigation";

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Denvo", href: "/about" },
      { label: "Case Study", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Web Design", href: "/services/web-development" },
      { label: "Product Design", href: "/services" },
      { label: "SaaS Design", href: "/services/saas-development" },
      { label: "Branding Design", href: "/services/branding-visual-identity" },
    ],
  },
  {
    title: "Expert Domain",
    links: [
      { label: "Hotel Industry", href: "" },
      { label: "Health & Fitness", href: "" },
      { label: "EdTech Industry", href: "" },
      { label: "E-Commerce", href: "" },
      { label: "Social Community", href: "" },
    ],
  },
  {
    title: "Follow US",
    links: [
      { label: "Behance", href: siteConfig.socials.behance, external: true },
      { label: "Dribbble", href: siteConfig.socials.dribbble, external: true },
      { label: "Facebook", href: siteConfig.socials.facebook, external: true },
      { label: "WhatsApp", href: siteConfig.socials.whatsapp, external: true },
    ],
  },
];

export async function getFooterColumns(): Promise<FooterColumn[]> {
  return FOOTER_COLUMNS;
}
