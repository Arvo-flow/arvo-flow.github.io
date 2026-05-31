// lib/sanity-verifier.js
// Lager 3: Adversarial Haiku-verifiering.
// En AI kontrollerar en annan AI — fångar orimliga besparingssiffror
// som passerar extraktorn och rekommenderaren men inte håller i verkligheten.
//
// Design:
//  1. Deterministisk guard (ingen API-anrop) — filtrerar uppenbart fel
//  2. Haiku-anrop för mellanfallets — snabbt, billigt, ~1 s latens
//  3. Fail-open vid timeout/fel — blockerar aldrig korrekt analys pga infrastruktur

import Anthropic from '@anthropic-ai/sdk';

const HAIKU_MODEL = 'claude-haiku-4-5-20251001';
const HAIKU_TIMEOUT_MS = 5_000;
const SEAT_ORACLE_TIMEOUT_MS = 7_000;

// Övre rimlighetsgräns per kategori (procent).
// Kalibrerad mot svenska marknadsvillkor och Arvos befintliga besparingsspann.
// Höj bara om vi ser verkliga kundfall som överstiger gränsen.
const MAX_SAVING_PCT = {
  'mobil':              60,
  'bredband':           65,
  'vaxel':              55,
  'saas-productivity':  50,
  'saas-crm':           55,
  'saas-finance':       55,
  'saas-other':         55,
  'saas-creative':      50,
  'el':                 40,
  'skrivarleasing':     55,
  'utrustningsleasing': 50,
  'it-support':         55,
  'kortterminal':       60,
  'leasing-bil':        40,
  'transport-frakt':    50,
  'kontorsmaterial':    55,
  'loneadmin':          50,
  'bankavgifter':       50,
  'faktura-tjanst':     55,
};
const DEFAULT_MAX_PCT = 65;

function deterministicCheck(savingPct, category) {
  if (savingPct < 0) return { pass: false, reason: 'negative_saving' };
  const max = MAX_SAVING_PCT[category] ?? DEFAULT_MAX_PCT;
  if (savingPct > max) return { pass: false, reason: `saving_${savingPct}pct_exceeds_max_${max}pct` };
  return { pass: true };
}

/**
 * Ring 2: Seat count oracle — Haiku läser PDF:en oberoende av Opus.
 *
 * Flöde:
 *   1. Deterministisk förhandskoll mot lineItems.quantity-fält (gratis, instant).
 *      Om de stämmer: returnera OK direkt utan API-anrop.
 *   2. Haiku-anrop med samma PDF — oberoende läsning av antalet licenser/SIM-kort.
 *   3. Vid avvikelse >10 % (min 2): returnera { ok: false, ... }.
 *   4. Fail-open: timeout eller API-fel returnerar { ok: true, method: 'error_failopen' }.
 *
 * Avsett att anropas fire-and-forget från test-invoice.mjs — påverkar ej kundlatens.
 */
export async function verifySeatCount({ seatCount, lineItems, pdfBase64 }) {
  if (!seatCount || seatCount <= 0 || !pdfBase64) {
    return { ok: true, method: 'skip_no_seats' };
  }

  // Steg 1: Deterministisk koll — om lineItems.quantity matchar seatCount, skip Haiku.
  const subLines = (lineItems ?? []).filter(
    (l) => l.type === 'recurring_subscription' && (l.quantity ?? 0) > 0 && !l.is_addon,
  );
  if (subLines.length > 0) {
    const maxQty = Math.max(...subLines.map((l) => l.quantity));
    if (Math.abs(seatCount - maxQty) <= Math.max(2, maxQty * 0.05)) {
      return { ok: true, method: 'deterministic_match', detectedCount: maxQty };
    }
  }

  // Steg 2: Haiku-oracle — oberoende läsning av PDF
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const result = await Promise.race([
      client.messages.create({
        model:      HAIKU_MODEL,
        max_tokens: 10,
        messages: [{
          role:    'user',
          content: [
            {
              type:   'document',
              source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
            },
            {
              type: 'text',
              text: 'How many unique user seats / licenses / SIM-card subscriptions does this invoice include? Reply with a single integer only, nothing else.',
            },
          ],
        }],
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('seat_oracle_timeout')), SEAT_ORACLE_TIMEOUT_MS),
      ),
    ]);

    const text        = (result.content[0]?.text ?? '').trim();
    const oracleCount = parseInt(text, 10);
    if (!Number.isFinite(oracleCount) || oracleCount <= 0) {
      return { ok: true, method: 'oracle_no_parse', rawText: text };
    }

    const diff      = Math.abs(seatCount - oracleCount);
    const threshold = Math.max(2, seatCount * 0.10);

    if (diff > threshold) {
      console.error(`[sanity:seat-oracle] MISMATCH opus=${seatCount} haiku=${oracleCount} diff=${diff} threshold=${threshold}`);
      return { ok: false, method: 'oracle', opusCount: seatCount, oracleCount, diff };
    }

    console.log(`[sanity:seat-oracle] MATCH opus=${seatCount} haiku=${oracleCount}`);
    return { ok: true, method: 'oracle', opusCount: seatCount, oracleCount };
  } catch (err) {
    console.warn(`[sanity:seat-oracle] fail-open: ${err.message}`);
    return { ok: true, method: 'error_failopen' };
  }
}

/**
 * Verifierar att en rekommendation är rimlig.
 * Returnerar { pass: true } om allt ser bra ut.
 * Returnerar { pass: false, method, reason } om resultatet bör granskas manuellt.
 *
 * Fail-open: om Haiku-anropet misslyckas returneras { pass: true, method: 'error_failopen' }.
 */
export async function verifySanity({ category, annualCost, savingPct, supplier }) {
  // Steg 1: Deterministisk check — ingen API-kostnad
  const det = deterministicCheck(savingPct, category);
  if (!det.pass) {
    console.error(`[sanity:det] FAIL supplier=${supplier} category=${category} saving=${savingPct}% reason=${det.reason}`);
    return { pass: false, method: 'deterministic', reason: det.reason };
  }

  // Steg 2: Haiku bara för höga besparingar (45–max %)
  // Under 45% är alltid rimligt: svenska telekom varierar 30-50% mellan operatörer,
  // SaaS-marginaler är 20-40%. Haiku kallas bara för atypiskt höga värden.
  if (savingPct < 45) return { pass: true, method: 'skip_low' };

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const result = await Promise.race([
      client.messages.create({
        model:      HAIKU_MODEL,
        max_tokens: 5,
        messages:   [{
          role:    'user',
          content: `Swedish B2B market context: price variation between suppliers is commonly 30-55% for telecom, 20-45% for SaaS. Premium carriers (Telia, Telenor) are typically 30-50% more expensive than budget alternatives. Supplier: "${supplier}". Category: ${category}. Current annual cost: ${annualCost.toLocaleString('sv-SE')} SEK. Claimed saving: ${savingPct}%. Is this saving realistic for this supplier and category in the Swedish B2B market? Reply YES or NO only.`,
        }],
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('haiku_timeout')), HAIKU_TIMEOUT_MS)
      ),
    ]);

    const text = (result.content[0]?.text ?? '').trim().toUpperCase();
    const isNo = text.startsWith('N');

    if (isNo) {
      console.error(`[sanity:haiku] FAIL supplier=${supplier} category=${category} saving=${savingPct}%`);
      return { pass: false, method: 'haiku', reason: 'haiku_implausible' };
    }

    console.log(`[sanity:haiku] PASS supplier=${supplier} category=${category} saving=${savingPct}%`);
    return { pass: true, method: 'haiku' };

  } catch (err) {
    // Fail-open: infrastrukturfel ska aldrig blockera korrekt analys
    console.warn(`[sanity:haiku] fail-open: ${err.message}`);
    return { pass: true, method: 'error_failopen' };
  }
}
