// lib/db.js — Neon serverless Postgres client.
// Returns null when POSTGRES_URL is not set so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

export function getDb() {
  if (!process.env.POSTGRES_URL) return null;
  if (!_sql) _sql = neon(process.env.POSTGRES_URL);
  return _sql;
}
