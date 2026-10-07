// Shared by TextRevealController and the pre-paint script in app/layout.tsx
// (a server file, so these can't live in the "use client" controller).
// Every screen size since Oct 7, 2026 (the user wanted it on phones too; it
// was from 992px, zypsy.com's breakpoint). The lines are Web Animations, run
// by the browser off the main thread, so phones scroll smoothly.
export const TEXT_REVEAL_QUERY = "(prefers-reduced-motion: no-preference)";
export const TEXT_REVEAL_PENDING = "text-reveal-pending";
