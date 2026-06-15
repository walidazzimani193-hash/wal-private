import Link from "next/link";

/** Sceau WAL — monogramme W dans un double cercle, laiton */
function Seal() {
  return (
    <svg width="34" height="34" viewBox="0 0 84 84" fill="none" aria-hidden="true">
      <circle cx="42" cy="42" r="40" stroke="#A9885A" strokeWidth="2" />
      <circle cx="42" cy="42" r="33" stroke="#A9885A" strokeWidth="0.8" opacity="0.5" />
      <text x="42" y="55" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fill="#A9885A">
        W
      </text>
    </svg>
  );
}

const sections = [
  {
    titre: "Le cercle",
    liens: [
      { href: "/reserver", label: "Réserver" },
      { href: "/compte", label: "Mon compte" },
      { href: "/a-propos", label: "À propos" },
    ],
  },
  {
    titre: "Côté coiffeur",
    liens: [
      { href: "/coiffeurs", label: "Rejoindre WAL" },
      { href: "/pro", label: "Espace coiffeur" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--laiton)]/25 bg-[var(--nuit)] text-[var(--ivoire)]">
      <div className="mx-auto max-w-[1080px] px-7 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marque */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Seal />
              <span
                className="tracking-[0.04em]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "23px" }}
              >
                WAL <em className="italic text-[var(--laiton)]">Private</em>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ivoire)]/55">
              Le cercle privé du coiffeur à domicile. Marrakech.
            </p>
            <Link
              href="/reserver"
              className="mt-1 inline-flex w-fit items-center gap-2 border border-[var(--laiton)]/45 px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-[var(--laiton)] transition-colors duration-300 hover:bg-[var(--laiton)] hover:text-[var(--nuit)]"
            >
              RÉSERVER
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Sections de liens */}
          {sections.map((section) => (
            <nav key={section.titre} className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--laiton)]">
                {section.titre}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.liens.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-2 text-sm text-[var(--ivoire)]/65 transition-colors duration-300 hover:text-[var(--ivoire)]"
                    >
                      <span className="h-px w-0 bg-[var(--laiton)] transition-all duration-300 [transition-timing-function:var(--ease)] group-hover:w-3.5" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bas de page */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--ivoire)]/10 pt-7 sm:flex-row">
          <p className="text-xs tracking-[0.1em] text-[var(--ivoire)]/35">
            © {new Date().getFullYear()} WAL PRIVATE
          </p>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--laiton)]/85">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--laiton)]" aria-hidden="true" />
            Marrakech
          </span>
        </div>
      </div>
    </footer>
  );
}
