// lib/kategorinyckel.js — EN KANONISK KATEGORINYCKEL PER PRODUKT (regel 1: en sanning per fråga).
//
// ══ VARFÖR MODULEN FINNS (grundarorder 2026-09-18) ══════════════════════════════════════════
// `vaxel` och `molnvaxel` var två nycklar för samma produkt. Det var inte bara otydligt — det var
// ett kundsynligt fel i fyra lager samtidigt, och alla fyra hade samma orsak: **infrastrukturen
// nycklades på det DÖDA namnet, så det LEVANDE namnet var osynligt för den.**
//
// Mätt 2026-09-18 genom att köra funktionerna, inte genom att läsa dem:
//
//  1. `checkSupplierFingerprint('telia','Telia Sverige AB','molnvaxel').categoryOk === false`.
//     Kategoriseraren kan BARA ge `molnvaxel` (`vaxel` finns inte i CATEGORIES). Telias
//     fingeravtryck väntade `vaxel`. Alltså föll varje Telia-växelfaktura till
//     `fingerprint_mismatch` → `route: 'review_queue'` → kunden fick «en människa tar vid»
//     i stället för det prissatta svar vi faktiskt kan ge. Samma sak för telenor, tele2 och tre,
//     vars listor aldrig ens nämnde växel — och det finns tre verkliga fixturer
//     (`telenor-molnvaxel-stor.pdf`, `tre-mobil-molnvaxel.pdf`, Telia).
//  2. `VALID_CATEGORIES` i `lib/category-validator.js` bar `vaxel`, inte `molnvaxel` — och den
//     listan INJICERAS I VALIDATORNS SYSTEMPROMPT. Andrahandsbedömaren fick alltså aldrig veta
//     att den kanoniska kategorin existerar och kunde omöjligt hålla med kategoriseraren.
//     `RELATED`-mjukaren, som skulle fånga just närliggande oenighet, var nycklad på `molnvaxel`
//     och kunde därför heller aldrig fyra. Tre lager, samma klyvning.
//  3. `catLabel('molnvaxel')` gav `"molnvaxel"` — den råa nyckeln, till kunden. `vaxel` gav «växel».
//  4. `SEAT_CATEGORIES` i `lib/production-monitor.js` saknade `molnvaxel`, alltså larmade
//     seatCount-vakten aldrig för en kategori vars hela prissättning är per användare.
//
// ══ VILKEN NYCKEL SOM VANN, OCH VARFÖR DET ÄR MÄTT OCH INTE TYCKT ═══════════════════════════
// `molnvaxel` är kanonisk. Fyra avläsningar, inte en smaksak:
//   · den är den ENDA kategoriseraren kan producera (`CATEGORIES` saknar `vaxel`),
//   · den är `real-public` med verifierat Telia-ankare, momsbas och `lastVerified`
//     — `vaxel` var `estimated` och beskrev sig själv som «branschuppskattning 49–149 kr/mth»,
//   · den står i `REVIDERADE_KATEGORIER`, alltså TALAR den; `vaxel` var tyst,
//   · den har en egen deterministisk modul (`lib/molnvaxel-recommendation.js`) och egen svit.
// Prisbokens `vaxel`-post var alltså ett SÄMRE estimat för samma produkt, och att ha två poster
// för en produkt är precis den dubbla sanning regel 1 finns mot.
//
// ══ VAD SOM INTE ÄR EN DUBBLETT — OCH DÄRFÖR INTE RÖRS ══════════════════════════════════════
// `lib/telekom-normalize.js` använder strängen `'vaxel'` som RADKLASS (`classifyTelekomLine` ger
// `'hardware' | 'vaxel' | 'mobil' | 'other'`). Det är en annan namnrymd: en radtyp inuti en
// telekomfaktura, inte en fakturakategori. Samma modul returnerar `category: 'molnvaxel'` för
// datapunkten. Att döpa om radklassen hade varit en beteendeändring utan att stänga något hål —
// och `'mobil'` kolliderar likadant, så en omdöpning av bara `vaxel` hade gjort axeln
// inkonsekvent. Kollisionen är namnlikhet, inte dubbel sanning.
//
// Det påståendet är inget vi litar på: KN-09 KÖR modulen och kräver att radklassen fortfarande
// ger `'vaxel'` medan `buildTelekomDatapoint` ger `category: 'molnvaxel'`. Ett undantag som ingen
// prövar är en bakdörr.
//
// ══ VAKTENS PREMISS (Verifieringsplikten p.5) ═══════════════════════════════════════════════
//   FÅNGAR: en legacy-nyckel som återinförs i en kategori-namnrymd någonstans i repot
//           (`tests/kategorinyckel.mjs` sveper källträdet), och en lagrad legacy-nyckel som
//           läses (`kanoniskKategori` normaliserar vid dörren).
//   BLIND:  svepet läser TEXT. En kategori som byggs dynamiskt (`'moln' + 'vaxel'`), läses ur
//           databasen eller kommer ur en AI-sträng syns inte. Därför normaliseras det som KOMMER
//           IN, i stället för att bara förbjudas i källan — de två halvorna täcker olika hål.

/**
 * Legacy-stavningar → den kanoniska nyckeln. Växer när en kategori byter namn.
 * Nyckeln får ALDRIG tas bort ur den här kartan så länge en lagrad rad kan bära den: raden är
 * kundens historik, och en oläsbar historik är ett tyst tapp (arkiveringens läxa, 11 september).
 */
export const LEGACY_KATEGORINYCKLAR = Object.freeze({
  vaxel: 'molnvaxel',
});

/**
 * Normaliserar en kategorinyckel till sin kanoniska form.
 *
 * `null`/`undefined`/tom sträng ger `null` MED FLIT och kastar inte: en okategoriserad faktura är
 * ett legitimt tillstånd i hela kodbasen (`category: null` i `watchedCard`), till skillnad från
 * `curlExit` i kanariedomen där «ingen frågade» aldrig får likna ett svar. Okända nycklar går
 * igenom oförändrade — modulen är en ALIAS-karta, inte en giltighetskontroll. Giltigheten ägs av
 * `CATEGORIES` och `VALID_CATEGORIES`, och två kontroller av samma sak kan glida isär.
 */
export function kanoniskKategori(kategori) {
  if (kategori === null || kategori === undefined) return null;
  const k = String(kategori).trim();
  if (k === '') return null;
  return LEGACY_KATEGORINYCKLAR[k] ?? k;
}

/** Är nyckeln en avvecklad stavning? Används av vakten och av migreringssonder. */
export function arLegacyKategori(kategori) {
  return Object.prototype.hasOwnProperty.call(
    LEGACY_KATEGORINYCKLAR, String(kategori ?? '').trim());
}
