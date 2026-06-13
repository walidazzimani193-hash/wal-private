"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { GradeTabs, type Grade } from "@/components/ui/GradeTabs";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

const grades: Grade[] = [
  { roman: "I", label: "Novice", min: 150, max: 300, desc: "Jeunes talents certifiés, accompagnés par un mentor WAL. Le bon geste, au tarif le plus accessible du cercle." },
  { roman: "II", label: "Confirmé", min: 300, max: 600, desc: "Professionnels expérimentés et polyvalents, aux évaluations clients solides. Le choix le plus demandé." },
  { roman: "III", label: "Expert", min: 600, max: 1000, desc: "Spécialistes reconnus, haute maîtrise technique. Pour une exigence précise — coupe signature, occasion particulière." },
  { roman: "IV", label: "Maître", min: 1000, max: 0, desc: "Excellence absolue, sélection sur dossier. Le sommet du cercle WAL." },
];

const steps = [
  { n: "01", title: "Choisissez", desc: "La prestation — ou plusieurs, pour vous et un proche — et le grade du coiffeur. Profils et évaluations en un coup d'œil." },
  { n: "02", title: "Réservez", desc: "Date, heure, adresse. Le prix exact s'affiche avant de confirmer. Aucune surprise." },
  { n: "03", title: "Profitez", desc: "Votre coiffeur arrive équipé, chez vous. Vous n'avez rien à préparer." },
];

const marqueeItems = [
  "COIFFEURS VÉRIFIÉS & CLASSÉS PAR GRADE",
  "PRIX AFFICHÉS AVANT RÉSERVATION",
  "SOIR, WEEK-END, VILLA, RIAD OU HÔTEL",
  "MESSAGERIE PRIVÉE INCLUSE",
  "MARRAKECH",
];

const exp = [
  { label: "AMBIANCE", legende: "Coiffure à domicile" },
  { label: "MÉTIER", legende: "Le coiffeur en action" },
  { label: "RÉSULTAT", legende: "Le résultat final" },
];

const faq: AccordionItem[] = [
  {
    q: "Comment les coiffeurs sont-ils sélectionnés ?",
    a: "Chaque coiffeur est retenu sur dossier, évalué lors d'une prestation test, puis noté par les clients après chaque rendez-vous. Son grade (I à IV) reflète ses compétences, ses certifications et ses évaluations — il évolue dans le temps.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Le prix dépend du grade du coiffeur et des prestations choisies : de 150 MAD (Novice) à plus de 1 000 MAD (Maître). Le montant exact s'affiche avant la confirmation. Aucune majoration cachée.",
  },
  {
    q: "Le Last Minute, comment ça marche ?",
    a: "Votre demande part en temps réel aux coiffeurs en ligne de votre quartier — réponse en 10 minutes maximum. Réservé aux membres : il suffit d'un compte.",
  },
  {
    q: "Faut-il un compte pour réserver ?",
    a: "Oui — la création prend 10 secondes (lien magique ou connexion Google). Vous y gardez votre historique, la messagerie privée avec votre coiffeur et l'accès au Last Minute.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Vous réglez directement votre coiffeur à la fin de la prestation, en espèces. Le paiement en ligne arrivera ensuite.",
  },
  {
    q: "Quels quartiers de Marrakech sont couverts ?",
    a: "Guéliz, Hivernage, la Palmeraie et la Médina (riads), et la zone s'étend avec le cercle. Hôtels et riads partenaires bienvenus.",
  },
  {
    q: "Vous êtes coiffeur et souhaitez rejoindre WAL ?",
    a: (
      <>
        Le cercle recrute à Marrakech. Vous choisissez vos horaires, votre zone et vos prestations ; WAL vous apporte les clients.{" "}
        <Link href="/coiffeurs" className="font-semibold text-[var(--laiton-texte)]">
          Candidater ici →
        </Link>
      </>
    ),
  },
];

function ImgPlaceholder({ label, legende, ratio }: { label: string; legende: string; ratio: string }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 border border-[var(--ivoire)]/12 bg-[var(--ivoire)]/[0.04] text-[var(--ivoire)]/30"
      style={{ aspectRatio: ratio }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-[10px] tracking-[0.2em]">{legende.toUpperCase()}</span>
      <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] opacity-50">{label}</span>
    </div>
  );
}

const SerifTitle = "var(--font-cormorant), Georgia, serif";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <header className="relative overflow-hidden bg-[linear-gradient(175deg,var(--nuit)_0%,#16301f_100%)] px-8 pt-44 pb-32 text-[var(--ivoire)]">
        {/* sceau décoratif */}
        <svg
          className="pointer-events-none absolute -right-32 top-1/2 -mt-[310px] animate-[spin_140s_linear_infinite] opacity-[0.05]"
          width="600" height="600" viewBox="0 0 84 84" fill="none"
        >
          <circle cx="42" cy="42" r="40" stroke="#F2EDE3" strokeWidth=".6" />
          <circle cx="42" cy="42" r="33" stroke="#F2EDE3" strokeWidth=".3" />
          <text x="42" y="55" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="38" fill="#F2EDE3">W</text>
        </svg>

        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div>
            <FadeIn>
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton)]">Marrakech</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(42px,6.5vw,76px)", lineHeight: 1.06 }}>
                Votre coiffeur privé,
                <br />
                <em className="italic text-[var(--laiton)]">chez vous.</em>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-[var(--ivoire)]/75">
                Professionnels vérifiés et classés, réservation instantanée, à l'heure et au lieu qui vous conviennent — villa, riad, hôtel.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/reserver" variant="laiton">RÉSERVER MAINTENANT</Button>
                <Link
                  href="/compte"
                  className="border-b border-[var(--ivoire)]/25 pb-0.5 text-[12px] tracking-[0.1em] text-[var(--ivoire)]/60 transition-colors duration-300 hover:border-[var(--laiton)] hover:text-[var(--ivoire)]"
                >
                  MON COMPTE
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* visuel */}
          <FadeIn delay={0.35} direction="left" className="relative hidden md:block">
            <ImgPlaceholder label="1080 × 1350 · WebP" legende="Prestation à domicile" ratio="4 / 5" />
            <span className="absolute -bottom-4 -left-4 bg-[var(--laiton)] px-4 py-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--nuit)]">
              RÉSERVATION OUVERTE
            </span>
          </FadeIn>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <Marquee items={marqueeItems} />

      {/* ── ÉTAPES ── */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1080px]">
          <FadeIn>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton-texte)]">Comment ça marche</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.12 }}>
              Trois gestes. <em className="italic">Pas un de plus.</em>
            </h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={0.1 + i * 0.1}>
                <div className="group h-full border border-[var(--vert)]/14 bg-transparent p-8 transition-all duration-500 [transition-timing-function:var(--ease)] hover:-translate-y-1.5 hover:border-transparent hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(17,36,27,0.35)]">
                  <div className="mb-3.5 leading-none text-[var(--laiton-texte)] transition-transform duration-500 [transition-timing-function:var(--ease)] group-hover:translate-x-1.5" style={{ fontFamily: SerifTitle, fontSize: "42px" }}>
                    {s.n}
                  </div>
                  <h3 className="mb-1.5 text-[15.5px] font-semibold">{s.title}</h3>
                  <p className="text-[13.5px] text-[var(--vert)]/70">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRADES ── */}
      <section className="bg-[var(--vert)] px-8 py-24 text-[var(--ivoire)]">
        <div className="mx-auto max-w-[1080px]">
          <FadeIn>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton)]">Nos professionnels</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.12 }}>
              Un grade pour chaque <em className="italic text-[var(--laiton)]">niveau d'excellence.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <GradeTabs grades={grades} defaultIndex={1} />
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-12">
              <Button href="/reserver" variant="laiton">RÉSERVER UN COIFFEUR</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LAST MINUTE (atout + levier compte) ── */}
      <section className="px-8 py-24">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-14 md:grid-cols-2">
          <FadeIn>
            <ImgPlaceholderLight />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton-texte)]">Last Minute</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.12 }}>
              Un coiffeur, <em className="italic text-[var(--laiton-texte)]">maintenant.</em>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--vert)]/75">
              Besoin d'un coiffeur en express ? Votre demande part en temps réel aux professionnels
              en ligne de votre quartier — réponse en <strong className="font-semibold">10 minutes maximum</strong>.
            </p>
            <p className="mt-3 text-[13px] text-[var(--vert)]/55">
              Réservé aux membres — la création de compte prend 10 secondes.
            </p>
            <div className="mt-7">
              <Button href="/reserver" variant="vert">RÉSERVER EN LAST MINUTE</Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── EXPÉRIENCE (visuels) ── */}
      <section className="bg-[var(--nuit)] px-8 py-24 text-[var(--ivoire)]">
        <div className="mx-auto max-w-[1080px]">
          <FadeIn>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton)]">L'expérience WAL</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.12 }}>
              Le soin qui se <em className="italic text-[var(--laiton)]">déplace.</em>
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-2 md:grid-cols-3">
            {exp.map((e, i) => (
              <FadeIn key={e.label} delay={0.1 + i * 0.1}>
                <ImgPlaceholder label={e.label} legende={e.legende} ratio="3 / 4" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-8 py-24">
        <div className="mx-auto max-w-[1080px]">
          <FadeIn>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton-texte)]">Questions</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.12 }}>
              Tout ce qu'il faut savoir. <em className="italic">Quand vous voulez.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion items={faq} className="mt-6" />
          </FadeIn>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="relative overflow-hidden bg-[var(--nuit)] px-8 py-28 text-center text-[var(--ivoire)]">
        <div className="mx-auto max-w-[1080px]">
          <FadeIn>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton)]">Rejoindre le cercle</p>
            <h2 style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(30px,4.5vw,46px)", lineHeight: 1.1 }}>
              Votre prochaine <em className="italic text-[var(--laiton)]">prestation,</em> chez vous.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/reserver" variant="laiton">RÉSERVER MAINTENANT</Button>
              <Button href="/compte" variant="outline">MON COMPTE</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

/* Placeholder image sur fond clair (section Last Minute) */
function ImgPlaceholderLight() {
  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 border border-[var(--vert)]/12 bg-[var(--vert)]/[0.04] text-[var(--vert)]/30"
      style={{ aspectRatio: "4 / 5" }}
    >
      <motion.svg
        width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
        initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </motion.svg>
      <span className="text-[10px] tracking-[0.2em]">LAST MINUTE — EXPRESS</span>
    </div>
  );
}
