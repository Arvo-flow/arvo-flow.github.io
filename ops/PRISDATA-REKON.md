# Prisdata-rekognosering — vilka tysta kategorier har ett publikt SEK-listpris?

> Målet: 19 av 28 kostnadsslag tiger, för att de saknar ett **verifierat publikt SEK-golv**.
> Vägen ut går inte genom kod utan genom prisdata. Det här är kartan, byggd en leverantör i taget.
>
> **Fyllningsregel:** en rad skrivs först när en sond FAKTISKT läst sidan. Ett pris ingen läst
> står aldrig här. Ett «JA» utan URL och tal är ett påstående, inte en mätning.

## Utfall

| Kategori | Leverantör | Publik SEK-lista | Källa | Mätt |
|---|---|---|---|---|
| serverhosting | Loopia | **JA** | `loopia.se/webbhotell/priser/` | 2026-09-02 |

## Loopia — första bekräftade fyndet (2026-09-02)

Ordinarie priser, **exklusive moms** (sidan skriver ut det själv: *"Alla priser är exklusive moms"*):

| Paket | kr/mån | kr/år |
|---|---|---|
| Privat | 159 | 1 908 |
| Företag | 279 | 3 348 |
| Företag Plus | 489 | 5 868 |

Kvartalsavgifter finns också utskrivna: 507 · 867 · 1 497 kr exkl moms.

### Tre fynd som styr hur verifieraren måste byggas

1. **KAMPANJFÄLLAN ÄR AKTIV OCH FARLIG.** Sidan visar `39 kr första året därefter 279 kr`.
   En verifierare som tar 39 kr som listpris hade fått en kund på 279 kr att se ut att
   överbetala med 615 %. Det är HubSpot-fällan (bibeln, 2026-08-06) ordagrant, mitt på
   förstasidan. **Ordinarie pris är listpriset; kampanjpriset kan bara vara lägre.**
   Erbjudandet gäller t.o.m. 2026-12-31 enligt sidans egen text.

2. **PRISSIDAN ÄR LÄSBAR UTAN WEBBLÄSARE — ÖVERSIKTSSIDAN ÄR DET INTE.**
   `/webbhotell/priser/`: 9 av 21 tal fanns i rå HTML, inklusive samtliga årspriser.
   `/webbhotell/`: **0 av 6** — allt injiceras av JavaScript.
   `/vps/`: 0 av 1.
   Konsekvens för flottan: rikta sonderna mot **prissidor**, inte översiktssidor. Då slipper
   verifieraren ofta Playwright, och svepet blir billigare.

3. **Cookie-vägg** på prissidan måste klickas bort («Godkänn alla»), annars ser man ingenting.

### Kvarstående brist i sondformen — måste lagas före fan-out

Sonden hittade **inga paketnamn**: rubrik-till-pris-kopplingen gav noll träffar på alla fem
sidor. Vi vet alltså priserna men inte maskinellt vilket paket varje pris hör till.
**Ett pris utan produkt är ett tal utan påstående** (bibeln, MK-08). Måste lagas innan
någon prisbokspost skrivs.

### Och en brist i workflowen

`probe-loopia-priser.yml` saknar `permissions: contents: write`, så Actions-boten kunde inte
spara utfallet (403). Resultatet fanns bara i körloggen. Varje sond i flottan skulle ha samma
problem — laga en gång, ärvs av alla.

## Observandum om prisbokens egen lista

`serverhosting` listar i dag Hetzner, OVHcloud, Telenor Datacenter och AWS Lightsail som
alternativ. **Hetzner och OVHcloud prissätter i euro.** Det är samma fälla som `saas-crm`
(Pipedrive/HubSpot/Zoho i USD): färskt verifierade priser som ändå inte kan bära ett SEK-golv.
De svenska aktörer som faktiskt går att ankra mot — Loopia, Binero, GleSYS, City Network —
saknas i vår egen lista. **Fan-outen ska därför inte enbart läsa prisbokens `alternatives`;
den listan är delvis biased mot utländska leverantörer.**

## Måltavla för flottan

66 namngivna leverantörer i 17 tysta kategorier, härledda ur prisbokens `alternatives`.
Se `agents/recommender/branchindex.js`. Kompletteras med svenska aktörer per kategori.
