// tests/korpusdiff.mjs — B3 · korpusdiff-selen som svit-lås.
//
// Replay-determinism: hela det deterministiska pipeline-utfallet för korpusen
// (333 fixturer) fångas av scripts/korpusdiff.mjs och jämförs byte-för-byte mot
// det committade facit (tests/fixtures/korpus-facit.json). Vilken drift som helst
// — även i ett fält ingen fixtur deklarerade en förväntan på — bryter sviten.
//
// Avsedd ändring? Kör `node scripts/korpusdiff.mjs --update`, granska diffen i
// git, committa det nya facit. Selen RÄKNAR inget själv (regel 1) — den anropar
// samma computeInvoiceMetrics / computeSecondarySaving / judgeLineArithmetic som
// produktionen.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildCorpusFacit, canonicalStringify, FACIT_PATH } from '../scripts/korpusdiff.mjs';

describe('B3 · korpusdiff-selen', () => {
  const live = buildCorpusFacit();

  test('facit matchar pipeline-utfallet byte-för-byte (replay-determinism)', () => {
    let golden;
    try {
      golden = readFileSync(FACIT_PATH, 'utf8');
    } catch {
      assert.fail('korpus-facit.json saknas — kör: node scripts/korpusdiff.mjs --update');
    }
    const serialized = canonicalStringify(live);
    assert.strictEqual(
      serialized,
      golden,
      'Korpusdrift: pipeline-utfallet avviker från facit. ' +
      'Avsedd ändring? node scripts/korpusdiff.mjs --update && granska git-diffen.',
    );
  });

  // Mätbänks-lås: judgeLineArithmetic (balanskravet) dömer bara rader med
  // quantity × à-pris. Korpusen f01–f08 är författad på metric-nivå och bär
  // därför noll dömbara rader. Det är INTE en brist i selen — det är den ärliga
  // anledningen till att korpusen inte ensam kan arma B1 (BALANSKRAV_ENFORCE=1).
  // Låset tvingar ett MEDVETET omtag: den dag en radstrukturerad (extraktions-
  // nivå) korpus tillförs stiger täckningen, testet faller, och B1:s falsklarms-
  // mätning ska då baseras om mot den nya korpusen — inte glida in oförmärkt.
  test('mätbänkens balanskrav-täckning är känd och låst (B1-förutsättning)', () => {
    assert.strictEqual(
      live.stats.balanskrav.judgeableLineCount, 0,
      'Balanskrav-täckningen ändrades. En radstrukturerad korpus har tillkommit — ' +
      'basera om B1:s falsklarmsmätning mot den och uppdatera detta lås medvetet.',
    );
    assert.strictEqual(live.stats.balanskrav.judged, 0);
    assert.strictEqual(live.stats.balanskrav.violations, 0);
  });

  test('korpusens omfång är låst (333 fixturer, 703 rader)', () => {
    assert.strictEqual(live.stats.fixtureCount, 333);
    assert.strictEqual(live.stats.lineCount, 703);
  });
});
