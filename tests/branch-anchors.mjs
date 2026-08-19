// tests/branch-anchors.mjs — låser branschankaret (cold-start-fyllningen av "den kollektiva sanningen").
//
// Integritetskärnan som testas (regel 3 + enhetskarantänen):
//   1. Endast kategorier med KÄND enhetsfras blir ankare — en okänd kategori får aldrig
//      renderas (då skulle ett per-enhet-tal kunna märkas som om det vore en totalsumma).
//   2. Endast källan 'real-public' (BRANCHINDEX verifierat publikt listpris) — den enda
//      vars median är PER ENHET och matchar unitLabel. Aldrig estimat/mock/total.
//   3. unitLabel är per-enhet ("per användare/år", "per abonnemang/år") — aldrig en total.
//
// ⚠️ VAD DEN HÄR SVITEN INTE KUNDE SE (grundargranskning 2026-08-15) — och varför det är läxan:
// Ankaret byggdes tidigare via `getBenchmark()`, prisbokens läsväg för en BESPARINGSBERÄKNING.
// Den föredrar — helt riktigt — livedata när den finns (invoice_datapoints ≥10, invoice_analyses
// ≥5), och livedatan är TOTALSUMMOR. Filtret på source === 'real-public' gjorde då rätt sak av
// fel svar: det kastade ankaret i stället för att hämta rätt källa. Följden var bakvänd — ju mer
// nätverksdata vi samlade, desto oftare gick "den kollektiva sanningen" tyst, det lager bibeln
// säger aldrig kan vara tomt. I grundarens skarpa rum var kortet borta.
//
// Sviten var grön hela tiden, och kunde inte ha varit annat: den kör UTAN DB, och utan DB fanns
// ingen livedata som kunde vinna över real-public. Testerna bevisade att mekanismen svarar rätt
// i ett tillstånd produktionen inte är i — exakt villkorsvaktens och LFL-harnessets sjukdom.
// Åtgärden var att göra frågan oberoende av tillståndet: `getPublicListBenchmark()` läser
// BRANCHINDEX direkt och kan bara svara med verifierat publikt listpris per enhet. Nu är offline
// och produktion samma väg — och BA-08 nedan låser att den gamla vägen inte kan smyga tillbaka.
//
// Körs offline mot den RIKTIGA BRANCHINDEX. Guldmyntfoten är den deployade pipelinen; detta låser logiken.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildBranchAnchors, BRANCH_ANCHOR_UNIT } from '../api/invoice-history.mjs';

const a = (o) => ({ route: 'auto', industry: 'byraer', employees: 8, annual_cost: 50000, ...o });

describe('Branschankaret · enhet + källa', () => {
  test('mobil → ankare per abonnemang/år, verifierat publikt listpris, median > 0', async () => {
    const out = await buildBranchAnchors([a({ category: 'mobil', annual_cost: 58092 })]);
    assert.ok(out.mobil, 'mobil ska ge ett ankare (BRANCHINDEX real-public)');
    assert.equal(out.mobil.source, 'real-public');
    assert.equal(out.mobil.unitLabel, 'per abonnemang/år');
    assert.ok(out.mobil.median > 0);
    assert.equal(out.mobil.customerCost, 58092);
  });

  test('saas-productivity → ankare per användare/år', async () => {
    const out = await buildBranchAnchors([a({ category: 'saas-productivity' })]);
    assert.ok(out['saas-productivity']);
    assert.equal(out['saas-productivity'].unitLabel, 'per användare/år');
    assert.equal(out['saas-productivity'].source, 'real-public');
  });

  test('seats ur fakturan bärs vidare (för bransch-total = median × seats); saknas → null', async () => {
    const withSeats = await buildBranchAnchors([a({ category: 'mobil', seat_count: 20 })]);
    assert.equal(withSeats.mobil.seats, 20);
    assert.equal(withSeats.mobil.unitNoun, 'abonnemang');
    const noSeats = await buildBranchAnchors([a({ category: 'mobil' })]);
    assert.equal(noSeats.mobil.seats, null);          // aldrig en gissad enhetsmängd
  });

  test('estimat-kategori (vaxel) → INGET ankare (ej i enhets-allowlist + ej real-public)', async () => {
    const out = await buildBranchAnchors([a({ category: 'vaxel' })]);
    assert.equal(out.vaxel, undefined);
  });

  test('okänd kategori utan enhetsfras → INGET ankare (gissar aldrig enheten)', async () => {
    const out = await buildBranchAnchors([a({ category: 'forsakring' })]);
    assert.deepEqual(out, {});
  });

  test('icke-auto analys (monitoring) → inget ankare', async () => {
    const out = await buildBranchAnchors([a({ category: 'mobil', route: 'monitoring' })]);
    assert.deepEqual(out, {});
  });

  test('varje median i allowlisten är PER ENHET — aldrig en orimlig totalsumma', async () => {
    // Per-enhet-tal ligger i tusentals kr/år; en total skulle vara tio- eller hundratusentals.
    for (const cat of Object.keys(BRANCH_ANCHOR_UNIT)) {
      const out = await buildBranchAnchors([a({ category: cat })]);
      if (!out[cat]) continue;                       // saknar real-public-tier i någon miljö → hoppa
      assert.ok(out[cat].median > 0 && out[cat].median < 20000,
        `${cat}: median ${out[cat].median} ser ut som en total, inte ett per-enhet-pris`);
      // Listan utökas MEDVETET, en enhet i taget — den finns för att en okänd enhet aldrig ska
      // slinka igenom som ett per-enhet-tal. 'anställd' tillkom 2026-08-19 med loneadmin, vars
      // prisbok säger "Per anställd/år" i klartext. Att vakten fällde tillägget är den som gör
      // sitt jobb; att bara vidga regexen utan att veta enheten hade varit att stänga av den.
      assert.match(out[cat].unitLabel, /per (användare|abonnemang|anslutning|anställd)\/år/);
    }
  });

  test('BA-09 · ordet "verifierat" kräver ett datum — annars ska ordet bort', async () => {
    // Kortet sa "verifierat publikt listpris" utan att kunna säga verifierat NÄR. Datumet är den
    // enda halvan av det påståendet kunden kan kontrollera, och prisboken hade det hela tiden —
    // det släpptes bara aldrig igenom. Sommarens smyghöjning är skälet: prisboken stod stilla i
    // 16 dygn medan Microsoft höjde 16,6 %, och varje kund fick de gamla talen som "verifierade".
    const out = await buildBranchAnchors([a({ category: 'mobil', annual_cost: 58092 })]);
    assert.ok(out.mobil, 'mobil ska ge ett ankare');
    assert.match(String(out.mobil.lastVerified), /^\d{4}-\d{2}-\d{2}$/,
      'ankaret måste bära ett verifieringsdatum — utan det får kundytan inte säga "verifierat"');

    // En kategori vars datum bor per licensnivå ska få det HÄRLETT, inte tappa det.
    const saas = await buildBranchAnchors([a({ category: 'saas-productivity', annual_cost: 120000 })]);
    assert.match(String(saas['saas-productivity'].lastVerified), /^\d{4}-\d{2}-\d{2}$/,
      'saas-productivity daterar per nivå — kategorin ska ärva den STALASTE nivåns datum');

    // Och kundytan måste degradera ordet när datumet saknas, inte visa det ändå.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rum = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/pages/Portfolio/index.js'), 'utf8');
    const kort = rum.slice(rum.indexOf('<span>Marknadsankaret</span>'), rum.indexOf('<span>Marknadsankaret</span>') + 500);
    assert.match(kort, /branchAnchor\.lastVerified/,
      'etiketten måste villkoras av datumet');
    assert.match(kort, /'publikt listpris'/,
      'utan datum ska ordet "verifierat" falla bort — ett svagare men sant påstående');
  });

  test('BA-10 · datumet tillhör den nivå som BÄR talet — inte den stalaste av alla', async () => {
    // ── KONTRAKTET ÄNDRADES 2026-08-18, OCH SKÄLET SKA STÅ HÄR ────────────────────────────────
    // Testet krävde tidigare kategorins STALASTE nivådatum, med motiveringen att välja det
    // färskaste vore att smickra sig själv. Motiveringen var god men frågan var fel: "vilken nivå
    // är stalast?" är en gissning man tvingas göra när man inte vet vilken nivå som bär talet.
    //
    // Effekten blev fel proveniens i kundytan. saas-productivity ärvde 2026-06-17 från Googles
    // USD-nivåer — nivåer som är sekPublic:false och per konstruktion uteslutna ur varje SEK-tal
    // vi visar (google-sek-grind). Rummet skrev alltså "verifierat 17 juni" bredvid ett
    // Microsoft-pris verifierat 5 augusti. Rätt siffra, fel proveniens; regel 3 räknar det som fel.
    //
    // Sedan cellerna härleds (cellHarledning) VET vi vilken nivå som bär talet, och då är datumet
    // den nivåns datum — inget val mellan nivåer kvarstår. Det kan inte heller smickra oss: bara
    // EN nivå bär talet. Googles staleness är fortfarande sann och rapporteras fortfarande, på sin
    // egen rad, av price-audit och av verifieraren.
    const { BRANCHINDEX, harledCeller } = await import('../agents/recommender/branchindex.js');
    const cat = BRANCHINDEX['saas-productivity'];
    const tiers = cat?.licenseTierBenchmarks ?? {};
    const datum = Object.values(tiers).map((t) => t?.lastVerified).filter(Boolean).sort();
    assert.ok(datum.length >= 2, 'saas-productivity ska ha flera daterade nivåer att välja mellan');
    assert.notEqual(datum[0], datum.at(-1), 'nivåerna ska ha OLIKA datum — annars prövar testet ingenting');

    const bararens = harledCeller(cat).lastVerified;
    const out = await buildBranchAnchors([a({ category: 'saas-productivity' })]);
    assert.equal(out['saas-productivity'].lastVerified, bararens,
      `ankaret ska bära bärarnivåns datum (${bararens}), inte den stalastes (${datum[0]})`);

    // Och det ska vara ett verkligt datum ur en verkligt verifierad nivå — inte bara "något".
    assert.equal(bararens, tiers[cat.cellHarledning.referensTier].lastVerified,
      'datumet ska komma ur exakt den nivå härledningen namnger');
  });

  test('BA-12 · ankarets golv följer kundens egen storlek när avgiften gör det', async () => {
    // FÅNGAT FÖRE LEVERANS 2026-08-19. loneadmin lades till i enhets-allowlistan så rummet äntligen
    // kunde visa dess verifierade golv — men getPublicListBenchmark hämtade alltid micro-bucketen.
    // Ett bolag med tolv anställda hade jämförts mot femmannaföretagets golv (778 kr/anställd/år)
    // när dess verkliga är 419. Ett tal 86 % för högt, presenterat som "billigaste publicerade pris".
    // Samma klass som enhetsfelet: rätt sorts tal, fel population.
    //
    // Storleksberoendet är ÄKTA här (fast avgift utslagen på fler anställda), till skillnad från ett
    // listpris. Därför måste ankaret följa kunden — och för listprisbaserade kategorier får det
    // ALDRIG göra det, annars har vi återinfört den uppfunna spridningen MK-07 tog bort.
    const litet = await buildBranchAnchors([a({ category: 'loneadmin', annual_cost: 4500, seat_count: 5 })]);
    const stort = await buildBranchAnchors([a({ category: 'loneadmin', annual_cost: 30000, seat_count: 80 })]);
    assert.equal(litet.loneadmin.p25, 778, '(199/5 + 25) × 12');
    assert.equal(stort.loneadmin.p25, 324, '(199/100 + 25) × 12 — mid-bandet');
    assert.ok(stort.loneadmin.p25 < litet.loneadmin.p25,
      'den fasta avgiften slås ut på fler anställda — golvet måste sjunka');

    // Ett LISTPRIS varierar inte med kundens storlek. Skulle det börja göra det är den uppfunna
    // spridningen tillbaka, och då är det här testet det som säger ifrån.
    const saasSmatt = await buildBranchAnchors([a({ category: 'saas-productivity', annual_cost: 8000, seat_count: 5 })]);
    const saasStort = await buildBranchAnchors([a({ category: 'saas-productivity', annual_cost: 130000, seat_count: 80 })]);
    assert.equal(saasSmatt['saas-productivity'].p25, saasStort['saas-productivity'].p25,
      'M365 Business Standard kostar lika mycket för 5 som för 80 användare');
  });

  test('BA-11 · UTAN härledning gäller stalaste nivån fortfarande', async () => {
    // Den gamla regeln är inte fel — den är svaret på "vad gäller när vi INTE vet vilken nivå som
    // bär talet". Det fallet finns kvar för varje kategori som inte deklarerat en härledning, och
    // då är försiktighet rätt: kategorin är bara så verifierad som sin stalaste nivå.
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const { getBenchmark } = await import('../agents/recommender/branchindex.js');
    const fejk = {
      source: 'estimated', unit: 'kr/år', note: 'x', alternatives: [],
      licenseTierBenchmarks: {
        gammal: { msrpAnnual: 100, currency: 'SEK', lastVerified: '2026-01-01' },
        farsk:  { msrpAnnual: 200, currency: 'SEK', lastVerified: '2026-08-05' },
      },
      matrix: { byraer: { micro: { median: 2400, p25: 1200 } } },
    };
    BRANCHINDEX['__test-utan-harledning'] = fejk;
    try {
      const bm = getBenchmark({ category: '__test-utan-harledning', industry: 'konsult', employees: 5 });
      assert.equal(bm.lastVerified, '2026-01-01',
        'utan härledning ska kategorin bära sin stalaste nivå, aldrig sin färskaste');
    } finally {
      delete BRANCHINDEX['__test-utan-harledning'];
    }
  });

  test('BA-08 · ankaret får ALDRIG gå via prisbokens prioritetskedja', async () => {
    // Det var den vägen som tystade kortet i skarpt läge: getBenchmark föredrar livedata
    // (totalsummor), ankaret krävde per-enhet — och kastade i stället för att fråga rätt källa.
    // Vakten läser källtexten, för buggen syns bara i VILKEN funktion som anropas: båda
    // returnerar ju ett giltigt ankare i en DB-lös testmiljö.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../api/invoice-history.mjs'), 'utf8');
    const fn = src.slice(src.indexOf('export async function buildBranchAnchors'));
    const kropp = fn.slice(0, fn.indexOf('\n}\n'));
    assert.doesNotMatch(kropp, /await getBenchmark\(|[^c]getBenchmark\(\{/,
      'ankaret frågar prisbokens besparingsväg igen — då tystnar det så fort livedata finns');
    assert.match(kropp, /getPublicListBenchmark\(/,
      'ankaret ska läsa verifierat publikt listpris direkt (samma källa dörrens avslöjande använder)');
  });
});
