commits: dbfca75a728144b2cc577b440b04e10f76fdf4cb
dom: BLOCKERAR

# Fjortonde blicken på S1 (dbfca75a), uppdrag: hitta var det gröna är osant

Granskningen är klar. Sökvägar `lins14/…` är kataloger i sessionens scratchpad.

**Dom: BLOCKERAR**, på en [KUND] som S1 gör vanligare:
- **Z-2**: på en kombinerad mobilfaktura som faktureras per kvartal eller år skriver rummet «Ni betalar 5 027 kr per
  abonnemang/år för mobilabonnemang» (sant 4 188) och, med molnväxel och avbetalning, «4 903 kr» bredvid «Det
  billigaste publicerade priset är 3 228 kr», där kunden betalar exakt 3 228 kr per mobilabonnemang. Talet bär de
  andra delarnas kostnad. Felet finns på main för månadsfakturor; main höll kvartals- och årsfakturorna i granskning
  utan tal, och planvalsgrinden släpper dem `auto`, samma mekanism som gjorde Y-1 blockerande. Återskapat med
  byggarens egna FV-A18-fall och renderat ur båda byggena.

Två [VAKT] mergas och lagas framåt: P utan etikett på en planvalsfaktura fälls varken av sviten (0 av 2 774) eller av
renderingssonden (Z-1), och FV-A18:s årsfall är inte Q3 och prövar inte Y-1:s mekanism (Z-3).

Det som håller: strykningen av P gör vad den säger. P står inte i fakturavyn på någon av 22 renderade
planvalsfakturor (44 sidor), och inte i svaret utanför `extracted`, raden, rummet, mejlen, lägesobjektet eller fyndet.
Ingen mobilfaktura fick ett byte, en besparing, ett procenttal eller en poäng. Strykningen rör bara kategorier med
`bytesmalMotKategorigolv`; bredband som primär del visar P som förut.

## Iakttagelser

- Utcheckat på grenens spets dbfca75a (FETCH_HEAD), alltså den granskade commiten själv.
- dbfca75a ändrar i kod ett villkor i src/pages/TestaFaktura/index.js (P skrivs bara när
  `result.lage?.rubrik !== 'planval'`) och en kommentar i agents/recommender/recommend.js. Resten är FV-A18, fyra nya
  RESTFALL, renderingssonden och ops/.
- Villkoret läser lägets rubrik, som `fakturaLage` (lib/lagesregister.js:411-414) sätter till `planval` när
  kategorin har `bytesmalMotKategorigolv` och `recommendation.shouldSwitch !== true`. Strykningen gäller bara grenen
  utan sekundär besparing; grenen med `_secSaving` (rad 2068-2079) skriver P som förut.
- Instrument: den trettonde linsens körare, stubbar och generator kopierade till `lins14/`, pekade om till den här
  worktreen. Main (e5733f3a) är den trettonde linsens utpackning (`lins14/main` → `lins13/main`).
- Sviten utan sabotage: 2 774 av 2 774 gröna, 0 fail, 0 cancelled (`lins14/svit0.txt`).
- Egen mängd R (`lins14/gen.mjs` mängd `r`, 34 fall): kombinerade mobilfakturor per månad, kvartal, år, `unknown` och
  `one_time`, med och utan molnväxel och hårdvara, modellens ja och nej, plus bredband som primär och en ren
  kvartalsfaktura. Genom grenens och mains handler (`lins14/run.sh r`). Varje mobilfall har lägets rubrik `planval`
  på grenen. Tre mobilfall per modellsvar går `auto` på grenen och till granskning (`sanity_check_failed`) på main:
  mobil och bredband per kvartal och per år, och mobil, bredband, molnväxel och hårdvara per kvartal. Samma fall per
  år är `auto` på båda.
- P och kvartals- eller årsdelen (`lins14/tal.mjs`) finns inte i den lagrade raden, rummet, analysmejlet, svarsmejlet,
  aktiveringsmejlet, lägesobjektet, fyndet eller kontraktsklockan i något av de 28 kombinerade fallen. Motprov: samma
  instrument ser årskostnaden 50 268 i raden och mejlen (`lins14/motprov.mjs`).
- Fakturavyn renderad ur grenens bygge (`npm run build` på dbfca75a, `lins14/rq.sh`, 390 och 1600 px, «Hur vi räknar»
  öppnat) för alla 22 mobilfall i R: 44 av 44 sidor visar «Kombinerad faktura.» utan tal, och inget av talen 125 640,
  502 560, 193 680, 48 420, 41 880 eller 16 140 står på någon kombinerad sida (`lins14/rr/`). Motprov: årskostnaden
  50 268 står på samma sida, och 16 140 står på den rena kvartalsfakturan, där det är årskostnaden.
- Byggarens renderingssond (scripts/screenshot-planvalsgrind.mjs, temporär kopia med global playwright, grenens
  bygge): grön i båda bredderna (`lins14/sond0.txt`).

## Fynd

### Z-1 · [VAKT], infört: P utan kategorietikett på en planvalsfaktura fälls varken av sviten eller av renderingssonden

FV-A18 låser vyns villkor med en källtextregex, och renderingssonden förbjuder bara den exakta formen «Kombinerad
faktura. Mobilabonnemang:». Sabotage SA (src/pages/TestaFaktura/index.js, `: ''` i planvalsgrenen ersatt med P utan
etikett) ändrade beteendet: grenens bygge renderar «Kombinerad faktura. 125 640 kr/år.» respektive «502 560 kr/år.»
på kvartals- och årsfakturan (`lins14/rr-SA/`, båda bredderna). Sviten: **0 av 2 774** fällda
(`lins14/svit-SA.txt`). Renderingssonden: grön i båda bredderna (`lins14/sond-SA.txt`). Inget kundtal är fel i den
granskade commiten → [VAKT]. Samma form som W-2 och P-2 (ord, inte påståendet), här i FV-A18 och sondens nya rad.
Mergas och lagas framåt.

### Z-2 · [KUND], vanligare: rummet skriver «Ni betalar X kr per abonnemang/år för mobilabonnemang» med de andra delarnas kostnad inräknad, på planvalsfakturor som main höll i granskning

Uppdraget frågar om P «eller ett annat tal om fakturans delar» står kvar på en planvalsfaktura i rummet. Det gör det.
Rummets rad med obekräftad nivå skriver `perEnhet` = hela fakturans årskostnad delad med antalet mobilabonnemang
(lib/prisunderlag.js:58), i
meningen «Ni betalar {perEnhet} kr per abonnemang/år för mobilabonnemang» och i underlaget «Ni betalar · per
abonnemang/år». På en kombinerad faktura bär talet bredbandets (och molnväxelns) kostnad.

Avläst genom handlern med rummets fulla svar (`lins14/korjrum.mjs`, `lins14/rumkor.sh`) och renderat ur grenens och
mains byggen (`/portfolio`, 390 och 1600 px, `lins14/rendrum.mjs`):
- Byggarens egna FV-A18-fall `rest·mob+bb·quarterly·ja` och `·nej` (10 mobilabonnemang 10 470 kr och bredband 2 097 kr
  per kvartal): grenen `auto`, rummet «Ni betalar 5 027 kr per abonnemang/år för mobilabonnemang. Det billigaste
  publicerade priset är 3 228 kr …» (`lins14/fv18r-gren/rest_mob+bb_quarterly_nej-1600.txt` rad 50, underlaget rad
  52-54). Mobildelen per abonnemang är 10 470 × 4 / 10 = 4 188 kr. Main: `review_queue`, `sanity_check_failed`,
  rummets kort «Mottagen — men vi stoppade prissättningen», inget tal (`lins14/fv18-main-rum.txt`).
- R-mängden, mobil 1 345 + bredband 499 + molnväxel 199 + avbetalning 449 per månad, fakturerat per kvartal
  (`R-mob+bb+pbx+hw·quarterly·nej`): grenen «Ni betalar 4 903 kr per abonnemang/år för mobilabonnemang. Det billigaste
  publicerade priset är 3 228 kr» (`lins14/rum2r-gren/R_mob+bb+pbx+hw_quarterly_nej-390.txt` rad 57). Kunden betalar
  1 345 × 12 / 5 = 3 228 kr per mobilabonnemang, alltså exakt det billigaste publicerade priset, och rummet ställer
  4 903 bredvid 3 228. Main: granskning, inget tal.
- Samma i `R-mob+bb·quarterly` och `R-mob+bb·annual` (5 027 kr, sant 4 188), modellens ja och nej
  (`lins14/rumr-gren/`, `lins14/rumr-main/`).
- Motprov, månadsfakturan: main visar samma tal redan i dag («Ni betalar 5 027 kr per abonnemang/år för
  mobilabonnemang — mer än leverantörens eget listpris på 3 588 kr», `lins14/rumr-main/R_mob+bb_monthly_nej-1600.txt`
  rad 45), och grenen likaså. Instrumentet kan alltså se talet på båda sidor.

Klass: ett tal kunden läser är fel → [KUND]. Felet är förexisterande (loggat i ops/ARBETSORDER-VAG1.md under c1:s
femte blick som «Förexisterande, oförändrat», och S6:s beslut om «per abonnemang» står i körplanen). S1 gör det
vanligare genom samma mekanism i diffen som Y-1: planvalsgrinden (agents/recommender/recommend.js:1606-1623) nollar
mobilbesparingen, sanitetsvakten har inget att fälla, och en kombinerad mobilfaktura per kvartal eller år, som main
skickade till granskning, går `auto` och får raden. Avgränsningen 22 okt: «PR:en gör det vanligare räcker med en
mekanism i diffen … Vid tvekan: vanligare.» Blockerar.

Om undantagen i uppdraget: den trettonde linsen såg Q1:s rad och räknade den inte («loggat under S6»). Loggposten
säger «oförändrat», vilket var sant före planvalsgrindens hölje och inte är det efter: talet når nu fakturor som main
inte visade det för. Det är samma skäl som gjorde Y-1 blockerande, för samma fakturor. Uppdraget säger att ett fel som
S1 gör vanligare räknas, och frågar uttryckligen efter ett annat tal om fakturans delar i rummet. N-3 (det billigaste
priset utan bindningstid) och N-4 (avbetalningsfyndets löfte) når samma fakturor men är namngivna undantag och handlar
inte om fakturans delar; de räknas inte här.

Byggregeln avgör lagningen (strykning): S6:s beslut står redan i körplanen («har fakturan en sekundär del visar
underlaget inget tal per abonnemang, om inte raden lagrar mobildelens egen kostnad»).

### Z-3 · [VAKT], infört: FV-A18:s årsfall är inte den trettonde linsens Q3 och bär inte Y-1:s mekanism

tests/fakturakedjan/fall.mjs:162 säger att de nya fallen är «Den trettonde linsens Q1 och Q3». Årsfallet har
«Tele2 Jobbmobil XL (10 st)» 16 140 kr per år; Q3 hade «Tele2 Jobbmobil (5 st)». Med tio abonnemang ligger fakturan
under kategorins golv, main räknar inget byte och fallet är `auto` redan på main (`lins14/fv18-main.txt`: annual ja
och nej `auto`, kvartalsfallen `sanity_check_failed`). FV-A18 kräver bara `auto`, `planval` och P > årskostnaden på
grenen, så årsfallet prövar inte det som gjorde Y-1 vanligare (main i granskning, grenen `auto`); bara kvartalsfallen
gör det. Inget kundtal ändras → [VAKT]. Mergas och lagas framåt.

## Det som håller (avläst)

- Mobilkollen och skannern från den elfte linsen (`lins14/mobilkoll.mjs`, `lins14/skanna.mjs`) på R-mängden: grenen
  24 mobilfall, 0 med ett byte, en besparing, ett jämförelsepris, en poäng eller ett procenttal i svaret, raden,
  rummet eller mejlen; skannern 0 träffar. Motprov main: 18 av 18 mobilfall med minst ett tal, skannern 12 skilda.
- Strykningen av P: se iakttagelserna. Byggarens eget sabotage (vyns planvalsvillkor borttaget, SB) fällde FV-A18,
  som commitmeddelandet säger.
- Icke-mobila fall: villkoret läser `lage.rubrik`, som bara blir `planval` i en kategori med
  `bytesmalMotKategorigolv` (i dag bara mobil, agents/recommender/branchindex.js:158). Bredband som primär del i
  R-mängden har samma route, besparing och P på grenen som på main (`lins14/r-gren.txt`, `lins14/r-main.txt`).
- Varje utgång i handlern går genom `svara()`, som räknar läget (api/test-invoice.mjs:818), också cachade svar, och
  P finns bara i `auto`-svaret. Batchlistan i fakturavyn visar inget P. Hårdvarujusteringen är `null` utan byte, så den
  når inte planvalsfakturorna.

## Inte prövat

- Vad modellen faktiskt skriver (inga modellanrop); på planvalsfakturor skriver koden texten.
- Hur ofta en kombinerad mobilfaktura i produktionen faktureras per kvartal eller år (ingen databasåtkomst). Mekanismen
  står i diffen.
- Påminnelsen, enkäten, briefen, prislarmen, prospektet och dörren som renderade sidor; dbfca75a rör dem inte och ingen
  av dem läser P (grep i api/, src/, lib/).
- Rummet med fler rader än en: main renderade granskningsraden ensam som rummets tomläge, så kortet syns inte i
  bilden; kortets text är avläst ur rummets svar (`lins14/fv18-main-rum.txt`).

## Sabotage som linsen körde

Varje sabotage bytte exakt en förekomst (`assert s.count(old) == 1`, `lins14/sab.py`, spec ur `lins14/specs.py`),
räknade `# fail` och `# cancelled` tillsammans och återställde filen med `git checkout --`; `git status --short` visade
bara domfilen efter varje körning.

| Sabotage | Ändring | Beteendet ändrades | Fällda |
|---|---|---|---|
| SA | src/pages/TestaFaktura/index.js: planvalsgrenens `: ''` ersatt med P utan etikett | ja: «Kombinerad faktura. 125 640 kr/år.» och «502 560 kr/år.» renderat ur grenens bygge (`lins14/rr-SA/`) | **0 av 2 774**; renderingssonden grön (Z-1) |
| SB | src/pages/TestaFaktura/index.js: `&& result.lage?.rubrik !== 'planval'` borttaget (byggarens sabotage, omkört) | villkoret borta i källan; inte renderat | 1 av 2 774 (FV-A18) |
