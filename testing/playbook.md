# Arvo — Valideringsplaybook

**Mål:** Få 10 freelancers att testa Arvo. Få 3 av dem att säga *"kan jag få det här att faktiskt skicka påminnelserna?"*. Få 1 att lova att betala.

**Tidsbudget:** 5 arbetsdagar. Stoppa all produktutveckling tills du har gjort detta.

---

## Dag 1 — Outreach (30 min)

Skriv personligen till 15 personer i ditt nätverk. **Inte en listmejl. Personliga DMs på Messenger, LinkedIn eller SMS.**

### Mall A — Nära vän / f.d. kollega

> Hej {förnamn}! Snabb fråga — driver du fortfarande eget? Jag håller på att testa en grej som räknar ut när kassan tar slut baserat på din fakturareskontra. Tar typ 30 sekunder att prova. Skulle vara guld om jag fick se dig klicka runt i 20 min över en kaffe. Bjuder. Kan vi ses {dag} eller {dag}?

### Mall B — Professionell bekant

> Hej {förnamn}, hoppas allt är bra. Jag vet att du driver {verksamhet} — jag bygger ett verktyg som tar in din CSV-fakturaexport och visar på 5 sekunder var dina pengar är låsta + vem som betalar sent. Ingen inloggning, allt körs lokalt i webbläsaren.
>
> Skulle du kunna prova den med din egen data i 5 min och säga vad du tycker? Länk: https://arvo-flow.github.io/?t={testerkod}
>
> Om du blir nyfiken bjuder jag på kaffe och 20 min där jag bara tittar på när du använder den.

### Mall C — Kalla kontakter / via gemensam vän

> Hej {förnamn}, {gemensam person} sa att jag borde snacka med dig. Jag bygger något för freelancers som har lika ont om tid som pengar — ett verktyg som läser din fakturareskontra (CSV från Fortnox/Visma) och visar exakt när kassan tar slut och vilka kunder som drar ner dig.
>
> Ingen pitch, inget sälj. Jag vill bara se folk klicka igenom det i 10 minuter och berätta vad de tänker. Kan du tänka dig?

**Regel:** Skriv 15 meddelanden på en timme. Stoppa dig själv från att finslipa. Skicka.

---

## Dag 2–4 — Sessions (1h per testare)

### Före sessionen

- Skapa en unik testerkod: `?t=anna`, `?t=erik`, etc. Lägg till i URL:en när du delar. Detta loggas lokalt så du kan koppla ihop feedback med person.
- **Be dem ta fram sin egen CSV** innan ni börjar. "Exportera reskontran från ditt bokföringsprogram — jag behöver inte se den, du gör det själv."
- Sätt dig bredvid med en anteckningsbok eller öppnad tracker.

### Under sessionen — din enda uppgift är att vara tyst

**Säg INGET om:**
- Vad produkten "ska" göra
- Vad du planerar att bygga senare
- Hur smart du tycker att analysen är

**Det du får säga:**
- *"Öppna den här länken på din dator och använd din egen fakturaexport."*
- *"Säg högt vad du tänker medan du klickar."* (Think-aloud protocol)
- *"Visa mig vad du skulle göra nu."*

**Det du noterar i tystnad:**
- Exakt vid vilket sekund de säger *"oj"*, *"fan"*, *"hm"*
- Vilken siffra eller graf de stirrar på längst
- Om de scrollar ner till actions eller lämnar sidan
- Om de faktiskt trycker på en åtgärdsknapp
- Om de frågar **"kan den skicka det här åt mig?"** ← **DEN HELIGA FRÅGAN**

### Efter sessionen — ställ exakt dessa fem frågor

1. *"Vad var din första reaktion när du såg runway-grafen?"*
2. *"Vad förstod du inte?"*
3. *"Hur ofta skulle du öppna det här? En gång i månaden? Varje måndag morgon?"*
4. **PRISFRÅGAN — ställ den rakt:** *"Om jag sa att det kostar **99 kr per påminnelse som skickas automatiskt via mejl**, hade du köpt det just nu för Lindberg-fakturan du såg?"* — **anteckna ordagrant vad de svarar**.
5. *"Vem mer känner du som borde testa det här?"*

---

## Tracking — logga varje session direkt efteråt

Öppna denna som ett kalkylark eller notion-tabell:

| # | Namn | Datum | Kanal | Bransch | Uploadade riktig data? | Reaktion på runway (ordagrant) | Frågade om auto-send? | Skulle betala 99 kr/påminnelse? | Referral | Nästa steg |
|---|------|-------|-------|---------|------------------------|-------------------------------|----------------------|-------------------------------|----------|-----------|
| 1 | Anna | 10/4 | DM | Fotograf | Ja | "shit är detta på riktigt" | Ja | Ja, idag | Erik V. | Mejla Stripe-länk |
| 2 | | | | | | | | | | |

**Det enda som räknas:**
- **Kolumn 7 (auto-send-frågan)** — äkta pull, inte vara-snäll
- **Kolumn 8 (betalningsvilja)** — revealed preference, inte poll
- **Kolumn 10 (referral)** — visar om de skulle rekommendera till en vän = netto-befolkningsväxt

---

## Dag 5 — Uppföljning + beslut

### Uppföljningsmejl (skicka 72h efter sessionen)

**Subject:** Hur gick det med {kundnamn de nämnde}?

> Hej {förnamn}!
>
> Snabb uppföljning — hur gick det med {Lindberg-fakturan / den där kassakrisen du såg / vad det nu var}? Löste det sig?
>
> Jag frågar inte för att tjata — jag försöker bara lära mig om Arvo-analysen faktiskt hjälpte dig agera eller om det bara kändes "kul i 5 minuter".
>
> Behöver inget utförligt svar. Bara: löst ✅ eller inte löst ❌.
>
> Tack igen för igår!

### Beslutskriterium — var ärlig mot dig själv

Räkna dina rader i trackern efter 10 sessioner:

- **≥ 4 stycken "Ja" i kolumn 7 (frågade om auto-send):** 🟢 **Bygg Stripe-integration + riktig auto-send. Produkten har puls.**
- **2–3 stycken:** 🟡 Positionera om mot en smalare målgrupp (t.ex. bara fotografer, bara designers). Kör 10 nya tester.
- **0–1 stycken:** 🔴 **Arvo som AI-CFO funkar inte.** Pivotera eller parkera. Ditt värdeerbjudande träffar inte en smärta som människor faktiskt vill betala för.

**Ingen vackra siffror → inget bygge. Ingen undantag.**

---

## Psykologiska fällor att undvika

1. **Fällan: artighetsfeedback.** Människor säger *"Gud vad smart!"* för att vara snälla. Det betyder **ingenting**. Enda signalen som räknas: gjorde de något som kostar dem något (tid, pengar, rekommendation)?

2. **Fällan: att fylla tystnaden.** När testaren sitter tyst och stirrar — **prata inte**. Räkna till 15 i huvudet. Låt tystnaden bli obekväm. Det är då de säger det ärliga.

3. **Fällan: att pitcha roadmapen.** Om de frågar *"kan den X?"* och svaret är nej, säg **"Inte än — hur ofta skulle du behöva det?"**. Pitcha aldrig en feature du inte har. Du kartlägger efterfrågan, inte säljer luft.

4. **Fällan: att räkna "antal tester" istället för insikter.** 3 djupa sessioner där du verkligen såg ansiktet är värt mer än 30 anonyma klick-loggar.

---

## Verktyg du behöver

- [ ] Det här dokumentet öppet i en flik
- [ ] Ett kalkylark (Google Sheets) med trackertabellen
- [ ] En anteckningsbok för tystnadsobservationerna
- [ ] 15 personer du kan skriva till idag
- [ ] Modet att höra *"nej, det här löser inte mitt problem"* och inte knäckas

---

**Senaste påminnelsen:** Koden är redo. Nästa flaskhals är du. Gå.
