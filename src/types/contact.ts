// ---------------------------------------------------------------------------
// Shared shapes for the Contact page. Same rationale as types/about.ts: this
// is what a future admin-panel API would return, so lib/data/contact.ts can
// swap its constants for a `fetch()` later without touching the sections.
// ---------------------------------------------------------------------------

export interface ContactHeroContent {
  eyebrow: string;
  headline: string;
  intro: string;
}

/** One choice in a chip group. `value` is what the form submits. */
export interface ContactOption {
  value: string;
  label: string;
}

/** A single-line field (DS "Input"). The label already carries the "*". */
export interface ContactTextField {
  label: string;
  placeholder: string;
}

export interface ContactChipGroup {
  label: string;
  options: ContactOption[];
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  name: ContactTextField;
  company: ContactTextField;
  email: ContactTextField;
  phone: ContactTextField;
  /** Multi-select. At least one is required. */
  services: ContactChipGroup;
  /** Single-select, optional. */
  budget: ContactChipGroup;
  details: ContactTextField;
  submitLabel: string;
  pendingLabel: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface ContactFounderCard {
  name: string;
  role: string;
  photo: { src: string; alt: string };
  pitch: string;
  cta: ContactLink;
}

export interface ContactEmailCard {
  label: string;
  email: string;
  note: string;
}

export interface ContactOfficeCard {
  label: string;
  city: string;
  /** IANA zone for the live clock, e.g. "Asia/Dhaka". */
  timeZone: string;
  zoneLabel: string;
  address: { label: string; value: string; href: string };
  phone: { label: string; value: string; href: string };
}

export interface ContactSidebarContent {
  founder: ContactFounderCard;
  email: ContactEmailCard;
  office: ContactOfficeCard;
}

/** What the inquiry server action sends back to the form. */
export type InquiryField = "name" | "company" | "email" | "phone" | "services" | "budget" | "details";

export interface InquiryState {
  status: "idle" | "success" | "error";
  /** Shown next to the button (success or a send failure). */
  message?: string;
  /** One message per field that failed validation. */
  fieldErrors?: Partial<Record<InquiryField, string>>;
}
