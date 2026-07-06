-- ============================================================
-- WAL Private — Migration 08 : durcissement sécurité (audit 06/07)
-- ⚠️ À exécuter QUAND SUPABASE SERA RÉACTIVÉ :
--    Dashboard → SQL Editor → coller ce fichier → Run
-- (ou : DATABASE_URL="..." node supabase/run-sql.mjs supabase/08_securite.sql)
--
-- Corrige 3 trous des policies d'origine (schema.sql) :
--   1. LECTURE : n'importe qui (clé anon publique) pouvait lire les
--      demandes en attente → prénoms + WhatsApp des clients exposés.
--   2. MODIF : n'importe qui pouvait modifier une demande en attente
--      (prix, statut…) — la policy n'était pas limitée aux coiffeurs.
--   3. INSERT : insert anonyme illimité (spam) alors que la réservation
--      exige un compte depuis le 13/06.
-- Les parcours existants restent intacts : client voit SES résas,
-- coiffeur voit les demandes + les siennes, accepte via RPC, clôture
-- les siennes, admin (/pilote) garde stats + temps réel.
-- ============================================================

-- Helper : l'utilisateur connecté est-il un coiffeur ?
-- (security definer car le RLS de `coiffeurs` ne laisse lire que son
--  propre profil — ce qui suffit ici, mais on fige le comportement)
create or replace function est_coiffeur()
returns boolean language sql security definer stable
set search_path = public, pg_temp
as $$
  select exists(select 1 from coiffeurs where id = auth.uid());
$$;

-- 1) LECTURE — réservée aux coiffeurs connectés (demandes en attente
--    + les leurs) et à l'admin (dashboard /pilote temps réel).
--    Le client garde sa policy dédiée « client voit ses reservations ».
drop policy if exists "coiffeur voit demandes et siennes" on reservations;
create policy "coiffeur voit demandes et siennes" on reservations
  for select to authenticated
  using (
    (est_coiffeur() and statut = 'en_attente')
    or coiffeur_id = auth.uid()
    or coalesce(auth.jwt() ->> 'email', '') = 'walidazzimani193@gmail.com'
  );

-- 2) MODIF — un coiffeur ne modifie que SES réservations (clôture).
--    L'acceptation passe déjà par la RPC accepter_reservation()
--    (security definer) : elle n'est pas affectée.
drop policy if exists "coiffeur accepte ou cloture" on reservations;
create policy "coiffeur cloture ses reservations" on reservations
  for update to authenticated
  using (coiffeur_id = auth.uid())
  with check (coiffeur_id = auth.uid());

-- 3) INSERT — compte obligatoire (décision produit 13/06) : la demande
--    doit être rattachée au compte qui la crée. Garde-fou prix inclus.
drop policy if exists "client cree une reservation" on reservations;
create policy "client cree une reservation" on reservations
  for insert to authenticated
  with check (
    client_id = auth.uid()
    and coalesce(prix, 0) between 1 and 20000
  );

-- 4) Durcissement des fonctions security definer existantes :
--    search_path figé (recommandation Supabase, évite tout détournement
--    par schéma malveillant).
alter function accepter_reservation(uuid)        set search_path = public, pg_temp;
alter function est_participant(uuid)             set search_path = public, pg_temp;
alter function peut_ecrire(uuid)                 set search_path = public, pg_temp;
alter function stats_pilote()                    set search_path = public, pg_temp;
alter function compter_coiffeurs_en_ligne(text)  set search_path = public, pg_temp;

-- Vérification rapide (affiche les policies actives sur reservations)
select policyname, cmd, roles from pg_policies where tablename = 'reservations';
