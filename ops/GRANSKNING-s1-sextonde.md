commits: a3a6e83fafadda35a4f1c9c7fc38d6d633a0c8e4
dom: BLOCKERAR

# Sextonde blicken på S1 (a3a6e83f), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins16/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som a3a6e83f inför:
- **Ö-1**: en mobilfaktura i EUR eller USD vars kurs inte är färsk går till granskning på grenen och `auto` på main.
  Symbolen `OGRINDAT_BYTE` följer med valutagrindens spridning, så sanitetsvakten prövar ett byte som valutagrinden
  just rivit, räknat genom en kurs som enligt valutagrinden inte får bära kundens pengar. Kunden får «Mottagen — men vi
  stoppade prissättningen» i stället för analysen, som main och föräldern ger.

En [VAKT] mergas och lagas framåt: Ö-2, vaktens kopia av mains andra finansiella grind har inget test (0 av 2 778).

Det som håller: i byggarens 266 fall och i 150 egna fall (fem perioder, hårdvara, prorata, tillägg, bredband, tre
prisnivåer kring sanitetsvaktens tak, modellens ja och nej) har grenen mains route i varje fall; de återförda
fakturornas svar, rad, rum och mejl är mains; `auto`-fallen är oförändrade mot föräldern; det ogrindade bytet når
inte svaret (sabotage I fällde FV-A20).

## Iakttagelser

- Utcheckat på grenens spets a3a6e83f (FETCH_HEAD), alltså den granskade commiten själv. Main är 703dbb34 och
  föräldern f1f17f60 (`git worktree add` till `lins16/main` och `lins16/foralder`).
- a3a6e83f ändrar i kod: `OGRINDAT_BYTE` och dess fält i `planvalsgrind` (agents/recommender/recommend.js:1606, 1631),
  och sanitetsvaktens villkor i api/test-invoice.mjs:1987-1999 (`_ogrindat`, `_ogrindatProvas`, `_provat`). Resten är
  tester (OG-01, FV-A20, Q2 i fall.mjs, `svarTal` i kor.mjs), renderingssonden, CLAUDE.md och ops/.
- Symbolen läses på ett enda ställe (`grep -rn "OGRINDAT_BYTE\|getOwnPropertySymbols\|Reflect.ownKeys"` i api, lib,
  agents, src, scripts: bara api/test-invoice.mjs:1992).
- Sviten utan sabotage: 2 778 av 2 778 gröna, 0 fail, 0 cancelled (`lins16/svit0.txt`).
- Instrument: grenens tests/fakturakedjan/kor.mjs i lins15:s form (`lins16/inst/korjrum.mjs`, roten ur `KOR_ROT`) med
  stubbarna kopierade; två tillägg i kopian: sanitetsvaktens Haiku-svar ur fallet (`fall.haiku`, annars YES) och
  loggraderna `[sanity…]`, `[guard:fx]` och `[fx-grind]`. Körning `lins16/kor.sh`, `bada.sh`, `en.sh`; jämförelse
  `lins16/jmf.mjs` (route och skäl) och `lins16/djup.mjs` (varje fält utom tidsstämplar, id och hashar); utskrift
  `lins16/visa.mjs`. Egna fall: `gen.mjs` → `egna.json` (44), `gen2.mjs` → `e.json` (8), `gen3.mjs` → `g.json` (150),
  `gen4.mjs` → `h.json` (4).
- Mellan `recommend()` och sanitetsvakten ändrar main bytet på tre ställen: valutagrinden (inuti `recommend()`, utanför
  planvalsgrinden), sekundärvägens överskrivning och de två finansiella grindarna (api/test-invoice.mjs:1949-1980).
  Grenens kopia återger de två grindarna men inte valutagrinden. Sekundärvägen är tom på en mobilfaktura på grenen;
  på main gav den ingen skillnad i route i något fall nedan (E: `sek=0` när primärdelen saknas).

## Fynd

### Ö-1 · [KUND], infört: en mobilfaktura i EUR eller USD med en kurs som inte är färsk går till granskning på grenen och `auto` på main

Symbolen följer med valutagrindens spridning. `recommend()` är `planvalsgrind` inuti valutagrinden
(agents/recommender/recommend.js:1579), och valutagrinden returnerar `{ ...svar, shouldSwitch: false, … }`
(rad 1583-1592). Spridningen kopierar symbolnyckeln, så `recommendation[OGRINDAT_BYTE].shouldSwitch` är `true` också när
valutagrinden har rivit bytet. Sanitetsvakten (api/test-invoice.mjs:1992-1999) prövar då det ogrindade bytet, räknat
genom en kurs som valutagrinden just förklarat oanvändbar. På main river valutagrinden bytet före vakten, så vakten
prövar ingenting och fakturan går `auto`: «Fakturan analyseras och visas som vanligt … ingen faktura går förlorad
(FX-15)» (api/test-invoice.mjs:890-897). OG-01:s egen kommentar säger att spridningen i valutagrinden behåller talet.

Avläst genom tre handlare (`lins16/egna.json`, 44 fall; `node lins16/jmf.mjs egna`): **16 av 44 skiljer sig mellan
main och grenen, alla 16 `auto` på main och på föräldern f1f17f60, och `review_queue`/`sanity_check_failed` på
grenen.** Det är exakt de fall där valutan är EUR eller USD, kursen inte är färsk (`fx_ingen`: KV-kursen äldre än 26
timmar, eller en reservkonstant, och live-hämtningen misslyckad) och det ogrindade mobilbytet är över 60 % av
årskostnaden: 900 EUR (eller USD) för tio abonnemang, ensam eller med bredband, modellens ja och nej
(2 × 2 × 2 × 2 = 16). Grenens logg: `[guard:fx] fx_ingen — besparingspåståendet rivs …` följt av
`[sanity:det] FAIL … saving=74% … [sanity] BLOCKED`. Mains logg för samma fall: bara `[guard:fx]`.
Motprov: med färsk kurs går de åtta fakturorna över taket till granskning på båda (72 %), liksom SEK-fallen; de tolv
fakturorna med 400 EUR eller USD (under taket) går `auto` på båda, med färsk kurs och utan. Instrumentet ser alltså
båda riktningarna. Över alla 44: main/förälder/gren = granskning/`auto`/granskning 14 (Å-1:s klass, som commiten
lagar), `auto` på alla tre 14, `auto`/`auto`/granskning 16.

Läget `inaktuell` (`lins16/gen4.mjs` → `h.json`): kursen i KV hämtad i dag men observationen sex dygn gammal,
«kursen är 6 dygn gammal (gräns 3)». Tre av fyra fall går `auto` på main och förälder och till granskning på grenen
(EUR ensam med modellens ja, EUR med bredband och modellens nej, USD ensam); motprovet 400 EUR går `auto` på alla tre.
Spärren gäller varje kurs som inte är färsk (api/test-invoice.mjs:901, `fxDom.niva !== 'farsk'`), alltså också en
riktig observation som är äldre än tre dygn, inte bara en misslyckad hämtning.

Vad kunden får (`node lins16/visa.mjs egna "A·EUR·ja·gammal·ren"`): main ger analysen (`auto`, «Du betalar idag
123 876 kr/år», raden lagrad som prissatt utan byte, svarsmejlet «Er analys är klar»). Grenen ger rummets kort
«Mottagen — men vi stoppade prissättningen … En människa läser om fakturan», ingen årskostnad, inget analys- eller
svarsmejl, och raden som `review_queue`/`sanity_check_failed`. Fakturavyns ruta för det skälet
(src/pages/TestaFaktura/index.js:1642-1653, läst, inte renderad) är den generiska «Fakturan behöver djupare analys. Vår
algoritm är inte tillräckligt säker på klassificeringen …». Texten är loggad som förexisterande; Ö-1 räknas på domen
(granskning i stället för analys), men det är den texten kunden läser i stället för analysen. Svaret bär inget
besparingstal (`extracted` har bara leverantör, datum, belopp och konfidens).

Klass: domen kunden får (analys eller granskning) ändras mot main, och den bryter valutagrindens regel att en faktura
med en kurs som inte är färsk analyseras och visas som vanligt → [KUND]. Infört av a3a6e83f: föräldern bar ingen
symbol, och vakten prövade inget på en mobilfaktura. Commitens påstående «266 av 266 fall har mains route» är sant för
sina 266 (nedan); mängden har ingen faktura med en kurs som inte är färsk (`rest·bb+mob·eur` får färsk kurs ur
KV-stubben). Hur ofta en mobilfaktura i EUR eller USD kommer in när kursen inte är färsk är inte avläst; mekanismen
står i diffen. Blockerar.

### Ö-2 · [VAKT], infört: sanitetsvaktens kopia av mains andra finansiella grind har inget test

Commiten säger att vakten prövar det ogrindade bytet «efter samma två finansiella grindar som main»; sabotagen i
commitmeddelandet prövar bara den första. Sabotage A (`lins16/sab.py A`, `assert s.count(old) == 1`): villkoret
`&& ((_ogrindat.savingPerYear ?? 0) > 0)` borttaget ur api/test-invoice.mjs:1995. Sviten: **0 av 2 778**
(`lins16/svit-A.txt`). Beteendet ändrades: en kombinerad mobilfaktura där modellens egna tal står kvar (ingen
primärdel; bara bredband och ett tillägg) och modellen svarar `shouldSwitch: true` med `savingPerYear: -1200` går
till granskning (`negative_saving`) under sabotaget och `auto` på main (`lins16/e.json`, `E·neg·1000` och
`E·neg·utan-hast`, `node lins16/jmf.mjs eA`). Utan sabotage är alla åtta E-fall lika på gren och main. Inget
kundtal är fel i den granskade commiten → [VAKT]. Mergas och lagas framåt.

## Det som håller (avläst)

- **Byggarens mängd.** De 266 fallen (`z3/alla.json`, kopierad till `lins16/alla.json`) genom grenens, mains och
  förälderns handler: main/förälder/gren = `auto` på alla tre 238, granskning/`auto`/granskning 18, granskning på alla
  tre 10. I de 28 granskningsfallen skiljer sig gren och main bara i loggraderna, c1:s `ovissa` i rummet och prompten
  (`lins16/djup.mjs alla review_queue`); i de 238 `auto`-fallen skiljer sig gren och förälder bara i loggraderna
  (`A=for … djup.mjs alla auto`).
- **Utanför byggarens mängd, i kronor.** 150 mobilfakturor (`lins16/g.json`): fem perioder (månad, kvartal, år,
  `one_time`, `unknown`), tre prisnivåer per abonnemang (599, 699 och 749 kr i månaden, alltså 55, 62 och 64 % över
  golvet), fem tillägg (inget, avbetalning typad `hardware`, en proratarad, molnväxel, bredband), modellens ja och nej.
  Main/förälder/gren = `auto` på alla tre 86, granskning/`auto`/granskning 64; ingen faktura har en annan route på
  grenen än på main. Granskningsfallen skiljer sig från main bara i loggar, `ovissa` och prompt; `auto`-fallen från
  föräldern bara i loggar.
- **Modellens egna tal** (`lins16/e.json`, 8 fall: ingen primärdel, modellens besparing −1 200, 0, 2 000 och 9 000):
  samma route på gren och main i alla åtta.
- **Det ogrindade bytet når inte svaret.** Sabotage I (beloppet under ett nytt fält i svarets `recommendation`) fällde
  FV-A20 (1 av 2 778, `lins16/svit-I.txt`). Granskningssvaret på Ö-1:s fall bär inget besparingstal.
- **Haiku-grenen är onåbar för mobil.** Fallen med `fall.haiku = 'NO'` (`D·…`) går `auto` på båda: mobilens källa är
  `real-public`, och vakten hoppar då över Haiku (`[sanity:verified] PASS … saving=51%`).

## Inte prövat

- Vad modellen faktiskt svarar (inga modellanrop). Promptens sekundärdel finns bara på main; om mains modell därför
  svarar med andra tal på en kombinerad faktura utan primärdel är inte avläst. I instrumentet gav sekundärvägen
  `sek=0` när primärdelen saknas.
- Renderade sidor: Ö-1 är avläst i handlerns svar, raden, rummets kort och mejlen som instrumentet bygger, inte i en
  rendering. a3a6e83f ändrar ingen text.
- Påminnelsen, enkäten, briefen, prislarmen, prospektet och dörren: a3a6e83f rör dem inte, och ingen av dem läser
  symbolen.

## Sabotage

| Sabotage | Fil | Fällda tester | Beteende ändrat |
|---|---|---|---|
| A: `&& ((_ogrindat.savingPerYear ?? 0) > 0)` borttaget | api/test-invoice.mjs | 0 av 2 778 | ja: `E·neg·1000`, `E·neg·utan-hast` granskning i stället för `auto` |
| I: `mojligBesparing: recommendation[OGRINDAT_BYTE]?.savingPerYear` i svarets `recommendation` | api/test-invoice.mjs | 1 (FV-A20) | ja |

Båda med `assert s.count(old) == 1` (`lins16/sab.py`), återställda med `git checkout -- api/test-invoice.mjs`.
