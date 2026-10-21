// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris, mot prisboken.
//
// Ett pricePerSeatMonthly över leverantörens absoluta tak, eller över 1,30 × leverantörens högsta
// verifierade listpris, är troligen fel avläst. Analysen går då till granskning (api/test-invoice).
//
// PRISERNA KOMMER UR PRISBOKEN (grundarbeslut 2026-10-21: inga parallella prislistor i repot). Här
// stod en egen tabell med majpriser. Avläst 21 okt gav den fel svar i kundvägen:
// · En Adobe Creative Cloud Pro-licens till verifierat listpris, 985 kr/mån exkl moms, fick kvoten
//   1,41 mot tabellens 699 och gick till granskning i stället för att prissättas.
// · Microsoft 365 E5 på månadsfakturering, 769,42 kr, fick kvoten 1,31 mot tabellens 589.
// Nu läses det högsta verifierade listpriset ur prisboken vid varje anrop (LT-01, LT-02).
//
// Google bär bara USD i prisboken. Där prövas därför bara det absoluta taket: ett SEK-tal ur en
// USD-lista vore en gissning, och en gissning får inte avgöra om en faktura prissätts (LT-03).
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// Trösklar för extraktionsfel, inte priser: ett licenspris över taket är med stor sannolikhet fel
// avläst (ett radbelopp läst som ett styckpris, en årssumma som en månad).
const ABSOLUT_TAK = { microsoft: 800, google: 600, adobe: 1200 };

const positiva = (xs) => xs.filter((x) => Number.isFinite(x) && x > 0);

// Leverantörens högsta verifierade listpris per licens och månad i SEK, eller null.
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
 * Prövar ett extraherat licenspris. Returnerar { ok, anomaly, detail, msrp, ratio }.
 * anomaly=true → troligt avläsningsfel → granskning.
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly }) {
  if (!pricePerSeatMonthly || pricePerSeatMonthly <= 0 || !normalizedSupplier) {
    return { ok: true, anomaly: false };
  }
  const key = leverantorsnyckel(normalizedSupplier);
  if (!key) return { ok: true, anomaly: false };

  const tak = ABSOLUT_TAK[key];
  if (pricePerSeatMonthly > tak) {
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > tak ${tak} kr — troligt fel (${normalizedSupplier})`,
    };
  }

  const msrp = HOGSTA_LISTPRIS[key]();
  if (msrp == null) return { ok: true, anomaly: false, msrp: null };

  const ratio = pricePerSeatMonthly / msrp;
  if (ratio > 1.30) {
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > 1.30× högsta verifierade listpris ${msrp} kr — ratio ${ratio.toFixed(2)} (prisboken)`,
      msrp,
      ratio: ratio.toFixed(2),
    };
  }
  return { ok: true, anomaly: false, msrp, ratio: ratio.toFixed(2) };
}
