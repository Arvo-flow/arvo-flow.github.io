// scripts/migrate-v2.mjs — Arvo Intelligence Fas 1-migreringar
//
// Lägger till:
//   - invoice_analyses.seat_count              (antal licenser/SIM-kort per analys)
//   - invoice_analyses.price_per_seat_monthly  (pris per säte/mth, kr, beräknat)
//   - price_alerts_sent                        (idempotens för kundnotifieringspipelinen)
//   - activation_outcomes                      (Layer 2-utfallsspårning, fee = 20% av verified saving)
//
// Kör: node --env-file=.env.local scripts/migrate-v2.mjs
import { neon } from '@neondatabase/serverless';

const url =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

if (!url) {
  console.error('Ingen databas-URL. Kör: vercel env pull .env.local');
  process.exit(1);
}

const sql = neon(url);

// ── invoice_analyses: sätesinformation ───────────────────────────────────────
// seat_count gör det möjligt att normalisera per-säte-pris vid smyghöjnings-
// detektering — totalkostnad kan stiga av att bolaget anställt folk, inte för
// att leverantören höjt priset. Utan normalisering flaggas skalning som höjning.
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS seat_count INTEGER`;
await sql`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS price_per_seat_monthly INTEGER`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_analyses_supplier_seats
    ON invoice_analyses (normalized_supplier, category, created_at DESC)
  WHERE seat_count IS NOT NULL AND seat_count > 0
`;

console.log('✓ invoice_analyses: seat_count + price_per_seat_monthly + index');

// ── price_alerts_sent ─────────────────────────────────────────────────────────
// Idempotenstabellen för notify-price-changes.mjs.
// En rad per (monitor_run_id, supplier, category) — garanterar att kunder
// aldrig får dubblett-alert för samma prisändringshändelse.
// monitor_run_id = report.runAt (ISO-sträng) från price-monitor-rapporten.
await sql`
  CREATE TABLE IF NOT EXISTS price_alerts_sent (
    id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    monitor_run_id  TEXT        NOT NULL,
    supplier        TEXT        NOT NULL,
    category        TEXT        NOT NULL,
    emails_sent     INTEGER     NOT NULL DEFAULT 0,
    total_impact_kr INTEGER,
    haiku_analysis  JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (monitor_run_id, supplier, category)
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_price_alerts_run
    ON price_alerts_sent (monitor_run_id, created_at DESC)
`;

console.log('✓ price_alerts_sent: skapad');

// ── activation_outcomes ───────────────────────────────────────────────────────
// Spårar Layer 2-utfall: kund klickar "Aktivera" i Decision Board →
// activation_outcome skapas → 30-dagars uppföljning → fee = 20% av verified_saving_kr.
await sql`
  CREATE TABLE IF NOT EXISTS activation_outcomes (
    id                  UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
    briefing_id         UUID,
    customer_email      TEXT        NOT NULL,
    supplier            TEXT        NOT NULL,
    category            TEXT        NOT NULL,
    action_type         TEXT        NOT NULL,
    predicted_saving_kr INTEGER,
    verified_saving_kr  INTEGER,
    fee_kr              INTEGER     GENERATED ALWAYS AS (ROUND(verified_saving_kr * 0.20)) STORED,
    status              TEXT        NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'confirmed', 'cancelled', 'invoiced')),
    activated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified_at         TIMESTAMPTZ,
    followup_30_sent_at TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_activation_email
    ON activation_outcomes (customer_email, activated_at DESC)
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_activation_pending
    ON activation_outcomes (status, activated_at DESC)
  WHERE status = 'pending'
`;

console.log('✓ activation_outcomes: skapad (fee_kr = 20% av verified_saving_kr, genererad kolumn)');
console.log('\n✅ Arvo Intelligence Fas 1-migreringar klara.');
