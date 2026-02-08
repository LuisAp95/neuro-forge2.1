/**
 * Caché en memoria para datos de Supabase.
 * Evita consultas repetidas al volver a una página ya visitada.
 */

const TTL_MS = 5 * 60 * 1000; // 5 minutos

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function getCacheKey(prefix: string): string {
  return `nf:${prefix}`;
}

/**
 * Obtiene un valor del caché si existe y no ha expirado.
 */
export function get<T>(key: string): T | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

/**
 * Guarda un valor en el caché con TTL por defecto (5 min).
 */
export function set<T>(key: string, data: T, ttlMs: number = TTL_MS): void {
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Invalida una entrada del caché (útil si quieres forzar refetch).
 */
export function invalidate(key: string): void {
  store.delete(key);
}

/**
 * Invalida todo el caché.
 */
export function invalidateAll(): void {
  store.clear();
}
