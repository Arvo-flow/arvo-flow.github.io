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
// BLIND: extraktionen (fakturans rader är författade, inte lästa ur en riktig leverantörs-PDF); rummets
//   uppdelning före berikaRader är speglad ur api/invoice-history.mjs (rad 152–183), inte anropad;
//   svarsmejlets kort är speglat ur api/inbound-email.mjs (rad 757–766); aktiveringsmejlet byggs i
//   klienten och prövas inte här (det läser `lage`, som FV-A3 prövar). Spegelfallet (mobil som
//   sekundär del på en bredbandsfaktura) ingår inte: det är steg S6.
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOBILFALL, MOTPROV, it8821, BREDBANDSRAD } from './fakturakedjan/fall.mjs';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
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
  const alla = [...MOBILFALL, ...MOTPROV];
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
      // … och den får aldrig stå där fakturan inte bär en bredbandsrad (oberoende av koden).
      const finnsBb = ex.lineItems.some((l) => !l.is_addon && BREDBANDSRAD.test(l.description));
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

  test('FV-M1 · MOTPROV: bredbandsfakturan och IT-8821 behåller sina byten med samma tal', () => {
    const ut = UT;
    const bb = ut.get('motprov·bredband');
    assert.equal(bb.kategori, 'bredband', 'motprovet kategoriserades inte som bredband');
    assert.equal(bb.rek.shouldSwitch, true, `bredband: ${JSON.stringify(bb.rek)}`);
    assert.equal(bb.rek.grossSaving, 4560, '699 kr/mån × 12 mot Tele2:s 319 kr/mån × 12 för 1000 Mbit');
    assert.equal(bb.lage?.harByte, true);
    assert.equal(bb.rad?.should_switch, true);
    const it = ut.get('motprov·it8821');
    assert.equal(it.kategori, 'saas-productivity');
    assert.equal(it.rek.shouldSwitch, true, `IT-8821: ${JSON.stringify(it.rek)}`);
    assert.equal(it.rek.netSaving, it8821.expected.netSaving);
    assert.equal(it.rad?.should_switch, true);
    assert.equal(it.rum?.rum?.hasSwitchAction, true, 'IT-8821: rummet tappade bytet');
  });
});
