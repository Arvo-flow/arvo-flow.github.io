import { createHash } from 'node:crypto';
import { getDb } from './db.js';

function hashFp(fp) {
  return createHash('sha256').update(fp).digest('hex').slice(0, 32);
}

// Lagrar en TRIAGAD faktura (mottagen men medvetet INTE prissatt: utländsk valuta utan verifierat
// SEK-golv, ej stödd kategori, kreditnota, granskningsfall). Liggare 2 i kontoret ("Bevakat — inte
// prissatt") — disciplinmontern. NOLL siffror lagras (sifferrevisorns tystnad orörd): bara leverantör,
// kategori, rutt och ett källbelagt skäl + en väg framåt. Så ingen kundfaktura faller tyst (regel 9).
// ⚠️ RADERNA FÖLJER MED (2026-09-05, ur Dustin-fakturan). Mätt i produktion: den triagerade
// Dustin-raden hade `line_items_json = NULL`. Vi visste alltså att vi tystat fakturan, men inte
// VAD vi tystat — och en faktura vars rader aldrig lagrades går inte att rädda i efterhand när
// grinden lagas. Bokföringsplikten (14 aug) krävde att beslutet bokförs; det räcker inte om
// underlaget för beslutet kastas i samma andetag.
export async function storeTriaged({ fingerprint, pdfHash, supplier, category, route, reason, userEmail, invoiceNumber = null, lineItems = null }) {
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
    // Fakturanumret i en egen, fail-open UPDATE (samma mönster som lead_finding_json): kolumnen
    // kan saknas i en miljö och det får aldrig fälla bokföringen av triage-beslutet. En triagerad
    // faktura är dessutom precis den kunden vill kunna slå upp — vi säger ju att vi INTE prissatte
    // den, och då måste det gå att kontrollera vilken.
    // Raderna i en egen UPDATE med egen catch, samma mönster som fakturanumret: en saknad
    // kolumn får aldrig fälla bokföringen av själva triage-beslutet (UK-10).
    if (Array.isArray(lineItems) && lineItems.length > 0) {
      try {
        await db`UPDATE invoice_analyses SET line_items_json = ${JSON.stringify(lineItems)}::jsonb
                 WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash}`;
      } catch (err) {
        console.error('[invoice-store] storeTriaged line_items_json:', err.message);
      }
    }
    if (invoiceNumber) {
      try {
        await db`UPDATE invoice_analyses SET invoice_number = ${invoiceNumber}
                 WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash}`;
      } catch {
        // SJÄLVLÄK, samma mönster som triage_reason: en migrering som kräver att någon minns att
        // köra den är en migrering som förr eller senare inte körs. Lägg kolumnen och gör om.
        try {
          await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS invoice_number TEXT`;
          await db`UPDATE invoice_analyses SET invoice_number = ${invoiceNumber}
                   WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash}`;
        } catch (err2) { console.error('[invoice-store] invoice_number:', err2.message); }
      }
    }
    return true;
  } catch (err) {
    // Primär-INSERTen föll — troligen för att triage_reason-kolumnen inte är migrerad i denna miljö
    // (migrationen har betett sig opålitligt). SJÄLVLÄK: lägg kolumnen och försök igen MED skälet, så
    // "Bevakat — inte prissatt"-copyn alltid får sitt källbelagda skäl oavsett migrations-timing.
    try {
      await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS triage_reason TEXT`;
      const hashedFp = hashFp(fingerprint);
      await db`
        INSERT INTO invoice_analyses (
          fingerprint, pdf_hash, supplier, normalized_supplier, category, route, user_email, triage_reason, should_switch
        ) VALUES (
          ${hashedFp}, ${pdfHash}, ${supplier ?? ''}, ${supplier ?? null},
          ${category ?? 'uncategorized'}, ${route}, ${userEmail ?? null}, ${reason || route || null}, false
        )
        ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
          SET route = EXCLUDED.route, triage_reason = EXCLUDED.triage_reason,
              user_email = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email)`;
      console.warn('[invoice-store] storeTriaged: självläkte triage_reason-kolumnen och lagrade med skäl');
      return true;
    } catch (e2) {
      // Sista utväg: lagra raden utan skäl så fakturan ändå syns (inget tyst bortfall).
      try {
        const hashedFp = hashFp(fingerprint);
        await db`
          INSERT INTO invoice_analyses (fingerprint, pdf_hash, supplier, normalized_supplier, category, route, user_email, should_switch)
          VALUES (${hashedFp}, ${pdfHash}, ${supplier ?? ''}, ${supplier ?? null}, ${category ?? 'uncategorized'}, ${route}, ${userEmail ?? null}, false)
          ON CONFLICT (fingerprint, pdf_hash) DO UPDATE SET route = EXCLUDED.route`;
        return true;
      } catch (e3) { console.error('[invoice-store] storeTriaged failed:', e3.message); return null; }
    }
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
    // FAKTURANUMRET (2026-08-15): kundens egen identifierare, så att ekonomichefen kan slå upp
    // EXAKT rätt papper när vi säger att vi inte prissatte en faktura. Skrivs i en egen UPDATE med
    // samma fail-open-mönster som lead_finding_json — kolumnen kan saknas i en miljö och det får
    // aldrig fälla huvud-INSERTen. Numret är redan grindat i pipelinen (lib/fakturanummer.js):
    // når det hit har det både rätt form och bekräftats mot dokumentets textlager.
    if (id && extracted?.invoiceNumber) {
      try {
        await db`UPDATE invoice_analyses SET invoice_number = ${extracted.invoiceNumber} WHERE id = ${id}`;
      } catch {
        try {
          await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS invoice_number TEXT`;
          await db`UPDATE invoice_analyses SET invoice_number = ${extracted.invoiceNumber} WHERE id = ${id}`;
        } catch (err2) { console.error('[invoice-store] invoice_number:', err2.message); }
      }
    }
    // FAKTURARADERNA (2026-08-15): kundens egna rader, ordagrant, så att rummet kan svara på vad
    // årskostnaden faktiskt består av. Lagras bara när de finns; samma fail-open-mönster som
    // lead_finding_json — en saknad kolumn får aldrig fälla huvud-INSERTen.
    if (id && Array.isArray(extracted?.lineItems) && extracted.lineItems.length > 0) {
      try {
        await db`UPDATE invoice_analyses SET line_items_json = ${JSON.stringify(extracted.lineItems)}::jsonb WHERE id = ${id}`;
      } catch {
        try {
          await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS line_items_json JSONB`;
          await db`UPDATE invoice_analyses SET line_items_json = ${JSON.stringify(extracted.lineItems)}::jsonb WHERE id = ${id}`;
        } catch (err2) { console.error('[invoice-store] line_items_json:', err2.message); }
      }
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

// ── EN SAKNAD KOLUMN FÅR INTE BLI EN TYST KVALITETSNEDGRADERING (grundarfynd 2026-08-15) ─────
// Symptomet: varje leverantör i rummet visade Arvo Score 75. 75 är inte ett räknat tal — det är
// supplierDiagScore:s fallback när health_score saknas. Orsaken: `invoice_number` lades i den
// primära SELECT-satsen men fanns ännu inte i produktionsdatabasen (kolumnen självläkte bara vid
// SKRIVNING, och ingen ny faktura hade skrivits). Satsen kastade, läsvägen föll till reserven —
// och reserven hämtar varken health_score, lead_finding_json eller triage_reason.
//
// Reserven byggdes som ett skyddsnät för EN omigrerad kolumn. Den blev i stället en tyst
// nedgradering av hela rummet: score till fallback, fyndkortet borta, bevakade rader utan skäl.
// Och den ser identisk ut med "kunden har inga bra avtal" — den farligaste sortens fel.
//
// Regeln nu: en saknad kolumn LÄKS, den kringgås inte. Vi lägger till den och kör om den fulla
// satsen. Först om självläkningen också faller används reserven — och då SÄGS det högt, för då
// har vi tappat fält som rummets kvalitet hänger på.
const VALFRIA_KOLUMNER = [
  ['lead_finding_json', 'JSONB'], ['contract_end_date', 'DATE'], ['health_score', 'INTEGER'],
  ['triage_reason', 'TEXT'], ['contract_terms_json', 'JSONB'], ['invoice_number', 'TEXT'],
  ['line_items_json', 'JSONB'],
];

let _lakningForsokt = false;
async function lakSaknadeKolumner(db) {
  if (_lakningForsokt) return false;          // en gång per process — inte per läsning
  _lakningForsokt = true;
  let nagot = false;
  for (const [namn, typ] of VALFRIA_KOLUMNER) {
    try {
      await db.query(`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS ${namn} ${typ}`);
      nagot = true;
    } catch (err) {
      console.error(`[invoice-store] kunde inte läka ${namn}:`, err.message);
    }
  }
  if (nagot) console.log('[invoice-store] saknade kolumner läkta — kör om den fulla läsningen');
  return nagot;
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
        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
      FROM invoice_analyses
      WHERE fingerprint = ${hashedFp}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } catch (forsta) {
    // LÄK FÖRST. En saknad valfri kolumn är ett schemafel, inte ett skäl att visa kunden ett
    // sämre rum. Lyckas läkningen kör vi om den FULLA satsen och kunden märker ingenting.
    if (await lakSaknadeKolumner(db)) {
      try {
        return await db`
          SELECT
            id, supplier, normalized_supplier, category,
            annual_cost, suggested_annual_cost, gross_saving, net_saving,
            should_switch, route, industry, employees, billing_period, created_at,
            seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
          FROM invoice_analyses
          WHERE fingerprint = ${hashedFp}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
      } catch (efterLakning) {
        console.error('[invoice-store] full läsning föll även efter läkning:', efterLakning.message);
      }
    }
    // Reserven är sista utvägen och kostar rummet sin kvalitet — den får aldrig vara tyst.
    console.error('[invoice-store] DEGRADERAD LÄSNING (fingerprint): utan health_score, fynd och '
      + 'triage-skäl. Rummet visar fallback-score. Ursprungsfel:', forsta.message);
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
      // NOLL ÄR ETT PÅSTÅENDE, OKÄNT ÄR SANNINGEN (grundarfynd 2026-08-06).
      // Den här raden returnerade tidigare []. Är databasen nere öppnar kunden sitt rum och ser
      // ETT TOMT KONTOR — "ni har inga fakturor" — när sanningen är "vi kunde inte läsa".
      // I den yta kunden BETALAR för är det värre än i larmpipelinen: kunden drar slutsatsen att
      // hens underlag är borta. Vi kastar i stället; api/invoice-history svarar med fel och rummet
      // visar sitt ärliga felläge. Samma lås som getAffectedCustomers i lib/price-alert-store.js.
      console.error('[invoice-store] getAnalysesByFingerprint failed:', err.message);
      throw new Error(`Kunde inte läsa analyser via fingerprint (${err.message}) — tomt är inte ett svar här.`);
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
        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
      FROM invoice_analyses
      WHERE user_email = ${email.trim().toLowerCase()}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } catch (forsta) {
    // Samma läkning som fingerprint-vägen — och det är HÄR grundarens rum läses (mejl-intaget är
    // huvudvägen), så det var den här grenen som gjorde varje leverantör till 75.
    if (await lakSaknadeKolumner(db)) {
      try {
        return await db`
          SELECT
            id, supplier, normalized_supplier, category,
            annual_cost, suggested_annual_cost, gross_saving, net_saving,
            should_switch, route, industry, employees, billing_period, created_at,
            seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
          FROM invoice_analyses
          WHERE user_email = ${email.trim().toLowerCase()}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
      } catch (efterLakning) {
        console.error('[invoice-store] full läsning föll även efter läkning:', efterLakning.message);
      }
    }
    console.error('[invoice-store] DEGRADERAD LÄSNING (e-post): utan health_score, fynd och '
      + 'triage-skäl. Rummet visar fallback-score. Ursprungsfel:', forsta.message);
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
      // NOLL ÄR ETT PÅSTÅENDE, OKÄNT ÄR SANNINGEN (grundarfynd 2026-08-06).
      // Den här raden returnerade tidigare []. Är databasen nere öppnar kunden sitt rum och ser
      // ETT TOMT KONTOR — "ni har inga fakturor" — när sanningen är "vi kunde inte läsa".
      // I den yta kunden BETALAR för är det värre än i larmpipelinen: kunden drar slutsatsen att
      // hens underlag är borta. Vi kastar i stället; api/invoice-history svarar med fel och rummet
      // visar sitt ärliga felläge. Samma lås som getAffectedCustomers i lib/price-alert-store.js.
      console.error('[invoice-store] getAnalysesByEmail failed:', err.message);
      throw new Error(`Kunde inte läsa analyser via e-post (${err.message}) — tomt är inte ett svar här.`);
    }
  }
}
