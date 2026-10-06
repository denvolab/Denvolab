// ---------------------------------------------------------------------------
// AboutDifference — "What makes us different from others" (Figma node
// 431:6247): a dark block with the heading on the left and six cards in a
// 2 x 3 grid on the right. Server Component: content from lib/data/about.ts.
//
// Figma numbers: 40px page padding and 120px top and bottom, the grid is 900px
// wide with 40px gaps, and each card is `gray-800` with a `gray-700` border,
// 16px corners, 80px top and bottom padding and 40px sides. Cards in the same
// row are the same height and their content is centered inside, which is why
// a card with a shorter description sits a little lower.
//
// RESPONSIVE: the side-by-side layout needs about 1500px, so it starts at 2xl
// (1536px). Below that the heading sits on top and the cards fill the width
// (two columns from md, one on phones), with slightly smaller card padding.
//
// PAGE COLOUR WASH (components/motion/color-wash): when a light section is
// the active one, this dark section is shown in light colours. The user's
// rule for it (Oct 5, 2026): "card er bg surface secondary thakbe and text
// color icon color primary hobe. secondary text color could be as it is".
//   - card: a tint (the controller marks it, it has no picture in it), with
//     --wash-tint-alt set to surface/secondary, so it is gray-100 there;
//   - title: text-foreground-inverse already turns gray-950 (text primary);
//   - description: text-foreground-disabled turns gray-600, which is the
//     light theme's text secondary;
//   - icon: drawn as a mask in its own colour, brand-600 (the lime the SVG
//     files use), mixed to the text primary colour by the wash.
// In the section's own dark colour everything is exactly as designed.
// ---------------------------------------------------------------------------
import type { CSSProperties } from "react";
import { getAboutDifference } from "@/lib/data/about";
import { AnimatedText } from "@/components/ui/animated-text";

/** The icon file as a mask, so its colour can change with the page colour wash. */
function iconMask(src: string): CSSProperties {
  const image = `url(${src})`;
  return {
    maskImage: image,
    WebkitMaskImage: image,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
}

export async function AboutDifference() {
  const difference = await getAboutDifference();

  return (
    <section className="bg-gray-950" data-figma-node="431:6247">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-5 py-16 md:gap-14 md:px-10 md:py-24 2xl:flex-row 2xl:justify-between 2xl:gap-10 2xl:py-[120px]">
        <h2 className="max-w-[666px] font-heading text-display-xl text-foreground-inverse 2xl:w-[36%] 2xl:shrink-0">
          <AnimatedText>
            {difference.heading}
          </AnimatedText>
        </h2>

        <ul className="grid w-full max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:w-[48.9%] 2xl:gap-10">
          {difference.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col justify-center rounded-2xl border border-gray-700 bg-gray-800 px-6 py-12 [--wash-tint-alt:var(--color-surface-secondary)] md:px-8 md:py-16 2xl:px-10 2xl:py-20"
            >
              <span
                aria-hidden="true"
                className="block size-14 bg-current text-brand-600 [html.wash-ready_&]:text-[color-mix(in_srgb,var(--brand-600)_var(--wash-p),var(--wn-color-text-primary))]"
                style={iconMask(item.iconSrc)}
              />
              <h3 className="mt-6 font-sans text-heading-4 text-foreground-inverse">
                {item.title}
              </h3>
              <p className="mt-5 font-sans text-body-lg text-foreground-disabled">
                <AnimatedText>{item.description}</AnimatedText>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
