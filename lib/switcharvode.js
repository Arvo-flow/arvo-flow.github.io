// lib/switcharvode.js — NÄR får Arvo fakturera sitt switch-arvode, och på vilket tal?
//
// ══ GRUNDARBESLUT 2026-08-28 — ARVODET UTGÅR PÅ UTFÖRT ARBETE + KARENS ═══════════════════════
//
// Ersätter mekaniken från 2026-06-21 ("arvodet fyrar när FortnoxWatchdog ser liggar-deltan").
// Den mekaniken krävde Fortnox, som inte är byggd — och det som FANNS i stället var värre än
// ingenting: `arvo_outcomes.source DEFAULT 'customer'` plus en 60-dagarsenkät. **Vi bad kunden
// självrapportera det tal vi fakturerar dem på.** Det gör intäkten beroende av att de svarar,
// och det är moatens raka motsats: vi är de enda som ser vad bolag faktiskt betalar.
//
// Den nya mekaniken, och varför den är hederlig:
//
//   TRIGGERN ÄR VÅR EGEN LIGGARE, INTE ETT ANTAGANDE. Vi frågar inte om bytet skedde — vi VET,
//   för vi utförde det. `APPLIED_NEW` är punkten där Arvos arbete är gjort: fullmakten signerad
//   med BankID, den gamla leverantören uppsagd, ansökan hos den nya inlämnad. Att kunden
//   formellt trycker på knappen ändrar vem som är avtalspart, aldrig vem som gjorde arbetet.
//
//   KARENSEN ÄR 90 DAGAR. Två till tre faktureringscykler — tid nog för att bytet ska ha landat
//   och för att en misslyckad övergång ska ha hunnit synas.
//
//   TALET ÄR ÅR-1-BESPARINGEN VI BERÄKNADE NÄR VI FÖRBEREDDE BYTET, × ARVO_FEE_RATE. Samma
//   sanning som resten av systemet (lib/fee.js) — aldrig en egen sats.
//
// ══ MOTBEVISSPÄRREN — DET ENDA VI VÄGRAR FAKTURERA ══════════════════════════════════════════
//
// Vi kräver INTE bevis för att fakturera. Men vi fakturerar aldrig mot ett bevis som säger emot.
// Fortsätter den GAMLA leverantören fakturera kunden efter bytesdatum är bytet demonstrabelt
// inte genomfört, och en faktura från oss vore felaktig. Då håller vi arvodet och namnger skälet.
//
// Skillnaden mot att kräva bevis är avgörande och medveten: frånvaro av fakturor (kunden slutade
// vidarebefordra) stoppar oss INTE — det är inte ett motbevis, det är tystnad. Bara en positiv
// motsägelse stoppar. Fail-closed på KONFLIKTEN, fail-open på tystnaden.
//
// FÅNGAR: att arvodet fyrar före arbetet är utfört, före karensen löpt ut, eller när kundens
//   egna fakturor visar att bytet inte genomfördes.
// BLIND: modulen vet att VI utförde bytet — aldrig att kunden faktiskt fick den nya tjänsten
//   levererad. En leverantör som accepterar ansökan och sedan aldrig aktiverar syns inte här;
//   den syns i den gamla leverantörens fortsatta fakturor, vilket är precis vad spärren läser.
//   Och den läser bara de fakturor vi FÅTT: en kund som slutat vidarebefordra är osynlig.

import { ARVO_FEE_RATE, feeOf } from './fee.js';

/** Karens i dagar mellan utfört byte och fakturerbart arvode. Grundarbeslut 2026-08-28. */
export const KARENS_DAGAR = 90;

/** Tillstånd där ARVOS arbete är utfört — ansökan inlämnad hos den nya leverantören. Tidigare
 *  tillstånd är förberedelse, och förberedelse fakturerar vi aldrig. */
export const ARBETE_UTFORT = Object.freeze(['applied_new', 'live', 'success_fee_due', 'completed']);

const dag = 24 * 60 * 60 * 1000;

/**
 * @param {object} p
 * @param {string} p.tillstand            switchpostens state (STATES i orchestrator.js)
 * @param {string|Date} p.arbeteUtfortAt  när bytet lämnades in hos ny leverantör
 * @param {number} p.arsbesparing         år-1-besparingen vi beräknade vid förberedelsen
 * @param {Array<{supplier: string, date: string|Date}>} [p.fakturorEfter]
 *   Kundens fakturor MED datum efter bytet — underlaget för motbevisspärren. Utelämnad eller
 *   tom lista är TYSTNAD, aldrig ett motbevis.
 * @param {string} [p.gammalLeverantor]   normaliserat namn på leverantören vi sade upp
 * @param {Date} [p.idag]
 * @returns {{ fakturerbar: boolean, belopp: number|null, skal: string|null, dagarKvar: number|null }}
 */
export function switchArvode({
  tillstand, arbeteUtfortAt, arsbesparing,
  fakturorEfter = [], gammalLeverantor = null, idag = new Date(),
} = {}) {
  const nej = (skal, dagarKvar = null) => ({ fakturerbar: false, belopp: null, skal, dagarKvar });

  // 1. Arbetet måste vara UTFÖRT. Förberedelse fakturerar vi aldrig — en fullmakt som ligger
  //    osignerad är inget vi kan ta betalt för.
  if (!ARBETE_UTFORT.includes(String(tillstand))) return nej(`arbete_ej_utfort_${tillstand ?? 'okant'}`);

  const utfort = arbeteUtfortAt instanceof Date ? arbeteUtfortAt : new Date(arbeteUtfortAt);
  if (Number.isNaN(utfort.getTime())) return nej('utforandedatum_saknas');

  // 2. Karensen. `Math.floor` gör att dag 90 exakt är fakturerbar, inte dag 91.
  const dagarSedan = Math.floor((idag.getTime() - utfort.getTime()) / dag);
  if (dagarSedan < KARENS_DAGAR) return nej('karens_loper', KARENS_DAGAR - dagarSedan);

  // 3. Talet. Måste vara ett verkligt, positivt belopp — ett arvode på en besparing vi inte
  //    kunde räkna fram är ett tal utan täckning (regel 3).
  const bas = Number(arsbesparing);
  if (!Number.isFinite(bas) || bas <= 0) return nej('arsbesparing_saknas');

  // 4. MOTBEVISSPÄRREN. Fakturerar den gamla leverantören fortfarande EFTER bytesdatum är bytet
  //    demonstrabelt inte genomfört. Tystnad (inga fakturor alls) stoppar oss inte — bara en
  //    positiv motsägelse gör det.
  if (gammalLeverantor) {
    const namn = String(gammalLeverantor).trim().toLowerCase();
    const motsagelse = (fakturorEfter ?? []).find((f) => {
      if (!f?.supplier) return false;
      const d = f.date instanceof Date ? f.date : new Date(f.date);
      if (Number.isNaN(d.getTime()) || d <= utfort) return false;
      return String(f.supplier).trim().toLowerCase().includes(namn)
        || namn.includes(String(f.supplier).trim().toLowerCase());
    });
    if (motsagelse) return nej('gammal_leverantor_fakturerar_fortfarande');
  }

  return { fakturerbar: true, belopp: feeOf(bas), skal: null, dagarKvar: 0 };
}

/** Arvodessatsen, exponerad för kundytor som ska skriva ut den. Aldrig en egen literal. */
export const ARVODESSATS = ARVO_FEE_RATE;
