# WAL Private — État du projet & point de reprise

**Dernière mise à jour** : 12 juin 2026
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
| **/compte** (client) | ✅ live + testé | connexion par LIEN MAGIQUE email, demandes en cours, historique, profil (adresse/zone) ; bouton Google présent mais PAS encore actif |
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

1. **Google OAuth 1-clic** — bouton déjà codé sur /compte, à activer (Google Cloud Console → OAuth client → coller Client ID/Secret dans Supabase → Providers → Google).
2. **SMTP custom** (Gmail ou Resend) — pour repasser au code 6 chiffres + fiabilité des emails en prod.
3. **Messagerie interne client↔coiffeur** — demandée par Salim. But : garder la main sur la liaison, masquer automatiquement les numéros de téléphone (anti-contournement). Via Supabase Realtime (table `messages` par réservation). Non commencée.
4. **Vrais comptes coiffeurs** — au-delà de Karim (recrutement via réseau de Salim, comptes créés à la main).
5. **B2B villas/riads** — offre conciergerie (forfait/commission), via le réseau hôtelier de Salim.
6. **Nettoyage / contenu** — corriger fautes du PDF source si réutilisé ; brancher le formulaire de la page /coiffeurs (candidature) ; domaine custom (plus tard).

## 7. Décisions actées (ne pas re-débattre)

- Marrakech, pas la Belgique. Devise MAD.
- Niche 100 % service à domicile (vs Ello généraliste).
- Pros gratuits au lancement, commission seulement, cash récupéré chaque semaine.
- V1 = services sans matière première uniquement.
- Attribution = premier coiffeur qui accepte (pas d'admin au milieu).
- Connexion client = lien magique email (+ Google à venir).
