# Granskningsdom · växelns nämnare (`lib/vaxelrad.js`)

**Uppdrag:** hitta var det gröna är osant.
**Datum:** 2026-09-19
**Andra blicken:** grundaren, samma form som `5db58aa`, `acea9cd`, `9e1e929`, `27285c4`.
**Dom:** **MERGAS.** Klassning enligt stoppregeln: **[KUND]** — ett tal och en mening som kunden
läser ändras, och ett falsklarm mot vårt eget arvode stängs.

---

## Felet, mätt

Växelkostnaden delades med `seatCount` — på en kombinerad telekomfaktura **antalet SIM-kort**.
Täljaren var växel, nämnaren en annan domän. `extract.js` sätter SIM-antalet med flit
(«benchmark is on mobile subscriptions, not switchboard capacity»); ingen frågade vad det gjorde
med växelpriset.

Mätt på `telenor-molnvaxel-stor.pdf` (45 SIM, 50 licenser à 89 kr):

| | Före | Efter |
|---|---|---|
| Visat för kunden | «Ni betalar **108,87** kr/användare och månad» | «**89,00** kr/användare och månad för **50 växellicenser**» |
| Nämnare | 45 SIM-kort | 50 avlästa licenser |
| T1-fallet (golv 89) | **+11,1 % över** | **på golvet** |

108,87 stod inte på något papper. 89,00 är fakturans egen rad: 4 450 / 50.

## Vad som byggdes

`lib/vaxelrad.js` klassar varje växelrad som `per_anvandare`, `per_bolag` eller `okand`.
Divisionen sker **bara** på per-användare-rader, och nämnaren är deras egna avlästa antal.

**Klassningen är HÄRLEDD ur populationen, inte uppfunnen.** Alla sex växelrader i fixturkorpusen
mättes innan en regel skrevs. Den bärande observationen: **kvantitet 1 på en växelrad går inte att
skilja från en bolagsavgift** — korpusen bär två sådana klumpsummor (1 290 och 1 490 kr). Att läsa
«Business 15» som femton licenser vore antalsdoktrinens förbjudna drag.

**Fail-closed:** en enda oläsbar växelrad tystar priset för hela fakturan, eftersom raden kan bära
ett okänt antal användare. En ofullständig nämnare ger ett för HÖGT pris — åt det håll som ökar
vårt arvode.

## Beviset grundaren bad om: exakt rätt tal eller tystnad

| Faktura | Utfall |
|---|---|
| `telenor-molnvaxel-stor` (45 SIM / 50 licenser) | **89,00** kr — exakt Telias verifierade T1-golv |
| samma utan IVR-raden (nivå T1) | **89,00** kr — på golvet, inget falsklarm |
| `tre-mobil-molnvaxel` (basavgift + 4 extralicenser) | **TYSTNAD** |
| Tele2 «Business 15» (klumpsumma) | **TYSTNAD** |
| Telia Smart Connect 45 anv + svarsgrupp | **118,00** kr — exakt T2-golvet |

**Den starkaste bekräftelsen:** två oberoende leverantörers fakturor landar, räknade ur sina egna
rader, exakt på prisbokens verifierade golv (89 och 118). Den rättade aritmetiken reproducerar tal
som hämtats från en helt annan källa.

## Min invändning som grundaren inte hade bett om — och som byggdes

Att bara lyfta ut bolagsavgiften ur divisionen hade fått 449 kr/mån att **upphöra att finnas**.
Beloppet bärs nu som `perBolagMonthly` och sägs i kundens text: *«Utöver licenserna betalar ni 449
kr/mån för bolagsgemensamma växeltjänster — de ingår inte i priset per användare.»*

## Fynd i granskningsvändan av mitt eget bygge

1. **`s[äa]te[nr]?` matchade «Säter»** — en svensk ort. «Växel Säter kontor» med antal 1 lästes som
   en användarlicens. Ett ortnamn som blir en nämnare är precis det modulen finns mot. RK-13.
2. **`deriveTelekomSeats` var död i produktion men exporterad och testad** — alltså såg den levande
   ut. Den var växelprisets gamla nämnare. **Raderad, inte dokumenterad:** att den låg kvar grön
   hade fått nästa läsare att återanvända den i god tro. RK-12 låser att modulen aldrig läser
   `seatCount` igen.
3. **Bolagsregeln låg före enhetsregeln** och klassade «Smart Connect växel med köhantering»
   (antal 20) — en per-användare-plan vars namn nämner en funktion — som bolagstjänst. Hela
   fakturan tystnade. SK-08: förbjud påståendet, aldrig ordet. RK-07.

**SK-08 slog till två gånger i samma pass.** RK-12:s första version förbjöd ordet `seatCount` och
fällde `seatCount: normalized.seats` — datapunktens **utdatafält**, alltså rätt beteende. Smalnad
till att förbjuda LÄSNING (`\.seatCount`), med motprov som kräver att utdatafältet finns kvar.

## Sju tester ändrades — och varför det inte är en anpassning

Alla sju delade en form: de matade `seatCount` medan växelraden saknade kvantitet — **indata
produktionen inte producerar.** Verkliga växelrader namnger sin enhet; mätt hos fyra oberoende
leverantörer: «50 användarlicenser» (Telenor), «Använd.» (Telia), «(22 anknytningar)» (Telavox),
«4 extra användare» (3). Indatan gjordes verklig; bevisen (hårdvara exkluderas, T2/T3-inferens,
bundlat pris suppimeras) står oförändrade.

**Ett utfall ändrades på riktigt:** 124,60 → 118,00 på pilotfakturan. «Svarsgrupp / Köhantering»
(297 kr, antal 3) är tre köer, inte tre personer. Utan den blir priset exakt T2-golvet — och
riktningen är den säkra: priset **sänks**, alltså minskar den påvisade överbetalningen.

## Sabotage

Nio riktningar, alla föll:

| # | Sabotage | Fällda |
|---|---|---|
| S1 | nämnaren tillbaka till SIM-antalet | 6 |
| S2 | fail-closed rivs — okända rader släpps igenom | RK-04 |
| S3 | bolagsavgiften tillbaka i täljaren | 5 |
| S4 | bråkdelsantal godtas som licensmängd | RK-09 |
| S5 | klumpsumma med antal 1 blir en licens | RK-01, RK-04, RK-08 |
| S6 | funktionsordet vinner över namngiven enhet | 5 |
| S7 | det övriga beloppet slutar bokföras | RK-05 |
| S8 | `seatCount` läses tillbaka in i modulen | RK-12 |
| S9 | ortnamnet blir en enhet igen | RK-13 |

Svit **2450/2450**.

## Uttalad blindfläck

- Modulen läser **radtext och kvantitetskolumn**. Den kan inte veta att «Molnväxel Bas» med antal
  12 egentligen är 12 anknytningar för 8 personer, och inte se en licens gömd i en bolagsrads pris.
  Den skiljer **läsbart från oläsbart** — aldrig sant från falskt.
- **Dubbelräkning av nämnaren** är möjlig om samma användare faktureras på två rader (baslicens +
  uppgradering). Då blir per-användare-priset för LÅGT, alltså åt det säkra hållet.
- En växelrad som bara namnger en funktion (utan enhet) tystar hela fakturan. Det är korrekt enligt
  mandatet, men det är en **kostnad**: sådana fakturor prissätts inte alls.

## Kvarstående, uttalat

De **4 lagrade `molnvaxel`-datapunkterna** i prisboken skrevs med den gamla semantiken
(`seats` = SIM-antal). De är få och cellen bär inte, men de bör mätas om innan molnväxel någonsin
får en levande kohort. Jag raderar dem inte på eget bevåg — radering är grundarens beslut.
