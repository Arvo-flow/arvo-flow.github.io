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

  // Steg 2: Haiku bara för mellanfallet (15–max %)
  // Under 15% är alltid rimligt — ingen AI-kostnad
  if (savingPct < 15) return { pass: true, method: 'skip_low' };

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const result = await Promise.race([
      client.messages.create({
        model:      HAIKU_MODEL,
        max_tokens: 5,
        messages:   [{
          role:    'user',
          content: `Swedish B2B market. Supplier category: ${category}. Claimed annual saving: ${savingPct}%. Realistic? Reply YES or NO only.`,
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
