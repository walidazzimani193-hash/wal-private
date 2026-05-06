"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Radial glow avec parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(196,168,130,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ligne top qui se dessine */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(196,168,130,0.4), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Ligne bottom subtile */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(196,168,130,0.15), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Contenu principal avec parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Eyebrow */}
        <motion.p
          className="sep text-[#C4A882]/70 text-xs"
          style={{ letterSpacing: "0.3em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          MARRAKECH
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          className="text-white leading-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(64px, 12vw, 140px)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          WAL{" "}
          <em style={{ fontStyle: "italic", color: "#C4A882", fontWeight: 300 }}>
            Private
          </em>
        </motion.h1>

        {/* Séparateur fin */}
        <motion.div
          className="w-16 h-px bg-[#C4A882]/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Tagline */}
        <motion.p
          className="text-white/50 max-w-md"
          style={{ fontSize: "16px", lineHeight: "1.8", fontWeight: 300 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Le coiffeur privé, à votre porte.
          <br />
          Professionnels certifiés. À domicile.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/coiffeurs"
            className="group relative px-8 py-4 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] font-medium overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300">DEVENIR COIFFEUR WAL</span>
            <span className="absolute inset-0 bg-[#D4B896] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
          </Link>
          <Link
            href="/clients"
            className="px-8 py-4 border border-white/30 text-white text-xs tracking-[0.2em] hover:border-[#C4A882] hover:text-[#C4A882] transition-all duration-300"
          >
            DÉCOUVRIR LE SERVICE
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          className="text-white/25 text-xs"
          style={{ letterSpacing: "0.25em" }}
        >
          DÉFILER
        </span>
        <div className="w-px h-12 overflow-hidden relative">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-[#C4A882]/50 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
