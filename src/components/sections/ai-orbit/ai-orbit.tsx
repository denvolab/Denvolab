import { PartnerLogos } from "../partner-logos";
import { AiOrbitHub } from "./ai-orbit-hub";
import { AnimatedText } from "@/components/ui/animated-text";
export function AiOrbit() {
  return <section className="home-ai" data-figma-node="589:2426" data-wash="anchor">
    <div className="home-ai-inner @container"><div className="home-ai-heading"><p>AI, WITH A PURPOSE</p><h2><AnimatedText>More room for the details{`\n`}that matter.</AnimatedText></h2></div><AiOrbitHub /></div>
    <PartnerLogos />
  </section>;
}
