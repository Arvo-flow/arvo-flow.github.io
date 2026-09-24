// tests/ytinventering.mjs — YTINVENTERINGEN (YI). Bakgrund i lib/kundytor.js.
//
// FÅNGAR: en fil som börjar skicka mejl utan att vara klassad; en routad sida utan klass; en klass
//   som ljuger om sin import; en «ingen_prisdom»-yta som börjar tala om pris eller besparing; ett
//   internt mejl som får en extern mottagare; att skulden (oreviderade ytor) växer i tysthet.
// BLIND: klassningen är en bedömning. Maskinen ser att den finns och att importen stämmer — aldrig
//   att varje mening i ytan kommer ur registret. Upptäckten ser bara `emails.send(` och
//   `<Route path=`: en yta som skickar mejl på ett annat sätt syns inte.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { MEJLYTOR, SIDYTOR, KLASSER, REGISTERKALLOR, ENDPOINTYTOR, ENDPOINTKLASSER } from '../lib/kundytor.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const KOMMENTAR = /^\s*(\/\/|\*|\/\*|\{\/\*)/;   // även JSX-kommentarer — annars fäller vakten sin egen undantagsrad
const utanKommentarer = (s) => s.split('\n').filter((l) => !KOMMENTAR.test(l)).join('\n');

function filerUnder(dir) {
  const ut = [];
  (function ga(d) {
    for (const n of readdirSync(join(ROT, d))) {
      if (n === 'node_modules' || n.startsWith('.')) continue;
      const p = `${d}/${n}`;
      if (statSync(join(ROT, p)).isDirectory()) ga(p);
      else if (/\.(m?js)$/.test(n)) ut.push(p);
    }
  })(dir);
  return ut;
}

/** Upptäckten: varje fil som anropar emails.send( i kod (inte i en kommentar). */
function upptackMejlytor() {
  return ['api', 'lib', 'agents', 'scripts'].flatMap(filerUnder)
    .filter((p) => /emails\.send\(/.test(utanKommentarer(las(p))))
    .sort();
}

/** Upptäckten: varje routad sökväg och den komponentfil den ritar. */
function upptackSidor() {
  const app = las('src/ArvoFlow.js');
  const imp = Object.fromEntries([...app.matchAll(/^import (\w+) from '\.\/pages\/([\w-]+)';/gm)].map((m) => [m[1], `src/pages/${m[2]}/index.js`]));
  return Object.fromEntries([...app.matchAll(/<Route path="([^"]+)" element=\{<(\w+)/g)].map((m) => [m[1], imp[m[2]] ?? null]));
}

// Påståendets FORM, inte ordet: «Sparar…» på en knapp är en databasskrivning, «ni sparar 4 000» är ett påstående.
const ORDFORRAD = /(kr\/år|besparing|ni sparar|sparar? \d|marknadspris|konkurrenskraftig|förhandl|garanter|bättre än|överbetal|premie)/i;
// En import räcker inte (andra blicken 2026-09-24): minst ett importerat namn ur registret måste
// ANVÄNDAS i koden utanför importsatsen. Blind: att namnet används säger inte att varje mening i
// ytan kommer ur registret — det står per yta i `pastar`, och KM-05/KM-11 prövar formerna.
const importerar = (kod, kallor) => kallor.some((k) => {
  const namn = k.split('/').pop().replace(/\.js$/, '');
  const re = new RegExp(`import\\s*\\{([^}]*)\\}\\s*from '[^']*/${namn}(\\.js)?';?`, 'g');
  const utanImport = kod.replace(re, '');
  return [...kod.matchAll(re)].some((m) => m[1].split(',')
    .map((x) => x.trim().split(/\s+as\s+/).pop())
    .filter(Boolean)
    .some((b) => new RegExp(`\\b${b}\\b`).test(utanImport)));
});

describe('YI · ytinventeringen', () => {
  const mejl = upptackMejlytor();
  const sidor = upptackSidor();

  test('YI-01 · varje mejlavsändare är klassad — och varje klassad avsändare finns', () => {
    assert.ok(mejl.length >= 15, `upptäckten hittade bara ${mejl.length} avsändare — den mäter inte kodbasen`);
    assert.deepEqual(mejl.filter((p) => !(p in MEJLYTOR)), [], 'oklassad mejlavsändare — lägg den i lib/kundytor.js');
    assert.deepEqual(Object.keys(MEJLYTOR).filter((p) => !mejl.includes(p)), [], 'klassad avsändare som inte längre skickar mejl — ta bort den');
  });

  test('YI-02 · varje routad sida är klassad — och varje klassad sida är routad', () => {
    assert.ok(Object.keys(sidor).length >= 10, 'upptäckten hittade för få routes');
    assert.deepEqual(Object.keys(sidor).filter((p) => !(p in SIDYTOR)), [], 'oklassad sida');
    assert.deepEqual(Object.keys(SIDYTOR).filter((p) => !(p in sidor)), [], 'klassad sida som inte är routad');
  });

  test('YI-03 · varje yta har en giltig klass och sitt skäl skrivet', () => {
    for (const [namn, y] of [...Object.entries(MEJLYTOR), ...Object.entries(SIDYTOR)]) {
      assert.ok(KLASSER.includes(y.klass), `${namn}: okänd klass ${y.klass}`);
      if (y.klass === 'oreviderad' || y.klass === 'registret') assert.ok(String(y.pastar ?? '').length >= 30, `${namn}: säg vad ytan påstår`);
      else assert.ok(String(y.skal ?? '').length >= 8, `${namn}: skälet saknas`);
    }
  });

  test('YI-04 · en yta i klassen registret importerar registret', () => {
    for (const [p, y] of Object.entries(MEJLYTOR)) if (y.klass === 'registret') assert.ok(importerar(las(p), REGISTERKALLOR), `${p} påstås läsa registret men importerar det inte`);
    for (const [route, y] of Object.entries(SIDYTOR)) {
      if (y.klass !== 'registret') continue;
      assert.ok(sidor[route], `${route}: ingen komponentfil`);
      assert.ok(importerar(las(sidor[route]), REGISTERKALLOR), `${route} påstås läsa registret men ${sidor[route]} importerar det inte`);
    }
  });

  test('YI-08 · importkravet: ett registernamn som importeras men aldrig används räknas inte (motprov: använt)', () => {
    const K = ['lib/kundmeningar.js'];
    assert.equal(importerar("import { LOFTEN } from '../lib/kundmeningar.js';\nconst x = 1;", K), false);
    assert.equal(importerar("import { LOFTEN } from '../lib/kundmeningar.js';\nconst x = LOFTEN.a;", K), true);
    assert.equal(importerar("import { kundensMotivering as km } from '../lib/kundmeningar.js';\nkm(t);", K), true);
  });

  test('YI-05 · en «ingen_prisdom»-yta säger inget om pris eller besparing', () => {
    const filer = [
      ...Object.entries(MEJLYTOR).filter(([, y]) => y.klass === 'ingen_prisdom').map(([p]) => p),
      ...Object.entries(SIDYTOR).filter(([r, y]) => y.klass === 'ingen_prisdom' && sidor[r]).map(([r]) => sidor[r]),
    ];
    assert.ok(filer.length >= 3, 'backstoppen prövar för få filer — den är grön av tomhet');
    for (const p of filer) {
      // Undantag motiveras på raden ovanför: `kundmening-ok: <skäl>` (samma mönster som claims-ok).
      const rader = las(p).split('\n');
      const traff = rader.find((l, i) => !KOMMENTAR.test(l) && ORDFORRAD.test(l)
        && !/kundmening-ok:\s*\S.{7,}/.test(rader[i - 1] ?? ''));
      assert.equal(traff, undefined, `${p} säger något om pris/besparing: «${traff?.trim().slice(0, 100)}» — klassa om ytan`);
    }
  });

  test('YI-06 · ett internt mejl går bara till oss', () => {
    for (const [p, y] of Object.entries(MEJLYTOR)) {
      if (y.klass !== 'intern') continue;
      const mottagare = [...utanKommentarer(las(p)).matchAll(/\bto:\s*([^,\n}]+)/g)].map((m) => m[1].trim());
      assert.ok(mottagare.length > 0, `${p}: hittade ingen mottagare — vakten ser inget`);
      for (const m of mottagare) assert.match(m, /^(ALERT_TO|INTERNAL\w*|NOTIFY\w*|TO|FOUNDER\w*|process\.env\.\w+)/, `${p} skickar till ${m}`);
    }
  });

  test('YI-09 · varje endpoint är klassad — och varje klassad endpoint finns', () => {
    const ep = filerUnder('api').filter((p) => p.endsWith('.mjs')).sort();
    assert.ok(ep.length >= 40, `upptäckten hittade bara ${ep.length} endpoints`);
    assert.deepEqual(ep.filter((p) => !(p in ENDPOINTYTOR)), [], 'oklassad endpoint — lägg den i ENDPOINTYTOR');
    assert.deepEqual(Object.keys(ENDPOINTYTOR).filter((p) => !ep.includes(p)), [], 'klassad endpoint som inte finns');
    for (const [p, y] of Object.entries(ENDPOINTYTOR)) {
      assert.ok(ENDPOINTKLASSER.includes(y.klass), `${p}: okänd klass ${y.klass}`);
      if (y.klass === 'oreviderad' || y.klass === 'registret') assert.ok(String(y.pastar ?? '').length >= 30, `${p}: säg vad svaret påstår`);
      else assert.ok(String(y.skal ?? '').length >= 8, `${p}: skälet saknas`);
      if (y.klass === 'mejlyta') assert.ok(p in MEJLYTOR, `${p}: mejlyta men inte klassad i MEJLYTOR`);
    }
  });

  test('YI-10 · en grind som påstås finns i koden — och en intern endpoint har en (motprov: grind i kommentar räknas inte)', () => {
    const harGrind = (kod, g) => utanKommentarer(kod).includes(g);
    for (const [p, y] of Object.entries(ENDPOINTYTOR)) {
      if (y.klass === 'intern') assert.ok(y.grind, `${p}: intern utan grind — då är den inte intern`);
      if (y.grind) assert.ok(harGrind(las(p), y.grind), `${p}: grinden ${y.grind} står inte i koden`);
    }
    assert.equal(harGrind('// ADMIN_TOKEN\nconst x = 1;', 'ADMIN_TOKEN'), false, 'motprov: en grind i en kommentar är ingen grind');
    assert.equal(harGrind('if (t !== process.env.ADMIN_TOKEN) return;', 'ADMIN_TOKEN'), true);
  });

  test('YI-11 · endpointens svar: registret importerar registret, ingen_prisdom säger inget om pris', () => {
    const ingen = [];
    for (const [p, y] of Object.entries(ENDPOINTYTOR)) {
      if (y.klass === 'registret') assert.ok(importerar(las(p), REGISTERKALLOR), `${p} påstås läsa registret men använder det inte`);
      if (y.klass === 'ingen_prisdom') ingen.push(p);
    }
    assert.ok(ingen.length >= 15, 'backstoppen prövar för få endpoints');
    for (const p of ingen) {
      const rader = las(p).split('\n');
      const traff = rader.find((l, i) => !KOMMENTAR.test(l) && ORDFORRAD.test(l) && !/kundmening-ok:\s*\S.{7,}/.test(rader[i - 1] ?? ''));
      assert.equal(traff, undefined, `${p} säger något om pris/besparing: «${traff?.trim().slice(0, 100)}»`);
    }
  });

  test('YI-07 · skulden är ett exakt tal — den kan bara krympa med en ändring här', () => {
    const skuld = [...Object.entries(MEJLYTOR), ...Object.entries(SIDYTOR), ...Object.entries(ENDPOINTYTOR)].filter(([, y]) => y.klass === 'oreviderad').map(([n]) => n);
    assert.equal(skuld.length, SKULD, `oreviderade ytor: ${skuld.length} (${skuld.join(', ')})`);
  });
});

// Mätt 2026-09-23 i ytinventeringen (2: prospektmejlet och /prospect). 2026-09-24: endpoints
// inventerade, två till är oreviderade — api/prospect (samma estimat) och api/reveal (dörrens fynd).
// Talet ändras bara i samma commit som en yta flyttas.
// 2026-09-24: 4 → 0. Prospektytorna byggdes om kring listprisankaret och dörrens fynd granskas vid
// servern (registergranskningen, andra passet).
const SKULD = 0;
