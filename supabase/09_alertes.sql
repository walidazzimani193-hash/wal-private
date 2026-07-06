-- ============================================================
-- WAL Private — Migration 09 : alertes email pilote (06/07)
-- Toi = tour de contrôle : chaque demande t'arrive par email,
-- et si aucun coiffeur n'accepte sous 30 min tu reçois une relance.
-- Canal d'envoi : Web3Forms (gratuit, la clé pointe vers TA boîte).
-- ============================================================

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- Config privée (RLS sans policy = invisible depuis le site)
create table if not exists app_config (
  cle text primary key,
  valeur text not null
);
alter table app_config enable row level security;

insert into app_config (cle, valeur)
values ('web3forms_key', 'A_REMPLACER')
on conflict (cle) do nothing;

-- Trace de relance (une seule relance par demande)
alter table reservations add column if not exists relance_envoyee boolean not null default false;

-- ------------------------------------------------------------
-- Envoi générique vers ta boîte (ne fait rien tant que la clé
-- n'est pas renseignée → zéro risque de casser une réservation)
-- ------------------------------------------------------------
create or replace function notifier_admin(sujet text, corps text)
returns void language plpgsql security definer
set search_path = public, pg_temp
as $$
declare k text;
begin
  select valeur into k from app_config where cle = 'web3forms_key';
  if k is null or k = 'A_REMPLACER' then return; end if;
  perform net.http_post(
    url     := 'https://api.web3forms.com/submit',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body    := jsonb_build_object(
      'access_key', k,
      'from_name',  'WAL Private',
      'subject',    sujet,
      'message',    corps
    )
  );
exception when others then
  -- l'alerte ne doit JAMAIS faire échouer la réservation
  null;
end $$;

-- ------------------------------------------------------------
-- 1) Nouvelle demande → email immédiat
-- ------------------------------------------------------------
create or replace function alerte_nouvelle_demande()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
begin
  perform notifier_admin(
    'Nouvelle demande WAL — ' || coalesce(new.zone, '?') || ' — ' || coalesce(new.prix::text, '?') || ' MAD',
    'Client : '     || coalesce(new.client_prenom, '?')          || E'\n' ||
    'WhatsApp : '   || coalesce(new.client_whatsapp, 'non fourni') || E'\n' ||
    'Prestation : ' || coalesce(new.prestation_label, '?')       || E'\n' ||
    'Grade : '      || coalesce(new.grade, '?')                  || E'\n' ||
    'Zone : '       || coalesce(new.zone, '?')                   || E'\n' ||
    'Quand : '      || coalesce(new.quand, '?')                  || E'\n' ||
    'Prix : '       || coalesce(new.prix::text, '?') || ' MAD'   || E'\n' ||
    'Notes : '      || coalesce(new.notes, '-')                  || E'\n\n' ||
    'Les coiffeurs en ligne la voient sur /pro. Sans acceptation sous 30 min, tu recevras une relance.'
  );
  return new;
end $$;

drop trigger if exists trg_alerte_nouvelle_demande on reservations;
create trigger trg_alerte_nouvelle_demande
  after insert on reservations
  for each row execute function alerte_nouvelle_demande();

-- ------------------------------------------------------------
-- 2) Relance : demande en attente depuis > 30 min, jamais relancée
--    (vérifié toutes les 5 minutes par pg_cron)
-- ------------------------------------------------------------
create or replace function relancer_demandes_en_souffrance()
returns void language plpgsql security definer
set search_path = public, pg_temp
as $$
declare r record;
begin
  for r in
    select * from reservations
    where statut = 'en_attente'
      and not relance_envoyee
      and created_at < now() - interval '30 minutes'
  loop
    perform notifier_admin(
      'RELANCE — demande non acceptée depuis 30 min (' || coalesce(r.zone, '?') || ')',
      'Demande de '  || to_char(r.created_at at time zone 'Africa/Casablanca', 'HH24:MI') || ' toujours EN ATTENTE.' || E'\n\n' ||
      'Client : '     || coalesce(r.client_prenom, '?')            || E'\n' ||
      'WhatsApp : '   || coalesce(r.client_whatsapp, 'non fourni') || E'\n' ||
      'Prestation : ' || coalesce(r.prestation_label, '?')         || E'\n' ||
      'Zone : '       || coalesce(r.zone, '?')                     || E'\n' ||
      'Quand : '      || coalesce(r.quand, '?')                    || E'\n' ||
      'Prix : '       || coalesce(r.prix::text, '?') || ' MAD'     || E'\n\n' ||
      'ACTION : relance les coiffeurs de la zone par WhatsApp.'
    );
    update reservations set relance_envoyee = true where id = r.id;
  end loop;
end $$;

select cron.schedule(
  'wal-relance-demandes',
  '*/5 * * * *',
  'select relancer_demandes_en_souffrance()'
);

-- Vérification
select jobname, schedule, active from cron.job where jobname = 'wal-relance-demandes';
