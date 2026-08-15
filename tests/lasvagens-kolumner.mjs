// tests/lasvagens-kolumner.mjs — EN KOLUMN I EN LÄSVÄG MÅSTE FINNAS I DATABASEN.
//
// BAKGRUNDEN (skarpt rum 2026-08-15): grundaren frågade varför VARJE leverantör visade Arvo Score
// 75. 75 är inte ett räknat tal — det är `supplierDiagScore`:s fallback när `health_score` saknas
// på raden. Talen fanns i databasen (11 rader bar dem). Rummet fick bara inte se dem.
//
// Orsaken var min egen: jag lade `invoice_number` i den primära SELECT-satsen samma kväll.
// Kolumnen självläkte vid SKRIVNING — men ingen ny faktura hade skrivits, så i produktion fanns
// den inte. Satsen kastade. Läsvägen föll till sin reserv. Och reserven hämtar varken
// health_score, lead_finding_json eller triage_reason.
//
// LÄXAN, generaliserad: **en reserv som tyst hämtar färre fält är inte ett skyddsnät, det är en
// tyst kvalitetsnedgradering** — och den ser identisk ut med "kunden har inga bra avtal", vilket
// är den farligaste sortens fel. Ett halvt svar med full auktoritet.
//
// Tre lås, av vilka det första är det som gör klassen omöjlig:
//   1. Varje kolumn i den primära satsen måste skapas av en MIGRERING. Lägger någon till en
//      kolumn i en läsväg utan att skapa den faller sviten här, före deploy.
//   2. Läsvägen LÄKER en saknad kolumn och kör om den fulla satsen — den kringgår den inte.
//   3. Reserven är aldrig tyst. Används den har rummet tappat kvalitet, och det ska stå i loggen.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en kolumn i den primära SELECT-satsen som ingen migrering skapar, en läsväg som
//           faller till reserven utan att först försöka läka, och en tyst reserv.
//   BLIND:  vakten läser KÄLLTEXT. Den vet inte om migreringen faktiskt KÖRTS i en given miljö —
//           bara att den finns och skulle skapa kolumnen. Det är därför lås 2 finns: läkningen är
//           det som räddar en miljö där migreringen släpat efter. Vakten ser heller inte kolumner
//           som läses i ANDRA filer än lib/invoice-store.js.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STORE = readFileSync(join(ROT, 'lib/invoice-store.js'), 'utf8');

// Kolumnerna i den primära läsningen — den längsta SELECT-listan i filen.
function primaraKolumner() {
  const block = STORE.match(/SELECT\s+([\s\S]*?)\s+FROM invoice_analyses/g) ?? [];
  const listor = block.map((b) => b
    .replace(/SELECT\s+/, '').replace(/\s+FROM invoice_analyses/, '')
    .split(',').map((k) => k.trim()).filter(Boolean));
  return listor.sort((a, b) => b.length - a.length)[0] ?? [];
}

// Allt som skapas av CREATE TABLE eller ADD COLUMN i MIGRERINGARNA — och bara där.
//
// Att räkna en självläkning som "skapad" var första versionens fel, och det är exakt sjukdomen:
// invoice_number självläkte i SKRIVvägen, ingen ny faktura skrevs, och LÄSvägen kastade. En
// ALTER som körs någon annanstans i koden är ingen garanti för att kolumnen finns när rummet
// läses. Bara en migrering är det. (Läsvägens egen läkning är ett skyddsnät för miljöer där
// migreringen släpat efter — den prövas av LK-02, inte här.)
function skapadeKolumner() {
  const filer = readdirSync(join(ROT, 'scripts')).filter((f) => f.startsWith('migrate') && f.endsWith('.mjs'));
  const txt = filer.map((f) => readFileSync(join(ROT, 'scripts', f), 'utf8')).join('\n');
  const kol = new Set();
  for (const [, namn] of txt.matchAll(/ADD COLUMN IF NOT EXISTS\s+(\w+)/g)) kol.add(namn);
  // CREATE TABLE invoice_analyses ( ... ) — basfälten.
  const create = txt.match(/CREATE TABLE IF NOT EXISTS invoice_analyses\s*\(([\s\S]*?)\n\s*\)/);
  if (create) {
    for (const rad of create[1].split('\n')) {
      const m = rad.trim().match(/^(\w+)\s+\w/);
      if (m && !/^(PRIMARY|UNIQUE|FOREIGN|CONSTRAINT|CHECK)$/i.test(m[1])) kol.add(m[1]);
    }
  }
  return kol;
}

describe('LÄSVÄGENS KOLUMNER · en tyst reserv är ingen reserv', () => {
  test('LK-01 · varje kolumn i den primära SELECT-satsen skapas av en migrering', () => {
    const las = primaraKolumner();
    const finns = skapadeKolumner();
    assert.ok(las.length >= 15, `hittade bara ${las.length} kolumner — matchar mönstret koden?`);
    const saknas = las.filter((k) => !finns.has(k));
    assert.deepEqual(saknas, [],
      'Kolumn läses men skapas av ingen migrering. I produktion kastar satsen, läsvägen faller '
      + 'till reserven och rummet tappar health_score, fyndet och triage-skälen — utan att någon '
      + `ser det. Det var exakt 75-felet:\n  ${saknas.join(', ')}`);
  });

  test('LK-02 · läsvägen LÄKER en saknad kolumn innan den ger upp', () => {
    assert.match(STORE, /async function lakSaknadeKolumner/,
      'en saknad valfri kolumn är ett schemafel, inte ett skäl att visa kunden ett sämre rum');
    const forsok = (STORE.match(/if \(await lakSaknadeKolumner\(db\)\)/g) ?? []).length;
    assert.equal(forsok, 2,
      'BÅDA läsvägarna (fingerprint och e-post) måste läka — mejl-intaget är huvudvägen');
    assert.match(STORE, /invoice_number', 'TEXT'/,
      'nya valfria kolumner måste läggas till i läklistan, annars läks de aldrig');
  });

  test('LK-03 · reserven är ALDRIG tyst', () => {
    // En degraderad läsning ser identisk ut med "kunden har inga bra avtal". Används reserven
    // har vi tappat fält rummets kvalitet hänger på, och det ska gå att läsa i loggen.
    const varningar = (STORE.match(/DEGRADERAD LÄSNING/g) ?? []).length;
    assert.equal(varningar, 2, 'båda reservvägarna måste säga ifrån när de används');
    assert.match(STORE, /DEGRADERAD LÄSNING[\s\S]{0,200}health_score/,
      'loggen ska namnge VAD som tappades, inte bara att något gick fel');
  });

  test('LK-04 · reserven hämtar aldrig fler fält än den primära (den är en delmängd)', () => {
    // Om reserven någon gång fick ett fält den primära saknar vore de två olika sanningar om
    // samma rad — och vilken kunden fick skulle bero på ett fel. Regel 1.
    const listor = (STORE.match(/SELECT\s+([\s\S]*?)\s+FROM invoice_analyses/g) ?? [])
      .map((b) => b.replace(/SELECT\s+/, '').replace(/\s+FROM invoice_analyses/, '')
        .split(',').map((k) => k.trim()).filter(Boolean));
    const primar = new Set(primaraKolumner());
    for (const l of listor) {
      const extra = l.filter((k) => !primar.has(k) && !k.includes('('));
      assert.deepEqual(extra, [], `en SELECT hämtar fält den primära saknar: ${extra.join(', ')}`);
    }
  });
});
