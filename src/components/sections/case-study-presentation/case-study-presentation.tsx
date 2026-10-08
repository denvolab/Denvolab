import { AnimatedAnchor } from "@/components/ui/animated-link/animated-link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import type { CaseStudyImage } from "@/types/case-study";
import type { CaseStudyPresentation as Presentation } from "@/types/case-presentation";
import styles from "./case-study-presentation.module.css";
import { CaseStudyHighlighter } from "./case-study-highlighter";

const assets = "/images/case-studies/job-sea/current/";
const icons = { industry: "imgIndustryBriefcase.svg", services: "imgServicesUiLayout.svg", timeline: "imgTimelineCalendar.svg" };

function Mockup({ image, className = "", sizes = "(min-width: 1920px) 1840px, 96vw", eager = false }: {
  image: CaseStudyImage; className?: string; sizes?: string; eager?: boolean;
}) {
  return <div className={`${styles.mockup} ${className}`}>
    <Image src={image.src} alt={image.alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} className={styles.fittedImage} />
  </div>;
}

export function CaseStudyPresentation({ content, name }: { content: Presentation; name: string }) {
  const { brand, solution } = content;
  const theme = { "--project-primary": brand.primary, "--project-surface": brand.surface, "--project-font": brand.fontFamily } as CSSProperties;
  return <article className={`${styles.presentation} ${content.designVariant === "travel" ? styles.travel : ""}`} style={theme} aria-label={`${name} case study`}>
    <section data-section-height="content" data-wash="off" data-hero="" className={`${styles.band} ${styles.hero}`} aria-labelledby="case-title">
      <div className={styles.editorial}>
        <h1 id="case-title">{content.title}</h1>
        <div className={styles.heroSummary}><p>{content.summary}</p><Button href="/contact" size="lg" className={styles.talk}>LET’S TALK</Button></div>
      </div>
      <dl className={styles.facts}>{content.facts.map(fact => <div key={fact.icon}>
        <Image src={assets + icons[fact.icon]} alt="" width={48} height={48} />
        <div><dt>{fact.title}</dt><dd>{fact.value}</dd></div>
      </div>)}</dl>
      <Mockup image={content.hero} className={styles.heroImage} eager />
    </section>
    <section data-section-height="content" data-wash="off" className={`${styles.band} ${styles.overview}`} aria-label="Project overview">
      <p className={styles.statement}><CaseStudyHighlighter text={`${content.intro.lead ?? ""}${content.intro.text}`} /></p>
      {content.video ? <video className={styles.video} controls playsInline preload="none" poster={content.overview.src} aria-label={`${name} product walkthrough`}>
        <source src={content.video.src} type={content.video.type ?? "video/mp4"} />
        {content.video.captions && <track kind="captions" src={content.video.captions} srcLang="en" label="English" />}
        <AnimatedAnchor href={content.video.src}>Watch the {name} walkthrough</AnimatedAnchor>
      </video> : <Mockup image={content.overview} className={styles.showcaseImage} />}
    </section>
    <section data-section-height="content" data-wash="off" className={`${styles.band} ${styles.campaign}`} aria-labelledby="case-challenge">
      <div className={`${styles.textColumn} ${styles.story}`}><h2 id="case-challenge">The Challenge</h2><p>{content.challenge}</p></div>
      <Mockup image={content.banner} className={styles.bannerImage} />
      <div className={`${styles.textColumn} ${styles.solution}`}><h2 id="case-solution">The Solution</h2><p>{solution.body}</p>
        <div className={styles.featureCards}>{solution.cards.map(card => <div className={styles.featureCard} key={card.title}>
          <div><h3>{card.title}</h3><p>{card.description}</p></div>
          <Mockup image={card.image} className={styles.featureImage} sizes="(min-width: 1280px) 23vw, (min-width: 640px) 30vw, 90vw" />
        </div>)}</div>
      </div>
    </section>
    <section data-section-height="content" data-wash="off" className={`${styles.band} ${styles.branding}`} aria-label={`${name} branding applications`}>
      <div className={styles.collage}>{[0, 1, 2].map(column => <div className={styles.collageColumn} key={column}>
        {[0, 1].map(row => {
          const index = column * 2 + row;
          if (index === 2 && content.quote) return <figure key={index} className={styles.quote}>
            <Image src={assets + "imgGroup.svg"} alt="" width={68} height={56} className={styles.quoteMark} />
            <blockquote>{content.quote.text}</blockquote>
            <div className={styles.quotePhone}><Image src={content.quote.phone.src} alt="Job Sea on a phone" fill sizes="20vw" className={styles.fittedImage} /></div>
            <div className={styles.quoteScreen}><Image src={content.quote.screen.src} alt="" fill sizes="45vw" className={styles.screenLayer} /></div>
            <Image src={assets + "imgRectangle80.svg"} alt="" width={223} height={285} className={styles.quoteReflection} />
          </figure>;
          return <Mockup key={index} image={content.collage[index]} sizes="(min-width: 1280px) 31vw, (min-width: 640px) 45vw, 90vw" />;
        })}
      </div>)}</div>
    </section>
    <section data-section-height="content" data-wash="off" className={`${styles.band} ${styles.guidelines}`} style={{ background: brand.background }} aria-label={`${name} brand guidelines`}>
      <div className={styles.brandLayout}>
        {brand.glyph ? <Mockup image={brand.glyph} className={styles.glyphArtwork} sizes="30vw" /> : <div className={styles.glyph} aria-hidden="true">Aa</div>}
        <div className={styles.typePanel}>
          <div className={styles.specimen}><h2>{brand.fontName}</h2><p>{"A B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z\n\na b c d e f g h i j k l m\nn o p q r s t u v w x y z"}</p><p className={styles.weights}><span>Regular</span><Image src="/images/case-studies/weight-separator.svg" alt="" width={8} height={8} className={styles.weightSeparator} /><span>Medium</span><Image src="/images/case-studies/weight-separator.svg" alt="" width={8} height={8} className={styles.weightSeparator} /><strong>Bold</strong></p></div>
          <div className={styles.logoGrid} style={{ background: brand.gridBackground }}><Mockup image={brand.grid} className={styles.gridArtwork} sizes="(min-width: 1280px) 36vw, 90vw" />{brand.logo && <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} className={styles.projectLogo} />}</div>
        </div>
      </div>
      <dl className={styles.palette}>{brand.swatches.map(swatch => <div className={styles.swatch} key={swatch.name}>
        <div className={styles.colorSample} style={{ backgroundColor: swatch.sampleColor ?? swatch.hex }} />
        <div className={styles.colorDetails}><dt>{swatch.name}</dt><dd>{swatch.hex.toUpperCase()}</dd></div>
      </div>)}</dl>
    </section>
    <section data-section-height="content" data-wash="off" className={`${styles.band} ${styles.gallery}`} aria-label={`${name} responsive product screens`}>
      {content.gallery.map((image, index) => <figure className={styles.journeyPanel} key={`${image.src}-${index}`}><Mockup image={image} className={styles.galleryImage} /></figure>)}
    </section>
  </article>;
}
