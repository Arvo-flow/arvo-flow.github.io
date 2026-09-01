// tests/switchliggare.mjs — SL-01..05: PgStore bär FileStore:s kontrakt, och cron-grinden nekar
// en osatt hemlighet i stället för att göra den till ett lösenord.
//
// Fable 5.1:s granskning av Opus 5 (2026-09-01). Två fel som båda var PÅSTÅDDA i kommentarer
// och bibeln men aldrig prövade:
//   1. «samma gränssnitt som FileStore» — men FileStore.list() ger ID:n och PgStore.list() gav
//      POSTER. Orkestratorns list()/findBySigningDocId()/findDueScheduled() itererar id:n och
//      anropar load(id); alla tre hade brutit den dag PgStore blev default (vilket den blev).
//   2. «fail-closed — nekar allt när hemligheten är osatt» — men `Bearer ${undefined}` är
//      strängen «Bearer undefined», och den strängen släpptes in.
//
// FÅNGAR: en PgStore vars metoder eller returformer glider från FileStore:s, och en cron-grind
//   som accepterar «undefined» som hemlighet.
// BLIND: sviten kör mot en FEJKAD db-funktion. Att SQL:en faktiskt returnerar `id`/`record` i
//   produktion bevisas av scripts/probe-liggaren.mjs (Actions), inte här.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { PgStore } from '../lib/switchliggare.js';
import { FileStore } from '../agents/orchestrator/store.js';
import { cronAnropTillatet } from '../lib/cronvakt.js';

/** Fejkad neon-klient: en tagged template som svarar ur en liten liggare. */
function fejkDb(poster) {
  return async (strings) => {
    const sql = strings.join('?');
    if (/CREATE|INSERT/.test(sql)) return [];
    if (/SELECT id FROM/.test(sql)) return poster.map((p) => ({ id: p.id }));
    if (/SELECT record FROM switch_records WHERE/.test(sql)) return [];
    if (/SELECT record FROM/.test(sql)) return poster.map((p) => ({ record: p }));
    throw new Error(`oväntad SQL i fejken: ${sql}`);
  };
}

describe('SL · PgStore bär FileStore:s kontrakt', () => {
  const poster = [{ id: 'sw_a', state: 'proposed' }, { id: 'sw_b', state: 'live' }];

  test('SL-01 · list() returnerar ID-strängar, exakt som FileStore — inte poster', async () => {
    const ids = await new PgStore({ db: fejkDb(poster) }).list();
    assert.deepEqual(ids, ['sw_a', 'sw_b']);
    for (const id of ids) assert.equal(typeof id, 'string', 'orkestratorn anropar load(id) per element');
  });

  test('SL-02 · listRecords() ger posterna — arvodeskörningens väg', async () => {
    const rec = await new PgStore({ db: fejkDb(poster) }).listRecords();
    assert.deepEqual(rec.map((r) => r.state), ['proposed', 'live']);
  });

  test('SL-03 · varje metod orkestratorn anropar på FileStore finns på PgStore', () => {
    // appendHistory är oanvänd av orkestratorn (grep 2026-09-01) och undantas medvetet.
    const anropade = ['save', 'load', 'list'];
    for (const m of anropade) {
      assert.equal(typeof FileStore.prototype[m], 'function', `FileStore.${m} saknas — uppdatera listan`);
      assert.equal(typeof PgStore.prototype[m], 'function', `PgStore.${m} saknas — orkestratorn kraschar`);
    }
  });
});

describe('SL · Cron-grinden: en osatt hemlighet är en okänd, inte ett lösenord', () => {
  const prod = (extra) => ({ NODE_ENV: 'production', ...extra });

  test('SL-04 · «Bearer undefined» släpps ALDRIG in när hemligheten är osatt eller tom', () => {
    for (const env of [prod({}), prod({ CRON_SECRET: '' }), prod({ CRON_SECRET: '   ' })]) {
      for (const auth of ['Bearer undefined', 'Bearer ', 'Bearer null', undefined]) {
        assert.equal(cronAnropTillatet({ headers: { authorization: auth } }, { env }), false,
          `env=${JSON.stringify(env)} auth=${auth}`);
      }
    }
  });

  test('SL-05 · MOTPROVET — rätt hemlighet släpps in i produktion, allt släpps in utanför', () => {
    assert.equal(cronAnropTillatet({ headers: { authorization: 'Bearer s3' } }, { env: prod({ CRON_SECRET: 's3' }) }), true);
    assert.equal(cronAnropTillatet({ headers: { authorization: 'Bearer fel' } }, { env: prod({ CRON_SECRET: 's3' }) }), false);
    assert.equal(cronAnropTillatet({ headers: {} }, { env: { NODE_ENV: 'test' } }), true, 'lokalt/CI ska inte kräva hemlighet');
  });
});
