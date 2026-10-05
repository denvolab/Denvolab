// ---------------------------------------------------------------------------
// Shared shapes for the About page's section content. Same rationale as
// types/homepage.ts: this is the shape the future admin-panel API returns, so
// lib/data/about.ts can swap its local constants for a `fetch()` later with
// no change here or in the section components.
// ---------------------------------------------------------------------------

/** One picture in the hero's photo row. `imageSrc` is null until the real
 *  photo is exported from Figma into public/images/about/ (see
 *  sections/about-hero/README.md for the file names). */
export interface AboutPhoto {
  alt: string;
  imageSrc: string | null;
}

export interface AboutHeroContent {
  headline: string;
  description: string;
  cta: { label: string; href: string };
  /** Always five in the Figma design, in left-to-right order. */
  photos: AboutPhoto[];
}

export interface AboutStat {
  /** The big number, already formatted ("40+", "24%"). */
  value: string;
  label: string;
  description: string;
}

export interface AboutStoryContent {
  heading: string;
  /** Two short paragraphs next to the photo. */
  paragraphs: string[];
  image: AboutPhoto;
  stats: AboutStat[];
}

export interface AboutDifferenceItem {
  title: string;
  description: string;
  /** Always set: the six line icons are exported into public/icons/about/. */
  iconSrc: string;
}

export interface AboutDifferenceContent {
  heading: string;
  items: AboutDifferenceItem[];
}

export interface AboutValue {
  /** Shown in capitals above the illustration. */
  label: string;
  description: string;
  /** null until the illustration is exported from Figma into
   *  public/images/about/values/ (see sections/about-values/README.md). */
  imageSrc: string | null;
}

export interface AboutValuesContent {
  heading: string;
  items: AboutValue[];
}

export interface AboutBenefit {
  title: string;
  description: string;
  iconSrc: string;
  /** Which way the icon turns when the row scrolls into view. Figma
   *  alternates clockwise / counter-clockwise down the list. */
  spin: "cw" | "ccw";
}

export interface AboutBenefitsContent {
  /** Rendered with the line break preserved between the two lines. */
  heading: string;
  description: string;
  items: AboutBenefit[];
}

export interface AboutTeamMember {
  name: string;
  role: string;
  /** null until a real headshot is exported into public/images/about/team/
   *  (see sections/about-team/README.md for file names). Drives the
   *  hover-to-swap portrait: hovering this member's row shows this photo. */
  imageSrc: string | null;
}

export interface AboutTeamContent {
  heading: string;
  /** In display order. The first member with a photo is shown in the
   *  portrait by default, before any row is hovered. */
  members: AboutTeamMember[];
}
