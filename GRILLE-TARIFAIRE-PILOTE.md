# WAL Private — Grille tarifaire pilote (v0.2 — squelette VALIDÉ)

**Date** : 12 juin 2026 · **Statut** : structure validée par Salim le 12/06 (brushing ajusté à 100 MAD, coupe+barbe confirmé 150 MAD, multiplicateurs confirmés). Les prix sont une **base de travail** : ajustements futurs selon retours terrain, sans toucher à l'architecture.
**Principes** : prix TTC tout compris (déplacement inclus en zone centre), produits standards inclus, aucune surprise pour le client (promesse de transparence du PDF fondateur, p. 28).

---

## 1. Architecture : prix de base × multiplicateur de grade

Plutôt que de fixer un prix par prestation ET par grade (40+ cases à maintenir), chaque prestation a un **prix de base** (= grade Confirmé, la référence du marché) et chaque grade applique un **multiplicateur** :

| Grade | Multiplicateur | Positionnement |
|---|---|---|
| I — Novice | × 0,7 | Jeunes talents certifiés WAL, tarif d'accès |
| II — Confirmé | × 1 (référence) | Le professionnel solide du quotidien |
| III — Expert | × 1,6 | Spécialiste reconnu (colorimétrie, lissages…) |
| IV — Maître | × 2,5 ou prix libre avec plancher | Élite, clientèle haut de gamme, sur devis pour l'événementiel |

Avantages : simple à expliquer aux pros et clients, simple à coder, et la montée en grade = augmentation mécanique et motivante des revenus du pro.

## 2. Prix de base proposés (grade Confirmé, zone centre, en MAD)

### Femmes
| Prestation | Prix de base | Novice | Expert | Maître |
|---|---|---|---|---|
| Brushing | 100 | 70 | 160 | 250 |
| Coupe + brushing | 250 | 175 | 400 | 625 |
| Couleur racine | 300 | 210 | 480 | 750 |
| Couleur complète | 450 | 315 | 720 | 1 125 |
| Balayage / mèches | 700 | 490 | 1 120 | 1 750 |
| Soin profond (protéine, botox capillaire) | 300 | 210 | 480 | 750 |
| Lissage (brésilien, tanin) | 1 200 | 840 | 1 920 | 3 000 |
| Chignon / coiffure événement | 350 | 245 | 560 | 875 |
| Forfait mariée (essai + jour J) | sur devis, dès 2 500 | — | dès 4 000 | dès 6 000 |

### Hommes & enfants
| Prestation | Prix de base | Novice | Expert | Maître |
|---|---|---|---|---|
| Coupe homme | 100 | 70 | 160 | 250 |
| Coupe + barbe | 150 | 105 | 240 | 375 |
| Coupe enfant (-12 ans) | 80 | 56 | 130 | 200 |

**Minimum de commande : 150 MAD** (une prestation seule sous ce seuil ne couvre pas le déplacement — le client complète avec un soin ou une 2ᵉ personne).

## 3. Majorations par contexte

| Contexte | Majoration sur le prix | Commission WAL |
|---|---|---|
| Résident, réservation normale | — | **15 %** |
| Villa / riad / hôtel (clientèle touristique) | **+50 %** | **20 %** |
| Last Minute (< 3 h) | **+25 %** | **20 %** |
| B2B contractuel (conciergeries, événements) | grille négociée | **20 %** |
| Zone étendue (Palmeraie, Targa, Route Ourika…) | **+50 MAD** forfait déplacement | — |
| Dimanche / après 20 h | **+20 %** | inchangée |

La majoration profite au pro à hauteur de sa part (100 % − commission) : le Last Minute et les villas deviennent les missions les plus désirables — exactement le levier anti-contournement voulu.

## 4. Ce que gagne le pro — l'argument de recrutement

Exemple **Confirmé**, 30 prestations/mois, panier moyen 300 MAD :
- Volume : 9 000 MAD → part pro (85 %) : **7 650 MAD/mois**
- Référence : salaire en salon à Marrakech ≈ 2 500–4 000 MAD/mois
- Pitch recrutement : **« double ton revenu, sans patron, sans loyer de chaise »**

Exemple **Expert**, 25 prestations/mois, panier moyen 550 MAD (dont villas à +50 %) :
- Volume : 13 750 MAD → part pro (80–85 %) : **~11 200 MAD/mois**

## 5. Produits — modèle de financement (validé dans son principe le 12/06)

**Contrainte terrain (Salim)** : la plupart des pros ne peuvent pas avancer le prix des produits — même mur que les 99 € d'inscription. Le modèle doit fonctionner **sans avance de cashflow ni du pro, ni (presque) de WAL**.

### 5.1 Deux catégories de prestations

| Catégorie | Prestations | Produits nécessaires | Règle |
|---|---|---|---|
| **A — Sans produit** | Brushing, coupe + brushing, coupe homme, coupe + barbe, coupe enfant, chignon | Aucun (outillage du pro uniquement) | Aucun enjeu — réservable immédiatement, y compris Last Minute |
| **B — Avec produits** | Couleur racine, couleur complète, balayage/mèches, soin profond, lissage | Coloration, oxydant, poudre, soins… | Financées par **acompte produit** ou **stock tampon WAL** |

### 5.2 Catégorie B — réservation à l'avance (J+2 et plus) : l'acompte produit

- À la réservation, la cliente paie un **acompte obligatoire couvrant le coût produit** (en ligne via CMI/PSP, ou dépôt CashPlus pour les non-bancarisées). Le solde se règle en cash le jour J, comme d'habitude.
- WAL achète le produit avec l'acompte → **zéro cashflow avancé**, ni par le pro, ni par WAL.
- Montants indicatifs d'acompte (≈ coût produit grossiste + marge de sécurité) : couleur racine **100 MAD** · couleur complète **150 MAD** · balayage **250 MAD** · soin **100 MAD** · lissage **400 MAD**. À affiner avec les prix grossiste réels.
- **Règle d'annulation** : annulation > 48 h = acompte remboursé ou reporté ; < 48 h (produit acheté) = acompte conservé. Double bénéfice : l'acompte est aussi un **anti no-show** naturel.
- Bénéfice stratégique : l'acompte habitue la clientèle au paiement en ligne partiel → transition douce vers le paiement in-app de la phase 2.

### 5.3 Catégorie B — Last Minute et jour même : le stock tampon WAL

Pour servir les rendez-vous immédiats, un **stock minimum de produits** est inévitable. C'est LA base d'investissement produit du pilote :

- Estimation : couvrir ~20 prestations couleur/soin d'avance ≈ **3 000–5 000 MAD** de stock initial (tubes, oxydant, poudre, soins de base — prix grossiste à confirmer).
- Le stock se reconstitue en flux tendu : chaque prestation Last Minute facturée rembourse le produit consommé + la majoration +25 % couvre la logistique.
- Achat centralisé par WAL (grossistes Marrakech) : contrôle qualité, prix négociés — et préfiguration de la **centrale d'achat / shop intégré** du PDF fondateur (marge 35 % visée au dossier financier, phase 2/3).
- Logistique pilote : stock chez WAL, le pro récupère le kit avant la mission (ou remise lors du règlement hebdo).

### 5.4 Reporté à plus tard (décisions du 12/06)

- **Prestations additionnelles** (négafa, maquillage, hammam à domicile…) : mises de côté — méritent une réflexion stratégique dédiée (niche vs extension).
- **Marques premium** (Olaplex, Kérastase…) en supplément : phase 2.
- Ajustements de prix : uniquement sur retours terrain réels, l'architecture ne bouge pas.

## 6. Cohérence avec le site actuel

Le site affiche : Novice 150–300 · Confirmé 300–600 · Expert 600–1 000 · Maître 1 000+. Ces fourchettes restent justes comme **« à partir de » marketing** (elles correspondent au panier coupe+brushing→couleur). La grille détaillée ci-dessus devient la vérité opérationnelle ; ajuster le site une fois la grille validée.

## 7. Validation du 12 juin 2026 (Salim)

1. ✅ Prix de base : brushing ramené à **100 MAD**, coupe + barbe confirmé **150 MAD**, le reste inchangé — squelette figé, ajustements futurs sur retours terrain.
2. ✅ Multiplicateur Novice × 0,7 : bonne base.
3. ⏸️ Majoration villa/touriste +50 % : non rediscutée, conservée.
4. ⏸️ Prestations manquantes : mises de côté volontairement (réflexion stratégique à part).
5. ✅ Produits : modèle acompte + stock tampon acté dans son principe (§5) — chiffrage grossiste à faire.
