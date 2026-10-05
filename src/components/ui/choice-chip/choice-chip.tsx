// ---------------------------------------------------------------------------
// ChoiceChip: a pill you can switch on and off, the Figma "Chip" component
// at Size=MD (Design System page, node 407:1502):
//   off  Style=Outline   white pill, gray-200 border, DM Mono 14/20 text
//   on   Style=Selected  lime pill (brand/default), dark text, no border
//
// It's a real checkbox (pick several) or radio (pick one) hidden inside a
// <label>, so it works with the keyboard, screen readers, form reset and
// FormData with no JavaScript. The look follows the input's :checked state
// through `has-[:checked]`.
//
// Figma draws the Outline border inside the 44px pill; here both states keep
// a 1px border (transparent when on) with 1px less padding, so the pill is
// 44px tall and exactly as wide as in Figma either way.
// ---------------------------------------------------------------------------
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface ChoiceChipProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  /** "checkbox" = pick any number, "radio" = pick one per `name`. */
  type: "checkbox" | "radio";
  label: string;
  className?: string;
}

export function ChoiceChip({ type, label, className, ...inputProps }: ChoiceChipProps) {
  return (
    <label
      className={cn(
        // `relative` keeps the visually hidden input inside the pill, so
        // focusing it never scrolls the page somewhere else.
        "relative inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full",
        "border border-border-primary bg-surface-primary px-[15px] py-[11px]",
        "font-mono text-label-md text-text-primary transition-colors",
        "hover:bg-surface-secondary",
        "has-[:checked]:border-transparent has-[:checked]:bg-brand-default has-[:checked]:text-text-on-brand",
        "has-[:checked]:hover:bg-brand-hover",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-border-focus",
        className,
      )}
    >
      <input type={type} className="sr-only" {...inputProps} />
      {label}
    </label>
  );
}
