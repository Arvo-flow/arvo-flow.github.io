// lib/hardware-installments.js — hårdvaruavbetalningar: detektion + justerad besparingsbas.
//
// FLYTTAD från src/pages/TestaFaktura (regel 1/2): frontend beräknade den justerade
// besparingsbasen, arvodet, nettot OCH break-even ur radposterna — affärslogik och
// besparingsaritmetik i renderingslagret. Nu räknar backend; API:t emitterar färdiga
// tal (hardwareAdjustment) och frontend renderar dem.
//
// Domänen: en delbetald mobil/router ("Delbetalning iPhone — månad 7 av 24") är en
// SKULD som följer kunden vid byte, inte en abonnemangskostnad. Besparingsbasen
// justeras därför ner med hårdvarans årskostnad innan jämförelsen mot marknadspriset
// — annars lovar vi en besparing kunden inte kan realisera (regel 3: räkna hem-bar).
//
// ── DRA BARA AV DET ÅRSKOSTNADEN BAR, I FAKTURANS PERIOD (X-1, tolfte blicken på S1) ─────────────
// Justeringen drog av `belopp × 12` för varje avbetalning från `annualCost`. Två fel i den raden:
//   · `annualCost` summerar bara rader av typen `recurring_subscription` (agents/test-invoice/extract.js,
//     `sum('recurring_subscription')`); en rad som extraktionen typar `hardware` räknas i `oneTimeFees`.
//     Avbetalningen drogs alltså av från ett tal som aldrig bar den, och «Ni betalar idag» blev för lågt
//     med avbetalningens årsbelopp: 11 616 kr/år i abonnemang visades som 10 416.
//   · `× 12` antog att radbeloppet gäller en månad. På en kvartalsfaktura bär raden tre månader, och
//     «Exkl. hårdvaruavbetalningar (N kr/år)» blev tre gånger för stort.
// Nu räknas varje avbetalning i fakturans period, med samma faktor som `annualCost` räknades med
// (`annualCost / projectedRecurringAmount`, extraktionens egen multiplikator, aldrig en kopia av
// tabellen), och bara de rader som `annualCost` bar dras av. HJ-01..05 i tests/fee.mjs.

import { feeOf, netOf } from './fee.js';

const INSTALLMENT_RX = /[Mm]ånad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;

// Den enda radtyp som `annualCost` summerar (extract.js). En avbetalning av den typen ingår i årskostnaden.
const I_ARSKOSTNADEN = 'recurring_subscription';

/**
 * Hitta pågående hårdvaruavbetalningar i radposterna.
 * @param {Array} lineItems
 * @param {{ perioderPerAr: number }} o  hur många gånger per år fakturan återkommer. Obligatorisk:
 *   radbeloppet gäller fakturans period, och utan perioden finns inget månadsbelopp att räkna.
 * @returns {Array<{description, monthlyCost, monthsRemaining, remainingCost, arsbelopp, iArskostnaden}>}
 */
export function detectHardwareInstallments(lineItems, { perioderPerAr } = {}) {
  if (!(perioderPerAr > 0)) {
    throw new TypeError('detectHardwareInstallments: perioderPerAr krävs (radbeloppet gäller fakturans period, X-1).');
  }
  if (!Array.isArray(lineItems)) return [];
  return lineItems.flatMap((li) => {
    const isHw = li.type === 'hardware' || li.description?.toLowerCase().includes('delbetalning');
    if (!isHw) return [];
    const m = INSTALLMENT_RX.exec(li.description ?? '');
    if (!m) return [];
    const current = parseInt(m[1] ?? m[3], 10);
    const total   = parseInt(m[2] ?? m[4], 10);
    if (Number.isNaN(current) || Number.isNaN(total) || total <= current) return [];
    const arsbelopp = (li.amount ?? 0) * perioderPerAr;
    return [{
      description:     li.description,
      monthlyCost:     Math.round(arsbelopp / 12),
      monthsRemaining: total - current,
      remainingCost:   Math.round(((total - current) * arsbelopp) / 12),
      arsbelopp,
      iArskostnaden:   li.type === I_ARSKOSTNADEN,
    }];
  });
}

/**
 * Justerad besparingsbas när ett byte rekommenderas och fakturan bär hårdvaruskuld.
 * Returnerar null när ingen justering är tillämplig (ingen hårdvara, eller inget byte)
 * — då gäller rekommendationens ordinarie tal rakt av.
 *
 * `projectedRecurringAmount` är obligatorisk: kvoten mot `annualCost` är den faktor årskostnaden räknades
 * med, och utan den går det inte att veta vad årskostnaden bar. `undefined` kastar (anroparen glömde).
 *
 * breakEvenYears: hur många års justerad bruttobesparing som krävs för att äta upp
 * den kvarvarande hårdvaruskulden (1 decimal) — null när ingen besparing finns.
 *
 * skuldenIArskostnaden: true när varje avbetalning ingick i årskostnaden. Bara då är rekommendationens
 * egen nettobesparing talet för fallet att den nya leverantören tar över skulden; annars jämförde
 * rekommendationen redan utan avbetalningen, och vyn säger inget sådant tal.
 */
export function computeHardwareAdjustment({ lineItems, annualCost, projectedRecurringAmount, suggestedAnnualCost, shouldSwitch }) {
  if (shouldSwitch !== true) return null;
  if (projectedRecurringAmount === undefined) {
    throw new TypeError('computeHardwareAdjustment: projectedRecurringAmount krävs (årskostnadens faktor, X-1).');
  }
  const perAr = (annualCost ?? 0) > 0 && (projectedRecurringAmount ?? 0) > 0
    ? Math.round(annualCost / projectedRecurringAmount)
    : null;
  if (!(perAr > 0)) return null;
  const items = detectHardwareInstallments(lineItems, { perioderPerAr: perAr });
  const hwAnnualCost = Math.round(items.reduce((s, h) => s + h.arsbelopp, 0));
  if (hwAnnualCost <= 0) return null;

  const iArskostnaden    = Math.round(items.filter((h) => h.iArskostnaden).reduce((s, h) => s + h.arsbelopp, 0));
  const hwTotalRemaining = items.reduce((s, h) => s + h.remainingCost, 0);
  const adjAnnualCost    = Math.max(0, annualCost - iArskostnaden);
  const adjGrossSaving   = Math.max(0, adjAnnualCost - (suggestedAnnualCost ?? 0));
  const adjArvoFee       = feeOf(adjGrossSaving);
  const adjNetSaving     = netOf(adjGrossSaving);
  const breakEvenYears   = adjGrossSaving > 0
    ? Math.round((hwTotalRemaining / adjGrossSaving) * 10) / 10
    : null;
  const skuldenIArskostnaden = items.every((h) => h.iArskostnaden);

  return {
    items, hwAnnualCost, hwTotalRemaining, adjAnnualCost, adjGrossSaving, adjArvoFee, adjNetSaving, breakEvenYears,
    skuldenIArskostnaden,
  };
}
