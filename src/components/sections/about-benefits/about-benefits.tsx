// ---------------------------------------------------------------------------
// AboutBenefits — "Benefits of working with us" (Figma node 431:6359): a dark
// block with a heading and one line of text at the top, then four rows, each
// with a big line icon, a title and a paragraph. Server Component: content
// from lib/data/about.ts. The only client code is the small Reveal wrapper
// that plays the entrance when a piece scrolls into view.
//
// Figma numbers: 40px page padding, 120px top and bottom, 128px between the
// heading block and the list. Heading (60/68) and the 22/34 paragraph sit on
// one row and are centered against each other. The heading's text box is
// 520px wide on desktop, as in Figma (431:6368), so it runs on three lines. Each list row has a 1px top
// border, 48px top and bottom padding, the 100px icon in a 509px column, then
// a title (24/32, semibold) and a paragraph (24/38) as two equal columns with
// a 48px gap, the title centered against the paragraph.
//
// The Figma icons are top aligned in three rows and centered in one; they are
// all top aligned here.
//
// MOTION (adapted from Figma's 5.2 second loop): the heading and paragraph
// rise and fade in, then each row does the same one after the other, and the
// row's icon makes one full turn (direction alternates). It plays once, not on
// a loop. All of it is off for reduced motion and without JavaScript.
//
// Colors: the paragraph gray (#aab4be) and the border are Figma one-offs that
// sit between two gray steps; the border uses gray-600, the text keeps its hex.
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import { getAboutBenefits } from "@/lib/data/about";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";
import styles from "./about-benefits.module.css";

export async function AboutBenefits() {
  const benefits = await getAboutBenefits();

  return (
    <section className="bg-gray-950" data-figma-node="431:6359">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-5 py-16 md:gap-16 md:px-10 md:py-24 xl:gap-32 xl:py-[120px]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-20 xl:pr-10">
          <Reveal distance={46} className="xl:max-w-[1220px]">
            <h2 className="whitespace-pre-line font-heading text-display-xl text-brand-50 xl:max-w-[520px]">
              {benefits.heading}
            </h2>
          </Reveal>
          <Reveal delay={150} className="xl:w-[500px] xl:shrink-0">
            <p className="font-sans text-lg wash-ink [--ink:#aab4be] md:text-[22px] md:leading-[34px]">
              {benefits.description}
            </p>
          </Reveal>
        </div>

        <ul>
          {benefits.items.map((item, i) => (
            <li key={item.title} className="border-t border-gray-600 py-10 md:py-12">
              <Reveal
                delay={i * 120}
                className={cn(
                  styles.row,
                  "flex flex-col gap-6 md:grid md:grid-cols-[100px_1fr] md:items-start md:gap-8 xl:grid-cols-[28.3%_1fr] xl:gap-0 xl:pr-10",
                )}
              >
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={100}
                  height={100}
                  className={cn("size-20 md:size-[100px]", styles[item.spin])}
                />
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                  <h3 className="font-sans text-heading-4 text-brand-50">{item.title}</h3>
                  <p className="font-sans text-lg font-normal wash-ink [--ink:#aab4be] md:text-xl md:leading-8 xl:text-2xl xl:leading-[38px]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
