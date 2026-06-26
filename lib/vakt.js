// lib/vakt.js — Vaktens hjärtslag (1C). Gör radarns "senaste svep" och kvittona till VERKLIGA
// tidsstämplade händelser, inte härledd text.
//
// Zero Trust / anti-Potemkin: hjärtslaget får ALDRIG vara en tom tidsstämpel skriven varje natt
// "för syns skull" — det vore precis det fejkflöde bibeln förbjuder. Varje vakt_event registreras
// FRÅN ett verkligt svep: scripts/price-monitor.mjs sveper ~40 leverantörssidor med Playwright varje
// natt och skriver /tmp/price-monitor-report.json (passed/warnings/alerts) oavsett utfall.
// record-vakt-sweep.mjs läser den rapporten → en rad här. Siffrorna är vad maskinen FAKTISKT gjorde.

import { getDb } from './db.js';

// Härled svepets sammanfattning ur price-monitor-rapporten. Ren funktion (testbar offline):
//   sources      = distinkta leverantörssidor som svepts (passed + warnings + alerts)
//   pricePoints  = totalt antal priskontroller som kördes
//   changes      = verkliga avvikelser (alerts) — 0 = "allt lugnt", det premiumladdade tysta svepet
export function sweepSummaryFromReport(report) {
  if (!report || typeof report !== 'object' || !report.runAt) return null;
  const passed   = Array.isArray(report.passed)   ? report.passed   : [];
  const warnings = Array.isArray(report.warnings) ? report.warnings : [];
  const alerts   = Array.isArray(report.alerts)   ? report.alerts   : [];
  const all = [...passed, ...warnings, ...alerts];
  if (all.length === 0) return null;                       // inget svept → inget hjärtslag att påstå
  const sources = new Set(all.map((x) => x && x.supplier).filter(Boolean)).size;
  return {
    sweptAt:     report.runAt,
    sources:     sources || all.length,
    pricePoints: all.length,
    changes:     alerts.length,
    detail:      { passed: passed.length, warnings: warnings.length, alerts: alerts.length },
  };
}

async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS vakt_events (
    id           BIGSERIAL PRIMARY KEY,
    event_type   TEXT NOT NULL DEFAULT 'sweep',
    swept_at     TIMESTAMPTZ NOT NULL,
    sources      INT,
    price_points INT,
    changes      INT,
    detail       JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await db`CREATE INDEX IF NOT EXISTS vakt_events_swept_idx ON vakt_events (swept_at DESC)`;
}

// Registrera ett svep (anropas av record-vakt-sweep.mjs efter en verklig price-monitor-körning).
export async function recordSweep(summary) {
  const db = getDb();
  if (!db || !summary || !summary.sweptAt) return null;
  try {
    await ensureTable(db);
    await db`
      INSERT INTO vakt_events (event_type, swept_at, sources, price_points, changes, detail)
      VALUES ('sweep', ${summary.sweptAt}, ${summary.sources ?? null}, ${summary.pricePoints ?? null},
              ${summary.changes ?? null}, ${summary.detail ? JSON.stringify(summary.detail) : null})
    `;
    return true;
  } catch (err) {
    console.error('[vakt] recordSweep:', err.message);
    return null;
  }
}

// Senaste svepet — driver radarns hjärtslag i rummet. null → rummet faller tillbaka på härledd text.
export async function getLatestSweep() {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      SELECT swept_at, sources, price_points, changes
      FROM vakt_events
      WHERE event_type = 'sweep'
      ORDER BY swept_at DESC
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return { sweptAt: r.swept_at, sources: r.sources, pricePoints: r.price_points, changes: r.changes };
  } catch {
    return null;                                           // tabell saknas ännu → tyst fallback (ingen brus-logg)
  }
}
