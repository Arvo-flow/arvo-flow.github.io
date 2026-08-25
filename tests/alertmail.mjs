// tests/alertmail.mjs — AM-01..04: larmmailet måste kunna renderas PRECIS när den kollektiva
// sanningen bär, och ett trasigt mail får aldrig riva hela larmkörningen.
//
// VARFÖR (2026-08-24, ur obduktionens spaning på price-alert).
//
// `buildAlertEmail` läste variabeln `category` ur ingenting. Den är block-scopad i handlerns
// for-of (`for (const [, { keyword, category, items }] of alertGroups)`); en funktionsdeklaration
// på modulnivå ser den aldrig. Så länge `segStats.total < 3` är moat-meningen tom sträng och raden
// utvärderas inte — men i samma sekund som den kollektiva sanningen bär kastar den ReferenceError.
//
// Mätt genom den riktiga källtexten:
//   total = 2   → OK, 3 567 tecken
//   total = 14  → ReferenceError: category is not defined
//
// **Ju mer nätverksdata vi samlar, desto säkrare kraschar larmet.** Samma form som ankaret
// 15 augusti («ju mer data, desto oftare tystnade moaten»), men värre: utfallet är inte tystnad
// utan totalt bortfall. Anropet låg dessutom UTANFÖR try-blocket, så hela körningen revs — ingen
// kund i NÅGON grupp fick mail, och `markAlertSent` skrevs aldrig.
//
// VARFÖR TESTET EXTRAHERAR UR KÄLLTEXTEN: båda alertvägarna är skript med toppnivåkod som kör vid
// import, så funktionen går inte att importera. Testet läser därför den RIKTIGA filen och kör den
// RIKTIGA funktionen — samma disciplin som RO-01: pröva artefakten produktionen kör, aldrig en
// kopia av den. Extraktionen fäller högljutt om den inte hittar funktionen, så testet aldrig kan
// bli grönt av att ha läst ingenting.
//
// FÅNGAR: att moat-meningens gren kastar, och att renderingen flyttas ut ur try igen.
// BLIND: testet renderar mailet, det läser inte svenskan i det. Och det prövar båda filerna var
//   för sig — att de SÄGER samma sak till kunden är inget maskinen kan avgöra så länge de är två
//   handskrivna mallar (känd skuld: «dubbla alertvägar», bibeln).

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Plockar ut en toppnivåfunktion ur en skriptfil och gör den körbar i ett eget modulskal. */
async function laddaFunktion(relativFil, namn, forspel = '') {
  const rader = readFileSync(join(ROT, relativFil), 'utf8').split('\n');
  const i = rader.findIndex((r) => r.startsWith(`function ${namn}(`));
  assert.notEqual(i, -1, `${relativFil}: hittade ingen toppnivåfunktion ${namn} — extraktionen är trasig, `
    + 'och ett test som inte hittar sitt mål får aldrig bli grönt');
  const j = rader.findIndex((r, n) => n > i && r === '}');
  assert.notEqual(j, -1, `${relativFil}: hittade inget slut på ${namn}`);

  const kat = mkdtempSync(join(tmpdir(), 'alertmail-'));
  const fil = join(kat, 'f.mjs');
  writeFileSync(fil, `${forspel}\n${rader.slice(i, j + 1).join('\n')}\nexport { ${namn} };\n`);
  const mod = await import(`file://${fil}`);
  rmSync(kat, { recursive: true, force: true });
  return mod[namn];
}

// Funktionen lutar sig mot filens egna toppnivåhjälpare. De laddas ur SAMMA fil, inte
// återskrivna här — en handskriven kopia av `fmt` hade kunnat glida isär från den riktiga och
// göra testet grönt på fel grund.
const FORSPEL = (fil) => `import { catLabel, fmtNumber, swMonthYear } from '${join(ROT, 'lib', 'format.js')}';\n`
  + "const BASE_URL = process.env.ARVO_BASE_URL || 'https://arvoflow.se';\n"
  + hamtaHjalpare(fil, ['fmt']);

/** Plockar namngivna toppnivåhjälpare ur samma fil, ordagrant. */
function hamtaHjalpare(relativFil, namn) {
  const rader = readFileSync(join(ROT, relativFil), 'utf8').split('\n');
  let ut = '';
  for (const n of namn) {
    const i = rader.findIndex((r) => r.startsWith(`function ${n}(`));
    if (i === -1) continue;
    const enrad = rader[i].trimEnd().endsWith('}');
    const j = enrad ? i : rader.findIndex((r, k) => k > i && r === '}');
    ut += rader.slice(i, j + 1).join('\n') + '\n';
  }
  return ut;
}

const BAS = {
  customer: { email: 'test@example.com', name: 'Testbolaget AB' },
  supplierName: 'Telia',
  groupAlerts: [{ product: 'Mobil Bas', oldPrice: 299, newPrice: 349, category: 'mobil' }],
  impact: { impactKrYear: 6000, krPerYear: 6000 },
  briefingUrl: 'https://arvoflow.se/briefing/x',
  date: '2026-08-24',
  category: 'mobil',
};

const VAGAR = [
  ['scripts/notify-price-changes.mjs', 'den LIVE-routade vägen (price-monitor.yml kör denna)'],
  ['api/cron/run-price-alerts.mjs', 'Vercel-cronvägen'],
];

describe('AM · Larmmailet — moat-meningen får inte spränga körningen', () => {
  for (const [fil, beskrivning] of VAGAR) {
    test(`AM-01 · ${fil}: renderar NÄR kollektiva sanningen bär (${beskrivning})`, async () => {
      const bygg = await laddaFunktion(fil, 'buildAlertEmail', FORSPEL(fil));
      // total >= 3 är tröskeln där segLine faktiskt utvärderas. Det var grenen som kastade.
      const html = bygg({ ...BAS, segStats: { total: 14, withSupplier: 8 } });
      assert.equal(typeof html, 'string');
      assert.match(html, /8 av 14 bolag vi följer/,
        'moat-meningen ska stå i mailet — det är den enda mening ingen konkurrent kan skriva');
    });

    test(`AM-02 · ${fil}: renderar också UNDER tröskeln (grenen tystnar, kraschar inte)`, async () => {
      const bygg = await laddaFunktion(fil, 'buildAlertEmail', FORSPEL(fil));
      const html = bygg({ ...BAS, segStats: { total: 2, withSupplier: 1 } });
      assert.equal(typeof html, 'string');
      assert.equal(/bolag vi följer/.test(html), false,
        'under tröskeln påstår vi ingen kohort — tystnad, inte ett tal utan täckning');
    });

    test(`AM-03 · ${fil}: renderingen ligger INNANFÖR try`, () => {
      // Ett fel i ETT mail får aldrig riva larmkörningen för varje annan kund i varje annan grupp.
      // Precis det hände: anropet låg utanför try, så ReferenceError tog hela körningen med sig.
      const kalla = readFileSync(join(ROT, fil), 'utf8');
      const anrop = kalla.indexOf('buildAlertEmail({');
      assert.notEqual(anrop, -1, 'hittade inget anrop — testet får inte bli grönt av tomhet');
      const fore = kalla.slice(0, anrop);
      const senasteTry = fore.lastIndexOf('try {');
      const senasteCatch = fore.lastIndexOf('} catch');
      assert.ok(senasteTry > senasteCatch,
        'anropet till buildAlertEmail ligger utanför try — en renderingsmiss river hela körningen');
    });
  }

  test('AM-04 · category är en PARAMETER i båda vägarna, aldrig en fri variabel', async () => {
    for (const [fil] of VAGAR) {
      const kalla = readFileSync(join(ROT, fil), 'utf8');
      const rad = kalla.split('\n').find((r) => r.startsWith('function buildAlertEmail('));
      assert.ok(rad?.includes('category'),
        `${fil}: buildAlertEmail läser category utan att ta emot den — den är block-scopad i `
        + 'handlerns for-of och syns aldrig här');
    }
  });
});
