# `types/` — Shared TypeScript Shapes

| File | Defines |
|---|---|
| `homepage.ts` | Shapes for the homepage sections' content. |
| `about.ts` | Shapes for the About page's content (`AboutHeroContent`, `AboutStory...`, `AboutTeamMember`, and so on). |
| `navigation.ts` | `NavLink` (a single link: label + href) and `FooterColumn` (a footer column title + its links). |
| `case-studies.ts` | `CaseStudiesHeroContent` — the Case Studies page's opening band (heading + paragraph). |
| `contact.ts` | Shapes for the Contact page (`ContactHeroContent`, `ContactFormContent`, `ContactSidebarContent`) and `InquiryState`, what the form's server action sends back. |
| `services.ts` | Shapes for the Services page's own content (`ServicesHeroContent`, `ServiceListItem`, `IndustriesServedContent`, and so on). |
| `case-study.ts` | The case study pages: `CaseStudy` and the `CaseStudyBlock` union (`hero`, `facts`, `intro`, `figure`, `challenge`, `solution`, `collage`, `process`, `typography`, `goal`, `visual`, `competitors`, `cover-hero`). Layout numbers are the Figma values at 1920. |
| `service-detail.ts` | The service detail pages: `ServiceDetailPage` and the `ServiceDetailBlock` union, one block type per section design (`hero`, `capabilities` with its six layouts, `faq`, `conversation`, and so on). The block's `type` picks the component that draws it. |

These shapes are written to match what the future admin-panel API will return, so `lib/data/*` and the components that consume it don't need to change when the real API arrives — only the *source* of the data changes, not its *shape*.
