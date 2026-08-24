// tests/radobservation.mjs — RO-01..08: att fakturaradens öresobservation når fram i PRODUKTIONENS
// objektform, inte bara i testernas.
//
// VARFÖR (2026-08-24). Öresfixen i balanskravet (22 aug) var död kod i två dygn. Den läste
// modellens råstavning `unit_price_ore`; produktionen skickar den aggregerade raden, där fältet
// heter `unitPriceOre`. Fortum-raden — själva fallet fixen byggdes för — blev `judged: 0` i stället
// för godkänd. Grinden var lika blind som före fixen, och sviten var grön hela tiden.
//
// Grön av samma skäl som alltid: testerna matade rådataformen DIREKT till `judgeLineArithmetic`.
// De bevisade att mekanismen reagerar när den matas rätt — aldrig att produktionen matar den rätt.
// Tredje gången i den här kodbasen (LFL-produktionsvägen 12 aug, tests/holdings.mjs 19 aug, nu
// denna), och därför är RO-01 skriven som en KEDJA: rådata → aggregateLineItems → judgeLineArithmetic.
// Ett test som bygger sitt eget indata kan aldrig fälla ett namnbyte i steget emellan.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { radensOre, ORESFALT } from '../lib/radobservation.js';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
import { aggregateLineItems } from '../agents/test-invoice/extract.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Fortum, exakt som fakturan ser ut: «kWh 1,12», 3 400 kWh, belopp jämna 3 808 kr.
// `unitPrice` är ett heltalsfält i kronor och blir 1 — aritmetiken 3 400 × 1 = 3 400 ≠ 3 808 är
// omöjlig per konstruktion. Bara öresfältet kan döma raden.
const FORTUM_RA = () => ({
  supplier: 'Fortum', date: '2026-05-31', description: 'Elhandel',
  billing_period: 'monthly', confidenceScore: 0.95,
  lineItems: [{
    description: 'Elhandel rörligt kWh 1,12', amount: 3808, type: 'recurring_subscription',
    quantity: 3400, unitPrice: 1, unit_price_ore: 112, amount_ore: null,
  }],
});

describe('RO · Radobservationen — öresfältet i produktionens objektform', () => {
  test('RO-01: KEDJAN rådata → aggregateLineItems → balanskravet dömer Fortum-raden och godkänner den', () => {
    // Det här är hela testet. Kör INTE judgeLineArithmetic på rådatan — då prövas bara mekanismen.
    const produktionsObjekt = aggregateLineItems(FORTUM_RA());
    const dom = judgeLineArithmetic(produktionsObjekt);

    assert.equal(dom.judged, 1,
      'raden blev ODÖMBAR i produktionsvägen — öresfältet nådde aldrig grinden (namnbyte i aggregeringen)');
    assert.equal(dom.balanced, true,
      '3 400 × 1,12 kr = 3 808 kr är exakt i öre; fälls den mäter grinden i fel enhet');
  });

  test('RO-02: aggregeringen bevarar talet, bara namnet byter form', () => {
    const rad = aggregateLineItems(FORTUM_RA()).lineItems[0];
    assert.equal(rad.unitPriceOre, 112, 'öresobservationen får aldrig gå förlorad i normaliseringen');
    assert.equal(rad.unit_price_ore, undefined, 'råstavningen finns INTE efter aggregering — det var precis felet');
    assert.equal(radensOre(rad).aprisOre, 112, 'läsvägen måste känna den aggregerade stavningen');
    assert.equal(radensOre(rad).kalla, 'aggregerad');
  });

  test('RO-03: råformen dömer likadant (fixturer och korpusdiff matar snake_case)', () => {
    const dom = judgeLineArithmetic(FORTUM_RA());
    assert.equal(dom.judged, 1);
    assert.equal(dom.balanced, true);
    assert.equal(radensOre(FORTUM_RA().lineItems[0]).kalla, 'ra');
  });

  test('RO-04: à-priset härleds ALDRIG ur kronorfältet — utan öre är ett litet à-pris odömbart', () => {
    // Samma faktura utan öresobservation. Kronorfältet säger 1 kr/kWh, vilket är fel med 12 %.
    // Att räkna 1 × 100 = 100 öre vore att tillverka den precision grinden ska pröva.
    const utanOre = FORTUM_RA();
    utanOre.lineItems[0].unit_price_ore = null;
    const dom = judgeLineArithmetic(aggregateLineItems(utanOre));
    assert.equal(dom.judged, 0, 'utan avläst à-pris i öre är raden ODÖMBAR, aldrig godkänd och aldrig fälld');
    assert.equal(radensOre(utanOre.lineItems[0]).aprisOre, null);

    // Beloppet däremot ÄR exakt i öre när det står i hela kronor — en enhetskonvertering av ett
    // känt tal. Den fallbacken är lastbärande: schemat svarar korrekt `amount_ore: null` på
    // jämna belopp, och första versionen av fixen tolkade det som «inga öresdata» och stängde
    // öresvägen på just de fakturor den byggdes för.
    assert.equal(radensOre({ amount: 3808 }).beloppOre, 380_800);
  });

  // ── TOLERANSEN (2026-08-24) ───────────────────────────────────────────────────────────────
  // Öresvägens tolerans var `max(100, expected × 0,005)` under kommentaren «i öre är aritmetiken
  // exakt — då räcker en öresavrundning per rad». En procentsats är fel FORM: felet är inte
  // proportionellt mot radbeloppet utan ett fast belopp per enhet. Den var därför fel åt båda
  // hållen samtidigt, och båda riktningarna låses här — en tolerans som bara prövas åt ena hållet
  // kan alltid vidgas «för säkerhets skull» tills grinden slutat titta.
  const bygg = (rad) => judgeLineArithmetic(aggregateLineItems({
    supplier: 'X', date: '2026-05-31', description: 'd', billing_period: 'monthly',
    confidenceScore: 0.9, lineItems: [rad],
  }));

  test('RO-06: en aritmetiskt perfekt elhandelsrad fälls ALDRIG av heltalsöret', () => {
    // 20 000 kWh × 0,915 kr. `unit_price_ore` är heltal, så 91,5 öre blir 92 (eller 91) och
    // avrundningen blir 10 000 öre = 100 kr på raden. Den gamla relativa toleransen gav 9 200
    // och fällde en faktura där ingenting är fel. För VARJE à-pris under 1,00 kr är procent-
    // toleransen strukturellt smalare än avrundningens tak — och elhandelns band (0,80–1,90 kr)
    // ligger till hälften där.
    const kwh = 20_000, aprisKr = 0.915;
    const dom = bygg({
      description: 'Elhandel rörligt', type: 'recurring_subscription', quantity: kwh,
      unitPrice: 1, unit_price_ore: Math.round(aprisKr * 100), amount: Math.round(kwh * aprisKr),
      amount_ore: null,
    });
    assert.equal(dom.judged, 1);
    assert.equal(dom.balanced, true,
      'grinden fäller en korrekt rad — toleransen absorberar inte heltalsöret vid stora kvantiteter');
  });

  test('RO-07: ett verkligt fel på 10 kr i en licensrad fälls (skärpningen biter)', () => {
    // Motprovet. Den gamla toleransen gav 1 338 öre på 20 licenser där avrundningen är 10 öre —
    // ett fel på tio kronor i kundens egen prisrad passerade osett. En tolerans som bara prövas
    // för falsklarm blir alltid för vid.
    //
    // Beloppet är valt så att den GAMLA toleransen släppte igenom det (1 040 < 1 338). Mitt första
    // exempel låg på 1 340 öre och fälldes av båda — det hade sett ut som ett bevis utan att vara
    // ett, för sabotaget kunde inte skilja den nya grinden från den gamla.
    const fel = bygg({
      description: 'M365 Business Standard', type: 'recurring_subscription', quantity: 20,
      unitPrice: 134, amount: 2_666, unit_price_ore: 13_382, amount_ore: 266_600,
    });
    assert.equal(fel.balanced, false, '20 × 133,82 kr = 2 676,40 kr — 2 666 kr är ett verkligt fel på 10,40 kr');

    const ratt = bygg({
      description: 'M365 Business Standard', type: 'recurring_subscription', quantity: 20,
      unitPrice: 134, amount: 2_676, unit_price_ore: 13_382, amount_ore: 267_640,
    });
    assert.equal(ratt.balanced, true, 'den korrekta raden måste gå fri — annars är skärpningen ett falsklarm');
  });

  test('RO-08: ingen konsument läser öresfälten utanför den kanoniska läsvägen', () => {
    // Vakten mot nästa stavfel. Skrivarna (schemat + aggregeringen) och läsvägen får nämna
    // fälten; alla andra ska fråga radensOre(). En legitim träff motiveras inline med
    // `// ore-ok: <skäl>` — samma mönster som claims-audit och kopidetektorn.
    const TILLATNA = new Set([
      'lib/radobservation.js',            // läsvägen själv
      'agents/test-invoice/extract.js',   // verktygsschemat + aggregeringen: fältens FÖRFATTARE
      'tests/radobservation.mjs',         // det här testet
    ]);
    const KATALOGER = ['lib', 'agents', 'api', 'scripts', 'src', 'tests'];
    const monster = new RegExp(`\\.(${ORESFALT.join('|')})\\b`);

    const filer = [];
    const perKatalog = {};
    const ga = (d, rot) => {
      for (const namn of readdirSync(join(ROT, d))) {
        const rel = join(d, namn);
        if (namn === 'node_modules' || namn.startsWith('.')) continue;
        if (statSync(join(ROT, rel)).isDirectory()) ga(rel, rot);
        else if (/\.(js|mjs)$/.test(namn)) { filer.push(rel); perKatalog[rot] = (perKatalog[rot] ?? 0) + 1; }
      }
    };
    for (const d of KATALOGER) ga(d, d);

    const brott = [];
    for (const fil of filer) {
      if (TILLATNA.has(fil.split('\\').join('/'))) continue;
      const rader = readFileSync(join(ROT, fil), 'utf8').split('\n');
      rader.forEach((rad, i) => {
        const kod = rad.split('//')[0];              // en kommentar får nämna fälten
        if (!monster.test(kod)) return;
        if (rad.includes('ore-ok:')) return;
        brott.push(`${fil}:${i + 1} — ${rad.trim().slice(0, 90)}`);
      });
    }

    // ── VAKTENS EGEN TÄCKNING ────────────────────────────────────────────────────────────────
    // Första versionen krävde bara `filer.length > 100`. Mitt sabotage kapade KATALOGER till
    // enbart `lib` — och tröskeln höll ändå, för lib/ ensam har över hundra filer. En vakt som
    // slutat skanna fem av sex kataloger såg exakt likadan ut som en som skannar alla sex: ett
    // grönt som betyder «jag tittade inte», i vakten mot just den sjukdomen.
    // Ett TOTALTAL kan inte mäta täckning per katalog. Varje deklarerad katalog måste bidra.
    for (const d of KATALOGER) {
      assert.ok((perKatalog[d] ?? 0) > 0, `vakten hittade noll filer i '${d}' — den skannar inte det den påstår`);
    }
    // Positiv kontroll: filen som FÖRFATTAR fälten måste finnas i urvalet. Hittar vakten inte ens
    // den kan dess tystnad aldrig betyda «inga brott».
    assert.ok(filer.some((f) => f.endsWith(join('test-invoice', 'extract.js'))),
      'vakten nådde aldrig fram till aggregeringen — utan den bevisar tystnaden ingenting');
    assert.deepEqual(brott, [],
      `öresfält läses utanför lib/radobservation.js (använd radensOre):\n${brott.join('\n')}`);
  });
});
