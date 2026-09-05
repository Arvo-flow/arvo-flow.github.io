// lib/kategoribeslut.js — SAMMA DOKUMENT SKA GE SAMMA SVAR.
//
// ══ VARFÖR (2026-09-05, ur Dustin-fakturan) ═════════════════════════════════════════════════
//
// Grundaren laddade upp EXAKT samma PDF tre gånger och fick tre olika kort. Mätt i produktion:
//   körning 1 → route review_queue, skäl `volume_data_required`
//   körning 2 → route review_queue, skäl `categorization_conflict`
// Samma fil, samma kod, olika svar. För en kund som visar kortet för sin ekonomichef och laddar
// upp igen är det förödande: tjänsten motsäger sig själv inför vittne.
//
// ORSAKEN, mätt och inte gissad. `deterministicMatch('Dustin Sverige AB')` → null.
// `checkSupplierFingerprint(...)` → `{matched: false}`. Det finns alltså INGEN deterministisk
// ankarpunkt för den här leverantören, och kategorin avgörs av tre modellutdata i rad:
//   1. Sonnets kategori
//   2. Haikus validerings-kategori
//   3. Sonnets självrapporterade konfidens, mot tröskeln 0,8
// Tre tärningskast, och routningen hänger på om (1) och (2) råkar bli lika och om (3) råkar
// hamna över tröskeln. Ingen av dem är stabil mellan körningar.
//
// Och två strukturella hål förstärkte det:
//   · TRIAGERADE fakturor cachas ALDRIG — de returnerar långt före `kv.set(cacheKey, …)`. Precis
//     de fakturor som är mest tvetydiga (och därför triageras) är alltså de som aldrig får ett
//     stabilt svar.
//   · VITLISTADE IP:n skriver aldrig cache. Grundarens egna uppladdningar kör därför om modellerna
//     varje gång — vår QA ser ett beteende ingen kund ser, och kunden ser ett vi aldrig testar.
//
// ══ VAD DEN HÄR MODULEN GÖR — OCH INTE GÖR ═════════════════════════════════════════════════
//
// Den binder kategoribeslutet till DOKUMENTET (`pdf_hash`) i stället för till körningen. Samma
// fil ger samma kategori, samma validatorutfall och därmed samma rutt — för varje utgång, även
// de triagerade, och oavsett vem som laddar upp.
//
// Det gör svaret REPRODUCERBART, aldrig RÄTT. Är första bedömningen fel är den fel konsekvent —
// och det är med flit: ett stabilt fel går att upptäcka, mäta och rätta, ett slumpmässigt gör det
// inte. Nyckeln bär därför en VERSION: en förbättrad kategoriserare ogiltigförklarar varje lagrat
// beslut, samma mönster som `pdf:result:vN`.
//
// ⚠️ DEN VERKLIGA FRÅGAN SOM STÅR KVAR, UTTALAD. Dustin-fakturan är 92 % hårdvaruköp
// (2 ThinkPads, 29 000 kr) och 8 % leasing (2 450 kr). Att Sonnet och Haiku är oense är inte ett
// haveri — det är två modeller som var för sig har rätt om VAR SIN DEL av en blandad faktura.
// En enda kategori på en blandad faktura är fel fråga, och det svaret bor i rad-först-migreringen
// (bibelns skuld 2b), inte här. Den här modulen ser till att tvetydigheten åtminstone är stabil.
//
// FÅNGAR: att samma dokument ger olika kundsynligt utfall mellan körningar.
// BLIND: modulen vet ingenting om kategorin är RÄTT. Den fryser ett beslut; den granskar det
//   aldrig. Och utan KV finns ingen frysning alls — då är beteendet exakt som förut, vilket är
//   rätt: en saknad cache får aldrig bli ett fel, bara en förlorad garanti.

const NYCKELVERSION = 'v1';
/** 30 dygn: kategorin för ett givet dokument ändras inte över tid — bara när VI blir bättre. */
export const KATEGORI_TTL = 30 * 24 * 60 * 60;

export const kategoriNyckel = (pdfHash) => `kat:${NYCKELVERSION}:${pdfHash}`;

/**
 * Läser ett fryst kategoribeslut. Returnerar null när det inte finns ELLER inte går att lita på.
 *
 * En lagrad post måste bära BÅDA leden — kategorin och validatorns utfall. Bara kategorin hade
 * gjort halva beslutet stabilt: validatorn hade fortsatt rulla tärning, och konflikten kunnat
 * uppstå och försvinna mellan körningar trots att kategorin låg still.
 */
export function lasBeslut(post) {
  if (!post || typeof post !== 'object') return null;
  const { categorized, validatorKategori } = post;
  if (!categorized || typeof categorized.category !== 'string') return null;
  // `validatorKategori` får vara null (validatorn kördes inte, eller föll utan att blockera) men fältet
  // måste FINNAS — annars vet vi inte om det är «kördes inte» eller «lagrades inte», och de två
  // ser likadana ut. Ett saknat fält är ett ofullständigt beslut, inte ett tomt.
  if (!('validatorKategori' in post)) return null;
  return { categorized, validatorKategori: validatorKategori ?? null };
}

/** Formen som lagras. Ren funktion så att sviten kan pröva den utan KV. */
export function byggBeslut(categorized, validatorKategori) {
  return {
    categorized,
    validatorKategori: validatorKategori ?? null,
    fattatAt: new Date().toISOString(),
  };
}
