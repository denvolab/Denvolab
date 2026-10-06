"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Animate the actual destination page, with the outgoing page underneath. */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const active = useRef(false);
  const pending = useRef<{ path:string; resolve:()=>void } | null>(null);

  useEffect(() => {
    const navigate = async (event: MouseEvent) => {
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || motion.matches) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self") || link.dataset.pageTransition === "off") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      if (active.current) return;
      active.current = true;
      const href = url.pathname + url.search + url.hash;
      let watchdog: ReturnType<typeof setTimeout> | undefined;
      const update = () => new Promise<void>(resolve => {
        pending.current = { path:url.pathname, resolve };
        watchdog = setTimeout(() => { pending.current = null; resolve(); }, 8000);
        router.push(href);
      });
      document.documentElement.classList.add("route-transitioning");
      try {
        if (document.startViewTransition) {
          // Native snapshots retain the old page while the next route renders.
          const transition = document.startViewTransition(update);
          await transition.finished;
        } else {
          await update();
          // The same content motion on browsers without snapshot transitions.
          await document.body.animate([
            { transform:"translateY(110vh) rotate(6deg) scale(.9)", transformOrigin:"50% 100%" },
            { transform:"translateY(0) rotate(0) scale(1)", transformOrigin:"50% 100%" },
          ], { duration:1000, easing:"cubic-bezier(.22,1,.36,1)" }).finished;
        }
      } catch {
        // If snapshot capture fails, retain ordinary navigation rather than a cover.
        if (window.location.pathname !== url.pathname) router.push(href);
      } finally {
        if (watchdog) clearTimeout(watchdog);
        pending.current = null;
        active.current = false;
        document.documentElement.classList.remove("route-transitioning");
      }
    };
    document.addEventListener("click", navigate, true);
    return () => {
      document.removeEventListener("click", navigate, true);
      pending.current?.resolve();
      document.documentElement.classList.remove("route-transitioning");
    };
  }, [router]);

  useEffect(() => {
    if (pending.current?.path === pathname) {
      pending.current.resolve();
      pending.current = null;
    }
  }, [pathname]);

  return null;
}
