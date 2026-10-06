// ---------------------------------------------------------------------------
// inquiryEmail: the email the studio gets when someone sends the Contact
// form. Returns the subject, a plain-text version and the branded HTML (drawn
// in renderEmailLayout).
//
// Takes plain, already-checked values with the chip labels resolved (the
// caller, contact-form/actions.ts, does that), so this file knows nothing
// about the form itself. Everything the visitor typed is escaped here.
//
// The big button is a mailto: back to the visitor; replying to the email
// itself works too, because the sender sets reply-to to the visitor.
// ---------------------------------------------------------------------------
import {
  EMAIL_BRAND_NAME,
  EMAIL_COLORS,
  EMAIL_FONTS,
  escapeHtml,
  escapeMultiline,
  firstNameOf,
  oneLine,
  renderEmailLayout,
  siteHost,
  studioTime,
} from "./layout";

export interface InquiryEmailData {
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Chip labels, e.g. ["Branding", "Website"]. */
  services: string[];
  /** Chip label, e.g. "$2k to $8k", or "" when not picked. */
  budget: string;
  details: string;
  submittedAt: Date;
}

export function inquiryEmail(data: InquiryEmailData) {
  const c = EMAIL_COLORS;
  const f = EMAIL_FONTS;
  const who = data.company ? `${data.name} (${data.company})` : data.name;
  const firstName = firstNameOf(data.name);
  const subject = oneLine(`New inquiry from ${who}`);
  const sentAt = studioTime(data.submittedAt);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company || "-"],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "-"],
    ["Budget", data.budget || "-"],
  ];

  // --- Plain text ------------------------------------------------------------
  const text = [
    `New inquiry from the ${EMAIL_BRAND_NAME} contact page`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    `Needs: ${data.services.join(", ")}`,
    "",
    "Project details:",
    data.details,
    "",
    `Sent ${sentAt}. Reply to this email to answer ${firstName}.`,
  ].join("\n");

  // --- HTML ------------------------------------------------------------------
  const label = (value: string) =>
    `<div style="font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;text-transform:uppercase;color:${c.textTertiary};">${escapeHtml(value)}</div>`;

  const detailRows = rows
    .map(([key, value], i) => {
      const isEmail = key === "Email";
      const shown = isEmail
        ? `<a href="mailto:${escapeHtml(value)}" style="color:${c.dark};text-decoration:underline;">${escapeHtml(value)}</a>`
        : escapeHtml(value);
      const border = i === 0 ? "" : `border-top:1px solid ${c.border};`;
      return `<tr>
        <td valign="top" style="${border}padding:14px 12px 14px 0;width:124px;">${label(key)}</td>
        <td valign="top" style="${border}padding:12px 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.dark};word-break:break-word;">${shown}</td>
      </tr>`;
    })
    .join("");

  const chips = data.services
    .map(
      (service) =>
        `<span style="display:inline-block;background:${c.limeSoft};border:1px solid ${c.lime};color:${c.dark};font-family:${f.sans};font-size:14px;line-height:20px;padding:6px 12px;border-radius:999px;margin:0 6px 8px 0;">${escapeHtml(service)}</span>`,
    )
    .join("");

  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Your project inquiry | ${EMAIL_BRAND_NAME}`)}`;

  const body = `
      <div style="font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;color:${c.textTertiary};">CONTACT FORM</div>
      <h1 style="margin:12px 0 0;font-family:${f.sans};font-size:28px;line-height:36px;font-weight:600;letter-spacing:-0.02em;color:${c.dark};">New project inquiry</h1>
      <p style="margin:12px 0 0;font-family:${f.sans};font-size:16px;line-height:24px;color:${c.textSecondary};">${escapeHtml(who)} wants to talk about a project. Reply to this email to answer ${escapeHtml(firstName)} directly.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;border-top:1px solid ${c.border};border-bottom:1px solid ${c.border};">
        ${detailRows}
      </table>

      <div style="margin-top:28px;">${label("What they need")}</div>
      <div style="margin-top:12px;">${chips}</div>

      <div style="margin-top:20px;">${label("Project details")}</div>
      <div style="margin-top:12px;background:${c.page};border-radius:12px;padding:20px;font-family:${f.sans};font-size:16px;line-height:26px;color:${c.dark};word-break:break-word;">${escapeMultiline(data.details)}</div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;"><tr>
        <td bgcolor="${c.ink}" style="background:${c.ink};border-radius:16px;">
          <a href="${replyHref}" style="display:inline-block;padding:16px 24px;font-family:${f.mono};font-size:14px;line-height:20px;letter-spacing:0.02em;color:${c.white};text-decoration:none;">REPLY TO ${escapeHtml(firstName.toUpperCase())}</a>
        </td>
      </tr></table>`;

  const footer = `Sent from the contact form on ${escapeHtml(siteHost())} · ${escapeHtml(sentAt)}<br />${EMAIL_BRAND_NAME}, Rangpur, Bangladesh`;

  const html = renderEmailLayout({
    title: subject,
    preheader: `${who} · ${data.services.join(", ")}`,
    tag: "NEW INQUIRY",
    body,
    footer,
  });

  return { subject, text, html };
}
