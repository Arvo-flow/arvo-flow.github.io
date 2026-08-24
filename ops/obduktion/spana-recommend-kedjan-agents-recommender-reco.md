# Obduktion · recommend-kedjan — agents/recommender/recommend.js (1962 rader), med spårning nedströms till api/test-invoice.mjs, lib/jamforelsekalla.js, lib/benchmark.js, lib/sanity-verifier.js och src/pages/TestaFaktura/index.js

> STATUS: **OPRÖVAD**. Fynden nedan är HYPOTESER från en spanande agent.
> Motprövningen dog på sessionsgränsen 2026-08-22 och hann aldrig döma dem.
> Ingen av dem får skrivas in i bibeln eller åtgärdas förrän den har ett eget bevis.

## 1. Tier-överskrivningen ärver isTotal:true/source:'real' från kohortdatan — Microsofts per-användarpris presenteras för modellen som en företagstotal

- **fil:** `agents/recommender/recommend.js`:1185
- **familj:** enhetsfel · **allvar:** kundsynlig
- **konsekvens:** När cellen har kohortdata (>=10 punkter i invoice_datapoints eller >=5 i invoice_analyses, eller en KV-cachad sådan) bygger raden `benchmark = { ...rawBenchmark, p25: targetP25*12, median: msrpMonthly*12, note: ... }`. p25/median byts mot Microsofts VERIFIERADE PER-ANVÄNDARPRIS, men `isTotal: true`, `source: 'real'` och `n: 24` följer med från kohortobjektet. jamforelseSkala() kortsluter då på isTotal och returnerar skala 1, medan etikettgrenen (note innehåller 'per användare') fortfarande skriver ut '× 100 licenser'. Följden i den prompt som styr den kundsynliga reasoning-texten: samma faktura går från '40 % UNDER verifierat listpris' (korrekt) till '5899 % ÖVER branschsnittet (p25) (24 analyserade fakturor i databasen)' enbart för att vi samlat kohortdata. Provenienstexten är också falsk: 'Arvo Flow branschindex — 24 verkliga datapunkter' står under Microsofts listpriser, och phrasingRule beordrar modellen skriva 'Ni betalar mer än jämförbara bolag i er bransch'. Prosakravet är blint (talet FINNS i prompten). Samma objekt går vidare som `recommendation.benchmark` till api:ns sanity-grind (`benchmarkSource`), där 'real' finns i VERIFIED_SOURCES och hoppar över Haiku-kontrollen. Det gör dessutom att totalgrinden feldiagnostiserar E3:s listpris som en kohorttotal och byter ut det mot Business Standards golv.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import http from 'node:http';
import { getBenchmark as mockBm } from './agents/recommender/branchindex.js';
// Exakt objektet lib/benchmark.js:141-155 lägger i KV när cellen har >=10 datapunkter
const live = { ...mockBm({category:'saas-productivity',industry:'byraer',employees:100}), median:184680, p25:120000, source:'real', isTotal:true, n:24 };
const srv = http.createServer((q,r)=>{let b='';q.on('data',c=>b+=c);q.on('end',()=>{const c=JSON.parse(b||'[]');const one=x=>Array.isArray(x)&&String(x[0]).toLowerCase()==='get'?{result:JSON.stringify(live)}:{result:'OK'};r.setHeader('content-type','application/json');r.end(JSON.stringify(Array.isArray(c[0])?c.map(one):one(c)));});});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
process.env.KV_REST_API_URL='http://127.0.0.1:'+srv.address().port; process.env.KV_REST_API_TOKEN='t';
const { recommend } = await import('./agents/recommender/recommend.js');
let prompt=null;
const client={messages:{create:async p=>{prompt=p.messages[0].content;return{content:[{type:'tool_use',name:'recommend',input:{shouldSwitch:false,recommendationType:'no_action',reasoning:'x',confidence:'medium',switchSteps:[]}}],usage:{input_tokens:1,output_tokens:1}};}}};
const r = await recommend({customer:{industry:'it-tech',employees:100},
 invoice:{annualCost:300000,amount:25000,seatCount:100,licenseType:'Microsoft 365 E3',billingCycleType:'annual',pricePerSeatMonthly:250,billingPeriod:'monthly',lineItems:[{type:'recurring_subscription',description:'Microsoft 365 E3',quantity:100,unitPrice:250,amount:25000}]},
 categorized:{category:'saas-productivity',normalizedSupplier:'Dustin',confidence:0.9}},{client});
srv.close();
console.log(prompt.split('\n').filter(l=>/Årskostnad|Verifierat lägre|^Median|Källa:/.test(l)).join('\n'));
console.log('benchmark.isTotal =',r.benchmark.isTotal,' source =',r.benchmark.source,' p25 =',r.benchmark.p25);"

# Kör sedan SAMMA faktura UTAN KV (prisboks-fallback) för kontrasten:
# ta bort de tre KV-raderna ovan -> '← 40 % UNDER verifierat listpris'
```

**Rapporterat utfall:**
```
MED kohortdata i KV:
  Årskostnad (totalt): 300 000 kr  ← 5899 % ÖVER branschsnittet (p25) (24 analyserade fakturor i databasen)
  Median (total, per år): 6 001,44 kr/år (6 001,44 kr/användare × 100 licenser)
  Verifierat lägre marknadspris (per år): 5 001,24 kr/år (5 001,24 kr/användare × 100 licenser)
  Källa: Arvo Flow branschindex — 24 verkliga datapunkter
  benchmark.isTotal = true  source = real  p25 = 5001.24

UTAN kohortdata (samma faktura):
  Årskostnad (totalt): 300 000 kr  ← 40 % UNDER verifierat listpris
  Median (total, per år): 600 144 kr/år (6 001,44 kr/användare × 100 licenser)
  Verifierat lägre marknadspris (per år): 500 124 kr/år (5 001,24 kr/användare × 100 licenser)
  Källa: Estimat från publika listpriser
```

## 2. recommendationType 'optimize' överlever den deterministiska shouldSwitch-överskrivningen — svaret bär två besparingssiffror och ett bytesmål under etiketten 'inget byte'

- **fil:** `agents/recommender/recommend.js`:1578
- **familj:** tva-sanningar · **allvar:** kundsynlig
- **konsekvens:** Överskrivningen på rad 1578 (`_annualCost > _p25Total * 1.15 → result.shouldSwitch = true`) rör aldrig `recommendationType`. En AI som svarat 'optimize' (= ingen switch, kunden betalar för en redundant tjänst hos SAMMA leverantör) får därmed shouldSwitch=true, suggestedAnnualCost=38 736 (ett bytesmål) och savingPerYear=21 264 — samtidigt som optimizationSaving=24 000 står kvar. api/test-invoice.mjs:1890 rättar bara kombinationen `'switch' + !shouldSwitch`, aldrig `'optimize' + shouldSwitch`. Kundytan (src/pages/TestaFaktura/index.js:1854) prövar isOptimize FÖRE shouldSwitch-grenen, så kunden ser 'Dold kostnad hittad +19 200 kr' (24 000 − 20 %) medan api:ns grossSaving/netSaving — det som lagras i invoice_analyses och som likräkningen/success fee vilar på — säger 21 264/17 011. Två olika svar på 'hur mycket sparar ni' i samma response, plus ett namnlöst bytesmål (suggestedSupplier=null, suggestedAnnualCost=38 736) i ett svar som påstår att inget byte rekommenderas.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend } from './agents/recommender/recommend.js';
import { feeOf, netOf } from './lib/fee.js';
const ai={recommendationType:'optimize',shouldSwitch:false,suggestedSupplier:null,suggestedAnnualCost:null,savingPerYear:24000,overpaymentPercent:0,confidence:'high',vipQueue:false,reasoning:'Molnväxeln ingår redan i er licens.',switchSteps:[],optimizationSaving:24000};
const client={messages:{create:async()=>({content:[{type:'tool_use',name:'recommend',input:{...ai}}],usage:{input_tokens:1,output_tokens:1}})}};
const r=await recommend({customer:{industry:'konsult',employees:12},
 invoice:{annualCost:60000,amount:5000,seatCount:12,lineItems:[{type:'recurring_subscription',description:'Mobil',quantity:12,unitPrice:416,amount:5000}],billingPeriod:'monthly'},
 categorized:{category:'mobil',subType:'efaktura',normalizedSupplier:'Telia',confidence:0.9}},{client});
console.log(JSON.stringify({recommendationType:r.recommendationType,shouldSwitch:r.shouldSwitch,optimizationSaving:r.optimizationSaving,savingPerYear:r.savingPerYear,suggestedAnnualCost:r.suggestedAnnualCost,suggestedSupplier:r.suggestedSupplier},null,1));
console.log('KORT A (optimize-kortet):', r.optimizationSaving,'kr/år · arvode', feeOf(r.optimizationSaving));
console.log('KORT B (grossSaving i api):', r.savingPerYear,'kr/år · arvode', feeOf(r.savingPerYear));"
```

**Rapporterat utfall:**
```
{
 "recommendationType": "optimize",
 "shouldSwitch": true,
 "optimizationSaving": 24000,
 "savingPerYear": 21264,
 "suggestedAnnualCost": 38736,
 "suggestedSupplier": null
}
KORT A (optimize-kortet): 24000 kr/år · arvode 4800
KORT B (grossSaving i api): 21264 kr/år · arvode 4253
```

## 3. optimizationSaving är ett rent AI-räknat kronotal som når kund med 20 % arvode påklistrat — ingen deterministisk modul rör det någonsin

- **fil:** `agents/recommender/recommend.js`:1918
- **familj:** pastaende-utan-tackning · **allvar:** kundsynlig
- **konsekvens:** `optimizationSaving` är ett obligatoriskt-nullbart fält i RECOMMEND_TOOL och SYSTEM_PROMPT (rad 252) beordrar uttryckligen modellen att RÄKNA UT det ('Sätt optimizationSaving = kostnaden för den redundanta tjänsten per år'). recommend.js rör aldrig värdet — det passerar orört genom `result.optimizationSaving ?? null` (rad 1918). De två platser som nollar det (subType==='affärssystem', rad 1497, och saas-other/saas-devtools, rad 1532) är båda oåtkomliga: saas-finance returnerar tidigare på rad 1035, och saas-other/saas-devtools stoppas av revisionsgrinden på rad 1024. Prompt-regeln 'Tillåtna subTypes för optimize: efaktura, kivra, utskick' har ingen motsvarighet i kod. api/test-invoice.mjs:1625 lägger sedan feeOf()/netOf() på talet och kundytan skriver 'Ni betalar 24 000 kr/år för en tjänst som redan ingår i er licens · Arvos besparingsarvode 4 800 kr (20 %)'. Prosakravet kontrollerar bara `reasoning`-texten, aldrig sifferfältet. Detta är regel 2 rakt av: modellen utför finansiell aritmetik som blir kundens siffra och vår faktureringsbas.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend } from './agents/recommender/recommend.js';
import { feeOf, netOf } from './lib/fee.js';
const ai={recommendationType:'optimize',shouldSwitch:false,suggestedSupplier:null,suggestedAnnualCost:null,savingPerYear:0,overpaymentPercent:0,confidence:'high',vipQueue:false,reasoning:'Molnväxeln ingår redan i er licens.',switchSteps:[],optimizationSaving:24000};
const client={messages:{create:async()=>({content:[{type:'tool_use',name:'recommend',input:{...ai}}],usage:{input_tokens:1,output_tokens:1}})}};
const r=await recommend({customer:{industry:'konsult',employees:12},
 invoice:{annualCost:60000,amount:5000,seatCount:12,lineItems:[{type:'recurring_subscription',description:'Mobilabonnemang',quantity:12,unitPrice:416,amount:5000}],billingPeriod:'monthly'},
 categorized:{category:'mobil',subType:null,normalizedSupplier:'Telia',confidence:0.9}},{client});
console.log('optimizationSaving som når kund :', r.optimizationSaving, '(AI:ns eget tal, oförändrat)');
console.log('arvode api räknar på det        :', feeOf(r.optimizationSaving), ' netto:', netOf(r.optimizationSaving));"
```

**Rapporterat utfall:**
```
optimizationSaving som når kund : 24000 (AI:ns eget tal, oförändrat)
arvode api räknar på det        : 4800  netto: 19200
```

## 4. annualBillingSaving prissätter ALLA licenser på den dominanta tiern och skalar med seatCount — samma storhet räknas en andra gång med employees i savingsBreakdown

- **fil:** `agents/recommender/recommend.js`:1197
- **familj:** tva-sanningar · **allvar:** kundsynlig
- **konsekvens:** Rad 1197-1201 räknar `(msrpMonthly − msrpAnnual) × 12 × (seatCount ?? employees)` med den DOMINANTA tierns prisdelta. Rad 1807-1809 räknar exakt samma storhet med `scale` — som för saas-productivity är forceEmployees=true och alltså använder employees, uttryckligen för att 'seatCount kan vara uppblåst av add-on/överskottslicenser' (kommentaren på rad 1594-1595 nämner till och med fallet 57+57=114). Två svar på samma fråga i samma response. Det felaktiga av de två är det kundsynliga: api/test-invoice.mjs:1915 serialiserar `annualBillingSaving` och src/pages/TestaFaktura/index.js:2210-2214 renderar 'Möjlighet — årsavtal: +X/år utan leverantörsbyte'. savingsBreakdown serialiseras aldrig, så bara den felaktiga siffran når kund. Två oberoende fel i samma rad: (a) på en blandad licensmix prissätts alla platser på dominanta tiern — 50 BP + 23 BS ger 36 845 kr i stället för det sanna per-tier-värdet 32 622 kr (+13 %); (b) med add-on-uppblåst seatCount ger den 57 538 kr där den andra beräkningen ger 28 769 kr (2×). Talet räknas dessutom FÖRE lfl-grinden, totalgrinden och avstämningsvetot, så det står kvar med full auktoritet även när hela bytesbeslutet tystats fail-closed.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend, computeLikeForLikeSaasTarget } from './agents/recommender/recommend.js';
import { BRANCHINDEX } from './agents/recommender/branchindex.js';
const bp=BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const client=p=>({messages:{create:async()=>({content:[{type:'tool_use',name:'recommend',input:{shouldSwitch:true,recommendationType:'switch',reasoning:'x',confidence:'high',switchSteps:[]}}],usage:{input_tokens:1,output_tokens:1}})}});
// (a) blandad licensmix: 50 Business Premium + 23 Business Standard, månadsfakturerat
let li=[{type:'recurring_subscription',description:'Microsoft 365 Business Premium',quantity:50,unitPrice:300,amount:15000},{type:'recurring_subscription',description:'Microsoft 365 Business Standard',quantity:23,unitPrice:200,amount:4600}];
let ac=(15000+4600)*12;
let r=await recommend({customer:{industry:'it-tech',employees:73},invoice:{annualCost:ac,amount:19600,seatCount:73,licenseType:'Microsoft 365 Business Premium',billingCycleType:'monthly',pricePerSeatMonthly:268,billingPeriod:'monthly',lineItems:li,likeForLikeTarget:computeLikeForLikeSaasTarget(li,bp,ac),currency:'SEK',momsbas:'exkl'},categorized:{category:'saas-productivity',normalizedSupplier:'Dustin',confidence:0.9}},{client:client()});
const sant=Math.round((bp['business-premium'].msrpMonthly-bp['business-premium'].msrpAnnual)*12*50+(bp['business-standard'].msrpMonthly-bp['business-standard'].msrpAnnual)*12*23);
console.log('(a) annualBillingSaving (visas för kund):',r.annualBillingSaving,' sant per-tier:',sant);
// (b) seatCount uppblåst av add-on-licenser: 57 licenser + 57 add-on = 114, 57 anställda
li=[{type:'recurring_subscription',description:'Microsoft 365 Business Premium',quantity:57,unitPrice:300,amount:17100},{type:'recurring_subscription',description:'Advanced Threat Protection',quantity:57,unitPrice:30,amount:1710}];
ac=(17100+1710)*12;
r=await recommend({customer:{industry:'it-tech',employees:57},invoice:{annualCost:ac,amount:18810,seatCount:114,licenseType:'Microsoft 365 Business Premium',billingCycleType:'monthly',pricePerSeatMonthly:330,billingPeriod:'monthly',lineItems:li,likeForLikeTarget:computeLikeForLikeSaasTarget(li,bp,ac),currency:'SEK',momsbas:'exkl'},categorized:{category:'saas-productivity',normalizedSupplier:'Dustin',confidence:0.9}},{client:client()});
console.log('(b) annualBillingSaving (seatCount=114):',r.annualBillingSaving);
console.log('(b) billingOptimization (employees=57):',r.savingsBreakdown?.billingOptimization);"
```

**Rapporterat utfall:**
```
(a) annualBillingSaving (visas för kund): 36845  sant per-tier: 32622
(b) annualBillingSaving (seatCount=114): 57538
(b) billingOptimization (employees=57): 28769
```

## 5. Bråkdels-licensantal passerar computeLikeForLikeSaasTarget — attribueringslåset skriver 'era 9.5 E3-licenser' och bygger besparingen på det

- **fil:** `agents/recommender/recommend.js`:620
- **familj:** okant-som-giltigt · **allvar:** kundsynlig
- **konsekvens:** Grinden på rad 620 är `if (qty == null) return null` — den prövar bara närvaro, aldrig att kvantiteten är ett heltal. Ett bråktal ur extraktionen (en licensmängd ÄR ett heltal; bråkdel är per definition ett läsfel) blir därmed en giltig tier-rad: tierAnnual = benchmarkMonthly × 0,5 × 12, suggestedAnnualCost byggs på den, och buildLikeForLikeReasoning renderar den kundsynliga meningen 'era 9.5 E3-licenser' (med engelsk decimalpunkt). Detta är exakt den klass som stängdes i lib/prisunderlag.js 2026-08-20 ('en licensmängd är ett heltal, och 0,5 platser gav +5 579 %') — fixen följdes aldrig till LFL-vägen, som är den som räknar kundens pengar och skriver texten. Det testade fallet (9,5 i stället för 10) ger 40 % besparing och passerar därmed BÅDE api:ns finansiella grind (suggested < annualCost) och sanity-verifierarens tak för saas-productivity (50 %) — inget nedströms fångar det.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend, computeLikeForLikeSaasTarget } from './agents/recommender/recommend.js';
import { BRANCHINDEX } from './agents/recommender/branchindex.js';
const T=BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const lineItems=[{type:'recurring_subscription',description:'Microsoft 365 E3',quantity:9.5,unitPrice:700,amount:6650}];
const annualCost=79800;
const lfl=computeLikeForLikeSaasTarget(lineItems,T,annualCost);
const client={messages:{create:async()=>({content:[{type:'tool_use',name:'recommend',input:{shouldSwitch:true,recommendationType:'switch',reasoning:'AI',confidence:'high',switchSteps:[]}}],usage:{input_tokens:1,output_tokens:1}})}};
const r=await recommend({customer:{industry:'it-tech',employees:10},
 invoice:{annualCost,amount:6650,seatCount:10,licenseType:'Microsoft 365 E3',billingCycleType:'monthly',pricePerSeatMonthly:665,billingPeriod:'monthly',lineItems,likeForLikeTarget:lfl,currency:'SEK',momsbas:'exkl'},
 categorized:{category:'saas-productivity',normalizedSupplier:'Dustin',confidence:0.9}},{client});
console.log('saving',r.savingPerYear,'suggested',r.suggestedAnnualCost,'sparprocent',Math.round(r.savingPerYear/annualCost*100)+'%');
console.log(r.reasoning);"
```

**Rapporterat utfall:**
```
[attribueringslås] AI-reasoning ersatt med deterministisk LFL-text
saving 32288 suggested 47512 sparprocent 40%
Ni betalar 700 kr per användare och månad för era 9.5 E3-licenser via Dustin — Microsofts publika årsavtalspris för exakt samma licens är 416,77 kr. […] På årsbasis: 79 800 kr i dag mot 47 512 kr för identisk licensmix — 32 288 kr utan att en enda funktion ändras.

(Med quantity 0,5 blir samma väg: saving 141 499 kr, 'era 0.5 E3-licenser' — den fångas dock av sanity-takets 50 %.)
```

## 6. Bredband utan avläst hastighet ger benchmark=null → BÅDA de deterministiska överskrivningarna hoppas över och AI:ns egna kronor når kund

- **fil:** `agents/recommender/recommend.js`:1120
- **familj:** tyst-tapp · **allvar:** kundsynlig
- **konsekvens:** Rad 1120 sätter `benchmark = connectionSpeedMbit > 0 ? bredbandSpeedBenchmark(speed) : null`. Både shouldSwitch-överskrivningen (rad 1557, `if (!licensePending && benchmark)`) och hela det finansiella blocket (rad 1587, `if (result.shouldSwitch && benchmark)`) är villkorade på att `benchmark` är sanningsvärt. Blir det null passerar modellens egna `suggestedAnnualCost`, `savingPerYear` och `suggestedSupplier` orörda ut ur recommend() — regel 2 ('AI tolkar, kod räknar') är då satt ur spel för hela bredbandskategorin. Tystnaden är dessutom helt ologgad: det finns ingen [grind]-rad, inget `lflGrind`/`totalgrind`-fält och ingen `jamforelseKalla`, så api:ns kvittorad blir 'jämförelsens källa är inte bokförd' medan siffrorna ändå visas. Nedströms stoppar ingenting: api:ns finansiella grind kräver bara suggested < annualCost, och sanity-taket för bredband passeras av allt under ~55 %. Kunden ser 'Din identifierade nettobesparing +3 360 kr · 12 200 → 8 000 kr/år hos Bahnhof' — tre tal och ett leverantörsnamn som modellen hittat på.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend } from './agents/recommender/recommend.js';
import { feeOf, netOf } from './lib/fee.js';
const ai={shouldSwitch:true,recommendationType:'switch',reasoning:'Ni betalar för mycket för ert bredband.',suggestedSupplier:'Bahnhof',suggestedAnnualCost:8000,savingPerYear:4200,confidence:'high',switchSteps:['a'],licenseOverage:null,overageSavings:null,optimizationSaving:null};
const client={messages:{create:async()=>({content:[{type:'tool_use',name:'recommend',input:{...ai}}],usage:{input_tokens:1,output_tokens:1}})}};
const r=await recommend({customer:{industry:'konsult',employees:12},
 invoice:{annualCost:12200,amount:1016,connectionSpeedMbit:null,lineItems:[{type:'recurring_subscription',description:'Företagsfiber',quantity:1,unitPrice:1016,amount:1016}],billingPeriod:'monthly'},
 categorized:{category:'bredband',normalizedSupplier:'Telia',confidence:0.9}},{client});
console.log(JSON.stringify({benchmark:r.benchmark,shouldSwitch:r.shouldSwitch,suggestedSupplier:r.suggestedSupplier,suggestedAnnualCost:r.suggestedAnnualCost,savingPerYear:r.savingPerYear,jamforelseKalla:r.jamforelseKalla},null,1));
console.log('=> api: grossSaving',r.savingPerYear,'arvode',feeOf(r.savingPerYear),'netto',netOf(r.savingPerYear));"
```

**Rapporterat utfall:**
```
{
 "benchmark": null,
 "shouldSwitch": true,
 "suggestedSupplier": "Bahnhof",
 "suggestedAnnualCost": 8000,
 "savingPerYear": 4200
}
(jamforelseKalla saknas helt i svaret)
=> api: grossSaving 4200 arvode 840 netto 3360
```

## 7. formatBenchmark känner bara två källor — 'tele2-verified' och 'real-public' beskrivs för modellen som 'Estimat från publika listpriser', och bredbandsblocket saknar bransch/storlek/enhet

- **fil:** `agents/recommender/recommend.js`:92
- **familj:** pastaende-utan-tackning · **allvar:** kosmetisk
- **konsekvens:** `sourceStr` (rad 92-96) har grenar för 'live_analyses' och 'real'; ALLT annat faller till 'Estimat från publika listpriser (ersätts med riktig kunddata)'. Bredbandsbenchmarken har source 'tele2-verified' — samma källa som lib/jamforelsekalla.js LISTPRISKALLOR uttryckligen erkänner som ett listprisanspråk — och beskrivs alltså i prompten som ett estimat. Samma sak för 'real-public'. Följdeffekten är inte kosmetisk för texten: `isVerifiedPublic` (rad 210) prövar bara 'real-public', så både överbetalningsetiketten och phrasingRule faller till estimatgrenen och beordrar modellen skriva 'marknadens pris är lägre … ALDRIG exakta priser'. Dessutom saknar bredbandsobjektet fälten `industry`, `size`, `unit` och `alternatives`, så blocket renderas med 'Bransch: undefined, storlek: undefined' och 'Median (total, per år): 5 844 undefined'. Prompten som styr den kundsynliga texten säger alltså både fel proveniens och tre 'undefined'.

**Reproduktion (agentens):**
```bash
cd /home/user/arvo-flow.github.io && node --input-type=module -e "
import { recommend } from './agents/recommender/recommend.js';
let prompt=null;
const client={messages:{create:async(p)=>{prompt=p.messages[0].content;return{content:[{type:'tool_use',name:'recommend',input:{shouldSwitch:false,recommendationType:'no_action',reasoning:'x',confidence:'medium',switchSteps:[]}}],usage:{input_tokens:1,output_tokens:1}};}}};
await recommend({customer:{industry:'konsult',employees:12},
 invoice:{annualCost:12200,amount:1016,connectionSpeedMbit:1000,lineItems:[{type:'recurring_subscription',description:'Företagsfiber 1000/1000',quantity:1,unitPrice:1016,amount:1016}],billingPeriod:'monthly'},
 categorized:{category:'bredband',normalizedSupplier:'Telia',confidence:0.9}},{client});
console.log(prompt.split('Branschindex för segmentet:')[1].split('OBS:')[0]);"
```

**Rapporterat utfall:**
```
Bransch: undefined, storlek: undefined
Median (total, per år): 5 844 undefined
Verifierat lägre marknadspris (per år): 3 348 undefined

Alternativa leverantörer:


Källa: Estimat från publika listpriser (ersätts med riktig kunddata)
```

---

## Kontrollerat utan fynd

GRANSKAT OCH HELT (kört, inte antaget):

1. jamforelseSkala/bytesgolv-disciplinen HÅLLER. Alla tre inline-skalor är borta; `jamforelseSkala()` anropas på rad 77, 205 och 1606 och `bytesgolv()` på 1745. Jag matade isTotal:true genom hela kedjan (via KV-injektion) och skalan blev 1 på varje ställe. Enhetsfelet från 2026-08-20 är faktiskt stängt PÅ DE TRE RADERNA — hålet jag hittade sitter i objektet som MATAS IN i dem (fynd 1), inte i funktionen.

2. computeLikeForLikeSaasTarget mot fientliga indata: `quantity: null` → null (korrekt), `quantity: 0` → null, `annualCost: 0` → billMult faller till 12 och savingPerYear klampas till 0 (ingen påhittad besparing), negativa belopp → savingPerYear 0. Prorata-korrigeringen (CR-88412) och per-tier-avrundningen fungerar som dokumenterat. ENDA hålet är bråkdels-kvantitet (rapporterat).

3. buildLikeForLikeReasoning fail-closed: returnerar null vid tomma tierLines, vid benchmarkMonthly==null och vid savingPerYear <= 0. Kan alltså inte producera en besparingsmening utan besparing.

4. Revisionsgrinden (rad 1024) kortsluter FÖRE all beräkning. Konsekvens: blocken för `skrivarleasing` (rad 1206), `managed-workplace` (1279), `avfall-atervinning` (1304) och `saas-other`/`saas-devtools` (1522) är DÖD KOD i produktion — de kategorierna finns inte i REVIDERADE_KATEGORIER. Jag granskade dem ändå (avfall skalar t.ex. inte bm.p25 alls, och `overMedianPct` på rad 1318 är en oanvänd variabel) men rapporterar inget, eftersom ingen kund kan nås av dem.

5. `el`-vägen i recommend.js är också oåtkomlig: api/test-invoice.mjs:1194 fångar `categorized.category === 'el'` och RETURNERAR i varje gren (verifierat: blocket 1194-1400 har inga fall-through-vägar). enrichElContext, elKwh-skalningen och den döda variabeln `invoicePeriodMonths` på rad 124 kan därför inte nå kund via HTTP-vägen. Sidoobservation utan kundpåverkan: api-lagret skickar aldrig `elKwh` till recommend(), så `kwhIsEstimated` hade varit true undantagslöst om vägen levde.

6. De deterministiska kategorisvaren är talfria eller enbart verifierade: fortnoxFinanceRecommendation, googleWorkspaceQuoteResponse, adobeCreativeRecommendation och storageSubstitutionResponse sätter alla suggestedAnnualCost/grossSaving/netSaving till null och bär `revisionGate: 'audited'`. google-sek-grinden träffar både på tier-nyckel och på leverantörsnamn (buggen 2026-06-28 är stängd).

7. lfl-grinden (rad 1668), avstämningsvetot (1704) och totalgrinden (1755) nollar alla FYRA fälten (shouldSwitch, recommendationType, suggestedAnnualCost, suggestedSupplier) och sätter savingPerYear=0 — jag körde varje gren och hittade inget fält som överlever med ett motsägande värde. Kontrasten mot fynd 2 är skarp: de nya grindarna sköter etiketten, den GAMLA överskrivningen på rad 1578 gör det inte.

8. Felhanteringen i modellanropet (rad 1384-1413): 529 ger retry, RateLimitError och APIError klassificeras via `klassificera()` och kastar — ingen catch som returnerar ett giltigt-utseende svar. Inget "catch → godkänt" i den här filen.

9. `suggestedSupplier`-låset (rad 1860) härleder målnamnet ur LFL:s dominanta tier med benchmarkens tier som andrahand och namnger inget när ingendera finns — buggen 2026-08-12 (hårdkodat "Business Standard") är faktiskt stängd.

VARFÖR SVITEN ÄR GRÖN (1923/1923, kört): (a) hela sviten kör utan DATABASE_URL och KV, så `isTotal` kan aldrig bli sant och fynd 1 är omätbart där — samma sjukdom bibeln redan namngett fyra gånger; (b) INGET test i tests/ nämner `annualBillingSaving` överhuvudtaget (grep: noll träffar) — fältet är helt obevakat; (c) inget test driver recommend() med `recommendationType: 'optimize'` (grep i tests/recommend-deterministic.mjs och fixtures: noll träffar), så fynd 2 och 3 är oprövade grenar; (d) inget test kör bredband med `connectionSpeedMbit: null` genom recommend().