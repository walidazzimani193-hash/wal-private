# WAL Private — État du projet & point de reprise

**Dernière mise à jour** : 13 juin 2026 (messagerie interne client↔coiffeur — FAIT)
**Live** : https://wal-private.vercel.app · **Repo** : github.com/walidazzimani193-hash/wal-private (privé)
**Stack** : Next.js 16 + React 19 + Tailwind 4 + framer-motion + **Supabase** (auth, DB, realtime)

---

## 1. Le projet en une phrase

Plateforme marketplace de **coiffeurs à domicile à Marrakech** (repositionné depuis la Belgique). Concept : grades Novice→Maître, réservation en ligne, modèle « premier coiffeur qui accepte », commission 15–20 %, cash récupéré chez les pros chaque semaine.

## 2. Documents de référence (à la racine du repo)

- `FAISABILITE-MARRAKECH-2026-06-12.md` — étude de faisabilité complète (marché, concurrence Ello, paiement cash, juridique, plan en 3 phases)
- `GRILLE-TARIFAIRE-PILOTE.md` — grille prix validée (base × multiplicateur de grade, majorations, modèle produits par acompte)
- `PARCOURS-CLIENT-PILOTE.md` — parcours de bout en bout + analyse messagerie
- `supabase/schema.sql` + `supabase/02_clients.sql` — schéma base de données (déjà exécutés en prod)

## 3. Ce qui est CONSTRUIT et EN LIGNE ✅

| Brique | État | Détail |
|---|---|---|
| Site vitrine | ✅ live | home, /clients, /coiffeurs, /a-propos, /contact |
| **/reserver** (client) | ✅ live | services SANS produit uniquement (brushing, coupes, barbe, chignon) ; prix calculé en direct ; indicatif WhatsApp international ; envoi → Supabase |
| **/pro** (coiffeur) | ✅ live + testé | login email/mdp, bouton En ligne, demandes de sa zone en temps réel, Accepter (premier qui accepte), Terminé |
| **/compte** (client) | ✅ live + testé | connexion par LIEN MAGIQUE email **ET Google 1-clic (actif ✅)**, demandes en cours, historique, profil (adresse/zone) |
| **Google OAuth** | ✅ live + testé | bouton « Continuer avec Google » fonctionnel ; app Google publiée « En production » ; user de test créé via Google |
| Base Supabase | ✅ | tables `coiffeurs`, `reservations`, `clients` ; RLS ; RPC `accepter_reservation` atomique ; realtime |
| Déploiement | ✅ | Vercel auto-deploy sur push `main` ; env vars `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` en place |

**Flux complet validé en conditions réelles** (12/06) : client réserve → coiffeur voit/accepte → client voit le statut passer à « Acceptée · [nom] » en temps réel.

## 4. Infos techniques clés

- **Supabase** : projet `wal-private`, org « Walid », région eu-west-3. URL : `https://melzazwpcdgyexzhwkhs.supabase.co`. Clé anon = dans `.env.local` (local) et Vercel (prod).
- **Compte coiffeur de test** : `recmysound@live.be` (profil « Karim », expert, zones Guéliz+Hivernage). Identifiants complets dans la mémoire Claude locale.
- **Numéro WhatsApp WAL** (repli admin) : +32 496 97 49 83.
- **Auth** : comptes coiffeurs créés manuellement (Auth add user + INSERT coiffeurs SQL). Comptes clients en self-service (lien magique).
- **Node local** : `~/.local/node/bin` (NE PAS brew install — Mac Monterey/Intel).
- **Dev local** : `cd '/Users/salim/Desktop/claude code /wal-private' && export PATH=/Users/salim/.local/node/bin:$PATH && npm run dev`. ⚠️ Preview MCP instable hors workspace → utiliser Bash + curl. Si build OOM/ENOSPC : `rm -rf .next` + `NODE_OPTIONS=--max-old-space-size=2048`.

## 5. ⚠️ Pièges connus

- **Traduction Safari** casse l'UI Supabase/Vercel et altère les textes (NEXT→PROCHAINE, return→retour, Run→Courir). TOUJOURS « Ne jamais traduire ce site » sur supabase.com et vercel.com, ou utiliser Chrome.
- **Code email à 6 chiffres** impossible sans SMTP custom (Supabase verrouille l'édition du template). D'où le choix actuel = lien magique.
- **SMTP par défaut Supabase** limité (~3-4 mails/h, spam fréquent) → prévoir SMTP pro (Gmail/Resend) pour la prod.

## 6. Ce qui RESTE à faire (priorités)

1. ~~**Google OAuth 1-clic**~~ ✅ **FAIT 12/06** (voir détails ci-dessous, section 8).
2. ~~**SMTP custom**~~ ✅ **FAIT 12/06** (Gmail en dépannage). SMTP Gmail (`smtp.gmail.com:465`, compte `walidazzimani193@gmail.com` + mot de passe d'application) branché dans Supabase → emails fiables. Template « Magic Link » enrichi de `{{ .Token }}` → l'email contient **lien + code à 8 chiffres**, et `/compte` propose les deux au choix (`signInWithOtp` + `verifyOtp`). ⚠️ codes OTP = **8 chiffres** ici. **Resend + domaine custom = à faire « semaine prochaine »** (Salim prend le domaine plus tard ; Resend exige un domaine vérifié).
3. ~~**Messagerie interne client↔coiffeur**~~ ✅ **FAIT 13/06** (commits `689032e` + `7904db6`, live + testé OK). Table `messages` par réservation (`supabase/03_messages.sql` exécuté en prod), RLS participants-only, **masquage auto des numéros via trigger Postgres** (suites 6+ chiffres + formats espacés → `[numéro masqué]`), Supabase Realtime, composant `components/Chat.tsx` réutilisable (badge non-lu simple). Fil ouvert au statut `acceptee`, écriture jusqu'à **24 h après `terminee`** puis lecture seule. Branché sur `/pro` (MES COURSES) + `/compte` (en cours + historique). **Cohérence anti-contournement** : sur `/pro`, le numéro WhatsApp client n'est plus affiché si le client a un compte (`client_id`) → messagerie seule ; affiché uniquement pour réservations **invité** (sans compte, pas de messagerie). Champ WhatsApp gardé sur `/reserver` (repli admin + invités).
3bis. ✅ **Dashboard pilote `/pilote`** **FAIT 13/06** (commit `ca61c22`) — tableau de bord admin temps réel (réservations, CA, commission, coiffeurs, clients, messages) + feuille de route, consultable mobile, réservé à Salim (double verrou email + RPC `stats_pilote` security definer). **⚠️ Salim doit exécuter `supabase/04_dashboard.sql`** pour activer les chiffres, puis se connecter via Google sur `wal-private.vercel.app/pilote`.
4. **Vrais comptes coiffeurs** — au-delà de Karim (recrutement via réseau de Salim, comptes créés à la main). **← prochaine.**
5. **B2B villas/riads** — offre conciergerie (forfait/commission), via le réseau hôtelier de Salim.
6. **Nettoyage / contenu** — corriger fautes du PDF source si réutilisé ; brancher le formulaire de la page /coiffeurs (candidature) ; domaine custom (plus tard).

## 8. Google OAuth — config en place (réf. si besoin de retoucher)

- **Côté code** : rien à faire, tout est branché (`connexionGoogle` dans `app/compte/page.tsx` + `createBrowserClient` de `@supabase/ssr` gère le retour OAuth automatiquement).
- **Projet Google Cloud** : `winged-bliss-376218` (« My First Project »), compte `walidazzimani193@gmail.com`.
- **Client OAuth** « WAL web » → Client ID `938224437921-pks7f0b5agl8llsbkmgrkkn36q43fdol.apps.googleusercontent.com` (secret `GOCSPX-…` conservé par Salim en screenshots, régénérable dans Google → Clients → WAL web si besoin).
- **Redirect URI Google** = callback Supabase `https://melzazwpcdgyexzhwkhs.supabase.co/auth/v1/callback` · **JS origins** = `https://wal-private.vercel.app` + `http://localhost:3000`.
- **Supabase** : Authentication → Sign In / Providers → **Google activé** (Client ID + Secret collés).
- **App Google PUBLIÉE « En production »** (Audience) → tout client peut se connecter, scopes basiques email/profil = pas de validation Google requise.
- **Pièges** : (a) Google Cloud exige la 2FA du compte (Salim a mis Google Authenticator = hors-ligne, pas de SMS, marche Maroc+Belgique) ; (b) ne pas confondre « Sign In / Providers » (le bon) avec « OAuth Server » / « OAuth Apps » (pièges Supabase) ; (c) le secret OAuth ne s'affiche qu'une seule fois à la création.

## 7. Décisions actées (ne pas re-débattre)

- Marrakech, pas la Belgique. Devise MAD.
- Niche 100 % service à domicile (vs Ello généraliste).
- Pros gratuits au lancement, commission seulement, cash récupéré chaque semaine.
- V1 = services sans matière première uniquement.
- Attribution = premier coiffeur qui accepte (pas d'admin au milieu).
- Connexion client = lien magique email (+ Google à venir).
