// lib/labeled-corrections.js
// Fas 1 i flywheel-arkitekturen: sparar varje korrektion (automatisk eller
// manuell) som labeled data i Postgres.
//
// Över tid: systemet analyserar mönster i korrektionerna och deriverar
// automatiskt regler — istället för att vi skriver dem manuellt.
//
// Alla funktioner fail-open: DB-fel loggas men blockerar aldrig pipeline.

import { getDb } from './db.js';

/**
 * Sparar en korrektion till labeled_corrections-tabellen.
 * correctedBy: 'system' (automatisk override) | 'operator' (manuell granskning)
 */
export async function saveCorrection({
  analysisId = null,
  field,
  originalValue,
  correctedValue,
  reason,
  correctedBy = 'system',
  severity = 'fix',
  category = null,
  supplier = null,
}) {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      INSERT INTO labeled_corrections
        (analysis_id, field, original_value, corrected_value,
         reason, corrected_by, severity, category, supplier)
      VALUES
        (${analysisId}, ${field}, ${String(originalValue ?? '')},
         ${String(correctedValue ?? '')}, ${reason}, ${correctedBy},
         ${severity}, ${category}, ${supplier})
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.warn('[labeled-corrections] saveCorrection failed:', err.message);
    return null;
  }
}

/**
 * Sparar en batch av overrides från extraction-integrity i ett svep.
 */
export async function saveIntegrityOverrides(overrides, { analysisId, category, supplier } = {}) {
  if (!overrides?.length) return;
  await Promise.all(
    overrides.map(o =>
      saveCorrection({
        analysisId,
        field:          o.field,
        originalValue:  o.original,
        correctedValue: o.corrected,
        reason:         o.reason,
        correctedBy:    'system',
        severity:       o.severity ?? 'fix',
        category,
        supplier,
      }),
    ),
  );
}

/**
 * Hämtar korrektioner för admin-granskning och mönsteranalys.
 */
export async function getCorrections({ limit = 100, category = null, field = null, correctedBy = null } = {}) {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT
        lc.*,
        ia.supplier AS invoice_supplier,
        ia.route,
        ia.created_at AS invoice_created_at
      FROM labeled_corrections lc
      LEFT JOIN invoice_analyses ia ON ia.id = lc.analysis_id
      WHERE (${category} IS NULL OR lc.category = ${category})
        AND (${field}    IS NULL OR lc.field    = ${field})
        AND (${correctedBy} IS NULL OR lc.corrected_by = ${correctedBy})
      ORDER BY lc.created_at DESC
      LIMIT ${limit}
    `;
  } catch (err) {
    console.warn('[labeled-corrections] getCorrections failed:', err.message);
    return [];
  }
}

/**
 * Aggregerade mönster: vilka fält/reasons förekommer mest?
 * Används för att automatiskt derivera nya regler.
 */
export async function getPatterns() {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT
        field,
        reason,
        corrected_by,
        severity,
        COUNT(*)::int AS count,
        MIN(created_at) AS first_seen,
        MAX(created_at) AS last_seen
      FROM labeled_corrections
      GROUP BY field, reason, corrected_by, severity
      ORDER BY count DESC
      LIMIT 200
    `;
  } catch (err) {
    console.warn('[labeled-corrections] getPatterns failed:', err.message);
    return [];
  }
}

/**
 * Manuell operatörskorrektion — sparas med correctedBy: 'operator'.
 * Dessa har högst vikt i träningsdatan eftersom de är verifierade av människa.
 */
export async function saveOperatorCorrection({
  analysisId,
  field,
  originalValue,
  correctedValue,
  reason,
  category,
  supplier,
}) {
  return saveCorrection({
    analysisId,
    field,
    originalValue,
    correctedValue,
    reason: reason ?? 'operator_manual_review',
    correctedBy: 'operator',
    severity: 'fix',
    category,
    supplier,
  });
}
