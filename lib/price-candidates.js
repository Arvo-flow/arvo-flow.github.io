// lib/price-candidates.js — kandidat-persistens för verifieringsjuryns STABILITETS-grind (gStability).
//
// En äkta listprisändring BESTÅR; en glitch/kampanj/lastbalanserar-variant gör inte det. Därför får
// en upptäckt ändring kallas "verifierad" först när SAMMA nya siffra setts över ≥2 oberoende körningar.
// Den här modulen minns varje upptäckt mellan nätter: första gången → provisorisk (väntar), andra
// gången med samma siffra → tidsstabil (priorSeen=true → juryn kan släppa fram den).
//
// Endast PROVISORISKA kandidater bor här. När en kandidat blir 'verified' graderas den till
// supplier_price_history (ändringsloggen) — så allt rörelse/prognos läser är verifierat per konstruktion.

import { getDb } from './db.js';

// Ren: är två priser "samma" inom öres-tolerans (≤1 kr eller ≤1 %)? (testbar utan DB)
export function samePrice(a, b) {
  if (!(a > 0) || !(b > 0)) return false;
  return Math.abs(a - b) <= Math.max(1, Math.max(a, b) * 0.01);
}

async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS price_change_candidates (
    id           BIGSERIAL PRIMARY KEY,
    supplier     TEXT NOT NULL,
    category     TEXT NOT NULL,
    check_name   TEXT NOT NULL,
    new_numeric  NUMERIC,
    old_numeric  NUMERIC,
    seen_count   INT NOT NULL DEFAULT 1,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    graduated    BOOLEAN NOT NULL DEFAULT false,
    UNIQUE (supplier, category, check_name)
  )`;
}

/**
 * Registrera att en kandidat-ändring setts den här körningen. Returnerar { priorSeen, seenCount }.
 *   priorSeen = SAMMA nya siffra har setts i en TIDIGARE körning (→ tidsstabil, gStability).
 * Ny/annan siffra för samma check → räknaren nollställs (det är en ny kandidat).
 */
export async function recordCandidate({ supplier, category, check, newNumeric, oldNumeric }) {
  const db = getDb();
  if (!db || !supplier || !category || !check || !(newNumeric > 0)) return { priorSeen: false, seenCount: 0 };
  try {
    await ensureTable(db);
    const [existing] = await db`
      SELECT new_numeric, seen_count FROM price_change_candidates
      WHERE supplier = ${supplier} AND category = ${category} AND check_name = ${check}
      LIMIT 1
    `;
    if (existing && samePrice(Number(existing.new_numeric), newNumeric)) {
      const seenCount = Number(existing.seen_count) + 1;
      await db`
        UPDATE price_change_candidates
        SET seen_count = ${seenCount}, last_seen_at = NOW(), old_numeric = ${oldNumeric ?? null}
        WHERE supplier = ${supplier} AND category = ${category} AND check_name = ${check}
      `;
      return { priorSeen: true, seenCount };               // samma siffra igen → tidsstabil
    }
    // Ny eller ändrad kandidat-siffra → (åter)starta räknaren.
    await db`
      INSERT INTO price_change_candidates (supplier, category, check_name, new_numeric, old_numeric, seen_count, first_seen_at, last_seen_at, graduated)
      VALUES (${supplier}, ${category}, ${check}, ${newNumeric}, ${oldNumeric ?? null}, 1, NOW(), NOW(), false)
      ON CONFLICT (supplier, category, check_name)
      DO UPDATE SET new_numeric = ${newNumeric}, old_numeric = ${oldNumeric ?? null},
                    seen_count = 1, first_seen_at = NOW(), last_seen_at = NOW(), graduated = false
    `;
    return { priorSeen: false, seenCount: 1 };             // första gången → provisorisk
  } catch (err) {
    console.error('[price-candidates] recordCandidate:', err.message);
    return { priorSeen: false, seenCount: 0 };
  }
}

// Markera en kandidat som graderad (blev 'verified' och skrevs till ändringsloggen).
export async function markGraduated({ supplier, category, check }) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      UPDATE price_change_candidates SET graduated = true, last_seen_at = NOW()
      WHERE supplier = ${supplier} AND category = ${category} AND check_name = ${check}
    `;
  } catch (err) {
    console.error('[price-candidates] markGraduated:', err.message);
  }
}
