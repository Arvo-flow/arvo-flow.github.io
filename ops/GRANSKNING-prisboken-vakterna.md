commits: 670337f8 b5f7e83f 3057bfb2 88740439
dom: MERGAS

# Andra blicken: prisboken och vakterna (PR #85)

PR #85 är `claude/fable-5-resume-i60dmd` mot `main`, med bas 15c94d4a. Två linser granskade den: vakterna och prisboken. Båda checkade ut 88740439, som var PR:ens topp när granskningen gjordes, och båda rapporterar rent `git status` efteråt. Prisbokens lins rapporterar att den inte pushade, committade, startade ett arbetsflöde eller använde Vercel-verktyg. Vakternas lins säger inget om det.

Filen är skriven av en agent som varken byggt eller granskat. Den återger granskarnas fynd och utfall och har inte kört om dem. Det skrivaren själv mätte står under «Täckning».

## Domen

**MERGAS, men bara för 88740439.** Regeln är att ett bekräftat [KUND]-fynd som PR:en inför blockerar. Något sådant finns inte.
- 13 fynd i två linser: 1 [KUND] och 12 [VAKT].
- Det enda [KUND]-fyndet (PB85-2) är bekräftat, men det kom in på main 15 aug i 40fbe478. Det blockerar alltså inte. Det står först nedan, eftersom grundaren ska prioritera det.
- 11 [VAKT] är bekräftade. 10 av dem infördes av PR:en och 1 fanns före den (V85-K1). Alla lagas framåt enligt stoppregeln (9 sep).
- 1 [VAKT] är obekräftat (V85-D1).

**Domen täcker inte PR:ens topp.** Efter den granskade commiten ligger två commits till: 91b38af4 och ee3ff972. De ändrar `lib/verifiers/zoom.mjs` och `lib/verifiers/core.mjs`. Ingen lins har granskat dem. ee3ff972 säger själv att den är en lagning av V85-Z1. Grinden fäller mekanik som ändrats efter den granskade commiten (se «Täckning»). Commitsen behöver alltså en egen granskningsrunda innan PR:en kan mergas (bibeln 18–20 okt, regel 5).

**Närmast gränsen ligger PB85-2.** Fyndet är [KUND], bekräftat och fanns före PR:en. I dag flyttar PR:en inte texten. Det är mätt: kortet visar Microsofts eget datum, 2026-10-19. Men b5f7e83f gör Atlassian-vakten grön. Efter merge stämplas Atlassian alltså varje vecka och blir ännu en leverantör vars datum kan hamna i Microsofts mening. Granskarens sabotage visar att ett senare Atlassian-datum tar över texten.

Det är inte mätt om felet i praktiken blir vanligare. Det kräver en vecka då Atlassian stämplas men Microsofts nivåer inte gör det. Som stöd anger granskaren att nattens prisvakt har timeouts på M365-sidorna. Det är ett annat instrument än verify-sources m365-vakt. Bibeln säger «en fix som gör ett gammalt redovisningsfel vanligare måste stänga det också» (22 aug, 11 sep). Om grundaren tillämpar den regeln här ska PB85-2 lagas i den här PR:en. Regeln för domen ger MERGAS. Beslutet är grundarens.

Byggaren har redan börjat laga PB85-2 i en lokal commit, ae4dd453, som inte var pushad vid skrivarens senaste läsning. Commiten åberopar samma regel. Den är inte granskad (se «Täckning»).

## Bekräftade [KUND]-fynd

Inget av dem infördes av PR:en.

### PB85-2: dörrens Microsoft-kort kan visa en annan leverantörs verifieringsdatum som Microsofts. Förexisterande
- **Fil:** `lib/domain-intel.js`, rad 367–371 (`M365_VERIFIERAT`).
- **Commit:** felet kom in i 40fbe478 (15 aug), avläst med `git log -S`. PR:en rör inte filen.
- **Påstående:**
  - Dörrens Microsoft-kort går genom `api/reveal` → `revealFromDomain` → `buildRevealFindings`.
  - Kortet skriver «nivåspannet: Microsofts publika listpriser, verifierade <datum>».
  - Datumet är det nyaste `lastVerified` bland ALLA nivåer i saas-productivity. Det gäller även Slack, Google, Zoom och Atlassian.
  - Nivåbryggan bredvid filtrerar på `currency === 'SEK'`, men datumet gör det inte.
  - Talet är rätt men proveniensen fel, och det räknar regel 3 som fel.
- **Bevis:**
  - `reveal.mjs` gav på 88740439: «… Microsofts publika listpriser, verifierade 2026-10-19».
  - `sab_reveal.py` satte `atlassian-jira-standard` till `lastVerified` 2026-10-25 med `assert old in s` och återställde i finally. Texten blev «… verifierade 2026-10-25».
  - `historik.py` läste 79 versioner av `branchindex.js` på origin/main. I 20 av dem var det nyaste datumet inte Microsofts.
  - Exempel: e8274f60 (5 okt) visade 2026-10-05 från slack-pro/slack-business-plus. M365-nivåerna stod då på 2026-09-28 (rad 471–505 respektive 538/543 i `git show`).
  - Inget test täcker texten. En grep efter «nivåspannet» i `tests/` gav 0 träffar.
- **Motprov:** utan ändring visar instrumentet M365:s eget datum, 2026-10-19. I 59 av de 79 versionerna var det nyaste datumet Microsofts. Instrumentet kan alltså ge både rätt och fel bärare.
- **Inte mätt:**
  - Om någon besökare har sett ett felaktigt datum.
  - Om m365-vakten var grön i körning 39548656562, där Atlassian stämplades med 2026-10-21.
- **Förslag:**
  - Filtrera datumet som spannet: på `currency === 'SEK'`, eller på de nycklar som m365-vakten deklarerar i `bevakadeTiers`.
  - Ta det STALASTE av Microsofts datum.
  - Lås det med ett test som stämplar en nivå från en annan leverantör med ett senare datum och kräver att texten är oförändrad.

## Bekräftade [VAKT]-fynd: lagas framåt enligt stoppregeln

Vakternas lins hade baslinjen `node --test tests/run.mjs` med 2686/2686 på 88740439, och `tests/narvarovakter.mjs` gav 8/8. Varje sabotage som fällde noll kördes mot hela sviten.

### Införda av PR:en, linsen vakterna (670337f8, 3057bfb2, 88740439)

#### V85-Z1: Zoom-kommentaren säger «månadsläget», men sidan visar årsläget och oförändrade priser. Infört av 88740439
- **Fil:** `lib/verifiers/zoom.mjs`, rad 24–29, och commitmeddelandet.
- **Påstående:**
  - Commiten och kommentaren säger att sidan «visar månadsläget som standard», att sonden fann «ett enda dollarbelopp … $ 16,50» och att «om priset har ändrats eller bara formatet går inte att avgöra».
  - Den levande körningen på PR:ens egen kod visar motsatsen. Sidan står i årsläget, och planpriserna är desamma som i prisboken. Bara formatet har ändrats: kommadecimal och $ efter talet.
  - Påståendet drogs ur ett instrument som inte kan se det formatet. Den nya raden 'dollarbelopp' i `zoomKontext` har samma blindfläck.
  - NV-08:s sidtext är påhittad, i fel format, och är inget utdrag.
- **Bevis:**
  - Körning 39548656562, jobb 119052610222 (sha 88740439). Raden 'planer' loggar «Workplace / Pro / Bäst för personligt bruk eller små team. / 14,16$ / /användare per månad · Faktureras årsvis‡» och samma för «Affärsverksamhet» med «18,33$».
  - Prisboken har `usdAnnual` 14.16 för zoom-pro och 18.33 för zoom-business.
  - Sonden 39500651019 (jobb 118896989115) kräver $ FÖRE talet: `(?:US ?\$|\$|USD ?)\s?(\d+…)`. Den gav en enda träff, «$ 16,50», ur tilläggsraden «22 ¶ $ 16,50 $ 1 ¶ per månad · faktureras månadsvis». Där är dollartecknet efter 22 det som hamnar framför 16,50.
  - Sondens planord `['Pro','Business']` ser aldrig «Affärsverksamhet».
  - Granskaren körde `zoom-live-utdrag.mjs` på ett ordagrant utdrag ur loggen:
    - 'dollarbelopp' innehåller inte 14,16 eller 18,33, bara «22 $ 16,50 $ 1».
    - 'planer' innehåller «14,16$».
    - `zoomUtfall` ger (saknas) två gånger.
    - Sondens mönster ger `['16,50']`.
- **Motprov:** i det gamla formatet, «Workplace · Pro … $14.16 /användare per månad · Faktureras årsvis», ger `zoomUtfall` 14.16 USD ok=true och 18.33 USD ok=true. Läsaren kan alltså läsa priset. Det som går förlorat är formatet «14,16$», och priset är oförändrat.
- **Förslag:**
  - Rätta kommentaren och skriv rättelsen i nästa commit.
  - Läs `(\d+(?:,\d+)?)\s*\$ … per månad · Faktureras årsvis` efter planens etikett och omvandla med `talSv`.
  - Låt 'dollarbelopp' ta $ även efter talet.
  - Byt NV-08:s sidtext mot ett ordagrant utdrag ur jobb 119052610222.
- **Efter granskningen:** 91b38af4 och ee3ff972 säger i sina meddelanden att de gör just detta. Skrivaren har läst meddelandena men inte prövat koden. Inget av det är granskat (se «Domen»).

#### V85-S1: Spiris blir grön på kortet ensamt, medan `blind` lovar OLÄSBAR. Infört av 3057bfb2
- **Fil:** `lib/verifiers/spiris.mjs`.
- **Påstående:**
  - `blind` säger: «Säger tabellen och korten olika, eller ändras tabellens ordning, blir vakten OLÄSBAR, aldrig grön».
  - I själva verket returnerar `samstamt(null, kort)` kortets värde. En oläsbar tabell ger alltså grönt på kortet ensamt.
  - En omordnad tabell med ett höjt pris blir grön på kortets gamla pris.
  - Inget test låser grenen med bara ett vittne.
- **Bevis:**
  - `prov-b-c.mjs` på `spiris-2026-10-18.txt` med tabellen omordnad (Driva före Starta) gav grönt fem gånger.
  - Omordnad och med «Driva 399 kr/mån» i tabellen, men kortet kvar på 349, gav grönt med 349 kr.
  - Sabotaget S6 (`': (a ?? b));'` → `': null);'`) fällde 0 av 2686.
  - Beteendeprovet med tabellen bruten av «349 kr/mån (Köp)» gav grönt fyra gånger utan sabotage och OLÄSBAR fyra gånger med det.
- **Motprov:** S7 (korten vinner över tabellen) fäller NV-02. Instrumentet ser den motsatta riktningen. Luckan gäller bara grenen med ett vittne.
- **Förslag:** bestäm vilket beteende som är rätt och lås det med ett test. Det finns två vägar:
  - Kräv båda vittnena, som `blind` säger.
  - Eller skriv om `blind` till «med tabellen oläsbar bär kortet ensamt priset», och lägg till ett test med bruten tabell och ändrat kort som kräver DRIFT.

#### V85-L1: inget test prövar längre ankaret «för varje anställd» i Fortnox Lön. Infört av 3057bfb2
- **Fil:** `tests/narvarovakter.mjs` (NV-04). Ankaret står i `LONMENING` i `lib/verifiers/fortnox-lon.mjs`.
- **Påstående:**
  - Steg ett (670337f8) skärpte NV-04: «NV-04 bär nu ett tal utan «anställd» intill, som inte får räknas som per-anställd-priset».
  - Steg två (3057bfb2) ersatte den kontrollen. Ankaret prövas nu inte av något test.
  - Utan ankaret skulle «Lön N kr/mån + 5 kr/mån per lönebesked» läsas som priset per anställd.
- **Bevis:**
  - Vid 670337f8, rad 63, gav `utanAnkare` på «Lön 199 kr/mån · Kivra-utskick 25 kr/st» `[1].ok` false.
  - Vid 88740439 har den raden ersatts av «Enkel lön 0 kr/mån 39 kr per anställd · Revisor 199 kr/mån».
  - Sabotaget S13 tog bort «för varje anställd» ur mönstret och fällde 0 av 2686.
  - Beteendeprovet «Lön 199 kr/mån + 5 kr/mån per skickat lönebesked» gav OLÄSBAR två gånger utan sabotage. Med sabotaget gav det grönt med 199 och DRIFT med 5 kr.
- **Motprov:** S14 (fast pris och pris per anställd ur fel grupp) fäller NV-04. Gruppordningen prövas alltså, men ankaret gör det inte.
- **Förslag:** ta tillbaka ett ankartest i NV-04. Samma mening med «per skickat lönebesked» i stället för «för varje anställd» ska ge OLÄSBAR för priset per anställd.

#### V85-B1: NV-01 flyttar aldrig Bokföringens pris, och två grannar har samma pris. Infört av 3057bfb2
- **Fil:** `tests/narvarovakter.mjs` (NV-01).
- **Påstående:** NV-01 heter «paketblocket och Bokföringsraden läses», men testet ändrar aldrig priset på Bokföring. Sidan har tre produkter för «189 kr/mån»: Bokföring, Integration och Enkel. En läsare som ankrar på en granne med samma pris klarar hela sviten.
- **Bevis:**
  - Fixturen `fortnox-2026-10-18.txt` har «Bokföring 189 kr/mån», «Integration 189 kr/mån» och «Enkel 189 kr/mån».
  - Sabotagen S4 (`\bBokföring\s+(` → `\bIntegration\s+(`) och S4b (→ `\bEnkel\s+(`) fällde 0 av 2686.
  - Beteendeprovet höjde Bokföring från 189 till 199 på Bokföringsraden. Utan sabotage blev det DRIFT med 199 kr, med S4 grönt med 189 kr.
- **Motprov:** med originalkoden ger 189→199 DRIFT med 199 kr, och en borttagen Bokföringsrad ger OLÄSBAR. Läsaren gör rätt. Det som saknas är testet.
- **Förslag:** lägg två fall i NV-01:
  - 189→199 bara på Bokföringsraden ska ge DRIFT 199.
  - 189→209 på Integration eller Enkel ska ge grönt, eftersom det är en granne.

#### V85-A1: momsmarkören för Photoshop för individer bär vikt men saknar test. Infört av 3057bfb2
- **Fil:** `lib/verifiers/adobe.mjs` (`IND_ETT`).
- **Påstående:** «inkl. moms» i `IND_ETT` bär vikt. Koden räknar bort momsen ur individpriserna (÷1,25). NV-06 prövar momsmarkören bara för teampriserna.
- **Bevis:**
  - Sabotaget S20 tog bort `\s*inkl\.?\s*moms` ur `IND_ETT` och fällde 0 av 2686.
  - Beteendeprovet använde Photoshop-sidan med «SEK/mån exkl. moms». Utan sabotage blev utfallet OLÄSBAR (saknas). Med sabotaget blev det grönt med 311,25 SEK.
- **Motprov:** S19 (Team Single App utan momsmarkör) fäller NV-06. Samma skydd prövas alltså för team men inte för individ.
- **Förslag:** lägg till ett fall i NV-06 där `psText` har «exkl. moms» i stället för «inkl. moms». Det ska ge OLÄSBAR för Individ Single App.

#### V85-T1: T2-läsaren kan läsa grannens från-pris och larma DRIFT med fel tal. Infört av 3057bfb2
- **Fil:** `lib/verifiers/telia-vaxel.mjs`.
- **Påstående:**
  - T2-läsaren är inte ankrad på uppsättning 2. Den förutsätter bara att sidan har ett enda «Pris från».
  - Antag att T1:s kampanj tar slut samtidigt som T2 går in i en. Då läses T1:s från-pris som T2:s. Vakten rapporterar DRIFT med grannens tal, och larmet säger då «rätta prisboken» till T1:s pris.
  - Mains närvarokontroll hade sagt OLÄSBAR i samma läge.
  - `fangar` lovar «vakten läser det nya talet, DRIFT».
- **Bevis:**
  - Granskaren körde `prov-b-c.mjs` på `telia-vaxelsida-2026-10-18.txt` med två ändringar: «Pris från: 118 kr/mån» blev «Pris just nu: 99 kr/mån», och «Pris just nu: 49 kr/mån» blev «Pris från: 89 kr/mån».
  - Då gav T2-kontrollen DRIFT med 89 kr.
  - Mains kontroll var `/fr[åa]n:?\s*118\s*kr/i` (git diff 15c94d4..HEAD). Den ger här (saknas), alltså OLÄSBAR.
- **Motprov:**
  - Med två olika från-priser (NV-05) ger läsaren rätt svar, OLÄSBAR.
  - Dagens sida ger grönt med 118 (jobb 119052610217).
  - Felet uppstår bara när exakt ett från-pris återstår och det hör till fel uppsättning.
- **Skrivarens prövning av klassen:** ett DRIFT ändrar inte prisboken av sig självt. Stämpelvakten släpper bara datumändringar. Ett kundtal blir fel först om någon rättar boken efter larmet. Klassningen [VAKT] står.
- **Förslag:** ankra T2 på sin egen korttext, till exempel «lokalt nummer … Pris från:». Alternativt: skriv in fallet i `blind` och testa det.

### Införda av PR:en, linsen prisboken (b5f7e83f, 40431ce2)

#### PB85-1: BI-10 låser Atlassians datum, som boten flyttar på main med `[skip ci]`. Infört av b5f7e83f
- **Fil:** `tests/branchindex.mjs` (BI-10).
- **Påstående:**
  - BI-10 kräver `lastVerified === '2026-10-18'` på alla fyra Atlassian-nivåer.
  - Verifieringsboten flyttar datumet framåt på main efter varje grön Atlassian-körning.
  - Stämpeln committas med `[skip ci]`, och sviten körs inte. BI-10 blir därför röd på main utan att det märks. Det syns först i nästa PR:s Sviten.
  - Det är samma form som SP-03/SP-10 den 12 okt.
- **Bevis:**
  - `sab_stampel.py` körde produktionens `stamplaKalla` (`lib/verifieringsstampel.js`) med de fyra Atlassian-nycklarna och 2026-10-26.
  - Utfallet blev «stämplade 4», med 8 tecken ändrade och samma längd. `node --test tests/branchindex.mjs` gav sedan fail 4 och pass 302.
  - Den levande körningen 39548656562 (jobb 119052610209) loggade «stämplade 4 nivå(er) med 2026-10-21 … prisboken behöver committas».
  - Stämpeljobbet 119053371777 hoppades över bara för att körningen gick på en gren.
  - `verify-sources.yml` har commitmeddelandet «… [skip ci]» på rad 213 och cron `'0 4 * * 1'`. Flödet har inget `node --test` och inget `npm test` (grep).
- **Motprov:** samma skript med 2026-10-18 gav «stämplade 0 oförändrade 4», och sviten gav pass 306, fail 0. Instrumentet skiljer alltså en flyttad stämpel från en oförändrad.
- **Förslag:**
  - Lås bara `usdMonthly` i BI-10, eller kräv `lastVerified >= '2026-10-18'`.
  - Lägg till ett fall där testet själv kör `stamplaKalla` med ett senare datum och kräver grönt.
  - Det är syskonet till frysningen i PR #84.
  - Nästa måndag efter i dag är 26 okt. Lagningen bör ligga på main före den första stämpeln efter merge.

#### PB85-4: inventeringen av syskonfall missar två läsvägar och ett tal. Infört av b5f7e83f
- **Fil:** commitmeddelandet till `agents/recommender/branchindex.js`.
- **Påstående:**
  - Commiten nämner bara `scripts/seed-price-db.mjs` («Jira 8,92/17,88, Confluence 6,50»). Den utelämnar seedens Confluence Premium 12,53.
  - Den missar `api/admin/run-migration.mjs`, som seedar samma gamla tal (rad 179–182: 8.92/17.88/6.50/12.53).
  - Den missar också nattprisvaktens mönster i `lib/prisvaktens-kontroller.js` (rad 191–223). Mönstren är byggda för de gamla spannen: `/\$\s*[456][.,]\d{1,2}/` för Confluence Standard och `/\$\s*1[012][.,]\d{1,2}/` för Premium. De nya talen 7.00 och 13.75 matchar inte.
- **Bevis:**
  - En grep efter 'atlassian' i `lib/ api/ agents/ scripts/` gav träffarna ovan.
  - I node gav mönstren `test('$7.00')` false och `test('$13.75')` false.
  - Nattkörningarna 39516334715 (jobb 118949266616, 20 okt) och 39548469640 (jobb 119051952491, 21 okt) loggade alla fyra Atlassian-kontrollerna som «Oavgörlig: Navigeringsfel: page.goto: Timeout 25000ms». Nattvakten ser alltså inte sidan i dag, och det gamla spannet kan inte observeras där.
- **Motprov:** `'$6.55'` → true och `'$12.87'` → true. Mönstren är alltså kalibrerade på de gamla talen.
- **Ingen kundpåverkan, mätt:**
  - `usd_monthly` läses inte någonstans i `lib/` eller `api/`. Det finns bara skrivningar i `price-db.js`.
  - `upsertPrice` ser bara ändringar i `price_monthly` och `price_annual` (`price-db.js` rad 35–61). Båda är null för Atlassian.
  - Kontrollerna saknar `bokfort` och kan därför inte bli en marknadshändelse (`lib/prisbaslinje.js`).
- **Förslag:**
  - Nämn alla tre syskonen.
  - Uppdatera eller ta bort de två mönstren, eller ge dem `bokfort` mot prisboken så att de följer den.
  - Seedens huvudkommentar «Källdata: agents/recommender/branchindex.js» är fel, eftersom filen inte importerar prisboken. Felet fanns före PR:en.

#### PB85-5: commiten anger fel antal tester. Infört av b5f7e83f
- **Fil:** commitmeddelandet («sviten är oförändrad 2679/2679 utan BI-10»).
- **Bevis:** granskaren körde `node --test tests/run.mjs` på båda commitsen. Föräldern 31600f88 gav 2680/2680 och b5f7e83f gav 2684/2684.
- **Motprov:** 2684 − 2680 = 4. Det är exakt antalet BI-10-tester, räknat ur källan (fyra nycklar i `AVLAST`). Instrumentet räknar alltså tester och inte rader.
- **Obekräftad bedömning (granskarens):** talet mättes troligen före KN-10 (31600f88, +1).
- **Det som håller:** att inget annat test vippar.
- **Rättelse:** det rätta talet utan BI-10 är 2680/2680.

#### PB85-3: bibelns regel 2 överdriver parallelliteten och samtidigheten. Infört av 40431ce2
- **Fil:** `CLAUDE.md`, «SJU REGLER», regel 2.
- **Påstående:** regeln säger «Fyra till fem parallella agenter brände 790 000–870 000 tokens och dog samtidigt, utan att någon blev klar.» Tokensumman stämmer. I båda dödsförsöken körde dock bara TVÅ linser parallellt, och de brände hela summan. De tre övriga fick 0 tokens. I det andra försöket dog de två linserna 27 minuter isär.
- **Bevis:** `wfcache.py` läste arbetsflödesfilerna.
  - **wf_d81e808c-340:**
    - Prisboken och verifierarna startade 10:01:05 och 10:01:06 och dog 10:16:16 och 10:18:24.
    - De brände 404 775 + 388 025 = 792 800 tokens.
    - Larmen, lagningarna och skriv-domen hade 0 tokens och felet «You've hit your session limit».
  - **wf_8ca7def9-74e:**
    - Båda startade 18:36:44. Verifierarna dog 18:54:45 och prisboken 19:21:57.
    - De brände 430 798 + 440 101 = 870 899 tokens.
    - De övriga tre hade 0 tokens.
- **Motprov:** summorna ligger inom «790 000–870 000», och a0fe0a9f visar cached=True på exakt två linser. Instrumentet läser alltså rätt där bibeln har rätt.
- **Förslag:** skriv «två parallella linser brände 790 000–870 000 tokens och dog utan att någon blev klar; övriga fick 0 tokens». Stryk «samtidigt», eller begränsa ordet till första försöket. Slutsatsen, att köra en lins i taget, står kvar.

### Förexisterande

#### V85-K1: Stripe-läsaren läser inte den fasta avgiften
- **Fil:** `lib/verifiers/kortterminal.mjs`. 3057bfb2 byggde om läsaren men lämnade luckan.
- **Påstående:**
  - Läsaren matchar «+ N kr per genomförd debitering för EES-kort» utan att läsa N.
  - Två saker vaktas därför inte: bokens fasta avgift (`verifiedRates` fixed: 1.00) och den kundsynliga alternativtexten «Lägst rate: 1,4 % + 1,00 kr».
  - Ändå stämplas kategorin som verifierad.
- **Bevis:**
  - `prov-b-c.mjs` bytte «+ 1,00 kr» mot «+ 1,50 kr» i Stripe-fixturen. Utfallet blev grönt med 1,4 %.
  - Enligt en grep läses `.positioning` av `api/invoice-history.mjs`, `agents/recommender/recommend.js` och `src/pages/Portfolio/index.js`.
  - Mains kontroll var bara en närvarokontroll på `pctRx`. Loggen 18 okt säger «Stripe Terminal 1,40 %: prisbok finns».
- **Motprov:** när granskaren ändrade satsen från 1,4 till 1,5 blev det DRIFT med 1,5 % (NV-03). Läsaren läser alltså satsen men inte den fasta avgiften i samma mening.
- **Varför [VAKT]:** Stripe-fixturen är ordagrann mot körningen 18 okt och har «+ 1,00 kr», samma tal som boken. Inget tal är alltså fel. Sidan har inte lästs efter 18 okt med det här som fråga.
- **Förslag:** fånga den fasta avgiften i samma mönster och lägg till en `numCheck` mot `rates[].fixed`.

## Obekräftade fynd

### [VAKT] V85-D1: två skydd i core.mjs går inte att nå. Från 3057bfb2
- **Fil:** `lib/verifiers/core.mjs`.
- **Påstående:** två skydd sitter bakom andra skydd och fäller noll vid sabotage.
  - U+00A0 och U+202F i `TAL_SV` nås inte i produktion. Alla sex `run()` normaliserar först med `.replace(/\s+/g,' ')`. NV-06:s NBSP-ben passerar bara för att testet skickar text som inte normaliserats.
  - Raden `if (tal.some((t) => t == null)) return null;` i `lasEntydigt` nås inte av någon indata i sviten.
- **Bevis:**
  - Grep: alla sex normaliserar med `/\s+/g` (fortnox:72, spiris:82, kortterminal:72, fortnox-lon:86, telia-vaxel:107, adobe:17).
  - I node matchar `/\s/` U+00A0, U+202F och U+2009.
  - S2b (U+202F ur `TAL_SV`) fällde 0 av 2686.
  - S23 (null-gruppen blir `continue`) fällde 0 av 2686.
  - S2 (U+00A0 ur `TAL_SV`) fällde bara NV-06.
- **Motprov:** S2c (bara vanligt mellanslag) fäller NV-06 på samma sätt som S2. Det enda test som ser NBSP-klassen matar alltså ett tillstånd som `run()` aldrig ger.
- **Varför obekräftat:** granskaren säger att null-raden inte går att nå. Det bygger på att alla fångstgrupper i dagens mönster är obligatoriska, och det är inte mätt.
- **Förslag:** skriv i `core.mjs` vad raderna är till för, som bibeln kräver för en rad utan egen tand: NBSP-toleransen gäller anropare utanför `run()`, och null-raden skyddar framtida valfria grupper. Alternativt: ta bort null-raden.
- **Efter granskningen:** ee3ff972 ändrar `core.mjs` (DOLLARBELOPP). Den ändringen är inte granskad.

### Observation från prisbokens lins (inget fynd)
`formatPrompt` märker Atlassian-talen «publikt listpris maj 2026», och priset för 110 användare används för alla antal platser. Det gäller bara prompten och den grindade vägen. Felet fanns före PR:en, och det är inte mätt mot någon kundtext. Efter b5f7e83f är «maj 2026» dessutom fel månad för talen. Skrivaren har inte prövat det i koden.

## Friat

### Vakterna
- **Fixturerna är ordagranna.** Alla 8 närvarofixturer har samma rader i samma ordning som `kontextUtdrag` i körning 39155569488. Jämförelsen gjordes med `jamfor.py` mot loggrader avskrivna ur `get_job_logs`. Fixturerna har 0 hårda mellanslag.

  | Fixtur | Rader | Jobb |
  |---|---|---|
  | fortnox | 31/31 | 117758039240 |
  | spiris | 30/30 | 117758039270 |
  | fortnox-lon | 11/11 | 117758039204 |
  | stripe | 4/4 | 117758039213 |
  | zettle | 8/8 | 117758039213 |
  | telia-vaxelsida | 6/6 | 117758039223 |
  | adobe-team | 7/7 | 117758039188 |
  | adobe-photoshop | 7/7 | 117758039188 |

- **Ett bytt pris på den ankrade platsen ger DRIFT med rätt tal.** Det gäller varje plats granskaren prövade som NV inte prövar: Liten 369, Stor 750, Bokföring 199, Spiris Starta 219, Spiris Lön 319, Zettle 1,95, Adobe team ett 399 och Adobe ind ett 329. En saknad Bokföringsrad ger OLÄSBAR.
- **Hårda och smala mellanslag ger inget falskt grönt**, eftersom texten normaliseras före läsning. Fortnox-blocket med U+00A0 före «kr» är grönt, och det är rätt.
- **Grannarna friades av testerna och av granskarens sabotage:** Mini+, Löpande Mini, Gör det själv Mini, Pro Plus, Stripe 2,9 %, Zettles betalningslänkar och Telia-kampanjen.
- **3057bfb2 anger «elva riktningar → 15 tester (NV-01..07, KF-06)».** Det stämmer. Granskarens närmaste kopior av de elva riktningarna fällde 3+1+1+1+1+1+1+1+2+2+1 = 15, exakt NV-01..07 och KF-06.
- **«Fortnox Lön letade efter 199 kr var som helst»** stämmer. Mains mönster är `\b199\s*kr`.
- **Sabotageräkningen går inte ihop.** Granskaren skriver att 16 av 22 sabotage fällde 1–3 tester och att 7 fällde 0 mot hela sviten (S2b, S23, S4, S4b, S6, S13 och S20). Det blir 23, inte 22. Skrivaren kan inte avgöra vilket tal som är fel. De sju nollorna är alla redovisade ovan. Beteendeändringen är mätt för alla utom S2b och S23, som inte ändrar något i produktion.
- **Inte prövat:** steg ett:s «sex riktningar → 7 tester» (670337f8). Den koden har ersatts i PR:en.

### Prisboken
- **De fyra Atlassian-talen och datumet håller.** Tre körningar läste 9.56 / 19.15 / 7 / 13.75 USD för «månadsavtal @ 110 users»:

  | Datum | Jobb | Utfall |
  |---|---|---|
  | 17 okt | 117503848088 | DRIFT mot 8.92 / 17.88 / 6.55 / 12.87 |
  | 18 okt 18:47:04Z | 117758039300 | samma DRIFT |
  | 21 okt, PR-koden | 119052610209 | «✓ håller (4 tal verifierade mot källan)» |

  - Stämpeln a0f740ea (12 okt) bekräftade de gamla talen. Att ändringen skedde mellan 12 och 17 okt stämmer alltså.
  - Enheten är USD per månad vid 110 användare på månadsavtal, som prisbokens not säger.
- **Inget kundtal flyttas.**
  - Atlassian-fakturor kategoriseras deterministiskt som saas-devtools. Den kategorin står inte i `REVIDERADE_KATEGORIER` och visas därför utan tal. Motprovet Microsoft gav saas-productivity.
  - `usdAnnual` är null, så `targetP25` blir null. Det ger inget benchmark, inget bytesmål och ingen `annualBillingSaving` (spärrad av `msrpAnnual != null` på rad 1788 och 2414).
  - `usdMonthly` når bara prompttexten i `formatPrompt`.
  - LFL prissätter bara M365-nivåer, och `m365Nivabrygga` filtrerar på SEK.
  - `aldstaTierDatum` är oförändrat, eftersom Googles 2026-08-31 är äldst.
  - `M365_VERIFIERAT` är i dag oförändrat på 2026-10-19 (se PB85-2).
- **«334 fixturer» stämmer:** 50+40+56+25+38+20+35+70. Den enda Atlassian-fixturen, saas-26, prövar bara `computeInvoiceMetrics` med metrics null. «Facit oförändrat» är alltså sant men bevisar ingenting om Atlassian. Seedfilen är inget beteendesyskon: `usd_monthly` läses inte, och `upsertPrice` bortser från USD när ändringar upptäcks.
- **KN-10 (31600f88) friad:**
  - `tests/kategorinyckel.mjs` gav 10/10.
  - S1 (bara `.git`) fällde KN-10 ensam, i en klon utan inre worktree.
  - S3 (hoppa allt) fällde KN-07 och KN-10.
  - S2 (hoppa bara `.claude`) fällde 0. Granskaren godtar det, eftersom KN-10 handlar om worktrees.
  - Den enda spårade dot-JS-filen är `.eslintrc.js`. Den hoppas nu över, med 0 träffar i den äldre koden.
- **Bibelns block «SJU REGLER» håller utom i regel 2 (PB85-3).** Det här stämmer:
  - Fyra försök.
  - Två döda försök utan dom.
  - Tokenintervallet.
  - Vercel-hänget: c1f58419, där det sista verktyget var `search_vercel_documentation`, ungefär 72 minuter.
  - Två cachade linser i a0fe0a9f.
  - 403 vid radering av en annan gren.
  - «Fyra timmar»: stopp 18:54, återställning 23:20, ungefär 4 h 26 min.
  - Atlassian blev grön av rätt skäl.

  Regel 4:s döda worktree går inte att läsa, eftersom den är borttagen. Den döda granskarens `sabotage.py` innehåller dock G4 «google-usd-ur-grinden», och det stämmer med regeln.
- **Hela sviten på 88740439 gav 2686/2686**, som PR-texten säger.
- **PR:ens 26 filer har inga råa U+00A0 eller U+202F.** Kontrollen gjordes med motprov.

## Levande bevis: körning 39548656562

Körningen är verify-sources på PR:ens kod (sha 88740439), körd som en grenkörning 21 okt. Enligt granskarna visade den följande per vakt.

| Vakt | Utfall | Avläst | Jobb |
|---|---|---|---|
| fortnox | grön | 209 / 349 / 490 / 710 / 189 | ej angivet |
| spiris | grön | 199 / 349 / 549 / 749 / 299 | ej angivet |
| kortterminal | grön | 1,4 / 1,85 | ej angivet |
| fortnox-lon | grön | 199 / 25, ur /prislista | ej angivet |
| telia-vaxel | grön | 6 kontroller, T2 = 118 som enda från-pris | 119052610217 |
| adobe | grön | 985 / 381 / 311,25 / 932,5 | ej angivet |
| zoom | OLÄSBAR | «14,16$ … Faktureras årsvis» och «18,33$», lika med boken (14.16 / 18.33). Formatet, inte priset | 119052610222 |
| atlassian | grön | «✓ håller (4 tal verifierade mot källan)», «stämplade 4 nivå(er) med 2026-10-21» | 119052610209 |

Stämpeljobbet (119053371777) hoppades över eftersom körningen gick på en gren. Inget datum flyttades.

Vad körningen visar och inte visar:
- **Den visar** att de nya läsarna läser dagens sidor i sin helhet med rätt tal, för sex vakter och Atlassian. De sex vakterna är därmed friade på den punkten.
- **Den visar inte** att läsarna larmar när en sida ändras. Det prövas av NV-testerna och sabotagen, och där finns luckorna S1, L1, B1, A1, T1 och K1.
- **Granskarnas material säger inte** om m365-vakten var grön i samma körning. Det har betydelse för PB85-2.
- **Utanför granskningen:** körningen gäller 88740439. Zoom-läsaren i 91b38af4 och ee3ff972 har ingen levande körning i granskarnas material.

## Grundarens beslut

### Atlassian (b5f7e83f): talen godkända 18 okt
Grundaren godkände talen 18 okt, och b5f7e83f bär beslutet («på grundarens beslut»). Bibelns regel 6 (18–20 okt) beskriver beslutet som villkorat: «behåll om granskningen godkänner talen». **Granskningen godkänner talen.**
- 9.56 / 19.15 / 7 / 13.75 USD per månad vid 110 användare.
- Samma tal i tre körningar: 17, 18 och 21 okt. Den sista gick på PR:ens egen kod.
- Skrivarens räkning ur talen: Jira Standard +7,17 %, Jira Premium +7,10 %, Confluence Standard +6,87 %, Confluence Premium +6,84 %.

Ytor som talen når, mätt av granskaren:

| Yta | Når talen? | Grund |
|---|---|---|
| Kundens fakturaanalys för en Atlassian-faktura | Nej | saas-devtools står inte i `REVIDERADE_KATEGORIER` och visas utan tal. `usdAnnual` är null, så det finns inget bytesmål och ingen årsbesparing. |
| recommend-prompten | Bara i texten | `usdMonthly` når `formatPrompt`. Märkningen «maj 2026» är en obekräftad observation. |
| M365-ytor (LFL, nivåbryggan, `aldstaTierDatum`) | Nej | LFL prissätter bara M365, och nivåbryggan filtrerar på SEK. Googles datum är äldst. |
| Datumet på dörrens Microsoft-kort | Inte i dag | `M365_VERIFIERAT` står på 2026-10-19. Ett senare Atlassian-datum tar över texten (PB85-2). |
| Nattprisvakten | Nej | Mönstren bygger på de gamla talen, sidan svarar med timeout, och `bokfort` saknas (PB85-4). |
| Prisdatabasens seed | Nej | `usd_monthly` läses inte (PB85-4). |

Det här bör följa med ändringen:
- **PB85-1**, före den första måndagsstämpeln efter merge. Annars blir BI-10 röd på main utan att någon ser det.
- **PB85-4** och **PB85-5**.
- **PB85-2** är grundarens att prioritera (se «Domen»).

### Zoom: OLÄSBAR tills sidan är avläst
Linjen gäller: Zoom står OLÄSBAR tills sidan är avläst. Inget pris ändras på en gissning, och ingen tolerans vidgas.
- Vid den granskade toppen 88740439 är Zoom OLÄSBAR (39548656562, jobb 119052610222). Skälet är formatet, inte priset.
- Sidan är avläst i den körningens logg: «14,16$ /användare per månad · Faktureras årsvis» för Pro och «18,33$» för Affärsverksamhet. Prisboken har 14.16 och 18.33. Om avläsningen håller behövs inget prisbeslut.
- Läsaren som klarar det nya formatet finns i 91b38af4 och ee3ff972, och de är inte granskade. Zoom ska därför räknas som OLÄSBAR tills de har granskats och fått domen MERGAS och en körning på main visar grönt.

## Täckning

Mätt av skrivaren 21 okt:
- **PR #85:s huvud:** `gh api repos/Arvo-flow/arvo-flow.github.io/pulls/85` gav följande:
  - head `claude/fable-5-resume-i60dmd`, sha ee3ff972
  - base `main`, bas-sha 15c94d4a
  - 8 commits, open

  Den lokala grenen `prisboken-vakterna` står på samma sha.
- **Mekaniken:** `git diff-tree` kördes per commit i 15c94d4a..ee3ff972.
  - Granskade: 670337f8, 3057bfb2 och 88740439 ändrar `lib/verifiers/`, och b5f7e83f ändrar `agents/recommender/branchindex.js`.
  - Ändrar ingen fil i `lib/`, `api/` eller `agents/`: 31600f88 och 40431ce2.
  - Ogranskade: 91b38af4 ändrar `lib/verifiers/zoom.mjs`, och ee3ff972 ändrar `lib/verifiers/core.mjs` och `lib/verifiers/zoom.mjs`.
- **Det granskade intervallet:** `git diff --name-only 15c94d4a 88740439` gav 26 filer. Det stämmer med prisbokens lins, som räknade NBSP i 26 filer.
- **Grinden på den här filen:** `andraBlicken` kördes med bas 15c94d4a och alla `ops/GRANSKNING-*.md`. Skriptet ligger i skrivarens scratchpad, `grind85.mjs`.

  | Prov | Topp | Utfall |
  |---|---|---|
  | A: PR:ens topp | ee3ff972 | ok=false: «2 mekanikfil(er) ändrade efter den granskade commiten 8874043» (`lib/verifiers/core.mjs`, `lib/verifiers/zoom.mjs`) |
  | B: granskad topp | 88740439 | ok=true: «9 mekanikfil(er) täckta av ops/GRANSKNING-prisboken-vakterna.md (commit 8874043)» |
  | C: motprov med `dom: BLOCKERAR` | 88740439 | ok=false: «senaste domen är BLOCKERAR» |
  | D: motprov utan filen | 88740439 | ok=false: «9 mekanikfil(er) utan granskning» |

  Filen släpper alltså det granskade intervallet, men inte PR:ens topp.
- **Under skrivandet ändrades den lokala grenen.** Två saker tillkom:
  - Commiten ae4dd453 (21 okt 14:35, `lib/domain-intel.js` och `tests/domain-intel.mjs`). Den säger i sitt meddelande att den lagar PB85-2.
  - En ocommittad ändring i `tests/branchindex.mjs`. Den är inte skrivarens.

  Vid en ny läsning efteråt stod PR #85 fortfarande på ee3ff972 med 8 commits, så ae4dd453 var inte pushad då. `scripts/granskningsgrind.mjs` mot den lokala toppen gav ok=false med 3 mekanikfiler (`lib/domain-intel.js`, `lib/verifiers/core.mjs`, `lib/verifiers/zoom.mjs`). Ingen av ändringarna är granskad här.

## Proveniens

- Båda linserna checkade ut 88740439 som detached HEAD. Prisbokens lins anger att den arbetade i en egen worktree.
- Granskarnas anteckningar och skript ligger under `/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/`:
  - `granskning85-vakterna/` (`anteckningar.md`, `jamfor.py`, `zoom-live-utdrag.mjs`, `prov-b-c.mjs`, `sabotage.py`, `beteende.py`/`beteende.mjs`, `nbsp.py`)
  - `granskning85-prisboken/` (`anteckningar.md` M0–M22, `reveal.mjs`, `historik.py`, `sab_reveal.py`, `sab_stampel.py`, `sab_kn10.py`, `wfcache.py`)

  Katalogerna ligger utanför repot och försvinner med sessionen. Det som ska citeras senare behöver gå in i `ops/` via en PR.
- Vakternas granskare noterade att Write-verktyget gjorde om en escape för U+00A0 (bakstreck, u, 00A0) till ett rått tecken i hens eget `sabotage.py`. `assert` fångade det, och det rättades med `chr(92)`. Repots filer har 0 råa NBSP enligt granskaren (bibelns regel 7). Samma sak hände i den här filen när den skrevs: escapen blev ett rått tecken. Det hittades med en byte-räkning och ersattes med ord.
