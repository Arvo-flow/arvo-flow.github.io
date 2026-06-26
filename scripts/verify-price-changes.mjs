// scripts/verify-price-changes.mjs — Verifieringsjuryns DB-beroende stadier (3A).
//
// Körs som ett steg i price-monitor.yml EFTER svepet. price-monitor har redan attacherat de
// sid-beroende vittnena (alert.verify: oldNumeric, newNumeric, productPresent, pageConfirmsNew,
// haikuConfidence) — sidan finns bara i dess minne. Här lägger vi till stabilitets-grinden
// (sett över ≥2 körningar, ur price_change_candidates), kör domen (lib/price-verdict.js), och:
//   verified    → skriv till supplier_price_history (ändringsloggen) + gradera kandidaten.
//   provisional → låt kandidaten vänta (nästa natt kan stabilisera den).
//   rejected    → logga (artefakt, inget skrivs).
//
// Ingen människa-i-loopen. "Verifierat" förtjänas av juryn, aldrig påstås. Tyst tidig utgång loggar skäl.

import { readFileSync } from 'fs';
import { priceChangeVerdict } from '../lib/price-verdict.js';
import { recordCandidate, markGraduated } from '../lib/price-candidates.js';
import { recordVerifiedChange } from '../lib/price-db.js';

const path = process.argv[2] ?? '/tmp/price-monitor-report.json';

let report;
try {
  report = JSON.parse(readFileSync(path, 'utf8'));
} catch (err) {
  console.log(`[jury] ingen rapport (${path}): ${err.message} — exit 0`);
  process.exit(0);
}

const alerts = (report.alerts ?? []).filter((a) => a && a.verify && a.verify.newNumeric > 0);
if (!alerts.length) {
  console.log('[jury] inga prisändrings-kandidater med verify-signaler — exit 0');
  process.exit(0);
}

// Månads- vs årsenhet för loggraden (de flesta B2B-checkar är månadspris).
const isAnnual = (unit) => /year|annual|år/i.test(String(unit ?? ''));

let verified = 0, provisional = 0, rejected = 0;

for (const a of alerts) {
  const v = a.verify;
  // Stabilitets-grinden: registrera kandidaten → priorSeen (samma siffra setts en tidigare körning).
  const { priorSeen, seenCount } = await recordCandidate({
    supplier: a.supplier, category: a.category, check: a.check,
    newNumeric: v.newNumeric, oldNumeric: v.oldNumeric,
  });

  const verdict = priceChangeVerdict({
    oldNumeric:      v.oldNumeric,
    newNumeric:      v.newNumeric,
    haikuConfidence: v.haikuConfidence,
    productPresent:  v.productPresent,
    pageConfirmsNew: v.pageConfirmsNew,
    priorSeen,
  });

  const tag = `${a.supplier}/${a.category}/${a.check} ${v.oldNumeric ?? '?'}→${v.newNumeric}`;
  if (verdict.tier === 'verified') {
    const annual = isAnnual(v.unit);
    await recordVerifiedChange({
      supplier: a.supplier, category: a.category, sourceUrl: a.url,
      oldMonthly: annual ? null : v.oldNumeric, newMonthly: annual ? null : v.newNumeric,
      oldAnnual:  annual ? v.oldNumeric : null, newAnnual:  annual ? v.newNumeric : null,
      changedBy: 'auto-verified',
    });
    await markGraduated({ supplier: a.supplier, category: a.category, check: a.check });
    verified++;
    console.log(`[jury] ✅ VERIFIED (konf ${verdict.confidence}, sett ${seenCount}×): ${tag} → skriven till ändringsloggen`);
  } else if (verdict.tier === 'provisional') {
    provisional++;
    console.log(`[jury] ⏳ PROVISORISK (väntar på stabilitet/konsensus): ${tag} — ${verdict.reasons.join('; ')}`);
  } else {
    rejected++;
    console.log(`[jury] 🚫 AVVISAD (artefakt): ${tag} — ${verdict.reasons.join('; ')}`);
  }
}

console.log(`[jury] klart: ${verified} verifierade · ${provisional} provisoriska · ${rejected} avvisade`);
