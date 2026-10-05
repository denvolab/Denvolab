// ---------------------------------------------------------------------------
// AboutTeam — "We care about the craft..." (Figma node 431:6464): the closing
// statement over a list of the eight people on the left and a tall portrait on
// the right. Server Component: content from lib/data/about.ts.
//
// Figma numbers: 96px top and bottom padding, 96px between the heading (60/68,
// 813px wide) and the list. The portrait is 592 x 720 with 16px corners and a
// 32px gap to the list. Each row has a 1px top border, 16px side padding and
// 24px top and bottom; the name (28/36, semibold) takes the left part and the
// role (18/28, secondary) a 474px column on the right, which is 40% of the row.
// The list also has a 1px bottom border.
//
// The list + portrait pairing is TeamRoster, a small Client Component — it
// swaps the portrait to whichever member's row is hovered, see that file's
// own comments. Below lg the portrait moves above the list so the list keeps
// the full width.
// ---------------------------------------------------------------------------
import { getAboutTeam } from "@/lib/data/about";
import { TeamRoster } from "./team-roster";
import { AnimatedText } from "@/components/ui/animated-text";

export async function AboutTeam() {
  const team = await getAboutTeam();

  return (
    <section className="bg-background-secondary" data-figma-node="431:6464">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-5 py-16 md:gap-16 md:px-10 md:py-20 xl:gap-24 xl:py-24">
        <h2 className="max-w-[813px] font-heading text-display-xl text-foreground">
          <AnimatedText>
            {team.heading}
          </AnimatedText>
        </h2>

        <p className="site-team-description">Meet the people who ask the questions, shape the experience, and bring the pieces together.</p>
        <TeamRoster members={team.members} />
      </div>
    </section>
  );
}
