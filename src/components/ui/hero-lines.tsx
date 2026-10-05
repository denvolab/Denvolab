/** Figma hero grid: paired edges with the original fading stroke. */
export function HeroLines() {
  return <div className="hero-lines" aria-hidden="true">{Array.from({length:7},(_,i)=><span key={i}/>)}</div>;
}
