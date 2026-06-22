// tests/domain-intel.mjs — låser Avslöjandets rena delar (domän-härledning + fynd-bygge).
// DNS/HTTP-I/O testas live (kräver Vercel); den deterministiska kärnan låses här.
// Integritet: varje avslöjande-fynd MÅSTE bära en källa (regel 3) och får aldrig fabriceras.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { domainFromEmail, buildRevealFindings } from '../lib/domain-intel.js';

describe('domainFromEmail', () => {
  test('plockar domän ur e-post', () => {
    assert.equal(domainFromEmail('met@lynxeye.se'), 'lynxeye.se');
    assert.equal(domainFromEmail('Anna.Svensson@Bolaget.AB.se'), 'bolaget.ab.se');
  });
  test('accepterar bar domän + städar www/protokoll', () => {
    assert.equal(domainFromEmail('https://www.foo.se/kontakt'), 'foo.se');
  });
  test('privat mejldomän → null (inget bolag att läsa av)', () => {
    assert.equal(domainFromEmail('mettan@gmail.com'), null);
    assert.equal(domainFromEmail('x@outlook.com'), null);
    assert.equal(domainFromEmail('y@hotmail.se'), null);
  });
  test('vanlig felstavning av gratisleverantör → null (gamil/gmial/hotmial)', () => {
    assert.equal(domainFromEmail('met.sogojeva@gamil.com'), null);
    assert.equal(domainFromEmail('x@gmial.com'), null);
    assert.equal(domainFromEmail('y@hotmial.com'), null);
  });
  test('skräp → null', () => {
    assert.equal(domainFromEmail(''), null);
    assert.equal(domainFromEmail('inte en domän'), null);
    assert.equal(domainFromEmail(null), null);
  });
});

describe('buildRevealFindings · varje fynd bär en källa, inget fabriceras', () => {
  const NOW = new Date('2026-06-21T00:00:00Z');

  test('M365 på flera nivåer → källbelagt plattforms-fynd', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: { mx: 'microsoft365', spfM365: true, dkimM365: true } },
      { now: NOW });
    const p = f.find((x) => x.kind === 'platform');
    assert.ok(p);
    assert.match(p.title, /Microsoft 365/);
    assert.equal(p.confidence, 'high');                 // 3 nivåer
    assert.match(p.source, /mail\.protection\.outlook\.com/);  // källan finns
  });

  test('M365-onboarding ur crt.sh → daterat fynd med källa', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: { mx: 'microsoft365' }, ct: { m365Since: '2021-04-15', m365Via: 'autodiscover' } },
      { now: NOW });
    const o = f.find((x) => x.kind === 'onboarding');
    assert.ok(o);
    assert.match(o.title, /restes/);
    assert.match(o.source, /crt\.sh/);
    assert.match(o.source, /autodiscover\.lynxeye\.se/);
  });

  test('domänålder ur RDAP → år beräknat, källa angiven', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: {}, domainReg: '2000-04-04' }, { now: NOW });
    const d = f.find((x) => x.kind === 'domain');
    assert.ok(d);
    assert.match(d.title, /26 års/);                    // 2000 → 2026
    assert.match(d.source, /RDAP/);
  });

  test('ung domän (< 6 år) → utelämnas (inte anmärkningsvärt)', () => {
    const f = buildRevealFindings(
      { domain: 'ny.se', posture: {}, domainReg: '2023-01-01' }, { now: NOW });
    assert.equal(f.find((x) => x.kind === 'domain'), undefined);
  });

  test('KVALITETSTRÖSKEL: generisk e-post (mx=other) ger INGET fynd — hellre tystnad än limp', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { mx: 'other' } }, { now: NOW });
    assert.deepEqual(f, []);                              // "E-post via Anpassad e-postlösning" får aldrig visas
  });

  test('tom posture → inga fynd (tystnad, inget fabricerat)', () => {
    const f = buildRevealFindings({ domain: 'okänd.se', posture: { mx: 'unknown' } }, { now: NOW });
    assert.deepEqual(f, []);
  });

  test('VARJE producerat fynd har en icke-tom källa', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se',
        posture: { mx: 'microsoft365', spfM365: true, dmarc: 'reject' },
        domainReg: '2000-04-04', ct: { m365Since: '2021-04-15', m365Via: 'autodiscover' } },
      { now: NOW });
    assert.ok(f.length >= 3);
    for (const x of f) assert.ok(x.source && x.source.trim().length > 0, `fynd "${x.title}" saknar källa`);
  });
});
