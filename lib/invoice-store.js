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
}) {
  const db = getDb();
  if (!db || !fingerprint || !pdfHash) return;
  const hashedFp = hashFp(fingerprint);
  try {
    await db`
      INSERT INTO invoice_analyses (
        fingerprint, pdf_hash, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period
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
        ${extracted?.billingPeriod ?? null}
      )
      ON CONFLICT (fingerprint, pdf_hash) DO NOTHING
    `;
  } catch (err) {
    console.error('[invoice-store] storeAnalysis failed:', err.message);
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
