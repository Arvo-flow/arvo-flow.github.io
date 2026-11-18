commits: b13d10d85a8084f0def03a8227385b4777264c88
dom: MERGAS

# Artonde blicken på S1 (b13d10d8), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins18/…` är kataloger i sessionens scratchpad.

**Dom: MERGAS.** Inget [KUND]-fynd. Ä-1 är lagad, och återgivningen av mains väg mellan `recommend()` och
sanitetsvakten håller i varje fall jag körde: 800 slumpade mobilfakturor utanför byggarens mängd (två frön), linsernas
tidigare mängder (27 + 44 + 4 + 8) och gränsfallen för den nya summan har samma route på grenen som på main, och
grenens `auto`-svar bär inget byte, procenttal, poäng eller besparing i något fält, raden, rummet eller mejlen.
Tre [VAKT], som mergas och lagas framåt (stoppregeln):
- **V-A**: gränsen i kopian av mains andra grind (`> 0` mot mains `<= 0`) har inget test; sabotaget fällde 0.
- **V-B**: valutavillkoret i `_mainsSekundar` är ett skydd bakom valutagrinden; sabotaget fällde 0 och ändrade inget.
- **V-C**: FV-L:s stubbe svarar med hela raden oavsett SELECT, så att `category` kan falla ur påminnelsens och
  enkätens sats utan att något test fäller; mot en stubbe som projicerar satsen skriver mejlen då 7 680 kr/år för ett
  lagrat mobilbyte.

## Iakttagelser

- Utcheckat på grenens spets b13d10d8 (FETCH_HEAD), alltså den granskade commiten själv.
- b13d10d8 ändrar i kod bara vaktens villkor i api/test-invoice.mjs (rad 1992-2006: `_mainsSekundar` och summan i
  `_ogrindatProvas`). Resten är tester (FV-A20, `rest·neg·mbit·ja` i fall.mjs), CLAUDE.md och ops/.
- Main är 703dbb34 och föräldern 37997d49 (`git worktree add` till `lins18/main` och `lins18/foralder`).
- Sviten utan sabotage: 2 778 av 2 778 gröna, 0 fail, 0 cancelled (`lins18/svit0.txt`).
- Instrument: den sjuttonde linsens (`lins17/inst`, grenens tests/fakturakedjan/kor.mjs med `fall.haiku`, `fxKurs`
  och sanitetsloggarna), kopierat till `lins18/inst`; `lins18/bada.sh <namn> [for]`, `lins18/jmf.mjs`.
- Ä-1 är lagad för den sjuttonde linsens fall: `lins17/m.json` (27 fall) genom grenens, mains och förälderns
  handler: `node jmf.mjs m` lika 27, olika 0 (föräldern gav 7 avvikelser enligt den sjuttonde domen).
- Slumpat rutnät utanför byggarens mängd (`lins18/gen1.mjs`, frö 7, 400 mobilfakturor: ren och kombinerad, månad,
  kvartal och år, 1/3/10/25 abonnemang med och utan avläst antal, bredband 100–1000 Mbit med och utan «Mbit»,
  molnväxel, hårdvaruavbetalning, prorata, 3/10/50 anställda, modellens ja/nej med besparing −3 000…60 000 och null,
  mål null/halva/över/lika/2 000, Haiku YES/NO) genom grenens och mains handler: `bash fler.sh r 4` → lika 400,
  olika 0 (101 granskning och 299 `auto` på båda). Skanning av grenens 299 `auto`-svar i alla fält, raden, rummet och
  mejlen (`node skanna.mjs r*-gren.json`): inget byte, procenttal, poäng eller besparing; bara `confidenceScore` och
  sidfotens «Besparingsarvode 20 % av realiserad besparing», som står likadant på main.
- Gränsfallen för b13d10d8:s villkor (`lins18/gen2.mjs` → `s.json`): summan exakt 0 (−4 560 + 4 560), ±1 och samma
  faktura utan `potential_mixed_categories`: `node jmf.mjs s` lika 6, olika 0.

## Fynd

### V-A · [VAKT], infört av S1 (a3a6e83f, b13d10d8 lagar inte): gränsen i kopian av mains andra grind har inget test

Main fäller bytet när `prim + sek <= 0`; kopian prövar det när summan är `> 0`. Sabotage A (`> 0` → `>= 0`, med
`assert s.count(old) == 1`) ändrar beteendet: `S·noll` (modellens ja med −4 560, bredbandsdelen 4 560) går till
granskning på grenen och `auto` på main. Sviten: 2 778 av 2 778 gröna (`lins18/svit-A.txt`). FV-A20 bär inget fall
med summan exakt 0. Inget kundsynligt ändras av koden som den står (`S·noll` har mains route), alltså [VAKT].

### Tillägg till iakttagelserna (efter V-A)

- b13d10d8 ändrar bara det den säger: samma 400 fall genom föräldern 37997d49 (`bash fler.sh r 4 for`,
  `node forjmf.mjs r 4`): 396 med samma route som grenen och identisk utdata i varje fält (svar, rad, rum, mejl,
  prompt; tider, pdf-hash och datum strukna), 4 med olika route. De 4 är Ä-1:s form (ingen primärdel, bredband med
  «Mbit», modellens ja med −300, −1 200 eller −3 000): `auto` på föräldern, granskning på grenen och på main.
- Linsernas tidigare mängder omkörda: `egna.json` lika 44, `h.json` lika 4, `e.json` lika 8 (gren mot main).
- Sabotage D (b13d10d8:s summa borttagen) fällde FV-A20 (1 av 2 778) och gav 7 + 1 avvikelser från main i `m` och `s`.

### V-B · [VAKT], infört av b13d10d8: valutavillkoret i kopian av mains sekundärväg kan inte ändra något

`_mainsSekundar` räknas bara när `!extracted.prispastaendeSparrat` (api/test-invoice.mjs:1996), som mains
`secondarySaving`. Men när priset är spärrat skickas `fxSparr` till recommend(), och valutagrinden (37997d49) sätter
då det ogrindade bytets `shouldSwitch` till `false`; `_ogrindatProvas` är då falskt vad `_mainsSekundar` än är.
Villkoret är ett skydd bakom ett skydd. Sabotage C (villkoret borttaget, `assert s.count(old) == 1`): 0 av 2 778
fällda (`lins18/svit-C.txt`), och beteendet oförändrat i 81 fall genom grenens handler, bland dem 48 valutafall
(`egna` 44, `h` 4, `s` 6, `m` 27: 0 avvikelser från main). Inget kundsynligt; raden står utan kommentar om att den
saknar egen tand.

### V-C · [VAKT], infört av S1 (822e9d43, FV-L): de lagrade radernas stubbe svarar med hela raden oavsett SELECT

`lagratByte` läser `row.category`, och S1 lade till `category` i påminnelsens och enkätens SELECT
(api/cron/send-reminders.mjs:140, 224). Stubben i tests/fakturakedjan/lagrade.mjs (`__SVARA`) svarar med hela raden
(`[{ ...rad }]`), så LB-01..03 kan inte se att kolumnen faller bort ur satsen. Sabotage E (`category, ` borttaget ur
båda satserna, `assert s.count(old) == 1` per sats): 0 av 2 778 fällda (`lins18/svit-E.txt`). Beteendet ändras mot
en databas som bara svarar med de valda kolumnerna: en kopia av lagrade.mjs vars stubbe projicerar satsens
kolumnlista (`lins18/lagradeP.mjs`, `bash lagkor.sh proj`) ger under sabotaget, för den lagrade mobilraden 4711,
«Vid analysen den 19 september 2026 visade Arvo en möjlig nettobesparing på 7 680 kr/år» i påminnelsen och «Vi
beräknade en nettobesparing på 7 680 kr/år» i enkäten; byggarens stubbe ger samma sabotage «(ingen besparing)».
Motprov: utan sabotage ger den projicerande stubben ingen besparing för 4711 och 7 680 kr för bredbandsraden 4713
i båda mejlen och briefen. Koden som den står är alltså rätt; instrumentet ser inte den väg felet skulle ta. [VAKT].

## Det som håller (avläst)

- **Andra fröet:** 400 mobilfakturor till (`node gen1b.mjs 11 400 4 q`, `bash fler.sh q 4`): lika 400, olika 0; 304
  `auto` på grenen, och skanningen (`node skanna.mjs q*-gren.json`) hittar inget byte, procenttal, poäng eller
  besparing, bara `confidenceScore` och sidfotens arvodesrad.
- **Återgivningen steg för steg, läst mot mains handler (lins18/main/api/test-invoice.mjs:1942-1975):** valutagrinden
  (river symbolen, 37997d49), sekundärvägen med överskrivningen (modellens nej och `sek > 0` ger main ett byte med
  besparingen 0; vakten får då 0 %, som alltid passerar `deterministicCheck` och hoppar över Haiku under 45 %, så
  `auto` på båda), den första grinden (målet mot årskostnaden) och den andra (`prim + sek <= 0`, nu med `sek`).
  `estimatedAnnualSaving` i mains `prim` sätts aldrig av recommend() (grep: bara valutagrindens `null`), så att
  symbolen saknar fältet ändrar inget. recommend() läser `invoice.secondarySaving` bara i prompten
  (agents/recommender/recommend.js:206, 480–507), så grenens och mains deterministiska tal är samma för samma
  modellsvar. `metrics` muteras inte mellan rad 1259 och 1996.
- **`_mainsSekundar` når ingen kund:** variabeln läses bara i `_ogrindatProvas` (grep, rad 1996–2006).
- **`lagratByte` och rummets inhållning säger samma sak om en planvalsrad:** `underlagForRad` ger `null` för en
  planvalskategori (api/invoice-history.mjs:420), så rummet håller raden av samma skäl som `lagratByte` (som saknar
  underlag). Med den projicerande stubben håller påminnelsen, enkäten och briefen 4711 (`bash lagkor.sh proj`).
- **Aktiveringsmejlet och beräkningsunderlaget:** båda står när `netSaving > 0` (api/activate-intelligence.mjs
  `harBesparing`, api/test-invoice.mjs `calculationChain`), och hårdvarujusteringen kräver `shouldSwitch === true`
  (lib/hardware-installments.js:49); en mobilfaktura kan alltså inte få rutan genom klientens justerade netto. Läst.

## Iakttagelse utan klass: «vi jämför inte» och vaktens interna jämförelse

Fakturavyns och mejlens planvalstexter säger «Ingen jämförelse mot listpris» och «Bredbandet på samma faktura har vi
inte jämfört mot listpris i den här analysen». Sedan b13d10d8 räknar handlern bredbandsdelen mot listprisgolvet
(`computeSecondarySaving`) på en kombinerad mobilfaktura, och sedan a3a6e83f prövar vakten mobilbytet mot kategorins
golv. Båda talen används bara till granskningsbeslutet och når ingen kund (avläst ovan). Jag läser meningarna som
påståenden om vad kunden får, inte om vakternas interna prövningar, samma läsning som den sextonde och sjuttonde
blicken gjorde för mobildelen. Obekräftad bedömning, inget fynd; skriv om meningen om den läsningen inte delas.

## Inte prövat

- Vad modellen svarar (inga modellanrop). Prompten skiljer sig mellan main och grenen på en kombinerad mobilfaktura
  (main bär bredbandsdelens besparing och «KRITISKT: Bredbandskomponenten har en besparing …»; grenen inte), så samma
  faktura kan få olika svar från modellen och därmed olika route. Instrumentet ger båda samma svar.
- Renderade sidor: inga ytor ändrades i b13d10d8; utfallet är avläst i handlerns svar, raden, rummet och mejlen som
  instrumentet bygger.
- Byggarens 266 fall och linsens 150 är inte omkörda (b13d10d8:s utdata är identisk med förälderns i 396 av 400 egna
  fall, och de 4 andra är Ä-1:s form).

## Sabotage

| Sabotage | Fil | Fällda tester | Beteende ändrat |
|---|---|---|---|
| A: `> 0` → `>= 0` i kopian av mains andra grind | api/test-invoice.mjs | 0 av 2 778 | ja: `S·noll` till granskning, `auto` på main (V-A) |
| B: `potentialMixedCategories: true` i `_mainsSekundar` | api/test-invoice.mjs | 0 av 2 778 | nej: no-op per konstruktion (`computeInvoiceMetrics` ger ingen sekundärdel utan blandad faktura; samma anrop som mains) |
| C: `&& !extracted.prispastaendeSparrat` borttaget ur `_mainsSekundar` | api/test-invoice.mjs | 0 av 2 778 | nej, i 81 fall (V-B: skydd bakom valutagrinden) |
| D: b13d10d8:s summa borttagen (`+ (_mainsSekundar?.grossSaving ?? 0)`) | api/test-invoice.mjs | 1 (FV-A20) av 2 778 | ja: 7 av 27 (`m`) och 1 av 6 (`s`) `auto` där main håller |
| E: `category, ` borttaget ur påminnelsens och enkätens SELECT | api/cron/send-reminders.mjs | 0 av 2 778 | ja mot en projicerande stubbe: 7 680 kr/år i båda mejlen för 4711 (V-C); nej mot byggarens stubbe |

Alla med `assert s.count(old) == 1` (`lins18/sab.py`), återställda med `git checkout -- <fil>`; `git status --short`
visade därefter bara den här filen. Sviten: `lins18/svit-A.txt` … `svit-E.txt`, utan sabotage `svit0.txt`
(2 778 av 2 778, 0 fail, 0 cancelled).
