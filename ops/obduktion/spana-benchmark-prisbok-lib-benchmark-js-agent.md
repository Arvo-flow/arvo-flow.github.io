# Obduktion · benchmark-prisbok (lib/benchmark.js, agents/recommender/branchindex.js, lib/jamforelsekalla.js + varje konsument av getBenchmark/getPublicListBenchmark)

> STATUS: **OPRÖVAD**. Fynden nedan är HYPOTESER från en spanande agent.
> Motprövningen dog på sessionsgränsen 2026-08-22 och hann aldrig döma dem.
> Ingen av dem får skrivas in i bibeln eller åtgärdas förrän den har ett eget bevis.

## 1. Prospect-kortet renderar SAMMA verifierade listpris som två olika tal (32 000 och 30 000) — avrundningen ligger på per-licenspriset, inte på totalen

- **fil:** `lib/outbound-estimator.js`:118
- **familj:** tva-sanningar · **allvar:** kundsynlig
- **konsekvens:** På samma kort i /prospect står «Typisk marknadskostnad 32 000–38 500 kr/år» (låg-änden ÄR p25 = M365 Business Standard årsavtal, 1 606 kr/licens/år) och direkt under «Arvo-pris, verifierat listpris 30 000 kr/år · 125 kr/mån per licens» — samma pris, två tal. 125 kr/mån är inget verifierat pris: det är round500(133,82 × 12)/12. Etiketterna (src/pages/Prospect/index.js:257-260 «Arvo-pris, verifierat listpris», api/generate-prospect.mjs:161 «Arvo-priset (verifierat listpris)») påstår proveniens som talet inte har (regel 3). Effekten på pengarna: «Sannolik premie ≈ 8 500 kr/år» mot den sanna listprisdifferensen 6 420 kr — 32 % för hög, och uppåt är den farliga riktningen under 20 % success fee. Mobil-grenen gör rätt (avrundar bara totalen, per-SIM-priset står orört på 269 kr), så felet är isolerat till M365-grenen.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { estimateForProfile } from './lib/outbound-estimator.js'; import { BRANCHINDEX } from './agents/recommender/branchindex.js'; const t = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['business-standard']; const r = await estimateForProfile({segment:'byraer',sizeBucket:'small',employees:20,mxPlatform:'microsoft365',industry:'it-tech'}); const m = r.categories.find(c=>c.category==='m365'); console.log('typicalLow (= p25 x 20):', m.typicalLow); console.log('arvoAnnual  (= samma p25 x 20):', m.arvoAnnual); console.log('per licens/man kunden ser:', m.pricePerSim.arvo, 'kr  vs verifierat', t.msrpAnnual, 'kr'); console.log('premie som visas:', m.savingCentral, ' sann premie:', 20*(1927-Math.round(t.msrpAnnual*12)));"
```

**Rapporterat utfall:**
```
typicalLow (= p25 x 20): 32000
arvoAnnual  (= samma p25 x 20): 30000
per licens/man kunden ser: 125 kr  vs verifierat 133.82 kr
premie som visas: 8500  sann premie: 6420
```

## 2. bucketForSize faller tyst till 'micro' för allt över 249 anställda — det största bolaget får det minsta bolagets prisgolv

- **fil:** `agents/recommender/branchindex.js`:49
- **familj:** okant-som-giltigt · **allvar:** kundsynlig
- **konsekvens:** `?? 'micro'` är ett «utanför skalan»-tillstånd återgivet med ett fullt giltigt bandnamn — omöjligt att skilja från ett riktigt 1–9-personersbolag. api/test-invoice.mjs:393 släpper uttryckligen igenom employees upp till 5000, och api/generate-prospect kan dessutom skriva över talet med Bolagsverkets riktiga siffra. Tre konsumenter drabbas: (1) KUNDSYNLIGT — branschankaret i rummet visar «Billigaste publicerade pris 778 kr per anställd/år · Fortnox Lön · verifierat» för ett bolag med 300 anställda, medan prisbokens EGEN verifierade avgiftsstruktur (199 kr/mån fast + 25 kr/anst/mån) ger 308 kr. 2,5× fel, och felet går att räkna hem mot noten som står på samma kort. (2) getBenchmark (lib/benchmark.js:167) slår upp BUCKET_RANGES.micro och frågar livedatan efter bolag med 1–9 anställda som jämförelsekohort. (3) storeDatapoint (lib/benchmark.js:271) SKRIVER 300-personersbolagets årskostnad i cellen `micro` — den kollektiva sanningens 1–9-cell förgiftas, och 3σ-spärren är avstängd under n=10, dvs. precis i de celler som är tunnast. För `el` (reviderad kategori) blir språnget 8,4×: p25 88 000 kr vid 249 anställda, 10 500 kr vid 250.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { buildBranchAnchors } from './api/invoice-history.mjs'; import { getBenchmark, bucketForSize } from './agents/recommender/branchindex.js'; for (const s of [249,250,300]) { const a = (await buildBranchAnchors([{route:'auto',category:'loneadmin',seat_count:s,annual_cost:s*310}])).loneadmin; console.log('anstallda='+s, 'bucket='+bucketForSize(s), 'ankaret visar p25='+a.p25, a.unitLabel, '| Fortnox verkliga golv =', Math.round((199/s+25)*12)); } for (const s of [249,250]) console.log('el p25 vid', s, 'anstallda =', getBenchmark({category:'el',industry:'konsult',employees:s}).p25);"
```

**Rapporterat utfall:**
```
anstallda=249 bucket=mid ankaret visar p25=324 per anställd/år | Fortnox verkliga golv = 310
anstallda=250 bucket=micro ankaret visar p25=778 per anställd/år | Fortnox verkliga golv = 310
anstallda=300 bucket=micro ankaret visar p25=778 per anställd/år | Fortnox verkliga golv = 308
el p25 vid 249 anstallda = 88000
el p25 vid 250 anstallda = 10500
```

## 3. Bredbandsgolvet kan ALDRIG bära sitt listprisanspråk — prisboken har datumet (2026-08-18), läsvägen släpper det aldrig igenom

- **fil:** `agents/recommender/branchindex.js`:1303
- **familj:** tyst-tapp · **allvar:** kundsynlig
- **konsekvens:** `bredbandSpeedBenchmark()` är den ENDA producenten av källan 'tele2-verified' (verifierat med grep över hela repot) och dess returobjekt sätter aldrig `lastVerified` — trots att `tele2Verified.lastVerified` finns i prisboken och till och med skrivs ut mitt i objektets egen `note`. jamforelsekalla.js:162 kräver `lastVerified != null`, så villkoret `LISTPRISKALLOR.has('tele2-verified')` (rad 117) är en gren som inte kan bli sann i produktion. Kunden får därför på en bredbandsanalys: kvittoraden «listpris · ej prövbar — jämförelsepriset saknar verifieringsdatum, odaterat pris kallas aldrig verifierat» bredvid ett pris vars egen not säger «verifierat Tele2 adress-API 2026-08-18»; savingRange sätts till ±25 % i stället för ±12 %; och beräkningskedjans källa skrivs «Arvo branschindex (maj 2026)» för ett pris som kommer ur Tele2:s adress-API. Exakt samma sjukdom som BA-09 (2026-08-15, «prisboken bar lastVerified hela tiden; getBenchmark släppte det aldrig igenom») — lagad för kategorivägen, aldrig för hastighetsvägen. Sviten ser det inte: JK-06..JK-11 i tests/jamforelsekalla.mjs bygger varje benchmark-objekt för hand och matar aldrig en verklig producent.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { bredbandSpeedBenchmark, BRANCHINDEX } from './agents/recommender/branchindex.js'; import { jamforelsensKalla } from './lib/jamforelsekalla.js'; const bm = bredbandSpeedBenchmark(1000); const k = jamforelsensKalla({useLfl:false, benchmark:bm}); const t = k.listprisanspraak===true?'real-public':'negotiated-target'; const skal = k.isTotal?'total':(k.source==='estimated'||k.source==='mock')?'estimat':k.lastVerified==null?'jamforelsepriset saknar verifieringsdatum - odaterat pris kallas aldrig verifierat':'kalla '+k.source; console.log('prisboken:', BRANCHINDEX.bredband.tele2Verified.lastVerified); console.log('kalla:', JSON.stringify(k)); console.log('KVITTORAD:', skal); console.log('benchmarkType:', t, '-> savingRange +/-', t==='real-public'?12:25, '%');"
```

**Rapporterat utfall:**
```
prisboken: 2026-08-18
kalla: {"grund":"benchmark","source":"tele2-verified","lastVerified":null,"isTotal":false,"listprisanspraak":false}
KVITTORAD: jamforelsepriset saknar verifieringsdatum - odaterat pris kallas aldrig verifierat
benchmarkType: negotiated-target -> savingRange +/- 25 %
```

## 4. Prospect-kortets källnot daterar «verifierade listpriser» till maj/juni 2026 — hårdkodade strängar som inte kan följa prisboken (som säger 2026-08-22)

- **fil:** `lib/outbound-estimator.js`:144
- **familj:** pastaende-utan-tackning · **allvar:** kundsynlig
- **konsekvens:** `sourceNote` renderas rakt av i kundytan (src/pages/Prospect/index.js:264) som «Källa: microsoft.com/sv-se verifierade årsavtalspriser, maj 2026» respektive «Källa: Tele2 Företag verifierade listpriser, juni 2026» (rad 91). Båda månaderna är skrivna som literaler och kan aldrig spegla prisboken. Datumet är den enda halvan av ordet «verifierat» kunden kan kontrollera (regeln som skrevs in 2026-08-15), och här är det fel åt det farliga hållet: BÅDA priserna ändrades 2026-08-05 (Microsoft Business Standard +12,0 %, Tele2 mobil +7–17 %) och re-verifierades 2026-08-22. Vi daterar alltså augustipriser till maj/juni — samma påstående-utan-täckning som smyghöjningsincidenten, fast tvärtom: talen är färska, datumet är gammalt.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { estimateForProfile } from './lib/outbound-estimator.js'; import { BRANCHINDEX } from './agents/recommender/branchindex.js'; const r = await estimateForProfile({segment:'byraer',sizeBucket:'small',employees:20,mxPlatform:'microsoft365',industry:'it-tech'}); for (const c of r.categories) console.log(c.category.padEnd(6), '| kundytan:', c.sourceNote); console.log('prisboken saas-productivity lastVerified:', BRANCHINDEX['saas-productivity'].lastVerified); console.log('prisboken mobil lastVerified            :', BRANCHINDEX.mobil.lastVerified);"
```

**Rapporterat utfall:**
```
m365   | kundytan: Källa: microsoft.com/sv-se verifierade årsavtalspriser, maj 2026
mobil  | kundytan: Källa: Tele2 Företag verifierade listpriser, juni 2026
prisboken saas-productivity lastVerified: 2026-08-22
prisboken mobil lastVerified            : 2026-08-22
```

## 5. bredbandSpeedBenchmark faller tyst till den högsta verifierade nivån och påstår ändå att priset gäller den begärda hastigheten

- **fil:** `agents/recommender/branchindex.js`:1290
- **familj:** okant-som-giltigt · **allvar:** latent
- **konsekvens:** `tiers.find(n => n >= s) ?? tiers[tiers.length - 1]` betyder «vi har inget pris för den här hastigheten» men returnerar ett fullt giltigt pris, och noten skriver sedan ut den BEGÄRDA hastigheten bredvid det. Fibernivåerna (`standard`) toppar på 1000 Mbit, så redan Tele2:s egen flaggskeppsprodukt 1200/100 — som prisboken själv namnger — får sin `median` ur 1000 Mbit-priset och en not som påstår «Bredband ≥1200 Mbit … öppen fiber 487 kr/mån». `connectionSpeedMbit` extraheras ur fakturan utan övre gräns (extract.js:963), så en 10 Gbit-linje jämförs mot ett 1200/1000 Mbit-pris. Talen är kundsynliga: p25 blir suggestedAnnualCost och median går rakt in i overpaymentPercent, båda för lågt satta → överdriven påvisad överbetalning. Fail-open i en kedja som är fail-closed överallt annars (jfr `bytesgolv`).

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { bredbandSpeedBenchmark, BRANCHINDEX } from './agents/recommender/branchindex.js'; console.log('verifierade nivaer:', JSON.stringify(BRANCHINDEX.bredband.tele2Verified.standard)); for (const s of [1200,2500,10000]) { const b = bredbandSpeedBenchmark(s); console.log(s,'Mbit -> p25',b.p25,'median',b.median,'|',b.note.slice(0,95)); }"
```

**Rapporterat utfall:**
```
verifierade nivaer: {"100":399,"250":415,"500":455,"1000":487,"bindingMonths":12}
1200 Mbit -> p25 3348 median 5844 | Bredband ≥1200 Mbit — verifierat Tele2 adress-API 2026-08-18: billigast 279 kr/mån exkl (COAX)
2500 Mbit -> p25 3348 median 5844 | Bredband ≥2500 Mbit — verifierat Tele2 adress-API 2026-08-18: billigast 279 kr/mån exkl (COAX)
10000 Mbit -> p25 3348 median 5844 | Bredband ≥10000 Mbit — verifierat Tele2 adress-API 2026-08-18: billigast 279 kr/mån exkl (COAX)
```

## 6. MK-09 («mätt, inte tyckt») prövar 1 av 5 real-public-kategorier — de fyra andra hoppas över av `continue` och deras kraverBekraftadNiva-deklaration mäts aldrig

- **fil:** `tests/matriskrav.mjs`:169
- **familj:** vakt-som-inte-faller · **allvar:** latent
- **konsekvens:** Vakten mäter spännvidden ur `licenseTierBenchmarks` filtrerat på `currency==='SEK' && msrpAnnual>0`. Bara saas-productivity har sådana nivåer; mobil, bredband, molnvaxel och loneadmin har noll och faller på `if (tiers.length < 2) continue` — assertionen körs aldrig för dem, men testet rapporterar grönt som om deklarationen vore prövad. Detta är E3/E5-läxan igen (en kontroll som rapporterar täckning den inte har), och testets EGNA kommentar påstår att mobil är mätt: «mobil: 3 228 → 3 588 = 1,1×». Det talet är p25 mot median, inte spännvidden mellan Tele2:s publicerade nivåer, som enligt prisbokens egen not är 269 → 349 kr/mån = 1,30×. Deklarationen råkar bli rätt (1,30 < GRANS 3), men den är rätt av tur, inte av mätning — och nästa kategori som läggs till får ingen prövning alls.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "import { BRANCHINDEX } from './agents/recommender/branchindex.js'; for (const k of Object.keys(BRANCHINDEX).filter(k=>BRANCHINDEX[k].source==='real-public')) { const t = Object.values(BRANCHINDEX[k].licenseTierBenchmarks??{}).filter(x=>x?.currency==='SEK'&&x?.msrpAnnual>0).map(x=>Math.round(x.msrpAnnual*12)); console.log(k.padEnd(20), 'matbara SEK-nivaer:', t.length, t.length<2?'-> MK-09 hoppar over, assert kors ALDRIG':'-> spridning '+(Math.max(...t)/Math.min(...t)).toFixed(1)+'x'); } console.log('Tele2s publicerade nivaer enligt prisbokens not: 269/299/349 -> ' + (349/269).toFixed(2) + 'x (testkommentaren pastar 1,1x)');"
```

**Rapporterat utfall:**
```
mobil                matbara SEK-nivaer: 0 -> MK-09 hoppar over, assert kors ALDRIG
bredband             matbara SEK-nivaer: 0 -> MK-09 hoppar over, assert kors ALDRIG
molnvaxel            matbara SEK-nivaer: 0 -> MK-09 hoppar over, assert kors ALDRIG
saas-productivity    matbara SEK-nivaer: 5 -> spridning 9.6x
loneadmin            matbara SEK-nivaer: 0 -> MK-09 hoppar over, assert kors ALDRIG
Tele2s publicerade nivaer enligt prisbokens not: 269/299/349 -> 1.30x (testkommentaren pastar 1,1x)
```

---

## Kontrollerat utan fynd

Sviten kördes först: `npm run test:algo` → 1923 pass, 0 fail. Följande prövades och visade sig HELT.

KÄLLETIKETTEN KAN INTE LJUGA OM LIVEDATA. Båda DB-grenarna i lib/benchmark.js (rad 139-153 invoice_datapoints, rad 184-191 invoice_analyses) spreadar mock-objektet FÖRE de skriver `source` och `isTotal`, så ordningen kan inte ge ett 'real-public' på ett livedatatal. `getPublicListBenchmark` är helt DB-/KV-fri, läser BRANCHINDEX direkt och returnerar null för allt utom `source === 'real-public'`. jamforelsensKalla:162 diskvalificerar dessutom ovillkorligt på `isTotal`, så JK-07-scenariot (ordningen kastas om) är täckt även om spreadet skulle vändas. Jag hittade ingen väg där ett livedatatal kan bära listprisetiketten.

ENHETSFELET I BYTESMÅLET ÄR STÄNGT. `jamforelseSkala` + `bytesgolv` (lib/jamforelsekalla.js) är fail-closed på rätt sida: en per-enhet-kategori med `isTotal` får inget bytesmål alls om det publika golvet saknas, och `_golvBenchmark` (inte `benchmark`) är det som bokförs som proveniens i recommend.js:1782. Alla tre konsumenter av «hur många enheter ska talet skalas med» (recommend.js:77, :205, :1606) går numera genom samma funktion. Jag körde JK-05-invarianten manuellt över hela fältet av livedata-kombinationer — ingen når en skala över 1.

CELLHÄRLEDNINGEN HÅLLER. `harledCeller` + `tillampaCellHarledning` skriver faktiskt över saas-productivitys tomma `{}`-celler och loneadmins literaler vid modulladdning; jag verifierade att de renderade cellerna (1606/1927 resp. 778/419/324) räknas hem mot `msrpAnnual`/`msrpMonthly` × 12 och mot 199+25×n-strukturen. `a > b`-vakten (golv över tak) och `medianLikaMedP25`-grenen fungerar. `getPublicListBenchmark` bär vidare `referensProdukt` och `kraverBekraftadNiva` ur prisboken utan avskrivning.

FIENTLIGA INDATA TILL getPublicListBenchmark: employees = 0, 0.5, NaN, −3 ger alla micro-cellen men aldrig NaN/undefined i talet, och alla konsumenter (buildBranchAnchors `b.median > 0`, recommend `_golvBm.p25 > 0`, bytesgolv `publiktGolv?.p25 > 0`) är fail-closed mot ett tomt golv. Skulle `harledCeller` någon gång returnera null blir cellen `{}` → p25 undefined → alla tre konsumenterna tystnar i stället för att visa ett tal. `bredbandSpeedBenchmark` filtrerar korrekt bort `bindingMonths` ur nivånycklarna via `Number.isFinite`.

REVISIONSGRINDEN + KATEGORISPECIFIKA VÄGAR: loneadmin och molnvaxel når aldrig den generiska benchmark-vägen (recommend.js:1042/1050 kortsluter till egna deterministiska moduler), vilket räddar dem från att `jamforelseSkala`s villkor bara letar efter strängen «per användare» — loneadmins not säger «Per anställd/år» och hade annars fått skala 1 mot ett per-enhet-golv. Värt att veta för den som någon gång tar bort kortslutningen, men det är inte ett fel i dag.

OBSERVATIONER UTAN KÖRBART FEL (rapporteras inte som fynd, men noteras): (a) `getPublicListBenchmark`s `mock.isTotal`-kontroll är död — branchindex getBenchmark sätter aldrig fältet — men den är ofarlig djupförsvar. (b) `liveBench` i lib/outbound-estimator.js avvisar allt med `isTotal`, och BÅDA DB-grenarna sätter numera `isTotal: true`, så grenen `source: 'live'` (och Prospect-sidans «median av verifierade fakturor»-text på rad 251) kan inte nås i produktion; utfallet är dock det säkra (verifierat listpris). (c) api/generate-prospect.mjs:228 skickar `profile.label` (en svensk etikett som «Metallindustri») som `industry` till prisbokens läsväg, där INDUSTRY_SEGMENT_MAP faller till 'byraer' — `profile.segment` med rätt värde ligger på samma objekt. Ingen numerisk skada i dag just för att (b) gör livedatagrenen död. (d) `getBenchmarkBasis` anropas på ett enda ställe (api/test-invoice.mjs:1729) med `tierKey: null` hårdkodat, vilket gör att funktionen alltid returnerar null och beräkningskedjans `formula` alltid är tom. Ingen av dessa fyra ligger i mina tilldelade filer och ingen ger ett felaktigt tal till kund, därför utanför fyndlistan.