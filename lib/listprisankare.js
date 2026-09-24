// lib/listprisankare.js — VAD ETT PROSPEKT FÅR HÖRA OM PRIS: DET VI KAN BELÄGGA (2026-09-24).
//
// Ersätter lib/outbound-estimator.js. Estimatorn räknade fram en «sannolik premie» för ett bolag vars
// faktura vi aldrig sett:
//   · antal abonnemang = anställda × SIM_RATIO («internal analysis», ingen källa);
//   · «typisk marknadskostnad» = det näst billigaste listpriset, antaget vara vad bolaget betalar;
//   · band ±15 % och 0,70–1,30, påhittade;
//   · besparing = skillnaden mellan två listpriser × det gissade antalet.
// Varje led var ett antagande, och produkten var ett tal om kundens pengar (regel 3, estimatorns egen
// regel 1: «Never claim to know the company's actual costs»).
//
// Ankaret säger bara det som är avläst: det lägsta verifierade publika listpriset PER ENHET, med produkt
// och verifieringsdatum, ur samma läsväg som rummets ankare (getPublicListBenchmark, regel 1). Talet är
// `p25` exakt — per år, eftersom årspriset är det verifierade talet (ett månadstal räknat tillbaka ur det
// kan skilja ett öre från listan).
//
// FÅNGAR: en kategori utan känd enhet (BRANCH_ANCHOR_UNIT) blir aldrig ett ankare; en kategori som inte är
//   `real-public` ger inget ankare; ett ankare utan produkt eller datum visas inte.
// BLIND: ankaret säger vad det billigaste publicerade priset är — aldrig att prospektet borde betala det.
//   Vilken nivå prospektet har vet vi inte (kraverBekraftadNiva bärs med för ytan att säga det).

import { getPublicListBenchmark } from './benchmark.js';
import { BRANCH_ANCHOR_UNIT } from './enhetsfras.js';

/**
 * Ett listprisankare för en kategori, eller null.
 * @param {string} kategori
 * @returns {null|{ kategori:string, referensProdukt:string, perEnhetAr:number, enhet:string, verifierad:string, kraverBekraftadNiva:boolean }}
 */
export function listprisankare(kategori) {
  const enhet = BRANCH_ANCHOR_UNIT[kategori];
  if (!enhet) return null;
  const b = getPublicListBenchmark({ category: kategori });
  if (!b || !(b.p25 > 0) || !b.referensProdukt || !b.lastVerified) return null;
  return {
    kategori,
    referensProdukt: b.referensProdukt,
    perEnhetAr: b.p25,
    enhet: enhet.label,
    verifierad: b.lastVerified,
    kraverBekraftadNiva: b.kraverBekraftadNiva === true,
  };
}

/**
 * Prospektets ankare: mobil alltid, Microsoft 365 när plattformen är bekräftad via DNS.
 * Räknas vid LÄSNING i api/prospect — en utskickad länk visar alltid dagens verifierade pris.
 * @param {{ mxPlatform?: string|null }} p
 */
export function prospektAnkare({ mxPlatform = null } = {}) {
  const kategorier = [...(mxPlatform === 'microsoft365' ? ['saas-productivity'] : []), 'mobil'];
  return kategorier.map(listprisankare).filter(Boolean);
}
