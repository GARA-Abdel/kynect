import { supabase, isSupabaseConfigured } from "./supabase-client.js";
import { ADMIN_EMAIL } from "./supabase-config.js";

export async function signIn(email, password) {
  if (!isSupabaseConfigured) throw new Error("Supabase n'est pas encore configuré.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    await supabase.auth.signOut();
    throw new Error("Ce compte n’a pas accès à l’administration.");
  }
  return data;
}

export async function signOut() {
  await supabase?.auth.signOut();
  location.href = "index.html";
}

export async function requireAdmin() {
  if (!isSupabaseConfigured) throw new Error("Supabase n'est pas encore configuré.");
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) {
    location.href = "admin-login.html";
    return null;
  }
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    await supabase.auth.signOut();
    location.href = "admin-login.html?error=access-denied";
    return null;
  }
  return data.session;
}
''
