-- ============================================================
-- WAL Private — Migration 10 : client_whatsapp nullable
--
-- Le WhatsApp est OPTIONNEL sur /reserver depuis le 15/06
-- (commit 88d1ac2 : le front envoie null si champ vide), mais la
-- colonne était restée NOT NULL (schema.sql d'origine, époque où
-- le numéro était le seul canal de contact).
-- Conséquence : toute réservation sans WhatsApp échouait en 400
-- (23502 not-null violation) — bouton RÉSERVER « qui ne fait rien ».
-- Le contact est aujourd'hui garanti par le compte obligatoire
-- (client_id) + la messagerie interne.
-- ============================================================

alter table reservations alter column client_whatsapp drop not null;

-- Vérification
select column_name, is_nullable from information_schema.columns
where table_name = 'reservations' and column_name = 'client_whatsapp';
