# Brief till Fable 5.1 — moaten är tunnare än bibeln antar

**Från:** Opus 5 (Huvudarkitekt) · **Datum:** 2026-09-11 · **Beställd av:** grundaren

## Detta är INTE en kodgranskning

Koden är granskad. Tre fientliga varv på samma arbete, alla med domen MERGAS, alla fynd i
klassen [VAKT]. Ett fjärde varv har mätt låg avkastning och är precis den rekursion stoppregeln
skrevs emot.

Det jag vill ha av dig är det jag strukturellt inte kan ge mig själv: **jag briefade varje
granskare i går, så de svarade på mina frågor.** Din historiska avkastning ligger i frågorna jag
inte ställde — `Bearer undefined`, `FileStore.list()` som gav poster i stället för ID:n. Båda var
frågor ingen ställt, inte svar någon fått fel.

**Föreslå därför inte en kodändring som huvudsvar.** Om svaret på en fråga nedan är «bygg X» vill
jag först se argumentet för att X är rätt SAK att bygga.

---

## Vad som faktiskt mättes (2026-09-10, produktion)

Grundaren bad mig mäta prisboken innan jag deduplicerade den. Utfallet:

| | |
|---|---|
| rader i `invoice_datapoints` | **297** |
| rader med **bevisad** dokumentidentitet | **9** |
| bevisade omanalyser | **1** |
| **okända** | **288 (97 %)** |

Och 97 % är ett svar om **motparten**, inte om prisboken: `invoice_analyses` rymde 49 rader varav
20 med belopp, och **128 datapunkter är äldre än den äldsta kvarvarande analysen**. Tidsfönstren
30 s och 300 s gav identiskt utfall — begränsningen var motparten, inte metoden.

**Formen på cellerna bar i stället.** Fem celler nådde radtröskeln (≥10). Deras antal SKILDA belopp:

| cell | rader | skilda belopp | efter grinden |
|---|---|---|---|
| `mobil·byraer·small` | 83 | **15** | talar |
| `bredband·byraer·small` | 33 | **3** | tystnar → **ingen benchmark alls** |
| `saas-productivity·byraer·small` | 24 | **2** | tystnar → verifierat listpris |
| `mobil·byraer·micro` | 18 | **4** | tystnar → verifierat listpris |
| `saas-productivity·hantverkare·small` | 17 | **1** | tystnar → verifierat listpris |

`saas-productivity·hantverkare·small` bar sjutton rader och **ett** belopp — p25 = median =
184 680 kr, ett tal kopierat sjutton gånger och sålt som «vad er bransch betalar». Cellen med 24
rader / 2 belopp är exakt den vars produktionslogg redan sa *«avvikelsevakten avstod — för få
SKILDA belopp»*: **vakten vägrade döma på cellen medan läsvägen sålde den till kunden.**

**Vad jag byggde:** `cellenBar` kräver ≥10 rader OCH ≥10 skilda belopp. Den **deduplicerar inte** —
percentilerna räknas fortfarande över varje rad, eftersom två bolag på samma listpris ÄR två
observationer och en kollaps hade förskjutit fördelningen kring just listprisklumpen, åt det håll
som ökar våra egna besparingsanspråk. Grinden avgör *om* cellen är en fördelning, aldrig vad den är.

**Verifierat live i produktion**, två fakturor med avsiktligt olika utfall:
- `tele2-mobil-enkel` (cellen som bär): Ring 1 grön, 10 licenser avlästa, `no_action` — bytesgolvet
  är fail-closed mot en totalsumma, som förut.
- `dustin-m365-standard` (cellen som tystnade): `kallaSource: real-public`, `kallaVerifierat:
  2026-09-07`, `kallaArTotalsumma: false`, `listpris:ok`. Före grinden kunde samma cell serva
  184 680 kr — en TOTALSUMMA, talet som 19 augusti gav ett golv 115 gånger för högt.

Rummet är fotograferat efter ändringen (`ops/rum-prisboken/`) — regel 8, och bifogat.

### Och bilden gav ett [KUND]-fynd som ingen av de tre granskningarna kunde se

Rummet visade tre meningar samtidigt:

> rubrik: **«God kväll. Allt är under kontroll.»**
> domen: «Vi vaktar era avtal — men **er position mot listpris kunde inte mätas** i dag.»
> bevakningen: **«Era priser står sig — inga byten på bordet just nu. Lugnet att ni ligger rätt
> är också en leverans.»**

Vi påstod att kundens priser står sig i samma vy som vi sa att vi inte kunde mäta dem.

Rotorsaken är värd din uppmärksamhet, för den är strukturell och den kan finnas på fler ställen:
`src/lib/domslut.js` **deklarerade redan** `lugn_omatt` som `positivtPrispastaende: false`. Rummets
två ytor frågade aldrig registret — båda bar en TVÅVÄGSGREN på ett TREVÄRT tillstånd och föll till
det positiva när positionen var omätt. `verdictHead` i samma komponent gör rätt. **En deklaration
som ingen konsument frågar är ingen deklaration**, och DL-01 kunde inte se det: den prövade
registret, inte ytorna som kunden läser.

Det är fjärde upprepningen av samma sats i samma fil, och min egen ändring gjorde läget VANLIGARE
(fyra av fem celler tystnade). Lagat vid källan (`omattLage()`), DL-10/DL-11, sabotage-bevisat i
fem riktningar. Men frågan jag inte kan svara på själv: **hur många andra register i den här
kodbasen deklarerar en sanning som ingen yta frågar?**

---

## Fråga 1 — HISTORIKER-FÄLLAN. Är tystnad rätt drag, eller bara bekvämt?

Regel 4 är explicit: *«Tystnad är inte längre default — den är sista utväg. En tyst vakt som hade
en värdefull uppfattning är ett misslyckande.»* Jag tystade fyra celler av fem.

**Mitt eget motargument, som jag inte kan väga rättvist eftersom jag byggde grinden:** tystnad kan
aldrig bevisas fel. Den är därför den bekvämaste positionen för den som är rädd för regel 3. Den
kostar heller ingenting *för mig* — den kostar kunden.

Den skarpa frågan: **en cell med tre skilda belopp HAR en källa** (tre verkliga fakturor från
verkliga bolag) — den saknar bara en *fördelning*. Regel 4 tillåter uttryckligen en **grundad
bedömning** när vi inte har fakta, om den bär alla tre: grund, konfidens, asymmetri. Är

> *«Vi har sett tre bolag i din bransch betala mellan X och Y. Tre är inte en marknad — det är ett
> indicium, och vi säger det rakt ut. Slår det fel är det till din fördel: du betalade inget för
> beredskapen.»*

ett **legitimt** regel 4-läge, eller är det regel 3-brottet i förklädnad? Jag har medvetet inte
byggt det, och jag är inte säker på att jag hade rätt.

Väg särskilt: vad är asymmetrin? Ett för lågt golv överdriver besparingen → vi tar success fee på
något som inte finns (den farliga riktningen). Ett för högt golv underdriver → kunden förlorar
pengar tyst. Tystnad ger det senare med garanti.

## Fråga 2 — PRISDATANS ÄGARSKAP. Vem äger vägen ut, och är den ens rätt väg?

Nitton kategorier tiger i revisionsgrinden. Bibeln konstaterar själv att *«vägen ut ur tystnaden
går inte genom kod utan genom prisdata»* — en publik svensk prislista, en verifierare och ett
vaktkontrakt per kategori. `saas-crm` är det tydligaste fallet: Pipedrive, HubSpot och Zoho har
färskt verifierade priser men prissätter i **USD**, och ett SEK-tal ur en USD-lista via en
runtime-kurs är inte ett verifierat listpris.

**`bredband` är värre och det är nytt:** den cellen faller inte på listpris utan på **total
tystnad**, eftersom prisboken med egen motivering saknar ett rikstäckande bredbandspris
(«priset beror på vilket NÄT som når adressen»). Bredbandskunder står alltså utan jämförelsegolv.

Frågorna:
1. Är «skrapa fler publika prislistor» verkligen det högsta hävstångsdraget — eller är det att
   skaffa fler KUNDER, så att cellerna fylls av verkliga fakturor i stället för av listpriser?
   De två bygger olika moat. Listpris är kopierbart; kohortdata är det inte.
2. `tele2Verified` bär redan verifierade bredbandspriser per adress (199–487 kr/mån). Är ett
   ADRESSBASERAT golv ett legitimt ankare för bredband, eller är det att jämföra äpplen med päron
   på ett sätt som bryter «vad är talet PER»?
3. Vem äger den här uppgiften operativt? Den kan inte göras från en kodsession.

## Fråga 3 — KOSTNADEN AV RADERAD DATA. Vad är policyn för testdata mot moaten?

Rummet rensades på grundarens begäran inför ett test med 25 fakturor. `invoice_analyses` rymmer
nu 49 rader. **Det är därför dokumentidentiteten är permanent obevisbar för 288 datapunkter** —
motparten som hade burit korsningen finns inte längre.

1. Vad är policyn? Prisboken (`invoice_datapoints`) överlevde rensningen medan analyserna dog —
   alltså finns datapunkter vars ursprung ingen kan spåra. Ska de två raderas ihop, eller ska
   prisboken aldrig röras?
2. `segmentOkant` hindrar redan mail-in-fakturor från att förgifta prisboken med antagna segment.
   Räcker det, eller ska **testytan** vara helt isolerad från prisboken?
3. Öppen mätning jag ännu inte gjort: av de 25 inskickade fakturorna — hur många blev
   datapunkter, och hur många tystades? Det talet säger hur mycket en testomgång faktiskt bidrar
   till moaten, och jag har inte mätt det.

---

## Vad jag redan har bestämt (pusha tillbaka på besluten, inte på luft)

- **Dedup på VÄRDE är förkastat.** Det hade kollapsat två bolag på samma listpris, systematiskt
  kring listprisklumpen, åt det håll som gynnar oss. Den frågan är stängd.
- **Tröskeln sänks inte** utan ett argument som överlever regel 3. Grundaren har sagt det, och
  jag håller med.
- **Percentilerna räknas över rader**, inte över unika värden. Frekvensen är information.

## Kända okända, uttalade

- Dokumentidentiteten för 288 datapunkter är permanent okänd. Ingen kod kan laga det.
- Tio skilda belopp kan i teorin vara ETT dokument analyserat tio gånger med olika utfall.
  `pdf_hash` + unikt index stänger det framåt, aldrig bakåt.
- Rumsbilden visar den SEEDADE testytan, vars rader är förberäknade. Den visar aldrig en tystad
  cell födas — den halvan är mätt separat med `diag-live`. Två mätningar, två frågor.
