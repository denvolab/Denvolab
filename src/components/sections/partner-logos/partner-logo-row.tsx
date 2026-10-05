import Image from "next/image";
import type { PartnerLogo } from "@/types/homepage";
import { cn } from "@/lib/utils/cn";
import styles from "./partner-logos.module.css";

export function PartnerLogoMark({ logo, duplicate = false }: { logo: PartnerLogo; duplicate?: boolean }) {
  return <div className={styles.mark} aria-hidden={duplicate || undefined}>
    {logo.logoSrc ? <Image src={logo.logoSrc} alt={duplicate ? "" : logo.name} width={144} height={48} className={styles.image} /> : <span>{logo.name}</span>}
  </div>;
}

export function PartnerLogoRow({ logos, reverse = false }: { logos: PartnerLogo[]; reverse?: boolean }) {
  return <div className={styles.row}>
    <div className={cn(styles.track, reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll")}>
      {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 || undefined}>
        {logos.map(logo => <PartnerLogoMark key={logo.name} logo={logo} duplicate={copy === 1} />)}
      </div>)}
    </div>
    <div aria-hidden="true" className={styles.fadeLeft} />
    <div aria-hidden="true" className={styles.fadeRight} />
  </div>;
}
