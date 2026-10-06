"use server";
// ---------------------------------------------------------------------------
// sendInquiry: the Contact form's Server Action. Checks the fields again on
// the server, drops bot submissions, and emails the inquiry to the studio
// through the site's SMTP setup (lib/email: Gmail, sent as "Denvolab").
// Once the studio has it, the visitor gets an automatic "We got your
// message" email.
//
// SETUP: SMTP_USER and SMTP_PASS in .env.local and in the hosting dashboard,
// see lib/email/README.md. Inquiries go to denvolab@gmail.com.
//
// The emails themselves (subject, plain text, branded HTML) are built in
// lib/email/inquiry-email.ts and lib/email/confirmation-email.ts; this file
// only decides what goes in them and when they go.
//
// ORDER: the studio's email is sent first and decides what the visitor sees.
// The confirmation only goes out after that worked, and it is sent with
// `after()` (next/server), i.e. once the visitor already sees "Thanks", so
// the form doesn't wait for a second email. If the confirmation fails, the
// inquiry is still safe with the studio; the failure is only logged.
//
// Without the SMTP settings the form still validates, then shows a friendly
// "email us instead" message and logs the reason on the server.
//
// The studio's email also says where the form was sent from (approximate
// location and IP), read from the request headers in visitorOrigin() below.
//
// Not done here: rate limiting. If spam gets past the honeypot, add one
// (e.g. per-IP with Upstash) at the top of this function. Gmail also caps
// sending at about 500 emails a day.
// ---------------------------------------------------------------------------
import { headers } from "next/headers";
import { after } from "next/server";
import { sendEmail } from "@/lib/email/mailer";
import { inquiryEmail } from "@/lib/email/inquiry-email";
import { confirmationEmail } from "@/lib/email/confirmation-email";
import type { InquiryState } from "@/types/contact";
import { HONEYPOT_FIELD, labelsFor, readInquiry, validateInquiry } from "./validation";

const SUCCESS_MESSAGE = "Your message is on its way. We’ll get back to you shortly by email.";
const INVALID_MESSAGE = "A few fields need a look.";
const INQUIRY_EMAIL = "denvolab@gmail.com";
const FAILURE_MESSAGE = `Something went wrong on our side. Please email ${INQUIRY_EMAIL} instead.`;

/** The visitor's IP and approximate location from the host's request headers.
 *  Vercel adds the x-vercel-ip-* geolocation headers; the city is URL-encoded.
 *  Both are "" when the host doesn't send them (e.g. local development). */
async function visitorOrigin() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim();
  const decode = (value: string | null) => {
    try {
      return value ? decodeURIComponent(value) : "";
    } catch {
      return value ?? "";
    }
  };
  const city = decode(h.get("x-vercel-ip-city"));
  const region = decode(h.get("x-vercel-ip-country-region"));
  const countryCode = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "";
  let country = countryCode;
  try {
    if (countryCode) country = new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {}
  const location = [city, city ? "" : region, country].filter(Boolean).join(", ");
  return { ip, location };
}

export async function sendInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  // A filled honeypot means a bot. Pretend it worked so it doesn't retry.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim()) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const values = readInquiry(formData);
  const fieldErrors = validateInquiry(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: INVALID_MESSAGE, fieldErrors };
  }

  const services = labelsFor(values.services, "services");
  const budget = values.budget ? labelsFor([values.budget], "budget")[0] : "";

  const email = inquiryEmail({
    name: values.name,
    company: values.company,
    email: values.email,
    phone: values.phone,
    services,
    budget,
    details: values.details,
    submittedAt: new Date(),
    ...(await visitorOrigin()),
  });

  const result = await sendEmail({ to: INQUIRY_EMAIL, replyTo: values.email, ...email });
  if (!result.ok) {
    return { status: "error", message: FAILURE_MESSAGE };
  }

  // Replies to the confirmation come to the studio's inbox.
  const confirmation = confirmationEmail({ name: values.name, services, budget });
  after(async () => {
    const sent = await sendEmail({ to: values.email, replyTo: INQUIRY_EMAIL, ...confirmation });
    if (!sent.ok) console.error("[contact] The inquiry was delivered, but the visitor's confirmation email was not.");
  });

  return { status: "success", message: SUCCESS_MESSAGE };
}
