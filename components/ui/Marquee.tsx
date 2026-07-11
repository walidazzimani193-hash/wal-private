"use client";
import { Fragment } from "react";

interface MarqueeProps {
  items: string[];
  /** durée d'un cycle complet en secondes */
  duration?: number;
  className?: string;
}

/**
 * Bandeau défilant infini (réassurance home).
 * Les items sont dupliqués pour une boucle sans couture (translateX -50%).
 * Pause au survol. Respecte prefers-reduced-motion via la classe motion-safe.
 */
export function Marquee({ items, duration = 28, className = "" }: MarqueeProps) {
  return (
    <div
      className={`group overflow-hidden whitespace-nowrap border-b border-[var(--vert)]/12 py-[22px] ${className}`}
      aria-hidden="true"
    >
      <div
        className="inline-flex gap-16 motion-safe:animate-[wal-marquee_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="inline-flex items-center gap-3.5 text-[12.5px] tracking-[0.14em]"
              >
                <span className="h-[6px] w-[6px] shrink-0 rotate-45 border border-[var(--laiton)]/70 bg-transparent" />
                {item}
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
