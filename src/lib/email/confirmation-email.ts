// ---------------------------------------------------------------------------
// confirmationEmail: the automatic "We got your message" email the visitor
// gets after sending the Contact form. Returns the subject, plain text and
// the branded HTML (drawn in renderEmailLayout).
//
// WHAT IT PROMISES: only what the Contact page already says ("Abdur reads
// every inquiry and replies with next steps and a rough timeline", and the
// founder card's 30-minute call). No reply-time promise until the studio
// decides on one.
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
  "Abdur, our founder, reads your message himself.",
  "He replies by email with next steps and a rough timeline.",
  "If it helps, you walk him through your idea on a 30-minute call.",
];

export function confirmationEmail(data: ConfirmationEmailData) {
  const c = EMAIL_COLORS;
  const f = EMAIL_FONTS;
  const firstName = firstNameOf(data.name);
  const subject = oneLine(`We got your message, ${firstName} | ${EMAIL_BRAND_NAME}`);
  const workUrl = new URL("/case-studies", siteConfig.url).toString();

  // --- Plain text ------------------------------------------------------------
  const text = [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out to ${EMAIL_BRAND_NAME}. Your message is with us.`,
    "",
    `What you need: ${data.services.join(", ")}`,
    ...(data.budget ? [`Budget: ${data.budget}`] : []),
    "",
    "What happens next:",
    ...NEXT_STEPS.map((step, i) => `${i + 1}. ${step}`),
    "",
    "Have something to add? Just reply to this email.",
    "",
    `See our work: ${workUrl}`,
    "",
    "Talk soon,",
    `Abdur Razzak, Founder, ${EMAIL_BRAND_NAME}`,
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
      <h1 style="margin:12px 0 0;font-family:${f.sans};font-size:28px;line-height:36px;font-weight:600;letter-spacing:-0.02em;color:${c.dark};">We got your message, ${escapeHtml(firstName)}.</h1>
      <p style="margin:12px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">Thanks for reaching out to ${EMAIL_BRAND_NAME}. Your message is with us, and a real person will read it.</p>

      <div style="margin-top:32px;background:${c.page};border-radius:12px;padding:20px;">
        ${label("What you need")}
        <div style="margin-top:12px;">${chips}</div>
        ${budget}
      </div>

      <div style="margin-top:32px;">${label("What happens next")}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
        ${steps}
      </table>

      <p style="margin:8px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">Have something to add? Just reply to this email.</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr>
        <td bgcolor="${c.ink}" style="background:${c.ink};border-radius:16px;">
          <a href="${escapeHtml(workUrl)}" style="display:inline-block;padding:16px 24px;font-family:${f.mono};font-size:14px;line-height:20px;letter-spacing:0.02em;color:${c.white};text-decoration:none;">SEE OUR WORK</a>
        </td>
      </tr></table>

      <div style="margin-top:36px;padding-top:24px;border-top:1px solid ${c.border};">
        <div style="font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">Talk soon,</div>
        <div style="margin-top:4px;font-family:${f.sans};font-size:16px;line-height:24px;font-weight:600;color:${c.dark};">Abdur Razzak</div>
        <div style="margin-top:2px;font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;color:${c.textTertiary};">FOUNDER, ${EMAIL_BRAND_NAME.toUpperCase()}</div>
      </div>`;

  const footer = `You’re getting this because someone sent the contact form on ${escapeHtml(siteHost())} with this address. If that wasn’t you, you can ignore this email.<br />${EMAIL_BRAND_NAME}, Rangpur, Bangladesh`;

  const html = renderEmailLayout({
    title: subject,
    preheader: "Abdur reads every inquiry and replies with next steps and a rough timeline.",
    tag: "MESSAGE RECEIVED",
    body,
    footer,
  });

  return { subject, text, html };
}
