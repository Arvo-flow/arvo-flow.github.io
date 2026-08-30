// lib/arvodeskorning.js — vilka genomförda byten har passerat karensen och ska faktureras?
//
// ══ VARFÖR (2026-08-28) ══════════════════════════════════════════════════════════════════════
//
// `lib/switcharvode.js` dömer EN switch: får den faktureras, och på vilket tal? Den här modulen
// går igenom liggaren och bygger kön. Uppdelningen är medveten — domen är en ren funktion som
// går att pröva mot varje gren, körningen är en loop som går att pröva mot varje liggartillstånd.
//
// TRE SAKER SOM MÅSTE VARA RÄTT, och som var och en är ett fel som redan begåtts i den här
// kodbasen i en annan form:
//
// 1. DATUMET LÄSES UR HISTORIKEN, ALDRIG UR `updatedAt`. Posten uppdateras vid VARJE senare
//    övergång, så `updatedAt` svarar på «när rörde vi posten sist», inte «när utfördes bytet».
//    Att läsa fel fält hade förskjutit karensen framåt varje gång något hände med posten —
//    ett tal som ser rätt ut och mäter fel sak (jfr enhetsfelet, 21 aug).
//
// 2. IDEMPOTENS. Cronen kör dagligen. Utan en spärr skulle samma byte köas varje dag för alltid.
//    Spärren är tillståndsmaskinen som redan finns: `success_fee_due` och `completed` betyder att
//    arvodet ÄR hanterat. `switchArvode` dömer BEHÖRIGHET («får detta faktureras?»); körningen
//    äger HANDLINGEN («har vi redan gjort det?»). Att blanda ihop dem vore att låta en domare
//    föra bok.
//
// 3. ETT FEL PÅ EN POST FÅR ALDRIG RIVA KÖRNINGEN. En trasig post ska rapporteras som trasig och
//    resten betas av — samma sats som larmmailet lärde oss 24 augusti, där ett ReferenceError i
//    ETT mail rev hela larmkörningen för varje kund i varje grupp.
//
// Och en fjärde sak, ur bokföringsplikten (Ellevio-fallet, 14 aug): VARJE post lämnar en rad.
// Den idempotensavvisade posten hamnar i `hanterade`, inte i tomma intet. Ett tyst överhoppande
// är omöjligt att skilja från en post som aldrig fanns — och det är den skillnaden som avgör om
// «kön är tom i dag» betyder «inget är moget» eller «körningen tappade tolv byten».
//
// FÅNGAR: att karensen räknas från fel datum, att ett arvode köas två gånger, och att en enda
//   trasig post stoppar hela faktureringen.
// BLIND: modulen ser liggaren, aldrig fakturasystemet. Att en köad post FAKTISKT blir en faktura
//   är nästa led — och tills det ledet finns är kön ett underlag för en människa, inte en
//   utförd handling. Det ska stå så i varje yta som visar den.

import { switchArvode, KARENS_DAGAR } from './switcharvode.js';

/** Tillstånd där arvodet redan är hanterat — de får aldrig köas igen. */
export const REDAN_HANTERAD = Object.freeze(['success_fee_due', 'completed']);

/**
 * När utfördes bytet? Läses ur historikens övergång till `applied_new` — det ögonblick Arvos
 * arbete var gjort. ALDRIG ur `updatedAt`, som rör sig med varje senare händelse.
 * @returns {Date|null} null = posten bär ingen sådan övergång (kan inte dateras)
 */
export function arbeteUtfortDatum(record) {
  const h = Array.isArray(record?.history) ? record.history : [];
  // Första gången posten nådde applied_new. Skulle den (mot state-machinens regler) ha nått det
  // två gånger är det den FÖRSTA som är utförandedatumet — karensen börjar när arbetet gjordes.
  const ev = h.find((e) => e?.to === 'applied_new' && e?.timestamp);
  if (!ev) return null;
  const d = new Date(ev.timestamp);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Bygger arvodeskön ur liggaren.
 *
 * @param {Array<object>} poster            switchposter (FileStore.list())
 * @param {object} [opts]
 * @param {(post: object) => Array<{supplier: string, date: string|Date}>} [opts.fakturorFor]
 *   Slår upp kundens fakturor för motbevisspärren. Utelämnad = inga fakturor kända = tystnad,
 *   vilket enligt grundarbeslutet INTE stoppar arvodet.
 * @param {Date} [opts.idag]
 * @returns {{ fakturerbara: Array, hallna: Array, hanterade: Array, trasiga: Array,
 *            summa: number, karensDagar: number }}
 */
export function arvodeskoen(poster, { fakturorFor = null, idag = new Date() } = {}) {
  const fakturerbara = [];
  const hallna = [];
  const hanterade = [];
  const trasiga = [];

  for (const post of poster ?? []) {
    try {
      const id = post?.id ?? post?.switchId ?? null;

      // IDEMPOTENS före allt annat: ett hanterat arvode ska inte ens dömas om. Men det BOKFÖRS —
      // ett tyst `continue` gör en hanterad post omöjlig att skilja från en tappad.
      if (REDAN_HANTERAD.includes(String(post?.state))) {
        hanterade.push({ id, tillstand: post?.state ?? null });
        continue;
      }

      const utfort = arbeteUtfortDatum(post);
      const dom = switchArvode({
        tillstand: post?.state,
        arbeteUtfortAt: utfort,
        arsbesparing: post?.context?.recommendation?.savingPerYear,
        gammalLeverantor: post?.context?.recommendation?.currentSupplier
          ?? post?.context?.invoice?.supplier ?? null,
        fakturorEfter: fakturorFor ? fakturorFor(post) : [],
        idag,
      });

      const rad = {
        id,
        kund: post?.context?.customer?.email ?? null,
        leverantor: post?.context?.recommendation?.suggestedSupplier ?? null,
        arbeteUtfortAt: utfort ? utfort.toISOString().slice(0, 10) : null,
        belopp: dom.belopp,
        skal: dom.skal,
        dagarKvar: dom.dagarKvar,
      };
      (dom.fakturerbar ? fakturerbara : hallna).push(rad);
    } catch (err) {
      // EN TRASIG POST FÅR ALDRIG RIVA KÖRNINGEN. Den bokförs som trasig — en post som tyst
      // försvinner är omöjlig att skilja från en som inte fanns.
      trasiga.push({ id: post?.id ?? null, fel: err?.message ?? 'okänt fel' });
    }
  }

  return {
    fakturerbara,
    hallna,
    hanterade,
    trasiga,
    summa: fakturerbara.reduce((s, r) => s + (r.belopp ?? 0), 0),
    karensDagar: KARENS_DAGAR,
  };
}
