// lib/db.js — Neon serverless Postgres client.
// Neon sets DATABASE_URL; falls back to POSTGRES_URL for compatibility.
// Returns null when neither is set so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

export function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}
