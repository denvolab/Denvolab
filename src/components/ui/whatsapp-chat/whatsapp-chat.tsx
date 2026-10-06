"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/seo/site-config";
import styles from "./whatsapp-chat.module.css";

const services = ["UI/UX design", "Website", "Mobile app", "Branding", "Something else"];

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8.2 7.7c-.7.3-.9 1-.7 1.7.6 2.7 2.9 5 5.6 5.6.8.2 1.5-.1 1.8-.8l.4-1-2.3-1.1-.8 1c-1.5-.6-2.7-1.8-3.3-3.3l.9-.8-1-2.2-.6.9Z" fill="currentColor"/></svg>;
}

/** A guided inquiry assistant; the visitor sends the message in WhatsApp. */
export function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
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
  return <aside className={styles.widget} aria-label="WhatsApp chat">
    {open && <section id="whatsapp-chat-panel" className={styles.panel} role="region" aria-label="Chat with Denvo Lab" data-lenis-prevent>
      <header className={styles.header}><div><strong>Denvo Lab</strong><span>Let’s craft your next idea.</span></div><button ref={close} type="button" aria-label="Close WhatsApp chat" onClick={() => { setOpen(false); launcher.current?.focus(); }}>×</button></header>
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
