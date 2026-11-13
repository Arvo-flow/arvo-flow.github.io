// tests/fakturakedjan/fall.mjs — matrisen för instrument A (FV, tests/fakturakedjan.mjs).
// Varje fall är en faktura som extraktionen hade lämnat den, kategoriseringens svar och modellens svar.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixtures as kombinerade } from '../fixtures/03-combined.mjs';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '../..');

const MODELLEN = {
  ja: { recommendationType: 'switch', shouldSwitch: true, savingPerYear: 9600, overpaymentPercent: 30,
    confidence: 0.9, vipQueue: false, suggestedSupplier: 'Tele2', suggestedAnnualCost: 12000,
    reasoning: 'Byt till ett billigare abonnemang och spara 9 600 kr per år.', switchSteps: ['Byt abonnemang.'] },
  nej: { recommendationType: 'no_action', shouldSwitch: false, savingPerYear: 0, overpaymentPercent: 0,
    confidence: 0.9, vipQueue: false, reasoning: 'Ert avtal ser bra ut.', switchSteps: [] },
};

export const MOBILRAD = /\((\d+) st\)/;
export const BREDBANDSRAD = /bredband|fiber|internet|adsl|ftth/i;

/** En rad som extraktionen hade lämnat den, med eller utan avläst antal. */
function rad(l, antalAvlast) {
  const m = MOBILRAD.exec(l.description);
  const q = !antalAvlast ? null
    : m ? Number(m[1])
      : (!l.is_addon && BREDBANDSRAD.test(l.description)) ? 1 : null;
  const jamnt = q && l.amount % q === 0;
  return {
    description: l.description, amount: l.amount, type: l.type ?? 'recurring_subscription',
    quantity: q, unitPrice: jamnt ? l.amount / q : null,
    is_addon: l.is_addon ?? false, addon_type: l.addon_type ?? null, is_prorata: false,
    amount_ore: l.amount * 100, unit_price_ore: jamnt ? (l.amount / q) * 100 : null,
  };
}

function fall({ id, kategori, rader, antalAvlast, modell, blandad = false, hastighet = null,
  leverantor = 'Tele2 Sverige AB', normaliserad = 'Tele2', industry = 'konsult', employees = 10,
  beskrivning = 'Mobilabonnemang oktober 2026' }) {
  const lineItems = rader.map((l) => rad(l, antalAvlast));
  const summa = lineItems.reduce((s, l) => s + l.amount, 0);
  const lopande = lineItems.filter((l) => l.type === 'recurring_subscription').reduce((s, l) => s + l.amount, 0);
  const platser = lineItems.filter((l) => l.quantity && MOBILRAD.test(l.description)).reduce((s, l) => s + l.quantity, 0);
  return {
    id, industry, employees,
    extraktion: {
      supplier: leverantor, date: '2026-10-01', invoiceNumber: null,
      description: beskrivning, billingPeriod: 'monthly', lineItems,
      confidenceScore: 0.95, confidenceNotes: null, outOfScope: false, outOfScopeReason: null,
      seatCount: platser > 0 ? platser : null, projectedRecurringAmount: lopande,
      currency: 'SEK', moms_bas: 'exkl', moms_sats: 0.25, potential_mixed_categories: blandad,
      invoiceTotal: summa, connection_speed_mbit: hastighet,
    },
    kategorisering: { category: kategori, subType: null, normalizedSupplier: normaliserad, confidence: 0.95, reasoning: 'Klassad.' },
    modellen: MODELLEN[modell],
    oraklet: platser > 0 ? String(platser) : '',
    _modell: modell, _antal: antalAvlast,
  };
}

// ── Matrisen ──────────────────────────────────────────────────────────────────────────────────────
export const MOBILFALL = [];
for (const fx of kombinerade.filter((f) => f.category === 'mobil')) {
  for (const modell of ['ja', 'nej']) {
    for (const antalAvlast of [true, false]) {
      MOBILFALL.push(fall({ id: `${fx.id}·${modell}·${antalAvlast ? 'antal' : 'utan'}`, kategori: 'mobil',
        rader: fx.lineItems, antalAvlast, modell, blandad: fx.mixed === true,
        hastighet: fx.metrics?.secondaryConnectionSpeedMbit ?? null,
        industry: fx.industry ?? 'konsult', employees: fx.employees ?? 10 }));
    }
  }
}
const RENA = [
  { id: 'xl349', rader: [{ type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (10 st)', amount: 3490 }] },
  { id: 'm299', rader: [{ type: 'recurring_subscription', description: 'Tele2 Jobbmobil M (10 st)', amount: 2990 }] },
];
for (const r of RENA) {
  for (const modell of ['ja', 'nej']) {
    for (const antalAvlast of [true, false]) {
      MOBILFALL.push(fall({ id: `${r.id}·${modell}·${antalAvlast ? 'antal' : 'utan'}`, kategori: 'mobil',
        rader: r.rader, antalAvlast, modell }));
    }
  }
}
export const it8821 = JSON.parse(readFileSync(join(ROT, 'tests/fixtures/it-8821-ms365.json'), 'utf8'));
export const MOTPROV = [
  // 699 kr/mån för 1000 Mbit mot Tele2:s 319: 54 % lägre, under sanitetsvaktens tak på 65 %.
  fall({ id: 'motprov·bredband', kategori: 'bredband', modell: 'ja', antalAvlast: true, hastighet: 1000,
    leverantor: 'Telia Sverige AB', normaliserad: 'Telia', beskrivning: 'Företagsbredband oktober 2026',
    rader: [{ type: 'recurring_subscription', description: 'Bredband Fiber 1000/1000 Mbit/s', amount: 699 }] }),
  {
    ...fall({ id: 'motprov·it8821', kategori: 'saas-productivity', modell: 'ja', antalAvlast: true,
      leverantor: it8821.supplier, normaliserad: 'Microsoft', industry: 'bygg', employees: it8821.employees,
      beskrivning: 'Microsoft 365 licenser maj 2026',
      rader: [] }),
  },
];
// Fyndmatrisen (Fables beslut 12 nov, beviskrav 3): varje fyndtyp i lib/forensics.js på en ren och en kombinerad
// mobilfaktura, med modellens ja och nej. Forensiken räknar fyndet ur kundens egna rader, och planvalsbeskedet står
// i samma vy. K-2 (delbetalningen) och N-1 (leverantörens egen höjning) fälldes på två av dem.
export const FYNDRADER = {
  hardware_overpaid: 'Delbetalning iPhone 15 Pro, månad 38 av 36',
  supplier_documented_hike: 'Prisjustering mobilabonnemang',
  fx_surcharge: 'Valutapåslag',
  hardware_financing: 'Delbetalning iPhone 15 Pro, månad 12 av 36',
  junk_fee: 'Pappersfakturaavgift',
};
export const FYNDFALL = [];
for (const [typ, beskrivning] of Object.entries(FYNDRADER)) {
  for (const form of ['ren', 'komb']) {
    for (const modell of ['ja', 'nej']) {
      const rader = [{ type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (10 st)', amount: 3490 },
        ...(form === 'komb' ? [{ type: 'recurring_subscription', description: 'Företagsbredband Fiber 1000/1000', amount: 699 }] : []),
        { type: 'recurring_subscription', description: beskrivning, amount: 449 }];
      const f = fall({ id: `fynd·${typ}·${form}·${modell}`, kategori: 'mobil', modell, antalAvlast: true, rader,
        blandad: form === 'komb', hastighet: form === 'komb' ? 1000 : null });
      Object.assign(f.extraktion.lineItems.at(-1), { quantity: 1, unitPrice: 449, unit_price_ore: 44900 });
      f._fyndtyp = typ;
      FYNDFALL.push(f);
    }
  }
}

// Den tionde linsens fall A (O-1): en bredbandsfaktura med en mobildel. Sekundärvägen jämför mobildelen mot
// listpris; under 500 kr brutto blir den null, och meningen om resten får då inte påstå något om vad vi gjort.
// Mobildelen à 449 kr är motprovet: där finns en sekundär besparing (2 160 kr).
export const KOMBIFALL = [];
for (const mobildel of [269, 299, 449]) {
  for (const modell of ['ja', 'nej']) {
    KOMBIFALL.push(fall({ id: `kombi·bredband+mobil${mobildel}·${modell}`, kategori: 'bredband', modell, antalAvlast: true,
      blandad: true, hastighet: 1000, leverantor: 'Telia Sverige AB', normaliserad: 'Telia',
      beskrivning: 'Företagsbredband och mobil oktober 2026',
      rader: [{ type: 'recurring_subscription', description: 'Företagsbredband Fiber 1000/1000', amount: 699 },
        { type: 'recurring_subscription', description: 'Mobilabonnemang Jobbmobil (1 st)', amount: mobildel }] }));
  }
}

// IT-8821 bär sina avlästa antal och à-priser ordagrant ur fixturen.
Object.assign(MOTPROV[1].extraktion, {
  date: it8821.date,
  lineItems: it8821.lineItems.map((l) => ({ ...l, is_prorata: false, amount_ore: l.amount * 100,
    unit_price_ore: l.unitPrice * 100 })),
  seatCount: it8821.seatCount,
  projectedRecurringAmount: it8821.lineItems.reduce((s, l) => s + l.amount, 0),
  invoiceTotal: it8821.lineItems.reduce((s, l) => s + l.amount, 0),
  potential_mixed_categories: false, connection_speed_mbit: null, license_type: null,
});
MOTPROV[1].oraklet = String(it8821.seatCount);

