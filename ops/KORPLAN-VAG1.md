# Körplan: vägen till våg 1

> Skriven av arkitekten (Fable 5.2) den 11 november 2026, på grundarens order samma dag. Byggaren
> (Opus 5.5) kör planen enligt `ops/BYGGARRUTIN.md`. Varje vägval nedan är avgjort och motiverat, så
> byggaren behöver aldrig fråga. Avvik bara när en mätning motbevisar planen, och skriv då mätningen i
> samma commit.
>
> Planen ersätter lägestabellen i `ops/ARBETSORDER-VAG1.md`. Den filen står kvar som fyndliggare: varje
> granskningsfynd och varje loggat förexisterande fel står där. `ops/ARBETSORDER-LANSERING.md` punkt 4
> är steg S8 här.

## Nu

Byggaren skriver om det här blocket vid varje kontrollpunkt (rutinen, avsnitt 5). En session som
startar om läser blocket först.

- **Steg:** S1 (c1), som är steg 4 i sekvensen i `ops/ARBETSORDER-LANSERING.md`. Planen lades om 11 nov.
- **Senaste mekanikcommit på grenen:** a649404b (sjätte blicken: BLOCKERAR).
- **Lins igång:** nej.
- **Byggare igång:** nej. Ett byggpass startades 11 nov i molnsessionen och stoppades samma dag på
  grundarens order, innan något var committat. Dess ospårade utkast till instrument A togs bort. Inget
  av S1 är byggt.
- **Nästa handling (Opus 5.5 i molnsessionen):** bygg instrument A
  (FV) och instrument B (RM), båda röda mot a649404b. Därefter lagningen L1–L6, sabotagen, renderingen,
  kontrollpunkten och sjunde linsen.

## Målet

Våg 1 är fem kunder som får tillgång till produkten. Planen är klar när grinden i S9 är grön. Att
bjuda in kunderna är grundarens handling. Den står under «Grundarens åtgärder».

## Stegen

En PR i taget, i den här ordningen. Varje PR bär ett enda påstående.

| Steg | PR:ens påstående | Rör | Läge |
|---|---|---|---|
| S1 | c1: en mobilfaktura får inget byte, inget avstånd och ingen poäng i någon yta förrän abonnemanget är bekräftat | lib, api, agents, src | byggs om enligt ordern nedan |
| S2 | Kundsynlighetssvepet: varje loggat förexisterande [KUND] läses av mot dagens ytor. Ingen PR | inga filer utom planen | medan S1:s lins rullar |
| S3 | Fakturavyns rubrik följer resultatets läge (Q-7) | src | byggd i S1: S1 gjorde resultat utan byte vanligare (stoppregeln) |
| S4 | Rummets bytesrad: «X % mer» räknas mot jämförelsepriset (C1-4), och golvet bär sitt analysdatum (K-5) | lib, src | efter S3 |
| S5 | c2: briefingsidan visar ett prislarm som ett prislarm (LA-K1) | lib, api, src | efter S4 |
| S6 | Mobil i blandade fakturor: spegelfallet och talet «per abonnemang» | lib, api | efter S5 |
| S7 | Avtalstexten och integritetstexten säger vad systemet gör | src, scripts, tests | efter S6 |
| S8 | Live-verifieringen (LANSERING punkt 4) | inga | efter S7 |
| S9 | Våg 1-grinden | inga | sist |

Sekvensens numrering (steg 1–14) står i `ops/ARBETSORDER-LANSERING.md`. S1–S6 är steg 4–9 där, steg 10
(Tele2 bredband: kampanj eller listpris) har sin order där, och S7–S9 är steg 11–13.

Ordningen mellan S3–S6 följer hur många kunder som möter felet: fakturavyn först, sedan rummet,
briefingen och de blandade fakturorna. S2 kan flytta ett steg eller lägga till ett. Regeln står i S2.

---

## S1 · c1, mobilfakturan

### Beslut 11 nov: reservvägen tas nu, före sjunde blicken

Vägvalet 10 nov gav bredbandsdelen på kombinerade fakturor ett försök till och lade en stoppgräns
efter sjunde blicken. Arkitekten tar stoppgränsen nu. Skälen:

1. **Tre varv på samma form.** Rond 4, 5 och 6 blockerade alla på kombinerade fakturor. Bibelns regel 13
   säger att formen byts efter tre varv.
2. **Lagningen kräver ett nytt kundläge i fyra ytor.** Avläst i koden 11 nov: `fakturaLage`
   (`lib/lagesregister.js`) sätter fakturans poäng ur hela årskostnaden mot förslaget, och `radScore` ger
   samma analys ingen poäng i rummet. Ska bredbandsbytet stå kvar måste läget «byte utan poäng» byggas i
   fakturavyn, analysmejlet, aktiveringsmejlet och svarsmejlet. PR:en är redan 32 filer.
3. **Produktionen kör main.** a649404b finns inte på main (avläst 11 nov), så det grundaren stängde
   22 okt visas fortfarande för kunder. Varje rond till förlänger det.

**Kostnaden, öppet:** bredbandsdelen på en kombinerad mobil- och bredbandsfaktura visas inte förrän den
byggs på rätt nivå (A-2 under «Till arkitekten»). Det avviker från alternativet grundaren valde 4 nov,
där bredbandsdelen stod kvar. Besparingen försvinner inte ur produkten. Den byggs som egen del med egna
lägen och egen granskning.

### Påståendet

**En faktura vars kategori har `bytesmalMotKategorigolv` i prisboken (i dag mobil) får inget byte,
inget procentuellt avstånd och ingen poäng. Det gäller fakturasvaret, den lagrade raden, rummet och
varje mejl, oavsett vad modellen svarar, om antalet är avläst och om fakturan också bär bredband.**

Motprovet hör till påståendet: en bredbandsfaktura och en M365-faktura behåller sina byten, med samma
tal som på main.

### Instrumenten först

Båda byggs och pushas innan något lagas. De ska vara röda mot a649404b på de rader som anges. Ett
instrument som är grönt mot a649404b prövar inte det granskarna fann.

**Instrument A, fakturakedjan (`tests/fakturakedjan.mjs`, FV-01 och framåt).** Hela handlern i
`api/test-invoice.mjs` körs med bara nätverket stubbat. De fyra nätverkspaketen
(`@anthropic-ai/sdk`, `@vercel/kv`, `@neondatabase/serverless`, `resend`) byts mot stubbar genom en
laddarkrok, och handlern körs i en barnprocess så att stubbarna inte läcker in i resten av sviten.
Stubben svarar på de tvingade verktygen `extract_invoice`, `categorize` och `recommend`, och fångar
SQL-satserna så att den lagrade raden kan läsas.

Fallen:
- de kombinerade fixturerna i `tests/fixtures/03-combined.mjs` med mobil som primär del (sjätte
  blickens K1–K6 hör dit), var och en gånger modellens svar (ja, nej) gånger antalet (avläst, inte avläst);
- en ren mobilfaktura till listpris (349-planen) och en ren mobilfaktura under 1,15 × golvet;
- motprov: en ren bredbandsfaktura och IT-8821 (M365).

Invarianter för varje mobilfall:
- **FV-A1.** `shouldSwitch` är `false`, `savingPerYear` är 0, `suggestedAnnualCost` och
  `suggestedSupplier` är `null`, `recommendationType` är `'no_action'`, och `planvalsgrind` är satt.
- **FV-A2.** Svaret bär ingen sekundär besparing, och `[secondary-override]` slår inte till.
- **FV-A3.** `lage.matt` är `false`, `lage.score` och `lage.etikett` är `null`, `lage.harByte` är `false`.
- **FV-A4.** `reasoning` börjar med `PLANVALS_MENING`, ordagrant. Har fakturan en avläst bredbandsdel
  följer exakt en mening till (se «Texterna»), annars ingen. Texten bär inget tal.
- **FV-A5.** Den lagrade raden bär inget bytestal och ingen besparing.
- **FV-A6.** Rummet byggt ur den lagrade raden (`berikaRader` → `byggRum`) visar raden utan byte, utan
  procent och utan poäng, och rummet har ingen samlad poäng.
- **FV-A7.** Mejlen byggda ur samma svar bär inget procenttal, ingen poäng och inget bytesbelopp. Kan en
  mejlbyggare inte nås som ren funktion skrivs det i testet, med skälet.
- **FV-A8.** Samma analys ger samma dom i varje yta: A3, A6 och A7 säger samma sak.

Motproven: bredbandsfakturan och IT-8821 har `shouldSwitch: true`, och deras tal är lika med facit.

Väntat rött mot a649404b: A1 (modellens nej under tröskeln når aldrig grinden, H1-1 och H1-4), A2 och
A3 (sekundärvägen ger byte och poäng, H1-3) och A8.

**Instrument B, rummets tillståndsmatris (`tests/rumsmatris.mjs`, RM-01 och framåt).** Rader genereras
över kategori (mobil, bredband, saas-productivity, el, loneadmin), väg (auto, monitoring, review_queue),
underlag (finns, saknas), lagrat byte (ja, nej) och ett till tre rader per rum. Invarianter på
`byggRum` och radernas texter:
- **RM-R1.** En mobilrad bär aldrig procent, poäng eller byte.
- **RM-R2.** Visar någon rad ett byte räknas den som prissatt, och domen nämner ett byte. Visar ingen rad
  ett byte gör domen det inte.
- **RM-R3.** Ett rum med minst en rad utan dom har ingen samlad poäng, berömmer inte priserna och säger
  varken «Allt är under kontroll» eller «Inget byte rekommenderas».
- **RM-R4.** Tal som står bredvid varandra går att addera: räknarna summerar till antalet rader.
- **RM-R5.** Ingen text säger emot radens tillstånd. «Vi sätter varken avstånd eller poäng» står bara där
  poängen och procenten saknas. Ett procenttal om mobilabonnemang står aldrig på en mobilrad (H1-2).

### Lagningen

Alla beslut är fattade. Byggaren verkställer dem.

- **L1. Grinden flyttas till slutet av `recommend()`**, utanför varje gren och omedelbart före returen.
  I dag sitter den inne i den deterministiska grenen och nås bara när modellen svarat ja och en
  primärkomponent finns. Den gäller varje kategori med deklarationen och sätter exakt fälten i FV-A1.
- **L2. Ingen sekundär besparing räknas när primärkategorin har deklarationen.** Raden i
  `api/test-invoice.mjs` som i dag lyder `extracted.prispastaendeSparrat ? null : computeSecondarySaving(…)`
  får planvalsgrinden som ett villkor till. Formen är FX-16:s: en faktura som inte får bära ett
  bytespåstående får det inte tillbaka genom sidokanalen. `[secondary-override]` kan då inte slå till.
- **L3. Rummet håller inne varje lagrat byte på en rad i en sådan kategori.** Grenen `kvar: 'bredband'`
  i `undanhallBytePaOvissNiva` tas bort, och `BYTE_BREDBANDSDELEN` i `src/lib/rumstext.js` med den.
- **L4. `bytesdelar` tas bort helt.** Rummet läser inte delarna längre, och en lagring som ingen yta
  frågar ska inte nå produktionen. Det gäller `lib/bytesdelar.js`, kolumnen `bytesdelar_json` i
  `scripts/migrate.mjs`, posten i `VALFRIA_KOLUMNER`, fältet i de fyra rumsläsningarna, anropet i
  handlern, BD-01..04, PG-03 och rummen med lagrade delar i renderingssonden. MS-13 skrivs om så att
  den kräver påståendet ovan för kombinerade rader. Sök `bytesdelar` i hela trädet. Noll träffar kvar.
- **L5. Spegelfallet rörs inte här.** Mobil som sekundär del på en bredbandsfaktura
  (`lib/secondary-savings.js`) är förexisterande och blir inte vanligare. Det är S6.
- **L6. KM-09.** Sjätte blicken sa att testet flyttades till en bredbandsfaktura på en premiss som inte
  håller. Läs av: bär en mobilfaktura någon modelltext alls efter L1? Skriv svaret i testets kommentar.

### Texterna

Regeln är LT-11:s. En mening säger bara det koden gör, och den låses ordagrant i sviten.

- `PLANVALS_MENING` står oförändrad.
- **Bredbandsmeningen**, ny, läggs efter `PLANVALS_MENING` när koden själv har läst en bredbandsdel på
  fakturan: «Bredbandet på samma faktura har vi inte prissatt i den här analysen.» Villkoret är samma
  avläsning som sekundärvägen använder för att hitta delen. Meningen lovar ingenting om framtiden.
- **Rummets mening för ett indraget lagrat byte** tappar sin sista mening. Den lovade att en ny analys
  räknar bredbandsdelen för sig, och det gör den inte längre. Kvar: «Analysen av fakturan räknade fram
  ett byte som kan vara räknat mot det billigaste publicerade abonnemanget, så vi visar det inte här.»

### Facit, sabotage och rendering

- **Facit ändras bara genom ett deltabevis** (metoden från 18 aug). Ett skript tillåter exakt ett delta:
  en fixtur med mobil som primär del, vars byte på a649404b kom ur den sekundära delen, går från
  prissatt till tystad. Allt annat stoppar skriptet. Talen före och efter skrivs i commiten och i `Nu`.
- **Sabotage som måste fälla**, vart och ett med `assert s.count(old) == 1` och med kontroll att
  beteendet ändrades:
  1. grinden flyttas tillbaka in i den deterministiska grenen;
  2. planvalsvillkoret tas bort ur L2;
  3. rummets strykning gäller bara rader med underlag;
  4. `radScore` utan spärren för ett indraget byte;
  5. bredbandsmeningen visas alltid, och i ett andra sabotage aldrig;
  6. deklarationen tas bort ur prisboken för mobil;
  7. deklarationen läggs på bredband (motprovet ska då falla).
- **Rendering i 390 och 1600 px**, med produktionsfunktionerna: fakturavyn för en kombinerad faktura och
  för 349-planen, rummet med en nyanalyserad kombinerad rad och med en gammal lagrad rad, och som motprov
  ett bredbandsrum med byte. Titta på bilderna.
- **Bibeln rättas i samma commit som koden.** I stycket «GRUNDARBESLUT 2026-11-04, stäng av vid källan»
  ersätts meningarna om `bytesdelar_json` och om bredbandsdelen (MS-13) med: «Fakturavägen räknar inget
  byte alls på en mobilfaktura, inte heller på bredbandsdelen av en kombinerad faktura (arkitektbeslut
  2026-11-11, FV-A1, FV-A2). Rummet visar inget lagrat mobilbyte (MS-08).» Sätt in de test-ID:n som
  faktiskt bär påståendet.

### Byggt 11 nov (utfall)

- Instrumenten var röda mot a649404b: FV-A1 131 fall, FV-A2 124, FV-A3 124, FV-A4 150, FV-A5 164, FV-A6 120,
  FV-A7 124, FV-A8 44; RM-R1 200 rum, RM-R3 60, RM-R6 100. Efter lagningen gröna.
- **Funnet i renderingen, lagat i samma PR:** fakturavyn sa «Vi hittar inget publikt pris att byta ned till»
  ovanför planvalsmeningen, analysmejlet «inget verifierat jämförelsepris» och svarsmejlet «inget verifierat
  pris att byta ned till». Nu ett besked i lägesregistret (`PLANVAL_BESKED`, rubrik `planval`) som vyn och båda
  mejlen läser (FV-A3, FV-A7, FV-A9, SA-01b). Svarsmejlets kort byggs nu av en exporterad funktion
  (`svarsKort`), så att instrumentet prövar kortet i stället för en spegel.
- **S3 (Q-7) byggd här:** sidrubriken «Ni betalar för mycket» står bara före ett resultat och över ett byte
  (FV-A10). Skäl: S1 gör resultat utan byte vanligare, och stoppregeln lägger då felet i PR:en.
- **Facit oförändrat** (334 fixturer, 24 prissatta): korpusen kör `recommend()` utan sekundärvägen, och
  mobilfixturernas modellsvar är nej, så deltabeviset behövdes inte.
- **L6:** KM-09:s premiss mätt med motprov: 8 abonnemang à 299 kr gav modellens text på a649404b och
  planvalsmeningen nu.
- **Sabotage:** femton riktningar. Två fällde noll först: S4 (radens poängspärr för ett inhållet byte, ett
  skydd bakom ett skydd, nu borttagen) och S13 (svarsmejlets kort var speglat i instrumentet; nu fäller det
  FV-A7).

### Sjunde linsen

Uppdraget är påståendet. Linsen ska leta efter en väg där en mobilfaktura ändå får ett byte, ett
procenttal eller en poäng i någon yta, efter en icke-mobil faktura som förlorat något mot main, efter
ett fel i facitdeltat och efter en mening som är falsk för något fall den visas för.

Blockerar linsen:
- på en väg där en mobilfaktura får ett tal: lägg fallet i instrument A eller B, se det bli rött, laga,
  och kör en lins till;
- på något annat som grenen infört: laga bara det;
- en andra gång i rad: eskalera till Fable med båda domarna innan nästa lagning (eskaleringsregeln);
- en tredje gång på samma form efter den här omläggningen: eskalera till Fable, och gå vidare med S2 och
  med förarbetet till S3–S6 medan passet går. Det förarbetet är läsning och mätning, aldrig
  kodändringar på grenen.

### Efter merge

Ingen migrering behövs, eftersom kolumnen är borttagen. Läs av driftsättningen på Vercel för
mergecommiten. Kör `diag-live` mot produktionen med en mobilfaktura (`lage.matt: false`, inget byte) och
en bredbandsfaktura som motprov. Starta sedan om grenen från main.

---

## S2 · Kundsynlighetssvepet

Ingen PR. Svepet läser av, med produktionsfunktionerna och en rendering per yta, om varje loggat
förexisterande [KUND] syns för en kund i dag. Det får göras medan S1:s lins rullar, eftersom det inte
ändrar någon spårad fil. Utfallet skrivs in här i planen efter att linsen lämnat sin dom.

| Fynd | Yta | Syns i dag? | Går till |
|---|---|---|---|
| Q-7 · rubriken «Ni betalar för mycket» utan villkor | fakturavyn | enligt beskrivningen ja; läses av | S3 |
| C1-4 · «X % mer» räknat som andel av kundens pris | rummets bytesrad | enligt beskrivningen ja; läses av | S4 |
| K-5 · fryst golv bredvid dagens bokdatum | rummets bytesrad | läses av | S4 |
| LA-K1 · prishöjning visad som «Potentiell besparing» | briefingsidan | bara för beviljat premium; läses av | S5 |
| Spegelfallet · mobil som sekundär del räknas mot golvet | fakturavyn, mejlen | läses av | S6 |
| «Per abonnemang» med bredbandets kostnad inräknad | rummets underlag | läses av | S6 |
| C1-3-resten · briefingen och dörren räknar mobilens avstånd | briefingen, dörren | läses av | svepet avgör |
| F1-5, G1-4, G1-5 | rummet | läses av ur domfilerna | svepet avgör |
| H1-6 · en poäng mot billigaste planen lagras | lagringen | läses av: läser någon yta fältet? | svepet avgör |
| `api/send-analysis.mjs` svarar 400 på ett granskningssvar | mejlet | inte mätt | svepet avgör |
| Rummets bredbandsrad «Prissatta 0» (22 okt, syntetisk rad) | rummet | läses av mot en riktig rad | svepet avgör |

Regeln: ett fel som en våg 1-kund kan möta i dag får en egen PR före S9, i ordning efter hur många
som möter det (fakturavyn, mejlen, rummet, briefingen, dörren). Ett fel som ingen yta visar står kvar
loggat och byggs efter S9. «Syns inte» är en avläsning med motprov, aldrig en bedömning.

## S3 · Fakturavyns rubrik följer läget (Q-7)

- **Påståendet:** rubriken ovanför ett resultat är en funktion av lägeskoden som API:t skickar. Den starka
  rubriken kräver ett visat byte.
- **Beslut:** ytan slår upp rubriken per kod, som rummet gör (lägesregistret dikterar). Före ett resultat
  får säljrubriken stå. En faktura till listpris, en faktura i granskning och en omätt faktura får aldrig
  «Ni betalar för mycket».
- **Bevis:** ett test som går igenom varje lägeskod och kräver en rubrik utan påstående läget inte bär.
  Rendering i 390 och 1600 px för listpris, granskning och byte (motprovet behåller den starka rubriken).
- **Lins:** Grinden kräver ingen för en ren `src`-ändring. Regel 8 är kontrollen.

## S4 · Rummets bytesrad (C1-4 och K-5)

- **Påståendet:** «X % mer» är (kundens pris − jämförelsepriset) ÷ jämförelsepriset, och ett lagrat golv
  visas med sitt analysdatum.
- **Beslut C1-4:** en funktion i lägesregistret äger talet. Sök MENINGEN, inte funktionen: rummet,
  fakturavyn, mejlen och briefingen. Varje ställe som skriver ett procenttal med ordet «mer» eller «över»
  läser samma funktion.
- **Beslut K-5:** raden visar det lagrade golvet med analysens datum («Samma nivå kostade vid analysen ·
  analyserad <datum>»). Golvet räknas inte om vid läsning. Fem granskningsvarv på c1 visade att en
  omräkning i efterhand säger fel.
- **Bevis:** grundarens exempel ger 30 %, inte 23 %. Sabotage: formeln tillbaka, och datumet bytt mot
  bokens. Rendering i 390 och 1600 px.

## S5 · c2, prislarmet på briefingsidan (LA-K1)

- **Påståendet:** en briefingrad som kommer ur ett prislarm visas som ett prislarm. Månadsbriefen är
  oförändrad.
- **Beslut:** bygget gjordes 5–9 nov och förlorades med containern. Det byggs om efter samma ritning:
  `lib/briefingslag.js` (`LARM_PREFIX`, `larmPeriod`, `briefingSlag`, `briefingManad`, `larmBriefingRad`
  med `totalSavingPotential: 0`, `briefingSvar`), läget `larm` i `src/lib/briefinglage.js`, omslaget
  «Prislarm» och etiketten «Prisändring» i `src/pages/Briefing/index.js`. Mätvärdesrutan visas bara när
  ett värde finns. Båda larmvägarna (`api/cron/run-price-alerts.mjs`, `scripts/notify-price-changes.mjs`)
  skriver samma rad genom samma funktion.
- **Bevis:** LB-01..04, renderingssond med motprov (månadsbriefen ser ut som förut). Sabotaget där
  endpointen skriver över summan måste fälla. Det fällde först noll förra gången.

## S6 · Mobil i blandade fakturor

- **Påståendet:** ingen väg räknar ett mobilbyte mot det billigaste abonnemanget, och inget tal «per
  abonnemang» bär en annan tjänsts kostnad.
- **Beslut, spegelfallet:** `lib/secondary-savings.js` räknar ingen sekundär del i en kategori med
  `bytesmalMotKategorigolv`. Samma deklaration, samma grind (regel 1). De 30 fixturerna flyttas genom ett
  deltabevis: bara den sekundära mobildelen försvinner, och bredbandets tal står orörda.
- **Beslut, «per abonnemang»:** har fakturan en sekundär del visar underlaget inget tal per abonnemang,
  om inte raden lagrar mobildelens egen kostnad. Läs av vad raden lagrar innan valet görs.
- **Bevis:** instrument A får fallen. Rendering av en kombinerad rad.

## S7 · Avtalstexten och integritetstexten

Avläst 11 nov: `/villkor` lovar ombudskap, fullmakt genom BankID, 24 timmars ångerrätt efter signering,
firmateckningskontroll och ansvar för en missad uppsägning. `/integritet` lovar att allt raderas inom 24
timmar vid avslut. Ingen kod gör något av detta, och analyser arkiveras utan att raderas (grundarbeslut
11 sep). Uppladdningsformuläret binder varje besökare till villkoren.

- **Påståendet:** varje mening i villkoren och integritetstexten beskriver något systemet gör i dag.
- **Golvet (regel 9, inte förhandlingsbart):** texten lovar ingen mekanik som saknas och tar inte betalt
  för något som inte kan beläggas.
- **Beslut:**
  1. Modellen är strikt förberedande (grundarorder 24 sep). Kunden signerar och säger upp själv. Arvo
     levererar analysen, underlaget och påminnelserna. Ombudskap, fullmakt, BankID-signering, ångerfrist,
     firmateckningskontroll och ansvaret för en missad uppsägning stryks.
  2. Besparingsavgiften: texten säger att den inte tas ut i dag. Avgiften förutsätter ett byte som Arvo
     utfört, och Arvo utför inga byten. När den tjänsten öppnar gäller nya villkor som kunden godkänner
     då. Skälet är golvet: arvodets utlösare saknar mekanism i en förberedande modell.
  3. Integritetstexten beskriver det som lagras och det som händer vid avslut. Varje påstående läses av
     mot koden först, också «Faktura-PDF lagras aldrig» (kön `ingest_jobs` bär PDF:er tills de betats av).
  4. Ett löfte om borttagning kräver en mekanism. Den byggs först: ett skript och ett arbetsflöde i
     miljön `produktion` som avidentifierar en kunds rader, med adressen som `sha256:<hex>`, torrkörning
     som förval och anonymiserade prispunkter orörda. Texten lovar sedan exakt det skriptet gör.
  5. Undantaget `AVTALSTEXT` i KM-05 tas bort, så att skanningen läser villkoren som varje annan kundyta.
- **Två PR:er:** mekanismen först, texterna sedan.
- **Lins:** en lins på texterna, med uppdraget «hitta ett löfte utan mekanik».

## S8 · Live-verifieringen (LANSERING punkt 4)

Allt körs mot produktionen efter att S1–S7 är mergade, genom arbetsflöden på main:
1. `probe-larmacceptans` DEL G (golvet live).
2. Kedjan som en ny kund: ett mejl till en rumsadress med en mobilfaktura, en kombinerad faktura, en
   M365-faktura, en bredbandsfaktura och en faktura i en tyst kategori. Läs av att varje analys lagras,
   att svarsmejlet levereras och att rummet visar varje rad (`probe-rumsadress`, `probe-rumsintag`,
   `probe-kvitto`).
3. Rummet och fakturavyn live i 390 och 1600 px, som en ny besökare ser dem.
4. Premiumkedjan på testytan: en beviljad testidentitet får brief och larm, och en obeviljad får inget
   (motprovet).
5. Larmen når en människa: senaste `[Review Queue]`-notisens status hos Resend.
6. Vilken värd serverar `arvoflow.se`, och är gh-pages-kopian (`arvo-flow.github.io/flow`) nåbar och
   inaktuell? Är den det är den en kundyta med gamla löften. Den ska då följa main automatiskt eller
   stängas.

## S9 · Våg 1-grinden

Grinden är grön när varje rad är avläst, med kommando och motprov:

| # | Krav |
|---|---|
| G1 | S1–S7 är mergade genom Grinden, och varje merge är avläst som driftsatt |
| G2 | S8 punkt 1–4 är gröna |
| G3 | Inget förexisterande [KUND] som en våg 1-kund kan möta står öppet (S2:s tabell) |
| G4 | Villkoren och integritetstexten skannas av KM-05 utan undantag |
| G5 | Granskningskön och offertförfrågningarna når en inkorg som finns (S8 punkt 5) |
| G6 | De nattliga jobben på main är gröna, eller klassade RÄTT RÖTT med grundarens åtgärd skriven |
| G7 | gh-pages-kopian följer main eller är stängd (S8 punkt 6) |

När grinden är grön skriver byggaren en rapport och ändrar `Nu` till «Våg 1 är öppen».

---

## Grundarens åtgärder

Det här kan inte göras härifrån. Inget av det stoppar bygget. G5 och G7 kan kräva det.

1. **`ARVO_ALERT_EMAIL` i Vercel** ska peka på en inkorg som finns. Mätt 29 sep: `arvoflow.se` har ingen
   MX-post, så varje notis till `team@arvoflow.se` studsade. Dagens läge läses av i S8.
2. **En kontaktadress som tar emot mejl**, för integritetstexten och villkoren (samma rot som punkt 1).
3. **`CRON_SECRET` som GitHub-hemlighet**, om den fortfarande saknas. Läses av i S8.
4. **gh-pages-kopian**, om S8 visar att den är nåbar och inaktuell.
5. **Bjuda in de fem kunderna** och bevilja premium (`bevilja-premium`) när grinden är grön.

## Till arkitekten

Grundarorder 11 nov: Fable kopplas in vid de tre frysta kontrollpunkterna (efter våg 1, sömdesignen för
`api/test-invoice.mjs`, en olöslig konflikt mot bibeln) och enligt eskaleringsregeln (`CLAUDE.md` överst,
`ops/BYGGARRUTIN.md` avsnitt 1). Här står frågor som väntar på en kontrollpunkt. A-2 är kontrollpunkt 2,
A-3 och A-4 hör till kontrollpunkt 1, och A-1 tas upp där.

- **A-1 · Bibeln är 2 975 rader** och läses in i varje tur. En kärna med regler, och historiken flyttad
  till `ops/`, sparar tokens och gör reglerna lättare att följa. Två tester läser bibeln ordagrant
  (PV-18 och RG-BIB).
- **A-2 · Kombinerade fakturor som två prissatta delar** (C1-3, rad-först fas 2–3, sömmen i
  `api/test-invoice.mjs`). Den första riktiga kombinerade fakturan i våg 1 lyfter punkten först i kön.
- **A-3 · Arvodets utlösare i en förberedande modell.** Affärsmodellens fråga. Tas vid kontrollpunkten
  efter våg 1, med verklig kunddata.
- **A-4 · Den frysta kontrollpunkten efter våg 1** (LANSERING, rollfördelningen).
