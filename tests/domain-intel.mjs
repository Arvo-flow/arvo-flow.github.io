// tests/domain-intel.mjs — låser Avslöjandets rena delar (domän-härledning + fynd-bygge).
// DNS/HTTP-I/O testas live (kräver Vercel); den deterministiska kärnan låses här.
// Integritet: varje avslöjande-fynd MÅSTE bära en källa (regel 3) och får aldrig fabriceras.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { domainFromEmail, registrableDomain, buildRevealFindings, buildMarketAnchorFinding, buildCrossReading, _cachedLookup } from '../lib/domain-intel.js';

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

// ── SPF-LÄXAN (Lekia, 2026-07-12): SPF:en är en leverantörslista i klartext ──────────
// Lekias VERKLIGA SPF-mekanismer som fixtur: mejl via säkerhetsgateway (MX ≠ Microsoft)
// men SPF auktoriserar outlook.com → M365-familjen bekräftad bakom gatewayen, och fem
// leverantörsrelationer synliga utifrån. Före fixen: trivia-golvet. Efter: två äkta fynd.
import { suppliersFromSpf } from '../lib/domain-intel.js';

const LEKIA_MECHANISMS = [
  'ip4:31.216.224.122', 'include:spf.mandrillapp.com', 'include:mail.zendesk.com',
  'include:spf.abicart.com', 'include:spf.protection.outlook.com',
  'include:spf.mailanyone.net', 'include:amazonses.com', 'include:em7227.lekia.se',
];

describe('suppliersFromSpf · kurerad karta, aldrig en gissning', () => {
  test('Lekias SPF ger fyra igenkända namn (Microsoft exkluderad — eget fynd)', () => {
    assert.deepEqual(suppliersFromSpf(LEKIA_MECHANISMS), ['Zendesk', 'Mailchimp', 'Amazon SES', 'Abicart']);
  });
  test('okända includes namnges aldrig', () => {
    assert.deepEqual(suppliersFromSpf(['include:spf.okand-tjanst.se', 'ip4:1.2.3.4']), []);
  });
  test('dubbletter slås ihop (mandrillapp + mailchimp = ett namn)', () => {
    assert.deepEqual(suppliersFromSpf(['include:spf.mandrillapp.com', 'include:mailchimp.com']), ['Mailchimp']);
  });
});

describe('buildRevealFindings · Lekia-fallet: gateway-MX men SPF bär sanningen', () => {
  const posture = {
    mx: 'other', spfM365: true, spfGoogle: false, spfGateway: 'FortiMail',
    spfMechanisms: LEKIA_MECHANISMS, dmarc: 'none',
  };
  const f = buildRevealFindings({ domain: 'lekia.se', posture, domainReg: null, ct: null });

  test('M365-fyndet föds ur SPF:en — nivåfrågan utan siffror, aldrig en påstådd nivå', () => {
    const m365 = f.find((x) => x.kind === 'platform');
    assert.ok(m365, 'plattformsfyndet saknas');
    assert.equal(m365.title, 'Ni kör Microsoft 365');
    assert.match(m365.detail, /bakom er mejlgateway/);
    assert.match(m365.detail, /syns bara på fakturan/);
    assert.doesNotMatch(m365.detail, /Business Standard|Basic|Premium|E3|E5/);
    assert.match(m365.source, /SPF-posten/);
  });

  test('leverantörslistan: fyra namn, källbelagd, kräver ≥2', () => {
    const sup = f.find((x) => x.kind === 'suppliers');
    assert.ok(sup, 'leverantörsfyndet saknas');
    assert.match(sup.title, /4 leverantörer/);
    assert.match(sup.detail, /Zendesk · Mailchimp · Amazon SES · Abicart/);
  });

  test('pengabryggan: listan slutar i fakturadörren — samma dörr som M365-fyndet', () => {
    const sup = f.find((x) => x.kind === 'suppliers');
    assert.match(sup.detail, /rad i era kostnader/);
    assert.match(sup.detail, /dela fakturorna, så läser vi dem exakt/);
  });

  test('källupprepningen vänd: när plattformsfyndet föddes ur SPF:en säger listan "Samma SPF-post"', () => {
    const sup = f.find((x) => x.kind === 'suppliers');
    assert.match(sup.source, /Samma SPF-post — en enda publik rad för lekia\.se/);
  });

  test('…men med MX-buret plattformsfynd citerar listan SPF:en fristående', () => {
    const fMx = buildRevealFindings({
      domain: 'y.se',
      posture: { mx: 'microsoft365', spfM365: true, spfMechanisms: LEKIA_MECHANISMS },
      domainReg: null, ct: null,
    });
    const sup = fMx.find((x) => x.kind === 'suppliers');
    assert.ok(sup, 'leverantörsfyndet saknas i MX-fallet');
    assert.match(sup.source, /SPF-posten för y\.se/);
    assert.doesNotMatch(sup.source, /Samma SPF-post/);
  });

  test('påstår bara det SPF:en bevisar: sändningsrätt i ert namn — aldrig "avtalsrelation"', () => {
    // Amazon SES-läxan: SES kan rida med transitivt via en annan tjänst — en CFO utan
    // "Amazon-avtal" ska aldrig kunna falsifiera vårt fynd. SPF:ens exakta sanning är
    // ofalsifierbar: tjänsten har rätt att skicka mejl i bolagets namn.
    const sup = f.find((x) => x.kind === 'suppliers');
    assert.match(sup.detail, /har rätt att skicka mejl i ert namn/);
    assert.doesNotMatch(sup.detail, /avtalsrelation/);
  });

  test('trivia-golvet inträder ALDRIG när äkta fynd finns', () => {
    assert.equal(f.some((x) => x.kind === 'infra' || x.kind === 'bridge'), false);
  });

  test('ett ensamt SPF-namn bär inte listan (tröskel ≥2)', () => {
    const f2 = buildRevealFindings({
      domain: 'x.se',
      posture: { mx: 'other', spfM365: false, spfMechanisms: ['include:mail.zendesk.com'] },
      domainReg: null, ct: null,
    });
    assert.equal(f2.some((x) => x.kind === 'suppliers'), false);
  });
});

describe('Kristianstad-läxan · golvets ärlighet + marknadsankaret', () => {
  const NOW2 = new Date('2026-07-12T12:00:00Z');

  test('infra-raden påstår bara det namnservrarna bevisar: domänen, aldrig "er drift"', () => {
    const f = buildRevealFindings(
      { domain: 'foo.se', posture: { mx: 'other', nsProvider: 'registrar', nsDetail: 'loopia' } }, { now: NOW2 });
    const infra = f.find((x) => x.kind === 'infra');
    assert.match(infra.title, /Loopia sköter er domän/);
    assert.doesNotMatch(infra.title, /drift/i);
  });

  test('bryggan är SIFFERLÖS — priset bor i prisboken, aldrig i en lokal kopia (regel 1)', () => {
    const f = buildRevealFindings({ domain: 'okänd.se', posture: { mx: 'unknown' } }, { now: NOW2 });
    const bridge = f.find((x) => x.kind === 'bridge');
    assert.ok(bridge);
    assert.doesNotMatch(bridge.detail, /\d/);
    assert.doesNotMatch(bridge.detail, /Microsoft/);
  });

  const BM_OK = {
    source: 'real-public', isTotal: false, p25: 2868, median: 3348,
    alternatives: [{ supplier: 'Tele2 Företag' }],
  };

  test('marknadsankaret: p25 per enhet → kr/mån, leverantör ur prisboksdatat, källa namngiven', () => {
    const a = buildMarketAnchorFinding(BM_OK);
    assert.equal(a.kind, 'market');
    assert.match(a.title, /239 kr\/mån per abonnemang/);      // 2868/12 — kod räknar, deterministiskt
    assert.match(a.detail, /Tele2 Företag/);
    assert.match(a.source, /Verifierat publikt listpris · Tele2 Företag/);
  });

  test('integritetslåset: ENDAST real-public per enhet — allt annat → inget ankare', () => {
    assert.equal(buildMarketAnchorFinding(null), null);
    assert.equal(buildMarketAnchorFinding({ ...BM_OK, source: 'estimated' }), null);
    assert.equal(buildMarketAnchorFinding({ ...BM_OK, source: 'live_analyses' }), null);
    assert.equal(buildMarketAnchorFinding({ ...BM_OK, isTotal: true }), null);      // totalsumma ≠ per enhet
    assert.equal(buildMarketAnchorFinding({ ...BM_OK, p25: 0 }), null);
    assert.equal(buildMarketAnchorFinding({ ...BM_OK, alternatives: [] }), null);   // listpris utan bärare ≠ källbelagt
  });

  test('ankaret gör ALDRIG en kundjämförelse — inga "ni betalar"-påståenden', () => {
    const a = buildMarketAnchorFinding(BM_OK);
    assert.doesNotMatch(a.title + a.detail, /ni betalar för mycket|er kostnad är/i);
  });

  test('listpris-läsvägen: deterministisk real-public för mobil, null för oberäknade kategorier', async () => {
    const { getPublicListBenchmark } = await import('../lib/benchmark.js');
    const m = getPublicListBenchmark({ category: 'mobil' });
    assert.equal(m.source, 'real-public');
    assert.ok(m.p25 > 0);
    assert.ok(m.alternatives?.[0]?.supplier, 'p25-bäraren måste vara namngiven');
    assert.ok(buildMarketAnchorFinding(m), 'prisbokens mobil-listpris ska bära ett ankare');
    assert.equal(getPublicListBenchmark({ category: 'it-support' }), null);        // ej real-public
    assert.equal(getPublicListBenchmark({ category: 'forsakring-foretag' }), null);
  });
});

describe('Förfalskningsfyndet · DMARC-luckan sägs högt (fynd-motorns toppsignal in i dörren)', () => {
  const base = { mx: 'other', nsDetail: 'loopia', nsProvider: 'registrar', exists: true };

  test('DMARC-post saknas (definitivt) → fyndet med "saknar"-copyn och källa', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { ...base, dmarcAbsent: true } });
    const s = f.find((x) => x.kind === 'spoofing');
    assert.ok(s, 'förfalskningsfyndet saknas');
    assert.equal(s.title, 'Mejl i ert namn kan förfalskas');
    assert.match(s.detail, /saknar DMARC-skydd/);
    assert.match(s.detail, /kostnadsfri att stänga/);
    assert.match(s.source, /DMARC-uppslaget för foo\.se/);
  });

  test('p=none → övervakningsläges-copyn (posten finns men stoppar inget)', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { ...base, dmarc: 'none' } });
    const s = f.find((x) => x.kind === 'spoofing');
    assert.match(s.detail, /övervakningsläge \(p=none\)/);
  });

  test('reject/quarantine → det positiva skydds-fyndet, ALDRIG förfalskningsfyndet', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { ...base, dmarc: 'reject' } });
    assert.ok(f.find((x) => x.kind === 'dmarc'));
    assert.equal(f.find((x) => x.kind === 'spoofing'), undefined);
  });

  test('transient DNS-miss (varken policy eller definitiv frånvaro) → TYSTNAD, aldrig ett påstående', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { ...base } });
    assert.equal(f.find((x) => x.kind === 'spoofing'), undefined);
    assert.equal(f.find((x) => x.kind === 'dmarc'), undefined);
  });

  test('fyndet räknas som substans: golvet (infra/brygga) behövs inte när luckan bär', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { ...base, dmarcAbsent: true } });
    assert.equal(f.find((x) => x.kind === 'bridge'), undefined);
    assert.equal(f.find((x) => x.kind === 'infra'), undefined);
  });
});

describe('Flimmervakten · verifierade historiska svar minns, fel och tomhet cachas aldrig', () => {
  const fakeKv = (store = new Map()) => ({
    store,
    async get(k) { return store.get(k) ?? null; },
    async set(k, v) { store.set(k, v); },
  });

  test('lyckat innehållsbärande svar → cachas; nästa uppslag träffar minnet utan ny hämtning', async () => {
    const kv = fakeKv();
    let calls = 0;
    const fetcher = async () => { calls++; return { oldestCert: '2014-05-06', m365Since: null }; };
    const worth = (v) => Boolean(v?.oldestCert || v?.m365Since);
    const first = await _cachedLookup('t:ct:x.se', fetcher, worth, kv);
    assert.equal(first.oldestCert, '2014-05-06');
    const second = await _cachedLookup('t:ct:x.se', fetcher, worth, kv);
    assert.equal(second.oldestCert, '2014-05-06');
    assert.equal(calls, 1, 'andra uppslaget ska bäras av minnet');
  });

  test('null/tomt svar (transient miss) → cachas ALDRIG; nästa besök försöker igen', async () => {
    const kv = fakeKv();
    let calls = 0;
    const fetcher = async () => { calls++; return calls === 1 ? null : { oldestCert: '2014-05-06', m365Since: null }; };
    const worth = (v) => Boolean(v?.oldestCert || v?.m365Since);
    assert.equal(await _cachedLookup('t:ct:y.se', fetcher, worth, kv), null);
    assert.equal(kv.store.size, 0, 'en miss får aldrig bli ett minne');
    const retry = await _cachedLookup('t:ct:y.se', fetcher, worth, kv);
    assert.equal(retry.oldestCert, '2014-05-06');
    assert.equal(calls, 2);
  });

  test('utan KV (sandbox/test) → ren genomströmning, inga kast', async () => {
    const v = await _cachedLookup('t:reg:z.se', async () => '2000-04-04', (x) => Boolean(x), null);
    assert.equal(v, '2000-04-04');
  });

  test('trasig KV (get/set kastar) → genomströmning, aldrig ett fel mot kunden', async () => {
    const brokenKv = { async get() { throw new Error('kv nere'); }, async set() { throw new Error('kv nere'); } };
    const v = await _cachedLookup('t:reg:w.se', async () => '1999-01-01', (x) => Boolean(x), brokenKv);
    assert.equal(v, '1999-01-01');
  });
});

describe('Korsläsningen · domänens år mot tillväxtresans start (Issa-menyn punkt 4)', () => {
  const grow = [
    { year: '2025', revenueTkr: 9700 }, { year: '2024', revenueTkr: 3040 },
    { year: '2023', revenueTkr: 1400 }, { year: '2022', revenueTkr: 900 }, { year: '2021', revenueTkr: 600 },
  ];
  test('domän 2014 + svit från 2021 → korsläsningen fyrar med båda källorna', () => {
    const c = buildCrossReading({ domainReg: '2014-05-06', facts: { history: grow } });
    assert.equal(c.title, 'Er domän är från 2014 — tillväxtresan började 2021');
    assert.match(c.detail, /7 år äldre/);
    assert.match(c.source, /domänregistret \(registrerad 2014-05-06\)/);
    assert.match(c.source, /2021–2025/);
  });
  test('tystnadsgrindarna: gap < 5 år, fallande kurva, ingen svit, ingen domänreg → null', () => {
    assert.equal(buildCrossReading({ domainReg: '2019-01-01', facts: { history: grow } }), null);
    assert.equal(buildCrossReading({ domainReg: '2014-05-06', facts: { history: [
      { year: '2025', revenueTkr: 900 }, { year: '2024', revenueTkr: 1400 }] } }), null);
    assert.equal(buildCrossReading({ domainReg: '2014-05-06', facts: { history: grow.slice(0, 2).concat([{ year: '2023', revenueTkr: 3200 }]) } }), null);
    assert.equal(buildCrossReading({ domainReg: null, facts: { history: grow } }), null);
  });
});

describe('Spökdomän-läxan (hdssyjxdd.se, 2026-07-17): ett fantom får inget kort', () => {
  test('förfalskningsfyndet kräver en EXISTERANDE domän — dmarcAbsent på ett fantom → tystnad', () => {
    const f = buildRevealFindings({ domain: 'hdssyjxdd.se', posture: { mx: 'unknown', dmarcAbsent: true, exists: false } });
    assert.equal(f.find((x) => x.kind === 'spoofing'), undefined);
  });
  test('på en existerande domän fyrar fyndet som förut', () => {
    const f = buildRevealFindings({ domain: 'foo.se', posture: { mx: 'other', dmarcAbsent: true, exists: true } });
    assert.ok(f.find((x) => x.kind === 'spoofing'));
  });
});

describe('Adversariella svepet 2026-07-17 · domänhärledningen', () => {
  test('SUBDOMÄN-LÄXAN (identitetsklass): anna@mail.bolag.se → bolag.se — SLD:n blir aldrig "mail"', () => {
    assert.equal(domainFromEmail('anna@mail.bolag.se'), 'bolag.se');
    assert.equal(registrableDomain('smtp.mail.foretag.se'), 'foretag.se');
    assert.equal(registrableDomain('webmail.bolag.co.uk'), 'bolag.co.uk');
    // kirurgin skär ALDRIG i okända etiketter — bolaget.ab.se är någons domän, inte ett prefix
    assert.equal(registrableDomain('bolaget.ab.se'), 'bolaget.ab.se');
  });
  test('IDN-LÄXAN: info@måleri.se är en företagsdomän (punycode för DNS), aldrig "privat inkorg"', () => {
    assert.equal(domainFromEmail('info@måleri.se'), 'xn--mleri-mra.se');
  });
  test('städning: mailto-prefix och avslutande punkt', () => {
    assert.equal(domainFromEmail('mailto:x@bolag.se'), 'bolag.se');
    assert.equal(domainFromEmail('x@bolag.se.'), 'bolag.se');
  });
});
