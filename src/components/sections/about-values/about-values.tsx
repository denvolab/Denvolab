// ---------------------------------------------------------------------------
// AboutValues — "Our values shape the work we do" (Figma node 431:6304): a
// centered heading over a row of six cream cards that scrolls sideways
// forever. Server Component throughout: this is the same pure-CSS marquee
// technique as the homepage's marquee-tagline strip (see that component for
// the full explanation of the shared keyframe), so — unlike the step-by-step
// autoplay carousel this replaced — it needs no client-side JS at all.
//
// Figma numbers: 120px top and bottom padding, 96px between the heading and
// the cards, cards 400px wide and 660px tall with 16px gaps, 4px corners,
// 24px side padding and 48px top and bottom. Inside a card: the label, a 352px
// square illustration, and a short line of text, spread top to bottom.
//
// NORMALIZATION NOTE: in Figma cards 3 to 6 are 650px tall and pack their
// content to the top with a 32px gap, while cards 1 and 2 are 660px and spread
// their content out. That reads as drift, not intent, so every card here uses
// the card 1 and 2 style.
//
// THE LOOP: Figma's source shows the six cards only once, same situation as
// the tagline marquee — the loop is a code-side technique, not something
// exported from the design. The row below renders the cards TWICE back to
// back in one `w-max` track and animates it -50% with the shared
// `animate-marquee-scroll` keyframe from app/globals.css (see the @keyframes
// comment there for why -50% is exact). Six wide cards of real copy read
// slower than the tagline's short repeating phrases, so this strip overrides
// the shared animation to a slower, card-appropriate duration — a judgment
// call, the same situation the tagline's own default duration was in.
//
// The second copy is marked `aria-hidden` and `inert` so a screen reader only
// announces the six cards once. The tagline marquee doesn't need this (its
// content is a decorative repeating phrase); these cards carry real copy, so
// it matters here.
//
// The label uses DM Sans Label/MD in capitals. Figma sets it in a mono font,
// but the site keeps mono for captions only.
// ---------------------------------------------------------------------------
import Image from "next/image";
import { getAboutValues } from "@/lib/data/about";
import { cn } from "@/lib/utils/cn";
import { AnimatedText } from "@/components/ui/animated-text";

export async function AboutValues() {
  const values = await getAboutValues();
  const itemCount = values.items.length;
  // Two back-to-back copies of the same six cards = the track the animation
  // slides exactly one copy-width across before looping seamlessly.
  const track = [...values.items, ...values.items];

  return (
    <section className="bg-background py-16 md:py-24 xl:py-[120px]" data-figma-node="431:6304">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 md:gap-16 xl:gap-24">
        <h2 className="mx-auto max-w-[704px] px-5 text-center font-heading text-display-xl text-foreground md:px-10">
          <AnimatedText>
            {values.heading}
          </AnimatedText>
        </h2>

        <div className="w-full overflow-hidden">
          <ul className="flex w-max animate-marquee-scroll gap-4 [animation-duration:70s]">
            {track.map((value, i) => {
              const isDuplicateCopy = i >= itemCount;

              return (
                <li
                  key={i}
                  aria-hidden={isDuplicateCopy || undefined}
                  inert={isDuplicateCopy || undefined}
                  className="flex w-[min(400px,82vw)] shrink-0 flex-col justify-between gap-8 rounded bg-[#f9f8e4] px-6 py-12 text-center md:h-[660px]"
                >
                  <p className="font-sans text-label-md uppercase text-foreground">
                    {value.label}
                  </p>

                  <div
                    className={cn(
                      "relative aspect-square w-full",
                      !value.imageSrc && "rounded-sm bg-black/[0.04]",
                    )}
                  >
                    {value.imageSrc && (
                      <Image
                        src={value.imageSrc}
                        alt=""
                        fill
                        sizes="352px"
                        className="object-contain"
                      />
                    )}
                  </div>

                  <p className="font-sans text-body-md text-foreground-muted">{value.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
