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
// TAKET BEROR PÅ NIVÅN, OCH NIVÅN LÄSES UR FAKTURAN. Ett tak per leverantör kan inte skilja
// Microsoft 365 E5 på månadsfakturering (769,42 kr) från en Business Basic-årssumma läst som månad
// (66,91 × 12 = 802,92 kr). Två versioner prövades och föll:
// · Ett fast tak på 800 kr låg 4 % över E5 och fångade Basic × 12 av en slump (andra blicken på
//   uppföljningen efter PR #85, K-2).
// · 1,30 × leverantörens högsta listpris (1 000,25 kr) prissatte Basic × 12. En periodlös årsfaktura
//   utan nivå i radtexten gick då auto med tolv gånger kundens kostnad (granskningen av lagningen, L-1).
// Därför:
// · Med läst nivå (getDominantSaasTierKey ur radtexten): taket är 2,5 × nivåns listpris, men aldrig
//   över 1,30 × leverantörens högsta. pricePerSeatMonthly bär tilläggen (projected ÷ platser), så taket
//   rymmer tillägg upp till 1,5 × nivåpriset. En kvartalssumma (3×) och en årssumma (12×) läst som
//   månad ligger över (LT-03, LT-07).
// · Utan läst nivå: taket är leverantörens högsta listpris. Ett pris över varje plans listpris går inte
//   att förklara utan nivån, och då går fakturan till granskning.
//
// Google bär bara USD i prisboken. Ett SEK-tal ur en USD-lista vore en gissning, så där gäller en
// fast avläsningströskel (600 kr), som inte är ett pris (LT-03).
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const KVOT = 1.30;
const NIVAFAKTOR = 2.5;
const avrunda = (x) => Math.round(x * 100) / 100;

// Microsofts listpris för en nivå: det högsta av månads- och årsåtagandepriset, eller null.
function microsoftNivapris(nivaNyckel) {
  const t = nivaNyckel ? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[nivaNyckel] : null;
  if (!t || t.currency !== 'SEK') return null;
  const p = positiva([t.msrpMonthly, t.msrpAnnual]);
  return p.length ? Math.max(...p) : null;
}

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

/**
 * Taket för leverantören och, för Microsoft, den lästa nivån. Se modulhuvudet.
 * @returns {{ tak:number, msrp:number|null, grund:'niva'|'utan_niva'|'avlasningstroskel' } | null}
 */
export function licensprisTak(key, nivaNyckel = null) {
  const hogsta = HOGSTA_LISTPRIS[key]?.() ?? null;
  if (hogsta == null) {
    const tak = TAK_UTAN_BOKPRIS[key];
    return tak != null ? { tak, msrp: null, grund: 'avlasningstroskel' } : null;
  }
  const niva = key === 'microsoft' ? microsoftNivapris(nivaNyckel) : null;
  if (niva != null) return { tak: avrunda(Math.min(KVOT * hogsta, NIVAFAKTOR * niva)), msrp: niva, grund: 'niva' };
  return { tak: hogsta, msrp: hogsta, grund: 'utan_niva' };
}

/**
 * Prövar ett extraherat licenspris. Returnerar { ok, anomaly, detail?, msrp?, tak? }.
 * anomaly=true → troligt avläsningsfel → granskning.
 * @param {{ normalizedSupplier:string, pricePerSeatMonthly:number, nivaNyckel?:string|null }} p
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, nivaNyckel = null }) {
  if (!pricePerSeatMonthly || pricePerSeatMonthly <= 0 || !normalizedSupplier) {
    return { ok: true, anomaly: false };
  }
  const key = leverantorsnyckel(normalizedSupplier);
  if (!key) return { ok: true, anomaly: false };

  const t = licensprisTak(key, nivaNyckel);
  if (!t) return { ok: true, anomaly: false };
  if (pricePerSeatMonthly > t.tak) {
    const grund = t.grund === 'niva'
      ? `min(2,5 × nivåns listpris ${t.msrp} kr, 1,30 × leverantörens högsta) (prisboken, nivå ${nivaNyckel})`
      : t.grund === 'utan_niva'
        ? `leverantörens högsta listpris ${t.msrp} kr, utan läst nivå (prisboken)`
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
