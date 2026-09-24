// tests/switchliggare.mjs — SL-01..07: PgStore bär FileStore:s kontrakt, och cron-grinden nekar
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

  test('SL-07 · drain-ingest är fail-closed: en osatt hemlighet nekar (motprov: rätt hemlighet släpps in)', async () => {
    const { default: handler } = await import('../api/cron/drain-ingest.mjs');
    const kor = async (headers) => {
      let status = null;
      const res = { statusCode: 0, setHeader() {}, end() { status = this.statusCode; }, status(s) { this.statusCode = s; return this; }, json() { status = this.statusCode; } };
      await handler({ method: 'POST', headers, query: {}, url: '/api/cron/drain-ingest' }, res);
      return status;
    };
    const fore = { NODE_ENV: process.env.NODE_ENV, CRON_SECRET: process.env.CRON_SECRET, DATABASE_URL: process.env.DATABASE_URL, KV_REST_API_URL: process.env.KV_REST_API_URL };
    try {
      process.env.NODE_ENV = 'production'; delete process.env.CRON_SECRET; delete process.env.DATABASE_URL; delete process.env.KV_REST_API_URL;
      assert.equal(await kor({}), 401, 'osatt hemlighet och ingen header — förr släpptes detta in (fail-open)');
      assert.equal(await kor({ authorization: 'Bearer undefined' }), 401);
      process.env.CRON_SECRET = 's3';
      assert.equal(await kor({ authorization: 'Bearer fel' }), 401);
      assert.notEqual(await kor({ authorization: 'Bearer s3' }), 401, 'motprov: rätt hemlighet släpps in');
    } finally {
      for (const [k, v] of Object.entries(fore)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
    }
  });

  test('SL-06 · send-reminders nekar ett anrop utan hemlighet i produktion (motprov: rätt hemlighet släpps in)', async () => {
    process.env.RESEND_API_KEY ??= 're_test';
    const { default: handler } = await import('../api/cron/send-reminders.mjs');
    const kor = async (headers) => {
      let status = null;
      const res = { statusCode: 0, setHeader() {}, end() { status = this.statusCode; } };
      await handler({ method: 'GET', headers }, res);
      return status;
    };
    const fore = { NODE_ENV: process.env.NODE_ENV, CRON_SECRET: process.env.CRON_SECRET, DATABASE_URL: process.env.DATABASE_URL };
    try {
      process.env.NODE_ENV = 'production'; process.env.CRON_SECRET = 's3'; delete process.env.DATABASE_URL;
      assert.equal(await kor({}), 401, 'utan header ska loopen nekas');
      assert.equal(await kor({ authorization: 'Bearer fel' }), 401);
      delete process.env.CRON_SECRET;
      assert.equal(await kor({ authorization: 'Bearer undefined' }), 401, 'osatt hemlighet nekar');
      process.env.CRON_SECRET = 's3';
      assert.notEqual(await kor({ authorization: 'Bearer s3' }), 401, 'motprov: rätt hemlighet släpps in');
    } finally {
      for (const [k, v] of Object.entries(fore)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; }
    }
  });
});
