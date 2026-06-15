import Link from "next/link";

export default function AProposPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[56vh] md:min-h-[70vh] bg-[#11241B] flex items-end pb-20 md:pb-24 px-6 pt-36">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="sep text-[#A9885A]/60 text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
              À PROPOS
            </p>
            <h1
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 7vw, 88px)",
                fontWeight: 300,
              }}
            >
              Une vision.
              <br />
              <em style={{ fontStyle: "italic", color: "#A9885A" }}>Une mission.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-[#F2EDE3] py-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="sep text-[#A9885A] text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
              LA GENÈSE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              Né d&apos;un constat simple.
            </h2>
            <div className="flex flex-col gap-5 mt-8 text-[#6B6B6B] text-sm leading-relaxed">
              <p>
                La coiffure est l&apos;un des secteurs les plus personnels qui soit. Pourtant, elle reste ancrée dans des codes rigides : attentes interminables, salons impersonnels, horaires inflexibles.
              </p>
              <p>
                WAL Private est né de l&apos;envie de changer ça. D&apos;offrir à chaque client une expérience sur mesure, dans son espace, à son rythme — et de donner aux professionnels la liberté qu&apos;ils méritent.
              </p>
              <p>
                Marrakech n&apos;est pas un hasard. Ville de contrastes, carrefour entre tradition artisanale et modernité internationale, elle incarne parfaitement ce que WAL Private veut être : premium, accessible, ancré dans une culture d&apos;excellence.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-[#11241B] p-10">
              <p
                className="text-white/80 leading-relaxed"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                &ldquo;Nous croyons que chaque personne mérite un service de qualité — chez elle, à l&apos;heure qui lui convient, avec le professionnel qu&apos;elle a choisi.&rdquo;
              </p>
              <div className="w-8 h-px bg-[#A9885A] mt-8" />
              <p className="text-[#A9885A] text-xs tracking-widest mt-3" style={{ letterSpacing: "0.2em" }}>
                FONDATEUR, WAL PRIVATE
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { val: "Marrakech", label: "Ville de lancement" },
                { val: "4 grades", label: "Système d'excellence" },
                { val: "2025", label: "Lancement prévu" },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center py-4 border-b border-[#E3DCC9]">
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "24px",
                      fontWeight: 500,
                    }}
                  >
                    {stat.val}
                  </span>
                  <span className="text-[#6B6B6B] text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="sep text-[#A9885A] text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
              NOS VALEURS
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                fontWeight: 400,
              }}
            >
              Ce qui nous guide.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E3DCC9]">
            {[
              { title: "Excellence", desc: "Chaque professionnel est évalué en continu. La médiocrité n'a pas sa place sur WAL Private." },
              { title: "Confiance", desc: "Clients et coiffeurs peuvent compter sur nous. Transparence des tarifs, paiements sécurisés, engagements respectés." },
              { title: "Liberté", desc: "Les coiffeurs choisissent leurs horaires, leurs zones, leurs prestations. Sans contrainte." },
              { title: "Inclusion", desc: "Du budget accessible au luxe absolu — WAL Private accueille tous les profils, des deux côtés de la plateforme." },
            ].map((val) => (
              <div key={val.title} className="bg-white p-10 flex flex-col gap-5">
                <div className="w-8 h-px bg-[#A9885A]" />
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  {val.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision future */}
      <section className="bg-[#11241B] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <p className="sep text-[#A9885A]/60 text-xs" style={{ letterSpacing: "0.3em" }}>
            LA VISION
          </p>
          <h2
            className="text-white leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(30px, 5vw, 64px)",
              fontWeight: 300,
            }}
          >
            Marrakech n&apos;est que
            <br />
            <em style={{ fontStyle: "italic", color: "#A9885A" }}>le début.</em>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-lg">
            Notre ambition est de faire de WAL Private la référence du service beauté à domicile au Maroc, puis dans le monde arabe et au-delà. Coiffure aujourd&apos;hui. Bien-être, massage, coaching image demain.
          </p>
          <Link
            href="/contact"
            className="mt-4 px-8 py-4 border border-[#A9885A]/40 text-[#A9885A] text-xs tracking-[0.2em] hover:bg-[#A9885A] hover:text-[#11241B] transition-colors duration-300"
          >
            NOUS CONTACTER
          </Link>
        </div>
      </section>
    </div>
  );
}
