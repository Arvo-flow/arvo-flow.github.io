// tests/svarskontrakt.mjs — ETT FÄLT SOM KUNDYTAN LÄSER MÅSTE FINNAS I SVARET SOM NÅR DEN.
//
// ══ VARFÖR (mätt live 2026-09-23) ══════════════════════════════════════════════════════════
// `scripts/diag-live.mjs` mot arvoflow.se med adobe-creative-cloud-ars.pdf (färsk analys):
//   saasFinanceRightsizing: null · m365Rightsizing / adobeRightsizing / loneadminRightsizing:
//   NYCKEL SAKNAS. Motorn fann ett Adobe-fynd (prosan kom fram), men API-lagrets svarsobjekt är
//   en UPPRÄKNING, inte en spridning — tre av fyra rätt-storleksnycklar stod aldrig med. Korten
//   med talen, källan och licensantalet har alltså aldrig kunnat renderas i produktion, och
//   rubriken (`harNivasankningskort`) fick svaret «inget kort» och förnekade fyndet.
//   Motprovet höll: `saasFinanceRightsizing` gav «null», alltså kan sonden skilja de två.
//
// Samma familj som `leadFinding` (juli) och `benchmark` (augusti): en producent som räknar rätt,
// en konsument som läser rätt namn — och ett mellanled som tappar fältet utan att någon ser det.
// Kontraktet har tre parter; testerna prövade två.
//
// FÅNGAR: ett fält som `src/pages/TestaFaktura` läser ur `result.recommendation` men som
//   huvudvägens svarsobjekt inte bär · ett rätt-storleksfält som undantas · ett undantag som
//   blivit inaktuellt (fältet serialiseras nu, eller läses inte längre).
// BLIND: filerna läses som TEXT. Testet ser huvudvägens svarsobjekt, inte de tidiga svaren
//   (el, triage) — el-grenen bär t.ex. `monitoringNote` i sitt eget objekt. Att ett fält har
//   RÄTT VÄRDE bevisas inte här, bara att det finns en väg fram; värdet bevisas av diag-live.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { strippaStrangar } from '../lib/kalltextlexer.js';
import { NIVASANKNINGSKORT } from '../src/lib/diagnos.js';

const las = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const API = las('api/test-invoice.mjs');
const YTAN = las('src/pages/TestaFaktura/index.js');

// Fält som ytan läser men som huvudvägen MEDVETET inte skickar ännu. Varje post bär sitt skäl.
// Listan får bara KRYMPA: ett kort som väcks måste först ses (regel 8), för ett kort som legat
// dött i månader kan bära copy som ingen läst sedan det skrevs.
export const EJ_SERIALISERAD = {
  monitoringNote: 'bärs av el-grenens eget svarsobjekt, aldrig av huvudvägen',
  molnvaxel: 'dött kort, ogranskat — väcks efter egen rendering (regel 8)',
  m365Equivalent: 'dött kort, ogranskat — väcks efter egen rendering (regel 8)',
  storageSubstitution: 'dött kort, ogranskat — väcks efter egen rendering (regel 8)',
  revisionGate: 'läses bara för en rubriktext; väcks tillsammans med offertblockets granskning',
  savingsBreakdown: 'cspDiscount räknas FÖRE finansgrindarna och kan överleva ett nollat byte — får inte nå kund innan det är löst',
};

/** Toppnivånycklarna i huvudvägens `recommendation: { … }` — brace-räknat i lexad text. */
function serialiseradeNycklar() {
  const ren = strippaStrangar(API);
  const ankare = ren.indexOf('recommendationType: (recommendation.recommendationType ===');
  assert.ok(ankare > 0, 'hittade inte huvudvägens svarsobjekt — bytte det form?');
  const start = ren.lastIndexOf('recommendation: {', ankare);
  assert.ok(start > 0 && ankare - start < 3000, 'svarsobjektets öppning ligger inte där den ska');
  let djup = 0; let i = ren.indexOf('{', start); const slut0 = i;
  for (; i < ren.length; i++) {
    if (ren[i] === '{' || ren[i] === '(' || ren[i] === '[') djup++;
    else if (ren[i] === '}' || ren[i] === ')' || ren[i] === ']') { djup--; if (djup === 0) break; }
  }
  const kropp = ren.slice(slut0 + 1, i);
  // Bara toppnivåtecken behålls; allt inuti (), [] och {} blankas. Då är en nyckel det första
  // ordet efter varje toppnivåkomma — även när värdet är en ternär med eget kolon.
  let d = 0; let topp = '';
  for (const c of kropp) {
    if ('{(['.includes(c)) { d++; topp += ' '; continue; }
    if ('})]'.includes(c)) { d--; topp += ' '; continue; }
    topp += d === 0 ? c : ' ';
  }
  const nycklar = new Set();
  for (const del of topp.split(',')) {
    const m = del.match(/^\s*(\w+)\s*(?::|$)/);
    if (m) nycklar.add(m[1]);
  }
  return nycklar;
}

/** Fälten ytan läser ur `result.recommendation`. */
function ytansFalt() {
  const ren = strippaStrangar(YTAN);
  return new Set([...ren.matchAll(/result\.recommendation\??\.(\w+)/g)].map((m) => m[1]));
}

describe('SVK · svarskontraktet mellan api/test-invoice och fakturavyn', () => {
  const skickade = serialiseradeNycklar();
  const lasta = ytansFalt();

  test('SVK-00 · instrumenten mäter något (grön av tomhet är förbjuden)', () => {
    assert.ok(skickade.size > 30, `bara ${skickade.size} nycklar hittades i svarsobjektet — parsern är trasig`);
    assert.ok(skickade.has('leadFinding') && skickade.has('jamforelseKalla') && skickade.has('recommendationType'),
      'kända nycklar saknas — parsern läser fel objekt');
    assert.ok(lasta.size > 15, `bara ${lasta.size} lästa fält i ytan — mönstret är trasigt`);
  });

  test('SVK-01 · varje fält ytan läser skickas — eller är undantaget med skäl', () => {
    const saknas = [...lasta].filter((f) => !skickade.has(f) && !(f in EJ_SERIALISERAD));
    assert.deepEqual(saknas, [],
      `ytan läser ${saknas.join(', ')} men huvudvägens svar bär inte fälten — kortet kan aldrig renderas`);
  });

  test('SVK-02 · ett undantag får inte bli inaktuellt', () => {
    for (const f of Object.keys(EJ_SERIALISERAD)) {
      assert.ok(lasta.has(f), `${f} är undantaget men ytan läser det inte längre — ta bort undantaget`);
      assert.ok(!skickade.has(f), `${f} skickas nu — ta bort undantaget, annars döljer det nästa tapp`);
    }
  });

  test('SVK-03 · inget rätt-storleksfält får undantas — rubriken frågar dem', () => {
    for (const f of NIVASANKNINGSKORT) {
      assert.ok(skickade.has(f), `${f} serialiseras inte — rubriken förnekar ett fynd motorn gjort`);
      assert.ok(!(f in EJ_SERIALISERAD), `${f} får inte stå som undantag`);
    }
  });
});
