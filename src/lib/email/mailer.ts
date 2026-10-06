// ---------------------------------------------------------------------------
// sendEmail: the one place the site sends email from. Every email (today the
// Contact form's inquiry, later anything else) goes through this SMTP setup,
// so the sender, the credentials and the timeouts live in one file.
//
// Server only: it reads secrets from the environment and opens an SMTP
// connection, so import it from Server Actions / route handlers, never from a
// Client Component.
//
// SETUP (.env.local, and the same variables in the hosting dashboard; see
// .env.example and lib/email/README.md):
//   SMTP_USER       required. The Gmail address that sends, e.g.
//                   denvolab@gmail.com. Also the sender address.
//   SMTP_PASS       required. A Google *app password* for that account (16
//                   letters), never the normal Gmail password. Secret: it
//                   lives only in .env.local and the host's env settings,
//                   never in the code (this repo is public).
//   MAIL_FROM_NAME  optional. The sender name. Default "Denvolab".
//   SMTP_HOST / SMTP_PORT / SMTP_SECURE  optional. Default Gmail:
//                   smtp.gmail.com, 465, secure (TLS from the start).
//
// Never throws: a missing setting or an SMTP failure is logged on the server
// with the reason and returned as `{ ok: false }`, so the caller can show its
// own friendly message.
// ---------------------------------------------------------------------------
import nodemailer, { type Transporter } from "nodemailer";

export interface EmailMessage {
  to: string;
  subject: string;
  /** Plain-text version, for clients that don't show HTML (and spam filters). */
  text: string;
  html: string;
  /** Where "Reply" goes, e.g. the visitor who filled in a form. */
  replyTo?: string;
}

export type SendEmailResult = { ok: true } | { ok: false; reason: "not-configured" | "send-failed" };

const DEFAULT_FROM_NAME = "Denvolab";

// One connection setup per server instance, made on the first send.
let transporter: Transporter | null = null;

function readConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // app passwords are shown with spaces
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure,
    user,
    pass,
    fromName: process.env.MAIL_FROM_NAME?.trim() || DEFAULT_FROM_NAME,
  };
}

export async function sendEmail(message: EmailMessage): Promise<SendEmailResult> {
  const config = readConfig();
  if (!config) {
    console.error("[email] SMTP_USER or SMTP_PASS is not set, so the email was not sent.");
    return { ok: false, reason: "not-configured" };
  }

  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    // Fail in seconds rather than leave the visitor's button spinning.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      // Gmail only sends as the signed-in account, so the sender address is
      // always SMTP_USER; the name is what people see in their inbox.
      from: { name: config.fromName, address: config.user },
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] SMTP send failed:", err);
    // Drop the cached connection so the next send starts clean (e.g. after
    // the app password was changed).
    transporter = null;
    return { ok: false, reason: "send-failed" };
  }
}
