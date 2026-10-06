// ---------------------------------------------------------------------------
// confirmationEmail: the automatic "We got your message" email the visitor
// gets after sending the Contact form. Returns the subject, plain text and
// the branded HTML (drawn in renderEmailLayout).
//
// WHAT IT PROMISES: that the team reviews the inquiry and gets back shortly
// with next steps and an estimated timeline, plus an optional 30-minute call.
// It speaks as "the team" and never names the founder. No exact reply time
// until the studio decides on one.
//
// WHAT IT REPEATS BACK: the visitor's first name and the chips they picked
// (services, budget), never their free-text project details or company. The
// address on a contact form can be anyone's, so an email that echoed
// whatever was typed could be used to send someone else's text to strangers
// from the studio's Gmail. The chips are fixed labels, so they are safe.
// ---------------------------------------------------------------------------
import { siteConfig } from "@/lib/seo/site-config";
import {
  EMAIL_BRAND_NAME,
  EMAIL_COLORS,
  EMAIL_FONTS,
  escapeHtml,
  firstNameOf,
  oneLine,
  renderEmailLayout,
  siteHost,
} from "./layout";

export interface ConfirmationEmailData {
  name: string;
  /** Chip labels, e.g. ["Branding", "Website"]. */
  services: string[];
  /** Chip label, e.g. "$2k to $8k", or "" when not picked. */
  budget: string;
}

const NEXT_STEPS = [
  "Our team will carefully review your inquiry.",
  "We will reply by email with the next steps and an estimated timeline.",
  "If needed, we can arrange a 30-minute call to talk through your project in more detail.",
];

const INTRO = `Thank you for getting in touch with ${EMAIL_BRAND_NAME}. We have received your inquiry, and we appreciate you thinking of us for your project. A member of our team will get back to you shortly with a response to your inquiry.`;
const ADD_MORE = "If you’d like to share more information, such as references, documents or a brief, simply reply to this email.";
const SEE_WORK = "In the meantime, you’re welcome to look through our recent work.";

export function confirmationEmail(data: ConfirmationEmailData) {
  const c = EMAIL_COLORS;
  const f = EMAIL_FONTS;
  const firstName = firstNameOf(data.name);
  const subject = oneLine(`Thank you for contacting ${EMAIL_BRAND_NAME}, ${firstName}`);
  const workUrl = new URL("/case-studies", siteConfig.url).toString();

  // --- Plain text ------------------------------------------------------------
  const text = [
    `Dear ${firstName},`,
    "",
    INTRO,
    "",
    "Your request",
    `Services: ${data.services.join(", ")}`,
    ...(data.budget ? [`Budget: ${data.budget}`] : []),
    "",
    "What happens next:",
    ...NEXT_STEPS.map((step, i) => `${i + 1}. ${step}`),
    "",
    ADD_MORE,
    "",
    SEE_WORK,
    `View our work: ${workUrl}`,
    "",
    "Kind regards,",
    `The ${EMAIL_BRAND_NAME} Team`,
  ].join("\n");

  // --- HTML ------------------------------------------------------------------
  const label = (value: string) =>
    `<div style="font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:${c.textTertiary};">${escapeHtml(value)}</div>`;

  const chips = data.services
    .map(
      (service) =>
        `<span style="display:inline-block;background:${c.limeSoft};border:1px solid ${c.lime};color:${c.dark};font-family:${f.sans};font-size:14px;line-height:20px;padding:6px 12px;border-radius:999px;margin:0 6px 8px 0;">${escapeHtml(service)}</span>`,
    )
    .join("");

  const budget = data.budget
    ? `<div style="margin-top:12px;">${label("Budget")}</div>
       <div style="margin-top:6px;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.dark};">${escapeHtml(data.budget)}</div>`
    : "";

  const steps = NEXT_STEPS.map(
    (step, i) => `<tr>
        <td valign="top" style="padding:0 14px 16px 0;width:32px;">
          <div style="width:32px;height:32px;line-height:32px;text-align:center;border-radius:999px;background:${c.dark};color:${c.lime};font-family:${f.mono};font-size:13px;">${i + 1}</div>
        </td>
        <td valign="top" style="padding:5px 0 16px;font-family:${f.sans};font-size:16px;line-height:22px;color:${c.dark};">${escapeHtml(step)}</td>
      </tr>`,
  ).join("");

  const body = `
      <div style="font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;color:${c.textTertiary};">THANK YOU</div>
      <h1 style="margin:12px 0 0;font-family:${f.sans};font-size:28px;line-height:36px;font-weight:600;letter-spacing:-0.02em;color:${c.dark};">Thank you, ${escapeHtml(firstName)}. We’ve received your inquiry.</h1>
      <p style="margin:16px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.dark};">Dear ${escapeHtml(firstName)},</p>
      <p style="margin:12px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">${escapeHtml(INTRO)}</p>

      <div style="margin-top:32px;background:${c.page};border-radius:12px;padding:20px;">
        ${label("Your request")}
        <div style="margin-top:12px;">${chips}</div>
        ${budget}
      </div>

      <div style="margin-top:32px;">${label("What happens next")}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
        ${steps}
      </table>

      <p style="margin:8px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">${escapeHtml(ADD_MORE)}</p>
      <p style="margin:12px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">${escapeHtml(SEE_WORK)}</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr>
        <td bgcolor="${c.ink}" style="background:${c.ink};border-radius:16px;">
          <a href="${escapeHtml(workUrl)}" style="display:inline-block;padding:16px 24px;font-family:${f.mono};font-size:14px;line-height:20px;letter-spacing:0.02em;color:${c.white};text-decoration:none;">VIEW OUR WORK</a>
        </td>
      </tr></table>

      <div style="margin-top:36px;padding-top:24px;border-top:1px solid ${c.border};">
        <div style="font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">Kind regards,</div>
        <div style="margin-top:4px;font-family:${f.sans};font-size:16px;line-height:24px;font-weight:600;color:${c.dark};">The ${EMAIL_BRAND_NAME} Team</div>
      </div>`;

  const footer = `You’re getting this because someone sent the contact form on ${escapeHtml(siteHost())} with this address. If that wasn’t you, you can ignore this email.<br />${EMAIL_BRAND_NAME}, Rangpur, Bangladesh`;

  const html = renderEmailLayout({
    title: subject,
    preheader: "We’ve received your inquiry. Our team will get back to you shortly.",
    tag: "MESSAGE RECEIVED",
    body,
    footer,
  });

  return { subject, text, html };
}
