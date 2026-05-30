// api/test-invoice.mjs
// Vercel Serverless Function — kör hela pipelinen extract → categorize → recommend.
// Frontend POSTar JSON { pdfBase64, industry, employees, revenue? }.
//
// Vercel-konfig (vercel.json): maxDuration: 60. På Hobby-plan är gränsen 10s
// Deploy: 2026-05-26 — saas tier detection fix + M365-priser från microsoft.com
// vilket sannolikt inte räcker — Pro krävs för publik exponering.

import { Resend } from 'resend';
import { createHmac, createHash } from 'node:crypto';
import { extractInvoice, routeExtraction, ExtractorError, CONFIDENCE_THRESHOLD } from '../agents/test-invoice/extract.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { categorize, CategorizerError } from '../agents/categorizer/categorize.js';
import { recommend, RecommenderError } from '../agents/recommender/recommend.js';
import { storeDatapoint } from '../lib/benchmark.js';
import { BRANCHINDEX, INDUSTRY_SEGMENT_MAP, bucketForSize } from '../agents/recommender/branchindex.js';
import { getKv } from '../lib/kv.js';
import { getDb } from '../lib/db.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';
import { getEurSekRate, FALLBACK_RATE_EUR_SEK, getSekRate, FALLBACK_RATE_USD_SEK } from '../agents/recommender/pricing.js';
import { computeElRecommendation, NATAVGIFT_RE } from '../lib/el-recommendation.js';
import { checkSupplierFingerprint } from '../lib/supplier-fingerprints.js';
import { verifySanity } from '../lib/sanity-verifier.js';
import { storeAnalysis } from '../lib/invoice-store.js';

const FROM_ALERT     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const ALERT_TO       = process.env.ARVO_ALERT_EMAIL ?? 'team@arvo-flow.se';
const PDF_CACHE_TTL         = 6 * 60 * 60;       // 6 h (GDPR-avvägning: kortare retain)
const GATE_WINDOW_TTL       = 30 * 24 * 60 * 60; // 30 dagar
const FREE_SAVING_ANALYSES  = 2;                  // Alltid fria analyser med besparing
const SAVING_GATE_THRESHOLD = 25_000;             // Kr kumulativ nettobesparing
const PIPELINE_TIMEOUT_MS = 55_000;             // 5 s marginal mot Vercels 60 s hard kill
const RATE_LIMIT_MAX        = 5;                  // Max analyser per IP per 24h
const RATE_WINDOW_TTL       = 24 * 60 * 60;      // 24 timmar

// ── IP-baserad rate limiting ──────────────────────────────────────────────────
async function checkRateLimit(kv, ip) {
  if (!kv || !ip) return false;
  const key = `ratelimit:ip:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
  try {
    const count = (await kv.get(key)) ?? 0;
    if (count >= RATE_LIMIT_MAX) return true;
    await kv.set(key, count + 1, { ex: RATE_WINDOW_TTL });
  } catch {
    // Non-fatal — låt analysen gå igenom om KV failar
  }
  return false;
}

// ── HMAC-tokenvalidering ──────────────────────────────────────────────────────
function validateToken(token) {
  const secret = process.env.ARVO_HMAC_SECRET;
  if (!secret) return true; // dev-läge utan konfigurerad secret
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
  // isBypass: hoppar över token-validering, PDF-cache, rate limit och saving gate.
  // Kräver ARVO_BYPASS_SECRET i miljön — ingen hårdkodad dev-sträng.
  const isBypass = !!(bypass && typeof bypass === 'string'
    && process.env.ARVO_BYPASS_SECRET
    && bypass === process.env.ARVO_BYPASS_SECRET);

  if (!isBypass) {
    if (!validateToken(token)) {
      return send(res, 401, { error: 'Ogiltig session — ladda om sidan och försök igen.' });
    }

    const kv = getKv();

    // IP-baserad rate limiting: max 5 analyser per IP per 24h
    const clientIp = (req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? '').split(',')[0].trim();
    if (await checkRateLimit(kv, clientIp)) {
      return send(res, 429, {
        error: 'Du har analyserat för många fakturor idag. Försök igen imorgon eller kontakta oss för att utöka din kvot.',
        rateLimited: true,
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
        return send(res, 200, {
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
        return send(res, 200, {
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

    if (!categorized.licensePending && categorized.category !== 'el' && _hasActivePeriod && _isPastLockDeadline) {
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

      return send(res, 200, {
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
      // ── Nätfaktura-guard: distributionsfaktura från nätägare (ej förhandlingsbar) ──
      // Nätavgiften är ett reglerat geografiskt monopol — ingen elleverantör kan påverka den.
      // Returnera specifikt unsupported-svar istället för att köra el-analysen.
      if (extracted.elInvoiceType === 'natavgift') {
        timing.totalMs = Date.now() - t0;
        return send(res, 200, {
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
              arvoFee:             potentialSaving ? Math.round(potentialSaving * 0.20) : null,
              netSaving:           potentialSaving ? Math.round(potentialSaving * 0.80) : null,
            },
            timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
          });
        }
      }

      const elRec = computeElRecommendation(extracted, industry);
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
        annualCost: elRec.currentAnnualGross, industry, employees: employeesNum,
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
      }
    }
    if (recommendation.shouldSwitch) {
      const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
      const _secGross  = secondarySaving?.grossSaving ?? 0;
      if (_primGross + _secGross <= 0) {
        console.error(`[guard:finansiell] Ingen positiv besparing (prim=${_primGross} sek=${_secGross}) — override shouldSwitch=false`);
        recommendation.shouldSwitch = false;
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
      });
      if (!sanity.pass) {
        console.error(`[sanity] BLOCKED method=${sanity.method} reason=${sanity.reason}`);
        notifyReviewQueue(extracted, `[Sanity ${sanity.method}] ${categorized.category}: saving=${_savingPct}% flaggad som orimlig — reason=${sanity.reason}`).catch(() => {});
        timing.totalMs = Date.now() - t0;
        return send(res, 200, {
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
    const arvoFee        = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
    const netSaving      = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

    // Fire-and-forget — lagrar fullständig analys för portföljvyn.
    // Placerad efter alla overrides så att grossSaving/netSaving är slutgiltiga värden.
    storeAnalysis({
      fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
      pdfHash,
      extracted,
      categorized,
      recommendation: { ...recommendation, grossSaving, netSaving },
      route: 'auto',
      industry,
      employees: employeesNum,
    }).catch((err) => console.error('[test-invoice] storeAnalysis failed:', err.message));

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
