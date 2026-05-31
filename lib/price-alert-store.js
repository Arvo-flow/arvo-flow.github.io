// P4.1 — Proaktiva kundalertar vid prisändring
// Kopplar samman price-monitor-alerts med kunder som har aktiva analyser
// hos berörd leverantör, via invoice_analyses JOIN gate_emails.

import { createHash } from 'node:crypto';
import { getDb } from './db.js';

function hashFp(fp) {
  return createHash('sha256').update(fp).digest('hex').slice(0, 32);
}

// Returnerar alla kunder (unika e-postadresser) som har analyserat en faktura
// från en given leverantör och har en känd e-postadress i gate_emails.
//
// Deduplicerar på e-post — en kund får bara en rad per anrop oavsett hur
// många fakturor de har laddat upp från samma leverantör.
//
// supplierKeyword  — delsträngsökning mot normalized_supplier (ILIKE)
// category         — om angiven: filtrerar även på exakt kategori
//
// Returnerar [{ email, supplier, category, annualCost, grossSaving, netSaving, analyzedAt }]
export async function getAffectedCustomers({ supplierKeyword, category }) {
  const db = getDb();
  if (!db) return [];

  try {
    // Steg 1: Hämta alla e-post ↔ rå-fingerprint-kopplingar
    const emailRows = await db`
      SELECT email, fingerprint FROM gate_emails WHERE fingerprint IS NOT NULL
    `;
    if (!emailRows.length) return [];

    // Steg 2: Bygg hashat-fingerprint → [email] map (invoice_analyses lagrar hashed fp)
    const fpToEmails = new Map();
    for (const row of emailRows) {
      const hashed = hashFp(row.fingerprint);
      if (!fpToEmails.has(hashed)) fpToEmails.set(hashed, []);
      fpToEmails.get(hashed).push(row.email);
    }
    const hashedFps = [...fpToEmails.keys()];

    // Steg 3: Hämta analyser som matchar leverantör + (valfritt) kategori
    const analyses = category
      ? await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, created_at
          FROM invoice_analyses
          WHERE normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
            AND category = ${category}
            AND route = 'auto'
            AND fingerprint = ANY(${hashedFps})
          ORDER BY created_at DESC
        `
      : await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, created_at
          FROM invoice_analyses
          WHERE normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
            AND route = 'auto'
            AND fingerprint = ANY(${hashedFps})
          ORDER BY created_at DESC
        `;

    // Steg 4: Koppla e-post till analyser, deduplicera på e-post
    const result = [];
    const seenEmails = new Set();

    for (const analysis of analyses) {
      const emails = fpToEmails.get(analysis.fingerprint) ?? [];
      for (const email of emails) {
        if (!seenEmails.has(email)) {
          seenEmails.add(email);
          result.push({
            email,
            supplier:   analysis.normalized_supplier,
            category:   analysis.category,
            annualCost: analysis.annual_cost,
            grossSaving: analysis.gross_saving,
            netSaving:   analysis.net_saving,
            analyzedAt:  analysis.created_at,
          });
        }
      }
    }

    return result;
  } catch (err) {
    console.error('[price-alert-store] getAffectedCustomers error:', err.message);
    return [];
  }
}
