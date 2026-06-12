# WAL Private — Parcours client pilote (v0.1)

**Date** : 12 juin 2026 · **Statut** : conception — à valider avant développement du formulaire
**Contrainte clé** : le pilote est opéré **à distance** (Salim hors Maroc, coiffeurs contacts sur place). Tout le flux doit fonctionner avec : le site + WhatsApp Business + un tableur de pilotage. Aucune app, aucun backend lourd.

---

## Vue d'ensemble — 7 étapes

```
1. RÉSERVATION        Site → formulaire /reserver
2. DISPATCH           Admin (à distance) → propose au pro via WhatsApp
3. CONFIRMATION       Client reçoit pro + heure + prix sur WhatsApp (+ acompte si produits)
4. RAPPELS            J-1 et jour J (« votre coiffeur est en route »)
5. PRESTATION         Arrivée du pro, protocole, paiement cash du solde
6. CLÔTURE            Pro marque terminé → commission au ledger → notation client
7. FIDÉLISATION       Merci + parrainage + relance au bon moment
```

---

## Étape 1 — Réservation sur le site (`/reserver`)

Pas de compte client au pilote — friction zéro. Un formulaire en 4 écrans (ou 1 page à sections) :

| Champ | Détail |
|---|---|
| **Prestation** | Liste de la grille v0.2, groupée Femmes / Hommes & enfants. Catégorie B (couleur, etc.) signalée « acompte produit requis » |
| **Grade** | Les 4 grades avec prix calculé en direct (prestation × multiplicateur). Par défaut : Confirmé |
| **Date & créneau** | Date + créneau (matin 9-12 / après-midi 12-17 / soirée 17-21) **ou** bouton « Aujourd'hui / Last Minute » (+25 % affiché) |
| **Zone** | Liste : Guéliz, Hivernage, Médina, Majorelle, Targa, Palmeraie, Route de l'Ourika, Autre. Zone étendue → +50 MAD affiché. **Adresse exacte demandée plus tard sur WhatsApp**, jamais stockée dans le formulaire |
| **Contact** | Prénom + numéro WhatsApp (champ unique, indicatif +212 par défaut) |
| **Notes** (optionnel) | Longueur de cheveux, attentes, photo d'inspiration plus tard sur WhatsApp |

**Récapitulatif avant envoi** : prestation, grade, date, prix total TTC (avec majorations éventuelles), montant de l'acompte si cat. B. → La transparence promise (PDF p. 28) se joue ici.

**Après envoi** : page de confirmation « Demande reçue — confirmation sur WhatsApp sous 2 h (30 min en Last Minute) » + bouton WhatsApp direct en secours.

**Tech pilote** : le formulaire poste vers une fonction (ou Web3Forms, éprouvé sur OLEA) → notification email/WhatsApp à l'admin + ligne ajoutée au tableur de pilotage. Pas de base de données au pilote.

## Étape 2 — Dispatch (manuel, à distance)

1. L'admin reçoit la demande (notification + tableur).
2. Il consulte le **planning des pros** (onglet tableur : pro, grade, zones couvertes, dispos déclarées la veille).
3. Il propose la mission au pro adapté via WhatsApp (template : prestation, zone, heure, montant, sa part 85 %). **Délai de réponse pro : 30 min**, sinon on passe au suivant.
4. Pro confirmé → réservation passée à « confirmée » dans le tableur.

**SLA pilote** : confirmation client < 2 h en journée · < 30 min en Last Minute. C'est l'engagement de marque — à tenir dès le premier client.

## Étape 3 — Confirmation client (WhatsApp)

Message template au client :
- **Nom + photo + grade du pro** (sécurité et confiance : la cliente sait qui sonne à sa porte)
- Date, heure, prestation, **prix total**, part à régler en cash
- Si catégorie B : **lien/instructions d'acompte produit** (dépôt CashPlus ou lien de paiement). ⚠️ La réservation n'est ferme qu'à réception de l'acompte. Annulation > 48 h = remboursé/reporté ; < 48 h = conservé
- Demande de l'**adresse exacte** + précisions (étage, digicode, parking)

## Étape 4 — Rappels

- **J-1, 18 h** : rappel client + rappel pro (templates).
- **Jour J, départ du pro** : le pro envoie « en route » à l'admin → l'admin relaie au client « Votre coiffeur [Nom] est en route, arrivée prévue ~HH:MM ». C'est le « suivi en temps réel » du PDF fondateur (p. 5), version manuelle — l'app phase 2/3 l'automatisera.

## Étape 5 — Prestation à domicile

Protocole pro (une page, remise au recrutement — voir kit fondateur) :
- **Ponctualité ± 10 min** ; tout retard s'annonce à l'admin ET au client.
- Présentation : tenue correcte/badge WAL, confirmation de la prestation prévue avant de commencer (pas de vente forcée d'extras — un supplément non réservé doit passer par l'admin).
- Hygiène : matériel propre, serviettes propres, protection des sols si couleur.
- Durées indicatives bloquées au planning : brushing 45 min · coupe+brushing 1 h 15 · couleur 2 h · balayage 3 h · lissage 3-4 h.
- **Paiement** : le client règle le solde en cash au pro (ou rien si déjà payé en ligne). Le pro ne renégocie jamais le prix — le prix est celui du récapitulatif, point.

## Étape 6 — Clôture

1. Le pro envoie « terminé ✅ » à l'admin → la commission (15/20 %) est créditée au **grand livre du pro** (onglet tableur ; règlement hebdo CashPlus, plafond d'encours 500 MAD/7 j).
2. Le client reçoit dans l'heure le message de **notation** : note 1-5 + commentaire (Google Form au pilote). La note alimente le grade — le système de grades commence à vivre dès le premier client.
3. Incident éventuel (retard, qualité) : geste commercial immédiat (-20 % ou brushing offert) — au pilote, chaque client mécontent est une hémorragie de bouche-à-oreille à Marrakech.

## Étape 7 — Fidélisation

- Message de remerciement + **code parrainage simple** (« 50 MAD offerts à toi et ta filleule sur la prochaine réservation » — version pilote du programme de points du PDF).
- Relance intelligente selon la prestation : brushing → +2 semaines · couleur racine → +4 semaines. Le tableur suffit pour piloter ça au début.

---

## Cas limites (règles à afficher dans les CGV courtes du site)

| Cas | Règle |
|---|---|
| Annulation client > 24 h | Gratuite (acompte cat. B : > 48 h) |
| Annulation client < 24 h / no-show | Last Minute et cat. B : acompte conservé. Cat. A : 1er incident pardonné, ensuite prépaiement exigé |
| Annulation pro | Remplacement immédiat même grade ou supérieur sans surcoût + pénalité pro (prévu PDF p. 36) : -1 point de priorité dispatch |
| Retard pro > 20 min | -10 % geste commercial automatique |
| Litige qualité | Photo + description sous 24 h → arbitrage admin, geste commercial, note pro impactée |
| Sécurité | Pros vérifiés (pièce d'identité + références au recrutement), identité du pro communiquée à l'avance au client, adresse client jamais publique |

## Outils du pilote (zéro app à développer)

| Outil | Rôle |
|---|---|
| Site Next.js — page `/reserver` | **Seul développement requis** : le formulaire ci-dessus |
| WhatsApp Business (numéro WAL dédié) | Tout le dialogue client + pros, templates préparés |
| Tableur de pilotage (Google Sheets) | 4 onglets : Réservations · Planning pros · Grand livre commissions · Notations |
| CashPlus / Wafacash | Acomptes non-bancarisées + règlements hebdo des pros |
| Google Form | Notation post-prestation |

## Messagerie directe client ↔ pro — analyse du 12/06

Question posée : intégrer un chat instantané direct client↔prestataire. **Décision : pas au pilote, oui en phase 2.**

- Techniquement accessible (Supabase Realtime ≈ 1 semaine, coût négligeable ; SaaS type TalkJS en 2-3 jours mais 50-300 €/mois). Ce n'est pas le blocage.
- Vrais coûts cachés : (1) exige des comptes/auth des deux côtés — contredit le parcours sans compte ; (2) sans notifications push le chat est mort, et le push web mobile est la partie réellement pénible ; (3) **canal direct = autoroute du contournement** (échange de numéros au 1er message).
- Au pilote, l'admin WhatsApp EST la messagerie : réponse en minutes pour le client, visibilité totale sur les demandes (matière pour concevoir la phase 2), zéro fuite.
- Phase 2 : messagerie intégrée (prévue au PDF fondateur p. 5) via Supabase Realtime, **filtrage automatique des numéros de téléphone dès le jour 1**, et ouverte uniquement après confirmation d'une réservation.

## Ce que le pilote valide (avant d'investir dans la plateforme phase 2)

- La demande réelle par segment et par grade (les prix v0.2 tiennent-ils ?)
- Le taux de no-show et l'efficacité de l'acompte
- Le taux de contournement réel
- Les SLA tenables à distance (2 h / 30 min)
- Le volume par pro → les unit economics du plan de faisabilité (§5.2)

**Prochaine étape concrète : construire la page `/reserver` sur le site** (formulaire 4 écrans, calcul de prix en direct selon grille v0.2, envoi vers admin). Tout le reste du parcours est opérationnel sans code.
