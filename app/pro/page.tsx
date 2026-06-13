"use client";

import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { grades } from "@/lib/catalogue";
import Chat from "@/components/Chat";

type Coiffeur = {
  id: string;
  prenom: string;
  nom: string | null;
  grade: string;
  zones: string[];
  en_ligne: boolean;
  actif: boolean;
};

type Reservation = {
  id: string;
  client_prenom: string;
  client_whatsapp: string;
  prestation_label: string;
  grade: string;
  prix: number;
  zone: string;
  quand: string;
  notes: string | null;
  statut: string;
  coiffeur_id: string | null;
  client_id: string | null;
};

const gradeLabel = (id: string) => grades.find((g) => g.id === id)?.label ?? id;
const partPro = (prix: number, grade: string) =>
  Math.round(prix * (grade === "novice" || grade === "confirme" ? 0.85 : 0.8));

export default function ProPage() {
  const [supabase] = useState<SupabaseClient | null>(() => getSupabase());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [coiffeur, setCoiffeur] = useState<Coiffeur | null>(null);
  const [demandes, setDemandes] = useState<Reservation[]>([]);
  const [mesCourses, setMesCourses] = useState<Reservation[]>([]);

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const chargerProfil = useCallback(
    async (uid: string) => {
      if (!supabase) return;
      const { data } = await supabase.from("coiffeurs").select("*").eq("id", uid).single();
      setCoiffeur((data as Coiffeur) ?? null);
    },
    [supabase]
  );

  const chargerReservations = useCallback(
    async (c: Coiffeur) => {
      if (!supabase) return;
      const { data } = await supabase
        .from("reservations")
        .select("*")
        .in("statut", ["en_attente", "acceptee"])
        .order("created_at", { ascending: false });
      const rows = (data as Reservation[]) ?? [];
      setDemandes(rows.filter((r) => r.statut === "en_attente" && c.zones.includes(r.zone)));
      setMesCourses(rows.filter((r) => r.statut === "acceptee" && r.coiffeur_id === c.id));
    },
    [supabase]
  );

  // Session au démarrage
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user.id ?? null;
      setUserId(uid);
      if (uid) chargerProfil(uid).finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      if (uid) chargerProfil(uid);
      else {
        setCoiffeur(null);
        setDemandes([]);
        setMesCourses([]);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, chargerProfil]);

  // Realtime : toute modif de réservation recharge les listes
  useEffect(() => {
    if (!supabase || !coiffeur) return;
    chargerReservations(coiffeur);
    const channel = supabase
      .channel("reservations-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, () => {
        chargerReservations(coiffeur);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, coiffeur, chargerReservations]);

  const seConnecter = async () => {
    if (!supabase) return;
    setBusy(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setLoginError("Identifiants incorrects.");
    setBusy(false);
  };

  const seDeconnecter = async () => {
    await supabase?.auth.signOut();
  };

  const toggleEnLigne = async () => {
    if (!supabase || !coiffeur) return;
    const next = !coiffeur.en_ligne;
    setCoiffeur({ ...coiffeur, en_ligne: next });
    await supabase.from("coiffeurs").update({ en_ligne: next }).eq("id", coiffeur.id);
  };

  const accepter = async (id: string) => {
    if (!supabase || !coiffeur) return;
    const { data } = await supabase.rpc("accepter_reservation", { resa_id: id });
    if (!data) {
      // déjà prise par un autre — la liste se rafraîchit
      chargerReservations(coiffeur);
      return;
    }
    chargerReservations(coiffeur);
  };

  const terminer = async (id: string) => {
    if (!supabase || !coiffeur) return;
    await supabase
      .from("reservations")
      .update({ statut: "terminee", terminee_at: new Date().toISOString() })
      .eq("id", id);
    chargerReservations(coiffeur);
  };

  const wrap = "bg-[#11241B] min-h-screen px-6 pt-28 pb-16";

  // ── Plateforme non configurée ──
  if (!supabaseConfigured) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="max-w-md text-center">
          <p className="sep text-[#A9885A]/60 text-xs mb-6 justify-center" style={{ letterSpacing: "0.3em" }}>
            ESPACE COIFFEUR
          </p>
          <h1 className="text-white mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "32px", fontWeight: 300 }}>
            Plateforme bientôt disponible
          </h1>
          <p className="text-white/40 text-sm">La connexion des coiffeurs sera activée très prochainement.</p>
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

  // ── Écran de connexion ──
  if (!userId) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="w-full max-w-sm">
          <p className="sep text-[#A9885A]/60 text-xs mb-6 justify-center" style={{ letterSpacing: "0.3em" }}>
            ESPACE COIFFEUR
          </p>
          <h1 className="text-white text-center mb-8" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "34px", fontWeight: 300 }}>
            Connexion
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/15 text-white px-4 py-3.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && seConnecter()}
              className="bg-white/5 border border-white/15 text-white px-4 py-3.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
            />
            {loginError && <p className="text-red-300/80 text-xs">{loginError}</p>}
            <button
              onClick={seConnecter}
              disabled={busy || !email || !password}
              className="bg-[#A9885A] text-[#11241B] text-xs tracking-[0.2em] py-4 mt-2 hover:bg-white transition-colors disabled:opacity-40"
            >
              {busy ? "CONNEXION..." : "SE CONNECTER"}
            </button>
            <p className="text-white/30 text-xs text-center mt-2">
              Votre compte est créé par l&apos;équipe WAL. Pas encore des nôtres ?{" "}
              <a href="/coiffeurs" className="text-[#A9885A]">Rejoindre</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Compte sans profil / non validé ──
  if (!coiffeur || !coiffeur.actif) {
    return (
      <div className={`${wrap} flex items-center justify-center`}>
        <div className="max-w-md text-center">
          <h1 className="text-white mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "30px", fontWeight: 300 }}>
            Compte en cours de validation
          </h1>
          <p className="text-white/40 text-sm mb-8">
            Votre profil est en attente d&apos;activation par l&apos;équipe WAL. Vous serez prévenu dès qu&apos;il est prêt.
          </p>
          <button onClick={seDeconnecter} className="text-[#A9885A] text-xs tracking-widest">
            SE DÉCONNECTER
          </button>
        </div>
      </div>
    );
  }

  // ── Tableau de bord coiffeur ──
  return (
    <div className={wrap}>
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#A9885A]/60 text-xs tracking-[0.3em] mb-1">ESPACE COIFFEUR</p>
            <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "30px", fontWeight: 400 }}>
              Bonjour {coiffeur.prenom}
            </h1>
            <p className="text-white/40 text-xs mt-1">
              {gradeLabel(coiffeur.grade)} · {coiffeur.zones.join(", ") || "aucune zone"}
            </p>
          </div>
          <button onClick={seDeconnecter} className="text-white/40 hover:text-white text-xs tracking-widest transition-colors">
            QUITTER
          </button>
        </div>

        {/* Toggle disponibilité */}
        <button
          onClick={toggleEnLigne}
          className={`w-full border px-6 py-5 mb-10 flex items-center justify-between transition-colors duration-300 ${
            coiffeur.en_ligne ? "bg-[#A9885A] border-[#A9885A] text-[#11241B]" : "bg-white/5 border-white/15 text-white"
          }`}
        >
          <span className="text-sm">
            {coiffeur.en_ligne ? "Vous êtes en ligne — prêt à travailler" : "Vous êtes hors ligne"}
          </span>
          <span
            className={`text-xs tracking-[0.2em] px-3 py-1.5 ${
              coiffeur.en_ligne ? "bg-[#11241B] text-[#A9885A]" : "bg-white/10 text-white/60"
            }`}
          >
            {coiffeur.en_ligne ? "EN LIGNE" : "PASSER EN LIGNE"}
          </span>
        </button>

        {/* Mes courses en cours */}
        {mesCourses.length > 0 && (
          <div className="mb-10">
            <p className="text-white/40 text-xs tracking-[0.2em] mb-4">MES COURSES</p>
            <div className="flex flex-col gap-3">
              {mesCourses.map((r) => (
                <div key={r.id} className="bg-white/5 border border-[#A9885A]/30 p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-white text-sm">{r.prestation_label}</span>
                    <span className="text-[#A9885A] text-sm">{partPro(r.prix, r.grade)} MAD pour vous</span>
                  </div>
                  <p className="text-white/40 text-xs mb-1">
                    {r.client_prenom} · {r.zone} · {r.quand === "last_minute" ? "Last Minute" : r.quand}
                  </p>
                  {!r.client_id && (
                    <p className="text-white/40 text-xs mb-4">WhatsApp : {r.client_whatsapp}</p>
                  )}
                  {r.notes && <p className="text-white/40 text-xs italic mb-4">« {r.notes} »</p>}
                  <button
                    onClick={() => terminer(r.id)}
                    className="bg-white/10 hover:bg-[#A9885A] hover:text-[#11241B] text-white text-xs tracking-[0.15em] px-5 py-2.5 transition-colors"
                  >
                    MARQUER TERMINÉ
                  </button>
                  {supabase && r.client_id ? (
                    <Chat
                      supabase={supabase}
                      reservationId={r.id}
                      userId={coiffeur.id}
                      role="coiffeur"
                      peutEcrire
                      interlocuteur={r.client_prenom}
                    />
                  ) : (
                    <p className="text-white/30 text-xs mt-3">
                      Réservation invité — contact via WhatsApp ci-dessus.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demandes disponibles */}
        <div>
          <p className="text-white/40 text-xs tracking-[0.2em] mb-4">
            DEMANDES DANS VOS ZONES {coiffeur.en_ligne && demandes.length > 0 && `(${demandes.length})`}
          </p>

          {!coiffeur.en_ligne ? (
            <div className="bg-white/5 border border-white/10 p-8 text-center">
              <p className="text-white/40 text-sm">Passez en ligne pour recevoir les demandes.</p>
            </div>
          ) : demandes.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-8 text-center">
              <p className="text-white/40 text-sm">Aucune demande pour le moment. Restez en ligne, ça arrive.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {demandes.map((r) => (
                <div key={r.id} className="bg-white/5 border border-white/15 p-5 hover:border-[#A9885A]/40 transition-colors">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-white text-sm">{r.prestation_label}</span>
                    <span className="text-[#A9885A] text-sm">{partPro(r.prix, r.grade)} MAD pour vous</span>
                  </div>
                  <p className="text-white/40 text-xs mb-1">
                    {r.zone} · {r.quand === "last_minute" ? "⚡ Last Minute" : r.quand} · {gradeLabel(r.grade)}
                  </p>
                  {r.notes && <p className="text-white/40 text-xs italic mb-3">« {r.notes} »</p>}
                  <button
                    onClick={() => accepter(r.id)}
                    className="bg-[#A9885A] text-[#11241B] text-xs tracking-[0.15em] px-6 py-2.5 mt-2 hover:bg-white transition-colors"
                  >
                    ACCEPTER
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
