"use client";

// ---------------------------------------------------------------------------
// TeamRoster — the interactive half of AboutTeam: the member list on the left
// and the single tall portrait on the right, swapping to show whichever
// member's row is hovered. This is Figma's own intent for the "Team Row"
// component (its Hover variant is "meant for the member whose portrait is
// showing", see claude/team-section.md in the project docs) — it just
// couldn't be wired up until real per-person photos existed.
//
// Client Component only because it needs hover state; AboutTeam itself stays
// a Server Component and passes the already-fetched members down as props.
// ---------------------------------------------------------------------------
import Image from "@/components/ui/responsive-image/responsive-image";
import { useState } from "react";

import type { AboutTeamMember } from "@/types/about";

interface TeamRosterProps {
  members: AboutTeamMember[];
}

export function TeamRoster({ members }: TeamRosterProps) {
  const defaultIndex = members.findIndex((member) => member.imageSrc);
  const [activeIndex, setActiveIndex] = useState(
    defaultIndex === -1 ? null : defaultIndex,
  );
  const active = activeIndex !== null ? members[activeIndex] : null;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      <div data-image-reveal="" className="relative aspect-[592/720] w-full max-w-[420px] overflow-hidden rounded-2xl bg-surface-secondary lg:order-2 lg:w-[32.2%] lg:max-w-[592px] lg:shrink-0">
        {active?.imageSrc && (
          <Image
            key={active.imageSrc}
            src={active.imageSrc}
            alt={active.name}
            fill
            sizes="(min-width: 1024px) 32vw, 420px"
            className="object-cover"
          />
        )}
      </div>

      <ul
        className="w-full border-b border-border-primary lg:order-1 lg:flex-1"
        onMouseLeave={() =>
          setActiveIndex(defaultIndex === -1 ? null : defaultIndex)
        }
      >
        {members.map((member, index) => (
          <li
            key={member.name}
            tabIndex={0}
            onFocus={() => member.imageSrc && setActiveIndex(index)}
            onClick={() => member.imageSrc && setActiveIndex(index)}
            onMouseEnter={() => member.imageSrc && setActiveIndex(index)}
            className="flex flex-col gap-1 border-t border-border-primary px-4 py-6 transition-colors hover:bg-surface-primary md:flex-row md:items-center md:gap-0"
          >
            <p className="font-sans text-heading-3 text-foreground md:flex-1">
              {member.name}
            </p>
            <p className="font-sans text-body-lg text-foreground-muted md:w-2/5">
              {member.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
