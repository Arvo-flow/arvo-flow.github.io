# UTKAST — Allmänna villkor v2.0 (ersätter v1.2 från 2026-05-13)

> **Status: utkast, inte publicerat.** `/villkor` (src/pages/Villkor/index.js) visar fortfarande v1.2.
> Texten publiceras först när (1) varje ⟦GRUNDARBESLUT⟧ nedan är avgjort, (2) en jurist läst den, och
> (3) den avtalspart som tar betalt har namn och organisationsnummer. Stripe kräver en juridisk person
> eller en enskild näringsidkare; «verksamhet under bildande» kan inte stå i ett avtal där vi tar betalt.

## Varför v1.2 inte går att ta betalt under (avläst i src/pages/Villkor/index.js, 2026-10-10)

| v1.2 säger | Verkligheten | Källa |
|---|---|---|
| «Inga fasta avgifter … Vi tjänar pengar bara när du faktiskt sparar» (ingressen, §3.1) | 1 995 kr/mån står i sju kundytor och i bibeln | Aktivera, Intelligence, Portfolio, Landing, TestaFaktura, Prospect, välkomstmejlet |
| Ombudskap och fullmakt via BankID att säga upp och ingå avtal (§2.1, sammanfattningen) | Strikt förberedande; ingen fullmakt, ingen BankID-signering | Grundarorder 2026-09-24, `ANSVARSGRANS` i lib/kundmeningar.js |
| 24 timmars ångerfrist (§2.2) | Det finns inget att ångra när Arvo inte agerar | `LOFTEN_UTAN_MEKANISM` |
| Arvodet faktureras «efter Kundens första faktura från den nya leverantören» (§1.3) | §3.2 säger «3 månader efter att det nya avtalet aktiverats» — samma avtal, två tidpunkter | §1.3 mot §3.2 |
| «20 % … under de första 12 månaderna» (sammanfattningen) | §3.2: en engångsavgift | sammanfattningen mot §3.2 |
| §3.3 «ett av Arvo Flow tecknat leverantörsavtal», §4.2 «påbörjade avtalsbyten slutförs», §5.1 «Om Arvo Flow missar att säga upp», §5.2 dubbel-leverans | Arvo tecknar, byter och säger inte upp något | `ANSVARSGRANS.inteOmbud` |
| §4.1 firmatecknarverifiering via BankID mot Bolagsverket | Ingen sådan verifiering finns i koden | Switch `mode:'stub'` |
| «Vi läser endast nödvändig fakturadata via Fortnox» | Fortnox-kopplingen är pausad; fakturor kommer via uppladdning och vidarebefordran | bibeln, «Parkerad: Fortnox/Visma-sync» |
| «Vid avslut raderas din transaktionsdata inom 24 timmar» | Analyser arkiveras och raderas aldrig (proveniensen bär prisboken) | bibeln 2026-09-11, `arkiverad_at` |
| «Vi har en svensk affärsjurist som granskat varje klausul» | Okänt — ingen granskning finns dokumenterad. Får inte stå förrän den är sann | — |
| juridik@arvo.flow | Domänen är `arvoflow.se`. Och `arvoflow.se` hade ingen MX-post när det mättes 29 sep | bibeln, «Första riktiga intaget» |

---

# Allmänna villkor för Arvo

**Version 2.0 · gäller från ⟦datum⟧**

## Sammanfattning

- **Två tjänster.** *Arvo Intelligence* är ett abonnemang för löpande bevakning. *Besparingsunderlaget*
  är en analys med färdiga utkast som ni själva använder. Ni kan använda det ena utan det andra.
- **Abonnemanget kostar 1 995 kr per månad** ⟦GRUNDARBESLUT: exkl./inkl. moms⟧ och har ingen
  bindningstid. Ni säger upp det när ni vill; det upphör vid utgången av den månad ni redan betalat.
- **Arvodet för besparingsunderlaget är 20 % av första årets realiserade besparing**, som en
  engångsavgift tre månader efter att ert nya avtal börjat gälla. Blir det inget nytt avtal, eller
  visar era fakturor att besparingen inte uppstod, blir det inget arvode.
- **Arvo säger inte upp, tecknar eller ändrar avtal åt er.** Vi har ingen fullmakt. Alla beslut och
  alla avtal med leverantörer är era.
- **Arvo tar aldrig ersättning från en leverantör.** Ingen provision, ingen partneravgift, ingen
  rabatt mot volym. Vår enda intäkt är det ni betalar oss.

## 1. Parter och tillämpning

**1.1** Avtalet ingås mellan ⟦juridisk person, organisationsnummer, adress⟧ («Arvo») och det företag
som beställer en tjänst («Kunden»).

**1.2** Tjänsterna riktar sig till näringsidkare. Den som beställer intygar att hen företräder Kunden
och har rätt att ingå avtalet för Kundens räkning. ⟦JURIST: bekräfta att distansavtalslagens ångerrätt
inte gäller när motparten är näringsidkare — obekräftad bedömning⟧

## 2. Definitioner

**2.1 Arvo Intelligence («Abonnemanget»).** Löpande bevakning av de leverantörsfakturor Kunden laddar
upp eller vidarebefordrar till Arvo, med de utskick som beskrivs i 3.2.

**2.2 Besparingsunderlaget («Underlaget»).** En analys av ett av Kundens leverantörsavtal: jämförelsen
mot verifierat publikt listpris och färdiga utkast till uppsägning och nyteckning, som Kunden själv
kan skicka till leverantörerna.

**2.3 Realiserad besparing.** Skillnaden i avtalskostnad, exklusive moms, över de första tolv
månaderna mellan
(a) det pris Kunden betalade enligt sin senaste faktura från den tidigare leverantören före bytet, och
(b) det pris Kunden betalar enligt det nya avtalet,
för samma omfattning av tjänsten. Båda priserna ska vara dokumenterade: (a) genom Kundens faktura och
(b) genom det nya avtalet eller den nya leverantörens första faktura.

**2.4 Verifierat publikt listpris.** Ett pris som leverantören själv publicerar och som Arvo har läst
av vid ett angivet datum. Arvo anger alltid datumet. Ett pris som är en bedömning märks som bedömning.

## 3. Arvo Intelligence

**3.1 Pris och betalning.** Abonnemanget kostar 1 995 kr per månad ⟦GRUNDARBESLUT: exkl. moms
(kunden betalar 2 493,75 kr) eller inkl. moms (varav 399 kr moms)⟧. Det betalas i förskott per
månad med kort genom Arvos betaltjänstleverantör Stripe. Kvitto skickas till den e-postadress Kunden
angett.

**3.2 Vad som ingår.** Med Abonnemanget mejlar Arvo månadsbriefen och prislarmen för Kundens
leverantörer. Arvo läser leverantörernas publika priser varje natt och säger till om något ändras.
Analysen av de fakturor Kunden laddar upp eller vidarebefordrar ingår också utan Abonnemang.

**3.3 Start.** Abonnemanget börjar när den första betalningen har gått igenom. ⟦GRUNDARBESLUT: startar
utskicken automatiskt vid betalning, eller först efter att en av grundarna hört av sig? Dagens
anmälningstext säger det senare (`LOFTEN.intelligenceAnmalan`)⟧

**3.4 Uppsägning.** Abonnemanget löper tills vidare utan bindningstid. Kunden kan säga upp det när som
helst via länken i kvittot eller i sitt rum hos Arvo. Det upphör vid utgången av den period som redan
betalats. Betalda perioder återbetalas inte.

**3.5 Utebliven betalning.** Går en betalning inte igenom försöker Stripe igen. Har betalningen inte
gått igenom inom ⟦GRUNDARBESLUT: t.ex. 14⟧ dagar upphör utskicken. Abonnemanget kan startas igen.

**3.6 Prisändring.** Arvo meddelar en prisändring per e-post minst 30 dagar innan den börjar gälla.
Kunden kan säga upp Abonnemanget innan dess.

## 4. Besparingsunderlaget och arvodet

**4.1 Uppdraget.** Arvo tar fram Underlaget på Kundens beställning. Underlaget är en analys med färdiga
utkast, inte ett avtal. Arvo säger inte upp, tecknar eller ändrar några avtal åt Kunden, och
beställningen ger Arvo ingen fullmakt att göra det. Uppsägning och nyteckning gör Kunden själv, direkt
med leverantörerna, när och om Kunden vill.

**4.2 Arvode.** Tecknar Kunden ett nytt avtal på grundval av Underlaget inom ⟦GRUNDARBESLUT: 12⟧
månader från att Underlaget levererades, utgår ett arvode om 20 % av den realiserade besparingen
(2.3). Arvodet är en engångsavgift och faktureras tre månader efter att det nya avtalet börjat gälla.
Därefter tillfaller hela besparingen Kunden.

**4.3 Inget arvode utan besparing.** Tecknar Kunden inget nytt avtal kostar Underlaget ingenting.
Arvodet beräknas aldrig på en besparing som bara identifierats i en analys — bara på den som
uppstått enligt 2.3.

**4.4 Motbevis.** Fortsätter den tidigare leverantören att fakturera Kunden för samma tjänst efter att
det nya avtalet börjat gälla, har bytet inte skett i den mening som avses här, och inget arvode utgår
för den delen. Visar Kundens fakturor efter faktureringen att besparingen blev lägre än beräknat,
justerar Arvo arvodet och krediterar mellanskillnaden.

**4.5 Underlag för arvodet.** Kunden meddelar Arvo när ett nytt avtal har tecknats på grundval av
Underlaget och lämnar det nya priset ⟦GRUNDARBESLUT + JURIST: utlösarens mekanik. I en strikt
förberedande modell vet Arvo inte av sig själv att ett avtal tecknats (bibeln: «arvodets utlösare
saknar mekanism»). Alternativ: kundens anmälningsplikt, den nya leverantörens faktura vidarebefordrad
till rummet, eller båda⟧. Arvo redovisar beräkningen med båda priserna och deras källor på fakturan.

**4.6 Betalning av arvodet.** Arvodet faktureras genom Stripe med ⟦GRUNDARBESLUT: 30⟧ dagars
betalningsvillkor. ⟦GRUNDARBESLUT: dröjsmålsränta enligt räntelagen⟧

## 5. Arvos åtaganden och ansvar

**5.1 Oberoende.** Arvo tar aldrig emot provision, partneravgift, rabatt mot volym eller någon annan
ersättning från en leverantör. Arvos enda intäkt är det Kunden betalar enligt detta avtal.

**5.2 Underlagets karaktär.** Arvo jämför mot verifierade publika listpriser med angivet datum och
märker varje bedömning som bedömning. Leverantörernas priser och villkor kan ändras efter det datum
Arvo anger. Beslutet att byta leverantör, och avtalet med leverantören, är Kundens.

**5.3 Ansvarsbegränsning.** Arvos ansvar enligt avtalet är begränsat till det belopp Kunden betalat till
Arvo under de senaste tolv månaderna ⟦GRUNDARBESLUT: v1.2 hade ett golv om «lägst 50 000 SEK» — behålls
det?⟧. Arvo ansvarar inte för indirekta skador, såsom utebliven vinst eller förlust av data, och inte
för leverantörers åtgärder eller villkor.

**5.4 Force majeure.** Arvo är befriat från påföljd för underlåtenhet som beror på omständigheter
utanför Arvos kontroll, däribland fel hos tredje part som tjänsten är beroende av (t.ex. Stripe,
e-postleverantörer eller leverantörers webbplatser).

## 6. Uppgifter och sekretess

**6.1** Arvo behandlar personuppgifter enligt integritetspolicyn. ⟦OBS: integritetspolicyn lovar i dag
radering inom 24 timmar medan analyser arkiveras — den måste rättas i samma omgång som villkoren⟧

**6.2** Arvo använder uppgifter ur Kundens fakturor för att leverera tjänsterna och, utan att Kunden
kan identifieras, för att bygga Arvos prisjämförelser. Arvo säljer aldrig Kundens uppgifter.

## 7. Ändringar, uppsägning och tvist

**7.1 Ändring av villkoren.** Arvo meddelar ändringar per e-post minst 30 dagar innan de börjar gälla.
Kunden kan säga upp Abonnemanget innan dess. Pågående Underlag fortsätter att gälla enligt de villkor
som gällde när de beställdes.

**7.2 Tvist.** Svensk lag gäller. Tvister avgörs av ⟦GRUNDARBESLUT: Stockholms tingsrätt⟧.

**7.3 Kontakt.** ⟦adress på arvoflow.se som har en fungerande MX-post⟧

---

## Löften i utkastet och deras mekanik (regel 9) — publiceras inte förrän kolumnen är «finns»

| Punkt | Löfte | Mekanik | Status 2026-10-10 |
|---|---|---|---|
| 3.1 | Månadsbetalning med kort, kvitto per e-post | Stripe Checkout `mode: subscription`; kvitton påslagna i Stripe | byggs i Steg 1; kvittoinställningen är grundarens i Stripe |
| 3.2 | Månadsbrief och prislarm | `lib/premiumkrets.js`, `generate-briefings`, `run-price-alerts` | finns; i dag beviljas kretsen manuellt |
| 3.3 | Start vid betalning | webhooken skriver `premium_beviljad_at` | byggs i Steg 1 |
| 3.4 | Uppsägning via länk, upphör vid periodens slut | Stripes kundportal (`api/stripe/portal.mjs`), `cancel_at_period_end` | byggs i Steg 1 |
| 3.5 | Utskicken upphör efter N dagars utebliven betalning | `premiumLage` på prenumerationens status | byggs i Steg 1 |
| 4.2–4.6 | Arvode på realiserad besparing, motbevis, kredit | `lib/fee.js`, `lib/switcharvode.js`, `lib/arvodeskorning.js` → Stripe Invoice Items | räkningen finns; utlösaren (4.5) och faktureringen saknas |
| 5.1 | Ingen leverantörsersättning | `scripts/claims-audit.mjs` vaktar kopian; affärsbeslut 2026-06-19 | finns |

## Följdändringar när utkastet publiceras (regel 5, en commit)

1. `src/pages/Villkor/index.js` — ny text. Ta bort de två `kundmening-ok`-undantagen för BankID.
2. `KM-05`: ta bort villkorsfilen ur undantagslistan, så att skanningen prövar villkoren också.
3. `lib/kundmeningar.js` / `src/lib/loften.js`: `LOFTEN.intelligenceAnmalan` följer beslutet i 3.3,
   och `ANSVARSGRANS.arvode` ordagrant mot 4.2.
4. `src/pages/Landing/index.js` FAQ: arvodestexten mot 4.2–4.4.
5. Integritetspolicyn: raderingslöftet mot arkiveringen (6.1).
6. Rendering vid 390 och 1600 px (regel 8).
