// ---------------------------------------------------------------------------
// Primary header navigation.
//
// API-readiness: this is written as an `async` function returning a Promise
// on purpose, even though it currently resolves a local constant. The header
// is a Server Component that already `await`s this call — so once the admin
// panel exists, this body becomes a `fetch(`${API_URL}/navigation`)` and
// nothing else in the app needs to change.
// ---------------------------------------------------------------------------
import type { NavLink } from "@/types/navigation";

const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
];

const HEADER_CTA: NavLink = { label: "Become a Client", href: "/contact" };

export async function getPrimaryNavigation(): Promise<NavLink[]> {
  return PRIMARY_NAV;
}

export async function getHeaderCta(): Promise<NavLink> {
  return HEADER_CTA;
}
