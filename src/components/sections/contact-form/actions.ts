"use server";
// ---------------------------------------------------------------------------
// sendInquiry: the Contact form's Server Action. Checks the fields again on
// the server, drops bot submissions, and emails the inquiry through Resend.
//
// SETUP (.env.local, see .env.example):
//   RESEND_API_KEY      required. From resend.com -> API Keys.
//   CONTACT_TO_EMAIL    optional. Where inquiries go. Default: the site
//                       email in lib/seo/site-config.ts (hello@denvolab.com).
//   CONTACT_FROM_EMAIL  optional. The sender. Must be on a domain verified in
//                       Resend, e.g. "Denvo Lab <inquiries@denvolab.com>".
//                       Default: Resend's test sender, which only delivers
//                       to the email of the Resend account owner.
//
// Without RESEND_API_KEY the form still validates, then shows a friendly
// "email us instead" message and logs the reason on the server.
//
// Not done here: rate limiting. If spam gets past the honeypot, add one
// (e.g. per-IP with Upstash) at the top of this function.
// ---------------------------------------------------------------------------
import { Resend } from "resend";
import { siteConfig } from "@/lib/seo/site-config";
import type { InquiryState } from "@/types/contact";
import { HONEYPOT_FIELD, labelsFor, readInquiry, validateInquiry, type InquiryValues } from "./validation";

const SUCCESS_MESSAGE = "Thanks, your message is on its way. We’ll reply by email.";
const INVALID_MESSAGE = "A few fields need a look.";
const FAILURE_MESSAGE = `Something went wrong on our side. Please email ${siteConfig.email} instead.`;

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set, so the inquiry was not sent.");
    return { status: "error", message: FAILURE_MESSAGE };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Denvo Lab <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || siteConfig.email,
      replyTo: values.email,
      subject: subjectFor(values),
      text: textBody(values),
      html: htmlBody(values),
    });
    if (error) {
      console.error("[contact] Resend rejected the email:", error);
      return { status: "error", message: FAILURE_MESSAGE };
    }
  } catch (err) {
    console.error("[contact] Could not reach Resend:", err);
    return { status: "error", message: FAILURE_MESSAGE };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}

// --- Email content -----------------------------------------------------------

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function subjectFor(v: InquiryValues) {
  const who = v.company ? `${v.name} (${v.company})` : v.name;
  return oneLine(`New inquiry from ${who}`);
}

function rows(v: InquiryValues): [string, string][] {
  return [
    ["Name", v.name],
    ["Company", v.company || "-"],
    ["Email", v.email],
    ["Phone or WhatsApp", v.phone || "-"],
    ["Needs", labelsFor(v.services, "services").join(", ")],
    ["Budget", v.budget ? labelsFor([v.budget], "budget")[0] : "-"],
  ];
}

function textBody(v: InquiryValues) {
  const lines = rows(v).map(([k, val]) => `${k}: ${val}`);
  return ["New inquiry from the Denvo Lab contact page", "", ...lines, "", "Project details:", v.details].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlBody(v: InquiryValues) {
  const table = rows(v)
    .map(
      ([k, val]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6b7a89;vertical-align:top">${k}</td><td style="padding:4px 0;color:#0d1216">${escapeHtml(val)}</td></tr>`,
    )
    .join("");
  return [
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">`,
    `<p style="margin:0 0 16px">New inquiry from the Denvo Lab contact page</p>`,
    `<table style="border-collapse:collapse">${table}</table>`,
    `<p style="margin:16px 0 4px;color:#6b7a89">Project details</p>`,
    `<p style="margin:0;white-space:pre-wrap;color:#0d1216">${escapeHtml(v.details)}</p>`,
    `</div>`,
  ].join("");
}
