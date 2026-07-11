"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

/**
 * Apparition au scroll, ton sur ton — remplace framer-motion.
 * IntersectionObserver (once) + transition CSS. Le contenu reste rendu
 * côté serveur : c'est juste l'enveloppe qui est un îlot client léger.
 * Respecte prefers-reduced-motion (géré en CSS).
 */
export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Déjà passé au-dessus du viewport (scroll rapide, ancre) : révéler direct.
    if (el.getBoundingClientRect().bottom < 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-dir={direction}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
