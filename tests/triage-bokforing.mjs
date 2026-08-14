// tests/triage-bokforing.mjs — VARJE TRIAGE-UTGÅNG MÅSTE BOKFÖRA SIG.
//
// BAKGRUNDEN (skarpt läge 2026-08-14): en kund skickade tio fakturor. Nio landade i rummet. Den
// tionde — en nätavgiftsfaktura från Ellevio — försvann utan ett spår. Kön sa `done`, ett försök,
// tomt felfält, och drainen hade rätt: analys-API:t hade svarat `ok: true`.
//
// Pipelinen hade nämligen gjort det VASSASTE draget i hela bunten. Den kände igen en nätavgift och
// konstaterade att den är ett reglerat geografiskt monopol som ingen leverantör kan påverka — alltså
// inget att spara. Rätt beslut. Men grinden var den enda av tio triage-utgångar som returnerade utan
// att skriva en rad, så bedömningen kastades. För kunden är ett obokfört beslut omöjligt att skilja
// från ett tapp: nio av tio fakturor och ingen förklaring till den tionde.
//
// LÄXAN, generaliserad: ett beslut vi inte bokför har vi inte fattat — vi har bara tänkt det.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: en triage-utgång i api/test-invoice.mjs som svarar ok:true med route 'unsupported'
//           eller 'review_queue' UTAN ett föregående storeTriaged i samma block.
//   BLIND:  att storeTriaged anropas säger inget om att raden LANDAR (db null, insert-fel sväljs
//           med .catch), och den ser inte utgångar i andra filer. Den bevakar att beslutet
//           BOKFÖRS I KODEN, inte att bokföringen når databasen — det senare kräver skarp körning.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KALLA = readFileSync(join(ROOT, 'api/test-invoice.mjs'), 'utf8');
const RADER = KALLA.split('\n');

// Hur långt bakåt en utgång får leta efter sin bokföring. Anropet står i praktiken 1–6 rader före
// returen i alla tio befintliga fall; 40 ger marginal för en notis eller ett larm emellan utan att
// råka fånga FÖRRA utgångens storeTriaged (utgångarna ligger hundratals rader isär).
const FONSTER = 40;

function triageUtgangar() {
  const ut = [];
  for (let i = 0; i < RADER.length; i++) {
    // En utgång känns igen på sin route-rad inuti ett svarsobjekt. Vi matchar på route-literalen
    // och inte på "return send", eftersom svarsobjektet är flerradigt.
    const m = RADER[i].match(/route:\s*'(unsupported|review_queue)'/);
    if (!m) continue;
    // Bokföringsanropet SKRIVER också route: '...' — den raden är inte en utgång.
    const fore = RADER.slice(Math.max(0, i - 3), i + 1).join('\n');
    if (/storeTriaged\(\{[\s\S]*$/.test(fore) && /storeTriaged/.test(fore)) {
      const bit = fore.slice(fore.lastIndexOf('storeTriaged'));
      if (!bit.includes('return send')) continue;      // vi står inuti bokföringsanropet
    }
    ut.push({ rad: i + 1, route: m[1] });
  }
  return ut;
}

describe('TRIAGE-BOKFÖRING · ett beslut vi inte bokför har vi inte fattat', () => {
  test('TB-01 · varje triage-utgång skriver en rad innan den svarar', () => {
    const saknar = [];
    for (const u of triageUtgangar()) {
      const start = Math.max(0, u.rad - 1 - FONSTER);
      const block = RADER.slice(start, u.rad).join('\n');
      // Legitima undantag motiveras inline, samma mönster som claims-audit och kopidetektorn.
      if (/\/\/\s*triage-ok:/.test(block)) continue;
      if (!block.includes('storeTriaged')) saknar.push(`rad ${u.rad} (route '${u.route}')`);
    }
    assert.deepEqual(saknar, [],
      `Triage-utgång utan bokföring — kunden får tystnad i stället för vårt beslut:\n  ${saknar.join('\n  ')}`);
  });

  test('TB-02 · nätavgifts-grinden bokför sig (regressionen som gav upphov till vakten)', () => {
    const i = RADER.findIndex((r) => /elInvoiceType === 'natavgift'/.test(r));
    assert.ok(i > 0, 'nätavgifts-grinden hittades inte — har den flyttat eller tagits bort?');
    const block = RADER.slice(i, i + FONSTER).join('\n');
    assert.match(block, /storeTriaged/,
      'Ellevio-fallet: nätavgiften bedöms rätt men bokförs inte — nio av tio fakturor når kunden');
    assert.match(block, /reason:\s*'natavgift'/,
      'skälet måste följa med raden, annars vet varken vi eller kunden VARFÖR fakturan lämnades');
  });

  test('TB-03 · vakten hittar faktiskt utgångarna (annars vaktar den ingenting)', () => {
    // En vakt som råkar hitta noll utgångar blir grön av tomhet. Antalet får röra sig när
    // pipelinen växer, men noll — eller en handfull — betyder att mönstret slutat matcha.
    const n = triageUtgangar().length;
    assert.ok(n >= 8, `hittade bara ${n} triage-utgångar — mönstret matchar inte längre koden`);
  });
});
