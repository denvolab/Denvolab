// ---------------------------------------------------------------------------
// Footer column content, mirrored 1:1 from the Figma source (SHOP / SERVICES
// / EXPERT DOMAIN / CONTACT). Same API-readiness note as lib/data/navigation:
// swap the body for a `fetch()` once the admin panel can manage these links.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";
import type { FooterColumn } from "@/types/navigation";

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Shop",
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
      { label: "Web Design", href: "/services/web-design" },
      { label: "Product Design", href: "/services/product-design" },
      { label: "SaaS Design", href: "/services/saas-design" },
      { label: "Branding Design", href: "/services/branding-design" },
    ],
  },
  {
    title: "Expert Domain",
    links: [
      { label: "Hotel Industry", href: "/industries/hotel" },
      { label: "Health & Fitness", href: "/industries/health-fitness" },
      { label: "EdTech Industry", href: "/industries/edtech" },
      { label: "E-Commerce", href: "/industries/e-commerce" },
      { label: "Social Community", href: "/industries/social-community" },
    ],
  },
  {
    title: "Contact",
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
