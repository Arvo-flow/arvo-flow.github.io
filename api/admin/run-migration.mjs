// api/admin/run-migration.mjs — Engångsanrop för att skapa nya DB-tabeller.
// Anropas EN gång via admin-sidan, sedan kan den lämnas kvar (skyddad av ADMIN_TOKEN).
import { getDb } from '../../lib/db.js';
import { TEST_EXAKTA, TEST_DOMAN, TEST_LOKALDELAR } from '../../lib/test-surface.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  // Accepterar POST (x-admin-token header) eller GET (?token=...) för mobil-åtkomst
  const token = req.headers['x-admin-token']
    ?? new URL(req.url, 'https://x').searchParams.get('token');

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }

  const sql = getDb();
  if (!sql) return send(res, 503, { error: 'DB ej konfigurerad' });

  const results = [];

  const steps = [
    {
      name: 'waitlist',
      run: () => sql`CREATE TABLE IF NOT EXISTS waitlist (
        id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
        email      TEXT        NOT NULL,
        source     TEXT        NOT NULL DEFAULT 'review_queue',
        reason     TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (email, source)
      )`,
    },
    {
      name: 'invoice_feedback',
      run: () => sql`CREATE TABLE IF NOT EXISTS invoice_feedback (
        id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        fingerprint TEXT NOT NULL,
        supplier    TEXT,
        category    TEXT,
        vote        TEXT NOT NULL CHECK (vote IN ('up', 'down')),
        comment     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'magic_tokens',
      run: () => sql`CREATE TABLE IF NOT EXISTS magic_tokens (
        id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        token      TEXT NOT NULL UNIQUE,
        email      TEXT NOT NULL,
        note       TEXT,
        used_at    TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'idx_magic_tokens_token',
      run: () => sql`CREATE INDEX IF NOT EXISTS idx_magic_tokens_token ON magic_tokens (token)`,
    },
    {
      name: 'idx_feedback_fingerprint',
      run: () => sql`CREATE INDEX IF NOT EXISTS idx_feedback_fingerprint ON invoice_feedback (fingerprint, created_at DESC)`,
    },

    // ── P4.2: Prisdatabas ─────────────────────────────────────────────────────
    {
      name: 'supplier_prices',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS supplier_prices (
          id              SERIAL PRIMARY KEY,
          supplier        TEXT        NOT NULL,
          product         TEXT        NOT NULL,
          tier            TEXT,
          category        TEXT        NOT NULL,
          price_monthly   NUMERIC(10,2),
          price_annual    NUMERIC(10,2),
          price_unit      TEXT        NOT NULL DEFAULT 'per_seat',
          currency        TEXT        NOT NULL DEFAULT 'SEK',
          usd_monthly     NUMERIC(10,4),
          usd_annual      NUMERIC(10,4),
          market          TEXT        NOT NULL DEFAULT 'SE',
          source_type     TEXT        NOT NULL,
          source_url      TEXT,
          confidence      NUMERIC(4,3)         DEFAULT 0.90,
          last_verified   DATE,
          valid_from      DATE,
          is_current      BOOLEAN              DEFAULT true,
          metadata        JSONB,
          created_at      TIMESTAMPTZ          DEFAULT NOW(),
          updated_at      TIMESTAMPTZ          DEFAULT NOW(),
          CONSTRAINT uq_supplier_product_tier UNIQUE (supplier, product, tier, is_current)
        )`,
    },
    {
      name: 'sp_supplier_cat_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_supplier_cat_idx ON supplier_prices (supplier, category, is_current)`,
    },
    {
      name: 'sp_category_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_category_idx ON supplier_prices (category, is_current)`,
    },
    {
      name: 'sp_verified_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_verified_idx ON supplier_prices (last_verified)`,
    },
    {
      name: 'supplier_price_history',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS supplier_price_history (
          id                SERIAL PRIMARY KEY,
          supplier          TEXT        NOT NULL,
          product           TEXT        NOT NULL,
          tier              TEXT,
          category          TEXT        NOT NULL,
          old_price_monthly NUMERIC(10,2),
          new_price_monthly NUMERIC(10,2),
          old_price_annual  NUMERIC(10,2),
          new_price_annual  NUMERIC(10,2),
          currency          TEXT        NOT NULL DEFAULT 'SEK',
          source_type       TEXT,
          source_url        TEXT,
          changed_by        TEXT                 DEFAULT 'system',
          changed_at        TIMESTAMPTZ          DEFAULT NOW(),
          notes             TEXT
        )`,
    },
    {
      name: 'sph_supplier_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sph_supplier_idx ON supplier_price_history (supplier, product, changed_at DESC)`,
    },
    {
      name: 'invoice_benchmarks',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS invoice_benchmarks (
          id           SERIAL PRIMARY KEY,
          category     TEXT        NOT NULL,
          company_size TEXT        NOT NULL,
          industry     TEXT        NOT NULL,
          metric       TEXT        NOT NULL DEFAULT 'annual_cost',
          p25          NUMERIC(12,2),
          median       NUMERIC(12,2),
          p75          NUMERIC(12,2),
          sample_size  INTEGER,
          computed_at  TIMESTAMPTZ          DEFAULT NOW(),
          CONSTRAINT uq_benchmark UNIQUE (category, company_size, industry, metric)
        )`,
    },
    {
      name: 'ib_cat_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS ib_cat_idx ON invoice_benchmarks (category, company_size, industry)`,
    },

    // ── Inga prisseedar (2026-10-21, grundarbeslut: prisboken är enda sanningen) ─────────────────
    // Här stod 46 hårdkodade priser, en ögonblicksbild från maj 2026, som skrevs till supplier_prices
    // som is_current. Flera var redan rättade i prisboken (M365 57,40/119,48, Atlassian, Adobe). En
    // parallell prislista i repot är en lista som glider isär från boken. Migreringen skapar bara
    // tabellerna (SS-01).

    // ── Fas 2: AI-CFO-kolumner ─────────────────────────────────────────────────
    // arvo_outcomes — skapa tabell om den inte finns (med alla kolumner)
    {
      name: 'arvo_outcomes',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS arvo_outcomes (
          id                    SERIAL      PRIMARY KEY,
          fingerprint           TEXT,
          supplier              TEXT        NOT NULL,
          category              TEXT        NOT NULL,
          predicted_net         INTEGER,
          actual_net            INTEGER,
          switched              BOOLEAN     NOT NULL DEFAULT false,
          switched_at           DATE,
          reported_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          notes                 TEXT,
          source                TEXT        DEFAULT 'customer'
        )`,
    },
    { name: 'arvo_outcomes_cat_idx', run: () => sql`CREATE INDEX IF NOT EXISTS arvo_outcomes_cat_idx ON arvo_outcomes (category)` },
    { name: 'arvo_outcomes_fp_idx',  run: () => sql`CREATE INDEX IF NOT EXISTS arvo_outcomes_fp_idx ON arvo_outcomes (fingerprint)` },
    // Nya kolumner på arvo_outcomes
    { name: 'ao_analysis_id',           run: () => sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS analysis_id UUID REFERENCES invoice_analyses(id) ON DELETE SET NULL` },
    { name: 'ao_predicted_annual_cost', run: () => sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS predicted_annual_cost INTEGER` },
    { name: 'ao_actual_annual_cost',    run: () => sql`ALTER TABLE arvo_outcomes ADD COLUMN IF NOT EXISTS actual_annual_cost INTEGER` },
    { name: 'ao_analysis_id_idx',       run: () => sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_outcomes_analysis_id ON arvo_outcomes (analysis_id) WHERE analysis_id IS NOT NULL` },
    // Nya kolumner på invoice_analyses
    { name: 'ia_user_email',           run: () => sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS user_email TEXT` },
    { name: 'ia_contract_end_date',    run: () => sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS contract_end_date DATE` },
    { name: 'ia_reminder_60',          run: () => sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS reminder_60_sent_at TIMESTAMPTZ` },
    { name: 'ia_reminder_30',          run: () => sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS reminder_30_sent_at TIMESTAMPTZ` },
    { name: 'ia_outcome_email',        run: () => sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS outcome_email_sent_at TIMESTAMPTZ` },
    { name: 'idx_analyses_user_email', run: () => sql`CREATE INDEX IF NOT EXISTS idx_analyses_user_email ON invoice_analyses (user_email, created_at DESC) WHERE user_email IS NOT NULL` },
    { name: 'idx_analyses_contract',   run: () => sql`CREATE INDEX IF NOT EXISTS idx_analyses_contract_end ON invoice_analyses (contract_end_date) WHERE contract_end_date IS NOT NULL` },

    // ── Fas 3: Flywheel-arkitektur ────────────────────────────────────────────
    {
      name: 'labeled_corrections',
      run: () => sql`
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
        )`,
    },
    { name: 'idx_corrections_field_reason', run: () => sql`CREATE INDEX IF NOT EXISTS idx_corrections_field_reason ON labeled_corrections (field, reason)` },
    { name: 'idx_corrections_analysis',     run: () => sql`CREATE INDEX IF NOT EXISTS idx_corrections_analysis ON labeled_corrections (analysis_id) WHERE analysis_id IS NOT NULL` },
    { name: 'idx_corrections_category',     run: () => sql`CREATE INDEX IF NOT EXISTS idx_corrections_category ON labeled_corrections (category) WHERE category IS NOT NULL` },
    {
      name: 'graph_suppliers',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS graph_suppliers (
          id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          name            TEXT        NOT NULL,
          normalized_name TEXT        NOT NULL UNIQUE,
          category        TEXT,
          invoice_count   INTEGER     NOT NULL DEFAULT 1,
          first_seen      DATE        NOT NULL DEFAULT CURRENT_DATE,
          updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`,
    },
    {
      name: 'graph_supplier_prices',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS graph_supplier_prices (
          id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          supplier_id    UUID        REFERENCES graph_suppliers(id) ON DELETE CASCADE,
          segment        TEXT        NOT NULL,
          size_bucket    TEXT        NOT NULL,
          price_per_seat INTEGER,
          annual_cost    INTEGER     NOT NULL,
          seats          INTEGER,
          invoice_date   DATE        NOT NULL,
          source         TEXT        NOT NULL DEFAULT 'invoice',
          created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`,
    },
    { name: 'idx_graph_prices_lookup', run: () => sql`CREATE INDEX IF NOT EXISTS idx_graph_prices_lookup ON graph_supplier_prices (supplier_id, segment, size_bucket, invoice_date DESC)` },
    {
      name: 'graph_contract_timelines',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS graph_contract_timelines (
          id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          analysis_id  UUID        REFERENCES invoice_analyses(id) ON DELETE CASCADE,
          supplier_id  UUID        REFERENCES graph_suppliers(id) ON DELETE SET NULL,
          seats        INTEGER,
          annual_cost  INTEGER     NOT NULL,
          invoice_date DATE        NOT NULL,
          created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`,
    },
    { name: 'idx_graph_contracts_supplier', run: () => sql`CREATE INDEX IF NOT EXISTS idx_graph_contracts_supplier ON graph_contract_timelines (supplier_id, invoice_date DESC)` },

    // ── Fas 3b: Backfill + live-benchmarking infrastruktur ────────────────────
    // Lägger till source_analysis_id på invoice_datapoints för idempotent backfill.
    // Utan denna kolumn skulle varje migrations-körning duplicera datapunkterna.
    {
      name: 'dp_source_analysis_id',
      run: () => sql`ALTER TABLE invoice_datapoints ADD COLUMN IF NOT EXISTS source_analysis_id UUID`,
    },
    {
      name: 'idx_dp_source_analysis',
      run: () => sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_dp_source_analysis ON invoice_datapoints (source_analysis_id) WHERE source_analysis_id IS NOT NULL`,
    },
    // Retroaktiv backfill: alla tidigare invoice_analyses → invoice_datapoints.
    // ON CONFLICT-skyddet via source_analysis_id gör steget idempotent.
    // El-kategorin exkluderas (elRec har egna beräkningar, inte jämförbar direkt).
    {
      name: 'backfill_datapoints_from_analyses',
      run: () => sql`
        INSERT INTO invoice_datapoints
          (category, supplier, annual_cost, industry, size_bucket, source_analysis_id)
        SELECT
          ia.category,
          ia.normalized_supplier,
          ia.annual_cost,
          ia.industry,
          CASE
            WHEN ia.employees <= 9  THEN 'micro'
            WHEN ia.employees <= 49 THEN 'small'
            ELSE                         'mid'
          END,
          ia.id
        FROM invoice_analyses ia   -- liggare: moat
        -- ⚠️ STOD SOM «internt: körs av admin med explicit avsikt» TILL 2026-09-13. Det skälet
        -- svarar på VEM SOM TRYCKER, aldrig på VAD RADERNA BLIR. Satsen är den ANDRA av exakt två
        -- skrivare till prisboken (den första är «storeDatapoint», grindad sedan 6cd359f) — och
        -- den hade ingen grind alls: varken testidentitet, segmentOkant, enhetskarantän eller
        -- avvikelsevakt. En testfaktura hade backfillats rakt in i den tabell som bär den HÖGRE
        -- tröskeln (10), permanent. Testidentiteten utesluts nu med samma villkor som varje annan
        -- moat-sats; enhetskarantänen och segmentfrågan är kvar som öppen skuld, uttalat.
        WHERE (ia.user_email IS NULL OR NOT (
                lower(regexp_replace(ia.user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')) = ANY(${TEST_EXAKTA})
                OR (split_part(lower(regexp_replace(ia.user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 2) = ${TEST_DOMAN}
                    AND split_part(split_part(lower(regexp_replace(ia.user_email, '^[[:space:]]+|[[:space:]]+$', '', 'g')), '@', 1), '+', 1) = ANY(${TEST_LOKALDELAR}))))
          AND ia.route       = 'auto'
          AND ia.annual_cost > 500
          AND ia.annual_cost < 5000000
          AND ia.employees   > 0
          AND ia.category    NOT IN ('uncategorized', 'el')
          AND NOT EXISTS (
            SELECT 1 FROM invoice_datapoints dp
            WHERE dp.source_analysis_id = ia.id
          )
      `,
    },

    // ── Arvo Intelligence: Interactive Briefing ───────────────────────────────
    {
      name: 'briefing_reports',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS briefing_reports (
          id                      UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
          customer_email          TEXT        NOT NULL,
          period                  TEXT        NOT NULL,
          insights                JSONB       NOT NULL DEFAULT '[]',
          actions_taken           JSONB       NOT NULL DEFAULT '{}',
          total_saving_potential  INTEGER,
          total_invoices_analyzed INTEGER,
          insight_count           INTEGER,
          token_id                UUID        REFERENCES magic_tokens(id) ON DELETE SET NULL,
          generated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at              TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
          viewed_at               TIMESTAMPTZ,
          UNIQUE(customer_email, period)
        )
      `,
    },
    { name: 'idx_briefing_token_id',     run: () => sql`CREATE INDEX IF NOT EXISTS idx_briefing_token_id ON briefing_reports (token_id) WHERE token_id IS NOT NULL` },
    { name: 'idx_briefing_email_period', run: () => sql`CREATE INDEX IF NOT EXISTS idx_briefing_email_period ON briefing_reports (customer_email, period DESC)` },
  ];

  for (const step of steps) {
    try {
      await step.run();
      results.push({ name: step.name, ok: true });
    } catch (err) {
      results.push({ name: step.name, ok: false, error: err.message });
    }
  }

  const allOk = results.every((r) => r.ok);
  return send(res, allOk ? 200 : 207, { ok: allOk, results });
}
