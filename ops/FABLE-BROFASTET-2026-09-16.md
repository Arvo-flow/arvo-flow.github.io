# Fable-domen: Brofästet — helautomatisk skrapa eller människoassisterad kö? (2026-09-16)

**Från:** Fable 5.1 (oraklet) · **Beställd av:** grundaren via Opus 5 · **Typ:** strategisk dom, inte kodgranskning.
Ingen kod ändrad. Varje mätvärde nedan är läst eller kört av mig i repot; det som inte gick att
köra härifrån står under §6.

---

## 1 · Svaret, i en mening

**Ja — verifierade publika listpriser är fortfarande rätt brofäste, men ingen av de två mekanikerna
är rätt: det som fyller en kategori är en människoförfattad verifierare per källa (mekaniken som
redan bär era nio talande kategorier), och skrapan ska degraderas till rekognosering som matar den
människans kö — den får aldrig bli en maskin som producerar ett golv.** Den «människoassisterade
kön» är närmast rätt av de två, men med människan felskopad: hennes jobb är inte att bekräfta ett
tal på tio sekunder, det är att deklarera en PRISSTRUKTUR en gång per källa (referensprodukt ·
enhet · momsbas · vad som ingår) — och det tar en timme, inte tio sekunder.

---

## 2 · Skälet — ur mätdatan, inte ur allmänna resonemang om skrapning

**(a) Den enda sida där skrapan hittade rena par tillhör en kategori som redan talar — via en
människa som tog kvalificeraren i stride.** Fortnox prislista (40 par) och Bokio (8 par) är
BOKFÖRINGSSYSTEM, alltså `saas-finance` — inte `faktura-tjanst` (utskickstjänst; Billogram). Och
`saas-finance` är redan i `REVIDERADE_KATEGORIER`, med `fortnoxVerified.paket: {Mini: 209, Liten:
349, Mellan: 490, Stor: 710 …}` inskrivet för hand (`branchindex.js:737–744`) och vaktat veckovis av
`lib/verifiers/fortnox.mjs`. Kvalificeraren «Listat pris avser första användaren, därefter ordinarie
licenspriser» stoppade aldrig människan: hon deklarerade *paketpriset = det bolag faktiskt köper*
och gick vidare. Samma sida som skrapan förutspås falla rött på är alltså **redan löst av den
mekanik ni har**. Skrapan återuppfinner den, med lägre upplösning.

**(b) På kategorierna skrapan faktiskt siktar på är utbytet inte «ofta rött» — det är noll.**
`serverhosting`: 0 kr/mån-planpriser på fem sidor (och prisboken säger `requiresVolumeData: true`
utan matris — ett skrapat pris hade inte haft någonstans att ta vägen). `faktura-tjanst`: Billogram
0 par, JS-renderad. De 48 rena paren hör till fel kategori. Frekvensen rött är inte ett pris värt att
betala — den är mätningen som säger att mekaniken är fel vald för uppgiften.

**(c) Momspremissen är delvis instrumentet.** Sondens `MOMS_RE` (`probe-prislista.mjs:51`) matchar
`exkl\.?\s*moms` — och är därmed **blind för «exklusive moms», «inklusive moms» och
«mervärdesskatt»** (kört: tre av sex vanliga formuleringar BLIND). Loopias sida, sonderad 2 sept med
den äldre sonden, skriver *«Alla priser är exklusive moms»* — och hade räknats som «saknar momsbas»
av flottans instrument. «8 av 8 saknar momsbas» är därför en ÖVRE gräns, inte en mätning.
Kvalificerarpremissen däremot är verklig och strukturell — det är den som bär frågan.

**(d) Skrapdomen gör exakt vad den ska, och det är poängen.** Körd på Fortnox-formad text →
`kvalificerat_pris`; på Bokio-formad → `momsbas_okand`. Den kan bara säga «vägrar» eller «tecknen
är entydiga» — aldrig «paketpriset gäller första användaren och tilläggsanvändare kostar X». Det
sista är den information kunden behöver för att jämföras rätt, och den kan bara en människa skriva in
som struktur. **En fail-closed skrapa mot svenska B2B-prissidor är per konstruktion en maskin som
producerar röda kvitton** — det är korrekt beteende och noll brofäste.

**(e) Kostnaden hittills, mätt i git:** skrapan 4a9b799 → aa95448 = 17 timmar väggklocka, 6 commits,
2 granskningar (båda BLOCKERAR), **0 kategorier fyllda**. Prejudikatet för människovägen står i
bibeln: fem verifierare byggda på EN natt (5–6 aug), alla 18 deklarerade 12 aug, `loneadmin` /
`molnvaxel` / `saas-creative` var sin session. **Marginalkostnaden per källa via människa+agent är
timmar; via helautomatisk skrapa är den obegränsad, för utfallet är rött oavsett.**

**(f) Byggarens motivering för målet håller inte heller.** «Prisbokens `faktura-tjanst` är
`estimated` i en matris som redan når kund» — jag körde sifferrevisorn: *«tystnadsgarantin bevisad
för 19 oreviderade kategorier»*. Revisionsgrinden kortsluter `recommend()` före all beräkning;
outbound-estimatorn täcker bara mobil + saas-productivity; branschankaret filtrerar `real-public`.
Matrisen når ingen kund. Det som når kunden för `faktura-tjanst` i dag är den ärliga offerttexten.

---

## 3 · Mekaniken jag rekommenderar — byggbar, med gränsen utskriven

**Steg 0 — mät ordningen innan något fylls.** `probe-kategorifrekvens.mjs` finns men har inget
committat utfall i `ops/`. Fyll aldrig i den ordning prissidorna är lättast att läsa; fyll där
tystnaden kostar er flest fakturor.

**Steg 1 — Maskinen (skrapan som rekognosering, inte som producent).** Per kandidatkälla en gång:
hittar prissidan (renderat, cookie-vägg klickad), citerar varje prisförekomst med ±70 tecken
kontext, momsfynd (rätta `MOMS_RE` till skrapdomens `EXKL_RE`/`INKL_RE` — regel 1, en läsare),
kvalificerare med namn, och skrapdomens kod. Utdata är ett **kö-kort**, aldrig ett tal i prisboken.
Fail-closed-grinden behålls exakt som den är — men dess `blockerar: true` betyder nu «lägg i kön
med skäl», inte «misslyckades».

**Steg 2 — Människan (en timme per källa, en gång).** Öppnar sidan med kö-kortet bredvid och
deklarerar prisstrukturen i `BRANCHINDEX` — samma form som `fortnoxVerified`/`spirisVerified`
redan har: `referensProdukt` (MK-08), `unit` (`kr_per_manad_exkl_moms`), vad som ingår (t.ex.
«1 användare; tillägg N kr/anv/mån»), `url`, `lastVerified`. **Det är deklarationen som är
arbetet — inte bekräftelsen av ett tal.** Tio sekunders «ja, 349 stämmer» utan struktur ger samma
fel som skrapan, bara långsammare.

**Steg 3 — Maskinen igen (verifieraren, veckovis).** En `lib/verifiers/<källa>.mjs` med
`fangar`/`blind`/`bevakadeTiers`/`bevakadKategori` (vaktkontraktet), som ankrar på de deklarerade
etiketterna precis som `fortnox.mjs` gör. Rött vid drift → prisboken rättas av en människa. Först
när verifieraren är grön och en regressionssvit låser kortets aritmetik går kategorin in i
`REVIDERADE_KATEGORIER`. Det är befintlig räls; ingen ny produkt.

**Gränsen:** maskinen får *hitta, citera och vakta*. Maskinen får aldrig *välja referensprodukt,
tolka en kvalificerare eller skriva ett tal i prisboken*. Det är inte en begränsning i skrapan — det
är regel 3 och MK-08 tillämpade på var beslutet faktiskt fattas.

**När en sida bär en kvalificerare:** kortet klassas av människan i en av tre utgångar, och
utgången skrivs i prisboken:
1. **Struktur** («första användaren», «1 användare ingår») → deklareras som prisstruktur med
   tilläggspris; talet är ett listpris FÖR den strukturen. (Fortnox-fallet. Redan gjort.)
2. **Villkor** («vid 12 mån bindning», «årsbetalning») → listpriset är det OBUNDNA/månadsvisa om
   det står; annars deklareras bindningen som del av referensprodukten och jämförs bara mot kunder
   med samma bindning. Saknas obundet pris → kategorin får inte tala på den källan.
3. **Kampanj** («första året», «från») → aldrig ett golv. Ordinarie pris eller inget (HubSpot-läxan).

**Vad grundaren får ut, i affärstermer:** tid till första nyfyllda kategori = *en arbetsdag*
(kö-kort + deklaration + verifierare + svit) om kategorin har en publik SEK-källa; marginalarbete
per ytterligare källa = *timmar*; och utfallet är ett `real-public` som bär ordet «verifierat» på
riktigt. Med helautomatisk skrapa: tid till första fyllda kategori = *obestämd*, för den kan inte
producera det som saknas.

---

## 4 · Asymmetrin — vad det kostar att ha fel, åt vardera hållet

**Om jag har fel och skrapan hade kunnat fylla kategorier automatiskt:** ni har lagt några
mänskliga timmar per källa på deklarationer som en maskin hade kunnat hoppa över. Bunden, synlig,
återvinningsbar kostnad — och deklarationerna är ändå prisbokens krav (MK-08), så arbetet är inte
förspillt.

**Om jag har rätt och ni ändå bygger helautomatiskt:** två utfall, båda dyra.
· *Skrapan gör sitt jobb* → rött på varje svensk B2B-prissida (mätt: 0 underlag på målkategorierna).
  Cold Start blir inte kortare — den blir en flotta gröna workflows som rapporterar «rätt utfall»
  medan 19 kategorier tiger. Kostnaden är tid, plus självbedrägeriet att brofästet «byggs».
· *Skrapan släpper igenom* → riktningen är mätt av era egna granskare, två varv i rad: `1 299 →
  299`, `2 199 → 199`, «Mellan 1» som plannamn — **systematiskt åt det LÄGRE hållet**, alltså den
  riktning som överdriver besparingen och därmed ert arvode. Ett paketpris för första användaren
  draget som per-användare-golv gör en treanvändarkund på exakt listpris till en «överbetalare»,
  producerar en besparing som aldrig funnits, och under 20 % success fee är det en faktura ni
  får kreditera plus ett förtroende ni inte får tillbaka. Det är smyghöjningens läxa (5 aug:
  «en inaktuell prisbok TILLVERKAR besparingar») med omvänt förtecken.

**Om ni väljer kön men skopar människan till «tio sekunder»:** samma fel som skrapan, långsammare.
En bekräftelse av ett tal utan deklaration av vad talet är PER är regel-3-brottet i mänsklig kostym.

Sammanvägt: den dyra riktningen är för lågt golv, och det är precis den riktning maskinen driftar
åt. Därför ska maskinen aldrig hålla pennan.

---

## 5 · Vad jag hade gjort i stället — och det utmanar grundarens «19 tysta»

Svaret på fråga 1 är ja, så detta är inte ett alternativ till listpriser utan en rättelse av
målet. **«Vi kan inte lansera 19 tysta kategorier» är rätt oro men fel tal.** Av de 19:

| klass | kategorier | kan listpris bära dem? |
|---|---|---|
| `requiresVolumeData` (ingen enhet att jämföra per) | serverhosting · utrustningsleasing · leasing-bil · kontorsmaterial · städ-rengöring · transport-frakt · saas-other | **nej, per konstruktion** |
| offert-/upphandlingsprissatt (Nivå 3 i bibeln) | forsakring-foretag · forsakring-ansvar · larm-bevakning · it-support · avfall-atervinning · foretagshalsovard · skrivarleasing (gatad 14 jun av just det skälet) · managed-workplace | **nej** — där finns inget listpris att verifiera |
| USD-prissatt | saas-crm | nej förrän en svensk SEK-lista finns |
| realistiskt listprisbara | **faktura-tjanst · bankavgifter · uncategorized-restposten (≈0)** | **ja — två** |

Brofästet kan alltså spänna över ungefär **två** av de nitton, oavsett mekanik. Femton till
sjutton kategorier förblir tysta i den mening att de saknar ett verifierat golv — och det är inte
en lucka att fylla utan en produktsanning: de är Nivå 3, där bibeln redan säger att Arvo
*beväpnar* (fyndet, tajmingen, motbudet) och aldrig utlovar ett byte. **Rätt lanseringsdrag för de
femton är inte tystnad och inte ett golv — det är Nivå-3-kopian i offertläget:** «här finns inget
publikt listpris; vi bevakar avtalsslut och förbereder motbudet». Det är samma premiumsignal som
«gör inget» i veckodomen, och det kräver ingen prisdata alls.

Konkret ordning, om ni följer domen: (1) kör frekvenssonden och committa utfallet; (2) fyll
`faktura-tjanst` och `bankavgifter` via kön i §3 — bankernas företagspaket är publicerade SEK-listor
och en verklig kandidat sonden ännu inte mätt; (3) skriv om offerttexten för Nivå-3-kategorierna
från «vi saknar data» till «det finns inget listpris — så här agerar vi i stället»; (4) låt skrapan
leva som `probe-prislista` + kö-kort, riv `skrapa-prislista.mjs`:s anspråk på att vara mer än det.

---

## 6 · Vad jag INTE kan bedöma härifrån — uttalad blindfläck

1. **Jag har inte läst en enda prissida live.** Sandlådan gav `CONNECT tunnel failed, 403` på
   Bokio, Fortnox och Billogram. Momsfyndet (§2c) är bevisat ur instrumentets regex, inte ur en
   omläsning av sidorna; hur många av de åtta som faktiskt skriver «exklusive moms» vet jag inte.
2. **Ordningen är omätt.** Frekvenssonden har inget committat utfall, så jag vet inte vilka tysta
   kategorier som kostar er flest fakturor. Ligger toppen bland Nivå-3-kategorierna är §5:s
   kopiaåtgärd viktigare än hela prisdatafrågan; ligger den i `faktura-tjanst` är kön viktigare.
3. **Människans kapacitet.** Köns genomströmning är en person. Jag kan mäta kod, inte grundarens
   kalender — «en timme per källa» är ett prejudikat ur bibeln, inte en mätning av september.
4. **Fortnox-kvalificerarens räckvidd.** I min simulering fällde skrapdomen bara Förening-raden
   (fönstret är 70 tecken); på den riktiga sidan vet jag inte om fotnoten gäller alla paket eller
   ett. Den mänskliga deklarationen `paket = första användaren` står redan i prisboken — om den är
   fel för Mini/Liten/Mellan/Stor är det ett [KUND]-fynd i en kategori som redan talar, och det
   kan bara den som öppnar sidan avgöra.
5. **`bankavgifter` som kandidat är ett antagande om marknaden**, inte ett mätvärde: jag vet att
   svenska banker publicerar företagspaketpriser, jag har inte sonderat en enda sida.
6. **Repohistoriken börjar 1 sept** (squash), så verifierarnas byggtid kommer ur bibelns egna
   anteckningar, inte ur git.

---

*Domen i kortform: brofästet står, skrapan är ett rekognoseringsverktyg som fått ett producentjobb,
människan är felskopad från «bekräfta» till «deklarera», och «19 tysta» är egentligen «två
listprisbara och femton Nivå 3 som behöver rätt kopia, inte ett golv».*
