// ---------------------------------------------------------------------------
// Button — the variants used across the site (Figma "Button" component).
// "primary": solid lime CTA (header/hero/contact). "ghost": plain text
// link used for nav items and footer link lists. "secondary": dark filled
// button used for the "SEE MORE" card CTAs (what-we-create). "outline": a
// bordered, transparent button — currently only the Services page's
// "View All Case Studies" (industries-served), see that variant's own note
// below for why it doesn't reuse component-tokens.css's `--button-outline-*`
// tokens.
// ---------------------------------------------------------------------------
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
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
// "outline" is a deliberate deviation from component-tokens.css's
// `--button-outline-*` tokens (gray-700 border, white text): those describe
// a dark-styled outline button, but the one instance actually in the design
// (industries-served's "View All Case Studies") is bound to the plain
// `border/primary` + `text/primary` variables instead (confirmed via the
// literal fallback colors get_design_context returned, not just the token
// name) — the same kind of per-instance deviation the "secondary" note above
// already documents. If a future outline button shows up using the dark
// token set instead, this variant needs a style override, not a change to
// this default. Its own padding (24px/14px) and font (DM Mono, not the
// site's usual DM Sans for Label/MD) don't fit the shared SIZE_STYLES table
// either, so — like "ghost" — it skips that table entirely.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-text rounded-lg hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed transition-colors",
  secondary:
    "bg-button-secondary-bg text-brand-subtle rounded-lg hover:bg-button-secondary-bg-hover active:bg-button-secondary-bg-pressed transition-colors",
  ghost:
    "text-button-ghost-text/90 hover:text-primary transition-colors",
  outline:
    "border border-border-primary text-foreground rounded-lg px-6 py-3.5 font-mono hover:bg-surface-secondary transition-colors",
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
  // purpose (see tokens/typography.css). "outline" sets its own font family
  // (DM Mono) above, so it's excluded from the default `font-sans` here.
  const sharedClassName = cn(
    "text-label-md whitespace-nowrap inline-flex items-center justify-center",
    variant !== "outline" && "font-sans",
    VARIANT_STYLES[variant],
    (variant === "primary" || variant === "secondary") && SIZE_STYLES[size],
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
