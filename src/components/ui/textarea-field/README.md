# `textarea-field/`

The Figma **Textarea** component (Design System page, node `584:9144`) as code: a label, a 160px multi-line field, and an optional helper or error line.

| File | What it is |
|---|---|
| `textarea-field.tsx` | `TextareaField`. Same props and states as `TextField` (`ui/text-field/`), for `<textarea>`. |
| `index.ts` | Barrel export. |

It shares the field look with `TextField` (`field-styles.ts` there), so Default, Focus, Error and Disabled match exactly. Differences: the field is 160px tall, text starts at the top with 12px padding, and there's no resize handle (Figma has none). Longer text scrolls inside the field.

The Textarea component was added to the Figma Design System on Sept 28, 2026 for the Contact page, built from the Input variants with the same tokens.
