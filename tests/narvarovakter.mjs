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
import { talSv, DOLLARBELOPP, dollarRader } from '../lib/verifiers/core.mjs';
import { fortnoxChecks } from '../lib/verifiers/fortnox.mjs';
import { spirisChecks } from '../lib/verifiers/spiris.mjs';
import kortterminalVakt, { kortterminalCheck, kortterminalFastCheck, kortterminalChecks } from '../lib/verifiers/kortterminal.mjs';
import tele2BredbandVakt, { produktrad } from '../lib/verifiers/tele2-bredband.mjs';
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

    // Bokföring delar priset 189 med Integration och Enkel: bara Bokföringsraden är Bokföring (V85-B1).
    const bok = fortnoxChecks(FV, byt(t, 'Bokföring 189 kr/mån', 'Bokföring 199 kr/mån'));
    assert.deepEqual(marken(bok), ['gron', 'gron', 'gron', 'gron', 'drift']);
    assert.equal(bok[4].actual, '199 kr');
    const bokGrannar = byt(byt(t, 'Integration 189 kr/mån', 'Integration 209 kr/mån'), 'Enkel 189 kr/mån', 'Enkel 209 kr/mån');
    assert.deepEqual(marken(fortnoxChecks(FV, bokGrannar)), ['gron', 'gron', 'gron', 'gron', 'gron'], 'Integration och Enkel är inte Bokföring');

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

    // Ett vittne räcker inte: går tabellen inte att läsa står kortet ensamt, och då är talet okänt (V85-S1).
    const utanTabell = spirisChecks(SV, byt(t, 'Driva 349 kr/mån Köp', 'Driva 349 kr/mån (exkl. moms) Köp'));
    assert.deepEqual(marken(utanTabell), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'gron']);

    const lon = spirisChecks(SV, byt(t, 'anställda. 299 kr/mån 299 kr/mån 299 kr/mån', 'anställda. 319 kr/mån 319 kr/mån 319 kr/mån'));
    assert.equal(marke(lon[4]), 'olasbar', 'en av tabellens rader säger fortfarande 299 — inget val');

    assert.deepEqual(marken(spirisChecks(SV, 'Kontakta oss')), ['olasbar', 'olasbar', 'olasbar', 'olasbar', 'olasbar']);
  });

  test('NV-03 · Kortterminal: Stripes EES-rate och Zettles korttransaktionsavgift läses på sina platser', async () => {
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

    // Stripes fasta avgift står i samma mening och läses ur samma träff (V85-K1); Zettle trycker ingen.
    assert.equal(marke(kortterminalFastCheck(stripe, st)), 'gron');
    const fastHojd = byt(st, '1,4 % + 1,00 kr per genomförd debitering för EES-kort', '1,4 % + 1,50 kr per genomförd debitering för EES-kort');
    assert.equal(marke(kortterminalFastCheck(stripe, fastHojd)), 'drift');
    assert.equal(kortterminalFastCheck(stripe, fastHojd).actual, '1.5 kr');
    assert.equal(marke(kortterminalCheck(stripe, fastHojd)), 'gron', 'raten står kvar när bara den fasta avgiften ändras');
    assert.equal(kortterminalFastCheck(zettle, ze), null);
    assert.equal(marke(kortterminalFastCheck(stripe, 'Kontakta säljavdelningen')), 'olasbar');
    // Det run() lägger i fabrikens utfall: Stripe bär två checkar, Zettle en.
    assert.deepEqual(marken(kortterminalChecks(stripe, fastHojd)), ['gron', 'drift']);
    assert.deepEqual(marken(kortterminalChecks(zettle, ze)), ['gron']);
    // Den riktiga run(), med sidtexterna injicerade (V-2, L-5): varje leverantör bär sina checkar, och
    // Stripes fasta avgift når fabrikens utfall.
    const texter = new Map([[stripe.url, fastHojd], [zettle.url, ze]]);
    const utfall = await kortterminalVakt.run({ lasSida: async (url) => texter.get(url) ?? '' });
    const fast = utfall.checks.find((c) => /fast avgift/.test(c.name) && c.name.startsWith('Stripe'));
    assert.ok(fast, 'Stripes fasta check saknas i run():s utfall');
    assert.equal(marke(fast), 'drift');
    assert.equal(utfall.checks.length, RATES.reduce((n, r) => n + kortterminalChecks(r, texter.get(r.url) ?? '').length, 0));
    assert.ok(utfall.notes.some((n) => n.startsWith('Stripe Terminal: ')), 'run():s logg bär Stripe');
    // Motprov: utan höjningen är Stripes fasta check grön i run():s utfall.
    const lugn = await kortterminalVakt.run({ lasSida: async (url) => (url === stripe.url ? st : url === zettle.url ? ze : '') });
    assert.equal(marke(lugn.checks.find((c) => /fast avgift/.test(c.name) && c.name.startsWith('Stripe'))), 'gron');
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

    // Ankaret «för varje anställd» bär per-anställd-priset: en avgift per lönebesked är ett annat tal (V85-L1).
    // Bytet når varje rad i fixturen, även den som är avklippt vid «för varje ans». Annars ger raderna
    // två olika tal, och OLÄSBAR kommer av tvetydigheten i stället för av ankaret.
    const besked = byt(t, '25 kr/mån för varje ans', '5 kr/mån per lönebesked, ans');
    assert.ok(!besked.includes('för varje anställd'), 'fixturen bär fortfarande ankaret');
    assert.deepEqual(marken(fortnoxLonChecks(LV, besked)), ['olasbar', 'olasbar']);

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

    // T2 läses på sitt eget kort (V85-T1). Slutar T1:s kampanj samtidigt som T2 får en är T1:s från-pris
    // sidans enda, och det är inte T2:s.
    const bytt = byt(byt(t, 'Pris från: 118 kr/mån', 'Pris just nu: 99 kr/mån'), 'Pris just nu: 49 kr/mån', 'Pris från: 89 kr/mån');
    assert.equal(marke(t2(bytt)), 'olasbar', 'T1:s från-pris lästes som T2:s');
    assert.equal(marke(t2(`${t}\nPris från: 89 kr/mån`)), 'gron', 'ett från-pris utanför T2:s kort är grannens');
    assert.equal(marke(t2(`${t}\nmed lokalt nummer. Pris från: 89 kr/mån`)), 'olasbar', 'två från-priser på T2:s kort — vilket gäller?');
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

    // Individpriserna momsrensas ÷1,25 i koden, så «inkl. moms» bär talet: utan det är det okänt (V85-A1).
    const psExkl = byt(psText, 'Photoshop 311,25 SEK/måninkl. moms', 'Photoshop 311,25 SEK/månexkl. moms');
    assert.equal(marke(adobeChecks(AV, { teamText, psText: psExkl })[2]), 'olasbar', 'okänd momsbas är okänt, aldrig drift');

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
    // Sondens egen avläsning (dollarRader), inte bara mönstret (T85-5): talen, och kontexten runt dem.
    const rader = dollarRader(sidtext);
    assert.deepEqual(rader.map((r) => r.tal), ['14,16', '18,33', '22', '20']);
    assert.match(rader[0].fore, /Workplace ¶ Pro ¶ Bäst för/);
    assert.match(rader[0].efter, /Faktureras årsvis/);
    assert.deepEqual(dollarRader('Kontakta oss'), []);
    // Utdragen ska nå fabrikens logg (notes), inte bara finnas som funktion.
    const utfall = zoomUtfall(BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, sidtext);
    assert.ok(utfall.notes.some((r) => r.startsWith('planer: ') && r.includes('Workplace')), 'planutdraget når inte loggen');
    assert.equal(utfall.checks.length, 2);
  });

  test('NV-09 · Zoom: årspriset läses under kortets rubrik, i dagens form «14,16$» och augustis «$14.16»', () => {
    // Fixturen är ett URVAL av kontextUtdrag-raderna ur körning 39548656562 (21 okt), i sidans ordning.
    // Sju rader ur ett planutdrag och tre dollarutdrag är utelämnade (tredje blicken T85-8); rad 1–39
    // stämmer tecken för tecken med loggen, och utelämningen ändrar inte läsarens dom.
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
    // Ett kort utan pris med grannkortet nära: gapet får inte passera nästa «Workplace» (T85-3). Utan
    // spärren blev Pro DRIFT med Business-kortets 18,33.
    const utanPris = 'Workplace Pro Bäst för små team. Workplace Affärsverksamhet Bäst för team. '
      + '18,33$ /användare per månad · Faktureras årsvis';
    assert.deepEqual(marken(zoomUtfall(ZT, utanPris).checks), ['olasbar', 'gron']);
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

  test('NV-10 · Tele2-bredbandsvakten skriver ut hela erbjudandet per adress, inte bara avvikelserna', async () => {
    // Andra blicken på uppföljningen efter PR #85 (V-1): loggen sa bara «standard 500 Östersund: 455 · 399»
    // och kunde inte visa om priset ändrats eller om produkten var ny på adressen.
    const rad = produktrad([
      { family: 'Standard', downMbps: 500, monthlyExcVat: 399, bindingMonths: 12 },
      { family: 'Max', downMbps: 1200, monthlyExcVat: 319, bindingMonths: 12 },
      { family: 'Max', downMbps: 250, monthlyExcVat: 239, bindingMonths: 12 },
    ]);
    assert.equal(rad, 'Max 250 239 kr (12 mån) · Max 1200 319 kr (12 mån) · Standard 500 399 kr (12 mån)');
    assert.equal(produktrad([]), '');
    // Den riktiga run(), med Tele2:s svar injicerat (L-6): en produktrad per adress, och Östersunds 399
    // blir DRIFT. Förut prövade testet en regex mot källtexten, som en död gren lurade.
    const tv = BRANCHINDEX.bredband.tele2Verified;
    const bok = (fam, sp) => ({ family: fam === 'max' ? 'Max' : 'Standard', downMbps: sp, monthlyExcVat: tv[fam][sp], bindingMonths: 12 });
    const svar = (addr) => ({ address: addr.toUpperCase(), products: [bok('max', 1200), bok('standard', 1000), addr.includes('Östersund') ? { ...bok('standard', 500), monthlyExcVat: 399 } : bok('standard', 500)] });
    const utfall = await tele2BredbandVakt.run({ hamta: async (addr) => svar(addr) });
    for (const addr of tv.verifyAddresses) {
      assert.ok(utfall.notes.includes(`${addr.toUpperCase()}: ${produktrad(svar(addr).products)}`), `ingen produktrad för ${addr}`);
    }
    const drift = utfall.checks.filter((c) => !c.ok);
    assert.equal(drift.length, 1, JSON.stringify(drift));
    assert.match(drift[0].name, /standard 500 \(STORGATAN 41F, ÖSTERSUND\)/i);
    // Motprov: utan avvikelsen är varje check grön.
    const lugn = await tele2BredbandVakt.run({ hamta: async (addr) => ({ address: addr, products: [bok('max', 1200), bok('standard', 1000)] }) });
    assert.equal(lugn.checks.filter((c) => !c.ok).length, 0);
  });
});
