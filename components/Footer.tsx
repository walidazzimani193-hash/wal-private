import Link from "next/link";

const liens = [
  { href: "/reserver", label: "Réserver" },
  { href: "/compte", label: "Mon compte" },
  { href: "/coiffeurs", label: "Pour les coiffeurs" },
  { href: "/pro", label: "Espace coiffeur" },
  { href: "/a-propos", label: "À propos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--ivoire)]/10 bg-[var(--nuit)] text-[var(--ivoire)]">
      <div className="mx-auto max-w-[1080px] px-8 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          {/* Marque */}
          <div className="flex flex-col gap-3">
            <p
              className="tracking-[0.04em]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px" }}
            >
              WAL <em className="italic text-[var(--laiton)]">Private</em>
            </p>
            <p className="max-w-xs text-sm leading-relaxed opacity-50">
              Le cercle privé du coiffeur à domicile. Marrakech.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {liens.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm opacity-60 transition-opacity duration-300 hover:opacity-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bas de page */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--ivoire)]/10 pt-8 sm:flex-row">
          <p className="text-xs tracking-[0.1em] opacity-35">
            © {new Date().getFullYear()} WAL PRIVATE — MARRAKECH
          </p>
        </div>
      </div>
    </footer>
  );
}
