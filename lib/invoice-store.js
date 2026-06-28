import { createHash } from 'node:crypto';
import { getDb } from './db.js';

function hashFp(fp) {
  return createHash('sha256').update(fp).digest('hex').slice(0, 32);
}

// Lagrar en TRIAGAD faktura (mottagen men medvetet INTE prissatt: utländsk valuta utan verifierat
// SEK-golv, ej stödd kategori, kreditnota, granskningsfall). Liggare 2 i kontoret ("Bevakat — inte
// prissatt") — disciplinmontern. NOLL siffror lagras (sifferrevisorns tystnad orörd): bara leverantör,
// kategori, rutt och ett källbelagt skäl + en väg framåt. Så ingen kundfaktura faller tyst (regel 9).
export async function storeTriaged({ fingerprint, pdfHash, supplier, category, route, reason, userEmail }) {
  const db = getDb();
  if (!db || !fingerprint || !pdfHash) return null;
  try {
    const hashedFp = hashFp(fingerprint);
    await db`
      INSERT INTO invoice_analyses (
        fingerprint, pdf_hash, supplier, normalized_supplier, category,
        route, user_email, triage_reason, should_switch
      ) VALUES (
        ${hashedFp}, ${pdfHash}, ${supplier ?? ''}, ${supplier ?? null},
        ${category ?? 'uncategorized'}, ${route}, ${userEmail ?? null}, ${reason || route || null}, false
      )
      ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
        SET route = EXCLUDED.route, triage_reason = EXCLUDED.triage_reason,
            user_email = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email)
    `;
    return true;
  } catch (err) {
    // Kolumnen triage_reason kanske ej migrerad än → fall tillbaka utan skäl (men lagra raden).
    try {
      const hashedFp = hashFp(fingerprint);
      await db`
        INSERT INTO invoice_analyses (fingerprint, pdf_hash, supplier, normalized_supplier, category, route, user_email, should_switch)
        VALUES (${hashedFp}, ${pdfHash}, ${supplier ?? ''}, ${supplier ?? null}, ${category ?? 'uncategorized'}, ${route}, ${userEmail ?? null}, false)
        ON CONFLICT (fingerprint, pdf_hash) DO UPDATE SET route = EXCLUDED.route`;
      return true;
    } catch (e2) { console.error('[invoice-store] storeTriaged failed:', e2.message); return null; }
  }
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
  seatCount,
}) {
  const db = getDb();
  if (!db || !fingerprint || !pdfHash) return null;
  const hashedFp = hashFp(fingerprint);

  const seats = (typeof seatCount === 'number' && seatCount > 0) ? seatCount : null;
  const pricePerSeatMonthly = seats && extracted?.annualCost > 0
    ? Math.round(extracted.annualCost / seats / 12)
    : null;

  try {
    const rows = await db`
      INSERT INTO invoice_analyses (
        fingerprint, pdf_hash, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period, user_email,
        seat_count, price_per_seat_monthly
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
        ${userEmail ?? null},
        ${seats},
        ${pricePerSeatMonthly}
      )
      ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
        SET user_email            = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email),
            seat_count            = COALESCE(EXCLUDED.seat_count, invoice_analyses.seat_count),
            price_per_seat_monthly = COALESCE(EXCLUDED.price_per_seat_monthly, invoice_analyses.price_per_seat_monthly)
      RETURNING id
    `;
    const id = rows[0]?.id ?? null;
    // Forensik-fyndet persisteras SEPARAT (egen try/catch) så huvud-INSERTen aldrig påverkas
    // av om kolumnen är migrerad än. Aktiveras när lead_finding_json finns; ofarligt innan.
    if (id && recommendation?.leadFinding) {
      try {
        await db`UPDATE invoice_analyses SET lead_finding_json = ${JSON.stringify(recommendation.leadFinding)}::jsonb WHERE id = ${id}`;
      } catch { /* kolumn ej migrerad än → forensik i rummet aktiveras efter migrering */ }
    }
    // Arvo Score-underlag (bug #2-fix): deterministiskt hälsotal ur prisläget. Separat UPDATE så
    // huvud-INSERTen aldrig bryts av om kolumnen är migrerad än (samma mönster som lead_finding_json).
    if (id && recommendation?.healthScore != null) {
      try {
        await db`UPDATE invoice_analyses SET health_score = ${Math.round(recommendation.healthScore)} WHERE id = ${id}`;
      } catch { /* kolumn ej migrerad än → kontorets förtjänade score aktiveras efter migrering */ }
    }
    // Bindningsslut ur kundens egen faktura → kontraktsklockan i rummet (Maktkalendern).
    // Lagras rått (datum), klockan beräknas fresiderande vid läsning så "dagar kvar" aldrig blir
    // inaktuell. servicePeriodEnd sätts av extract.js bara vid uttalad bindningstid (Zero Trust).
    if (id && extracted?.servicePeriodEnd) {
      try {
        await db`UPDATE invoice_analyses SET contract_end_date = ${extracted.servicePeriodEnd}::date WHERE id = ${id} AND contract_end_date IS NULL`;
      } catch { /* kolumn ej migrerad än → klockan i rummet aktiveras efter migrering */ }
    }
    return id;
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
        should_switch, route, industry, employees, billing_period, created_at,
        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason
      FROM invoice_analyses
      WHERE fingerprint = ${hashedFp}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } catch {
    // lead_finding_json kanske inte migrerad än → fall tillbaka utan forensik (graceful).
    try {
      return await db`
        SELECT
          id, supplier, normalized_supplier, category,
          annual_cost, suggested_annual_cost, gross_saving, net_saving,
          should_switch, route, industry, employees, billing_period, created_at,
          seat_count, price_per_seat_monthly
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
}

/**
 * E-postnycklad historik — kontorets dörr för mail-in-kunder.
 * Anropas ALDRIG direkt med ett email-värde från klienten: e-posten ska
 * komma ur en validerad magic token (se api/invoice-history.mjs).
 */
export async function getAnalysesByEmail(email, { limit = 30 } = {}) {
  const db = getDb();
  if (!db || !email) return [];
  try {
    return await db`
      SELECT
        id, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period, created_at,
        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason
      FROM invoice_analyses
      WHERE user_email = ${email.trim().toLowerCase()}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } catch {
    try {
      return await db`
        SELECT
          id, supplier, normalized_supplier, category,
          annual_cost, suggested_annual_cost, gross_saving, net_saving,
          should_switch, route, industry, employees, billing_period, created_at,
          seat_count, price_per_seat_monthly
        FROM invoice_analyses
        WHERE user_email = ${email.trim().toLowerCase()}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    } catch (err) {
      console.error('[invoice-store] getAnalysesByEmail failed:', err.message);
      return [];
    }
  }
}
