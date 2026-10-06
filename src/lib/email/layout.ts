// ---------------------------------------------------------------------------
// renderEmailLayout: the brand shell every email is drawn in. A dark header
// with the DENVOLAB wordmark and a small lime tag, a thin lime line, then the
// white content card on the light grey page, and a quiet footer.
//
// EMAIL HTML, NOT WEB HTML: Gmail, Outlook and Apple Mail ignore most modern
// CSS (no flex/grid, no <style> classes in Gmail, no CSS variables), so this
// is tables + inline styles, 600px wide, and it stays readable when images are
// blocked. That is also why the wordmark is text, not the SVG logo: Gmail
// does not show SVG images at all.
//
// COLORS come from the Color library (styles/tokens/colors.css), copied as
// hex because email can't read the CSS tokens: Gray/950 #0d1216 (dark),
// Brand/600 #dfe94c (lime), Gray/600 #52616f, Gray/500 #6b7a89,
// Gray/100 #e8ecf0, Gray/50 #f4f6f8, Brand/200 #f3f7c0, Gray/900 #1a2128.
// Fonts: DM Sans / DM Mono where the reader has them, then system fallbacks.
// ---------------------------------------------------------------------------

import { siteConfig } from "@/lib/seo/site-config";

export const EMAIL_COLORS = {
  dark: "#0d1216",
  ink: "#1a2128",
  lime: "#dfe94c",
  limeSoft: "#f3f7c0",
  textSecondary: "#52616f",
  textTertiary: "#6b7a89",
  border: "#e8ecf0",
  page: "#f4f6f8",
  white: "#ffffff",
} as const;

/** How the studio signs every email: the same name as the sender (MAIL_FROM_NAME). */
export const EMAIL_BRAND_NAME = "Denvolab";

export const EMAIL_FONTS = {
  sans: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'DM Mono', 'SFMono-Regular', Menlo, Consolas, 'Courier New', monospace",
} as const;

/** Makes visitor-typed text safe to put inside HTML. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped text with its line breaks kept (email clients drop `white-space`). */
export function escapeMultiline(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

/** For subjects and headers: no line breaks allowed. */
export function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

/** The first word of a name, for "Hi Sarah". Capped so a long entry can't stretch the layout. */
export function firstNameOf(name: string) {
  return (name.trim().split(/\s+/)[0] || name).slice(0, 40);
}

/** The studio is in Rangpur, so times read in Dhaka time (GMT+6). */
export function studioTime(date: Date) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${formatted} (GMT+6)`;
}

/** "denvolab.com", from the site URL in lib/seo/site-config.ts. */
export function siteHost() {
  try {
    return new URL(siteConfig.url).host.replace(/^www\./, "");
  } catch {
    return "denvolab.com";
  }
}

interface EmailLayoutOptions {
  /** The document <title>; some clients show it. */
  title: string;
  /** The grey preview line inboxes show after the subject. Plain text. */
  preheader: string;
  /** The small lime tag in the header, e.g. "NEW INQUIRY". Plain text. */
  tag: string;
  /** The card's content, already-safe HTML. */
  body: string;
  /** One or two short lines under the card, already-safe HTML. */
  footer: string;
}

export function renderEmailLayout({ title, preheader, tag, body, footer }: EmailLayoutOptions) {
  const c = EMAIL_COLORS;
  const f = EMAIL_FONTS;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${c.page};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${c.page};">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.page}" style="background:${c.page};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
    <tr><td bgcolor="${c.dark}" style="background:${c.dark};border-radius:16px 16px 0 0;padding:28px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${f.sans};font-size:20px;line-height:28px;font-weight:700;letter-spacing:0.12em;color:${c.white};">DENVOLAB</td>
        <td align="right"><span style="display:inline-block;background:${c.lime};color:${c.dark};font-family:${f.mono};font-size:12px;line-height:16px;letter-spacing:0.04em;padding:6px 10px;border-radius:8px;">${escapeHtml(tag)}</span></td>
      </tr></table>
    </td></tr>
    <tr><td bgcolor="${c.lime}" style="background:${c.lime};height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>
    <tr><td bgcolor="${c.white}" style="background:${c.white};border-radius:0 0 16px 16px;padding:40px 32px;font-family:${f.sans};color:${c.dark};">
${body}
    </td></tr>
    <tr><td align="center" style="padding:24px 16px 0;font-family:${f.sans};font-size:12px;line-height:18px;color:${c.textTertiary};">
${footer}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
