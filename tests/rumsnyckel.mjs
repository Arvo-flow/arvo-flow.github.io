// tests/rumsnyckel.mjs — RUMMET ÖPPNAS BARA MED EN OGISSBAR NYCKEL (RN). Bakgrund i lib/rumsnyckel.js.
//
// FÅNGAR: att rummets datadörr lämnar ut historik på ett deterministiskt fingeravtryck, på en
//   nyckel härledd ur en e-postadress, eller på ett kort/tomt värde; att klienten åter räknar fram
//   sin nyckel ur webbläsaren; att rapport-endpointen som mejlade ett rum till valfri adress kommer
//   tillbaka; att en annan endpoint börjar läsa historik på enbart ett fingeravtryck.
// BLIND: formatet bevisar inte att en nyckel ÄR slumpad (se modulhuvudet). Och testet kör utan
//   databas — en giltig nyckel prövas alltså bara på att den INTE nekas, aldrig på vad den ger.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { arRumsnyckel, RUMSNYCKEL_RE } from '../lib/rumsnyckel.js';
import * as klient from '../src/utils/rumsnyckel.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const SLUMP = 'a3f9c2e1b4d5f6a7089b1c2d3e4f5a6b';
const GAMMAL = 'a3f9c2e1b4d5f6a7089b1c2d';            // 24 hex — det gamla deterministiska formatet

async function rumsdorren(query) {
  const { default: handler } = await import('../api/invoice-history.mjs');
  let status = null; let body = null;
  const res = { setHeader() {}, set statusCode(v) { status = v; }, get statusCode() { return status; },
    end(t) { body = JSON.parse(t); } };
  await handler({ method: 'GET', query }, res);
  return { status, body };
}

describe('RN · rumsnyckeln', () => {
  test('RN-01 · bara 128 bitar hex räknas som rumsnyckel', () => {
    assert.equal(arRumsnyckel(SLUMP), true);
    for (const v of [GAMMAL, `mail:${'a'.repeat(16)}`, `kontor:${'b'.repeat(16)}`, `test${'c'.repeat(20)}`,
      SLUMP.toUpperCase(), `${SLUMP}0`, '', null, undefined, 123, 'xxxxxxxx']) {
      assert.equal(arRumsnyckel(v), false, String(v));
    }
  });

  test('RN-02 · rummets dörr nekar en gissbar nyckel FÖRE databasen', async () => {
    for (const fp of [GAMMAL, `mail:${'a'.repeat(16)}`, `kontor:${'b'.repeat(16)}`]) {
      const r = await rumsdorren({ fingerprint: fp });
      assert.equal(r.status, 400, fp);
      assert.equal(r.body.error, 'rumsnyckel_ogiltig', fp);
    }
  });

  test('RN-03 · motprov: en slumpad nyckel nekas inte, och magic-länken bär rummet även med gammal nyckel', async () => {
    const r = await rumsdorren({ fingerprint: SLUMP });
    assert.notEqual(r.body?.error, 'rumsnyckel_ogiltig', 'en giltig nyckel nekades — dörren är stängd för alla');
    const m = await rumsdorren({ fingerprint: GAMMAL, magic: 'x'.repeat(40) });
    assert.notEqual(m.body?.error, 'rumsnyckel_ogiltig', 'magic-länken ska inte fällas av en gammal enhetsnyckel');
  });

  test('RN-04 · klientens format är serverns format', () => {
    assert.equal(klient.RUMSNYCKEL_RE.source, RUMSNYCKEL_RE.source);
  });

  test('RN-05 · klienten slumpar sin nyckel — den räknar aldrig fram den ur webbläsaren', () => {
    const a = klient.nyRumsnyckel(); const b = klient.nyRumsnyckel();
    assert.ok(arRumsnyckel(a) && arRumsnyckel(b), 'klientens nyckel har inte serverns format');
    assert.notEqual(a, b);
    assert.ok(arRumsnyckel(klient.hamtaRumsnyckel()), 'utan lagring ska fliken ändå få en giltig slumpnyckel');
    for (const p of ['src/pages/TestaFaktura/index.js', 'src/pages/Portfolio/index.js']) {
      const kod = strippaStrangar(las(p));
      assert.doesNotMatch(kod, /navigator\.userAgent/, `${p} bygger åter en nyckel ur webbläsaren`);
      assert.match(kod, /hamtaRumsnyckel\(\)/, `${p} läser inte rumsnyckeln`);
    }
    assert.doesNotMatch(las('src/pages/Portfolio/index.js'), /'test'\s*\+/, 'testidentiteten ska vara en rumsnyckel');
  });

  test('RN-06 · ingen endpoint mejlar eller lämnar ut historik på enbart ett fingeravtryck', () => {
    assert.equal(existsSync(join(ROT, 'api/send-report.mjs')), false, 'send-report är tillbaka');
    assert.doesNotMatch(las('vercel.json'), /send-report/);
    const filer = [];
    (function ga(d) { for (const n of readdirSync(join(ROT, d))) { const p = `${d}/${n}`;
      if (statSync(join(ROT, p)).isDirectory()) ga(p); else if (p.endsWith('.mjs') || p.endsWith('.js')) filer.push(p); } })('api');
    assert.ok(filer.length > 40, `skanningen hittade bara ${filer.length} filer — den mäter inte api/`);
    const lasare = filer.filter((p) => /getAnalysesByFingerprint\(/.test(strippaStrangar(las(p))));
    assert.deepEqual(lasare, ['api/invoice-history.mjs'],
      'en ny endpoint läser historik på fingeravtryck — den måste gå genom arRumsnyckel');
    assert.match(strippaStrangar(las('api/invoice-history.mjs')), /const hasFp = arRumsnyckel\(fp\)/);
  });

  test('RN-07 · rå SQL på fingeravtryck i api/ kräver en ogissbar nyckel; en e-postadress bevisas, uppges aldrig', () => {
    const filer = [];
    (function ga(d) { for (const n of readdirSync(join(ROT, d))) { const p = `${d}/${n}`;
      if (statSync(join(ROT, p)).isDirectory()) ga(p); else if (p.endsWith('.mjs') || p.endsWith('.js')) filer.push(p); } })('api');
    // Satserna ÄR mallsträngar, så de läses i råtexten (strippaStrangar skulle tömma dem).
    const raa = filer.filter((p) => /fingerprint\s*=\s*\$\{/.test(las(p)));
    assert.deepEqual(raa, ['api/test-invoice.mjs'], 'en ny endpoint läser invoice_analyses på fingeravtryck');
    const ti = strippaStrangar(las('api/test-invoice.mjs'));
    // Historikuppslaget: mail:<sha16(adress)> går att räkna ut ur en adress — bara internt eller en slumpnyckel.
    assert.match(ti, /if \(fingerprint && \(isBypass \|\| arRumsnyckel\(fingerprint\)\) && categorized\.category !==/,
      'historikuppslaget i test-invoice läser på vilket fingeravtryck som helst');
    // Adressen: bara internt eller ur en signerad session. Varje annan läsning av body.userEmail är en uppgiven adress.
    const lasningar = ti.match(/body\.userEmail/g) ?? [];
    assert.equal(lasningar.length, 3, `body.userEmail läses ${lasningar.length} gånger — bara i bevisadEpost (3)`);
    assert.match(las('api/test-invoice.mjs'), /const bevisadEpost = isBypass\s*\? \(typeof body\.userEmail === 'string' && body\.userEmail\.trim\(\) \? body\.userEmail : null\)\s*: \(verifySession\(body\.session\)\?\.email \?\? null\);/);
    assert.doesNotMatch(strippaStrangar(las('src/pages/TestaFaktura/index.js')), /userEmail:/, 'webbläsaren skickar en adress i stället för sessionen');
  });
});
