import Image from "next/image";
const phrases = ["WE DON’T DESIGN", "WE CRAFT FOR PEOPLE", "WE BUILD FOR EVERYDAY LIFE", "EVERY DETAIL HAS A PURPOSE"];
export function MarqueeTagline({about = false}: {about?: boolean} = {}) {
  const items = about ? phrases.slice(1) : phrases;
  return <section className="home-marquee" data-figma-node="230:4231" data-section-height="content" aria-label={phrases.join(". ")}>
    <div className="home-marquee-track animate-marquee-scroll" aria-hidden="true">{[0, 1].map(copy => <div className="home-marquee-group" key={copy}>{items.map(phrase => <div className="home-marquee-item" key={phrase}><p>{phrase}</p><Image src="/icons/marquee-spark.svg" width={96} height={96} alt="" className="animate-spark-spin" /></div>)}</div>)}</div>
  </section>;
}
