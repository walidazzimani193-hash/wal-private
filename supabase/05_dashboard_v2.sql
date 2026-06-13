-- ============================================================
-- WAL Private — Dashboard pilote v2 (métriques enrichies)
-- À exécuter dans Supabase (ou via run-sql.mjs).
-- Recrée stats_pilote() en AJOUTANT :
--   • delai_moyen_min   : délai moyen entre la demande et l'acceptation (minutes)
--   • taux_acceptation  : % de réservations prises en charge (acceptee + terminee)
--   • par_coiffeur      : détail par pro (courses, CA, acceptées, note, en ligne)
-- Garde admin inchangée.
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
    'messages_total',      (select count(*) from messages),

    -- ── v2 : délai moyen demande → acceptation (minutes, arrondi) ──
    'delai_moyen_min',     (select coalesce(round(avg(
                              extract(epoch from (acceptee_at - created_at)) / 60
                            )), 0)::int
                            from reservations where acceptee_at is not null),

    -- ── v2 : taux d'acceptation (% des résas prises en charge) ──
    'taux_acceptation',    (select coalesce(round(
                              100.0 * count(*) filter (where statut in ('acceptee','terminee'))
                              / nullif(count(*), 0)
                            ), 0)::int from reservations),

    -- ── v2 : détail par coiffeur, trié par CA décroissant ──
    'par_coiffeur',        (select coalesce(json_agg(row_to_json(t) order by t.ca desc), '[]'::json)
                            from (
                              select
                                co.prenom,
                                co.grade,
                                co.en_ligne,
                                co.note_moyenne                                              as note,
                                count(r.id) filter (where r.statut = 'terminee')             as courses,
                                coalesce(sum(r.prix) filter (where r.statut = 'terminee'), 0) as ca,
                                count(r.id) filter (where r.statut in ('acceptee','terminee')) as acceptees
                              from coiffeurs co
                              left join reservations r on r.coiffeur_id = co.id
                              group by co.id, co.prenom, co.grade, co.en_ligne, co.note_moyenne
                            ) t)
  ) into result;

  return result;
end;
$$;
