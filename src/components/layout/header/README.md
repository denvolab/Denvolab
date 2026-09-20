# `header/` — Top Navigation

| File | What it is | Runs on |
|---|---|---|
| `header.tsx` | The header itself: logo-position "Home" link, About / Services / Case Studies links, and the "Become a Client" button. Fetches its own link data. | Server |
| `mobile-nav.tsx` | The hamburger button + slide-down panel shown only on small screens. Split into its own file because it's the *only* part of the header that needs to react to a click (open/close state) and run an animation. | Client |
| `index.ts` | Re-exports `Header` so other files can `import { Header } from "@/components/layout/header"`. |

## Why two files instead of one

`header.tsx` doesn't need any interactivity of its own — it just fetches data and lays out HTML — so it can run entirely on the server (faster, less JavaScript sent to the browser). The hamburger menu *does* need interactivity (open/close, animation), so that one piece is pulled into its own `"use client"` file. This split is a common Next.js pattern: keep as much as possible on the server, and carve out only the interactive part into a client file.

## To change the nav links

Don't edit this folder — edit `src/lib/data/navigation.ts`. This folder only decides *how links are displayed*, not *which links exist*.

## Responsive breakpoint

The switch between the hamburger nav and the full inline nav+CTA happens at `lg` (1024px), not `md` (768px). Per the `homepage-responsive-tablet-mobile` project doc, the Figma tablet (768px) frame still uses the hamburger — only the true desktop frame (built from `lg` up) shows the inline nav. `mobile-nav.tsx` and `header.tsx` must stay on the same breakpoint or both states could show (or neither) in the 768-1023px range.

The small "DENVOLAB" wordmark in `header.tsx` (`siteConfig.name`, `lg:hidden`) only renders below `lg`. Desktop intentionally has no wordmark in the header — it lives in the hero's giant background text and the footer instead — but mobile/tablet drop that giant hero treatment entirely (it doesn't fit a narrow viewport), so the compact top-bar wordmark fills that gap there, matching the Figma mobile/tablet frames.
