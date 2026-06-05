# Arvo — Manifestet

---

## VAD VI BYGGER

Arvo är den intelligens svenska SMF-ägare aldrig haft tillgång till.

Inte ett verktyg de loggar in på. Inte en rapport de beställer. En tyst finansdirektör som vaktar åt dem dygnet runt — och som hör av sig när något hänt som de inte visste att de behövde veta.

Det enda som bevisar att vi faktiskt är det:

> *"Vi noterade att Telia höjde priset för 8 av 14 bolag i er bransch förra månaden. Ni är troligtvis nästa."*

Det mejlet — utan att kunden bett om det — är Arvo. Allt annat är infrastruktur runt det momentet.

---

## KUNDEN VI TJÄNAR

En svensk SMF-ägare eller ekonomiansvarig hanterar leverantörsekonomi i marginalen av sin tid. De har inga specialister. Ingen inköpsavdelning. Ingen som vaktar att fakturorna stämmer mot avtalet, att avtalet förnyas i tid, eller att marknaden rört sig sedan de senast förhandlade.

De betalar för mycket — inte av okunskap, utan av brist på rätt information vid rätt tillfälle.

Vad de behöver är inte ett verktyg till. De behöver någon som gör jobbet åt dem när de har annat att göra.

**Det är Arvos löfte: vi märker det. Ni behöver inte.**

---

## DET ENDA MÅTTET SOM RÄKNAS

Innan varje beslut — kod, design, strategi, copy — ställ en fråga:

> *Skulle en svensk CFO som fick se detta stanna upp och tänka: "Hur visste de det?"*

Om svaret är nej — om det bara är vettigt, rimligt, eller tekniskt korrekt — är det inte 0,1%. Då tänker vi om.

Leverera aldrig något under visionen utan att säga det direkt. Formulera exakt vad som saknas och vad det 0,1%-draget hade varit istället. Tystnad är inte neutralt — tystnad är ett misslyckande.

---

## STRATEGISKA BESLUT

Dessa är fattade. De ifrågasätts inte utan ny diskussion — men de utmanas aktivt om verkligheten förändras.

**1. Vi förvärvar revisorer, inte SMF:er**
Varje revisor betjänar 50–200 SMF-kunder och har redan deras förtroende och tillgång till deras fakturor. En revisor som rekommenderar Arvo är hundra gånger mer kraftfull än hundra kalla mail. Vi bygger för revisorn som hjälte, inte för Arvo som avsändare.

**2. Email-vidarebefordran är vår primära datakanal**
Varje kund får en unik adress — `analys-[hash]@arvoflow.se` — och sätter upp automatisk vidarebefordran. Noll friktion. Kontinuerligt flöde. Arvo ser varje ny faktura utan att kunden behöver göra något.

**3. Arvo kommer alltid till kunden — aldrig tvärtom**
Vi väntar inte på att bli tillfrågade. Vi identifierar, analyserar och hör av oss med ett fynd. Det är skillnaden mellan ett verktyg och en finansdirektör.

**4. Varje faktura gör Arvo smartare för alla**
Vår moat är inte tekniken — det är prisintelligensen vi bygger genom varje analys. Arvo efter 10 000 fakturor vet saker ingen konkurrent kan replikera: vad Telia faktiskt tar av bolag i er storlek, vilka leverantörer som smyghöjer utan att informera, vilka branscher som systematiskt betalar för mycket.

**5. Vi tjänar bara när kunden tjänar**
Layer 2 (Arvo Switch): 20 % av realiserad besparing. Vi fakturerar när nästa faktura visar ett lägre pris — inte innan. Arvo och kunden är alltid på samma sida av bordet.

---

## PRODUKTENS TRE LAGER

| Lager | Vad det är | Intäktsmodell |
|---|---|---|
| **Arvo Intelligence** | Proaktiv bevakning, varningar, CFO-brief | 1 995 kr/mån |
| **Arvo Switch** | Arvo genomför bytet — kunden trycker play | 20 % av besparing |
| **Data Moat** | Prisintelligens som växer med varje faktura | Konkurrensförsprång |

Intelligence marknadsförs aldrig som en feature-lista. Det kommuniceras alltid som en relation — CFO:n som ringer dig, inte verktyget du loggar in på.

---

## TEKNIKGRUNDEN

- **Frontend:** React 19, React Router 7, styled-components 6
- **Backend:** Vercel Serverless Functions (`api/*.mjs`)
- **Databas:** Neon (PostgreSQL serverless)
- **Email:** Resend — `FROM: analys@arvo-flow.se`
- **AI-pipeline:** Extract (Opus 4.8) → Categorize (Sonnet 4.6) → Recommend (Opus 4.8)
- **Branch:** `claude/fix-invoice-ai-deployment-OFyG2` → mergad till `main` efter varje push

Full teknisk dokumentation lever i koden, inte här.

---

## MINIMIREGLER

Tre stycken. Inga fler.

1. **Commit aldrig `.env` eller credentials** till repot.
2. **Kör aldrig hela stress-testet** (`node scripts/stress-test.mjs`, ~10–15 kr) utan explicit OK. Enskild faktura är alltid OK.
3. **Pusha aldrig till annan branch** än `claude/fix-invoice-ai-deployment-OFyG2` utan explicit tillåtelse.

---

## GIT-WORKFLOW

```bash
git push -u origin claude/fix-invoice-ai-deployment-OFyG2
git checkout main
git merge claude/fix-invoice-ai-deployment-OFyG2 --no-edit
git push -u origin main
git checkout claude/fix-invoice-ai-deployment-OFyG2
```

Körs efter varje push. Utan undantag.
