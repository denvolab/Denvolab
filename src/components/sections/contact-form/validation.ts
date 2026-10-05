// ---------------------------------------------------------------------------
// Inquiry form rules, shared by the form (instant feedback, no round trip)
// and the server action (the real check: anyone can POST to an action, so
// the server never trusts what the browser already checked).
// Plain module on purpose: no "use client" / "use server".
// ---------------------------------------------------------------------------
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/data/contact";
import type { InquiryField } from "@/types/contact";

/** Hidden "website" field. People never see it; bots that fill every field do. */
export const HONEYPOT_FIELD = "website";

/** Longest value the server accepts per field (also set as maxLength). */
export const LIMITS = {
  name: 100,
  company: 150,
  email: 200,
  phone: 40,
  details: 5000,
} as const;

/** Field order on the page, used to focus the first field with an error. */
export const FIELD_ORDER: InquiryField[] = ["name", "company", "email", "phone", "services", "budget", "details"];

export interface InquiryValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  details: string;
}

export type InquiryErrors = Partial<Record<InquiryField, string>>;

const SERVICE_VALUES = new Set(SERVICE_OPTIONS.map((o) => o.value));
const BUDGET_VALUES = new Set(BUDGET_OPTIONS.map((o) => o.value));

// Simple on purpose: something@something.something, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readInquiry(formData: FormData): InquiryValues {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: text("name"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
    services: formData.getAll("services").map((v) => String(v)),
    budget: text("budget"),
    details: text("details"),
  };
}

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!values.name) errors.name = "Please add your name.";
  else if (values.name.length > LIMITS.name) errors.name = "That name is too long.";

  if (values.company.length > LIMITS.company) errors.company = "Please shorten this a little.";

  if (!values.email) errors.email = "Please add your email.";
  else if (values.email.length > LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "That email doesn’t look right.";
  }

  if (values.phone.length > LIMITS.phone) errors.phone = "Please shorten this a little.";

  if (values.services.length === 0) errors.services = "Pick at least one.";
  else if (values.services.some((s) => !SERVICE_VALUES.has(s))) errors.services = "Please pick from the list.";

  if (values.budget && !BUDGET_VALUES.has(values.budget)) errors.budget = "Please pick from the list.";

  if (!values.details) errors.details = "Tell us a little about the project.";
  else if (values.details.length > LIMITS.details) {
    errors.details = `Please keep it under ${LIMITS.details} characters.`;
  }

  return errors;
}

/** Turns chip values back into their labels for the email. */
export function labelsFor(values: string[], kind: "services" | "budget"): string[] {
  const options = kind === "services" ? SERVICE_OPTIONS : BUDGET_OPTIONS;
  return values.map((v) => options.find((o) => o.value === v)?.label ?? v);
}
