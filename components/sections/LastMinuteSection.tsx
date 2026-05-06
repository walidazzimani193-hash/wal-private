"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: [0.25, 0.46, 0.45, 0.94] });
    return controls.stop;
  }, [inView, count, to, duration]);

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  );
}

export function LastMinuteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F8F5F0] py-28 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Texte */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="sep text-[#C4A882] text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
            LAST MINUTE
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Besoin d&apos;un
            <br />
            coiffeur{" "}
            <em style={{ fontStyle: "italic", color: "#C4A882" }}>maintenant ?</em>
          </h2>
          <p className="text-[#6B6B6B] text-sm leading-relaxed mt-6 max-w-md">
            Notre fonctionnalité Last Minute vous met en relation avec un professionnel
            disponible immédiatement près de chez vous, sans rendez-vous, en quelques secondes.
          </p>
          <Link
            href="/clients"
            className="group inline-flex items-center gap-3 mt-8 px-7 py-3.5 bg-[#0A0A0A] text-white text-xs tracking-[0.2em] hover:bg-[#C4A882] hover:text-[#0A0A0A] transition-all duration-300"
          >
            EN SAVOIR PLUS
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Cercle animé */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative w-72 h-72">
            {/* Cercle extérieur tournant */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#C4A882]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Point sur le cercle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C4A882]/60" />
            </motion.div>

            {/* Cercle moyen tournant en sens inverse */}
            <motion.div
              className="absolute inset-6 rounded-full border border-[#C4A882]/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Cercle intérieur fixe */}
            <div className="absolute inset-12 rounded-full border border-[#C4A882]/08" />

            {/* Contenu central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "72px",
                  fontWeight: 300,
                  color: "#C4A882",
                  lineHeight: 1,
                }}
              >
                &lt; <CountUp to={5} />
              </span>
              <span
                className="text-[#6B6B6B] text-xs mt-2"
                style={{ letterSpacing: "0.2em" }}
              >
                MINUTES
              </span>
              <span className="text-[#6B6B6B] text-xs mt-1.5 opacity-70">
                pour être mis en relation
              </span>
            </div>

            {/* Pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#C4A882]/10"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
