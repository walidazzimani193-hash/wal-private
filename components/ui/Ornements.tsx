/**
 * Ornements « conciergerie » — Server Components (zéro JS client).
 * Couture : filet + diamant laiton à la frontière entre deux sections.
 * Sceau  : W gravé, anneaux + texte circulaire en rotation lente (CSS).
 */

export function Couture({ max = "1080px" }: { max?: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 flex h-0 items-center justify-center overflow-visible px-8"
    >
      <span
        className="h-px w-full"
        style={{
          maxWidth: max,
          background:
            "linear-gradient(to right, transparent, rgba(169,136,90,0.45), transparent)",
        }}
      />
      <span className="absolute h-[7px] w-[7px] rotate-45 bg-[var(--laiton)]" />
    </div>
  );
}

export function Sceau({ size = 230, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="97" stroke="rgba(169,136,90,0.5)" strokeWidth="1" />
      <circle cx="100" cy="100" r="91" stroke="rgba(169,136,90,0.2)" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" stroke="rgba(169,136,90,0.35)" strokeWidth="1" />
      <g className="wal-sceau-rotor">
        <defs>
          <path
            id="wal-sceau-arc"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text
          fontSize="10"
          letterSpacing="3.4"
          fill="rgba(242,237,227,0.5)"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          <textPath href="#wal-sceau-arc">
            CERCLE PRIVÉ · MARRAKECH · CERCLE PRIVÉ · MARRAKECH ·
          </textPath>
        </text>
      </g>
      <text
        x="100"
        y="121"
        textAnchor="middle"
        fontWeight="500"
        fontSize="60"
        fill="rgba(242,237,227,0.92)"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        W
      </text>
    </svg>
  );
}
