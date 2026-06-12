import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-white tracking-widest"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                }}
              >
                WAL
              </p>
              <p
                className="text-[#C4A882] tracking-[0.35em]"
                style={{ fontSize: "9px", letterSpacing: "0.35em" }}
              >
                PRIVATE
              </p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              La beauté privée à votre porte. Marrakech.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Navigation</p>
            {[
              { href: "/coiffeurs", label: "Pour les coiffeurs" },
              { href: "/clients", label: "Pour les clients" },
              { href: "/a-propos", label: "À propos" },
              { href: "/contact", label: "Contact" },
              { href: "/pro", label: "Espace coiffeur — connexion" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Contact</p>
            <p className="text-sm text-white/50">Marrakech, Maroc</p>
            <a
              href="mailto:contact@walprivate.ma"
              className="text-sm text-white/50 hover:text-[#C4A882] transition-colors duration-200"
            >
              contact@walprivate.ma
            </a>
            {/* Social */}
            <div className="flex gap-4 mt-2">
              {["Instagram", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs tracking-widest text-white/30 hover:text-[#C4A882] transition-colors duration-200 uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs tracking-wide">
            © {new Date().getFullYear()} WAL Private. Tous droits réservés.
          </p>
          <p className="text-white/25 text-xs tracking-wide">
            Marrakech — Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
