# Arbetsorder: vägen till våg 1 (CTO-mandatet, 22 okt)

Grundaren gav 22 okt ett totalt CTO-mandat (CLAUDE.md, överst). Det här är körplanen. Den fortsätter
`ops/ARBETSORDER-LANSERING.md`, vars punkter 1, 2, 3 och 5 är klara. Varje steg är en egen fokuserad
PR som mergas genom Grinden. En uppgift och en granskningslins körs i taget.

## Läge

| Steg | Innehåll | Läge |
|---|---|---|
| a | PR #86: Tele2 +40 kr, en prisbok (majtabellen och seedarna bort), vakter framåt | mergad 23 okt (5e73c277) efter fem granskningsvarv |
| b | Databas och skript: majraderna i `supplier_prices` bort, död skrivning i `scripts/apply-price-proposals.mjs` bort | mergad 23 okt (PR #87, 4f8f2326). Körd på main 23 okt (40352850116): `supplier_prices` 46 → 0 rader, historiken 2 → 1 |
| T-2 | Licenstaket per nivårad, mains tak per plats kvar | mergad 3 nov (PR #88, 1677f2bd) efter tolv granskningsvarv; live på Vercel |
| c | Kunddelen: mobilscoren, dörrens kort, LA-K1, det frysta golvet i rummet (K-5) | c1 mobilscoren: egen PR, se nedan; övriga efter |
| d | Arbetsorderns punkt 4: live-verifiering och rummet i 390 och 1600 px | efter c |

## c1 · mobilscoren (grundarbeslut 22 okt)

Mobil kräver ett bekräftat abonnemang innan rummet visar avstånd och score
(`kraverBekraftadNiva` i prisboken, med skälet i `kraverBekraftadNivaSkal`; MS-01, MS-02). Ingen kod läser
i dag ett mobilabonnemang ur fakturan, så varje mobilrad visar vad kunden betalar, det billigaste
publicerade priset och det näst billigaste abonnemanget, utan avstånd och utan poäng. Renderat i 390 och
1600 px med motprov (`scripts/screenshot-mobilscore.mjs`).
Fyra fel i samma kort, förexisterande och synliga för mobil, lagade i samma PR:
- **Medianens etikett.** Raden «Samma licens utan bindning» visade 3 588 kr för mobil, som är ett annat
  abonnemang. Etiketten deklareras nu i prisboken (`medianEtikett`) och visas bara där den finns (MS-03).
- **Marknadsankaret** jämförde kundens pris med medianen och kallade den «leverantörens eget listpris», för
  mobil ett annat abonnemang och för M365 Business Standard. Kategorier som kräver bekräftad nivå får inget
  ankarkort; deras fakta står i radens underlag (MS-06).
- **«Prissatta»** räknade rader vi uttryckligen inte dömer. En rad med obekräftad nivå räknas nu som mottagen
  (MS-07, RR-01).
- **«Dela avtalet, så låser vi jämförelsen»** hade ingen mekanik: ingen kod läser nivån ur ett avtal. Borta
  ur rummet och raden, också för M365 (MS-04, SK-14, LN-08). Texterna gäller nu både licenser och abonnemang.
Prislarmet för mobil är oförändrat, inget larm med eller utan spärren (MS-05). Prospektets ankare får raden
«Vilken nivå ni har vet vi inte — priset gäller den namngivna produkten» också för mobil, vilket är sant.

**Andra blicken på 1f595621: BLOCKERAR** (`ops/GRANSKNING-c1-mobilscore.md`). Lagat i samma PR:
- **C1-1 [KUND], infört.** Fakturavägen lagrar 349-planen till listpris med byte till 269-planen och
  9 600 kr. Rummet visade då poäng 66 och «23% mer» bredvid «Vi sätter varken avstånd eller poäng här».
  Ett lagrat byte på en rad med obekräftad nivå stryks nu vid läsning, och raden bär skälet
  (`bytetUndanhallet`, MS-08).
- **C1-2 [KUND], vanligare.** Med mobilraden utanför vägningen blev 100 abonnemang och en lönerad «Allt är
  under kontroll». Ett rum med en obekräftad rad sätter nu ingen samlad poäng och berömmer inte. När andra
  rader är mätta säger domen «Delvis mätt» och hur många som är prissatta (MS-09).
- [VAKT] C1-5 (ankarvalet prövas genom anrop, `src/lib/ankarval.js`), C1-6 (MS-08), C1-7 (1,1× rättat i
  kod, test och bibel) och C1-8 (nivågrenen prövad, MS-05:s titel).

**Andra blicken på lagningen 9395d8d7: BLOCKERAR** (`ops/GRANSKNING-c1-mobilscore-andra.md`). Lagat:
- **D1-1 [KUND], infört av lagningen.** Strykningen tog också korrekta M365-byten på rader där rummet inte
  läser nivån (IT-8821, Premium och Basic: 24 566 kr/år netto, räknat nivå för nivå). Den gäller nu bara där
  prisboken deklarerar att bytesmålet är kategorins golv (`bytesmalMotKategorigolv`, i dag mobil). IT-8821
  är motprov i MS-08 och i renderingssonden.
- **D1-2 [KUND], infört av lagningen.** Ett rum med en obekräftad mobilrad och ett bredbandsbyte visade
  «Delvis mätt · 0 av 2 fakturor prissatta» under «1 avtal kan skärpas». Med ett byte säger chippet nu
  «grundat på era bytesmål · ingen samlad poäng», och «Delvis mätt» skriver aldrig «0 av» (MS-10).
  Poängkortets etikett är åter mains: den skrev ut prisunderlagsrader som om de var raderna i poängen.
- [VAKT] D1-3 (MS-08 och MS-10 prövar lagningsriktningarna) och D1-4 (raden säger varför bytet saknas,
  `BYTE_UNDANHALLET` i `src/lib/rumstext.js`).
- **Förexisterande, oförändrat:** ett bredbandsbyte räknas som mottaget, inte prissatt, så rummet säger
  «Vägde 0 fakturor» och «0 prissatta» bredvid bytet (punkten «Rummets bredbandsrad» nedan).

**Tredje blicken på 88104b30: BLOCKERAR** (`ops/GRANSKNING-c1-mobilscore-tredje.md`). Lagat:
- **E1-1 [KUND].** IT-8821 behöll sitt byte men rummet sa «Prissatta 0» och «Vägde 0 fakturor» under det.
  En rad är nu prissatt när den har en dom: ett underlag med bekräftad jämförelse, eller ett byte som visas
  (`arPrissatt`). Bara rader utan dom stoppar den samlade poängen (`rum.ovissa`). Ett bredbandsbyte räknas
  därmed också som prissatt, så den förexisterande «Vägde 0 fakturor» bredvid ett bredbandsbyte är borta
  (MS-10, MS-11).
- **E1-2 [KUND].** På en kombinerad mobil- och bredbandsfaktura ströks hela bytet med en förklaring som
  sa att det var räknat mot den billigaste produkten. Raden lagrar bara summan, och en omräkning vid läsning
  hade gått förbi fakturavägens spärrar (valutaspärren m.fl.), så **beslutet är att hålla inne hela bytet
  tills fakturavägen skiljer delarna åt (C1-3)**. Förklaringen säger nu sanningen: att en annan tjänsts del,
  till exempel bredband, kan ingå i beloppet och inte går att skilja ut i efterhand (MS-11 låser texten).
  Kostnad, öppet: bredbandsdelen syns inte i rummet för sådana fakturor förrän C1-3 är byggd. Den syns i
  fakturavyn och mejlet.
- **E1-5 [KUND], förexisterande i en text grenen skrev.** En rad med obekräftad nivå och ett byte som står
  kvar sa «Vi sätter varken avstånd eller poäng här» bredvid sin poäng. Den raden har nu ett eget underlag:
  bytet är räknat mot listpriset för det som står på fakturan (MS-11).
- [VAKT] E1-3 (lagningsriktningarna fäller tester) och E1-4 (texterna låsta; kommentarerna och bibeln säger
  «helt eller delvis»).

**Fjärde blicken på 6d2ac35f: BLOCKERAR** (`ops/GRANSKNING-c1-mobilscore-fjarde.md`). Lagat:
- **F1-1 [KUND].** `arPrissatt` kallade ett elbyte prissatt «mot verifierat publikt listpris», men elbytet räknas
  mot Arvos eget säsongsindex. Ett byte räknas nu bara när kategorins prisbok är verifierad (`bytesmalVerifierat`,
  `source: 'real-public'`). Rubriken i `byte_omatt` och chippet utan poäng påstår ingen källa (MS-10, MS-12).
- **F1-2 [KUND].** Byggarbeslutet E1-2 var fel: bredbandsdelen går att skilja ut vid läsning, på kronan, med
  fakturavägens egna funktioner, och valutaspärren kan inte ha slagit till på en rad med lagrat byte (FX-15,
  FX-16). Bredbandsdelen räknas nu fram och står kvar, taklagd vid det lagrade bruttot; bara mobildelen hålls
  inne, och raden säger vilken del bytet gäller (MS-13). K1 5 952, K2 2 976, K3 2 976, K4 8 448 och K5 2 976 kr/år
  netto, granskarens tal.
- **F1-3 [KUND].** Underlaget på en rad med obekräftad nivå och ett byte påstår inte längre vad bytet är räknat mot,
  och raden får inget procenttal (MS-11).
- **F1-4, förexisterande, stängt i samma PR.** En mobilrad utan underlag (inget avläst antal) eller en bevakad
  mobilrad behöll sitt byte och sin poäng. Spärren hänger nu på kategorin, inte på underlaget (MS-08, MS-09).
- [VAKT] F1-6 (MS-11:s ordningskontroller kräver att båda grenarna finns) och F1-7 (kommentarer och bibel).
- **Förexisterande, oförändrat, loggat:** på en kombinerad rad räknar underlaget «Ni betalar X kr per
  abonnemang» med bredbandets kostnad inräknad (K3: 4 546 kr). Samma tal gav main «+38 %». Hör till C1-3.
  F1-5 (beröm i rum där bytesraden ligger 15–21 % över) står kvar som förexisterande.

**Femte blicken på d902f5c0: BLOCKERAR** (`ops/GRANSKNING-c1-mobilscore-femte.md`), och därmed ett byte av
väg. G1-1 (procenttal på en kombinerad rad utan antal), G1-2 (dagens bredbandspris avgjorde vad en gammal
analys innehöll) och G1-3 (extraktionens flagga sparas inte) har samma rot som varje varv före dem: rummet
räknade fram delarna av en lagrad besparing i efterhand. **Grundarbeslut 2026-11-04: stäng av vid källan.**
- **Planvalsgrinden** (`agents/recommender/recommend.js`): i en kategori med `bytesmalMotKategorigolv` räknas
  inget primärt byte, och kunden får en kodskriven mening (`PLANVALS_MENING`) i stället för modellens prosa
  (PG-01, PG-02). Korpusen: 131 → 24 prissatta, 163 → 270 tystade; alla 107 ändrade är mobil, «prissatt →
  tystad», inga andra kategorier rörde sig (mätt per fixtur med och utan grinden). Facit uppdaterat.
- **Bytets delar lagras** (`lib/bytesdelar.js`, kolumnen `bytesdelar_json`, migrering, valfri kolumn, egen
  skrivsats): primärt brutto, sekundär del och om grinden slog till (PG-03, BD-01..04).
- **Rummet läser delarna och räknar ingenting om:** en bredbandsdel som analysen lagrat står kvar exakt som
  lagrad (MS-13); en rad utan delar, med primär del, okänd version eller annan sekundär kategori visar inget
  byte och säger att det kan vara räknat mot det billigaste och att en ny analys räknar bredbandsdelen för sig
  (MS-08, MS-13). Domen säger inte «Inget byte rekommenderas» i ett rum utan samlad poäng.
- G1-1 och G1-2 är borta med rekonstruktionen. G1-3 kan inte uppstå: rummet antar aldrig att en faktura är
  kombinerad. G1-5 («1 av 1 prissatta» bredvid «kan inte bedöma allt») står kvar, låg vikt. G1-4 förexisterande.
- **Efter merge:** kör migreringen (`bytesdelar_json`); tills den körts läker rummets läsning kolumnen, och
  skrivningen faller tyst till «inga delar», som rummet visar som ett indraget byte. Gamla mobilrader visar
  inget byte förrän fakturan analyseras igen; mail-in-rader kan köas om (`koa-om-alla`).
- **Kvar, egen PR:** spegelfallet i `lib/secondary-savings.js` (mobil som sekundär del på en bredbandsfaktura,
  mot mobilens golv). 30 fixturer låser i dag det beteendet.

**Kvar, förexisterande [KUND], egna PR:er efter c2:**
- **C1-3 · Fakturavyn, mejlen, briefingen och dörren räknar mobilens avstånd och byte mot det billigaste
  abonnemanget.** 349-planen till listpris får «Ni betalar 30 % över verifierat publikt listpris», poäng
  66 och ett byte till 269-planen. Det är grundarens exempel utanför rummet, och roten till C1-1. Bytet ska
  grindas på samma deklaration som rummet (`kraverBekraftadNiva`), på samma sätt som lfl-grinden för saas.
  Fakturavägen ska också lagra mobil- och bredbandsdelen var för sig, så att rummet kan visa bredbandsdelen
  (E1-2). Samma planval finns spegelvänt: en bredbandsfaktura med mobil som sekundär del räknar mobildelen mot
  kategorins golv (`lib/secondary-savings.js`).
- **C1-4 · Bytesradens «X% mer» räknas som andel av kundens pris** (`radLage`, (a−s)/a): 23 % där rätt
  tal är 30 %. Bibelns 85-fel.

## Förexisterande fynd, loggade enligt avgränsningen 22 okt

Ur andra blicken på uppföljningen (`ops/GRANSKNING-ssot-tele2.md`). Inget av dem blockerar PR #86.
Var och en byggs i en egen PR, med egen granskning.

- **V-1 · Standard 500 i Östersund: 399 i källan, 455 i boken. Stängt.** Talet når ingen kundtext
  (avläst med motprov). Nästa körning, 39768127034 på da9e24f0, gav 18 av 18 gröna, och Standard 500
  i Östersund stod åter på 455. Svaret 22 okt 10:06 var tillfälligt. Vakten skriver nu hela erbjudandet
  per adress (NV-10), så nästa avvikelse går att läsa.
- **Granskningen av lagningen (`ops/GRANSKNING-ssot-tele2-lagningen.md`):** L-1 (Basic-årssumman under
  taket) fångas i PR #86 av mains tröskel, inte av ett nivåberoende tak (LT-02). L-2 (Googles «30–40 %
  billigare») och L-3 (rummets «aldrig en nedgradering») är lagade, eftersom de satt i det kort PR:en
  skrev om. BI-14 låser alla `real-public`-alternativ mot sin bok, och KM-05 spärrar matchningslöftet.
  L-4–L-7 ([VAKT]) är lagade.
- **Tredje och fjärde granskningen (`-tredje.md`, `-fjarde.md`):** varje försök att härleda licenstaket
  ur prisboken gjorde ett fel vanligare. Ett tak per faktura på pris per plats, som bär tilläggen, kan
  inte skilja tillägg från en årssumma (L-1, T-1, F4-1). I PR #86 har prövningen därför exakt mains
  beteende (0 skillnader mot main i 10 miljoner anrop, femte granskningen). LT-01..04 låser trösklarna,
  inte namnuppslaget (F5-1). T-8 är lagat. T-5, T-6 och NV-03-delen av T-7 är skärpta men inte stängda:
  F4-3 (BI-14 är fortfarande en ordlista), F4-4 (KM-05 släpper «matchar er nivå — ingen nedgradering»)
  och F4-5 (NV-03 jämför två fält i samma objekt). De är [VAKT] och lagas framåt, med F5-1 (namnuppslaget
  olåst), F5-2 (vägen från anomali till `review_queue` oprövad) och F5-3 (kvartalssumman saknas i
  modulhuvudets BLIND).
- **T-2 · Licenstaket når nästan aldrig en riktig faktura. [KUND], förexisterande. Byggd i T-2-PR:en.**
  `lib/supplier-price-intel.js` gör två prövningar, och fakturan går till granskning om någon slår till.
  (1) Mains tak per plats, oförändrat och alltid (765,70 · 468 · 908,70 på mains exakta namn). (2) Ovanpå,
  bara i kategorin `saas-productivity`: varje löpande nivårad med antal mot sin egen nivå i prisboken.
  Över 2 × nivåns listpris per licens och månad går fakturan till granskning, oavsett leverantörsnamn.
  Priset är belopp ÷ antal, samma tal som kundens årskostnad. Eftersom (1) är mains fångar prövningen allt
  main fångade. Svepet mot main (LT-06, 407 568 fall: Microsofts licensfakturor med olika antal per rad,
  platser räknade på två sätt, produkter utanför boken, felläst projektion och antal, rader utan antal,
  Adobe med flera produkter, paketfakturor i sina kategorier, och Microsofts rader i kategorier utan
  radprövning): main hade rätt i 170 144, den nya prövningen i 222 372, och **noll** fall där main hade
  rätt och den nya fel. Utanför `saas-productivity` är utfallet mains, fall för fall. Talet gäller inom
  rutnätets prisaxel (Microsoft: årspris, månadspris, 1,15 × årspris; Adobe: teampris, 1,10 × teampris).
  **Kostnaden, öppet:** en korrekt licensrad över
  2 × nivåns månadspris går till granskning där main prissatte den (N-3); samma tal kan vara en
  kvartalssumma läst som månad. Fakturavyn ger vid en prisavvikelse en enda mening som inte nämner talet
  (LT-11). N-4 (SS-01 släppte ett rått prisseed) är lagat.
  **Tre försök föll först**, alla i granskning eller i en omkörning av en död granskares anteckningar:
  - 2ac67b6e höjde taken per plats och prissatte Office 365 E3 och Adobe-produkter lästa som kvartalssumma
    (`ops/GRANSKNING-t2-licenstaket.md`, T2-1).
  - ec21e155 hoppade över taket när varje rad var en prövad nivårad och prissatte en projektion läst ×12
    och ett halverat antal (LT-09). Granskaren dog på sessionsgränsen.
  - ea56bf42 körde radprövningen i varje kategori och skickade korrekta paketfakturor till granskning med
    fel skäl, och prövade en rad utan antal på à-priset (`ops/GRANSKNING-t2-licenstaket-lagningen.md`,
    L-1, L-3). Samma rutnät ger 96 försämringar mot ea56bf42.
  Lagat i samma PR: fakturavyn har ett eget besked för `price_anomaly` (L-2: «Vi stoppade prissättningen»
  i stället för «vår algoritm är inte tillräckligt säker på klassificeringen»), renderat i 390 och 1600 px
  med motprov (`scripts/screenshot-prisavvikelse.mjs`). Beskedet föll i fem granskningsvarv på samma form
  (N-1, P-1, Q-1, R-1, S-1/S-2) och är nu en enda mening som inte nämner talet (`src/lib/prisavvikelse.js`,
  LT-11, regel 13). Stoppet för en blandad faktura med en paketrad i `saas-productivity` (S-2) är mätt mot
  mains hela beslut: Dustin går till granskning också på main (sanitet 62 %), och Atea prissätts på main
  med ett falskt byte på 56 963 kr/år där paketraden räknas som E3-licenser; T2-2; T2-4; T2-5; T2-6; L-4; F5-1; F5-3; T-4.
  **Kvar, [KUND], förexisterande och inte vanligare:**
  - **Microsoft 365 E5 på månadsfakturering (769,42) och Adobe Creative Cloud Pro till listpris (985) går
    till granskning, som på main.** Ett tak per plats kan inte skilja dem från fel med samma tal. E5 kan
    prissättas först när projektionen och platsantalet prövas mot raderna (projektionskravet, som står i
    skugga). Adobe kräver en radläsare per Adobe-produkt; `detectAdobePlan` gissar en plan per faktura.
  - **F4-2:** «Microsoft 365 Business Basic EES (exkl. Teams)» läses inte som nivå, och en årssumma
    därav under mains tröskel (619,32 och 743,16) prissätts, som på main. Stängs när boken bär EES-priserna.
  - Ett tillägg läst som kvartals- eller årssumma hos en leverantör vars namn mains uppslag inte känner
    prissätts, som på main. Tilläggen saknar listpris i boken.
  - Fakturavyns generiska granskningstext («våra modeller är oense», «Koppla Fortnox / Visma») står kvar
    för de andra skälen. Den gäller inte `price_anomaly` längre.
  - **Q-7, sidans rubrik:** «Ni betalar för mycket. En faktura bevisar det.» står utan villkor ovanför
    varje resultat i fakturavyn, också ovanför «Det behöver inte betyda att priset är fel» och ovanför en
    faktura till listpris. Förexisterande på main. Egen PR: rubriken ska följa resultatets läge.
  **Kvar, [VAKT]:** F5-2 och L-5: vägen från anomali till `review_queue`, och att anropet körs utan mains
  gamla villkor, prövas inte genom handlern. Ur tolfte domen (`ops/GRANSKNING-t2-licenstaket-tionde.md`,
  MERGAS): U-1 (en gren före granskningsgrenen kan ta skälet utan att LT-11 fäller), U-2 (sondens
  BLIND-rad lovar mer än LT-04 prövar), U-3 (SS-01 läser inte `scripts/aggregate-invoice-benchmarks.mjs`)
  och U-6 (S-2-mätningen mot main har inget instrument i repot).
  **Jag vet inte än:** granskaren läste att `api/send-analysis.mjs` svarar 400 på varje granskningssvar,
  eftersom svaret saknar `recommendation`. Grenen rör inte filen. Vad kunden ser när den begär mejlet är
  inte mätt; det prövas i en egen PR.
- **Rummets bredbandsrad (steg c), observerat i renderingssonden 22 okt, med en syntetisk rad:**
  rummet sa «Prissatta 0» och «Vägde 0 fakturor mot verifierat publikt listpris» bredvid «Ni betalar
  mer än listpris» och Arvo Score 10. Raden saknade antal platser, så den kan vara en artefakt av
  sonden. Det prövas mot en riktig bredbandsrad.
- **K-5 · Rummets bytesbesked visar ett fryst golv bredvid dagens bokdatum.** Steg c. Golvet räknas
  vid läsning ur den lagrade hastigheten, eller så visas radens analysdatum.
- **K-6 · Tröskelfixturerna låser en tröskel över 432, inte 500.** En tvillingfixtur med gross ≥ 500.
- **K-7 · Prislarmets kundtal innehåller tilläggsrader.** Latent: `priceAlert` läses av ingen yta.
  Lagas innan en yta läser fältet.
- **V-3 · `dollarRader` sväljer belopp som står nära varandra och kapar tyst vid 24.**
- **V-4 · Creative Cloud Pro-priset har inget momsankare** i `lib/verifiers/adobe.mjs`.
- **V-5 · Två kategoristämplar landar på fel datumpost** (saas-finance och loneadmin), och
  price-audit läser det stämplade datumet i stället för körningens. Den öppna frågan om
  `fortnoxVerified` flyttas när Fortnox-vakten är röd prövas i samma steg. Blir svaret ja är det
  [KUND] och går före allt annat.
- **Historiken i `supplier_price_history`:** 2022-raden är raderad (steg b). 2026-raden läses i ett
  eget pass, se steg b nedan.
- **Tele2 bredband, 26 okt: Max-familjen −40 kr igen, bekräftat i två avläsningar** (verify-sources
  40352730578 kl. 15:47, alla tre adresser: 199/239/279/279 med 12 månaders bindning). Det är tredje
  svängningen på tio veckor: −40 den 18 aug, +40 den 19–21 okt, −40 den 26 okt. Boken står på
  239/279/319/319. Riktningen är den försiktiga: boken ligger över källan, så en besparing mot Tele2
  blir mindre, aldrig större. Innan boken följer källan prövas om Tele2:s API märker priset som
  kampanj. Bibelns regel från HubSpot gäller: det högsta priset i ett block är listpriset, och en
  kampanj kan bara ligga under. Följer boken varje svängning blir det 55 fixturer per kampanj.

## Steg b, avläst underlag (22 okt)

`probe-undersokning` (39760703487, main 25682b28): 46 rader i `supplier_prices` står som aktuella,
alla med `last_verified` i maj. Det är exakt seedblocket som PR #86 tar bort ur repot. Ingen tabell
pekar på `supplier_prices`. Att markera raderna som inaktuella kan krocka med det unika indexet
(leverantör, produkt, nivå, is_current), så raderna raderas. Efter PR #86 läser ingen kundväg tabellen.
Skrivaren som finns kvar är `scripts/apply-price-proposals.mjs`, och den tas bort i samma steg.

## Steg b, utfört underlag (23 okt)

- **Historikraden från 2022 är falsk.** «Microsoft 365 Business Standard 12,50 → 14,00, 2022-03-01»
  hänvisar till Microsofts post 2021-08-19. Avläst 23 okt listar posten sex produkter (Business Basic,
  Business Premium, Office 365 E1, E3 och E5, Microsoft 365 E3) och inte Business Standard. Raden är
  struken ur `scripts/seed-price-history.mjs` och raderas ur produktionen av `stada-prisdata`.
- **2026-raden ($150 → $168 per år, 2026-07-01) är obekräftad.** Postens priser står i en bild som
  textläsningen inte ser. Raden når ingen kund i dag: prognosen kräver tre höjningar. Den läses mot
  Microsofts planprislista i ett eget pass. Den hör inte till licensprövningen och togs därför inte
  med i T-2-PR:en.
- **`lib/price-db.js`:** `upsertPrice` och fem läsare utan anropare är borttagna i T-2-PR:en (SS-03).
  Ingen kod i `lib/` frågar längre `supplier_prices`.

