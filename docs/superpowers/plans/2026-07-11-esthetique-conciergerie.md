# Esthétique « Conciergerie 5 étoiles » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pousser l'esthétique du parcours client WAL Private au niveau « conciergerie 5 étoiles marocaine » — ornements fins, cérémonial, sans images — pour que le visiteur perçoive un vrai savoir-faire dès l'arrivée.

**Architecture:** Un système d'ornement réutilisable (classes CSS dans `app/globals.css` + 2 petits composants serveur dans `components/ui/Ornements.tsx`), appliqué à fond sur la home (`app/page.tsx`) puis décliné sur les 5 pages client. Aucune dépendance ajoutée, `app/page.tsx` reste Server Component.

**Tech Stack:** Next.js 16 App Router, Tailwind 4 (classes arbitraires + CSS custom dans globals.css), SVG inline.

## Global Constraints

- Palette inchangée : `--vert #1F3A2D`, `--nuit #11241B`, `--ivoire #F2EDE3`, `--laiton #A9885A` (accent max 10 % d'une vue), `--laiton-texte #8A6D43`, easing `--ease`.
- Typos inchangées : Cormorant Garamond (titres, via `var(--font-cormorant)`) + Manrope.
- Zéro dépendance npm ajoutée. CSS + SVG inline uniquement.
- `app/page.tsx` reste **Server Component** (pas de `"use client"`).
- `prefers-reduced-motion: reduce` : toute nouvelle animation doit être neutralisée.
- Dashboards `/pro /compte /pilote` : NE PAS toucher.
- Ton « cercle », zéro emoji, pas de mots bannis (salon/plateforme/application).
- Vérification à chaque tâche : `npx tsc --noEmit` puis `npm run build` (12/12 routes) verts. Le preview MCP est KO dans ce repo (chemin à espace) → vérifier via `npm run dev` en Bash + `curl -s localhost:3000/... | grep`.
- Commit après chaque tâche (messages `feat(esthetique): ...`), PAS de push avant la vérif finale.

---

### Task 1: Fix bug Reveal (élément déjà passé = invisible à jamais)

**Files:**
- Modify: `components/motion/Reveal.tsx:23-37`

**Interfaces:**
- Produces: comportement `Reveal` corrigé — tout élément dont le haut est déjà au-dessus du viewport au moment de l'observation devient visible immédiatement. API inchangée.

Constaté en prod : après un scroll rapide (ancre, scrollTo), un `.reveal` passé au-dessus du viewport entre deux frames n'intersecte jamais → reste opacity 0 (vu sur les boutons du hero).

- [ ] **Step 1: Corriger le useEffect**

Remplacer le corps du `useEffect` (lignes 23-37) par :

```tsx
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Déjà passé au-dessus du viewport (scroll rapide, ancre) : révéler direct.
    if (el.getBoundingClientRect().bottom < 0) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
```

- [ ] **Step 2: Vérifier**

Run: `npx tsc --noEmit` → 0 erreur.
Run: `npm run dev &` puis dans un navigateur ou via node : scroller instantanément en bas de page et vérifier qu'aucun `.reveal` au-dessus du viewport ne reste sans `.is-visible`. À défaut de navigateur : relire le code — les deux garde-fous (`bottom < 0` avant observation, `boundingClientRect.bottom < 0` dans le callback) couvrent le cas.

- [ ] **Step 3: Commit**

```bash
git add components/motion/Reveal.tsx
git commit -m "fix(reveal): revele les elements deja passes au-dessus du viewport (scroll rapide)"
```

---

### Task 2: Fondation — système d'ornement (CSS + composants)

**Files:**
- Modify: `app/globals.css` (ajouter un bloc après la section `.sep`, ~ligne 53)
- Create: `components/ui/Ornements.tsx`

**Interfaces:**
- Produces (CSS): `.wal-coins` (4 coins laiton sur un bloc), `.wal-frame` (double filet), `.wal-khatam` (filigrane étoile 8 branches, à poser en overlay absolu sur fond nuit/vert), `.wal-link` (souligné laiton animé), `.wal-trace` (ligne qui se dessine quand le `.reveal` parent devient visible), `.wal-sceau-rotor` (rotation lente du texte circulaire).
- Produces (TSX): `Couture({ max?: string })` — couture de section filet+diamant ; `Sceau({ size?: number, className?: string })` — sceau W avec anneaux gravés + texte circulaire rotatif. Tous deux **Server Components** (pas de "use client").

- [ ] **Step 1: Ajouter le bloc CSS dans `app/globals.css`** (après le bloc `.sep`, avant `.concept-card`)

```css
/* ───────────────────────────────────────────────
   ORNEMENTS « CONCIERGERIE » — filets, coins,
   filigrane khatam, sceau, coutures de section
   ─────────────────────────────────────────────── */

/* 4 coins laiton (8 background-gradients, aucun pseudo-élément consommé).
   À poser sur un bloc SANS background-image propre. */
.wal-coins {
  --coin: rgba(169, 136, 90, 0.55);
  --coin-l: 16px;
  background-image:
    linear-gradient(var(--coin), var(--coin)), linear-gradient(var(--coin), var(--coin)),
    linear-gradient(var(--coin), var(--coin)), linear-gradient(var(--coin), var(--coin)),
    linear-gradient(var(--coin), var(--coin)), linear-gradient(var(--coin), var(--coin)),
    linear-gradient(var(--coin), var(--coin)), linear-gradient(var(--coin), var(--coin));
  background-position:
    top left, top left, top right, top right,
    bottom left, bottom left, bottom right, bottom right;
  background-size:
    var(--coin-l) 1px, 1px var(--coin-l), var(--coin-l) 1px, 1px var(--coin-l),
    var(--coin-l) 1px, 1px var(--coin-l), var(--coin-l) 1px, 1px var(--coin-l);
  background-repeat: no-repeat;
}

/* Double filet : bordure + filet intérieur décalé de 5px */
.wal-frame {
  position: relative;
  border: 1px solid rgba(169, 136, 90, 0.4);
}
.wal-frame::before {
  content: "";
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(169, 136, 90, 0.18);
  pointer-events: none;
  z-index: 1;
}

/* Filigrane khatam (étoile 8 branches = 2 carrés à 45°) — fonds sombres.
   Overlay absolu, on doit le sentir, pas le voir. */
.wal-khatam {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112' viewBox='0 0 112 112'%3E%3Cg fill='none' stroke='%23F2EDE3' stroke-width='0.7'%3E%3Crect x='38' y='38' width='36' height='36'/%3E%3Crect x='38' y='38' width='36' height='36' transform='rotate(45 56 56)'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 112px 112px;
  opacity: 0.035;
}

/* Souligné laiton animé (liens) */
.wal-link {
  position: relative;
}
.wal-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: var(--laiton);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.45s var(--ease);
}
.wal-link:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

/* Ligne qui se dessine quand le .reveal parent devient visible */
.wal-trace {
  height: 1px;
  background: linear-gradient(to right, var(--laiton), rgba(169, 136, 90, 0.12));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1.4s var(--ease) 0.35s;
}
.reveal.is-visible .wal-trace {
  transform: scaleX(1);
}

/* Rotation lente du texte circulaire du sceau */
.wal-sceau-rotor {
  transform-box: view-box;
  transform-origin: 50% 50%;
  animation: wal-sceau-spin 80s linear infinite;
}
@keyframes wal-sceau-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .wal-sceau-rotor { animation: none; }
  .wal-trace { transform: none; transition: none; }
  .wal-link::after { transition: none; }
}
```

- [ ] **Step 2: Créer `components/ui/Ornements.tsx`**

```tsx
/**
 * Ornements « conciergerie » — Server Components (zéro JS client).
 * Couture : filet + diamant laiton à la frontière entre deux sections.
 * Sceau  : W gravé, anneaux + texte circulaire en rotation lente (CSS).
 */

export function Couture({ max = "1080px" }: { max?: string }) {
  return (
    <div aria-hidden="true" className="relative z-10 flex h-0 items-center justify-center overflow-visible px-8">
      <span
        className="h-px w-full"
        style={{
          maxWidth: max,
          background:
            "linear-gradient(to right, transparent, rgba(169,136,90,0.45), transparent)",
        }}
      />
      <span className="absolute h-[7px] w-[7px] rotate-45 bg-[var(--laiton)]" />
    </div>
  );
}

export function Sceau({ size = 230, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="97" stroke="rgba(169,136,90,0.5)" strokeWidth="1" />
      <circle cx="100" cy="100" r="91" stroke="rgba(169,136,90,0.2)" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" stroke="rgba(169,136,90,0.35)" strokeWidth="1" />
      <g className="wal-sceau-rotor">
        <defs>
          <path
            id="wal-sceau-arc"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text
          fontSize="10"
          letterSpacing="3.4"
          fill="rgba(242,237,227,0.5)"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          <textPath href="#wal-sceau-arc">
            CERCLE PRIVÉ · MARRAKECH · CERCLE PRIVÉ · MARRAKECH ·
          </textPath>
        </text>
      </g>
      <text
        x="100"
        y="121"
        textAnchor="middle"
        fontWeight="500"
        fontSize="60"
        fill="rgba(242,237,227,0.92)"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        W
      </text>
    </svg>
  );
}
```

- [ ] **Step 3: Vérifier + commit**

Run: `npx tsc --noEmit` → 0 erreur. `npm run build` → 12/12 routes.

```bash
git add app/globals.css components/ui/Ornements.tsx
git commit -m "feat(esthetique): systeme d'ornement conciergerie (coins, double filet, khatam, sceau, coutures)"
```

---

### Task 3: Home — hero cérémonial + marquee raffiné

**Files:**
- Modify: `app/page.tsx` (hero lignes 80-155, import)
- Modify: `components/ui/Marquee.tsx:29-35`

**Interfaces:**
- Consumes: `Couture`, `Sceau` de `components/ui/Ornements.tsx` ; classes `.wal-frame .wal-khatam .wal-link` (Task 2).

- [ ] **Step 1: Hero — panneau sceau redessiné**

Dans `app/page.tsx`, ajouter l'import :

```tsx
import { Couture, Sceau } from "@/components/ui/Ornements";
```

Remplacer le contenu du panneau droit (lignes 137-153, le `<Reveal delay={0.35} direction="left" ...>`) par :

```tsx
          {/* panneau sceau + halo (là où était l'image) */}
          <Reveal delay={0.35} direction="left" className="relative hidden md:block">
            <div className="wal-frame relative aspect-[4/5] overflow-hidden bg-[linear-gradient(160deg,#16301f_0%,#0d1d14_100%)]">
              <span className="wal-khatam" />
              <Halo placement="top-right" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                <Sceau size={250} />
                <span className="mt-7 block h-px w-12 bg-[var(--laiton)]/50" />
                <p className="mt-5 text-[11px] uppercase tracking-[0.32em] text-[var(--ivoire)]/55">
                  Cercle privé · Marrakech
                </p>
              </div>
            </div>
            <span className="absolute -bottom-4 -left-4 z-20 bg-[var(--laiton)] px-4 py-3 text-[11px] font-semibold tracking-[0.18em] text-[var(--nuit)]">
              RÉSERVATION OUVERTE
            </span>
          </Reveal>
```

- [ ] **Step 2: Hero — lien MON COMPTE en `.wal-link` + filet de couture sous le hero**

Ligne 112-117, remplacer le `<Link href="/compte" ...>` par :

```tsx
                <Link
                  href="/compte"
                  className="wal-link pb-0.5 text-[12px] tracking-[0.1em] text-[var(--ivoire)]/60 transition-colors duration-300 hover:text-[var(--ivoire)]"
                >
                  MON COMPTE
                </Link>
```

Juste après la balise fermante `</header>` du hero (ligne 155), insérer :

```tsx
      <Couture />
```

- [ ] **Step 3: Marquee — séparateurs diamant + rythme feutré**

Dans `components/ui/Marquee.tsx`, remplacer le `<span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--laiton)]" />` (ligne 33) par :

```tsx
                <span className="h-[6px] w-[6px] shrink-0 rotate-45 border border-[var(--laiton)]/70 bg-transparent" />
```

Et dans `app/page.tsx` passer le marquee à un rythme plus lent : `<Marquee items={marqueeItems} duration={38} />` (ligne 158).

- [ ] **Step 4: Vérifier + commit**

Run: `npx tsc --noEmit` && `npm run build` → verts.
Run: `npm run dev &` puis `curl -s localhost:3000 | grep -c "wal-sceau-rotor\|wal-khatam\|wal-frame"` → ≥ 3 occurrences.

```bash
git add app/page.tsx components/ui/Marquee.tsx
git commit -m "feat(esthetique): hero ceremonial (sceau rotatif, double filet, khatam) + marquee diamants"
```

---

### Task 4: Home — étapes tracées + grades « carte de membre »

**Files:**
- Modify: `app/page.tsx` (section étapes lignes 160-183, section grades 185-203)
- Modify: `components/ui/GradeTabs.tsx:91-114` (panneau actif)
- Modify: `app/globals.css` (intensifier le reflet `.grade-card`)

**Interfaces:**
- Consumes: `.wal-trace`, `.wal-frame`, `.wal-coins` (Task 2).
- Produces: `GradeTabs` visuellement « carte de membre » — API (`grades`, `defaultIndex`) inchangée.

- [ ] **Step 1: Étapes — ligne de progression + grands chiffres**

Dans `app/page.tsx`, dans la section étapes, après le `</Reveal>` du titre (ligne 168), insérer :

```tsx
          <Reveal delay={0.05} className="mt-10">
            <div className="wal-trace w-full" />
          </Reveal>
```

Et passer les numéros à l'échelle cérémoniale : dans le bloc `steps.map`, remplacer `style={{ fontFamily: SerifTitle, fontSize: "42px" }}` (ligne 173) par :

```tsx
style={{ fontFamily: SerifTitle, fontSize: "56px", fontWeight: 500 }}
```

- [ ] **Step 2: Grades — panneau actif en carte de membre**

Dans `components/ui/GradeTabs.tsx`, remplacer le conteneur du panneau actif (ligne 92) :

```tsx
      <div className="relative mt-[34px] min-h-[150px]">
```

par :

```tsx
      <div className="wal-frame relative mt-[34px] min-h-[190px] bg-[var(--nuit)]/35 px-8 py-9 md:px-10">
```

et le `absolute inset-0` de chaque panneau (ligne 96) devient `absolute inset-x-8 inset-y-9 md:inset-x-10` (pour respecter le padding). Ajouter le reflet : sur ce même conteneur `wal-frame`, ajouter la classe `grade-card` (le balayage existe déjà en CSS).

- [ ] **Step 3: Intensifier légèrement le reflet des cartes**

Dans `app/globals.css`, dans `.grade-card::after`, remplacer `rgba(169, 136, 90, 0.04)` par `rgba(169, 136, 90, 0.07)`.

- [ ] **Step 4: Vérifier + commit**

`npx tsc --noEmit` && `npm run build` verts ; `curl -s localhost:3000 | grep -c "wal-trace"` → ≥ 1.

```bash
git add app/page.tsx components/ui/GradeTabs.tsx app/globals.css
git commit -m "feat(esthetique): etapes tracees + grades en carte de membre (double filet, reflet)"
```

---

### Task 5: Home — Last Minute, Expérience, FAQ, Côté coiffeur, CTA finale

**Files:**
- Modify: `app/page.tsx` (sections lignes 205-318)

**Interfaces:**
- Consumes: `Couture`, `.wal-khatam`, `.wal-frame`, `.wal-coins`, `.wal-link` (Tasks 2-3).

- [ ] **Step 1: Last Minute** — panneau : remplacer (ligne 209) `className="relative flex aspect-[4/5] items-center overflow-hidden border border-[var(--laiton)]/20 bg-[...]"` par la version double filet + filigrane :

```tsx
            <div className="wal-frame relative flex aspect-[4/5] items-center overflow-hidden bg-[linear-gradient(160deg,var(--nuit)_0%,#0d1d14_100%)] px-10">
              <span className="wal-khatam" />
              <Halo placement="right" />
              <CompteurEnLigne />
            </div>
```

- [ ] **Step 2: Expérience** — ajouter le filigrane : juste après `<Halo placement="bottom-right" />` (ligne 235), insérer `<span className="wal-khatam" />`.

- [ ] **Step 3: Coutures de section** — insérer `<Couture />` entre les sections claires et sombres de la home : avant la section GRADES (ligne 186), après la section GRADES (ligne 203), avant la section EXPÉRIENCE (ligne 234) et avant la CTA FINALE (ligne 305). (4 coutures ; celle du hero est posée en Task 3.)

- [ ] **Step 4: Côté coiffeur** — le cadre (ligne 278) `border border-[var(--laiton)]/30 bg-[var(--vert)]/[0.03]` devient `wal-coins border border-[var(--laiton)]/30 bg-[var(--vert)]/[0.03]` ; le lien « J'ai déjà un compte — me connecter » (lignes 292-297) passe en `.wal-link` :

```tsx
                <Link
                  href="/pro"
                  className="wal-link pb-0.5 text-[12px] tracking-[0.1em] text-[var(--vert)]/60 transition-colors duration-300 hover:text-[var(--vert)]"
                >
                  J'ai déjà un compte — me connecter
                </Link>
```

- [ ] **Step 5: CTA finale** — ajouter le filigrane : la section (ligne 305) reçoit en premier enfant `<span className="wal-khatam" />` (elle est déjà `relative overflow-hidden`).

- [ ] **Step 6: Vérifier + commit**

`npx tsc --noEmit` && `npm run build` verts ; `curl -s localhost:3000 | grep -c "wal-khatam"` → ≥ 4.

```bash
git add app/page.tsx
git commit -m "feat(esthetique): coutures de section, filigrane khatam, cadres ornes (home complete)"
```

---

### Task 6: Pages internes — heros ornés + coutures

**Files:**
- Modify: `app/a-propos/page.tsx` (hero ligne 7, transition ligne 30)
- Modify: `app/clients/page.tsx` (hero ligne 48, transition ligne 74)
- Modify: `app/coiffeurs/page.tsx` (hero ligne 41, transition ligne 73)
- Modify: `app/contact/page.tsx` (hero ligne 5, transition ligne 26)
- Modify: `app/reserver/page.tsx` (hero ligne 234, transition ligne 258)

**Interfaces:**
- Consumes: `Couture` (import `@/components/ui/Ornements`), `.wal-khatam`.

Même motif sur les 5 pages :

- [ ] **Step 1: Filigrane hero** — chaque section hero nuit reçoit `relative overflow-hidden` (si absent) et en premier enfant `<span className="wal-khatam" />` ; le contenu existant passe (si besoin) dans un wrapper `relative z-10`. Exemple pour `app/a-propos/page.tsx` ligne 7 :

```tsx
      <section className="relative min-h-[56vh] md:min-h-[70vh] overflow-hidden bg-[var(--nuit)] flex items-end pb-20 md:pb-24 px-6 pt-36">
        <span className="wal-khatam" />
```

(et le div de contenu direct reçoit `relative z-10` s'il ne l'a pas).

- [ ] **Step 2: Couture** — remplacer la transition `border-t-2 border-[var(--laiton)]/25` de la 1ʳᵉ section claire par la couture : retirer `border-t-2 border-[var(--laiton)]/25` de la classe, et insérer `<Couture />` entre le hero et cette section. Ajouter l'import `import { Couture } from "@/components/ui/Ornements";` en tête de chaque fichier.

- [ ] **Step 3: Vérifier + commit**

`npx tsc --noEmit` && `npm run build` verts. `curl -s localhost:3000/a-propos | grep -c wal-khatam` → ≥ 1 (idem pour les 4 autres pages).

```bash
git add app/a-propos/page.tsx app/clients/page.tsx app/coiffeurs/page.tsx app/contact/page.tsx app/reserver/page.tsx
git commit -m "feat(esthetique): heros filigranes + coutures de section sur les 5 pages client"
```

---

### Task 7: /reserver — formulaire « maison »

**Files:**
- Modify: `app/reserver/page.tsx` (constante des inputs ligne 205, blocs de section du formulaire)

**Interfaces:**
- Consumes: `.wal-coins` (Task 2). Aucun changement de logique/état du formulaire.

- [ ] **Step 1: Focus laiton renforcé sur les champs**

Ligne 205, la constante de classe des inputs devient (ajout d'un liseré au focus) :

```tsx
    "bg-white border border-[#E3DCC9] px-4 py-3.5 text-sm outline-none focus:border-[var(--laiton)] focus:shadow-[0_0_0_1px_var(--laiton)] transition-[border-color,box-shadow]";
```

- [ ] **Step 2: Sections du formulaire encadrées fin**

Repérer les 5 blocs de section du formulaire (titres numérotés). Chaque bloc de section reçoit la classe `wal-coins` + padding `p-6 sm:p-8` s'il n'en a pas (les coins laiton dessinent le cadre sans alourdir). Ne PAS toucher à la barre sticky mobile ni à la logique de prix.

- [ ] **Step 3: Vérifier + commit**

`npx tsc --noEmit` && `npm run build` verts ; contrôle manuel du parcours : `curl -s localhost:3000/reserver | grep -c "wal-coins"` → ≥ 4.

```bash
git add app/reserver/page.tsx
git commit -m "feat(esthetique): formulaire reserver encadre fin + focus laiton"
```

---

### Task 8: Vérification finale + déploiement

**Files:** aucun nouveau.

- [ ] **Step 1: Build final** — `npx tsc --noEmit` && `npm run build` → 12/12 routes, 0 erreur.
- [ ] **Step 2: Sweep DOM** — `npm run dev &` puis pour chaque page (`/`, `/a-propos`, `/clients`, `/coiffeurs`, `/contact`, `/reserver`) : `curl -s localhost:3000<page> | grep -o "wal-[a-z-]*" | sort | uniq -c` — vérifier la présence des ornements attendus et zéro régression de contenu (greps de textes clés : « Votre coiffeur privé », « Trois gestes », « Last Minute »).
- [ ] **Step 3: Contrôle visuel** — Browser pane sur localhost si fonctionnel (sinon prod après déploiement) : desktop 1280 + mobile 375, mode reduced-motion non testable ici → relire les blocs `@media (prefers-reduced-motion...)`.
- [ ] **Step 4: Push** — `git push` (Vercel déploie), puis vérifier wal-private.vercel.app (desktop + mobile) et montrer des captures à Salim.
