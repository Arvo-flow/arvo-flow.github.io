// tests/rumsmatris.mjs — RM · instrument B: rummets tillståndsmatris.
//
// Påståendet som prövas (ops/KORPLAN-VAG1.md, S1) från rummets sida: en mobilrad bär aldrig byte,
// procenttal eller poäng, och ett rum med en sådan rad sätter ingen samlad poäng och berömmer inte.
// Sex granskningsvarv på c1 hittade fel i rum som ingen hade byggt för hand: en kombinerad rad utan
// antal, ett bevakat avtal med lagrat byte, ett rum med en lönerad bredvid hundra abonnemang. Här byggs
// rummen ur en matris och invarianterna prövas på varje rum, med rummets egna funktioner
// (buildBranchAnchors → berikaRader → byggRum) och rummets egna radtexter (src/lib/rumstext.js).
//
// FÅNGAR: en mobilrad med poäng, procenttal, bytesläge eller bytesbelopp; ett rum som sätter poäng eller
//   berömmer med en mobilrad i sig; ett bytesläge som inte räknas som åtgärd; räknare som inte går ihop;
//   en radtext med ett procenttal på en mobilrad; ett motprov (M365, bredband) som tappar sitt byte.
// BLIND: uppdelningen i rader och bevakade kort är speglad ur api/invoice-history.mjs (rad 152–183), inte
//   anropad; Portfolios egna rubriker och chip renderas inte här (renderingssonden prövar dem).
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { buildBranchAnchors, berikaRader, byggRum, watchedCard } from '../api/invoice-history.mjs';
import { arPrissatt } from '../lib/lagesregister.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { radMotivering, radMarke } from '../src/lib/rumstext.js';

const E3 = (n) => [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: n, unitPrice: 416.77, amount: 416.77 * n }];
const KAT = {
  mobil: { lev: 'Tele2', arlig: 349 * 12 * 10, platser: 10, mal: 269 * 12 * 10 },
  bredband: { lev: 'Telia', arlig: 699 * 12, platser: 1, mal: 319 * 12 },
  'saas-productivity': { lev: 'Microsoft', arlig: Math.round(416.77 * 12 * 10), platser: 10, mal: 40000, rader: E3(10) },
  el: { lev: 'Fortum', arlig: 30000, platser: null, mal: 25000 },
  loneadmin: { lev: 'Fortnox', arlig: 12000, platser: 10, mal: 9000 },
};
const ROUTER = ['auto', 'monitoring', 'review_queue'];

let nastaId = 1;
function rad({ kategori, route, medPlatser, medByte, medDelar = false, medNetto = false }) {
  const k = KAT[kategori];
  const r = {
    id: nastaId++, category: kategori, route, supplier: k.lev, normalized_supplier: k.lev,
    annual_cost: k.arlig, seat_count: medPlatser ? k.platser : null, should_switch: false,
    suggested_annual_cost: null, gross_saving: null, net_saving: null, triage_reason: null,
    created_at: '2026-10-01T10:00:00Z', line_items_json: k.rader ?? null, lead_finding_json: null,
  };
  if (medByte) {
    Object.assign(r, { should_switch: true, suggested_annual_cost: k.mal, gross_saving: k.arlig - k.mal,
      net_saving: Math.round((k.arlig - k.mal) * 0.8) });
  }
  // En rad med nettobelopp men utan bytesflagga: minimigränsen nollar flaggan, inte beloppet (K-1, mätt
  // genom handlern på main: ett abonnemang à 299 kr lagrades med `net_saving 288`).
  if (medNetto) Object.assign(r, { suggested_annual_cost: k.mal, gross_saving: k.arlig - k.mal, net_saving: Math.round((k.arlig - k.mal) * 0.8) });
  // En rad som a649404b hade lagrat: bytet är bredbandsdelen, och delarna står i bytesdelar_json. Ingen
  // sådan rad finns i produktionen (a649404b mergades aldrig), men rummet ska inte kunna visa ett tal ur
  // den om den fanns (H1-2: «24% mer … mobilabonnemang» på en rad utan antal).
  if (medDelar) {
    Object.assign(r, { should_switch: true, suggested_annual_cost: k.arlig - 2976, gross_saving: 2976, net_saving: 2381,
      bytesdelar_json: { version: 1, planvalsgrind: true, primarBrutto: 0, sekundar: { kategori: 'bredband', brutto: 2976 } } });
  }
  return r;
}

/** Alla enskilda rader i matrisen. */
function allaRader() {
  const ut = [];
  for (const kategori of Object.keys(KAT)) {
    for (const route of ROUTER) {
      for (const medPlatser of [true, false]) {
        for (const medByte of [true, false]) ut.push({ kategori, route, medPlatser, medByte });
        if (kategori === 'mobil') ut.push({ kategori, route, medPlatser, medByte: false, medDelar: true });
        if (kategori === 'mobil') ut.push({ kategori, route, medPlatser, medByte: false, medNetto: true });
      }
    }
  }
  return ut;
}

/** Rummet så som api/invoice-history.mjs bygger det ur lagrade rader (rad 152–183 och 241–305). */
async function bygg(spec) {
  const rader = spec.map(rad);
  const TRIAGE = new Set(['unsupported', 'review_queue']);
  const watched = rader.filter((a) => TRIAGE.has(a.route) || a.triage_reason != null).map((a) => watchedCard({ ...a }));
  const analyses = rader.filter((a) => !TRIAGE.has(a.route) && a.triage_reason == null)
    .map((a) => ({ ...a, _rader: a.line_items_json, line_items_json: undefined }));
  const ankare = await buildBranchAnchors(analyses);
  berikaRader(analyses, ankare);
  return { spec, analyses, watched, rum: byggRum(analyses, watched) };
}

const ENSKILDA = allaRader();
const RUM = [];
const namn = (s) => s.map((x) => `${x.kategori}/${x.route}/${x.medPlatser ? 'antal' : 'utan'}/${x.medByte ? 'byte' : x.medDelar ? 'delar' : x.medNetto ? 'netto' : '-'}`).join(' + ');
const arPlanval = (a) => BRANCHINDEX[a.category]?.bytesmalMotKategorigolv === true;
const PROCENT = /\d+\s?%/;

before(async () => {
  for (const s of ENSKILDA) RUM.push(await bygg([s]));
  // Varje mobilrad bredvid varje annan rad, och tre rader där mobilen står mellan två andra.
  const mobil = ENSKILDA.filter((s) => s.kategori === 'mobil');
  const ovriga = ENSKILDA.filter((s) => s.kategori !== 'mobil');
  for (const m of mobil) for (const o of ovriga) RUM.push(await bygg([m, o]));
  for (const m of mobil) {
    RUM.push(await bygg([{ kategori: 'saas-productivity', route: 'auto', medPlatser: true, medByte: true }, m,
      { kategori: 'bredband', route: 'auto', medPlatser: true, medByte: true }]));
  }
});

function brott(prova) {
  const fel = [];
  for (const r of RUM) {
    const skal = prova(r);
    if (skal) fel.push(`${namn(r.spec)}: ${skal}`);
  }
  return fel;
}
const visa = (fel) => `${fel.length} rum:\n  ${fel.slice(0, 12).join('\n  ')}${fel.length > 12 ? `\n  … och ${fel.length - 12} till` : ''}`;

describe('RM · rummets tillståndsmatris (S1)', () => {
  test('RM-00 · matrisen är byggd: enskilda rader, par och trior, och premissen bär', () => {
    assert.equal(ENSKILDA.length, 5 * 3 * 2 * 2 + 3 * 2 * 2);
    assert.ok(RUM.length >= ENSKILDA.length + 24 * 48, `för få rum: ${RUM.length}`);
    assert.equal(BRANCHINDEX.mobil.bytesmalMotKategorigolv, true);
  });

  test('RM-R1 · en mobilrad bär aldrig poäng, procenttal, bytesläge eller bytesbelopp', () => {
    const fel = brott(({ analyses }) => {
      for (const a of analyses.filter(arPlanval)) {
        if (a.arvoScore != null) return `poäng ${a.arvoScore}`;
        if (a.lage?.score != null) return `lägets poäng ${a.lage.score}`;
        if (a.lage?.params?.ovPct != null) return `procent ${a.lage.params.ovPct}`;
        if (a.lage?.kod === 'byte') return 'bytesläge';
        if (a.should_switch === true) return 'should_switch';
        if (PROCENT.test(radMotivering(a))) return `radtext: «${radMotivering(a).slice(0, 90)}»`;
        if (PROCENT.test(radMarke(a).text) || /kr\/år/.test(radMarke(a).text)) return `märke: ${radMarke(a).text}`;
      }
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R2 · ett visat byte är en åtgärd i rummet, och utan visat byte finns ingen bytesåtgärd', () => {
    const fel = brott(({ analyses, rum }) => {
      const visade = analyses.filter((a) => a.lage?.kod === 'byte');
      if (visade.length > 0 && !rum.hasSwitchAction) return `${visade.length} byte men ingen åtgärd`;
      if (visade.length === 0 && rum.hasSwitchAction) return 'åtgärd utan visat byte';
      if (visade.length !== rum.switchables) return `${visade.length} visade byten, ${rum.switchables} i rummet`;
      for (const a of visade) {
        if (a.bytesmalVerifierat === true && !arPrissatt(a)) return `${a.category}: verifierat byte räknas inte som prissatt`;
      }
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R3 · ett rum med en mobilrad har ingen samlad poäng och berömmer inte', () => {
    const fel = brott(({ analyses, rum }) => {
      if (!analyses.some(arPlanval)) return null;
      if (rum.score != null) return `poäng ${rum.score}`;
      if (rum.standing?.satt) return `marknadsläge ${rum.standing.label}`;
      if (rum.berom) return `beröm (${rum.lage})`;
      if (/^lugn_(battre|i_niva)$|^byte_(battre|i_niva)$/.test(rum.lage)) return `läge ${rum.lage}`;
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R4 · räknarna går ihop: fakturor = analyserade + bevakade, prissatta + mottagna = analyserade', () => {
    const fel = brott(({ analyses, watched, rum }) => {
      const c = rum.counts;
      if (c.fakturor !== c.analyserade + c.bevakade) return `fakturor ${c.fakturor} ≠ ${c.analyserade} + ${c.bevakade}`;
      if (c.prissatta + c.mottagna !== c.analyserade) return `prissatta ${c.prissatta} + mottagna ${c.mottagna} ≠ ${c.analyserade}`;
      if (c.bevakade !== watched.length) return `bevakade ${c.bevakade} ≠ ${watched.length}`;
      if (c.analyserade !== analyses.filter((a) => a.route === 'auto' || a.route === 'monitoring').length) return 'analyserade';
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R5 · radtexten säger inget procenttal som raden inte bär', () => {
    const fel = brott(({ analyses }) => {
      for (const a of analyses) {
        const t = radMotivering(a);
        const harTal = a.lage?.params?.ovPct != null || a.lage?.params?.avstandPct != null;
        if (PROCENT.test(t) && !harTal) return `${a.category}: «${t.slice(0, 90)}»`;
      }
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R6 · en mobilrad säger aldrig att det saknas ett verifierat publikt pris, och säger aldrig emot sig själv', () => {
    // Mobilens listpriser är verifierade (Tele2:s tre publicerade abonnemang). Det som saknas är vilket
    // abonnemang kunden har. Raden «Arvo har inget verifierat publikt pris att jämföra den mot» är alltså
    // falsk på en mobilrad, och bredvid «räknat mot det billigaste publicerade abonnemanget» säger raden
    // emot sig själv.
    const fel = brott(({ analyses }) => {
      for (const a of analyses.filter(arPlanval)) {
        const t = radMotivering(a);
        if (/inget verifierat publikt pris/i.test(t)) return `«${t.slice(0, 110)}»`;
      }
      return null;
    });
    assert.deepEqual(fel, [], visa(fel));
  });

  test('RM-R7 · en mobilrad lägger inget till rummets möjliga nettobesparing (K-1)', () => {
    // Rummet summerade varje grupps `net_saving`, också en mobilrad utan bytesflagga, och Portfolio skrev
    // talet som «Möjlig nettobesparing … kr per år» så snart rummet hade ett annat byte.
    const fel = brott(({ analyses, rum }) => {
      const ovriga = analyses.filter((a) => !arPlanval(a) && a.lage?.kod === 'byte')
        .reduce((s, a) => s + (a.net_saving ?? 0), 0);
      return (rum.totalSaving ?? 0) !== ovriga ? `totalSaving ${rum.totalSaving}, byten utanför mobil ${ovriga}` : null;
    });
    assert.deepEqual(fel, [], visa(fel));
    // Motprovet: matrisen bär rum där en mobilrad med nettobelopp står bredvid ett byte.
    assert.ok(RUM.some((r) => r.spec.some((x) => x.medNetto) && r.rum.hasSwitchAction), 'matrisen saknar rummet som prövar K-1');
  });

  test('RM-M1 · MOTPROV: M365 med E3-rader och bredband behåller sina byten och sin poäng', () => {
    const hitta = (k) => RUM.find((r) => r.spec.length === 1 && r.spec[0].kategori === k && r.spec[0].route === 'auto'
      && r.spec[0].medPlatser && r.spec[0].medByte);
    for (const k of ['saas-productivity', 'bredband']) {
      const { analyses, rum } = hitta(k);
      assert.equal(analyses[0].lage.kod, 'byte', `${k}: bytet försvann`);
      assert.equal(rum.hasSwitchAction, true, `${k}: rummet tappade åtgärden`);
      assert.equal(typeof analyses[0].arvoScore === 'number' || typeof analyses[0].lage.score === 'number', true, `${k}: ingen poäng`);
    }
  });
});
