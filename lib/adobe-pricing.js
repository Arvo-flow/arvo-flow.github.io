// lib/adobe-pricing.js — B2B-momslogik för Adobe (saas-creative).
//
// Arvo är en B2B-plattform → ALLA riktpriser ska vara EXKL moms (företag drar av momsen).
// Adobe visar sina INDIVID-priser INKL 25% moms (t.ex. "311,25 SEK/mån inkl. moms") → vi skalar av
// momsen matematiskt (÷ 1,25) i KOD, med robust 2-decimalsavrundning så att JS:s flyttalsberäkningar
// aldrig spräcker en regressionssvit. Adobes TEAM/B2B-priser (per licens) ankras direkt — deras
// moms-bas verifieras separat (Zero Trust: vi gissar aldrig en moms-bas, vi de-momsar aldrig ett pris
// som redan är exkl moms). Ingen FX — allt är äkta SEK direkt från adobe.com/se.

const VAT_RATE = 0.25;

/** Robust avrundning till 2 decimaler. Number.EPSILON skyddar mot flyttalsdrift (t.ex. 0.1+0.2). */
export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

/** Skala av svensk moms (25 %) från ett INKL-moms-pris → EXKL moms, avrundat till 2 decimaler. */
export const exVat = (inclSek) => round2(Number(inclSek) / (1 + VAT_RATE));

/** Lägg på moms (25 %) på ett exkl-moms-pris → inkl moms. Invers av exVat (rundningssäkert). */
export const incVat = (exSek) => round2(Number(exSek) * (1 + VAT_RATE));
