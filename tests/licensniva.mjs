// tests/licensniva.mjs — VI JÄMFÖR MOT DEN PRODUKT KUNDEN FAKTISKT KÖPT.
//
// BAKGRUNDEN (2026-08-19). Rummet visade "184 % över lägsta pris" och Arvo Score 15 på en
// Microsoft-rad vars egen fakturatext sa "Microsoft 365 E3". Vi mätte mot Business Standard:
//
//   Business Standard  1 606 kr/anv/år  → kunden +184 %   ← det kunden såg
//   E3 (deras nivå)    5 001 kr/anv/år  → kunden  −9 %    ← sanningen
//
// Ett bra avtal presenterat som en katastrof. Det var den blindfläck tests/prisunderlag.mjs
// deklarerade i klartext kvällen innan — och den materialiserades inom ett dygn, åt kundens
// nackdel. Like-for-like-ärligheten gäller åt BÅDA håll: vi får varken lova en besparing som
// kräver nedgradering, eller anklaga en kund för överbetalning genom att mäta mot en billigare
// produkt än den de köpt.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: (a) att en bevisad nivå inte används som jämförelsegrund, (b) att en GISSAD nivå
//           smyger in (bart "E3", Office 365, Copilot-paket, blandad faktura), (c) att taket
//           hämtas från en annan produkt än golvet, och (d) att kundytan inte längre skiljer
//           bekräftad nivå från obekräftad. Prövas genom att ANROPA funktionerna.
//   BLIND:  vakten läser bara fakturans RADTEXT. Står nivån inte där — och det gör den inte på
//           6 av 7 uppmätta rader — kan den inte bevisas härifrån, och då faller vi tillbaka på
//           kategorins golv med en uttalad reservation i kortet. Vakten vet heller inte om
//           radtexten är SANN; att "Microsoft 365 E3" står på pappret bevisar inte att det är
//           vad kunden faktiskt använder. Rätt-storleks-frågan (behöver de E3?) är en annan
//           fråga med en egen motor och prövas inte här.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { lasLicensniva, nivaGolv } from '../lib/licensniva.js';
import { byggPrisunderlag, scoreUrUnderlag } from '../lib/prisunderlag.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const ANKARE = {
  p25: 1606, median: 1927, unitLabel: 'per användare/år',
  lastVerified: '2026-08-05', referensProdukt: 'Microsoft 365 Business Standard',
};
const bygg = (rader, kostnad = 45600, seats = 10) => {
  const n = lasLicensniva(rader);
  const g = n ? nivaGolv(n, TIERS) : null;
  return byggPrisunderlag({ annualCost: kostnad, seats, ankare: ANKARE, niva: g ? { ...g, kalla: n.kalla } : null });
};

describe('LICENSNIVÅ · jämförelsen gäller kundens egen produkt', () => {
  test('LN-01 · grundarens rad: E3 ur radtexten vänder −9 %, inte +184 %', () => {
    const u = bygg([{ description: 'Microsoft 365 E3' }, { description: 'Support' }]);
    assert.equal(u.nivaBekraftad, true);
    assert.equal(u.nivaNamn, 'Microsoft 365 E3');
    assert.equal(u.golv, 5001, 'E3 årsavtal 416,77 × 12');
    assert.equal(u.avstandPct, -9);
    assert.equal(u.underGolv, true);
    assert.equal(scoreUrUnderlag(u), 92, 'ett avtal under sin egen nivås listpris är friskt');
  });

  test('LN-02 · utan bevisad nivå faller vi tillbaka — och SÄGER att den inte är bekräftad', () => {
    const u = bygg([{ description: 'Licensavgift' }]);
    assert.equal(u.nivaBekraftad, false);
    assert.equal(u.golv, 1606, 'kategorins billigaste jämförbara');
    assert.equal(u.avstandPct, 184);
    // Fallet är inte fel — det är ofullständigt, och kortet måste kunna säga skillnaden.
    assert.equal(u.nivaNamn, null);
  });

  test('LN-03 · E3/E5-fällan: bart "E3" och Office 365 räknas ALDRIG som Microsoft 365', () => {
    // Prisboken varnar uttryckligen: Office 365 E3 (256 kr) ≠ Microsoft 365 E3 (416,77 kr).
    // Ett bart "E3" kan vara vilketdera — och en gissad nivå bär precisionens auktoritet.
    assert.equal(lasLicensniva([{ description: 'E3 licens 10 st' }]), null, 'bart E3 är inte bevis');
    assert.equal(lasLicensniva([{ description: 'Office 365 E3' }]), null, 'annan produktfamilj');
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 E3' }]).nyckel, 'e3');
    assert.equal(lasLicensniva([{ description: 'M365 E5 Enterprise' }]).nyckel, 'e5');
  });

  test('LN-04 · Copilot-fällan: ett paketpris är inte planens pris', () => {
    // "Business Standard OCH Microsoft 365 Copilot" kostar 224,63 kr — inte Standards 133,82.
    // Prisboken har hela sin m365-verifierare byggd runt just den förväxlingen.
    assert.equal(lasLicensniva([{ description: 'Business Standard med Copilot för företag' }]), null);
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 E3 (EES exkl. Teams)' }]), null);
  });

  test('LN-05 · blandad faktura → ingen enskild nivå att mäta helheten mot', () => {
    // Två olika nivåer på samma faktura: årskostnaden hör inte till någon av dem ensam.
    // Båda raderna bär produktfamiljen — annars prövar testet inte blandningen utan familjekravet.
    const blandad = [{ description: 'Microsoft 365 E3' }, { description: 'Microsoft 365 Business Premium' }];
    const u = bygg(blandad);
    assert.equal(u.nivaBekraftad, false, 'hellre kategorins golv än fel nivå');
    assert.equal(lasLicensniva(blandad), null);
    // Samma nivå på flera rader är däremot entydigt.
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 E3' }, { description: 'Microsoft 365 E3 tillägg' }]).nyckel, 'e3');
  });

  test('LN-06 · taket kommer från SAMMA produkt som golvet', () => {
    // Annars staplas E3:s golv (5 001) på Business Standards tak (1 927) i samma kort — varje
    // tal sant, helheten omöjlig. Det är Helhetskravet, och det var nära att gå ut.
    const u = bygg([{ description: 'Microsoft 365 E3' }]);
    assert.equal(u.median, 6001, 'E3 månadsvis 500,12 × 12');
    assert.ok(u.median > u.golv, 'utan bindning ska alltid vara dyrare än årsavtal');
  });

  test('LN-07 · en nivå utan verifierat SEK-pris duger inte som golv', () => {
    // Googles nivåer är sekPublic:false (endast USD publikt). De får aldrig bära ett SEK-golv.
    assert.equal(nivaGolv({ nyckel: 'google-standard', namn: 'x' }, TIERS), null);
    assert.equal(nivaGolv({ nyckel: 'finns-inte', namn: 'x' }, TIERS), null);
    assert.equal(nivaGolv(null, TIERS), null);
  });

  test('LN-09 · en ANNAN leverantörs nivå med samma namn är aldrig vår', () => {
    // FÅNGAT AV SONDEN MOT PRODUKTIONSDATA, samma dag modulen skrevs. Första versionen krävde
    // produktfamiljen bara för E3/E5. En Google Workspace-faktura ("Google Workspace Business
    // Standard") lästes därför som Microsoft 365 Business Standard och fick Microsofts golv —
    // exakt fel-produkt-felet modulen byggdes för att ta bort, återinfört spegelvänt inom en timme.
    //
    // Google Workspace Business Standard finns på riktigt och kostar $14/anv/mån. Vi har inget
    // verifierat SEK-pris för den (sekPublic:false), så den får aldrig bära ett svenskt golv.
    for (const text of [
      'Google Workspace Business Standard',
      'Zoho Workplace Business Standard',
      'Dropbox Business Standard',
    ]) {
      assert.equal(lasLicensniva([{ description: text }]), null, `${text} är inte Microsofts nivå`);
    }
    // Och nivån UTAN familjen bevisar ingenting — "Business Standard" säljs av flera.
    assert.equal(lasLicensniva([{ description: 'Business Standard 10 st' }]), null);

    // ── DÄR LEVERANTÖRSSPÄRREN ÄR DET ENDA SOM HÅLLER ────────────────────────────────────
    // Familjekravet ensamt räcker inte här: raden bär BÅDE "Microsoft 365 Business Standard"
    // OCH en annan leverantörs namn. Återförsäljarfakturor buntar rutinmässigt flera produkter
    // i en radbeskrivning, och då vet vi inte vilken av dem beloppet avser. Utan den här
    // spärren skulle vi tro oss veta. (Sabotaget på spärren fällde inget förrän det här fallet
    // fanns — en vakt vars sabotage inte fäller är ingen vakt.)
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 Business Standard + Google Workspace' }]), null,
      'blandad radbeskrivning → vi vet inte vilken produkt beloppet avser');
    assert.equal(lasLicensniva([{ description: 'M365 E3 och Zoom Pro, paket' }]), null);
    // Med familjen i texten är den däremot entydig.
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 Business Standard' }]).nyckel, 'business-standard');
    assert.equal(lasLicensniva([{ description: 'M365 Business Premium' }]).nyckel, 'business-premium');
  });

  test('LN-10 · en DISKVALIFICERAD licensrad gör fakturan blandad — den försvinner inte', () => {
    // ── GRUNDARENS MICROSOFT-FAKTURA 2026-09-08 ─────────────────────────────────────────────
    //   MS-PREM  Microsoft 365 Business Premium         210,29   2 102,90   ← 32 % av pengarna
    //   MS-E3    Office 365 E3                    12    380,00   4 560,00   ← 68 % av pengarna
    //
    // `DISKVALIFICERAR` gör rätt sak med rad 2: Office 365 E3 ≠ Microsoft 365 E3, och raden får
    // aldrig bära M365 E3:s golv. Men den `continue`:ades — raden blev OSYNLIG i stället för att
    // räknas. Kvar stod exakt EN träff, alltså passerade `traffar.size !== 1`, och hela fakturans
    // årskostnad jämfördes mot Business Premiums listpris:
    //
    //   seats 22 → +44 %      seats 12 → +164 %      seats 10 → +217 %
    //
    // Tre svar ur samma faktura, alla med `nivaBekraftad: true`. Spännvidden ÄR beviset att talet
    // inte är en mätning. Sanningen: Premium-raden ligger på ÖRET på listpris (210,29), och för
    // Office 365 E3 har prisboken inget verifierat svenskt golv alls.
    //
    // LN-05 vaktade «två IGENKÄNDA nivåer». Det här är samma sjukdom en nivå ned, och bibelns
    // centrala felfamilj: «jag kunde bara läsa en del av fakturan» representerat med ett värde
    // omöjligt att skilja från «jag läste hela».
    const grundarensFaktura = [
      { description: 'Microsoft 365 Business Premium', quantity: null, unitPrice: 210.29, amount: 2102.90 },
      { description: 'Office 365 E3',                  quantity: 12,   unitPrice: 380.00, amount: 4560.00 },
    ];
    assert.equal(lasLicensniva(grundarensFaktura), null,
      'en igenkänd nivå bredvid en diskvalificerad licensrad får aldrig representera hela fakturan');

    // Samma sak när den andra raden är en ANNAN LEVERANTÖRS licens (återförsäljarfakturan).
    assert.equal(lasLicensniva([
      { description: 'Microsoft 365 Business Standard' },
      { description: 'Google Workspace Business Starter' },
    ]), null, 'M365 + Google på samma faktura är blandad — inte en ren Business Standard-faktura');

    // Och när tillägget är Copilot: kundens årskostnad bär då BÅDA produkterna, så att mäta den
    // mot enbart Business Standards golv ger samma falska överbetalning.
    assert.equal(lasLicensniva([
      { description: 'Microsoft 365 Business Standard' },
      { description: 'Microsoft 365 Copilot' },
    ]), null, 'ett Copilot-tillägg ingår i årskostnaden — då är planens golv inte hela sanningen');

    // ── MOTPROVET: spärren får INTE fälla en vanlig faktura ──────────────────────────────────
    // En spärr som tystar allt är lika värdelös som ingen spärr (OB-23:s läxa). Rader som bara
    // saknar en nivåträff — support, frakt, avgifter — är inte andra produkter och tystar inget.
    assert.equal(lasLicensniva([
      { description: 'Microsoft 365 E3' },
      { description: 'Support' },
      { description: 'Fraktavgift' },
    ])?.nyckel, 'e3', 'rader utan nivåträff är inte andra licenser — de får aldrig tysta oss');
    assert.equal(lasLicensniva([{ description: 'Microsoft 365 Business Premium' }])?.nyckel,
      'business-premium', 'en ren enproduktsfaktura svarar som förut');
  });

  test('LN-11 · det finns EN läsare av "vilken nivå är den här raden?"', async () => {
    // ── GRUNDARENS KORT 2026-09-08 ──────────────────────────────────────────────────────────
    // Kortet skrev: «era 12 E3-licenser … Microsofts publika årsavtalspris för exakt samma
    // licens är 416,77 kr». Fakturan sa **Office 365 E3**. 416,77 kr är **Microsoft 365 E3**,
    // och prisbokens egen not på just den posten säger «Förväxla ej med Office 365 E3».
    //
    // Regeln fanns sedan 19 augusti — i DEN HÄR modulen. `LFL_TIER_RE` i recommend.js matchade
    // `/\bE3\b/i` utan familjekrav och utan diskvalificering, och det var den listan som byggde
    // meningen kunden läste. Två läsare av samma fråga; den OVAKTADE stod framför kunden.
    //
    // Mätt över hela fixturkorpusen (494 radtexter) gav den gamla läsaren tre träffar den nya
    // avvisar — och ingen av de tre var en Microsoft-licens:
    //   "Google Workspace Business Standard (15 lic)"   → fick M365 Business Standards SEK-pris
    //   "mobilabonnemang Tele2 Business Premium 1"      → fick M365 Business Premiums licenspris
    //   "mobilabonnemang Tele2 Business Premium 2"      → dito
    // Noll legitima tier-träffar tappade. Kostnaden var alltså inte täckning utan tre fel.
    const { radensNiva } = await import('../lib/licensniva.js');

    // (a) Fällorna: en nivå utan sin produktfamilj bevisar ingenting.
    assert.equal(radensNiva('Office 365 E3'), null, 'Office 365 E3 ≠ Microsoft 365 E3');
    assert.equal(radensNiva('E3'), null, 'ett bart E3 räcker aldrig');
    assert.equal(radensNiva('Google Workspace Business Standard (15 lic)'), null,
      'en Google-rad får aldrig Microsofts listpris');
    assert.equal(radensNiva('mobilabonnemang Tele2 Business Premium 1'), null,
      'ett mobilabonnemang är ingen M365-licensnivå');
    assert.equal(radensNiva('Microsoft 365 Copilot'), null, 'ett paket/tillägg är ingen plan');

    // ── DE FALL DÄR DISKVALIFICERINGEN ÄR DET ENDA SOM HÅLLER ────────────────────────────────
    // Sabotaget «ta bort DISKVALIFICERAR» fällde först INGET test: raderna ovan avvisas redan av
    // familjekravet, så spärren bar ingenting. En vakt vars sabotage inte fäller är ingen vakt
    // (LN-09 lärde sig exakt detta om leverantörsspärren 20 augusti). Här är raderna där
    // familjen FINNS, nivån FINNS, och bara diskvalificeringen står emellan — och det är
    // återförsäljarnas normalformuleringar, inte konstruerade fall.
    assert.equal(radensNiva('Microsoft 365 Business Standard med Copilot'), null,
      'Copilot-fällan: paketets pris är inte planens pris');
    assert.equal(radensNiva('Microsoft 365 E3 (migrerad från Office 365 E3)'), null,
      'raden namnger två produkter — då vet vi inte vilken beloppet avser');
    assert.equal(radensNiva('Microsoft 365 Business Premium exkl. Teams'), null,
      'EES-varianten är en egen SKU med eget pris');

    // (b) Motprovet: den läser fortfarande det den ska.
    assert.equal(radensNiva('Microsoft 365 E3'), 'e3');
    assert.equal(radensNiva('M365 Business Premium'), 'business-premium');
    assert.equal(radensNiva('Microsoft 365 Business Standard'), 'business-standard');

    // (c) EN LÄSARE, INTE TVÅ. Kärnan: `LFL_TIER_RE` får stå kvar som deklaration av vilka
    // nivåer LFL:en kan prissätta, men den får aldrig användas för att SVARA på frågan. Det var
    // uppdelningen som gjorde glidningen möjlig — samma sak som prisunderlaget 19 augusti, där
    // ett score som motsäger sitt underlag inte längre är ett tillstånd koden kan representera.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
    const rec = readFileSync(join(rot, 'agents/recommender/recommend.js'), 'utf8');
    const lasningar = [...rec.matchAll(/LFL_TIER_RE\s*\.\s*(?:find|some|filter)\b/g)];
    assert.deepEqual(lasningar.map((m) => m[0]), [],
      'LFL_TIER_RE används som LÄSARE i recommend.js — frågan ska ställas till radensNiva()');
    assert.match(rec, /import \{ radensNiva \} from '\.\.\/\.\.\/lib\/licensniva\.js'/,
      'recommend.js måste låna läsaren, aldrig skriva av mönstren');

    // (d) Och LFL:en ska faktiskt bygga rätt rader ur grundarens faktura — beteende, inte källtext.
    const { computeLikeForLikeSaasTarget } = await import('../agents/recommender/recommend.js');
    const lfl = computeLikeForLikeSaasTarget([
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: 210.29, amount: 2102.90, type: 'recurring_subscription' },
      { description: 'Office 365 E3',                  quantity: 12, unitPrice: 380.00, amount: 4560.00, type: 'recurring_subscription' },
    ], TIERS, 6662.90 * 12);
    assert.deepEqual(lfl.tierLines.map((t) => t.key), ['business-premium'],
      'Office 365 E3 får aldrig bli en prissatt tier-rad — den passerar som add-on till fakturapris');
    assert.equal(lfl.dominantTierKey, 'business-premium');
  });

  test('LN-08 · kundytan skiljer bekräftad nivå från obekräftad', async () => {
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rum = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../src/pages/Portfolio/index.js'), 'utf8');
    assert.match(rum, /nivaBekraftad/, 'rummet måste läsa flaggan');
    // Formuleringen skärptes 2026-08-20: i en kategori med bred produktspridning hävdar vi inte
    // längre ett avstånd alls utan bekräftad nivå — vi säger att vi inte kan säga det, och ber
    // om avtalet. Vakten prövar att den meningen finns, inte den gamla reservationen.
    assert.match(rum, /ovissNiva/, 'rummet måste läsa flaggan för obekräftad nivå');
    assert.match(rum, /kan vi inte\s+säga|säger inget om avståndet/i,
      'utan bekräftad nivå ska rummet säga att avståndet inte går att uttala sig om');
    assert.match(rum, /Dela avtalet/i, 'och be om det som skulle låsa jämförelsen');
    assert.match(rum, /Listpris för er nivå/,
      'med bekräftad nivå ska raden säga att det är DERAS nivå, inte kategorins billigaste');
  });
});
