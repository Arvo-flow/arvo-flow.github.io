# Granskning — vändningen av läsaren (`BELOPPSFORM` + klassningen) i `lib/skrapdom.js`

commits: ee4cfe7
datum: 2026-09-16
dom: BLOCKERAR

Granskarens enda uppdrag: **hitta var det gröna är osant.** Varje påstående nedan skrevs efter
att det körts; kommando och utfall citeras. Varje sabotage applicerades med `assert old in s`
plus ett unikhetskrav (en sträng som inte matchar, eller matchar två gånger, avvisas som en
NO-OP i stället för att räknas som ett bevis), filen återställdes, och `git status` verifierades
efter varje. Baslinje:

```
$ npm run test:algo
# tests 2393 · # suites 426 · # pass 2393 · # fail 0
```

---

## Dom i en mening

Vändningen är rätt drag och den är mätbart mycket starkare än svartlistan — men den **stänger
inte det [KUND] den säger att den stänger.** Två av de tio blankstegstecken förra granskningen
räknade upp med namn ger fortfarande ett falskt, lägre tal, tyst, utan post i `avvisade`; och
SD-20, testet som skrevs för att bevisa motsatsen, är en ny handplockad uppräkning av tio tecken
som utelämnar exakt de två som fallerar. Nio [VAKT] i övrigt, varav sju lagade och verifierade.

---

## [KUND] 1 · `1<U+200B>299 kr/mån` ger fortfarande 299 — vändningen täcker 6 av de 8 tecken commiten säger att den täcker

**Påståendet.** Commitmeddelandet och modulhuvudet: *«åtta blankstegstecken jag aldrig tänkte på
täcks utan att nämnas»*. Testets titel: *«SD-20 · VITLISTAN: varje blankstegstecken Unicode
känner, inte de två jag tänkte på»*.

**Mätningen.** `lasPriser('Pro 1<X>299 kr/mån')`, sant värde 1299:

```
$ node scratchpad/q1.mjs
U+2009 THIN            priser=[]    avvisade=["1 299"]   AVVISAT   ← nytt, korrekt
U+202F NNBSP           priser=[]    avvisade=["1 299"]   AVVISAT   ← nytt, korrekt
U+2007 · U+2008 · U+200A · U+205F                        AVVISAT   ← nytt, korrekt
U+2060 WORD JOINER     priser=[299] avvisade=[]          !!! FALSKT TAL 299
U+200B ZERO WIDTH SP   priser=[299] avvisade=[]          !!! FALSKT TAL 299
```

**Båda stod namngivna i förra rundans [KUND]-tabell**, raderna «U+2060 WORD JOINER ⚠️ FALSKT TAL:
299» och «U+200B ZERO WIDTH SPACE ⚠️ FALSKT TAL: 299». Sex av åtta täcktes; två lämnades, och
meningen «täcks» skrevs ändå.

Fem tecken till av samma familj, som ingen av de två granskningarna räknat förut, faller likadant:
`U+00AD SOFT HYPHEN`, `U+200C ZWNJ`, `U+200D ZWJ`, `U+180E`, `U+0085 NEL` — samtliga
`priser=[299] avvisade=[]`.

**Orsaken, och varför den inte är «åtta tecken till att lägga till».** `[^\S\r\n]` betyder «allt
som `\s` matchar, utom radbrytning». De sju tecknen ovan ligger **utanför JS:s `\s`** — de är
formatkontrolltecken (`Cf`), inte blanksteg. `BELOPPSFORM` får därför aldrig frågan: tokengruppen
kan inte svälja tecknet, matchningen vid `1` misslyckas i sin helhet, och regexen startar om på
`299`.

**Det svarar direkt på granskningsfråga 2.** Det finns ingen väg FÖRBI vitlistan — strukturellt
bekräftat, det finns exakt ett `priser.push` och det ligger bakom `tolkaBelopp` → `BELOPPSFORM`:

```
$ grep -n "priser.push\|tolkaBelopp\|BELOPPSFORM" lib/skrapdom.js
135: export const BELOPPSFORM = /^\d{1,5}(?:[.,]\d{1,2})?$/;
139:   if (!BELOPPSFORM.test(t)) return null;
200:   const kronor = tolkaBelopp(token);
205:   priser.push({ kronor, index: m.index, fore, efter });
```

Hålet sitter **uppströms om vitlistan**: den tillfrågas korrekt, om fel token. Vitlistan är rätt
verktyg; `KANDIDAT`:s teckenklass är fortfarande en uppräkning, bara flyttad ett steg upp.

**Vägen fram till kunden, mätt genom hela modulen** på en realistisk sida i Fortnox-form
(`Mini 1<ZWSP>209 · Mellan 1<ZWSP>490 · Stor 2<ZWSP>710 kr/mån`, «exkl moms»):

```
$ node scratchpad/q1b.mjs
=== U+0020 (vaktat) ===   blockerar=true   kod=avvisat_belopp     ← korrekt
=== U+2009 (nytt)   ===   blockerar=true   kod=avvisat_belopp     ← korrekt
=== U+200B ZWSP     ===   blockerar=false  kod=underlag
  >>> UNDERLAG: 3 forekomster - 209-710 kr/man  momsbas=exkl
        209 kr/man   ...for uppstart. Mini 1​ <pris> Mellan 1​490 kr/mån...
        490 kr/man   ...Mini 1​209 kr/mån. Mellan 1​ <pris> Stor 2​710 kr/mån...
        710 kr/man   ...Mellan 1​490 kr/mån. Stor 2​ <pris> Fakturering...
=== U+2060 WORD JOINER === identiskt: blockerar=false, 209-710
```

Skriptet skriver då `✓ UNDERLAG … 3 prisförekomster lästa, alla entydiga och okvalificerade ·
priser 3 förekomster · 209–710 kr/mån`. Grönt, tyst, **åt det lägre hållet** — den riktning
modulens egen kommentar kallar farlig under success fee (*«ett för lågt golv överdriver
besparingen»*).

**Och kvittot döljer det, ordagrant som förra gången.** `String.prototype.trim` tar bort `\s`,
alltså inte ZWSP. `fore` slutar på `Mini 1<ZWSP>`, som renderas `Mini 1` och läses som ett
plannamn. Det är förra rundans mening *«Mellan 1 ser ut som ett plannamn»*, oförändrad.

**Modulens två grundfixturer faller.** SD-01 är den test hela modulen byggdes runt:

```
$ node -e "... lasPriser ..."
Diskutrymme 50 99 kr/mån      priser=[]    avvisade=["50 99"]   ← SD-01:s krav, uppfyllt
Diskutrymme 50<ZWSP>99 kr/mån priser=[99]  avvisade=[]          ← SD-01:s krav, brutet
VPS 2 199 kr/mån              priser=[]    avvisade=["2 199"]   ← SD-13:s krav, uppfyllt
VPS 2<ZWSP>199 kr/mån         priser=[199] avvisade=[]          ← SD-13:s krav, brutet
```

**Vakten kan inte se det, och det är den tyngsta halvan.** SD-20:s `BLANK`-lista är återigen tio
handplockade tecken:

```
$ node -e "... extrahera BLANK ur tests/skrapdom.mjs ..."
antal: 10
U+0020 U+00A0 U+2009 U+202F U+2007 U+2002 U+2003 U+205F U+3000 U+1680
  U+200B i SD-20-listan? false
  U+2060 i SD-20-listan? false
```

Testet heter *«varje blankstegstecken Unicode känner»* och prövar tio. Det är grönt **därför att
det inte frågar om de två som fallerar** — och de två stod i det dokument testet svarar på. En
svartlista över tio farliga former byttes mot en testlista över tio ofarliga tecken: samma
uppräkning, ett lager upp. «Ett grönt som betyder *jag tittade inte*.»

**Klassning.** Förra granskningen dömde exakt det här beteendet [KUND] och den domen står. Felet
sitter i BETEENDET (`lasPriser` returnerar 299 för en sida som säger 1 299), inte i BEVISET —
stoppregelns gräns är knivskarp där, och «vid tvekan: [KUND]». Jag redovisar samma motbevis som
förra granskaren redovisade, i stället för att måla över det: `faktura-tjanst` ligger varken i
`REVIDERADE_KATEGORIER` eller i `BRANCH_ANCHOR_UNIT`, så talet kräver ytterligare commits för att
nå en kundyta. Klassningen vilar på stoppregeln, inte på närhet.

**Fixen är liten.** Tokengruppen behöver en teckenklass som inte är en uppräkning — matcha allt
mellan siffergrupperna som inte är siffra/decimaltecken, och låt `BELOPPSFORM` avvisa det. Då
täcks varje `Cf`-tecken utan att något nämns, vilket är det vändningen lovade.

---

## [VAKT] 2 · Den fjärde utgången finns — nio prisformer försvinner tyst, mätt också på riktig sidtext

Docstringen: *«EN slinga, TRE redovisade utgångar … Ingen fjärde utgång finns, och det är hela
poängen.»* Motbevisat:

```
$ node scratchpad/q3.mjs
  499:-/mån                      !!!! TYST     ← den vanligaste svenska prisnotationen
  499 :- per mån                 !!!! TYST
  499 kr./mån                    !!!! TYST
  499 kr i månaden               !!!! TYST
  499 kr månad                   !!!! TYST
  SEK 499/mån  (valuta före)     !!!! TYST
  Pro 499 kr\n/mån               !!!! TYST     ← innerText bryter rad mellan block
  Pro 499\nkr/mån                !!!! TYST
  Pro 499 kr/\nmån               !!!! TYST
TYSTA (fjarde utgangen): 9
```

Radbrytningsfallen är inte hypotetiska: indata är `document.body.innerText`, där varje
blockelement ger `\n` — en prislista med talet i en cell och enheten i nästa ser exakt så ut.

**Mätt på de nio committade sidorna i `ops/prislistor/`**, med ett oberoende vittne (räkna varje
`NNN kr`-förekomst oavsett form) mot summan av de tre redovisade utgångarna:

```
$ node scratchpad/q3b.mjs
─── bokio.txt         rå"kr"=  8  priser=  4  avvisade= 0  ejManad= 0  → redovisade=  4
─── oderland.txt      rå"kr"= 25  priser=  0  avvisade= 0  ejManad= 0  → redovisade=  0
─── onecom.txt        rå"kr"=  4  priser=  0  avvisade= 0  ejManad= 0  → redovisade=  0
```

`onecom.txt` bär formen `9 kr / 1:a året*` — efter `kr/` står en siffra, och enhetsgruppen kräver
`[\p{L}²]`. Ingen träff, ingen post, ingen rad i kvittot.

**Varför [VAKT] och inte [KUND] — riktningen är mätt, inte antagen.** En tyst bortsortering kan
bara ta bort ett pris, aldrig lägga till ett. Att ta bort kan höja `lagsta` eller sänka `hogsta`;
det kan aldrig producera ett lägre golv. Mätt:

```
sidan bär 99 / 299 / 499 / 799; Mini skrivs «99:-/mån» (tyst utgång)
  -> kod=underlag  lagsta=299  hogsta=799
  => tappet HÖJER lagsta (99 -> 299) = konservativ riktning
```

Talen som blir kvar är sanna. Men docstringens «ingen fjärde utgång finns» är ett
mekanismpåstående som inte håller, och det är den mening nästa läsare kommer att lita på.

---

## [VAKT] 3 · Sex per-användare-former ger fortfarande ett rent `UNDERLAG` — «per medarbetare» stod namngiven i förra domen

Commiten säger sig ha lagat ordförrådet *«per person/plats/konto»*. Tre tillagda; den fjärde som
förra granskningen mätte och skrev ut — `per medarbetare` — lämnades. Mätt genom hela `skrapdom`,
tre planer i samma form per sida:

```
$ node scratchpad/q4b.mjs
  99/199/399 kr/mån                        >>> UNDERLAG 99-399     (ren referens, korrekt)
  99/199/399 kr/mån per användare          BLOCKERAR [kvalificerat_pris]
  99/199/399 kr/mån, per licens            BLOCKERAR [kvalificerat_pris]
  99/199/399 kr/mån/användare              BLOCKERAR [avvisat_belopp]
  99/199/399 kr per månad och användare    >>> UNDERLAG 99-399     <<<<< HÅL
  99/199/399 kr/mån och användare          >>> UNDERLAG 99-399     <<<<< HÅL
  99/199/399 kr/mån per medarbetare        >>> UNDERLAG 99-399     <<<<< HÅL
  99/199/399 kr/mån och medarbetare        >>> UNDERLAG 99-399     <<<<< HÅL
  99/199/399 kr/mån x antal anställda      >>> UNDERLAG 99-399     <<<<< HÅL
  99/199/399 kr/mån för varje användare    >>> UNDERLAG 99-399     <<<<< HÅL
```

[VAKT], av två skäl som båda är kontrollerade: talen är sanna, och kvittots `efter`-halva trycker
kvalificeraren bredvid priset så att människan ser den. Modulen deklarerar dessutom blindfläcken
ärligt (*«kvalificerarnas ORDFÖRRÅD är ändligt medan svenskan inte är»*). Men mönstret är samma
som [KUND] 1: en uppräkning som förra granskaren mätte, delvis åtgärdad, redovisad som åtgärdad.

**Och min egen mätning var fel först.** Mitt första batteri anropade `lasPriser` och rapporterade
«GODTAGET» för `kr/mån, per licens` — men `kvalificerare` körs i `skrapdom`, inte i `lasPriser`.
Två av mina «hål» var mitt instrument. Omkört genom hela modulen ovan.

---

## [VAKT] 4 · «Ett nätverksfel som rapporterades som rätt utfall» är halvlagat — 404 och 200-med-tom-kropp säger fortfarande «rätt utfall»

Fixen täcker `typeof status !== 'number'`. Den täcker inte de fall där hämtningen misslyckas
**med ett tal**. Kört genom den RIKTIGA skriptvägen, med enbart `lib/verifiers/core.mjs` utbytt
mot en stubb via en ESM-loader (skriptet i övrigt orört):

```
$ STUB_SVAR=... node --experimental-loader=scratchpad/loader.mjs scripts/skrapa-prislista.mjs

══ B · no-response ══   ✗ SKRAPAN KOM ALDRIG FRAM: hämtningen misslyckades: no-response   ✓ RÄTT
══ C · ERR …        ══   ✗ SKRAPAN KOM ALDRIG FRAM: hämtningen misslyckades: ERR net::…   ✓ RÄTT

══ A · alla tre 404 ══
  … → status 404, 0b
      domen: [sidan_olasbar] sidan gav 0 tecken — det är ett utfall om HÄMTNINGEN, aldrig om priset
  ✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.

══ D · 200 med TOM kropp (cookie-vägg / JS-only) ══   identiskt utfall som A
```

Slutsatsraden säger «rätt utfall» **rakt under tre rader som med modulens egna ord säger att
utfallet handlar om hämtningen, aldrig om priset.** Skriptets sammanfattning motsäger modulens
eget skäl.

Och den mest sannolika varianten i drift är värre. Alla tre måladresserna är i `ops/prislistor/`
dokumenterade med cookie-vägg (`button:has-text("Acceptera")` m.fl.). Med en cookie-vägg på
828 tecken:

```
  … → status 200, 828b
      domen: [for_fa_priser] 0 prisförekomst(er), kräver 3 — DOM:en har sannolikt ändrats
  ✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.
```

Två påståenden, båda osanna: DOM:en har inte ändrats, och vi kom aldrig fram till prislistan.
[VAKT] därför att inget kundsynligt tal ändras — exitkoden är 1 i samtliga fall, alltså
fail-closed. Men det är samma felfamilj förra domen namngav, i den halva som inte lagades.

**Sidoiakttagelse, redovisad, inte utpekad som fel:** ett `ERR` på FÖRSTA adressen avslutar nu
hela körningen, så de två friska kandidaterna nedanför aldrig prövas (fall C ovan). Det är
ärligare än förr och troligen avsiktligt — men det står inte skrivet någonstans, och det är en
beteendeändring commiten inte nämner.

**Pre-existerande, oförändrat av denna commit:** `if (!KANDIDATER)` passerar för en tom array
(`![]` är `false`), loopen kör noll varv och skriptet skriver «Skälen står ovan» utan ett enda
skäl.

---

## [VAKT] 5 · Radbrytningens uteslutning är ett uttalat designbeslut utan tand — och sabotaget mot den ändrar beteendet på docstringens EGET exempel

Docstringen: *«Radbrytningen är utesluten med flit: den SKILJER två tal åt, och att svälja den
hade gjort «M365 E3\n490 kr/mån» tvetydigt utan att det är det.»*

```
$ node scratchpad/sab.mjs lib/skrapdom.js "(\d(?:[\d.,]|[^\S\r\n])*\d|\d)" "(\d(?:[\d.,]|\s)*\d|\d)"
# pass 2393  # fail 0   => SABOTAGET FÄLLDE NOLL
  återställd, git status: RENT
```

Och efter bytet ställde jag metodkravets fråga — ändrades BETEENDET?

```
$ node scratchpad/noop.mjs
  docstringens EGET exempel  NUVARANDE token="490"   SABOTERAD token="3\n490"  <<< BETEENDET ÄNDRADES
```

Alltså inte en no-op: med sabotaget blir docstringens egen fixtur `avvisat_belopp` och en helt
korrekt sida blockeras. Beslutet är rätt, motiveringen är rätt, och **ingen vakt skulle märka om
någon ändrade det.** Exakt samma form som SD-26:s `fore`-fönster, som den här commiten just gav
en tand — kvar på grannaxeln.

---

## [VAKT] 6 · Teckengrenen fäller en mycket vanlig svensk listform

```
$ node scratchpad/q45.mjs
  Mini - 209 kr/mån        AVVISAD «209» tecknet «-» före beloppet — kreditering eller intervall
  Mini – 209 kr/mån        AVVISAD «209» tecknet «–» före beloppet — kreditering eller intervall
  SaaS-pris 499 kr/mån     GODTAGET 499      ← motprovet håller, bindestreck i ORD fäller inte
  Plan: Mini — 209 kr/mån  GODTAGET 209      ← em-dash (U+2014) ingår inte i grenen
```

`Plan – 209 kr/mån` är en helt vanlig uppställning på en svensk prissida, och den avvisas som
kreditering. Riktningen är fail-closed (hela sidan blockeras, inget falskt tal), därför [VAKT] —
men modulen deklarerar den här kostnaden ingenstans, och den tredje strecktypen (em-dash) saknas
medan de tre andra finns, vilket ser ut som en uppräkning som inte räknades färdig.

Svaret på granskningsfråga 5 i övrigt: **nej**, ett bindestreck inuti ett produktnamn fäller
inte, eftersom mönstret kräver att bara `[^\S\r\n]*` står mellan tecknet och siffran.

---

## [VAKT] 7 · Två rader som ser ut som skydd men är strukturellt onåbara

```
$ node scratchpad/sab.mjs lib/skrapdom.js "return Number.isFinite(n) ? n : null;" "return n;"
# pass 2393  # fail 0   => FÄLLDE NOLL
$ node scratchpad/sab.mjs lib/skrapdom.js "const t = String(token ?? '').trim();" "const t = String(token ?? '');"
# pass 2393  # fail 0   => FÄLLDE NOLL
```

Och fråga två, som avgör om det är ett fynd eller en no-op:

```
$ node scratchpad/noop.mjs
  motexempel i 1,6M former: 0
  => Number.isFinite är STRUKTURELLT ONÅBAR bakom BELOPPSFORM
```

`BELOPPSFORM` garanterar 1–5 siffror och högst två decimaler, alltså kan `Number()` aldrig ge
något icke-finit; och token börjar och slutar per konstruktion med `\d`, alltså kan `trim()`
aldrig kapa något. **Sabotagen är no-ops, inte fynd** — jag redovisar dem som sådana. Men det är
bibelns 10-septembermönster: *ett skydd bakom ett annat skydd är inte två lager — det är ett.*
Två rader som nästa läsare kommer att kontrollera bort i stället för att kontrollera.

Samma sort i underlaget: `fore: p.fore.slice(-KONTEXT_FONSTER)` kan aldrig kapa, eftersom `fore`
redan skars till 70 tecken i `lasPriser`. Ett sabotage till `slice(-5)` **ändrar beteendet** (det
kapar kvittot till fem tecken) och fäller noll test — kvittots innehåll, det människan faktiskt
läser, är alltså inte asserterat i underlaget.

---

## [VAKT] 8 · Körtidsmätningen i docstringen bars över från den GAMLA regexen

Modulhuvudet: *«MÄTT OCH ACCEPTERAT: `KANDIDAT` är kvadratisk i värsta fall och tar 0–10 ms på
verkliga sidstorlekar (granskningen 2026-09-16).»* Den mätningen gjordes på förra commitens
tokengrupp; den här commiten bytte den mot en alternation. Omkört mot koden som faktiskt körs:

```
$ node scratchpad/perf.mjs
realistisk prislista   215000b        7 ms     ← påståendet HÅLLER, med marginal
sifferbrus              20000b     1436 ms     (förra mätningen på gamla regexen:    560 ms)
sifferbrus             200000b   139981 ms     (förra mätningen på gamla regexen: 56 872 ms)
```

Påståendet «0–10 ms på verkliga sidstorlekar» är sant för den nya koden — jag säger det rakt ut,
för det är utfallet. Men den **accepterade risken blev ~2,5× värre utan att någon mätte om den**,
och rader som «en sida över ~150 kB kan dra iväg» är nu inaktuella åt det snälla hållet (215 kB
på realistisk text tar 7 ms). Ett mätvärde som ärvs över en omskrivning av det uppmätta är ett
påstående, inte en mätning.

---

## Vad som ÄR sant — verifierat, inte antaget

Sju av förra rundans tio [VAKT] är genuint lagade, och jag har prövat tänderna i stället för att
tro på commitmeddelandets tabell:

```
$ node scratchpad/sab.mjs …
S8  · utanfor_band slutar blockera                # pass 2392  # fail 1   ✓ tand
S9  · momsbas_okand slutar blockera               # pass 2392  # fail 1   ✓ tand
S10 · sorteringen riven          (commitens T5)   # pass 2392  # fail 1   ✓ tand
S11 · fore-fönstret hårdkodat 12 (commitens T6)   # pass 2392  # fail 1   ✓ tand
S1  · ejManad slutar räkna                        # pass 2392  # fail 1   ✓ tand
S2  · MANADSORD strippat till «mån»               # pass 2391  # fail 2   ✓ tand
S3  · BELOPPSFORM tillåter gruppering igen        # pass 2389  # fail 4   ✓ tand
```

- **Förra [VAKT] 6 är helt stängt.** SD-27:s sju fixturer ger sju SKILDA koder — jag räknade dem
  i stället för att anta det: `underlag · for_fa_priser · avvisat_belopp · kvalificerat_pris ·
  utanfor_band · momsbas_okand · sidan_olasbar`, inga saknas. Biconditionalen fäller dessutom en
  vänd `blockerar`-flagga på vilken som helst av dem (S8/S9).
- **Förra [VAKT] 2 (`kr/användare/mån` försvann tyst)** är stängt: formen avvisas nu med enheten
  utskriven. Mätt.
- **Förra [VAKT] 10 (negativa belopp)** är stängt för alla tre strecken. Mätt.
- **Förra [VAKT] 3** — den felaktiga orsaksförklaringen om lookbehinden — är utskriven och rättad
  i modulhuvudet. Det är rätt drag och det ska sägas.
- **Nätverksfelets sträng-halva** är verkligt lagad: `no-response` och `ERR …` avslutar nu med
  «SKRAPAN KOM ALDRIG FRAM», körd genom den riktiga skriptvägen.
- **Att riva attrapp-kontrollen var rätt bedömning.** Invarianten `blockerar === false ⟺
  underlag !== null` hålls av konstruktionen — det finns exakt en plats som bygger ett underlag,
  och varje annan utgång returnerar `underlag: null` i samma literal. SD-27 bär den över hela
  kodfältet. Byggarens slutsats håller.

---

## Mitt eget mätinstrument var felet två gånger

1. **Mitt första per-användarbatteri anropade `lasPriser`** och rapporterade «GODTAGET» för
   `kr/mån, per licens` och `kr per månad per användare`. Båda blockeras i själva verket —
   `kvalificerare` körs i `skrapdom`, inte i `lasPriser`. Två falska hål. Omkört genom hela
   modulen; fyndet krympte från åtta former till sex.
2. **Cookie-väggsmätningen rapporterade `0b`** därför att en env-variabel inte propagerade till
   det yttre `node`-anropet. Hade jag läst det som ett mätvärde hade jag dragit slutsatsen att en
   828-teckens vägg ger `sidan_olasbar`, när den i själva verket ger `for_fa_priser` med den
   felaktiga orsaken «DOM:en har sannolikt ändrats». Rättat och omkört.

---

## Dom

**BLOCKERAR** — på [KUND] 1 ensam: `1<U+200B>299 kr/mån` och `1<U+2060>299 kr/mån` ger
fortfarande 299, tyst, och SD-20 kan per konstruktion inte se det. Fynd 2–8 är [VAKT], mergas och
lagas framåt.

Vändningen är rätt design och bör inte backas. Det som fattas är att `KANDIDAT`:s teckenklass
följer med i vändningen — så länge den är en uppräkning av blanksteg är vitlistan bakom den
tillfrågad om fel token, och nästa granskare hittar nästa tecken.
