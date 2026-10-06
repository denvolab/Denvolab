"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { attachRippleHover } from "@/components/ui/ripple-image/attach-ripple-hover";

const CAROUSEL = '.loop-carousel, [aria-roledescription="carousel"]';

/** Reuse the Work ripple on ordinary images without changing their markup or layout. */
export function ImageRippleController() {
  const pathname = usePathname();

  useEffect(() => {
    const attached = new Map<HTMLImageElement, () => void>();
    const hosts = new Map<HTMLElement, { count: number; position: string; isolation: string }>();
    const register = () => {
      for (const [image, cleanup] of attached) {
        if (!image.isConnected || image.closest(CAROUSEL)) { cleanup(); attached.delete(image); }
      }
      document.querySelectorAll<HTMLImageElement>("img").forEach(image => {
        if (attached.has(image) || image.closest(CAROUSEL) || image.closest("[data-ripple-image]")) return;
        const host = image.parentElement;
        if (!host) return;
        let saved = hosts.get(host);
        if (!saved) {
          saved = { count: 0, position: host.style.position, isolation: host.style.isolation };
          hosts.set(host, saved);
          if (getComputedStyle(host).position === "static") host.style.position = "relative";
          host.style.isolation = "isolate";
        }
        saved.count++;
        const detach = attachRippleHover(host, { image, imageBounds: true });
        attached.set(image, () => {
          detach();
          const current = hosts.get(host);
          if (current && --current.count === 0) {
            host.style.position = current.position;
            host.style.isolation = current.isolation;
            hosts.delete(host);
          }
        });
      });
    };
    register();
    const observer = new MutationObserver(register);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); attached.forEach(cleanup => cleanup()); attached.clear(); };
  }, [pathname]);

  return null;
}
