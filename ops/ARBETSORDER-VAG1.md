# Arbetsorder: vägen till våg 1 (CTO-mandatet, 22 okt)

Grundaren gav 22 okt ett totalt CTO-mandat (CLAUDE.md, överst). Det här är körplanen. Den fortsätter
`ops/ARBETSORDER-LANSERING.md`, vars punkter 1, 2, 3 och 5 är klara. Varje steg är en egen fokuserad
PR som mergas genom Grinden. En uppgift och en granskningslins körs i taget.

## Läge

| Steg | Innehåll | Läge |
|---|---|---|
| a | PR #86: Tele2 +40 kr, en prisbok (majtabellen och seedarna bort), vakter framåt | mergad 23 okt (5e73c277) efter fem granskningsvarv |
| b | Databas och skript: majraderna i `supplier_prices` bort, död skrivning i `scripts/apply-price-proposals.mjs` bort | mergad 23 okt (PR #87, 4f8f2326). Körd på main 23 okt (40352850116): `supplier_prices` 46 → 0 rader, historiken 2 → 1 |
| T-2 | Licenstaket per nivårad, mains tak per plats kvar | egen PR, se T-2 nedan |
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
  taket) fångas i PR #86 av mains tröskel, inte av ett nivåberoende tak (LT-02). L-2 (Googles «30–40 %
  billigare») och L-3 (rummets «aldrig en nedgradering») är lagade, eftersom de satt i det kort PR:en
  skrev om. BI-14 låser alla `real-public`-alternativ mot sin bok, och KM-05 spärrar matchningslöftet.
  L-4–L-7 ([VAKT]) är lagade.
- **Tredje och fjärde granskningen (`-tredje.md`, `-fjarde.md`):** varje försök att härleda licenstaket
  ur prisboken gjorde ett fel vanligare. Ett tak per faktura på pris per plats, som bär tilläggen, kan
  inte skilja tillägg från en årssumma (L-1, T-1, F4-1). I PR #86 har prövningen därför exakt mains
  beteende (0 skillnader mot main i 10 miljoner anrop, femte granskningen). LT-01..04 låser trösklarna,
  inte namnuppslaget (F5-1). T-8 är lagat. T-5, T-6 och NV-03-delen av T-7 är skärpta men inte stängda:
  F4-3 (BI-14 är fortfarande en ordlista), F4-4 (KM-05 släpper «matchar er nivå — ingen nedgradering»)
  och F4-5 (NV-03 jämför två fält i samma objekt). De är [VAKT] och lagas framåt, med F5-1 (namnuppslaget
  olåst), F5-2 (vägen från anomali till `review_queue` oprövad) och F5-3 (kvartalssumman saknas i
  modulhuvudets BLIND).
- **T-2 · Licenstaket når nästan aldrig en riktig faktura. [KUND], förexisterande. Byggd i T-2-PR:en.**
  `lib/supplier-price-intel.js` gör två prövningar, och fakturan går till granskning om någon slår till.
  (1) Mains tak per plats, oförändrat och alltid (765,70 · 468 · 908,70 på mains exakta namn). (2) Ovanpå,
  bara i kategorin `saas-productivity`: varje löpande nivårad med antal mot sin egen nivå i prisboken.
  Över 2 × nivåns listpris per licens och månad går fakturan till granskning, oavsett leverantörsnamn.
  Priset är belopp ÷ antal, samma tal som kundens årskostnad. Eftersom (1) är mains fångar prövningen allt
  main fångade. Svepet mot main (LT-06, 407 568 fall: Microsofts licensfakturor med olika antal per rad,
  platser räknade på två sätt, produkter utanför boken, felläst projektion och antal, rader utan antal,
  Adobe med flera produkter, paketfakturor i sina kategorier, och Microsofts rader i kategorier utan
  radprövning): main hade rätt i 170 144, den nya prövningen i 222 372, och **noll** fall där main hade
  rätt och den nya fel. Utanför `saas-productivity` är utfallet mains, fall för fall.
  **Tre försök föll först**, alla i granskning eller i en omkörning av en död granskares anteckningar:
  - 2ac67b6e höjde taken per plats och prissatte Office 365 E3 och Adobe-produkter lästa som kvartalssumma
    (`ops/GRANSKNING-t2-licenstaket.md`, T2-1).
  - ec21e155 hoppade över taket när varje rad var en prövad nivårad och prissatte en projektion läst ×12
    och ett halverat antal (LT-09). Granskaren dog på sessionsgränsen.
  - ea56bf42 körde radprövningen i varje kategori och skickade korrekta paketfakturor till granskning med
    fel skäl, och prövade en rad utan antal på à-priset (`ops/GRANSKNING-t2-licenstaket-lagningen.md`,
    L-1, L-3). Samma rutnät ger 96 försämringar mot ea56bf42.
  Lagat i samma PR: fakturavyn har ett eget besked för `price_anomaly` (L-2: «Vi stoppade prissättningen»
  i stället för «vår algoritm är inte tillräckligt säker på klassificeringen»), renderat i 390 och 1600 px
  med motprov (`scripts/screenshot-prisavvikelse.mjs`); T2-2; T2-4; T2-5; T2-6; L-4; F5-1; F5-3; T-4.
  **Kvar, [KUND], förexisterande och inte vanligare:**
  - **Microsoft 365 E5 på månadsfakturering (769,42) och Adobe Creative Cloud Pro till listpris (985) går
    till granskning, som på main.** Ett tak per plats kan inte skilja dem från fel med samma tal. E5 kan
    prissättas först när projektionen och platsantalet prövas mot raderna (projektionskravet, som står i
    skugga). Adobe kräver en radläsare per Adobe-produkt; `detectAdobePlan` gissar en plan per faktura.
  - **F4-2:** «Microsoft 365 Business Basic EES (exkl. Teams)» läses inte som nivå, och en årssumma
    därav under mains tröskel (619,32 och 743,16) prissätts, som på main. Stängs när boken bär EES-priserna.
  - Ett tillägg läst som kvartals- eller årssumma hos en leverantör vars namn mains uppslag inte känner
    prissätts, som på main. Tilläggen saknar listpris i boken.
  - Fakturavyns generiska granskningstext («våra modeller är oense», «Koppla Fortnox / Visma») står kvar
    för de andra skälen. Den gäller inte `price_anomaly` längre.
  **Kvar, [VAKT]:** F5-2 och L-5: vägen från anomali till `review_queue`, och att anropet körs utan mains
  gamla villkor, prövas inte genom handlern.
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
- **Historiken i `supplier_price_history`:** 2022-raden är raderad (steg b). 2026-raden läses i ett
  eget pass, se steg b nedan.
- **Tele2 bredband, 26 okt: Max-familjen −40 kr igen, bekräftat i två avläsningar** (verify-sources
  40352730578 kl. 15:47, alla tre adresser: 199/239/279/279 med 12 månaders bindning). Det är tredje
  svängningen på tio veckor: −40 den 18 aug, +40 den 19–21 okt, −40 den 26 okt. Boken står på
  239/279/319/319. Riktningen är den försiktiga: boken ligger över källan, så en besparing mot Tele2
  blir mindre, aldrig större. Innan boken följer källan prövas om Tele2:s API märker priset som
  kampanj. Bibelns regel från HubSpot gäller: det högsta priset i ett block är listpriset, och en
  kampanj kan bara ligga under. Följer boken varje svängning blir det 55 fixturer per kampanj.

## Steg b, avläst underlag (22 okt)

`probe-undersokning` (39760703487, main 25682b28): 46 rader i `supplier_prices` står som aktuella,
alla med `last_verified` i maj. Det är exakt seedblocket som PR #86 tar bort ur repot. Ingen tabell
pekar på `supplier_prices`. Att markera raderna som inaktuella kan krocka med det unika indexet
(leverantör, produkt, nivå, is_current), så raderna raderas. Efter PR #86 läser ingen kundväg tabellen.
Skrivaren som finns kvar är `scripts/apply-price-proposals.mjs`, och den tas bort i samma steg.

## Steg b, utfört underlag (23 okt)

- **Historikraden från 2022 är falsk.** «Microsoft 365 Business Standard 12,50 → 14,00, 2022-03-01»
  hänvisar till Microsofts post 2021-08-19. Avläst 23 okt listar posten sex produkter (Business Basic,
  Business Premium, Office 365 E1, E3 och E5, Microsoft 365 E3) och inte Business Standard. Raden är
  struken ur `scripts/seed-price-history.mjs` och raderas ur produktionen av `stada-prisdata`.
- **2026-raden ($150 → $168 per år, 2026-07-01) är obekräftad.** Postens priser står i en bild som
  textläsningen inte ser. Raden når ingen kund i dag: prognosen kräver tre höjningar. Den läses mot
  Microsofts planprislista i ett eget pass. Den hör inte till licensprövningen och togs därför inte
  med i T-2-PR:en.
- **`lib/price-db.js`:** `upsertPrice` och fem läsare utan anropare är borttagna i T-2-PR:en (SS-03).
  Ingen kod i `lib/` frågar längre `supplier_prices`.

