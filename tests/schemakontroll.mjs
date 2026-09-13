// tests/schemakontroll.mjs — SK2-01..08 · migreringen får inte säga «klar» utan att ha frågat databasen.
//
// ══ VARFÖR (2026-09-13) ═════════════════════════════════════════════════════════════════════
// `scripts/migrate.mjs` kunde bara rapportera att SATSERNA kördes utan att kasta. Det är inte
// samma sak som att kolumnerna finns — och skillnaden nådde kund 15 augusti (LK-01):
// `invoice_number` låg i SELECT-satsen men inte i produktionen, varje rumsläsning föll till sin
// reserv, och varje leverantör visade Arvo Score 75. Ett halvt svar med full auktoritet.
//
// Den här sviten finns för att den FÖRSTA versionen av efterkontrollen låg inline i skriptet.
// Mina två «sabotage» mot den fällde då NOLL tester — de fällde skriptet, inte sviten — och
// commit-kravet stoppade commiten med rätta. Ett sabotage som fäller noll är ingen prövning.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en saknad kolumn i det svar databasen gav; en KRYMPT kravlista (som annars gör
//     kontrollen grön genom att fråga mindre); ett tomt databassvar, som betyder att frågan
//     aldrig kom fram; indata som inte är listor.
//   BLIND: den ser NAMN, aldrig typ — en kolumn som finns med fel typ passerar. Och den prövar
//     domen, aldrig att `migrate.mjs` faktiskt anropar den; SK2-08 är källtextankaret för det,
//     och ett källtextankare kan inte se exekvering.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { schemaRacker, KRAVLISTANS_GOLV } from '../lib/schemakontroll.js';
import { VALFRIA_KOLUMNER } from '../lib/invoice-store.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KRAV = VALFRIA_KOLUMNER.map(([namn]) => namn);

describe('SK2 · efterkontrollen av migreringen', () => {
  test('SK2-01 · ett fullständigt schema räcker', () => {
    const dom = schemaRacker(KRAV, [...KRAV, 'id', 'fingerprint', 'created_at']);
    assert.equal(dom.ok, true, dom.skal);
    assert.equal(dom.kod, 'racker');
    assert.deepEqual(dom.saknade, []);
  });

  test('SK2-02 · en saknad kolumn fäller och NAMNGES', () => {
    // Namnet är hela poängen: «migreringen misslyckades» går inte att åtgärda, «arkiverad_at
    // saknas» gör det. Det var precis vad 15-augustifallet saknade.
    const utan = KRAV.filter((n) => n !== 'arkiverad_at');
    const dom = schemaRacker(KRAV, [...utan, 'id']);
    assert.equal(dom.ok, false);
    assert.equal(dom.kod, 'saknad_kolumn');
    assert.deepEqual(dom.saknade, ['arkiverad_at']);
  });

  test('SK2-03 · flera saknade kolumner räknas alla, inte bara den första', () => {
    const dom = schemaRacker(KRAV, ['id', 'fingerprint']);
    assert.equal(dom.ok, false);
    assert.equal(dom.saknade.length, KRAV.length, 'en kontroll som stannar vid första felet döljer resten');
  });

  test('SK2-04 · en KRYMPT kravlista fäller — grön av tomhet är det farliga utfallet', () => {
    // Kontrollen HÄRLEDER sin lista. Töms den frågar den färre kolumner och svarar «allt finns»
    // mot ett tomt schema. Golvet är ett MÄTT tal, inte en tröskel.
    const dom = schemaRacker(KRAV.slice(0, KRAVLISTANS_GOLV - 1), []);
    assert.equal(dom.ok, false);
    assert.equal(dom.kod, 'krympt_kravlista');
    // Motprovet: den fulla listan får INTE fällas av golvet, annars vaktar SK2-04 ingenting.
    assert.ok(KRAV.length >= KRAVLISTANS_GOLV, `kravlistan bär ${KRAV.length}, golvet är ${KRAVLISTANS_GOLV}`);
  });

  test('SK2-05 · ett TOMT databassvar är «frågan kom inte fram», aldrig «inga kolumner»', () => {
    // Tabellen skapas tjugo rader upp i samma skript. Noll kolumner kan alltså inte vara ett
    // sanningsenligt svar — och att rapportera det som «alla saknas» hade larmat om fel sak.
    const dom = schemaRacker(KRAV, []);
    assert.equal(dom.ok, false);
    assert.equal(dom.kod, 'tomt_svar');
    assert.match(dom.skal, /INTE ett mätvärde/);
  });

  test('SK2-06 · indata som inte är listor kördes aldrig', () => {
    for (const dalig of [null, undefined, 'arkiverad_at', {}, 7]) {
      assert.equal(schemaRacker(dalig, KRAV).kod, 'ogiltig_indata', `kravlistan ${JSON.stringify(dalig)}`);
      assert.equal(schemaRacker(KRAV, dalig).kod, 'ogiltig_indata', `databassvaret ${JSON.stringify(dalig)}`);
    }
  });

  test('SK2-07 · arkiverad_at ÄR i kravlistan — annars vaktar hela sviten fel kolumn', () => {
    // Motprov mot den tystaste möjliga regressionen: stryks raden ur VALFRIA_KOLUMNER slutar
    // efterkontrollen fråga efter kolumnen, och migreringen blir grön på ett schema rummet inte
    // kan läsa. Golvet ensamt fångar det inte — listan skulle fortfarande bära åtta poster.
    assert.ok(KRAV.includes('arkiverad_at'), 'arkiveringen läses i WHERE-satsen i alla sex rumsläsningarna');
  });

  test('SK2-08 · migreringen ANROPAR domen och avslutar med felkod', () => {
    // Källtextankare, uttalat som sådant: det bevisar att anropet står skrivet, aldrig att det
    // exekverar. Beteendet ovan är prövat; den här raden låser bara att skriptet inte tyst
    // slutar fråga.
    const kod = readFileSync(join(ROT, 'scripts/migrate.mjs'), 'utf8');
    assert.ok(kod.includes('schemaRacker('), 'migrate.mjs måste anropa schemaRacker');
    assert.ok(/if \(!dom\.ok\)[\s\S]{0,600}process\.exit\(1\)/.test(kod),
      'en efterkontroll som inte avslutar med felkod är en lograd, inte en grind');
  });
});
