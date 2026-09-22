// tests/leverantorsnamn.mjs — REDIGERINGEN FÅR DÖLJA ALTERNATIVET, ALDRIG KUNDENS EGEN LEVERANTÖR.
//
// Fyndet kom ur en RENDERING av det byggda paketet (regel 8), inte ur ett test: rätt-storleks-
// rekommendationen för saas-finance sänker nivån hos kundens EGEN leverantör, så
// `suggestedSupplier` är «Fortnox Mellan» — och redigeringen skrev över kundens eget varumärke:
//
//     «Ni betalar för en verifierad lägre leverantör-paketet Stor (710 kr/mån).»
//
// Funktionen hade fyra anropare och noll tester, för den bodde inuti sidkomponenten. Den bor nu i
// `src/lib/leverantorsnamn.js` och prövas genom att ANROPAS.
//
// FÅNGAR: en redigering som skriver över kundens egen leverantör · en avstängd redigering (MOTPROV).
// BLIND: jämförelsen är på NAMN, inte identitet — se modulens egen blindfläcksdeklaration.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { samaLeverantor, redigeraLeverantor } from '../src/lib/leverantorsnamn.js';

const PROMPT = 'Ni betalar för Fortnox-paketet Stor (710 kr/mån). Nivån under, Mellan, '
  + 'kostar 490 kr/mån — 220 kr/mån billigare.';

describe('LN · leverantörsnamn i brödtext', () => {
  test('LN-01 · rätt-storlek hos EGEN leverantör redigeras inte', () => {
    // Det verkliga fallet, med de tal recommend() faktiskt producerar.
    const ut = redigeraLeverantor(PROMPT, 'Fortnox Mellan', 'Fortnox');
    assert.equal(ut, PROMPT, 'kundens egen leverantör ska stå kvar orörd');
    assert.equal(ut.includes('en verifierad lägre leverantör'), false);
    assert.equal(ut.includes('Fortnox-paketet Stor'), true, 'meningen ska vara hel');
  });

  test('LN-02 · MOTPROVET: ett verkligt alternativ redigeras fortfarande bort', () => {
    // Utan det här fallet vore LN-01 uppfyllt av en funktion som aldrig redigerar något.
    const ut = redigeraLeverantor('Byt till Telenor Företag — 2 400 kr/år billigare.',
      'Telenor Företag', 'Telia');
    assert.equal(ut.includes('Telenor'), false, 'alternativets varumärke ska döljas');
    assert.match(ut, /en verifierad lägre leverantör/);
  });

  test('LN-03 · okänd nuvarande leverantör → redigera (fail-closed på varumärket)', () => {
    for (const nuvarande of [null, undefined, '', '   ']) {
      const ut = redigeraLeverantor('Byt till Telenor.', 'Telenor', nuvarande);
      assert.equal(ut.includes('Telenor'), false,
        `«ingen frågade» (${JSON.stringify(nuvarande)}) får inte likna «samma leverantör»`);
    }
  });

  test('LN-04 · samaLeverantor svarar på NAMN, åt båda håll, och aldrig på tomhet', () => {
    assert.equal(samaLeverantor('Fortnox Mellan', 'Fortnox'), true);
    assert.equal(samaLeverantor('Spiris', 'Spiris Driva'), true, 'jämförelsen går åt båda håll');
    assert.equal(samaLeverantor('SPIRIS driva', '  spiris  '), true, 'versaler och blanksteg');
    assert.equal(samaLeverantor('Telenor', 'Telia'), false);
    for (const [a, b] of [[null, 'Telia'], ['Telia', null], ['', ''], ['  ', 'Telia']]) {
      assert.equal(samaLeverantor(a, b), false,
        `${JSON.stringify([a, b])} är okänt, inte «samma»`);
    }
  });

  test('LN-05 · sidan äger ingen egen kopia av redigeringen längre', () => {
    // Kopian låg inuti sidkomponenten och var därför onåbar för sviten — det var precis därför
    // felet kunde leva. Två kopior av samma jämförelse glider isär (regel 1).
    const sidan = readFileSync(new URL('../src/pages/TestaFaktura/index.js', import.meta.url), 'utf8');
    assert.equal(/function redactSupplier\s*\(/.test(sidan), false,
      'den lokala kopian är tillbaka i sidan');
    assert.match(sidan, /import \{ redigeraLeverantor, samaLeverantor \} from '\.\.\/\.\.\/lib\/leverantorsnamn'/);
    // Varje anropare måste skicka den TREDJE parametern — utan den är `nuvarande` undefined och
    // funktionen redigerar precis som förut, alltså vore fixen grön och verkningslös.
    // Ett lat regexfönster stannade vid första `)`, som står INNE i argumentet — det gav 1 av 4
    // anropare och hade blivit grönt av att mäta fel. Fönstret räknas nu från anropet och framåt.
    const anrop = sidan.split('redigeraLeverantor(').slice(1).map((d) => d.slice(0, 320));
    assert.ok(anrop.length >= 4, `hittade bara ${anrop.length} anropare — mätte det rätt sak?`);
    for (const a of anrop) {
      assert.match(a, /normalizedSupplier/,
        `en anropare skickar ingen nuvarande leverantör: ${a.slice(0, 80)}`);
    }
  });
});

