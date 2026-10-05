// ---------------------------------------------------------------------------
// Shared look of the field box for TextField and TextareaField, from the
// Figma "Input" / "Textarea" components (Design System page). All values come
// from the Input component tokens in styles/tokens/component-tokens.css.
//
// Figma draws the 1px border INSIDE the box, so the box is 44px tall with
// the text 16px from the outer edge. In CSS the border adds to the box, so
// the padding is the token minus the border width to land on the same spot.
//
// States (Figma variants):
//   Default   gray-200 border, gray-500 placeholder
//   Focus     2px brand border inside the box (1px border + 1px inset shadow)
//   Error     red-300 border (set by aria-invalid="true")
//   Disabled  gray-100 box, gray-300 text
// ---------------------------------------------------------------------------

export const FIELD_BOX =
  "w-full rounded-[var(--input-radius)] border border-input-border bg-input-bg " +
  "px-[calc(var(--input-padding-x)-var(--input-border-width))] " +
  "font-sans text-body-md text-input-text placeholder:text-input-text-placeholder " +
  "outline-none transition-[border-color,box-shadow] " +
  "aria-[invalid=true]:border-input-border-error " +
  "focus:border-input-border-focus focus:shadow-[inset_0_0_0_1px_var(--input-border-focus)] " +
  "disabled:border-input-border-disabled disabled:bg-input-bg-disabled disabled:text-input-text-disabled";

/** Label above the box: Figma "Label/SM" (DM Mono Medium 12/16). */
export const FIELD_LABEL = "font-mono text-label-sm text-input-label";

/** Helper or error line under the box: Figma "Caption/MD" (DM Mono 12/16). */
export const FIELD_HINT = "font-mono text-caption-md text-input-helper-text";
export const FIELD_HINT_ERROR = "font-mono text-caption-md text-input-helper-text-error";
