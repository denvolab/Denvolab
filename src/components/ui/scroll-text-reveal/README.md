# `scroll-text-reveal/` — Word-by-Word Scroll Highlight

Wrap a sentence in `<ScrollTextReveal>` and its words light up one at a time (dim -> full opacity) as the page scrolls past it, instead of sitting there fully visible from the start.

```tsx
<h2 className="...">
  <ScrollTextReveal text={story.heading} />
</h2>
```

Reference: the "(The principle)" statement on studiors.be (a French web studio site the user sent, see `claude/motion-interaction-references.md`, reference 7) — its `.stud-say__text` does the same word-by-word opacity reveal tied to scroll position. This component reproduces that technique with GSAP ScrollTrigger, the same tool already used by `sections/process-steps/process-rail.tsx` and `sections/hero/moving-visual.tsx`, instead of hand-rolled scroll math.

| Prop | Meaning |
|---|---|
| `text` | The full sentence. Split on spaces internally — one plain sentence, no manual line breaks. |
| `className` | Classes for the outer `<span>` — put the same typography classes the caller would otherwise put directly on the text. |

## Files

- `scroll-text-reveal.tsx` — the component. A Client Component (GSAP + `ScrollTrigger` need the browser).
- `index.ts` — barrel export.

## How it works

Renders a plain inline `<span>` (not a block), so it drops into a heading or paragraph exactly where the plain text used to sit and wraps the same way. The sentence is split into one `<span data-word>` per word, each dimmed to 22% opacity on mount, then animated to full opacity with a small stagger as the container scrolls through the viewport (`ScrollTrigger` `scrub`, start "top 85%", end "bottom 40%" — tuned so the highlight finishes before the section fully leaves view, not right as it arrives).

## Accessibility

The full sentence is repeated once in an `aria-label` on the outer `<span>`; every per-word `<span>` is `aria-hidden="true"`, so a screen reader announces the sentence once instead of reading each word twice or announcing 12 separate `<span>`s.

## Safe fallback

Same reduced-motion guard as `process-rail.tsx` and `ripple-image/`: `useGSAP` checks `prefers-reduced-motion` first and returns immediately when it's on, so the words are never dimmed and the opacity animation never runs — the sentence just renders at full opacity, same as with JavaScript disabled (there is no CSS-only hidden start state to get stuck on).

## Used by

`sections/about-story/` (the page statement heading).
