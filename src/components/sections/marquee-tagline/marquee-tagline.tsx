// ---------------------------------------------------------------------------
// MarqueeTagline — the infinite-scrolling tagline strip directly under the
// hero (Figma node 230:4231, y 1080-1300). Server Component: the loop itself
// is pure CSS (`animate-marquee-scroll`, defined once in app/globals.css and
// shared with any other marquee the site adds later, e.g. partner-logos),
// so nothing here needs client-side JS.
//
// Figma's source shows exactly ONE copy of the phrase/icon sequence — the
// infinite-scroll effect is a code-side technique, not something exported
// from the design: this renders the sequence TWICE back to back inside one
// `w-max` track and animates it -50%, which is what makes the loop seamless
// (see the @keyframes comment in globals.css).
//
// RESPONSIVE: below `lg` (1024px), the mobile (390px) and tablet (768px)
// Figma frames both replace this with a single static line — the full
// multi-phrase 120px marquee doesn't translate to a narrow viewport (per the
// homepage-responsive-tablet-mobile project doc). The mobile frame's own
// line joins two of the five phrases with a middle dot ("CRAFT IS NOT AN
// ART · WE DO CRAFT"); rather than hardcode which two, every phrase here is
// joined the same way so the line stays correct if the phrase list changes.
// ---------------------------------------------------------------------------
import { getMarqueeItems } from "@/lib/data/homepage";

export async function MarqueeTagline() {
  const items = await getMarqueeItems();
  // Two back-to-back copies of the same sequence = the track the animation
  // slides exactly one copy-width across before looping.
  const track = [...items, ...items];

  return (
    <section
      className="w-full overflow-hidden bg-background py-6 lg:py-11"
      data-figma-node="230:4231"
    >
      {/* Mobile/tablet: one static, wrapping line — no animation. */}
      <p className="px-6 text-center font-mono text-label-md uppercase tracking-[0.02em] text-secondary lg:hidden">
        {items.map((item) => item.phrase).join(" · ")}
      </p>

      {/* Desktop (lg+): the full infinite-scroll strip. */}
      <div className="hidden w-max animate-marquee-scroll items-center gap-14 lg:flex">
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-14">
            {/* TODO(assets): Figma's icon (node 231:5215, "icon_vector")
                couldn't be exported into this codebase (asset host wasn't
                reachable from the build sandbox — see this folder's
                README). Placeholder keeps the 96px slot and brand-tinted
                treatment; swap for the real SVG at
                public/icons/marquee-spark.svg via item.iconSrc once it
                exists. */}
            <span
              aria-hidden="true"
              className="size-[96px] shrink-0 rounded-full border border-brand/20 bg-brand/[0.06]"
            />
            <p className="whitespace-nowrap font-sans text-[120px] leading-none text-secondary">
              {item.phrase}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
