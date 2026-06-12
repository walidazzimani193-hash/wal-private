-- ============================================================
-- WAL Private — Migration : messagerie interne client ↔ coiffeur
-- À exécuter dans Supabase : SQL Editor → coller → Run
-- ============================================================
-- Règles :
--   • 1 fil par réservation, entre le client et le coiffeur assignés
--   • Écriture ouverte au statut 'acceptee', et jusqu'à 24 h après 'terminee'
--   • Numéros de téléphone masqués automatiquement (anti-contournement)
-- ============================================================

-- 1) Table des messages
create table if not exists messages (
  id             uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references reservations(id) on delete cascade,
  expediteur_id  uuid not null references auth.users(id),
  role           text not null check (role in ('client','coiffeur')),
  contenu        text not null,                       -- déjà nettoyé (numéros masqués)
  a_ete_masque   boolean not null default false,      -- vrai si un numéro a été retiré
  lu             boolean not null default false,
  created_at     timestamptz not null default now()
);

create index if not exists idx_messages_reservation on messages(reservation_id);

-- ============================================================
-- 2) Masquage automatique des numéros (trigger BEFORE INSERT)
--    Infaisable à contourner : le nettoyage se fait côté serveur.
-- ============================================================
create or replace function masquer_numeros()
returns trigger language plpgsql as $$
declare
  nettoye text;
begin
  nettoye := new.contenu;
  -- a) formats espacés/ponctués : « 06 12 34 56 78 », « +212-6-12-34-56-78 »
  --    (≥ 3 groupes de chiffres séparés → c'est un numéro, pas un prix)
  nettoye := regexp_replace(nettoye, '\+?\d{2,4}([ .\-]\d{2,4}){2,}', '[numéro masqué]', 'g');
  -- b) suites contiguës de 6 chiffres ou plus : « 0612345678 »
  nettoye := regexp_replace(nettoye, '\d{6,}', '[numéro masqué]', 'g');

  new.a_ete_masque := (nettoye is distinct from new.contenu);
  new.contenu := nettoye;
  return new;
end; $$;

drop trigger if exists trg_masquer_numeros on messages;
create trigger trg_masquer_numeros
  before insert on messages
  for each row execute function masquer_numeros();

-- ============================================================
-- 3) Helpers de sécurité (security definer : lisent reservations
--    même si le RLS bloquerait l'utilisateur sur cette table)
-- ============================================================

-- Suis-je le client ou le coiffeur de cette réservation ?
create or replace function est_participant(resa uuid)
returns boolean language sql security definer stable as $$
  select exists(
    select 1 from reservations r
    where r.id = resa
      and (r.client_id = auth.uid() or r.coiffeur_id = auth.uid())
  );
$$;

-- Puis-je encore écrire ? (acceptée, ou terminée depuis moins de 24 h)
create or replace function peut_ecrire(resa uuid)
returns boolean language sql security definer stable as $$
  select exists(
    select 1 from reservations r
    where r.id = resa
      and (r.client_id = auth.uid() or r.coiffeur_id = auth.uid())
      and (
        r.statut = 'acceptee'
        or (r.statut = 'terminee' and r.terminee_at > now() - interval '24 hours')
      )
  );
$$;

-- ============================================================
-- 4) Row Level Security
-- ============================================================
alter table messages enable row level security;

-- Lecture : seuls les 2 participants voient le fil (à tout statut)
create policy "participant lit le fil" on messages
  for select using (est_participant(reservation_id));

-- Écriture : participant, en son propre nom, dans la fenêtre autorisée
create policy "participant ecrit dans la fenetre" on messages
  for insert with check (
    expediteur_id = auth.uid()
    and est_participant(reservation_id)
    and peut_ecrire(reservation_id)
  );

-- Marquer comme lu : un participant marque les messages reçus
create policy "participant marque lu" on messages
  for update using (
    est_participant(reservation_id) and expediteur_id <> auth.uid()
  );

-- ============================================================
-- 5) Realtime : diffuser les nouveaux messages en direct
-- ============================================================
alter publication supabase_realtime add table messages;
