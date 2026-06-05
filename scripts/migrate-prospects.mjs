// scripts/migrate-prospects.mjs — outbound prospect briefing table.
// Usage: node --env-file=.env scripts/migrate-prospects.mjs
import { neon } from '@neondatabase/serverless';

const url =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

if (!url) {
  console.error('Ingen databas-URL. Kör: vercel env pull .env.local');
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS outbound_prospects (
    id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    token        TEXT        NOT NULL UNIQUE,
    org_nr       TEXT,
    company_name TEXT        NOT NULL,
    industry     TEXT,
    segment      TEXT,
    size_bucket  TEXT,
    employees    INTEGER,
    contact_email TEXT,
    estimates    JSONB,
    email_sent_at TIMESTAMPTZ,
    opened_at    TIMESTAMPTZ,
    action       TEXT        CHECK (action IN ('upload', 'activate', 'dismissed')),
    action_at    TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by   TEXT
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_prospects_token
    ON outbound_prospects (token)
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_prospects_created
    ON outbound_prospects (created_at DESC)
`;

console.log('Migration klar — outbound_prospects tabell redo.');
