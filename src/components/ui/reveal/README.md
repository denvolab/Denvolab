# `reveal/` — Fade In When Scrolled To

Wrap anything in `<Reveal>` and it fades in and rises a little the first time it scrolls into view. It plays once and then stays put.

```tsx
<Reveal delay={150} distance={46}>
  <h2>...</h2>
</Reveal>
```

| Prop | Meaning |
|---|---|
| `delay` | Milliseconds to wait before it starts. Use steps of about 100 to 150 to stagger neighbours. Default 0. |
| `distance` | How many pixels it rises from. Default 30. |
| `className` | Extra classes for the wrapper `div`. |

## Files

- `reveal.tsx` — the component. A Client Component, because it uses the browser's `IntersectionObserver`.
- `reveal.module.css` — the hidden start state and the transition.
- `index.ts` — barrel export.

## How it works

The wrapper starts at opacity 0 and shifted down. When it is on screen, `reveal.tsx` sets `data-in="true"` on it, and the CSS moves it to its normal place. Other components can use the same attribute to start their own animation: `about-benefits/` spins its icons with `.row[data-in="true"] .icon`.

## Safe fallbacks

The hidden start state only exists when JavaScript is running (`@media (scripting: enabled)`) **and** the visitor has not asked for reduced motion. Without JavaScript, or with reduced motion on, the content is simply visible. Nothing can get stuck invisible.

## Used by

`sections/about-benefits/`.
