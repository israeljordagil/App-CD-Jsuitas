import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Obtener extra manifest de Constants de Expo (inyectado por app.config.js en Vercel)
const extra = Constants.expoConfig?.extra || {};

const rawUrl = 
  process.env.EXPO_PUBLIC_SUPABASE_URL || 
  (extra.supabaseUrl as string) || 
  '';

const rawKey = 
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 
  (extra.supabaseAnonKey as string) || 
  '';

export const supabaseUrl: string = rawUrl.trim();
export const supabaseAnonKey: string = rawKey.trim();

// Validación real de formato de URL HTTP/HTTPS (excluyendo texto placeholder de .env.example)
export const isValidUrl: boolean = Boolean(
  supabaseUrl &&
  (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://')) &&
  !supabaseUrl.includes('TU_SUPABASE_URL')
);

export const isValidKey: boolean = Boolean(
  supabaseAnonKey &&
  !supabaseAnonKey.includes('TU_SUPABASE_ANON_KEY')
);

// Diagnóstico exacto de la variable que falta o no está configurada correctamente
export function getSupabaseConfigError(): string | null {
  if (!isValidUrl && !isValidKey) {
    return 'Falta EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY';
  }
  if (!isValidUrl) {
    return 'Falta EXPO_PUBLIC_SUPABASE_URL';
  }
  if (!isValidKey) {
    return 'Falta EXPO_PUBLIC_SUPABASE_ANON_KEY';
  }
  return null;
}

// Inicialización limpia: true únicamente cuando ambas variables existen y son válidas
export const isSupabaseConfigured: boolean = isValidUrl && isValidKey;

// Singleton Supabase Client: solo se instancia si la URL es válida para no provocar fallos de Metro/Build
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: Platform.OS === 'web' ? undefined : AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
      },
    })
  : null;

export function getSupabaseClient(): SupabaseClient | null {
  return supabase;
}
