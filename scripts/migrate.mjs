// scripts/migrate.mjs — run once to create the benchmark DB schema.
// Usage: node --env-file=.env scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';

if (!process.env.POSTGRES_URL) {
  console.error('POSTGRES_URL saknas. Sätt den i .env eller exportera variabeln.');
  process.exit(1);
}

const sql = neon(process.env.POSTGRES_URL);

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
