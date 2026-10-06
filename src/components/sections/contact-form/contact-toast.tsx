"use client";
// ---------------------------------------------------------------------------
// ContactToast: the "Thank you" note after the Contact form has gone through,
// shown as a toast at the bottom of the screen instead of a line of text next
// to the submit button (the user asked for this on Oct 7, 2026). Errors still
// show inside the form, next to the fields they belong to.
//
// It is portalled to <body> so no card or section can clip it, sits in the
// middle (the WhatsApp button owns the bottom-right corner), and closes by
// itself after a few seconds or with its close button. `role="status"` makes
// screen readers announce it. The rise-in is CSS (contact-toast.css) and is
// skipped with "Reduce motion".
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./contact-toast.css";

const VISIBLE_MS = 6000;

interface ContactToastProps {
  title: string;
  message: string;
  onClose: () => void;
}

export function ContactToast({ title, message, onClose }: ContactToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="contact-toast" role="status" aria-live="polite">
      <span className="contact-toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <div className="contact-toast-copy">
        <p className="contact-toast-title">{title}</p>
        <p className="contact-toast-message">{message}</p>
      </div>
      <button type="button" className="contact-toast-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
