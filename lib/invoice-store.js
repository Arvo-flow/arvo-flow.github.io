import { createHash } from 'node:crypto';
import { getDb } from './db.js';

function hashFp(fp) {
  return createHash('sha256').update(fp).digest('hex').slice(0, 32);
}

export async function storeAnalysis({
  fingerprint,
  pdfHash,
  extracted,
  categorized,
  recommendation,
  route,
  industry,
  employees,
  userEmail,
}) {
  const db = getDb();
  if (!db || !fingerprint || !pdfHash) return null;
  const hashedFp = hashFp(fingerprint);
  try {
    const rows = await db`
      INSERT INTO invoice_analyses (
        fingerprint, pdf_hash, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period, user_email
      ) VALUES (
        ${hashedFp},
        ${pdfHash},
        ${extracted?.supplier ?? ''},
        ${categorized?.normalizedSupplier ?? null},
        ${categorized?.category ?? 'uncategorized'},
        ${extracted?.annualCost ?? null},
        ${recommendation?.suggestedAnnualCost ?? null},
        ${recommendation?.grossSaving ?? null},
        ${recommendation?.netSaving ?? null},
        ${recommendation?.shouldSwitch ?? false},
        ${route},
        ${industry},
        ${employees},
        ${extracted?.billingPeriod ?? null},
        ${userEmail ?? null}
      )
      ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
        SET user_email = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email)
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.error('[invoice-store] storeAnalysis failed:', err.message);
    return null;
  }
}

export async function getAnalysesByFingerprint(fingerprint, { limit = 30 } = {}) {
  const db = getDb();
  if (!db) return [];
  const hashedFp = hashFp(fingerprint);
  try {
    return await db`
      SELECT
        id, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period, created_at
      FROM invoice_analyses
      WHERE fingerprint = ${hashedFp}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } catch (err) {
    console.error('[invoice-store] getAnalysesByFingerprint failed:', err.message);
    return [];
  }
}
