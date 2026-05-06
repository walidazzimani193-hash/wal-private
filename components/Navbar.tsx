"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span
            className="text-white leading-none tracking-[0.06em]"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "26px",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            WAL
          </span>
          <span
            className="text-[#C4A882] tracking-[0.35em] leading-none"
            style={{ fontSize: "9px", fontWeight: 400, letterSpacing: "0.35em" }}
          >
            PRIVATE
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { href: "/coiffeurs", label: "Pour les coiffeurs" },
            { href: "/clients", label: "Pour les clients" },
            { href: "/a-propos", label: "À propos" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white/70 hover:text-white text-sm tracking-wide transition-colors duration-200"
              style={{ fontSize: "13px", letterSpacing: "0.04em" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/coiffeurs"
            className="text-white border border-[#C4A882] hover:bg-[#C4A882] hover:text-[#0A0A0A] px-5 py-2.5 text-xs tracking-widest transition-all duration-300"
            style={{ letterSpacing: "0.15em" }}
          >
            REJOINDRE
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-8 flex flex-col gap-6">
          {[
            { href: "/coiffeurs", label: "Pour les coiffeurs" },
            { href: "/clients", label: "Pour les clients" },
            { href: "/a-propos", label: "À propos" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white/80 text-base"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/coiffeurs"
            className="mt-2 text-center text-white border border-[#C4A882] hover:bg-[#C4A882] hover:text-[#0A0A0A] px-5 py-3 text-xs tracking-widest transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            REJOINDRE
          </Link>
        </div>
      )}
    </header>
  );
}
