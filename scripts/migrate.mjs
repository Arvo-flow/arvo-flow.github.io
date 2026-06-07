// scripts/migrate.mjs — run once to create the benchmark DB schema.
// Usage: node --env-file=.env scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';

const url =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.POSTGRES_URL_DATABASE_URL_UNPOOLED;
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

await sql`
  CREATE TABLE IF NOT EXISTS waitlist (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    email       TEXT        NOT NULL,
    source      TEXT        NOT NULL DEFAULT 'review_queue',
    reason      TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (email, source)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS invoice_feedback (
    id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_id     UUID        REFERENCES invoice_analyses(id) ON DELETE SET NULL,
    fingerprint     TEXT        NOT NULL,
    supplier        TEXT,
    category        TEXT,
    vote            TEXT        NOT NULL CHECK (vote IN ('up', 'down')),
    comment         TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_feedback_fingerprint
    ON invoice_feedback (fingerprint, created_at DESC)
`;

await sql`
  CREATE TABLE IF NOT EXISTS magic_tokens (
    id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    token       TEXT        NOT NULL UNIQUE,
    email       TEXT        NOT NULL,
    note        TEXT,
    used_at     TIMESTAMPTZ,
    expires_at  TIMESTAMPTZ NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_magic_tokens_token
    ON magic_tokens (token)
`;

console.log('Migration klar — alla tabeller inkl. waitlist, invoice_feedback och magic_tokens är redo.');

// ── Fas 2: Tillägg för AI-CFO-funktioner ─────────────────────────────────────
// user_email        — kopplar analys till autentiserad användare (magic link)
// contract_end_date — när avtalet löper ut (för påminnelsemail)
// reminder_60/30    — spårar skickade påminnelser (idempotens)
// outcome_email     — spårar 60-dagars utfallsenkät

await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS user_email TEXT`;
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS contract_end_date DATE`;
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS reminder_60_sent_at TIMESTAMPTZ`;
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS reminder_30_sent_at TIMESTAMPTZ`;
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS outcome_email_sent_at TIMESTAMPTZ`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_analyses_user_email
    ON invoice_analyses (user_email, created_at DESC)
  WHERE user_email IS NOT NULL
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_analyses_contract_end
    ON invoice_analyses (contract_end_date)
  WHERE contract_end_date IS NOT NULL
`;

// Tillägg till arvo_outcomes för analyse-koppling och faktiska kostnader
await sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS analysis_id UUID REFERENCES invoice_analyses(id) ON DELETE SET NULL`;
await sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS predicted_annual_cost INTEGER`;
await sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS actual_annual_cost INTEGER`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_outcomes_analysis_id ON arvo_outcomes (analysis_id) WHERE analysis_id IS NOT NULL`;

console.log('Fas 2 klar — user_email, contract_end_date, reminder-kolumner och outcome-tillägg redo.');

// ── Fas 3: Flywheel-arkitektur ────────────────────────────────────────────────
// labeled_corrections — varje AI-korrektion (automatisk + manuell) sparas
// suppliers           — normaliserad leverantörsentitet
// supplier_prices     — prishistorik per leverantör/segment/datum
// contract_timelines  — kontraktssnapshots för proaktiv förfallodetektering

await sql`
  CREATE TABLE IF NOT EXISTS labeled_corrections (
    id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_id     UUID        REFERENCES invoice_analyses(id) ON DELETE SET NULL,
    field           TEXT        NOT NULL,
    original_value  TEXT,
    corrected_value TEXT,
    reason          TEXT        NOT NULL,
    corrected_by    TEXT        NOT NULL DEFAULT 'system',
    severity        TEXT        NOT NULL DEFAULT 'fix'
                    CHECK (severity IN ('fix', 'warning', 'info')),
    category        TEXT,
    supplier        TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS idx_corrections_field_reason ON labeled_corrections (field, reason)`;
await sql`CREATE INDEX IF NOT EXISTS idx_corrections_analysis ON labeled_corrections (analysis_id) WHERE analysis_id IS NOT NULL`;
await sql`CREATE INDEX IF NOT EXISTS idx_corrections_category ON labeled_corrections (category) WHERE category IS NOT NULL`;

await sql`
  CREATE TABLE IF NOT EXISTS suppliers (
    id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    name            TEXT        NOT NULL,
    normalized_name TEXT        NOT NULL UNIQUE,
    category        TEXT,
    invoice_count   INTEGER     NOT NULL DEFAULT 1,
    first_seen      DATE        NOT NULL DEFAULT CURRENT_DATE,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS supplier_prices (
    id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    supplier_id    UUID        REFERENCES suppliers(id) ON DELETE CASCADE,
    segment        TEXT        NOT NULL,
    size_bucket    TEXT        NOT NULL,
    price_per_seat INTEGER,
    annual_cost    INTEGER     NOT NULL,
    seats          INTEGER,
    invoice_date   DATE        NOT NULL,
    source         TEXT        NOT NULL DEFAULT 'invoice',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS segment TEXT NOT NULL DEFAULT 'unknown'`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS size_bucket TEXT NOT NULL DEFAULT 'unknown'`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS price_per_seat INTEGER`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS seats INTEGER`;
await sql`ALTER TABLE supplier_prices ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'invoice'`;
await sql`CREATE INDEX IF NOT EXISTS idx_supplier_prices_lookup ON supplier_prices (supplier_id, segment, size_bucket, invoice_date DESC)`;

await sql`
  CREATE TABLE IF NOT EXISTS contract_timelines (
    id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_id  UUID        REFERENCES invoice_analyses(id) ON DELETE CASCADE,
    supplier_id  UUID        REFERENCES suppliers(id) ON DELETE SET NULL,
    seats        INTEGER,
    annual_cost  INTEGER     NOT NULL,
    invoice_date DATE        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`ALTER TABLE contract_timelines ADD COLUMN IF NOT EXISTS analysis_id UUID REFERENCES invoice_analyses(id) ON DELETE CASCADE`;
await sql`ALTER TABLE contract_timelines ADD COLUMN IF NOT EXISTS supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL`;
await sql`ALTER TABLE contract_timelines ADD COLUMN IF NOT EXISTS seats INTEGER`;
await sql`ALTER TABLE contract_timelines ADD COLUMN IF NOT EXISTS annual_cost INTEGER NOT NULL DEFAULT 0`;
await sql`ALTER TABLE contract_timelines ADD COLUMN IF NOT EXISTS invoice_date DATE NOT NULL DEFAULT CURRENT_DATE`;
await sql`CREATE INDEX IF NOT EXISTS idx_contract_timelines_supplier ON contract_timelines (supplier_id, invoice_date DESC)`;

await sql`ALTER TABLE labeled_corrections ADD COLUMN IF NOT EXISTS operator_reasoning TEXT`;

console.log('Fas 3 klar — labeled_corrections, suppliers, supplier_prices, contract_timelines redo.');
