// tests/verifier-registry.mjs — låser fabrikens kontrakt: varje verifierare har rätt form,
// unikt id, giltig kategori i prisboken och ett rimligt schema. Offline (ingen nätverk).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIERS, getVerifier, allVerifierIds } from '../lib/verifiers/registry.mjs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';

describe('Verifierar-registry — fabrikens kontrakt', () => {
  test('minst en verifierare registrerad', () => {
    assert.ok(VERIFIERS.length >= 1);
  });

  test('varje verifierare har korrekt form', () => {
    for (const v of VERIFIERS) {
      assert.equal(typeof v.id, 'string', 'id måste vara sträng');
      assert.equal(typeof v.label, 'string', `${v.id}: label krävs`);
      assert.equal(typeof v.category, 'string', `${v.id}: category krävs`);
      assert.equal(typeof v.run, 'function', `${v.id}: run() krävs`);
      assert.equal(typeof v.needsBrowser, 'boolean', `${v.id}: needsBrowser (bool) krävs`);
      assert.match(v.schedule ?? '', /^[\d*\/, -]+( [\d*\/, -]+){4}$/, `${v.id}: schedule måste vara giltig cron`);
    }
  });

  test('alla id:n är unika', () => {
    const ids = allVerifierIds();
    assert.equal(ids.length, new Set(ids).size, 'dubbletter bland verifierar-id');
  });

  // ── TVÅ SORTERS VAKTER (2026-08-07) ────────────────────────────────────────────────────
  // Regeln "kategorin måste finnas i prisboken" är riktig för PRISVAKTER — den hindrar en vakt
  // från att larma om en cell som inte finns. Men fabriken vaktar sedan i dag också
  // VILLKORSBOKEN (avtalsreglerna), och den har inga priscellar. Att ge en villkorsvakt en
  // låtsaskategori för att blidka testet hade varit att ljuga för sin egen maskinvakt.
  // Alltså ett uttalat sortbegrepp: prisvakter behåller kravet med full kraft, villkorsvakter
  // måste i stället peka på en verklig post i villkorsboken. Ingen vakt slipper undan ett krav.
  test('prisvakter pekar på en verklig cell i prisboken', () => {
    for (const v of VERIFIERS.filter((x) => (x.kind ?? 'pris') === 'pris')) {
      assert.ok(BRANCHINDEX[v.category], `${v.id}: kategori '${v.category}' saknas i prisboken`);
    }
  });

  // TANDPROTES UTBYTT (2026-08-09): raden här asserterade bara att boken inte var tom, inuti en
  // loop över vakterna — den band ingenting till någonting och passerade dessutom tomt om det
  // inte fanns en enda villkorsvakt. Ett lås som såg ut som ett lås. Nu binds vakt till bok:
  // varje post i VILLKORSBOK måste faktiskt nås av en vakt, annars faller sviten.
  test('villkorsboken har en vakt (annars styr ovaktade regler uppsägningsdatum)', () => {
    assert.ok(VERIFIERS.some((v) => v.kind === 'villkor'),
      'ingen villkorsvakt registrerad — avtalsreglerna står obevakade');
  });

  // ÄRLIGHET OM VAD DEN HÄR RADEN ÄR: täckningen härleds ur samma bok den jämförs mot, så den
  // kan aldrig fånga en NY post — den dokumenterar en konstruktion (vakten itererar hela boken)
  // i stället för att bevaka en drift. Den får stå kvar som skydd mot att någon byter ut
  // iterationen mot en handskriven lista, inget mer. Det verkliga låset mot en ovaktbar ny post
  // bor i tests/villkorsvakt.mjs ("ingen post får vara ovaktbar") — där det biter.
  test('varje post i villkorsboken täcks av en villkorsvakt (ingen post utanför)', () => {
    const tackta = new Set(
      VERIFIERS.filter((v) => v.kind === 'villkor')
        .flatMap((v) => (typeof v.tacker === 'function' ? v.tacker() : [])),
    );
    const otackta = Object.keys(VILLKORSBOK).filter((k) => !tackta.has(k));
    assert.deepEqual(otackta, [], `villkorsposter utan vakt: ${otackta.join(', ')}`);
    assert.ok(tackta.size >= 1, 'villkorsvakten deklarerar ingen täckning alls');
  });

  test('varje verifierare deklarerar sin sort (ingen vakt utan hemvist)', () => {
    for (const v of VERIFIERS) {
      assert.ok(['pris', 'villkor'].includes(v.kind ?? 'pris'), `${v.id}: okänd vaktsort '${v.kind}'`);
    }
  });

  test('getVerifier slår upp på id, null för okänt', () => {
    assert.equal(getVerifier(VERIFIERS[0].id).id, VERIFIERS[0].id);
    assert.equal(getVerifier('finns-inte'), null);
  });
});
