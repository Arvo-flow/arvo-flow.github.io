// lib/supplier-price-intel.js — rimlighetsprövning av ett extraherat licenspris.
//
// Ett pricePerSeatMonthly över leverantörens avläsningströskel är troligen fel avläst (ett radbelopp
// läst som ett styckpris, en årssumma som en månad). Analysen går då till granskning (api/test-invoice).
//
// BETEENDET ÄR MAINS, MED FLIT (fjärde granskningen av PR #86, F4-1). Majtabellen är borta ur repot
// (grundarbeslut 2026-10-21: inga parallella prislistor). Tre försök att härleda taket ur prisboken
// föll i granskning, och alla av samma skäl. pricePerSeatMonthly är projected ÷ platser och bär varje
// tillägg. Ett tak per faktura kan därför inte skilja tillägg från en årssumma läst som månad:
// · 1,30 × leverantörens högsta (1 000,25 kr) prissatte en Basic-årssumma (802,92 kr) (L-1).
// · 2,5 × nivåpriset skickade Standard och Basic med Copilot till granskning, fast main prissatte dem (T-1).
// · 0,97 × 12 × nivåns lägsta prissatte årssummor för billigare planvarianter i fönstret 765,7–1 000 kr,
//   som main skickade till granskning (F4-1).
// Varje ändring av ett tak per faktura gör ett fel vanligare åt något håll. Därför står mains
// effektiva trösklar kvar här oförändrade: min(fast tak, 1,30 × majtabellens högsta månadspris), med
// nivån null som main skickade. De är avläsningsgränser, inga priser, och de visas aldrig för kunden.
// Det rätta draget är att pröva varje nivårad mot sin egen nivå i prisboken, oberoende av tilläggen, och
// att nyckla på varumärket i stället för på det exakta namnet (tredje granskningen, T-2). Det byggs i
// nästa PR (ops/ARBETSORDER-VAG1.md), och där lagas också två förexisterande fel som består till dess:
// en Adobe Creative Cloud Pro-licens till listpris (985 kr) och Microsoft 365 E5 på månadsfakturering
// (769,42 kr) går till granskning i stället för att prissättas.
//
// FÅNGAR: ett pris per plats över tröskeln, när leverantörsnamnet slås upp i SUPPLIER_KEY_MAP (LT-01).
// BLIND: en årssumma under tröskeln, tillägg som lyfter priset per plats över den, och varje leverantör
//   som SUPPLIER_KEY_MAP inte slår upp, till exempel det juridiska namnet «Microsoft Ireland Operations
//   Ltd» (T-2).

// Mains effektiva trösklar i kr per plats och månad: Microsoft 1,30 × 589, Google 1,30 × 360,
// Adobe 1,30 × 699 (majtabellens högsta månadspris; de fasta taken 800, 600 och 1 200 låg över).
const AVLASNINGSTROSKEL = { microsoft: 765.7, google: 468, adobe: 908.7 };

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
 * Prövar ett extraherat licenspris. Returnerar { ok, anomaly, detail?, troskel? }.
 * anomaly=true → troligt avläsningsfel → granskning.
 */
export function validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly }) {
  if (!pricePerSeatMonthly || pricePerSeatMonthly <= 0 || !normalizedSupplier) {
    return { ok: true, anomaly: false };
  }
  const key = leverantorsnyckel(normalizedSupplier);
  if (!key) return { ok: true, anomaly: false };
  const troskel = AVLASNINGSTROSKEL[key];
  if (pricePerSeatMonthly > troskel) {
    return {
      ok: false,
      anomaly: true,
      detail: `pricePerSeat ${pricePerSeatMonthly} kr > avläsningströskeln ${troskel} kr — troligt avläsningsfel (${normalizedSupplier})`,
      troskel,
    };
  }
  return { ok: true, anomaly: false, troskel };
}
