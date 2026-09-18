import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";
export const isSupabaseConfigured = SUPABASE_URL.startsWith("http") && !SUPABASE_URL.includes("REMPLACER") && !SUPABASE_ANON_KEY.includes("REMPLACER");
export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
export function requireSupabase(){ if(!supabase) throw new Error("Supabase n'est pas encore configuré. Renseignez js/supabase-config.js."); return supabase; }
