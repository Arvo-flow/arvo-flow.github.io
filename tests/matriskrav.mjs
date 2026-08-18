// tests/matriskrav.mjs — DET KUNDEN SER SKA GÅ ATT RÄKNA HEM MOT NÅGOT VI VERIFIERAT.
//
// BAKGRUNDEN (grundaren, 2026-08-18): "Varför är detta ens en fråga? Vi ska ALDRIG ha med ett
// pris som vi inte kan backa upp!"
//
// Rummet visade "Billigaste publicerade pris · verifierat 17 juni · 1 704 kr" som beviset bakom
// Arvo Score. Talet 1 704 matchade ingenting: inte det verifierade priset (133,82 × 12 = 1 606),
// inte priset före augustikorrigeringen (1 434), inte ens vad prisbokens egen not påstod (1 428).
// Det stod som en naken literal. Datumet var inte heller talets — det ärvdes från Googles
// USD-nivåer, som är sekPublic:false och per konstruktion uteslutna ur varje SEK-tal vi visar.
// Samma kategori bar en median som enligt notens egna ord var "typisk återförsäljarpris med
// standardpåslag": ett estimat, presenterat under source:'real-public'. Detsamma i loneadmin
// (median 2 400 = "typisk marknadspremie", tre gånger det verifierade golvet).
//
// VARFÖR INGET FÅNGADE DET. price-audit och alla 19 verifierare läser `licenseTierBenchmarks`.
// Kunden ser `matrix`. Exakt EN verifierare (tele2-mobil) läste faktiskt matriscellerna — och
// mobil var följaktligen den enda av tre real-public-kategorier som var hel. De andra två var
// obevakade på just det objekt som når kundytan. Det är E3/E5-läxan ett steg värre: där mätte
// kontrollen på för grov granularitet, här mätte den ett annat objekt.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: (a) en real-public-kategori vars celler inte går att räkna hem mot en verifierad
//           struktur, (b) en cell som drivit ifrån sin källa (handredigering, eller en nivå som
//           uppdaterats utan att cellen följde med), (c) en härledning som pekar på en nivå eller
//           ett fält som inte finns, (d) ett golv över taket (förväxlade fält vänder jämförelsen),
//           (e) en NY real-public-kategori som varken deklarerar härledning eller vaktas av en
//           verifierare som läser dess matris — den faller, den slinker inte igenom.
//   BLIND:  vakten vet inte om NIVÅN är sann. Att 133,82 verkligen är Microsofts pris i dag är
//           verifierarnas jobb (m365.mjs mot live-sidan), inte det här testets. Vakten binder ihop
//           cell och nivå; verifieraren binder ihop nivå och verklighet. Ingen av dem kan ersätta
//           den andra, och båda måste vara gröna för att talet ska få kallas verifierat.
//           Den vet heller inte om referensprodukten är RÄTT produkt för kundens rad — ligger
//           kunden på Google Workspace och golvet avser M365 Business Standard är cellen formellt
//           korrekt och sakligt en annan produkt. Den luckan bor i kundytans formulering
//           (raden namnger referensprodukten), inte här.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BRANCHINDEX, harledCeller } from '../agents/recommender/branchindex.js';

const HAR = dirname(fileURLToPath(import.meta.url));
const VERIFIERARE = join(HAR, '..', 'lib', 'verifiers');

// Vilka kategorier PÅSTÅR sig visa verifierade publika priser? Bara de prövas — 'estimated',
// 'mock' och 'requires_quote' ljuger inte om vad de är, och revisionsgrinden håller dem talfria.
function realPublicKategorier() {
  return Object.entries(BRANCHINDEX)
    .filter(([, c]) => c?.source === 'real-public' && c?.matrix && Object.keys(c.matrix).length)
    .map(([k]) => k);
}

// Kategorier vars matrisceller läses av en verifierare mot en live-källa (mobil-mönstret).
// Härleds ur verifierarnas källkod — en avskriven lista hade kunnat glida isär från vad som körs.
function kategorierMedMatrisverifierare() {
  const ut = new Set();
  for (const f of readdirSync(VERIFIERARE).filter((n) => n.endsWith('.mjs'))) {
    const src = readFileSync(join(VERIFIERARE, f), 'utf8');
    if (!/BRANCHINDEX[^\n]*\.matrix|matrix\.[a-z]+\.[a-z]+/.test(src)) continue;
    for (const m of src.matchAll(/BRANCHINDEX[.[]'?([a-zA-Z0-9_-]+)'?\]?[^\n]*matrix/g)) ut.add(m[1]);
  }
  return ut;
}

describe('MATRISKRAV · varje kundsynligt pris ska gå att räkna hem', () => {
  test('MK-01 · varje real-public-kategori härleder sina celler ELLER vaktas på matrisnivå', () => {
    const vaktade = kategorierMedMatrisverifierare();
    const odeklarerade = realPublicKategorier()
      .filter((k) => !BRANCHINDEX[k].cellHarledning && !vaktade.has(k));
    assert.deepEqual(odeklarerade, [],
      `real-public utan härledning och utan matrisverifierare (talen når kund utan täckning): ${odeklarerade.join(', ')}`);
  });

  test('MK-02 · vakten hittar faktiskt något att pröva (grön av tomhet är inget svar)', () => {
    // En kontroll som matchar noll kategorier blir grön för att den inte tittar. Det var precis
    // triage-bokföringens första fällda antagande.
    const kat = realPublicKategorier();
    assert.ok(kat.length >= 3, `förväntade minst 3 real-public-kategorier, hittade ${kat.length}`);
    const harledda = kat.filter((k) => BRANCHINDEX[k].cellHarledning);
    assert.ok(harledda.length >= 2, `förväntade minst 2 härledda kategorier, hittade ${harledda.length}`);
    assert.ok(kategorierMedMatrisverifierare().has('mobil'),
      'tele2-mobil-verifieraren ska hittas som matrisvakt — hittas den inte är detektorn trasig');
  });

  test('MK-03 · varje härledd cell stämmer med sin källa, tal för tal', () => {
    for (const k of realPublicKategorier()) {
      const cat = BRANCHINDEX[k];
      if (!cat.cellHarledning) continue;
      const h = harledCeller(cat);
      assert.ok(h, `${k}: härledningen ger inget resultat — pekar den på en nivå/ett fält som inte finns?`);
      for (const [seg, band] of Object.entries(cat.matrix)) {
        for (const [storlek, cell] of Object.entries(band)) {
          const v = h.alla ?? h.per?.[storlek];
          assert.ok(v, `${k}.${seg}.${storlek}: härledningen täcker inte bandet`);
          assert.equal(cell.p25, v.p25, `${k}.${seg}.${storlek}.p25 har drivit ifrån källan`);
          assert.equal(cell.median, v.median, `${k}.${seg}.${storlek}.median har drivit ifrån källan`);
        }
      }
    }
  });

  test('MK-04 · golvet ligger aldrig över taket', () => {
    // Förväxlade fält (årsavtal ↔ månadsvis) vänder hela jämförelsen i kundytan: "ni ligger under
    // det billigaste" blir sant för alla, och kortet kan bara producera ett budskap. Samma fel som
    // marknadsankaret hade när det ställde framförhandlat pris mot skyltpris.
    for (const k of realPublicKategorier()) {
      for (const [seg, band] of Object.entries(BRANCHINDEX[k].matrix)) {
        for (const [storlek, cell] of Object.entries(band)) {
          assert.ok(cell.p25 > 0 && cell.median > 0, `${k}.${seg}.${storlek}: tomt pris i en real-public-cell`);
          assert.ok(cell.p25 <= cell.median, `${k}.${seg}.${storlek}: golv ${cell.p25} > tak ${cell.median}`);
        }
      }
    }
  });

  test('MK-05 · kategorins datum kommer från källan som bär talet', () => {
    // Rummet skrev "verifierat 17 juni" bredvid ett Microsoft-pris verifierat 5 augusti, för att
    // datumet ärvdes från Googles USD-nivåer — nivåer som är uteslutna ur varje SEK-tal vi visar.
    // Rätt siffra, fel proveniens; regel 3 räknar det som fel.
    for (const k of realPublicKategorier()) {
      const cat = BRANCHINDEX[k];
      if (!cat.cellHarledning) continue;
      const h = harledCeller(cat);
      assert.ok(h.lastVerified, `${k}: källan saknar datum — "verifierat" utan NÄR är ett halvt påstående`);
      assert.equal(cat.lastVerified, h.lastVerified,
        `${k}: kategorins datum (${cat.lastVerified}) är inte källans (${h.lastVerified})`);
    }
  });

  test('MK-06 · saas-productivity och loneadmin bär exakt de tal källan ger', () => {
    // Talen skrivs ut här med sin aritmetik, så att en framtida ändring måste passera en människa
    // som ser vad den ändrar — inte bara ett test som följer med automatiskt.
    const saas = BRANCHINDEX['saas-productivity'].matrix.byraer.micro;
    assert.equal(saas.p25, 1606, 'M365 Business Standard årsavtal 133,82 × 12');
    assert.equal(saas.median, 1927, 'samma licens månadsvis utan bindning 160,58 × 12');

    const lon = BRANCHINDEX.loneadmin.matrix.byraer;
    assert.equal(lon.micro.p25, 778, 'Fortnox Lön (199/5 + 25) × 12');
    assert.equal(lon.small.p25, 419, 'Fortnox Lön (199/20 + 25) × 12');
    assert.equal(lon.mid.p25, 324, 'Fortnox Lön (199/100 + 25) × 12');
    assert.equal(lon.micro.median, lon.micro.p25, 'en verifierad leverantör → ett pris, ingen fördelning');
  });

  test('MK-08 · varje verifierat pris säger vilken produkt det är priset PÅ', () => {
    // Ett pris utan produkt är ett tal utan påstående. Raden "Billigaste publicerade pris 1 606 kr"
    // på en Google Workspace-rad läses av varje CFO som Googles pris — men talet är M365 Business
    // Standard. Att namnge referensprodukten är skillnaden mellan en jämförelse och en antydan.
    for (const k of realPublicKategorier()) {
      const p = BRANCHINDEX[k].referensProdukt;
      assert.ok(typeof p === 'string' && p.trim().length >= 4,
        `${k}: saknar referensProdukt — talet når kundytan utan att säga vad det är priset på`);
    }
  });

  test('MK-07 · inget kundsynligt pris får uppfinna en bransch- eller storleksspridning', () => {
    // Ett LISTPRIS varierar inte med kundens SNI-kod. saas-productivity hade byraer 2 880 mot
    // hantverkare 2 400 — Microsoft tar inte olika betalt av en byrå och en hantverkare.
    // Storleksvariation är tillåten ENDAST när avgiftsstrukturen faktiskt beror på antalet
    // enheter (loneadmin: fast avgift utslagen på fler anställda), och då måste den härledas.
    for (const k of realPublicKategorier()) {
      const cat = BRANCHINDEX[k];
      const perBand = !!cat.cellHarledning?.representant;
      const segment = Object.values(cat.matrix);
      const forsta = segment[0];
      for (const seg of segment) {
        for (const storlek of Object.keys(seg)) {
          assert.deepEqual(seg[storlek], forsta[storlek],
            `${k}: priset skiljer sig mellan branscher — ett listpris gör inte det`);
        }
      }
      if (!perBand) {
        const band = Object.values(forsta);
        for (const b of band) assert.deepEqual(b, band[0],
          `${k}: priset skiljer sig mellan storleksband utan en avgiftsstruktur som motiverar det`);
      }
    }
  });
});
