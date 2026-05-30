// P3.2 — Outcome tracking
// Lagrar faktiska utfall (bytte kunden? Sparade de vad vi sa?) för att
// kalibrera benchmarks och mäta prediktionsnoggrannhet per kategori.

import { getDb } from './db.js';

const MIGRATE_SQL = `
  CREATE TABLE IF NOT EXISTS arvo_outcomes (
    id               SERIAL PRIMARY KEY,
    fingerprint      TEXT,
    supplier         TEXT NOT NULL,
    category         TEXT NOT NULL,
    predicted_net    INTEGER,
    actual_net       INTEGER,
    switched         BOOLEAN NOT NULL DEFAULT false,
    switched_at      DATE,
    reported_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes            TEXT,
    source           TEXT DEFAULT 'customer'
  );
  CREATE INDEX IF NOT EXISTS arvo_outcomes_cat_idx ON arvo_outcomes (category);
  CREATE INDEX IF NOT EXISTS arvo_outcomes_fp_idx  ON arvo_outcomes (fingerprint);
`;

async function ensureTable(db) {
  try {
    await db.unsafe(MIGRATE_SQL);
  } catch {
    // Tabellen finns redan eller db stöder inte unsafe — ignorera
  }
}

export async function storeOutcome({
  fingerprint,
  supplier,
  category,
  predictedNet,
  actualNet,
  switched,
  switchedAt,
  notes,
  source = 'customer',
}) {
  const db = getDb();
  if (!db) return;
  try {
    await ensureTable(db);
    await db`
      INSERT INTO arvo_outcomes
        (fingerprint, supplier, category, predicted_net, actual_net, switched, switched_at, notes, source)
      VALUES
        (${fingerprint ?? null},
         ${supplier ?? 'okänd'},
         ${category ?? 'uncategorized'},
         ${predictedNet ?? null},
         ${actualNet ?? null},
         ${switched ?? false},
         ${switchedAt ?? null},
         ${notes ?? null},
         ${source})
    `;
    console.log(`[outcome-store] stored: supplier=${supplier} switched=${switched} predicted=${predictedNet} actual=${actualNet}`);
  } catch (err) {
    console.error('[outcome-store] storeOutcome error:', err.message);
  }
}

// Hämtar kalibrerings-aggregat per kategori för inlärningsloopen (P3.3).
export async function getCalibrationData() {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT
        category,
        COUNT(*)                                                  AS outcomes,
        AVG(actual_net::float / NULLIF(predicted_net, 0))        AS avg_ratio,
        STDDEV(actual_net::float / NULLIF(predicted_net, 0))     AS stddev_ratio,
        AVG(actual_net)                                           AS avg_actual,
        AVG(predicted_net)                                        AS avg_predicted
      FROM arvo_outcomes
      WHERE switched = true
        AND actual_net IS NOT NULL
        AND predicted_net IS NOT NULL
        AND predicted_net > 0
      GROUP BY category
      HAVING COUNT(*) >= 3
      ORDER BY outcomes DESC
    `;
  } catch (err) {
    console.error('[outcome-store] getCalibrationData error:', err.message);
    return [];
  }
}
