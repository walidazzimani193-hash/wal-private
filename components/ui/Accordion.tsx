"use client";
import { useState } from "react";

export interface AccordionItem {
  q: string;
  /** réponse : string simple ou JSX (pour liens internes) */
  a: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * FAQ en accordéons — un seul ouvert à la fois.
 * Animation fluide via grid-template-rows 0fr → 1fr (pas de hauteur en JS).
 */
export function Accordion({ items, className = "" }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border-b border-[var(--vert)]/14 first:border-t"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 py-[22px] px-1 text-left transition-[padding] duration-[400ms] [transition-timing-function:var(--ease)] hover:pl-3"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "21px",
                fontWeight: 500,
                color: "var(--vert)",
              }}
            >
              {item.q}
              <span
                className={`shrink-0 text-[18px] text-[var(--laiton-texte)] transition-transform duration-[450ms] [transition-timing-function:var(--ease)] ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-[550ms] [transition-timing-function:var(--ease)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[640px] px-1 pb-6 text-[14.5px] leading-relaxed text-[var(--vert)]/80">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
