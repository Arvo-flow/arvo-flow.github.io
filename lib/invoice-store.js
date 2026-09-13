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
/**
 * Sparar det fynd som FAKTISKT visades för kunden.
 *
 * ⚠️ VARFÖR DEN HÄR FUNKTIONEN INTE BOR I `storeTriaged` (2026-09-07).
 * Mätt i produktion: en triagerad faktura fick sina rader lagrade men `lead_finding_json` förblev
 * NULL. Fyndet nådde alltså kundens KORT men aldrig kundens RUM (api/invoice-history läser
 * kolumnen). Utgångsförlusten ett lager ned — samma familj, ny yta.
 *
 * Den uppenbara fixen — låt `storeTriaged` skriva fyndet — hade varit FEL, och sämre än hålet.
 * `storeTriaged` anropas FÖRE `svara()` och vet inte om `farVisaFynd` släppte fyndet igenom. Ett
 * ovillkorligt skrivande hade återuppväckt precis de fynd vi medvetet tystat (kreditnotan,
 * price_anomaly, konfidens under tröskeln) — i rummet, den enda ytan där ingen ser att de tystats.
 *
 * Skrivningen bor därför hos BESLUTET: `svara()` sparar det `lead` den själv returnerar, och
 * cacheträffen sparar det `leadFinding` den serverar (redan filtrerat av körningen som skapade
 * det). Samma sanning på båda ställena, aldrig en andra bedömning.
 *
 * FÅNGAR: att ett visat fynd saknas i rummet.
 * BLIND: den RENSAR aldrig. Ett tidigare lagrat fynd som i dag skulle tystas ligger kvar —
 *   medvetet, eftersom en radering är oåterkallelig och `refineFinding` redan räknar om lagrade
 *   fynd mot dagens detektortabell vid LÄSNING (lib/forensics.js). Rensningen är ett eget beslut.
 */
export async function storeLeadFinding({ fingerprint, pdfHash, leadFinding }) {
  const db = getDb();
  if (!db || !fingerprint || !pdfHash) return null;
  // Inget fynd → skriv INGENTING. Att skriva null hade kunnat radera ett fynd en annan väg lagt.
  if (!leadFinding || typeof leadFinding !== 'object' || !leadFinding.type) return null;
  const hashedFp = hashFp(fingerprint);
  try {
    await db`UPDATE invoice_analyses SET lead_finding_json = ${JSON.stringify(leadFinding)}::jsonb
             WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash}`;
  } catch (err) {
    // Samma mönster som raderna: en saknad kolumn får aldrig fälla svaret till kunden (UK-21c).
    console.error('[invoice-store] storeLeadFinding:', err.message);
  }
  return true;
}

// ══ SYSKONFALLET, SPEGELVÄNT (2026-09-09) ═══════════════════════════════════════════════════
// När storeAnalysis fixades («den nyaste körningen äger hela sin dom») körde jag grannfallet, och
// det bar samma fel åt andra hållet: satsen skrev över route och triage_reason men LÄMNADE
// besparingarna från en tidigare LYCKAD körning. En faktura som prissattes under en äldre
// pipeline och sedan triageras — vilket dagens hårdare grindar gör VANLIGARE, inte ovanligare —
// hade då stått i rummet som «vi kunde inte prissätta den» med ett grossSaving kvar i raden.
// Rummets besparingssumma hade räknat in en faktura vi samtidigt säger oss inte kunna bedöma,
// och det är den farliga riktningen under 20 % success fee.
//
// Domen nollas därför uttryckligen. `should_switch` sätts till false och inte NULL: kolumnen är
// boolean och INSERT-grenen skriver redan `false` — ett NULL hade varit ett tredje tillstånd som
// ingen läsare känner till.
export async function storeTriaged({ fingerprint, pdfHash, supplier, category, route, reason, userEmail, invoiceNumber = null, lineItems = null, db: dbIn = null }) {
  const db = dbIn ?? getDb();
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
            suggested_annual_cost = NULL, gross_saving = NULL, net_saving = NULL,
            should_switch = false,
            user_email = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email)
    `;
    await vackArkiverad(db, hashedFp, pdfHash);   // ett triagerat dokument som kommer tillbaka är också levande
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
          ON CONFLICT (fingerprint, pdf_hash) DO UPDATE SET route = EXCLUDED.route`;   // sista utvägen: utan kolumnen finns inget arkiv att väcka
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
  db: dbIn = null,        // injicerbar för sviten (samma mönster som PgStore) — prod skickar aldrig
}) {
  const db = dbIn ?? getDb();
  if (!db || !fingerprint || !pdfHash) return null;
  const hashedFp = hashFp(fingerprint);

  const seats = (typeof seatCount === 'number' && seatCount > 0) ? seatCount : null;
  const pricePerSeatMonthly = seats && extracted?.annualCost > 0
    ? Math.round(extracted.annualCost / seats / 12)
    : null;

  // ══ EN RAD ÄR EN ANALYS — ALDRIG HALVA TVÅ (2026-09-09, ur grundarens 25 fakturor) ═════════
  // ON CONFLICT-satsen nedan uppdaterade TRE kolumner: user_email, seat_count och
  // price_per_seat_monthly. Varken `route`, besparingarna, `should_switch` eller kategorin stod
  // med, och ingen senare UPDATE rörde dem. En faktura som en gång skrevs av `storeTriaged` med
  // `route: 'review_queue'` kunde därför ALDRIG läka: analyseras samma dokument om med en lagad
  // pipeline behöll raden sin tystnad, sitt gamla triage-skäl och sitt tomma besparingsfält — och
  // fick ett NYTT per-licenspris bredvid. Halva den ena domen och halva den andra, i samma rad.
  //
  // Asymmetrin var avslöjaren: `storeTriaged` skriver över route och triage_reason villkorslöst.
  // TYSTNADEN fick alltså skriva över domen, men domen aldrig över tystnaden.
  // Det var fail-closed på fel axel.  // pastaende-ok: beskriver det GAMLA beteendet (före
  // 2026-09-09), aldrig kodens nuvarande — det nuvarande bevisas av RR-01 och RR-09.
  // En faktura vi en gång inte kunde prissätta förblev oprissatt hur mycket bättre vi än blev,
  // och grundarens 21 bevakade rader kunde inte läka av någon fix.
  //
  // Cachen dolde det: före `pdf:result:v27` svarade en andra uppladdning ur KV utan att skriva
  // alls, så konflikten uppstod aldrig. Bumpen är det som exponerade den här satsen.
  //
  // REGELN: den nyaste körningen äger HELA sin dom, inklusive sina tystnader. COALESCE vore
  // aktivt farligt — en körning som inte längre finner någon besparing skulle ärva den förras,
  // och vi hade burit ett besparingsanspråk ingen körning står bakom, under 20 % success fee.
  // `user_email` är undantaget och det enda: den är IDENTITET, inte analys, och ackumuleras över
  // körningar (en anonym omanalys får aldrig radera en känd adress).
  //
  // GRÄNSEN GÅR VID PENNINGPÅSTÅENDET, inte vid «dom kontra observation». Besparingen räknas ur
  // annual_cost, suggested_annual_cost, category, seat_count och billing_period — kommer ett av
  // dem från en annan körning än de övriga är påståendet inkoherent, och därför måste de röra sig
  // TILLSAMMANS. `supplier` och `normalized_supplier` går inte in i den aritmetiken; de är
  // ETIKETTER på ett dokument som inte ändras. Att låta dem följa domen hade dessutom infört en
  // ny bugg: INSERT-grenen skriver `extracted?.supplier ?? ''`, så en körning som misslyckas läsa
  // leverantören hade RADERAT ett gott namn ur rummet. De bevaras därför på tomhet (RR-10).
  //
  // Samma gräns, samma skäl: invoice_number, line_items_json och contract_end_date är avläsningar
  // av dokumentet. En bättre läsare kan bara lägga till, en sämre får inte radera (RR-07).
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
        SET route                  = EXCLUDED.route,
            triage_reason          = NULL,
            supplier               = COALESCE(NULLIF(EXCLUDED.supplier, ''), invoice_analyses.supplier),
            normalized_supplier    = COALESCE(EXCLUDED.normalized_supplier, invoice_analyses.normalized_supplier),
            category               = EXCLUDED.category,
            annual_cost            = EXCLUDED.annual_cost,
            suggested_annual_cost  = EXCLUDED.suggested_annual_cost,
            gross_saving           = EXCLUDED.gross_saving,
            net_saving             = EXCLUDED.net_saving,
            should_switch          = EXCLUDED.should_switch,
            industry               = EXCLUDED.industry,
            employees              = EXCLUDED.employees,
            billing_period         = EXCLUDED.billing_period,
            seat_count             = EXCLUDED.seat_count,
            price_per_seat_monthly = EXCLUDED.price_per_seat_monthly,
            user_email             = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email)
      RETURNING id
    `;
    const id = rows[0]?.id ?? null;
    // En ny analys av ett ARKIVERAT dokument väcker raden (2026-09-11). Egen sats, egen catch:
    // huvudinserten får aldrig bero på en kolumn som kanske inte migrerats än.
    await vackArkiverad(db, hashedFp, pdfHash);
    // Forensik-fyndet persisteras SEPARAT (egen try/catch) så huvud-INSERTen aldrig påverkas
    // av om kolumnen är migrerad än. Aktiveras när lead_finding_json finns; ofarligt innan.
    // SKRIVS ALLTID, även som NULL. Villkoret `if (leadFinding)` tillhörde samma familj som
    // trekolumnsuppdateringen ovan: en körning UTAN fynd lämnade föregående körnings fyndkort
    // kvar, och rummet hade visat ett fynd bredvid en dom som inte längre bär det. Den nyaste
    // körningens tystnad är ett svar och ska skrivas som ett.
    if (id) {
      const fynd = recommendation?.leadFinding ? JSON.stringify(recommendation.leadFinding) : null;
      try {
        await db`UPDATE invoice_analyses SET lead_finding_json = ${fynd}::jsonb WHERE id = ${id}`;
      } catch { /* kolumn ej migrerad än → forensik i rummet aktiveras efter migrering */ }
    }
    // Arvo Score-underlag (bug #2-fix): deterministiskt hälsotal ur prisläget. Separat UPDATE så
    // huvud-INSERTen aldrig bryts av om kolumnen är migrerad än (samma mönster som lead_finding_json).
    // Samma sak, och här är riktningen värre: ett score är ett OMDÖME om priset. Ett kvarlämnat
    // score från en körning vars jämförelse inte längre gäller är ett tal med full auktoritet och
    // inget underlag — precis 75-fallbackens sjukdom, fast med ett tal som SER räknat ut.
    if (id) {
      const score = recommendation?.healthScore != null ? Math.round(recommendation.healthScore) : null;
      try {
        await db`UPDATE invoice_analyses SET health_score = ${score} WHERE id = ${id}`;
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
export const VALFRIA_KOLUMNER = [
  ['lead_finding_json', 'JSONB'], ['contract_end_date', 'DATE'], ['health_score', 'INTEGER'],
  ['triage_reason', 'TEXT'], ['contract_terms_json', 'JSONB'], ['invoice_number', 'TEXT'],
  ['line_items_json', 'JSONB'],
  // Arkiveringen (2026-09-11) läses i WHERE-satsen i ALLA sex rumsläsningarna. Går koden live
  // före migreringen kastar varje sats och rummet faller till sin reserv — pdf_hash-fallet
  // 10 september, ett lager upp. Migreringen äger kolumnen (LK-01); den här raden är
  // skyddsnätet för glappet mellan deploy och migrering, aldrig ett skäl att hoppa över den.
  ['arkiverad_at', 'TIMESTAMPTZ'],
];

/**
 * VÄCK EN ARKIVERAD RAD — en NY inskickning av samma dokument är en levande händelse.
 *
 * ⚠️ SEPARAT SATS MED EGEN CATCH, och det är hela poängen (2026-09-11). Första versionen satte
 * `arkiverad_at = NULL` inne i ON CONFLICT-satsen. Saknas kolumnen (glappet mellan deploy och
 * migrering) kastar då HELA upserten, `storeAnalysis` yttre catch returnerar null — och kundens
 * faktura landar aldrig i rummet. Det är pdf_hash-fallet 10 september, ordagrant: koden före sitt
 * schema, och ett tyst tapp som ser ut som att inget hände.
 *
 * Fail-open på pipelinen, fail-closed på påståendet: utan kolumn finns inget arkiv att väcka,   TI-05
 * alltså är tystnaden här korrekt och inte en förlust.
 */
async function vackArkiverad(db, hashedFp, pdfHash) {
  if (!db || !hashedFp || !pdfHash) return;
  try {
    await db`UPDATE invoice_analyses SET arkiverad_at = NULL
             WHERE fingerprint = ${hashedFp} AND pdf_hash = ${pdfHash} AND arkiverad_at IS NOT NULL`;
  } catch { /* kolumn ej migrerad än → inget arkiv finns att väcka */ }
}

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
      FROM invoice_analyses   -- liggare: kundvy
      WHERE fingerprint = ${hashedFp} AND arkiverad_at IS NULL
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
          FROM invoice_analyses   -- liggare: kundvy
          WHERE fingerprint = ${hashedFp} AND arkiverad_at IS NULL
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
        FROM invoice_analyses   -- liggare: kundvy
        WHERE fingerprint = ${hashedFp} AND arkiverad_at IS NULL
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
      FROM invoice_analyses   -- liggare: kundvy
      WHERE user_email = ${email.trim().toLowerCase()} AND arkiverad_at IS NULL
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
          FROM invoice_analyses   -- liggare: kundvy
          WHERE user_email = ${email.trim().toLowerCase()} AND arkiverad_at IS NULL
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
        FROM invoice_analyses   -- liggare: kundvy
        WHERE user_email = ${email.trim().toLowerCase()} AND arkiverad_at IS NULL
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
