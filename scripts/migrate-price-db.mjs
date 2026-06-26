#!/usr/bin/env node
/**
 * Skapar/migrerar pristabeller i Neon Postgres.
 *
 * Tabeller:
 *   supplier_prices         — en rad per produkt-tier-version (nuvarande + historisk)
 *   supplier_price_history  — ändringlog, en rad per prisändring
 *   invoice_benchmarks      — aggregerade verkliga marknadsdata per kategori/bransch/storlek
 *
 * Idempotent: körs säkert flera gånger (CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS).
 */

import 'dotenv/config';
import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) {
  console.error('DATABASE_URL saknas — kan inte migrera. Sätt DATABASE_URL i .env eller GitHub Secrets.');
  process.exit(1);
}

// ── supplier_prices ───────────────────────────────────────────────────────────
// Källa:  'official_web'        — verifierat direkt mot leverantörens webbplats
//         'customer_invoice'    — aggregat från Arvo-kundernas fakturor (unik data)
//         'public_procurement'  — ramavtalspris från Kammarkollegiet/Upphandlingsmyndigheten
//         'manual'              — manuellt inmatat av Arvo-teamet
//
// price_unit: 'per_seat' | 'per_subscription' | 'per_kwh' | 'per_transaction_pct'
//
// is_current=false när ett nyare pris finns — möjliggör tidsserieanalys.
await db`
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
  )
`;
await db`CREATE INDEX IF NOT EXISTS sp_supplier_cat_idx ON supplier_prices (supplier, category, is_current)`;
await db`CREATE INDEX IF NOT EXISTS sp_category_idx     ON supplier_prices (category, is_current)`;
await db`CREATE INDEX IF NOT EXISTS sp_verified_idx     ON supplier_prices (last_verified)`;

// ── supplier_price_history ────────────────────────────────────────────────────
await db`
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
  )
`;
await db`CREATE INDEX IF NOT EXISTS sph_supplier_idx ON supplier_price_history (supplier, product, changed_at DESC)`;

// ── invoice_benchmarks ────────────────────────────────────────────────────────
// Aggregeras från invoice_analyses via aggregate-invoice-benchmarks.mjs.
// Dessa är Arvos unika fördel: verkliga marknadsdata från faktiska kundpriser.
await db`
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
  )
`;
await db`CREATE INDEX IF NOT EXISTS ib_cat_idx ON invoice_benchmarks (category, company_size, industry)`;

// ── Vaktens hjärtslag (1C) ──────────────────────────────────────────────────
// Ett verkligt svep per nattlig price-monitor-körning (record-vakt-sweep.mjs).
// lib/vakt.js self-ensurar samma schema (CREATE TABLE IF NOT EXISTS) så prod
// täcks oavsett migrationskörning; här för upptäckbarhet (schemat bor i migrationen).
await db`
  CREATE TABLE IF NOT EXISTS vakt_events (
    id           BIGSERIAL PRIMARY KEY,
    event_type   TEXT        NOT NULL DEFAULT 'sweep',
    swept_at     TIMESTAMPTZ NOT NULL,
    sources      INTEGER,
    price_points INTEGER,
    changes      INTEGER,
    detail       JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await db`CREATE INDEX IF NOT EXISTS vakt_events_swept_idx ON vakt_events (swept_at DESC)`;

console.log('✅  Pristabeller klara: supplier_prices, supplier_price_history, invoice_benchmarks, vakt_events.');
