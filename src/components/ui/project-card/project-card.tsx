import Link from "@/components/ui/animated-link/animated-link";

import { RippleImage } from "@/components/ui/ripple-image";
import styles from "./project-card.module.css";

/**
 * ProjectCard
 * -----------
 * One project in the portfolio grid: a picture on top, and a label row
 * underneath that reads  "Name -- Category".
 *
 * Two hover effects, copied from the project cards on 14islands.com:
 *
 *   PICTURE  edge wobble + water ripple   (WebGL, see ../ripple-image)
 *   LABEL    dash stretches, category slides right   (CSS, see project-card.module.css)
 *
 * This file only builds the HTML. The picture effect lives in the reusable
 * RippleImage, so any other picture on the site can use it too.
 */

type ProjectCardProps = {
  /** Where the card links to, e.g. "/work/cartier" */
  href: string;
  /** Project name, e.g. "Cartier" */
  name: string;
  /** Small grey text after the dash, e.g. "Luxury" */
  category: string;
  /** Image path, e.g. "/images/cartier.jpg" */
  imageSrc: string;
  /** Describe the image for screen readers */
  imageAlt: string;
};

export function ProjectCard({
  href,
  name,
  category,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link href={href} className={styles.card}>
      {/* PART 1: the picture. Ripples when the cursor moves over it. */}
      <RippleImage
        src={imageSrc}
        alt={imageAlt}
        sizes="(max-width: 900px) 92vw, 46vw"
        className={styles.image}
        imageClassName={styles.img}
      />

      {/* PART 2: the label row. The dash and category animate when hovered. */}
      <h3 className={styles.label}>
        <span>{name}</span>

        <span className={styles.suffixWrapper}>
          {/* Decorative line, hidden from screen readers. Stretches on hover. */}
          <span className={styles.dash} aria-hidden="true" />

          {/* Slides to the right on hover. */}
          <span className={styles.category}>{category}</span>
        </span>
      </h3>
    </Link>
  );
}
