import { supabase, isSupabaseConfigured } from "./supabase-client.js";
export async function signIn(email,password){if(!isSupabaseConfigured)throw new Error("Supabase n'est pas encore configuré.");const {data,error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;return data}
export async function signOut(){await supabase?.auth.signOut();location.href="index.html"}
export async function requireAdmin(){if(!isSupabaseConfigured){throw new Error("Supabase n'est pas encore configuré.")}const {data}=await supabase.auth.getSession();if(!data.session){location.href="admin-login.html";return null}return data.session}
