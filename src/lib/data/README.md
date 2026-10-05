# `data/` — Content, With Tomorrow's Admin Panel in Mind

| File | Holds |
|---|---|
| `navigation.ts` | The header's nav links + "Become a Client" button. |
| `footer.ts` | The footer's four link columns. |
| `homepage.ts` | The homepage sections' content (hero, marquee, portfolio, and so on). |
| `about.ts` | The About page's content: hero, story, differences, values, benefits and team. Image spots are `null` until the real photos are exported. |
| `case-studies.ts` | The Case Studies page's own content: just the opening band's headline + paragraph. The rest of that page (`portfolio-grid`, `partner-logos`, `contact-cta`) reads from `homepage.ts` — see `app/case-studies/page.tsx`. |
| `contact.ts` | The Contact page's content: hero text, form labels, the chip options (`SERVICE_OPTIONS`, `BUDGET_OPTIONS`, also used to check submissions) and the founder, email and studio cards. `BOOKING_HREF` is the "Book a call" link. |
| `services.ts` | The Services page's own content: the hero heading, the seven Service List entries, and Industries We Serve. Each Service List entry has an `href` to its detail page. The rest of that page (`about-benefits`, `testimonials`) reads from `about.ts`/`homepage.ts` — see `app/services/page.tsx`. |
| `case-study/` | The eleven case study pages (`/case-studies/<slug>`), one file per page plus `shared.ts` (the template builder, the shared process steps and closing copy), `design-process.ts` (the process wheel used by AI Assistant and My Crew) and `index.ts` (`getCaseStudySlugs`, `getCaseStudy`, `getCaseStudyGridProjects`). Template pages only hold what differs: copy, colours, fonts and the six screens. Copy is taken from the Figma layers word for word. |
| `service-detail/` | The seven service detail pages (`/services/<slug>`), one file per page plus `index.ts` (`getServiceDetailSlugs`, `getServiceDetail`, and `getServiceDetailCta` for the shared closing "Let's work. Together" copy and icon credit). Each page is a list of typed blocks, one per Figma section. The copy and settings were copied from the Figma layers by script, so they match the design word for word; edit them freely. |

## Why every function here is `async`, even though it doesn't need to be yet

```ts
export async function getPrimaryNavigation(): Promise<NavLink[]> {
  return PRIMARY_NAV; // hardcoded for now
}
```

Right now this just hands back a hardcoded list — there's no admin panel yet. But `Header`/`Footer` already `await` these functions. That's deliberate: **the day the admin panel exists, this becomes:**

```ts
export async function getPrimaryNavigation(): Promise<NavLink[]> {
  const res = await fetch(`${process.env.API_URL}/navigation`);
  return res.json();
}
```

...and nothing in `components/` needs to change at all, because it was always calling this function the same way. This is the whole point of keeping content in `lib/data/` instead of writing it directly inside the header/footer components.
