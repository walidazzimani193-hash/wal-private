"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/** Sceau WAL — monogramme W dans un double cercle, laiton */
function Seal() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 84 84"
      fill="none"
      className="transition-transform duration-[800ms] [transition-timing-function:var(--ease)] group-hover:rotate-180"
    >
      <circle cx="42" cy="42" r="40" stroke="#A9885A" strokeWidth="2" />
      <circle cx="42" cy="42" r="33" stroke="#A9885A" strokeWidth="0.8" opacity="0.5" />
      <text
        x="42"
        y="55"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="38"
        fill="#A9885A"
      >
        W
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 -mb-[78px] transition-[background-color,backdrop-filter] duration-500 ${
        scrolled ? "bg-[var(--nuit)]/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1080px] items-center justify-between px-8 transition-[height] duration-500 [transition-timing-function:var(--ease)] ${
          scrolled ? "h-[62px]" : "h-[78px]"
        }`}
      >
        {/* Marque */}
        <Link
          href="/"
          className="group flex items-center gap-[11px] tracking-[0.04em] text-[var(--ivoire)]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px" }}
        >
          <Seal />
          WAL <em className="italic text-[var(--laiton)]">Private</em>
        </Link>

        {/* Liens droite */}
        <div className="flex items-center gap-4 sm:gap-[26px]">
          {/* Desktop : libellé complet, recrutement */}
          <Link
            href="/coiffeurs"
            className="group relative hidden text-[12px] tracking-[0.12em] text-[var(--ivoire)] opacity-70 transition-opacity duration-300 hover:opacity-100 sm:block"
          >
            VOUS ÊTES COIFFEUR ?
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[var(--laiton)] transition-transform duration-[400ms] [transition-timing-function:var(--ease)] group-hover:origin-left group-hover:scale-x-100" />
          </Link>
          <Link
            href="/compte"
            className="hidden text-[12px] tracking-[0.12em] text-[var(--ivoire)] opacity-60 transition-opacity duration-300 hover:opacity-100 sm:block"
          >
            MON COMPTE
          </Link>
          {/* Mobile : pastille PRO visible */}
          <Link
            href="/coiffeurs"
            className="border border-[var(--laiton)]/50 px-3 py-2 text-[11px] tracking-[0.12em] text-[var(--laiton)] transition-colors duration-300 hover:bg-[var(--laiton)] hover:text-[var(--nuit)] sm:hidden"
          >
            PRO
          </Link>
          <Link
            href="/reserver"
            className="bg-[var(--laiton)] px-[18px] py-2.5 text-[12px] font-semibold tracking-[0.12em] text-[var(--nuit)] transition-opacity duration-300 hover:opacity-85"
          >
            RÉSERVER
          </Link>
        </div>
      </nav>
    </header>
  );
}
