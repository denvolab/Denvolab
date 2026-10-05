import Image from "next/image";
import type { CSSProperties } from "react";
import { getAboutHero } from "@/lib/data/about";
import { Button } from "@/components/ui/button";
import styles from "./about-hero.module.css";
const boxes = [[0,0,292,343],[324,0,292,239],[648,80,383,288],[1063,0,467,281],[1562,25,278,343]];
export async function AboutHero() {
 const hero=await getAboutHero();
 return <section className="about-final-hero" data-figma-node="919:8721"><div className="about-final-inner"><div className="about-final-hero-copy"><h1>{hero.headline}</h1><div><p>{hero.description}</p><Button href={hero.cta.href} className="home-button">{hero.cta.label}</Button></div></div><ul className="about-final-photos">{hero.photos.map((photo,i)=>{const [x,y,w,h]=boxes[i];return <li key={photo.imageSrc} className={styles.photo} style={{left:`${x/1840*100}%`,top:`${y/368*100}%`,width:`${w/1840*100}%`,height:`${h/368*100}%`,"--photo-delay":`${80+i*140}ms`,"--bob":i%2?"5px":"-5px"} as CSSProperties}>{photo.imageSrc&&<Image src={photo.imageSrc} alt={photo.alt} fill sizes="(min-width:1024px) 25vw, 30vw" className="object-cover" priority />}</li>})}</ul></div></section>;
}
