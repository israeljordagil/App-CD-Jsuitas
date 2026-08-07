/**
 * Storage Wrapper Multiplataforma (Web + Expo React Native) — Bloque 4F.3 (M8)
 * Proporciona persistencia segura de clave-valor sin dependencias rígidas de entorno.
 */

export function getStorageItem(key: string): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`Advertencia al leer ${key} de localStorage:`, e);
    }
  }
  return null;
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      if (value !== null && value !== undefined) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`Advertencia al escribir ${key} en localStorage:`, e);
    }
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Advertencia al eliminar ${key} de localStorage:`, e);
    }
  }
}
