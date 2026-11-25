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

import { feeOf, netOf } from './fee.js';

const INSTALLMENT_RX = /[Mm]ånad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;

/**
 * Hitta pågående hårdvaruavbetalningar i radposterna.
 * @returns {Array<{description, monthlyCost, monthsRemaining, remainingCost}>}
 */
export function detectHardwareInstallments(lineItems) {
  if (!Array.isArray(lineItems)) return [];
  return lineItems.flatMap((li) => {
    const isHw = li.type === 'hardware' || li.description?.toLowerCase().includes('delbetalning');
    if (!isHw) return [];
    const m = INSTALLMENT_RX.exec(li.description ?? '');
    if (!m) return [];
    const current = parseInt(m[1] ?? m[3], 10);
    const total   = parseInt(m[2] ?? m[4], 10);
    if (Number.isNaN(current) || Number.isNaN(total) || total <= current) return [];
    return [{
      description:     li.description,
      monthlyCost:     li.amount ?? 0,
      monthsRemaining: total - current,
      remainingCost:   (total - current) * (li.amount ?? 0),
    }];
  });
}

/**
 * Justerad besparingsbas när ett byte rekommenderas och fakturan bär hårdvaruskuld.
 * Returnerar null när ingen justering är tillämplig (ingen hårdvara, eller inget byte)
 * — då gäller rekommendationens ordinarie tal rakt av.
 *
 * breakEvenYears: hur många års justerad bruttobesparing som krävs för att äta upp
 * den kvarvarande hårdvaruskulden (1 decimal) — null när ingen besparing finns.
 */
export function computeHardwareAdjustment({ lineItems, annualCost, suggestedAnnualCost, shouldSwitch }) {
  if (shouldSwitch !== true) return null;
  const items = detectHardwareInstallments(lineItems);
  const hwAnnualCost = items.reduce((s, h) => s + h.monthlyCost * 12, 0);
  if (hwAnnualCost <= 0) return null;

  const hwTotalRemaining = items.reduce((s, h) => s + h.remainingCost, 0);
  const adjAnnualCost    = Math.max(0, (annualCost ?? 0) - hwAnnualCost);
  const adjGrossSaving   = Math.max(0, adjAnnualCost - (suggestedAnnualCost ?? 0));
  const adjArvoFee       = feeOf(adjGrossSaving);
  const adjNetSaving     = netOf(adjGrossSaving);
  const breakEvenYears   = adjGrossSaving > 0
    ? Math.round((hwTotalRemaining / adjGrossSaving) * 10) / 10
    : null;

  return { items, hwAnnualCost, hwTotalRemaining, adjAnnualCost, adjGrossSaving, adjArvoFee, adjNetSaving, breakEvenYears };
}
