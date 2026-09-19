# Dom · går ett branschankare att härleda för molnväxel?

**Fråga (grundarorder 2026-09-19):** går det att härleda ett säkert prisgolv ur
`teliaVerified.tiers`, så att «den kollektiva sanningen» kan visas för molnväxel i Rummet?

**Svar: NEJ — men inte av det skäl frågan förutsätter.**

> **Golvet går att härleda. Jämförelsen gör det inte.**
> Det är inte samma fråga, och skillnaden är hela domen.

---

## 1 · Golvet är sunt, och det är mätt

`teliaVerified.tiers.T1.fromMonthly = 89` kr/användare/mån exkl moms (momsbas bekräftad
2026-06-18, `lastVerified` 2026-08-31). × 12 = **1 068 kr/användare/år**. Aritmetiken är exakt och
enheten är LÄST ur prisbokens egen not («Molnväxel per användare/mån»), inte gissad.

**Oberoende bekräftelse:** Telenors One Talk-licens på fixturen `telenor-molnvaxel-stor.pdf` kostar
också **89 kr**. Två leverantörer, samma listpris — golvet är ingen Telia-egenhet.

## 2 · En median går INTE att härleda

T1 (89) och T2 (118) är två nivåer hos **en** leverantör, inte två marknadsobservationer. Och T3
(Kontaktcenter) är **offertprissatt — inget publicerat pris**. Det publicerade spannet är alltså
**kapat uppåt**: vi ser de två billigaste nivåerna och inte den dyra.

En «median» över {89, 118} vore medianen av de två billigaste nivåerna, presenterad som vad
marknaden betalar. Den är systematiskt för låg — vilket **ökar den påvisade överbetalningen och
därmed vårt eget arvode**. Regel 3 känner ingen avvägning, och allra minst när felet pekar åt vårt
håll (18 augusti). Den ärliga formen vore `loneadmin`:s: `median = p25`, «en verifierad leverantör =
ingen fördelning att visa».

## 3 · Men ankaret får ändå inte tändas — och det är MÄTT, inte tyckt

`buildBranchAnchors` parar golvet med två tal som **båda är fel för den här kategorin**:

| Operand | Vad ankaret använder | Vad det borde vara |
|---|---|---|
| Täljare | `annual_cost` = HELA den kombinerade fakturan | bara växelraderna |
| Nämnare | `seat_count` = **SIM-kort (45)** | växellicenser (**50**) |

`extract.js` sätter SIM-antalet **med flit**: *«benchmark is on mobile subscriptions, not
switchboard capacity»*. Och båda molnväxelfixturerna i repot är **kombinerade** fakturor
(`telenor-molnvaxel-stor`, `tre-mobil-molnvaxel`). Det är inte ett kantfall — det är kategorins form.

**Kört genom produktionens egna funktioner (`byggPrisunderlag` + `scoreUrUnderlag`), på en kund som
betalar EXAKT Telias verifierade listpris, på kronan:**

| Operandpar | `perEnhet` | avstånd | Arvo Score | Vad rummet hade sagt |
|---|---|---|---|---|
| Ankarets (hela fakturan ÷ SIM) | 6 096 | **+471 %** | **15** | «SÄMRE ÄN MARKNADEN» |
| Rätt (växelrader ÷ licenser) | **1 068** | 0 % | **88** | ligger på golvet |

**Samma golv, samma kund, 73 poängs skillnad.** Det är E3/E5-falsklarmet (20 augusti) och «kundens
40-SIM-total mot en kohort vars enhetsantal ingen normaliserat» (21 augusti) samtidigt.

## 4 · Och det hade inte bara träffat kortet

`getPublicListBenchmark` har fler konsumenter än `buildBranchAnchors`: `recommend.js`
(`publiktGolv`, bytesgolvet) och `lib/prisunderlag.js` → **scoren**. Att lägga en matris i prisboken
hade tänt scoren också. 19 augusti-regeln: *en läsväg som ger fel sorts tal är inte lagad förrän
varje konsument är inventerad.* Därför är MG-04 fail-closed på BÅDA: ingen allowlist-post OCH ingen
matris.

## Maskinvakt

`tests/molnvaxelgolvet.mjs` (MG-01..05). MG-03 **bevisar** domen genom att köra produktionens egna
funktioner i stället för att påstå den — så nästa läsare som vill tända ankaret får se talen, inte
en åsikt. Sabotage-bevisad i sex riktningar:

| # | Sabotage | Fällda |
|---|---|---|
| S1 | `molnvaxel` läggs i enhets-allowlistan (det ordern bad om) | MG-04 |
| S2 | prisboken får en matris (`getPublicListBenchmark` går från `null` → `p25=1068`) | MG-04 |
| S3 | golvet ändras tyst (89 → 75) | MG-01 |
| S4 | T3 ges ett påhittat listpris | MG-02 |
| S5 | momsbasen tas bort | MG-01 |
| S6 | motprovet rivs — `mobil` ur allowlistan | MG-05 |

**S2 var först en no-op:** sabotaget lade till en NY kategori i stället för en matris på
`molnvaxel`. Strängen ändrades, beteendet inte, och noll test föll. Omskrivet så att
`getPublicListBenchmark` bevisligen ändrar svar — 8 september-regeln: *fråga inte bara om strängen
byttes, utan om BETEENDET gjorde det.*

## ⚠️ Öppet fynd som hittades på vägen — INTE lagat

**`molnvaxel`-kortet i `/testa-faktura` visar ett per-användare-tal som inte står på fakturan, och
på T1-nivå ger det ett falsklarm.**

`normalizeTelekomInvoice` isolerar korrekt växelraderna, men dividerar med `deriveTelekomSeats`, som
ärver `seatCount` = **SIM-antalet**. Mätt på `telenor-molnvaxel-stor`:

- Visat: `perUserMonthlyExVat = 108,87` kr — **finns inte på pappret**.
- Sant: 4 450 / 50 licenser = **89,00** kr = exakt golvet.
- I detta fall räddas utfallet av nivåinferensen (IVR-raden ger T2, golv 118 → kunden läses som
  under listpris).
- **Men tas IVR-raden bort blir nivån T1, golv 89, och samma kund visas som +11,1 % över.**
  Riktningen är mot vårt eget arvode.

Talet når kundytan: `src/pages/TestaFaktura/index.js:2448` ritar `perUserMonthlyExVat` mot
`teliaFloor`. **Och vägen dit öppnade jag själv i går** — före fingeravtrycksfixen blockerades varje
telco-molnväxelfaktura av `fingerprint_mismatch`. 22 augusti-regeln gäller: *en fix som gör ett
gammalt redovisningsfel vanligare måste stänga det också.*

Jag lagar det inte på volley, av samma skäl som gäller ankaret: rätt nämnare är «antal
växel-LICENSrader», och en faktura kan blanda per-användare-rader (50 licenser à 89) med
per-BOLAG-rader (Reception 449 kr × 1). Att skilja dem kräver en ny radklassning, inte en
omskriven division — och en gissad nämnare är precis det den här domen avvisar.

**Rekommenderad ordning:** (1) klassa växelrader som per-användare eller per-bolag, (2) fail-closed
när licensantalet inte går att läsa — hellre tyst än ett tal som inte står på pappret, (3) först
därefter är frågan om ett branschankare för molnväxel meningsfull igen.
