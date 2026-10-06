import Link from "@/components/ui/animated-link/animated-link";
import Image from "next/image";
import { getFooterColumns } from "@/lib/data/footer";
import { Button } from "@/components/ui/button";
import { LensDistortion } from "@/components/ui/lens-distortion";

export function HomeConversation() {
  return <section className="home-conversation" data-figma-node="919:17872"><LensDistortion aberration={0.02} className="home-conversation-lens"><div className="home-conversation-inner"><h2>That idea you keep coming back to? Tell us about it.</h2><div><p>You don’t need a finished brief. A conversation is enough to begin.</p><Button href="/contact" className="home-button home-talk">LET’S TALK</Button></div></div></LensDistortion></section>;
}
export async function HomeClosing({ invitation = true }: { invitation?: boolean } = {}) {
  const columns = await getFooterColumns();
  return <div className="home-closing" data-wash="off" data-figma-node="972:7609">
    {invitation && <section className="home-closing-invitation" data-section-height="content"><h2>Let’s Craft.<br />Together.</h2><div><p>Tell us what you want to bring into the world. We’ll help shape the next step.</p><Button className="home-button" href="/contact">LET’S CRAFT</Button></div></section>}
    <footer className="home-footer"><div className="home-footer-top"><div className="home-footer-brand"><Link href="/" aria-label="Denvo Lab home"><Image className="home-footer-logo" src="/images/home/lockup.svg" alt="Denvo Lab — AI driven solution" width={330} height={120} /></Link><p className="home-footer-copyright">© {new Date().getFullYear()} Denvolab. All rights reserved.</p></div><nav aria-label="Footer">{columns.map(column => <div className="home-footer-column" key={column.title}><h3>{column.title}</h3><ul>{column.links.map(link => <li key={link.label}><Link href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label.toUpperCase()}</Link></li>)}</ul></div>)}</nav></div><Image className="home-footer-signature" src="/images/home/signature.svg" width={1840} height={302} alt="DENVOLAB" /></footer>
  </div>;
}
