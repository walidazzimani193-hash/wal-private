"use client";
import { useEffect, useState } from "react";

const SEEN_KEY = "wal_intro_seen";
/** Doit couvrir la fin de l'animation CSS (portes ouvertes à ~3,4 s). */
const DURATION = 3500;

/**
 * Écran d'intro « ouverture des portes » — première arrivée sur le site.
 * Deux panneaux nuit + sceau W qui s'écartent pour révéler la page.
 * Joué une seule fois par session (sessionStorage). Le contenu du site est
 * déjà rendu derrière : aucun blocage, aucun impact SEO/perf.
 * L'animation est pure CSS (robuste même si le timing JS échoue) ; le JS
 * ne gère que le verrou de scroll, le skip-si-déjà-vu et le retrait du nœud.
 */
export function Intro() {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) {
      setSkip(true);
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    document.documentElement.classList.add("wal-intro-lock");
    const t = setTimeout(() => {
      document.documentElement.classList.remove("wal-intro-lock");
      setDone(true);
    }, DURATION);

    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("wal-intro-lock");
    };
  }, []);

  if (done || skip) return null;

  return (
    <div className="wal-intro" aria-hidden="true">
      <div className="wal-intro__panel wal-intro__panel--l" />
      <div className="wal-intro__panel wal-intro__panel--r" />
      <div className="wal-intro__seal">
        <span className="wal-intro__w">W</span>
        <span className="wal-intro__line" />
        <span className="wal-intro__tag">Cercle privé · Marrakech</span>
      </div>
    </div>
  );
}
