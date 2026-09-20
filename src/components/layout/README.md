# `layout/` — Site-Wide Chrome

Everything in here renders on **every page**, because `app/layout.tsx` puts it there once, at the site-shell level. Nothing here should ever assume it knows which page is currently showing.

| Folder | Contains |
|---|---|
| [`header/`](./header/) | The top nav bar: desktop links, the "Become a Client" button, and the mobile hamburger menu. |
| [`footer/`](./footer/) | The bottom of every page: link columns, socials, and the giant DENVOLAB wordmark. |

Both are **Server Components** that fetch their own content (nav links, footer columns) from `lib/data/` — see that folder's README for why that matters for the future admin panel.
