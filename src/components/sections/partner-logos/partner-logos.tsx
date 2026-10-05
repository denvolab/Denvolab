import { getPartnerLogos } from "@/lib/data/homepage";
import { PartnerLogoRow, PartnerLogoMark } from "./partner-logo-row";
import styles from "./partner-logos.module.css";

// The updated Figma places both rows inside the dark AI workflow section.
export async function PartnerLogos() {
  const logos = await getPartnerLogos();
  return <div className={styles.logos} data-wash="off" data-figma-node="860:4626" aria-label="Case study brands">
    <div className={styles.mobile}>
      {logos.map(logo => <PartnerLogoMark key={logo.name} logo={logo} />)}
    </div>
    <div className={styles.desktop}>
      <PartnerLogoRow logos={logos} />
      <PartnerLogoRow logos={logos} reverse />
    </div>
  </div>;
}
