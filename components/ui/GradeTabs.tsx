"use client";
import { useEffect, useRef, useState } from "react";

export interface Grade {
  roman: string;
  label: string;
  /** borne basse du prix (MAD) */
  min: number;
  /** borne haute ; 0 = ouvert ("1 000 +") */
  max: number;
  desc: string;
}

interface GradeTabsProps {
  grades: Grade[];
  /** index présélectionné (Confirmé = 1 par défaut) */
  defaultIndex?: number;
}

const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/ |\s/g, " ");

function priceLabel(min: number, max: number, t: number) {
  const lo = Math.round(min * t);
  const hi = Math.round(max * t);
  return max === 0 ? `${fmt(lo)} +` : `${fmt(lo)} – ${fmt(hi)}`;
}

/**
 * Onglets de grades (sur fond sombre) : crossfade des panneaux
 * + compteur de prix qui s'anime (easeOutCubic) à chaque changement.
 * Respecte prefers-reduced-motion (affiche le prix final directement).
 */
export function GradeTabs({ grades, defaultIndex = 1 }: GradeTabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const [display, setDisplay] = useState(() =>
    priceLabel(grades[defaultIndex].min, grades[defaultIndex].max, 1)
  );
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const g = grades[active];
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(priceLabel(g.min, g.max, 1));
      return;
    }

    const start = performance.now();
    const dur = 650;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const t = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(priceLabel(g.min, g.max, t));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, grades]);

  return (
    <div>
      {/* Onglets */}
      <div className="mt-11 flex flex-wrap gap-2" role="tablist">
        {grades.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.roman}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`px-[26px] py-3 transition-[background-color,color,border-color,transform] duration-[450ms] [transition-timing-function:var(--ease)] hover:-translate-y-0.5 ${
                on
                  ? "bg-[var(--ivoire)] text-[var(--vert)] border border-[var(--ivoire)]"
                  : "border border-[var(--ivoire)]/30 text-[var(--ivoire)] hover:border-[var(--ivoire)]/70"
              }`}
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "19px" }}
            >
              <span className="mr-2 text-[15px] opacity-55">{g.roman}</span>
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Panneau actif */}
      <div className="relative mt-[34px] min-h-[150px]">
        {grades.map((g, i) => (
          <div
            key={g.roman}
            className={`absolute inset-0 flex items-baseline gap-[50px] max-[680px]:flex-col max-[680px]:gap-3.5 transition-[opacity,transform] duration-[550ms] [transition-timing-function:var(--ease)] ${
              i === active
                ? "opacity-100 translate-y-0"
                : "pointer-events-none translate-y-3.5 opacity-0"
            }`}
          >
            <div
              className="shrink-0 leading-[1.1] text-[var(--laiton)] [font-variant-numeric:tabular-nums]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "46px" }}
            >
              {i === active ? display : priceLabel(g.min, g.max, 1)}
              <small className="mt-1.5 block font-[var(--font-manrope)] text-[11px] tracking-[0.2em] opacity-60">
                MAD / PRESTATION
              </small>
            </div>
            <p className="max-w-[420px] text-[15px] opacity-80">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
