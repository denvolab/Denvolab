"use client";
// ---------------------------------------------------------------------------
// BookCallButton: the founder card's "BOOK A CALL". When its link is a
// Cal.com booking page (https://cal.com/<user>/<event>), a click opens
// Cal.com's own booking widget in a popup over the page (Cal.com's embed,
// @calcom/embed-react), so the visitor picks a slot without leaving the site.
// The user asked for this on Oct 7, 2026.
//
// LOADING: Cal.com's embed script (app.cal.com/embed/embed.js) is fetched only
// when someone shows interest in the button (hover, focus or touch), not with
// the page, so the Contact page loads as fast as before. A click before it
// has arrived waits for it, then opens the popup.
//
// FALLBACK: the button is a normal link to the booking page, opening in a
// new tab. That is what happens without JavaScript, or if the embed script
// can't load (blocked, offline).
//
// Any other link (e.g. the old mailto:) renders the plain Button.
// ---------------------------------------------------------------------------
import { useRef, type MouseEvent } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/button";

const NAMESPACE = "book-a-call";
const CAL_ORIGIN = "https://cal.com/";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

/** Loads the embed once and sets the widget's look to the site's. */
function loadCal(): Promise<CalApi> {
  return getCalApi({ namespace: NAMESPACE }).then((cal) => {
    cal("ui", {
      // Dark with the brand lime, like the founder card the button sits in
      // (Gray/950 and Brand/600). Set here so the widget always looks the
      // same, whatever the Cal.com account's own appearance setting is.
      theme: "dark",
      hideEventTypeDetails: false,
      cssVarsPerTheme: { light: { "cal-brand": "#0d1216" }, dark: { "cal-brand": "#dfe94c" } },
    });
    return cal;
  });
}

interface BookCallButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function BookCallButton({ href, label, className }: BookCallButtonProps) {
  const cal = useRef<Promise<CalApi> | null>(null);

  if (!href.startsWith(CAL_ORIGIN)) {
    return (
      <Button href={href} external={href.startsWith("http")} size="md" className={className}>
        {label}
      </Button>
    );
  }

  const calLink = href.slice(CAL_ORIGIN.length).replace(/\/$/, "");

  const prepare = () => {
    if (!cal.current) {
      // Also start loading the booking page itself, so the calendar is
      // (nearly) ready by the time the click comes: Cal.com's app takes a
      // few seconds to load on its own.
      cal.current = loadCal().then((api) => {
        api("preload", { calLink });
        return api;
      });
      // A failed load is retried on the next interaction.
      cal.current.catch(() => {
        cal.current = null;
      });
    }
    return cal.current;
  };

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, new window) do what the visitor asked.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    prepare()
      .then((api) => api("modal", { calLink, config: { theme: "dark" } }))
      .catch(() => window.open(href, "_blank", "noopener,noreferrer"));
  };

  return (
    <Button
      href={href}
      external
      size="md"
      className={className}
      onPointerEnter={prepare}
      onFocus={prepare}
      onTouchStart={prepare}
      onClick={open}
    >
      {label}
    </Button>
  );
}
