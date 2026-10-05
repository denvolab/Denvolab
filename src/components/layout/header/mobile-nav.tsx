"use client";

// ---------------------------------------------------------------------------
// Mobile nav — hamburger toggle + slide-down panel, GSAP-animated. Split out
// of header.tsx (a Server Component) because this is the only part of the
// header that needs client-side interactivity/state.
// ---------------------------------------------------------------------------
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import type { NavLink } from "@/types/navigation";

interface MobileNavProps {
  links: NavLink[];
  cta: NavLink;
}

export function MobileNav({ links, cta }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate the panel open/closed whenever `isOpen` changes. `useGSAP` scopes
  // and auto-reverts the animation, so no manual cleanup is needed.
  useGSAP(
    () => {
      if (!panelRef.current) return;

      gsap.to(panelRef.current, {
        height: isOpen ? "auto" : 0,
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
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-6 bg-foreground-inverse transition-transform ${isOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-foreground-inverse transition-transform ${isOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      <div
        id="mobile-nav-panel"
        ref={panelRef}
        inert={!isOpen}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
        className="absolute inset-x-0 top-full h-0 overflow-hidden bg-surface-dark opacity-0"
      >
        <nav aria-label="Mobile" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setIsOpen(false); }} className="flex flex-col gap-6 px-6 py-8">
          {links.map((link) => (
            <Button key={link.href} href={link.href} variant="ghost" className="text-body-md">
              {link.label}
            </Button>
          ))}
          <Button href={cta.href} variant="primary" className="w-fit">
            {cta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
