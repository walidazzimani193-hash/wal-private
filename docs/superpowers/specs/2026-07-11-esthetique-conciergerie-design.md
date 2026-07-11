# Esthétique « Conciergerie 5 étoiles » — design

**Date** : 2026-07-11 · **Validé par** : Salim · **Objectif** : le client qui arrive sur wal-private.vercel.app doit sentir un vrai savoir-faire dès l'arrivée. Registre : conciergerie 5 étoiles marocaine (Royal Mansour / Mamounia) — chaleur raffinée, ornements fins, cérémonial. **Sans images** (design pur ; visuels Kling plus tard).

## Décisions verrouillées

- Palette et typos existantes inchangées : vert `--vert`, nuit `--nuit`, ivoire `--ivoire`, laiton `--laiton` (accent max 10 %), Cormorant Garamond + Manrope.
- Zéro dépendance ajoutée : CSS + SVG inline uniquement.
- `app/page.tsx` reste Server Component ; les îlots client existants suffisent.
- Répartition : ~70 % home, ~30 % nivellement des 5 pages client (`/reserver /clients /coiffeurs /a-propos /contact`). Dashboards `/pro /compte /pilote` : non touchés.
- `prefers-reduced-motion` respecté sur tout nouvel effet.

## 1. Fondation — système d'ornement (réutilisable)

- **Filets & coins** : cadres fins laiton double filet, angles ornés discrets (inspiration zellige).
- **Motif signature khatam** : trame étoile 8 branches SVG en filigrane sur fonds nuit, opacité ~3 %.
- **Sceau W enrichi** : anneau gravé + texte circulaire « CERCLE PRIVÉ · MARRAKECH » rotation très lente.
- **Couture de section** : filet + diamant laiton centré à chaque passage nuit ↔ ivoire.
- **Liens/boutons** : souligné laiton animé, focus/hover raffinés.

## 2. Home

- Hero cérémonial : entrée séquencée (titre → filet → boutons), panneau sceau redessiné (anneau rotatif), filet vertical de couture vers la section suivante.
- Marquee : séparateurs diamant, rythme plus feutré.
- Comment ça marche : grands chiffres Cormorant + ligne de progression dessinée au scroll.
- Grades : cartes de membre (double filet, hover lift + reflet laiton).
- Last Minute : panneau nuit + filigrane khatam + compteur existant.
- FAQ : accordéons filetés, symbole + rotatif.

## 3. Pages internes

Heros ornés (eyebrow + coins), coutures de transition, formulaire `/reserver` : sections encadrées fin + focus laiton.

## 4. Garde-fous & correctifs

- Build `next build` + `tsc --noEmit` verts à chaque étape ; perf intacte (pages statiques).
- **Fix bug reveal** : élément `.reveal` déjà au-dessus du viewport après un scroll rapide reste invisible (observé en prod : boutons hero, opacity 0 à jamais). Corriger `components/motion/Reveal.tsx` pour révéler tout élément dont le haut est au-dessus du viewport au moment de l'observation.
- Mobile soigné section par section.

## Critère de succès

Un visiteur froid ouvre la home sur mobile ou desktop et perçoit une maison qui maîtrise : rien de générique, ornement cohérent partout, aucun effet cassé, aucune régression de contenu ni de parcours de réservation.
