-- ============================================================
-- WAL Private — Schéma base de données V1 (services sans produit)
-- À exécuter dans Supabase : SQL Editor → New query → coller → Run
-- ============================================================

-- 1) Table des coiffeurs (profil lié au compte Auth)
create table if not exists coiffeurs (
  id uuid primary key references auth.users(id) on delete cascade,
  prenom text not null,
  nom text,
  telephone text,
  photo_url text,
  grade text not null default 'confirme' check (grade in ('novice','confirme','expert','maitre')),
  zones text[] not null default '{}',          -- quartiers couverts
  en_ligne boolean not null default false,      -- disponible pour travailler
  actif boolean not null default true,          -- compte validé par l'admin
  note_moyenne numeric(2,1) default 5.0,
  created_at timestamptz not null default now()
);

-- 2) Table des réservations
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  -- client (pas de compte en V1)
  client_prenom text not null,
  client_whatsapp text not null,
  -- prestation
  prestation text not null,
  prestation_label text not null,
  grade text not null,
  prix integer not null,                         -- MAD, calculé côté client
  -- logistique
  zone text not null,
  quand text not null,                           -- 'last_minute' ou 'YYYY-MM-DD · créneau'
  notes text,
  -- cycle de vie
  statut text not null default 'en_attente'
    check (statut in ('en_attente','acceptee','terminee','annulee')),
  coiffeur_id uuid references coiffeurs(id),
  created_at timestamptz not null default now(),
  acceptee_at timestamptz,
  terminee_at timestamptz
);

create index if not exists idx_reservations_statut on reservations(statut);
create index if not exists idx_reservations_zone on reservations(zone);

-- 3) Realtime : diffuser les changements de réservations
alter publication supabase_realtime add table reservations;

-- ============================================================
-- 4) Sécurité (Row Level Security)
-- ============================================================
alter table coiffeurs enable row level security;
alter table reservations enable row level security;

-- Coiffeurs : chacun lit/modifie son propre profil
create policy "coiffeur lit son profil"
  on coiffeurs for select using (auth.uid() = id);
create policy "coiffeur modifie son profil"
  on coiffeurs for update using (auth.uid() = id);

-- Réservations : le client anonyme peut créer une demande
create policy "client cree une reservation"
  on reservations for insert with check (true);

-- Un coiffeur connecté voit les demandes en attente + les siennes
create policy "coiffeur voit demandes et siennes"
  on reservations for select using (
    statut = 'en_attente' or coiffeur_id = auth.uid()
  );

-- Un coiffeur accepte une demande encore libre (anti-collision via le WHERE)
create policy "coiffeur accepte ou cloture"
  on reservations for update using (
    (statut = 'en_attente') or (coiffeur_id = auth.uid())
  );

-- ============================================================
-- 5) Fonction d'acceptation atomique (empêche le double-booking)
--    Renvoie la réservation si elle a bien été prise, sinon rien.
-- ============================================================
create or replace function accepter_reservation(resa_id uuid)
returns reservations
language plpgsql
security definer
as $$
declare
  resa reservations;
begin
  update reservations
    set statut = 'acceptee',
        coiffeur_id = auth.uid(),
        acceptee_at = now()
  where id = resa_id
    and statut = 'en_attente'      -- garde anti-collision : ne prend que si encore libre
  returning * into resa;
  return resa;                      -- null si déjà prise par un autre
end;
$$;
