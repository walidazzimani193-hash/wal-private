import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { LastMinuteSection } from "@/components/sections/LastMinuteSection";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

const grades = [
  {
    label: "Novice",
    desc: "Jeunes talents certifiés, tarifs accessibles.",
    price: "150 – 300 MAD",
    roman: "I",
  },
  {
    label: "Confirmé",
    desc: "Professionnels expérimentés, polyvalents.",
    price: "300 – 600 MAD",
    roman: "II",
  },
  {
    label: "Expert",
    desc: "Spécialistes reconnus, haute maîtrise technique.",
    price: "600 – 1 000 MAD",
    roman: "III",
  },
  {
    label: "Maître",
    desc: "Excellence absolue. Clientèle haut de gamme.",
    price: "1 000 MAD +",
    roman: "IV",
  },
];

const steps = [
  { n: "01", title: "Choisissez votre prestation", desc: "Coupe, couleur, brushing, soins — sélectionnez ce dont vous avez besoin." },
  { n: "02", title: "Sélectionnez votre coiffeur", desc: "Parcourez les profils, les notes et les portfolios pour trouver votre expert idéal." },
  { n: "03", title: "Réservez un créneau", desc: "Choisissez la date, l'heure et confirmez votre adresse à Marrakech." },
  { n: "04", title: "Profitez à domicile", desc: "Votre coiffeur arrive équipé. Vous, vous vous détendez." },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── CONCEPT ── */}
      <section className="bg-[#F8F5F0] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="sep text-[#C4A882] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              LE CONCEPT
            </p>
            <h2
              className="text-[#0A0A0A] leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 400,
              }}
            >
              La beauté, sans compromis.
              <br />
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>Chez vous.</em>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                title: "Des professionnels vérifiés",
                desc: "Chaque coiffeur est sélectionné, formé et évalué. Aucune improvisation. Que de l'expertise.",
              },
              {
                title: "À votre rythme",
                desc: "Réservez le soir, le week-end, ou en last minute. WAL s'adapte à votre agenda, pas l'inverse.",
              },
              {
                title: "Pour tous les budgets",
                desc: "Du jeune talent au maître coiffeur — des tarifs transparents pour chaque profil et chaque envie.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="concept-card bg-white p-10 flex flex-col gap-5 group transition-all duration-500 cursor-default h-full">
                  <span className="text-[#C4A882] text-2xl">—</span>
                  <h3
                    className="text-[#0A0A0A] group-hover:text-white transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "26px",
                      fontWeight: 400,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#6B6B6B] group-hover:text-white/50 text-sm leading-relaxed transition-colors duration-500">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="sep text-[#C4A882] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              COMMENT ÇA MARCHE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 400,
              }}
            >
              Simple. Rapide. Élégant.
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E8E4DF]">
            {steps.map((step) => (
              <StaggerItem key={step.n}>
                <div className="bg-white p-10 flex flex-col gap-4 h-full">
                  <span
                    className="text-[#C4A882]/40"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "52px",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </span>
                  <h3
                    className="text-[#0A0A0A]"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "22px",
                      fontWeight: 500,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── LES GRADES ── */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="sep text-[#C4A882]/60 text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              NOS PROFESSIONNELS
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 400,
              }}
            >
              Un grade pour chaque{" "}
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>niveau d&apos;excellence.</em>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Chaque coiffeur est évalué et classé selon ses compétences, ses certifications et les avis clients.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {grades.map((grade) => (
              <StaggerItem key={grade.label}>
                <div className="grade-card bg-[#0A0A0A] border border-white/5 p-10 flex flex-col gap-5 group cursor-default h-full">
                  <span
                    className="text-[#C4A882]/20 group-hover:text-[#C4A882]/50 transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "48px",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {grade.roman}
                  </span>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "24px",
                      fontWeight: 400,
                    }}
                  >
                    {grade.label}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed flex-1">{grade.desc}</p>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[#C4A882] text-xs" style={{ letterSpacing: "0.1em" }}>
                      {grade.price}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── LAST MINUTE ── */}
      <LastMinuteSection />

      {/* ── DOUBLE CTA ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <FadeIn direction="right" className="bg-[#0A0A0A] px-10 md:px-16 py-24 flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-[#C4A882]/60 text-xs tracking-[0.3em]">VOUS ÊTES COIFFEUR</p>
            <h3
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
              }}
            >
              Développez votre clientèle.{" "}
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>Librement.</em>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Rejoignez WAL Private et accédez à une nouvelle source de revenus. Vous choisissez vos horaires, vos prestations, votre zone de travail.
            </p>
          </div>
          <Link
            href="/coiffeurs"
            className="self-start px-7 py-3.5 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] hover:bg-[#D4B896] transition-colors duration-300"
          >
            REJOINDRE LA TEAM
          </Link>
        </FadeIn>

        <FadeIn direction="left" delay={0.1} className="bg-[#C4A882] px-10 md:px-16 py-24 flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-[#0A0A0A]/50 text-xs tracking-[0.3em]">VOUS ÊTES CLIENT</p>
            <h3
              className="text-[#0A0A0A] leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
              }}
            >
              Votre coiffeur privé,{" "}
              <em style={{ fontStyle: "italic" }}>chez vous.</em>
            </h3>
            <p className="text-[#0A0A0A]/60 text-sm leading-relaxed max-w-sm">
              Découvrez une nouvelle façon de prendre soin de vous. Inscrivez-vous à la liste d&apos;attente et soyez parmi les premiers à profiter du service à Marrakech.
            </p>
          </div>
          <Link
            href="/clients"
            className="self-start px-7 py-3.5 bg-[#0A0A0A] text-white text-xs tracking-[0.2em] hover:bg-[#1a1a1a] transition-colors duration-300"
          >
            LISTE D&apos;ATTENTE
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
