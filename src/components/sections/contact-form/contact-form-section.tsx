import { getContactForm, getContactSidebar } from "@/lib/data/contact";
import { ContactForm } from "./contact-form";
import { ContactSidebar } from "./contact-sidebar";
export async function ContactFormSection(){const [form,sidebar]=await Promise.all([getContactForm(),getContactSidebar()]);return <section id="contact-form" className="site-contact-section" data-figma-node="585:1534"><div className="site-contact-card"><ContactSidebar content={sidebar}/><ContactForm content={form}/></div></section>}
