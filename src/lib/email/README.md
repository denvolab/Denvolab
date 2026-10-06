# `lib/email/`

Everything the site needs to send email. Every email goes through the one SMTP account here (Gmail, `denvolab@gmail.com`, shown as "Denvolab"), so the sender, credentials and look stay the same everywhere. Server only: import these from Server Actions or route handlers, never from a Client Component.

| File | What it is |
|---|---|
| `mailer.ts` | `sendEmail({ to, subject, text, html, replyTo })`. Opens the SMTP connection (Nodemailer) from the environment variables below. Never throws: returns `{ ok: false }` and logs `[email] ...` on the server when something is missing or fails. |
| `layout.ts` | `renderEmailLayout(...)`, the brand shell every email is drawn in (dark header with the DENVOLAB wordmark and a lime tag, lime line, white card, footer), plus `escapeHtml` / `escapeMultiline` / `oneLine`, `firstNameOf`, `studioTime` (Dhaka time), `siteHost`, the brand name (`EMAIL_BRAND_NAME`, "Denvolab") and the email color and font constants. |
| `inquiry-email.ts` | `inquiryEmail(data)`, the Contact form's "New project inquiry" email to the studio: subject, plain text and HTML, including the visitor's approximate location and IP (from Vercel's `x-vercel-ip-*` headers). Used by `components/sections/contact-form/actions.ts`. |
| `confirmation-email.ts` | `confirmationEmail(data)`, the automatic "We got your message" email to the visitor (tag MESSAGE RECEIVED): what they picked, that the team will get back to them shortly, what happens next, a VIEW OUR WORK link and a "The Denvolab Team" sign-off (the founder isn't named). Repeats only their first name and chip choices, never their free text, so the form can't be used to send someone else's words to a stranger. |

## Setup

Put these in `.env.local` for local development **and** in the hosting dashboard for production (see `.env.example`):

| Variable | Needed | What |
|---|---|---|
| `SMTP_USER` | yes | The sending Gmail address, `denvolab@gmail.com`. Also the sender address (Gmail only sends as the signed-in account). |
| `SMTP_PASS` | yes | A Google **app password** for that account, not the Gmail password. Google Account -> Security -> 2-Step Verification -> App passwords. Spaces in it are fine. |
| `MAIL_FROM_NAME` | no | The sender name. Default `Denvolab`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | no | Default Gmail: `smtp.gmail.com`, `465`, `true`. Only change these to move to another provider. |

**The app password is a secret and this repository is public.** It must only ever live in `.env.local` (ignored by git) and the host's environment settings. If it is ever committed or shared, revoke it in the Google account and make a new one.

Restart `npm run dev` after editing `.env.local`, and redeploy after changing the hosting variables: they are read when the server starts.

## Adding another email

1. Add `lib/email/<name>-email.ts` that returns `{ subject, text, html }`, drawing the HTML with `renderEmailLayout` (pick a short `tag`, e.g. `"WELCOME"`), and escape everything a visitor typed with `escapeHtml` / `escapeMultiline`.
2. Call `sendEmail({ to, ...email })` from the Server Action.

## The design

Email clients ignore most modern CSS (Gmail drops `<style>` classes, flex, grid and CSS variables), so the layout is tables with inline styles, 600px wide, and it reads fine with images blocked. The wordmark is text rather than the SVG logo because Gmail doesn't show SVG. Colors are the Color library's hex values (`styles/tokens/colors.css`): Gray/950 dark, Brand/600 lime, Gray/600 and Gray/500 text, Gray/100 lines, Gray/50 page. Fonts fall back from DM Sans / DM Mono to system fonts, since most inboxes don't load web fonts.

## Limits

Gmail sends up to about 500 emails a day from one account. If sending ever needs to go past that (newsletters, many automated emails), move to a sending service and only change the `SMTP_*` variables.
