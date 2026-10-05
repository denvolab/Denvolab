import "@fontsource/dm-mono/latin-500-italic.css";
import { getFooterColumns } from "@/lib/data/footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/seo/site-config";
import styles from "./footer.module.css";

/** Lower half of Figma's Closing Section (860:5668). ContactCta draws the upper half. */
export async function Footer() {
  const columns = await getFooterColumns();
  const wordmark = siteConfig.name.replace(/\s/g, "").toUpperCase();

  return (
    <footer data-site-footer="" data-figma-node="860:5682" data-wash="off" className={styles.footer}>
      <div className={styles.bars} aria-hidden="true" />
      <div className={styles.navigation}>
        <div className={styles.brandRow}>
          {/* Exact full lockup exported from the current Figma footer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/denvolab-footer-logo.svg" alt={siteConfig.name} width={330.309} height={120} className={styles.logo} />
          <nav aria-label="Footer" className={styles.links}>
            {columns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <ul className={styles.linkList}>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Button href={link.href} external={link.external} variant="ghost" className={`font-mono text-white uppercase ${styles.link}`}>
                        {link.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.signature}>
          <p aria-hidden="true" className={styles.wordmark}>{wordmark}</p>
        </div>
        <span className="sr-only">{siteConfig.legalName}. {siteConfig.tagline}</span>
      </div>
    </footer>
  );
}
