commits: 37997d49adc8cca1d075508366cfeda4ed41bfbf
dom: BLOCKERAR

# Sjuttonde blicken på S1 (37997d49), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins17/…` är kataloger i sessionens scratchpad. Granskningen avbröts en gång av
kontots sessionsgräns; varje mätning nedan är körd om efter återstarten innan den räknades.

**Dom: BLOCKERAR**, på en [KUND] som S1 inför och som a3a6e83f:s lagning (regel 13) inte stänger:
- **Ä-1**: en kombinerad mobilfaktura utan primärdel, där modellen svarar ja med en negativ besparing och
  bredbandsraden bär sin hastighet («… Mbit»), går `auto` på grenen och till granskning på main. Vaktens kopia av mains
  andra finansiella grind (`prim + sek <= 0`) saknar den sekundära termen, och sekundärvägen är `null` på en
  planvalsfaktura. 7 av 27 egna fall.

37997d49:s egen lagning håller: Ö-1:s fall (den sextonde linsens 44 och 4) har mains route i varje fall, och
sabotaget mot den nya raden fällde FV-A20. Ö-2:s lagning har tänder (sabotage A fällde FV-A20).

## Iakttagelser

- Utcheckat på grenens spets 37997d49 (FETCH_HEAD), alltså den granskade commiten själv. Main är 703dbb34 och
  föräldern a3a6e83f (`git worktree add` till `lins17/main` och `lins17/foralder`).
- 37997d49 ändrar i kod bara valutagrindens retur i agents/recommender/recommend.js (rad 1592-1596: symbolen skrivs
  över med ett rivet byte). Resten är tester (FV-A20, tolv valutafall och `rest·neg·ja` i fall.mjs), CLAUDE.md och ops/.
- Instrument: den sextonde linsens (`lins16/inst`, grenens tests/fakturakedjan/kor.mjs med `fall.haiku`, `fxKurs` och
  sanitetsloggarna), kopierat till `lins17/inst`; körning `lins17/kor.sh` och `lins17/bada.sh <namn> [for]`, jämförelse
  `lins17/jmf.mjs`. Grundmätning: linsens åtta E-fall har samma route på gren och main (`node jmf.mjs e`: lika 8).
- Mellan `recommend()` och sanitetsvakten på main (lins17/main/api/test-invoice.mjs:1942-1975) finns, utöver
  valutagrinden och de två finansiella grindarna, sekundärvägen: `secondarySaving` räknas för en kombinerad
  mobilfaktura, och den andra finansiella grinden är `prim + sek <= 0`, inte `prim <= 0`. På grenen är
  `secondarySaving` `null` för varje planvalsfaktura (api/test-invoice.mjs:1283), och kopian av grinden är
  `(_ogrindat.savingPerYear ?? 0) > 0` (rad 1995). Den sextonde domen skrev «E: `sek=0` när primärdelen saknas».
  Mätt: `sek=0` i E-fallen beror på att bredbandsraden «Företagsbredband Fiber 1000/1000» saknar «Mbit», så
  `secondaryConnectionSpeedMbit` är `null` (lib/invoice-metrics.js:34, `SPEED_DESC_RX` kräver mbit/gbit) och
  `computeSecondarySaving` ger `null`; primärdelens frånvaro har inget med saken att göra (`node -e` mot mains
  `computeInvoiceMetrics`/`computeSecondarySaving`: `secondaryComponentMonthly: 699, secondaryConnectionSpeedMbit: null` → `null`).
- Sviten utan sabotage: 2 778 av 2 778 gröna, 0 fail, 0 cancelled (`lins17/svit0.txt`, `bash svit.sh`).

## Fynd

### Ä-1 · [KUND], infört: en kombinerad mobilfaktura utan primärdel, där modellen svarar ja med en negativ besparing och bredbandet bär sin hastighet, går `auto` på grenen och till granskning på main

Mains andra finansiella grind räknar med den sekundära besparingen: `_primGross + _secGross <= 0`
(lins17/main/api/test-invoice.mjs:1964-1972). Står modellens tal kvar (kombinerad faktura utan primärdel, så
recommend() hoppar över den deterministiska räkningen) och modellen svarar ja med −1 200 kr, medan bredbandsraden
ligger över hastighetsgolvet, är summan positiv. Bytet står kvar, och vakten räknar `savingPct` på enbart primärdelens
−1 200: `negative_saving` → `review_queue`/`sanity_check_failed`. På grenen är `secondarySaving` `null` på en
planvalsfaktura, och vaktens kopia kräver `_ogrindat.savingPerYear > 0`; vakten prövar inget och fakturan går `auto`.

Avläst (`lins17/gen5.mjs` → `m.json`, 27 fall; `bash bada.sh m for`; `node jmf.mjs m`): bredband «Företagsbredband
Fiber 1000/1000 Mbit» 699 kr (sek 4 560) eller «Bredband Fiber 500 Mbit/s» 599 kr (sek 3 840), plus molnväxel 199 kr,
kategori mobil, modellens svar −1 200, −500, −4 000, −5 000, 0, 300, 2 000, nej med −1 200, och −1 200 med mål 9 000.
**7 av 27 skiljer sig: alla 7 `review_queue`/`sanity_check_failed` på main, `auto` på grenen och på föräldern
a3a6e83f.** Mains logg: `[sanity:det] FAIL … saving=-11% reason=negative_saving`; grenens: ingen sanitetsrad.
Motprov i samma körning: samma fakturor utan «Mbit» (sek 0) har samma route på båda (main: `[guard:finansiell] Ingen
positiv besparing`), −4 000 mot 500 Mbit (summan negativ) och −5 000 går `auto` på båda, 0, 300 och 2 000 går `auto`
på båda, och modellens nej går `auto` på båda (mains `[secondary-override]` sätter besparingen till 0). Instrumentet
ser alltså båda riktningarna.

Vad kunden får (`node visa.mjs m 'M·neg1200·mbit'`): main ger rummets kort «Mottagen — men vi stoppade
prissättningen … En människa läser om fakturan» och raden `review_queue`. Grenen ger analysen: «Du betalar idag
10 776 kr/år», «Vi jämför inte era mobilabonnemang mot det billigaste publicerade abonnemanget, eftersom vi inte vet
vilket abonnemang ni har» om en faktura vars enda löpande rader är bredband och molnväxel, analysmejlet och raden
som prissatt `auto` utan byte.

Klass: domen kunden får (analys eller granskning) ändras mot main, i den riktning a3a6e83f och kommentaren i
api/test-invoice.mjs:1987-1991 säger är stängd («Grinden lägger alltså aldrig en faktura `auto` som main höll») →
[KUND]. Infört av S1: 9c2991d1 nollade sekundärvägen på planvalsfakturor, och a3a6e83f:s återgivning av mains andra
finansiella grind tog inte med den sekundära termen. 37997d49 rör det inte. FV-A20:s `rest·neg·ja` är byggd så att
den inte kan se det: bredbandsraden «Företagsbredband Fiber 1000/1000» saknar «Mbit» (tests/fakturakedjan/fall.mjs:139, `BB`), så mains
sekundära besparing är `null` också där.
Hur ofta modellen svarar ja med en negativ besparing på en kombinerad faktura utan primärdel är inte avläst (inga
modellanrop); mekanismen står i diffen och byggarens egen svit bär formen (`rest·neg·ja`). Blockerar.

Omkört efter återstarten (`node gen5.mjs && bash bada.sh m for`): samma 7 av 27, samma riktning, föräldern lika med
grenen.

## Det som håller (avläst)

- **Ö-1 är lagad för linsens fall.** Den sextonde linsens 44 valutafall (`egna.json`) och 4 fall med sex dygn gammal
  kurs (`h.json`) genom grenens och mains handler: `node jmf.mjs egna` lika 44, olika 0; `node jmf.mjs h` lika 4,
  olika 0. I de 14 fall som går till granskning på båda skiljer sig gren och main bara i loggraderna, c1:s `ovissa` i
  rummet och prompten (`node djup.mjs egna review_queue`).
- **Den nya raden har tänder.** Sabotage B (37997d49:s rad i valutagrinden borttagen) fällde FV-A20 (1 av 2 778).
- **Ö-2:s lagning har tänder.** Sabotage A (vaktens `&& ((_ogrindat.savingPerYear ?? 0) > 0)` borttagen) fällde FV-A20
  (1 av 2 778; `rest·neg·ja: route review_queue`). Den sextonde linsens samma sabotage fällde 0.
- **Linsens E-fall** (`e.json`, 8): samma route på gren och main (`node jmf.mjs e`: lika 8).
- **Aktiveringsmejlets besparingsruta och beräkningsunderlaget** står när `netSaving > 0`
  (api/activate-intelligence.mjs `harBesparing`, api/test-invoice.mjs:2205), och klienten skickar svarets
  `netSaving` (src/pages/TestaFaktura/index.js:897, 990). En icke-mobil faktura med en besparing behåller alltså båda;
  läst, inte renderat.
- **Avtalspåminnelsens andra gren** (api/cron/send-reminders.mjs:178-189, `contract_terms_json IS NOT NULL`) läser
  inga besparingsfält; den första och utfallsenkäten läser genom `lagratByte` (rad 151, 241). Läst.

## Inte prövat

- Vad modellen faktiskt svarar (inga modellanrop). Ä-1 kräver att modellen svarar ja med en negativ besparing på en
  kombinerad faktura utan primärdel; hur ofta det händer är inte avläst. Prompten skiljer sig dessutom mellan main
  (sekundärdelen med sin besparing) och grenen.
- Byggarens 266 och linsens 150 fall är inte omkörda genom handlern i den här granskningen (37997d49 rör bara
  valutagrinden, och byggaren redovisar 472 av 472). Mätt i stället att de inte kan se Ä-1 (`node mangd.mjs …`, grenens
  `computeInvoiceMetrics`): `alla.json` har 8 kombinerade mobilfall utan primärdel, 0 av dem med avläsbar
  bredbandshastighet; `g.json`, `egna.json`, `e.json` och `h.json` har 0. Motprov: `m.json` ger 27 och 18.
- Renderade sidor: Ä-1 är avläst i handlerns svar, raden, rummets kort och mejlen som instrumentet bygger.

## Sabotage

| Sabotage | Fil | Fällda tester | Beteende ändrat |
|---|---|---|---|
| A: `&& ((_ogrindat.savingPerYear ?? 0) > 0)` borttaget ur vaktens villkor | api/test-invoice.mjs | 1 (FV-A20) av 2 778 | ja: `rest·neg·ja` till granskning |
| B: 37997d49:s rad (valutagrinden river det ogrindade bytet) borttagen | agents/recommender/recommend.js | 1 (FV-A20) av 2 778 | ja |

Båda med `assert s.count(old) == 1` (`lins17/sab.py`), återställda med `git checkout -- <fil>`; `git status --short`
visar därefter bara den här filen. Utfall: `lins17/svit-A.txt`, `lins17/svit-B.txt`.

