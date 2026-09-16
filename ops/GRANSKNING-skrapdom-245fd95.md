# Granskning — `lib/skrapdom.js`, `tests/skrapdom.mjs`, `scripts/skrapa-prislista.mjs`, `scripts/probe-prislista.mjs`

commits: 245fd95
datum: 2026-09-16
dom: BLOCKERAR

Granskarens enda uppdrag: **hitta var det gröna är osant.** Varje påstående nedan skrevs
efter att det körts. Sabotage applicerades med `assert old in s` + unikhetskrav; filen
återställdes och `git status` verifierades efter varje. Baslinjen är bekräftad:
`npm run test:algo` → `# pass 2385 / # fail 0`.

---

## Dom i en mening

Extraktionen är mätbart mycket starkare än före commiten, och fyra av de fem sabotage
commiten redovisar håller. Men **`lasPriser` producerar fortfarande ett tal som inte står
på sidan** — ett lägre tal, tyst, innanför sanitetsbandet — och det är beteendefelet
modulen finns för att omöjliggöra. Det blockerar. Allt annat är [VAKT] och lagas framåt.

---

## [KUND] 1 · Tusentalsgrinden vaktar 2 av 10 blankstegstecken — de övriga åtta ger ett FALSKT, LÄGRE tal

**Felet.** `tolkaBelopp` vägrar `[mellanslag | NBSP]` i talet, och docstringen framställer
det som en undantagslös regel («Mellanrumsgrupperat tusental VÄGRAS»). `PRIS_LOST`:s
teckenklass bär bara U+0020 och U+00A0. Varje annat blankstegs- eller osynligt tecken
faller utanför klassen men INNANFÖR `\s`, så mönstret startar om på den andra
siffergruppen och **läser bort tusentalen utan att någon lista nämner det**.

Mätt (`node`, hela batteriet i granskningens skrapyta):

```
SANT PRIS: 1 299 kr/mån   (dvs 1299)
U+0020 SPACE               priser=[]     avvisade=["1 299"]  AVVISAT (högljutt) — korrekt
U+00A0 NBSP                priser=[]     avvisade=["1 299"]  AVVISAT (högljutt) — korrekt
U+2007 FIGURE SPACE        priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299  (sant 1299)
U+2008 PUNCTUATION SPACE   priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+2009 THIN SPACE          priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+200A HAIR SPACE          priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+202F NARROW NBSP         priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+205F MEDIUM MATH SPACE   priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+2060 WORD JOINER         priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
U+200B ZERO WIDTH SPACE    priser=[299]  avvisade=[]         ⚠️ FALSKT TAL: 299
```

**Och kvittot döljer det.** Kvittot är människans enda bevis — modulen deklarerar själv
att sista milen är en människa. Här klipper `fore` av mitt i talet och resten läses som
ett plannamn. Ordagrant utskrift ur `scripts/skrapa-prislista.mjs` rad 118–122, på en
sida som säger `209 · 1 490 · 2 710 kr/mån` (U+2009):

```
✓ UNDERLAG (INTE ett golv, INTE ett verifierat listpris) — 3 prisförekomster lästa, alla entydiga och okvalificerade
  momsbas   exkl   (LÄST nära VARJE pris, aldrig antagen)
  priser    3 förekomster · 209–710 kr/mån          ← sidan säger 209–2 710
       490 kr/mån   …Mellan 1 ⟨pris⟩ …             ← «Mellan 1» ser ut som ett plannamn
       710 kr/mån   …Stor 2 ⟨pris⟩ …
```

**Varför [KUND] och inte [VAKT].** Stoppregeln: *«[VAKT] betyder att felet är i BEVISET,
aldrig i BETEENDET.»* Det här är beteendet — `lasPriser` returnerar 299 för en sida som
säger 1 299. Det är samma felklass som commiten byggdes mot (`VPS 2 199` → 2199), fast
**åt det lägre hållet**, alltså den riktning modulens egen kommentar kallar farlig under
success fee: *«ett för lågt golv överdriver besparingen»*. Ett okänt lånade ett giltigt
värde — bibelns renaste felfamilj.

**Vägen fram till kunden, och dess motbevis — båda redovisade.**
`skrapdom` → Actions-logg → människa för in talet i `BRANCHINDEX` som verifierat publikt
listpris → prisboken. Men jag mätte de två spärrarna på vägen och de HÅLLER i dag:

```
$ node -e "import('./lib/revision-gate.js')…"
reviderade: saas-productivity · saas-finance · mobil · bredband · el · kortterminal · saas-creative · molnvaxel · loneadmin
faktura-tjanst? false
```
`faktura-tjanst` finns inte heller i `BRANCH_ANCHOR_UNIT` (`api/invoice-history.mjs:452`).
Talet kan alltså **inte** nå en kundyta utan ytterligare två commits. Jag säger det rakt ut
i stället för att måla över det. Klassningen vilar därför inte på närhet till kunden utan
på stoppregelns egen knivskarpa gräns: felet sitter i beteendet.

**Uttalad lucka i mitt eget bevis:** jag kunde INTE belägga att någon av de tre
måladresserna använder dessa tecken. De nio committade filerna i `ops/prislistor/` bär noll
av dem — men de är sondrapporter, inte rå `innerText`, så de bevisar ingenting om sidorna.
`Intl.NumberFormat('sv-SE')` använder U+00A0, som ÄR vaktat. Det som talar för risken är att
`&thinsp;` (U+2009), `&#8239;` (U+202F) och `&ZeroWidthSpace;` (U+200B) är vanliga i
CMS-genererad text — inte en mätning, och det säger jag som det är.

**Fixen är ett tecken-klassbyte plus ett test:** låt både `PRIS_LOST`-klassen och
`tolkaBelopp` använda samma uppsättning (`\s` respektive `/\s/`), så att varje
mellanrumsgrupperat tal hamnar i `avvisade` i stället för att halveras. Minuter, inte en dag.

---

## [VAKT] 2 · Varje `NNN kr/<enhet>/mån` försvinner TYST — SD-19:s påstående är motbevisat

Docstringen: *«varje belopp med månadsenhet hamnar nu i exakt en av de två listorna»*.
`lasPriser` matchar enheten som det FÖRSTA ordet efter `kr/`, konsumerar matchningen, och
`continue`:ar utan att skriva något. Den form som då försvinner är den vanligaste på en
svensk SaaS-prissida. Mätt:

```
«Team 99 kr/användare/mån»            priser=0 avvisade=0 -> FÖRSVANN TYST
«Team 99 kr per användare och månad»  priser=0 avvisade=0 -> FÖRSVANN TYST
«Team 99 kr/anv/mån» · «/licens/mån» · «/plats/mån» · «/st/mån»   samtliga TYSTA
«Pro 499 kronor/mån»                  priser=0 avvisade=0 -> FÖRSVANN TYST
«Pro 499 kr/månadsvis»                priser=0 avvisade=0 -> FÖRSVANN TYST  (enhetsgruppen är GREEDY)
```

Dubbel effekt: förekomsten redovisas inte, OCH `enhetskvalificerare`-regeln kan aldrig
fyra på den formen — grinden mot per-användarepris vaktar bara den placering där enheten
står EFTER `kr/mån`. Talen som blir kvar är sanna, därför [VAKT] — men detta är det jag
skulle laga näst efter [KUND] 1.

---

## [VAKT] 3 · Commiten namnger fel orsak till sitt eget [KUND] nr 3 — lookbehinden var aldrig tanden

Modulhuvudet: *«Lookbehinden `(?<!\d[\s ])` fick «VPS 2 199 kr/mån» att inte matcha ALLS»*
och *«Ankaret är rivet»*. Commitmeddelandet: *«S3 lookbehind-ankaret återinfört -> 1 test föll»*.

Mätt, två läsningar av samma sabotage:

```
S3a · BÅDA lookbehinds återinförda, NYA lösa token-gruppen kvar
      # pass 2385  # fail 0
      SD-19:s fixtur -> priser [99,499] avvisade ["50 99","25,000"]  summa 4 av 4   (IDENTISKT utfall)

S3b · HELA gamla regexen återinförd (lookbehind + GAMLA token-gruppen)
      # pass 2384  # fail 1
      SD-19:s fixtur -> priser [99,499] avvisade ["25,000"]  summa 3 av 4
```

Lookbehinden ensam ändrar **ingenting** — noll tester, identiskt utfall. Det som bar det
tysta bortfallet var den gamla **token-gruppen** `\d{1,3}(?:[\s ]\d{3})*`, som inte kunde
svälja `50 99` och därför lämnade lookbehinden att blockera nästa startpunkt. Att riva
ankaret var alltså ett beteendemässigt no-op som presenteras som fixen. Det citerar bibelns
10-septemberregel och begår dess spegelbild: **orsaken tillskrevs det yttre skyddet, aldrig
mätt mot det inre.** Nästa läsare som återinför lookbehinden av ett legitimt skäl kommer
att läsa docstringen som att hen återinför ett [KUND] — och sviten säger grönt.

---

## [VAKT] 4 · `lasMomsbas`:s «alla måste vara överens»-gren fäller noll

Sabotage: `return baser.every((b) => b === baser[0]) ? baser[0] : 'okand';` → `return baser[0];`

```
# pass 2385  # fail 0
```

Grenen är NÅBAR och beteendeändringen är verklig — mätt på en sida med `exkl moms` nära
pris 1 och `inklusive moms` nära pris 2 och 3:

```
före sabotage: baser ['exkl','inkl','inkl'] -> lasMomsbas okand -> skrapdom [momsbas_okand]
efter        : baser ['exkl','inkl','inkl'] -> lasMomsbas exkl  -> skrapdom [underlag]
```

En sida med företags- och privatpriser sida vid sida (mycket vanlig) skulle få hela
underlaget stämplat med det FÖRSTA prisets bas. Grenen fungerar i dag, den är bara oprövad.
SD-18 täcker `okand`-vägen, aldrig oenighetsvägen.

---

## [VAKT] 5 · Kvalificerarnas ORDFÖRRÅD är oprövat — tre sabotage, noll fällda

```
SA · enhetsregeln tappar allt UTOM «per användare»           # pass 2385  # fail 0
SB · kampanjregeln tappar allt utom de fyra testade          # pass 2385  # fail 0
SC · bindningsregeln tappar allt utom «vid N mån»            # pass 2385  # fail 0
SD · tidsregeln tappar allt utom «första N mån»/«därefter»   # pass 2385  # fail 0
```

`rabatt`, `rea`, `erbjudande`, `nu endast`, `fr.o.m`, `introduktion`, `bindning`,
`bindningstid`, `N mån avtal`, `årsavtal`, `uppsägningstid`, `first month`, `efter N mån`,
`N mån gratis`, `anställd`, `seat`, `licens`, `user`, `anv.`, `/användare` kan alla raderas
utan att sviten säger något.

Och den deklarerade FÅNGAR-listan (*«kampanj-, tids-, bindnings- och enhetskvalificerare på
BÅDA sidor»*) är bredare än koden. Mätt genom hela `skrapdom`:

```
«Pro 499 kr/mån per person»            SLÄPPS IGENOM -> [underlag]
«Pro 499 kr/mån per plats»             SLÄPPS IGENOM -> [underlag]
«Pro 499 kr/mån per medarbetare»       SLÄPPS IGENOM -> [underlag]
«Prova 3 månader för 499 kr/mån»       SLÄPPS IGENOM -> [underlag]
«Pro 499 kr/mån i 6 månader»           SLÄPPS IGENOM -> [underlag]
«Pro 499 kr/mån vid årsvis betalning»  SLÄPPS IGENOM -> [underlag]
«Pro 499 kr/mån (ord. 999)»            SLÄPPS IGENOM -> [underlag]
«Halva priset: 499 kr/mån»             SLÄPPS IGENOM -> [underlag]
```

Riktningen är fail-open på en grind vars hela syfte är att blockera. Talen är sanna och
kontexten trycks bredvid dem, därför [VAKT] — men `blind`-deklarationen bör namnge att
ordförrådet är en lista, inte en mekanik.

---

## [VAKT] 6 · `blockerar` är oprövad för 5 av 6 koder — och det är fältet konsumenten grenar på

`tests/skrapdom.mjs` asserterar `blockerar === true` på exakt två ställen (rad 77, 158),
båda i `tvetydigt_tal`. `sidan_olasbar`, `for_fa_priser`, `kvalificerat_pris`,
`utanfor_band` och `momsbas_okand` prövas bara på `kod`. Både
`scripts/skrapa-prislista.mjs` och sviten läser alltså olika fält.

```
SJ · kvalificerargrinden slutar blockera (blockerar:true -> false)   # pass 2385  # fail 0
```

Kört genom skriptets riktiga kodväg med en kampanjsida:

```
✓ UNDERLAG (INTE ett golv, INTE ett verifierat listpris) — 3 av 3 prisförekomster ligger inom 70 tecken från en kvalificerare…
TypeError: Cannot read properties of null (reading 'url')   at skrapa-prislista.mjs:119
EXITKOD: 1
```

Detta svarar direkt på granskningsfråga 5: invarianten **`blockerar === false ⟹ underlag !== null`**
håller i dag enbart av konstruktion. Den är inte asserterad i modulen, inte prövad i sviten,
och inte vaktad i skriptet. Exitkoden är 1, alltså fail-closed — men raden `✓ UNDERLAG`
hinner skrivas ut ovanför kraschen.

---

## [VAKT] 7 · `KONTEXT_FONSTER`:s fore-halva har ingen tand

```
SF · fore-fönstret hårdkodat till 12 tecken (konstanten står kvar 70)   # pass 2385  # fail 0
SG · efter-fönstret hårdkodat till 12 tecken                            # pass 2383  # fail 2
```

Efter-halvan är vaktad. Fore-halvan är det inte: SD-19:s `assert.equal(KONTEXT_FONSTER, 70)`
läser konstanten, inte mekaniken, och SD-15 bevisar bara ≥11 tecken (`'Pro kostar '`).
Det är MOMS_FONSTER-sjukdomen som commiten just lagade, kvar på grannaxeln — en konstant
vars namn lovar 70 tecken och vars mekanik bara är bevisad till 11.

---

## [VAKT] 8 · Sorteringen av underlaget har ingen tand

```
SH · [...priser].sort(...) -> [...priser]     # pass 2385  # fail 0
```

Beteendet ändras: en sida i fallande ordning ger rubrikraden

```
priser 3 förekomster · 710–209 kr/mån
```

`lagsta`/`hogsta` är de två tal en människa läser först. SD-06:s fixtur är redan sorterad,
så den kan aldrig se det. En människa skulle märka 710–209, vilket är varför det är [VAKT]
och inte värre.

---

## [VAKT] 9 · Ett NÄTVERKSFEL rapporteras som «rätt utfall»

`lib/verifiers/core.mjs:47-48` fångar navigeringsfel INTERNT och sätter
`status = 'ERR ' + meddelande` — en **sträng** — och anropar `fn(page, status)` ändå (rad 54).
Skriptets två skydd missar båda: `typeof status === 'number' && status !== 200` är falskt
för en sträng, och `r.fel` sätts bara om `withPage` själv kastar. Kört med en stubb som
återger core.mjs rad 46–54 ordagrant, tre oåtkomliga adresser:

```
  https://www.fortnox.se/produkt/prislista → status ERR net::ERR_NAME_NOT_RESOLVED …, 0b
      domen: [sidan_olasbar] sidan gav 0 tecken — det är ett utfall om HÄMTNINGEN, aldrig om priset
  … (samma för bokio och billogram)

✗ INGEN ADRESS GAV ETT ENTYDIGT PRIS — och det är rätt utfall, inte ett fel att runda av.
EXITKOD: 1
```

Slutsatsraden — den enda en operatör läser — säger «rätt utfall» om noll rekognosering.
Det är exakt den sjukdom skriptets egen kommentar namnger (*«ETT VERKTYGSFEL FÅR ALDRIG SE
UT SOM «INGET PRIS»»*), och exitkoden 1 kan inte skilja «sidorna vägrade» från «runnern
hade inget nät». Förmildrande, och det ska sägas: ERR-strängen skrivs ut per adress, och
`skrapdom`:s eget skäl säger «ett utfall om HÄMTNINGEN» — en noggrann läsare ser det.

Sidofynd i samma fil: `KATALOG[k] = []` passerar `if (!KANDIDATER)` (en tom array är
truthy), loopen kör noll varv och skriptet skriver «Skälen står ovan» utan ett enda skäl.

---

## [VAKT] 10 · Negativa belopp läses som positiva

```
«Rabattrad -99 kr/mån»        -> priser=[99]
«Justering −250 kr/mån» (U+2212) -> priser=[250]
```

Tecknet konsumeras aldrig av mönstret. `rabatt` fångas av kvalificeraren, men `avdrag`,
`justering` och `kreditering` gör det inte, och ett kreditbelopp kan då bli `lagsta`.
Minustecknet står kvar sist i `fore` och syns i kvittot, därför [VAKT].

---

## [VAKT] 11 · Kvadratisk körtid vid mycket stor sidtext — mätt, och INTE en blockerare

```
realistisk prislista   3 900b ->     3 ms      nummertabell 122 000b ->     4 ms
realistisk prislista  31 200b ->    10 ms      sifferbrus    19 998b ->   560 ms
realistisk prislista 156 000b ->   300 ms      sifferbrus    79 992b ->  9 188 ms
realistisk prislista 624 000b -> 4 135 ms      sifferbrus   199 998b -> 56 872 ms
de nio riktiga ops/prislistor/*.txt  ->  0–1 ms
```

`[\d ⍽.,]*\d` ger O(n²) över långa löpor av siffror/mellanrum. Vid de storlekar sonden och
skrapan faktiskt möter (0,4–31 kB) är kostnaden 0–10 ms. Jag rapporterar det som en
mätning, inte som en oro — workflow-taket är 10 minuter och marginalen är tre
tiopotenser.

---

## Svar på granskningsfråga 6 — sonden

`skrapdom` kan inte kasta för en sträng. Mätt över `''`, `Symbol`, `Array`, ensamma
surrogat, `undefined` och anrop utan argument: samtliga returnerar en dom. De två
kastande indata (`skrapdom(null)` och ett objekt vars `toString` kastar) kan inte
uppstå i sonden, som skickar `await page.evaluate(() => document.body.innerText || '')`.
Och om något ändå dör: `[probe-prislista] … klar` skrivs efter loopen och är en
fullbordandemarkör, så en död mitt i en mätning SYNS. Tillägget introducerar inget fel.

---

## Vad som ÄR sant

- Baslinjen: `npm run test:algo` → **2385/2385**, verifierad före och efter varje sabotage.
- S5 (naket `m` i månadsenheten) fäller 1 test — bekräftat.
- SI (sanitetsbandets undre gräns rivs) fäller 1 test — bandet har tänder i båda ändar.
- SG (efter-fönstret krympt) fäller 2 test — kontexten åt HÖGER är verkligt vaktad, och
  det var commitens tyngsta [KUND].
- Tvetydighetsregeln för U+0020/U+00A0 och `25,000`/`1.299` fungerar och är sabotage-bevisad.
- `ops/prislistor/*.txt` genom `skrapdom`: bokio och fortnox faller på `kvalificerat_pris`,
  alltså exakt det röda utfall skriptets docstring förutsäger. Den meningen var körd.

## Mitt eget mätinstrument var felet två gånger

1. Ett tvåbas-momstest gav `inkl` i stället för `okand` — den greedy enhetsgruppen svalde
   min fyllnadstext så bara ETT pris lästes. Rättat med separerad fyllnad; fyndet om
   greediness föll ut ur rättelsen.
2. Mitt första S3-sabotage var en NO-OP: NBSP-byten överlevde inte shell-citeringen.
   `assert old in s` fångade det. Utan den hade jag rapporterat «S3 fäller noll» på ett
   sabotage som aldrig applicerades — och slutsatsen hade råkat bli rätt av fel skäl.

---

## Dom

**BLOCKERAR** — på [KUND] 1 ensam. Fixen är en teckenklass och ett test.
Fynd 2–11 är [VAKT], mergas och lagas framåt.
