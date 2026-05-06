"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/coiffeurs", label: "Pour les coiffeurs" },
  { href: "/clients", label: "Pour les clients" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-white/70 hover:text-white text-sm transition-colors duration-200 group"
              style={{ fontSize: "13px", letterSpacing: "0.04em" }}
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#C4A882] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/coiffeurs"
            className="text-white border border-[#C4A882] hover:bg-[#C4A882] hover:text-[#0A0A0A] px-5 py-2.5 text-xs tracking-widest transition-all duration-300"
            style={{ letterSpacing: "0.15em" }}
          >
            REJOINDRE
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="block w-6 h-px bg-white origin-center"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-white"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-white origin-center"
            animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-8 flex flex-col gap-1 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {navLinks.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <Link
                  href={href}
                  className="block text-white/80 hover:text-white text-base py-3 border-b border-white/5 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="mt-4"
            >
              <Link
                href="/coiffeurs"
                className="block text-center text-white border border-[#C4A882] hover:bg-[#C4A882] hover:text-[#0A0A0A] px-5 py-3 text-xs tracking-widest transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                REJOINDRE
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
