// ---------------------------------------------------------------------------
// ServiceConversation: the lime closing band of every service page (Figma
// "Conversation / Start something meaningful"). Server Component; the
// effect is the client LensDistortion wrapper.
//
// SAME BANNER AS THE OTHER PAGES: this is the lime conversation banner the
// homepage, About, Services and Case Studies pages already use (the
// `.home-conversation*` classes in app/home.css, same markup as
// SiteConversation / HomeConversation), so its title size, button and column
// split (title and description side by side, 880px each on the 1920 frame,
// stacked on phone) are theirs. Only the copy comes from the service page's
// data (title, description, button, and the shader's aberration). The
// service pages' Figma spacing (120px top/bottom on desktop, so the frame is
// 386px; 64px on tablet; 48px on phone) is set in
// app/services/[slug]/service-detail.css.
//
// `data-homepage` is what home.css scopes the banner's button and heading
// styles to (see SitePage). It is set on this section only, so the rest of
// the service page keeps its own look.
//
// A "\n" in the title is a hard line break typed in Figma, so the heading
// keeps `whitespace-pre-line` (UI/UX page: "Let's make your product / easier
// to love.").
//
// EFFECT: the frame carries Figma's "Lens distortion" shader (Distortion 0,
// Aberration 0.02 on pages 01-02 and 0.03 on 03-07, centre 50/50, Lateral,
// High quality). The text near the left and right edges smears into colour
// fringes and the edges get a bright rim. That is how the design looks, so
// it is reproduced with the same shader maths in WebGL
// (components/ui/lens-distortion). The real text stays in the page.
// ---------------------------------------------------------------------------
import { Button } from "@/components/ui/button";
import { LensDistortion } from "@/components/ui/lens-distortion";
import type { ServiceConversationBlock } from "@/types/service-detail";

export function ServiceConversation({ block }: { block: ServiceConversationBlock }) {
  return (
    <section className="home-conversation" data-homepage="">
      <LensDistortion aberration={block.aberration} className="home-conversation-lens">
        <div className="home-conversation-inner">
          <h2 className="whitespace-pre-line">{block.title}</h2>
          <div>
            <p>{block.description}</p>
            <Button href={block.cta.href} className="home-button home-talk">
              {block.cta.label}
            </Button>
          </div>
        </div>
      </LensDistortion>
    </section>
  );
}
