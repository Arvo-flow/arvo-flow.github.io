// tests/saasfinance-nyckeln.mjs — EN NYCKEL GENOM HELA STACKEN, OCH INGEN LEVERANTÖR I DEN.
//
// ══ VARFÖR (grundarorder 2026-09-22) ═══════════════════════════════════════════════════════
// Motorn i `lib/saas-finance-rightsizing.js` har aldrig varit Fortnox-specifik — samma stege
// betjänar Spiris/Visma eEkonomi, och `tests/spiris-recommendation.mjs` bevisade det körbart.
// Ändå hette fältet `recommendation.fortnoxRightsizing` hela vägen ut i kundytan, och den
// KUNDSYNLIGA meningen under kortet sa i klartext «Verifierad prisskillnad mot **Fortnox** publika
// listpris» — även när talen kom ur Spiris prislista. Rätt tal, fel proveniens, vilket regel 3
// räknar som fel. Det var inte bara ett fult namn: det var en osann källangivelse på en siffra.
//
// ══ DEN BÄRANDE INVARIANTEN, OCH VARFÖR DEN INTE ÄR EN STRÄNG I DEN HÄR FILEN ═══════════════
// Kontraktet har tre parter — producenten (`recommend.js`), serialiseringen (`api/test-invoice.mjs`)
// och konsumenten (`src/pages/TestaFaktura/index.js`). Skrev testet «nyckeln ska heta
// saasFinanceRightsizing» på alla tre ställena vore det FYRA kopior av samma sanning, och nästa
// omdöpning i ett av lagren hade lämnat sviten grön tills en kund tappade sitt kort.
//
// Därför HÄRLEDS namnet ur producenten och jämförs mot de två andra lagren. Byter någon ett lager
// ensamt faller sviten, oavsett vad det nya namnet är. Det är samma drag som `harledCeller`
// (18 augusti): nivån är sanningen, vyn är en vy.
//
// FÅNGAR: ett lager som döps om utan de andra · en återinförd leverantörslåst nyckel i
//   `lib/ api/ agents/ src/` · en kundsynlig proveniensmening som namnger en leverantör som
//   literal i stället för att läsa `rs.vendor` · en glömd cache-bump (CV-18).
// BLIND: filerna läses som TEXT. En nyckel som byggs dynamiskt (`'saasFinance' + 'Rightsizing'`)
//   eller nås via strängindex syns inte, och testet kan inte se om kortet RENDERAS — bara att
//   rätt nyckel läses. Renderingen bevisas av `npm run build` och av regel 8 (skärmdump).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { strippaStrangar } from '../lib/kalltextlexer.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const las = (p) => readFileSync(join(ROT, p), 'utf8');

const RECOMMEND = las('agents/recommender/recommend.js');
const API = las('api/test-invoice.mjs');
const YTAN = las('src/pages/TestaFaktura/index.js');

/**
 * Namnet ur PRODUCENTEN — raden som sätter fältet till rätt-storleks-objektet `rs`.
 * Ett `assert.ok` på matchningen är lastbärande: utan den blir `null?.[1]` ett `undefined` som
 * sedan «jämförs» mot de andra lagren och kan passera av tomhet.
 */
function nyckelnUrProducenten() {
  const m = RECOMMEND.match(/revisionGate: 'audited', (\w+): rs,/);
  assert.ok(m, 'hittade inte producentraden i recommend.js — bytte den form?');
  return m[1];
}

describe('SF · saas-finance-nyckeln är EN nyckel, och den bär ingen leverantör', () => {
  test('SF-01 · producenten sätter samma namn i BÅDA sina grenar', () => {
    const nyckel = nyckelnUrProducenten();
    // Träffgrenen sätter `rs`, tystnadsgrenen sätter `null`. Sätter de olika fält blir
    // «ingen rekommendation» omöjlig att skilja från «fältet finns inte» i kundytan.
    assert.match(RECOMMEND, new RegExp(`revisionGate: 'audited', ${nyckel}: null,`),
      `tystnadsgrenen sätter inte ${nyckel} — då bär de två grenarna olika fält`);
  });

  test('SF-02 · serialiseringen och kundytan läser PRODUCENTENS namn, inte sitt eget', () => {
    const nyckel = nyckelnUrProducenten();
    assert.match(API, new RegExp(`${nyckel}: recommendation\\.${nyckel} \\?\\? null,`),
      `api/test-invoice.mjs serialiserar inte ${nyckel} — fältet når aldrig klienten`);
    assert.match(YTAN, new RegExp(`result\\.recommendation\\?\\.${nyckel} &&`),
      `kundytans villkor läser inte ${nyckel} — kortet visas aldrig`);
    assert.match(YTAN, new RegExp(`const rs = result\\.recommendation\\.${nyckel};`),
      `kundytan hämtar talen ur ett annat fält än det den villkorar på`);
  });

  test('SF-03 · nyckeln namnger ingen leverantör, och den gamla finns ingenstans kvar', () => {
    const nyckel = nyckelnUrProducenten();
    // Motprovet åt andra hållet: hade regeln bara lytt «får inte heta fortnox…» vore den
    // uppfylld av `vismaRightsizing`, alltså samma sjukdom med ett annat varumärke.
    for (const varumarke of ['fortnox', 'visma', 'spiris', 'eekonomi']) {
      assert.equal(nyckel.toLowerCase().includes(varumarke), false,
        `${nyckel} namnger leverantören ${varumarke} — motorn betjänar flera`);
    }

    const filer = ['lib', 'api', 'agents', 'src'].flatMap(function svep(dir) {
      return readdirSync(join(ROT, dir)).flatMap((namn) => {
        if (['node_modules', 'build', '.git'].includes(namn)) return [];
        const rel = `${dir}/${namn}`;
        if (statSync(join(ROT, rel)).isDirectory()) return svep(rel);
        return ['.js', '.mjs', '.jsx'].includes(extname(namn)) ? [rel] : [];
      });
    });
    // En vakt som sveper noll filer är grön av tomhet — det mättes fram 15 augusti.
    assert.ok(filer.length > 250, `svepet hittade bara ${filer.length} filer — mätte det rätt träd?`);

    // `strippaStrangar` FÖRST — annars fäller svepet sina egna förklarande kommentarer, vilket
    // det gjorde på första körningen (tre filer, alla tre träffarna i text jag just skrivit OM
    // omdöpningen). Samma fälla som RD-08 och PV-17; lexern bor i lib/ just för att den behövs
    // av flera vakter. Här är den rätt verktyg: nyckeln vi jagar står som objektnyckel och
    // egenskapsåtkomst i KOD, aldrig inuti en sträng.
    const traffar = filer.filter((f) => /fortnoxRightsizing|detectFortnoxPaket/.test(strippaStrangar(las(f))));
    assert.deepEqual(traffar, [],
      `den leverantörslåsta nyckeln lever kvar i: ${traffar.join(', ')}`);
  });

  test('SF-04 · kundytans proveniensmening läser leverantören ur talens eget objekt', () => {
    // 2026-09-22: meningen löd «Verifierad prisskillnad mot Fortnox publika listpris» som en
    // LITERAL, under ett kort vars tal kunde komma ur Spiris prislista. Källan måste komma ur
    // samma objekt som talen — annars kan de två säga olika saker utan att något fäller.
    const i = YTAN.indexOf('const rs = result.recommendation.');
    assert.ok(i > 0, 'hittade inte rätt-storlekskortet i kundytan');
    const kortet = YTAN.slice(i, i + 2000);
    assert.ok(kortet.length > 1500, 'utsnittet blev för kort för att bevisa något');
    assert.match(kortet, /\{genitiv\(rs\.vendor\)\} publika listpris/,
      'proveniensen namnger inte leverantören ur rs.vendor (via genitiv())');
    assert.equal(/Fortnox publika listpris|Fortnox publika prislista/.test(kortet), false,
      'kortet namnger fortfarande Fortnox som källa oavsett vems pris det är');
  });

  test('SF-05 · CV-18 · cachen bumpades i samma commit som nyckeln bytte namn', () => {
    // En cachad payload från före bytet bär det GAMLA fältnamnet. Utan bumpen läser den nya
    // kundytan ett fält som inte finns i det cachade svaret, och kortet försvinner tyst för varje
    // faktura som redan låg i KV — ett tapp som ser ut som «kunden har inget att hämta».
    const m = API.match(/const cacheKey = `pdf:result:v(\d+):/);
    assert.ok(m, 'cacheKey-raden hittades inte');
    assert.ok(Number(m[1]) >= 28,
      `nyckeln heter ${nyckelnUrProducenten()} men pdf:result står på v${m[1]} — `
      + 'cachen serverar då svar med det gamla fältnamnet');
  });
});
