// lib/pastaendevakt.js — ett mekanismpåstående i koden måste peka på ett test som finns.
//
// ══ VARFÖR (2026-09-01, Fable 5.1:s granskning av Opus 5) ═══════════════════════════════════
//
// Fable hittade två fel på fyra verktygsanrop. Båda hade samma form, och det är samma form som
// ~25 av obduktionens egna fynd:
//
//   ETT PÅSTÅENDE SKREVS NER — i en kommentar, i bibeln, i en commit — INNAN DET KÖRDES.
//
//   «fail-closed — nekar allt när hemligheten är osatt»   → `Bearer undefined` släpptes in  // pastaende-ok: citerar ett FÄLLT påstående
//   «samma gränssnitt som FileStore»                       → list() gav poster  // pastaende-ok: citerar ett FÄLLT påstående
//
// Ingendera var kunskapsbrist. Båda var en mening som lät sann, skriven av den som just byggt
// mekanismen, och därefter läst av alla som en bevisad egenskap. Bibeln säger det själv:
// **granskarens blick är inte byggarens** — men strukturen tvingade aldrig fram bytet av blick.
//
// Vakten gör påståendet till en KONTROLLERBAR utsaga: skriver du att något är fail-closed ska  // pastaende-ok: beskriver vaktens regel
// raden bära ett test-ID som finns i tests/. Den bevisar aldrig att testet PRÖVAR det påstådda —
// det kan ingen maskin. Den bevisar att beviset existerar och går att slå upp, vilket är exakt
// det som saknades i båda fallen. Samma sort som vaktkontraktet: en TVINGANDE FRÅGA, aldrig ett bevis.
//
// ══ VARFÖR ORDLISTAN ÄR SÅ KORT ═════════════════════════════════════════════════════════════
//
// Mätt på 20 commits tillagda rader i lib/api/agents/src (2026-09-01):
//
//   aldrig            25 träffar   ← bannlyst ord hade fällt nästan varje commit
//   får aldrig         3
//   alltid             3
//   fail-closed        2 ·  fail-open 1 ·  samma gränssnitt 1   // pastaende-ok: mätvärden, inte påståenden
//
// «Ett larm som skriker på fel saker blir avstängt, och en avstängd vakt är värre än ingen»
// (smyghöjningen 2026-08-05). Ordlistan bär därför bara MEKANISMPÅSTÅENDEN — utsagor om hur
// koden beter sig, som ett test kan pröva. Normativa regler («vi lovar aldrig X») är inte
// påståenden om mekanik och står utanför med flit.
//
// FÅNGAR: en ny kommentarrad som påstår en mekanisk egenskap utan att peka på ett test som finns.
// BLIND: vakten läser ORDEN, aldrig innebörden. Ett påstående formulerat utan något av orden
//   passerar, och ett citerat test-ID kan peka på ett test som prövar något helt annat. Den
//   flyttar bevisbördan; den bär den inte. Den ser heller bara TILLAGDA rader — historiska
//   påståenden är utanför, för annars hade den fällt varje commit och blivit avstängd.

/** Mekanismpåståenden: utsagor om hur koden beter sig, som ett test kan pröva. */
export const PASTAENDEORD = Object.freeze([
  'fail-closed', 'fail closed', 'fail-open', 'fail open',
  'samma gränssnitt', 'samma kontrakt', 'samma signatur',
  'sabotage-bevisad', 'sabotage-bevisat', 'sabotage-bevisade',
  'testlåst', 'testlåsta', 'maskinvakt', 'maskinlås',
  'kan aldrig', 'går aldrig att', 'omöjligt att representera',
]);

/** Ett test-ID: två—fyra versaler, bindestreck, två siffror. SA-06 · AK-14 · SL-01 · MK-09. */
export const TEST_ID = /\b[A-ZÅÄÖ]{2,4}-\d{2}\b/;

/** Inline-motivering, samma mönster som claims-ok / kopia-ok / triage-ok / sondvakt-ok. */
const MOTIVERAD = /pastaende-ok:/;

const KOMMENTAR = /^\s*(\/\/|\*|\/\*|#)/;

/**
 * Dömer EN tillagd rad.
 * @returns {{ brott: boolean, skal: string|null }}
 */
export function domRad(rad) {
  const text = String(rad ?? '');
  if (!KOMMENTAR.test(text)) return { brott: false, skal: null };        // bara kommentarer
  if (MOTIVERAD.test(text)) return { brott: false, skal: null };         // motiverad undantagen
  const lag = text.toLowerCase();
  const traff = PASTAENDEORD.find((o) => lag.includes(o));
  if (!traff) return { brott: false, skal: null };
  if (TEST_ID.test(text)) return { brott: false, skal: null };           // beviset är utpekat
  return { brott: true, skal: traff };
}

/**
 * Plockar tillagda rader per fil ur en `git diff --cached -U0`.
 * Ren funktion så att kedjan diff → dom går att pröva utan git (regel: mekanismen prövad,
 * MATNINGEN aldrig — RO-01:s läxa; ett test som bygger sitt eget indata ser inget formatbyte).
 * @returns {Map<string, Array<{ rad: string, nr: number }>>}
 */
export function tillagdaRader(diff) {
  const per = new Map();
  let fil = null;
  let nr = 0;
  for (const rad of String(diff ?? '').split('\n')) {
    const nyFil = rad.match(/^\+\+\+ b\/(.+)$/);
    if (nyFil) { fil = nyFil[1]; if (!per.has(fil)) per.set(fil, []); continue; }
    const hunk = rad.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
    if (hunk) { nr = Number(hunk[1]); continue; }
    if (rad.startsWith('+') && !rad.startsWith('+++')) {
      if (fil) per.get(fil).push({ rad: rad.slice(1), nr });
      nr += 1;
    }
  }
  return per;
}

/** Filer vakten bryr sig om — koden som bär mekaniken. */
export const BEVAKADE = /^(lib|api|agents|src|scripts)\//;

/**
 * Test-ID:n som citeras på tillagda KOMMENTARRADER. Skalet slår upp dem i tests/ — utan den
 * kontrollen räcker det att skriva «XX-01» för att tysta vakten, och då vaktar den stavning  // pastaende-ok: illustrativt ID
 * i stället för bevis.
 * @returns {string[]} unika ID:n
 */
export function citeradeTestId(diff) {
  const funna = new Set();
  for (const [fil, rader] of tillagdaRader(diff)) {
    if (!BEVAKADE.test(fil)) continue;
    for (const { rad } of rader) {
      if (!KOMMENTAR.test(rad)) continue;
      // En rad som redan är motiverad som DISKUSSION citerar inget bevis — den illustrerar.
      // Utan det undantaget var vakten självmotsägande: `domRad` släpper igenom en motiverad
      // rad, medan uppslaget fällde samma rad för ett illustrativt ID. (PV-10.)
      if (MOTIVERAD.test(rad)) continue;
      for (const m of rad.matchAll(new RegExp(TEST_ID, 'g'))) funna.add(m[0]);
    }
  }
  return [...funna];
}

/**
 * Finns ID:t som en TESTTITEL — `test('SL-04 · …')` — och inte bara som en sträng någonstans?
 *
 * Första versionen sökte ID:t var som helst i tests/, och det skarpa provet fällde den direkt:
 * `ZZ-99` godkändes, eftersom jag själv skrivit strängen i en testfixtur. En vakt vars uppslag  // pastaende-ok: illustrativt ID
 * träffar sin egen fixtur är grön på fel grund — samma sjukdom den byggdes mot.
 *
 * Mätt 2026-09-01: samtliga nio prövade ID:n (SL-04, AK-13, SA-09, MK-09, RO-01, OB-19, LK-01,
 * PV-01, CK-03) står som testtitel i exakt en fil. Formen är alltså kodbasens, inte en gissning.
 */
export function arRiktigtTest(id, testkallor) {
  const säker = String(id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b(test|describe)\\(\\s*['"\`]\\s*${säker}\\b`).test(String(testkallor ?? ''));
}

/**
 * Hela kedjan: en rå diff in, brotten ut.
 * @returns {Array<{ fil: string, nr: number, skal: string, rad: string }>}
 */
export function granskaDiff(diff) {
  const brott = [];
  for (const [fil, rader] of tillagdaRader(diff)) {
    if (!BEVAKADE.test(fil)) continue;
    for (const { rad, nr } of rader) {
      const dom = domRad(rad);
      if (dom.brott) brott.push({ fil, nr, skal: dom.skal, rad: rad.trim().slice(0, 110) });
    }
  }
  return brott;
}
