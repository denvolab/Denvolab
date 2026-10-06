// ---------------------------------------------------------------------------
// Site-wide config — single source of truth for name, URL and social links
// used across metadata, JSON-LD, and the footer. Update this file only when
// the brand details change; everything else reads from here.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Denvo Lab",
  legalName: "Denvo Lab",
  tagline: "We Build AI-Powered Digital Experiences That Scale Businesses",
  description:
    "Denvo Lab is a UI/UX design and development agency providing end-to-end product design and engineering — from research and design systems to production-ready builds.",
  // TODO: replace with the live production domain before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.denvolab.com",
  email: "hello@denvolab.com",
  // TODO: swap placeholder handles for the real Denvo Lab profiles.
  socials: {
    behance: "https://www.behance.net/denvolab",
    dribbble: "https://dribbble.com/denvolab",
    facebook: "https://www.facebook.com/denvolab",
    whatsapp: "https://wa.me/8801521424652",
  },
} as const;

export type SiteConfig = typeof siteConfig;
