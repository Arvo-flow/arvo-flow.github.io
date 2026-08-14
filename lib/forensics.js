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
import { fmtNumber } from './format.js';

// Hårdvara som amorteras på en löpande rad — försvinner när avbetalningen är slutbetald.
const AMORT_RE = /avbetalning|delbetalning|restv[äa]rde|hyrk[öo]p|amorter(?:ing|as|ad)/i;
// "Månad X/Y" eller "Månad X av Y" — avbetalningsplanens position. X > Y = redan slutbetald.
const AMORT_MONTH_RE = /m[åa]nad\s*(\d+)\s*(?:\/|av)\s*(\d+)/i;
// Leverantörens valutapåslag — de tar betalt för växlingen (ofta dolt, alltid förhandlingsbart).
// Svenska OCH engelska/cross-border-markörer (USD-fakturor bär dem på engelska — annars osynliga).
const FX_RE = /valutap[åa]slag|valutajustering|valutatill[äa]gg|valutaavgift|v[äa]xlingsavgift|valutakorrigering|valutav[äa]xling|foreign transaction|currency conversion|cross[-\s]?border|\bfx\b.*(?:fee|surcharge)|exchange (?:rate )?fee/i;
// Administrativa tilläggsavgifter som speglar ingen levererad tjänst — nästan alltid borttagbara.
const JUNK_RE = /faktureringsavgift|expeditionsavgift|aviavgift|pappersfaktura|uppl[äa]ggningsavgift|hanteringsavgift|p[åa]minnelseavgift/i;

// Parsar "Månad X/Y" → { paid, total } eller null. Ren, testbar.
function parseAmortMonths(desc) {
  const m = String(desc).match(AMORT_MONTH_RE);
  if (!m) return null;
  return { paid: Number(m[1]), total: Number(m[2]) };
}

// ── VARFÖR TEXTEN INTE CITERAR RADEN (grundargranskning 2026-08-15) ──────────────────────────
// Varje text löd tidigare `Raden "${d}" …`. Fyndkortet renderar REDAN lineDescription i en egen
// monospace-chip med typografiska citattecken (FindingCard `.fc-line`), så kundens radtext stod
// två gånger i samma kort — och andra gången mitt i VÅR prosa. I skarpt läge betydde det att
// "Delbetalning iPad Air (Manad 38/36)", med kundens egen saknade å, läste som vårt stavfel.
// Texten refererar därför till "raden ovan" och äger bara vår egen mening. Chipen äger citatet.
//
// Prioritetsordning: starkaste/säkraste mekanismen först. Severity styr rangordningen i fyndlistan.
// En detektor med `guard` fyrar bara om guard(desc) är sann — annars faller raden vidare till nästa.
// `derive` räknar fram de tal som hör mekanismen till (regel 2: kod räknar) — alltid ur kundens
// EGEN rad, aldrig ur ett marknadstal.
const DETECTORS = [
  {
    // Den vassaste asymmetriska sanningen: avbetalningen är matematiskt slutbetald (månad X > Y).
    // Måste komma FÖRE hardware_financing så den hävdar raden först (annars degraderas fyndet).
    type: 'hardware_overpaid', severity: 'high', re: AMORT_RE,
    guard: (d) => { const p = parseAmortMonths(d); return p !== null && p.paid > p.total; },
    title: 'Avbetald hårdvara — ni betalar för utrustning ni redan äger',
    // DET RETROAKTIVA KRAVET (2026-08-15): månad 38 av 36 betyder inte bara att posten ska BORT —
    // det betyder att två månader REDAN är betalda utöver planen. Den kronan är intjänad, inte
    // prognostiserad, och den är det enda i rummet en kund kan kräva tillbaka i dag. Att bara säga
    // "ska bort från nästa faktura" var att lämna den på bordet.
    derive: (d, monthly) => {
      const p = parseAmortMonths(d);
      const months = p ? p.paid - p.total : 0;
      if (!(months > 0) || !Number.isFinite(monthly) || monthly <= 0) return { monthsOverpaid: months > 0 ? months : 0 };
      return { monthsOverpaid: months, overpaidToDate: Math.round(monthly * months) };
    },
    text: (d, monthly) => {
      const p = parseAmortMonths(d);
      const months = p.paid - p.total;
      const krav = (Number.isFinite(monthly) && monthly > 0)
        ? ` Det är ${months} ${months === 1 ? 'månad' : 'månader'} utöver planen — `
          + `${fmtNumber(Math.round(monthly * months))} kr ni redan betalat för mycket och kan begära krediterade.`
        : ` Det är ${months} ${months === 1 ? 'månad' : 'månader'} utöver planen — begär dem krediterade.`;
      return `Raden ovan står på månad ${p.paid} av ${p.total}: avbetalningen är slutbetald och `
        + `utrustningen är redan er.${krav} Posten ska bort från nästa faktura; vi bevakar att den försvinner.`;
    },
  },
  {
    type: 'supplier_documented_hike', severity: 'high', re: FEE_SIGNAL_RE,
    title: 'Leverantören skrev in höjningen själv',
    text: () => `Leverantören har själv markerat raden ovan som en ny eller justerad avgift. `
      + `En nyinförd kostnadspost är alltid förhandlingsbar.`,
  },
  {
    type: 'fx_surcharge', severity: 'high', re: FX_RE,
    title: 'Valutapåslag på fakturan',
    text: () => `Raden ovan är ett valutapåslag — leverantören tar betalt för växlingen ovanpå priset. `
      + `Ofta dolt och nästan alltid förhandlingsbart eller borttagbart med rätt avtal eller valuta.`,
  },
  {
    type: 'hardware_financing', severity: 'medium', re: AMORT_RE,
    title: 'Hårdvaruavbetalning på en löpande rad',
    text: () => `Raden ovan ser ut som en avbetalning av utrustning, inte en löpande tjänst — `
      + `när den är slutbetald ska den bort från fakturan. Bekräfta slutdatum så bevakar vi att den försvinner.`,
  },
  {
    type: 'junk_fee', severity: 'medium', re: JUNK_RE,
    title: 'Administrativ tilläggsavgift',
    text: () => `Raden ovan är en administrativ tilläggsavgift som speglar ingen levererad tjänst — `
      + `den kan nästan alltid tas bort eller förhandlas bort (t.ex. e-faktura i stället för pappersavi).`,
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
      if (d.re.test(desc) && (!d.guard || d.guard(desc))) {  // guard-fall (t.ex. inom-plan) → faller vidare
        findings.push({
          type: d.type, severity: d.severity, title: d.title,
          lineDescription: desc, monthly: amount,
          annualImpact: Math.round(amount * periodMultiplier),
          negotiable: true, text: d.text(desc, amount),
          ...(d.derive ? d.derive(desc, amount) : {}),
        });
        break;
      }
    }
  }
  const rank = { high: 0, medium: 1, low: 2 };
  findings.sort((a, b) => (rank[a.severity] - rank[b.severity]) || (b.annualImpact - a.annualImpact));
  return findings;
}

/**
 * Räknar om ett LAGRAT fynd (lead_finding_json) mot dagens detektortabell.
 *
 * Varför det behövs: fyndet frystes i databasen den dag fakturan analyserades. Skärper vi en
 * mekanism i dag — som det retroaktiva kravet — får en kund som mejlade in i går aldrig se den,
 * trots att sanningen om HENS rad var densamma hela tiden. Alternativet vore att räkna om raden
 * i rummet, och då hade vi haft två kopior av samma matte (det var precis så attribueringslåset
 * gick mörkt i två månader). Här finns en enda producent: DETECTORS.
 *
 * Rör aldrig annualImpact/severity/lineDescription — de är fakta ur analysen. Bara den TEXT och
 * de HÄRLEDDA tal som detektorn äger skrivs om, och bara när typen fortfarande finns.
 * Fail-open: okänd typ eller trasig rad → fyndet passerar orört.
 */
export function refineFinding(f) {
  if (!f || typeof f !== 'object' || !f.type) return f;
  const d = DETECTORS.find((x) => x.type === f.type);
  if (!d) return f;
  const desc = String(f.lineDescription ?? '');
  const monthly = Number(f.monthly);
  try {
    if (d.guard && !d.guard(desc)) return f;      // radtexten bär inte längre mekanismen → rör inget
    return { ...f, title: d.title, text: d.text(desc, monthly), ...(d.derive ? d.derive(desc, monthly) : {}) };
  } catch { return f; }
}
