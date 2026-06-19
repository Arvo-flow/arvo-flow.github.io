// lib/forensics.js — den universella forensik-passningen (mekanism-domen, regel 2: kod räknar).
//
// Forensik-inversionen: i stället för att leda med ett benchmark-pålägg ("ni ligger X % över median")
// läser vi kundens EGEN faktura djupare än deras ekonomiansvarig gjorde, och lyfter den specifika
// mekanism de blöder på — rad för rad. Varje fynd är Zero Trust: talet kommer ur kundens egen
// fakturarad (inget marknadstal, ingen FX, inget estimat), så det får visas även för kategorier
// vi inte kan prissätta (revisionsgrindens tystnad gäller MARKNADStal, inte kundens egna rader).
//
// Kör category-agnostiskt på VARJE faktura. Deterministisk, fail-open. Konsoliderar fee-signals
// (regel 1 — en sanning) och växer med varje ny mekanism vi lär oss läsa.

import { detectFeeSignals } from './fee-signals.js';

// Hårdvara som amorteras på en löpande rad — försvinner när avbetalningen är slutbetald.
const AMORT_RE = /avbetalning|delbetalning|restv[äa]rde|hyrk[öo]p|amorter(?:ing|as|ad)/i;

/**
 * Skannar en faktura efter dolda, förhandlingsbara mekanismer. Varje fynd är källtäckt mot
 * kundens egen rad (Zero Trust). Rangordnas: severity (high→low), sedan störst årsimpact.
 *
 * @param {Array}  lineItems              - extraherade fakturarader
 * @param {object} opts
 * @param {number} opts.periodMultiplier  - perioder per år (12 för månadsfaktura, 1 för årsfaktura)
 * @returns {Array<{type,severity,title,lineDescription,monthly,annualImpact,negotiable,text}>}
 */
export function detectForensicFindings(lineItems, { periodMultiplier = 12 } = {}) {
  const findings = [];

  // 1. Leverantörens EGEN dokumenterade höjning (smyghöjning på pränt) — starkaste "hur visste de det".
  for (const sig of detectFeeSignals(lineItems, periodMultiplier)) {
    findings.push({
      type: 'supplier_documented_hike',
      severity: 'high',
      title: 'Leverantören skrev in höjningen själv',
      lineDescription: sig.description,
      monthly: sig.amount,
      annualImpact: sig.annualImpact,
      negotiable: true,
      text: `Leverantören har själv markerat en ny/justerad avgift på fakturan — "${sig.description}". ` +
        `En nyinförd kostnadspost är alltid förhandlingsbar.`,
    });
  }

  // 2. Hårdvaruavbetalning förklädd till löpande tjänst — ska bort när den är slutbetald.
  for (const it of lineItems ?? []) {
    const desc = String(it?.description ?? '');
    if (!AMORT_RE.test(desc)) continue;
    const amount = Number(it?.amount);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    findings.push({
      type: 'hardware_financing',
      severity: 'medium',
      title: 'Hårdvaruavbetalning på en löpande rad',
      lineDescription: desc,
      monthly: amount,
      annualImpact: Math.round(amount * periodMultiplier),
      negotiable: true,
      text: `Raden "${desc}" ser ut som en avbetalning av utrustning, inte en löpande tjänst — ` +
        `när den är slutbetald ska den bort från fakturan. Bekräfta slutdatum så bevakar vi att den försvinner.`,
    });
  }

  const rank = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => (rank[a.severity] - rank[b.severity]) || (b.annualImpact - a.annualImpact));
  return findings;
}
