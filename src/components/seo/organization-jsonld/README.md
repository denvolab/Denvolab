# `organization-jsonld/`

| File | What it is |
|---|---|
| `organization-jsonld.tsx` | Renders a `<script type="application/ld+json">` tag with the business's name, URL, description, and social links, read from `lib/seo/site-config.ts`. Invisible on the page — purely for search engines. |
| `index.ts` | Re-exports `OrganizationJsonLd`. |

Rendered once, in `app/layout.tsx`, so it's present on every page.
