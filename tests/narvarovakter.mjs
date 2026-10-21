// tests/narvarovakter.mjs — vakterna som förut bara frågade om det LAGRADE priset stod kvar på sidan.
//
// Fabriken märker en röd check OLÄSBAR när `actual` är '(saknas)' och DRIFT annars
// (lib/verifierarutfall.js). De två kräver motsatta åtgärder: DRIFT = rätta prisboken, OLÄSBAR =
// laga vakten, «priset kan mycket väl vara oförändrat». En vakt som bara frågar «står det lagrade
// priset kvar?» kan inte skilja ett höjt pris från en sida den tappat. Steg två (2026-10-20): varje
// vakt läser talet på den plats där sidans struktur säger att det står.
//
// Sidtexten här är ORDAGRANNA utdrag ur fabrikens logg, körning 39155569488 (18 okt), som
// kontextUtdrag skrev ut: tests/fixtures/narvaro/*-2026-10-18.txt, ett utdrag per rad. Varje vakt
// prövas åt fyra håll: grönt på dagens sida, DRIFT med det nya talet när priset på platsen byts,
// inget falsklarm när en GRANNPRODUKTS pris byts, och OLÄSBAR när platsen saknas eller är tvetydig.
// Testerna anropar de rena funktionerna med sidtext, aldrig källtexten.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { bedomVerifierarutfall } from '../lib/verifierarutfall.js';
import { talSv, DOLLARBELOPP } from '../lib/verifiers/core.mjs';
import { fortnoxChecks } from '../lib/verifiers/fortnox.mjs';
import { spirisChecks } from '../lib/verifiers/spiris.mjs';
import { kortterminalCheck } from '../lib/verifiers/kortterminal.mjs';
import { fortnoxLonChecks } from '../lib/verifiers/fortnox-lon.mjs';
import { teliaChecks } from '../lib/verifiers/telia-vaxel.mjs';
import { adobeChecks } from '../lib/verifiers/adobe.mjs';
import { zoomKontext, zoomUtfall } from '../lib/verifiers/zoom.mjs';

const FV = BRANCHINDEX['saas-finance'].fortnoxVerified;
const SV = BRANCHINDEX['saas-finance'].spirisVerified;
const RATES = BRANCHINDEX.kortterminal.verifiedRates.rates;
const LV = BRANCHINDEX.loneadmin.fortnoxLonVerified;
const TV = BRANCHINDEX.molnvaxel.teliaVerified;
const AV = BRANCHINDEX['saas-creative'].adobeVerified;

const sida = (namn) => readFileSync(new URL(`./fixtures/narvaro/${namn}-2026-10-18.txt`, import.meta.url), 'utf8');
const TELIA_PRISLISTA = readFileSync(new URL('./fixtures/kallfabriken/telia-smart-connect-prislista-2026-10-16.txt', import.meta.url), 'utf8');

/** Fabrikens märke per check, med samma regel som scripts/verify.mjs skriver i loggen. */
const marke = (c) => (c.ok ? 'gron' : (String(c.actual ?? '') === '(saknas)' ? 'olasbar' : 'drift'));
const marken = (checks) => checks.map(marke);
/** Byt en sträng i fixturen och kräv att den fanns — ett sabotage av fixturen får aldrig vara en no-op. */
const byt = (text, gammal, ny) => {
  assert.ok(text.includes(gammal), `fixturen bär inte «${gammal}» — testet prövar ingenting`);
  return text.replaceAll(gammal, ny);
};

describe('NV · vakterna läser talet på dess plats: DRIFT och OLÄSBAR skiljs åt', () => {
  test('NV-01 · Fortnox: paketblocket och Bokföringsraden läses; Mini+ och Löpande Mini är grannar, inte Mini', () => {
    const t = sida('fortnox');
    assert.deepEqual(marken(fortnoxChecks(FV, t)), ['gron', 'gron', 'gron', 'gron', 'gron']);

    const hojd = fortnoxChecks(FV, byt(t, 'Mini 209 kr/mån Liten', 'Mini 229 kr/mån Liten'));
    assert.deepEqual(marken(hojd), ['drift', 'gron', 'gron', 'gron', 'gron']);
    assert.equal(hojd[0].actual, '229 kr');

    const grannar = byt(byt(byt(t, 'Mini+ 369', 'Mini+ 389'), 'Löpande Mini 149', 'Löpande Mini 169'), 'själv Mini 159', 'själv Mini 179');
    assert.deepEqual(marken(fortnoxChecks(FV, grannar)), ['gron', 'gron', 'gron', 'gron', 'gron'], 'grannproduktens pris är inte Minis');

    assert.deepEqual(marken(fortnoxChecks(FV, 'Kontakta oss för en offert')), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'olasbar']);
    // Två olika paketblock på samma sida: vilket som gäller går inte att avgöra.
    const tvetydig = fortnoxChecks(FV, `${t}\nMini 219 kr/mån Liten 349 kr/mån Mellan 490 kr/mån Stor 710 kr/mån`);
    assert.deepEqual(marken(tvetydig).slice(0, 4), ['olasbar', 'olasbar', 'olasbar', 'olasbar']);
  });

  test('NV-02 · Spiris: tabellen läses och korten vittnar; säger de olika är talet okänt', () => {
    const t = sida('spiris');
    assert.deepEqual(marken(spirisChecks(SV, t)), ['gron', 'gron', 'gron', 'gron', 'gron']);

    const hojd = spirisChecks(SV, byt(byt(t, 'Köp Växa 749 kr/mån', 'Köp Växa 799 kr/mån'), 'Fakturering & Lön 749 kr /mån', 'Fakturering & Lön 799 kr /mån'));
    assert.deepEqual(marken(hojd), ['gron', 'gron', 'gron', 'drift', 'gron']);
    assert.equal(hojd[3].actual, '799 kr');

    const oense = spirisChecks(SV, byt(t, 'Köp Växa 749 kr/mån', 'Köp Växa 799 kr/mån'));
    assert.equal(marke(oense[3]), 'olasbar', 'tabellen säger 799, kortet 749 — inget val');

    const lon = spirisChecks(SV, byt(t, 'anställda. 299 kr/mån 299 kr/mån 299 kr/mån', 'anställda. 319 kr/mån 319 kr/mån 319 kr/mån'));
    assert.equal(marke(lon[4]), 'olasbar', 'en av tabellens rader säger fortfarande 299 — inget val');

    assert.deepEqual(marken(spirisChecks(SV, 'Kontakta oss')), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'olasbar']);
  });

  test('NV-03 · Kortterminal: Stripes EES-rate och Zettles korttransaktionsavgift läses på sina platser', () => {
    const stripe = RATES.find((r) => r.supplier === 'Stripe Terminal');
    const zettle = RATES.find((r) => r.supplier === 'Zettle by PayPal');
    assert.ok(stripe && zettle, 'prisboken bär båda leverantörerna');
    const st = sida('stripe-terminal');
    const ze = sida('zettle');
    assert.equal(marke(kortterminalCheck(stripe, st)), 'gron');
    assert.equal(marke(kortterminalCheck(zettle, ze)), 'gron');

    const hojd = kortterminalCheck(stripe, byt(st, '1,4 % + 1,00 kr per genomförd debitering för EES-kort', '1,5 % + 1,00 kr per genomförd debitering för EES-kort'));
    assert.equal(marke(hojd), 'drift');
    assert.equal(hojd.actual, '1.5 %');
    // Stripes rate för internationella kort (2,9 %) och Zettles betalningslänkar (2,5 %) är grannar.
    assert.equal(marke(kortterminalCheck(stripe, byt(st, '2,9 %', '3,1 %'))), 'gron');
    assert.equal(marke(kortterminalCheck(zettle, byt(ze, 'Betalningslänkar* 2,5 %', 'Betalningslänkar* 2,9 %'))), 'gron');

    const zOense = kortterminalCheck(zettle, byt(ze, 'Från 1999 kr 1,85 %', 'Från 1999 kr 1,95 %'));
    assert.equal(marke(zOense), 'olasbar', 'två olika korttransaktionsavgifter — inget val');
    assert.equal(marke(kortterminalCheck({ supplier: 'Okänd', pct: 1.2 }, st)), 'olasbar', 'en leverantör utan läsare blir aldrig grön');
    assert.equal(marke(kortterminalCheck(zettle, 'Kontakta säljavdelningen')), 'olasbar');
  });

  test('NV-04 · Fortnox Lön: båda talen läses ur lönemeningen; Revisor 199 kr/mån räknas inte', () => {
    const t = sida('fortnox-lon');
    assert.deepEqual(marken(fortnoxLonChecks(LV, t)), ['gron', 'gron']);

    // Förut letades «199 kr» var som helst. Höjs lönen står Revisor kvar på 199 — det var grönt.
    const hojd = fortnoxLonChecks(LV, byt(t, 'Lön 199 kr/mån + 25 kr/mån', 'Lön 219 kr/mån + 25 kr/mån'));
    assert.ok(hojd[0].actual === '219 kr' && marke(hojd[0]) === 'drift', `fast avgift: ${hojd[0].actual}`);
    assert.equal(marke(hojd[1]), 'gron');

    const perAnst = fortnoxLonChecks(LV, byt(t, '+ 25 kr/mån för varje', '+ 29 kr/mån för varje'));
    assert.deepEqual(marken(perAnst), ['gron', 'drift']);

    // Enkel lön och Kivra-utskicket är andra produkter: utan lönemeningen är talen okända.
    assert.deepEqual(marken(fortnoxLonChecks(LV, 'Enkel lön 0 kr/mån 39 kr per anställd · Revisor 199 kr/mån')), ['olasbar', 'olasbar']);
  });

  test('NV-05 · Telia växel: T2:s från-pris läses som tal; kampanjens «just nu» aldrig', () => {
    const t = sida('telia-vaxelsida');
    const t2 = (sidtext) => teliaChecks(TV, { sidtext, prislistetext: TELIA_PRISLISTA }).find((c) => c.name.startsWith('T2'));
    assert.equal(marke(t2(t)), 'gron');

    const hojd = t2(byt(t, 'Pris från: 118 kr/mån', 'Pris från: 129 kr/mån'));
    assert.equal(marke(hojd), 'drift');
    assert.equal(hojd.actual, '129 kr');
    assert.equal(marke(t2(byt(t, 'Pris just nu: 49 kr/mån', 'Pris just nu: 59 kr/mån'))), 'gron', 'kampanjpriset är inte T2');

    assert.equal(marke(t2(`${t}\nPris från: 89 kr/mån`)), 'olasbar', 'två från-priser — vilket är uppsättning 2?');
    assert.equal(marke(t2('Kontakta oss')), 'olasbar');
  });

  test('NV-06 · Adobe: talen läses, även över 1 000 kr; utan «exkl. moms» är teampriset okänt', () => {
    const teamText = sida('adobe-team');
    const psText = sida('adobe-photoshop');
    assert.deepEqual(marken(adobeChecks(AV, { teamText, psText })), ['gron', 'gron', 'gron', 'gron']);

    // Det latenta felet: Intl skriver tusentalet med hårt mellanslag, sidtexten med vanligt.
    for (const mellanslag of [' ', '\u00A0']) {
      const hojd = adobeChecks(AV, { teamText: byt(teamText, 'Populärast 985,00', `Populärast 1${mellanslag}045,00`), psText });
      assert.equal(marke(hojd[0]), 'drift');
      assert.equal(hojd[0].actual, '1045 SEK');
    }
    assert.deepEqual(marken(adobeChecks(AV, { teamText: byt(teamText, '1 091,00', '1 149,00'), psText })),
      ['gron', 'gron', 'gron', 'gron'], 'Creative Cloud Pro Plus är en annan produkt');

    const utanMoms = adobeChecks(AV, { teamText: byt(teamText, 'exkl. moms', ''), psText });
    assert.deepEqual(marken(utanMoms).slice(0, 2), ['olasbar', 'olasbar'], 'okänd momsbas är okänt, aldrig drift');

    const indHojd = adobeChecks(AV, { teamText, psText: byt(psText, 'Ordinarie pris 932,50', 'Ordinarie pris 979,00') });
    assert.equal(indHojd[3].actual, '979 SEK');
    assert.equal(marke(adobeChecks(AV, { teamText, psText: byt(psText, 'Ordinarie pris ', '') })[3]), 'olasbar');
  });

  test('NV-08 · Zoom: loggen visar sidtexten runt planerna, beloppen och faktureringsläget', () => {
    // Sidtexten är fixturen ur körning 39548656562. Före V85-Z1 krävde dollarraden tecknet FÖRE talet,
    // så den visade bara tilläggsraden «22 $ 16,50 $ 1» och aldrig planpriserna «14,16$» och «18,33$».
    const sidtext = readFileSync(new URL('./fixtures/narvaro/zoom-2026-10-21.txt', import.meta.url), 'utf8');
    const [planer, belopp, lage] = zoomKontext(sidtext);
    assert.match(planer, /Workplace\s+Pro/);
    assert.ok(belopp.includes('14,16$') && belopp.includes('18,33$'), `planpriserna saknas i dollarraden: ${belopp.slice(0, 200)}`);
    assert.match(lage, /Faktureras årsvis/);
    assert.deepEqual(zoomKontext('Kontakta oss').map((r) => r.endsWith('(ingen träff)')), [true, true, true]);
    // Mönstret delas med sonden, som läser talet ur grupperna: båda ordningarna ger talet.
    const tal = (s) => [...s.matchAll(new RegExp(DOLLARBELOPP, 'g'))].map((m) => m[1] ?? m[2]);
    assert.deepEqual(tal('14,16$ · $14.16 · US$ 9 · USD 12 · 22 $'), ['14,16', '14.16', '9', '12', '22']);
    // Utdragen ska nå fabrikens logg (notes), inte bara finnas som funktion.
    const utfall = zoomUtfall(BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, sidtext);
    assert.ok(utfall.notes.some((r) => r.startsWith('planer: ') && r.includes('Workplace')), 'planutdraget når inte loggen');
    assert.equal(utfall.checks.length, 2);
  });

  test('NV-09 · Zoom: årspriset läses under kortets rubrik, i dagens form «14,16$» och augustis «$14.16»', () => {
    // Fixturen är kontextUtdrag-raderna ur körning 39548656562 (21 okt), sammanfogade i sidans ordning.
    const ZT = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const t = readFileSync(new URL('./fixtures/narvaro/zoom-2026-10-21.txt', import.meta.url), 'utf8');
    assert.deepEqual(marken(zoomUtfall(ZT, t).checks), ['gron', 'gron']);

    const hojd = zoomUtfall(ZT, byt(t, '14,16$', '15,16$')).checks;
    assert.deepEqual(marken(hojd), ['drift', 'gron']);
    assert.equal(hojd[0].actual, '15.16 USD');

    // Månadsläget och tilläggsprodukterna («22 $ 16,50 $ 1 per månad · faktureras månadsvis») är aldrig årspriset.
    assert.deepEqual(marken(zoomUtfall(ZT, byt(t, 'Faktureras årsvis', 'Faktureras månadsvis')).checks), ['olasbar', 'olasbar']);
    // «Allt i Workplace Pro, plus:» på Business-kortet är ingen rubrik för Pro.
    assert.deepEqual(marken(zoomUtfall(ZT, byt(t, 'Pro\nBäst för personligt bruk', 'Pro\nFör personligt bruk')).checks), ['olasbar', 'gron']);
    // Två kort för samma plan med olika tal: inget val.
    assert.equal(marke(zoomUtfall(ZT, `${t}\nWorkplace\nPro\nBäst för team.\n15,00$\n/användare per månad · Faktureras årsvis`).checks[0]), 'olasbar');

    // Augustis form, ur recon-kommentaren i lib/verifiers/zoom.mjs (där «·» mellan namnen var kommentarens).
    const augusti = 'Workplace Pro Bäst för personligt bruk … $14.16 /användare per månad · Faktureras årsvis '
      + 'Workplace Affärsverksamhet Bäst för större team … $18.33 /användare per månad · Faktureras årsvis';
    assert.deepEqual(marken(zoomUtfall(ZT, augusti).checks), ['gron', 'gron']);
  });

  test('NV-07 · talSv läser svenska priser oavsett mellanslag i tusentalet', () => {
    assert.equal(talSv('1 091,00'), 1091);
    assert.equal(talSv('1\u00A0091,00'), 1091);
    assert.equal(talSv('1\u202F091,00'), 1091);
    assert.equal(talSv('1,85'), 1.85);
    assert.equal(talSv('209'), 209);
    assert.equal(talSv('ett pris'), null);
    // Motprov: sidtexten här bär redan ett tal över 1 000, och vakten läser det som ett tal.
    assert.equal(bedomVerifierarutfall({ checks: adobeChecks(AV, { teamText: sida('adobe-team'), psText: sida('adobe-photoshop') }) }).utfall, 'gron');
  });
});
