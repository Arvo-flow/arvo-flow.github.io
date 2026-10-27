// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris.
//
// Ett licenspris som inte kan vara ett listpris med påslag är troligen fel avläst (ett radbelopp läst
// som ett styckpris, en årssumma som en månad). Analysen går då till granskning (api/test-invoice).
//
// TVÅ PRÖVNINGAR, och en faktura går till granskning om någon av dem slår till (T-2,
// ops/ARBETSORDER-VAG1.md).
//
// 1 · Varje nivårad mot sin egen nivå i prisboken. En rad som namnger en Microsoft-nivå (radensNiva,
//     samma läsare som like-for-like) och vars à-pris per licens och månad överstiger 2 × nivåns
//     listpris går till granskning. Ett listpris med påslag ligger under. En kvartalssumma (3×) och en
//     årssumma (12×) läst som månad ligger över (LT-02, LT-05). Tilläggen ligger på andra rader och
//     påverkar inte prövningen. Leverantörens namn spelar ingen roll, så en återförsäljare (Crayon,
//     Atea, Dustin) och det juridiska namnet «Microsoft Ireland Operations Ltd» prövas likadant.
//     En okänd period räknas som månad, samma antagande som aggregeringen gör när den räknar
//     årskostnaden. Det är just det antagandet som låter en årssumma läst som månad slinka igenom.
//
// 2 · Mains tak per plats, på mains exakta namn (SUPPLIER_KEY_MAP), även när nivårader finns.
//     pricePerSeatMonthly är projected ÷ platser och bär varje tillägg. Ett tak på det talet kan inte
//     skilja Copilot till listpris från ett tillägg läst som årssumma (bibelns regel 13). Tilläggen
//     har inget listpris i prisboken, så de kan inte prövas per rad. Därför står mains prövning kvar
//     för dem, med två ändrade tak:
//   · Microsoft: E5:s listpris vid månadsfakturering ur prisboken (769,42, main 765,70), så att E5
//     till listpris prissätts.
//   · Adobe: 1,10 × högsta teampriset ur prisboken (985 → 1 083,50, main 908,70), så att Creative
//     Cloud Pro till listpris prissätts. Single App läst som kvartalssumma (1 143) går till granskning
//     som på main.
//   · Google: 468 kr, mains tröskel. Prisboken bär bara USD för Google, och ett SEK-tal därur vore
//     en gissning. Talet är en avläsningsgräns, inget pris.
//
// Två vägar prövades och föll i svepet mot main (LT-06):
//   · Ett tak per plats nycklat på varumärket. Det skickade korrekta E3- och E5-fakturor med tillägg
//     från «Microsoft Ireland Operations Ltd» till granskning, när nivån inte stod i radtexten.
//   · Ett eget tak per tilläggsrad (2 × bokens dyraste nivå). Det missade tillägg lästa som
//     kvartals- eller årssumma, som main fångar. Det hade också stoppat korrekta Azure- och
//     Dynamics-rader, som kan kosta mer än varje M365-plan.
//
// FÅNGAR: en nivårad över 2 × nivåns listpris, och på mains exakta namn ett pris per plats över taket.
// BLIND: en nivårad utan à-pris eller antal; ett tillägg läst som kvartals- eller årssumma på en
//   faktura vars leverantörsnamn SUPPLIER_KEY_MAP inte slår upp, och på main-namnen ett sådant
//   tillägg som håller priset per plats under taket; en kvartalssumma av en nivå under taket utan
//   nivårad; och leverantörer utanför de tre.
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { radensNiva } from './licensniva.js';
import { radensOre } from './radobservation.js';
import { perioderPerAr } from './faktureringsperiod.js';

const RADFAKTOR = 2;
const ADOBE_PASLAG = 1.10;
const GOOGLE_TROSKEL = 468;
const avrunda = (x) => Math.round(x * 100) / 100;
const positiva = (xs) => xs.filter((x) => Number.isFinite(x) && x > 0);

// Nivåns högsta listpris per licens och månad (månadsfakturering), eller null.
function nivansListpris(nivaNyckel) {
  const t = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[nivaNyckel];
  if (!t || t.currency !== 'SEK') return null;
  const p = positiva([t.msrpMonthly, t.msrpAnnual]);
  return p.length ? Math.max(...p) : null;
}

// Taket per plats i prövning 2, per leverantörsnyckel.
const TAK_PER_PLATS = {
  microsoft: () => {
    const p = positiva(Object.values(BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {})
      .filter((t) => t?.currency === 'SEK').flatMap((t) => [t.msrpMonthly, t.msrpAnnual]));
    return p.length ? Math.max(...p) : null;
  },
  adobe: () => {
    const p = positiva(Object.values(BRANCHINDEX['saas-creative']?.adobeVerified?.teamExVatMonthly ?? {}));
    return p.length ? avrunda(ADOBE_PASLAG * Math.max(...p)) : null;
  },
  google: () => GOOGLE_TROSKEL,
};

const SUPPLIER_KEY_MAP = {
  'microsoft':             'microsoft',
  'microsoft 365':         'microsoft',
  'microsoft corporation': 'microsoft',
  'google':                'google',
  'google workspace':      'google',
  'google llc':            'google',
  'adobe':                 'adobe',
  'adobe inc':             'adobe',
  'adobe systems':         'adobe',
};

/**
 * Leverantörens nyckel ur det exakta namnet, eller null. Prislarmet (lib/price-alert.js) och
 * prövning 2 nedan slår upp med den.
 */
export function leverantorsnyckel(normalizedSupplier) {
  return SUPPLIER_KEY_MAP[(normalizedSupplier ?? '').toLowerCase().trim()] ?? null;
}

/** À-priset per licens och månad för en rad, eller null när det inte går att läsa. */
export function radensPrisPerManad(rad, billingPeriod) {
  const { aprisOre } = radensOre(rad);
  let apris = aprisOre != null ? aprisOre / 100
    : (Number.isFinite(rad?.unitPrice) && rad.unitPrice > 0 ? rad.unitPrice : null);
  if (apris == null && Number.isFinite(rad?.amount) && Number.isFinite(rad?.quantity) && rad.quantity > 0) {
    apris = rad.amount / rad.quantity;
  }
  if (!(apris > 0)) return null;
  const perAr = perioderPerAr(billingPeriod);
  if (perAr === 0) return null;                     // engångsavgift: inget månadspris att pröva
  const manader = perAr == null ? 1 : 12 / perAr;   // okänd period räknas som månad, se modulhuvudet
  return apris / manader;
}

/**
 * Indata till validateSeatPrice ur pipelinens objekt. api/test-invoice och LT anropar samma
 * funktion, så att testet prövar de fält produktionen skickar (T-4).
 */
export function prisprovningensIndata(extracted, categorized) {
  return {
    normalizedSupplier:  categorized?.normalizedSupplier ?? null,
    pricePerSeatMonthly: extracted?.pricePerSeatMonthly ?? null,
    lineItems:           Array.isArray(extracted?.lineItems) ? extracted.lineItems : [],
    billingPeriod:       extracted?.billingPeriod ?? null,
  };
}

/**
 * Prövar fakturans licenspriser. Returnerar { ok, anomaly, detail?, prov }.
 * prov: 'rad' (minst en nivårad prövades), 'per_plats' (bara taket per plats) eller null (inget prövat).
 * anomaly=true → troligt avläsningsfel → granskning.
 * @param {{ normalizedSupplier?: string, pricePerSeatMonthly?: number, lineItems?: object[], billingPeriod?: string }} p
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, lineItems = [], billingPeriod = null }) {
  const rader = Array.isArray(lineItems) ? lineItems : [];
  let provadeRader = 0;
  for (const rad of rader) {
    // Bara licensrader: en engångsavgift eller förbrukning som råkar namnge en nivå är inget à-pris per licens.
    if (rad?.type && rad.type !== 'recurring_subscription') continue;
    const niva = radensNiva(rad?.description);
    if (!niva) continue;
    const listpris = nivansListpris(niva);
    const pris = radensPrisPerManad(rad, billingPeriod);
    if (listpris == null || pris == null) continue;
    provadeRader++;
    if (pris > RADFAKTOR * listpris) {
      return {
        ok: false,
        anomaly: true,
        prov: 'rad',
        detail: `raden «${String(rad.description).slice(0, 60)}» kostar ${avrunda(pris)} kr per licens och månad, över 2 × nivåns listpris ${listpris} kr (prisboken, ${niva}) — troligt avläsningsfel`,
      };
    }
  }
  // Prövning 2: mains tak per plats, på mains exakta namn, oavsett om nivårader prövats.
  const v = leverantorsnyckel(normalizedSupplier);
  const tak = v ? TAK_PER_PLATS[v]() : null;
  if (tak != null && pricePerSeatMonthly > tak) {
    return {
      ok: false,
      anomaly: true,
      prov: 'per_plats',
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > taket ${tak} kr (${normalizedSupplier}) — troligt avläsningsfel`,
    };
  }
  const prov = provadeRader > 0 ? 'rad' : (tak != null && pricePerSeatMonthly > 0 ? 'per_plats' : null);
  return { ok: true, anomaly: false, prov };
}
