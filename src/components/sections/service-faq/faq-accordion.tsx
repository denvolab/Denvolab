"use client";

// ---------------------------------------------------------------------------
// FaqAccordion: the question cards of the service FAQ (Figma component
// "Service / FAQ accordion", State=Open / State=Closed).
//
// Card: 1px border, 32px padding, radius 12. Question (H4, 960px) and a
// 32px plus/minus icon 24px apart; the answer (Body/LG, 960px) sits 24px
// under the question when open. Open card: Brand/50 fill and either the
// lime focus border (pages 01-02) or the normal grey one (03-07); closed
// card: white with the grey border.
//
// Behaviour: one card open at a time, the first one open on load (as the
// design shows). Clicking the open card closes it. The answer slides open
// with a grid-rows transition (0fr -> 1fr), so no height is measured in JS;
// with reduced motion it opens instantly.
// ---------------------------------------------------------------------------
import { useId, useState } from "react";
import { ServiceGlyph } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils/cn";

interface FaqAccordionProps {
  items: { question: string; answer: string }[];
  /** Space between cards, px. */
  gap: number;
  openBorder: "focus" | "primary";
}

export function FaqAccordion({ items, gap, openBorder }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex min-w-0 flex-1 flex-col" style={{ gap }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;

        return (
          <div
            key={item.question}
            data-faq-card=""
            data-open={isOpen}
            className={cn(
              "rounded-[12px] border p-5 transition-colors duration-300 md:p-8",
              isOpen
                ? cn("bg-brand-50", openBorder === "focus" ? "border-border-focus" : "border-border-primary")
                : "border-border-primary bg-surface-primary",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-focus md:gap-6"
              >
                <span className="min-w-0 flex-1 font-sans text-heading-4 text-text-primary">{item.question}</span>
                <ServiceGlyph name={isOpen ? "minus" : "plus"} className="text-text-primary" />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className="max-w-[960px] pt-4 font-sans text-body-lg text-text-secondary md:pt-6"
                  // Closed answers stay in the page (for search engines) but
                  // are hidden from screen readers and the tab order.
                  aria-hidden={!isOpen}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
