// ---------------------------------------------------------------------------
// TextField: a labelled single-line input, the Figma "Input" component
// (Design System page, node 134:815): label, 44px box, optional helper or
// error line. Works in Server and Client Components (no hooks).
//
// Pass `error` to show the Error state: red border, the message under the
// box, and aria-invalid + aria-describedby so screen readers read it too.
// Any normal <input> prop (name, type, required, autoComplete...) passes
// straight through.
// ---------------------------------------------------------------------------
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { FIELD_BOX, FIELD_HINT, FIELD_HINT_ERROR, FIELD_LABEL } from "./field-styles";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Required: ties the label, the input and the hint together. */
  id: string;
  /** Shown above the box. Include the "*" yourself if the field is required. */
  label: string;
  /** Gray line under the box. Hidden while `error` is set. */
  helperText?: string;
  /** Turns on the Error state and replaces the helper text. */
  error?: string;
  /** Classes for the outer wrapper (label + box + hint). */
  className?: string;
}

export function TextField({ id, label, helperText, error, className, ...inputProps }: TextFieldProps) {
  const hint = error ?? helperText;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("flex min-w-0 flex-col gap-[var(--input-gap)]", className)}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={hintId}
        className={cn(FIELD_BOX, "h-[var(--input-height)]")}
        {...inputProps}
      />
      {hint && (
        <p id={hintId} className={error ? FIELD_HINT_ERROR : FIELD_HINT}>
          {hint}
        </p>
      )}
    </div>
  );
}
