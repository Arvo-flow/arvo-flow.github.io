# Fables analys av gränssnittet mot kund (12 nov)

Beställd av grundaren 12 nov. Fable 5.2 läste koden i commit 03583759 och renderingar från produktionens
funktioner med bara nätverket stubbat (390 och 1600 px). Fable ändrade ingen fil. Fynden är Fables läsningar:
«avläst» betyder läst i kod eller sett i bild, resten är bedömning. Opus mäter varje fynd innan något byggs på det.
Planvalsytans meningar (N-1, N-2) är redan avgjorda i Fables eskaleringsbeslut under S1 i `ops/KORPLAN-VAG1.md`.

## Del 1 · Sanningen, helheten, premiumnivån och det modigaste draget

**Dom.** Ytorna är hederliga där ett register styr dem (läge, planval, ansvarsgräns), men runt registren står äldre text kvar som lovar bevakning, arvodesvillkor och uppföljning som ingen kod bär. Värst är att samma kund får fem olika besked om när arvodet faktureras, och att en premiumkund inte får någon månadsbrief alls en tyst månad. Rummet ser ut som ett instrument, men för en våg 1-kund med mobilfakturor är fyra av sex lager tomma.

Allt är läst i commit 03583759. TF = `src/pages/TestaFaktura/index.js`, PF = `src/pages/Portfolio/index.js`. Jag har inte ändrat någon spårad fil. «Avläst» betyder läst i kod eller sedd i bild; nåbarhet i produktion är bedömning om inget annat står.

## Fråga 1 · Sanningen

1. **[KUND] Den tysta månaden ger ingen brief.** `api/cron/generate-briefings.mjs:73` hoppar över kunden när `insightCount === 0`. Insikter finns bara vid ett byte på minst 2 000 kr netto eller en kostnadsökning på minst 5 % mellan två månader (`lib/briefing-generator.js:76-125`). Landningen lovar «Månadsbrev med det som faktiskt hänt» (`src/pages/Landing/index.js:481`) och `LOFTEN.premiumutskick` «mejlar vi månadsbriefen». Briefingsidans egen tystnadstext (`src/pages/Briefing/index.js:271, 375`) nås alltså aldrig via mejl. Avläst, hög säkerhet.
2. **[KUND] Avtalsvarslet kan utebli och ändå bokföras som skickat.** `api/cron/send-reminders.mjs:156-157` läser inte Resends `{error}` och skriver markören direkt efter. Samma form finns på :235 (enkäten) och i `api/send-analysis.mjs:519` (svarar `ok: true`). Det är IA-19:s fel i den enda väg som bär en tidsfrist. Avläst, hög.
3. **[KUND] Aktiveringssidan lovar det premiumgrinden förbjöd.** Under «bevakningen slås på först då» står «24h · Arvo aktiverar er bevakning», «Dag 7 · Ni får er första analys», «Löpande · Arvo kontaktar er om något hänt» (`src/pages/Aktivera/index.js:153-162`). Sett i `premiumgrind--aktivera-1600.png`, hög.
4. **[KUND] «Vi hör av oss» utan mekanik.** PF:781, 788, 794, 806 säger «Vi bevakar … och hör av oss så snart ett mål går att styrka». Jag hittade ingen kod som prövar om lagrade analyser när prisboken ändras. Sett i `lagesregister--rummet-omatt-mobil.png` och `intag--B-1600.png`. Att mekaniken saknas är bedömning, medel.
5. **[KUND] «N byte förberedda» och «det lägre priset finns förberett nedan».** PF:1098, PF:1066 och `src/lib/rumstext.js:25-27`. Inget är förberett förrän kunden beställt underlaget och en människa tagit fram det. KM-05 fångar «förbereder bytet» men inte de här formerna. Sett i `mobilscore--mobil-bredband-desktop.png`, hög.
6. **[KUND] Besparingsgrindens modaler.**
   - TF:2906: «en rådgivare kontaktar dig för att realisera besparingen».
   - TF:2890-2892: «sköter varje byte — från uppsägning till nytt avtal».
   - TF:2914-2915: «Arvo förbereder varje byte».
   - TF:2946: «utan kostnad tills ni sparar».
   - Alla tre modalerna pekar på «Koppla Fortnox / Visma», som bibeln kallar pausad.
   
   Den första är sedd i `planvalsgrind--motprov-bredband-desktop.png`, övriga avlästa. Hög för texten, medel för hur ofta de nås.
7. **[KUND] «Priset är verifierat.» står ovillkorligt.** Rubriken TF:2674 visas för varje byte, också när etiketten under säger «Jämförelsepris enligt analysen» (TF:2712, till exempel el). Verifierat-märket väljs dessutom per kategori i frontend (`isRealPrice`), medan kvittot väljs per jämförelse i backend (`api/test-invoice.mjs:2172-2188`). I bredbandsbilden står kvittot «odaterat pris kallas aldrig verifierat» rakt ovanför «Priset är verifierat · Verifierat listpris». Sett och avläst; att det sker utanför sondens fixtur är bedömning.
8. **[KUND] Landningens FAQ.**
   - :77 «Vi tjänar pengar bara när ni sparar … Vår enda intäkt är er besparing», bredvid 1 995 kr/mån.
   - :81 «ramavtalsdata och faktiska operatörspriser»; de källorna finns inte.
   - :73 «justerar vi arvodet» om besparingen inte landat; ingen mekanik efter fakturering.
   - :93 mobil och fakturatjänster listas som bytesunderlag, «fler kategorier varje kvartal», «försäkringsbyten genomförs när vår FI-licens är klar».
   
   Avläst, hög.
9. **[KUND] Maktkalenderns datum är vårt analysdatum plus tolv månader.** PF:652-661 räknar `created_at + 12 mån` och visar «~ månad år» med «bytesläget återkommer årligen» (PF:1372-1385). Det är märkt «uppskattat» men saknar grund, konfidens och asymmetri (regel 4), och kan stå bredvid en avläst avtalsklocka med ett annat datum. Avläst, hög.
10. **[KUND] «-42 dagar till sista uppsägningsdag».** PF:735-736 skriver `daysToAct` utan gren för ett stängt fönster. Sett i `lagesregister--rummet-omatt-mobil.png`, hög.
11. **[KUND] Svarsmejlet på en vidarebefordrad faktura.** (`api/inbound-email.mjs`)
    - :396 «hör av sig bara när något är fel prissatt»: vi svarar på varje mejl, och tystnad betyder inte rätt pris i nitton kategorier och mobil.
    - :401 «Svaret skickas alltid och enbart till avsändaradressen»: falskt på rumsadressen, där svaret går till ägaren.
    - :365 «Verifierat publikt listpris, samma tjänst» sätts på varje byte; kortet bär ingen källa, så ett elbyte får samma etikett.
    
    Avläst, medel till hög.
12. **[KUND] Dörren: «Er Microsoft 365 sattes upp …, exakt när uppsättningen gjordes».** `lib/domain-intel.js:449-455`. Datumet är äldsta certifikat för `autodiscover.`, `lyncdiscover.` med flera (:28, :215-224). Ett sådant certifikat kan höra till en egen Exchange-server före molnflytten. Avläst; att det slår fel för verkliga bolag är bedömning, medel.
13. **[KUND] Utfallsenkäten bryter gratislöftet.** Den går till varje auto-rad efter 60 dagar (`api/cron/send-reminders.mjs:222-241`), medan `LOFTEN.gratisanalys` säger «skickar vi inga utskick däremellan». Knappen «Ja, vi bytte» visas även när vi aldrig föreslog ett byte. Avläst, hög.
14. **[KUND] «Arvo bevakar åtta kostnadskategorier».** TF:2833, med Skrivare, Fordon, Kontor och IT-drift bland ikonerna, och «Kartlägg er reskontra» (TF:2855). Fyra av de åtta tiger eller är offertbaserade. Sett i `planvalsgrind--plan349-desktop.png`, hög.
15. **[KUND] Analysmejlets knapp.** «Beställ besparingsunderlaget» och «Se er analys» länkar till `https://arvoflow.se/flow/testa-faktura` (`api/send-analysis.mjs:450`), alltså en tom uppladdningssida. :343 skriver «N överflödiga licenser» som fakta där webben säger «verkar oanvända» (TF:237). Avläst, hög; om `/flow`-sökvägen ens svarar vet jag inte.
16. **[FORM] Smärre.**
    - «Ett par drag väntar på er» vid ett enda byte eller fynd (PF:811-832).
    - «Vägde 0 fakturor mot verifierat publikt listpris» som kvitto (`intag--B-1600.png`).
    - Du och ni blandas i analysmejlet och modalerna.
    - Aktiveringens framgångsruta säger «Briefing på väg … är skickad» (TF:3103-3106) om ett anmälningskvitto.
    - Kopplingen till Outlook erbjuds med «Arvo läser bara faktura-mail» (`src/pages/Aktivera/index.js:112`), fast kopplingen bara räknar.

## Fråga 2 · Helheten

1. **[KUND] Fem besked om arvodets tidpunkt.**
   - `ANSVARSGRANS.arvode`: tre månader efter att avtalet aktiverats.
   - TF:2943 och landningen :73/:490: «först när det nya avtalet börjat gälla».
   - `api/send-analysis.mjs:425`: «efter din första faktura från den nya leverantören».
   - `api/send-analysis.mjs:474`: «när den syns i era böcker», den formulering bibeln 28 aug kallar fel.
   - PF:1671: «först när pengarna landat».
   
   Avläst, hög.
2. **[KUND] Bytet har två olika nästa steg.** Fakturavyn säger «Beställ besparingsunderlaget» (TF:2674 och framåt). Rummets byteskort har «Aktivera bevakningen» som huvudknapp, och den går till `/aktivera`, premiumanmälan för 1 995 kr/mån (PF:1694-1696). I bilden står den under ett byte värt 1 920 kr/år. Sett och avläst, hög.
3. **[KUND] «Bevakning aktiv» mot «bevakningen slås på först då».** Radarn och kvittot säger «Er bevakning är aktiv» till varje besökare (PF:713, 945, 980). Aktiveringen och välkomstmejlet säger att bevakningen startar när grundaren beviljat. Samma rum har knappen «Aktivera bevakningen». Sett i tre rumsbilder, hög.
4. **[KUND] Intaget säger «Prissatt», rummet «Mottagen».** `src/components/InkorgPanel.js:111` sätter «Prissatt» på varje `auto`-rutt. Radarn räknar med `arPrissatt` (`lib/lagesregister.js:254`). I `intag--B-1600.png` står «telia-sep.pdf · Prissatt» över «Prissatta 0 · 1 mottagen, inte prissatt». Efter S1 gäller det varje mobilfaktura. Hög.
5. **[KUND] «Samma nivå» mot «inte matchade mot er nivå».** PF:1670 «Samma nivå kostar idag» står i samma kort som PF:1660 «Alternativen är inte matchade mot er nivå». Svarsmejlet säger «samma tjänst» (`api/inbound-email.mjs:365`). L-3 stängde «matchning» men inte de här två. Avläst, hög.
6. **[KUND] Smyghöjningen lovas som larm men finns bara som modellprosa.** Jämförelsen mot förra fakturan går in i modellens prompt (`api/test-invoice.mjs:1300-1352`). Jag hittade ingen yta i `src/pages` som läser `priceAlert`. Landningen :479 lovar «Smyghöjningslarm — avvikelse fångas direkt». Avläst att fältet inte läses i `src/pages`; övriga konsumenter har jag inte sökt, medel.

## Fråga 3 · Premiumnivån (rangordnat)

De sex lagren för en våg 1-kund i dag (bedömning ur bilderna och koden):

| Lager | Läge |
|---|---|
| Vakten | Ser tom ut: «Senaste analys … bevakning aktiv», ingen svepstämpel i någon rendering |
| Veckodomen | Finns, men säger mest «kunde inte mätas» |
| Kollektiva sanningen | Tom: inget ankarkort i någon rumsbild, kohortkortet dött vid källan |
| Maktkalendern | Halvfull: avtalsklockan är stark när datum finns, resten är analysdatum plus tolv månader |
| Positionen | Tom: «—» i varje rum med en mobilrad |
| Kvittona och likräkningen | Två rader; ingen likräkning finns i koden |

1. **Fyndkortet är det enda som klarar «Hur visste de det?».** «Månad 38 av 36 … kräv tillbaka 898 kr» med färdigt brev (`planvalsgrind--fynd-desktop.png`). Gör det till mallen för rummet. Kräver inget nytt; risken är att «utrustningen är redan er» är fel vid leasing.
2. **Mobilfakturans vy är två stycken avstående följt av en prislapp på 1 995 kr.** `planvalsgrind--plan349-*.png`. Efter S1 är det hederligt men tomt. Lös det med draget i fråga 4, inte med mer text.
3. **Grinden täcker resultatet med ett e-postformulär.** `planvalsgrind--motprov-bredband-*.png`. Det är SaaS-formulärets signatur. Kräver ett beslut om våg 1-kunder alls ska mötas av den; risken är färre insamlade adresser.
4. **Den tysta briefen ska skickas.** Briefingsidan har redan texten; cronen behöver bara sluta hoppa över. Risken är en brief utan innehåll, så bygg den på fråga 4.
5. **Ta bort premiumsäljet ur byteskortet och radarns «bevakning aktiv» för icke-premium.** Ett instrument säljer inte i mätarhuset.

## Fråga 4 · Det modigaste draget

**«Sedan förra fakturan»: en deterministisk rad-för-rad-jämförelse mellan kundens egna fakturor från samma leverantör, i rummet, svarsmejlet och månadsbriefen.**

- **Varför just detta.** Det behöver ingen prisbok, så det fungerar för mobil efter S1 och för alla tysta kategorier. Det fyller veckodomen («12 rader, samma à-priser som i oktober, inget att göra»), kvittona och likräkningen («posten ni krävde bort är borta: 5 388 kr/år»), och ger premium en tyst månad som bär sitt arbete. Briefens ökningskort säger i dag «fakturaraderna avgör vilket» (`lib/briefing-generator.js:122`) trots att vi har raderna.
- **Vad det kräver.**
  - Lagrade radposter med öresfält. Bibeln mätte 35 av 43 analyser med radposter.
  - En ren funktion som bara jämför rader med samma beskrivning, avläst antal och à-pris där SR-07 går ihop.
  - Lägen i lägesregistret: `oforandrad`, `pris_andrat`, `rad_ny`, `rad_borta`, `ej_jamforbar`.
  - Be våg 1-kunderna vidarebefordra tre månader bakåt per leverantör, så att lagret är fyllt dag ett.
- **Vad som kan gå fel.**
  - Prorata- och kvartalsrader lästa som prisändring (CR-88412).
  - Antal förväxlat med pris (antalsdoktrinen).
  - En omdöpt rad läst som «ny».
  - Modellifyllda öresfält som varierar mellan körningar.
  
  Svaret är fail-closed per rad, med «kunde inte jämföras» och skäl, och aldrig ordet «höjning» utan två avlästa à-priser.
- **Verifiering.** Ett svep över korpusens fakturapar med motprov (identiska fakturor ska ge noll ändringar) och en renderingssond vid 390 och 1600 px.

## Del 2 · Frontend ingående: resan, instrument eller formulär, förtroendet och utvecklingsplanen

**Dom.** Arvo har två ögonblick i världsklass, dörrens avslöjande och fyndkortet med färdigt kravbrev, men vägen mellan dem är byggd som en SaaS-tratt. Den vanligaste våg 1-kunden, den som skickar en mobilfaktura, når aldrig något av dem på kostnadssidan. Efter dag 1 finns inget som drar kunden tillbaka: rummet ändras inte, och ingen brief går ut en tyst månad (F1.1). Förtroendet rivs mest av de juridiska sidorna, Connect och rankningspolicyn, som säger emot ytan om fullmakt, avgifter, lagring och arvode och hänvisar till adresser som inte kan ta emot mejl. Det som ökar chansen mest är ett rum som har något nytt att säga varje gång en faktura kommer in, inte fler ytor.

Allt är läst i commit 03583759. «Avläst» = bild eller fil:rad; övrigt är bedömning med konfidens. F1.n och F2.n är fynden ur min förra analys. Inga spårade filer är ändrade. TF = `src/pages/TestaFaktura/index.js`, PF = `src/pages/Portfolio/index.js`.

En mätnot först: `sida--startsidan-*.png` och `sida--intelligence-*.png` är tomma under hjälten, eftersom innehållet tänds först när det rullas in i vyn (`src/pages/Landing/index.js:23-37`). `landning--*.png` visar samma sida fylld. De tomma ytorna är alltså sondens, inte kundens.

## 1 · Resan

| Steg | Kunden ser (avläst) | Kunden tänker (bedömning) | Lämnar här om |
|---|---|---|---|
| 1 Startsidan | «Er finansdirektör. Innan ni frågar.» och knappen «Se ert bolag som marknaden ser det» (`landning--mobil.png`) | «Stort löfte, men jag behöver inte lämna något.» | Hen läser FAQ:n och ser «Vår enda intäkt är er besparing» bredvid 1 995 kr (F1.8) |
| 2 Dörren | Domänfält, suddig förhandsvisning märkt «formen, inte ert underlag»; fynden läses ur DNS, certifikat och bokslut (`lib/domain-intel.js:376-600`) | «Hur visste de när vi satte upp Microsoft 365?» | Fynden handlar om IT, inte kostnad; M365-datumet kan vara fel (F1.12) |
| 3 Första fakturan | «Ni betalar för mycket. En faktura bevisar det.» före uppladdning, «Analys på 60 sekunder», «raderas omedelbart» (`sida--testa-faktura-390.png`) | «De har bestämt sig innan de läst.» | Villkorslänken leder till ombud och BankID (avsnitt 3) |
| 4 Svaret | Mobil: två stycken avstående och sedan 1 995 kr-kortet. Byte: e-postformulär över resultatet. Fynd: kravbrevet | Mobil: «Jaha.» Byte: «Nu vill de ha min mejl.» Fynd: «Det där hade jag aldrig sett.» | Mobilfallet ger inget skäl att fortsätta |
| 5 Mejlet | Knapp till en tom uppladdningssida (F1.15); fem arvodesvillkor (F2.1) | «Vad beställde jag?» | Knappen leder fel |
| 6 Rummet dag 1 | Inloggningsruta överst, «God kväll», radar, «Score —», två kvitton (`mobilscore--*`, `intag--B-1600.png`) | «Snyggt. Vad ska jag göra här?» | Inget nästa steg utom «skicka fler» |
| 7 Dag 7 | Ingen kod ändrar rummet utan ny faktura; svepraden visas bara när ett svep rapporterat (PF:713) | — | Kunden återvänder inte; inget mejl går ut |
| 8 Dag 30 | Brief bara vid byte ≥2 000 kr eller ökning ≥5 % (F1.1); annars tyst | «Betalar jag för det här?» | Premium sägs upp |
| 9 Premium | «24h · Arvo aktiverar er bevakning» före och efter anmälan (F1.3); «Regel 2: Ni behåller 80% av allt vi sparar er» (`sida--aktivera-390.png`) | «Vad får jag som jag inte redan har?» | Skillnaden mot gratis syns inte i rummet |

**Steg till första «Hur visste de det?»:** två via dörren (domän, vänta). Via fakturan fyra (sida, fil, vänta, läs), och bara om fakturan bär ett fynd eller ett byte. För en mobilfaktura utan fynd: aldrig. Bedömning, hög.

**Steg till första skäl att komma tillbaka:** inget som systemet skapar. Det enda är avtalsvarslet 30 och 7 dagar före sista uppsägningsdag, och det kräver att datumet står på fakturan eller att avtalet laddas upp. Bedömning, hög.

**Bryggan som saknas mest:** fakturavyn leder inte in i rummet. Enda länken är «Kartlägg er reskontra» längst ned (TF:2854). Dörren har däremot en brygga (`RumBryggan`, Landing:346). Avläst.

## 2 · Instrument eller formulär

| Sida | Omdöme | Skäl (avläst i bild) |
|---|---|---|
| Rummet med innehåll | Instrument | Mörkt, mono på tal, källa på varje påstående, underlaget «Så landade vi i talet» |
| Dörren | Instrument | Källrad per fynd, märkt förhandsvisning |
| Fyndkortet | Instrument | Citat ur kundens rad, belopp, brev |
| Startsidan | Mellan | Stark hjälte och exempelrum; prisrutor och FAQ är mall |
| Fakturavyn | Formulär | Ljus mall, uppladdningsruta, modal, prislapp, ikonrad med åtta kategorier (F1.14) |
| Aktivera och Intelligence | Formulär | E-postfält, «klart på 30 sekunder», tre steg med löften |
| Connect | SaaS-mall | «Steg 1 av 3», märken för BankID och AES-256, rullgardin för bransch |
| Briefing, prospect, utfall i felläge | Under nivån | Hänglås-emoji; «Okänt fel Ladda upp en ny faktura…» utan skiljetecken; utfall visar kostnadsformuläret utan att veta vilken faktura (`sida--briefing-390.png`, `sida--utfall-390.png`) |
| Villkor, integritet, bias | Mall | Ljusa, «du»-tilltal, kodrutan i bias klipps vid 390 px |

- **Sänker helheten mest:** Connect, fakturavyn efter ett mobilresultat, och fellägena. Connect är dessutom en yta som lovar saker (avsnitt 3).
- **Rummet på 390 px:** första skärmen är inloggningsruta, hälsning och radar. Domen kommer först på skärm två eller tre (`lagesregister--rummet-omatt-mobil.png`). En finansdirektörs instrument leder med domen.
- **Täthet:** rummet upprepar samma avstående upp till fyra gånger i det omätta läget (rubrik, brödtext, chip, scorekort, fakturakort). Det läses som utfyllnad.
- **Rörelse:** radarn sveper utan att bära ett tal när inget svep rapporterats. Då är den dekor, inte telemetri. Bedömning, medel.
- **De sex lagren per sida:** bara rummet försöker bära dem. Fakturavyn, mejlen och briefen bär inget av lager 1, 3, 4 eller 5.
- **Språket:** «ni» i rummet och mejlen, «du» i villkor, integritet, bias, Connect och modalerna. Tidslöftena spretar: 60 sekunder (TF:1125), 2 minuter (prospect-felet, OAuth-bannern TF:1100), 30 sekunder (`sida--intelligence-390.png`).

## 3 · Förtroendet

**Bygger i dag (avläst):**
- Källa och datum på jämförelsen («verifierat 2 nov.», produkten namngiven) i rummets underlag.
- Kvittot «Maskinellt kontrollerad» med raden «en kontroll som inte kunde prövas markeras, aldrig bockas».
- Avståendet på mobil: «vi vet inte vilken produkt ni har».
- Ansvarsgränsen i fakturavyns tre steg («Ni byter själva»).
- Rummets egen adress med «Kvitton och svar går till …».
- Footern: «verksamhet under bildande», «varje underbiträde namngivet».

**River (nya fynd, avlästa):**
1. **Villkoren säger emot ytan på fyra punkter.**
   - «Inga fasta avgifter … Vi tjänar pengar bara när du faktiskt sparar» (`src/pages/Villkor/index.js:20-21`); 1 995 kr nämns inte i filen.
   - Ombudskap, fullmakt via BankID och ångerrätt står kvar (:29-45, :80-84). Det är redan loggat som grundarens beslut, men uppladdningen binder kunden till dem (`sida--testa-faktura-390.png`).
2. **Integritetspolicyn lovar radering som inte sker.** «Analysresultatet cachas i 6 timmar, därefter auto-raderat» (`src/pages/Integritet/index.js:151, 179`), medan rummet bygger på lagrade analyser. Fakturavyn säger «raderas omedelbart efter analysen». Avläst; hög.
3. **Kontaktadresserna kan inte ta emot mejl.** `juridik@arvo.flow` (Villkor:146, 153) och `gdpr@arvo.flow` (Integritet:49, 75, 198, 306, 313). `.flow` är mig veterligen ingen toppdomän, och körplanen har redan en grundaråtgärd om kontaktadress. En begäran om radering kan alltså inte skickas. Att adresserna står där är avläst; att de inte fungerar är bedömning, hög.
4. **Connect lovar det ansvarsgränsen förbjuder.** Kryssrutan «behörighet att utfärda fullmakt för företaget», märket «BankID · Säker identifiering», «hittar vi inga överpriser? Då har du inte betalat en krona» och en aktiv knapp «Anslut Fortnox» (`sida--connect-390.png`). Tre modaler i fakturavyn skickar kunden dit (F1.6).
5. **Rankningspolicyn.**
   - Publicerar en formel (`annualCost*2 + switchingCost − reliabilityBonus − coverageMatch`) som jag inte återfinner; `lib/kundmeningar.js` säger själv att bytesmålen sorteras «bara på tillförlitlighet». Bedömning, medel.
   - «Fakturerar först när besparingen syns i dina egna böcker», ett sjätte arvodesbesked utöver F2.1.
   - «Vi publicerar vår rekommendationsstatistik kvartalsvis», senast uppdaterad 2026-04-24.
   - «I vissa kategorier genomför vi bytet».
   
   Sedd i `sida--bias-390.png`. Sidan är FAQ:ns bevis för opartiskhet.
6. **Startsidans exempelrum.** «Den vecka något faktiskt händer hör ni av oss — med draget redan gjort. Tills dess sköter vi det åt er.» (Landing:421-422) och «Resten sköter vakten» (:529). Det är motdragslöftet som registret förbjuder, i en annan ordalydelse.
7. **Sidhuvudets knapp «Se mina besparingar»** (`src/components/Nav.js:383`) och rubriken «Ni betalar för mycket» före uppladdning lovar ett utfall. Efter S1 får en mobilkund «Ingen jämförelse».
8. Redan loggat: F1.3–F1.8, F1.13, F2.1–F2.3.

**Vägningen:** ytan är i dag hederligare än sina villkor. En ekonomichef som läser avtalet innan hen skickar fakturor hittar ett annat företag än det startsidan beskriver. Det är det största enskilda förtroendehindret före våg 1. Bedömning, hög.

## 4 · Utvecklingsplanen

Rangordnad efter effekt per veckas arbete. Tidsuppskattningarna är bedömningar.

**Före våg 1:**

| # | Förslag | Lager | Signal | Backend | Integritetsrisk |
|---|---|---|---|---|---|
| 1 | **Löftessanering:** F1.3–F1.8, F1.11, F1.13–F1.15, F2.1–F2.5 och avsnitt 3 punkt 1–7; ett arvodesbesked ur `ANSVARSGRANS.arvode` överallt; Connect avroutas tills Fortnox finns | Förtroende | KM-05 utvidgad med formerna ger noll träffar; en sökning på «böcker», «landat», «börjat gälla» ger en källa | Inget nytt | Ingen; villkorstexten är grundarens |
| 2 | **Fakturavyn leder in i rummet:** huvudknapp «Öppna ert rum» efter varje resultat; premiumkortet, ikonraden och e-postmodalen bort ur resultatet för inbjudna | 2, 6 | Andel uppladdningar som följs av ett rumsbesök | Rumsnyckeln finns redan (TF:98) | Ingen |
| 3 | **«Sedan förra fakturan», version 1** (avsnitt 5) | 1, 2, 6 | Andel kunder som skickar faktura nummer två från samma leverantör; andel svarsmejl som öppnas | Radposter lagras (`line_items_json`); om öresfälten följer med in i lagringen har jag inte läst | Felmatchade rader; se avsnitt 5 |
| 4 | **Den tysta briefen:** skicka varje månad, byggd på punkt 3: lästa fakturor, oförändrade rader, öppna klockor | 2, 6 | Öppningsgrad; uppsägningar efter månad 1 | Ta bort hoppet i `generate-briefings.mjs:73`; datan finns | En brief som säger «allt lugnt» utan att ha jämfört något; kräv minst en jämförelse, annars «vi har inget att jämföra än» |
| 5 | **Rummets första skärm på 390 px:** domen först, ett tal, inloggningen nedflyttad; avståendet sägs en gång | 2 | Rullningsdjup; tid till första knapptryck | Inget | Ingen |
| 6 | **Onboarding «tre månader bakåt»:** rummet ber om de tre senaste fakturorna per leverantör och visar vilka som saknas | 1, 6 | Fakturor per leverantör dag 1 | Intaget finns; en räknare per leverantör | Ingen |
| 7 | **Fellägen i dossierspråket:** briefing, prospect, utfall, tomt rum; var kunden är, varför, ett nästa steg | Förtroende | Avhopp från felsidor | Inget | Utfall utan id ska inte fråga efter kostnad |
| 8 | **Radarn bär ett tal eller står still:** «bevakning aktiv» ersätts för icke-premium med vad som faktiskt lästs | 1 | — | `vakt` finns i `api/invoice-history` | Lös F2.3 samtidigt |

**Kräver våg 1-data:**
- **Fyndets avslut och likräkningen:** «posten är borta» när nästa faktura saknar raden. Byggs före, men bär först när kunderna skickat månad två.
- **Maktkalendern på avlästa datum:** ersätt analysdatum plus tolv månader (F1.9) med klockor ur avtal och fakturor. Kräver att kunder laddar upp avtal.
- **Den kollektiva sanningen:** fem kunder är ingen kohort. Rummet ska tills vidare bära marknadsankaret (verifierat listpris med datum) och inget mer.

**Avråder från:**
- **Ett kohort- eller branschkort nu.** Datan bär det inte, och bibeln har redan dödat det vid källan.
- **En samlad poäng på tunnare underlag** för att slippa «—». Poängens värde är att den vägrar.
- **Fortnox-kopplingen före våg 1.** Den flyttar arbetet från det kunden ser till en integration, och Connect lovar redan för mycket.
- **Mer rörelse, fler diagram, en chatt i rummet.** Det gör instrumentet till en dashboard.
- **Fler kategori-ikoner och «åtta kategorier»-språk.** Nio kategorier talar; säg det, eller säg inget.
- **E-postgrind före värde** för inbjudna kunder.

## 5 · Det modiga draget

Jag står fast vid «Sedan förra fakturan», men som en hel upplevelse med ett slut. Arbetsnamn: **fakturarevisionen**.

**Berättelsen på nätverksträffen.** «Jag vidarebefordrade tre månaders Telia-fakturor. Två minuter senare stod det att rad 7 är en avbetalning vi betalat två månader efter att den var klar, med ett färdigt brev. Rad 3 hade gått från 299 till 329 kronor mellan september och oktober. Månaden efter kom ett mejl: posten är borta, 5 388 kronor om året.»

**Varför det slår alternativen.**
- Det bygger bara på kundens egna papper, så det fungerar för mobil efter S1 och för de tysta kategorierna.
- Det ger rummet något nytt vid varje faktura, vilket är skälet att komma tillbaka som saknas i dag.
- Det fyller veckodomen, kvittona och likräkningen utan marknadsdata.
- Dörren är fortfarande snabbast till första reaktionen, men den säger inget om pengar. Revisionen gör det.

**Bygget, konkret.**
1. **En ren funktion `lib/fakturadiff.js`.** In: två lagrade analyser med samma rum och samma normaliserade leverantör. Ut: en lista rader med läge.
2. **Matchning.** Bara rader med ordagrant samma beskrivning efter normalisering av blanksteg och skiftläge, samma enhet och samma radtyp. Engångs- och proratarader jämförs aldrig. Perioden normaliseras med `lib/faktureringsperiod.js`.
3. **Tal.** À-pris och antal läses via `lib/radobservation.js`, i öre där fältet finns. En rad jämförs bara om antal × à-pris = belopp går ihop på båda fakturorna.
4. **Lägen i lägesregistret:** `oforandrad`, `pris_andrat`, `antal_andrat`, `rad_ny`, `rad_borta`, `ej_jamforbar` med skäl. Varje läge får en text i `src/lib/rumstext.js`.
5. **Fyndets livscykel.** Ett lagrat fynd får tre tillstånd: öppet, kvar på nästa faktura, borta. «Borta» kräver en senare faktura från samma leverantör där raden saknas. Likräkningen summerar bara fynd i läget borta.
6. **Ytor.** `api/invoice-history` skickar `sedanSist` per leverantör. Rummet visar kortet överst i leverantörsraden. Svarsmejlet öppnar med resultatet. Briefen får en egen insiktstyp.
7. **Bevis.**
   - Motprov: samma faktura två gånger ger noll ändringar.
   - Svep över korpusens fakturapar med varierade antal, perioder och proratarader.
   - Sabotage med tal.
   - Renderingssond vid 390 och 1600 px.

**Vad den får påstå i dag.**
- «À-priset på raden är 329 kr på oktoberfakturan och 299 kr på septemberfakturan.» Två avlästa tal.
- «Vi hittar ingen avisering på de fakturor ni skickat.» Aldrig «utan avisering».
- «12 av 14 rader gick att jämföra; två gick inte, av de här skälen.»
- Aldrig «höjning» om antal eller period skiljer, aldrig ett årstal utan bestämd period, aldrig ett omdöme om prisnivån.
- Med en enda faktura: «Vi har inget att jämföra med än. Skicka förra månadens.»

**Vad som kan gå fel.**
- En leverantör byter radtext mellan månader. Då blir allt `ej_jamforbar`, vilket är ärligt men tomt. Mät andelen i svepet innan ytan släpps.
- Modellifyllda öresfält varierar mellan körningar (bibeln, 12 aug). Jämför därför bara rader som bär textlagrets vittne eller går ihop aritmetiskt.
- Två konton hos samma leverantör läses som en serie. Kräv samma kund- eller avtalsnummer när fakturan bär ett.

**Öppet för grundaren.** Om kontaktadresserna och villkoren inte rättas före våg 1 bör inbjudan säga det rakt ut, för de fem kommer att läsa dem.


## Del 3 · Kontoret: dörren och rummet på djupet (grundarens precisering 12 nov)

**Dom.** Dörren och rummet är Arvos två bästa ytor, men de hänger inte ihop: det dörren läser fram försvinner när kunden går in i rummet, trots att startsidan lovar att det «blir rad ett». Dörren talar om pengar i ett enda läge, Microsoft 365 med bekräftat bolag; i det vanligaste läget, ett småbolag hos Loopia, är starkaste raden ett listpris som inte handlar om kunden. Rummet har rätt delar i fel ordning: på 390 px kommer domen som sjätte block, och samma avstående sägs upp till fyra gånger före första leverantörsraden. Över tid står rummet nästan still, eftersom tre fakturor från samma leverantör ger en rad med texten «3 analyser». Den ändring som ger mest är att göra dörrens fynd till rummets första rader och låta varje ny faktura skriva en ny rad i dem.

Läst i 03583759; planvalsmeningarna i 4029b68b. «Avläst» = bild eller fil:rad; resten är bedömning med konfidens. F1.n och F2.n är fynden ur första passet, «pass 2» är det andra. PF = `src/pages/Portfolio/index.js`, KS = `src/pages/Kontoret/styles.js`, RC = `src/components/RevealCard.js`. Inga spårade filer är ändrade. Bolagsverket-lagret och bolagsväljaren är lästa i kod, inte sedda i bild.

## 1 · Dörren som första möte

**Vad ekonomichefen ser, per läge (avläst):**

| Läge | Rader | Omdöme |
|---|---|---|
| Tunt (Loopia) | «Loopia sköter er domän» och «Tele2 Företags entrénivå för mobilabonnemang: 269 kr/mån» (`dorren--tunt-390.png`) | Svagt. Första raden vet kunden redan; den andra är sann men handlar om marknaden |
| Microsoft 365 | «Ni kör Microsoft 365» med nivåspannet 66,91–641,18 kr och «6 891 kr per anställd och år»; «sattes upp april 2021»; «17 års obruten digital närvaro» (`dorren--m365-390.png`) | Starkt. Spannet är dörrens enda mening om pengar |
| M365 med bekräftat bolag | «N kr/år skiljer billigaste från dyraste licensnivå — för era N anställda» (`lib/business-intel.js:321`), bokslut, tillväxtsvit, koncern | Starkast. Kräver bolagsmatchning |
| Google | «Ni kör Google Workspace · Er e-post drivs av Google.» (`lib/domain-intel.js:388-392`) | Ingen krona; priserna är i USD |
| Bolagsväljaren | «Vi läste N bolag som heter något med X. Vilket är ert?» och «Vi kunde ha gissat … därför frågar vi» (RC:522, 553) | Starkt förtroendeögonblick |

- **Starkaste «Hur visste de det?»:** licensspannet gånger anställdatalet, eftersom det är ett eget tal i kronor, räknat ur två källor med datum. Tvåa är SPF-raden «X · Y får skicka mejl i ert namn» (`lib/domain-intel.js:430`).
- **Svagast:** «Loopia sköter er domän» och «17 års obruten digital närvaro». Ett registreringsdatum bevisar inte «obruten». Bedömning, medel.
- **Riskerar att vara fel:**
  - M365-datumet «exakt när uppsättningen gjordes» (F1.12).
  - Licensspannet räknar varje anställd som en licens; källraden säger det («× ert anställdatal»), rubriken inte. Bedömning, medel.
  - Kvittot «Fem öppna register lästa — … prisboken» står även på det tunna kortet (bild). Prisboken är vår egen, inte ett öppet register, och jag har inte läst var talet räknas (RC:617).
  - Ingressen «Era leverantörer har redan bildat sig en uppfattning om er — och prissätter efter den» (RC:472) är ett påstående utan källa.
- **Vad som saknas för att dörren ska tala om pengar:**
  1. Det tunna kortet behöver en rad om kunden. Namnservrar och SPF pekar ut leverantörer; för var och en som finns i prisboken kan dörren visa listprisets spann, som den redan gör för Microsoft.
  2. Google-läget behöver samma brygga, eller en ärlig mening om varför den saknas (priserna är i USD).
  3. Bolagsväljaren låser upp det starkaste. Startsidans egen kommentar säger att automatisk bindning «fyrar i 1 fall av 20» (Landing:138). Väljaren bör därför komma först, inte sist.

**Övergången dörr → rum (avläst i `dorren--*-390.png` och RC:329-380):**
- Bryggan säger «Vidarebefordra en faktura. Eller femtio. Sedan har ni ett eget rum hos Arvo», visar `faktura@inbox.arvoflow.se` och länken «Testa med en faktura».
- Vägen kräver att kunden lämnar webbläsaren, hittar en PDF, vidarebefordrar, väntar på svar och klickar på länken. Det är fem handlingar i två program. Här tappas besökaren. Bedömning, hög.
- Reservlänken går till den ljusa fakturavyn, inte till rummet, fast rummet har en egen släppyta (PF:2076-2083).
- **[KUND] D-1 · «Det ni just såg blir rad ett» (Landing:364) har ingen mekanik.** Rummet använder avslöjandet bara i tomläget (PF:2057-2061), och `api/reveal.mjs` sparar inget (:34 `no-store`; inga skrivningar hittade). Avläst, hög.
- **[FORM] D-2 · «Upp till hundra fakturor i samma mejl» (RC:359) mot rummets «även 50 på en gång»** (`registret--rummet-390.png`).

## 2 · Rummet, ruta för ruta

Ordningen är densamma på 390 och 1600 px; på 1600 står radarn till höger om hälsningen (KS:61-64).

| # | Ruta (PF) | Säger | Tal med källa och datum | Våg 1-kund | Upprepar |
|---|---|---|---|---|---|
| 0 | Inloggning «Redan kund?» (`AccountBar`, PF:848) | Skicka länk | — | Visas överst för den som redan är inne | — |
| 1 | Hälsning och h1 (911-927) | «God kväll. Vi vaktar era avtal.» | Datum | Fylld | Rubriken i ruta 4 |
| 2 | Radarn (928-985) | Fakturor, prissatta, mottagna; «bevakning aktiv» | Räknare; svepstämpel bara när svep finns | Räknare fyllda, marknadsraden tom | F2.3 |
| 3 | Fyndkort: fynd, rätt-storlek, rörelse, klocka, prognos (986-993) | Det enda rörliga i rummet | Ja: citat, datum, antal avsändare, grund och konfidens (`registret--rummet-390.png`) | Tom utan fynd; rörelse och prognos beror på prishistoriken | — |
| 4 | Veckodomen (995-1030) | Läget, med källchip | Ja när mätt | Oftast «kunde inte mätas» | Ruta 1, 5, 6 |
| 5 | Arvo Score (1031–) | «—» och två meningar om varför | Nej | Tom med en mobilrad | Ruta 4 |
| 6 | Nettobesparing eller «Fakturor i rummet» (–1117) | Ett tal, eller antal fakturor plus domens text en gång till | Delvis | Antalet finns redan i radarn | Ruta 2, 4 |
| 7 | Vaktens kvitton (1118) | Bevakar, analys, kohort, rörelse, prognos, klocka | Delvis | «Vägde 0 fakturor» (bild) | Ruta 3 rad för rad; F1.10 |
| 8 | Kollektiva sanningen: kohort, täckning, marknadsankare (1126-1370) | Kohortkort eller listprisankare | Ankaret ja | Ankaret syns inte i någon mobilbild; kohorten är död vid källan | — |
| 9 | Maktkalendern, årsavtal (1372-1385) | «~ månad år» | Nej (F1.9) | Bara årsfakturor | Klockan i ruta 3 |
| 10 | Innehavet (1392-1898) | Rad per leverantör: bedömning, klocka, «Så landade vi i talet», byte | Ja, rummets bästa underlag | Fylld | — |
| 11 | Bevakat, inte prissatt (1899) | Skälet till tystnaden | Skäl | Fylld för tysta kategorier | — |
| 12 | Fyll på rummet (1944) | Adress, släppyta, guide, intag | Intagets räknare | Fylld | F2.4 |
| 13 | Intelligence-pitch (1998) | 1 995 kr | — | Visas även för premium (ingen gren läst) | — |

- **[KUND] R-1 · Kohortkortet finns kvar i ytan.** `registret--rummet-390.png` visar «Ni betalar 14% mer» mot ett snitt av totalsummor, i ett rum där domen säger «vi hävdar ingenting om er prisnivå», och kvittot «sanningen ingen jämförelsesajt kan ge» (PF:724). Datan kommer via `getMarketIntelligence` (`api/invoice-history.mjs:794`), som bibeln säger alltid svarar `null`. Kortet är alltså dött i dag men laddat. Avläst i bild och kod; att källan svarar `null` har jag inte läst om.
- **[FORM] R-2 · Marknadsrörelsens mening haltar:** «5 av 12 avsändare Arvo analyserat fakturor från för mobil ligger hos Telia» (bild).
- **Rangordning efter värde för kunden:** 3 fyndkorten, 10 innehavet med underlaget, 4 domen, 12 intaget, 2 radarns räknare, 8 ankaret, 11 skälen, 7 kvittona, 9, 5, 6, 13, 0.
- **Bort:** 6 i sitt omätta läge, 9 tills datumen är avlästa, kohortkortet i 8, 13 för premiumkunder, kvittoraderna som upprepar ett kort.
- **Slå ihop:** 1 och 4 till en rubrik; 5 in i 4 som en rad när poängen saknas; 2 och 7 till en vaktruta.
- **Flytta upp:** domen till första skärmen; intagets räknare (12) upp till vakten; inloggningen (0) ned eller bort när rummet är öppet.

## 3 · Rummets berättelse över tid

| Tidpunkt | Vad som ändras (avläst i kod) | Vad som står still |
|---|---|---|
| Dag 1, en faktura | Radarns räknare, en rad i innehavet, domen, eventuellt fynd | Allt annat |
| Tre fakturor, samma leverantör | Raden visar senaste analysen och «· 3 analyser» (PF:527, 1421) | De två äldre syns inte; ingen jämförelse mellan dem i rummet |
| En månad | Klockans dagar räknas ned vid varje läsning; svepstämpel och «N nätter i rad» om svepet rapporterat (PF:706-712); rörelse och prognos om prishistoriken ändrats | Poäng, dom och innehav är oförändrade utan ny faktura |
| Avtalsvarsel | Mejl 30 och 7 dagar före sista dag (F1.2 gäller); klockkortet finns redan i rummet | Rummet visar inte att varslet skickats; efter sista dag står «-42 dagar» (F1.10) |

- Det som faktiskt rör sig utan att kunden gör något är klockan, svepraden och de två marknadskorten. Inget av dem handlar om kundens egna rader. Bedömning, hög.
- Fyndet har ingen fortsättning: samma kort står kvar tills en ny faktura från leverantören ersätter raden, och ingen ruta säger om posten försvann (pass 2, avsnitt 5).

## 4 · Designen

- **Två rubriker tävlar.** Hälsningen är `clamp(40px, 7vw, 62px)` (KS:79) och domen `clamp(30px, 5vw, 48px)` (KS:155). På 390 px säger de nästan samma sak med en radar emellan (`lagesregister--rummet-omatt-mobil.png`). Domen bör vara den enda stora serifraden.
- **Radarn sveper alltid.** `animation: sweep 3.2s linear infinite` (KS:103) går oavsett om ett svep finns. Rörelsen bär då ingen mätning. Låt den stå still med stämpeln «inget svep rapporterat», och svepa en gång när ett nytt svep lästs in.
- **Mobil staplar radarn före innehållet** (KS:64, 93). På 390 px tar den en hel skärm innan något om kundens pengar syns.
- **Täthet.** Scorekortet och «Fakturor i rummet» är stora kort med ett streck eller ett antal (KS:241, 321). I det omätta läget är de två skärmhöjder utan tal.
- **Regel 6 bryts i rummets banner:** inline-stilar med hårdkodade färger, `#EAF2EF`, `#F5B45A`, `#D9B98A`, `#B89B72` (PF:857-900). Filen har tretton sådana block.
- **Mono på tal hålls** i radarn, underlaget och märkena. Det är rummets starkaste signatur. Kvittonas löptext bryter mot den: «-42 dagar» står i brödtext.
- **Dörrens kort är rätt byggt:** titel i serif, en mening, källrad i mono (RC:565-571). Fynden tänds med 0,14 s fördröjning per rad, vilket fungerar som telemetri. Kvittot i versaler läses däremot som dekor på 390 px.
- **Bryggan byter språk.** Dörren är mörk, reservvägen ljus. Den som klickar «Testa med en faktura» lämnar dossiern.
- **Kvittot «Vägde 0 fakturor»** bör inte renderas: en rad som redovisar noll arbete med datum ser ut som ett fel.

## 5 · Planen för rummet och dörren

Rangordnad efter effekt per veckas arbete. «Före» = går att bygga före våg 1.

| # | Ändring | Backend | Signal | Integritetsrisk | Före |
|---|---|---|---|---|---|
| 1 | **Dörrens fynd blir rummets första rader.** Varje leverantör dörren ser (Microsoft 365, Google, SPF-tjänsterna) står som en rad med läget «faktura saknas» och sitt listprisspann där boken bär ett | Avslöjandet sparas inte i dag (D-1); behöver en lagring per rum och en väg som bär domänen från dörren | Andel dörrbesök som leder till ett rum; andel «saknas»-rader som får en faktura | En leverantör ur DNS är en teknisk relation, inte ett avtal. Raden får säga «syns i era publika uppgifter», aldrig «ni betalar» | Ja |
| 2 | **Bryggan går till rummet.** Efter avslöjandet: «Öppna ert rum» med släppyta och rummets egen adress; mejlvägen står kvar som alternativ | Rumsnyckel och adress finns | Fakturor inom tio minuter efter avslöjandet | Ingen | Ja |
| 3 | **«Sedan förra fakturan» och fyndets livscykel** (nedan) | Radposter lagras; om öresfälten följer med in i lagringen har jag inte läst | Faktura nummer två per leverantör; öppnade svarsmejl | Felmatchade rader (pass 2) | Ja; bär fullt med våg 1-data |
| 4 | **Ny ordning i rummet:** dom, fyndkort, innehav, vakt, intag; ruta 5, 6, 9 och 13 enligt avsnitt 2 | Inget | Rullningsdjup; tid till första klick | Ingen | Ja |
| 5 | **Löftena i rummet:** F1.4, F1.5, F1.10, F2.2–F2.5, D-1, R-1 | Inget | Skanningen ger noll träffar | Ingen | Ja |
| 6 | **Bolagsväljaren först i dörren,** med licensspannet märkt «om varje anställd har en licens» | Finns | Andel avslöjanden med bekräftat bolag | Rubrikens antagande om licenser | Ja |
| 7 | **Det tunna kortet får en rad om kunden:** spann per igenkänd leverantör ur prisboken | Prisboken finns; kopplingen namnserver → kategori saknas (bedömning) | Andel tunna kort med minst en kronrad | Bara leverantörer med verifierat SEK-pris | Ja |
| 8 | **Radarn bär ett tal eller står still;** intagets räknare flyttas dit | `vakt` och intaget finns i svaret | — | Löser F2.3 | Ja |
| 9 | **Maktkalendern på avlästa datum** | Kräver uppladdade avtal | Antal klockor med känt datum | F1.9 | Nej |

**«Sedan förra fakturan» i rummet:**
- **Placering:** överst i den utfällda leverantörsraden, före «Arvo bedömer». När något ändrats lyfts det också som fyndkort i ruta 3.
- **Rubrik:** «Sedan förra fakturan · september → oktober».
- **Innehåll:** en rad per jämförd fakturarad med läge, och en summering: «12 av 14 rader jämförda. 11 oförändrade, 1 ändrad, 2 gick inte att jämföra.»
- **En faktura:** «Det här är den första fakturan från Telia i rummet. Skicka förra månadens, så ser ni vad som ändrats.» Ingen tom tabell.
- **Tomläge efter jämförelse:** «Inga ändringar mellan fakturorna.» Det är den tysta dagens kvitto, och det ska också stå i svarsmejlet.
- **Raden i innehavet** byter «· 3 analyser» mot «3 fakturor · senast oktober» med de äldre nåbara.

**Fyndets livscykel i rummet:**
- **Öppet:** dagens kort, med brevet.
- **Kvar:** när nästa faktura bär samma rad: «Posten står kvar på oktoberfakturan. Brevet är daterat i september.»
- **Borta:** när nästa faktura saknar raden: «Posten är borta sedan oktoberfakturan.» Kortet flyttar då till en ruta «Avslutat», som ersätter ruta 6.
- **Likräkningen** summerar bara fynd i läget borta, med beloppet per år som koden redan räknar för fyndet. Före det står ingen summa.
- **Vad rutan aldrig säger:** att Arvo fick bort posten, eller att pengarna är återbetalda. Den vet bara att raden saknas på en senare faktura.

**Avråder från, i rummet och dörren:**
- Att fylla ruta 5 med en poäng på tunnare underlag.
- Att behålla kohortkortet «för framtiden»; ta bort komponenten tills normaliseringen per enhet finns.
- Fler rörliga element i radarn.
- Att göra dörren längre; den ska bli vassare i det tunna läget, inte större.

## Opus avläsning av fynden (13 nov, spets ffd384b8)

| Fynd | Avläsning | Läge |
|---|---|---|
| D-1 · «Det ni just såg blir rad ett» utan mekanik | lib/domain-intel.js:149-153 skriver bara till KV med TTL (`INTEL_CACHE_TTL`); api/reveal.mjs har ingen skrivning till rummet | bekräftat i kod |
| F1.1 · ingen brief en tyst månad | api/cron/generate-briefings.mjs:73 `if (!data || data.insightCount === 0)` hoppar över | bekräftat i kod |
| F1.2 · varslet bokförs utan att Resends fel läses | api/cron/send-reminders.mjs:156, 199, 234: `await resend.emails.send(...)` utan `{ error }` | bekräftat i kod; IA-19:s form (`skicka()`) finns i intaget |
| F1.10 · «-42 dagar till sista uppsägningsdag» | src/pages/Portfolio/index.js ~735: `roomClock.daysToAct` skrivs utan gren för negativt värde | kod läst; att `daysToAct` blir negativt är inte kört |
| R-1 · kohortkortet i ytan | lib/price-alert.js:100-102 `getMarketIntelligence` returnerar alltid `null` | kortet kan inte visas i dag (registrets bild matar data direkt); komponenten står kvar |
| F2.3 · «bevakning aktiv» till varje besökare | Portfolio:713, 945, 980 | bekräftat i kod |
| Rummet över tid · «3 analyser» | Portfolio:1421 `· ${g.count} analyser` | bekräftat i kod |

Nästa steg efter S1 (förslag till körplanen): S6 och S4 enligt planen, sedan löftessaneringen (F1.2 först: ett varsel som inte går fram men bokförs är en tidsfrist kunden missar), sedan rummet och dörren enligt Fables plan, punkt 1–4.
