// ---------------------------------------------------------------------------
// CaseStudyCollage: the tinted band of six tiles under the solution (Figma
// "Contanct Info", e.g. 727:2402).
//
// FIGMA (1920): band 1499px tall (128px padding top and bottom), tint per
// page. Three 599px columns, 20px apart (the frame starts at x 3, so the
// columns sit at x 43 / 662 / 1281):
//   left    picture 651 (radius 24) + picture 572 (radius 32)
//   middle  card 393 (radius 16) + picture 830 (radius 16)
//   right   picture 794 (radius 24) + picture 429 (radius 24)
// The card is either the brand card (page colour; name in Inter Bold 34,
// statement DM Sans SemiBold 26/36 -2%, white, block centred, 36px side
// padding) or Job Sea's quote card (quote mark + DM Sans SemiBold 28/36 on
// the left, phone picture on the right).
//
// Tiles keep their Figma aspect ratios. Each column holds 1223px of tiles +
// one 20px gap, so the three columns stay the same height at any width.
// Below xl the column wrappers switch to `display: contents` and the six
// tiles flow as a one- or two-column masonry instead.
// Card text is sized in container units (cqw) so the card keeps its Figma
// composition at every width.
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import { cn } from "@/lib/utils/cn";
import type { CaseStudyCollageBlock, CaseStudyCollageCard, CaseStudyImage } from "@/types/case-study";

const SIZES = "(min-width: 1280px) 31vw, (min-width: 768px) 50vw, 100vw";
const TILE = "mb-4 break-inside-avoid md:mb-5 xl:mb-0";

function Tile({ image, height, radius }: { image: CaseStudyImage; height: number; radius: string }) {
  return (
    <div data-image-reveal="" className={cn("relative w-full overflow-hidden", TILE, radius)} style={{ aspectRatio: `599 / ${height}` }}>
      <Image src={image.src} alt={image.alt} fill sizes={SIZES} className="object-cover" />
    </div>
  );
}

function Card({ card }: { card: CaseStudyCollageCard }) {
  if (card.kind === "brand") {
    return (
      <div
        data-image-reveal=""
        className={cn("@container relative w-full overflow-hidden rounded-2xl", TILE)}
        style={{ aspectRatio: "599 / 393", background: card.background }}
      >
        <div className="flex h-full flex-col justify-center gap-[5.0083cqw] px-[6.0100cqw] text-white">
          <p className="min-h-[15.025cqw] font-inter text-[length:max(1.125rem,5.6761cqw)] font-bold leading-normal">
            {card.name}
          </p>
          <p className="min-h-[20.0334cqw] font-sans text-[length:max(1rem,4.3406cqw)] font-semibold leading-[1.3846] tracking-[-0.02em]">
            {card.statement}
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure
      data-image-reveal=""
      className={cn("@container relative w-full overflow-hidden rounded-2xl", TILE)}
      style={{ aspectRatio: "599 / 393", background: card.background }}
    >
      <div className="absolute inset-y-0 right-0 w-[58.2638%]">
        <Image src={card.image.src} alt={card.image.alt} fill sizes="(min-width: 1280px) 18vw, 50vw" className="object-cover" />
      </div>
      {/* Quote mark at 30, 63 and text at 20, 143 (230px wide) in the 599 x 393 card. */}
      <Image
        src="/images/case-studies/job-sea/quote-mark.svg"
        alt=""
        width={68}
        height={56}
        className="absolute left-[5.0083cqw] top-[10.5175cqw] h-auto w-[11.3523cqw]"
      />
      <blockquote className="absolute left-[3.3389cqw] top-[23.8731cqw] w-[38.3973cqw] font-sans text-[length:max(0.875rem,4.6745cqw)] font-semibold leading-[1.2857] text-gray-950">
        {card.quote}
      </blockquote>
    </figure>
  );
}

export function CaseStudyCollage({ block }: { block: CaseStudyCollageBlock }) {
  const { left, middle, right } = block;
  const column = "contents xl:flex xl:flex-col xl:gap-5";

  return (
    <section className="mt-12 w-full md:mt-16 xl:mt-0" style={{ background: block.background }}>
      <div className="mx-auto w-full max-w-[1920px] gap-5 px-5 py-12 md:columns-2 md:px-10 md:py-20 xl:grid xl:columns-auto xl:grid-cols-3 xl:pb-32 xl:pl-[43px] xl:pr-10 xl:pt-32">
        <div className={column}>
          <Tile image={left[0]} height={651} radius="rounded-3xl" />
          <Tile image={left[1]} height={572} radius="rounded-3xl xl:rounded-[32px]" />
        </div>
        <div className={column}>
          <Card card={middle.card} />
          <Tile image={middle.image} height={830} radius="rounded-2xl" />
        </div>
        <div className={column}>
          <Tile image={right[0]} height={794} radius="rounded-3xl" />
          <Tile image={right[1]} height={429} radius="rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
