// scripts/migrate.mjs — run once to create the benchmark DB schema.
// Usage: node --env-file=.env scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.error('DATABASE_URL (eller POSTGRES_URL) saknas. Kör: vercel env pull .env.local');
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

console.log('Migration klar — invoice_datapoints-tabellen är redo.');
