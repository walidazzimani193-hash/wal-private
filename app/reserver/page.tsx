"use client";

import { useMemo, useState } from "react";
import {
  prestationsV1,
  grades,
  zonesCentre,
  zonesEtendues,
  creneaux,
  MIN_COMMANDE,
  round5,
  calculerPrix,
} from "@/lib/catalogue";
import { getSupabase } from "@/lib/supabase";

// Numéro WhatsApp WAL (repli si la plateforme n'est pas encore configurée)
const WAL_WHATSAPP = "32496974983";

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span
        className="text-[#C4A882]/50"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "34px", fontWeight: 300, lineHeight: 1 }}
      >
        {n}
      </span>
      <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "26px", fontWeight: 500 }}>{title}</h2>
    </div>
  );
}

export default function ReserverPage() {
  const [prestationId, setPrestationId] = useState<string | null>(null);
  const [gradeId, setGradeId] = useState<string>("confirme");
  const [lastMinute, setLastMinute] = useState(false);
  const [date, setDate] = useState("");
  const [creneau, setCreneau] = useState<string | null>(null);
  const [zone, setZone] = useState<string | null>(null);
  const [prenom, setPrenom] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [notes, setNotes] = useState("");
  const [statut, setStatut] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");

  const prestation = prestationsV1.find((p) => p.id === prestationId) ?? null;
  const grade = grades.find((g) => g.id === gradeId)!;
  const zoneEtendue = zone !== null && zonesEtendues.includes(zone);
  const dimanche = !lastMinute && date !== "" && new Date(date + "T12:00:00").getDay() === 0;
  const today = new Date().toISOString().split("T")[0];

  const prix = useMemo(() => {
    if (!prestation || prestation.base === null) return null;
    return calculerPrix({ base: prestation.base, mult: grade.mult, lastMinute, dimanche, zoneEtendue });
  }, [prestation, grade, lastMinute, dimanche, zoneEtendue]);

  const valide =
    prestation !== null &&
    zone !== null &&
    prenom.trim() !== "" &&
    whatsapp.trim() !== "" &&
    (lastMinute || (date !== "" && creneau !== null));

  const quandTexte = lastMinute
    ? "last_minute"
    : `${date} · ${creneaux.find((c) => c.id === creneau)?.label}`;

  const envoyer = async () => {
    if (!valide || !prestation || !prix) return;
    setStatut("envoi");

    const supabase = getSupabase();

    // Mode plateforme : on enregistre la demande, les coiffeurs en ligne la voient
    if (supabase) {
      const { error } = await supabase.from("reservations").insert({
        client_prenom: prenom.trim(),
        client_whatsapp: whatsapp.trim(),
        prestation: prestation.id,
        prestation_label: prestation.label,
        grade: grade.id,
        prix: prix.total,
        zone,
        quand: quandTexte,
        notes: notes.trim() || null,
      });
      setStatut(error ? "erreur" : "ok");
      return;
    }

    // Repli : pas encore de plateforme → on ouvre WhatsApp
    const lignes = [
      "Nouvelle réservation WAL Private",
      `Prestation : ${prestation.label}`,
      `Grade : ${grade.label} (${grade.roman})`,
      lastMinute ? "Quand : LAST MINUTE — aujourd'hui (+25 %)" : `Quand : ${quandTexte}`,
      `Zone : ${zone}${zoneEtendue ? " (zone étendue +50 MAD)" : ""}`,
      `Prix estimé : ${prix.total} MAD${dimanche ? " (majoration dimanche +20 %)" : ""}`,
      `Prénom : ${prenom.trim()}`,
      `WhatsApp : ${whatsapp.trim()}`,
      notes.trim() ? `Notes : ${notes.trim()}` : null,
    ].filter(Boolean);
    window.open(`https://wa.me/${WAL_WHATSAPP}?text=${encodeURIComponent(lignes.join("\n"))}`, "_blank");
    setStatut("ok");
  };

  const inputCls =
    "bg-white border border-[#E8E4DF] px-4 py-3.5 text-sm outline-none focus:border-[#C4A882] transition-colors";
  const labelCls = "text-xs tracking-widest text-[#6B6B6B]";

  // Écran de confirmation
  if (statut === "ok") {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="sep text-[#C4A882]/60 text-xs mb-8 justify-center" style={{ letterSpacing: "0.3em" }}>
            DEMANDE ENVOYÉE
          </p>
          <h1
            className="text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300 }}
          >
            On vous trouve <em style={{ fontStyle: "italic", color: "#C4A882" }}>votre coiffeur.</em>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Vous recevez la confirmation sur WhatsApp dès qu&apos;un professionnel accepte —
            sous 2 h, 30 minutes en Last Minute.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0A0A0A] pt-36 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="sep text-[#C4A882]/60 text-xs mb-8" style={{ letterSpacing: "0.3em" }}>
            RÉSERVATION
          </p>
          <h1
            className="text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300 }}
          >
            Votre coiffeur, <em style={{ fontStyle: "italic", color: "#C4A882" }}>chez vous.</em>
          </h1>
          <p className="text-white/50 text-sm mt-6 max-w-xl leading-relaxed">
            Sans création de compte. Confirmation sur WhatsApp en moins de 2 h — 30 minutes en Last Minute.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F5F0] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* ── Formulaire ── */}
          <div className="flex flex-col gap-14">
            {/* 1. Prestation */}
            <div>
              <SectionTitle n="01" title="Choisissez votre prestation" />
              {(["Femmes", "Hommes & enfants"] as const).map((groupe) => (
                <div key={groupe} className="mb-6">
                  <p className={`${labelCls} mb-3`} style={{ letterSpacing: "0.15em" }}>
                    {groupe.toUpperCase()}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prestationsV1
                      .filter((p) => p.groupe === groupe)
                      .map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPrestationId(p.id)}
                          className={`text-left bg-white border px-5 py-4 transition-colors duration-300 ${
                            prestationId === p.id ? "border-[#C4A882]" : "border-[#E8E4DF] hover:border-[#C4A882]/50"
                          }`}
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="text-sm text-[#0A0A0A]">{p.label}</span>
                            <span className="text-sm text-[#C4A882] whitespace-nowrap">
                              dès {round5((p.base ?? 0) * 0.7)} MAD
                            </span>
                          </div>
                          <span className="text-xs text-[#6B6B6B]">{p.duree}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Grade */}
            <div>
              <SectionTitle n="02" title="Sélectionnez le grade" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {grades.map((g) => {
                  const prixGrade = prestation && prestation.base !== null ? round5(prestation.base * g.mult) : null;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGradeId(g.id)}
                      className={`bg-white border px-4 py-5 text-center transition-colors duration-300 ${
                        gradeId === g.id ? "border-[#C4A882]" : "border-[#E8E4DF] hover:border-[#C4A882]/50"
                      }`}
                    >
                      <span
                        className="block text-[#C4A882]/60 mb-1"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "24px", fontWeight: 300 }}
                      >
                        {g.roman}
                      </span>
                      <span className="block text-sm text-[#0A0A0A]">{g.label}</span>
                      <span className="block text-xs text-[#6B6B6B] mt-1">{g.desc}</span>
                      <span className="block text-sm text-[#C4A882] mt-2">
                        {prixGrade !== null ? `${prixGrade} MAD` : g.id === "maitre" ? "× 2,5" : `× ${g.mult}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Date & créneau */}
            <div>
              <SectionTitle n="03" title="Quand ?" />
              <button
                type="button"
                onClick={() => {
                  setLastMinute(!lastMinute);
                  setCreneau(null);
                  setDate("");
                }}
                className={`w-full border px-5 py-4 mb-4 text-left transition-colors duration-300 ${
                  lastMinute ? "bg-[#0A0A0A] border-[#0A0A0A] text-white" : "bg-white border-[#E8E4DF] hover:border-[#C4A882]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">⚡ Last Minute — aujourd&apos;hui, au plus vite</span>
                  <span className={`text-xs tracking-wider ${lastMinute ? "text-[#C4A882]" : "text-[#6B6B6B]"}`}>+25 %</span>
                </div>
                <p className={`text-xs mt-1 ${lastMinute ? "text-white/50" : "text-[#6B6B6B]"}`}>
                  Confirmation en 30 minutes par le premier coiffeur disponible.
                </p>
              </button>

              {!lastMinute && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelCls} style={{ letterSpacing: "0.15em" }}>
                      DATE
                    </label>
                    <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
                    {dimanche && <p className="text-xs text-[#C4A882]">Dimanche : majoration +20 %</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelCls} style={{ letterSpacing: "0.15em" }}>
                      CRÉNEAU
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {creneaux.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCreneau(c.id)}
                          className={`bg-white border px-2 py-3 text-center transition-colors duration-300 ${
                            creneau === c.id ? "border-[#C4A882]" : "border-[#E8E4DF] hover:border-[#C4A882]/50"
                          }`}
                        >
                          <span className="block text-xs text-[#0A0A0A]">{c.label}</span>
                          <span className="block text-[10px] text-[#6B6B6B] mt-0.5">{c.heures}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Zone */}
            <div>
              <SectionTitle n="04" title="Votre quartier" />
              <div className="flex flex-wrap gap-2">
                {[...zonesCentre, ...zonesEtendues].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZone(z)}
                    className={`bg-white border px-4 py-2.5 text-sm transition-colors duration-300 ${
                      zone === z ? "border-[#C4A882] text-[#0A0A0A]" : "border-[#E8E4DF] text-[#6B6B6B] hover:border-[#C4A882]/50"
                    }`}
                  >
                    {z}
                    {zonesEtendues.includes(z) && <span className="text-[#C4A882] ml-2 text-xs">+50 MAD</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#6B6B6B] mt-3">
                L&apos;adresse exacte vous sera demandée sur WhatsApp après confirmation — elle n&apos;est jamais publiée.
              </p>
            </div>

            {/* 5. Contact */}
            <div>
              <SectionTitle n="05" title="Vos coordonnées" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelCls} style={{ letterSpacing: "0.15em" }}>
                    PRÉNOM
                  </label>
                  <input type="text" placeholder="Votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelCls} style={{ letterSpacing: "0.15em" }}>
                    WHATSAPP
                  </label>
                  <input
                    type="tel"
                    placeholder="+212 6 XX XX XX XX"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <label className={labelCls} style={{ letterSpacing: "0.15em" }}>
                  NOTES (OPTIONNEL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Longueur de cheveux, attentes particulières..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* ── Récapitulatif ── */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-[#0A0A0A] p-8">
              <p className="sep text-[#C4A882]/60 text-xs mb-6" style={{ letterSpacing: "0.3em" }}>
                RÉCAPITULATIF
              </p>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/40">Prestation</dt>
                  <dd className="text-white text-right">{prestation?.label ?? "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/40">Grade</dt>
                  <dd className="text-white text-right">
                    {grade.label} <span className="text-[#C4A882]">({grade.roman})</span>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/40">Quand</dt>
                  <dd className="text-white text-right">
                    {lastMinute ? "Aujourd'hui — Last Minute" : date ? `${date}${creneau ? " · " + creneaux.find((c) => c.id === creneau)?.label : ""}` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/40">Zone</dt>
                  <dd className="text-white text-right">{zone ?? "—"}</dd>
                </div>
              </dl>

              <div className="border-t border-white/10 mt-6 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/40 text-sm">Prix total TTC</span>
                  <span className="text-[#C4A882]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "34px", fontWeight: 400 }}>
                    {prix ? `${prix.total} MAD` : "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-2 text-xs text-white/40">
                  {lastMinute && <span>Inclut majoration Last Minute +25 %</span>}
                  {dimanche && <span>Inclut majoration dimanche +20 %</span>}
                  {zoneEtendue && <span>Inclut déplacement zone étendue +50 MAD</span>}
                  {prix?.minimumApplique && <span>Minimum de commande : {MIN_COMMANDE} MAD</span>}
                  {prix && <span>Règlement en espèces après la prestation</span>}
                </div>
              </div>

              <button
                type="button"
                disabled={!valide || statut === "envoi"}
                onClick={envoyer}
                className={`w-full text-xs tracking-[0.2em] py-4 mt-8 transition-colors duration-300 ${
                  valide && statut !== "envoi"
                    ? "bg-[#C4A882] text-[#0A0A0A] hover:bg-white cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {statut === "envoi" ? "ENVOI..." : "RÉSERVER"}
              </button>
              {statut === "erreur" && (
                <p className="text-red-300/80 text-xs mt-4">
                  Un souci est survenu. Réessayez, ou écrivez-nous sur WhatsApp.
                </p>
              )}
              <p className="text-white/30 text-xs leading-relaxed mt-4">
                Votre demande part au premier coiffeur disponible de votre zone. Annulation gratuite jusqu&apos;à 24 h avant.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
