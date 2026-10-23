// tests/kallfabriken.mjs — KF-01..08: fabrikssvepet 2026-10-16, fyra röda vakter lagade.
//
// VARFÖR. «Verify price sources (factory)» föll varje vecka på fyra jobb. Loggarna lästa och
// klassade samma dag:
//   · google-workspace — OLÄSBAR: sidan renderas på klienten och visar «$4.90$7** / user per month».
//   · telia-vaxel      — OLÄSBAR: sidan visar kampanjpriset 49 kr; listpriset 89 står i prislistan.
//   · eurostat-el      — DRIFT, loggad som «källa oåtkomlig»: Eurostat publicerade 2026-S1.
//   · villkorsbok      — OLÄSBAR, loggad som «DRIFT»: Telia flyttade dokumentet (samma bytes).
// Syskonfallet i samma fabrik: tele2-bredband skrev «(ej funnet)» även när ingen adress gav en
// enda produkt, alltså DRIFT på ett okänt (KF-08). Två av fyra var alltså också FELKLASS. «Kunde inte läsa» och «har ändrats» kräver motsatta
// åtgärder, och en vakt tolkas efter sin logg (bibeln 2026-08-22).
//
// Fixturerna i tests/fixtures/kallfabriken/ är ordagranna utdrag ur dagens källor: Googles
// renderade sidtext med årsväxeln på och av, och textlagret ur Telias prislista (pdfjs, ingen
// modell). De är skrivna av ett skript ur källtexten, aldrig för hand.
//
// FÅNGAR: att ett kampanjpris åter blir listpris, att ett månadspris jämförs mot årsavtalets bok,
//   att en ny Eurostat-period åter blir «oåtkomlig», och att ett oåtkomligt villkorsdokument åter
//   blir «drift».
// BLIND: att källorna ser ut så här i morgon. Testerna låser parsern mot dagens form; det är
//   vakten i fabriken som ser nästa formbyte, och den blir då röd som OLÄSBAR.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { bedomVerifierarutfall, UTFALL } from '../lib/verifierarutfall.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';
import { bedomVillkorspost, VILLKOR_UTFALL } from '../lib/villkorsvakt.js';
import { villkorsCheck } from '../lib/verifiers/villkorsbok.mjs';
import { eurostatChecks } from '../lib/verifiers/eurostat-el.mjs';
import { googleListpriser, googleChecks } from '../lib/verifiers/google-workspace.mjs';
import { teliaPrislista, teliaChecks } from '../lib/verifiers/telia-vaxel.mjs';
import { ankarCheck } from '../lib/verifiers/tele2-bredband.mjs';

const fixtur = (namn) => readFileSync(new URL(`./fixtures/kallfabriken/${namn}`, import.meta.url), 'utf8');
const GOOGLE_AR = fixtur('google-arsavtal-2026-10-16.txt');
const GOOGLE_MAN = fixtur('google-manadsavtal-2026-10-16.txt');
const TELIA_PRISLISTA = fixtur('telia-smart-connect-prislista-2026-10-16.txt');
// Växelsidan som den lästes 18 okt (körning 39155569488). T2:s pris står på kortet med «lokalt nummer»
// och läses bara där (V85-T1); en påhittad sidtext utan kortets ord prövade en form sidan inte har.
const TELIA_SIDA = readFileSync(new URL('./fixtures/narvaro/telia-vaxelsida-2026-10-18.txt', import.meta.url), 'utf8');

describe('KF · Källfabriken — fyra vakter lagade, och deras etiketter', () => {
  test('KF-01 · villkorsboken: ett oåtkomligt dokument är OLÄSBAR, en borttagen länk är DRIFT', () => {
    const post = VILLKORSBOK.telia;
    const idag = new Date('2026-10-16T12:00:00Z');

    const oatkomlig = { nyckel: 'telia', ...bedomVillkorspost(post, { hamtadOk: false, hash: null, fel: 'HTTP 404' }, idag) };
    assert.equal(oatkomlig.utfall, VILLKOR_UTFALL.OATKOMLIG);
    const c1 = villkorsCheck(oatkomlig);
    assert.equal(c1.actual, '(saknas)');
    const d1 = bedomVerifierarutfall({ checks: [c1] });
    assert.equal(d1.utfall, UTFALL.ROTT);
    assert.equal(d1.drift, 0, `ett 404 får inte räknas som drift: ${d1.skal}`);
    assert.equal(d1.olasbara, 1);

    const sidaOlasbar = { nyckel: 'telia', ...bedomVillkorspost(post,
      { hamtadOk: true, hash: post.dokumentSha256, sida: { hamtadOk: false, lankar: null, fel: 'timeout' } }, idag) };
    assert.equal(sidaOlasbar.utfall, VILLKOR_UTFALL.SIDA_OATKOMLIG);
    assert.equal(villkorsCheck(sidaOlasbar).actual, '(saknas)');

    // Motprovet: när leverantören slutat länka vårt dokument HAR något ändrats — det är drift.
    const borta = { nyckel: 'telia', ...bedomVillkorspost(post,
      { hamtadOk: true, hash: post.dokumentSha256, sida: { hamtadOk: true, lankar: ['https://www.telia.se/asset/x/ny-version.pdf'] } }, idag) };
    assert.equal(borta.utfall, VILLKOR_UTFALL.KALLA_BORTA);
    const d2 = bedomVerifierarutfall({ checks: [villkorsCheck(borta)] });
    assert.equal(d2.drift, 1);
    assert.equal(d2.olasbara, 0);

    // Och den förseglade posten med dagens bytes och länk är grön (flytten 2026-10-16).
    const hel = { nyckel: 'telia', ...bedomVillkorspost(post,
      { hamtadOk: true, hash: post.dokumentSha256, sida: { hamtadOk: true, lankar: [post.kalla] } }, idag) };
    assert.equal(hel.utfall, VILLKOR_UTFALL.FORSEGLAD);
    assert.equal(bedomVerifierarutfall({ checks: [villkorsCheck(hel)] }).utfall, UTFALL.GRON);
  });

  test('KF-02 · Eurostat: en ny period är DRIFT med källans period, aldrig «källa oåtkomlig»', () => {
    const eb = BRANCHINDEX.el.eurostatBands;
    const banden = (ore) => [
      { code: 'MWH_LT20', orePerKwh: ore[0] }, { code: 'MWH20-499', orePerKwh: ore[1] }, { code: 'MWH500-1999', orePerKwh: ore[2] },
    ];
    const ny = eurostatChecks(eb, { period: '2026-S2', bands: banden([230, 150, 130]) });
    assert.equal(ny.fatal, undefined, 'en källa som svarat är inte oåtkomlig');
    assert.equal(ny.checks.length, 1);
    assert.deepEqual(ny.checks[0], { name: 'Eurostat-period', expected: eb.period, actual: '2026-S2', ok: false });
    const d = bedomVerifierarutfall(ny);
    assert.equal(d.drift, 1);
    assert.doesNotMatch(d.skal, /oåtkomlig/);
    assert.ok(ny.notes.some((n) => /2026-S2 MWH_LT20: 230 öre/.test(n)), 'de nya talen ska stå i loggen för granskaren');

    // Motprovet: samma period och samma tal är grönt, och ett band som flyttat sig en öre är drift.
    const ore = eb.bands.map((b) => Math.round(b.allInKwh * 10000) / 100);
    assert.deepEqual(ore, [225.02, 145.37, 127.03], 'prisboken bär 2026-S1, avläst 2026-10-16');
    assert.equal(bedomVerifierarutfall(eurostatChecks(eb, { period: eb.period, bands: banden(ore) })).utfall, UTFALL.GRON);
    const flyttad = bedomVerifierarutfall(eurostatChecks(eb, { period: eb.period, bands: banden([ore[0], ore[1] + 1, ore[2]]) }));
    assert.equal(flyttad.drift, 1);
  });

  test('KF-03 · Google: listpriset är det högre talet i paret, aldrig introduktionspriset', () => {
    const ar = googleListpriser(GOOGLE_AR);
    assert.deepEqual(ar.priser, { Starter: 7, Standard: 14, Plus: 22 });
    assert.equal(ar.usd, true);
    for (const kampanj of [4.9, 11.2, 17.6]) assert.ok(!Object.values(ar.priser).includes(kampanj));

    // Motprovet: samma sida med årsväxeln avslagen ger månadsavtalets listpriser.
    assert.deepEqual(googleListpriser(GOOGLE_MAN).priser, { Starter: 8.4, Standard: 16.8, Plus: 26.4 });
    // Och utan kampanj är det ensamma talet listpriset.
    assert.equal(googleListpriser('Starter $7 / user per month').priser.Starter, 7);
  });

  test('KF-04 · Google: månadsläge, saknad USD-markör eller två olika listpriser jämförs aldrig mot boken', () => {
    const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const ok = googleChecks(tiers, { text: GOOGLE_AR, arsLage: true });
    assert.equal(bedomVerifierarutfall({ checks: ok }).utfall, UTFALL.GRON);

    // Årsväxeln av: priserna går att läsa, men de är månadsavtalets. Det är OLÄSBAR, inte DRIFT.
    const man = bedomVerifierarutfall({ checks: googleChecks(tiers, { text: GOOGLE_MAN, arsLage: false }) });
    assert.equal(man.drift, 0, man.skal);
    assert.equal(man.olasbara, 4);

    const utanUsd = bedomVerifierarutfall({ checks: googleChecks(tiers, { text: GOOGLE_AR.replace('All prices $USD', 'All prices'), arsLage: true }) });
    assert.equal(utanUsd.drift, 0);
    assert.equal(utanUsd.olasbara, 4);

    const tvetydig = `${GOOGLE_AR} Starter $9.00 / user per month`;
    assert.equal(googleListpriser(tvetydig).priser.Starter, null, 'två olika listpriser för samma plan: vi vet inte vilket som gäller');
  });

  test('KF-05 · Telia: prislistans textlager ger användarpriset och de tre tilläggen, exkl moms', () => {
    assert.deepEqual(teliaPrislista(TELIA_PRISLISTA), {
      exklMoms: true, T1: 89, extraNummer: 39, softphone: 29, funktionsnummer: 99,
    });
    // En startavgift som är ett tal går inte att skilja från månadsavgiften i den sammanslagna texten.
    assert.equal(teliaPrislista('Användare med mobilt nummer 3 199 89 SEK exklusive moms').T1, null);
  });

  test('KF-06 · Telia: kampanjpriset på sidan blir aldrig ankaret, och en prislista utan «exklusive moms» jämförs inte', () => {
    const tv = BRANCHINDEX.molnvaxel.teliaVerified;
    const c = teliaChecks(tv, { sidtext: TELIA_SIDA, prislistetext: TELIA_PRISLISTA });
    assert.equal(bedomVerifierarutfall({ checks: c }).utfall, UTFALL.GRON);
    assert.ok(!c.some((x) => /49/.test(x.actual)), 'kampanjens 49 kr får inte synas som ett läst pris');

    const inkl = teliaChecks(tv, { sidtext: TELIA_SIDA, prislistetext: TELIA_PRISLISTA.replace(/ex\s*k\s*lusive\s*m\s*oms/g, 'inklusive moms') });
    const d = bedomVerifierarutfall({ checks: inkl });
    assert.equal(d.drift, 0, d.skal);
    assert.equal(d.olasbara, 5);
  });

  test('KF-07 · Telia: ett ändrat listpris i prislistan är DRIFT med prislistans tal', () => {
    const tv = BRANCHINDEX.molnvaxel.teliaVerified;
    const hojd = TELIA_PRISLISTA.replace(/(Användare med mobilt nummer\s*3\s*-\s*)8\s*9/, (_, fore) => `${fore}9 9`);
    assert.notEqual(hojd, TELIA_PRISLISTA, 'fixturen måste ha ändrats, annars prövar testet ingenting');
    const c = teliaChecks(tv, { sidtext: TELIA_SIDA, prislistetext: hojd });
    const t1 = c.find((x) => x.name.startsWith('T1'));
    assert.equal(t1.ok, false);
    assert.equal(t1.actual, '99 kr');
    assert.equal(bedomVerifierarutfall({ checks: c }).drift, 1);
  });

  test('KF-08 · Tele2 bredband: ett ankare utan en enda läst produkt är OLÄSBAR, ett saknat ankare bland lästa är DRIFT', () => {
    const tomt = ankarCheck('max', 1000, { bekraftad: false, lastaProdukter: 0 });
    assert.equal(tomt.actual, '(saknas)');
    const d1 = bedomVerifierarutfall({ checks: [tomt] });
    assert.equal(d1.utfall, UTFALL.ROTT);
    assert.equal(d1.drift, 0, `0 lästa produkter får inte räknas som drift: ${d1.skal}`);
    assert.equal(d1.olasbara, 1);

    // Motprovet: vakten läste produkter och ankaret fanns inte bland dem — då har något ändrats.
    const borta = ankarCheck('max', 1000, { bekraftad: false, lastaProdukter: 7 });
    assert.equal(borta.actual, '(ej funnet)');
    assert.equal(bedomVerifierarutfall({ checks: [borta] }).drift, 1);

    const hel = ankarCheck('max', 1000, { bekraftad: true, lastaProdukter: 7 });
    assert.equal(bedomVerifierarutfall({ checks: [hel] }).utfall, UTFALL.GRON);
  });
});
