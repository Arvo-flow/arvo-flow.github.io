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
