commits: f1f17f6066196accc7492294b5949634f5dbdc5e
dom: BLOCKERAR

# Femtonde blicken på S1 (f1f17f60), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins15/…` är kataloger i sessionens scratchpad. Kontots sessionsgräns slog till mitt i;
varje mätning som inte var bokförd i den här filen före avbrottet är omkörd innan den räknas (`lins15/alla.sh`).

**Dom: BLOCKERAR**, på en [KUND] som S1 gör vanligare:
- **Å-1**: på en kombinerad mobilfaktura per kvartal med en avbetalning typad `hardware` skriver fyndkortet i fakturavyn
  och rummet «Hårdvaruavbetalning på en löpande rad · 1 347 kr · engångsbelopp» om «Delbetalning iPhone 15 Pro, månad
  12 av 36», och rummets dom «Vi fångade – kr/år». Formen finns på main för månads- och årsfakturor; main höll
  kvartalsfakturan i granskning (`sanity_check_failed`), och planvalsgrinden släpper den `auto`, samma mekanism som
  gjorde Y-1 och Z-2 blockerande.

En [VAKT] mergas och lagas framåt: Z-1:s lagning fäller bara ett tal efter en etikett som slutar med kolon; P bakom
etiketten utan kolon fälls varken av sviten (0 av 2 776) eller av renderingssonden (Å-2).

Det som håller: strykningen gör vad den säger. Inget tal per abonnemang och inget annat tal om mobildelens pris står på
någon av 76 renderade rumssidor och 56 fakturavyer med en mobilrad, rummets dom, poäng, räknare och möjliga
nettobesparing är oförändrade i 1 848 rum, ingen icke-mobil rad ändrades, och ingen mobilfaktura fick ett byte, en
besparing, ett procenttal eller en poäng.

## Iakttagelser

- Utcheckat på grenens spets f1f17f60 (FETCH_HEAD), alltså den granskade commiten själv. Main är 703dbb34
  (`git worktree add` till `lins15/main`).
- f1f17f60 ändrar i kod en rad i `underlagForRad` (api/invoice-history.mjs:420): ingen `byggPrisunderlag` i en
  kategori med `bytesmalMotKategorigolv`. Resten är tester (FV-A19, RM-R8, MS-01/03/04/08), fallet Q3 i
  tests/fakturakedjan/fall.mjs, renderingssonderna, CLAUDE.md och ops/.
- Sviten utan sabotage: 2 776 av 2 776 gröna, 0 fail, 0 cancelled (`lins15/svit0.txt`).
- Instrument: den fjortonde linsens körare, stubbar, generator och renderare kopierade till `lins15/`, pekade om till
  den här worktreen, `lins15/main` (703dbb34) och `lins15/foralder` (dbfca75a, den granskade commitens förälder), så
  att f1f17f60:s egen ändring kan läsas isolerad.
- Mängderna R (34 fall), Q (12) och FV-A18:s fyra fall genom grenens, förälderns och mains handler med rummets fulla
  svar (`lins15/korbada.sh`, `lins15/korfor.sh`). Djupjämförelse gren mot förälder (`lins15/djup.mjs`): de enda
  skillnaderna utöver `pdf_hash` och `analyzedAt` är mobilradens `prisunderlag`, `lage.kod`, `motivering`, `marke`
  och `harUnderlag` (20 av R:s 24 mobilfall, 10 av Q:s, 4 av 4 i FV-A18). Svaret, raden, mejlen, läget, fyndet och
  rummets dom är oförändrade.
- Rummatris (`lins15/rummatris.mjs`, 1 848 rum: åtta radtyper, däribland en kombinerad mobilrad, M365 med en nivå,
  med två nivåer och utan läsbar nivå, bredband, el och lön, i auto och bevakat, med och utan antal, byte och
  netto, enskilt, i par och i trior) med grenens och förälderns egna funktioner (`lins15/rmdiff.mjs`): **0 skillnader
  i rummets läge** (dom, poäng, ställning, räknare, `ovissa`, `totalSaving`, byten, kort). Skillnaderna är bara på
  mobilrader i `auto` (444): kod `oviss_niva` → `omatt`, märket «Nivå ej bekräftad» → «Mottagen», och `perEnhet`,
  `golv`, `unitLabel`, `referensProdukt` → null. Ingen icke-mobil rad ändrades, och `arPrissatt`, `utanDom`,
  `bytetUndanhallet` och `lagratByte` är lika på varje rad.
- Rummet renderat ur grenens bygge (`npm run build` på f1f17f60, `/portfolio`, 390 och 1600 px, raden öppnad,
  `lins15/rendrum.mjs`) för alla fall i R, Q och FV-A18: 76 sidor med en mobilrad. Sökaren `lins15/perabbtext.mjs`
  letar efter årskostnaden delad med antalet abonnemang (år och månad), mobildelens kostnad per abonnemang (år och
  månad), P, `pricePerSeatMonthly` och orden «per abonnemang», «per enhet»: **0 träffar** (`lins15/rumr-gren/`,
  `rumq-gren/`, `rumfv18-gren/`). Motprov: samma sökare på den fjortonde linsens rendering av förälderns bygge
  (`lins14/fv18r-gren/`) ger träff på 8 av 8 sidor («5 027», «3 228», «per abonnemang»), och årskostnaden syns på 68
  av 76 sidor här (de åtta övriga är `one_time`, där årskostnaden är 0).
- Fakturavyn renderad ur grenens bygge för R:s 24 mobilfall och FV-A18:s fyra (`lins15/rq.sh`, `render3.mjs`, «Hur vi
  räknar» öppnat): samma sökare, 0 träffar på 48 + 8 sidor. Fem flerradsrum (mobil ensam, med lagrat byte, med M365,
  med M365 utan nivå och bredbandsbyte, med bredbandsbyte; `lins15/rumsvar.mjs`, `flerrum-r/`): inget tal per
  abonnemang, och mobilraden skriver planvalsmeningen.

## Fynd

### Å-1 · [KUND], förexisterande och vanligare: «1 347 kr · engångsbelopp» på en delbetalning som löper i 36 månader, på kombinerade kvartalsfakturor som main höll i granskning

Uppdraget frågar om ett annat tal om fakturans delar står kvar på en planvalsfaktura. På en kombinerad mobilfaktura
med en avbetalning typad `hardware` («Delbetalning iPhone 15 Pro, månad 12 av 36») skriver fyndkortet i fakturavyn och
i rummet «Hårdvaruavbetalning på en löpande rad · 1 347 kr · engångsbelopp». Raden är en månadsavbetalning (449 kr i
månaden, fakturerad per kvartal), alltså inget engångsbelopp, och kortets egen rubrik säger «på en löpande rad».
Ordet kommer ur lib/forensics.js:242: en rad vars typ inte är löpande får «engångsbelopp», och `hardware` är inte
löpande. Rummets dom ovanför säger samtidigt «Vi fångade – kr/år värt att åtgärda på era fakturor» och «Fångad kostnad
– kr per år», ett årsbelopp med ett streck i stället för talet.

Avläst genom handlern (`lins15/engang.mjs`, `lins15/skal.mjs`) och renderat ur båda byggena:
- Grenen, `R-mob+bb+pbx+hw·quarterly·ja` och `·nej` (mobil 4 035, bredband 1 497, molnväxel 597 och avbetalning 1 347
  per kvartal): `auto`, `leadFinding.metricText` «1 347 kr · engångsbelopp» i svaret och den lagrade raden. Fakturavyn
  (`lins15/vyr-gren/R_mob+bb+pbx+hw_quarterly_nej-1600.txt` rad 19-20) och rummet
  (`lins15/rumr-gren/R_mob+bb+pbx+hw_quarterly_nej-1600.txt` rad 22, domen rad 28) visar det.
- Main, samma fall: `review_queue`, `sanity_check_failed`, inget fynd i svaret eller raden. Grenens logg:
  «[planvalsgrind] mobil: bytesmålet vore kategorins golv … → inget bytestal», alltså samma mekanism som Y-1 och Z-2:
  grinden nollar mobilbesparingen, sanitetsvakten har inget att fälla, och fakturan går `auto`.
- Motprov, förexisterande: på main visar månads- och årsfallet samma form redan i dag («449 kr · engångsbelopp»,
  «5 388 kr · engångsbelopp», och «Vi fångade – kr/år» fyra gånger i rummet), avläst i mains renderade rum och
  fakturavy (`lins15/hwrum-main/`, `lins15/hwvy-main/`). Instrumentet kan alltså se texten på båda sidor.

Klass: en mening kunden läser om ett belopp på fakturan är fel (en avbetalning kallad engångsbelopp, under en rubrik
som säger löpande) → [KUND]. Förexisterande: lib/forensics.js är orörd av PR:en (`git diff origin/main..HEAD --stat --
lib/forensics.js` tom). Vanligare genom samma mekanism i diffen som gjorde Y-1 och Z-2 blockerande (planvalsgrindens
hölje, 9c2991d1): en kombinerad mobilfaktura per kvartal med en avbetalning, som main skickade till granskning, går
`auto` och får kortet. Avgränsningen 22 okt: «PR:en gör det vanligare räcker med en mekanism i diffen … Vid tvekan:
vanligare.» Blockerar.

Om undantagen: N-4 (loggad efter den tionde blicken) gäller samma fynds löfte «Bekräfta slutdatum så bevakar vi att den
försvinner», inte beloppets enhet, och «felet i hårdvarujusteringen» gäller «Ni betalar idag» (X-1). Fyndmatrisen
FV-A12 har bara avbetalningen typad `recurring_subscription` och per månad (tests/fakturakedjan/fall.mjs:108-118),
där fyndet får ett årstal; den kan inte se formen. Hur ofta en sådan faktura finns i produktionen är inte avläst.
Samma vy säger också «Inkl. 1 347 kr engångskostnader — ingår ej i årsberäkningen ovan» (rad 56 i samma fil; på
main «Inkl. 449 kr engångskostnader» för månadsfallet). Den raden räknas inte här: den loggade hårdvaruposten efter den
tolfte blicken beskriver just att en `hardware`-rad räknas i engångsavgifterna, så den kan höra dit. Å-1 vilar på
fyndkortet (lib/forensics.js:242) och rummets dom, som ingen loggad post nämner.

Byggregeln avgör lagningen (strykning): ordet «engångsbelopp» kan strykas ur kortet där radtypen är `hardware`, eller
fyndet hållas borta från en planvalsfaktura; valet är byggarens.

### Å-2 · [VAKT], infört: Z-1:s lagning fäller bara ett tal efter en etikett som slutar med kolon

Commitmeddelandet säger att renderingssonden nu fäller «ett tal efter «Kombinerad faktura.» med eller utan etikett».
Mönstret är `/Kombinerad faktura\.\s*(?:[^.\d]{0,40}:\s*)?\d/` (scripts/screenshot-planvalsgrind.mjs:88): en etikett
räknas bara om den slutar med kolon. Sabotage SZ (src/pages/TestaFaktura/index.js, planvalsgrenens `: ''` ersatt
med P bakom kategorietiketten utan kolon) ändrade beteendet: grenens bygge renderar «Kombinerad faktura.
Mobilabonnemang 125 640 kr/år.» på kvartalsfallet och «… 193 680 kr/år.» på årsfallet (`lins15/vy-SZ/`, båda
bredderna), alltså Y-1:s tal 3 respektive 12 gånger för stort. Sviten: **0 av 2 776** (`lins15/svit-SZ.txt`).
Renderingssonden: grön i båda bredderna, 0 ✗ (`lins15/sond-planval-SZ.txt`). Inget kundtal är fel i den granskade
commiten → [VAKT]. Samma form som Z-1, W-2 och P-2 (ett ord eller ett tecken, inte påståendet). Mergas och lagas
framåt.

## Det som håller (avläst)

- **Strykningen gör vad den säger.** Inget tal per abonnemang, inget annat tal om mobildelens pris och inget
  «per abonnemang» på någon av 76 renderade rumssidor eller 56 fakturavyer med en mobilrad (iakttagelserna ovan),
  med motprov mot förälderns rendering.
- **Ingen mobilfaktura fick ett byte, en besparing, ett procenttal eller en poäng.** Mobilkollen (`lins15/mobilkoll.mjs`)
  på grenen: R 24, Q 10 och FV-A18 4 mobilfall, 0 med minst ett tal i svaret, raden, rummet eller mejlen. Skannern
  (`lins15/skanna.mjs`) för de förbjudna formerna: 0 träffar på R och Q. Motprov main: 18 av 18 mobilfall med minst
  ett tal, skannern 12 skilda träffar.
- **Strykningen gjorde inget annat fel vanligare i rummet.** Rummatrisens 1 848 rum har samma dom, poäng, ställning,
  räknare, `ovissa` och möjliga nettobesparing som föräldern; ingen icke-mobil rad ändrades. Mobilradens nya text
  (`omatt` med planvalsflaggan) är RM-R6:s mening, och märket «Mottagen» stämmer med räknaren «1 mottagen, inte
  prissatt». `lagratByte` och rummets inhållning ger samma `should_switch`, `net_saving` och `utanDom` på alla 1 776
  mobilrader i matrisen, varav 592 med ett inhållet byte (`lins15/lagjmf.mjs`).
- **Motprovet i commitmeddelandet håller.** IT-8821 och en M365-rad utan läsbar nivå behåller sitt underlag: S2
  (villkoret läser `kraverBekraftadNiva`, så M365 förlorar underlaget) fällde 10 tester, bland dem FV-A19, RM-R8,
  MS-04 och BK-15.
- **Byggarens sabotage står.** Villkoret borttaget (S1) fällde exakt de fyra testerna commitmeddelandet nämner.
- **Märket vaktas av renderingssonden, inte av sviten.** S3 (märket på en planvalsrad skriver årskostnaden per
  abonnemang, «5 027 kr per abonnemang/år») fällde 0 tester: FV-A19 och RM-R8 läser bara radens text, och RM-R1 letar
  «kr/år» i märket. Beteendet ändrades (rummatrisens märken «4 188 kr per abonnemang/år» och «5 027 kr per
  abonnemang/år»), och scripts/screenshot-mobilscore.mjs var röd i 8 kontroller i båda bredderna. Sonden täcker alltså
  formen; det räknas inte som fynd.
- **Mejlen på Å-1:s kvartalsfall** (`lins15/mejl.mjs`, `lins15/mejl-hw-q.txt`): analysmejlet och svarsmejlet bär
  «Ingen jämförelse mot listpris» och årskostnaden 24 516 kr; inget av de tre mejlen (aktiveringsmejlet medräknat)
  bär hårdvarufyndet, ordet «engångs», beloppet 1 347 eller ett tal per abonnemang.

## Inte prövat

- Vad modellen faktiskt skriver (inga modellanrop); på planvalsfakturor skriver koden texten.
- Hur ofta en kombinerad mobilfaktura per kvartal med en avbetalning finns i produktionen (ingen databasåtkomst).
  Mekanismen står i diffen.
- Påminnelsen, enkäten, briefen, prislarmen, prospektet och dörren som renderade sidor: f1f17f60 rör dem inte, och
  ingen av dem läser `prisunderlag` (grep i api/, lib/, src/: bara api/invoice-history.mjs, lib/lagesregister.js och
  src/pages/Portfolio/index.js). `publicFeatured` i rummet läser `price_per_seat_monthly` på en mobilrad, men bara
  med Eurostat-punkter för kategorin, och ingestskriptet hämtar Eurostat bara för el (scripts/ingest-public-prices.mjs).

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins15/sab.py`, spec ur `lins15/specs.py` och
`lins15/specs2.py`), räknade `# fail` och `# cancelled` tillsammans (cancelled 0 i varje körning) och återställde
filen med `git checkout --`; `git status --short` visade bara domfilen efter varje körning. Alla körningar gjordes om
efter kontots sessionsgräns (`lins15/alla.sh`, `lins15/alla.txt`) och gav samma tal som första gången.

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| S1 | api/invoice-history.mjs: strykningen i `underlagForRad` borttagen (byggarens, omkört) | mobilraden får åter underlaget (Z-2:s tal) | 4 av 2 776 (MS-01, MS-08, FV-A19, RM-R8) |
| S2 | samma rad läser `kraverBekraftadNiva` i stället för `bytesmalMotKategorigolv` | mobil oförändrad, M365 utan underlag | 10 av 2 776 (bl.a. BK-15, MS-03, MS-04, MS-07, MS-09, MS-11, FV-A19, RM-R8) |
| S3 | src/lib/rumstext.js: märket på en planvalsrad skriver årskostnaden per abonnemang | ja: märkena «4 188 kr per abonnemang/år» och «5 027 kr per abonnemang/år» | 0 av 2 776; scripts/screenshot-mobilscore.mjs röd i 8 kontroller (båda bredderna) |
| S4 | lib/lagesregister.js: inhållningen släpper en rad utan underlag | lagrade mobilbyten och nettobelopp når rummet, påminnelsen, enkäten och briefen | 14 av 2 776 (bl.a. MS-08, MS-09, RM-R1, RM-R3, RM-R7, LB-01, LB-02, LB-03) |
| S5 | lib/lagesregister.js: `planval: false` i radens läge | planvalsraden får «inget verifierat publikt pris» | 4 av 2 776 (MS-01, MS-08, FV-A12, RM-R6) |
| SZ | src/pages/TestaFaktura/index.js: P bakom kategorietiketten utan kolon i planvalsgrenen | ja: «Kombinerad faktura. Mobilabonnemang 125 640 kr/år.» och «… 193 680 kr/år.» renderat | **0 av 2 776**; renderingssonden grön, 0 ✗ (Å-2) |

Efter SZ återställdes filen, frontenden byggdes om rent, och båda renderingssonderna kördes rena: gröna i båda
bredderna (`lins15/sond-planval0.txt`, `lins15/sond-mobil0.txt`).
