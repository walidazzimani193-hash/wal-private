// Catalogue partagé entre la page client (/reserver) et la page coiffeur (/pro).
// V1 = uniquement les prestations SANS matière première (categorie "A").

export type Categorie = "A" | "B";

export type Prestation = {
  id: string;
  label: string;
  groupe: "Femmes" | "Hommes & enfants";
  base: number | null; // null = sur devis
  categorie: Categorie;
  acompte?: number;
  duree: string;
};

// Toutes les prestations. La V1 ne sert que les "A".
export const prestations: Prestation[] = [
  { id: "brushing", label: "Brushing", groupe: "Femmes", base: 100, categorie: "A", duree: "45 min" },
  { id: "coupe-brushing", label: "Coupe + brushing", groupe: "Femmes", base: 250, categorie: "A", duree: "1 h 15" },
  { id: "chignon", label: "Chignon / coiffure événement", groupe: "Femmes", base: 350, categorie: "A", duree: "1 h" },
  { id: "couleur-racine", label: "Couleur racine", groupe: "Femmes", base: 300, categorie: "B", acompte: 100, duree: "2 h" },
  { id: "couleur-complete", label: "Couleur complète", groupe: "Femmes", base: 450, categorie: "B", acompte: 150, duree: "2 h" },
  { id: "balayage", label: "Balayage / mèches", groupe: "Femmes", base: 700, categorie: "B", acompte: 250, duree: "3 h" },
  { id: "soin", label: "Soin profond (protéine, botox)", groupe: "Femmes", base: 300, categorie: "B", acompte: 100, duree: "1 h" },
  { id: "lissage", label: "Lissage (brésilien, tanin)", groupe: "Femmes", base: 1200, categorie: "B", acompte: 400, duree: "3-4 h" },
  { id: "coupe-homme", label: "Coupe homme", groupe: "Hommes & enfants", base: 100, categorie: "A", duree: "30 min" },
  { id: "coupe-barbe", label: "Coupe + barbe", groupe: "Hommes & enfants", base: 150, categorie: "A", duree: "45 min" },
  { id: "coupe-enfant", label: "Coupe enfant (-12 ans)", groupe: "Hommes & enfants", base: 80, categorie: "A", duree: "30 min" },
];

// Prestations actives en V1
export const prestationsV1 = prestations.filter((p) => p.categorie === "A");

export const grades = [
  { id: "novice", roman: "I", label: "Novice", mult: 0.7, desc: "Jeunes talents certifiés" },
  { id: "confirme", roman: "II", label: "Confirmé", mult: 1, desc: "Le professionnel de référence" },
  { id: "expert", roman: "III", label: "Expert", mult: 1.6, desc: "Spécialiste reconnu" },
  { id: "maitre", roman: "IV", label: "Maître", mult: 2.5, desc: "L'excellence absolue" },
];

export const zonesCentre = ["Guéliz", "Hivernage", "Médina", "Majorelle"];
export const zonesEtendues = ["Targa", "Palmeraie", "Route de l'Ourika", "Autre zone"];
export const zones = [...zonesCentre, ...zonesEtendues];

// Indicatifs pays — Maroc + principaux pays des vacanciers à Marrakech
export const indicatifs = [
  { code: "+212", pays: "Maroc", drapeau: "🇲🇦" },
  { code: "+33", pays: "France", drapeau: "🇫🇷" },
  { code: "+32", pays: "Belgique", drapeau: "🇧🇪" },
  { code: "+34", pays: "Espagne", drapeau: "🇪🇸" },
  { code: "+44", pays: "Royaume-Uni", drapeau: "🇬🇧" },
  { code: "+49", pays: "Allemagne", drapeau: "🇩🇪" },
  { code: "+31", pays: "Pays-Bas", drapeau: "🇳🇱" },
  { code: "+39", pays: "Italie", drapeau: "🇮🇹" },
  { code: "+41", pays: "Suisse", drapeau: "🇨🇭" },
  { code: "+1", pays: "USA / Canada", drapeau: "🇺🇸" },
  { code: "+351", pays: "Portugal", drapeau: "🇵🇹" },
  { code: "+971", pays: "Émirats", drapeau: "🇦🇪" },
  { code: "+966", pays: "Arabie Saoudite", drapeau: "🇸🇦" },
  { code: "autre", pays: "Autre pays…", drapeau: "🌍" },
];

export const creneaux = [
  { id: "matin", label: "Matin", heures: "9 h – 12 h" },
  { id: "apres-midi", label: "Après-midi", heures: "12 h – 17 h" },
  { id: "soiree", label: "Soirée", heures: "17 h – 21 h" },
];

export const MIN_COMMANDE = 150;
export const ZONE_ETENDUE_FEE = 50;

export const round5 = (n: number) => Math.round(n / 5) * 5;

// Prix final TTC à partir des paramètres de réservation.
export function calculerPrix(opts: {
  base: number;
  mult: number;
  lastMinute: boolean;
  dimanche: boolean;
  zoneEtendue: boolean;
}): { total: number; minimumApplique: boolean } {
  let p = round5(opts.base * opts.mult);
  if (opts.lastMinute) p = round5(p * 1.25);
  if (opts.dimanche) p = round5(p * 1.2);
  if (opts.zoneEtendue) p += ZONE_ETENDUE_FEE;
  return { total: Math.max(p, MIN_COMMANDE), minimumApplique: p < MIN_COMMANDE };
}
