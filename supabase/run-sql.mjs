// Exécute un fichier .sql sur la base Supabase via le driver pg.
// Usage : DATABASE_URL="postgresql://..." node supabase/run-sql.mjs supabase/04_dashboard.sql
import { readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
const file = process.argv[2];
if (!url) { console.error("DATABASE_URL manquante"); process.exit(1); }
if (!file) { console.error("Fichier SQL manquant en argument"); process.exit(1); }

const sql = readFileSync(file, "utf8");
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log(`✅ ${file} exécuté sans erreur.`);
  // Vérif : la fonction existe-t-elle ?
  const r = await client.query(
    "select proname from pg_proc where proname = 'stats_pilote'"
  );
  console.log(r.rowCount ? "✅ Fonction stats_pilote présente." : "⚠️ Fonction stats_pilote introuvable après exécution.");
} catch (e) {
  console.error("❌ Erreur SQL :", e.message);
  process.exit(1);
} finally {
  await client.end();
}
