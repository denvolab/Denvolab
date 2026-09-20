// ---------------------------------------------------------------------------
// WhatWeCreate — services showcase directly under the portfolio grid (Figma
// nodes 230:4063 for the heading, y 4501-4689, and the 6-card grid below it,
// y 4844-6332). Server Component: content from lib/data/homepage.ts.
//
// Unlike portfolio-grid, all 6 cards here already use the design system's
// real tokens consistently in the Figma source — no normalization judgment
// call needed.
// ---------------------------------------------------------------------------
import { getWhatWeCreateContent, getWhatWeCreateItems } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";

export async function WhatWeCreate() {
  const [content, items] = await Promise.all([
    getWhatWeCreateContent(),
    getWhatWeCreateItems(),
  ]);

  return (
    <section className="w-full bg-surface py-24" data-figma-node="230:4045">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-4 px-5 text-center md:px-10">
        {/* Eyebrow — one-off literal color (#292828), not bound to any
            variable in the Figma source, unlike almost everything else on
            this page; kept as the exact hex rather than rounding to a gray
            token. */}
        <p className="font-sans text-[28px] font-light text-[#292828]">{content.eyebrow}</p>
        <h2 className="max-w-[1042px] font-heading text-display-xl text-foreground">
          {content.heading}
        </h2>
      </div>

      {/* Single column through BOTH mobile and tablet, on purpose — per the
          homepage-responsive-tablet-mobile project doc, a 2-column tablet
          layout forces the description text to wrap onto more lines than
          the fixed-aspect background image can accommodate before the
          product-mockup artwork begins, causing text/image overlap. Only
          `lg:` (desktop) steps up to 3 columns. */}
      <div className="mx-auto mt-16 grid w-full max-w-[1920px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="relative flex aspect-[350/429] flex-col items-start gap-6 overflow-hidden rounded-2xl border-2 border-border-subtle p-6 md:p-8 lg:aspect-auto lg:h-[720px]"
          >
            {/* Background image — no asset could be exported into the
                codebase (see this folder's README). Placeholder keeps the
                card's exact border/radius/padding so the text overlay above
                it reads exactly as it will once a real image lands. */}
            {item.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- swapped for next/image once a real, sized asset lands
              <img
                src={item.imageSrc}
                alt=""
                className="absolute inset-0 size-full rounded-2xl object-cover"
              />
            ) : (
              <div className="absolute inset-0 rounded-2xl bg-background" aria-hidden="true" />
            )}

            <div className="relative flex flex-col items-start gap-3">
              <h3 className="w-full font-sans text-heading-2 text-foreground">{item.title}</h3>
              <p className="font-sans text-body-md text-secondary">{item.description}</p>
            </div>
            <Button href={item.cta.href} variant="secondary" size="sm" className="relative">
              {item.cta.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
