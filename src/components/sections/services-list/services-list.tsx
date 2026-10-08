import Image from "@/components/ui/responsive-image/responsive-image";
import Link from "@/components/ui/animated-link/animated-link";
import { getServicesList } from "@/lib/data/services";

/** Current service catalogue: desktop, tablet and mobile Figma layouts. */
export async function ServicesList() {
  const { items } = await getServicesList();
  return <section id="services-list" className="services-catalog" data-figma-node="468:1128">
    <div className="services-catalog-inner">{items.map((item, i) => <article className="services-entry" key={item.number} data-press-card="">
      <div className="services-entry-copy">
        <p className="services-entry-number">{item.number}</p>
        <h2><Link href={item.href}>{item.title}</Link></h2>
        <div className="services-entry-description"><p>{item.description}</p><div className="services-entry-bullets">{item.bullets.filter(b => b !== "SEE DETAILS").map(bullet => <p key={bullet}><span aria-hidden="true">—</span><span>{bullet}</span></p>)}</div></div>
        <Link className="services-entry-link" href={item.href}>SEE DETAILS</Link>
      </div>
      <div className="services-entry-image" data-image-reveal="">
        <picture>
          <source media="(max-width: 767px)" srcSet={`/images/services/current/mobile-${i + 1}.png`} />
          <source media="(max-width: 1279px)" srcSet={`/images/services/current/tablet-${i + 1}.png`} />
          <Image src={`/images/services/current/desktop-${i + 1}.png`} alt={`${item.title} — Denvo Lab design examples`} fill sizes="(min-width: 1280px) 46vw, 100vw" />
        </picture>
      </div>
    </article>)}</div>
  </section>;
}
