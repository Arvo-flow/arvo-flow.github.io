// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris.
//
// Ett licenspris som inte kan vara ett listpris med påslag är troligen fel avläst (ett radbelopp läst
// som ett styckpris, en årssumma som en månad). Analysen går då till granskning (api/test-invoice).
//
// TVÅ PRÖVNINGAR (T-2, ops/ARBETSORDER-VAG1.md). En faktura går till granskning om någon slår till.
//
// 1 · Varje nivårad mot sin egen nivå i prisboken. En löpande rad som namnger en Microsoft-nivå
//     (radensNiva, samma läsare som like-for-like) och vars pris per licens och månad överstiger
//     2 × nivåns listpris går till granskning. Priset är radens belopp ÷ antal, alltså samma tal som
//     kundens årskostnad byggs av; à-priset används bara när antalet saknas (T2-2). Ett listpris med
//     påslag ligger under. En kvartalssumma (3×) och en årssumma (12×) av ett listpris, läst som månad,
//     ligger över (LT-05, LT-08). Leverantörens namn spelar ingen roll, så en återförsäljare (Crayon,
//     Atea, Dustin) och det juridiska namnet «Microsoft Ireland Operations Ltd» prövas likadant.
//     En okänd period räknas som månad, samma antagande som aggregeringen gör när den räknar
//     årskostnaden. Det är just det antagandet som låter en årssumma läst som månad slinka igenom.
//
// 2 · Mains tak per plats, oförändrat: mains trösklar (Microsoft 765,70, Google 468, Adobe 908,70),
//     på mains exakta namn (SUPPLIER_KEY_MAP). Prövningen hoppas över bara när VARJE löpande rad på
//     fakturan är en prövad nivårad, för då har varje tal i priset per plats redan prövats på rätt
//     nivå. Står en enda annan löpande rad där (ett tillägg, en rad utan läsbart pris, en produkt
//     utanför boken) gäller mains tak. pricePerSeatMonthly är projected ÷ platser och bär varje
//     tillägg, så ett ändrat tak på det talet gör alltid något fel vanligare (bibelns regel 13).
//     Två höjda tak (Microsoft 769,42, Adobe 1 083,50) prissatte Office 365 E3 och Adobe-produkter
//     lästa som kvartalssumma, som main skickade till granskning (andra blicken T2-1).
//
// Utfallen är mätta mot mains modul åt båda håll (LT-06): noll fall där main hade rätt och den här
// prövningen fel, också med olika antal per rad och med produkter utanför boken.
//
// FÅNGAR: en nivårad över 2 × nivåns listpris, och på mains exakta namn ett pris per plats över mains
//   tröskel när fakturan bär något annat än nivårader.
// BLIND:
//   · en kvartalssumma av ett à-pris under ungefär 80 % av årslistpriset (Business Standard à 105 × 3
//     = 315 ligger under 2 × 160,58);
//   · ett tillägg läst som kvartals- eller årssumma på en faktura vars leverantörsnamn mains uppslag
//     inte känner, och på mains namn ett sådant tillägg som håller priset per plats under tröskeln;
//   · en rad som inte namnger nivån (Office 365 E3, «Business Basic EES (exkl. Teams)», F4-2) prövas
//     bara genom taket per plats;
//   · Adobe och Google prövas bara per plats: boken saknar en radläsare för Adobes produkter och SEK-
//     priser för Google. Adobe Creative Cloud Pro till listpris (985) går därför till granskning, som
//     på main;
//   · leverantörer utanför de tre.
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { radensNiva } from './licensniva.js';
import { radensOre } from './radobservation.js';
import { perioderPerAr } from './faktureringsperiod.js';

const RADFAKTOR = 2;
const avrunda = (x) => Math.round(x * 100) / 100;
const positiva = (xs) => xs.filter((x) => Number.isFinite(x) && x > 0);

// Nivåns högsta listpris per licens och månad (månadsfakturering), eller null.
function nivansListpris(nivaNyckel) {
  const t = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[nivaNyckel];
  if (!t || t.currency !== 'SEK') return null;
  const p = positiva([t.msrpMonthly, t.msrpAnnual]);
  return p.length ? Math.max(...p) : null;
}

// Mains effektiva trösklar per plats och månad (origin/main 4f8f2326): Microsoft 1,30 × 589,
// Google 1,30 × 360, Adobe 1,30 × 699, ur den borttagna majtabellen. De är avläsningsgränser, inga
// priser, och de visas aldrig för kunden. De står kvar tills varje rad kan prövas på sin egen nivå.
const MAINS_TROSKEL = Object.freeze({ microsoft: 765.7, google: 468, adobe: 908.7 });

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

/**
 * Radens pris per licens och månad, eller null när det inte går att läsa. Belopp ÷ antal går först,
 * för det är beloppet kundens årskostnad byggs av; à-priset används bara när antalet saknas.
 */
export function radensPrisPerManad(rad, billingPeriod) {
  const { aprisOre, beloppOre } = radensOre(rad);
  const antal = Number.isFinite(rad?.quantity) && rad.quantity > 0 ? rad.quantity : null;
  let pris = null;
  if (antal != null && beloppOre != null) pris = beloppOre / 100 / antal;
  else if (aprisOre != null) pris = aprisOre / 100;
  else if (Number.isFinite(rad?.unitPrice)) pris = rad.unitPrice;
  if (!(pris > 0)) return null;
  const perAr = perioderPerAr(billingPeriod);
  if (perAr === 0) return null;                     // engångsavgift: inget månadspris att pröva
  const manader = perAr == null ? 1 : 12 / perAr;   // okänd period räknas som månad, se modulhuvudet
  return pris / manader;
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
 * prov: 'rad' (varje löpande rad prövades som nivårad), 'per_plats' (mains tak gällde) eller null
 * (inget prövat). anomaly=true → troligt avläsningsfel → granskning.
 * @param {{ normalizedSupplier?: string, pricePerSeatMonthly?: number, lineItems?: object[], billingPeriod?: string }} p
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, lineItems = [], billingPeriod = null }) {
  const rader = Array.isArray(lineItems) ? lineItems : [];
  // Löpande rader: de som bär priset per plats (projected summerar dem). En rad utan typ räknas dit.
  const lopande = rader.filter((rad) => !rad?.type || rad.type === 'recurring_subscription');
  let allaProvade = lopande.length > 0;
  for (const rad of lopande) {
    const niva = radensNiva(rad?.description);
    const listpris = niva ? nivansListpris(niva) : null;
    const pris = listpris != null ? radensPrisPerManad(rad, billingPeriod) : null;
    if (pris == null) { allaProvade = false; continue; }
    if (pris > RADFAKTOR * listpris) {
      return {
        ok: false,
        anomaly: true,
        prov: 'rad',
        detail: `raden «${String(rad.description).slice(0, 60)}» kostar ${avrunda(pris)} kr per licens och månad, över 2 × nivåns listpris ${listpris} kr (prisboken, ${niva}) — troligt avläsningsfel`,
      };
    }
  }
  if (allaProvade) return { ok: true, anomaly: false, prov: 'rad' };

  // Prövning 2: mains tak per plats, på mains exakta namn.
  const v = leverantorsnyckel(normalizedSupplier);
  if (!v || !(pricePerSeatMonthly > 0)) return { ok: true, anomaly: false, prov: null };
  const troskel = MAINS_TROSKEL[v];
  if (pricePerSeatMonthly > troskel) {
    return {
      ok: false,
      anomaly: true,
      prov: 'per_plats',
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > avläsningströskeln ${troskel} kr (${normalizedSupplier}) — troligt avläsningsfel`,
    };
  }
  return { ok: true, anomaly: false, prov: 'per_plats' };
}
