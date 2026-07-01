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
    assert.match(p.source, /Microsoft/);                // källan finns, i klarspråk
    assert.match(p.source, /publika uppgifter/);
  });

  test('M365-onboarding → daterat fynd med källa (klarspråk)', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: { mx: 'microsoft365' }, ct: { m365Since: '2021-04-15', m365Via: 'autodiscover' } },
      { now: NOW });
    const o = f.find((x) => x.kind === 'onboarding');
    assert.ok(o);
    assert.match(o.title, /sattes upp/);
    assert.match(o.source, /Offentligt register/);
    assert.match(o.source, /2021-04-15/);
  });

  test('domänålder → år beräknat, källa angiven (klarspråk)', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: {}, domainReg: '2000-04-04' }, { now: NOW });
    const d = f.find((x) => x.kind === 'domain');
    assert.ok(d);
    assert.match(d.title, /26 års/);                    // 2000 → 2026
    assert.match(d.source, /domänregistret/);
  });

  test('LYNXEYE-LÄRDOMEN ordagrant: cert (2009) + äldre domänreg (2000) → ETT längd-fynd, aldrig två som grälar', () => {
    // Grundarfynd 2026-07-01: "Digital närvaro sedan oktober 2009" bredvid "26 års obruten digital
    // närvaro" delade språk men grälade om årtal — läste som en självmotsägelse på samma kort.
    const f = buildRevealFindings(
      { domain: 'lynxeye.com', posture: { mx: 'microsoft365' },
        domainReg: '2000-04-04', ct: { oldestCert: '2009-10-14' } },
      { now: new Date('2026-07-01') });
    assert.ok(f.find((x) => x.kind === 'domain'), 'domän-fyndet (äldre, starkare) ska fyra');
    assert.equal(f.find((x) => x.kind === 'cert'), undefined, 'cert-fyndet ska undertryckas när domänreg fyrar');
  });

  test('cert UTAN domänreg → cert-fyndet står kvar (inget att gräla med)', () => {
    const f = buildRevealFindings(
      { domain: 'ny.se', posture: {}, ct: { oldestCert: '2019-05-01' } }, { now: NOW });
    assert.ok(f.find((x) => x.kind === 'cert'));
  });

  test('cert + UNG domänreg (<6 år, fyrar inte) → cert-fyndet står kvar', () => {
    const f = buildRevealFindings(
      { domain: 'ny.se', posture: {}, domainReg: '2023-01-01', ct: { oldestCert: '2023-02-01' } }, { now: NOW });
    assert.ok(f.find((x) => x.kind === 'cert'));
    assert.equal(f.find((x) => x.kind === 'domain'), undefined);
  });

  test('ung domän (< 6 år) → utelämnas (inte anmärkningsvärt)', () => {
    const f = buildRevealFindings(
      { domain: 'ny.se', posture: {}, domainReg: '2023-01-01' }, { now: NOW });
    assert.equal(f.find((x) => x.kind === 'domain'), undefined);
  });

  // KVALITETSTRÖSKELN STÅR KVAR: en generisk e-postlösning (mx=other) blir ALDRIG ett limpt
  // "om er"-fynd. Men avslöjandet får inte längre WHIFFA tomt (grundarbeslut 2026-07-01) — istället
  // faller det på GOLVET: en källbelagd värde-brygga, aldrig ett fabricerat personligt påstående.
  test('mx=other utan starka fynd → INGET limpt plattforms-fynd, men golvet bär (aldrig tomt)', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { mx: 'other' } }, { now: NOW });
    assert.equal(f.find((x) => x.kind === 'platform'), undefined);   // "E-post via Anpassad lösning" visas ALDRIG
    assert.ok(f.length >= 1);                                        // men aldrig tomt
    assert.equal(f[f.length - 1].kind, 'bridge');                   // golvet är en värde-brygga
    assert.equal(f[f.length - 1].floor, true);
  });

  test('GOLV: tom posture → aldrig tomt, en källbelagd värde-brygga (aldrig ett fabricerat påstående)', () => {
    const f = buildRevealFindings({ domain: 'okänd.se', posture: { mx: 'unknown' } }, { now: NOW });
    assert.equal(f.length, 1);
    assert.equal(f[0].kind, 'bridge');
    assert.equal(f[0].floor, true);
    assert.ok(f[0].source && f[0].source.trim().length > 0);        // regel 3: golvet bär ändå källa
    assert.match(f[0].source, /listpris/i);
  });

  test('GOLV tier 1: namnbar infrastruktur (nsDetail) namnges FÖRE värde-bryggan', () => {
    const f = buildRevealFindings(
      { domain: 'foo.se', posture: { mx: 'other', nsProvider: 'registrar', nsDetail: 'loopia' } }, { now: NOW });
    const infra = f.find((x) => x.kind === 'infra');
    assert.ok(infra);
    assert.match(infra.title, /Loopia/);                            // versaliserat varumärke
    assert.match(infra.source, /Namnservrarna/);
    assert.equal(f[f.length - 1].kind, 'bridge');                  // bryggan ligger sist som säkerhet
  });

  test('GOLVET rör ALDRIG ett bolag som redan har starka fynd (ingen brygga vid M365-träff)', () => {
    const f = buildRevealFindings(
      { domain: 'lynxeye.se', posture: { mx: 'microsoft365', spfM365: true, dmarc: 'reject' },
        domainReg: '2000-04-04', ct: { m365Since: '2021-04-15' } }, { now: NOW });
    assert.equal(f.find((x) => x.kind === 'bridge'), undefined);    // golvet aktiveras bara när f är tomt
    assert.equal(f.find((x) => x.kind === 'infra'), undefined);
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
