import Link from "next/link";

const avantages = [
  {
    title: "Nouvelle clientèle",
    desc: "Accédez à des clients qui recherchent spécifiquement un service à domicile. Aucun investissement marketing de votre côté.",
  },
  {
    title: "Liberté totale",
    desc: "Vous définissez vos horaires, votre zone géographique et vos prestations. WAL ne vous impose rien.",
  },
  {
    title: "Rémunération transparente",
    desc: "Vous fixez vos tarifs selon votre grade. Les commissions WAL sont claires, fixes et annoncées dès le départ.",
  },
  {
    title: "Support juridique & comptable",
    desc: "En tant qu'indépendant, nous vous accompagnons dans les démarches légales et fiscales au Maroc.",
  },
  {
    title: "Formation continue",
    desc: "Accès à des formations en ligne, des webinaires et des évaluations pour progresser et monter en grade.",
  },
  {
    title: "Programme de parrainage",
    desc: "Recrutez d'autres coiffeurs et percevez une commission pour chaque nouveau membre que vous amenez à la plateforme.",
  },
];

const grades = [
  { label: "Novice", desc: "Jeune diplômé ou reconversion. Accompagné par un mentor WAL.", color: "#C4A882" },
  { label: "Confirmé", desc: "2 ans d'expérience minimum. Évaluations clients solides.", color: "#B89A6A" },
  { label: "Expert", desc: "Maîtrise technique avancée. Spécialisation reconnue.", color: "#A08050" },
  { label: "Maître", desc: "Excellence absolue. Sélection sur dossier et évaluation centre WAL.", color: "#0A0A0A" },
];

export default function CoiffeurPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[75vh] bg-[#0A0A0A] flex items-end pb-24 px-6 pt-36">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="sep text-[#C4A882]/60 text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
              POUR LES COIFFEURS
            </p>
            <h1
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 7vw, 88px)",
                fontWeight: 300,
              }}
            >
              Votre talent.
              <br />
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>Votre liberté.</em>
            </h1>
            <p className="text-white/40 text-base leading-relaxed mt-8 max-w-xl">
              Rejoignez WAL Private et transformez votre expertise en revenus flexibles, sans les contraintes d&apos;un salon traditionnel.
            </p>
            <p className="text-white/50 text-sm mt-8">
              Déjà partenaire ?{" "}
              <Link href="/pro" className="text-[#C4A882] hover:text-white transition-colors underline underline-offset-4">
                Connectez-vous à votre espace coiffeur
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-[#F8F5F0] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="sep text-[#C4A882] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              POURQUOI REJOINDRE WAL
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Une plateforme conçue
              <br />
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>pour votre succès.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E4DF]">
            {avantages.map((item) => (
              <div key={item.title} className="bg-white p-10 flex flex-col gap-4">
                <div className="w-8 h-px bg-[#C4A882]" />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "22px",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Système de grades */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="sep text-[#C4A882] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              LE SYSTÈME WAL
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Progressez. Montez en grade.
              <br />
              <em style={{ fontStyle: "italic", color: "#C4A882" }}>Gagnez plus.</em>
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Votre grade est calculé sur vos évaluations clients, vos certifications et vos résultats aux formations WAL. Il évolue régulièrement.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#E8E4DF]">
            {grades.map((grade, i) => (
              <div key={grade.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-8">
                <span
                  className="text-[#E8E4DF] w-16 shrink-0"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "56px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: i === 3 ? "#C4A882" : undefined,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3
                    className="text-[#0A0A0A]"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "26px",
                      fontWeight: 500,
                    }}
                  >
                    {grade.label}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm mt-1">{grade.desc}</p>
                </div>
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: grade.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offre de lancement */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="sep text-[#C4A882]/60 text-xs" style={{ letterSpacing: "0.3em" }}>
            OFFRE DE LANCEMENT
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 400,
            }}
          >
            Les premiers inscrits bénéficient
            <br />
            <em style={{ fontStyle: "italic", color: "#C4A882" }}>d&apos;avantages exclusifs.</em>
          </h2>
          <ul className="text-white/50 text-sm flex flex-col gap-2 mt-2">
            <li>✓ &nbsp;Abonnement offert pendant les 3 premiers mois</li>
            <li>✓ &nbsp;Accès prioritaire aux formations WAL</li>
            <li>✓ &nbsp;Support dédié à l&apos;onboarding</li>
          </ul>
          <Link
            href="/contact"
            className="mt-4 px-8 py-4 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] hover:bg-[#D4B896] transition-colors duration-300"
          >
            M&apos;INSCRIRE MAINTENANT
          </Link>
        </div>
      </section>

      {/* Formulaire d'inscription simplifié */}
      <section className="bg-[#F8F5F0] py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="sep text-[#C4A882] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              INSCRIPTION
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
              }}
            >
              Rejoignez WAL Private
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-3">
              Remplissez ce formulaire et nous vous recontactons sous 48h.
            </p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>PRÉNOM</label>
                <input
                  type="text"
                  className="bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm text-[#0A0A0A] outline-none focus:border-[#C4A882] transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>NOM</label>
                <input
                  type="text"
                  className="bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm text-[#0A0A0A] outline-none focus:border-[#C4A882] transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>TÉLÉPHONE / WHATSAPP</label>
              <input
                type="tel"
                className="bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm text-[#0A0A0A] outline-none focus:border-[#C4A882] transition-colors"
                placeholder="+212 6 XX XX XX XX"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>ANNÉES D&apos;EXPÉRIENCE</label>
              <select className="bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm text-[#0A0A0A] outline-none focus:border-[#C4A882] transition-colors appearance-none">
                <option value="">Sélectionner</option>
                <option>Moins d&apos;un an (Novice)</option>
                <option>1 – 3 ans (Confirmé)</option>
                <option>3 – 7 ans (Expert)</option>
                <option>Plus de 7 ans (Maître)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>SPÉCIALITÉS</label>
              <textarea
                rows={3}
                className="bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm text-[#0A0A0A] outline-none focus:border-[#C4A882] transition-colors resize-none"
                placeholder="Coupe, couleur, balayage, soins kératine..."
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-[#0A0A0A] text-white text-xs tracking-[0.2em] py-4 hover:bg-[#C4A882] hover:text-[#0A0A0A] transition-colors duration-300"
            >
              ENVOYER MA CANDIDATURE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
