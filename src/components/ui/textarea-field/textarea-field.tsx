// ---------------------------------------------------------------------------
// TextareaField: a labelled multi-line input, the Figma "Textarea"
// component (Design System page, node 584:9144). Same tokens and states as
// TextField; the box is 160px tall with 12px top/bottom padding, text starts
// at the top. Longer text scrolls inside the box.
// ---------------------------------------------------------------------------
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { FIELD_BOX, FIELD_HINT, FIELD_HINT_ERROR, FIELD_LABEL } from "@/components/ui/text-field";

interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  className?: string;
}

export function TextareaField({ id, label, helperText, error, className, ...textareaProps }: TextareaFieldProps) {
  const hint = error ?? helperText;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("flex min-w-0 flex-col gap-[var(--input-gap)]", className)}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={hintId}
        className={cn(
          FIELD_BOX,
          // 160px box; 12px padding inside the 1px border, like Figma. No
          // resize handle (Figma has none); longer text scrolls inside.
          "block h-40 resize-none py-[calc(var(--space-md)-var(--input-border-width))]",
        )}
        {...textareaProps}
      />
      {hint && (
        <p id={hintId} className={error ? FIELD_HINT_ERROR : FIELD_HINT}>
          {hint}
        </p>
      )}
    </div>
  );
}
