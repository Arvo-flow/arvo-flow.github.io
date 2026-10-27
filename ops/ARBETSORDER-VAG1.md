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
  `lib/supplier-price-intel.js` gör nu två prövningar. (1) Varje nivårad (radensNiva) prövas mot sin
  egen nivå i prisboken: över 2 × nivåns listpris per licens och månad går fakturan till granskning,
  oavsett leverantörsnamn. (2) Mains tak per plats står kvar på mains exakta namn, med två tak ur
  prisboken i stället för majtabellens: Microsoft 769,42 (E5 vid månadsfakturering) och Adobe
  1 083,50 (1,10 × 985). Svepet mot main (LT-06, 1 986 fall): main hade rätt i 1 266, den nya
  prövningen i 1 460, och **noll** fall där main hade rätt och den nya fel. Två vägar föll i svepet
  innan dess: ett tak per plats nycklat på varumärket (20 korrekta E3- och E5-fakturor från det
  juridiska namnet till granskning), och ett eget tak per tilläggsrad (24 tillägg lästa som kvartals-
  eller årssumma släpptes, som main fångar). Varumärkesnyckeln ur arbetsordern byggdes alltså inte:
  det juridiska namnet nås nu genom nivåraderna, inte genom namnet. Lagat i samma PR: E5 769,42 och
  Adobe 985 prissätts; F4-2 (Basic EES-årssumma) går till granskning när nivån står i radtexten;
  F5-1 (LT-07 låser namnuppslaget); F5-3 (kvartalssumman står i BLIND); T-4 (indata är en ren
  funktion, `prisprovningensIndata`, som test-invoice och LT-04 anropar).
  **Kvar, [VAKT]:** F5-2, vägen från anomali till `review_queue`, prövas fortfarande inte genom handlern.
  **Kvar, [KUND], förexisterande och inte vanligare:** ett tillägg läst som kvartals- eller årssumma
  på en faktura vars leverantörsnamn mains uppslag inte känner, och en nivåsumma utan nivå i
  radtexten. Båda släpps på main också (LT-06, «båda fel»). Tilläggen saknar listpris i prisboken,
  och utan det går de inte att pröva per rad.
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

