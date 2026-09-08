// lib/db.js — Neon serverless Postgres client.
// Checks multiple env var names to handle different Vercel/Neon prefix configs.
// Returns null when no URL is found so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

// ── EN SANNING PER FRÅGA (2026-09-08, ur 852 falsklarm) ─────────────────────────────────────
// `api/health.mjs` frågade `process.env.DATABASE_URL` direkt och rapporterade 503 när just det
// NAMNET saknades. Men fyra namn duger, och Vercels egen Postgres-integration sätter
// `POSTGRES_URL`. Databasen fungerade alltså hela tiden — analyser lagrades, prisboken lästes —
// medan hälsokontrollen sa att produktionen låg nere.
//
// `canary.yml` pingar health varje timme och skapar ett GH-ärende vid 503. Utfallet, mätt:
// ärende #79 bär 852 kommentarer sedan 9 juli, #75 bär 386 dessförinnan. Två månader av
// timvisa larm på ett friskt system — och ett larm som alltid är rött är ett larm ingen läser.
// Så stängdes smyghöjningsvakten av 2026-07-20, till en kostnad av 16 dygns
// osedda prishöjningar.
//
// Felet var inte namnet utan UPPDELNINGEN: två ställen svarade på samma fråga, och de kunde
// glida isär. Listan bor nu här, och health MÅSTE fråga den (HK-01/HK-02).
export const DB_URL_ALIAS = Object.freeze([
  'DATABASE_URL',
  'POSTGRES_URL',                // Vercels egen Postgres-integration sätter detta
  'POSTGRES_URL_DATABASE_URL',
  'POSTGRES_PRISMA_URL',
]);

/**
 * VILKET av de godtagna namnen som bär anslutningen — aldrig värdet.
 * `null` betyder att ingen databas är konfigurerad, och det är det ENDA som ska larma.
 */
export function dbUrlKalla(env = process.env) {
  return DB_URL_ALIAS.find((k) => typeof env[k] === 'string' && env[k].trim() !== '') ?? null;
}

export function getDb() {
  const kalla = dbUrlKalla();
  if (!kalla) return null;
  if (!_sql) _sql = neon(process.env[kalla]);
  return _sql;
}
