"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

type Message = {
  id: string;
  expediteur_id: string;
  role: string;
  contenu: string;
  a_ete_masque: boolean;
  lu: boolean;
  created_at: string;
};

const heure = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

/**
 * Fil de discussion d'une réservation, partagé par /pro et /compte.
 * - peutEcrire : statut 'acceptee' ou 'terminee' depuis < 24 h (sinon lecture seule)
 * - les numéros de téléphone sont masqués côté serveur (trigger Supabase)
 */
export default function Chat({
  supabase,
  reservationId,
  userId,
  role,
  peutEcrire,
  interlocuteur,
}: {
  supabase: SupabaseClient;
  reservationId: string;
  userId: string;
  role: "client" | "coiffeur";
  peutEcrire: boolean;
  interlocuteur: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [texte, setTexte] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const charger = useCallback(async () => {
    const { data } = await supabase
      .from("messages")
      .select("id,expediteur_id,role,contenu,a_ete_masque,lu,created_at")
      .eq("reservation_id", reservationId)
      .order("created_at", { ascending: true });
    setMessages((data as Message[]) ?? []);
  }, [supabase, reservationId]);

  // Chargement + abonnement temps réel filtré sur cette réservation
  useEffect(() => {
    charger();
    const channel = supabase
      .channel(`messages-${reservationId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages", filter: `reservation_id=eq.${reservationId}` },
        () => charger()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, reservationId, charger]);

  const nonLus = messages.filter((m) => m.expediteur_id !== userId && !m.lu);

  // Marquer les messages reçus comme lus à l'ouverture
  useEffect(() => {
    if (!ouvert || nonLus.length === 0) return;
    const ids = nonLus.map((m) => m.id);
    supabase.from("messages").update({ lu: true }).in("id", ids);
  }, [ouvert, nonLus, supabase]);

  // Descendre en bas du fil
  useEffect(() => {
    if (ouvert) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ouvert]);

  const envoyer = async () => {
    const t = texte.trim();
    if (!t || busy) return;
    setBusy(true);
    setTexte("");
    await supabase.from("messages").insert({
      reservation_id: reservationId,
      expediteur_id: userId,
      role,
      contenu: t,
    });
    setBusy(false);
    charger();
  };

  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <button
        onClick={() => setOuvert((o) => !o)}
        className="flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-[0.15em] transition-colors"
      >
        <span>MESSAGERIE</span>
        {!ouvert && nonLus.length > 0 && (
          <span className="w-2 h-2 rounded-full bg-[#A9885A] inline-block" aria-label="nouveaux messages" />
        )}
        <span className="text-white/30">{ouvert ? "▲" : "▼"}</span>
      </button>

      {ouvert && (
        <div className="mt-3">
          <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
            {messages.length === 0 ? (
              <p className="text-white/30 text-xs py-4 text-center">
                Aucun message. Écrivez à {interlocuteur} pour préciser un détail.
              </p>
            ) : (
              messages.map((m) => {
                const mien = m.expediteur_id === userId;
                return (
                  <div key={m.id} className={`flex ${mien ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 text-sm ${
                        mien ? "bg-[#A9885A] text-[#11241B]" : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="leading-snug whitespace-pre-wrap break-words">{m.contenu}</p>
                      <span className={`block text-[10px] mt-1 ${mien ? "text-[#11241B]/50" : "text-white/40"}`}>
                        {heure(m.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {messages.some((m) => m.a_ete_masque) && (
            <p className="text-[#A9885A]/70 text-[11px] mt-2">
              📵 Les numéros de téléphone sont masqués. Tout passe par WAL.
            </p>
          )}

          {peutEcrire ? (
            <div className="flex gap-2 mt-3">
              <input
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && envoyer()}
                placeholder="Votre message…"
                className="flex-1 bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm outline-none focus:border-[#A9885A] transition-colors"
              />
              <button
                onClick={envoyer}
                disabled={busy || !texte.trim()}
                className="bg-[#A9885A] text-[#11241B] text-xs tracking-[0.15em] px-4 hover:bg-white transition-colors disabled:opacity-40"
              >
                ENVOYER
              </button>
            </div>
          ) : (
            <p className="text-white/30 text-xs mt-3 text-center">Conversation clôturée (lecture seule).</p>
          )}
        </div>
      )}
    </div>
  );
}
