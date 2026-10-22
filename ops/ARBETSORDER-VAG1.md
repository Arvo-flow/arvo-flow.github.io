# Arbetsorder: vägen till våg 1 (CTO-mandatet, 22 okt)

Grundaren gav 22 okt ett totalt CTO-mandat (CLAUDE.md, överst). Det här är körplanen. Den fortsätter
`ops/ARBETSORDER-LANSERING.md`, vars punkter 1, 2, 3 och 5 är klara. Varje steg är en egen fokuserad
PR som mergas genom Grinden. En uppgift och en granskningslins körs i taget.

## Läge

| Steg | Innehåll | Läge |
|---|---|---|
| a | PR #86: Tele2 +40 kr, en prisbok (majtabellen och seedarna bort), vakter framåt | K-1 lagat; granskningen av lagningen BLOCKERAR (L-1), lagat med L-2–L-7 i samma PR |
| b | Databas och skript: majraderna i `supplier_prices` bort, död skrivning i `scripts/apply-price-proposals.mjs` bort | efter merge och deploy av a |
| c | Kunddelen: mobilscoren, dörrens kort, LA-K1, det frysta golvet i rummet (K-5) | efter b |
| d | Arbetsorderns punkt 4: live-verifiering och rummet i 390 och 1600 px | efter c |

## Förexisterande fynd, loggade enligt avgränsningen 22 okt

Ur andra blicken på uppföljningen (`ops/GRANSKNING-ssot-tele2.md`). Inget av dem blockerar PR #86.
Var och en byggs i en egen PR, med egen granskning.

- **V-1 · Standard 500 i Östersund: 399 i källan, 455 i boken. Stängt.** Talet når ingen kundtext
  (avläst med motprov). Nästa körning, 39768127034 på da9e24f0, gav 18 av 18 gröna, och Standard 500
  i Östersund stod åter på 455. Svaret 22 okt 10:06 var tillfälligt. Vakten skriver nu hela erbjudandet
  per adress (NV-10), så nästa avvikelse går att läsa.
- **Granskningen av lagningen (`ops/GRANSKNING-ssot-tele2-lagningen.md`):** L-1 (Basic-årssumman under
  taket) är lagat med ett nivåberoende tak. L-2 (Googles «30–40 % billigare») och L-3 (rummets
  «aldrig en nedgradering») är lagade i samma PR, eftersom de sitter i det kort PR:en skrev om. BI-14
  låser alla `real-public`-alternativ mot sin bok, och KM-05 spärrar matchningslöftet. L-4–L-7
  ([VAKT]) är lagade.
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
- **Historiken i `supplier_price_history`** (probe-undersokning 39760703487): 2 rader, båda
  «backfill-verified». «Microsoft 365 Business Standard 12,50 → 14,00, 2022-03-01» prövas mot
  prisarkeologin och raderas om källan inte bär den. Raden null → null raderas. Ingen av dem når
  rummet i dag: prognosen kräver tre höjningar, och rörelsen kräver en höjning inom sex månader.
  Steg b.

## Steg b, avläst underlag (22 okt)

`probe-undersokning` (39760703487, main 25682b28): 46 rader i `supplier_prices` står som aktuella,
alla med `last_verified` i maj. Det är exakt seedblocket som PR #86 tar bort ur repot. Ingen tabell
pekar på `supplier_prices`. Att markera raderna som inaktuella kan krocka med det unika indexet
(leverantör, produkt, nivå, is_current), så raderna raderas. Efter PR #86 läser ingen kundväg tabellen.
Skrivaren som finns kvar är `scripts/apply-price-proposals.mjs`, och den tas bort i samma steg.
