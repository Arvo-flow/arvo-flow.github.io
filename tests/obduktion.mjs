// tests/obduktion.mjs — HÅLEN SOM OBDUKTIONEN 2026-08-20 HITTADE.
//
// Grundaren: "Granska hela vår lösning ner på minsta beståndsdel. Noll procent magkänsla."
// Fynden nedan hittades genom att KÖRA funktionerna med fientliga indata och läsa varje
// utgång — inte genom att läsa koden och tycka att den såg rätt ut.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: (a) att avstämningsgrinden svarar BEVISAD_LIKHET på en rad vars valuta aldrig
//           fastställts, (b) att en verifierare kan tysta sig själv med `skipped` utan
//           deklarerat skäl, och (c) att "noll checkar" rapporteras som väntande i stället
//           för rött. Prövas genom att ANROPA grinden och LÄSA verifierarnas källkod.
//   BLIND:  vakten kan inte se om ett DEKLARERAT skippSkal är sant. Skriver någon
//           `skippSkal: 'väntar på credential'` när källan i själva verket bara bytt form är
//           utgången grön på fel grund igen. Kontraktet är en tvingande fråga, aldrig ett bevis.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { stamAv, AVST, SKAL } from '../lib/saas-avstamning.js';
import { bedomVerifierarutfall, UTFALL } from '../lib/verifierarutfall.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERIFIERARE = join(ROT, 'lib', 'verifiers');

const vaktad = (o = {}) => ({ leverantor: 'microsoft', tier: 'Business Standard',
  tierNyckel: 'business-standard', prisOre: 13382, period: 'manad', momsbas: 'exkl',
  valuta: 'SEK', vaktad: true, farsk: true, kalla: 'microsoft.com', ...o });
const rad = (o = {}) => ({ leverantor: 'microsoft', antal: 10, beloppOre: 133820,
  period: 'manad', momsbas: 'exkl', valuta: 'SEK', ...o });

describe('OBDUKTION · hål som fanns innan granskningen 2026-08-20', () => {
  test('OB-01 · grinden svarar aldrig på en rad utan fastställd valuta', () => {
    // Filtret skriver `v.valuta === rad.valuta` och kommentaren lovar "ingen FX, någonsin".
    // Men jämförelsen KRÄVDE aldrig ett värde: saknades valutan på båda sidor blev
    // undefined === undefined sant, och grinden svarade BEVISAD_LIKHET på en rad vars valuta
    // aldrig fastställts. Mataren blockerade det — men en grind som förlitar sig på sin
    // anropare är ingen grind. Samma mönster som isTotal: en flagga som fanns men aldrig sattes.
    for (const v of [undefined, null, '', '   ']) {
      const dom = stamAv(rad({ valuta: v }), [vaktad({ valuta: v })]);
      assert.equal(dom.utfall, AVST.TYST, `valuta ${JSON.stringify(v)} gav ${dom.utfall}`);
      assert.equal(dom.skal, SKAL.INGEN_VALUTA);
    }
    // Normalfallet ska fortfarande gå igenom — annars har vi lagat genom att stänga av.
    assert.equal(stamAv(rad(), [vaktad()]).utfall, AVST.BEVISAD_LIKHET);
    // Och två olika valutor får aldrig mötas.
    assert.equal(stamAv(rad(), [vaktad({ valuta: 'USD' })]).utfall, AVST.TYST);
  });

  test('OB-02 · ingen verifierare får tysta sig själv med "noll checkar"', () => {
    // lib/verifiers/atlassian.mjs returnerade `{ skipped: true }` när checks.length === 0 —
    // exakt det tillstånd `!(res.checks?.length)` i scripts/verify.mjs finns för att göra RÖTT.
    // En verifierare kunde alltså läsa noll tal ur källan och rapportera "väntar". Det är den
    // avstängda vakten i ny kostym: fabriken grön medan en prisbokspost står obevakad.
    for (const f of readdirSync(VERIFIERARE).filter((n) => n.endsWith('.mjs'))) {
      const src = readFileSync(join(VERIFIERARE, f), 'utf8');
      const kod = src.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
      // En skip som villkoras på antalet checkar är per definition "jag hittade inget".
      assert.doesNotMatch(kod, /checks\.length\s*===?\s*0[^\n]*skipped/,
        `${f}: "noll checkar" returneras som skipped — det ska vara rött`);
    }
  });

  test('OB-03 · fabrikens dom prövas genom att ANROPAS, inte genom att läsas', () => {
    // Första versionen av det här testet matchade källtext i scripts/verify.mjs. Sabotaget som
    // stängde AV skip-kravet lämnade ordet kvar i en console.log — och vakten förblev grön.
    // En vakt som inte fäller för sitt eget sabotage är ingen vakt. Beslutet bor nu i en ren
    // funktion som både fabriken och sviten kallar (regel 1), och prövas på sitt BETEENDE.
    const f = (r) => bedomVerifierarutfall(r).utfall;

    // Rött ska vara rött — i alla former.
    assert.equal(f({ checks: [] }), UTFALL.ROTT, 'noll checkar');
    assert.equal(f({ checks: [{ ok: true }], fatal: true }), UTFALL.ROTT, 'oåtkomlig källa');
    assert.equal(f({ checks: [{ ok: true }, { ok: false }] }), UTFALL.ROTT, 'drift');
    assert.equal(f(undefined), UTFALL.ROTT, 'ett svar som inte finns är inte grönt');
    assert.equal(f({}), UTFALL.ROTT, 'ett tomt svar är inte grönt');

    // En skip utan deklarerat skäl är en självutfärdad dispens.
    assert.equal(f({ skipped: true }), UTFALL.ROTT);
    assert.equal(f({ skipped: true, skippSkal: '   ' }), UTFALL.ROTT);
    // Och skälet får aldrig vara "jag hittade inget" — det ÄR definitionen av rött.
    assert.equal(f({ skipped: true, skippSkal: 'hittade inga checkar på sidan' }), UTFALL.ROTT);

    // Bara ett deklarerat STRUKTURELLT skäl får vänta.
    assert.equal(f({ skipped: true, skippSkal: 'väntar på Atlassian-credential' }), UTFALL.VANTAR);

    // Och grönt ska fortfarande gå igenom — annars har vi lagat genom att stänga av.
    assert.equal(f({ checks: [{ ok: true }, { ok: true }] }), UTFALL.GRON);
  });

  test('OB-05 · fabriken använder den delade domen, inte en egen kopia', () => {
    const kod = readFileSync(join(ROT, 'scripts', 'verify.mjs'), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.match(kod, /bedomVerifierarutfall\(res\)/,
      'verify.mjs måste kalla den prövade funktionen — en andra inline-kopia kan glida isär');
  });

  test('OB-04 · varje skip i registret bär sitt skäl', () => {
    // Deklarationen är en TVINGANDE FRÅGA, aldrig ett bevis: vakten ser att svaret finns,
    // aldrig att det är sant. Men skillnaden mellan "väntar på credential" och "jag hittade
    // inget" ska stå i koden, inte i någons huvud.
    for (const f of readdirSync(VERIFIERARE).filter((n) => n.endsWith('.mjs'))) {
      const src = readFileSync(join(VERIFIERARE, f), 'utf8');
      const kod = src.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
      if (!/skipped:\s*true/.test(kod)) continue;
      assert.match(kod, /skippSkal\s*:/,
        `${f}: returnerar skipped utan skippSkal — en skip utan skäl är en självutfärdad dispens`);
    }
  });
});
