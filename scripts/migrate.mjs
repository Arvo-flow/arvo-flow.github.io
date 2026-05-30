// scripts/migrate.mjs — run once to create the benchmark DB schema.
// Usage: node --env-file=.env scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';

const url =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL;
if (!url) {
  console.error('Ingen databas-URL hittad. Kör: vercel env pull .env.local');
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS invoice_datapoints (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    category    TEXT        NOT NULL,
    supplier    TEXT        NOT NULL,
    annual_cost INTEGER     NOT NULL,
    industry    TEXT        NOT NULL,
    size_bucket TEXT        NOT NULL,
    source      TEXT        NOT NULL DEFAULT 'upload',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_datapoints_segment
    ON invoice_datapoints (category, industry, size_bucket)
`;

await sql`
  CREATE TABLE IF NOT EXISTS fortnox_connections (
    id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    access_token  TEXT        NOT NULL,
    refresh_token TEXT,
    expires_at    TIMESTAMPTZ,
    scope         TEXT        NOT NULL DEFAULT 'supplierinvoice',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS customers (
    id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    industry      TEXT        NOT NULL,
    employees     INTEGER     NOT NULL,
    fortnox_id    UUID        REFERENCES fortnox_connections(id) ON DELETE SET NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS invoice_analyses (
    id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    fingerprint           TEXT        NOT NULL,
    pdf_hash              TEXT        NOT NULL,
    supplier              TEXT        NOT NULL DEFAULT '',
    normalized_supplier   TEXT,
    category              TEXT        NOT NULL DEFAULT 'uncategorized',
    annual_cost           INTEGER,
    suggested_annual_cost INTEGER,
    gross_saving          INTEGER,
    net_saving            INTEGER,
    should_switch         BOOLEAN     DEFAULT FALSE,
    route                 TEXT        NOT NULL DEFAULT 'auto',
    industry              TEXT        NOT NULL DEFAULT 'ovrigt',
    employees             INTEGER     NOT NULL DEFAULT 1,
    billing_period        TEXT,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_analyses_fingerprint
    ON invoice_analyses (fingerprint, created_at DESC)
`;

await sql`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_analyses_dedup
    ON invoice_analyses (fingerprint, pdf_hash)
`;

console.log('Migration klar — invoice_datapoints, fortnox_connections, customers och invoice_analyses är redo.');
