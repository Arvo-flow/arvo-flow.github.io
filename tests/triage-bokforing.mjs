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

  // ── VAKTEN STÄLLDE FEL FRÅGA (2026-08-15) ──────────────────────────────────────────────────
  // TB-01–03 skrevs efter Ellevio-fallet och stängde tio TRIAGE-utgångar. De var gröna hela
  // tiden — och Ellevio försvann ÄNDÅ i nästa omkörning. Sonden visade noll rader för
  // nätleverantören, och genomläsningen hittade två utgångar till i el-grenen:
  //   · route 'monitoring' vid bundet fastprisavtal — svarade ok:true utan att lagra något
  //   · route 'auto' efter en FULLSTÄNDIG el-rekommendation — skrev en anonym datapunkt till
  //     branschpoolen men INGEN rad i kundens egen liggare
  // Den andra är den allvarligaste vi hittat: vi lärde av kundens faktura och gav ingenting
  // tillbaka. El är dessutom Nivå 1 — kategorin vi lovar att faktiskt genomföra bytet i.
  //
  // Frågan jag ställde var "bokför varje TRIAGE-utgång?". Frågan som skulle ställts var
  // "lämnar varje ok:true-utgång ett spår?". Vakten var ärlig om sin blindfläck och dolde ändå
  // hålet, därför att ingen ställde den bredare frågan (samma form som `bevakadeTiers`).
  //
  //   FÅNGAR: en ok:true-utgång i api/test-invoice.mjs — oavsett route — utan storeTriaged
  //           ELLER storeAnalysis i sitt block.
  //   BLIND:  fortfarande att raden LANDAR (db null, sväljande .catch), och den ser inte
  //           utgångar i andra filer. storeDatapoint räknas ALDRIG som bokföring: den skriver
  //           till branschpoolen, inte till kundens rum — det var precis förväxlingen som
  //           gjorde el-utgången osynlig.
  function alltUtgangar() {
    const ut = [];
    for (let i = 0; i < RADER.length; i++) {
      const m = RADER[i].match(/route:\s*'(unsupported|review_queue|auto|monitoring)'/);
      if (!m) continue;
      // Skriv-anropen bär också route: '...'. Står raden inuti ett storeTriaged/storeAnalysis
      // är det en bokföring, inte en utgång.
      const fore = RADER.slice(Math.max(0, i - 8), i + 1).join('\n');
      const sisteAnrop = Math.max(fore.lastIndexOf('storeTriaged('), fore.lastIndexOf('storeAnalysis('));
      if (sisteAnrop >= 0 && !fore.slice(sisteAnrop).includes('})')) continue;
      ut.push({ rad: i + 1, route: m[1] });
    }
    return ut;
  }

  test('TB-04 · VARJE ok:true-utgång lämnar ett spår, inte bara triage-utgångarna', () => {
    const saknar = [];
    for (const u of alltUtgangar()) {
      const start = Math.max(0, u.rad - 1 - FONSTER);
      const block = RADER.slice(start, u.rad).join('\n');
      if (/\/\/\s*triage-ok:/.test(block)) continue;
      if (!block.includes('storeTriaged') && !block.includes('storeAnalysis')) {
        saknar.push(`rad ${u.rad} (route '${u.route}')`);
      }
    }
    assert.deepEqual(saknar, [],
      `Utgång utan spår i kundens liggare — fakturan ser ut att ha försvunnit:\n  ${saknar.join('\n  ')}`);
  });

  test('TB-05 · el-grenens båda framgångsutgångar bokför i KUNDENS liggare', () => {
    // Regressionen som gav upphov till TB-04. storeDatapoint duger inte: den skriver till
    // branschpoolen. Kravet är storeAnalysis — raden kunden faktiskt ser.
    // Ankaret måste vara UNIKT för el-auto-utgången. `computeElRecommendation` förekommer två
    // gånger (även i fastprisgrenen) och findIndex tar den första — då mäter testet fel gren.
    const i = RADER.findIndex((r) => /const \{ arvoFee, netSaving \} = elRec;/.test(r));
    assert.ok(i > 0, 'el-auto-utgången hittades inte — har den flyttat eller döpts om?');
    const gren = RADER.slice(i, i + 40).join('\n');
    assert.match(gren, /storeAnalysis\(\{[\s\S]{0,900}route:\s*'auto'/,
      'el-auto skriver bara en anonym datapunkt — kundens rum får ingenting');

    const j = RADER.findIndex((r) => /elContractType === 'fixed'/.test(r));
    assert.ok(j > 0, 'fastprisgrenen hittades inte');
    assert.match(RADER.slice(j, j + 40).join('\n'), /storeAnalysis/,
      'ett bundet elavtal ska synas i rummet — det är just den raden kunden vill se');
  });

  test('TB-06 · den bredare vakten hittar fler utgångar än den smala', () => {
    // Utan detta kan TB-04 bli grön av att mönstret slutat matcha framgångsutgångarna —
    // exakt den tomhet TB-03 finns för att stoppa, en nivå upp.
    const bred = alltUtgangar().length, smal = triageUtgangar().length;
    assert.ok(bred > smal, `bred vakt hittade ${bred}, smal ${smal} — den bredare matchar inte auto/monitoring`);
  });
});
