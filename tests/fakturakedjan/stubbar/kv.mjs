// Stubbe för @vercel/kv: en Map, nollställd före varje fall (globalThis.__KV). FX-kursen ligger i KV
// med en riktig källa och dagens datum, annars spärrar FX-grinden fakturan och instrumentet mäter sin
// egen spärr (samma läxa som scripts/prissattningsgrad.mjs).
const kv = () => (globalThis.__KV ??= new Map());
export function createClient() {
  return {
    get: async (k) => {
      if (kv().has(k)) return kv().get(k);
      if (/fx|kurs|rate/i.test(k)) {
        return { rate: 10.5, source: 'riksbank', date: new Date().toISOString().slice(0, 10), fetchedAt: new Date().toISOString() };
      }
      return null;
    },
    set: async (k, v) => { kv().set(k, v); return 'OK'; },
    del: async (...ks) => { for (const k of ks.flat()) kv().delete(k); return 1; },
    incr: async (k) => { const n = (Number(kv().get(k)) || 0) + 1; kv().set(k, n); return n; },
    incrby: async (k, d) => { const n = (Number(kv().get(k)) || 0) + d; kv().set(k, n); return n; },
    expire: async () => 1,
    ttl: async () => -1,
    exists: async (...ks) => ks.flat().filter((k) => kv().has(k)).length,
    mget: async (...ks) => ks.flat().map((k) => (kv().has(k) ? kv().get(k) : null)),
    sadd: async () => 1, smembers: async () => [], hget: async () => null, hset: async () => 1,
    lpush: async () => 1, lrange: async () => [], scan: async () => [0, []],
  };
}
export const kv0 = createClient();
export { kv0 as kv };
