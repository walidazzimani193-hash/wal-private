"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

const SerifTitle = "var(--font-cormorant), Georgia, serif";

/** En dessous de ce seuil on n'affiche jamais le compte (« 0 en ligne » = anti-confiance) :
 *  on bascule sur la promesse « 10 min ». */
const SEUIL = 2;

/**
 * Lecture vivante du Last Minute. Interroge le RPC total des coiffeurs en ligne.
 * Repli systématique sur la promesse « réponse en 10 min » si : non câblé,
 * erreur, RPC absent, ou compte sous le seuil. Jamais de « 0 » affiché.
 */
export function CompteurEnLigne() {
  const [enLigne, setEnLigne] = useState<number | null>(null);

  useEffect(() => {
    let actif = true;
    const charger = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data, error } = await supabase.rpc("compter_coiffeurs_en_ligne_total");
      if (!actif || error || typeof data !== "number") return;
      setEnLigne(data);
    };
    charger();
    // rafraîchissement doux toutes les 45 s tant que la section est montée
    const id = setInterval(charger, 45_000);
    return () => {
      actif = false;
      clearInterval(id);
    };
  }, []);

  const live = enLigne !== null && enLigne >= SEUIL;

  if (live) {
    return (
      <div className="relative z-10">
        <p className="mb-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-[var(--ivoire)]/70">
          <span className="wal-live-dot" /> En ligne maintenant
        </p>
        <div className="flex items-baseline gap-3 text-[var(--ivoire)]">
          <span style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(64px,9vw,104px)", lineHeight: 0.9 }}>
            {enLigne}
          </span>
          <span className="text-[15px] text-[var(--ivoire)]/70">
            coiffeurs
            <br />
            en ligne
          </span>
        </div>
        <p className="mt-6 text-[13px] text-[var(--ivoire)]/55">À Marrakech, prêts à intervenir.</p>
      </div>
    );
  }

  // Repli : promesse « 10 min »
  return (
    <div className="relative z-10">
      <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[var(--laiton)]">Réponse garantie</p>
      <div className="flex items-baseline gap-3 text-[var(--ivoire)]">
        <span style={{ fontFamily: SerifTitle, fontWeight: 500, fontSize: "clamp(64px,9vw,104px)", lineHeight: 0.9 }}>
          10
        </span>
        <span className="text-[15px] text-[var(--ivoire)]/70">
          minutes
          <br />
          maximum
        </span>
      </div>
      <p className="mt-6 text-[13px] text-[var(--ivoire)]/55">Le temps qu'un coiffeur du quartier vous réponde.</p>
    </div>
  );
}
