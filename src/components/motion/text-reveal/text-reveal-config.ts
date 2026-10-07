// Shared by TextRevealController and the pre-paint script in app/layout.tsx
// (a server file, so these can't live in the "use client" controller).
export const TEXT_REVEAL_QUERY = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";
export const TEXT_REVEAL_PENDING = "text-reveal-pending";
