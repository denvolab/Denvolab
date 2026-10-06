import { getContactCtaContent } from "@/lib/data/homepage";
import { Button } from "@/components/ui/button";
import type { ContactCtaContent } from "@/types/homepage";
import "@/app/home.css";

interface ContactCtaProps { content?: ContactCtaContent; attribution?: string; }

/** The same current closing design on detail pages, with their own copy. */
export async function ContactCta({ content, attribution }: ContactCtaProps = {}) {
  const cta = content ?? (await getContactCtaContent());
  return <section className="home-closing" data-wash="off" data-section-height="content">
    <div className="home-closing-invitation">
      <h2>Let’s Craft.<br />Together.</h2>
      <div><p>{cta.description}</p><Button href={cta.cta.href} className="home-button">{cta.cta.label}</Button></div>
    </div>
    {attribution ? <p className="home-closing-credit">{attribution}</p> : null}
  </section>;
}
