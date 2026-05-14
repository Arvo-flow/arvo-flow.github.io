// lib/db.js — Neon serverless Postgres client.
// Checks multiple env var names to handle different Vercel/Neon prefix configs.
// Returns null when no URL is found so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

export function getDb() {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}
