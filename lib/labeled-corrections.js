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
 * operatorReasoning: den generaliserbara princip som motiverar korrektionen —
 * används som few-shot-exempel i kategorisatorn.
 */
export async function saveOperatorCorrection({
  analysisId,
  field,
  originalValue,
  correctedValue,
  reason,
  category,
  supplier,
  operatorReasoning = null,
}) {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      INSERT INTO labeled_corrections
        (analysis_id, field, original_value, corrected_value,
         reason, corrected_by, severity, category, supplier, operator_reasoning)
      VALUES
        (${analysisId ?? null}, ${field}, ${String(originalValue ?? '')},
         ${String(correctedValue ?? '')}, ${reason ?? 'operator_manual_review'}, 'operator',
         'fix', ${category ?? null}, ${supplier ?? null}, ${operatorReasoning ?? null})
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.warn('[labeled-corrections] saveOperatorCorrection failed:', err.message);
    return null;
  }
}

/**
 * Flaggar en okänd leverantör för proaktiv märkning (active learning).
 * Anropas fire-and-forget från pipeline när en leverantör inte matchar
 * något känt fingerprint — operatören kan märka den innan nästa faktura.
 */
export async function flagNewSupplier({ supplier, analysisId = null }) {
  if (!supplier) return null;
  return saveCorrection({
    analysisId,
    field:          'category',
    originalValue:  null,
    correctedValue: null,
    reason:         'new_unknown_supplier',
    correctedBy:    'system',
    severity:       'info',
    category:       null,
    supplier,
  });
}

/**
 * Returnerar leverantörer som flaggats som okända (active learning queue).
 * Exkluderar leverantörer som redan fått en operatörskorrektion.
 */
export async function getActiveLearningQueue({ limit = 50 } = {}) {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT
        lc.supplier,
        COUNT(*)::int          AS seen_count,
        MAX(lc.created_at)     AS last_seen,
        bool_or(op.id IS NOT NULL) AS has_correction
      FROM labeled_corrections lc
      LEFT JOIN labeled_corrections op
        ON  op.supplier       = lc.supplier
        AND op.corrected_by   = 'operator'
        AND op.field          = 'category'
        AND op.corrected_value IS NOT NULL
      WHERE lc.reason      = 'new_unknown_supplier'
        AND lc.created_at  > NOW() - INTERVAL '60 days'
      GROUP BY lc.supplier
      HAVING bool_or(op.id IS NOT NULL) = false
      ORDER BY last_seen DESC
      LIMIT ${limit}
    `;
  } catch (err) {
    console.warn('[labeled-corrections] getActiveLearningQueue failed:', err.message);
    return [];
  }
}

// In-memory cache for few-shot examples — refreshed every 5 minutes.
let _fewShotCache = { text: '', fetchedAt: 0 };
const FEW_SHOT_TTL = 5 * 60 * 1000;

/**
 * Bygger ett few-shot-block med operatörskorrektioner + resonemang.
 * Injiceras i kategorisatorn för att ge modellen kontextuella exempel
 * utan att ändra det cachade system-promptet.
 *
 * Returnerar tom sträng om inga korrektioner finns — alltid safe att anropa.
 */
export async function getFewShotExamples({ limit = 10 } = {}) {
  const now = Date.now();
  if (now - _fewShotCache.fetchedAt < FEW_SHOT_TTL && _fewShotCache.text) {
    return _fewShotCache.text;
  }
  const db = getDb();
  if (!db) return '';
  try {
    const rows = await db`
      SELECT field, original_value, corrected_value, supplier, operator_reasoning
      FROM labeled_corrections
      WHERE corrected_by   = 'operator'
        AND field          = 'category'
        AND corrected_value IS NOT NULL
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    if (!rows.length) {
      _fewShotCache = { text: '', fetchedAt: now };
      return '';
    }
    const lines = rows.map((r, i) => {
      const parts = [
        `[Operatörskorrektion ${i + 1}]`,
        `Leverantör: ${r.supplier || '(okänd)'}`,
        `AI klassificerade: ${r.original_value || '?'} → Rätt: ${r.corrected_value}`,
      ];
      if (r.operator_reasoning) parts.push(`Princip: ${r.operator_reasoning}`);
      return parts.join('\n');
    }).join('\n\n');
    const text = `---\nRELEVANTA OPERATÖRSKORREKTIONER (använd som vägledning):\n\n${lines}\n---`;
    _fewShotCache = { text, fetchedAt: now };
    return text;
  } catch (err) {
    console.warn('[labeled-corrections] getFewShotExamples failed:', err.message);
    return '';
  }
}
