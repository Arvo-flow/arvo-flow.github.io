commits: 7fdbd0121bd91b47916242ceb2d0e61adce73a9b
dom: BLOCKERAR

# Första blicken på hårdvaru-PR:en (97cb9d27, X-1 och Å-1)

Domen: «Ni betalar idag» är rätt i byggarens fall, men samma ändring gör fakturavyns rubriktal, arvode och «Ni sparar»
för höga på en kombinerad faktura med en avbetalning typad `hardware` (H-1, gjort vanligare), och «Ni betalar idag»
blir fel där main var rätt när modellens projektion bär avbetalningen (H-2, infört). Båda är [KUND]. Blockerar.

Instrument: grenen på 7fdbd012 och main (b7b54b79) i en egen arbetskopia. Handlern genom FV-instrumentet
(`tests/fakturakedjan/kor.mjs`, `FAKTURAKEDJAN_SVAR=1`), med byggarens egna fall (HARDVARUFALL och
`rest·bb+mob+hw·ja`) och egna grannfall byggda som kloner av instrumentets fall. Fakturavyn renderad med
`CI=false npm run build` på båda träden och handlerns svar, 390 och 1600 px (Playwright). Sviten: `node tests/run.mjs`.

## Fynd

### H-1 · [KUND], gjort vanligare: rubriktalet, arvodet och «Ni sparar» räknar mobildelen som besparing

Fall: byggarens eget `rest·bb+mob+hw·ja` (bredband 699 + mobil 269 + «Delbetalning iPhone 15 Pro, månad 12 av 36»
449 kr typad `hardware`, per månad, modellens ja). Rekommendationen byter bara bredbandet: 8 388 → 3 828 kr/år,
brutto 4 560, netto 3 648, arvode 912. Fakturavyn på grenen (390 och 1600 px):
- «MÖJLIG NETTOBESPARING +6 230 kr», «11 616 → 3 828 kr/år hos Tele2 · Arvos besparingsarvode 1 558 kr (20 %)»,
- «Ni sparar 7 788 kr/år — Arvo tar 20 % av det», «10 776 kr ÷ 7 788 kr/år = 1,4 år»,
- och längre ner på samma sida, i e-postrutan: «MÖJLIG NETTOBESPARING +3 648 kr».

Analysmejlet, svarsmejlet och rummet (lagrad `net_saving`) säger +3 648 (avläst ur instrumentets mejl och rad).
Aktiveringsmejlet får vyns tal: klienten skickar `adjNetSaving`, `adjGrossSaving` och `adjArvoFee`
(src/pages/TestaFaktura/index.js:894-898). Det är läst i koden, inte kört.
Main på samma fall: +1 920, arvode 480, «Ni sparar 2 400». Det är också fel, men åt det försiktiga hållet.

Mekanismen: `adjGrossSaving = adjAnnualCost − suggestedAnnualCost` (lib/hardware-installments.js). Utan sekundär
besparing är målet bara bredbandsdelen (`_responseSuggested`, api/test-invoice.mjs:2158-2160), medan `adjAnnualCost`
nu är hela fakturans löpande del, så mobilens 3 228 kr/år räknas som besparing. Formen finns på main:
- `adv·hw100` (samma faktura med avbetalningen 100 kr): main +5 270, grenen +6 230, rätt 3 648;
- `hw·abonnemang·ja` (avbetalningen typad som abonnemang): +6 230 på båda.

PR:en tar bort avdraget som på main delvis tog ut felet. Därför övervärderas nu varje kombinerad faktura med en
`hardware`-avbetalning och utan sekundär besparing, med hela resten av fakturan. Mekanismen står i diffen
(`adjAnnualCost = annualCost − iArskostnaden`), alltså gjort vanligare. Riktningen är den farliga: arvodet i vyn
blir 1 558 kr där underlaget bär 912.

Samma jämförelse ger diagnosen «Ni betalar 203 % över verifierat publikt listpris» (main 63 %; bredbandsdelen är
119 %). På en kombinerad faktura utan hårdvara säger main redan 219 % (`rest·bb+mob+router·ja`, `lage.overMarketPct`).
Den delen är förexisterande.

Varför grönt:
- FV-A21 prövar `adjAnnualCost`, `hwAnnualCost`, `skuldenIArskostnaden`, `hardwareCharges` och fyndet, aldrig
  `adjGrossSaving`, `adjNetSaving` eller `adjArvoFee`.
- Renderingssonden prövar inte rubriktalet.
- FV:s aktiveringsmejl byggs av `recommendation`, inte av klientens justerade tal. Kommentaren i kor.mjs, «ingen
  mobilfaktura bär en», gäller inte HARDVARUFALL, som är bredbandsfakturor med justering.

Sabotage S10 lägger +1 000/+800/+200 på justeringens brutto, netto och arvode i handlern när den sekundära
besparingen saknas. Genom handlern ändras `adjNetSaving` för `rest·bb+mob+hw·ja` från 6 230 till 7 030. 0 av 2 787
tester föll.

### H-2 · [KUND], infört: «Ni betalar idag» bär avbetalningen och säger «Exkl.» när modellens projektion bär den

Fall `adv·projAI`: `rest·bb+mob+hw·ja` med modellens `projectedRecurringAmount` 1 417 (= 699 + 269 + 449). Loggen
säger «[projektionskrav] SKUGGA: AI-projektion 1417 avviker 46.4 % från radsumman 968», och `annualCost` blir
17 004. Justeringen drar av på radens typ, inte på vad årskostnaden bar.
- Grenen: «NI BETALAR IDAG 17 004 kr / år · Abonnemang och licenser. Exkl. hårdvaruavbetalningar
  (5 388 kr/år).» Vyn säger också «Hårdvaruskulden (10 776 kr) ingår inte i jämförelsen.», «+10 541 kr»,
  «Arvos besparingsarvode 2 635 kr» och «344 % över». Talet bär avbetalningen och meningen säger motsatsen.
- Main på samma fall: «Ni betalar idag 11 616 kr», som är rätt, och +6 230 (H-1:s form).

Påstående (1) är alltså falskt här: årskostnaden bar avbetalningen, och den drogs inte av. Omätt är hur ofta
modellen lägger en `hardware`-rad i projektionen trots prompten («sätt samma värde som summan av
recurring_subscription-rader»), och om `PROJEKTIONSKRAV_ENFORCE` är satt i produktion
(ops/GRANSKNING-t2-licenstaket-attonde.md:213: inte känt). Mekanismen står i diffen, så fyndet räknas som infört.

### H-3 · [KUND], förexisterande, inom PR:ens syfte: en delbetalning med fel radtyp heter fortfarande engångsbelopp

Fall `adv·otf-kvartal`: `hw·kvartal·ja` med delbetalningen typad `one_time_fee`.
- Fyndkortet: «Hårdvaruavbetalning på en löpande rad · 1 347 kr · engångsbelopp».
- Vyns «Inkl. …» säger «engångskostnader» (`hardwareCharges` 0).
- Samma svar har en justering som känner igen raden, «24 månader kvar» (`hardwareAdjustment.items`).

Med typen `variable_usage` (`adv·rorlig`) säger uppdelningen i rummet «engångs eller rörlig», och noten säger
«Poster som inte återkommer varje …». Det beror på att `harHardvara` och `spec` läser typen (lib/fakturarader.js:78).
Main säger samma sak, så felet är förexisterande. Det är dock just Å-1:s mening, och påstående (2) («en hårdvarurad
kallas aldrig engångsbelopp») gäller bara för radtypen `hardware`. Detektorerna (`AMORT_RE`, `INSTALLMENT_RX`) läser
beskrivningen. Fyndet blockerar inte ensamt enligt kriteriet, men det ska lagas i samma ombyggnad eller loggas,
och påståendet ska smalnas av.

### H-4 · [VAKT]: nio sabotage mot det PR:en lagar fällde noll tester

Varje sabotage skrevs med `assert s.count(old) == 1`, mot hela sviten, och återställdes från en sparad kopia.

| ID | Sabotage | Fällda | Beteendet ändras (avläst) |
|---|---|---|---|
| S1 | `fyndArstal = true` (Portfolio) | 0 av 2 787 | mains rendering: «– kr/år», «Vi fångade en kostnad» saknas |
| S2 | `'hårdvara'` → `'engångskostnader'` i «Inkl. …» | 0 | mains vy: «engångskostnader» står i vyn |
| S3 | båda skuldmeningarna villkoras på `true` | 0 | mains vy: «absorberar er hårdvaruskuld» på `hw·kvartal·ja` |
| S4 | `hardwareCharges` bort ur monitoring-, no_benchmark- och elsvaret | 0 | läst: vyns rad `Inkl.` renderas för review_queue och faller då till «engångskostnader»; inte kört |
| S5 | `hardwareCharges` bort ur `BELOPPSFALT` | 0 | `adv·eur`: `hardwareCharges` 39 (EUR) mot `oneTimeFees` 410 (SEK); vyn skulle säga «engångskostnader och hårdvara» |
| S6 | faktorn ur `recurringAmount` i stället för projektionen | 0 | `adv·prorata`: `hwAnnualCost` 6 735 i stället för 5 388, «561 kr/mån» |
| S7 | uppdelningens `r.spec` ignoreras i vyn | 0 | mains rendering: «engångs eller rörlig» |
| S8 | räknaren visar årstalet även utan årstal | 0 | mains rendering: räknaren «1 347 kr på en faktura» saknas |
| S10 | se H-1 | 0 | `adjNetSaving` 6 230 → 7 030 |

Renderingssonden `scripts/screenshot-hardvara.mjs` fångar S1, S2, S3, S7 och S8. Den kördes grön på grenen och röd
på main, men den ingår inte i sviten.

Motprov: byggarens egna sabotage B1 (alla avbetalningar dras av igen) och B2 (skulden räknas alltid som inräknad)
fällde 5 respektive 3 tester, som commitmeddelandet säger.

### H-5 · [VAKT]: Portfolio citerar ett test som inte finns, och påståendevakten kan inte se det

src/pages/Portfolio/index.js:772 säger «(RS-Å1 i tests/rumsredovisning.mjs)». Inget test har den titeln (grep i
`tests/`: bara kommentaren själv). `citeradeTestId` i lib/pastaendevakt.js läser inte «Å». En diff som citerar både
«RS-Å1» och «RS-11» ger `["RS-11"]`. Rummets dom utan årstal bärs alltså bara av renderingssonden (S1 ovan).

### Förexisterande, utanför PR:en (loggas i arbetsordern, blockerar inte)

- **[KUND] Fynd på en utländsk faktura visar originalvalutan som «kr».** `adv·eur` (bredband 61, mobil 24 och
  delbetalning 39, alla i EUR) ger fyndkortet «39 kr · på fakturan». Main ger «39 kr · engångsbelopp». Raden är
  410 kr. Forensiken räknas på rad 787 och valutaomräkningen sker på rad 887 (api/test-invoice.mjs). PR:en byter
  bara enhetsordet. Jag hittade ingen post om felet i ops/ARBETSORDER-VAG1.md eller ops/KORPLAN-VAG1.md.
- **[KUND] En «Avbetalning …, månad X av Y» typad som abonnemang känns inte igen som avbetalning.**
  `detectHardwareInstallments` kräver typen `hardware` eller ordet «delbetalning». För `adv·avbetalning-abonnemang`
  räknar besparingen därför skulden som besparing: brutto 9 948, varav avbetalningen är 5 388. Mejl och vy säger
  +7 958. Main ger samma tal. PR:en rör inte predikatet.
- **[KUND] Det lagrade fyndets «engångsbelopp» står kvar när raden saknar `line_items_json`.**
  `refineFinding` räknar bara om när `lineItems` är en lista (lib/forensics.js:306). Hur många sådana rader som
  finns i produktion är inte mätt.

## Det som håller (avläst)

- Sviten på 7fdbd012: 2 787 tester, `# fail 0`, `# cancelled 0`.
- `hw·kvartal·ja` (bara bredband, avbetalningen per kvartal), renderat:
  - Grenen: «Ni betalar idag 8 388 kr», «Exkl. hårdvaruavbetalningar (5 388 kr/år)», «+3 648 kr»,
    «8 388 → 3 828», «119 % över» och «Hårdvaruskulden (10 776 kr) ingår inte i jämförelsen». Allt är rätt och
    stämmer med rekommendationen och mejlen.
  - Main: «+0 kr», «0 → 3 828», «Exkl. hårdvaruavbetalningar (16 164 kr/år)» och skuldmeningen med 3 648. X-1:s
    period- och avdragsdel är alltså lagad.
- `rest·bb+mob+hw·ja`: «Ni betalar idag 11 616 kr» (main 6 228), «Inkl. 449 kr hårdvara», fyndet
  «449 kr · på fakturan». Byggarens renderingssond är grön på grenen och röd på main.
- `hw·abonnemang·ja`: «Om Tele2 absorberar er hårdvaruskuld … 7 958 kr/år» stämmer.
  9 948 = 5 388 (avbetalningen) + 4 560 (bredbandet).
- Blandat (`adv·blandad`): bara abonnemangsraden dras av (`adjAnnualCost` 11 616), `skuldenIArskostnaden` är false
  och skuldlöftet står inte.
- EUR (`adv·eur`): `hardwareCharges` räknas om (410 = `oneTimeFees` 410), och `hwAnnualCost` är 4 920 kr.
- Planvalskategorin (`adv·mobil-hw`): ingen justering, inget byte, och fyndet säger «1 347 kr · på fakturan».
- Kastet på ett glömt `projectedRecurringAmount` nås inte i produktionen. Den enda anroparen
  (api/test-invoice.mjs:2161) skickar fältet, och `aggregateLineItems` sätter det alltid.
