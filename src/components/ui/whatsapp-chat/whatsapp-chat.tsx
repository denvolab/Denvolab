"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/seo/site-config";
import styles from "./whatsapp-chat.module.css";

/** Phones: the button comes back this long after the page stops scrolling. */
const SCROLL_STOP_MS = 300;

const services = ["UI/UX design", "Website", "Mobile app", "Branding", "Something else"];

/** WhatsApp's own logo (the speech bubble with the phone), one filled path
 *  drawn centred on a 24px grid (Simple Icons' "WhatsApp", CC0). Replaced the
 *  hand-drawn outline, which didn't match the real logo or sit centred
 *  (Oct 7, 2026). */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** The close cross: drawn on a 20px grid with both lines through its centre,
 *  so it sits exactly in the middle of the round hover background (the "×"
 *  character sat low and off-centre; Oct 7, 2026). */
function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** A guided inquiry assistant; the visitor sends the message in WhatsApp. */
export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const widget = useRef<HTMLElement>(null);

  // Phones: the floating button gets out of the way while the page scrolls
  // down, and is back as soon as it scrolls up or stops (the user, Oct 7,
  // 2026). Attribute only; the slide is in whatsapp-chat.module.css. Never
  // hidden while the chat is open.
  useEffect(() => {
    const el = widget.current;
    if (!el || open) return;
    const phone = window.matchMedia("(width < 768px)");
    let lastY = window.scrollY;
    let stopTimer = 0;
    const onScroll = () => {
      if (!phone.matches) return;
      const y = window.scrollY;
      if (y > lastY + 2) el.setAttribute("data-hidden", "");
      else if (y < lastY - 2) el.removeAttribute("data-hidden");
      lastY = y;
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => el.removeAttribute("data-hidden"), SCROLL_STOP_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(stopTimer);
      el.removeAttribute("data-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); launcher.current?.focus(); }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const text = ["Hi Denvo Lab!", service && `I’m interested in ${service}.`, message.trim()].filter(Boolean).join("\n\n");
  return <aside ref={widget} className={styles.widget} aria-label="WhatsApp chat">
    {open && <section id="whatsapp-chat-panel" className={styles.panel} role="region" aria-label="Chat with Denvo Lab" data-lenis-prevent>
      <header className={styles.header}><div><strong>Denvo Lab</strong><span>Let’s craft your next idea.</span></div><button ref={close} type="button" aria-label="Close WhatsApp chat" onClick={() => { setOpen(false); launcher.current?.focus(); }}><CloseIcon /></button></header>
      <div className={styles.body}><p className={styles.bubble}>Hi there! What would you like to create? Choose a service and tell us a little about your project.</p>
        <div className={styles.choices} aria-label="Choose a service">{services.map(item => <button key={item} type="button" aria-pressed={service === item} onClick={() => setService(item)}>{item}</button>)}</div>
        {service && <p className={styles.bubble} role="status">Great! Tell us about your {service.toLowerCase()} project below. We’ll continue the conversation on WhatsApp.</p>}
        <label className={styles.label} htmlFor="whatsapp-project">Your message</label><textarea id="whatsapp-project" value={message} onChange={event => setMessage(event.target.value)} placeholder="A little about your idea…" maxLength={2000} rows={3}/>
        <a className={styles.send} href={`${siteConfig.socials.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Continue on WhatsApp <span aria-hidden="true">↗</span></a>
        <p className={styles.note}>Opens WhatsApp. Review and send your message there.</p>
      </div>
    </section>}
    <button ref={launcher} className={styles.launcher} type="button" aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"} aria-expanded={open} aria-controls="whatsapp-chat-panel" onClick={() => setOpen(!open)}><WhatsAppIcon/></button>
  </aside>;
}
