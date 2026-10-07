import { CountUp } from "@/components/ui/count-up/count-up";
import Image from "next/image";
import { getAboutStory } from "@/lib/data/about";
import { ScrollTextReveal } from "@/components/ui/scroll-text-reveal";
export async function AboutStory(){const story=await getAboutStory();return <section className="about-final-story" id="our-craft" data-figma-node="899:6922"><h2><ScrollTextReveal text={story.heading}/></h2><div className="about-final-story-row"><div className="about-final-story-photo" data-image-reveal="">{story.image.imageSrc&&<Image src={story.image.imageSrc} alt={story.image.alt} fill sizes="(min-width:1024px) 40vw,100vw" className="object-cover"/>}</div><div className="about-final-story-copy"><div>{story.paragraphs.map(p=><p key={p}>{p}</p>)}</div><ul>{story.stats.map(s=><li key={s.label}><div><strong><CountUp value={s.value}/></strong><h3>{s.label}</h3></div><p>{s.description}</p></li>)}</ul></div></div></section>}
