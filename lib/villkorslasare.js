// lib/villkorslasare.js — LÄSAREN SOM FÖRTJÄNAR FÖRSEGLINGEN.
//
// Villkorsvakten kan bevisa att ett dokument är oförändrat och att världen fortfarande länkar
// det. Vad den ALDRIG kunnat bevisa är det som faktiskt styr kundens uppsägningsdatum: att
// klausulen vi citerar verkligen står i dokumentet. Därför stod boken röd — förseglingen krävde
// en läsning, och ingen läsning fanns. Den här modulen är läsningen.
//
// ── ABSOLUT OCH BINÄR (grundarkrav 2026-08-09) ──────────────────────────────────────────────
// Klausulen verifieras ORDAGRANT eller inte alls. Ingen fuzzy matching, ingen likhetspoäng,
// inga gissningar om att texten flyttat sig, inga genvägar. Ett enda avvikande tecken — en
// ändrad siffra, ett bytt ord, en flyttad parentes — och läsningen misslyckas.
//
// DEN ENDA TILLÅTNA NORMALISERINGEN ÄR BLANKSTEG, och det är inte en uppmjukning utan en
// nödvändighet: ett PDF-textlager bär ingen tillförlitlig blankstegsinformation. Telias
// tvåspaltiga sidor flätar kolumner mitt i meningar, och extraktionen delar dessutom ord över
// textfragment ("Uppsäg" + "ningstid"). Ett bokstavligt includes() hade därför gett FALSKT
// "klausulen är borta" på ett dokument där den står ordagrant — ett larm i den farliga
// riktningen. Vi stryker alltså ALLA blanksteg på båda sidor och kräver exakt teckenföljd på
// allt annat. Versaler, skiljetecken, siffror, parenteser: varje tecken måste stämma.
//
// ── TRE TILLSTÅND, ALDRIG TVÅ ───────────────────────────────────────────────────────────────
// "Jag kunde inte läsa dokumentet" får ALDRIG rapporteras som "klausulen är borta". Det vore
// exakt det fel modulen finns för att förhindra, fast åt andra hållet. Alltså:
//   FUNNEN  — textlagret bär, kontrollfrasen bär, citatet står ordagrant → förseglingen förtjänad
//   SAKNAS  — textlagret bär, kontrollfrasen bär, men citatet står INTE där → klausulen har rört sig
//   OLASBAR — vi kunde inte läsa dokumentet med säkerhet → vi vet ingenting, och säger det
//
// ── VARFÖR KONTROLLFRASEN FINNS ─────────────────────────────────────────────────────────────
// Utan den vore SAKNAS ett ANTAGANDE: "jag hittade inte citatet, alltså är det borta." Men ett
// trasigt textlager (bild-PDF, CID-teckensnitt utan ToUnicode) ger en lång sträng skräp som
// passerar varje längdtröskel och där ingenting hittas. Då hade vakten skrikit "klausulen är
// struken!" om ett dokument den aldrig läst. Kontrollfrasen är en andra, ordagrann sträng ur
// SAMMA dokument som vi vet ska finnas där. Hittas den bevisar den att läsningen fungerar — och
// först då är SAKNAS ett fynd i stället för en gissning. Hittas den inte är dokumentet oläsbart,
// oavsett hur mycket text som kom ut. Samma tanke som prisjuryns korroborering.
//
// VAKTKONTRAKTET (lib/vaktkontrakt.js) för den här läsningen:
//   fangar — klausulen flyttas, skrivs om eller stryks: nästa läsning hittar den inte ordagrant.
//   blind  — en klausul som ändrar BETYDELSE utan att ändra tecken (t.ex. genom att en definition
//            någon annanstans i dokumentet skrivs om) står kvar ordagrant och passerar. Läsaren
//            vaktar ordalydelse, aldrig innebörd.

/** Under så här många tecken är textlagret inte en läsning, det är en rest. */
export const MIN_TEXTLAGER = 2000;

export const LAS_UTFALL = {
  FUNNEN: 'funnen',
  SAKNAS: 'saknas',
  OLASBAR: 'olasbar',
};

/**
 * Den ENDA normaliseringen: bort med varje blanksteg. Ingenting annat rörs — inte versaler,
 * inte skiljetecken, inte siffror, inte bindestreck. Allt utom blanksteg är innehåll.
 */
export function normaliseraOrdagrant(s) {
  return String(s ?? '').replace(/\s+/gu, '');
}

/**
 * Läser EN klausul ur ETT extraherat textlager. Ren funktion — ingen I/O, inget nätverk.
 *
 * @param {object} p
 * @param {string} p.text          - textlagret som extraherades ur PDF:en
 * @param {string} p.citat         - den ordagranna klausulen ur villkorsboken
 * @param {string} p.kontrollfras  - en andra ordagrann sträng ur samma dokument (bevisar läsningen)
 * @returns {{ utfall: string, ok: boolean, skal: string }}
 */
export function lasKlausul({ text, citat, kontrollfras } = {}) {
  const rentCitat = normaliseraOrdagrant(citat);
  if (rentCitat.length < 20) {
    return { utfall: LAS_UTFALL.OLASBAR, ok: false,
      skal: 'citatet är för kort för att vara ett ordagrant belägg (minst 20 tecken utan blanksteg)' };
  }

  const rentKontroll = normaliseraOrdagrant(kontrollfras);
  if (rentKontroll.length < 20) {
    return { utfall: LAS_UTFALL.OLASBAR, ok: false,
      skal: 'ingen kontrollfras kurerad — utan den går läsningen inte att lita på, och "saknas" vore en gissning' };
  }

  const rentText = normaliseraOrdagrant(text);
  if (rentText.length < MIN_TEXTLAGER) {
    return { utfall: LAS_UTFALL.OLASBAR, ok: false,
      skal: `textlagret bar bara ${rentText.length} tecken — dokumentet gick inte att läsa (bild-PDF eller extraktionsfel)` };
  }

  // Kontrollfrasen först: bevisar den att läsningen fungerar innan vi uttalar oss om citatet.
  if (!rentText.includes(rentKontroll)) {
    return { utfall: LAS_UTFALL.OLASBAR, ok: false,
      skal: 'kontrollfrasen hittades inte i textlagret — läsningen går inte att lita på, alltså säger vi ingenting om citatet' };
  }

  if (rentText.includes(rentCitat)) {
    return { utfall: LAS_UTFALL.FUNNEN, ok: true,
      skal: `citatet står ordagrant i dokumentet (${rentCitat.length} tecken, exakt teckenföljd)` };
  }

  return { utfall: LAS_UTFALL.SAKNAS, ok: false,
    skal: 'läsningen fungerar (kontrollfrasen bär) men citatet står INTE i dokumentet — klausulen har flyttats, skrivits om eller strukits',
    ...narmasteAvvikelse(rentText, rentCitat) };
}

// ── VAR SLUTAR ÖVERENSSTÄMMELSEN? (2026-08-09) ──────────────────────────────────────────────
// Bahnhofs verkliga textlager visade "Dessa villkor galler då…" — extraktionen tappade ett ä.
// Ett SAKNAS kan därför ha två helt olika orsaker: klausulen har rört sig, eller textlagret mist
// ett tecken. De får ALDRIG förväxlas, och matchningen får inte mjukas upp för att dölja
// skillnaden. Lösningen är inte fuzzy matching utan BEVISNING: vi redovisar exakt var
// överensstämmelsen bryter och vad som står där i stället. Att skriva ut bevis är aldrig att
// gissa — det är motsatsen. Kurateringen görs sedan av en människa på seende, inte på tro.
export function narmasteAvvikelse(rentText, rentCitat) {
  let langst = 0, vid = -1;
  for (let i = 0; i + 1 <= rentText.length; i += 1) {
    if (rentText[i] !== rentCitat[0]) continue;
    let n = 0;
    while (n < rentCitat.length && rentText[i + n] === rentCitat[n]) n += 1;
    if (n > langst) { langst = n; vid = i; }
  }
  if (langst < 10) return { brytpunkt: null, bevis: 'ingen meningsfull överensstämmelse alls — citatet finns inte i dokumentet' };
  return {
    brytpunkt: langst,
    bevis: `matchade ${langst} av ${rentCitat.length} tecken, bröt vid «…${rentCitat.slice(Math.max(0, langst - 25), langst)}` 
      + `» — dokumentet har där «…${rentText.slice(Math.max(0, vid + langst - 25), vid + langst + 20)}»`,
  };
}
