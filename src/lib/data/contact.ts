// ---------------------------------------------------------------------------
// Contact page content, word for word from the Figma "Contact" frame (node
// 584:2194). Same API-readiness note as lib/data/about.ts: swap each
// function body for a `fetch()` once the admin panel manages this content.
// ---------------------------------------------------------------------------
import type {
  ContactFormContent,
  ContactHeroContent,
  ContactOption,
  ContactSidebarContent,
} from "@/types/contact";
import { siteConfig } from "@/lib/seo/site-config";

const HERO: ContactHeroContent = {
  eyebrow: "CONTACT",
  headline: "Tell us what you’re building.",
  intro:
    "Send us a few lines about your project. Abdur reads every inquiry and replies with next steps and a rough timeline.",
};

export async function getContactHero(): Promise<ContactHeroContent> {
  return HERO;
}

// The chip values are what the form submits and what the server action
// accepts (it rejects anything not in these lists). Labels are the Figma
// chip text. The service chips are short names for the services on
// /services (lib/data/services.ts), plus "Not sure yet".
export const SERVICE_OPTIONS: ContactOption[] = [
  { value: "branding", label: "Branding" },
  { value: "ui-ux-design", label: "UI/UX design" },
  { value: "saas-product", label: "SaaS product" },
  { value: "website", label: "Website" },
  { value: "mobile-app", label: "Mobile app" },
  { value: "mvp", label: "MVP" },
  { value: "custom-cms", label: "Custom CMS" },
  { value: "not-sure", label: "Not sure yet" },
];

export const BUDGET_OPTIONS: ContactOption[] = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-8k", label: "$2k to $8k" },
  { value: "8k-20k", label: "$8k to $20k" },
  { value: "20k-plus", label: "$20k+" },
  { value: "discuss", label: "Let’s discuss" },
];

const FORM: ContactFormContent = {
  title: "Start a project",
  subtitle: "It takes about two minutes. Fields marked * are required.",
  name: { label: "Full name *", placeholder: "Your name" },
  company: { label: "Company or project", placeholder: "Company or project name" },
  email: { label: "Work email *", placeholder: "you@company.com" },
  phone: { label: "Phone or WhatsApp", placeholder: "+1 123 456 7890" },
  services: { label: "What do you need? * (Select all that apply)", options: SERVICE_OPTIONS },
  budget: { label: "Budget (USD)", options: BUDGET_OPTIONS },
  details: {
    label: "Project details *",
    placeholder: "Tell us what you’re building and who it’s for...",
  },
  submitLabel: "SEND INQUIRY",
  pendingLabel: "SENDING...",
};

export async function getContactForm(): Promise<ContactFormContent> {
  return FORM;
}

// The founder's 30-minute call on Cal.com. "Book a call" opens Cal.com's
// booking widget in a popup for this link (see
// sections/contact-form/book-call-button.tsx); without JavaScript it is a
// plain link to the booking page.
const BOOKING_HREF = "https://cal.com/denvo-lab-mfqfpq/30min";

const ADDRESS = "Parkmore, University Area, Rangpur Sadar, Rangpur";
const PHONE = "+880 1521 424652";

const SIDEBAR: ContactSidebarContent = {
  founder: {
    name: "Abdur Razzak",
    role: "FOUNDER (CEO)",
    // Same crop of the team headshot as the Figma avatar (see
    // sections/contact-form/README.md).
    photo: { src: "/images/contact/abdur-razzak-avatar.jpg", alt: "Abdur Razzak, founder of Denvo Lab" },
    pitch: "Prefer a call? Pick a 30-minute slot and walk me through your idea.",
    cta: { label: "BOOK A CALL", href: BOOKING_HREF },
  },
  email: {
    label: "EMAIL",
    email: siteConfig.email,
    note: "New projects and partnership ideas.",
  },
  office: {
    label: "STUDIO",
    city: "Rangpur, Bangladesh",
    timeZone: "Asia/Dhaka",
    zoneLabel: "LOCAL TIME, GMT+6",
    address: {
      label: "ADDRESS",
      value: ADDRESS,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
    },
    phone: {
      label: "PHONE",
      value: PHONE,
      href: `tel:${PHONE.replace(/\s+/g, "")}`,
    },
  },
};

export async function getContactSidebar(): Promise<ContactSidebarContent> {
  return SIDEBAR;
}
