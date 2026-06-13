"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

// Email autorisé à voir le dashboard (doit matcher la garde SQL stats_pilote)
const ADMIN_EMAIL = "walidazzimani193@gmail.com";

type Coiffeur = {
  prenom: string;
  grade: string;
  en_ligne: boolean;
  note: number | null;
  courses: number;
  ca: number;
  acceptees: number;
};

type Stats = {
  reservations_total: number;
  en_attente: number;
  acceptee: number;
  terminee: number;
  annulee: number;
  aujourdhui: number;
  ca_realise: number;
  commission_wal: number;
  coiffeurs_total: number;
  coiffeurs_actifs: number;
  coiffeurs_en_ligne: number;
  clients_total: number;
  messages_total: number;
  delai_moyen_min: number;
  taux_acceptation: number;
  par_coiffeur: Coiffeur[];
};

// ── Feuille de route (mise à jour au fil du dev) ──
type Etat = "fait" | "encours" | "afaire";
const roadmap: { etat: Etat; titre: string }[] = [
  { etat: "fait", titre: "Site vitrine (accueil, clients, coiffeurs, à propos, contact)" },
  { etat: "fait", titre: "Réservation client en ligne (/reserver)" },
  { etat: "fait", titre: "Espace coiffeur — « premier qui accepte » (/pro)" },
  { etat: "fait", titre: "Espace client — lien magique + code + Google (/compte)" },
  { etat: "fait", titre: "Base Supabase : RLS, temps réel, acceptation atomique" },
  { etat: "fait", titre: "SMTP Gmail + connexion Google" },
  { etat: "fait", titre: "Messagerie interne client↔coiffeur + masquage des numéros" },
  { etat: "fait", titre: "Dashboard pilote (cette page)" },
  { etat: "afaire", titre: "Vrais comptes coiffeurs (recrutement réseau)" },
  { etat: "afaire", titre: "Offre B2B villas / riads (conciergerie)" },
  { etat: "afaire", titre: "Resend + nom de domaine personnalisé" },
];

const etatStyle: Record<Etat, { txt: string; color: string; dot: string }> = {
  fait: { txt: "Fait", color: "#5BA87A", dot: "●" },
  encours: { txt: "En cours", color: "#C4A882", dot: "◐" },
  afaire: { txt: "À faire", color: "#6B6B6B", dot: "○" },
};

const wrap = "bg-[#0A0A0A] min-h-screen px-6 pt-28 pb-16";
const serif = { fontFamily: "var(--font-cormorant), Georgia, serif" };

export default function PilotePage() {
  const [supabase] = useState<SupabaseClient | null>(() => getSupabase());
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [refusee, setRefusee] = useState(false);

  const charger = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase.rpc("stats_pilote");
    if (error) {
      setRefusee(true);
      setStats(null);
    } else {
      setRefusee(false);
      setStats(data as Stats);
    }
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const mail = data.session?.user.email ?? null;
      setEmail(mail);
      if (mail === ADMIN_EMAIL) charger().finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const mail = session?.user.email ?? null;
      setEmail(mail);
      if (mail === ADMIN_EMAIL) charger();
      else setStats(null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, charger]);

  // Temps réel : toute nouvelle réservation rafraîchit les chiffres
  useEffect(() => {
    if (!supabase || email !== ADMIN_EMAIL) return;
    const channel = supabase
      .channel("pilote-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, () => charger())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, email, charger]);

  const connexionGoogle = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/pilote` },
    });
  };

  const seDeconnecter = async () => {
    await supabase?.auth.signOut();
    setEmail(null);
    setStats(null);
  };

  if (!supabaseConfigured) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <p className="text-white/40 text-sm">Plateforme non configurée.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <p className="text-white/40 text-sm tracking-widest">CHARGEMENT...</p>
      </div>
    );
  }

  // ── Non connecté ──
  if (!email) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="w-full max-w-sm text-center">
          <p className="text-[#C4A882]/60 text-xs tracking-[0.3em] mb-6">TABLEAU DE BORD</p>
          <h1 className="text-white mb-8" style={{ ...serif, fontSize: "32px", fontWeight: 300 }}>
            Accès administrateur
          </h1>
          <button
            onClick={connexionGoogle}
            className="w-full bg-white text-[#0A0A0A] text-sm py-3.5 flex items-center justify-center gap-3 hover:bg-white/90 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z"/></svg>
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  // ── Connecté mais pas admin ──
  if (email !== ADMIN_EMAIL || refusee) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="max-w-md text-center">
          <h1 className="text-white mb-4" style={{ ...serif, fontSize: "30px", fontWeight: 300 }}>
            Accès réservé
          </h1>
          <p className="text-white/40 text-sm mb-8">Cette page est réservée à l&apos;administrateur WAL.</p>
          <button onClick={seDeconnecter} className="text-[#C4A882] text-xs tracking-widest">
            SE DÉCONNECTER
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard admin ──
  const cartes: { label: string; valeur: string; accent?: boolean }[] = stats
    ? [
        { label: "Réservations (total)", valeur: String(stats.reservations_total) },
        { label: "Aujourd'hui", valeur: String(stats.aujourdhui), accent: true },
        { label: "En attente", valeur: String(stats.en_attente) },
        { label: "Acceptées", valeur: String(stats.acceptee) },
        { label: "Terminées", valeur: String(stats.terminee) },
        { label: "Annulées", valeur: String(stats.annulee) },
        { label: "CA réalisé", valeur: `${stats.ca_realise} MAD` },
        { label: "Commission WAL", valeur: `${stats.commission_wal} MAD`, accent: true },
        { label: "Taux d'acceptation", valeur: `${stats.taux_acceptation} %`, accent: true },
        { label: "Délai moyen d'accept.", valeur: `${stats.delai_moyen_min} min` },
        { label: "Coiffeurs en ligne", valeur: String(stats.coiffeurs_en_ligne) },
        { label: "Coiffeurs actifs", valeur: `${stats.coiffeurs_actifs} / ${stats.coiffeurs_total}` },
        { label: "Clients inscrits", valeur: String(stats.clients_total) },
        { label: "Messages échangés", valeur: String(stats.messages_total) },
      ]
    : [];

  const grades: Record<string, string> = {
    novice: "Novice",
    confirme: "Confirmé",
    expert: "Expert",
    maitre: "Maître",
  };
  const parCoiffeur = stats?.par_coiffeur ?? [];

  return (
    <div className={wrap}>
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#C4A882]/60 text-xs tracking-[0.3em] mb-1">TABLEAU DE BORD · PILOTE</p>
            <h1 className="text-white" style={{ ...serif, fontSize: "30px", fontWeight: 400 }}>
              WAL Private
            </h1>
            <p className="text-white/30 text-xs mt-1">Mise à jour en temps réel · {email}</p>
          </div>
          <button onClick={seDeconnecter} className="text-white/40 hover:text-white text-xs tracking-widest transition-colors">
            QUITTER
          </button>
        </div>

        {/* Cartes chiffres */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {cartes.map((c) => (
            <div
              key={c.label}
              className={`border p-5 ${c.accent ? "bg-[#C4A882]/10 border-[#C4A882]/40" : "bg-white/5 border-white/10"}`}
            >
              <p className="text-white/40 text-[11px] tracking-wide mb-2 leading-tight">{c.label}</p>
              <p className={`${c.accent ? "text-[#C4A882]" : "text-white"}`} style={{ ...serif, fontSize: "28px", fontWeight: 400 }}>
                {c.valeur}
              </p>
            </div>
          ))}
        </div>

        {/* Détail par coiffeur */}
        {parCoiffeur.length > 0 && (
          <div className="mb-12">
            <p className="text-white/40 text-xs tracking-[0.2em] mb-4">PAR COIFFEUR</p>
            <div className="border border-white/10 overflow-hidden">
              {/* En-tête */}
              <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.7fr_0.8fr_1fr] gap-2 px-4 py-3 bg-white/5 text-white/40 text-[11px] tracking-wide">
                <span>Coiffeur</span>
                <span className="text-center">Grade</span>
                <span className="text-center">Courses</span>
                <span className="text-center">Note</span>
                <span className="text-right">CA généré</span>
              </div>
              {parCoiffeur.map((c, i) => (
                <div
                  key={`${c.prenom}-${i}`}
                  className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_0.7fr_0.8fr_1fr] gap-2 px-4 py-3 border-t border-white/10 text-sm items-center"
                >
                  <span className="text-white flex items-center gap-2">
                    <span style={{ color: c.en_ligne ? "#5BA87A" : "#4A4A4A" }} className="text-[10px]">●</span>
                    {c.prenom}
                  </span>
                  <span className="text-white/50 text-xs md:text-center">{grades[c.grade] ?? c.grade}</span>
                  <span className="text-white/70 md:text-center">{c.courses}</span>
                  <span className="text-white/70 md:text-center">{c.note != null ? `${c.note}★` : "—"}</span>
                  <span className="text-[#C4A882] text-right" style={serif}>{c.ca} MAD</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feuille de route */}
        <p className="text-white/40 text-xs tracking-[0.2em] mb-4">FEUILLE DE ROUTE</p>
        <div className="flex flex-col gap-2">
          {roadmap.map((t) => {
            const s = etatStyle[t.etat];
            return (
              <div key={t.titre} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-4 py-3">
                <span style={{ color: s.color }} className="text-sm">{s.dot}</span>
                <span className={`flex-1 text-sm ${t.etat === "fait" ? "text-white/50" : "text-white/80"}`}>
                  {t.titre}
                </span>
                <span className="text-[11px] tracking-wide" style={{ color: s.color }}>{s.txt}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
