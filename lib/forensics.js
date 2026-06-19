// lib/forensics.js — den universella forensik-passningen (mekanism-domen, regel 2: kod räknar).
//
// Forensik-inversionen: i stället för att leda med ett benchmark-pålägg ("ni ligger X % över median")
// läser vi kundens EGEN faktura djupare än deras ekonomiansvarig gjorde, och lyfter den specifika
// mekanism de blöder på — rad för rad. Varje fynd är Zero Trust: talet kommer ur kundens egen
// fakturarad (inget marknadstal, ingen FX, inget estimat), så det får visas även för kategorier
// vi inte kan prissätta (revisionsgrindens tystnad gäller MARKNADStal, inte kundens egna rader).
//
// Kör category-agnostiskt på VARJE faktura. Deterministisk, fail-open. En detektortabell i
// prioritetsordning; en rad ger högst ETT fynd (dedup — första träffen vinner). Växer med varje
// ny mekanism vi lär oss läsa. Konsoliderar fee-signal-regexen (regel 1 — en sanning).

import { FEE_SIGNAL_RE } from './fee-signals.js';

// Hårdvara som amorteras på en löpande rad — försvinner när avbetalningen är slutbetald.
const AMORT_RE = /avbetalning|delbetalning|restv[äa]rde|hyrk[öo]p|amorter(?:ing|as|ad)/i;
// Leverantörens valutapåslag — de tar betalt för växlingen (ofta dolt, alltid förhandlingsbart).
const FX_RE = /valutap[åa]slag|valutajustering|valutatill[äa]gg|valutaavgift|v[äa]xlingsavgift|valutakorrigering/i;
// Administrativa tilläggsavgifter som speglar ingen levererad tjänst — nästan alltid borttagbara.
const JUNK_RE = /faktureringsavgift|expeditionsavgift|aviavgift|pappersfaktura|uppl[äa]ggningsavgift|hanteringsavgift|p[åa]minnelseavgift/i;

// Prioritetsordning: starkaste/dyraste mekanismen först. Severity styr rangordningen i fyndlistan.
const DETECTORS = [
  {
    type: 'supplier_documented_hike', severity: 'high', re: FEE_SIGNAL_RE,
    title: 'Leverantören skrev in höjningen själv',
    text: (d) => `Leverantören har själv markerat en ny/justerad avgift på fakturan — "${d}". ` +
      `En nyinförd kostnadspost är alltid förhandlingsbar.`,
  },
  {
    type: 'fx_surcharge', severity: 'high', re: FX_RE,
    title: 'Valutapåslag på fakturan',
    text: (d) => `Raden "${d}" är ett valutapåslag — leverantören tar betalt för växlingen ovanpå priset. ` +
      `Ofta dolt och nästan alltid förhandlingsbart eller borttagbart med rätt avtal eller valuta.`,
  },
  {
    type: 'hardware_financing', severity: 'medium', re: AMORT_RE,
    title: 'Hårdvaruavbetalning på en löpande rad',
    text: (d) => `Raden "${d}" ser ut som en avbetalning av utrustning, inte en löpande tjänst — ` +
      `när den är slutbetald ska den bort från fakturan. Bekräfta slutdatum så bevakar vi att den försvinner.`,
  },
  {
    type: 'junk_fee', severity: 'medium', re: JUNK_RE,
    title: 'Administrativ tilläggsavgift',
    text: (d) => `Raden "${d}" är en administrativ tilläggsavgift som speglar ingen levererad tjänst — ` +
      `den kan nästan alltid tas bort eller förhandlas bort (t.ex. e-faktura i stället för pappersavi).`,
  },
];

/**
 * Skannar en faktura efter dolda, förhandlingsbara mekanismer. Varje fynd är källtäckt mot
 * kundens egen rad (Zero Trust). En rad ger högst ETT fynd. Rangordnas: severity (high→low),
 * sedan störst årsimpact.
 *
 * @param {Array}  lineItems              - extraherade fakturarader
 * @param {object} opts
 * @param {number} opts.periodMultiplier  - perioder per år (12 för månadsfaktura, 1 för årsfaktura)
 * @returns {Array<{type,severity,title,lineDescription,monthly,annualImpact,negotiable,text}>}
 */
export function detectForensicFindings(lineItems, { periodMultiplier = 12 } = {}) {
  const findings = [];
  for (const it of lineItems ?? []) {
    const desc = String(it?.description ?? '');
    const amount = Number(it?.amount);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    for (const d of DETECTORS) {                 // prioritetsordning → första träffen vinner (dedup per rad)
      if (d.re.test(desc)) {
        findings.push({
          type: d.type, severity: d.severity, title: d.title,
          lineDescription: desc, monthly: amount,
          annualImpact: Math.round(amount * periodMultiplier),
          negotiable: true, text: d.text(desc),
        });
        break;
      }
    }
  }
  const rank = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => (rank[a.severity] - rank[b.severity]) || (b.annualImpact - a.annualImpact));
  return findings;
}
