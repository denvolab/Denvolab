# `types/` — Shared TypeScript Shapes

| File | Defines |
|---|---|
| `navigation.ts` | `NavLink` (a single link: label + href) and `FooterColumn` (a footer column title + its links). |

These shapes are written to match what the future admin-panel API will return, so `lib/data/*` and the components that consume it don't need to change when the real API arrives — only the *source* of the data changes, not its *shape*.
