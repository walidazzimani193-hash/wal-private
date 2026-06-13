-- ============================================================
-- WAL Private — Last Minute : disponibilité des coiffeurs par zone
-- ------------------------------------------------------------
-- Le client n'a pas le droit de lire la table `coiffeurs` (RLS).
-- Cette fonction `security definer` lui permet juste de SAVOIR
-- s'il existe au moins un coiffeur en ligne dans sa zone, sans
-- exposer la moindre donnée nominative — elle ne renvoie qu'un compte.
--
-- Sert au fallback : si 0 coiffeur en ligne, on propose au client
-- de planifier plutôt que de lancer un Last Minute dans le vide.
--
-- Exécuter via :
--   DATABASE_URL="postgresql://postgres.<ref>:<mdp>@aws-0-eu-west-3.pooler.supabase.com:5432/postgres" \
--   node supabase/run-sql.mjs supabase/06_last_minute.sql
-- ============================================================

create or replace function compter_coiffeurs_en_ligne(zone_demandee text)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from coiffeurs
  where actif = true
    and en_ligne = true
    and zone_demandee = any(zones);
$$;

grant execute on function compter_coiffeurs_en_ligne(text) to anon, authenticated;
