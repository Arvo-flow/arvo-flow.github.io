// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris, mot prisboken.
//
// Ett pricePerSeatMonthly över leverantörens tak är troligen fel avläst (ett radbelopp läst som ett
// styckpris, en årssumma som en månad). Analysen går då till granskning (api/test-invoice).
//
// PRISERNA KOMMER UR PRISBOKEN (grundarbeslut 2026-10-21: inga parallella prislistor i repot). Här
// stod en egen tabell med majpriser. Avläst 21 okt gav den fel svar i kundvägen:
// · En Adobe Creative Cloud Pro-licens till verifierat listpris, 985 kr/mån exkl moms, fick kvoten
//   1,41 mot tabellens 699 och gick till granskning i stället för att prissättas.
// · Microsoft 365 E5 på månadsfakturering, 769,42 kr, fick kvoten 1,31 mot tabellens 589.
//
// ETT TAK, HÄRLETT UR BOKEN. Taket är 1,30 × leverantörens högsta verifierade listpris (LT-01, LT-05).
// Första versionen hade två lager: ett fast tak (Microsoft 800, Adobe 1200) och en kvot mot boken.
// Det fasta taket låg under kvoten för båda leverantörerna, så kvoten nåddes aldrig och det fasta
// taket fattade varje beslut. Det låg 4 % över E5:s månadspris: höjde Microsoft E5 med 4 % hade en
// kund till exakt listpris gått till granskning igen (andra blicken på uppföljningen efter PR #85, K-2).
//
// Google bär bara USD i prisboken. Ett SEK-tal ur en USD-lista vore en gissning, så där gäller ett
// fast avläsningströskel (600 kr), som inte är ett pris (LT-03).
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const KVOT = 1.30;

// Avläsningströskel där boken inte bär något SEK-pris för leverantören.
const TAK_UTAN_BOKPRIS = { google: 600 };

const positiva = (xs) => xs.filter((x) => Number.isFinite(x) && x > 0);

// Leverantörens högsta verifierade listpris per licens och månad i SEK, eller null.
// SEK-filtret har egen tand: en USD-nivå med ett msrp-fält får inte flytta taket (LT-06).
const HOGSTA_LISTPRIS = {
  microsoft: () => {
    const nivaer = Object.values(BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {})
      .filter((t) => t?.currency === 'SEK');
    const p = positiva(nivaer.flatMap((t) => [t.msrpMonthly, t.msrpAnnual]));
    return p.length ? Math.max(...p) : null;
  },
  adobe: () => {
    const p = positiva(Object.values(BRANCHINDEX['saas-creative']?.adobeVerified?.teamExVatMonthly ?? {}));
    return p.length ? Math.max(...p) : null;
  },
  google: () => null,
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

/** Leverantörens nyckel för prövningen, eller null för en leverantör som inte prövas. */
export function leverantorsnyckel(normalizedSupplier) {
  return SUPPLIER_KEY_MAP[(normalizedSupplier ?? '').toLowerCase().trim()] ?? null;
}

/** Taket för leverantören: 1,30 × bokens högsta listpris, annars avläsningströskeln, annars null. */
export function licensprisTak(key) {
  const msrp = HOGSTA_LISTPRIS[key]?.() ?? null;
  if (msrp != null) return { tak: Math.round(KVOT * msrp * 100) / 100, msrp, grund: 'prisboken' };
  const tak = TAK_UTAN_BOKPRIS[key];
  return tak != null ? { tak, msrp: null, grund: 'avlasningstroskel' } : null;
}

/**
 * Prövar ett extraherat licenspris. Returnerar { ok, anomaly, detail?, msrp?, tak? }.
 * anomaly=true → troligt avläsningsfel → granskning.
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly }) {
  if (!pricePerSeatMonthly || pricePerSeatMonthly <= 0 || !normalizedSupplier) {
    return { ok: true, anomaly: false };
  }
  const key = leverantorsnyckel(normalizedSupplier);
  if (!key) return { ok: true, anomaly: false };

  const t = licensprisTak(key);
  if (!t) return { ok: true, anomaly: false };
  if (pricePerSeatMonthly > t.tak) {
    const grund = t.grund === 'prisboken'
      ? `1,30 × högsta verifierade listpris ${t.msrp} kr (prisboken)`
      : `avläsningströskeln ${t.tak} kr (boken bär inget SEK-pris)`;
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > tak ${t.tak} kr = ${grund} — troligt avläsningsfel (${normalizedSupplier})`,
      msrp: t.msrp,
      tak: t.tak,
    };
  }
  return { ok: true, anomaly: false, msrp: t.msrp, tak: t.tak };
}
