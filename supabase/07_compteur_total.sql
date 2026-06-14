-- ============================================================
-- WAL Private — Compteur total des coiffeurs en ligne (page d'accueil)
-- ------------------------------------------------------------
-- Variante sans zone de `compter_coiffeurs_en_ligne` : sert au
-- compteur vivant du Last Minute sur la home, qui n'a pas de zone.
-- Ne renvoie qu'un entier (aucune donnée nominative — RLS préservé).
--
-- Le front masque le compte sous un seuil (anti « 0 en ligne ») et
-- bascule sur la promesse « 10 min ». Voir components/ui/CompteurEnLigne.tsx
--
-- Exécuter via :
--   DATABASE_URL="postgresql://postgres.<ref>:<mdp>@aws-0-eu-west-3.pooler.supabase.com:5432/postgres" \
--   node supabase/run-sql.mjs supabase/07_compteur_total.sql
-- ============================================================

create or replace function compter_coiffeurs_en_ligne_total()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from coiffeurs
  where actif = true
    and en_ligne = true;
$$;

grant execute on function compter_coiffeurs_en_ligne_total() to anon, authenticated;
