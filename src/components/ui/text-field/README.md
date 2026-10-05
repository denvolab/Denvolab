# `text-field/`

The Figma **Input** component (Design System page, node `134:815`) as code: a label, a 44px field, and an optional helper or error line under it.

| File | What it is |
|---|---|
| `text-field.tsx` | `TextField`. Any normal `<input>` prop (`name`, `type`, `required`, `autoComplete`, `maxLength`...) passes straight through. Needs an `id`. |
| `field-styles.ts` | The field box, label and hint classes, shared with `ui/textarea-field/` so both look the same. |
| `index.ts` | Barrel export. |

```tsx
<TextField id="contact-email" name="email" type="email" label="Work email *" placeholder="you@company.com" error={errors.email} />
```

## States (same as the Figma variants)

| State | How to get it | Look |
|---|---|---|
| Default | nothing | white field, gray-200 border, gray-500 placeholder |
| Focus | the field has focus | 2px lime border inside the field |
| Error | pass `error="..."` | red-300 border, the message in red under the field, `aria-invalid` set |
| Disabled | `disabled` | gray-100 field, gray-300 text |

Every color, the radius, padding and height come from the `--input-*` component tokens in `src/styles/tokens/component-tokens.css` (Figma "06 · Component Tokens"). Figma draws the border inside the field, so the CSS padding is the token minus the 1px border: the text sits 16px from the edge, like the design.

The label is Figma "Label/SM" (DM Mono Medium 12/16) and the helper line is "Caption/MD" (DM Mono 12/16). Include the "*" in the label text for required fields.

First used by the Contact page form (`sections/contact-form/`).
