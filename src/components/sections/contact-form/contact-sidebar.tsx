// ---------------------------------------------------------------------------
// ContactSidebar: the three cards next to the form (Figma node 585:1603):
// founder card (book a call), email card, studio card with the live clock.
// Server Component; only the clock (LiveClock) runs in the browser.
//
// The address and phone are blue (text/info) in Figma; here they are links
// too: the address opens Google Maps, the phone number dials.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ContactSidebarContent } from "@/types/contact";
import { LiveClock } from "./live-clock";
import { StudioClock } from "./studio-clock";

const CARD = "flex flex-col rounded-2xl p-6 md:p-8";
const CARD_LABEL = "font-mono text-label-sm text-text-tertiary";

export function ContactSidebar({ content }: { content: ContactSidebarContent }) {
  const { founder, email, office } = content;
  const bookingIsWeb = founder.cta.href.startsWith("http");

  return (
    <aside
      aria-label="Other ways to reach us"
      className="site-contact-sidebar"
      data-figma-node="585:1603"
    >
      {/* Founder (586:1568) */}
      <div className={`${CARD} gap-6 bg-secondary-900`}>
        <div className="flex items-center gap-4">
          <Image
            src={founder.photo.src}
            alt={founder.photo.alt}
            width={102}
            height={102}
            sizes="102px"
            className="size-[102px] shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="font-sans text-heading-5 text-foreground-inverse">{founder.name}</p>
            <p className="font-mono text-label-sm text-gray-400">{founder.role}</p>
          </div>
        </div>
        <p className="font-sans text-body-md text-gray-300">{founder.pitch}</p>
        <Button href={founder.cta.href} external={bookingIsWeb} size="md" className="self-start font-mono">
          {founder.cta.label}
        </Button>
      </div>

      {/* Email (586:1582) */}
      <div className={`${CARD} gap-2 bg-surface-primary`}>
        <p className={CARD_LABEL}>{email.label}</p>
        <a
          href={`mailto:${email.email}`}
          className="self-start font-sans text-heading-4 text-text-primary underline-offset-4 hover:underline"
        >
          {email.email}
        </a>
        <p className="font-sans text-body-sm text-text-secondary">{email.note}</p>
      </div>

      {/* Studio (586:1586) */}
      <div className={`${CARD} gap-6 bg-surface-primary`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className={CARD_LABEL}>{office.label}</p>
            <p className="font-sans text-heading-4 text-text-primary">{office.city}</p>
          </div>
          {/* Right-aligned like Figma; on phones, where it wraps under the
              city, it lines up on the left instead. */}
          <div className="site-studio-time flex flex-col items-center gap-4">
            <StudioClock timeZone={office.timeZone}/>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-success-default" />
              <LiveClock timeZone={office.timeZone} className="font-sans text-heading-4 text-text-primary" />
            </div>
            <p className={CARD_LABEL}>{office.zoneLabel}</p>
          </div>
        </div>

        <div className="h-px w-full bg-border-secondary" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className={CARD_LABEL}>{office.address.label}</p>
            <a
              href={office.address.href}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start font-sans text-body-md text-text-info underline-offset-4 hover:underline"
            >
              {office.address.value}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <p className={CARD_LABEL}>{office.phone.label}</p>
            <a
              href={office.phone.href}
              className="self-start font-sans text-body-md text-text-info underline-offset-4 hover:underline"
            >
              {office.phone.value}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
