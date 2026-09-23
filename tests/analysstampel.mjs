// tests/analysstampel.mjs — VARJE LAGRAD DOM BÄR VILKEN KOD SOM FÄLLDE DEN.
//
// Bakgrund i lib/analysstampel.js. Kort: sju SaaS-fakturor stod fällda av en Ring 1-bugg som
// lagats 14 dagar tidigare, och ingen kunde se det — raden bar ingen uppgift om vilken kod som
// dömde den, och `created_at` rör sig inte när en omkörning byter ut domen.
//
// FÅNGAR: en lagringsväg som slutar stämpla · en stämpel som skriver en platshållare i stället för
//   null · en stämpling som kastar och fäller huvudlagringen · en migrering som tappar kolumnerna.
// BLIND: sviten kör mot en fejkad databas. Att kolumnerna faktiskt finns i produktion bevisas bara
//   av att migreringen körts och av en sond mot riktig data.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analysversion, stamplaAnalys } from '../lib/analysstampel.js';
import { storeAnalysis, storeTriaged } from '../lib/invoice-store.js';

/** Fejkad neon-mall som bokför varje sats. `kasta` får en sats att fela, som en ej migrerad kolumn. */
function fejkDb({ kasta = null, returId = 'rad-1' } = {}) {
  const satser = [];
  const db = async (strings, ...vals) => {
    const sql = strings.join('?').replace(/\s+/g, ' ').trim();
    satser.push({ sql, vals });
    if (kasta && kasta.test(sql)) throw new Error('column does not exist');
    if (/RETURNING id/.test(sql)) return [{ id: returId }];
    return [];
  };
  db.query = async () => [];
  db.satser = satser;
  return db;
}

describe('AS · analysstämpeln', () => {
  test('AS-01 · versionen är deployens commit, och OKÄND är null — aldrig en platshållare', () => {
    assert.equal(analysversion({ VERCEL_GIT_COMMIT_SHA: '3a2b6e2fd72d3753613404cc203727491a579d6c' }), '3a2b6e2fd72d');
    for (const env of [{}, { VERCEL_GIT_COMMIT_SHA: '' }, { VERCEL_GIT_COMMIT_SHA: '   ' }, null]) {
      assert.equal(analysversion(env), null,
        `${JSON.stringify(env)}: ett okänt får inte se ut som ett giltigt värde (felfamiljen: ?? 75, employees: 10)`);
    }
  });

  test('AS-02 · stämpeln skriver BÅDA fälten, på id eller på dokumentets identitet', async () => {
    const env = { VERCEL_GIT_COMMIT_SHA: 'abcdef1234567890' };
    const a = fejkDb();
    assert.equal(await stamplaAnalys(a, { id: 'x' }, env), true);
    assert.match(a.satser[0].sql, /SET analyserad_sha = \?, analyserad_at = NOW\(\) WHERE id = \?/);
    assert.deepEqual(a.satser[0].vals, ['abcdef123456', 'x']);

    const b = fejkDb();
    assert.equal(await stamplaAnalys(b, { fingerprintHash: 'fp', pdfHash: 'ph' }, env), true);
    assert.match(b.satser[0].sql, /WHERE fingerprint = \? AND pdf_hash = \?/);

    // Utan identitet finns ingen rad att stämpla — och svaret säger det i stället för att tiga.
    assert.equal(await stamplaAnalys(fejkDb(), {}, env), false);
    assert.equal(await stamplaAnalys(null, { id: 'x' }, env), false);
  });

  test('AS-03 · en stämpel som felar fäller ALDRIG lagringen (ej migrerad kolumn)', async () => {
    const db = fejkDb({ kasta: /analyserad_sha/ });
    assert.equal(await stamplaAnalys(db, { id: 'x' }), false, 'felet ska svara false, inte kasta');
    // Och i den riktiga lagringsvägen: raden lagras trots att stämpeln kastar.
    const id = await storeAnalysis({
      fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db,
      extracted: { supplier: 'Telia', annualCost: 1000 }, categorized: { category: 'mobil' }, recommendation: {},
    });
    assert.equal(id, 'rad-1', 'huvudlagringen får aldrig bero på en kolumn som kanske inte migrerats');
  });

  test('AS-04 · BÅDA lagringsvägarna stämplar — även triage, där de frusna domarna satt', async () => {
    const a = fejkDb();
    await storeAnalysis({
      fingerprint: 'fp', pdfHash: 'ph', route: 'auto', db: a,
      extracted: { supplier: 'Telia', annualCost: 1000 }, categorized: { category: 'mobil' }, recommendation: {},
    });
    assert.ok(a.satser.some((s) => /analyserad_sha/.test(s.sql)), 'storeAnalysis stämplar inte');

    const b = fejkDb();
    await storeTriaged({ fingerprint: 'fp', pdfHash: 'ph', supplier: 'Google', route: 'review_queue',
      reason: 'Ring1', userEmail: 'x@y.se', db: b });
    assert.ok(b.satser.some((s) => /analyserad_sha/.test(s.sql)),
      'storeTriaged stämplar inte — just triagerade rader var de som stod frusna sedan 9 sep');
  });

  test('AS-05 · migreringen skapar båda kolumnerna (en självläkning räknas inte, LK-01)', () => {
    const mig = readFileSync(new URL('../scripts/migrate.mjs', import.meta.url), 'utf8');
    assert.match(mig, /ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS analyserad_sha TEXT/);
    assert.match(mig, /ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS analyserad_at TIMESTAMPTZ/);
  });
});
