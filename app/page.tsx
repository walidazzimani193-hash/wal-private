import Link from "next/link";

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
      <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(196,168,130,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Thin horizontal line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A882]/30 to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-up">
          {/* Eyebrow */}
          <p
            className="sep text-[#C4A882]/70 text-xs"
            style={{ letterSpacing: "0.3em" }}
          >
            MARRAKECH
          </p>

          {/* Main title */}
          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(64px, 12vw, 140px)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            WAL{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C4A882",
                fontWeight: 300,
              }}
            >
              Private
            </em>
          </h1>

          {/* Tagline */}
          <p
            className="text-white/50 max-w-md delay-200 animate-fade-up"
            style={{ fontSize: "16px", lineHeight: "1.7", fontWeight: 300 }}
          >
            Le coiffeur privé, à votre porte.
            <br />
            Professionnels certifiés. À domicile.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 delay-400 animate-fade-up">
            <Link
              href="/coiffeurs"
              className="px-8 py-4 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] font-medium hover:bg-[#D4B896] transition-colors duration-300"
            >
              DEVENIR COIFFEUR WAL
            </Link>
            <Link
              href="/clients"
              className="px-8 py-4 border border-white/30 text-white text-xs tracking-[0.2em] hover:border-[#C4A882] hover:text-[#C4A882] transition-colors duration-300"
            >
              DÉCOUVRIR LE SERVICE
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-700">
          <span className="text-white/25 text-xs tracking-widest" style={{ letterSpacing: "0.25em" }}>
            DÉFILER
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section className="bg-[#F8F5F0] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                n: "—",
                title: "Des professionnels vérifiés",
                desc: "Chaque coiffeur est sélectionné, formé et évalué. Aucune improvisation. Que de l'expertise.",
              },
              {
                n: "—",
                title: "À votre rythme",
                desc: "Réservez le soir, le week-end, ou en last minute. WAL s'adapte à votre agenda, pas l'inverse.",
              },
              {
                n: "—",
                title: "Pour tous les budgets",
                desc: "Du jeune talent au maître coiffeur — des tarifs transparents pour chaque profil et chaque envie.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-10 flex flex-col gap-5 hover:bg-[#0A0A0A] group transition-colors duration-500 cursor-default"
              >
                <span className="text-[#C4A882] text-2xl group-hover:text-[#C4A882]">{item.n}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E8E4DF]">
            {steps.map((step) => (
              <div key={step.n} className="bg-white p-10 flex flex-col gap-4">
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
            ))}
          </div>
        </div>
      </section>

      {/* ── LES GRADES ── */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {grades.map((grade) => (
              <div
                key={grade.label}
                className="bg-[#0A0A0A] hover:bg-[#141414] border border-white/5 hover:border-[#C4A882]/30 p-10 flex flex-col gap-5 transition-all duration-400 group"
              >
                <span
                  className="text-[#C4A882]/20 group-hover:text-[#C4A882]/40 transition-colors duration-400"
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
                  <span className="text-[#C4A882] text-xs tracking-widest" style={{ letterSpacing: "0.1em" }}>
                    {grade.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAST MINUTE ── */}
      <section className="bg-[#F8F5F0] py-28 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
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
              Notre fonctionnalité Last Minute vous met en relation avec un professionnel disponible immédiatement près de chez vous, sans rendez-vous, en quelques secondes.
            </p>
            <Link
              href="/clients"
              className="inline-block mt-8 px-7 py-3.5 bg-[#0A0A0A] text-white text-xs tracking-[0.2em] hover:bg-[#C4A882] hover:text-[#0A0A0A] transition-colors duration-300"
            >
              EN SAVOIR PLUS
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 border border-[#C4A882]/20 rounded-full" />
              <div className="absolute inset-6 border border-[#C4A882]/10 rounded-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "64px",
                    fontWeight: 300,
                    color: "#C4A882",
                    lineHeight: 1,
                  }}
                >
                  &lt; 5
                </span>
                <span className="text-[#6B6B6B] text-xs tracking-widest mt-1" style={{ letterSpacing: "0.2em" }}>
                  MINUTES
                </span>
                <span className="text-[#6B6B6B] text-xs mt-2">pour être mis en relation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOUBLE CTA ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Côté coiffeur */}
        <div className="bg-[#0A0A0A] px-10 md:px-16 py-24 flex flex-col justify-between gap-10">
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
        </div>

        {/* Côté client */}
        <div className="bg-[#C4A882] px-10 md:px-16 py-24 flex flex-col justify-between gap-10">
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
        </div>
      </section>
    </div>
  );
}
