// tests/business-intel.mjs — låser affärshjärnan i avslöjandet.
// Fixturerna SPEGLAR VERKLIGHETEN ur sond v3 (ops/probe-business-intel.txt 2026-07-01):
// sökets companies[]-form, bolagssidans company-form, Netigate-tvetydigheten, kan.se-fallet.
// Integritetskärnan: fel bolags omsättning får ALDRIG visas — grinden är exakt-match, exakt EN.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sldFromDomain, normalizeCompanyName, matchCompany,
  extractNextData, extractSearchCompanies, extractCompanyFacts,
  buildBusinessFindings, mergeRevealFindings,
} from '../lib/business-intel.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

describe('business-intel · domän → SLD', () => {
  test('vanliga domäner', () => {
    assert.equal(sldFromDomain('apendo.se'), 'apendo');
    assert.equal(sldFromDomain('lynxeye.com'), 'lynxeye');
    assert.equal(sldFromDomain('BIMobject.COM'), 'bimobject');
  });
  test('för korta/generiska SLD → null (för osäkert att matcha)', () => {
    assert.equal(sldFromDomain('ab.se'), null);
    assert.equal(sldFromDomain(''), null);
    assert.equal(sldFromDomain(null), null);
  });
});

describe('business-intel · matchningsgrinden (integritetskärnan)', () => {
  test('exakt match, en träff → bolaget (Lynxeye-fallet)', () => {
    const m = matchCompany('lynxeye', [{ legalName: 'Lynxeye AB', orgnr: '5565690087' }]);
    assert.equal(m?.orgnr, '5565690087');
  });
  test('Netigate-fallet ordagrant: AB + Holding AB → ENDAST den exakta släpps igenom', () => {
    const m = matchCompany('netigate', [
      { legalName: 'Netigate AB', orgnr: '5565760997' },
      { legalName: 'Netigate Holding AB', orgnr: '5590665658' },
    ]);
    assert.equal(m?.orgnr, '5565760997');
  });
  test('kan.se-fallet: "Kanmalmo AB" matchar INTE "kan" → null (aldrig en chansning)', () => {
    assert.equal(matchCompany('kan', [{ legalName: 'Kanmalmo AB', orgnr: '5566692983' }]), null);
  });
  test('TVÅ exakta träffar → null (tvetydighet = tystnad, regel 4)', () => {
    const m = matchCompany('acme', [
      { legalName: 'Acme AB', orgnr: '1' },
      { legalName: 'ACME Aktiebolag', orgnr: '2' },
    ]);
    assert.equal(m, null);
  });
  test('normalisering: bolagsformer och skiljetecken faller bort', () => {
    assert.equal(normalizeCompanyName('Lynxeye AB'), 'lynxeye');
    assert.equal(normalizeCompanyName('ACME Aktiebolaget'), 'acme');
    assert.equal(normalizeCompanyName('Hallvarsson & Halvarsson AB'), 'hallvarssonhalvarsson');
  });
});

describe('business-intel · parsning (kontraktet ur sond v3)', () => {
  const searchHtml = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: { pageProps: { hydrationData: { searchStore: { companies: { companies: [
      { name: 'Lynxeye AB', legalName: 'Lynxeye AB', orgnr: '5565690087', companyId: '2K1O1YFI5YEHU' },
    ] } } } } },
  })}</script></html>`;
  const companyHtml = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: { pageProps: { company: {
      legalName: 'Apendo AB', orgnr: '5564374840', revenue: '52874', profit: '2036',
      employees: '30', companyAccountsLastUpdatedDate: '2025',
    } } },
  })}</script></html>`;

  test('sökets companies[] extraheras', () => {
    const list = extractSearchCompanies(extractNextData(searchHtml));
    assert.equal(list.length, 1);
    assert.equal(list[0].orgnr, '5565690087');
  });
  test('bolagsfakta extraheras: revenue i TKR, employees, år', () => {
    const f = extractCompanyFacts(extractNextData(companyHtml));
    assert.deepEqual(f, { legalName: 'Apendo AB', orgnr: '5564374840', revenueTkr: 52874, employees: 30, year: '2025' });
  });
  test('ogiltiga fakta → null (revenue saknas / employees orimligt)', () => {
    const bad = (company) => extractCompanyFacts({ props: { pageProps: { company } } });
    assert.equal(bad({ revenue: null, employees: '30', companyAccountsLastUpdatedDate: '2025' }), null);
    assert.equal(bad({ revenue: '100', employees: '0', companyAccountsLastUpdatedDate: '2025' }), null);
    assert.equal(bad({ revenue: '100', employees: '30', companyAccountsLastUpdatedDate: 'okänt' }), null);
  });
});

describe('business-intel · fynden (regel 2 + 3: kodräknat, källa på varje rad)', () => {
  const facts = { legalName: 'Apendo AB', orgnr: '5564374840', revenueTkr: 52874, employees: 30, year: '2025' };
  // Det verifierade listpriset (BRANCHINDEX-form): kr/anv/MÅN på årsavtal, källa microsoft.com
  const listPrice = { monthlyPerUserAnnualCommit: 119.48, product: 'Microsoft 365 Business Standard', lastVerified: '2026-06-14' };

  test('bokslutsfyndet: mkr-format, år, källa Bolagsverket — ALDRIG profit i copy', () => {
    const f = buildBusinessFindings(facts, { listPrice });
    const biz = f.find((x) => x.kind === 'business');
    assert.ok(biz);
    assert.match(biz.title, /52,9 mkr/);
    assert.match(biz.title, /30 anställda/);
    assert.match(biz.title, /2025/);
    assert.match(biz.source, /Bolagsverket/);
    assert.ok(!/profit|resultat/i.test(biz.title + biz.detail), 'profit-fältet får aldrig nå copy (oklar etikett)');
  });

  test('koncern-lärdomen: fyndet NAMNGER den juridiska enheten (detail + källa)', () => {
    const f = buildBusinessFindings(facts, { listPrice });
    const biz = f.find((x) => x.kind === 'business');
    assert.match(biz.detail, /Gäller Apendo AB/);          // exakt vilken enhet siffrorna gäller
    assert.match(biz.source, /Apendo AB/);
  });
  test('costline: ÄKTA listpriset × anställda × 12, deterministiskt, källbelagt (grundarlärdom 2026-07-01)', () => {
    const f = buildBusinessFindings(facts, { listPrice });
    const c = f.find((x) => x.kind === 'costline');
    assert.ok(c);
    const sp = (s) => s.replace(/[  ]/g, ' ');   // sv-SE-format använder no-break space
    assert.match(sp(c.title), /43 013/);                   // 30 × 119,48 × 12 = 43 012,80 → 43 013
    assert.match(sp(c.detail), /119,48 kr\/användare\/mån/);
    assert.match(c.detail, /årsavtal/);
    assert.match(c.source, /microsoft\.com, 2026-06-14/);
  });
  test('utan listpris → bara bokslutsfyndet · utan fakta → tomt', () => {
    assert.equal(buildBusinessFindings(facts, {}).length, 1);
    assert.deepEqual(buildBusinessFindings(null, { listPrice }), []);
  });
  test('REGRESSIONSLÅS: "golvpris"-etiketten (p25 felmärkt som verifierad) får ALDRIG återkomma', () => {
    const f = buildBusinessFindings(facts, { listPrice });
    const allText = f.map((x) => `${x.title} ${x.detail} ${x.source}`).join(' ').replace(/\u00A0|\u202F/g, ' ');
    assert.ok(!/golvpris/i.test(allText), 'p25/golvpris-språk i costline = regel 3-brott (fel proveniens)');
    assert.ok(!/1 ?704/.test(allText), 'p25-talet 1704 får inte nå copy som pris');
  });
  test('MASKINVAKT: BRANCHINDEX bär det verifierade listpriset (strukturen costline vilar på)', () => {
    const lt = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['business-standard'];
    assert.ok(lt.msrpAnnual > 0, 'msrpAnnual (kr/anv/mån på årsavtal) saknas — costline-kopplingen bruten');
    assert.equal(lt.source, 'microsoft.com');
    assert.ok(lt.lastVerified, 'lastVerified saknas — priset kan inte källdateras i kundytan');
  });
});

describe('business-intel · sammanfogning med DNS-fynden', () => {
  const biz = [{ kind: 'business', title: 'x' }];
  const dns = [{ kind: 'platform', title: 'M365' }, { kind: 'bridge', title: 'brygga', floor: true }];

  test('affärsfynd leder; DNS-golvbryggan faller bort (annars dubblett av costline)', () => {
    const merged = mergeRevealFindings(biz, dns);
    assert.equal(merged[0].kind, 'business');
    assert.equal(merged.find((f) => f.floor), undefined);
    assert.ok(merged.find((f) => f.kind === 'platform'));
  });
  test('utan affärsfynd → DNS-fynden orörda (golvet står kvar)', () => {
    const merged = mergeRevealFindings([], dns);
    assert.equal(merged.length, 2);
    assert.ok(merged.find((f) => f.floor));
  });
});
