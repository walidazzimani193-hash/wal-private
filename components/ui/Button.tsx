"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "laiton" | "vert" | "outline";

const base =
  "relative inline-flex items-center justify-center overflow-hidden font-semibold cursor-pointer " +
  "text-[12px] tracking-[0.16em] px-7 py-4 transition-transform duration-[400ms] [transition-timing-function:var(--ease)] " +
  "hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  // sur fond sombre
  laiton: "bg-[var(--laiton)] text-[var(--nuit)]",
  // sur fond clair
  vert: "bg-[var(--vert)] text-[var(--ivoire)]",
  // discret / secondaire sur fond sombre
  outline: "bg-transparent border border-[var(--laiton)] text-[var(--laiton)]",
};

/** Balayage lumineux au survol (::after translateX) — signature WAL */
const sweep =
  "after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)] " +
  "after:translate-x-[-120%] hover:after:translate-x-[120%] after:transition-transform after:duration-700 after:[transition-timing-function:var(--ease)]";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "laiton",
  className = "",
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sweep} ${className}`;
  const inner = <span className="relative z-[1]">{children}</span>;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
