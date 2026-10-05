# `choice-chip/`

The Figma **Chip** component at Size=MD (Design System page, node `407:1502`) as a pill you can switch on and off.

| File | What it is |
|---|---|
| `choice-chip.tsx` | `ChoiceChip`. A real `checkbox` (pick several) or `radio` (pick one per `name`) hidden inside a `<label>`. |
| `index.ts` | Barrel export. |

```tsx
<ChoiceChip type="checkbox" name="services" value="website" label="Website" />
<ChoiceChip type="radio" name="budget" value="2k-8k" label="$2k to $8k" />
```

| Figma variant | When | Look |
|---|---|---|
| Style=Outline | off | white pill, 1px gray-200 border, DM Mono Medium 14/20 dark text |
| Style=Selected | on (`:checked`) | lime pill (`brand/default`), `text/on-brand` text, no border |

Because it's a real input, it works with the keyboard (Tab, Space, arrow keys for radios), screen readers, `form.reset()` and `FormData` without any JavaScript state. The styling follows the input through Tailwind's `has-[:checked]`.

Size: Figma draws the Outline border inside the 44px pill. Here both states keep a 1px border (transparent when on) with 1px less padding, so the pill is 44px tall and exactly as wide as in Figma either way.

Hover (not in Figma): off chips get the light gray `surface/secondary` fill, on chips `brand/hover`. Keyboard focus shows a 2px lime outline.

First used by the Contact page form (`sections/contact-form/`).
