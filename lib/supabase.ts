import { createBrowserClient } from "@supabase/ssr";

// Variables à renseigner dans .env.local (voir .env.example)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && key);

// Client navigateur (auth coiffeur + realtime). Retourne null si non configuré,
// pour que l'app ne plante pas tant que les clés ne sont pas en place.
export function getSupabase() {
  if (!supabaseConfigured) return null;
  return createBrowserClient(url!, key!);
}
