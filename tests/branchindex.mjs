// tests/branchindex.mjs
// Enhetstester för branchindex.js: getBenchmark, bucketForSize och dataintegritet.
//
// Kör: node --test tests/branchindex.mjs
// Eller via: npm run test:algo

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  BRANCHINDEX,
  INDUSTRY_SEGMENT_MAP,
  getBenchmark,
  bucketForSize,
  bredbandSpeedBenchmark,
  bredbandsalternativ,
} from '../agents/recommender/branchindex.js';
import { usdToSek, FALLBACK_RATE_USD_SEK } from '../agents/recommender/pricing.js';
import { readFileSync } from 'node:fs';
import { stamplaKalla } from '../lib/verifieringsstampel.js';

// ── BI-01 ─────────────────────────────────────────────────────────────────────
// bucketForSize — alla gränsvärden
describe('BI-01 · bucketForSize — storleksbuckets', () => {
  const cases = [
    [1, 'micro'], [5, 'micro'], [9, 'micro'],
    [10, 'small'], [20, 'small'], [49, 'small'],
    [50, 'mid'], [100, 'mid'], [249, 'mid'],
    // ── DET HÄR TESTET LÅSTE IN FELET SOM AVSETT BETEENDE (rättat 2026-08-22) ────────────────
    // Raderna löd `[250, 'micro'], // faller utanför → fallback 'micro'` och `[500, 'micro']`.
    // Kommentaren beskrev en TYST FALLBACK som om den vore ett krav — och därför var sviten grön
    // medan varje bolag över 249 anställda fick mikrobolagets prisgolv. I loneadmin, den enda
    // kategori där avgiften faktiskt beror på antalet enheter, betydde det p25 778 kr i stället
    // för 324: ett golv 2,4 gånger för högt.
    //
    // Läxan är inte «rätta talet» utan att ett testfall som dokumenterar en fallback SOM ETT KRAV
    // gör felet osynligt för hela sviten. Ett förväntat värde ska vara det RÄTTA värdet, aldrig
    // det värde koden råkar producera.
    [250, 'mid'], [500, 'mid'], [3000, 'mid'],
  ];
  for (const [n, expected] of cases) {
    test(`${n} anst → '${expected}'`, () => assert.strictEqual(bucketForSize(n), expected));
  }
});

// ── BI-02 ─────────────────────────────────────────────────────────────────────
// getBenchmark — korrekt matrix-lookup för kända kombinationer
describe('BI-02 · getBenchmark — matrix-lookup', () => {
  test('mobil + konsult + 5 anst → byraer.micro { p25:3228, median:3588 }', () => {
    const bm = getBenchmark({ category: 'mobil', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    // Tele2 höjde 2026-08-05: lägsta 24-mån-pris 239 → 269 kr (p25 = ×12 = 3 228),
    // näst lägsta 279 → 299 kr (median = ×12 = 3 588). Verifierat live av fabriken.
    assert.strictEqual(bm.p25,    3228);
    assert.strictEqual(bm.median, 3588);
    assert.strictEqual(bm.industry, 'byraer');
    assert.strictEqual(bm.size, 'micro');
  });

  test('bredband har INGEN industry×size-benchmark (hastighetsbaserad) → getBenchmark null', () => {
    // Bredband-priset beror på hastighet/nät, inte bolagsstorlek. Benchmarken härleds
    // ur tele2Verified via bredbandSpeedBenchmark — getBenchmark returnerar därför null.
    const bm = getBenchmark({ category: 'bredband', industry: 'tillverkning', employees: 50 });
    assert.strictEqual(bm, null);
  });

  test('kortterminal.verifiedRates låser de live-verifierade raterna (Zettle 1,85 / Stripe 1,40+1,00)', () => {
    const vr = BRANCHINDEX.kortterminal.verifiedRates;
    assert.ok(vr && Array.isArray(vr.rates), 'verifiedRates.rates måste finnas');
    const byName = Object.fromEntries(vr.rates.map((r) => [r.supplier, r]));
    assert.strictEqual(byName['Zettle by PayPal'].pct, 1.85);
    assert.strictEqual(byName['Stripe Terminal'].pct, 1.40);
    assert.strictEqual(byName['Stripe Terminal'].fixed, 1.00);
  });

  test('avfall-atervinning + konsult + 5 anst → byraer.micro { p25:9500, median:16000 }', () => {
    const bm = getBenchmark({ category: 'avfall-atervinning', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    9500);
    assert.strictEqual(bm.median, 16000);
  });

  test('skrivarleasing + konsult + 5 anst → byraer.micro { p25:11400, median:16800 }', () => {
    const bm = getBenchmark({ category: 'skrivarleasing', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    11400);
    assert.strictEqual(bm.median, 16800);
  });

  test('saas-productivity + konsult + 10 anst → { p25:1606, median:1927 } ur den verifierade nivån', () => {
    // KONTRAKTET ÄNDRADES 2026-08-18 (grundarbeslut: "vi ska ALDRIG ha med ett pris som vi inte
    // kan backa upp"). Testet låste p25:1704 / median:2640 — två tal som inte gick att härleda ur
    // någonting. 1 704 matchade varken det verifierade priset (133,82 × 12 = 1 606), priset före
    // augustikorrigeringen (1 434) eller vad prisbokens egen not påstod (1 428). Medianen var
    // enligt notens ord "typisk återförsäljarpris med standardpåslag" — ett estimat under
    // source:'real-public'. Testet var alltså grönt kring uppfunna tal i två månader; det bevisade
    // att uppslagningen FUNGERAR, aldrig att talen var sanna.
    //
    // Nu härleds båda ur M365 Business Standard, samma sida och samma datum:
    //   p25    = 133,82 kr/mån årsavtal        × 12 = 1 606  (billigaste publicerade sättet att köpa den)
    //   median = 160,58 kr/mån utan bindning   × 12 = 1 927  (ordinarie listpris — taket)
    // Maskinvakt mot drift: tests/matriskrav.mjs (MK-03).
    const bm = getBenchmark({ category: 'saas-productivity', industry: 'konsult', employees: 10 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    1606);
    assert.strictEqual(bm.median, 1927);
    // Storleksbandet får inte längre ändra ett listpris — Microsoft tar inte olika betalt av ett
    // 5-mannabolag och ett 40-mannabolag för samma licens.
    const micro = getBenchmark({ category: 'saas-productivity', industry: 'konsult', employees: 5 });
    assert.deepEqual({ p25: micro.p25, median: micro.median }, { p25: 1606, median: 1927 });
  });

  test('okänd kategori → null', () => {
    const bm = getBenchmark({ category: 'nonexistent-xyz', industry: 'konsult', employees: 5 });
    assert.strictEqual(bm, null);
  });

  test('employees null/undefined → fallback micro', () => {
    const bm = getBenchmark({ category: 'mobil', industry: 'konsult', employees: undefined });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.size, 'micro');
  });
});

// ── BI-03 ─────────────────────────────────────────────────────────────────────
// requiresVolumeData-kategorier → getBenchmark returnerar null.
// OBS: saas-crm och saas-finance flyttade UT ur listan (kalibrerade estimated-
// benchmarks juni 2026 — Pipedrive/Zoho/HubSpot resp. Fortnox/Visma) — de
// asserteras nedan som estimated istället.
describe('BI-03 · requiresVolumeData-kategorier → null', () => {
  const volumeCats = [
    'saas-creative', 'saas-other',
    'leasing-bil', 'utrustningsleasing', 'serverhosting',
    'städ-rengöring', 'transport-frakt', 'kontorsmaterial',
  ];
  for (const cat of volumeCats) {
    test(`${cat} → null`, () => {
      const bm = getBenchmark({ category: cat, industry: 'konsult', employees: 10 });
      assert.strictEqual(bm, null, `${cat} ska returnera null (requiresVolumeData)`);
    });
  }
  for (const cat of ['saas-crm', 'saas-finance']) {
    test(`${cat} → estimated benchmark (kalibrerad juni 2026)`, () => {
      const bm = getBenchmark({ category: cat, industry: 'konsult', employees: 10 });
      assert.ok(bm, `${cat} ska ha benchmark`);
      assert.equal(bm.source, 'estimated', `${cat} är estimat tills livedata bär`);
      assert.ok(bm.p25 > 0 && bm.p25 <= bm.median, `${cat}: p25 ≤ median`);
    });
  }
});

// ── BI-04 ─────────────────────────────────────────────────────────────────────
// INDUSTRY_SEGMENT_MAP — alla kunder mappar till ett giltigt segment
describe('BI-04 · INDUSTRY_SEGMENT_MAP — fullständig täckning', () => {
  const validSegments = new Set(['byraer', 'hantverkare', 'ehandel', 'tillverkning']);
  const industries = ['ehandel', 'tillverkning', 'it-tech', 'bygg', 'hotell', 'konsult', 'transport', 'vard', 'ovrigt'];
  for (const ind of industries) {
    test(`${ind} → giltigt segment`, () => {
      const seg = INDUSTRY_SEGMENT_MAP[ind];
      assert.ok(validSegments.has(seg), `'${ind}' → '${seg}' är inte ett giltigt segment`);
    });
  }
});

// ── BI-05 ─────────────────────────────────────────────────────────────────────
// Dataintegritet: p25 ≤ median för alla matrixceller
describe('BI-05 · Dataintegritet — p25 ≤ median i alla celler', () => {
  for (const [catKey, catDef] of Object.entries(BRANCHINDEX)) {
    if (!catDef.matrix) continue;
    for (const [segment, sizes] of Object.entries(catDef.matrix)) {
      for (const [size, cell] of Object.entries(sizes)) {
        test(`${catKey} / ${segment} / ${size}: p25 (${cell.p25}) ≤ median (${cell.median})`, () => {
          assert.ok(
            cell.p25 <= cell.median,
            `p25 ${cell.p25} > median ${cell.median} — omöjligt`
          );
        });
      }
    }
  }
});

// ── BI-06 ─────────────────────────────────────────────────────────────────────
// USD-tiers i saas-productivity: rätt struktur och valutatyp
describe('BI-06 · USD-tiers — korrekt struktur (Slack, Zoom, Google)', () => {
  const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

  const usdTiers = [
    'slack-pro', 'slack-business-plus',
    'zoom-pro', 'zoom-business',
    'google-starter', 'google-standard', 'google-plus',
    'atlassian-jira-standard', 'atlassian-jira-premium',
  ];
  for (const key of usdTiers) {
    test(`${key}: currency='USD' + usdMonthly > 0`, () => {
      const t = tiers[key];
      assert.ok(t, `Tier '${key}' saknas`);
      assert.strictEqual(t.currency, 'USD');
      assert.ok(t.usdMonthly > 0, `usdMonthly saknas eller 0`);
    });
  }

  test('Microsoft-tiers har currency:"SEK" och msrpMonthly > 0', () => {
    const msTiers = ['business-basic', 'business-standard', 'business-premium', 'e3', 'e5'];
    for (const key of msTiers) {
      const t = tiers[key];
      assert.ok(t, `Tier '${key}' saknas`);
      assert.strictEqual(t.currency, 'SEK', `${key} ska ha currency:'SEK'`);
      assert.ok(t.msrpMonthly > 0, `${key}.msrpMonthly saknas`);
      assert.ok(t.msrpAnnual != null && t.msrpAnnual > 0, `${key}.msrpAnnual ska vara > 0`);
      // Årsavtal ska alltid vara billigare än månadsavtal
      assert.ok(t.msrpAnnual < t.msrpMonthly, `${key}: årsavtal (${t.msrpAnnual}) ska vara < månadsavtal (${t.msrpMonthly})`);
    }
  });

  test('Atlassian-tiers har usdAnnual = null (tier-bucket, ej per-user)', () => {
    for (const key of ['atlassian-jira-standard', 'atlassian-jira-premium',
                       'atlassian-confluence-standard', 'atlassian-confluence-premium']) {
      assert.strictEqual(tiers[key].usdAnnual, null, `${key}.usdAnnual ska vara null`);
    }
  });
});

// ── BI-10 ─────────────────────────────────────────────────────────────────────
// Atlassian höjde i oktober 2026, och grundaren beslutade 18 okt att boken följer källan. Talen
// nedan är vaktens AVLÄSNING (lib/verifiers/atlassian.mjs, seat-väljaren på 110), loggad likadant i
// körningarna 39069444683 (17 okt) och 39155569488 (18 okt 18:47 UTC). Testet bevisar inte att
// källan står still — det gör bara den levande vakten — utan att boken är lika med det som lästes.
// Talen pinnas exakt. Datumet är en golvgräns: stämpelboten flyttar det framåt på main efter varje
// grön Atlassian-körning, med [skip ci] och utan svit, så en likhet hade blivit röd där i tysthet
// (andra blicken PB85-1).
describe('BI-10 · Atlassian: boken är lika med vaktens avläsning 17–18 okt', () => {
  const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
  const AVLAST = {
    'atlassian-jira-standard': 9.56, 'atlassian-jira-premium': 19.15,
    'atlassian-confluence-standard': 7.00, 'atlassian-confluence-premium': 13.75,
  };
  const haller = (tier, usd) => tier.usdMonthly === usd
    && /^\d{4}-\d{2}-\d{2}$/.test(String(tier.lastVerified)) && tier.lastVerified >= '2026-10-18';
  for (const [nyckel, usd] of Object.entries(AVLAST)) {
    test(`${nyckel}: ${usd} USD/mån, verifierad 2026-10-18 eller senare`, () => {
      assert.ok(haller(tiers[nyckel], usd), JSON.stringify(tiers[nyckel]));
    });
  }
  test('BI-10 håller efter botens egen stämpel med ett senare datum, men inte före avläsningen', () => {
    // Stämpeln körs på källtexten i minnet, så som verify-sources gör på main. Inget skrivs till disk.
    // Datumet ligger bortom varje verklig stämpel: med ett riktigt datum hade testet fallit den dag
    // boten stämplat just det datumet, eftersom stamplaKalla då inte ändrar något.
    const SENARE = '2099-12-31';
    const kalla = readFileSync(new URL('../agents/recommender/branchindex.js', import.meta.url), 'utf8');
    const { kalla: stamplad, andrade } = stamplaKalla(kalla, Object.keys(AVLAST), SENARE);
    assert.deepEqual([...andrade].sort(), Object.keys(AVLAST).sort());
    for (const [nyckel, usd] of Object.entries(AVLAST)) {
      const datum = stamplad.match(new RegExp(`'${nyckel}':\\s*\\{[^{}]*?lastVerified:\\s*'([^']+)'`, 's'))?.[1];
      assert.equal(datum, SENARE);
      assert.ok(haller({ ...tiers[nyckel], lastVerified: datum }, usd), `${nyckel} föll efter stämpeln`);
    }
    assert.ok(!haller({ ...tiers['atlassian-jira-standard'], lastVerified: '2026-10-17' }, 9.56), 'ett datum före avläsningen håller inte');
    // Golvgränsen jämför strängar, så den ensam släpper allt som sorteras efter '2026-10-18'. ISO-kravet
    // är det som fäller dem (tredje blicken T85-7).
    for (const fel of ['okänt', '2026-10-2', 'undefined']) {
      assert.ok(fel >= '2026-10-18', `motprov: «${fel}» klarar golvgränsen som sträng`);
      assert.ok(!haller({ ...tiers['atlassian-jira-standard'], lastVerified: fel }, 9.56), `«${fel}» håller inte`);
    }
  });
});

// ── BI-12 · VARJE lastVerified I PRISBOKEN ÄR ETT STRIKT ISO-DATUM ─────────────────────────────
// Datumen jämförs som strängar på flera ställen (det stalaste nivådatumet, BI-10:s golvgräns). Det
// fungerar bara när varje datum är ÅÅÅÅ-MM-DD: '2026-10-9' sorteras efter '2026-10-19' (fjärde blicken
// G85-1). Mätt 21 okt: 32 datum i boken, alla strikt ISO. Testet håller det så.
//
// Vandringens antal jämförs med ett annat instrument, JSON-serialiseringen av samma bok. En spärr på
// «minst 30» släppte en vandring som tappat två datum, bland dem tele2-datumet (femte blicken F85-3).
// Källtextens literaler prövas också: loneadmin-literalen skrivs över i körningen och syns aldrig i
// vandringen, men stämpelboten och stampelvakten läser källtexten.
describe('BI-12 · varje lastVerified i prisboken är ett strikt ISO-datum', () => {
  const arIsoDatum = (x) => /^\d{4}-\d{2}-\d{2}$/.test(x) && new Date(`${x}T00:00:00Z`).toISOString().slice(0, 10) === x;

  test('alla datum är ÅÅÅÅ-MM-DD och ett giltigt kalenderdatum', () => {
    const datum = [];
    const ga = (o, vag) => {
      if (!o || typeof o !== 'object') return;
      for (const [k, x] of Object.entries(o)) {
        if (k === 'lastVerified') datum.push([vag, x]);
        else ga(x, `${vag}.${k}`);
      }
    };
    ga(BRANCHINDEX, 'BRANCHINDEX');
    const iJson = (JSON.stringify(BRANCHINDEX).match(/"lastVerified":/g) ?? []).length;
    assert.ok(iJson >= 30, `JSON-instrumentet hittade bara ${iJson} datum`);
    assert.equal(datum.length, iJson, `vandringen hittade ${datum.length} datum, serialiseringen ${iJson}`);
    for (const [vag, x] of datum) {
      if (x == null) continue;
      assert.match(String(x), /^\d{4}-\d{2}-\d{2}$/, `${vag}: «${x}» är inte ÅÅÅÅ-MM-DD`);
      assert.equal(new Date(`${x}T00:00:00Z`).toISOString().slice(0, 10), x, `${vag}: «${x}» är inget kalenderdatum`);
    }
  });

  test('varje lastVerified-literal i källtexten är ett strikt ISO-datum', () => {
    const kalla = readFileSync(new URL('../agents/recommender/branchindex.js', import.meta.url), 'utf8');
    const literaler = [...kalla.matchAll(/lastVerified:\s*'([^']*)'/g)].map((m) => m[1]);
    assert.ok(literaler.length >= 30, `bara ${literaler.length} literaler hittades`);
    const fel = literaler.filter((x) => !arIsoDatum(x));
    assert.deepEqual(fel, [], `literaler som inte är ÅÅÅÅ-MM-DD: ${fel.join(', ')}`);
  });
});

// ── BI-13 · BREDBANDETS ALTERNATIV BÄR BOKENS TAL ─────────────────────────────────────────────
// Andra blicken på uppföljningen efter PR #85 (K-1): alternativtexten sa «1200/100 Mbit 279 kr/mån»
// efter att boken höjts till 319, och rummets bytesbesked visade den under bokens datum.
describe('BI-13 · bredbandets alternativ bär bokens tal', () => {
  const tv = BRANCHINDEX.bredband.tele2Verified;
  const tele2 = () => BRANCHINDEX.bredband.alternatives.filter((a) => /^Tele2\b/.test(a.supplier));

  test('varje kr/mån-tal i Tele2-alternativen är bokens tal för samma produkt', () => {
    const [max, std] = tele2();
    assert.ok(max && std, 'båda Tele2-alternativen finns');
    assert.match(max.positioning, new RegExp(`1200 Mbit ${tv.max[1200]} kr/mån`));
    assert.match(std.positioning, new RegExp(`1000 Mbit ${tv.standard[1000]} kr/mån`));
    const bokensTal = new Set([...Object.values(tv.max), ...Object.values(tv.standard)].map(String));
    for (const a of tele2()) {
      for (const [, tal] of a.positioning.matchAll(/(\d+) kr\/mån/g)) assert.ok(bokensTal.has(tal), `${a.supplier}: ${tal} står inte i boken`);
      assert.doesNotMatch(a.positioning, /\d{4}-\d{2}-\d{2}/, 'ett datum i texten är ett andra datum som kan glida isär');
    }
    assert.equal(BRANCHINDEX.bredband.alternatives.filter((a) => a.supplier === 'Bahnhof Företag').length, 1, 'Bahnhof står kvar, en gång');
  });

  test('texten följer boken: ändras talet, ändras texten', () => {
    const andrad = bredbandsalternativ({ ...tv, max: { ...tv.max, 1200: 999 }, standard: { ...tv.standard, 1000: 555 } });
    assert.match(andrad[0].positioning, /1200 Mbit 999 kr\/mån/);
    assert.match(andrad[1].positioning, /1000 Mbit 555 kr\/mån/);
    assert.deepEqual(bredbandsalternativ({}), [], 'utan bokens tal: inga Tele2-alternativ, aldrig ett gissat tal');
  });
});

// ── BI-14 · VARJE ALTERNATIV I EN real-public-KATEGORI BÄR BARA TAL UR SIN EGEN BOK ─────────────
// Granskningen av lagningen (L-2): Google-alternativet sa «ofta 30–40 % billigare än M365» medan
// bokens egna tal säger att Google är ungefär 9 % dyrare, och rummets bytesbesked visade det under
// «verifierat öppet pris». Telavox bar «Premium 399, Max 549» utan bokpost. Alternativen når kunden
// genom buildSwitchTargets (api/invoice-history.mjs) för varje real-public-kategori.
describe('BI-14 · alternativen i real-public-kategorier bär bara tal ur sin egen bok', () => {
  const bokensTal = (o, ut = new Set()) => {
    if (o && typeof o === 'object') {
      for (const [k, v] of Object.entries(o)) {
        if (k === 'alternatives') continue;
        if (typeof v === 'number') ut.add(v); else bokensTal(v, ut);
      }
    }
    return ut;
  };
  const kategorier = Object.entries(BRANCHINDEX).filter(([, c]) => c.source === 'real-public' && Array.isArray(c.alternatives));
  // Ett prisomdöme utan källa: procent, «billigare», «lägst», «konkurrenskraftig», «marknadsledare», «starkaste».
  const OMDOME = /%|billigare|\blägst\b|konkurrenskraftig|marknadsledare|starkaste/i;

  // Varje fristående tal, inte bara «N kr»: Telavox «Premium 399, Max 549» bar inget «kr», och en läsare
  // som krävde det fällde noll (sabotaget S9). Specifikationer (Mbit, TB, GB, mån) undantas, och
  // sifferdelen av en beteckning som E5 eller T1 är inget tal.
  const TAL = /(?<!\w|\d[.,])(\d+(?:[.,]\d+)?)(?!\w|[.,]\d)(?!\s*(?:Mbit|TB|GB|mån))/g;

  test('varje tal står i kategorins bok (som månadsbelopp eller × 12), och inget prisomdöme utan källa', () => {
    assert.ok(kategorier.length >= 5, `bara ${kategorier.length} kategorier med alternativ`);
    let lasta = 0;
    for (const [k, c] of kategorier) {
      const bok = bokensTal(c);
      for (const a of c.alternatives) {
        for (const [, t] of a.positioning.matchAll(TAL)) {
          const n = Number(t.replace(',', '.'));
          lasta++;
          assert.ok(bok.has(n) || bok.has(Math.round(n * 12)), `${k} · ${a.supplier}: ${n} står inte i kategorins bok`);
        }
        assert.doesNotMatch(a.positioning, OMDOME, `${k} · ${a.supplier}: prisomdöme utan källa`);
      }
    }
    assert.ok(lasta >= 6, `bara ${lasta} kr-tal lästa — läsaren är trasig`);
  });

  test('motprov: ett påhittat tal och ett procentpåstående fälls', () => {
    const bok = bokensTal(BRANCHINDEX.molnvaxel);
    assert.ok(!bok.has(549) && !bok.has(549 * 12), 'Telavox 549 står inte i boken');
    assert.match('Ofta 30–40 % billigare än M365.', OMDOME);
    // Läsaren tar tal utan «kr», hoppar över specifikationer och beteckningar.
    const tal = (t) => [...t.matchAll(TAL)].map((m) => m[1]);
    assert.deepEqual(tal('Bundlar mobil+växel (Premium 399, Max 549)'), ['399', '549']);
    assert.deepEqual(tal('1200 Mbit 319 kr/mån exkl moms (12 mån bindning)'), ['319']);
    assert.deepEqual(tal('Teams, 1 TB OneDrive. Väsentligt lägre än E3/E5 (T1)'), []);
  });
});

// ── BI-11 · TRÖSKELFIXTURERNA LIGGER STRAX UNDER TRÖSKELN MOT DAGENS GOLV ─────────────────────
// edge-25, comb-55 och comb-13 finns för att bevisa grenen «under 500 kr i besparing → hävda
// ingenting». De förväntar null. Flyttar golvet sig ger de fortfarande null, men av fel skäl: under
// golvet i stället för strax under tröskeln. Så tappades kanten nästan 18 aug, och igen 21 okt
// (Tele2 +40 kr). Bara kommentarer bar rollen. Här räknas deras gross mot dagens golv: blir den
// något annat än 432 faller testet och säger vad som ska göras, nämligen att flytta fixturens indata.
describe('BI-11 · tröskelfixturerna ligger strax under tröskeln mot dagens golv', () => {
  test('edge-25, comb-55 och comb-13: gross = 432 mot bredbandSpeedBenchmark(100).p25', async () => {
    const { computeInvoiceMetrics } = await import('../lib/invoice-metrics.js');
    const { fixtures: edge } = await import('./fixtures/07-edge-cases.mjs');
    const { fixtures: comb } = await import('./fixtures/03-combined.mjs');
    const golv = bredbandSpeedBenchmark(100).p25;
    for (const id of ['edge-25', 'comb-55', 'comb-13']) {
      const fx = [...edge, ...comb].filter((f) => f.id === id);
      assert.equal(fx.length, 1, `${id} ska finnas exakt en gång`);
      const m = computeInvoiceMetrics(fx[0].lineItems, fx[0].category, fx[0].mixed ?? false);
      assert.equal(m.secondaryConnectionSpeedMbit, 100, `${id}: hastigheten ska vara 100 Mbit`);
      const gross = Math.round(m.secondaryComponentMonthly * 12) - golv;
      assert.equal(gross, 432, `${id}: gross ${gross} mot golvet ${golv}. Golvet har flyttat sig — flytta fixturens indata så att gross blir 432 igen`);
      assert.equal(fx[0].secondary, null);
    }
  });
});

// ── BI-07 ─────────────────────────────────────────────────────────────────────
// usdToSek: matematisk korrekthet med FALLBACK_RATE_USD_SEK
describe('BI-07 · usdToSek — konverteringsaritmetik', () => {
  test('usdToSek(18.00, FALLBACK) = round(18.00 × FALLBACK)', () => {
    const expected = Math.round(18.00 * FALLBACK_RATE_USD_SEK);
    assert.strictEqual(usdToSek(18.00, FALLBACK_RATE_USD_SEK), expected);
  });

  test('usdToSek(15.30, FALLBACK) = round(15.30 × FALLBACK)', () => {
    const expected = Math.round(15.30 * FALLBACK_RATE_USD_SEK);
    assert.strictEqual(usdToSek(15.30, FALLBACK_RATE_USD_SEK), expected);
  });

  test('Slack Business+ SEK-pris = round(usdMonthly × rate) (Salesforce-caset: USD→SEK)', () => {
    const tier = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['slack-business-plus'];
    const rate = FALLBACK_RATE_USD_SEK;
    assert.strictEqual(usdToSek(tier.usdMonthly, rate), Math.round(tier.usdMonthly * rate));
    assert.strictEqual(usdToSek(tier.usdAnnual,  rate), Math.round(tier.usdAnnual  * rate));
  });

  // ── NEUTRALITETSLÅSET (grundarfynd 2026-08-05) ──────────────────────────────
  // Det här testet påstod tidigare motsatsen: "Arvo-pris ska vara < MSRP". Elva tiers bar
  // usdArvoAnnual = listpris × 0,85 — ett partnerpris som aldrig funnits, och som via
  // `bm.arvoAnnual ?? bm.msrpAnnual` blev MÅLPRISET kunden såg. Besparingar byggda på en
  // rabatt vi inte har. Neutralitets-moaten (GRUNDARBESLUT 2026-06-19) är icke-förhandlingsbar:
  // enda ankaret är verifierat PUBLIKT listpris. Låset nedan gör återfallet omöjligt.
  test('NEUTRALITET: ingen tier bär ett arvo-pris under det publika listpriset', () => {
    const brott = [];
    for (const [kat, data] of Object.entries(BRANCHINDEX)) {
      for (const [key, t] of Object.entries(data?.licenseTierBenchmarks ?? {})) {
        if (t?.usdArvoAnnual != null && t.usdAnnual != null && t.usdArvoAnnual < t.usdAnnual) {
          brott.push(`${kat}/${key}: usdArvoAnnual ${t.usdArvoAnnual} < usdAnnual ${t.usdAnnual}`);
        }
        if (t?.arvoAnnual != null && t.msrpAnnual != null && t.arvoAnnual < t.msrpAnnual) {
          brott.push(`${kat}/${key}: arvoAnnual ${t.arvoAnnual} < msrpAnnual ${t.msrpAnnual}`);
        }
      }
    }
    assert.deepEqual(brott, [],
      'Partnerpris i prisboken — vi tar aldrig leverantörsersättning och har ingen rabatt att visa:\n' + brott.join('\n'));
  });

  test('Zoom Pro: årsavtal billigare än månadsavtal efter konvertering', () => {
    const tier = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['zoom-pro'];
    const rate = FALLBACK_RATE_USD_SEK;
    const monthly = usdToSek(tier.usdMonthly, rate);
    const annual  = usdToSek(tier.usdAnnual, rate);
    assert.ok(annual < monthly, `Zoom Pro årsavtal (${annual}) ska vara < månadsavtal (${monthly})`);
  });
});

// ── BI-08 ─────────────────────────────────────────────────────────────────────
// Bredband-benchmarken härleds DETERMINISTISKT ur tele2Verified (inga legacy-estimat):
// p25 = billigaste verifierade Tele2-nät (COAX), median = öppen fiber. p25 < median.
describe('BI-08 · Bredband bredbandSpeedBenchmark (härledd ur tele2Verified)', () => {
  const speeds = [100, 250, 500, 1000];
  for (const s of speeds) {
    test(`${s} Mbit: existerar + p25 < median + source tele2-verified`, () => {
      const t = bredbandSpeedBenchmark(s);
      assert.ok(t, `Saknar bredbandSpeedBenchmark för ${s} Mbit`);
      assert.equal(t.source, 'tele2-verified');
      assert.ok(t.p25 < t.median, `${s} Mbit: p25 (${t.p25}) >= median (${t.median})`);
    });
  }
  test('1000 Mbit: p25 = 3 828 (Tele2 COAX 1200 319×12), median = 5 844 (öppen fiber 1000 487×12)', () => {
    // Golvet höjt 3 348 → 3 828 när Tele2 tog tillbaka augustisänkningen, verifierat 2026-10-21 mot
    // adress-API:t på tre adresser i tre läsningar (279 → 319 kr/mån). Före: sänkt 3 828 → 3 348
    // 2026-08-18. Taket är oförändrat: öppen fiber drev inte. Aritmetiken står här så att en framtida ändring måste passera en
    // människa som ser vad den ändrar — inte bara ett test som följer med automatiskt.
    const t = bredbandSpeedBenchmark(1000);
    assert.strictEqual(t.p25,    3828);
    assert.strictEqual(t.median, 5844);
  });
  test('utan giltig hastighet → null (Zero Trust: ingen gissad siffra)', () => {
    assert.strictEqual(bredbandSpeedBenchmark(0), null);
    assert.strictEqual(bredbandSpeedBenchmark(null), null);
  });
});

// ── BI-09 · EN NOT SOM MOTSÄGER SITT EGET TAL ÄR SAMMA FEL SOM ETT OSOURCAT TAL ──────────────
// Tre fixturfiler bar en dokumenterad p25-tabell i sin header. Den hade legat FEL i månader:
// den sa 500:3828 medan fixturernas egna assertioner korrekt använde 3348. Ingen märkte det,
// för en kommentar kan inte falla. Nästa läsare räknar dock EFTER den tabellen när hen skriver
// en ny fixtur — och får ett tal som ser härlett ut men inte är det.
//
// Det är exakt kvällens sjukdom (prisbokens not påstod 1 428 medan cellen bar 1 704), fast i
// dokumentationen i stället för i produkten. Vakten läser raden ur källtexten och jämför mot
// den LEVANDE härledningen, så tabellen inte kan glida isär igen.
//
// VAKTENS PREMISS:
//   FÅNGAR: en dokumenterad p25-tabell som inte längre stämmer med bredbandSpeedBenchmark —
//           antingen för att priset drivit eller för att någon skrivit om raden för hand.
//   BLIND:  vakten läser BARA header-tabellen. De per-fixtur inlinekommentarer som räknar ut
//           enskilda besparingar ("secAnnual=…, p25=3828, gross=…") vaktas inte och kan vara
//           inaktuella — de är resonemang, inte en tabell, och kan inte plockas ut maskinellt
//           utan att gissa. Att den luckan finns ska stå här, inte upptäckas av nästa läsare.
describe('BI-09 · fixturernas dokumenterade bredbandstabell speglar härledningen', () => {
  test('varje header-tabell stämmer med bredbandSpeedBenchmark, tal för tal', async () => {
    const { readFileSync, readdirSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const dir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');

    let hittade = 0;
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs'))) {
      const src = readFileSync(join(dir, f), 'utf8');
      const rad = src.match(/bredbandSpeedBenchmark p25 \(ur tele2Verified\):\s*\{([^}]*)\}/);
      if (!rad) continue;
      hittade++;
      for (const par of rad[1].split(',')) {
        const [sp, v] = par.split(':').map((x) => Number(x.trim()));
        assert.ok(Number.isFinite(sp) && Number.isFinite(v), `${f}: oläsbart par "${par}"`);
        const levande = bredbandSpeedBenchmark(sp);
        assert.ok(levande, `${f}: ${sp} Mbit ger ingen benchmark`);
        assert.strictEqual(levande.p25, v,
          `${f}: dokumenterad p25 för ${sp} Mbit är ${v}, härledningen ger ${levande.p25}`);
      }
    }
    // En vakt som matchar noll filer blir grön av tomhet — det var triage-bokföringens
    // första fällda antagande.
    assert.ok(hittade >= 3, `förväntade minst 3 fixturfiler med tabellen, hittade ${hittade}`);
  });
});
