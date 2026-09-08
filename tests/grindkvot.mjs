// tests/grindkvot.mjs — GK-01..05: tio försök ska vara TIO försök.
//
// ══ VARFÖR (2026-09-08) ═════════════════════════════════════════════════════════════════════
// Grundaren bad om tio försök innan e-postgrinden. Att bara ändra konstanten 2 → 10 hade sett
// klart ut och inte varit det — TRE grindar står i serie på samma fråga, och två av dem hade
// bitit först:
//
//   1. `hadSaving ||` i frontendens villkor. `arvo_had_saving` sätts så fort EN analys hittar en
//      besparing, så grinden fyrade på uppladdning TVÅ för varje besökare som fick en träff —
//      oavsett konstanten. Tio fria försök hade getts enbart till dem som ALDRIG hittar något.
//   2. `FREE_SAVING_ANALYSES` i backend: passerar man modalen slår den grinden på analys 3, med
//      annan copy.
//   3. `RATE_LIMIT_MAX = 5`: tio försök i ETT svep gick inte att ta.
//
// Halvfixen är veckans mest återkommande fel (bibeln 19 aug: en fix som inte följs till alla
// konsumenter är en halv fix). Testerna nedan låser att de tre talen följs åt.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FRONT = readFileSync(join(ROT, 'src/pages/TestaFaktura/index.js'), 'utf8');
const API   = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');

const tal = (kalla, namn) => {
  // Escapen gick genom en heredoc och blev `\\s` i filen — alltså ett LITERALT bakstreck i
  // regexet, inte blanksteg. Vakten föll högljutt i stället för att bli grön på tomhet, vilket är
  // rätt riktning: ett mätinstrument som inte kommer fram ska säga ifrån (sondvaktens princip).
  const m = kalla.match(new RegExp(`const ${namn}\\s*=\\s*(\\d+)`));
  assert.ok(m, `${namn} hittades inte — vakten mäter inte det den påstår`);
  return Number(m[1]);
};

describe('GK · Tio försök ska vara tio försök', () => {
  test('GK-01 · frontendens och backendens fria kvot är SAMMA tal', () => {
    const fram = tal(FRONT, 'FREE_SUCCESSFUL');
    const bak  = tal(API,   'FREE_SAVING_ANALYSES');
    assert.equal(fram, bak,
      `frontend släpper ${fram} men backend grindar vid ${bak} — kunden passerar modalen och slår `
      + 'i en ANNAN grind med annan copy. Två grindar på samma fråga är en halvfix som ser hel ut');
  });

  test('GK-02 · besparings-flaggan grindar inte längre — försöken räknas', () => {
    // Egenskapen, inte ordet: villkoret får inte kortsluta räknaren.
    const villkor = FRONT.match(/if \(([^)]*successCount[^)]*)\) \{\s*\n\s*setGateReason\('quota'\)/);
    assert.ok(villkor, 'kvotvillkoret hittades inte');
    assert.doesNotMatch(villkor[1], /hadSaving/,
      'en flagga som sätts efter EN träff kortsluter räknaren — då är FREE_SUCCESSFUL dekoration, '
      + 'och tio fria försök ges bara till dem som aldrig hittar något');
    assert.match(villkor[1], /successCount >= FREE_SUCCESSFUL/);
  });

  test('GK-03 · IP-taket rymmer hela kvoten i ETT svep', () => {
    const tak  = tal(API, 'RATE_LIMIT_MAX');
    const fria = tal(FRONT, 'FREE_SUCCESSFUL');
    assert.ok(tak >= fria,
      `IP-taket ${tak}/dygn är lägre än de ${fria} fria försöken — besökaren får ${tak} i dag och `
      + 'resten i morgon. Begäran uppfylld på pappret, inte i verkligheten');
  });

  test('GK-04 · globaltaket är ORÖRT och ligger kvar över IP-taket', () => {
    // Det är globaltaket som skyddar plånboken, inte per-IP-gränsen. Höjs IP-taket får det aldrig
    // röra det (samma princip som GP-06 för grindpausen).
    const glob = API.match(/const GLOBAL_DAILY_CAP = Number\(process\.env\.ANALYSIS_DAILY_CAP\) \|\| (\d+);/);
    assert.ok(glob, 'globaltaket hittades inte — bytte det form?');
    assert.ok(Number(glob[1]) > tal(API, 'RATE_LIMIT_MAX') * 2,
      'globaltaket måste ligga klart över per-IP-taket, annars är det per-IP-gränsen som blivit '
      + 'kostnadsskyddet — och den är per besökare, inte per dygn');
  });

  test('GK-05 · ingen yta bär en egen kopia av kvoten', () => {
    // «max 5/dag» stod hårdkodat i frontend medan backend ägde talet (2026-09-06). Samma familj:
    // en avskriven gräns blir falsk i samma sekund gränsen ändras.
    const utanKommentarer = FRONT.split('\n').filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r)).join('\n');
    assert.doesNotMatch(utanKommentarer, /max \d+ ?(?:fria|analyser|försök)/i,
      'en hårdkodad kvot i copyn glider isär från konstanten');
    assert.doesNotMatch(utanKommentarer, /max \d+\/dag/i);
  });
});
