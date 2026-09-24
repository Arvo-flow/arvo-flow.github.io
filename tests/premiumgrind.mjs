// tests/premiumgrind.mjs — PROAKTIVA UTSKICK BARA TILL PREMIUMKRETSEN (PG). Grundarorder 2026-09-24,
// bakgrund i lib/premiumkrets.js.
//
// FÅNGAR: en brief eller ett prislarm till en adress som bara anmält sig (raden finns men är inte
//   beviljad), till en avslutad adress, eller till en adress som inte finns i tabellen; en krets som inte
//   kan läsas och tolkas som «tom» eller «alla»; ett 50-tak som räknas före grinden; en workflow-input i
//   klartext; en migrering som saknar kolumnerna grinden läser.
// BLIND: fejkdatabasen tolkar SQL genom att leta villkorstexten — den prövar att villkoren STÅR i
//   frågan och vad de gör med raderna, inte Postgres semantik. Och vem som betalat vet ingen kod.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { lasPremiumkrets, premiumFilter, matchaAdress, normaliseraEpost } from '../lib/premiumkrets.js';
import { getAffectedCustomers } from '../lib/price-alert-store.js';
import briefHandler, { briefMottagare } from '../api/cron/generate-briefings.mjs';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const hashFp = (fp) => sha(fp).slice(0, 32);

/**
 * Fejkad sql-tagg. Villkoren på intelligence_activations verkar BARA om de står i frågan — så ett
 * sabotage som stryker villkoret ändrar utfallet i stället för att passera.
 */
function fejkDb({ aktiveringar = [], gate = [], analyser = [], briefAdresser = [], kretsKastar = false } = {}) {
  return async (strings, ...vals) => {
    const q = strings.join('?');
    if (/FROM intelligence_activations/.test(q)) {
      if (kretsKastar) throw new Error('column "premium_beviljad_at" does not exist');
      let r = aktiveringar;
      if (/premium_beviljad_at IS NOT NULL/.test(q)) r = r.filter((a) => a.beviljad);
      if (/premium_avslutad_at IS NULL/.test(q)) r = r.filter((a) => !a.avslutad);
      return r.map((a) => ({ email: a.email }));
    }
    if (/FROM gate_emails/.test(q)) return gate;
    if (/SELECT DISTINCT user_email/.test(q)) {
      const tak = q.match(/LIMIT (\d+)/);   // ett tak i SQL:en verkar — annars kan PG-05 inte se ett tak före grinden
      return briefAdresser.slice(0, tak ? Number(tak[1]) : undefined).map((e) => ({ user_email: e }));
    }
    if (/FROM invoice_analyses/.test(q)) {
      const fps = vals.find(Array.isArray) ?? [];
      return analyser.filter((a) => fps.includes(a.fingerprint));
    }
    throw new Error(`fejkDb: okänd fråga ${q.slice(0, 60)}`);
  };
}

const AKT = [
  { email: 'Premium@Bolag.se ', beviljad: true },
  { email: 'anmald@bolag.se' },                             // bara anmälan — formuläret är öppet
  { email: 'avslutad@bolag.se', beviljad: true, avslutad: true },
];

describe('PG · premiumgrinden', () => {
  test('PG-01 · bara en beviljad, ej avslutad rad är premium — skiftläge och blanksteg normaliseras', async () => {
    const krets = await lasPremiumkrets(fejkDb({ aktiveringar: AKT }));
    assert.deepEqual([...krets], ['premium@bolag.se']);
    const { kvar, utestangda } = premiumFilter(
      [{ email: 'premium@bolag.se' }, { email: 'anmald@bolag.se' }, { email: 'avslutad@bolag.se' }, { email: 'okand@bolag.se' }, { email: null }], krets);
    assert.deepEqual(kvar.map((m) => m.email), ['premium@bolag.se'], 'motprov: premiumadressen står kvar');
    assert.equal(utestangda, 4);
    assert.equal(normaliseraEpost('  A@B.se'), 'a@b.se');
    assert.equal(normaliseraEpost('inte-en-adress'), null);
  });

  test('PG-02 · okänt är inte tomt: en krets som inte kan läsas kastar, och filtret vägrar en oläst krets', async () => {
    await assert.rejects(lasPremiumkrets(fejkDb({ kretsKastar: true })), /premium_beviljad_at/);
    await assert.rejects(lasPremiumkrets(null), /okänd krets/);
    assert.throws(() => premiumFilter([{ email: 'premium@bolag.se' }], null), /inte läst/);
    // Motprov: en läst men tom krets är ett giltigt svar (ingen är premium) — noll av rätt skäl.
    assert.deepEqual(premiumFilter([{ email: 'x@y.se' }], new Set()), { kvar: [], utestangda: 1 });
  });

  test('PG-03 · kolumnerna grinden läser skapas av en migrering (LK-01:s regel)', () => {
    const m = las('scripts/migrate-v2.mjs');
    assert.match(m, /ALTER TABLE intelligence_activations ADD COLUMN IF NOT EXISTS premium_beviljad_at TIMESTAMPTZ/);
    assert.match(m, /ALTER TABLE intelligence_activations ADD COLUMN IF NOT EXISTS premium_avslutad_at TIMESTAMPTZ/);
    // Formuläret får aldrig sätta beviljandet — då vore grinden ett formulärfält.
    assert.doesNotMatch(las('api/activate-intelligence.mjs'), /premium_beviljad_at/);
  });

  test('PG-04 · prislarmens mottagarlista (båda avsändarna) innehåller bara premiumkretsen', async () => {
    const gate = [
      { email: 'premium@bolag.se', fingerprint: 'fp-premium' },
      { email: 'anmald@bolag.se', fingerprint: 'fp-anmald' },
      { email: 'gratis@bolag.se', fingerprint: 'fp-gratis' },
    ];
    const analyser = gate.map((g) => ({ fingerprint: hashFp(g.fingerprint), normalized_supplier: 'telia', category: 'mobil',
      annual_cost: 48000, gross_saving: 0, net_saving: 0, seat_count: 10, created_at: new Date('2026-09-01') }));
    const ut = await getAffectedCustomers({ supplierKeyword: 'telia', category: 'mobil' }, { db: fejkDb({ aktiveringar: AKT, gate, analyser }) });
    assert.deepEqual(ut.map((c) => c.email), ['premium@bolag.se']);
    // Motprov: bevilja alla → alla tre får larm. Instrumentet kan alltså svara det motsatta.
    const alla = gate.map((g) => ({ email: g.email, beviljad: true }));
    const ut2 = await getAffectedCustomers({ supplierKeyword: 'telia', category: 'mobil' }, { db: fejkDb({ aktiveringar: alla, gate, analyser }) });
    assert.equal(ut2.length, 3);
    // Okänd krets → kastar, aldrig «0 berörda».
    await assert.rejects(getAffectedCustomers({ supplierKeyword: 'telia', category: 'mobil' }, { db: fejkDb({ kretsKastar: true, gate, analyser }) }), /noll är inte ett svar/);
    // Båda avsändarna hämtar mottagare härifrån och ingen annanstans.
    for (const f of ['api/cron/run-price-alerts.mjs', 'scripts/notify-price-changes.mjs']) {
      const s = las(f);
      assert.match(s, /getAffectedCustomers\(/, `${f} går inte via den grindade listan`);
      assert.doesNotMatch(s, /FROM gate_emails|FROM\s+invoice_analyses/, `${f} läser mottagare förbi grinden`);
    }
  });

  test('PG-05 · månadsbriefen: bara premium, och taket 50 räknas EFTER grinden', async () => {
    const gratis = Array.from({ length: 60 }, (_, i) => `gratis${i}@bolag.se`);
    const db = fejkDb({ aktiveringar: AKT, briefAdresser: [...gratis, 'premium@bolag.se'] });
    const r = await briefMottagare(db, { periodStart: '2026-08-01', periodEnd: '2026-09-01' });
    assert.deepEqual(r.mottagare.map((m) => m.user_email), ['premium@bolag.se'], 'sextio gratisadresser får inte tränga undan premiumkunden');
    assert.equal(r.utestangda, 60);
  });

  test('PG-06 · briefkörningen skickar ingenting och svarar 503 när kretsen inte kan läses', async () => {
    let status = null; let body = null;
    const res = { status(s) { status = s; return this; }, json(b) { body = b; return this; } };
    await briefHandler({ headers: {} }, res, { db: fejkDb({ kretsKastar: true, briefAdresser: ['premium@bolag.se'] }) });
    assert.equal(status, 503);
    assert.match(body.error, /premiumkretsen/);
  });

  test('PG-07 · beviljandet pekar ut exakt en adress via sha256 — klartext vägras', () => {
    const adresser = AKT.map((a) => a.email);
    assert.match(matchaAdress(adresser, 'premium@bolag.se', sha).fel, /sha256/);
    assert.deepEqual(matchaAdress(adresser, `sha256:${sha('anmald@bolag.se')}`, sha), { adress: 'anmald@bolag.se' });
    assert.deepEqual(matchaAdress(adresser, `sha256:${sha('premium@bolag.se')}`, sha), { adress: 'premium@bolag.se' }, 'normaliserad adress matchar');
    assert.match(matchaAdress(adresser, `sha256:${sha('okand@bolag.se')}`, sha).fel, /ingen anmälan/);
    const wf = las('.github/workflows/bevilja-premium.yml');
    const korning = wf.slice(wf.indexOf('run: |'));
    assert.ok(korning.length > 10 && korning.includes('bevilja-premium.mjs'), 'hittade inte körsteget');
    assert.doesNotMatch(korning, /\$\{\{\s*inputs\./, 'indata interpoleras i skriptet — skriptinjektion');
  });
});
