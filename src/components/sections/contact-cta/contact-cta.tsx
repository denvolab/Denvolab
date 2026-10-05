import { getContactCtaContent } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";
import type { ContactCtaContent } from "@/types/homepage";
import styles from "@/components/layout/footer/footer.module.css";

interface ContactCtaProps {
  content?: ContactCtaContent;
  attribution?: string;
}

/** Upper half of the current footer design. Retains page-specific copy and credits. */
export async function ContactCta({ content, attribution }: ContactCtaProps = {}) {
  const cta = content ?? (await getContactCtaContent());
  return (
    <section className={styles.closing} data-wash="off" data-section-height="content" data-figma-node="860:5677">
      <div className={styles.bars} aria-hidden="true" />
      <div className={styles.closingInner}>
        <div className={styles.message}>
          <h2 className={styles.headline}><span>Let’s Craft</span><span>Together</span></h2>
          <div className={styles.contact}>
            <p className={styles.description}>{cta.description}</p>
            <Button href={cta.cta.href} variant="primary" size="lg" className={`font-mono ${styles.contactButton}`}>{cta.cta.label}</Button>
          </div>
        </div>
        {attribution ? <p className={styles.credit}>{attribution}</p> : null}
      </div>
    </section>
  );
}
