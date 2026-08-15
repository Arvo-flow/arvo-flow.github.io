// tests/kobokforing.mjs — ETT JOBB SOM ÄR KLART SKA SÄGA VAD DET KOM FRAM TILL.
//
// BAKGRUNDEN (2026-08-15): grundarens tionde faktura (Ellevio) saknades i rummet. Kön sa `done`,
// ett försök, tomt felfält. Liggaren hade nio rader. De två källorna var oense — och ingen av dem
// kunde säga varför, eftersom `done` bara betydde "pipelinen svarade ok:true". Vilket BESLUT den
// fattade fanns bara i Vercel-loggen, som varken sonderna eller vi kom åt.
//
// Vi stängde tio triage-utgångar, sedan två framgångsutgångar till i el-grenen — alla verkliga hål,
// inget av dem detta fall. Tre omgångar felsökning utan att kunna läsa vad maskinen faktiskt gjorde.
// Det är inte ett svårt fel; det är ett fel vi gjorde OLÄSBART. Drainen hade domen i handen hela
// tiden (`a.route`, `a.reason`) och kastade den.
//
// LÄXAN: bokföringsplikten gäller inte bara analysen — den gäller KÖN. Ett tillstånd som bara kan
// säga "det gick bra" kan aldrig hjälpa någon att förstå varför det inte gjorde det.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att drainen slutar skicka med domen, att domen tappar sin väg eller sitt skäl, och
//           att ett tomt/trasigt svar tyst blir en tom dom i stället för ett uttalat "okänt".
//           Prövas genom att ANROPA utfallFranSvar med de svarsformer pipelinen faktiskt
//           returnerar — inte genom att lita på att fältet finns.
//   BLIND:  vakten ser inte att kolumnen `outcome` FINNS i produktionsdatabasen (ALTER TABLE körs
//           vid nästa ensureTable-anrop) och inte att UPDATE faktiskt landar. Den bevisar att
//           domen FORMULERAS och SKICKAS, inte att den lagras. Det senare syns först i sonden mot
//           skarp DB — och det är avsiktligt: en svit som låtsas verifiera lagring utan databas
//           är precis den sortens grönt på fel grund vi jagat hela kvällen.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { utfallFranSvar } from '../lib/ingest-queue.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('KÖBOKFÖRING · `done` måste säga vad som hände', () => {
  test('KB-01 · nätavgiften — fallet som startade allt — bokförs läsbart', () => {
    const dom = utfallFranSvar({ ok: true, route: 'unsupported', reason: 'natavgift' });
    assert.equal(dom, 'unsupported:natavgift',
      'exakt det här skulle ha stått i kön i stället för ett tomt `done`');
  });

  test('KB-02 · varje route bär både väg och skäl', () => {
    assert.equal(utfallFranSvar({ route: 'review_queue', reason: 'no_benchmark' }), 'review_queue:no_benchmark');
    assert.equal(utfallFranSvar({ route: 'review_queue', reason: 'sanity_check_failed' }), 'review_queue:sanity_check_failed');
    // Framgångsvägen har inget `reason` — då är kategorin/leverantören domen. Ett bart "auto"
    // hade varit precis lika oanvändbart som ett bart "done".
    assert.match(utfallFranSvar({ route: 'auto', categorized: { category: 'mobil' } }), /^auto:mobil/);
    assert.match(utfallFranSvar({ route: 'auto', extracted: { supplier: 'Telia' } }), /^auto:Telia/);
  });

  test('KB-07 · framgångsvägen säger om raden LANDADE, inte bara vad den beslutade', () => {
    // Fallet som tvingade fram markören: kön svarade `auto:saas-productivity` för den försvunna
    // fakturan — alltså huvudvägen, där storeAnalysis alltid ska ge ett id. Ändå fanns ingen rad.
    // Skillnaden mellan "vi beslutade" och "beslutet landade" låg bara i Vercel-loggen.
    assert.match(utfallFranSvar({ route: 'auto', categorized: { category: 'mobil' }, analysisId: 4711 }),
      /·lagrad$/, 'en lagrad analys ska synas som lagrad');
    assert.match(utfallFranSvar({ route: 'auto', categorized: { category: 'saas-productivity' } }),
      /·EJ_LAGRAD$/, 'utan analysisId har raden inte landat — det är fyndet, inte brus');
    assert.match(utfallFranSvar({ route: 'monitoring', categorized: { category: 'el' } }),
      /·EJ_LAGRAD$/, 'även den bevakade vägen ska svara på om raden landade');
    // Triage-vägarna returnerar aldrig ett id till klienten. En markör som alltid säger samma
    // sak är inget svar — den ska därför INTE sättas där.
    assert.doesNotMatch(utfallFranSvar({ route: 'review_queue', reason: 'no_benchmark' }), /LAGRAD|lagrad/);
    assert.doesNotMatch(utfallFranSvar({ route: 'unsupported', reason: 'natavgift' }), /LAGRAD|lagrad/);
  });

  test('KB-03 · ett tomt eller trasigt svar blir ETT UTTALAT OKÄNT, aldrig en tom dom', () => {
    // Tystnad får inte se ut som ett svar. Det är hela poängen med vakten.
    for (const dåligt of [null, undefined, '', 0, 'ok']) {
      assert.equal(utfallFranSvar(dåligt), 'okänt:tomt_svar', `${JSON.stringify(dåligt)} ska namnge sin egen tomhet`);
    }
    assert.equal(utfallFranSvar({ ok: true }), 'okänd_väg',
      'ett svar utan route ska säga att vägen är okänd, inte tiga');
  });

  test('KB-04 · domen är beskuren — en lång sträng får aldrig spränga kolumnen', () => {
    const dom = utfallFranSvar({ route: 'review_queue', reason: 'x'.repeat(500) });
    assert.ok(dom.length <= 'review_queue:'.length + 60, `domen är ${dom.length} tecken — ska beskäras`);
  });

  test('KB-05 · drainen skickar faktiskt med domen (annars är funktionen dekoration)', () => {
    const drain = readFileSync(join(ROOT, 'api/cron/drain-ingest.mjs'), 'utf8');
    assert.match(drain, /completeJob\(job\.id,\s*utfallFranSvar\(a\)\)/,
      'drainen har pipelinens dom i handen — kastar den bort den är vi tillbaka i tystnaden');
  });

  test('KB-06 · completeJob skriver domen till raden', () => {
    const ko = readFileSync(join(ROOT, 'lib/ingest-queue.js'), 'utf8');
    assert.match(ko, /UPDATE ingest_jobs SET status='done'[^`]*outcome=\$\{utfall\}/,
      'domen måste nå kolumnen, annars är den beräknad och bortkastad');
    assert.match(ko, /ADD COLUMN IF NOT EXISTS outcome TEXT/,
      'kolumnen ska self-ensuras som resten av tabellen — inget manuellt migreringssteg');
  });
});
