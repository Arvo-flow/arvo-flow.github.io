// api/test-invoice.mjs
// Vercel Serverless Function — kör hela pipelinen extract → categorize → recommend.
// Frontend POSTar JSON { pdfBase64, industry, employees, revenue? }.
//
// Vercel-konfig (vercel.json): maxDuration: 60. På Hobby-plan är gränsen 10s
// Deploy: 2026-05-26 — saas tier detection fix + M365-priser från microsoft.com
// vilket sannolikt inte räcker — Pro krävs för publik exponering.

import { Resend } from 'resend';
import { createHmac, createHash } from 'node:crypto';
import { extractInvoice, routeExtraction, ExtractorError } from '../agents/test-invoice/extract.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { categorize, CategorizerError } from '../agents/categorizer/categorize.js';
import { recommend, RecommenderError } from '../agents/recommender/recommend.js';
import { storeDatapoint } from '../lib/benchmark.js';
import { BRANCHINDEX, INDUSTRY_SEGMENT_MAP, bucketForSize } from '../agents/recommender/branchindex.js';
import { getKv } from '../lib/kv.js';
import { getDb } from '../lib/db.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';
import { getEurSekRate, FALLBACK_RATE_EUR_SEK } from '../agents/recommender/pricing.js';

const FROM_ALERT     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const ALERT_TO       = process.env.ARVO_ALERT_EMAIL ?? 'team@arvo-flow.se';
const PDF_CACHE_TTL         = 6 * 60 * 60;       // 6 h (GDPR-avvägning: kortare retain)
const GATE_WINDOW_TTL       = 30 * 24 * 60 * 60; // 30 dagar
const FREE_SAVING_ANALYSES  = 2;                  // Alltid fria analyser med besparing
const SAVING_GATE_THRESHOLD = 25_000;             // Kr kumulativ nettobesparing
const PIPELINE_TIMEOUT_MS = 55_000;             // 5 s marginal mot Vercels 60 s hard kill

// ── HMAC-tokenvalidering ──────────────────────────────────────────────────────
function validateToken(token) {
  const secret = process.env.ARVO_HMAC_SECRET;
  if (!secret || token === 'dev') return true; // dev-läge
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [ts, nonce, sig] = parts;
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < 0 || age > 3_600_000) return false;
  const expected = createHmac('sha256', secret).update(`${ts}.${nonce}`).digest('hex');
  return sig === expected;
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

// ── El-specifik säsongslogik ──────────────────────────────────────────────

// Svenska och engelska månadsnamn → säsong
const MONTH_TO_SEASON = {
  'januari': 'winter',    'februari': 'winter',
  'november': 'winter',   'december': 'winter',
  'mars': 'spring_fall',  'april': 'spring_fall',
  'september': 'spring_fall', 'oktober': 'spring_fall',
  'maj': 'summer',  'juni': 'summer', 'juli': 'summer', 'augusti': 'summer',
  'january': 'winter',  'february': 'winter',
  'march': 'spring_fall', 'october': 'spring_fall',
  'may': 'summer', 'june': 'summer', 'july': 'summer', 'august': 'summer',
};

// Exakta bråk: 1/9 + 1/12 + 1/18 = 4/9+4/12+4/18 över 12 månader = 1.00
// annual_kwh = monthly_kwh × multiplier
const SEASON_MULTIPLIER = { winter: 9, spring_fall: 12, summer: 18 };

// Swedish Energiskatt + elcertifikat (lagstadgade avgifter 2025/2026).
// Används när fakturan visar ett totalpris per kWh utan separat Energiskatt-rad.
// Källa: Skatteverket och Energimarknadsinspektionen.
//   Energiskatt: 0.419 kr/kWh (standard 2026, reducerat för industri)
//   Elcertifikat: ca 0.005 kr/kWh
const ENERGISKATT_ESTIMATE_KWH = 0.424;

// Benchmark: marknadsgenomsnittet för välförhandlade spotprisavtal (kr/kWh, energidel).
// Exkluderar nätavgift, energiskatt, elcertifikat (ej förhandlingsbara).
// Interna MVP-estimat — uppdateras med riktig aggregerad fakturadata.
const EL_BENCHMARK_KWH = {
  SE1: { winter: 0.82, spring_fall: 0.55, summer: 0.34 },
  SE2: { winter: 0.88, spring_fall: 0.58, summer: 0.37 },
  SE3: { winter: 0.95, spring_fall: 0.63, summer: 0.40 },
  SE4: { winter: 1.05, spring_fall: 0.70, summer: 0.44 },
};

// Matchar nätägarens avgifter på elfakturan (inte förhandlingsbara — beror på elnätsleverantör).
const NATAVGIFT_RE = /nätavg|elnät|överföringsavg|nätabon|kapacitetsavg|effektavg|nätoperatör/i;

function computeElRecommendation(extracted) {
  const kwh    = extracted.elKwh;
  const month  = (extracted.elBillingMonth ?? '').toLowerCase().trim();
  const omrade = ['SE1', 'SE2', 'SE3', 'SE4'].includes(extracted.elOmrade)
    ? extracted.elOmrade : 'SE3';

  if (!kwh || kwh <= 0) return null;

  const season     = MONTH_TO_SEASON[month] ?? 'spring_fall';
  const multiplier = SEASON_MULTIPLIER[season];
  const annualKwh  = Math.round(kwh * multiplier);

  // Identifiera nätavgift från radposter — den är inte valbar och ska inte
  // ingå i energiprisjämförelsen.
  const lineItems = extracted.lineItems ?? [];
  const natavgiftMonthly = lineItems
    .filter(li => li.type === 'recurring_subscription' && NATAVGIFT_RE.test(li.description))
    .reduce((sum, li) => sum + (li.amount ?? 0), 0);
  const elNatavgiftAnnual = Math.round(natavgiftMonthly * multiplier);

  // Energipris per kWh (energidel exkl. nätavgift och skatter).
  // Föredrar explicit extraktion. Fallbacken subtraherar nätavgift ur
  // recurringAmount för att undvika att nätägarens avgifter räknas med.
  let energiPerKwh = extracted.elEnergiPerKwh;
  const elPriceDerived = extracted.elPriceExplicit !== true;
  if (!(energiPerKwh > 0) && extracted.recurringAmount > 0) {
    const switchableRecurring = Math.max(0, extracted.recurringAmount - natavgiftMonthly);
    energiPerKwh = (switchableRecurring > 0 ? switchableRecurring : extracted.recurringAmount) / kwh;
  }
  if (!(energiPerKwh > 0)) return null;

  // Energiskatt-justering: när ingen separat Energiskatt-rad finns på fakturan (elSkatterKr == null)
  // är lagstadgad Energiskatt (~0.424 kr/kWh) inbakad i det visade kr/kWh-priset.
  // Benchmarken är nettopris exkl. skatter — vi måste subtrahera Energiskatt för korrekt jämförelse.
  // Signal: explicitt kr/kWh-pris + inget elSkatterKr = Energiskatt inbakad.
  const energiskattEmbedded = extracted.elPriceExplicit === true && !(extracted.elSkatterKr > 0);
  const energiPerKwhNet = energiskattEmbedded
    ? Math.max(0, energiPerKwh - ENERGISKATT_ESTIMATE_KWH)
    : energiPerKwh;

  const fastAvgift     = extracted.elFastAvgiftKr ?? 0;
  const currentAnnual  = Math.round(energiPerKwhNet * annualKwh) + fastAvgift * 12;
  const benchmarkKwh   = (EL_BENCHMARK_KWH[omrade] ?? EL_BENCHMARK_KWH.SE3)[season];
  const benchmarkAnnual = Math.round(benchmarkKwh * annualKwh);
  const grossSaving    = Math.max(0, currentAnnual - benchmarkAnnual);
  const shouldSwitch   = grossSaving >= 500;
  const arvoFee        = Math.round(grossSaving * 0.20);
  const netSaving      = grossSaving - arvoFee;

  const seasonLabel  = { winter: 'vinter', spring_fall: 'vår/höst', summer: 'sommar' }[season];
  const seasonContext = {
    winter:      'vinterförbrukning är normalt högre än årsgenomsnittet',
    spring_fall: 'vår/höst-förbrukning speglar årsgenomsnittet väl',
    summer:      'sommarförbrukning är normalt lägre än årsgenomsnittet',
  }[season];
  const monthLabel   = extracted.elBillingMonth ?? 'fakturamånad';
  const mwhEstimate  = Math.round(annualKwh / 100) / 10;

  const monitoringNote = !shouldSwitch
    ? `Arvo rekommenderar kvartalsmässig genomgång av ert elavtal — spotpriset varierar säsongsvis och ett byte kan bli lönsamt om marknadsläget förändras.`
    : null;

  const energiskattNote = energiskattEmbedded
    ? `Fakturan visar inget separat Energiskatt-belopp — Arvo har exkluderat uppskattad Energiskatt (ca ${ENERGISKATT_ESTIMATE_KWH.toFixed(2)} kr/kWh) ur prisberäkningen för korrekt jämförelse med marknadsnotering.`
    : null;

  return {
    annualKwh, currentAnnual, benchmarkAnnual, grossSaving, arvoFee, netSaving, shouldSwitch,
    omrade, season: seasonLabel, billingMonth: monthLabel, energiPerKwh: energiPerKwhNet, benchmarkKwh,
    elNatavgiftAnnual,
    monitoringNote,
    suggestedAnnualCost: shouldSwitch ? benchmarkAnnual : null,
    reasoning: shouldSwitch
      ? `Er faktura visar ${energiPerKwhNet.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel} (energidel exkl. nätavgift och energiskatt). Arvo bedömer att ett välförhandlat spotprisavtal i ${omrade} under ${seasonLabel} bör ligga kring ${benchmarkKwh.toFixed(2)} kr/kWh. På uppskattad årsförbrukning om ${mwhEstimate} MWh innebär det en bruttobesparing på ca ${grossSaving.toLocaleString('sv-SE')} kr/år — er nettobesparing efter Arvos besparingsarvode (20 %): ${netSaving.toLocaleString('sv-SE')} kr/år.`
      : `Er faktura visar ${energiPerKwhNet.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel} (energidel exkl. nätavgift och energiskatt). Marknadsgenomsnittet för välförhandlade spotprisavtal i ${omrade} under ${seasonLabel} är ca ${benchmarkKwh.toFixed(2)} kr/kWh. Ni ligger redan under marknadsgenomsnittet — ert nuvarande avtal verkar konkurrenskraftigt.`,
    uncertaintyNote: [
      `Årsförbrukning ${mwhEstimate} MWh är uppskattad från ${monthLabel}s ${kwh.toLocaleString('sv-SE')} kWh, justerat för att ${seasonContext}. Faktisk årsförbrukning kan avvika ±30–40 %.`,
      elPriceDerived ? 'Elpriset är beräknat som fakturabelopp / kWh — en explicit kr/kWh-rad saknas på fakturan.' : null,
      energiskattNote,
    ].filter(Boolean).join(' '),
  };
}

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
  // v2: invaliderar v1-cache (bredband secondary savings ej med i gamla svar)
  const cacheKey = `pdf:result:v2:${pdfHash}:e${employeesNum}`;
  // isBypass: hoppar över token-validering, PDF-cache och saving gate.
  // Accepterar ARVO_BYPASS_SECRET från miljön (production) ELLER 'dev' (intern testning).
  const isBypass = bypass === 'dev'
    || !!(bypass && typeof bypass === 'string'
      && process.env.ARVO_BYPASS_SECRET
      && bypass === process.env.ARVO_BYPASS_SECRET);

  if (!isBypass) {
    if (!validateToken(token)) {
      return send(res, 401, { error: 'Ogiltig session — ladda om sidan och försök igen.' });
    }

    // PDF-fingerprintcache: identisk faktura inom 24h → returnera cachat svar
    const kv = getKv();
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
    const extracted = await extractInvoice({ pdfBytes });
    timing.extractMs = Date.now() - t0;
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

    // Guard: kreditnotor (negativt totalt fakturabelopp)
    if (extracted.amount < 0) {
      return send(res, 200, {
        ok: true, route: 'unsupported', reason: 'credit_note',
        extracted: { supplier: extracted.supplier, date: extracted.date },
        categorized: { category: 'uncategorized' },
        recommendation: { shouldSwitch: false, reasoning: '' },
        timing: { extractMs: timing.extractMs },
      });
    }

    // Guard: utländsk valuta
    // EUR → konverteras till SEK med live Riksbanken/ECB-kurs och fortsätter pipeline.
    // USD → hanteras redan av recommend.js via live-kurs (Atlassian, Zoom, Slack etc.).
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
    } else if (extracted.currency && !['SEK', 'USD'].includes(extracted.currency)) {
      notifyReviewQueue(extracted, `[Utländsk valuta] ${extracted.currency}`).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue (currency) threw:', err.message)
      );
      return send(res, 200, {
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

    // Triage — review_queue eller unsupported avbryter pipeline
    const routing = routeExtraction(extracted);

    if (routing.route === 'review_queue') {
      // Fire-and-forget — skickar internt larm utan att blockera kundsvaret
      notifyReviewQueue(extracted, routing.reason).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue threw:', err.message)
      );
      return send(res, 200, {
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
      return send(res, 200, {
        ok:    true,
        route: 'unsupported',
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

    if (!categorized.licensePending && _hasActivePeriod && _isPastLockDeadline) {
      const monitoringDate = new Date(_periodEnd);
      monitoringDate.setMonth(monitoringDate.getMonth() - 3);
      timing.totalMs = Date.now() - t0;
        return send(res, 200, {
          ok:    true,
          route: 'monitoring',
          contractLocked:         true,
          servicePeriodEnd:       extracted.servicePeriodEnd,
          cancellationNoticeDays: extracted.cancellationNoticeDays,
          monitoringDate:         monitoringDate ? monitoringDate.toISOString().slice(0, 10) : null,
          extracted: {
            supplier:           extracted.supplier,
            amount:             extracted.amount,
            annualCost:         extracted.annualCost,
            recurringAmount:    extracted.recurringAmount,
            variableCharges:    extracted.variableCharges,
            oneTimeFees:        extracted.oneTimeFees,
            date:               extracted.date,
            recurring:          extracted.recurring,
            seatCount:          extracted.seatCount ?? null,
            servicePeriodStart: extracted.servicePeriodStart,
            servicePeriodEnd:   extracted.servicePeriodEnd,
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
      const creditBalance = extracted.startupCreditBalance;
      const creditBurn    = extracted.startupCreditMonthlyBurn;
      const creditExpiryMonths = (creditBalance > 0 && creditBurn > 0)
        ? Math.round(creditBalance / creditBurn)
        : null;
      return send(res, 200, {
        ok:     true,
        route:  'review_queue',
        reason: 'volume_data_required',
        volumeDataNote: reason,
        creditExpiryMonths,
        startupCreditBalance:     creditBalance ?? null,
        startupCreditMonthlyBurn: creditBurn ?? null,
        startupCreditCurrency:    extracted.startupCreditCurrency ?? null,
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
      return send(res, 200, {
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
      // ── Fastprisavtal-lås: bundet elavtal med framtida slutdatum ─────────────
      // Fastprisavtal kan inte sägas upp i förtid — kunden är låst oavsett
      // uppsägningstid. Visa potentiell besparing men erbjud ej omedelbart byte.
      if (extracted.elContractType === 'fixed' && extracted.servicePeriodEnd) {
        const elEnd = new Date(extracted.servicePeriodEnd);
        if (elEnd > new Date()) {
          const elRec = computeElRecommendation(extracted);
          const monDate = new Date(elEnd);
          monDate.setMonth(monDate.getMonth() - 3);
          const potentialSaving = elRec ? Math.max(0, elRec.grossSaving) : null;
          timing.totalMs = Date.now() - t0;
          return send(res, 200, {
            ok: true, route: 'monitoring',
            contractLocked:         true,
            contractType:           'fixed_price',
            servicePeriodEnd:       extracted.servicePeriodEnd,
            cancellationNoticeDays: null,
            monitoringDate:         monDate.toISOString().slice(0, 10),
            potentialAnnualSaving:  potentialSaving,
            potentialSavingNote: elRec && potentialSaving > 0
              ? `Nuvarande fastpris: ${elRec.energiPerKwh.toFixed(3)} kr/kWh. Marknadens spotprisavtal i ${elRec.omrade} under ${elRec.season}: ca ${elRec.benchmarkKwh.toFixed(2)} kr/kWh. Potentiell besparing när avtalet löper ut: ${potentialSaving.toLocaleString('sv-SE')} kr/år (netto ${Math.round(potentialSaving * 0.80).toLocaleString('sv-SE')} kr efter Arvos arvode).`
              : null,
            extracted: {
              supplier:        extracted.supplier,
              amount:          extracted.amount,
              annualCost:      elRec ? elRec.currentAnnual : extracted.annualCost,
              recurringAmount: extracted.recurringAmount,
              date:            extracted.date,
              lineItems:       extracted.lineItems,
              confidenceScore: extracted.confidenceScore,
              elKwh:           extracted.elKwh,
              elBillingMonth:  extracted.elBillingMonth,
              elOmrade:        elRec?.omrade ?? extracted.elOmrade,
              servicePeriodEnd: extracted.servicePeriodEnd,
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
              arvoFee:             potentialSaving ? Math.round(potentialSaving * 0.20) : null,
              netSaving:           potentialSaving ? Math.round(potentialSaving * 0.80) : null,
            },
            timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
          });
        }
      }

      const elRec = computeElRecommendation(extracted);
      if (!elRec) {
        return send(res, 200, {
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
        annualCost: elRec.currentAnnual, industry, employees: employeesNum,
      }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

      const { arvoFee, netSaving } = elRec;

      return send(res, 200, {
        ok: true, route: 'auto',
        extracted: {
          supplier:             extracted.supplier,
          amount:               extracted.amount,
          recurringAmount:      extracted.recurringAmount,
          variableCharges:      extracted.variableCharges,
          oneTimeFees:          extracted.oneTimeFees,
          annualCost:           elRec.currentAnnual,
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
    let _lflTarget = null;
    if (categorized.category === 'saas-productivity') {
      const _LFL_TIER_RE = [
        { key: 'e5',               re: /\bE5\b/i },
        { key: 'e3',               re: /\bE3\b/i },
        { key: 'business-premium', re: /business[\s-]premium/i },
        { key: 'business-standard',re: /business[\s-]standard/i },
        { key: 'business-basic',   re: /business[\s-]basic/i },
      ];
      const _lflTierBm    = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {};
      const _lflLines     = (extracted.lineItems ?? []).filter(l => l.type === 'recurring_subscription');
      const _lflPeriodTot = _lflLines.reduce((s, l) => s + (l.amount ?? 0), 0);
      const _lflMult      = _lflPeriodTot > 0 ? extracted.annualCost / _lflPeriodTot : 12;
      let _lflSuggested = 0, _lflOk = true, _lflDomKey = null, _lflDomAmt = 0;
      for (const item of _lflLines) {
        const m = _LFL_TIER_RE.find(p => p.re.test(item.description ?? ''));
        if (m && _lflTierBm[m.key]) {
          if (item.quantity == null) { _lflOk = false; break; }
          const bm = _lflTierBm[m.key].arvoAnnual ?? _lflTierBm[m.key].msrpAnnual;
          _lflSuggested += Math.round(bm * item.quantity * 12);
          if ((item.amount ?? 0) > _lflDomAmt) { _lflDomAmt = item.amount; _lflDomKey = m.key; }
        } else {
          _lflSuggested += Math.round((item.amount ?? 0) * _lflMult);
        }
      }
      if (_lflOk && _lflSuggested > 0) {
        _lflTarget = { suggestedAnnualCost: _lflSuggested, dominantTierKey: _lflDomKey };
      }
    }

    const t2 = Date.now();
    const recommendation = await recommend({
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
      },
      categorized,
    });
    timing.recommendMs = Date.now() - t2;
    timing.totalMs = Date.now() - t0;

    // Fire-and-forget — lagrar anonymiserad datapunkt för branschindex.
    // Felet får aldrig blockera svaret till kunden.
    storeDatapoint({
      category: categorized.category,
      supplier: categorized.normalizedSupplier,
      annualCost: extracted.annualCost ?? extracted.amount,
      industry,
      employees: employeesNum,
    }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

    // ── SAAS-PRODUCTIVITY LIKE-FOR-LIKE OVERRIDE ─────────────────────────────
    // Guarantees correct M365 pricing reaches Vercel regardless of bundle cache.
    // Rule: mirror the customer's license mix exactly — never downgrade a tier.
    // Premium stays Premium, Basic stays Basic. Add-ons pass through at invoice price.
    // Falls back gracefully when lineItems lack quantity (older extractions).
    if (categorized.category === 'saas-productivity' && recommendation?.shouldSwitch) {
      const _TIER_RE = [
        { key: 'e5',               re: /\bE5\b/i },
        { key: 'e3',               re: /\bE3\b/i },
        { key: 'business-premium', re: /business[\s-]premium/i },
        { key: 'business-standard',re: /business[\s-]standard/i },
        { key: 'business-basic',   re: /business[\s-]basic/i },
      ];
      const _tierBm      = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {};
      const _lines       = (extracted.lineItems ?? []).filter(l => l.type === 'recurring_subscription');
      const _annualCost  = extracted.annualCost ?? 0;
      const _periodTotal = _lines.reduce((s, l) => s + (l.amount ?? 0), 0);
      const _billMult    = _periodTotal > 0 ? _annualCost / _periodTotal : 12;

      let _suggestedAnnual   = 0;
      let _allQtyKnown       = true;
      let _dominantKey       = null;
      let _dominantAmt       = 0;

      for (const item of _lines) {
        const match = _TIER_RE.find(p => p.re.test(item.description ?? ''));
        if (match && _tierBm[match.key]) {
          const qty = item.quantity;
          if (qty == null) { _allQtyKnown = false; break; }
          const benchMonthly = _tierBm[match.key].arvoAnnual ?? _tierBm[match.key].msrpAnnual;
          const tierAnnual   = Math.round(benchMonthly * qty * 12);
          _suggestedAnnual  += tierAnnual;
          if ((item.amount ?? 0) > _dominantAmt) { _dominantAmt = item.amount; _dominantKey = match.key; }
        } else {
          _suggestedAnnual += Math.round((item.amount ?? 0) * _billMult);
        }
      }

      if (_allQtyKnown && _suggestedAnnual > 0) {
        recommendation.suggestedAnnualCost = _suggestedAnnual;
        recommendation.savingPerYear       = Math.max(0, _annualCost - _suggestedAnnual);

        const _tierLabels = {
          'business-premium':  'Microsoft 365 Business Premium',
          'business-standard': 'Microsoft 365 Business Standard',
          'business-basic':    'Microsoft 365 Business Basic',
          'e3':                'Microsoft 365 E3',
          'e5':                'Microsoft 365 E5',
        };
        if (_dominantKey && _tierLabels[_dominantKey]) {
          recommendation.suggestedSupplier = _tierLabels[_dominantKey];
        }

        // Advisory: how much more could they save by also downgrading tier?
        const _DG_MAP = { 'business-premium': 'business-standard', 'e3': 'business-premium', 'e5': 'e3' };
        const _dgToKey = _dominantKey ? _DG_MAP[_dominantKey] : null;
        if (_dgToKey && _dgToKey !== _dominantKey) {
          let _dgSuggested = 0;
          let _dgOk = true;
          for (const item of _lines) {
            const m = _TIER_RE.find(p => p.re.test(item.description ?? ''));
            if (m && _tierBm[m.key]) {
              const dgKey = _DG_MAP[m.key] ?? m.key;
              const dgBm  = _tierBm[dgKey];
              if (!dgBm) { _dgOk = false; break; }
              _dgSuggested += Math.round((dgBm.arvoAnnual ?? dgBm.msrpAnnual) * item.quantity * 12);
            } else {
              _dgSuggested += Math.round((item.amount ?? 0) * _billMult);
            }
          }
          if (_dgOk && _dgSuggested > 0) {
            const _dgTotal    = Math.max(0, _annualCost - _dgSuggested);
            const _additional = Math.max(0, _dgTotal - recommendation.savingPerYear);
            if (_additional > 0) {
              recommendation.tierOptimizationSaving   = _additional;
              recommendation.tierOptimizationFromTier = _dominantKey;
              recommendation.tierOptimizationToTier   = _dgToKey;
            }
          }
        }
      }
    }

    // Strip any residual "Arvo CSP" language from AI-generated reasoning.
    if (recommendation.reasoning) {
      recommendation.reasoning = recommendation.reasoning
        .replace(/\bArvo\s+CSP[-\s]?partner\b/gi, 'Microsoft årsavtal')
        .replace(/\bArvo\s+CSP\b/gi, 'Microsoft årsavtal')
        .replace(/\bvia\s+CSP\b/gi, 'via Microsoft årsavtal')
        .replace(/\bCSP[-\s]?avtal\b/gi, 'Microsoft årsavtal');
    }

    // Kombinera primär och sekundär besparing till en samlad nettosiffra.
    const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const secondaryGross = secondarySaving?.grossSaving ?? 0;
    const grossSaving    = primaryGross + secondaryGross;
    const arvoFee        = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
    const netSaving      = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

    // Broadband-tillägg (statisk IP etc.) på mobil-primär faktura — pass-through i suggestedAnnualCost.
    const _bbAddonPassthrough = categorized.category === 'mobil'
      ? Math.round((metrics.broadbandAddonMonthly ?? 0) * 12)
      : 0;

    const autoResponse = {
      ok:    true,
      route: 'auto',
      extracted: {
        supplier:        extracted.supplier,
        amount:          extracted.amount,
        recurringAmount: extracted.recurringAmount,
        variableCharges: extracted.variableCharges,
        oneTimeFees:     extracted.oneTimeFees,
        annualCost:      extracted.annualCost,
        date:            extracted.date,
        description:     extracted.description,
        billingPeriod:   extracted.billingPeriod,
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
        recommendationType: recommendation.recommendationType ?? (recommendation.shouldSwitch ? 'switch' : 'no_action'),
        optimizationSaving: recommendation.optimizationSaving ?? null,
        requiresQuote: recommendation.requiresQuote ?? false,
        shouldSwitch: recommendation.shouldSwitch,
        suggestedSupplier: recommendation.suggestedSupplier ?? null,
        suggestedAnnualCost: secondarySaving
          ? (recommendation.suggestedAnnualCost ?? 0) + secondarySaving.suggestedAnnual + _bbAddonPassthrough
          : recommendation.suggestedAnnualCost ?? null,
        secondarySaving: secondarySaving ?? null,
        grossSaving,
        arvoFee,
        netSaving,
        confidence: recommendation.confidence,
        reasoning: (recommendation.reasoning ?? '').replace(/\s*\}\}+\s*$/, '').trim(),
        switchSteps: recommendation.switchSteps ?? [],
        licenseOverage: (extracted.seatCount != null && extracted.seatCount > employeesNum)
          ? extracted.seatCount - employeesNum
          : null,
        overageSavings: recommendation.overageSavings ?? null,
        annualBillingSaving: recommendation.annualBillingSaving ?? null,
        nonPrimaryAnnual:    recommendation.nonPrimaryAnnual ?? 0,
        tierOptimizationSaving:   recommendation.tierOptimizationSaving   ?? null,
        tierOptimizationFromTier: recommendation.tierOptimizationFromTier ?? null,
        tierOptimizationToTier:   recommendation.tierOptimizationToTier   ?? null,
        clickRateAnalysis:        recommendation.clickRateAnalysis        ?? null,
      },
      timing,
    };

    // Saving gate: kontrollera kvot efter analysen (vi behöver netSaving och orgNumber).
    if (!isBypass) {
      const kv = getKv();
      const gateHit = await checkSavingGate(kv, {
        orgNumber: extracted.customerOrgNumber,
        email: typeof email === 'string' ? email : null,
        netSaving,
      });
      if (gateHit) {
        return send(res, 200, {
          ...autoResponse,
          gate: true,
          gateType: 'saving_limit',
        });
      }
      // PDF-fingerprintcache: lagra resultatet för 24h så identiska fakturor
      // returneras direkt utan att köra AI-pipelinen igen.
      if (kv) kv.set(cacheKey, autoResponse, { ex: PDF_CACHE_TTL }).catch(() => {});
    }

    return send(res, 200, autoResponse);
  } catch (err) {
    const isKnown =
      err instanceof ExtractorError
      || err instanceof CategorizerError
      || err instanceof RecommenderError;
    return send(res, isKnown ? 422 : 500, {
      error: err.message ?? 'Internt fel',
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
