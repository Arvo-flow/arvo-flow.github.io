// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris.
//
// Ett licenspris som inte kan vara ett listpris med påslag är troligen fel avläst (ett radbelopp läst
// som ett styckpris, en årssumma som en månad). Analysen går då till granskning (api/test-invoice).
//
// TVÅ PRÖVNINGAR (T-2, ops/ARBETSORDER-VAG1.md). En faktura går till granskning om någon slår till.
//
// 1 · Mains tak per plats, oförändrat och alltid: mains trösklar (Microsoft 765,70, Google 468, Adobe
//     908,70) på mains exakta namn (SUPPLIER_KEY_MAP). pricePerSeatMonthly är projected ÷ platser och
//     bär varje tillägg, och projektionen och platsantalet är egna avläsningar. Ett tak på det talet kan
//     inte justeras rätt (bibelns regel 13), och det får inte heller hoppas över: två försök att
//     prissätta E5 till listpris gjorde fel vanligare. Höjda tak (2ac67b6e) prissatte Office 365 E3 lästa
//     som kvartalssumma (andra blicken T2-1). Att hoppa över taket när varje rad var en prövad nivårad
//     (ec21e155) prissatte en årsfaktura vars projektion lästs ×12 och en faktura vars antal lästs till
//     hälften, båda med rätt radpriser (LT-09).
//
// 2 · Ovanpå: varje löpande nivårad mot sin egen nivå i prisboken. En rad som namnger en Microsoft-nivå
//     (radensNiva, samma läsare som like-for-like) och vars pris per licens och månad överstiger 2 ×
//     nivåns listpris går till granskning. Priset är radens belopp ÷ antal, alltså samma tal som kundens
//     årskostnad byggs av; à-priset används bara när antalet saknas (T2-2). Ett listpris med påslag
//     ligger under. En kvartalssumma (3×) och en årssumma (12×) av ett listpris, läst som månad, ligger
//     över (LT-05, LT-08). Leverantörens namn spelar ingen roll, så en återförsäljare (Crayon, Atea,
//     Dustin) och det juridiska namnet «Microsoft Ireland Operations Ltd» prövas likadant. En okänd
//     period räknas som månad, samma antagande som aggregeringen gör när den räknar årskostnaden.
//
// Eftersom prövning 1 är mains, går varje faktura main skickade till granskning dit också här. Svepet
// (LT-06) mäter därför bara andra hållet: korrekta fakturor som radprövningen skickar till granskning.
//
// FÅNGAR: det main fångade, och dessutom en nivårad över 2 × nivåns listpris.
// BLIND:
//   · det main var blint för och radprövningen inte når: en kvartalssumma av ett à-pris under ungefär
//     80 % av årslistpriset (Business Standard à 105 × 3 = 315 ligger under 2 × 160,58); ett tillägg läst
//     som kvartals- eller årssumma hos en leverantör vars namn mains uppslag inte känner; en rad som inte
//     namnger nivån (Office 365 E3, «Business Basic EES (exkl. Teams)», F4-2);
//   · Adobe och Google prövas bara per plats: boken saknar en radläsare för Adobes produkter och SEK-
//     priser för Google;
//   · leverantörer utanför de tre.
// Korrekta fakturor som main skickade till granskning går dit också här, med samma skäl: Microsoft 365
// E5 på månadsfakturering (769,42) och Adobe Creative Cloud Pro till listpris (985).
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
 * prov: 'per_plats' (mains tak), 'rad' (minst en nivårad prövad), båda som 'per_plats+rad', eller null.
 * anomaly=true → troligt avläsningsfel → granskning.
 * @param {{ normalizedSupplier?: string, pricePerSeatMonthly?: number, lineItems?: object[], billingPeriod?: string }} p
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, lineItems = [], billingPeriod = null }) {
  // Prövning 1: mains, med mains villkor i mains ordning.
  let perPlats = false;
  if (pricePerSeatMonthly && pricePerSeatMonthly > 0 && normalizedSupplier) {
    const v = leverantorsnyckel(normalizedSupplier);
    if (v) {
      perPlats = true;
      const troskel = MAINS_TROSKEL[v];
      if (pricePerSeatMonthly > troskel) {
        return {
          ok: false,
          anomaly: true,
          prov: 'per_plats',
          detail: `pricePerSeat ${pricePerSeatMonthly} kr > avläsningströskeln ${troskel} kr (${normalizedSupplier}) — troligt avläsningsfel`,
        };
      }
    }
  }
  // Prövning 2: varje löpande nivårad. En rad utan typ räknas som löpande.
  const rader = Array.isArray(lineItems) ? lineItems : [];
  let provadeRader = 0;
  for (const rad of rader) {
    if (rad?.type && rad.type !== 'recurring_subscription') continue;
    const niva = radensNiva(rad?.description);
    const listpris = niva ? nivansListpris(niva) : null;
    const pris = listpris != null ? radensPrisPerManad(rad, billingPeriod) : null;
    if (pris == null) continue;
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
  const prov = [perPlats && 'per_plats', provadeRader > 0 && 'rad'].filter(Boolean).join('+') || null;
  return { ok: true, anomaly: false, prov };
}
