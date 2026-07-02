// tests/business-intel.mjs — låser affärshjärnan i avslöjandet.
// Fixturerna SPEGLAR VERKLIGHETEN ur sond v3 (ops/probe-business-intel.txt 2026-07-01):
// sökets companies[]-form, bolagssidans company-form, Netigate-tvetydigheten, kan.se-fallet.
// Integritetskärnan: fel bolags omsättning får ALDRIG visas — grinden är exakt-match, exakt EN.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sldFromDomain, normalizeCompanyName, matchCompany, normalizeOrgnr,
  extractNextData, extractSearchCompanies, extractCompanyFacts,
  buildBusinessFindings, mergeRevealFindings,
} from '../lib/business-intel.js';

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

describe('business-intel · orgnr-vägen (utåtriktade flödet — exakt nyckel, ingen grind)', () => {
  test('normalisering: bindestreck bort, exakt 10 siffror krävs', () => {
    assert.equal(normalizeOrgnr('556569-0087'), '5565690087');
    assert.equal(normalizeOrgnr('5565690087'), '5565690087');
    assert.equal(normalizeOrgnr('556569-008'), null);     // 9 siffror → aldrig en gissning
    assert.equal(normalizeOrgnr('55 65 69-0087'), '5565690087');
    assert.equal(normalizeOrgnr(''), null);
    assert.equal(normalizeOrgnr(null), null);
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

  test('bokslutsfyndet: mkr-format, år, källa Bolagsverket — ALDRIG profit i copy', () => {
    const f = buildBusinessFindings(facts);
    const biz = f.find((x) => x.kind === 'business');
    assert.ok(biz);
    assert.match(biz.title, /52,9 mkr/);
    assert.match(biz.title, /30 anställda/);
    assert.match(biz.title, /2025/);
    assert.match(biz.source, /Bolagsverket/);
    assert.ok(!/profit|resultat/i.test(biz.title + biz.detail), 'profit-fältet får aldrig nå copy (oklar etikett)');
  });

  test('koncern-lärdomen: fyndet NAMNGER den juridiska enheten (detail + källa)', () => {
    const f = buildBusinessFindings(facts);
    const biz = f.find((x) => x.kind === 'business');
    assert.match(biz.detail, /Gäller Apendo AB/);          // exakt vilken enhet siffrorna gäller
    assert.match(biz.source, /Apendo AB/);
  });
  test('GRUNDARBESLUT 2026-07-01: costline är BORTTAGEN — avslöjandet bär ALDRIG en räknad rad', () => {
    // Tre iterationer (p25-felmärkning → antagen plan → 3,7×-spann + Microsoft-priser åt
    // Google-bolag) hade samma rot: raden var RÄKNAD, inte UPPTÄCKT. Dörren visar bara fakta;
    // licensmatematiken bor i analysen där planen är känd (tests/saas-tier-detection.mjs).
    const f = buildBusinessFindings(facts);
    assert.equal(f.length, 1);
    assert.equal(f[0].kind, 'business');
    assert.equal(f.find((x) => x.kind === 'costline'), undefined);
    const allText = f.map((x) => `${x.title} ${x.detail} ${x.source}`).join(' ');
    assert.ok(!/kr\/år|listpris|golvpris|licenser/i.test(allText), 'kostnadsräknat språk får inte nå avslöjandet');
  });
  test('utan fakta → tomt', () => {
    assert.deepEqual(buildBusinessFindings(null), []);
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
