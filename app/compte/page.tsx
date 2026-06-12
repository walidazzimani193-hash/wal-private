"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { zones } from "@/lib/catalogue";
import Chat from "@/components/Chat";

type ClientProfil = { prenom: string | null; telephone: string | null; adresse: string | null; zone: string | null };
type Reservation = {
  id: string;
  prestation_label: string;
  prix: number;
  zone: string;
  quand: string;
  statut: string;
  coiffeur_prenom: string | null;
  created_at: string;
  terminee_at: string | null;
};

// Écriture autorisée : acceptée, ou terminée depuis moins de 24 h
const peutEcrire = (r: Reservation) =>
  r.statut === "acceptee" ||
  (r.statut === "terminee" && !!r.terminee_at && Date.now() - new Date(r.terminee_at).getTime() < 24 * 3600 * 1000);

const statutLabel: Record<string, { txt: string; color: string }> = {
  en_attente: { txt: "En attente d'un coiffeur", color: "#C4A882" },
  acceptee: { txt: "Acceptée — coiffeur assigné", color: "#5BA87A" },
  terminee: { txt: "Terminée", color: "#6B6B6B" },
  annulee: { txt: "Annulée", color: "#B05050" },
};

const wrap = "bg-[#0A0A0A] min-h-screen px-6 pt-28 pb-16";

export default function ComptePage() {
  const [supabase] = useState<SupabaseClient | null>(() => getSupabase());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [profil, setProfil] = useState<ClientProfil>({ prenom: "", telephone: "", adresse: "", zone: "" });
  const [resas, setResas] = useState<Reservation[]>([]);

  // auth email (lien magique + code 6 chiffres)
  const [authEmail, setAuthEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [code, setCode] = useState("");
  const [authMsg, setAuthMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [profilSaved, setProfilSaved] = useState(false);

  const chargerDonnees = useCallback(
    async (uid: string) => {
      if (!supabase) return;
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("clients").select("prenom,telephone,adresse,zone").eq("id", uid).maybeSingle(),
        supabase
          .from("reservations")
          .select("id,prestation_label,prix,zone,quand,statut,coiffeur_prenom,created_at,terminee_at")
          .eq("client_id", uid)
          .order("created_at", { ascending: false }),
      ]);
      if (p) setProfil(p as ClientProfil);
      setResas((r as Reservation[]) ?? []);
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user.id ?? null;
      setUserId(uid);
      if (uid) chargerDonnees(uid).finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      if (uid) chargerDonnees(uid);
      else setResas([]);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, chargerDonnees]);

  // Realtime sur mes réservations
  useEffect(() => {
    if (!supabase || !userId) return;
    const channel = supabase
      .channel("mes-reservations")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations", filter: `client_id=eq.${userId}` }, () =>
        chargerDonnees(userId)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, chargerDonnees]);

  const envoyerLien = async () => {
    if (!supabase || !authEmail.trim()) return;
    setBusy(true);
    setAuthMsg(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: authEmail.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/compte`,
      },
    });
    setBusy(false);
    if (error) setAuthMsg("Impossible d'envoyer l'email. Vérifiez l'adresse.");
    else setLinkSent(true);
  };

  const verifierCode = async () => {
    if (!supabase || code.trim().length < 6) return;
    setBusy(true);
    setAuthMsg(null);
    const { error } = await supabase.auth.verifyOtp({
      email: authEmail.trim(),
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) setAuthMsg("Code incorrect ou expiré.");
    // succès → onAuthStateChange remplit userId et bascule l'écran
  };

  const connexionGoogle = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/compte` },
    });
  };

  const enregistrerProfil = async () => {
    if (!supabase || !userId) return;
    setBusy(true);
    await supabase.from("clients").upsert({ id: userId, ...profil });
    setBusy(false);
    setProfilSaved(true);
    setTimeout(() => setProfilSaved(false), 2500);
  };

  const seDeconnecter = async () => {
    await supabase?.auth.signOut();
    setLinkSent(false);
    setAuthEmail("");
  };

  const inputDark =
    "bg-white/5 border border-white/15 text-white px-4 py-3.5 text-sm outline-none focus:border-[#C4A882] transition-colors";

  if (!supabaseConfigured) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="max-w-md text-center">
          <h1 className="text-white mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "30px", fontWeight: 300 }}>
            Espace client bientôt disponible
          </h1>
          <p className="text-white/40 text-sm">La création de compte sera activée très prochainement.</p>
        </div>
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

  // ── Écran de connexion / création de compte ──
  if (!userId) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="w-full max-w-sm">
          <p className="sep text-[#C4A882]/60 text-xs mb-6 justify-center" style={{ letterSpacing: "0.3em" }}>
            ESPACE CLIENT
          </p>
          <h1 className="text-white text-center mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "34px", fontWeight: 300 }}>
            Connexion
          </h1>
          <p className="text-white/40 text-sm text-center mb-8">
            Suivez vos demandes et retrouvez votre historique. Pas de mot de passe.
          </p>

          <button
            onClick={connexionGoogle}
            className="w-full bg-white text-[#0A0A0A] text-sm py-3.5 flex items-center justify-center gap-3 hover:bg-white/90 transition-colors mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z"/></svg>
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">ou par email</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          {linkSent ? (
            <div className="bg-white/5 border border-[#C4A882]/30 p-6">
              <p className="text-white text-sm mb-2 text-center">Email envoyé ✓</p>
              <p className="text-white/50 text-xs leading-relaxed text-center mb-5">
                Envoyé à <span className="text-[#C4A882]">{authEmail}</span>. Cliquez le lien dans
                l&apos;email, <span className="text-white/70">ou</span> entrez le code reçu ci-dessous.
                Pensez à vérifier vos spams.
              </p>
              <input
                inputMode="numeric"
                maxLength={8}
                placeholder="Code reçu par email"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && verifierCode()}
                className={`${inputDark} w-full text-center tracking-[0.3em]`}
              />
              <button
                onClick={verifierCode}
                disabled={busy || code.length < 6}
                className="w-full mt-3 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors disabled:opacity-40"
              >
                {busy ? "VÉRIFICATION..." : "ME CONNECTER"}
              </button>
              <button
                onClick={() => {
                  setLinkSent(false);
                  setCode("");
                  setAuthMsg(null);
                }}
                className="text-white/40 text-xs tracking-widest hover:text-white transition-colors mt-4 block mx-auto"
              >
                ← CHANGER D&apos;EMAIL
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Votre email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && envoyerLien()}
                className={inputDark}
              />
              <button
                onClick={envoyerLien}
                disabled={busy || !authEmail}
                className="bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] py-4 hover:bg-white transition-colors disabled:opacity-40"
              >
                {busy ? "ENVOI..." : "RECEVOIR MON LIEN / CODE"}
              </button>
            </div>
          )}
          {authMsg && <p className="text-red-300/80 text-xs text-center mt-4">{authMsg}</p>}
        </div>
      </div>
    );
  }

  // ── Tableau de bord client ──
  const enCours = resas.filter((r) => r.statut === "en_attente" || r.statut === "acceptee");
  const historique = resas.filter((r) => r.statut === "terminee" || r.statut === "annulee");

  return (
    <div className={wrap}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#C4A882]/60 text-xs tracking-[0.3em] mb-1">ESPACE CLIENT</p>
            <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "30px", fontWeight: 400 }}>
              Bonjour {profil.prenom || "👋"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/reserver" className="bg-[#C4A882] text-[#0A0A0A] text-xs tracking-widest px-5 py-2.5 hover:bg-white transition-colors">
              RÉSERVER
            </a>
            <button onClick={seDeconnecter} className="text-white/40 hover:text-white text-xs tracking-widest transition-colors">
              QUITTER
            </button>
          </div>
        </div>

        {/* Demandes en cours */}
        <div className="mb-10">
          <p className="text-white/40 text-xs tracking-[0.2em] mb-4">DEMANDES EN COURS {enCours.length > 0 && `(${enCours.length})`}</p>
          {enCours.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-8 text-center">
              <p className="text-white/40 text-sm">Aucune demande en cours. <a href="/reserver" className="text-[#C4A882]">Réservez un service</a>.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {enCours.map((r) => (
                <div key={r.id} className="bg-white/5 border border-white/15 p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-white text-sm">{r.prestation_label}</span>
                    <span className="text-[#C4A882] text-sm">{r.prix} MAD</span>
                  </div>
                  <p className="text-white/40 text-xs mb-2">
                    {r.zone} · {r.quand === "last_minute" ? "⚡ Last Minute" : r.quand}
                  </p>
                  <span className="inline-block text-xs px-3 py-1" style={{ backgroundColor: statutLabel[r.statut].color + "22", color: statutLabel[r.statut].color }}>
                    {statutLabel[r.statut].txt}
                    {r.statut === "acceptee" && r.coiffeur_prenom ? ` · ${r.coiffeur_prenom}` : ""}
                  </span>
                  {supabase && userId && r.statut === "acceptee" && (
                    <Chat
                      supabase={supabase}
                      reservationId={r.id}
                      userId={userId}
                      role="client"
                      peutEcrire={peutEcrire(r)}
                      interlocuteur={r.coiffeur_prenom ?? "votre coiffeur"}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historique */}
        {historique.length > 0 && (
          <div className="mb-10">
            <p className="text-white/40 text-xs tracking-[0.2em] mb-4">HISTORIQUE</p>
            <div className="flex flex-col gap-2">
              {historique.map((r) => (
                <div key={r.id} className="bg-white/[0.03] border border-white/10 px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">{r.prestation_label}</span>
                    <span className="text-white/40 text-xs">
                      {r.created_at.split("T")[0]} · {statutLabel[r.statut].txt}
                    </span>
                  </div>
                  {supabase && userId && r.statut === "terminee" && (
                    <Chat
                      supabase={supabase}
                      reservationId={r.id}
                      userId={userId}
                      role="client"
                      peutEcrire={peutEcrire(r)}
                      interlocuteur={r.coiffeur_prenom ?? "votre coiffeur"}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mes informations */}
        <div>
          <p className="text-white/40 text-xs tracking-[0.2em] mb-4">MES INFORMATIONS</p>
          <div className="bg-white/5 border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputDark} placeholder="Prénom" value={profil.prenom ?? ""} onChange={(e) => setProfil({ ...profil, prenom: e.target.value })} />
            <input className={inputDark} placeholder="Téléphone WhatsApp" value={profil.telephone ?? ""} onChange={(e) => setProfil({ ...profil, telephone: e.target.value })} />
            <input className={`${inputDark} sm:col-span-2`} placeholder="Adresse" value={profil.adresse ?? ""} onChange={(e) => setProfil({ ...profil, adresse: e.target.value })} />
            <select className={`${inputDark} sm:col-span-2`} value={profil.zone ?? ""} onChange={(e) => setProfil({ ...profil, zone: e.target.value })}>
              <option value="">Quartier habituel</option>
              {zones.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
            <button onClick={enregistrerProfil} disabled={busy} className="sm:col-span-2 bg-[#C4A882] text-[#0A0A0A] text-xs tracking-[0.2em] py-3.5 hover:bg-white transition-colors disabled:opacity-40">
              {profilSaved ? "ENREGISTRÉ ✓" : "ENREGISTRER MES INFOS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
