// Proaktiva kundalertar vid prisändring
// Kopplar samman price-monitor-alerts med kunder som har aktiva analyser
// hos berörd leverantör. Innehåller även idempotens- och segment-stats-funktioner
// för den fullständiga Arvo Intelligence-pipelinen.

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

    // Steg 3: Hämta analyser som matchar leverantör + (valfritt) kategori.
    // Inkluderar seat_count för per-säte-beräkning i notify-price-changes.mjs.
    const analyses = category
      ? await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, seat_count, created_at
          FROM invoice_analyses
          WHERE normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
            AND category = ${category}
            AND route = 'auto'
            AND fingerprint = ANY(${hashedFps})
          ORDER BY created_at DESC
        `
      : await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, seat_count, created_at
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
            supplier:    analysis.normalized_supplier,
            category:    analysis.category,
            annualCost:  analysis.annual_cost,
            grossSaving: analysis.gross_saving,
            netSaving:   analysis.net_saving,
            seatCount:   analysis.seat_count ?? null,
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

// Returnerar segmentstatistik för "X av Y bolag i er bransch" — kärnsignalen
// i Arvo Intelligence-mailen som ingen konkurrent kan replikera utan nätverksdata.
//
// total         — antal unika e-poster med analyser i denna kategori
// withSupplier  — antal av dessa som har analyser hos denna specifika leverantör
//
// Formulering: "Arvo har noterat att X av Y bolag med liknande profil
// betalar mer än marknadssnittet för [kategori]."
export async function getSegmentStats({ category, supplierKeyword }) {
  const db = getDb();
  if (!db) return { total: 0, withSupplier: 0 };

  try {
    const [totalRow, supplierRow] = await Promise.all([
      db`
        SELECT COUNT(DISTINCT user_email) AS n
        FROM invoice_analyses
        WHERE category   = ${category}
          AND route       = 'auto'
          AND user_email IS NOT NULL
      `,
      db`
        SELECT COUNT(DISTINCT user_email) AS n
        FROM invoice_analyses
        WHERE category          = ${category}
          AND route              = 'auto'
          AND user_email        IS NOT NULL
          AND normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
      `,
    ]);

    return {
      total:        Number(totalRow[0]?.n  ?? 0),
      withSupplier: Number(supplierRow[0]?.n ?? 0),
    };
  } catch (err) {
    console.error('[price-alert-store] getSegmentStats error:', err.message);
    return { total: 0, withSupplier: 0 };
  }
}

// Returnerar true om ett alert redan skickats för denna pris-monitor-körning,
// leverantör och kategori — förhindrar dubblett-notifieringar vid retry eller
// manuell om-körning av price-monitor-workflödet.
export async function hasAlertBeenSent({ monitorRunId, supplier, category }) {
  const db = getDb();
  if (!db) return false;

  try {
    const rows = await db`
      SELECT id FROM price_alerts_sent
      WHERE monitor_run_id = ${monitorRunId}
        AND supplier       = ${supplier}
        AND category       = ${category}
      LIMIT 1
    `;
    return rows.length > 0;
  } catch (err) {
    console.error('[price-alert-store] hasAlertBeenSent error:', err.message);
    return false;
  }
}

// Sparar att ett alert skickats — anropas efter Resend-sändning lyckats.
// ON CONFLICT DO NOTHING säkerställer idempotens även vid race condition.
export async function markAlertSent({ monitorRunId, supplier, category, emailsSent, totalImpactKr, haikuAnalysis }) {
  const db = getDb();
  if (!db) return;

  try {
    await db`
      INSERT INTO price_alerts_sent
        (monitor_run_id, supplier, category, emails_sent, total_impact_kr, haiku_analysis)
      VALUES
        (${monitorRunId}, ${supplier}, ${category},
         ${emailsSent ?? 0}, ${totalImpactKr ?? null},
         ${haikuAnalysis ? JSON.stringify(haikuAnalysis) : null}::jsonb)
      ON CONFLICT (monitor_run_id, supplier, category) DO NOTHING
    `;
  } catch (err) {
    console.error('[price-alert-store] markAlertSent error:', err.message);
  }
}
