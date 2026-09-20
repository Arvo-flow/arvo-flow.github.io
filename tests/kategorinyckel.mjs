// tests/kategorinyckel.mjs — EN KANONISK KATEGORINYCKEL PER PRODUKT, TESTLÅST.
//
// Bakgrund i `lib/kategorinyckel.js`. Kort: `vaxel` och `molnvaxel` var två nycklar för samma
// produkt, och nio platser i kategori-namnrymden var nycklade på den DÖDA — så den LEVANDE var
// osynlig för fingeravtrycket, för validatorns systemprompt, för kundetiketten och för
// seatCount-vakten.
//
// Sviten har två halvor med OLIKA blindfläckar, och det är hela poängen:
//   · KN-01..06 prövar BETEENDE (funktioner körda med riktiga indata).
//   · KN-07..09 SVEPER KÄLLTRÄDET efter en återinförd legacy-nyckel. De läser TEXT och kan därför
//     aldrig se en nyckel som byggs dynamiskt — men de hittar den tionde platsen någon lägger
//     till, vilket beteendetesterna inte kan.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { arLegacyKategori, LEGACY_KATEGORINYCKLAR } from '../lib/kategorinyckel.js';
import { checkSupplierFingerprint } from '../lib/supplier-fingerprints.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { CATEGORIES } from '../agents/categorizer/categories.js';
import { isAudited } from '../lib/revision-gate.js';
import { catLabel, CATEGORY_LABELS } from '../lib/format.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('KATEGORINYCKELN · en sanning per produkt', () => {
  test('KN-01 · varje legacy-nyckel pekar på en kategori som FAKTISKT finns och talar', () => {
    // En alias som pekar på en kategori som inte finns vore värre än ingen alias: den skulle
    // normalisera kundens historik till ingenting.
    for (const [legacy, kanonisk] of Object.entries(LEGACY_KATEGORINYCKLAR)) {
      assert.ok(CATEGORIES[kanonisk],
        `${legacy} → ${kanonisk}, men ${kanonisk} finns inte i CATEGORIES`);
      assert.ok(BRANCHINDEX[kanonisk],
        `${legacy} → ${kanonisk}, men ${kanonisk} saknas i prisboken`);
      assert.equal(CATEGORIES[legacy], undefined,
        `${legacy} är BÅDE alias och egen kategori — då är den inte sammanslagen`);
      assert.equal(BRANCHINDEX[legacy], undefined,
        `${legacy} ligger kvar i prisboken — två poster för en produkt är dubbel sanning`);
    }
  });

  test('KN-02 · kartan pekar aliaset på den kanoniska nyckeln, och bara den', () => {
    // `kanoniskKategori` RADERAD 2026-09-20: mätt till noll anropare, och produktions-DB bär
    // noll rader med aliaset (GH Actions 35536143690). Kvar står kartan, som är det svepet läser.
    assert.equal(LEGACY_KATEGORINYCKLAR.vaxel, 'molnvaxel');
    assert.equal(Object.keys(LEGACY_KATEGORINYCKLAR).length, 1,
      'växer kartan ska varje ny post ha sin egen mätning — inte ärva den här');
  });

  test('KN-03 · arLegacyKategori svarar bara ja på en avvecklad stavning', () => {
    assert.equal(arLegacyKategori('vaxel'), true);
    assert.equal(arLegacyKategori(' vaxel '), true, 'blanksteg ska inte gömma ett alias');
    for (const v of ['molnvaxel', 'mobil', null, undefined, '', 'toString', 'constructor'])
      assert.equal(arLegacyKategori(v), false, `${JSON.stringify(v)} är ingen legacy-nyckel`);
  });

  test('KN-04 · varje teleoperatör som kan fakturera molnväxel accepterar kategorin', () => {
    // DET MÄTTA FELET: kategoriseraren kan bara ge `molnvaxel`, men fingeravtrycken var skrivna
    // mot `vaxel` (Telia) eller nämnde växel inte alls (telenor/tele2/tre). Varje korrekt
    // kategoriserad molnväxelfaktura föll därmed till `fingerprint_mismatch` → review_queue,
    // och kunden fick «en människa tar vid» i stället för det prissatta svaret.
    // Fixturerna finns: telenor-molnvaxel-stor.pdf, tre-mobil-molnvaxel.pdf.
    for (const [norm, raw] of [
      ['telia', 'Telia Sverige AB'], ['telenor', 'Telenor Sverige AB'],
      ['tele2', 'Tele2 Sverige AB'], ['tre', 'Tre AB'],
    ]) {
      const fp = checkSupplierFingerprint(norm, raw, 'molnvaxel');
      assert.equal(fp.matched, true, `${norm} ska matcha ett fingeravtryck`);
      assert.equal(fp.categoryOk, true,
        `${norm} + molnvaxel ger mismatch → kunden får tystnad i stället för sitt pris`);
    }
    // MOTPROVET: grinden måste fortfarande kunna säga NEJ, annars har jag bara öppnat den.
    const fel = checkSupplierFingerprint('telia', 'Telia Sverige AB', 'saas-creative');
    assert.equal(fel.categoryOk, false, 'en grind som släpper allt är ingen grind');
  });

  test('KN-05 · den kanoniska nyckeln har en kundsynlig etikett — aldrig den råa nyckeln', () => {
    // `catLabel('molnvaxel')` gav «molnvaxel» innan sammanslagningen: snake_case rakt ut till
    // kunden, medan den döda `vaxel` hade en fin etikett. Ett fält vars namn lovar mer än värdet.
    for (const kanonisk of Object.values(LEGACY_KATEGORINYCKLAR)) {
      assert.notEqual(catLabel(kanonisk), kanonisk,
        `${kanonisk} saknar etikett i lib/format.js och skulle visas rått för kunden`);
      assert.ok(CATEGORY_LABELS[kanonisk], `${kanonisk} saknas i CATEGORY_LABELS`);
    }
    for (const legacy of Object.keys(LEGACY_KATEGORINYCKLAR)) {
      assert.equal(CATEGORY_LABELS[legacy], undefined,
        `${legacy} har kvar en egen etikett — två etiketter för en produkt`);
    }
  });

  test('KN-06 · sammanslagningen gick mot den nyckel som TALAR, inte mot den tysta', () => {
    // Hade vi slagit ihop åt andra hållet vore resultatet en kategori utan verifierat golv, utan
    // egen svit och utan röst — en tystnad vi själva skapat. Prövas, inte påstås.
    for (const kanonisk of Object.values(LEGACY_KATEGORINYCKLAR)) {
      assert.equal(isAudited(kanonisk), true,
        `${kanonisk} är kanonisk men tyst — då slog vi ihop åt fel håll`);
      assert.equal(BRANCHINDEX[kanonisk].source, 'real-public',
        `${kanonisk} ska bära ett verifierat publikt golv`);
    }
  });
});

// ── KN-07..09 · KÄLLSVEPET ──────────────────────────────────────────────────────────────────
describe('KATEGORINYCKELN · svepet som hittar den tionde platsen', () => {
  // Den enda legitima förekomsten av strängen är RADKLASSEN i telekom-normalize (en annan
  // namnrymd: radtyp i en faktura, inte fakturakategori) och modulerna som handlar OM
  // sammanslagningen. Undantag motiveras här, i samma mönster som `// kopia-ok:`.
  const UNDANTAG = new Map([
    ['lib/telekom-normalize.js', 'RADKLASS, inte kategori: classifyTelekomLine ger '
      + "'hardware'|'vaxel'|'mobil'|'other'. Samma modul returnerar category: 'molnvaxel'."],
    ['lib/kategorinyckel.js',    'aliaskartan själv — den MÅSTE nämna nyckeln'],
    ['tests/kategorinyckel.mjs', 'den här vakten'],
    ['tests/telekom-normalize.mjs', 'prövar radklassen'],
    ['tests/tystnadsskal.mjs',   'TS-06 vaktar att dubbletten inte återinförs'],
    ['tests/branch-anchors.mjs', 'motprov: `vaxel` ska vara borta ur prisboken'],
    ['lib/tystnadsskal.js',      'bokför beslutet i klartext'],
    ['scripts/probe-kategorinyckel.mjs', 'sonden som MÄTTE sammanslagningen'],
  ]);

  const filer = [];
  (function gå(katalog) {
    for (const namn of readdirSync(katalog)) {
      if (['node_modules', 'build', '.git', 'results', 'test-pdfs'].includes(namn)) continue;
      const p = join(katalog, namn);
      if (statSync(p).isDirectory()) gå(p);
      else if (/\.(js|mjs)$/.test(namn)) filer.push(p);
    }
  })(ROOT);

  test('KN-07 · svepet når faktiskt källträdet (ingen grönt-av-tomhet)', () => {
    // En vakt som matchar noll filer blir grön av tomhet. Talet mäts, det antas inte.
    assert.ok(filer.length > 250,
      `svepet hittade bara ${filer.length} filer — utsnittet är fel och vakten prövar inget`);
    for (const u of UNDANTAG.keys()) {
      assert.ok(filer.some((f) => relative(ROOT, f) === u),
        `undantaget ${u} pekar på en fil som inte finns — en död motivering döljer ett hål`);
    }
  });

  test('KN-08 · ingen legacy-nyckel förekommer utanför de motiverade undantagen', () => {
    const legacy = Object.keys(LEGACY_KATEGORINYCKLAR);
    // Ordgräns åt båda håll, så `molnvaxel` och `telia-vaxel.mjs` aldrig träffas.
    const monster = new RegExp(`(?<![\\w-])(${legacy.join('|')})(?![\\w-])`);
    const brott = [];
    for (const f of filer) {
      const rel = relative(ROOT, f);
      if (UNDANTAG.has(rel)) continue;
      const rader = readFileSync(f, 'utf8').split('\n');
      rader.forEach((rad, i) => {
        if (/^\s*(\/\/|\*)/.test(rad)) return;      // kommentarer får nämna historien
        if (monster.test(rad)) brott.push(`${rel}:${i + 1}  ${rad.trim().slice(0, 80)}`);
      });
    }
    assert.deepEqual(brott, [],
      'en avvecklad kategorinyckel har återinförts. Använd den kanoniska, eller motivera platsen '
      + 'i UNDANTAG ovan om det är en ANNAN namnrymd:\n  ' + brott.join('\n  '));
  });

  test('KN-09 · undantaget för radklassen är sant — modulen ger `molnvaxel` som KATEGORI', async () => {
    // Undantaget vilar på ett påstående: att `'vaxel'` där är en radtyp, inte en kategori. Ett
    // undantag som ingen prövar är en bakdörr, så påståendet körs.
    const { classifyTelekomLine, buildTelekomDatapoint } = await import('../lib/telekom-normalize.js');
    assert.equal(classifyTelekomLine('Telia Touchpoint Plus (Huvudlicens)'), 'vaxel',
      'radklassen ska fortfarande heta vaxel — den är inte det vi slog ihop');
    assert.equal(classifyTelekomLine('Jobbmobil Bas'), 'mobil');
    const dp = buildTelekomDatapoint({
      normalized: { supplier: 'Telia', canonicalTier: 'T1', perUserMonthlyExVat: 89, seats: 10 },
      industry: 'byraer', employees: 10,
    });
    assert.equal(dp.category, 'molnvaxel',
      'datapunktens KATEGORI måste vara den kanoniska — annars förorenar radklassen moaten');
  });
});
