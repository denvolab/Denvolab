// ---------------------------------------------------------------------------
// ServicesList — the Services page's main body: 7 numbered service entries,
// each with a title, description, a two-column bullet list, and a
// right-side image slot (Figma node 468:1128, "Services List Section", y
// 1031-6077). Server Component: content from lib/data/services.ts.
//
// TYPOGRAPHY: every text role here already matches an existing token
// exactly (confirmed via get_design_context's "styles contained in the
// design" metadata, not just eyeballing pixel values) — no new tokens were
// needed for this section:
//   - Number  -> Heading/H1  (40px/48px leading/600) -> text-heading-1
//   - Title   -> Display/LG  (48px/56px leading/600) -> text-display-lg
//   - Description -> Body/LG (18px/28px leading/400) -> text-body-lg
//   - Bullets -> Label/MD    (14px/20px leading/2% tracking/500) but set in
//     DM Mono in Figma, not DM Sans like every other Label/MD use on the
//     site -> text-label-md with a `font-mono` override, same "reuse the
//     token, override only what differs" approach as ui/button's `ghost`
//     variant.
//
// BULLETS: rendered as rows of (up to) two, not a CSS grid. Figma's own
// source groups bullets into "Row" flex containers of two `flex-1` items;
// when a list has an odd count, the trailing bullet sits alone in its own
// row and — because it's still `flex-1` inside a `w-full` row with no
// sibling — stretches across the FULL row width rather than sitting in a
// left column with an empty cell beside it. A `grid-cols-2` would get that
// last case wrong, so `chunkBullets` below reproduces Figma's row grouping
// directly.
//
// SUPPORTING VISUAL: 881x480 in Figma, `bg-surface-secondary` /
// `border-border-primary` / `rounded-lg`. The user confirmed (Sept 23, 2026)
// this box is a placeholder for a real per-service image, not a decorative
// shape — see types/services.ts's `imageSrc: string | null` and
// lib/data/services.ts's TODO(assets) note. While `imageSrc` is null, the
// placeholder box below renders pixel-for-pixel what Figma itself shows
// today (there's nothing to "fall back" to — this IS the current design);
// once a photo is set, it swaps in as a normal `next/image` `fill` crop,
// same pattern as about-values/what-we-create. Since Sept 28, 2026 all
// seven entries have the user's images (public/images/services/), so the
// empty box only shows if an entry's `imageSrc` is set back to null.
//
// RESPONSIVE: Figma has no separate mobile/tablet frame for this section.
// Each entry stacks (image below text) below `lg` and goes side-by-side at
// `lg`+, matching what-we-create's single-column-then-grid approach; the
// 120px inter-entry gap and 80px Header-vs-Visual gap step down at smaller
// breakpoints rather than staying fixed, following the same graduated
// pattern as about-values' section padding.
// ---------------------------------------------------------------------------
import Image from "next/image";
import Link from "@/components/ui/animated-link/animated-link";
import { getServicesList } from "@/lib/data/services";
import type { ServiceListItem } from "@/types/services";

function chunkBullets(bullets: string[]): string[][] {
  const rows: string[][] = [];
  for (let i = 0; i < bullets.length; i += 2) {
    rows.push(bullets.slice(i, i + 2));
  }
  return rows;
}

function ServiceEntry({ item, isFirst }: { item: ServiceListItem; isFirst: boolean }) {
  const bulletRows = chunkBullets(item.bullets.filter(bullet => bullet !== "SEE DETAILS"));

  return (
    <div
      className={
        isFirst
          ? "flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-20"
          : "flex w-full flex-col items-start gap-8 border-t border-border-primary pt-16 md:pt-20 lg:flex-row lg:items-center lg:gap-20 xl:pt-[120px]"
      }
      data-figma-node="468:1143"
    >
      {/* Header: number + title/description/bullets column */}
      <div className="flex w-full min-w-0 flex-1 items-start gap-4 md:gap-8 lg:gap-10">
        <p className="w-[70px] shrink-0 font-heading text-heading-1 text-foreground-subtle md:w-[100px] lg:w-[120px]">
          {item.number}
        </p>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-6 md:gap-8 lg:gap-10">
          <h3 className="w-full font-heading text-display-lg text-foreground">
            {/* Links to the service's detail page; looks the same as before
                (Figma shows no link styling), underline on hover only. */}
            <Link href={item.href} className="decoration-2 underline-offset-8 hover:underline">
              {item.title}
            </Link>
          </h3>
          <div className="flex w-full flex-col items-start gap-5 text-secondary md:gap-7">
            <p className="w-full font-sans text-body-lg">{item.description}</p>
            <div className="flex w-full flex-col items-start gap-3">
              {bulletRows.map((row, i) => (
                <div key={i} className="flex w-full items-start gap-4 xl:gap-12">
                  {row.map((bullet) => (
                    <p key={bullet} className="min-w-0 flex-1 font-mono text-label-md">
                      {"— "}
                      {bullet}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Link href={item.href} className="site-service-details font-mono text-label-md">SEE DETAILS ↗</Link>
        </div>
      </div>

      {/* Supporting Visual — see the file header's "SUPPORTING VISUAL" note. */}
      <div data-image-reveal="" className="relative aspect-[881/480] w-full lg:flex-1 overflow-hidden rounded-lg border border-border-primary bg-surface-secondary lg:h-[480px] lg:w-auto">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}

export async function ServicesList() {
  const { items } = await getServicesList();

  return (
    <section id="services-list" className="w-full bg-surface" data-figma-node="468:1128">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center gap-16 px-5 py-16 md:gap-20 md:px-10 md:py-20 xl:gap-[120px] xl:py-[120px]">
        {items.map((item, i) => (
          <ServiceEntry key={item.number} item={item} isFirst={i === 0} />
        ))}
      </div>
    </section>
  );
}
