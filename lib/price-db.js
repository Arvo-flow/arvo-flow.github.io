// lib/price-db.js — prisändringsloggen (supplier_price_history) och invoice_benchmarks.
// Skrivs av verifieringsjuryn (recordVerifiedChange) och aggregate-invoice-benchmarks; läses av
// rummets prognos och marknadsrörelse (api/invoice-history).
//
// supplier_prices har varken skrivare eller läsare här. Majraderna raderades 23 okt (stada-prisdata),
// och prisboken (agents/recommender/branchindex.js) är enda prissanningen. Skrivaren upsertPrice och
// fem läsare utan anropare togs bort i T-2 (ops/ARBETSORDER-VAG1.md, SS-03).

import { getDb } from './db.js';

// ── Prishistorik per VARUMÄRKE (ILIKE) + kategori — för prognosen ──────────────
// Samma varumärkesbrygga som Marknadsrörelsen (getRecentHike): price-monitor/juryn skriver
// beskrivande leverantörsnamn ("Tele2 Företag mobilabonnemang") som aldrig exakt-matchar
// kunddatans normaliserade namn. ILIKE på nyckelordet förenar dem — annars svälts prognosen.
// months=72 (6 år): prognosen behöver fånga leverantörens HÖJNINGSKADENS, och den kan vara
// flerårig (t.ex. Microsoft 365: 2022 → 2026). Ett för snävt fönster missar mönstret.
// Platt fråga (inga nästlade SQL-fragment): de misbehavade tyst under neon-HTTP-drivern när
// tabellen väl fick data — getRecentHike bredvid var alltid platt och funkade.
export async function getSupplierCategoryChangesByKeyword({ supplierKeyword, category, months = 72 }) {
  const db = getDb();
  if (!db || !supplierKeyword) return [];
  const like = '%' + supplierKeyword + '%';
  try {
    return category
      ? await db`
        SELECT supplier, product, category, old_price_monthly, new_price_monthly,
               old_price_annual, new_price_annual, changed_at
        FROM supplier_price_history
        WHERE supplier ILIKE ${like} AND category = ${category}
          AND changed_at >= NOW() - ${months} * INTERVAL '1 month'
        ORDER BY changed_at DESC`
      : await db`
        SELECT supplier, product, category, old_price_monthly, new_price_monthly,
               old_price_annual, new_price_annual, changed_at
        FROM supplier_price_history
        WHERE supplier ILIKE ${like}
          AND changed_at >= NOW() - ${months} * INTERVAL '1 month'
        ORDER BY changed_at DESC`;
  } catch (err) {
    console.error('[price-db] getSupplierCategoryChangesByKeyword error:', err.message);
    return [];
  }
}

// ── Skriv en JURY-VERIFIERAD ändring till ändringsloggen (Verifieringsjuryn, 3A) ───
// VIKTIGT: skriver ENBART till supplier_price_history (ändringsloggen som matar prognos +
// Marknadsrörelsen) — ALDRIG till supplier_prices/benchmark (kundens besparingssiffror förblir
// människo-kontrollerade via branchindex). Allt i loggen är verifierat per konstruktion: bara
// 'verified'-nivån (lib/price-verdict.js) graderas hit; provisoriska bor i price_change_candidates.
export async function recordVerifiedChange({
  supplier, product = null, tier = null, category,
  oldMonthly = null, newMonthly = null, oldAnnual = null, newAnnual = null,
  currency = 'SEK', sourceUrl = null, changedBy = 'auto-verified', changedAt = null,
}) {
  const db = getDb();
  if (!db || !supplier || !category) return { inserted: false };
  try {
    // changedAt: när priset FAKTISKT ändrades (för backfill av verifierad historik). null → NOW()
    // (den nattliga juryns färska detektion). Aldrig ett påhittat datum — bara källbelagt.
    await db`
      INSERT INTO supplier_price_history
        (supplier, product, tier, category,
         old_price_monthly, new_price_monthly, old_price_annual, new_price_annual,
         currency, source_type, source_url, changed_by, changed_at)
      VALUES
        (${supplier}, ${product}, ${tier}, ${category},
         ${oldMonthly}, ${newMonthly}, ${oldAnnual}, ${newAnnual},
         ${currency}, 'official_web', ${sourceUrl}, ${changedBy},
         ${changedAt ? new Date(changedAt) : new Date()})
    `;
    return { inserted: true };
  } catch (err) {
    console.error('[price-db] recordVerifiedChange error:', err.message);
    return { inserted: false, error: err.message };
  }
}

// ── Senaste verifierade HÖJNING per varumärke + kategori (Marknadsrörelsen) ────
// price-monitor skriver beskrivande leverantörsnamn ("Tele2 Företag mobilabonnemang")
// medan kunddatan har normaliserade namn — därför matchar vi på varumärkes-nyckelordet
// med ILIKE (lib/supplier-keyword.js), aldrig exakt namn. Returnerar bara en VERKLIG
// höjning (nytt > gammalt) inom fönstret, senast först. null om ingen färsk höjning finns.
export async function getRecentHike({ supplierKeyword, category, months = 6 }) {
  const db = getDb();
  if (!db || !supplierKeyword || !category) return null;
  try {
    const rows = await db`
      SELECT supplier, product, category,
             old_price_monthly, new_price_monthly, old_price_annual, new_price_annual,
             changed_at
      FROM supplier_price_history
      WHERE supplier ILIKE ${'%' + supplierKeyword + '%'}
        AND category = ${category}
        AND changed_at >= NOW() - ${months} * INTERVAL '1 month'
        AND COALESCE(new_price_monthly, new_price_annual) > COALESCE(old_price_monthly, old_price_annual)
      ORDER BY changed_at DESC
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return {
      supplier:    r.supplier,
      product:     r.product,
      category:    r.category,
      oldMonthly:  r.old_price_monthly,
      newMonthly:  r.new_price_monthly,
      oldAnnual:   r.old_price_annual,
      newAnnual:   r.new_price_annual,
      changedAt:   r.changed_at,
    };
  } catch (err) {
    console.error('[price-db] getRecentHike error:', err.message);
    return null;
  }
}

// ── Invoice benchmarks ────────────────────────────────────────────────────────
// Skriver aggregerade benchmarks (anropas av aggregate-invoice-benchmarks.mjs).
export async function upsertInvoiceBenchmark({
  category, companySize, industry, metric = 'annual_cost',
  p25, median, p75, sampleSize,
}) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      INSERT INTO invoice_benchmarks (category, company_size, industry, metric, p25, median, p75, sample_size, computed_at)
      VALUES (${category}, ${companySize}, ${industry}, ${metric}, ${p25}, ${median}, ${p75}, ${sampleSize}, NOW())
      ON CONFLICT (category, company_size, industry, metric)
      DO UPDATE SET p25 = EXCLUDED.p25, median = EXCLUDED.median, p75 = EXCLUDED.p75,
                    sample_size = EXCLUDED.sample_size, computed_at = NOW()
    `;
  } catch (err) {
    console.error('[price-db] upsertInvoiceBenchmark error:', err.message);
  }
}
