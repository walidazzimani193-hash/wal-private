import { Couture } from "@/components/ui/Ornements";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--nuit)] pt-36 pb-24 px-6">
        <span className="wal-khatam" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="sep text-[var(--laiton)]/60 text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
            CONTACT
          </p>
          <h1
            className="text-white leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 7vw, 88px)",
              fontWeight: 300,
            }}
          >
            Parlons de
            <br />
            <em style={{ fontStyle: "italic", color: "var(--laiton)" }}>votre projet.</em>
          </h1>
        </div>
      </section>

      <Couture />

      {/* Formulaire + infos */}
      <section className="bg-[var(--ivoire)] py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Formulaire */}
          <div>
            <h2
              className="mb-8"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "32px",
                fontWeight: 400,
              }}
            >
              Envoyez-nous un message
            </h2>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>VOUS ÊTES</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Un coiffeur", "Un client"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 bg-white border border-[#E3DCC9] px-4 py-3 cursor-pointer hover:border-[var(--laiton)] transition-colors group">
                      <input
                        type="radio"
                        name="type"
                        className="accent-[var(--laiton)]"
                      />
                      <span className="text-sm text-[#6B6B6B] group-hover:text-[var(--nuit)] transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>PRÉNOM</label>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>NOM</label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>E-MAIL</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>TÉLÉPHONE / WHATSAPP</label>
                <input
                  type="tel"
                  placeholder="+212 6 XX XX XX XX"
                  className="bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest text-[#6B6B6B]" style={{ letterSpacing: "0.15em" }}>VOTRE MESSAGE</label>
                <textarea
                  rows={5}
                  placeholder="Dites-nous comment nous pouvons vous aider..."
                  className="bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[var(--nuit)] text-white text-xs tracking-[0.2em] py-4 mt-2 hover:bg-[var(--laiton)] hover:text-[var(--nuit)] transition-colors duration-300"
              >
                ENVOYER LE MESSAGE
              </button>
            </form>
          </div>

          {/* Infos contact */}
          <div className="flex flex-col gap-12">
            <div>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "32px",
                  fontWeight: 400,
                }}
              >
                Informations
              </h2>
              <div className="flex flex-col gap-8">
                {[
                  {
                    label: "LOCALISATION",
                    value: "Marrakech, Maroc",
                  },
                  {
                    label: "E-MAIL",
                    value: "contact@walprivate.ma",
                    href: "mailto:contact@walprivate.ma",
                  },
                  {
                    label: "WHATSAPP",
                    value: "+212 6 XX XX XX XX",
                  },
                  {
                    label: "RÉSEAUX SOCIAUX",
                    value: "Instagram · Facebook",
                  },
                ].map((info) => (
                  <div key={info.label} className="flex flex-col gap-2 pb-8 border-b border-[#E3DCC9]">
                    <p className="text-xs tracking-widest text-[var(--laiton)]" style={{ letterSpacing: "0.2em" }}>{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-[var(--nuit)] hover:text-[var(--laiton)] transition-colors text-sm">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--nuit)] text-sm">{info.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-[var(--nuit)] p-8">
              <p
                className="text-white/60 leading-relaxed"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                &ldquo;Nous répondons à toutes les demandes sous 48 heures ouvrables. Pour les candidatures coiffeurs, merci de préciser vos spécialités et années d&apos;expérience.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
