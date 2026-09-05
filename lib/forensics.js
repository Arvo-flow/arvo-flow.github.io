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
import { perioderPerAr } from './faktureringsperiod.js';

// Radtyper som utgör den LÖPANDE kostnaden — de enda som får annualiseras. Samma mängd som
// lib/fakturarader.js LOPANDE; en engångsavgift återkommer per definition inte.
const LOPANDE_RADTYPER = new Set(['recurring_subscription', 'recurring', 'subscription']);

// Hårdvara som amorteras på en löpande rad — försvinner när avbetalningen är slutbetald.
const AMORT_RE = /avbetalning|delbetalning|restv[äa]rde|hyrk[öo]p|amorter(?:ing|as|ad)/i;
// ── LEASING SAKNADES I ORDLISTAN (2026-09-05, ur en verklig Dustin-faktura) ──────────────────
// Fakturaraden löd «Leasing Server (Månad 48 av 36)». Månadsräknaren gick att läsa, guarden
// (paid > total) hade passerat — men detektorn kom aldrig dit, för `hardware_overpaid` krävde
// FÖRST ett ord ur AMORT_RE, och **det vanligaste svenska ordet för saken saknades**.
//
// Mätt på exakt samma rad, bara ordet utbytt:
//   «Leasing Server (Månad 48 av 36)»      → 0 fynd
//   «Avbetalning Server (Månad 48 av 36)»  → 1 fynd · 29 400 kr redan betalt
//
// Tolv månader utöver ett 36-månadersavtal, 2 450 kr i månaden. Kundens pengar, osynliga för
// oss därför att leverantören valde ett annat ord. Det är E5-fällans form: mekanismen är rätt,
// grinden framför den mäter fel sak.
//
// Ordlistan vidgas ENDAST för `hardware_overpaid`. `hardware_financing` (medium) står kvar på
// den smala listan — annars hade varje leasingrad i landet blivit ett fynd, och en detektor som
// fäller allt är lika värdelös som ingen. Här bär guarden hela bevisbördan: bara en rad som
// SJÄLV säger att den passerat sin plan kan fyra. (FO-01/FO-02.)
const AMORT_OVERPAID_RE = /avbetalning|delbetalning|restv[äa]rde|hyrk[öo]p|amorter(?:ing|as|ad)|leasing|leasas|hyresavtal/i;
// "Månad X/Y" eller "Månad X av Y" — avbetalningsplanens position. X > Y = redan slutbetald.
const AMORT_MONTH_RE = /m[åa]nad\s*(\d+)\s*(?:\/|av)\s*(\d+)/i;
// Leverantörens valutapåslag — de tar betalt för växlingen (ofta dolt, alltid förhandlingsbart).
// Svenska OCH engelska/cross-border-markörer (USD-fakturor bär dem på engelska — annars osynliga).
const FX_RE = /valutap[åa]slag|valutajustering|valutatill[äa]gg|valutaavgift|v[äa]xlingsavgift|valutakorrigering|valutav[äa]xling|foreign transaction|currency conversion|cross[-\s]?border|\bfx\b.*(?:fee|surcharge)|exchange (?:rate )?fee/i;
// Administrativa tilläggsavgifter som speglar ingen levererad tjänst — nästan alltid borttagbara.
const JUNK_RE = /faktureringsavgift|expeditionsavgift|aviavgift|pappersfaktura|uppl[äa]ggningsavgift|hanteringsavgift|p[åa]minnelseavgift/i;

// Räkneord under tolv skrivs ut i prosa; siffror är reserverade för pengar och mätvärden.
const SKRIVNA = ['noll', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva'];
// Ett utskrivet räkneord först i en mening ska ha versal. "…är redan er. två månader ligger…"
// är den sortens slarv som gör att en premiumyta läser som ett utkast.
const versal = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

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
    type: 'hardware_overpaid', severity: 'high', re: AMORT_OVERPAID_RE,
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
    // Kortare, och räkneord skrivs ut (RÄKNEORD, sid. 2026-08-15): "2 månader" bredvid "580 kr"
    // läste som två tal av samma sort. I dossier-språket är siffror reserverade för pengar och
    // mätvärden; antal månader är prosa. Beloppet bärs numera av kortets egen nyckeltalschip —
    // texten upprepar det inte, den förklarar VARFÖR det finns.
    text: (d) => {
      const p = parseAmortMonths(d);
      const months = p.paid - p.total;
      return `Raden ovan står på månad ${p.paid} av ${p.total} — avbetalningen är slutbetald och `
        + `utrustningen är redan er. ${versal(SKRIVNA[months] ?? months)} ${months === 1 ? 'månad' : 'månader'} `
        + `ligger utöver planen. Posten ska bort från nästa faktura; vi bevakar att den försvinner.`;
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
 * @param {string} opts.billingPeriod      - fakturans period ('monthly'|'quarterly'|'annual'|…);
 *   perioderna per år härleds ur lib/faktureringsperiod.js — anroparen räknar aldrig själv.
 * @returns {Array<{type,severity,title,lineDescription,monthly,annualImpact,negotiable,text}>}
 */
export function detectForensicFindings(lineItems, opts = {}) {
  // ── ETT OMDÖPT FÄLT SKA SMÄLLA, INTE IGNORERAS (2026-08-24) ───────────────────────────────
  // När `periodMultiplier` byttes mot `billingPeriod` fortsatte sex anropsställen skicka det
  // gamla namnet. JavaScript ignorerar en okänd nyckel, så de blev tyst av med sin periodfaktor
  // — och fyra av dem var TESTER som förblev gröna. Det är exakt öresbuggen igen, i samma
  // session, i mitt eget arbete: ett fält som inte läses är omöjligt att skilja från ett fält
  // som inte fanns. Här kan tillståndet inte uppstå: den gamla nyckeln är ett fel, inte en tystnad.
  // Kastet kan aldrig nå produktion — produktionens enda anropare skickar `billingPeriod`, och
  // ett anrop med den gamla nyckeln är per definition kod som inte kompilerats mot dagens API.
  if ('periodMultiplier' in opts) {
    throw new Error('detectForensicFindings: `periodMultiplier` är borttaget — skicka `billingPeriod` '
      + '(perioderna per år härleds ur lib/faktureringsperiod.js).');
  }
  const { billingPeriod = null, supplier = null } = opts;
  const findings = [];
  // ── VAD ÄR TALET PER? (2026-08-24) ────────────────────────────────────────────────────────
  // Här stod `periodMultiplier = 12`, och anroparen räknade fram den själv med
  // `billingPeriod === 'annual' ? 1 : 12`. Två fel föll ut ur det:
  //
  //   · KVARTALSFAKTUROR gångades med 12 i stället för 4 — tre gånger för högt.
  //   · Radens EGEN typ vägdes aldrig in. En engångsavgift (`one_time_fee`) — en startavgift,
  //     en enstaka växlingspåslag, en junk fee som tas ut en gång — annualiserades ×12. En
  //     startavgift på 4 500 kr blev «54 000 kr/år» på rummets fyndkort.
  //
  // Talet når `FindingCard` som «N kr/år» och Portfolios rubrik «vi fångade N kr/år värt att
  // åtgärda». Det är en kundsynlig siffra utan täckning (regel 3), och riktningen är den farliga
  // under 20 % success fee: vi överdriver vad som finns att hämta.
  //
  // Nu: perioden härleds ur EN sanning (lib/faktureringsperiod.js), och bara LÖPANDE rader
  // annualiseras. En engångsrad behåller sitt sanna belopp och sin sanna enhet — den får inget
  // årstal alls, för den har inget. Radtypen är obligatorisk i extraktionsschemat, så en okänd
  // typ betyder att raden inte kommer från produktionsvägen; då hävdar vi inget årstal.
  const perAr = perioderPerAr(billingPeriod);
  for (const it of lineItems ?? []) {
    const desc = String(it?.description ?? '');
    const amount = Number(it?.amount);
    if (!Number.isFinite(amount) || amount <= 0) continue;
    const lopande = LOPANDE_RADTYPER.has(String(it?.type));
    const arsimpact = lopande && perAr > 0 ? Math.round(amount * perAr) : null;
    for (const d of DETECTORS) {                 // prioritetsordning → första träffen vinner (dedup per rad)
      if (d.re.test(desc) && (!d.guard || d.guard(desc))) {  // guard-fall (t.ex. inom-plan) → faller vidare
        findings.push({
          type: d.type, severity: d.severity, title: d.title,
          lineDescription: desc, monthly: amount,
          annualImpact: arsimpact,
          // Utan årstal visar kortet i stället radens sanna belopp med sin sanna enhet
          // (`metricText` är kortets befintliga ärliga slot). Tystnad om årstalet, aldrig
          // tystnad om fyndet — fail-closed på PÅSTÅENDET, fail-open på pipelinen.
          ...(arsimpact == null ? {
            metricText: `${Math.round(amount).toLocaleString('sv-SE')} kr · ${lopande ? 'per faktura' : 'engångsbelopp'}`,
          } : {}),
          engangsbelopp: !lopande,
          negotiable: true, text: d.text(desc, amount),
          ...(d.derive ? d.derive(desc, amount) : {}),
        });
        // Brevet fästs HÄR också, inte bara vid läsning i rummet: annars skulle testa-faktura
        // visa kravet utan en väg att agera på det medan kontoret visar båda (regel 5 — samma
        // data, samma ytor). En producent, två anropspunkter.
        const _brev = kravbrev(findings[findings.length - 1], { supplier });
        if (_brev) findings[findings.length - 1].letter = _brev;
        break;
      }
    }
  }
  const rank = { high: 0, medium: 1, low: 2 };
  // `annualImpact` kan numera vara null («inget årstal att hävda»). `b.annualImpact - a.annualImpact`
  // ger då NaN, och en NaN-jämförelse gör sorteringen godtycklig — ett tyst fel i vilken rad som
  // blir rummets LEAD-fynd. Null sorteras som 0: utan årstal kan fyndet inte hävda störst impact.
  const imp = (f) => (Number.isFinite(f?.annualImpact) ? f.annualImpact : 0);
  findings.sort((a, b) => (rank[a.severity] - rank[b.severity]) || (imp(b) - imp(a)));
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
 * severity/lineDescription rörs aldrig — de är fakta ur analysen. Men `annualImpact` är det
 * INTE: det räknades analysdagen med en gissad faktor (×12 på kvartalsfakturor och
 * engångsavgifter, buggen 2026-08-24), och ett lagrat fel är inte ett faktum. När läsaren
 * skickar med analysens egna rader och period härleds årstalet på nytt ur EN sanning
 * (lib/faktureringsperiod.js + radens typ). Kan det inte beläggas hävdas INGET årstal —
 * fail-closed på påståendet, fail-open på fyndet. (Fable 5:s granskning: producenten rättades
 * 24 aug men varje redan lagrat fynd behöll sitt uppblåsta tal i kundens rum.)
 * BLIND: en anropare som inte skickar underlag (dev-skript) får det lagrade talet orört.
 * Fail-open: okänd typ eller trasig rad → fyndet passerar orört.
 */
export function refineFinding(f, { supplier, billingPeriod, lineItems } = {}) {
  if (!f || typeof f !== 'object' || !f.type) return f;
  const d = DETECTORS.find((x) => x.type === f.type);
  if (!d) return f;
  const desc = String(f.lineDescription ?? '');
  const monthly = Number(f.monthly);
  try {
    if (d.guard && !d.guard(desc)) return f;      // radtexten bär inte längre mekanismen → rör inget
    const ny = { ...f, title: d.title, text: d.text(desc, monthly), ...(d.derive ? d.derive(desc, monthly) : {}) };
    // ── ÅRSTALET RÄKNAS OM VID LÄSNING när underlaget följer med ──────────────────────────────
    if (Array.isArray(lineItems)) {
      const rad = lineItems.find((l) => String(l?.description ?? '') === desc);
      const lopande = rad ? LOPANDE_RADTYPER.has(String(rad.type)) : null;
      const perAr = perioderPerAr(billingPeriod);
      if (rad && lopande && perAr > 0 && Number.isFinite(monthly)) {
        ny.annualImpact = Math.round(monthly * perAr);
        ny.engangsbelopp = false;
        delete ny.metricText;
      } else {
        ny.annualImpact = null;
        ny.engangsbelopp = rad ? !lopande : undefined;
        ny.metricText = `${Math.round(monthly).toLocaleString('sv-SE')} kr · ${
          rad == null ? 'belopp ur analysen' : lopande ? 'per faktura' : 'engångsbelopp'}`;
      }
    }
    const brev = kravbrev(ny, { supplier });
    return brev ? { ...ny, letter: brev } : ny;
  } catch { return f; }
}

/**
 * KRAVBREVET (grundarbeslut 2026-08-15) — rummets enda drag kunden kan hämta hem I DAG.
 *
 * Rummet sa "ni kan begära 580 kr krediterade" och lämnade kunden där. Ett fynd utan en väg att
 * agera på det är en observation, inte en livvakt. Vi har allt som krävs — leverantören, radens
 * ordagranna text, planens position och beloppet — så vi skriver brevet.
 *
 * Vad detta INTE är: vi skickar det inte, och vi lovar inte att göra det (regel 9 — löftet och
 * koden levereras tillsammans, och något automatiserat utskick till leverantörer finns inte).
 * Kunden kopierar och skickar i eget namn. Det är Nivå 3 i Switch-doktrinen: Arvo BEVÄPNAR.
 *
 * Regel 2: varje tal kommer ur kundens egen fakturarad, inget marknadstal, ingen modelltext.
 * Ren funktion → testlåsbar. Returnerar null när underlaget inte bär ett krav.
 */
export function kravbrev(f, { supplier } = {}) {
  if (!f || f.type !== 'hardware_overpaid') return null;
  const belopp = Number(f.overpaidToDate);
  const manader = Number(f.monthsOverpaid);
  if (!(belopp > 0) || !(manader > 0)) return null;          // inget bevisat krav → inget brev
  const p = parseAmortMonths(String(f.lineDescription ?? ''));
  if (!p) return null;
  const mottagare = String(supplier || '').trim();
  const ord = SKRIVNA[manader] ?? String(manader);

  return {
    subject: 'Begäran om kreditering — avslutad avbetalning',
    body: [
      mottagare ? `Till ${mottagare}` : 'Till er kundtjänst',
      '',
      'Hej,',
      '',
      `På er faktura står raden "${f.lineDescription}". Raden anger månad ${p.paid} av en `
      + `avbetalningsplan på ${p.total} månader. Avbetalningen är därmed slutbetald, och `
      + `${ord} ${manader === 1 ? 'månad har' : 'månader har'} debiterats utöver planen.`,
      '',
      'Vi ber er därför om:',
      `1. Kreditering av ${fmtNumber(belopp)} kr som debiterats utöver avbetalningsplanen.`,
      '2. Att posten tas bort från kommande fakturor.',
      '',
      'Återkom gärna med en bekräftelse på båda punkterna.',
      '',
      'Med vänlig hälsning',
    ].join('\n'),
  };
}
