# WAL Private — Plan de faisabilité Marrakech

**Version** : 1.0 — 12 juin 2026
**Statut** : document de travail interne
**Sources internes** : « WAL PRVT (Présentation) 2.pdf » (58 p., vision produit), « WAL_Private_Dossier_Financier_1.pdf » (v1.0 avril 2025, calibré Belgique/EUR)
**Décision actée** : le projet, initialement conçu pour la Belgique, est repositionné sur **Marrakech** — clientèle plus éduquée à ce style de consommation (services à domicile, conciergerie, beauté premium).

---

## 1. Synthèse exécutive

WAL Private est une plateforme de mise en relation entre clients et coiffeurs professionnels indépendants pour des prestations à domicile (et à terme en villa, riad, hôtel). Le modèle : commissions sur transactions + abonnements clients et pros + B2B.

**Verdict de faisabilité : FAISABLE, à condition de re-dimensionner le projet.**

Le dossier financier existant (levée 350 k€, équipe salariée, 5 000 clients an 1, break-even M18) est un plan « Belgique avec capitaux ». Transposé tel quel à Marrakech, il est surdimensionné. La bonne nouvelle : Marrakech permet un lancement **beaucoup moins cher** (coûts locaux, développement interne, marché concentré) avec un **avantage différenciant réel** (segment villas/riads/touristes haut de gamme, réseau existant de l'équipe dans l'hôtellerie de luxe).

Recommandation centrale : **lancement en 3 phases** — pilote « concierge » sans app (M1–M4), plateforme web transactionnelle (M5–M12), app mobile (an 2) — avec des critères go/no-go chiffrés entre chaque phase.

---

## 2. Ce qui change avec le repositionnement Marrakech

| Paramètre | Dossier Belgique (avril 2025) | Réalité Marrakech 2026 |
|---|---|---|
| Devise / ticket moyen | 52 € | ~300 MAD résident · 600–1 000+ MAD touriste/villa |
| TAM | 180 M€ coiffure à domicile | Marché beauté Maroc ≈ 7,3 Mds DH, très informel ; TAM local à reconstruire (cf. §3) |
| Paiement | In-app obligatoire, anti-contournement | Cash dominant ; CMI + nouveaux PSP depuis mai 2025 ; in-app obligatoire = friction majeure |
| Coût de développement | 120 k€ (presta iOS/Android/backend) | Développement interne (site Next.js déjà en ligne) : coût marginal |
| Équipe an 1 | 240 k€ salaires | Fondateur + freelances locaux : fraction du coût |
| Concurrence | « Aucun acteur dominant » | **Faux au Maroc** : Ello (Casa/Rabat/Marrakech), Magic First Lady (Casa), EasyDary (Casa), Hairdress Air (Casa/Marrakech) |
| Levée nécessaire | 350 k€ | Pilote autofinançable ; levée éventuelle repoussée après preuve de traction |

Les fondamentaux du concept (grades Novice→Maître, Last Minute, abonnements, B2B hôtels) restent valables — ils sont même **mieux adaptés** à Marrakech qu'à la Belgique grâce au tissu hôtelier et à la culture du service à domicile.

---

## 3. Le marché à Marrakech

### 3.1 Taille et structure

- Marché marocain des cosmétiques/beauté : **~7,3 milliards de DH** de CA (2023), croissance ~8 %/an attendue jusqu'en 2029.
- Un institut de beauté bien situé génère en moyenne **66 000 DH/mois en coiffure** + 22 000 DH en esthétique — preuve d'un pouvoir d'achat réel sur le segment.
- Secteur fortement **informel** : beaucoup de coiffeuses à domicile travaillent déjà hors structure, sans visibilité ni statut. C'est à la fois le vivier de recrutement de WAL et son principal concurrent silencieux.

### 3.2 Segments clients (re-basés Marrakech)

| Segment | Profil | Panier estimé | Fréquence | Rôle dans le modèle |
|---|---|---|---|---|
| CSP+ résidents (Guéliz, Hivernage, Targa, Route de l'Ourika) | Femmes actives, familles aisées, expats | 250–500 MAD | 1–2×/mois | Volume récurrent, abonnements |
| Touristes & résidents temporaires | Villas, riads, hôtels — exigence immédiate, prix européens acceptés | 600–1 200 MAD | Ponctuel, forte saisonnalité | Marge, Last Minute |
| B2B conciergerie | Riads, villas de luxe, hôtels, agences événementielles | 1 500–5 000 MAD/prestation groupée | Récurrent contractuel | Revenu stable, barrière à l'entrée |
| Mariages & événements | Mariées, négafa, shooting | 2 000–10 000 MAD | Saisonnier | Ticket élevé, notoriété |
| Seniors / mobilité réduite | Médina, quartiers résidentiels | 150–300 MAD | 1×/mois | Volume social, fidélité |

**Atout spécifique de l'équipe** : réseau existant dans l'hôtellerie de luxe à Marrakech (villas, conciergeries) — le segment B2B/touriste, le plus rentable, est accessible dès le jour 1 sans budget marketing.

### 3.3 Saisonnalité

Marrakech a deux hautes saisons touristiques (oct–déc, mars–mai) + pics événementiels. Le segment résident lisse la courbe ; le segment touriste fait la marge. Le plan financier doit modéliser cette saisonnalité (le dossier Belgique supposait un flux linéaire).

---

## 4. Concurrence et différenciation

### 4.1 Acteurs en place

| Acteur | Couverture | Modèle | Menace |
|---|---|---|---|
| **Ello / Ello Pro** | Casa, Rabat, Marrakech | Plateforme de réservation beauté (salons + domicile), agenda pro, rappels WhatsApp | **Élevée** — le plus proche du concept |
| Magic First Lady | Casablanca | Esthéticiennes mobiles 7j/7, 100 % femmes | Moyenne (pas à Marrakech) |
| EasyDary | Casablanca uniquement | Mise en relation beauté à domicile | Faible à Marrakech, surveiller l'expansion |
| Hairdress Air | Casa + Marrakech | Soins capillaires à domicile | Moyenne |
| Metamorfose, Yoba Hair Styler… | Marrakech | Salons/indépendants avec offre à domicile, Instagram | Faible individuellement, fort cumulé |
| **Informel (WhatsApp/bouche-à-oreille)** | Partout | Coiffeuses à domicile sans plateforme | **La vraie concurrence** |

### 4.2 Différenciation WAL Private

> **Validation terrain (Salim, 12/06)** : après visite d'ello.ma — Ello est un « fourre-tout » : salons, instituts, domicile, multi-villes, sans spécialisation. Leur largeur est notre opportunité : **WAL Private = 100 % service à domicile, rien d'autre.** Un seul métier, une seule promesse, une expérience profonde là où Ello est superficiel (sélection des pros, grades, logistique domicile, Last Minute, B2B villas). On ne se bat pas contre Ello sur la largeur — on creuse la niche qu'ils survolent.

1. **Système de grades certifiés** (Novice→Maître) adossé à terme à un centre de formation (WAL Academy — modules déjà rédigés) : personne ne fait ça au Maroc. Répond directement au problème n°1 du secteur : l'absence de standard de qualité (secteur non réglementé).
2. **Last Minute géolocalisé** : pertinent à Marrakech (touristes, imprévus événementiels) — différenciateur revendiqué dans le PDF fondateur, toujours valable.
3. **Canal B2B villas/riads/conciergeries** : aucun acteur ne l'attaque structurellement ; le réseau de l'équipe en fait une tête de pont défendable.
4. **Positionnement premium assumé** (cohérent avec l'identité visuelle du site : noir/doré, Cormorant) vs Ello généraliste.

---

## 5. Modèle économique re-basé (MAD)

### 5.1 Sources de revenus retenues pour le lancement

Le dossier Belgique listait 6 sources. Pour la faisabilité Marrakech, on en retient **3 au lancement**, les autres en an 2+ :

| Source | Mécanisme Marrakech | Quand |
|---|---|---|
| Commission transactions | **15 % résidents · 20 % touristes/B2B** (prix plus élevés, apport client total) | Dès le pilote |
| Abonnements clients | Avantages 99 MAD/mois (déjà sur le site) · Premium 299 MAD · VIP 499 MAD. Famille : à tester avant de lancer | Phase 2 |
| B2B conciergerie | Forfait mensuel riad/villa (ex. 1 500 MAD/mois pour accès prioritaire + tarifs négociés) ou commission 20 % | Dès le pilote |
| Abonnements pros, shop produits, pub, frais d'inscription | Reportés — ne pas créer de friction au recrutement des coiffeurs avant d'avoir la demande | An 2+ |

⚠️ Le dossier Belgique prévoyait de **facturer les pros dès l'inscription** (99 € + 30–60 €/mois). À Marrakech c'est un tue-recrutement : les indépendants gagnent 3 000–8 000 MAD/mois. Le pilote doit être **gratuit pour les pros**, la commission suffit.

### 5.2 Unit economics indicatifs (hypothèses à valider au pilote)

- Ticket moyen pondéré (70 % résidents à 300 MAD, 30 % touristes/B2B à 800 MAD) : **~450 MAD**
- Commission moyenne ~16,5 % : **~74 MAD/prestation**
- Coiffeur actif réaliste : 25–40 prestations/mois via la plateforme à maturité → 1 850–2 950 MAD de commission/coiffeur/mois
- **20 coiffeurs actifs ≈ 37 000–59 000 MAD/mois de commissions** (~3 400–5 400 €) — de quoi payer les opérations locales ; la rentabilité vient du passage à 50+ pros et du B2B.

### 5.3 Le point critique : le paiement

- Le cash reste dominant dans les services au Maroc malgré la croissance du sans-contact (>70 % des transactions carte) et l'ouverture du marché des PSP depuis mai 2025 (fin du quasi-monopole CMI : Attijari Payment, CDM Pay, Lanacash, etc.).
- **Imposer le paiement in-app dès le départ (comme le prévoyait le dossier belge) ferait échouer le projet à Marrakech.**
- **Validation terrain (Salim, ex-salons Maroc)** : ~80 % des coiffeurs n'ont pas l'équivalent de 99 € d'avance ; le cash domine massivement, très peu de paiements par compte. → Zéro frais d'entrée pour les pros, cash accepté côté client, et la commission se récupère **chez le pro, chaque semaine**.

### 5.4 Le circuit du cash — modèle opérationnel détaillé

**Principe de base (vrai dans les deux phases)** : toute réservation passe par la plateforme, donc **le montant de chaque prestation est connu d'avance**. La commission n'est jamais déclarative — elle est calculée automatiquement à la réservation. Le pro ne peut pas sous-déclarer ; il peut seulement ne pas payer, et ça se gère par le plafond d'encours.

**Phase pilote (10–20 pros) — collecte hebdomadaire simple :**

| Élément | Fonctionnement |
|---|---|
| Grand livre par pro | Chaque prestation terminée crédite la commission due (ex. 45–74 MAD). Solde visible par le pro à tout moment (transparence = confiance) |
| Règlement hebdo | Le pro dépose son dû via **CashPlus ou Wafacash** (agences partout à Marrakech, frais 5–15 MAD, pas besoin de compte bancaire) ou virement s'il en a un. Pas de tournée physique de collecte : coûteuse et non scalable |
| Plafond d'encours | Démarrage : **500 MAD ou 7 jours**, au premier des deux atteint. Encours dépassé → plus de nouvelles réservations attribuées jusqu'au règlement (suspension douce, automatique, pas de conflit humain) |
| Plafond évolutif | L'encours autorisé grandit avec l'ancienneté et le grade (Novice 500 MAD → Maître 2 000 MAD). Le bon comportement de paiement devient un critère de grade — cercle vertueux |
| Caution | **Aucune** — cohérent avec le terrain (pas d'avance possible). Le risque max par pro = son plafond d'encours, soit ~500 MAD au pire |

**Phase 2 (50+ pros) — wallet prépayé (modèle Glovo/inDrive sur les marchés cash) :**
- Le pro recharge un **solde WAL** (via CashPlus/Wafacash/carte) ; chaque prestation payée en cash débite automatiquement la commission du wallet.
- Wallet insuffisant → plus de missions. Zéro créance, zéro collecte, zéro relance : le risque de crédit disparaît structurellement.
- La transition pilote → wallet se fait naturellement : les pros ont déjà l'habitude du règlement CashPlus hebdomadaire, le wallet ne fait qu'inverser le moment du paiement.
- Prestations payées en ligne par le client : la commission est retenue à la source et le reste reversé au pro — le wallet ne sert que pour le cash.

**Pourquoi le pro joue le jeu (anti-contournement par la valeur, pas la surveillance)** :
1. Le flux de clients vient de WAL — contourner = se couper du robinet.
2. Le grade, la notation et l'historique sont sur WAL — c'est son CV vivant.
3. Les missions B2B (villas, riads, événements) et Last Minute, les mieux payées, ne sont accessibles qu'en règle.
4. L'accompagnement statut auto-entrepreneur + AMO + RC pro n'existe que dans l'écosystème.
5. Un client direct = un client ; la plateforme = un revenu récurrent. Le calcul est vite fait pour un pro rationnel.

- **Phase 2 — incitations au paiement en ligne côté client** : points fidélité ×2, annulation gratuite, multi-devises pour touristes (CMI ou PSP post-libéralisation mai 2025). Prépaiement carte **obligatoire** dès le pilote pour touristes, Last Minute et B2B (anti no-show).
- L'anti-contournement (p. 42-44 du PDF fondateur) se gagne par la **valeur apportée** plus que par la surveillance des communications — irréaliste et contre-productive au Maroc.

---

## 6. Faisabilité juridique et réglementaire

| Sujet | Situation | Action |
|---|---|---|
| Statut des coiffeurs | **Auto-entrepreneur** : plafond 200 000 DH/an (services), impôt 1 % du CA, CNSS/AMO obligatoires depuis le décret 2.21.477 | Faire de la régularisation AE un **argument de recrutement** (couverture santé AMO = vrai bénéfice pour des pros informels). Accompagnement inscription = le « support juridique » promis dans le PDF, version Maroc |
| Règle des 80 000 DH | CA annuel avec un même client > 80 000 DH → retenue à la source 30 % | Vérifier avec un fiscaliste que la plateforme est bien **intermédiaire** (le client final est le payeur) et non donneur d'ordre — sinon risque de requalification employeur |
| Structure WAL | — | SARL marocaine (capital libre dès 1 MAD symbolique en pratique 10 000 MAD), TVA 20 % sur la commission |
| Données personnelles | Loi 09-08 + CNDP (équivalent marocain du RGPD) | Déclaration CNDP avant collecte (géolocalisation + messagerie = données sensibles) |
| Secteur coiffure | Non réglementé au Maroc (pas de diplôme obligatoire) — d'où l'enjeu qualité | Le système de grades WAL devient un **label de substitution** : opportunité, pas obstacle |
| Assurance | RC pro des intervenants à domicile | Négocier une RC groupe (différenciateur recrutement) |

Aucun blocage réglementaire identifié. Deux points à sécuriser avec un avocat/fiscaliste local avant la phase 2 : la qualification d'intermédiaire (vs employeur de fait) et la déclaration CNDP.

---

## 7. Faisabilité technique

| Brique | État | Effort |
|---|---|---|
| Site vitrine | ✅ En ligne (wal-private.vercel.app, Next.js 16) | — |
| Réservation (formulaire → WhatsApp/admin) | À faire | Faible — phase pilote |
| Plateforme transactionnelle (comptes, profils coiffeurs, créneaux, paiement CMI/PSP, notifications WhatsApp) | À faire | Moyen — phase 2, développement interne sur la base Next.js existante + backend (Supabase ou équivalent) |
| App mobile iOS/Android | À faire | Reporté an 2 — un site mobile-first + notifications WhatsApp couvre 90 % du besoin marocain (WhatsApp est l'OS social du pays) |
| Suivi temps réel type Uber (p. 5 du PDF) | À faire | Reporté — nice-to-have, pas nécessaire à la validation du marché |

Le poste « développement 120 k€ » du dossier belge tombe à un coût marginal : c'est **le levier n°1 de faisabilité** du repositionnement.

---

## 8. Risques spécifiques Marrakech

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Contournement plateforme (culture cash + WhatsApp) | **Élevée** | Élevé | Valeur continue pour le pro (flux clients, grades, AMO, assurance, B2B inaccessible en solo) ; prépaiement sur les segments à marge |
| Ello étend son offre domicile à Marrakech | Moyenne | Élevé | Vitesse + verrouillage B2B villas/riads (contrats) + positionnement premium |
| Recrutement de pros fiables (ponctualité, qualité) | Moyenne | Très élevé | Sélection exigeante au pilote (10–20 pros max), grades, pénalités d'annulation (prévu p. 36 du PDF) |
| Saisonnalité touristique | Certaine | Moyen | Mix résidents (récurrence) / touristes (marge) ; B2B contractualisé |
| Pouvoir d'achat résident limité sur le ticket élevé | Moyenne | Moyen | Grille par grades dès 150 MAD (déjà sur le site) — l'entrée de gamme existe |
| Réputation (incident à domicile) | Faible | Très élevé | Vérification identité + RC pro + notation systématique dès le pilote |

---

## 9. Plan de lancement en 3 phases

### Phase 1 — Pilote « concierge » (M1–M4) — budget ~30–50 k MAD
- 10–20 coiffeurs sélectionnés (focus femmes CSP+ et 2–3 partenariats riads/villas via le réseau existant).
- Réservation via le site (formulaire) + WhatsApp ; dispatch manuel ; cash autorisé, commission collectée chaque semaine.
- Objectif : **150–300 prestations réalisées, NPS > 50, taux de contournement mesuré**.
- **Go/no-go phase 2** : ≥ 200 prestations/mois au M4 **et** ≥ 30 % de clients récurrents **et** contournement < 25 %.

### Phase 2 — Plateforme transactionnelle (M5–M12) — budget ~150–250 k MAD
- Comptes clients/pros, profils + grades, créneaux, paiement en ligne (CMI/PSP) incitatif, notifications WhatsApp Business API, lancement abonnement Avantages 99 MAD.
- Montée à 50 pros, 5–10 contrats B2B, ouverture Last Minute.
- **Go/no-go phase 3** : MRR abonnements ≥ 30 k MAD **et** GMV ≥ 400 k MAD/mois.

### Phase 3 — App & échelle (an 2)
- App mobile, suivi temps réel, shop produits, WAL Academy (modules déjà écrits → centre d'évaluation des grades), extension Casablanca/Rabat **ou** verticales bien-être (massage, etc. — p. 55-57 du PDF fondateur).
- C'est ici qu'une levée de fonds a du sens — avec de la traction réelle, à une valorisation défendable, au lieu des 350 k€ demandés sur dossier.

---

## 10. Ce qu'il faut décider / produire ensuite

1. **Valider la grille tarifaire pilote** (grades × segments, en MAD) — le site affiche déjà 150→1 000+ MAD, cohérent.
2. **Lister les 2–3 riads/villas partenaires** du pilote (réseau existant) et formaliser l'offre B2B.
3. **Mettre à jour le dossier financier** en MAD avec les hypothèses §5 (version investisseur à produire seulement si levée envisagée — sinon document de pilotage interne suffit).
4. Brancher le **formulaire de réservation/contact** du site (prérequis du pilote).
5. Consultation fiscaliste : qualification intermédiaire + CNDP.
6. Corriger le PDF de présentation si réutilisé (fautes : « BELGUIQUE », « LASTE MINUTES », « L'AVANTEGE » ; incohérence points fidélité p. 31 vs 32 ; références Belgique → Marrakech).

---

## Sources externes

- Marché beauté Maroc, poids de l'informel : [La Vie Éco — Cosmétiques, un marché dynamique](https://lavieeco.com/news/economie/cosmetiques-un-marche-de-plus-en-plus-dynamique.html), [La Vie Éco — Salons de beauté, un business qui rapporte](https://www.lavieeco.com/argent/salons-de-beaute-un-business-qui-rapporte-29283/), [Carmel Cosmetics Labs — Marché cosmétique Maroc 2025-2032](https://carmelcosmeticslabs.com/laboratoire-cosmetique-maroc-analyse-complete-et-previsions-exclusives-du-marche-marocain-des-cosmetiques-2025-2032/)
- Absence de réglementation du secteur : [L'Opinion — Coiffure et esthétique, besoin d'une réglementation](https://www.lopinion.ma/Coiffure-et-esthetique-Besoin-d-une-reglementation-du-secteur_a3070.html)
- Concurrence : [Ello](https://ello.ma/), [Ello Pro à domicile](https://ello.ma/pro/domicile), [Magic First Lady](https://www.magicfirstlady.com/), [Plurielle — beauté à domicile](https://www.plurielle.ma/beaute/3-adresses-beaute-qui-prennent-soin-de-nous-a-domicile/), [Metamorfose Marrakech](https://www.metamorfosemarrakech.com/beauty-treatments-at-home/)
- Paiement : [Le360 — Fin du monopole CMI](https://fr.le360.ma/economie/comment-la-fin-du-monopole-du-cmi-propulse-le-paiement-electronique-au-maroc_KMCBQKJKOJCZJMATG5GT5WJQRI/), [Maroc.ma — PSP autorisés mai 2025](https://www.maroc.ma/fr/actualites/paiement-electronique-les-etablissements-de-paiement-et-les-filiales-des-banques-autorises-operer-des), [Kifcom360 — Paiement mobile Maroc 2025](https://kifcom360.com/paiement-mobile-au-maroc/)
- Statut auto-entrepreneur : [LMoukawil — Guide AE Maroc 2026](https://www.lmoukawil.ma/fr/articles/guide-auto-entrepreneur-maroc-2026/), [Humantal — Statut AE guide complet](https://humantal.ma/ressources/statut-auto-entrepreneur-maroc-guide-complet), [Jobiglo — AE inscription, fiscalité, CNSS, plafonds](https://ma.jobiglo.com/blog/auto-entrepreneur-maroc)
