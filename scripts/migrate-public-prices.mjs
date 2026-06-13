// scripts/migrate-public-prices.mjs — skapar public_price_points.
// Offentlig sektors VERKLIGA kontraktspriser (ramavtal + leverantörsreskontra),
// hämtade ur öppna data (offentlighetsprincipen). Egen tabell med full proveniens
// — blandas ALDRIG in i invoice_datapoints (SMB-poolen): offentliga storköpare
// har annan skala, och varje punkt måste bära sin källa (regel 3).
import { getDb } from '../lib/db.js';

async function main() {
  const db = getDb();
  if (!db) { console.error('DATABASE_URL saknas — kör mot Neon.'); process.exit(1); }

  await db`
    CREATE TABLE IF NOT EXISTS public_price_points (
      id              BIGSERIAL PRIMARY KEY,
      source          TEXT NOT NULL,            -- 'ramavtal-stat' | 'ramavtal-kommun' | 'reskontra-kommun' | 'upphandling'
      source_ref      TEXT,                     -- avtals-id / URL / diarienummer
      source_url      TEXT,
      buyer           TEXT,                      -- 'Stockholms stad'
      buyer_type      TEXT,                      -- 'stat' | 'kommun' | 'region'
      supplier            TEXT NOT NULL,
      normalized_supplier TEXT NOT NULL,
      category        TEXT NOT NULL,             -- vår kategori-enum
      product         TEXT,                      -- 'M365 Business Standard'
      unit            TEXT NOT NULL,             -- 'per_user_month' | 'per_subscription_month' | 'ore_per_kwh' | 'total_year'
      unit_price      NUMERIC NOT NULL,
      currency        TEXT NOT NULL DEFAULT 'SEK',
      observed_at     DATE,
      region          TEXT,
      raw             JSONB,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Idempotens: samma observation (källa+ref+leverantör+produkt+pris) lagras en gång.
  await db`
    CREATE UNIQUE INDEX IF NOT EXISTS public_price_points_dedup
    ON public_price_points (source, COALESCE(source_ref,''), normalized_supplier, category, COALESCE(product,''), unit, unit_price)
  `;
  await db`CREATE INDEX IF NOT EXISTS public_price_points_cat ON public_price_points (category, normalized_supplier)`;

  console.log('✓ public_price_points klar');
}

main().catch((e) => { console.error(e); process.exit(1); });
