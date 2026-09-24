// P3.2 — Outcome tracking
// Lagrar faktiska utfall (bytte kunden? Sparade de vad vi sa?) för att
// kalibrera benchmarks och mäta prediktionsnoggrannhet per kategori.

import { getDb } from './db.js';

// Tabellen skapas av migreringen (scripts/migrate*.mjs); modulen läser den bara.

// storeOutcome togs bort 2026-09-24 tillsammans med api/track-outcome: en ogrindad skrivväg som vem
// som helst kunde fylla med påhittade utfall. Utfall skrivs i dag bara av api/outcome-survey (kundens
// eget svar via en länk i mejlet) och läses bara av kalibreringsskripten nedan.

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
