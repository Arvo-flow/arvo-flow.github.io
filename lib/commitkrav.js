// lib/commitkrav.js — en beteendeändring i lib/ eller api/ ska namnge sitt syskonfall och sitt
// sabotage, och sabotaget ska redovisa vad som FÖLL.
//
// ══ VARFÖR (2026-09-01, Fable 5.1:s punkt 3 och 4) ══════════════════════════════════════════
//
// TVÅ MÖNSTER I MITT EGET ARBETE, båda synliga i git-loggen:
//
// 1. STORA COMMITS GÅR INTE ATT GRANSKA — de går bara att lita på. Mina commits blandade kod,
//    tester, sond, bibel och workflow i ett svep. Fable hittade två fel på fyra anrop just för
//    att han läste koden i stället för commit-texten; en granskare med mindre tid hade litat på
//    beskrivningen. Kravet på rubrikerna tvingar fram frågan «vilket grannfall körde jag?» innan
//    commiten skrivs, inte efteråt.
//
// 2. TVÅ AV MINA SABOTAGE VAR NO-OPS. Ersättningssträngen matchade ingenting, sviten förblev
//    grön, och jag läste det gröna som «vakten håller». Det gröna betydde «jag testade inte».
//    Därför måste sabotage-rubriken redovisa ETT TAL — hur många tester som föll. Ett sabotage
//    som fäller noll tester är per definition ingen prövning.
//
// Bakgrunden är syskonfallsregeln, som redan står i bibeln (24 aug): **en fix är inte klar förrän
// dess syskonfall är körda.** Regeln har funnits i prosa i en vecka och följts när jag råkat komma
// ihåg den. Det här gör den till en fråga maskinen ställer varje gång.
//
// FÅNGAR: en beteendeändring i lib/ eller api/ vars commit inte namnger grannfallet, inte
//   redovisar ett sabotage, eller redovisar ett sabotage som inte fällde något.
// BLIND: vakten läser RUBRIKERNA, aldrig sanningen i dem. «Syskonfall: inga» passerar, och ett
//   påhittat tal passerar. Den flyttar bevisbördan till en skriven mening som en granskare kan
//   slå upp — den bär den inte. Den ser heller bara lib/ och api/: agents/ och src/ står utanför
//   med flit, för en bred vakt som fäller varje commit blir avstängd (smyghöjningen 2026-08-05).

export const SYSKON_RUBRIK = /^\s*Syskonfall:\s*(\S.*)$/mi;
export const SABOTAGE_RUBRIK = /^\s*Sabotage som fällde:\s*(\S.*)$/mi;

/** Kräver rubriker bara när mekaniken faktiskt ändras. */
export const KRAVDA_KATALOGER = /^(lib|api)\//;

/**
 * Är detta en beteendeändring? En ren kommentar-/dokumentationsändring är det inte, och att
 * kräva ett sabotage för en rättstavning hade gjort vakten till något man kringgår med
 * `--no-verify` — vilket är sämre än ingen vakt alls.
 *
 * @param {string} diff  `git diff --cached` för de kravda katalogerna
 */
export function arBeteendeandring(diff) {
  let fil = null;
  for (const rad of String(diff ?? '').split('\n')) {
    const nyFil = rad.match(/^\+\+\+ b\/(.+)$/);
    if (nyFil) { fil = nyFil[1]; continue; }
    if (!fil || !KRAVDA_KATALOGER.test(fil)) continue;
    if (!rad.startsWith('+') || rad.startsWith('+++')) continue;
    const kod = rad.slice(1).trim();
    if (kod === '') continue;
    if (/^(\/\/|\*|\/\*|\*\/|#)/.test(kod)) continue;      // kommentar
    return true;
  }
  return false;
}

/**
 * @param {string} meddelande  commit-meddelandet
 * @param {string} diff        stageade diffen
 * @returns {{ ok: boolean, brister: string[] }}
 */
export function granskaCommit(meddelande, diff) {
  if (!arBeteendeandring(diff)) return { ok: true, brister: [] };

  const brister = [];
  const text = String(meddelande ?? '');

  if (!SYSKON_RUBRIK.test(text)) {
    brister.push('«Syskonfall:» saknas — vilket grannfall kördes? (svara «inga, och varför» om det inte finns)');
  }
  const sab = text.match(SABOTAGE_RUBRIK);
  if (!sab) {
    brister.push('«Sabotage som fällde:» saknas — vilket sabotage prövades, och vad föll?');
  } else if (!/\d/.test(sab[1])) {
    // Ett sabotage utan ett tal är en känsla. Två av mina egna sabotage var no-ops: strängen
    // matchade inte, sviten förblev grön, och det gröna betydde «jag testade inte».
    brister.push('«Sabotage som fällde:» saknar ett TAL — ett sabotage som fäller noll tester är ingen prövning');
  }
  return { ok: brister.length === 0, brister };
}
