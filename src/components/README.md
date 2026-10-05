# `components/` — All Visual Building Blocks

Every piece of UI lives here, grouped by **what it's for**, not what page it's on. Each component gets its own folder (even a one-file component) so related files — the component itself, its sub-parts, tests later on — stay together and are easy to find.

| Folder | What goes here |
|---|---|
| [`layout/`](./layout/README.md) | Site-wide chrome that appears on *every* page: the Header and Footer. |
| [`ui/`](./ui/README.md) | Small, reusable, generic pieces with no page-specific meaning — buttons, inputs, cards. If you could imagine reusing it on a totally different site, it belongs here. |
| [`sections/`](./sections/README.md) | Big page-specific blocks — the homepage hero, the portfolio grid, the AI-orbit feature section, etc. (Not built yet — see that folder's README.) |
| [`motion/`](./motion/README.md) | Site-wide scroll motion, mounted once in `app/layout.tsx`: the page colour wash between dark and light sections, and pictures rising into place. Renders nothing itself; sections opt in with a data attribute. |
| [`seo/`](./seo/README.md) | Components whose whole job is search-engine metadata (structured data), not visuals. |

## How to find a component's file

Every component folder has an `index.ts` — that's the "front door." You never need to know the internal filename to use a component:

```tsx
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
```

## Rule of thumb for where a new component goes

- Appears on every single page, unrelated to page content → `layout/`
- Small and generic, no business meaning of its own → `ui/`
- Big and specific to one page's content → `sections/`
- Animates things on every page and renders nothing itself → `motion/`
