# `contact-form/`

The light block of the Contact page (`/contact`): the "Start a project" form and three contact cards. Figma: node `585:1534` in the "Contact" frame `584:2194`.

| File | What it is |
|---|---|
| `contact-form-section.tsx` | `ContactFormSection` (Server Component). Loads the content and lays out the two columns. |
| `contact-form.tsx` | `ContactForm` (Client Component). The form card: fields, chip groups, submit, error and success messages. |
| `contact-sidebar.tsx` | `ContactSidebar` (Server Component). Founder card, email card, studio card. |
| `live-clock.tsx` | `LiveClock` (Client Component). The studio's local time, ticking on the minute. |
| `actions.ts` | `sendInquiry`, the Server Action that emails each inquiry through Resend. |
| `validation.ts` | Field rules shared by the form and the server action (limits, allowed chip values, honeypot name). |
| `index.ts` | Barrel export (`ContactFormSection`). |

Content (labels, chip options, founder, email, address, phone) lives in `lib/data/contact.ts`; shapes in `types/contact.ts`.

## Layout

- **xl+ (1280px):** 96px top/bottom, 40px sides, 32px gap. The form card takes the free width (1248px at 1920), the sidebar is 560px. At 1920 every card lands on Figma's exact box (form card 1248 x 856 at 40, 736; sidebar 560 x 751 at 1320, 736).
- **Below xl:** form card, then the sidebar under it, full width. Inputs go one per row under 768px; chips wrap.

## Built from Design System components

| Figma | Code |
|---|---|
| Input | `ui/text-field/` |
| Textarea (added to the DS for this page) | `ui/textarea-field/` |
| Chip, MD, Outline / Selected | `ui/choice-chip/` (real checkboxes and radios) |
| Button, Primary LG ("SEND INQUIRY") | a `<button type="submit">` with the Button tokens (the shared `Button` is a link) |
| Button, Primary MD ("BOOK A CALL") | `ui/button/` with `font-mono` |
| Avatar, 3XL Full Image | `next/image`, 102px circle |

Labels and buttons use DM Mono like the Figma styles (Label/SM, Label/MD).

## How the form works

1. The browser checks the fields first (`validateInquiry`): name, a valid email, at least one "What do you need?" chip, and project details. Problems show in the Design System's Error state (red border, message under the field), the first bad field gets focus, and "A few fields need a look." shows next to the button. Editing a field clears its error.
2. If it's all fine, the form data goes to `sendInquiry` (a Server Action, through `useActionState`). The server checks everything again, since anyone can post to an action.
3. A filled honeypot field (`website`, off screen) means a bot: the action pretends it worked and sends nothing.
4. The action emails the inquiry with Resend: to `denvolab@gmail.com`, reply-to set to the visitor, subject "New inquiry from Name (Company)", plain text and simple HTML.
5. Success clears the form and shows "Thanks, your message is on its way. We'll reply by email." A failure keeps what they typed and shows "Something went wrong on our side. Please email denvolab@gmail.com instead."

The form is sent from `onSubmit` (inside `startTransition`) rather than `<form action>`, because React clears a form after every `action` submission, even one that returns errors.

## Setup: Resend

Add these to `.env.local` (see `.env.example` in the project root):

| Variable | Needed | What |
|---|---|---|
| `RESEND_API_KEY` | yes | resend.com -> API Keys |
| `CONTACT_FROM_EMAIL` | no | sender, on a domain verified in Resend, e.g. `Denvo Lab <inquiries@denvolab.com>`. Default is Resend's test sender, which only delivers to the Resend account owner's own email |

Without `RESEND_API_KEY` the form still validates, then shows the "please email us instead" message and logs `[contact] RESEND_API_KEY is not set` on the server.

Not done yet: rate limiting. If spam gets past the honeypot, add a per-IP limit at the top of `sendInquiry`.

## Sidebar details

- **Founder card:** photo `public/images/contact/abdur-razzak-avatar.jpg`, the same square crop of the team headshot (`about/team/abdur-razzak.png`) that's in the Figma avatar. "BOOK A CALL" opens an email with the subject "Book a 30-minute call" until a booking page (Calendly, Cal.com...) exists; change `BOOKING_HREF` in `lib/data/contact.ts`. A web link opens in a new tab automatically.
- **Email card:** `mailto:` link.
- **Studio card:** the live clock uses `Asia/Dhaka` (GMT+6). The page is built ahead of time, so the server HTML holds an invisible placeholder and the real time appears once the page is interactive. Address and phone are blue (`text/info`) in Figma; here the address opens Google Maps and the phone number dials.

## Differences from the Figma frame

- The frame shows "UI/UX design" selected to demo the Selected chip. The live form starts with nothing selected, so nobody sends a choice they didn't make.
- Hover and focus looks for chips and fields are added (Figma has none for chips).

## Verified (Sept 28, 2026)

- 1920 screenshot vs Figma's export of the frame, with "UI/UX design" clicked and the clock fixed at 10:42 AM: every box matches; mean pixel difference 0.65/255 (hero), 1.0/255 (form card), 1.9/255 (sidebar), all edge anti-aliasing.
- 1440, 1280, 1024, 768, 390, 360: no sideways scroll, no console errors.
- Form: empty submit shows the four required errors and focuses the name; bad email caught; valid submit without a key shows the fallback message and keeps the input; honeypot path shows the success message and clears the form.

## Scroll motion (Oct 4, 2026)

Added when the user asked for the scroll feel of juice.agency and zypsy.com.

The section heading now rises in line by line (each line slides up out of its own clipping box) once the whole heading is on screen, and plays again after you scroll back up past it: the text is wrapped in `AnimatedText` (`components/ui/animated-text/`), zypsy.com's heading animation (Oct 5, 2026; it was the juice.agency word fade before). Only from 992px wide, as on Zypsy. The heading's tag, classes and line breaks are unchanged.

Like every section, it takes part in the page colour wash (`components/motion/color-wash/`): the whole screen takes the background colour of the section you are in (it switches the moment the section before has fully left the screen), and in its own colour this section looks exactly as before. None of its existing animations changed. With "Reduce motion" on, none of this runs.
