-- ============================================================
-- WAL Private — Migration : comptes clients
-- À exécuter dans Supabase : SQL Editor → coller → Run
-- ============================================================

-- 1) Profil client (lié au compte Auth, infos réutilisables)
create table if not exists clients (
  id uuid primary key references auth.users(id) on delete cascade,
  prenom text,
  telephone text,
  adresse text,
  zone text,
  created_at timestamptz not null default now()
);

alter table clients enable row level security;

create policy "client lit son profil" on clients for select using (auth.uid() = id);
create policy "client cree son profil" on clients for insert with check (auth.uid() = id);
create policy "client modifie son profil" on clients for update using (auth.uid() = id);

-- 2) Rattacher les réservations à un client (optionnel : null = réservation invité)
alter table reservations add column if not exists client_id uuid references auth.users(id);
create index if not exists idx_reservations_client on reservations(client_id);

-- 3) Le client voit SES réservations à tout statut (s'ajoute aux policies existantes)
create policy "client voit ses reservations" on reservations
  for select using (client_id = auth.uid());

-- 4) Resserrer l'insert : un client connecté ne peut rattacher qu'à lui-même
drop policy if exists "client cree une reservation" on reservations;
create policy "client cree une reservation" on reservations
  for insert with check (client_id is null or client_id = auth.uid());

-- 5) Nom du coiffeur visible côté client (dénormalisé à l'acceptation,
--    car le RLS empêche le client de lire la table coiffeurs)
alter table reservations add column if not exists coiffeur_prenom text;

create or replace function accepter_reservation(resa_id uuid)
returns reservations language plpgsql security definer as $$
declare
  resa reservations;
  cprenom text;
begin
  select prenom into cprenom from coiffeurs where id = auth.uid();
  update reservations
    set statut = 'acceptee',
        coiffeur_id = auth.uid(),
        coiffeur_prenom = cprenom,
        acceptee_at = now()
  where id = resa_id and statut = 'en_attente'
  returning * into resa;
  return resa;
end; $$;
