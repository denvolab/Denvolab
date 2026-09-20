// ---------------------------------------------------------------------------
// Button — the variants used across the site (Figma "Button" component).
// "primary": solid lime CTA (header/hero/contact). "ghost": mono-font text
// link used for nav items and footer link lists. "secondary": dark filled
// button used for the "SEE MORE" card CTAs (what-we-create).
// ---------------------------------------------------------------------------
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
// "md" (default) is the nav/footer size already tuned by eye below. "sm" and
// "lg" are Figma's actual "Size=Small"/"Size=Large" button variants — "sm"
// for the what-we-create "SEE MORE" buttons (16px x / 36px-tall), "lg" for
// the hero's "SAY HELLO" CTA (24px x / 52px-tall).
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-[var(--button-size-sm-height)] px-[var(--button-size-sm-padding-x)]",
  md: "px-5 py-3",
  lg: "h-[var(--button-size-lg-height)] px-[var(--button-size-lg-padding-x)]",
};

// Colors come straight from the "06 · Component Tokens" Figma collection
// (component-tokens.css) — this is the exact Button spec, not the generic
// brand/foreground aliases. Note: Figma's Ghost button hovers with a
// background tint (button-ghost-bg-hover); this site's nav links use a
// text-color shift instead, since they read as plain text links, not
// button-shaped chips — a deliberate deviation for that one use, kept as
// plain Tailwind classes below rather than a token (it isn't part of the
// design system's Button component).
//
// "secondary" is a deliberate deviation too: component-tokens.css's
// `--button-secondary-text` aliases `color-text-on-secondary` (white), but
// the one secondary-button instance actually in the design (the
// what-we-create "SEE MORE" buttons) is bound to the `brand/subtle` variable
// instead (confirmed via get_variable_defs, not just the codegen fallback) —
// so that's what's used here. If a future secondary button shows up using
// the token's white instead, this variant needs a text-color override, not
// a change to this default.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text rounded-lg hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed transition-colors",
  secondary:
    "bg-button-secondary-bg text-brand-subtle rounded-lg hover:bg-button-secondary-bg-hover active:bg-button-secondary-bg-pressed transition-colors",
  ghost:
    "text-button-ghost-text/90 hover:text-primary transition-colors",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...anchorProps
}: ButtonProps) {
  // `text-label-md` (Font library — see app/globals.css) bundles the exact
  // Figma "Label/MD" spec: 14px / 20px line-height / 2% tracking / medium
  // weight, in one class — fluid-scale styles don't apply to this one on
  // purpose (see tokens/typography.css).
  const sharedClassName = cn(
    "font-mono text-label-md whitespace-nowrap inline-flex items-center justify-center",
    VARIANT_STYLES[variant],
    variant !== "ghost" && SIZE_STYLES[size],
    className,
  );

  // External links (socials, WhatsApp) skip Next's client-side router.
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {children}
    </Link>
  );
}
