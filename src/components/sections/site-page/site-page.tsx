import { AnimatedAnchor } from "@/components/ui/animated-link/animated-link";
import { HeroLines } from "@/components/ui/hero-lines";
import type { ReactNode } from "react";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { LensDistortion } from "@/components/ui/lens-distortion";
import "@/app/home.css";
import "@/app/site-pages.css";
export function SitePage({children,path}:{children:ReactNode;path:string}){return <div data-homepage="" data-site-page={path}>{children}</div>}
export function SiteHero({title,intro,action,href,node}:{title:string;intro:string;action:string;href:string;node:string}){return <section className="site-editorial-hero" data-hero="" data-figma-node={node}><HeroLines/><div><h1><AnimatedText>{title}</AnimatedText></h1><div><p><AnimatedText>{intro}</AnimatedText></p><AnimatedAnchor href={href}>{action} ↓</AnimatedAnchor></div></div></section>}
export function SiteConversation({work=false}:{work?:boolean}){return <section className="home-conversation site-conversation"><LensDistortion aberration={0.02} className="home-conversation-lens"><div className="home-conversation-inner"><h2>{work?'What would you like to craft next?':'Tell us what you’re thinking.'}</h2><div><p>{work?'Tell us about your idea, and we’ll find the next step together.':'A small question, an early idea, or a brief ready to go. We’re here to listen.'}</p><Button href="/contact" className="home-button home-talk">LET’S TALK</Button></div></div></LensDistortion></section>}
