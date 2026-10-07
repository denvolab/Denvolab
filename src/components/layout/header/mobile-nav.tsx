"use client";

// ---------------------------------------------------------------------------
// Mobile nav — hamburger toggle + slide-down panel, GSAP-animated. Split out
// of header.tsx (a Server Component) because this is the only part of the
// header that needs client-side interactivity/state.
//
// Oct 7, 2026: the open panel floats over the whole page and header: 8px from
// every screen edge, 16px corners and a soft shadow, with its own top row
// holding the logo and the close X (100dvh less the margins)
// and the page behind can't scroll; the menu adds a Contact item (the header
// shows this menu only on phones); "Become a client" sits at the bottom,
// centred. The two lines of the button sit on the same centre and turn
// ±45° there, so the close icon is a true X.
// ---------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/animated-link/animated-link";
import { siteConfig } from "@/lib/seo/site-config";
import styles from "./header.module.css";
import type { NavLink } from "@/types/navigation";

interface MobileNavProps {
  links: NavLink[];
  cta: NavLink;
}

export function MobileNav({ links, cta }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };
  const menuLinks = links.some((link) => link.href === "/contact")
    ? links
    : [...links, { label: "Contact", href: "/contact" }];

  // No page scrolling behind the open menu, and the floating WhatsApp button
  // steps aside so it doesn't sit on "Become a client" at the bottom.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const chat = document.querySelector<HTMLElement>('aside[aria-label="WhatsApp chat"]');
    if (chat) chat.style.visibility = "hidden";
    return () => {
      root.style.overflow = previous;
      if (chat) chat.style.visibility = "";
    };
  }, [isOpen]);

  // Animate the panel open/closed whenever `isOpen` changes. `useGSAP` scopes
  // and auto-reverts the animation, so no manual cleanup is needed.
  useGSAP(
    () => {
      if (!panelRef.current) return;

      // Open: the whole screen less 8px all round (the panel floats over the
      // page and the header; its own top row has the logo and the X).
      gsap.to(panelRef.current, {
        height: isOpen ? Math.max(0, window.innerHeight - 16) : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { dependencies: [isOpen], scope: panelRef },
  );

  return (
    // See header.tsx for why this is `lg:hidden`, not `md:hidden` — the
    // hamburger nav covers both the mobile (390px) and tablet (768px) Figma
    // frames, switching to the full nav only at the `lg` (1024px) desktop
    // breakpoint.
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-10 block h-10 w-10"
      >
        {/* Both lines are centred on the button: 5px above and below when
            closed, on the centre and turned ±45° when open. */}
        <span
          className={`absolute left-0 top-1/2 -mt-px block h-px w-6 bg-foreground-inverse transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-[5px]"}`}
        />
        <span
          className={`absolute left-0 top-1/2 -mt-px block h-px w-6 bg-foreground-inverse transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-[5px]"}`}
        />
      </button>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        inert={!isOpen}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
        className="fixed inset-x-2 top-2 z-30 flex h-0 flex-col overflow-hidden rounded-[16px] border border-white/10 bg-surface-dark opacity-0 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
      >
        {/* The header's row, inside the floating panel: logo and close. */}
        <div className="flex shrink-0 items-center justify-between py-3 pl-4 pr-3">
          <Link href="/" className={styles.wordmark} onClick={() => setIsOpen(false)}>
            {siteConfig.name.replace(/\s/g, "")}
          </Link>
          <button type="button" aria-label="Close menu" onClick={close} className="relative block h-10 w-10">
            <span className="absolute left-1/2 top-1/2 -ml-[13px] -mt-px block h-0.5 w-[26px] rotate-45 bg-foreground-inverse" />
            <span className="absolute left-1/2 top-1/2 -ml-[13px] -mt-px block h-0.5 w-[26px] -rotate-45 bg-foreground-inverse" />
          </button>
        </div>
        <nav aria-label="Mobile" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setIsOpen(false); }} className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-[max(24px,env(safe-area-inset-bottom))]">
          {menuLinks.map((link) => (
            <Button key={link.href} href={link.href} variant="ghost" className="w-fit text-body-md">
              {link.label}
            </Button>
          ))}
          <Button href={cta.href} variant="primary" className="mt-auto w-full justify-center">
            {cta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
