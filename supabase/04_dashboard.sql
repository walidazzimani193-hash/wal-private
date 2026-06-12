-- ============================================================
-- WAL Private — Dashboard pilote (statistiques admin)
-- À exécuter dans Supabase : SQL Editor → coller → Run
-- ============================================================
-- Fonction agrégée réservée à l'admin. security definer = lit toutes
-- les tables (au-dessus du RLS), MAIS ne répond qu'à l'email admin.
-- Pour changer/ajouter un admin : éditer la liste ci-dessous.
-- ============================================================

create or replace function stats_pilote()
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  -- 🔒 Garde admin : seul cet email obtient les données
  if coalesce(auth.jwt() ->> 'email', '') not in ('walidazzimani193@gmail.com') then
    raise exception 'Accès réservé à l''administrateur';
  end if;

  select json_build_object(
    'reservations_total',  (select count(*) from reservations),
    'en_attente',          (select count(*) from reservations where statut = 'en_attente'),
    'acceptee',            (select count(*) from reservations where statut = 'acceptee'),
    'terminee',            (select count(*) from reservations where statut = 'terminee'),
    'annulee',             (select count(*) from reservations where statut = 'annulee'),
    'aujourdhui',          (select count(*) from reservations where created_at::date = current_date),
    'ca_realise',          (select coalesce(sum(prix), 0) from reservations where statut = 'terminee'),
    'commission_wal',      (select coalesce(sum(
                              case when grade in ('novice','confirme')
                                   then round(prix * 0.15)
                                   else round(prix * 0.20) end
                            ), 0) from reservations where statut = 'terminee'),
    'coiffeurs_total',     (select count(*) from coiffeurs),
    'coiffeurs_actifs',    (select count(*) from coiffeurs where actif),
    'coiffeurs_en_ligne',  (select count(*) from coiffeurs where en_ligne),
    'clients_total',       (select count(*) from clients),
    'messages_total',      (select count(*) from messages)
  ) into result;

  return result;
end;
$$;
