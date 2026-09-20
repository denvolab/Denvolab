import type { PartnerLogo } from "@/types/homepage";
import { cn } from "@/lib/utils/cn";

// Shared by both rows in partner-logos.tsx — split out purely so each row can
// pick its own scroll direction (`reverse`) without repeating the
// marquee/edge-fade markup. No interactivity, so this stays a plain Server
// Component like everything else in sections/.
export function PartnerLogoRow({
  logos,
  reverse = false,
}: {
  logos: PartnerLogo[];
  reverse?: boolean;
}) {
  const track = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={cn(
          "flex w-max items-center gap-9 py-6",
          reverse ? "animate-marquee-scroll-reverse" : "animate-marquee-scroll",
        )}
      >
        {track.map((logo, i) =>
          logo.logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- swapped for next/image once real client logos land
            <img
              key={i}
              src={logo.logoSrc}
              alt={logo.name}
              className={cn("h-12 shrink-0 object-contain", logo.size === "wide" ? "w-36" : "w-[103px]")}
            />
          ) : (
            <div
              key={i}
              className={cn(
                "flex h-12 shrink-0 items-center justify-center rounded-md border border-border-subtle",
                logo.size === "wide" ? "w-36" : "w-[103px]",
              )}
            >
              <span className="font-mono text-caption-md text-foreground-subtle">{logo.name}</span>
            </div>
          ),
        )}
      </div>

      {/* Edge fades — plain white-to-transparent gradients over the track,
          matching the Figma source's "Shadow" elements exactly (250px,
          white at 30% in, fading to transparent). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-background from-30% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-background from-30% to-transparent"
      />
    </div>
  );
}
