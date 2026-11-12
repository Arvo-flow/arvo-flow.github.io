// tests/fakturakedjan.mjs — FV · instrument A: hela fakturakedjan med bara nätverket stubbat.
//
// Påståendet som prövas (ops/KORPLAN-VAG1.md, S1): en faktura vars kategori har
// `bytesmalMotKategorigolv` i prisboken (i dag mobil) får inget byte, inget procentuellt avstånd och
// ingen poäng — i fakturasvaret, den lagrade raden, rummet eller något mejl — oavsett vad modellen
// svarar, om antalet är avläst och om fakturan också bär bredband. Motprovet hör till påståendet: en
// bredbandsfaktura och en M365-faktura behåller sina byten med samma tal som förut.
//
// Varför ett eget instrument: sex granskningsvarv på c1 fann fel som enhetstesterna inte kunde se,
// eftersom de matade recommend() eller rummet direkt. Felen satt i sömmarna: modellens nej som aldrig
// nådde grinden, sekundärvägen i api/test-invoice.mjs och poängen i fakturans läge. Här körs handlern
// själv (tests/fakturakedjan/kor.mjs) i en barnprocess, med de fyra nätverkspaketen utbytta genom en
// laddarkrok, och rummet och mejlen byggs ur exakt det som lagrades och svarades.
//
// FÅNGAR: ett mobilbyte, ett mobilavstånd eller en mobilpoäng som når svaret, raden, rummet eller mejlen
//   på någon väg i matrisen (kombinerad faktura × modellens ja/nej × antal avläst/inte); ett motprov som
//   tappar sitt byte.
// BLIND: extraktionen (fakturans rader är författade, inte lästa ur en riktig leverantörs-PDF);
//   aktiveringsmejlets fält sätts i klienten (TestaFaktura handleActivate) och är speglade i
//   kor.mjs, medan mejlet byggs av endpointens egen funktion (FV-A11); de lagrade raderna i FV-L är
//   författade i den form koden före S1 lagrade, inte lästa ur produktionen. Spegelfallet (mobil som
//   sekundär del på en bredbandsfaktura) ingår inte: det är steg S6.
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOBILFALL, MOTPROV, FYNDFALL, it8821, BREDBANDSRAD } from './fakturakedjan/fall.mjs';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { PLANVAL_BESKED } from '../lib/lagesregister.js';
import { PLANVALS_MENING } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Körningen: matrisen delas på fyra barnprocesser som kör samtidigt ────────────────────────────
// En process per del håller stubbarna borta från resten av sviten, och fyra delar håller tiden nere
// (en process för hela matrisen tog 45 s den 11 nov).
const DELAR = 4;
let UT = null;
function korDel(fall, dir, nr) {
  const fil = join(dir, `fall-${nr}.json`);
  writeFileSync(fil, JSON.stringify(fall));
  return new Promise((resolve, reject) => {
    const barn = spawn(process.execPath, ['--import', './tests/fakturakedjan/register.mjs',
      'tests/fakturakedjan/kor.mjs', fil], { cwd: ROT });
    let ut = ''; let fel = '';
    barn.stdout.on('data', (d) => { ut += d; });
    barn.stderr.on('data', (d) => { fel = (fel + d).slice(-4000); });
    const klocka = setTimeout(() => barn.kill('SIGKILL'), 600_000);
    barn.on('close', (kod) => {
      clearTimeout(klocka);
      const rad = ut.split('\n').find((l) => l.startsWith('FAKTURAKEDJAN:'));
      if (!rad) return reject(new Error(`del ${nr} gav ingen utdata (exit ${kod}): ${fel.split('\n').slice(-12).join('\n')}`));
      resolve(JSON.parse(rad.slice('FAKTURAKEDJAN:'.length)));
    });
  });
}
async function korAlla() {
  if (UT) return UT;
  const dir = mkdtempSync(join(tmpdir(), 'fakturakedjan-'));
  const alla = [...MOBILFALL, ...MOTPROV, ...FYNDFALL];
  const delar = Array.from({ length: DELAR }, (_, i) => alla.filter((_, j) => j % DELAR === i));
  const svar = await Promise.all(delar.map((d, i) => korDel(d, dir, i)));
  UT = new Map(svar.flat().map((u) => [u.id, u]));
  return UT;
}

/** Varje fall som bröt en invariant, med skälet. En tom lista är det gröna. */
function brott(ids, prova) {
  const ut = UT;
  const fel = [];
  for (const id of ids) {
    const u = ut.get(id);
    if (!u) { fel.push(`${id}: saknas i utdata`); continue; }
    if (u.kraschade) { fel.push(`${id}: kraschade ${u.kraschade}`); continue; }
    const skal = prova(u);
    if (skal) fel.push(`${id}: ${skal}`);
  }
  return fel;
}
const visa = (fel) => `${fel.length} fall:\n  ${fel.slice(0, 12).join('\n  ')}${fel.length > 12 ? `\n  … och ${fel.length - 12} till` : ''}`;
const ALLA_MOBIL_IDS = MOBILFALL.map((f) => f.id);
// Påståendet gäller fakturor som kategoriserats som mobil. Ett fall som kategoriserats som något annat
// (en bredbandstung faktura) är spegelfallet, steg S6; FV-00 räknar dem och kräver att de är få.
let MOBIL_IDS = ALLA_MOBIL_IDS;
const PROCENT_MER = /\d+\s?%\s?(mer|över|dyrare)/i;

describe('FV · fakturakedjan, hela handlern med stubbat nätverk (S1)', () => {
  before(async () => {
    const ut = await korAlla();
    MOBIL_IDS = ALLA_MOBIL_IDS.filter((id) => ut.get(id)?.kategori === 'mobil');
  });

  test('FV-00 · instrumentet kör: varje fall gav ett svar, premissen bär, och motproven prissätts', () => {
    assert.equal(BRANCHINDEX.mobil.bytesmalMotKategorigolv, true, 'premissen: mobil bär deklarationen');
    assert.ok(MOBIL_IDS.length >= 150, `för få fall kategoriserades som mobil: ${MOBIL_IDS.length} av ${ALLA_MOBIL_IDS.length}`);
    const fel = brott([...ALLA_MOBIL_IDS, ...MOTPROV.map((m) => m.id)], (u) => (u.status !== 200 || u.ok !== true
      ? `status ${u.status}, ok ${u.ok}, fel ${u.fel}` : null));
    assert.deepEqual(fel, [], visa(fel));
    const kombMedDel = MOBILFALL.filter((f) => MOBIL_IDS.includes(f.id) && f.extraktion.potential_mixed_categories);
    assert.ok(kombMedDel.length >= 120, `för få kombinerade fall: ${kombMedDel.length}`);
  });

  test('FV-A1 · inget bytesbeslut på en mobilfaktura, oavsett modellens svar och antalet', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      const r = u.rek;
      if (u.route !== 'auto') return null;   // en granskad faktura bär inget beslut alls
      if (r.shouldSwitch !== false) return `shouldSwitch ${r.shouldSwitch}`;
      if ((r.savingPerYear ?? 0) !== 0) return `savingPerYear ${r.savingPerYear}`;
      if (r.suggestedAnnualCost != null) return `suggestedAnnualCost ${r.suggestedAnnualCost}`;
      if (r.suggestedSupplier != null) return `suggestedSupplier ${r.suggestedSupplier}`;
      if (r.recommendationType !== 'no_action') return `recommendationType ${r.recommendationType}`;
      // Grindens skäl serialiseras inte i svaret; dess loggrad är avläsningen av att den slog till.
      if (!u.loggar.some((l) => l.includes('[planvalsgrind]'))) return 'planvalsgrinden slog inte till';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A2 · ingen sekundär besparing och ingen sekundärväg på en mobilfaktura', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      if (u.sekundar) return `sekundär besparing ${u.sekundar.grossSaving} (${u.sekundar.category})`;
      if ((u.rek.grossSaving ?? 0) !== 0) return `grossSaving ${u.rek.grossSaving}`;
      if ((u.rek.netSaving ?? 0) !== 0) return `netSaving ${u.rek.netSaving}`;
      if (u.loggar.some((l) => l.includes('[secondary-override]'))) return 'sekundärvägen slog till';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A3 · fakturans läge mäter inget och sätter ingen poäng på en mobilfaktura', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      const l = u.lage;
      if (!l) return null;
      if (l.matt !== false) return `lage.matt ${l.matt} (poäng ${l.score}, ${l.ovPct} %)`;
      if (l.score != null) return `lage.score ${l.score}`;
      if (l.etikett != null) return `lage.etikett ${l.etikett}`;
      if (l.harByte !== false) return 'lage.harByte';
      if (u.route === 'auto' && l.rubrik !== 'planval') return `lage.rubrik ${l.rubrik}`;
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A4 · kunden får planvalsmeningen ordagrant, och bredbandsmeningen bara där en bredbandsdel lästs', () => {
    const MENING_BB = 'Bredbandet på samma faktura har vi inte prissatt i den här analysen.';
    const fel = brott(MOBIL_IDS, (u) => {
      if (u.route !== 'auto') return null;
      const r = u.rek.reasoning ?? '';
      if (!r.startsWith(PLANVALS_MENING)) return `texten börjar inte med planvalsmeningen: «${r.slice(0, 90)}»`;
      const rest = r.slice(PLANVALS_MENING.length).trim();
      const ex = MOBILFALL.find((f) => f.id === u.id).extraktion;
      // Meningen följer kodens egen avläsning av en bredbandsdel (samma som sekundärvägen gjorde) …
      const lastBb = (computeInvoiceMetrics(ex.lineItems, 'mobil', ex.potential_mixed_categories)
        .secondaryComponentMonthly ?? 0) > 0;
      // … och den får aldrig stå där fakturan inte bär en bredbandsrad (oberoende av koden). En rad som
      // extraktionen märkt som tillägg räknas också: «Fiber 500 Mbit» är bredband på fakturan (comb-47).
      const finnsBb = ex.lineItems.some((l) => BREDBANDSRAD.test(l.description));
      if (lastBb && rest !== MENING_BB) return `bredbandsdelen: «${rest}»`;
      if (!lastBb && rest !== '') return `mening utan läst bredbandsdel: «${rest}»`;
      if (rest !== '' && !finnsBb) return 'bredbandsmeningen på en faktura utan bredbandsrad';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A5 · den lagrade raden bär inget bytestal, ingen besparing och ingen poäng', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      const r = u.rad;
      if (!r) return 'ingen rad lagrades';
      if (r.should_switch === true) return 'should_switch true';
      if ((r.gross_saving ?? 0) !== 0) return `gross_saving ${r.gross_saving}`;
      if ((r.net_saving ?? 0) !== 0) return `net_saving ${r.net_saving}`;
      if (r.suggested_annual_cost != null) return `suggested_annual_cost ${r.suggested_annual_cost}`;
      if (r.health_score != null) return `health_score ${r.health_score}`;
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A6 · rummet byggt ur raden visar inget byte, inget procenttal och ingen poäng', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      if (!u.rum || u.rum.bevakad) return null;
      const rum = u.rum.rum;
      if (rum.score != null) return `rummets poäng ${rum.score}`;
      if (rum.hasSwitchAction) return 'rummet har en bytesåtgärd';
      if ((rum.totalSaving ?? 0) !== 0) return `rummets besparing ${rum.totalSaving}`;
      for (const rd of u.rum.rader) {
        if (rd.arvoScore != null) return `radens poäng ${rd.arvoScore}`;
        if (rd.should_switch === true) return 'raden visar ett byte';
        if (rd.lage?.kod === 'byte' || rd.lage?.kod === 'byte_omatt') return `radens läge ${rd.lage.kod}`;
        if (rd.lage?.ovPct != null) return `radens procent ${rd.lage.ovPct}`;
        if (PROCENT_MER.test(rd.motivering ?? '')) return `radtexten: «${rd.motivering}»`;
      }
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A7 · mejlen ur samma svar bär inget byte, inget procenttal och ingen besparing', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      const m = u.mejl;
      if (!m) return null;
      if (m.analysLage?.harByte) return 'analysmejlet: harByte';
      if (m.analysLage?.matt) return 'analysmejlet: mätt läge';
      if (PROCENT_MER.test(m.analys)) return `analysmejlet: «${m.analys.match(PROCENT_MER)[0]}»`;
      if (/nettobesparing|spara\s+[\d\s]+\s?kr/i.test(m.svarAmne)) return `svarsmejlets ämne: «${m.svarAmne}»`;
      if (/[\d\s]{3,}\s?kr\/år/i.test(m.svar) && /besparing/i.test(m.svar)) return 'svarsmejlet bär en besparing';
      // Priset finns, produkten är okänd: mejlen får aldrig säga att ett verifierat pris saknas.
      if (/inget verifierat (jämförelse)?pris/i.test(m.analys)) return 'analysmejlet: «inget verifierat … pris»';
      if (/inget verifierat (jämförelse)?pris/i.test(m.svar)) return 'svarsmejlet: «inget verifierat … pris»';
      if (u.route === 'auto' && !m.analys.includes(PLANVAL_BESKED.text)) return 'analysmejlet saknar planvalsbeskedet';
      if (u.route === 'auto' && !m.svar.includes('vi vet inte vilken produkt ni har')) return 'svarsmejlet saknar planvalsbeskedet';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A8 · samma analys ger samma dom i svaret, raden och rummet', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      const iSvaret = u.rek.shouldSwitch === true || u.lage?.harByte === true || u.lage?.score != null;
      const iRaden = u.rad?.should_switch === true || u.rad?.health_score != null;
      const iRummet = u.rum && !u.rum.bevakad && (u.rum.rum.hasSwitchAction || u.rum.rum.score != null);
      return (iSvaret || iRaden || iRummet) && !(iSvaret && iRaden && iRummet)
        ? `svaret ${iSvaret}, raden ${iRaden}, rummet ${iRummet}` : null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A9 · fakturavyns rubrik och mejlens besked är samma mening, och motprovet behåller sitt', async () => {
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    assert.equal(ANALYSRUBRIKER.planval.rubrik, PLANVAL_BESKED.rubrik, 'fakturavyn och mejlen säger olika');
    assert.equal(ANALYSRUBRIKER.planval.text, PLANVAL_BESKED.text, 'fakturavyn och mejlen säger olika');
    assert.equal(ANALYSRUBRIKER.planval.positivtPastaende, false);
    const bb = UT.get('motprov·bredband');
    assert.notEqual(bb.lage?.rubrik, 'planval', 'motprov: en bredbandsfaktura fick planvalsrubriken');
    assert.ok(!bb.mejl.analys.includes(PLANVAL_BESKED.text), 'motprov: analysmejlet för bredband bär planvalsbeskedet');
  });

  test('FV-A10 · sidrubriken säger «Ni betalar för mycket» bara före ett resultat och över ett byte (Q-7)', async () => {
    const { sidrubrik, SIDRUBRIK } = await import('../src/lib/diagnos.js');
    assert.equal(sidrubrik(null), SIDRUBRIK.erbjudande, 'före ett resultat: sidans erbjudande');
    const fel = brott(MOBIL_IDS, (u) => (u.route === 'auto' && sidrubrik({ lage: u.lage }) !== SIDRUBRIK.utanByte
      ? `rubriken «${sidrubrik({ lage: u.lage }).rubrik}»` : null));
    assert.deepEqual(fel, [], visa(fel));
    assert.equal(sidrubrik({ lage: UT.get('motprov·bredband').lage }), SIDRUBRIK.erbjudande, 'motprov: bredbandsbytet');
    assert.doesNotMatch(`${SIDRUBRIK.utanByte.rubrik} ${SIDRUBRIK.utanByte.lede}`, /för mycket|spara|besparing/i);
    const vy = readFileSync(join(ROT, 'src/pages/TestaFaktura/index.js'), 'utf8');
    assert.match(vy, /const _sidrubrik {2}= sidrubrik\(result\);/);
    assert.doesNotMatch(vy, /<Headline>Ni betalar för mycket/, 'rubriken står hårdkodad i vyn');
  });

  test('FV-A11 · aktiveringsmejlet och beräkningsunderlaget bär ingen besparing och säger inte att ett pris saknas', () => {
    const fel = brott(MOBIL_IDS, (u) => {
      if (u.route === 'auto' && u.berakningsunderlag != null) {
        return `beräkningsunderlaget: netto ${u.berakningsunderlag.netSaving?.value}`;
      }
      const m = u.mejl;
      if (!m) return null;
      if (/nettobesparing|arvode/i.test(m.aktivering)) return 'aktiveringsmejlet bär besparingsrutan';
      if (/\+\s?0\s?kr/.test(m.aktivering)) return 'aktiveringsmejlet: «+0 kr»';
      if (PROCENT_MER.test(m.aktivering)) return `aktiveringsmejlet: «${m.aktivering.match(PROCENT_MER)[0]}»`;
      if (/inget verifierat (jämförelse)?pris/i.test(m.aktivering)) return 'aktiveringsmejlet: «inget verifierat … pris»';
      if (/\d+\s?\/100/.test(m.aktivering)) return 'aktiveringsmejlet bär en poäng';
      if (u.route === 'auto' && !m.aktivering.includes(PLANVAL_BESKED.skal)) return 'aktiveringsmejlet saknar planvalsskälet';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('FV-A12 · planvalsbeskedet gäller produkterna och säger inget om ett fynd på samma faktura (K-2)', () => {
    // Premissen: handlern räknar ett fynd i kronor ur kundens egna rader på en mobilfaktura, och fakturans läge
    // är ändå planval. Annars prövar testet ingenting.
    for (const f of FYNDFALL) {
      const u = UT.get(f.id);
      assert.equal(u.kraschade, undefined, `${f.id}: ${u.kraschade}`);
      assert.equal(u.lage?.rubrik, 'planval', `${f.id}: rubriken ${u.lage?.rubrik}`);
      assert.ok(u.fynd, `${f.id}: inget fynd, så testet prövar ingenting`);
    }
    // Meningen avgränsar sig till produkterna; «Därför räknar vi ingen besparing» om sidan stod under fyndet.
    for (const t of [PLANVAL_BESKED.text, PLANVAL_BESKED.skal]) {
      assert.doesNotMatch(t, /ingen besparing(?! på dem)/, `«${t}»`);
    }
    assert.match(PLANVAL_BESKED.text, /räknar ingen besparing på dem\.$/);
    for (const f of FYNDFALL) assert.ok(UT.get(f.id).mejl.analys.includes(PLANVAL_BESKED.text), `${f.id}: analysmejlet`);
  });

  test('FV-M1 · MOTPROV: bredbandsfakturan och IT-8821 behåller sina byten med samma tal', () => {
    const ut = UT;
    const bb = ut.get('motprov·bredband');
    assert.equal(bb.kategori, 'bredband', 'motprovet kategoriserades inte som bredband');
    assert.equal(bb.rek.shouldSwitch, true, `bredband: ${JSON.stringify(bb.rek)}`);
    assert.equal(bb.rek.grossSaving, 4560, '699 kr/mån × 12 mot Tele2:s 319 kr/mån × 12 för 1000 Mbit');
    assert.equal(bb.lage?.harByte, true);
    assert.equal(bb.rad?.should_switch, true);
    // Besparingsrutan och underlaget står kvar över ett byte (motprovet till FV-A11).
    assert.equal(bb.berakningsunderlag?.netSaving?.value, bb.rek.netSaving, 'bredband: beräkningsunderlaget föll bort');
    assert.match(bb.mejl.aktivering, /Möjlig nettobesparing \+3\s648/, 'bredband: aktiveringsmejlet tappade bytet');
    const it = ut.get('motprov·it8821');
    assert.equal(it.kategori, 'saas-productivity');
    assert.equal(it.rek.shouldSwitch, true, `IT-8821: ${JSON.stringify(it.rek)}`);
    assert.equal(it.rek.netSaving, it8821.expected.netSaving);
    assert.equal(it.rad?.should_switch, true);
    assert.equal(it.rum?.rum?.hasSwitchAction, true, 'IT-8821: rummet tappade bytet');
  });
});

// ── FV-L · de lagrade raderna: ett mobilbyte som koden före S1 lagrade ──────────────────────────
// Rummet håller inne ett sådant byte (MS-08). Avtalspåminnelsen, utfallsenkäten och briefen läste förut
// raden rå och skrev «7 680 kr/år» och «Räknat mot verifierat publikt listpris» (tests/fakturakedjan/lagrade.mjs).
const LAGRAD = {
  supplier: 'Tele2 Sverige AB', normalized_supplier: 'Tele2', annual_cost: 41880, suggested_annual_cost: 32280,
  gross_saving: 9600, net_saving: 7680, should_switch: true, route: 'auto', industry: 'konsult', employees: 10,
  billing_period: 'monthly', seat_count: 10, price_per_seat_monthly: 349, lead_finding_json: null, health_score: 59,
  triage_reason: null, contract_terms_json: null, invoice_number: null, rattstorlek_json: null, arkiverad_at: null,
  uppsagning_json: { uppsagningstidMan: 1 }, user_email: 'kund@exempel.se', deadline_reminder_json: null,
};
const LAGRADE_RADER = [
  { ...LAGRAD, id: 4711, category: 'mobil',
    line_items_json: [{ description: 'Tele2 Jobbmobil XL (10 st)', amount: 3490, quantity: 10, type: 'recurring_subscription' }] },
  // En rad med nettobelopp men utan bytesflagga: enkäten och påminnelsen läste förut bara beloppet.
  { ...LAGRAD, id: 4712, category: 'mobil', should_switch: false,
    line_items_json: [{ description: 'Tele2 Jobbmobil XL (10 st)', amount: 3490, quantity: 10, type: 'recurring_subscription' }] },
  // Motprovet: samma rad som bredband behåller sitt byte i alla fyra ytor.
  { ...LAGRAD, id: 4713, category: 'bredband',
    line_items_json: [{ description: 'Företagsbredband Fiber 1000/1000', amount: 3490, quantity: 1, type: 'recurring_subscription' }] },
];

function korLagrade() {
  const dir = mkdtempSync(join(tmpdir(), 'fakturakedjan-lagrade-'));
  const fil = join(dir, 'rader.json');
  writeFileSync(fil, JSON.stringify(LAGRADE_RADER));
  return new Promise((resolve, reject) => {
    const barn = spawn(process.execPath, ['--import', './tests/fakturakedjan/register.mjs',
      'tests/fakturakedjan/lagrade.mjs', fil], { cwd: ROT });
    let ut = ''; let fel = '';
    barn.stdout.on('data', (d) => { ut += d; });
    barn.stderr.on('data', (d) => { fel = (fel + d).slice(-4000); });
    barn.on('close', (kod) => {
      const rad = ut.split('\n').find((l) => l.startsWith('LAGRADE:'));
      if (!rad) return reject(new Error(`de lagrade raderna gav ingen utdata (exit ${kod}): ${fel.split('\n').slice(-12).join('\n')}`));
      resolve(new Map(JSON.parse(rad.slice('LAGRADE:'.length)).map((u) => [u.id, u])));
    });
  });
}

describe('FV-L · lagrade mobilbyten i ytorna som läser raden (S1)', () => {
  let L = null;
  before(async () => { L = await korLagrade(); });
  const BELOPP = /7\s680/;

  test('LB-00 · instrumentet kör: varje rad gav rummet, båda mejlen och briefen', () => {
    for (const [id, u] of L) {
      assert.equal(u.kraschade, undefined, `${id}: ${u.kraschade}`);
      assert.equal(u.cron.status, 200, `${id}: cron ${u.cron.status} ${u.cron.svar}`);
      assert.equal(u.mejl.length, 2, `${id}: ${u.mejl.map((m) => m.amne).join(' | ')}`);
    }
    // Motprovet visar att instrumentet ser beloppet där det ska stå.
    const bb = L.get(4713);
    assert.equal(bb.rum.hasSwitchAction, true, 'motprov: rummet tappade bredbandsbytet');
    assert.ok(bb.mejl.every((m) => BELOPP.test(m.text)), `motprov: ${bb.mejl.map((m) => m.text.slice(0, 160)).join(' | ')}`);
    assert.ok(bb.briefing.rubriker.some((r) => BELOPP.test(r)), `motprov: briefen ${JSON.stringify(bb.briefing)}`);
  });

  test('LB-01 · avtalspåminnelsen nämner ingen besparing för ett lagrat mobilbyte', () => {
    for (const id of [4711, 4712]) {
      const u = L.get(id);
      assert.equal(u.rum.hasSwitchAction, false, `${id}: rummet visar bytet`);
      const p = u.mejl.find((m) => !/Hände det något/.test(m.amne));
      assert.ok(p, `${id}: ingen påminnelse`);
      assert.doesNotMatch(p.text, /besparing|7\s680/i, `${id}: «${p.text.slice(0, 240)}»`);
    }
  });

  test('LB-02 · utfallsenkäten nämner ingen besparing för ett lagrat mobilbyte', () => {
    for (const id of [4711, 4712]) {
      const e = L.get(id).mejl.find((m) => /Hände det något/.test(m.amne));
      assert.ok(e, `${id}: ingen enkät`);
      assert.doesNotMatch(e.text, /besparing|7\s680/i, `${id}: «${e.text.slice(0, 240)}»`);
    }
  });

  test('LB-03 · briefen bär inget mobilbyte och ingen besparing', () => {
    for (const id of [4711, 4712]) {
      const b = L.get(id).briefing;
      assert.ok(!b.rubriker.some((r) => /byte|listpris|7\s680/i.test(r)), `${id}: ${JSON.stringify(b.rubriker)}`);
      assert.ok(!(b.total > 0), `${id}: totalSavingPotential ${b.total}`);
    }
  });

  test('LB-04 · en planvalskategori bär inga nivåpriser, så mejlen kan hålla varje lagrat byte', () => {
    // lagratByte (lib/lagesregister.js) har inget prisunderlag och håller därför varje byte i en
    // planvalskategori. Rummet släpper en rad med bekräftad nivå, och nivågolvet kräver nivåpriser.
    for (const [kat, d] of Object.entries(BRANCHINDEX)) {
      if (d?.bytesmalMotKategorigolv !== true) continue;
      assert.equal(d.licenseTierBenchmarks, undefined, `${kat}: nivåpriser i en planvalskategori; ge mejlen rummets nivåläsning först`);
    }
  });

  test('RU-02 · rummets uppdelning: en rad hamnar i exakt en lista, och en granskningsrutt är alltid bevakad', async () => {
    const { delaRummet } = await import('../api/invoice-history.mjs');
    const rader = [
      { id: 1, route: 'auto', triage_reason: null },
      { id: 2, route: 'review_queue', triage_reason: null },
      { id: 3, route: 'unsupported', triage_reason: null },
      { id: 4, route: 'auto', triage_reason: 'no_benchmark' },
      { id: 5, route: 'monitoring', triage_reason: null },
    ];
    const { triagerade, prissatta } = delaRummet(rader);
    assert.deepEqual(triagerade.map((a) => a.id), [2, 3, 4]);
    assert.deepEqual(prissatta.map((a) => a.id), [1, 5]);
  });
});
