import Link from "next/link";

const abonnements = [
  {
    name: "Avantages",
    price: "99",
    unit: "MAD / mois",
    desc: "Idéal pour commencer",
    features: [
      "Accès prioritaire aux créneaux last minute",
      "Tarifs préférentiels sur les prestations",
      "Notifications de disponibilité dans votre zone",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "299",
    unit: "MAD / mois",
    desc: "La formule la plus choisie",
    features: [
      "Accès aux coiffeurs Premium & Expert",
      "Réduction sur toutes les prestations",
      "Réservation jusqu'à 2 semaines à l'avance",
      "Offres spéciales réservées aux abonnés",
    ],
    highlight: true,
  },
  {
    name: "VIP",
    price: "499",
    unit: "MAD / mois",
    desc: "L'expérience absolue",
    features: [
      "Accès exclusif aux coiffeurs Maître",
      "Disponibilité garantie sous 24h",
      "Services complémentaires inclus",
      "Invitations à des événements VIP",
    ],
    highlight: false,
  },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[75vh] bg-[#11241B] flex items-end pb-24 px-6 pt-36">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="sep text-[#A9885A]/60 text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
              POUR LES CLIENTS
            </p>
            <h1
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 7vw, 88px)",
                fontWeight: 300,
              }}
            >
              La beauté,
              <br />
              <em style={{ fontStyle: "italic", color: "#A9885A" }}>à domicile.</em>
            </h1>
            <p className="text-white/40 text-base leading-relaxed mt-8 max-w-xl">
              Réservez un coiffeur certifié directement chez vous, dans votre riad, votre villa ou votre hôtel à Marrakech. À l&apos;heure qui vous convient.
            </p>
          </div>
        </div>
      </section>

      {/* Avantages client */}
      <section className="bg-[#F2EDE3] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="sep text-[#A9885A] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              POURQUOI WAL PRIVATE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Une expérience pensée
              <br />
              <em style={{ fontStyle: "italic", color: "#A9885A" }}>pour votre confort.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E3DCC9]">
            {[
              {
                title: "Horaires flexibles",
                desc: "Réservez le soir, le week-end, ou à la dernière minute. Fini d'attendre votre tour en salon.",
              },
              {
                title: "Professionnels vérifiés",
                desc: "Tous nos coiffeurs sont certifiés, évalués et notés après chaque prestation. Zéro surprise.",
              },
              {
                title: "Tarifs transparents",
                desc: "Les prix s'affichent avant la réservation. Aucune majoration cachée, aucune mauvaise surprise.",
              },
              {
                title: "Paiement sécurisé",
                desc: "Payez en ligne ou à la livraison. Vos données sont protégées et chaque transaction est sécurisée.",
              },
              {
                title: "Programme de fidélité",
                desc: "Chaque dirham dépensé vous rapporte des points. Échangez-les contre des réductions ou des cadeaux.",
              },
              {
                title: "Last Minute",
                desc: "Besoin d'un coiffeur en urgence ? Notre bouton Last Minute vous trouve un pro disponible maintenant.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-10 flex flex-col gap-4">
                <div className="w-8 h-px bg-[#A9885A]" />
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

      {/* Programme de fidélité */}
      <section className="bg-[#11241B] py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Points visual */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="flex items-end gap-2">
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "96px",
                  fontWeight: 300,
                  color: "#A9885A",
                  lineHeight: 1,
                }}
              >
                3
              </span>
              <span className="text-white/30 text-sm mb-4 leading-tight">points<br/>/ dirham</span>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <div className="bg-white/5 border border-white/10 px-6 py-3">
                <p className="text-[#A9885A] text-sm">1 500 pts</p>
                <p className="text-white/40 text-xs mt-0.5">= 15 MAD de réduction</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-3">
                <p className="text-[#A9885A] text-sm">2 500 pts</p>
                <p className="text-white/40 text-xs mt-0.5">= 25 MAD de réduction</p>
              </div>
            </div>
          </div>

          <div>
            <p className="sep text-[#A9885A]/60 text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              PROGRAMME DE FIDÉLITÉ
            </p>
            <h2
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Plus vous réservez,
              <br />
              <em style={{ fontStyle: "italic", color: "#A9885A" }}>plus vous gagnez.</em>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mt-6 max-w-md">
              Chaque prestation réservée vous rapporte automatiquement des points. Ils s&apos;accumulent et se convertissent en bons de réduction sur vos prochaines réservations.
            </p>
          </div>
        </div>
      </section>

      {/* Abonnements */}
      <section className="bg-[#F2EDE3] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="sep text-[#A9885A] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              NOS FORMULES
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Choisissez votre niveau
              <br />
              <em style={{ fontStyle: "italic", color: "#A9885A" }}>d&apos;expérience.</em>
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-3">Annulation facile à tout moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3DCC9]">
            {abonnements.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col gap-6 p-10 ${
                  plan.highlight ? "bg-[#11241B]" : "bg-white"
                }`}
              >
                <div>
                  <p
                    className={`text-xs tracking-widest mb-3 ${
                      plan.highlight ? "text-[#A9885A]/60" : "text-[#6B6B6B]"
                    }`}
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {plan.desc.toUpperCase()}
                  </p>
                  <h3
                    className={plan.highlight ? "text-white" : "text-[#11241B]"}
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "28px",
                      fontWeight: 500,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-2 mt-4">
                    <span
                      className={plan.highlight ? "text-[#A9885A]" : "text-[#11241B]"}
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "48px",
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm pb-1 ${
                        plan.highlight ? "text-white/30" : "text-[#6B6B6B]"
                      }`}
                    >
                      {plan.unit}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-px bg-[#A9885A]" />

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex gap-3 ${
                        plan.highlight ? "text-white/60" : "text-[#6B6B6B]"
                      }`}
                    >
                      <span className="text-[#A9885A] shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`text-center text-xs tracking-[0.2em] py-3.5 transition-colors duration-300 ${
                    plan.highlight
                      ? "bg-[#A9885A] text-[#11241B] hover:bg-[#BFA070]"
                      : "bg-[#11241B] text-white hover:bg-[#A9885A] hover:text-[#11241B]"
                  }`}
                >
                  REJOINDRE LA LISTE
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[#6B6B6B] text-xs mt-6">
            Service bientôt disponible à Marrakech — Inscrivez-vous en avant-première.
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
          <div>
            <p className="sep text-[#A9885A] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              LISTE D&apos;ATTENTE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Soyez parmi les premiers.
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-4 leading-relaxed">
              WAL Private arrive bientôt à Marrakech. Laissez-nous votre contact et recevez une invitation en avant-première avec une offre exclusive.
            </p>
          </div>

          <form className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre prénom"
                className="bg-[#F2EDE3] border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
              />
              <input
                type="tel"
                placeholder="Votre WhatsApp"
                className="bg-[#F2EDE3] border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="bg-[#F2EDE3] border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#11241B] text-white text-xs tracking-[0.2em] py-4 hover:bg-[#A9885A] hover:text-[#11241B] transition-colors duration-300"
            >
              REJOINDRE LA LISTE D&apos;ATTENTE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
