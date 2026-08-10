// tests/villkorsvakt.mjs — låser VILLKORSVAKTEN, och därmed att avtalsreglerna inte kan
// ruttna i tysthet som prisboken gjorde i 16 dygn.
//
// Den viktigaste raden i hela filen är "oåtkomlig är inte godkänt". Varje gång vi byggt en vakt
// i det här repot har den första versionen kunnat tiga sig till grönt — prisverifieraren på en
// 404-sida i 76 dagar, mittlinje-vakten som kedjades vid en klass som inte fanns. Mönstret är
// alltid detsamma: frånvaro av larm läses som frånvaro av fel.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomVillkorspost, bedomVillkorsbok, adressenKanAldrigAndras, VILLKOR_UTFALL, VILLKOR_MAX_ALDER_DAGAR } from '../lib/villkorsvakt.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';

const IDAG = new Date('2026-08-07T12:00:00Z');
const POST = {
  supplier: 'Bahnhof',
  kalla: 'https://www.bahnhof.se/villkor.pdf',
  citat: 'Uppsägningstid är tre (3) månader.',
  verifierad: '2026-07-03',
  dokumentSha256: 'a'.repeat(64),
  villkorssida: 'https://www.bahnhof.se/foretag/villkor',
};
// Förstalarmet passerat: sidan svarar och länkar fortfarande vårt dokument.
const SIDA_OK = { hamtadOk: true, lankar: [POST.kalla, 'https://x.se/annat.pdf'] };
const SETT = (extra = {}) => ({ hamtadOk: true, hash: 'a'.repeat(64), sida: SIDA_OK, ...extra });

describe('villkorsvakten · domaren', () => {
  test('oförändrat dokument → förseglad, citatet står bevisbart kvar', () => {
    const d = bedomVillkorspost(POST, SETT(), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.FORSEGLAD);
    assert.equal(d.ok, true);
    assert.equal(d.aktion, null);
  });

  test('omskrivet dokument → ANDRAD, men vakten påstår ALDRIG att citatet fallit', () => {
    const d = bedomVillkorspost(POST, SETT({ hash: 'b'.repeat(64) }), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.ANDRAD);
    assert.equal(d.ok, false);
    // Skillnaden mellan en ärlig vakt och en gissande: vi vet att DOKUMENTET ändrats,
    // inte att klausulen ändrats. Texten får inte påstå det senare.
    assert.doesNotMatch(d.text, /citatet (har )?(fallit|försvunnit|ändrats)/i);
    assert.match(d.aktion, /Läs om klausulen/);
  });

  // ── DEN VIKTIGASTE REGELN ────────────────────────────────────────────────────────────────
  test('oåtkomligt dokument är ALDRIG godkänt (Fortnox-404-läxan)', () => {
    for (const sett of [{ hamtadOk: false, sida: SIDA_OK }, { hamtadOk: true, hash: null, sida: SIDA_OK }, {}, null]) {
      const d = bedomVillkorspost(POST, sett, IDAG);
      assert.equal(d.ok, false, JSON.stringify(sett));
      assert.equal(d.utfall, VILLKOR_UTFALL.OATKOMLIG);
    }
  });

  test('post utan hash → OFÖRSEGLAD, och vakten lämnar ut hashen att försegla med', () => {
    const d = bedomVillkorspost({ ...POST, dokumentSha256: null }, SETT({ hash: 'c'.repeat(64) }), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.OFORSEGLAD);
    assert.equal(d.ok, false);          // ännu inte bevisat = inte grönt
    assert.match(d.aktion, /dokumentSha256: 'c{64}'/);
  });

  // Fällan: hämta dagens hash, klistra in, grönt. Då har vi ankrat ett dokument ingen läst.
  test('ankare nyare än läsningen → OFÖRSEGLAD ("verifierat" måste förtjänas)', () => {
    const d = bedomVillkorspost(
      { ...POST, verifierad: '2026-07-03', forsegladDatum: '2026-08-09' },
      SETT(), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.OFORSEGLAD);
    assert.equal(d.ok, false);
    assert.match(d.aktion, /Ett ankare utan läsning/);
  });

  test('ankare och läsning samma dag → förseglad', () => {
    const d = bedomVillkorspost(
      { ...POST, verifierad: '2026-07-03', forsegladDatum: '2026-07-03' },
      SETT(), IDAG);
    assert.equal(d.ok, true);
  });

  test('post utan proveniens fälls före allt annat (regel 3)', () => {
    for (const trasig of [{ ...POST, kalla: null }, { ...POST, citat: null }, { ...POST, verifierad: null }]) {
      assert.equal(bedomVillkorspost(trasig, SETT(), IDAG).ok, false);
    }
  });

  test('oförändrat men för gammalt → GAMMAL (ett dokument kan stå stilla och ändå vara fel läst)', () => {
    const gammal = { ...POST, verifierad: '2025-01-01' };
    const d = bedomVillkorspost(gammal, SETT(), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.GAMMAL);
    assert.equal(d.ok, false);
    assert.ok(VILLKOR_MAX_ALDER_DAGAR >= 30 && VILLKOR_MAX_ALDER_DAGAR <= 365);
  });

  // ── FÖRSTALARMET (grundarbeslut 2026-08-09) ──────────────────────────────────────────────
  // Det verkliga felet är inte att filen skrivs om — det är att leverantören publicerar en NY
  // version på en NY adress och byter länken. Vår fastnålade fil ligger då kvar oförändrad.
  test('villkorssidan länkar inte längre vårt dokument → KALLA_BORTA (ny version)', () => {
    const d = bedomVillkorspost(POST, SETT({ sida: { hamtadOk: true, lankar: ['https://x.se/ny-version-270101.pdf'] } }), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.KALLA_BORTA);
    assert.equal(d.ok, false);
    assert.match(d.aktion, /hitta det gällande dokumentet/);
  });

  test('villkorssidan oläsbar är ALDRIG godkänt', () => {
    const d = bedomVillkorspost(POST, SETT({ sida: { hamtadOk: false, lankar: null, fel: 'HTTP 404' } }), IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.SIDA_OATKOMLIG);
    assert.equal(d.ok, false);
  });

  // Kärnan i hela ombyggnaden: en post vars enda vakt strukturellt inte KAN larma får aldrig
  // vara grön. Telias asset-URL är oföränderlig — utan villkorssida vore hashen evigt grön.
  test('oföränderlig adress utan villkorssida → OVAKTBAR, aldrig grön', () => {
    const telia = {
      supplier: 'Telia',
      kalla: 'https://www.telia.se/assets/m/2bcd4437783424fe/original/telias-allmanna-villkor-tjanster-foretag-260401.pdf',
      citat: '19.6 Om Avtalet gäller tills vidare utan särskild uppsägningstid…',
      verifierad: '2026-07-05', dokumentSha256: 'a'.repeat(64), villkorssida: null,
    };
    const d = bedomVillkorspost(telia, { hamtadOk: true, hash: 'a'.repeat(64) }, IDAG);
    assert.equal(d.utfall, VILLKOR_UTFALL.OVAKTBAR);
    assert.equal(d.ok, false);
  });

  test('heuristiken känner igen innehållsadresserade adresser — och bara upphäver grönt', () => {
    assert.equal(adressenKanAldrigAndras('https://www.telia.se/assets/m/2bcd4437783424fe/original/x.pdf'), true);
    assert.equal(adressenKanAldrigAndras('https://assets.ctfassets.net/nproz1mx87a8/11Kp/x.pdf'), true);
    // Stabil sökväg: filen skrivs om på plats eller 404:ar — hash-vakten kan larma.
    assert.equal(adressenKanAldrigAndras('https://www.bahnhof.se/filestorage/userfiles/Villkor/v.pdf'), false);
  });

  test('tom bok är aldrig grön — då finns inget att vakta, och det ska synas', () => {
    const r = bedomVillkorsbok({}, {}, IDAG);
    assert.equal(r.ok, false);
    assert.match(r.sammanfattning, /tom/i);
  });
});

// ── BOKEN KAN INTE VÄXA OVAKTAD ──────────────────────────────────────────────────────────────
// Prisbokens läxa var inte "sätt på schemat igen" utan att en post som ingen vaktar ser ut som
// en verifierad post. Här gäller det dubbelt: villkorsboken växer med en leverantör i taget,
// och varje ny post ska födas med sin proveniens. Testet gör tillväxten säker per konstruktion.
describe('villkorsboken · varje post bär sin proveniens', () => {
  const nycklar = Object.keys(VILLKORSBOK);

  test('boken är inte tom', () => {
    assert.ok(nycklar.length >= 1, 'avtalsklockan behöver minst en kurerad villkorspost');
  });

  for (const k of nycklar) {
    test(`${k}: källa, ordagrant citat och verifieringsdatum`, () => {
      const p = VILLKORSBOK[k];
      assert.match(p.kalla ?? '', /^https:\/\//, 'käll-URL saknas eller är inte https');
      assert.ok((p.citat ?? '').length >= 20, 'citatet ska vara ordagrant, inte en sammanfattning');
      assert.match(p.verifierad ?? '', /^\d{4}-\d{2}-\d{2}$/, 'verifieringsdatum saknas');
    });

    // ── DET VERKLIGA LÅSET MOT EN OVAKTBAR POST ──────────────────────────────────────────
    // En post fastnålad vid en oföränderlig adress utan villkorssida har ingen vakt som ens KAN
    // larma. Den får inte finnas i boken — den skulle styra ett uppsägningsdatum med en
    // bevakning som bara är inbillad. Låset gäller varje befintlig OCH varje framtida post.
    test(`${k}: är vaktbar — någon vakt kan faktiskt larma`, () => {
      const d = bedomVillkorspost(VILLKORSBOK[k], SETT({ hash: VILLKORSBOK[k].dokumentSha256 ?? 'x'.repeat(64) }), IDAG);
      assert.notEqual(d.utfall, VILLKOR_UTFALL.OVAKTBAR,
        `${k} är fastnålad vid en oföränderlig adress utan villkorssida — lägg till villkorssida`);
    });

    test(`${k}: går att döma av vakten (ingen post står utanför)`, () => {
      // Ingen post får vara osynlig för vakten. Ett fält som saknas ska ge ett rött utfall,
      // aldrig ett tyst hopp över posten.
      const d = bedomVillkorspost(VILLKORSBOK[k], SETT({ hash: 'x'.repeat(64) }), IDAG);
      assert.ok(Object.values(VILLKOR_UTFALL).includes(d.utfall));
      assert.equal(typeof d.ok, 'boolean');
    });
  }
});
