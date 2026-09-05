// api/test-invoice.mjs
// Vercel Serverless Function — kör hela pipelinen extract → categorize → recommend.
// Frontend POSTar JSON { pdfBase64, industry, employees, revenue? }.
//
// Vercel-konfig (vercel.json): maxDuration: 60. På Hobby-plan är gränsen 10s
// Deploy: 2026-05-26 — saas tier detection fix + M365-priser från microsoft.com
// vilket sannolikt inte räcker — Pro krävs för publik exponering.

import { Resend } from 'resend';
import { createHmac, createHash } from 'node:crypto';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
import { verifieraFakturanummer } from '../lib/fakturanummer.js';
import { extractInvoice, routeExtraction, ExtractorError, CONFIDENCE_THRESHOLD } from '../agents/test-invoice/extract.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { categorize, CategorizerError } from '../agents/categorizer/categorize.js';
import { recommend, RecommenderError, computeLikeForLikeSaasTarget } from '../agents/recommender/recommend.js';
import { isAudited } from '../lib/revision-gate.js';
import { grindPausad } from '../lib/grindpaus.js';
import { farVisaFynd } from '../lib/fyndratt.js';
import { detectForensicFindings } from '../lib/forensics.js';
import { shadowReport } from '../lib/invoice-lines.js';
import { storeDatapoint } from '../lib/benchmark.js';
import { BRANCHINDEX, INDUSTRY_SEGMENT_MAP, bucketForSize } from '../agents/recommender/branchindex.js';
import { getKv } from '../lib/kv.js';
import { getDb } from '../lib/db.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';
import { getEurSekRate, FALLBACK_RATE_EUR_SEK, getSekRate, FALLBACK_RATE_USD_SEK } from '../agents/recommender/pricing.js';
import { computeElRecommendation, NATAVGIFT_RE } from '../lib/el-recommendation.js';
import { contractClockFinding } from '../lib/contract-clock.js';
import { checkSupplierFingerprint } from '../lib/supplier-fingerprints.js';
import { verifySanity, verifySeatCount } from '../lib/sanity-verifier.js';
import { storeAnalysis, storeTriaged } from '../lib/invoice-store.js';
import { runIntegrityChecks } from '../lib/extraction-integrity.js';
import { ARVO_FEE_RATE, feeOf, netOf } from '../lib/fee.js';
import { computeHardwareAdjustment } from '../lib/hardware-installments.js';
import { saveIntegrityOverrides, flagNewSupplier } from '../lib/labeled-corrections.js';
import { upsertSupplier, recordSupplierPrice, recordContractTimeline } from '../lib/invoice-graph.js';
import { validateCategory } from '../lib/category-validator.js';
import { validateSeatPrice, getBenchmarkBasis, getSupplierPriceIntel } from '../lib/supplier-price-intel.js';
import { detectPriceAlert, getMarketIntelligence } from '../lib/price-alert.js';

const FROM_ALERT     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvoflow.se>';
const ALERT_TO       = process.env.ARVO_ALERT_EMAIL ?? 'team@arvoflow.se';

// P2.3 — Versionmetadata per analys
const PIPELINE_VERSION = '4.0';
const EXTRACT_MODEL    = 'claude-opus-4-8';
const CATEGORIZE_MODEL = 'claude-sonnet-4-6';
const RECOMMEND_MODEL  = 'claude-opus-4-8';
const PDF_CACHE_TTL         = 6 * 60 * 60;       // 6 h (GDPR-avvägning: kortare retain)
const GATE_WINDOW_TTL       = 30 * 24 * 60 * 60; // 30 dagar
const FREE_SAVING_ANALYSES  = 2;                  // Alltid fria analyser med besparing
const SAVING_GATE_THRESHOLD = 25_000;             // Kr kumulativ nettobesparing
const PIPELINE_TIMEOUT_MS = 55_000;             // 5 s marginal mot Vercels 60 s hard kill
const RATE_LIMIT_MAX        = 5;                  // Max analyser per IP per 24h
const RATE_WINDOW_TTL       = 24 * 60 * 60;      // 24 timmar

// ── IP-baserad rate limiting ──────────────────────────────────────────────────
const WHITELISTED_IPS = new Set([
  '83.249.237.58',   // owner mobile
  '192.165.21.4',    // owner work laptop
  '94.191.136.154',  // owner
  '94.191.136.170',  // owner (dynamiskt — samma subnät)
]);

// ── FAIL-CLOSED (grundarbeslut 2026-08-06) ────────────────────────────────────
//
// Den här funktionen returnerade tidigare false — "inte begränsad", alltså SLÄPP IGENOM — i tre
// lägen: KV saknas, IP saknas, eller KV felar. Kommentaren löd "Non-fatal — låt analysen gå
// igenom om KV failar". Följden: spärren försvann exakt när den behövdes mest.
//
// /testa-faktura är PUBLIK och kräver ingen inloggning. Varje uppladdad PDF startar två
// Opus-anrop (extract + recommend). En KV-nedgång förvandlade alltså ett tak på 5 analyser/dygn
// till obegränsad Opus-förbrukning — med stor sannolikhet det som stängde av vårt API-konto.
//
// Samma sjukdom som resten av veckan: en vakt som tyst upphör när något den beror på fallerar.
// Kan vi inte RÄKNA får vi inte SLÄPPA IGENOM. Avvägningen är medveten: går KV ner blir den
// publika tratten otillgänglig en stund. Det kostar oss i dag ingenting mätbart — en öppen
// Opus-kran kostade oss redan ett avstängt konto.
//
// Returnerar null när allt är OK, annars en TERS orsakskod (för diagnos, regel 7).
async function checkRateLimit(kv, ip) {
  if (!kv) return 'kv-saknas';                    // kan inte räkna → släpper inte igenom
  if (!ip) return 'ip-saknas';                    // kan inte identifiera → släpper inte igenom
  if (WHITELISTED_IPS.has(ip)) return null;       // ägarens egna IP:n — men GLOBALTAKET gäller ändå
  const key = `ratelimit:ip:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
  try {
    const count = (await kv.get(key)) ?? 0;
    if (count >= RATE_LIMIT_MAX) return 'ip-tak';
    await kv.set(key, count + 1, { ex: RATE_WINDOW_TTL });
  } catch (err) {
    console.error('[test-invoice] rate limit KV-fel — fail-closed:', err.message);
    return 'kv-fel';                              // ett fel får aldrig bli ett fribiljett
  }
  return null;
}

// ── GLOBALTAKET: andra nätet mot en skenande kran ─────────────────────────────
//
// Per-IP-taket skyddar mot EN besökare. Det skyddar inte mot många IP:n, en botnät-liknande
// skursvans, eller mot att vi själva råkar loopa via en whitelistad adress. Globaltaket är därför
// ett RUNAWAY-skydd, inte en kapacitetsgräns: det ska aldrig nås i normal drift, och när det nås
// har något gått sönder. Gäller ALLA — även whitelist och bypass-nyckel.
//
// Default 200 analyser/dygn = 400 Opus-anrop. Piloten (20 kunder som laddar upp en batch) ryms
// med marginal; en skenande loop gör det inte. Justeras med ANALYSIS_DAILY_CAP.
const GLOBAL_DAILY_CAP = Number(process.env.ANALYSIS_DAILY_CAP) || 200;

async function checkGlobalCap(kv) {
  if (!kv) return 'kv-saknas';                    // samma princip: kan inte räkna → nej
  const dag = new Date().toISOString().slice(0, 10);
  const key = `ratelimit:global:${dag}`;
  try {
    const n = await kv.incr(key);
    if (n === 1) await kv.expire(key, 48 * 60 * 60);
    if (n > GLOBAL_DAILY_CAP) {
      console.error(`[test-invoice] GLOBALTAKET NÅTT: ${n} analyser i dag (tak ${GLOBAL_DAILY_CAP}) — kranen stängd`);
      return 'globaltak';
    }
  } catch (err) {
    console.error('[test-invoice] globaltak KV-fel — fail-closed:', err.message);
    return 'kv-fel';
  }
  return null;
}

// ── HMAC-tokenvalidering ──────────────────────────────────────────────────────
// Returnerar null om token är giltig, annars en TERS orsakskod (för diagnos — regel 7).
// Klockskew-tolerans: token-utfärdaren och validatorn är olika serverless-instanser i Vercels
// fleet; en utfärdar-klocka som ligger någon sekund före validatorns gjorde age<0 → falskt
// "Sessionen löpte ut". Vi tolererar ±2 min skew (oexploaterbart, dödar hela 401-klassen).
const TOKEN_SKEW_MS = 120_000;
function tokenRejectReason(token) {
  const secret = process.env.ARVO_HMAC_SECRET;
  if (!secret) return null;                              // dev-läge utan konfigurerad secret
  if (!token || typeof token !== 'string') return 'no-token';
  const parts = token.split('.');
  if (parts.length !== 3) return 'bad-format';
  const [ts, nonce, sig] = parts;
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age)) return 'bad-ts';
  if (age < -TOKEN_SKEW_MS) return 'future';            // utfärdar-klocka före validatorn
  if (age > 3_600_000 + TOKEN_SKEW_MS) return 'expired';
  const expected = createHmac('sha256', secret).update(`${ts}.${nonce}`).digest('hex');
  if (sig !== expected) return 'bad-sig';
  return null;
}

// ── E-postlagring (gate) ──────────────────────────────────────────────────────
async function storeGateEmail(email, fingerprint) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      CREATE TABLE IF NOT EXISTS gate_emails (
        id          SERIAL PRIMARY KEY,
        email       TEXT NOT NULL,
        fingerprint TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE (email, fingerprint)
      )
    `;
    await db`
      INSERT INTO gate_emails (email, fingerprint)
      VALUES (${email}, ${fingerprint})
      ON CONFLICT DO NOTHING
    `;
  } catch (err) {
    console.error('[gate] storeGateEmail error:', err.message);
  }
}

// ── Internt larm för review_queue ─────────────────────────────────────────────

function buildAlertHtml(extracted, reason) {
  const pct   = extracted.confidenceScore != null
    ? `${Math.round(extracted.confidenceScore * 100)} %` : '–';
  const total = extracted.amount != null
    ? extracted.amount.toLocaleString('sv-SE') + ' kr' : '–';
  const ts    = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

  const rows = (extracted.lineItems ?? []).map((l) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;font-family:Arial,sans-serif">${l.description ?? ''}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;text-align:right;white-space:nowrap;font-family:Arial,sans-serif">${(l.amount ?? 0).toLocaleString('sv-SE')} kr</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">${l.type ?? ''}</td>
    </tr>`).join('');

  const notesBlock = extracted.confidenceNotes ? `
  <tr><td style="padding:0 32px 20px">
    <div style="background:#F4DAD0;border-left:3px solid #9F3B22;padding:12px 16px;border-radius:0 6px 6px 0">
      <p style="margin:0;font-size:13px;color:#6B2516;font-family:Arial,sans-serif">${extracted.confidenceNotes}</p>
    </div>
  </td></tr>` : '';

  const itemsBlock = rows ? `
  <tr><td style="padding:0 32px 28px">
    <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Extraherade rader</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E8F0EC">
      <tr style="background:#F1F6F3">
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Beskrivning</th>
        <th style="padding:8px 12px;text-align:right;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Belopp</th>
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Typ</th>
      </tr>
      ${rows}
    </table>
  </td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F1F6F3">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">

  <tr>
    <td style="background:#9F3B22;padding:22px 32px">
      <p style="margin:0 0 4px;font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.12em;font-family:Arial,sans-serif">Arvo intern — manuell granskning</p>
      <p style="margin:0;font-size:22px;font-weight:700;color:#fff;font-family:Arial,sans-serif">${extracted.supplier ?? 'Okänd leverantör'}</p>
    </td>
  </tr>

  <tr><td style="padding:24px 32px 20px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:33%;padding-right:16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Confidence</p>
          <p style="margin:0;font-size:26px;font-weight:700;color:#9F3B22;font-family:Arial,sans-serif">${pct}</p>
        </td>
        <td style="width:33%;padding:0 16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fakturadatum</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17;font-family:Arial,sans-serif">${extracted.date ?? '–'}</p>
        </td>
        <td style="width:33%;padding-left:16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fakturerat (exkl. moms)</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17;font-family:Arial,sans-serif">${total}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  ${notesBlock}
  ${itemsBlock}

  <tr>
    <td style="border-top:1px solid #D5E2DC;padding:14px 32px;background:#F1F6F3">
      <p style="margin:0;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">Arvo Flow &nbsp;·&nbsp; ${ts}</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body></html>`;
}

async function notifyReviewQueue(extracted, reason) {
  if (!process.env.RESEND_API_KEY) return;
  const pct = extracted.confidenceScore != null
    ? `${Math.round(extracted.confidenceScore * 100)} %` : '–';
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    FROM_ALERT,
      to:      ALERT_TO,
      subject: `[Review Queue] ${extracted.supplier ?? 'Okänd'} — confidence ${pct}`,
      html:    buildAlertHtml(extracted, reason),
    });
  } catch (err) {
    console.error('[test-invoice] notifyReviewQueue failed:', err.message);
  }
}

// computeElRecommendation och NATAVGIFT_RE importeras från lib/el-recommendation.js

export const config = {
  maxDuration: 60,
};

const ALLOWED_INDUSTRIES = [
  'ehandel', 'tillverkning', 'it-tech', 'bygg',
  'hotell', 'konsult', 'transport', 'vard', 'ovrigt',
];
// 3 MB ger ~4 MB JSON-body efter base64 — håller sig under Vercel Hobbys 4.5 MB.
// Höj till 5 MB om du är på Pro och vill ta större fakturor.
const MAX_PDF_SIZE = 3 * 1024 * 1024;

// ── Saving gate ───────────────────────────────────────────────────────────────
// Returnerar true om kunden nått sin kvot (ska visas konverteringsmeddelande).
// Uppdaterar KV-räknarna om kvoten INTE är nådd.
// Räknar bara analyser med faktisk nettobesparing (netSaving > 0).
async function checkSavingGate(kv, { orgNumber, email, netSaving }) {
  if (!kv || !(netSaving > 0)) return false;

  const hashKey = (s) => createHash('sha256').update(s).digest('hex').slice(0, 32);
  const keys = [];
  if (orgNumber && typeof orgNumber === 'string') {
    keys.push(`savegate:org:${hashKey(orgNumber.replace(/\s/g, ''))}`);
  }
  const cleanEmail = typeof email === 'string' && email.includes('@')
    ? email.trim().toLowerCase() : null;
  if (cleanEmail) keys.push(`savegate:email:${hashKey(cleanEmail)}`);

  if (keys.length === 0) return false;

  try {
    // Kontrollera om antingen org eller email nått gränsen
    for (const key of keys) {
      const data = (await kv.get(key)) ?? { count: 0, total: 0 };
      if (data.count >= FREE_SAVING_ANALYSES && data.total >= SAVING_GATE_THRESHOLD) {
        return true;
      }
    }
    // Uppdatera räknarna
    for (const key of keys) {
      const data = (await kv.get(key)) ?? { count: 0, total: 0 };
      await kv.set(
        key,
        { count: data.count + 1, total: data.total + netSaving },
        { ex: GATE_WINDOW_TTL }
      );
    }
  } catch (err) {
    console.error('[savegate] error:', err.message);
    // Non-fatal — låt analysen gå igenom om KV failar
  }
  return false;
}

// ── EN MISSLYCKAD BOKFÖRING FÅR INTE VARA TYST (2026-08-15) ──────────────────────────────────
// Alla tretton storeTriaged-anrop hade `.catch(() => {})`. Avsikten var rätt — en faktura ska
// aldrig falla för att en logg-skrivning fallerar — men följden var att exakt det fel vi jagar
// blir osynligt: rummet visar nio av tio, kön säger `done`, och ingenstans finns ett spår av att
// skrivningen ens försöktes. Vi letade i timmar efter något som skulle ha stått i loggen.
// Nu sväljs felet fortfarande (svaret till kunden är oförändrat) men det SÄGS. Ett fel man kan
// läsa är en tillgång; ett fel som ingen skriver ner har man inte haft.
const bokforFel = (err) => console.error('[test-invoice] storeTriaged misslyckades:', err?.message ?? err);

function send(res, status, body) {
  if (res.headersSent) return; // guard mot dubbel-send vid timeout-race
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Endast POST stöds' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return send(res, 500, {
      error: 'Servern är inte konfigurerad — ANTHROPIC_API_KEY saknas',
    });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON i request body' });
  }

  const { pdfBase64, industry, employees, revenue, token, fingerprint, bypass, email } = body;
  // ── SEGMENTET ÄR ANTAGET, INTE OBSERVERAT (obduktionen 2026-08-21) ──────────────────────────
  // Mail-in-vägarna (api/inbound-email.mjs och api/cron/drain-ingest.mjs) skickar
  // `industry: 'ovrigt'` och `employees: 10` — inte för att det är sant, utan för att fälten
  // krävs. 'ovrigt' mappar till segmentet `byraer` och 10 anställda till bandet `small`, så VARJE
  // mail-in-faktura skulle skrivas till prisbokens cell `byraer · small` oavsett vem kunden är.
  // Cellen svämmar då över med bolag av alla storlekar och branscher, och dess p25/median blir
  // meningslös — men ser precis lika auktoritativ ut. Det är «ett tal som ser mätt ut utan att
  // vara det», i den enda tabell som bär den kollektiva sanningen.
  //
  // RÄTTELSE 2026-08-21: jag skrev först «0 av 48 lagrade auto-analyser kom den vägen, alltså är
  // skadan ännu inte skedd». Det talet var osant. Sonden frågade `fingerprint LIKE 'mail:%'`,
  // men lib/invoice-store.js HASHAR fingerprinten före lagring — kolumnen kan aldrig innehålla
  // prefixet, så frågan var dömd att svara noll oavsett verkligheten. Hur stor exponeringen är
  // vet jag alltså inte; kön visar 13 genomförda bulk-jobb (3 den 26 juni, 10 den 14 augusti).
  // Spärren nedan är rätt oavsett svaret — men den vilar på regel 3, inte på en mätning.
  // Flaggan är avsändarens ansvar, för bara avsändaren vet om talet är avläst.
  // Kunden påverkas inte: analysen körs, lagras i kundens egen liggare och besvaras som vanligt.
  // Det enda som uteblir är en rad i prisboken som ingen kan belägga (regel 3).
  const segmentOkant = body?.segmentOkant === true;

  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return send(res, 400, { error: 'pdfBase64 är obligatoriskt' });
  }
  if (!ALLOWED_INDUSTRIES.includes(industry)) {
    return send(res, 400, {
      error: `Ogiltig industry. Tillåtna: ${ALLOWED_INDUSTRIES.join(', ')}`,
    });
  }
  const employeesNum = Number(employees);
  if (!Number.isFinite(employeesNum) || employeesNum < 1 || employeesNum > 5000) {
    return send(res, 400, { error: 'employees måste vara 1–5000' });
  }
  const revenueNum = revenue == null || revenue === '' ? null : Number(revenue);
  if (revenueNum != null && (!Number.isFinite(revenueNum) || revenueNum < 0)) {
    return send(res, 400, { error: 'revenue måste vara ett positivt tal eller null' });
  }

  let pdfBytes;
  try {
    pdfBytes = Buffer.from(pdfBase64, 'base64');
  } catch {
    return send(res, 400, { error: 'Kunde inte avkoda pdfBase64' });
  }
  if (pdfBytes.length === 0) {
    return send(res, 400, { error: 'PDF-bytes är tomma' });
  }
  if (pdfBytes.length > MAX_PDF_SIZE) {
    return send(res, 413, {
      error: `PDF är för stor (${(pdfBytes.length / 1024 / 1024).toFixed(1)} MB). Max: 3 MB`,
    });
  }
  if (pdfBytes.subarray(0, 4).toString() !== '%PDF') {
    return send(res, 400, {
      error: 'Filen verkar inte vara en PDF (saknar %PDF-header)',
    });
  }

  // ── Säkerhetslager ───────────────────────────────────────────────────────────
  const pdfHash  = createHash('sha256').update(pdfBytes).digest('hex');
  // v11: invaliderar v10 (priceSource-buggfixen ändrar savingRange ±12 %, källetikett
  // och listpris-domen för real-public-kategorier — v10-cachen bär de felaktiga)
  // v12 (2026-08-15): el-grenens två framgångsutgångar lagrar numera en rad i kundens liggare.
  // Svarsformen är oförändrad — men ett CACHAT svar hoppar över lagringen, så en kund som laddar
  // upp samma elfaktura igen hade fått samma tystnad som förut. Bumpen tvingar en riktig körning.
  // v15 (2026-09-05): forensiken ser nu «Leasing … (Månad 48 av 36)». Ordet «leasing» saknades i
  // AMORT_OVERPAID_RE, så ett slutbetalt leasingavtal gav noll fynd — 29 400 kr osynliga på en
  // verklig Dustin-faktura. Fixen ÄNDRAR RESULTATET för varje faktura med en leasingrad, alltså
  // måste versionen bumpas: annars serverar cachen det gamla, tomma svaret och fixen ser ut att
  // ha misslyckats. (Regel 7 — bumpa vid varje pipelineändring som påverkar resultat.)
  // v16 (2026-09-05): riktningskravet. En saas-productivity-analys utan räknad besparing får nu
  // kodskriven prosa i stället för modellens (Atea-kortet — se lflPrisgap i recommend.js). Utan
  // bump hade varje redan analyserad faktura fortsatt servera den falska meningen ur cachen.
  // v17 (2026-09-05): utgångskuvertet. Sexton svarsvägar bär nu leadFinding/forensicFindings som
  // de aldrig kunde bära förut (Dustin: 29 400 kr osynliga). Ett cachat v16-svar saknar fälten,
  // och ett svar utan fynd är omöjligt att skilja från en faktura utan fynd — därför ny version.
  const cacheKey = `pdf:result:v17:${pdfHash}:e${employeesNum}`;
  // isBypass: hoppar över token-validering, PDF-cache, rate limit och saving gate.
  // Kräver ARVO_BYPASS_SECRET i miljön — ingen hårdkodad dev-sträng.
  const isBypass = !!(bypass && typeof bypass === 'string'
    && process.env.ARVO_BYPASS_SECRET
    && bypass === process.env.ARVO_BYPASS_SECRET);

  const clientIp = (req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '').split(',')[0].trim();
  const isWhitelisted = WHITELISTED_IPS.has(clientIp);

  // ── GLOBALTAKET GÄLLER ALLA, FÖRE ALLT ANNAT ───────────────────────────────────────────────
  // Medvetet UTANFÖR isBypass-blocket: bypass-nyckeln hoppar över token, PDF-cache, rate limit
  // och saving gate — men den får inte hoppa över kostnadsspärren. En skenande loop med rätt
  // nyckel är fortfarande en skenande loop, och två Opus-anrop per varv kostar lika mycket
  // oavsett vem som startade dem. Runaway-skydd, aldrig en kapacitetsgräns.
  const capSkal = await checkGlobalCap(getKv());
  if (capSkal) {
    return send(res, 429, {
      error: capSkal === 'globaltak'
        ? 'Analysen är pausad för dygnet — vi har nått vårt eget säkerhetstak. Hör av er så öppnar vi.'
        : 'Vi kan inte verifiera kvoten just nu. Det är vårt fel, inte ert — försök om en stund.',
      rateLimited: true,
      code: capSkal,
    });
  }

  if (!isBypass) {
    const _tokReason = tokenRejectReason(token);
    if (_tokReason) {
      console.log(`[test-invoice] 401 token avvisad: ${_tokReason}`);
      return send(res, 401, { error: 'Ogiltig session — ladda om sidan och försök igen.', code: _tokReason });
    }

    const kv = getKv();

    // IP-baserad rate limiting (fail-closed): max 5 analyser per IP per 24h.
    // Kan vi inte räkna släpper vi inte igenom — se checkRateLimit.
    const rlSkal = await checkRateLimit(kv, clientIp);
    if (rlSkal) {
      const kvProblem = rlSkal === 'kv-saknas' || rlSkal === 'kv-fel';
      console.log(`[test-invoice] 429 rate limit: ${rlSkal}`);
      return send(res, 429, {
        error: kvProblem
          // Ärligt: det är vårt fel, inte kundens. Vi säger aldrig "du har gjort för många" till
          // någon som inte har det (regel 3 — ett påstående om kunden kräver täckning).
          ? 'Vi kan inte verifiera er kvot just nu. Det är vårt fel, inte ert — försök om en stund.'
          : 'Du har analyserat för många fakturor idag. Försök igen imorgon eller kontakta oss för att utöka din kvot.',
        rateLimited: true,
        code: rlSkal,
      });
    }

    // PDF-fingerprintcache: identisk faktura inom 24h → returnera cachat svar
    if (kv) {
      try {
        const cached = await kv.get(cacheKey);
        if (cached) return send(res, 200, { ...cached, cached: true });
      } catch { /* non-fatal */ }
    }

    // Saving gate körs efter analysen — se checkSavingGate() nedan.
  }

  // Timeout-skydd: om Anthropic API hänger skickas ett kontrollerat JSON-svar
  // 5 s innan Vercel dödar funktionen med en kal 504-sida.
  const timeoutHandle = setTimeout(() => {
    send(res, 504, {
      ok:      false,
      error:   'Analysen tog för lång tid — försök igen om en stund.',
      timeout: true,
    });
  }, PIPELINE_TIMEOUT_MS);

  const timing = {};
  try {
    const t0 = Date.now();
    let fakturanummerSkal = null;
    const extracted = await extractInvoice({ pdfBytes });
    timing.extractMs = Date.now() - t0;

    // ── FAKTURANUMRET MÅSTE STÅ PÅ PAPPRET (grundarbeslut 2026-08-15) ────────────────────────
    // Numret pekar ut EXAKT ett dokument, så ekonomichefen kan slå upp rätt papper när vi säger
    // att vi inte prissatte en faktura. Det är också det farligaste fältet vi har: ett
    // hallucinerat nummer ser identiskt ut med ett avläst och bär precisionens auktoritet — en
    // kund som letar efter "Faktura 9923" och inte hittar den drar slutsatsen att vi har fel om
    // allt annat också.
    //
    // Därför prövas modellens påstående mot dokumentets TEXTLAGER: pdfjs läser tecknen
    // deterministiskt, utan modell och utan prompt. Ett genuint oberoende vittne — att låta en
    // modell kontrollera en modell vore att mäta med samma linjal två gånger (samma princip som
    // SR-07 och öres-stickprovet). Mätt före inkoppling: 72 av 72 bekräftade på riktiga fakturor,
    // noll fabrikat, och formgrinden fällde ändå en avhuggen läsning ("SEC-2026-05-").
    //
    // FAIL-CLOSED FÖR FÄLTET, FAIL-OPEN FÖR PIPELINEN: faller textutvinningen tappar vi numret,
    // aldrig analysen. En faktura ska aldrig gå förlorad för att en bekvämlighet inte gick att
    // bekräfta. Kostnad: ~15 ms per faktura efter modulens första laddning.
    {
      const t = Date.now();
      let textlager = null;
      try {
        ({ text: textlager } = await extraheraTextlager(pdfBytes));
      } catch (err) {
        console.error('[fakturanummer] textlagret kunde inte läsas:', err.message);
      }
      const dom = verifieraFakturanummer(extracted.invoiceNumber, textlager);
      // Skälet bärs i SVARET, inte bara i loggen. Vercel-loggen når varken sonderna eller jag, och
      // ett fail-closed fält som ALLTID failar ser identiskt ut med ett som fungerar — det var
      // hela poängen med FN-11. Kön bokför skälet (utfallFranSvar) och då blir det läsbart.
      fakturanummerSkal = dom.nummer ? null : (dom.skal ?? 'inget_pastaende');
      if (extracted.invoiceNumber && !dom.nummer) {
        // Varje avvisning SÄGS. En grind vars utfall aldrig räknas kan aldrig förbättras — och
        // stängs förr eller senare av, precis som smyghöjningsvakten 2026-07-20.
        console.log(`[fakturanummer] avvisat (${dom.skal})`);
      }
      extracted.invoiceNumber = dom.nummer;
      timing.fakturanummerMs = Date.now() - t;
    }
    console.log('[test-invoice] extracted:', JSON.stringify({
      supplier:        extracted.supplier,
      description:     extracted.description,
      billingPeriod:   extracted.billingPeriod,
      lineItems:       extracted.lineItems?.length,
      recurringAmount: extracted.recurringAmount,
      variableCharges: extracted.variableCharges,
      annualCost:      extracted.annualCost,
      confidenceScore: extracted.confidenceScore,
      outOfScope:      extracted.outOfScope,
    }));
    {
      const u = extracted.usage ?? {};
      // Opus 4.7: $15/MTok in, $75/MTok out, $18.75/MTok cache-write, $1.50/MTok cache-read
      const cost = (
        (u.input_tokens ?? 0) * 15 +
        (u.output_tokens ?? 0) * 75 +
        (u.cache_creation_input_tokens ?? 0) * 18.75 +
        (u.cache_read_input_tokens ?? 0) * 1.5
      ) / 1_000_000;
      console.log('[tokens] extract:', JSON.stringify({
        input: u.input_tokens,
        output: u.output_tokens,
        cache_write: u.cache_creation_input_tokens ?? 0,
        cache_read: u.cache_read_input_tokens ?? 0,
        cost_usd: cost.toFixed(4),
      }));
    }

    // Fas 2: deterministiska integritetskontroller post-extraction
    {
      const rawHeader = body.pdfRawHeader ?? '';
      const { result: fixed, overrides } = runIntegrityChecks(extracted, rawHeader);
      if (overrides.length > 0) {
        console.log('[integrity] overrides:', JSON.stringify(overrides));
        Object.assign(extracted, fixed);
        // Spara överrides som labeled corrections för träning (fire-and-forget)
        saveIntegrityOverrides(overrides, {
          category: null,
          supplier: extracted.supplier ?? null,
        }).catch(() => {});
      }
    }

    // ══ UTGÅNGSKUVERTET (2026-09-05, ur Dustin-fakturan) ═══════════════════════════════════
    //
    // Forensiken räknas HÄR, före varje triage-gren — inte inne i `recommend()`. Mätt före
    // ändringen: 16 av 19 svarsvägar returnerade innan recommend() ens anropades, så en faktura
    // som stoppades av en kategori-grind tog sitt fynd med sig i graven. Dustin-fakturan bar
    // 29 400 kr i slutbetald leasing och ett färdigskrivet kravbrev; kunden fick «kräver offert».
    //
    // Fyndet hör inte ihop med om vi kan PRISSÄTTA kategorin — det kommer ur kundens EGEN rad
    // (Zero Trust, inget marknadstal). Därför bor det i kuvertet, som varje utgång bär med sig.
    //
    // `svara()` nedan tvingar varje utgång att deklarera `tillitTillRader`. Det finns ingen
    // default: utgången är det enda stället som vet varför vi stannade, och ett utelämnat svar
    // ska smälla, aldrig tolkas som ett tyst nej.
    const _forensik = detectForensicFindings(extracted.lineItems, {
      billingPeriod: extracted.billingPeriod ?? null,
      supplier: extracted.supplier || null,
    });

    /**
     * Enda vägen ut med status 200. Fäster kuvertet på svaret och avgör, via ETT härlett
     * kriterium, om fyndet får följa med. Sviten (tests/utgangskrav.mjs) fäller varje
     * `send(res, 200, …)` som kringgår den — annars faller nästa fält på nästa nya utgång.
     */
    const svara = (kropp) => {
      // Deklarationen skrivs som ett fält i utgångens egen objektlitteral — bredvid `reason`,
      // där skälet står — och konsumeras här. Den når aldrig kunden.
      const { tillitTillRader, ...rest } = kropp;
      const { visa, skal } = farVisaFynd({ tillitTillRader, extracted });
      const lead = visa ? (_forensik[0] ?? null) : null;
      if (_forensik.length > 0 && !visa) {
        console.log(`[utgångskuvert] ${_forensik.length} fynd hålls tillbaka — skäl: ${skal}`);
      }
      return send(res, 200, {
        ...rest,
        // Toppnivå, alltid samma adress: rutter utan `recommendation` (review_queue,
        // monitoring, unsupported) hade annars ingen plats att bära fyndet på, och en yta som
        // måste leta på två ställen hittar förr eller senare bara det ena.
        leadFinding:      lead,
        forensicFindings: visa ? _forensik : [],
        fyndSkal:         skal,
      });
    };

    // Active learning: okänd leverantör → flagga för proaktiv märkning (fire-and-forget)
    {
      const fp = checkSupplierFingerprint(extracted.supplier, extracted.supplier, null);
      if (!fp.matched && extracted.supplier) {
        flagNewSupplier({ supplier: extracted.supplier }).catch(() => {});
      }
    }

    // Guard: kreditnotor (negativt totalt fakturabelopp)
    if (extracted.amount < 0) {
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: extracted.category ?? null,
        route: 'unsupported', reason: 'credit_note', userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: en kreditnota är ett NEGATIVT belopp, inte ett tvivel om avläsningen — forensiken filtrerar negativa rader ändå
        tillitTillRader: true,
        ok: true, route: 'unsupported', reason: 'credit_note',
        extracted: { supplier: extracted.supplier, date: extracted.date },
        categorized: { category: 'uncategorized' },
        recommendation: { shouldSwitch: false, reasoning: '' },
        timing: { extractMs: timing.extractMs },
      });
    }

    // Guard: utländsk valuta
    // EUR → konverteras till SEK med live Riksbanken/ECB-kurs och fortsätter pipeline.
    // USD → SaaS-priser (Atlassian, Zoom, Slack) konverteras av recommend.js. Kategorier som
    //       träffar requiresVolumeData (cloud-infra) konverteras separat i det blocket nedan.
    // Övriga valutor → review_queue.
    if (extracted.currency === 'EUR') {
      const kv = getKv();
      const eurFx = await getEurSekRate(kv).catch(() => ({ rate: FALLBACK_RATE_EUR_SEK, source: 'fallback', date: null }));
      const sekPerEur = eurFx.rate ?? FALLBACK_RATE_EUR_SEK;
      const cvt = (v) => (v != null ? Math.round(v * sekPerEur) : null);
      extracted.originalCurrency    = 'EUR';
      extracted.fxRate              = sekPerEur;
      extracted.fxSource            = eurFx.source;
      extracted.fxDate              = eurFx.date;
      extracted.currency            = 'SEK';
      extracted.amount              = cvt(extracted.amount);
      extracted.recurringAmount     = cvt(extracted.recurringAmount);
      extracted.variableCharges     = cvt(extracted.variableCharges);
      extracted.oneTimeFees         = cvt(extracted.oneTimeFees);
      extracted.annualCost          = cvt(extracted.annualCost);
      extracted.pricePerSeatMonthly = extracted.pricePerSeatMonthly != null ? Math.round(extracted.pricePerSeatMonthly * sekPerEur) : null;
      extracted.lineItems           = (extracted.lineItems ?? []).map(li => ({
        ...li,
        amount: li.amount != null ? Math.round(li.amount * sekPerEur) : null,
      }));
      console.log(`[test-invoice] EUR→SEK konvertering: rate=${sekPerEur} source=${eurFx.source}`);
    } else if (extracted.currency === 'USD') {
      // USD-fakturor (Salesforce, HubSpot, övriga SaaS i USD) konverteras här till SEK.
      // recommend.js konverterar bara benchmark-tier-priser (USD-kolumner i branchindex) —
      // det berör inte input-beloppen, så ingen dubbelkonvertering sker.
      const kv = getKv();
      const usdFx = await getSekRate(kv).catch(() => ({ rate: FALLBACK_RATE_USD_SEK, source: 'fallback', date: null }));
      const sekPerUsd = usdFx.rate ?? FALLBACK_RATE_USD_SEK;
      const cvt = (v) => (v != null ? Math.round(v * sekPerUsd) : null);
      extracted.originalCurrency    = 'USD';
      extracted.fxRate              = sekPerUsd;
      extracted.fxSource            = usdFx.source;
      extracted.fxDate              = usdFx.date;
      extracted.currency            = 'SEK';
      extracted.amount              = cvt(extracted.amount);
      extracted.recurringAmount     = cvt(extracted.recurringAmount);
      extracted.variableCharges     = cvt(extracted.variableCharges);
      extracted.oneTimeFees         = cvt(extracted.oneTimeFees);
      extracted.annualCost          = cvt(extracted.annualCost);
      extracted.pricePerSeatMonthly = extracted.pricePerSeatMonthly != null
        ? Math.round(extracted.pricePerSeatMonthly * sekPerUsd) : null;
      extracted.lineItems = (extracted.lineItems ?? []).map(li => ({
        ...li,
        amount:    li.amount    != null ? Math.round(li.amount    * sekPerUsd) : null,
        unitPrice: li.unitPrice != null ? Math.round(li.unitPrice * sekPerUsd) : null,
      }));
      console.log(`[test-invoice] USD→SEK konvertering: rate=${sekPerUsd} source=${usdFx.source}`);
    } else if (extracted.currency && !['SEK'].includes(extracted.currency)) {
      notifyReviewQueue(extracted, `[Utländsk valuta] ${extracted.currency}`).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue (currency) threw:', err.message)
      );
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: extracted.category ?? null,
        route: 'review_queue', reason: `foreign_currency:${extracted.currency}`, userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: beloppen är kvar i främmande valuta på den här grenen — ett fynd i kronor vore fel enhet
        tillitTillRader: false,
        ok: true, route: 'review_queue', reason: 'foreign_currency',
        currency: extracted.currency,
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          confidenceScore: extracted.confidenceScore,
        },
        timing: { extractMs: timing.extractMs },
      });
    }

    // ── BELOPPSVALIDERING ─────────────────────────────────────────────────────────
    // Orimligt stora belopp indikerar ett valutakonverteringsfel (t.ex. USD→SEK-steget
    // hoppades över och dollarbelopp passerade som kronor med 10× magnitud).
    // Felsäker routing till review_queue istället för att visa nonsens-rekommendation.
    {
      const _MAX_ANNUAL_SEK = 100_000_000; // 100 MSEK — övre rimlighetsgräns för svenska SME
      const _implausible = (extracted.annualCost ?? 0) > _MAX_ANNUAL_SEK
                        || (extracted.amount      ?? 0) > _MAX_ANNUAL_SEK;
      if (_implausible) {
        console.error(`[guard:belopp] Orimliga belopp — annualCost=${extracted.annualCost} amount=${extracted.amount} currency=${extracted.currency}`);
        notifyReviewQueue(extracted, `[Beloppsvalidering] Orimliga belopp (annualCost=${(extracted.annualCost ?? 0).toLocaleString('sv-SE')} kr) — troligt valutatransformationsfel`).catch(() => {});
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: extracted.category ?? null,
          route: 'review_queue', reason: 'implausible_amounts', userEmail: body.userEmail }).catch(bokforFel);
        return svara({
          // tillit: vår egen rimlighetskontroll underkänner talen; ett fynd byggt på dem vore reservkortsfelet
          tillitTillRader: false,
          ok: true, route: 'review_queue', reason: 'implausible_amounts',
          extracted: {
            supplier:        extracted.supplier,
            date:            extracted.date,
            amount:          extracted.amount,
            confidenceScore: extracted.confidenceScore,
          },
          timing: { extractMs: timing.extractMs },
        });
      }
    }

    // Pre-routing fingerprint boost: kända leverantörer med confidence >= 0.70 ska aldrig
    // fastna på review_queue pga threshold. Telia-kombinationsfakturor (mobil + bredband)
    // har naturligt ~0.75 confidence men är korrekt extraherade — utan boost missar de 0.85.
    // Kategorin är inte känd ännu — vi boostar enbart baserat på leverantörsnamn.
    {
      const _preRoute = checkSupplierFingerprint(null, extracted.supplier, null);
      if (_preRoute.matched && (extracted.confidenceScore ?? 0) >= 0.70) {
        const boosted = Math.max(extracted.confidenceScore, CONFIDENCE_THRESHOLD);
        console.log(`[fingerprint:pre-route] ${_preRoute.key}: confidence ${extracted.confidenceScore?.toFixed(2)} → ${boosted}`);
        extracted.confidenceScore = boosted;
      }
    }

    // ── Ring 2: Seat count oracle (fire-and-forget) ───────────────────────────
    // Haiku läser PDF:en oberoende av Opus och verifierar antalet licenser/SIM-kort.
    // Ej blockerande — påverkar inte kundlatensen. Vid avvikelse: internt larm.
    if ((extracted.seatCount ?? 0) > 0) {
      verifySeatCount({
        seatCount:  extracted.seatCount,
        lineItems:  extracted.lineItems,
        pdfBase64:  pdfBytes.toString('base64'),
      }).then((seatResult) => {
        if (!seatResult.ok) {
          notifyReviewQueue(
            extracted,
            `[Ring2 Seat Oracle] seatCount Opus=${seatResult.opusCount} ≠ Haiku=${seatResult.oracleCount} (diff=${seatResult.diff})`,
          ).catch(() => {});
          console.error(`[ring2:seat-oracle] ALERT: opus=${seatResult.opusCount} haiku=${seatResult.oracleCount}`);
        }
      }).catch((err) => console.warn('[ring2:seat-oracle] fail-open:', err.message));
    }

    // ── Produktionslarm: billing period 'unknown' trots att datum extraherades ──
    // Datum > 400 dagar är ovanligt — kan indikera att AI blandade ihop avtalstid med fakturaperiod.
    if (extracted.billingPeriod === 'unknown' && extracted.billingPeriodStart) {
      notifyReviewQueue(
        extracted,
        `[BillingPeriod] Perioddatum extraherades (${extracted.billingPeriodStart} – ${extracted.billingPeriodEnd}) men ger billingPeriod=unknown — ovanligt lång period eller datumdrift?`,
      ).catch(() => {});
    }

    // Triage — review_queue eller unsupported avbryter pipeline
    const routing = routeExtraction(extracted);

    if (routing.route === 'review_queue') {
      // Fire-and-forget — skickar internt larm utan att blockera kundsvaret
      notifyReviewQueue(extracted, routing.reason).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue threw:', err.message)
      );
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: extracted.category ?? null,
        route: 'review_queue', reason: routing.reason, userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: generisk routing-avvisning — skälet är inte känt på den här raden, alltså tiger vi (UK-02)
        tillitTillRader: false,
        ok:     true,
        route:  'review_queue',
        reason: routing.reason,
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          confidenceScore: extracted.confidenceScore,
          confidenceNotes: extracted.confidenceNotes,
          lineItems:       extracted.lineItems,
        },
        timing: { extractMs: timing.extractMs },
      });
    }

    if (routing.route === 'unsupported') {
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: extracted.category ?? null,
        route: 'unsupported', reason: routing.reason ?? 'out_of_scope', userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: utanför analysräckvidden betyder att vi inte optimerar TJÄNSTEN; raderna är korrekt lästa
        tillitTillRader: true,
        ok:    true,
        route: 'unsupported',
        reason: routing.reason ?? 'out_of_scope',
        extracted: {
          supplier:   extracted.supplier,
          date:       extracted.date,
          outOfScope: true,
        },
        categorized:    { category: 'uncategorized' },
        recommendation: { shouldSwitch: false, reasoning: '' },
        timing: { extractMs: timing.extractMs },
      });
    }

    const t1 = Date.now();
    const categorized = await categorize({
      supplier: extracted.supplier,
      amount: extracted.amount,
      date: extracted.date,
      account: extracted.account,
      description: extracted.description,
      recurring: extracted.recurring,
    });
    timing.categorizeMs = Date.now() - t1;
    console.log('[test-invoice] categorized:', JSON.stringify({
      category: categorized.category,
      confidence: categorized.confidence,
      normalizedSupplier: categorized.normalizedSupplier,
    }));
    {
      const u = categorized.usage ?? {};
      // Haiku 4.5: $0.80/MTok in, $4/MTok out
      const cost = (
        (u.input_tokens ?? 0) * 0.8 +
        (u.output_tokens ?? 0) * 4 +
        (u.cache_creation_input_tokens ?? 0) * 1.0 +
        (u.cache_read_input_tokens ?? 0) * 0.08
      ) / 1_000_000;
      console.log('[tokens] categorize:', JSON.stringify({
        input: u.input_tokens,
        output: u.output_tokens,
        cache_write: u.cache_creation_input_tokens ?? 0,
        cache_read: u.cache_read_input_tokens ?? 0,
        cost_usd: cost.toFixed(4),
      }));
    }

    // ── LAGER 1: SUPPLIER FINGERPRINT VALIDATION ──────────────────────────────────
    // Kontrollerar att AI:ns kategori stämmer för kända leverantörer.
    // Vid mismatch → review_queue med intern alert. Vid match → confidence boostad.
    {
      const fp = checkSupplierFingerprint(
        categorized.normalizedSupplier,
        extracted.supplier,
        categorized.category,
      );
      if (fp.matched && !fp.categoryOk) {
        console.error(`[fingerprint] MISMATCH key=${fp.key} ai_category='${categorized.category}' expected=[${fp.expectedCategories.join(', ')}]`);
        notifyReviewQueue(extracted, `[Fingerprint] ${fp.key}: AI gav '${categorized.category}', förväntat [${fp.expectedCategories.join(', ')}]`).catch(() => {});
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: categorized.category ?? null,
          route: 'review_queue', reason: 'fingerprint_mismatch', userEmail: body.userEmail }).catch(bokforFel);
        return svara({
          // tillit: leverantörskontrollen säger emot vår egen kategorisering — när vittnena är oense tiger vi (BK-06/BK-07)
          tillitTillRader: false,
          ok: true, route: 'review_queue', reason: 'fingerprint_mismatch',
          extracted: {
            supplier:        extracted.supplier,
            date:            extracted.date,
            amount:          extracted.amount,
            confidenceScore: extracted.confidenceScore,
          },
          timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
        });
      }
      if (fp.matched && fp.categoryOk) {
        const boosted = Math.max(categorized.confidence ?? 0, 0.95);
        console.log(`[fingerprint] MATCH key=${fp.key} category='${categorized.category}' confidence ${categorized.confidence?.toFixed(2)} → ${boosted}`);
        categorized.confidence = boosted;
      }
    }

    // ── P1.1: DUAL-MODEL KATEGORI-VALIDERING ─────────────────────────────────────
    // Kör bara för leverantörer som INTE matchades av fingerprint-databasen.
    // En andra oberoende Haiku-klassificering validerar att kategorin är rimlig.
    // Fail-open: timeout eller API-fel blockerar aldrig en korrekt analys.
    {
      const _fpCheck = checkSupplierFingerprint(categorized.normalizedSupplier, extracted.supplier, categorized.category);
      if (!_fpCheck.matched) {
        const _validation = await validateCategory({
          supplier:         extracted.supplier,
          amount:           extracted.amount,
          lineItems:        extracted.lineItems,
          proposedCategory: categorized.category,
        });
        // #3-fix (2026-06-28): en validator-oenighet får ALDRIG veta över en GRANSKAD + konfident
        // primärkategori. En granskad kategori (molnvaxel, mobil, loneadmin…) har egen regressionssvit
        // + verifierat pris — revisionsgrinden litar på den. Validatorn är skyddsnät för OSÄKra/
        // overifierade fall, inte vetorätt över en trygg kategori. Annars stals prissättbara fakturor.
        // En KONFIDENT primärkategorisering (≥0,8) litar vi på även om kategorin är oreviderad —
        // en oreviderad kategori visar ändå bara talfritt offert-läge (revisionsgrinden skyddar siffrorna),
        // så en validator-oenighet ska aldrig stjäla en konfident faktura till Liggare 2. Lågt förtroende
        // (<0,8) → validatorn får fortfarande väcka review (där behövs skyddsnätet som mest).
        const _trustPrimary = (categorized.confidence ?? 0) >= 0.8;
        if (_validation.conflict && _trustPrimary) {
          console.log(`[P1.1:dual-model] oenighet IGNORERAD — primär '${categorized.category}' är granskad+konfident (validator='${_validation.validatorCategory}', conf=${categorized.confidence})`);
        } else if (_validation.conflict) {
          console.error(`[P1.1:dual-model] KONFLIKT: primär='${categorized.category}' validator='${_validation.validatorCategory}' supplier='${extracted.supplier}'`);
          notifyReviewQueue(extracted, `[P1.1 Dual-model] Kategorikonflikt: Sonnet='${categorized.category}', Haiku='${_validation.validatorCategory}' — manuell granskning krävs`).catch(() => {});
          timing.totalMs = Date.now() - t0;
          await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: categorized.category ?? null,
            route: 'review_queue', reason: 'categorization_conflict', userEmail: body.userEmail }).catch(bokforFel);
          return svara({
            // tillit: två av våra kontroller är oense om vad fakturan är
            tillitTillRader: false,
            ok: true, route: 'review_queue', reason: 'categorization_conflict',
            extracted: {
              supplier:        extracted.supplier,
              date:            extracted.date,
              amount:          extracted.amount,
              confidenceScore: extracted.confidenceScore,
            },
            timing,
          });
        }
      }
    }

    // ── P1.2: SUPPLIER PRICE INTELLIGENCE ────────────────────────────────────────
    // Validerar att pricePerSeatMonthly är inom rimligt intervall för kända leverantörer.
    // Pris >1.30× MSRP indikerar faktureringsfel eller fel kategori → review_queue.
    if (extracted.pricePerSeatMonthly && categorized.normalizedSupplier) {
      const _priceCheck = validateSeatPrice({
        normalizedSupplier:   categorized.normalizedSupplier,
        pricePerSeatMonthly:  extracted.pricePerSeatMonthly,
        tierKey:              null,
      });
      if (_priceCheck.anomaly) {
        console.error(`[P1.2:price-intel] ANOMALI: ${_priceCheck.detail}`);
        notifyReviewQueue(extracted, `[P1.2 Price Intel] ${_priceCheck.detail}`).catch(() => {});
        timing.totalMs = Date.now() - t0;
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: categorized.category ?? null,
          route: 'review_queue', reason: 'price_anomaly', userEmail: body.userEmail }).catch(bokforFel);
        return svara({
          // tillit: priset självt är flaggat som avvikande — då är radernas tal inget underlag vi kan stå för
          tillitTillRader: false,
          ok: true, route: 'review_queue', reason: 'price_anomaly',
          extracted: {
            supplier:           extracted.supplier,
            date:               extracted.date,
            amount:             extracted.amount,
            confidenceScore:    extracted.confidenceScore,
            pricePerSeatMonthly: extracted.pricePerSeatMonthly,
          },
          timing,
        });
      }
    }

    // ── Deterministisk beräkning av addon- och primärkomponent-kostnader ────────
    // Sker efter kategorisering (category behövs) men före recommendation.
    // Ersätter AI-beräknade fält som returnerade null för ofta.
    const metrics = computeInvoiceMetrics(
      extracted.lineItems,
      categorized.category,
      extracted.potentialMixedCategories ?? false,
    );

    // ── Sekundär kategori-besparing (kombinerade fakturor) ───────────────────
    const metrics_with_mixed = { ...metrics, secondaryComponentMonthly: metrics.secondaryComponentMonthly };
    const secondarySaving = computeSecondarySaving({
      metrics,
      category:                 categorized.category,
      potentialMixedCategories: extracted.potentialMixedCategories ?? false,
      industry,
      employees:                employeesNum,
    });

    // ── Smyghöjning-detektering: jämför mot kundens senaste analys ──────────────
    // Kärnan i Arvo Intelligence — proaktiv CFO som märker prisökningar innan kunden gör det.
    // Slår upp senaste auto-analyse med samma fingerprint+kategori i invoice_analyses.
    // Injiceras i rekommenderarens prompt som en stark kontextsignal.
    // Fail-open: query-fel stoppar aldrig pipelinen.
    let priceHistoryContext = null;
    if (fingerprint && categorized.category !== 'el' && (extracted.annualCost ?? 0) > 0) {
      try {
        const _db = getDb();
        if (_db) {
          const _fpHash = createHash('sha256').update(String(fingerprint)).digest('hex').slice(0, 32);
          // Kräver samma normalized_supplier — utan detta jämförs kostnader
          // kors-leverantör om kunden bytt (t.ex. Telia → Tele2, samma kategori).
          const _prevRows = await _db`
            SELECT annual_cost, seat_count, created_at
            FROM invoice_analyses
            WHERE fingerprint        = ${_fpHash}
              AND category           = ${categorized.category}
              AND normalized_supplier = ${categorized.normalizedSupplier ?? ''}
              AND route              = 'auto'
              AND annual_cost        > 0
            ORDER BY created_at DESC
            LIMIT 1
          `;
          const _prev = _prevRows[0];
          if (_prev) {
            const _prevAnnual  = Number(_prev.annual_cost);
            const _currAnnual  = extracted.annualCost;
            // Per-säte-normalisering: totalkostnad kan stiga utan att priset/säte ökar,
            // t.ex. om bolaget anställt fler. Utan denna normalisering flaggas tillväxt
            // felaktigt som en smyghöjning.
            const _prevSeats   = Number(_prev.seat_count ?? 0);
            const _currSeats   = Number(extracted.seatCount ?? 0);
            const _usePerSeat  = _prevSeats > 0 && _currSeats > 0;
            const _prevBase    = _usePerSeat ? _prevAnnual / _prevSeats : _prevAnnual;
            const _currBase    = _usePerSeat ? _currAnnual / _currSeats : _currAnnual;
            const _deltaPct    = ((_currBase - _prevBase) / _prevBase) * 100;
            const _monthsSince = Math.max(1, Math.round(
              (Date.now() - new Date(_prev.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30.5)
            ));
            if (Math.abs(_deltaPct) > 7) {
              priceHistoryContext = {
                prevAnnualCost:  _prevAnnual,
                deltaPct:        Math.round(_deltaPct * 10) / 10,
                monthsSince:     _monthsSince,
                isIncrease:      _deltaPct > 0,
                perSeatNorm:     _usePerSeat,
              };
              console.log(`[smyghöjning] category=${categorized.category} supplier=${categorized.normalizedSupplier} delta=${_deltaPct.toFixed(1)}% perSeat=${_usePerSeat} months=${_monthsSince}`);
            }
          }
        }
      } catch (_err) {
        console.warn('[smyghöjning] history query failed (non-fatal):', _err.message);
      }
    }

    // ── Avtalslås-detektering (körs före alla tidiga exits) ───────────────────
    // Hoppas över för licensePending-kategorier — vi kan inte byta ändå, så
    // "låst avtal" skulle vara vilseledande för t.ex. försäkringskunder.
    // Trigger: antingen (start + cancellationDays inom lock-window) ELLER
    //          (periodEnd i framtid + cancellationDays passerat).
    const _today = new Date();
    const _periodEnd = extracted.servicePeriodEnd ? new Date(extracted.servicePeriodEnd) : null;
    const _hasActivePeriod = _periodEnd && _periodEnd > _today;
    const _lockDeadline = (() => {
      if (!extracted.servicePeriodStart || extracted.cancellationNoticeDays == null) return null;
      const d = new Date(extracted.servicePeriodStart);
      d.setDate(d.getDate() - extracted.cancellationNoticeDays);
      return d;
    })();
    // Monitoring triggar om vi har ett explicit avtalsslutt OCH något av:
    // (a) beräknad lock-deadline passerat, ELLER (b) cancellationNoticeDays är känd,
    // ELLER (c) avtalsslutt är >180 dagar bort (troligen bindningsavtal, ej faktureringsperiod).
    const _MS_180_DAYS = 180 * 24 * 60 * 60 * 1000;
    const _isPastLockDeadline = _lockDeadline
      ? _today > _lockDeadline
      : extracted.cancellationNoticeDays != null && _hasActivePeriod
        ? true
        : _hasActivePeriod && _periodEnd && (_periodEnd - _today) > _MS_180_DAYS;

    if (!categorized.licensePending && categorized.category !== 'el' && _hasActivePeriod && _isPastLockDeadline) {
      const monitoringDate = new Date(_periodEnd);
      monitoringDate.setMonth(monitoringDate.getMonth() - 3);
      timing.totalMs = Date.now() - t0;
        // #1-fix (2026-06-28): en avtalsbevakad faktura ska SYNAS i kontoret (Liggare 1, "Avtalsbevakad"),
        // inte försvinna. Lagra som monitoring-rad med kontraktsklockan — annars tyst bortfall (regel 9).
        await storeAnalysis({
          fingerprint, pdfHash, extracted, categorized,
          recommendation: { shouldSwitch: false, reasoning: '' },
          route: 'monitoring', industry, employees: employeesNum,
          userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
        }).catch((err) => console.error('[test-invoice] storeAnalysis (monitoring) failed:', err.message));
        return svara({
          // tillit: lyckad avläsning; vi bevakar bara kontraktsklockan
          tillitTillRader: true,
          ok:    true,
          route: 'monitoring',
          contractLocked:         true,
          servicePeriodEnd:       extracted.servicePeriodEnd,
          cancellationNoticeDays: extracted.cancellationNoticeDays,
          monitoringDate:         monitoringDate ? monitoringDate.toISOString().slice(0, 10) : null,
          contractClock:          contractClockFinding({
            servicePeriodEnd:       extracted.servicePeriodEnd,
            cancellationNoticeDays: extracted.cancellationNoticeDays,
            supplier:               categorized.normalizedSupplier || extracted.supplier,
          }),
          extracted: {
            supplier:               extracted.supplier,
            amount:                 extracted.amount,
            annualCost:             extracted.annualCost,
            recurringAmount:        extracted.recurringAmount,
            variableCharges:        extracted.variableCharges,
            oneTimeFees:            extracted.oneTimeFees,
            date:                   extracted.date,
            recurring:              extracted.recurring,
            seatCount:              extracted.seatCount ?? null,
            servicePeriodStart:     extracted.servicePeriodStart,
            servicePeriodEnd:       extracted.servicePeriodEnd,
            cancellationFeeExplicit: extracted.cancellationFeeExplicit ?? null,
          },
          categorized: {
            category:           categorized.category,
            subType:            categorized.subType,
            normalizedSupplier: categorized.normalizedSupplier,
            confidence:         categorized.confidence,
            licensePending:     categorized.licensePending ?? false,
          },
          timing,
        });
    }

    // Proxy-skydd: kategorier där antal anställda inte är en giltig kostnadsdrivare
    // ska aldrig få en automatisk besparingsberäkning — det vore vilseledande.
    const catDef = BRANCHINDEX[categorized.category];
    if (catDef?.requiresVolumeData) {
      const reason = catDef.volumeDataNote ?? 'Kräver volymdata för korrekt analys';
      notifyReviewQueue(extracted, `[Volymdata] ${reason}`).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue (volume) threw:', err.message)
      );

      // Spara kredit-fält i originalvaluta innan eventuell konvertering (visas med USD-etikett i UI).
      const creditBalance    = extracted.startupCreditBalance;
      const creditBurn       = extracted.startupCreditMonthlyBurn;
      const creditCurrency   = extracted.startupCreditCurrency;
      const creditExpiryDate = extracted.startupCreditExpiryDate ?? null;

      // USD-konvertering: requiresVolumeData-routen når aldrig recommend.js som normalt hanterar detta.
      // Cloud-fakturor med startup-krediter: annualCost = creditBurn × 12 är mer representativt
      // än recurringAmount × 12 (som bara fångar fast supportavgift, inte compute/lagring/DB).
      if (extracted.currency === 'USD') {
        const kv = getKv();
        const usdFx = await getSekRate(kv).catch(() => ({ rate: FALLBACK_RATE_USD_SEK, source: 'fallback', date: null }));
        const sekPerUsd = usdFx.rate ?? FALLBACK_RATE_USD_SEK;
        const cvt = (v) => (v != null ? Math.round(v * sekPerUsd) : null);
        extracted.currency        = 'SEK';
        extracted.fxRate          = sekPerUsd;
        extracted.annualCost      = creditBurn > 0
          ? Math.round(creditBurn * 12 * sekPerUsd)
          : cvt(extracted.annualCost);
        extracted.amount          = cvt(extracted.amount);
        extracted.recurringAmount = cvt(extracted.recurringAmount);
        extracted.variableCharges = cvt(extracted.variableCharges);
        extracted.oneTimeFees     = cvt(extracted.oneTimeFees);
        console.log(`[test-invoice] USD→SEK (requiresVolumeData): rate=${sekPerUsd} source=${usdFx.source} creditBurn=${creditBurn}`);
      }

      // Beräkna runway som det LÄGSTA av burn-rate och hårt utgångsdatum.
      // Om krediterna förfaller innan pengarna hinner förbrukas → varna om oanvänt belopp.
      const burnRateMonths = (creditBalance > 0 && creditBurn > 0)
        ? creditBalance / creditBurn
        : null;
      let creditExpiryMonths = burnRateMonths != null ? Math.round(burnRateMonths) : null;
      let creditWillExpireUnused = false;
      let creditUnusedAmount = null;

      if (creditExpiryDate && creditBalance > 0 && creditBurn > 0) {
        const msToExpiry   = new Date(creditExpiryDate) - new Date();
        const monthsToExpiry = msToExpiry / (1000 * 60 * 60 * 24 * 30.44);
        if (monthsToExpiry < burnRateMonths) {
          creditExpiryMonths   = Math.round(monthsToExpiry);
          const consumed       = Math.round(creditBurn * monthsToExpiry);
          creditUnusedAmount   = Math.max(0, Math.round(creditBalance - consumed));
          creditWillExpireUnused = creditUnusedAmount > 0;
        }
      }

      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: categorized.category ?? null,
        route: 'review_queue', reason: 'volume_data_required', userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: vi kan inte PRISSÄTTA kategorin mot antal anställda — vi kan läsa kundens rader. Dustin-fallet
        tillitTillRader: true,
        ok:     true,
        route:  'review_queue',
        reason: 'volume_data_required',
        volumeDataNote: reason,
        creditExpiryMonths,
        creditExpiryDate,
        creditWillExpireUnused,
        creditUnusedAmount,
        startupCreditBalance:     creditBalance ?? null,
        startupCreditMonthlyBurn: creditBurn ?? null,
        startupCreditCurrency:    creditCurrency ?? null,
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          annualCost:      extracted.annualCost,
          confidenceScore: extracted.confidenceScore,
          lineItems:       extracted.lineItems,
        },
        categorized: {
          category:           categorized.category,
          normalizedSupplier: categorized.normalizedSupplier,
        },
        timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
      });
    }

    // Ingen benchmark — kategori finns ej i branschindex. Skicka till review_queue
    // istället för att låta rekommenderaren hitta på siffror utan underlag.
    if (!catDef) {
      notifyReviewQueue(extracted, `[Ingen benchmark] Kategori '${categorized.category}' saknas i branschindex`).catch((e) =>
        console.error('[test-invoice] alert failed:', e.message)
      );
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier, category: categorized.category ?? null,
        route: 'review_queue', reason: 'no_benchmark', userEmail: body.userEmail }).catch(bokforFel);
      return svara({
        // tillit: kategorin saknas i branschindex; ingenting säger att avläsningen är fel
        tillitTillRader: true,
        ok:     true,
        route:  'review_queue',
        reason: 'no_benchmark',
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          annualCost:      extracted.annualCost,
          recurringAmount: extracted.recurringAmount,
          variableCharges: extracted.variableCharges,
          oneTimeFees:     extracted.oneTimeFees,
          recurring:       extracted.recurring,
          confidenceScore: extracted.confidenceScore,
          lineItems:       extracted.lineItems,
        },
        categorized: { category: categorized.category, normalizedSupplier: categorized.normalizedSupplier },
        timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
      });
    }

    // El-specifik deterministisk rekommendation — hoppar över AI-rekommenderaren
    if (categorized.category === 'el') {
      // ── Nätfaktura-guard: distributionsfaktura från nätägare (ej förhandlingsbar) ──
      // Nätavgiften är ett reglerat geografiskt monopol — ingen elleverantör kan påverka den.
      // Returnera specifikt unsupported-svar istället för att köra el-analysen.
      if (extracted.elInvoiceType === 'natavgift') {
        // ── BOKFÖR BEDÖMNINGEN (2026-08-14, efter Ellevio-fyndet) ───────────────────────────
        // Den här grinden var den ENDA av tio triage-utgångar som svarade ok:true utan att
        // skriva en rad. Följden syntes först i skarpt läge: en kund skickade tio fakturor,
        // fick nio i rummet, och den tionde försvann utan förklaring — trots att vi gjort det
        // vassaste draget i hela bunten och konstaterat att nätavgiften är ett reglerat
        // monopol ingen kan sänka. Beslutet var rätt; bokföringen saknades, och ett beslut
        // som inte bokförs är för kunden omöjligt att skilja från ett tapp.
        // Maskinvakt: tests/triage-bokforing.mjs kräver att VARJE triage-utgång skriver först.
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier,
          category: categorized.category ?? null, route: 'unsupported', reason: 'natavgift',
          userEmail: body.userEmail }).catch(bokforFel);
        timing.totalMs = Date.now() - t0;
        return svara({
          // tillit: nätavgift är ett reglerat monopol — rätt beslut att inte prissätta, raderna är korrekt lästa
          tillitTillRader: true,
          ok:     true,
          route:  'unsupported',
          reason: 'natavgift',
          extracted: {
            supplier: extracted.supplier,
            date:     extracted.date,
            amount:   extracted.amount,
          },
          categorized: {
            category:           categorized.category,
            normalizedSupplier: categorized.normalizedSupplier,
          },
          timing,
        });
      }

      // ── Fastprisavtal-lås: bundet elavtal med framtida slutdatum ─────────────
      // Fastprisavtal kan inte sägas upp i förtid — kunden är låst oavsett
      // uppsägningstid. Visa potentiell besparing men erbjud ej omedelbart byte.
      if (extracted.elContractType === 'fixed' && extracted.servicePeriodEnd) {
        const elEnd = new Date(extracted.servicePeriodEnd);
        if (elEnd > new Date()) {
          const elRec = computeElRecommendation(extracted, industry);
          const monDate = new Date(elEnd);
          monDate.setMonth(monDate.getMonth() - 3);
          const potentialSaving = elRec ? Math.max(0, elRec.grossSaving) : null;
          // ── BOKFÖR ÄVEN FRAMGÅNGEN (2026-08-15) ────────────────────────────────────────
          // Bokföringsplikten skrevs efter Ellevio-fallet och stängde tio TRIAGE-utgångar.
          // Den ställde aldrig frågan om FRAMGÅNGSutgångarna — och el-grenens två låg öppna:
          // den här (bundet fastprisavtal) och auto-utgången nedan. Ett bundet elavtal är
          // precis den rad kunden vill se i rummet: "vi vet att ni är låsta, och vi vet till
          // när". Utan raden ser det ut som att fakturan försvann.
          await storeAnalysis({
            fingerprint, pdfHash, extracted, categorized,
            recommendation: { shouldSwitch: false, reasoning: '' },
            route: 'monitoring', industry, employees: employeesNum,
            userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
          }).catch((err) => console.error('[test-invoice] storeAnalysis (el fastpris) failed:', err.message));
          timing.totalMs = Date.now() - t0;
          return svara({
            // tillit: lyckad avläsning av ett fastprisavtal; vi bevakar klockan
            tillitTillRader: true,
            ok: true, route: 'monitoring',
            contractLocked:         true,
            contractType:           'fixed_price',
            servicePeriodEnd:       extracted.servicePeriodEnd,
            cancellationNoticeDays: null,
            monitoringDate:         monDate.toISOString().slice(0, 10),
            potentialAnnualSaving:  potentialSaving,
            potentialSavingNote: elRec && potentialSaving > 0
              ? `Ert avtalspris: ${elRec.energiPerKwhGross.toFixed(2)} kr/kWh (jämförs mot marknadsindex exkl. energiskatt). Marknadens spotprisavtal i ${elRec.omrade} under ${elRec.season}: ca ${elRec.benchmarkKwh.toFixed(2)} kr/kWh. Potentiell nettobesparing när avtalet löper ut: ${Math.round(potentialSaving * 0.80).toLocaleString('sv-SE')} kr/år.`
              : null,
            extracted: {
              supplier:                extracted.supplier,
              amount:                  extracted.amount,
              annualCost:              elRec ? elRec.currentAnnualGross : extracted.annualCost,
              recurringAmount:         extracted.recurringAmount,
              date:                    extracted.date,
              lineItems:               extracted.lineItems,
              confidenceScore:         extracted.confidenceScore,
              elKwh:                   extracted.elKwh,
              elBillingMonth:          extracted.elBillingMonth,
              elOmrade:                elRec?.omrade ?? extracted.elOmrade,
              servicePeriodEnd:        extracted.servicePeriodEnd,
              cancellationFeeExplicit: extracted.cancellationFeeExplicit ?? null,
            },
            categorized: {
              category:           categorized.category,
              subType:            categorized.subType,
              normalizedSupplier: categorized.normalizedSupplier,
              confidence:         categorized.confidence,
            },
            recommendation: {
              shouldSwitch:        potentialSaving > 0,
              suggestedAnnualCost: elRec ? elRec.benchmarkAnnual : null,
              grossSaving:         potentialSaving,
              arvoFee:             potentialSaving ? feeOf(potentialSaving) : null,
              netSaving:           potentialSaving ? netOf(potentialSaving) : null,
            },
            timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
          });
        }
      }

      const elRec = computeElRecommendation(extracted, industry);
      if (!elRec) {
        // Samma klass som nätavgiften: elfakturan lästes, men underlaget räckte inte till en
        // rekommendation. Kunden ska se att vi tittat och varför vi tiger — inte en lucka.
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier,
          category: categorized.category ?? null, route: 'review_queue', reason: 'el_data_missing',
          userEmail: body.userEmail }).catch(bokforFel);
        return svara({
          // tillit: elfälten gick inte att läsa; kom extraktionen till korta på ETT fält litar vi inte på de andra
          tillitTillRader: false,
          ok: true, route: 'review_queue', reason: 'el_data_missing',
          extracted: {
            supplier: extracted.supplier, date: extracted.date,
            amount: extracted.amount, confidenceScore: extracted.confidenceScore,
            lineItems: extracted.lineItems,
          },
          categorized: {
            category: categorized.category,
            normalizedSupplier: categorized.normalizedSupplier,
          },
          timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
        });
      }
      timing.recommendMs = 0;
      timing.totalMs = Date.now() - t0;

      storeDatapoint({
        category: 'el', supplier: categorized.normalizedSupplier,
        annualCost: elRec.currentAnnualGross, industry, employees: employeesNum,
        segmentOkant,
      }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

      const { arvoFee, netSaving } = elRec;

      // ── DEN ALLVARLIGASTE LUCKAN AV ALLA (2026-08-15) ──────────────────────────────────
      // Den här grenen är en FULLSTÄNDIG, lyckad el-analys — och den skrev en anonym
      // datapunkt till branschpoolen (storeDatapoint ovan) utan att skriva en enda rad i
      // KUNDENS egen liggare. Vi lärde alltså av kundens faktura och gav ingenting tillbaka:
      // den syntes varken i innehavet, i scoren eller i räknarna. El är dessutom Nivå 1 —
      // kategorin vi lovar att faktiskt GENOMFÖRA bytet i (Switch-doktrinen). Att just den
      // aldrig landade i rummet är löftet utan mekanik i sin renaste form (regel 9).
      await storeAnalysis({
        fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
        pdfHash, extracted, categorized,
        recommendation: {
          shouldSwitch: elRec.shouldSwitch ?? (netSaving > 0),
          reasoning: '',
          grossSaving: elRec.grossSaving,
          netSaving,
        },
        route: 'auto', industry, employees: employeesNum,
        userEmail: typeof body.userEmail === 'string' ? body.userEmail.trim().toLowerCase() : null,
        seatCount: extracted.seatCount ?? null,
      }).catch((err) => console.error('[test-invoice] storeAnalysis (el auto) failed:', err.message));

      return svara({
        // tillit: fullständig, lyckad elanalys — fynden ska följa med
        tillitTillRader: true,
        ok: true, route: 'auto',
        extracted: {
          supplier:             extracted.supplier,
          amount:               extracted.amount,
          recurringAmount:      extracted.recurringAmount,
          variableCharges:      extracted.variableCharges,
          oneTimeFees:          extracted.oneTimeFees,
          annualCost:           elRec.currentAnnualGross,
          date:                 extracted.date,
          description:          extracted.description,
          billingPeriod:        extracted.billingPeriod,
          lineItems:            extracted.lineItems,
          recurring:            extracted.recurring,
          confidenceScore:      extracted.confidenceScore,
          notes:                extracted.notes,
          seatCount:            null,
          elKwh:                extracted.elKwh,
          elBillingMonth:       extracted.elBillingMonth,
          elOmrade:             elRec.omrade,
          elAnnualKwhEstimated: elRec.annualKwh,
          elUncertaintyNote:    elRec.uncertaintyNote,
          elSkatterKr:          extracted.elSkatterKr,
          elNatavgiftAnnual:    elRec.elNatavgiftAnnual > 0 ? elRec.elNatavgiftAnnual : null,
        },
        categorized: {
          category:           categorized.category,
          subType:            categorized.subType,
          normalizedSupplier: categorized.normalizedSupplier,
          confidence:         categorized.confidence,
          reasoning:          categorized.reasoning,
          licensePending:     categorized.licensePending,
        },
        recommendation: {
          shouldSwitch:        elRec.shouldSwitch,
          suggestedSupplier:   null,
          suggestedAnnualCost: elRec.suggestedAnnualCost,
          grossSaving:         elRec.grossSaving,
          arvoFee,
          netSaving,
          confidence:          0.72,
          reasoning:           elRec.reasoning,
          switchSteps:         elRec.shouldSwitch ? [
            'Arvo analyserar ert nuvarande elavtal och identifierar uppsägningstidpunkt',
            'Vi begär in offerter från kvalificerade elleverantörer med Arvo-volymrabatt',
            'Bästa erbjudandet presenteras — ni godkänner, Arvo sköter hela bytet',
          ] : [],
          licenseOverage:  null,
          overageSavings:  null,
          monitoringNote:  elRec.monitoringNote ?? null,
        },
        timing,
      });
    }

    // Pre-compute like-for-like target so recommend() can give the AI correct
    // pricing context before generating reasoning (price gap, not tier change).
    //
    // ── DEN MÖRKA LÅSNINGEN, RÄTTAD 2026-08-12 (regel 1 + Verifieringsplikten p.5) ──────────────
    // Här låg en LOKAL KOPIA av like-for-like-matten med egen tier-regex. Kopian räknade rätt
    // TOTAL men byggde ett fattigare objekt: { suggestedAnnualCost, dominantTierKey } — utan
    // tierLines. Två konsekvenser, båda osynliga i sviten:
    //   1. Attribueringslåset (buildLikeForLikeReasoning) returnerar null utan tierLines. Det har
    //      alltså ALDRIG fyrat i produktion sedan det byggdes — AI:ns egen text nådde varje kund,
    //      vilket är exakt 683-felklassen bibeln förklarat stängd.
    //   2. Promptblocket "LIKE-FOR-LIKE PRISSÄTTNING — ANVÄND EXAKT DESSA TAL" itererar över
    //      tierLines och renderades tomt: AI:n beordrades hämta varje siffra ordagrant ur en tom
    //      lista, och förbjöds räkna egna. Ett omöjligt uppdrag besvaras med en gissning.
    // Sviten låste `computeLikeForLikeSaasTarget` med 1 276 gröna tester — en funktion produktionen
    // aldrig anropade. Mekanismen var bevisad, signalen rörde sig aldrig. Samma sjukdom som
    // villkorsvakten. Mätt och bevisat av scripts/probe-lfl-produktionsvag.mjs.
    // Kopian är borta. Produktionen kör nu samma funktion som sviten låser — och därmed också
    // dess prorata-korrigering (CR-88412) och per-tier-avrundning, som kopian saknade.
    let _lflTarget = null;
    if (categorized.category === 'saas-productivity') {
      _lflTarget = computeLikeForLikeSaasTarget(
        extracted.lineItems ?? [],
        BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {},
        extracted.annualCost,
      );
    }

    const t2 = Date.now();
    const recommendation = await recommend({
      // EN beräkning per faktura (regel 1): kuvertet räknades före triage-grenarna, och
      // recommend() får den i stället för att räkna om samma rader en andra gång. Två
      // beräkningar av samma sak i produktionsvägen är LFL-felets form.
      forensik: _forensik,
      customer: { industry, employees: employeesNum, revenue: revenueNum },
      invoice: {
        amount:              extracted.amount,
        annualCost:          extracted.annualCost,
        recurringAmount:     extracted.recurringAmount,
        variableCharges:     extracted.variableCharges,
        seatCount:           extracted.seatCount ?? null,
        mobileAddonMonthly:          metrics.mobileAddonMonthly,
        broadbandAddonMonthly:       metrics.broadbandAddonMonthly,
        primaryComponentMonthly:     metrics.primaryComponentMonthly,
        secondaryComponentMonthly:   metrics.secondaryComponentMonthly,
        secondaryConnectionSpeedMbit: metrics.secondaryConnectionSpeedMbit,
        secondarySeatCount:          metrics.secondarySeatCount,
        secondarySaving,
        potentialMixedCategories:    extracted.potentialMixedCategories ?? false,
        connectionSpeedMbit: extracted.connectionSpeedMbit ?? null,
        licenseType:         extracted.licenseType ?? null,
        billingCycleType:    extracted.billingCycleType ?? null,
        pricePerSeatMonthly: extracted.pricePerSeatMonthly ?? null,
        saasProductFamily:    extracted.saasProductFamily ?? null,
        saasIncludedFeatures: extracted.saasIncludedFeatures ?? null,
        description:          extracted.description ?? null,
        lineItems:            extracted.lineItems ?? null,
        likeForLikeTarget:    _lflTarget,
        // Observationerna som avstämningsgrinden lever på. Skickas orörda vidare — normalisering
        // eller default här hade uppfunnit just det grinden finns för att kräva.
        currency:             extracted.currency ?? null,
        momsbas:              extracted.momsbas ?? null,
        billingPeriod:        extracted.billingPeriod ?? null,
        priceHistoryContext:  priceHistoryContext ?? null,
      },
      categorized,
    });
    timing.recommendMs = Date.now() - t2;
    timing.totalMs = Date.now() - t0;
    {
      const u = recommendation.usage ?? {};
      // Opus 4.7: $15/MTok in, $75/MTok out, $18.75/MTok cache-write, $1.50/MTok cache-read
      const cost = (
        (u.input_tokens ?? 0) * 15 +
        (u.output_tokens ?? 0) * 75 +
        (u.cache_creation_input_tokens ?? 0) * 18.75 +
        (u.cache_read_input_tokens ?? 0) * 1.5
      ) / 1_000_000;
      console.log('[tokens] recommend:', JSON.stringify({
        input: u.input_tokens,
        output: u.output_tokens,
        cache_write: u.cache_creation_input_tokens ?? 0,
        cache_read: u.cache_read_input_tokens ?? 0,
        cost_usd: cost.toFixed(4),
      }));
    }

    // Rad-först-skuggan (fas 1): mäter flerkategori-verkligheten per analys.
    // Ren instrumentering — påverkar aldrig svar eller lagring (regel 1-säkrad).
    try { console.log(shadowReport(extracted.lineItems, categorized.category)); } catch {}

    // Fire-and-forget — lagrar anonymiserad datapunkt för branschindex.
    // Felet får aldrig blockera svaret till kunden.
    storeDatapoint({
      category: categorized.category,
      supplier: categorized.normalizedSupplier,
      annualCost: extracted.annualCost ?? extracted.amount,
      industry,
      employees: employeesNum,
      segmentOkant,
      seatCount: extracted.seatCount ?? null,
    }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

    // ── DEN EFTERHANDS-ÖVERSKRIVANDE GISSNINGSMOTORN — RIVEN 2026-08-12 ───────────────────────
    // Här låg ett block som körde EFTER recommend() och skrev över kundens siffror med en tredje
    // lokal kopia av like-for-like-matten. Det var inte en cache-försäkring (som kommentaren
    // påstod) utan en parallell sanning med tre konkreta brott:
    //
    //   1. TALET. Kopian saknade prorata-korrigeringen (CR-88412) och per-tier-avrundningen.
    //      På en faktura med prorata-rader räknade den ett ANNAT suggestedAnnualCost än den text
    //      attribueringslåset skrev — kortets prosa och kortets siffra hade skilda upphov.
    //   2. MÅLET. Den satte `suggestedSupplier` ur en textgissad tier och skrev därmed över den
    //      lås-rad recommend.js sätter med uttrycklig motivering (buggen 2026-06-28: koden räknar
    //      → koden namnger målet). Ett lås som skrivs över nedströms är inget lås.
    //      Målnamnet härleds nu ur SAMMA beräkning som talet (recommend.js).
    //   3. RÅDET. `tierOptimizationSaving` var en grövre andraversion av `m365Rightsizing` —
    //      samma råd, två ytor, två tal (regel 5). Den deterministiska, testlåsta modulen står
    //      kvar och renderas i sitt eget kort; accordion-dubbletten är borta.
    //
    // Ingen siffra försvann: recommend.js räknar redan suggestedAnnualCost/savingPerYear ur
    // likeForLikeTarget. Det som försvann var en andra åsikt om samma faktura.

    // Strip any residual "Arvo CSP" language from AI-generated reasoning.
    if (recommendation.reasoning) {
      recommendation.reasoning = recommendation.reasoning
        .replace(/\bArvo\s+CSP[-\s]?partner\b/gi, 'Microsoft årsavtal')
        .replace(/\bArvo\s+CSP\b/gi, 'Microsoft årsavtal')
        .replace(/\bvia\s+CSP\b/gi, 'via Microsoft årsavtal')
        .replace(/\bCSP[-\s]?avtal\b/gi, 'Microsoft årsavtal');
    }

    // ── FINANSIELL SANITY-GUARD ───────────────────────────────────────────────────
    // Förhindrar logiskt inkonsekvent rekommendation från att nå frontend:
    //   (1) shouldSwitch=true kräver att föreslagen kostnad är strikt lägre än nuläget.
    //   (2) shouldSwitch=true kräver positiv sammanslagen bruttobesparing.
    // Kombinerad faktura: primär säger "ingen åtgärd" men sekundär har besparing.
    // Utan denna override stannar shouldSwitch=false → "Optimalt" trots att
    // bredbandskomponenten kan spara t.ex. 7 788 kr/år.
    // suggestedAnnualCost sätts till primärkomponentens nuvarande kostnad
    // (ingen förändring där) — sekundärens suggestedAnnual adderas nedan.
    if (!recommendation.shouldSwitch && (secondarySaving?.grossSaving ?? 0) > 0) {
      recommendation.shouldSwitch        = true;
      recommendation.savingPerYear       = 0;
      recommendation.suggestedAnnualCost = Math.round((metrics.primaryComponentMonthly ?? 0) * 12);
      console.log(`[secondary-override] shouldSwitch=true via sekundär besparing ${secondarySaving.grossSaving} kr/år (${secondarySaving.category})`);
    }

    // Körs EFTER alla deterministiska overrides (saas-productivity, el) så att vi
    // validerar de slutliga värdena, inte mellantillståndet från AI:n.
    if (recommendation.shouldSwitch) {
      const _annCost  = extracted.annualCost ?? 0;
      const _suggCost = recommendation.suggestedAnnualCost ?? 0;
      if (_annCost > 0 && _suggCost > 0 && _suggCost >= _annCost) {
        console.error(`[guard:finansiell] suggestedAnnualCost(${_suggCost}) >= annualCost(${_annCost}) — override shouldSwitch=false`);
        recommendation.shouldSwitch        = false;
        recommendation.suggestedAnnualCost = null;
        recommendation.savingPerYear       = 0;
        // Grinden nollade beslutet men lät ETIKETTEN stå (obduktionen 2026-08-21). Det är samma
        // mekanism som fällde tre ytor den 19 augusti: ett tillstånd nollas på ett ställe medan
        // ett annat fält behåller det gamla påståendet.
        recommendation.recommendationType  = 'no_action';
      }
    }
    if (recommendation.shouldSwitch) {
      const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
      const _secGross  = secondarySaving?.grossSaving ?? 0;
      if (_primGross + _secGross <= 0) {
        console.error(`[guard:finansiell] Ingen positiv besparing (prim=${_primGross} sek=${_secGross}) — override shouldSwitch=false`);
        recommendation.shouldSwitch = false;
        recommendation.recommendationType = 'no_action';
      }
    }

    // ── LAGER 3: ADVERSARIAL HAIKU SANITY CHECK ──────────────────────────────────
    // En AI kontrollerar en annan AI. Fångar orimliga besparingssiffror som
    // passerat extraktorn och rekommenderaren men inte håller i verkligheten.
    // Fail-open: infrastrukturfel blockerar aldrig en korrekt analys.
    if (recommendation.shouldSwitch && (extracted.annualCost ?? 0) > 0) {
      const _savingPct = Math.round(
        ((recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0)
          / extracted.annualCost) * 100
      );
      const sanity = await verifySanity({
        category:  categorized.category,
        annualCost: extracted.annualCost,
        savingPct: _savingPct,
        supplier:  categorized.normalizedSupplier ?? extracted.supplier,
        benchmarkSource: recommendation.benchmark?.source,   // verifierat listpris → Haiku hoppas över
      });
      if (!sanity.pass) {
        console.error(`[sanity] BLOCKED method=${sanity.method} reason=${sanity.reason}`);
        notifyReviewQueue(extracted, `[Sanity ${sanity.method}] ${categorized.category}: saving=${_savingPct}% flaggad som orimlig — reason=${sanity.reason}`).catch(() => {});
        // DEN VIKTIGASTE AV DE TRE ATT BOKFÖRA: här fångade vi OSS SJÄLVA på väg att påstå en
        // orimlig besparing. Utan raden går det inte att mäta hur ofta sanitetsvakten fyrar, och
        // en kvalitetsvakt vars utfall aldrig räknas är en vakt vi inte kan förbättra. Vi lärde
        // oss samma sak av smyghöjningen: ett larm som ingen mäter blir förr eller senare avstängt.
        await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, lineItems: extracted.lineItems, supplier: extracted.supplier,
          category: categorized.category ?? null, route: 'review_queue', reason: 'sanity_check_failed',
          userEmail: body.userEmail }).catch(bokforFel);
        timing.totalMs = Date.now() - t0;
        return svara({
          // tillit: sanitetsvakten fångade OSS på väg att påstå en orimlig besparing
          tillitTillRader: false,
          ok: true, route: 'review_queue', reason: 'sanity_check_failed',
          sanityMethod: sanity.method,
          extracted: {
            supplier:        extracted.supplier,
            date:            extracted.date,
            amount:          extracted.amount,
            confidenceScore: extracted.confidenceScore,
          },
          timing,
        });
      }
    }

    // Kombinera primär och sekundär besparing till en samlad nettosiffra.
    const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const secondaryGross = secondarySaving?.grossSaving ?? 0;
    const grossSaving    = primaryGross + secondaryGross;
    const arvoFee        = categorized.licensePending ? 0 : feeOf(grossSaving);
    const netSaving      = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

    // Fee-zonen (lib/fee.js — EN sanning): backend emitterar FÄRDIGA netto/arvode
    // för varje besparingskanal. Frontend renderar, räknar aldrig (×0,80-läxan;
    // maskinvakt: claims-audit klassregeln på *aving*-aritmetik i src/).
    if ((recommendation.tierOptimizationSaving ?? 0) > 0) {
      recommendation.tierOptimizationFee       = feeOf(recommendation.tierOptimizationSaving);
      recommendation.tierOptimizationNetSaving = netOf(recommendation.tierOptimizationSaving);
    }
    if ((recommendation.optimizationSaving ?? 0) > 0) {
      recommendation.optimizationFee       = feeOf(recommendation.optimizationSaving);
      recommendation.optimizationNetSaving = netOf(recommendation.optimizationSaving);
    }


    // Lagrar fullständig analys och returnerar analysisId för avtalsbevakning.
    // Placerad efter alla overrides så att grossSaving/netSaving är slutgiltiga värden.
    const analysisId = await storeAnalysis({
      fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
      pdfHash,
      extracted,
      categorized,
      recommendation: { ...recommendation, grossSaving, netSaving },
      route: 'auto',
      industry,
      employees: employeesNum,
      userEmail: typeof body.userEmail === 'string' ? body.userEmail.trim().toLowerCase() : null,
      seatCount: extracted.seatCount ?? null,
    }).catch((err) => { console.error('[test-invoice] storeAnalysis failed:', err.message); return null; });

    // Prissignal: smyghöjning-detektering mot verifierade listpriser (fire-and-forget).
    // Aktiveras om pricePerSeatMonthly finns och leverantören finns i supplier_prices.
    // marketIntel aktiveras vid ≥3 analyserade fakturor för samma leverantör i databasen.
    let priceAlert = null;
    let marketIntel = null;
    if (extracted.pricePerSeatMonthly && categorized.normalizedSupplier) {
      [priceAlert, marketIntel] = await Promise.all([
        detectPriceAlert({
          normalizedSupplier:  categorized.normalizedSupplier,
          pricePerSeatMonthly: extracted.pricePerSeatMonthly,
          category:            categorized.category,
          // Radtexterna bär nivån. Utan dem kan golvet inte veta VILKEN produkt kunden har, och
          // en kategori med stort spann (saas 9,6×) mäter då produktvalet i stället för priset.
          lineItems:           extracted.lineItems,
        }).catch(() => null),
        getMarketIntelligence({
          normalizedSupplier: categorized.normalizedSupplier,
          category:           categorized.category,
        }).catch(() => null),
      ]);
    }

    // Fas 3–4: Invoice graph — spara leverantörs- och prisdata (fire-and-forget)
    if (extracted.annualCost > 0 && categorized.normalizedSupplier) {
      (async () => {
        try {
          const invoiceDate = extracted.date ?? new Date().toISOString().slice(0, 10);
          const segment     = INDUSTRY_SEGMENT_MAP[industry] ?? industry;
          const sizeBucket  = bucketForSize(employeesNum);
          const supplierId  = await upsertSupplier({
            name:           extracted.supplier ?? categorized.normalizedSupplier,
            normalizedName: categorized.normalizedSupplier,
            category:       categorized.category,
          });
          if (supplierId) {
            await recordSupplierPrice({
              supplierId,
              segment,
              sizeBucket,
              pricePerSeat:  extracted.seatCount > 0
                ? Math.round(extracted.annualCost / extracted.seatCount)
                : null,
              annualCost:    extracted.annualCost,
              seats:         extracted.seatCount ?? null,
              invoiceDate,
            });
            await recordContractTimeline({
              analysisId: analysisId ?? null,
              supplierId,
              seats:       extracted.seatCount ?? null,
              annualCost:  extracted.annualCost,
              invoiceDate,
            });
          }
          // Uppdatera labeled_corrections med rätt analysisId om integrity overrides sparades
          // (analysisId var okänt vid tidpunkten för integrity-sparbara — ignoreras här,
          //  corrections läggs till med null analysisId vilket är OK för mönsteranalys)
        } catch (err) {
          console.warn('[invoice-graph] record failed:', err.message);
        }
      })();
    }

    // Broadband-tillägg (statisk IP etc.) på mobil-primär faktura — pass-through i suggestedAnnualCost.
    const _bbAddonPassthrough = categorized.category === 'mobil'
      ? Math.round((metrics.broadbandAddonMonthly ?? 0) * 12)
      : 0;

    // Hårdvarujusteringen (lib/hardware-installments.js — FLYTTAD från frontend):
    // delbetald hårdvara är en skuld som följer kunden vid byte — besparingsbasen,
    // arvodet, nettot och break-even räknas HÄR och emitteras färdiga. Jämförelsen
    // görs mot SAMMA suggestedAnnualCost som svaret bär (inkl. sekundär + addon-
    // passthrough på kombifakturor) — identiskt med hur kundytan räknade tidigare.
    const _responseSuggested = secondarySaving
      ? (recommendation.suggestedAnnualCost ?? 0) + secondarySaving.suggestedAnnual + _bbAddonPassthrough
      : (recommendation.suggestedAnnualCost ?? null);
    const hardwareAdjustment = computeHardwareAdjustment({
      lineItems:           extracted.lineItems,
      annualCost:          extracted.annualCost,
      suggestedAnnualCost: _responseSuggested,
      shouldSwitch:        recommendation.shouldSwitch === true,
    });

    // ── P2.1: BERÄKNINGSKEDJA (Calculation Chain) ────────────────────────────────
    // Visar exakt hur varje siffra härletts — nuläge, benchmark, besparing, arvode.
    // Kunden kan verifiera varje steg. Bygger förtroende och möjliggör extern revision.
    const _benchIntel = getBenchmarkBasis({
      normalizedSupplier: categorized.normalizedSupplier,
      seatCount:          extracted.seatCount,
      suggestedAnnualCost: recommendation.suggestedAnnualCost,
      tierKey:            null,
    });
    // ── PROVENIENSEN LÄSES UR DET SOM RÄKNADE (obduktionen 2026-08-20) ────────────────────────
    // Raden läste tidigare BRANCHINDEX[kategori].source — den STATISKA tabellraden. Men
    // jämförelsepriset kommer ur recommend.js: antingen like-for-like mot licenseTierBenchmarks,
    // eller benchmark.p25, vars läsväg FÖREDRAR livedata (invoice_datapoints 'real' och
    // invoice_analyses 'live_analyses', båda isTotal). Tabellraden sa 'real-public' oavsett —
    // så en jämförelse som vilade på andra bolags totalsummor fick ändå bocken «verifierat
    // publikt listpris» och listprisets SMALARE konfidensintervall (±12 % i stället för ±25 %).
    // Rätt siffra kanske, fel proveniens — vilket regel 3 räknar som fel — med överdriven
    // precision ovanpå. Buggfixen i juli rörde exakt den här raden och bytte `priceSource` mot
    // `source`: rätt fältnamn på fel objekt lämnade felet på plats.
    //
    // Fail-closed: en väg som inte bokför sin källa får ingen bock. Bocken är ett påstående om
    // proveniens, och ett påstående utan underlag ska utebli (regel 3/4) — inte antas.
    const _kalla = recommendation.jamforelseKalla ?? null;
    const _benchmarkType = _kalla?.listprisanspraak === true ? 'real-public' : 'negotiated-target';

    // B4 · listpris-domen i kvittot: prisbokens verkliga proveniens blir en kvittorad.
    // Endast 'real-public' förtjänar bocken (verifierat publikt listpris) — ett märkt
    // estimat får ALDRIG en bock (regel 3/4, prisbokens semantik). Raden emitteras bara
    // när en jämförelse faktiskt görs (suggestedAnnualCost finns).
    // OCH RESERVKORTETS LÄXA (2026-08-15) EN GÅNG TILL: ej_provbar-raden sa ALLTID «ett märkt
    // branschestimat». Det var ett påstått skäl, inte ett känt. Är källan livedata är underlaget
    // STARKARE än ett estimat — det är bara inte ett listpris — och är den obokförd vet vi inte
    // alls. En rad som talar om varför vi avstår måste säga det sanna skälet eller inget skäl.
    if (Array.isArray(routing.verifications) && recommendation.suggestedAnnualCost != null) {
      if (_benchmarkType === 'real-public') {
        routing.verifications.push({
          id: 'listpris', status: 'ok',
          detalj: `jämförelsepriset är ett verifierat publikt listpris (verifierat ${_kalla.lastVerified})`,
        });
      } else {
        const _skal = _kalla == null
          ? 'jämförelsens källa är inte bokförd — inget listprisanspråk görs'
          : _kalla.isTotal
            ? 'jämförelsepriset kommer ur andra bolags totalkostnader, inte ur ett listpris'
            : _kalla.source === 'estimated' || _kalla.source === 'mock'
              ? 'jämförelsepriset är ett märkt branschestimat — inget listprisanspråk'
              : _kalla.lastVerified == null
                ? 'jämförelsepriset saknar verifieringsdatum — odaterat pris kallas aldrig verifierat'
                : `jämförelsepriset kommer ur källan «${_kalla.source}» — inget publikt listprisanspråk`;
        routing.verifications.push({ id: 'listpris', status: 'ej_provbar', detalj: _skal });
      }
    }

    const calculationChain = {
      currentAnnualCost: {
        value:  extracted.annualCost,
        source: extracted.billingPeriod === 'annual'
          ? 'Direkt från faktura'
          : 'Projicerat från fakturaperiodens återkommande rader',
      },
      benchmarkAnnualCost: recommendation.suggestedAnnualCost ? {
        value:         recommendation.suggestedAnnualCost,
        formula:       _benchIntel?.formula ?? null,
        source:        _benchIntel?.source
          ?? (_benchmarkType === 'real-public'
            ? 'Arvo-verifierade offentliga listpriser'
            : 'Arvo branschindex (maj 2026)'),
        benchmarkType: _benchmarkType,
      } : null,
      grossSaving: { value: grossSaving },
      arvoFee:     { value: arvoFee,    formula: `${grossSaving?.toLocaleString('sv-SE')} kr × ${Math.round(ARVO_FEE_RATE * 100)} %` },
      netSaving:   { value: netSaving },
    };

    // ── P2.2: KONFIDENSINTERVALL (Saving Range) ───────────────────────────────────
    // Visar ett ärligt intervall istället för en enda punktskattning.
    // Kategori 1 (listpriser): ±12 % | Kategori 2 (förhandlade): ±25 %
    const _rangeFactor = _benchmarkType === 'real-public' ? 0.12 : 0.25;
    const savingRange = netSaving > 0 ? {
      low:   Math.max(0, Math.round(netSaving * (1 - _rangeFactor))),
      high:  Math.round(netSaving * (1 + _rangeFactor)),
      basis: _benchmarkType,
    } : null;

    // ── P2.3: VERSIONMETADATA ────────────────────────────────────────────────────
    // Varje analys stämplas med modellversion, benchmarkversion och tidpunkt.
    // Möjliggör revision, A/B-jämförelse och spårbarhet vid modellbyten.
    const analysisMeta = {
      analyzedAt:       new Date().toISOString(),
      pipelineVersion:  PIPELINE_VERSION,
      models: {
        extract:    EXTRACT_MODEL,
        categorize: CATEGORIZE_MODEL,
        recommend:  RECOMMEND_MODEL,
      },
      branchindexVersion: '2026-05',
    };

    // Kontraktsklockan (Maktkalendern): bindningsslut ur kundens egen faktura → ledande
    // bevaknings-fynd även på rekommendationsbärande fakturor (terminala avtalslås fångas
    // separat av monitoring-rutten ovan). EN källa: lib/contract-clock.js. Zero Trust —
    // null när fakturan inte uttalar ett verkligt framtida bindningsslut.
    const contractClock = (!categorized.licensePending)
      ? contractClockFinding({
          servicePeriodEnd:       extracted.servicePeriodEnd,
          cancellationNoticeDays: extracted.cancellationNoticeDays,
          supplier:               categorized.normalizedSupplier || extracted.supplier,
        })
      : null;

    // triage-ok: huvudvägens bokföring sker i `const analysisId = await storeAnalysis({…})` ovan,
    // placerad där för att grossSaving/netSaving ska vara slutgiltiga efter alla overrides. Den
    // ligger drygt 200 rader före det här svarsobjektet, alltså utanför vaktens sökfönster — och
    // fönstret ska INTE vidgas: då kan en utgång låna FÖREGÅENDE utgångs bokföring och vakten blir
    // grön på fel grund. Undantaget är motiverat här, i koden, precis som claims-audit kräver.
    const autoResponse = {
      ok:    true,
      route: 'auto',
      fakturanummerSkal,
      contractClock,
      extracted: {
        supplier:        extracted.supplier,
        amount:          extracted.amount,
        recurringAmount: extracted.recurringAmount,
        variableCharges: extracted.variableCharges,
        oneTimeFees:     extracted.oneTimeFees,
        annualCost:      extracted.annualCost,
        date:            extracted.date,
        description:     extracted.description,
        servicePeriodStart:  extracted.servicePeriodStart ?? null,
        servicePeriodEnd:    extracted.servicePeriodEnd ?? null,
        cancellationNoticeDays: extracted.cancellationNoticeDays ?? null,
        billingPeriod:       extracted.billingPeriod,
        billingPeriodSource: extracted.billingPeriodSource,
        billingPeriodAssumed: extracted.billingPeriodAssumed ?? false,
        billingPeriodStart:  extracted.billingPeriodStart ?? null,
        billingPeriodEnd:    extracted.billingPeriodEnd   ?? null,
        lineItems:       extracted.lineItems,
        recurring:       extracted.recurring,
        confidenceScore:           extracted.confidenceScore,
        notes:                     extracted.notes,
        seatCount:                 extracted.seatCount ?? null,
        connectionSpeedMbit:       extracted.connectionSpeedMbit ?? null,
        potentialMixedCategories:  extracted.potentialMixedCategories ?? false,
        primaryComponentMonthly:   metrics.primaryComponentMonthly,
        licenseType:               extracted.licenseType ?? null,
        billingCycleType:          extracted.billingCycleType ?? null,
        pricePerSeatMonthly:       extracted.pricePerSeatMonthly ?? null,
        saasProductFamily:         extracted.saasProductFamily ?? null,
        saasIncludedFeatures:      extracted.saasIncludedFeatures ?? null,
      },
      categorized: {
        category: categorized.category,
        subType: categorized.subType,
        normalizedSupplier: categorized.normalizedSupplier,
        confidence: categorized.confidence,
        reasoning: categorized.reasoning,
        licensePending: categorized.licensePending,
      },
      recommendation: {
        // INVARIANT, inte en fallback: `??` lät ett 'switch' som recommend.js satt stå kvar efter
        // att grinden nollat beslutet — live-svaret bar «switch» tillsammans med grossSaving 0.
        // Ingen kundyta läser just 'switch' i dag, så ingen lögn syntes; men svaret lagras och
        // läses av sonder, mail och framtida ytor. Ett fält som kan motsäga sitt eget beslut är
        // ett fel som väntar på en yta (regel 3). 'switch' kräver numera ett levande bytesbeslut.
        recommendationType: (recommendation.recommendationType === 'switch' && recommendation.shouldSwitch !== true)
          ? 'no_action'
          : (recommendation.recommendationType ?? (recommendation.shouldSwitch ? 'switch' : 'no_action')),
        optimizationSaving: recommendation.optimizationSaving ?? null,
        optimizationFee:       recommendation.optimizationFee       ?? null,
        optimizationNetSaving: recommendation.optimizationNetSaving ?? null,
        requiresQuote: recommendation.requiresQuote ?? false,
        shouldSwitch: recommendation.shouldSwitch,
        suggestedSupplier: recommendation.suggestedSupplier ?? null,
        suggestedAnnualCost: _responseSuggested,
        secondarySaving: secondarySaving ?? null,
        grossSaving,
        arvoFee,
        netSaving,
        confidence: recommendation.confidence,
        reasoning: (recommendation.reasoning ?? '').replace(/\s*\}\}+\s*$/, '').trim(),
        switchSteps: recommendation.switchSteps ?? [],
        // EN sanning: licenseOverage/overageSavings/shelfware kommer uteslutande från
        // recommend.js shelfware-modellen (rådgivande revisor) — aldrig en lokal omräkning
        // av seatCount−employees här (det var regel 1-brottet: naivt gap som "svinn").
        licenseOverage: recommendation.licenseOverage ?? null,
        overageSavings: recommendation.overageSavings ?? null,
        shelfware:      recommendation.shelfware ?? null,
        fortnoxRightsizing: recommendation.fortnoxRightsizing ?? null,
        annualBillingSaving: recommendation.annualBillingSaving ?? null,
        nonPrimaryAnnual:    recommendation.nonPrimaryAnnual ?? 0,
        tierOptimizationSaving:   recommendation.tierOptimizationSaving   ?? null,
        tierOptimizationFee:       recommendation.tierOptimizationFee       ?? null,
        tierOptimizationNetSaving: recommendation.tierOptimizationNetSaving ?? null,
        tierOptimizationFromTier: recommendation.tierOptimizationFromTier ?? null,
        tierOptimizationToTier:   recommendation.tierOptimizationToTier   ?? null,
        clickRateAnalysis:        recommendation.clickRateAnalysis        ?? null,
        // Forensik-inversionen (regel 2: kod räknar): mekanism-fyndet ur kundens egen
        // fakturarad. Beräknas i recommend.js men serialiserades inte hit — utan dessa
        // två fält ritar FindingCard i testa-faktura tomt. Zero Trust, får rida med alltid.
        leadFinding:      recommendation.leadFinding      ?? null,
        forensicFindings: recommendation.forensicFindings ?? null,
        // Jämförelsens proveniens (2026-08-20). Beviset bakom kvittoraden och intervallbredden —
        // vilken källa som bar talet, vilket datum den verifierades och om den är en totalsumma.
        // Ett bevis som ingen kan se är inget bevis; och live-sonden kunde tidigare inte läsa
        // prisboken ur den utlagda servern alls, för `benchmark` serialiserades aldrig hit.
        jamforelseKalla:  recommendation.jamforelseKalla ?? null,
      },
      calculationChain,
      savingRange,
      priceAlert:   priceAlert   ?? null,
      marketIntel:  marketIntel  ?? null,
      // B4 · verifikationskvittot: grindarnas VERKLIGA domslut (routeExtraction
      // emitterar dem — UI:t får aldrig påstå en kontroll som inte körde).
      verifications: routing.verifications ?? [],
      // Hårdvarujusteringen: färdigräknade justerade tal (null = ingen justering).
      hardwareAdjustment: hardwareAdjustment ?? null,
      meta: analysisMeta,
      timing,
      analysisId: analysisId ?? undefined,
    };

    // Saving gate: kontrollera kvot efter analysen (vi behöver netSaving och orgNumber).
    // Vitlistade IPs (ägare/intern) hoppar över gate precis som rate limit.
    // grindPausad(): grundarbeslut 2026-09-05 — e-postgrinden öppen t.o.m. 6 sep 18:00 UTC, sedan
    // stänger fönstret sig självt (lib/grindpaus.js). Att bara pausa frontendens modal hade varit
    // en halv öppning: servern hade fortsatt svara `gate: true` efter 25 000 kr kumulativ
    // besparing, och testet hade tagit slut mitt i utan att någon förstod varför.
    // Rate limit och globaltak står KVAR — det som pausas är kravet på e-postadress, aldrig
    // kostnadsskyddet.
    if (!isBypass && !isWhitelisted) {
      const kv = getKv();
      // grindPausad() ligger HÄR INNE och inte i villkoret ovan, med flit: cacheskrivningen tre
      // rader ned bor i samma block, och en paus av e-postgrinden får inte råka slå av
      // PDF-cachen. Första versionen av den här ändringen gjorde precis det.
      // Konsekvens, uttalad: under fönstret räknas heller inga savegate-summor upp — grinden är
      // av, alltså mäter den inte. Det är innebörden av beslutet, inte en bieffekt.
      if (!grindPausad()) {
        const gateHit = await checkSavingGate(kv, {
          orgNumber: extracted.customerOrgNumber,
          email: typeof email === 'string' ? email : null,
          netSaving,
        });
        if (gateHit) {
          return svara({
            // tillit: lyckad analys som nått besparingsgrinden
            tillitTillRader: true,
            ...autoResponse,
            gate: true,
            gateType: 'saving_limit',
          });
        }
      }
      // PDF-fingerprintcache: lagra resultatet för 24h så identiska fakturor
      // returneras direkt utan att köra AI-pipelinen igen.
      if (kv) kv.set(cacheKey, autoResponse, { ex: PDF_CACHE_TTL }).catch(() => {});
    }

    // Sista utgången går samma väg som de sexton andra — annars är det den som glöms nästa gång.
    // tillit: fullständig, lyckad analys; forensiken är redan räknad och bor i autoResponse.
    return svara({ ...autoResponse, tillitTillRader: true });
  } catch (err) {
    const isKnown =
      err instanceof ExtractorError
      || err instanceof CategorizerError
      || err instanceof RecommenderError;
    return send(res, isKnown ? 422 : 500, {
      error: err.message ?? 'Internt fel',
      // Maskinläsbart skäl (2026-08-18). Kundens mening är vänlig och opersonlig — men ett svar
      // utan skäl gör felet omöjligt att skilja från nästa. `kod` sätts av det led som faktiskt
      // vet varför (t.ex. model_401 / model_429), aldrig gissat här.
      kod: err.kod ?? undefined,
      stage:
        err instanceof ExtractorError ? 'extract'
        : err instanceof CategorizerError ? 'categorize'
        : err instanceof RecommenderError ? 'recommend'
        : 'unknown',
    });
  } finally {
    clearTimeout(timeoutHandle);
  }
}
