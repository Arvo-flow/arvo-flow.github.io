// lib/fee.js — EN sanning för Arvos besparingsarvode (regel 1).
//
// Success fee: 20 % av realiserad besparing (bibeln, Affärsmodell — Nivå 1+2,
// utlöses av VERIFIERAD realisering). Innan denna modul bodde talet hårdkodat
// på åtta backend-platser och räknades dessutom om i frontend (×0,80-läxans
// felklass). Nu: alla kronor härleds HÄR; frontend renderar, räknar aldrig
// (maskinvakt: claims-audit klassregeln blockerar *aving*-aritmetik i src/).
//
// Avrundningskonvention: fee = round(gross × 0,20), net = gross − fee.
// För heltalsbelopp gäller exakt net === round(gross × 0,80) (0,2×heltal har
// aldrig ,5-decimal), så konventionen är identisk med de historiska ×0,80-
// platserna — inga kundtal ändras av centraliseringen (bevisat: korpusdiff).

export const ARVO_FEE_RATE = 0.20;

/** Arvos arvode i hela kronor för en given bruttobesparing. */
export function feeOf(grossSaving) {
  if (!(grossSaving > 0)) return 0;
  return Math.round(grossSaving * ARVO_FEE_RATE);
}

/** Kundens nettobesparing i hela kronor (brutto − arvode). */
export function netOf(grossSaving) {
  if (!(grossSaving > 0)) return 0;
  return grossSaving - feeOf(grossSaving);
}
