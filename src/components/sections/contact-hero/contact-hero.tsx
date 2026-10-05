// ---------------------------------------------------------------------------
// ContactHero: the dark opening block of the Contact page (Figma node
// 584:2195 in the "Contact" frame 584:2194). Server Component: content comes
// from lib/data/contact.ts.
//
// The frame draws its own nav bar. The site's global Header already sits
// above every page, so it isn't repeated; the eyebrow's distance from the
// top (215px) is measured from the bottom of the real header, the same way
// the About hero does it. At 1920 the block is 640px tall with the header,
// like the frame.
//
// LAYOUT:
//   xl+ (1280px)   eyebrow + headline on the left (760 wide), intro on the
//                  right (483 wide, 32px in from the edge), both sitting on
//                  the same bottom line, exactly as in Figma.
//   below xl       eyebrow + headline, then the intro, stacked. Same side
//                  padding and vertical rhythm as the About hero.
// ---------------------------------------------------------------------------
import { getContactHero } from "@/lib/data/contact";

export async function ContactHero() {
  const hero = await getContactHero();

  return (
    <section className="bg-surface-dark" data-figma-node="584:2195">
      <div className="mx-auto w-full max-w-[1920px] px-5 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24 xl:pb-[144px] xl:pt-[215px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between xl:pr-8">
          <div className="flex max-w-[760px] flex-col gap-6">
            <p className="font-mono text-label-md text-brand-default">{hero.eyebrow}</p>
            <h1 className="font-heading text-display-2xl text-foreground-inverse">{hero.headline}</h1>
          </div>

          <p className="max-w-[483px] font-sans text-body-lg text-gray-300 xl:w-[483px] xl:shrink-0">
            {hero.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
