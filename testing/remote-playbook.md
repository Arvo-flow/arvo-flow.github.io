# Arvo — Remote-only Validation (PJ-Mode)

**Målsättning:** Validera Arvo utan att prata med en enda människa ansikte-mot-ansikte. All signal samlas in via nätet.

**Tidsbudget:** 7 dagar från att du trycker "publicera" till att du har ett beslut.

**Sanningen på en rad:** Du behöver inte intervjua folk för att veta om din produkt säljer. Du behöver *revealed preference* (= någon klickar "Reservera 99 kr") från människor som aldrig träffat dig. Allt annat är brus.

---

## Stacken — vad du sätter upp en gång, sedan rullar den

```
 [Community-post]  →  [Landing/app]  →  [Clarity recording]  →  [Upload CSV]  →  [Analysis]  →  [🔥🤔😕 feedback]  →  [Stripe Payment Link 99 kr]
         │                │                    │                     │                 │                    │                         │
         ↓                ↓                    ↓                     ↓                 ↓                    ↓                         ↓
      tracker-        sidvisning             session-          äkta intentionell    värdesignal        kvalitativ signal          revealed preference
      param (?t=)     + källa                inspelning        användning                                                           = den enda siffran
                                                                                                                                   som betyder något
```

### Komponent 1 — Microsoft Clarity (gratis sessionsinspelning)

**Varför:** Du får se varje testare klicka i realtid. Heatmaps, scroll-djup, "rage clicks". Gratis, utan begränsning.

**Gör så här (5 min):**

1. Gå till https://clarity.microsoft.com och logga in med Microsoft-konto (engångsgrej)
2. Klicka "New project" → namn: `arvo-os` → URL: `https://arvo-flow.github.io/`
3. Kopiera ditt **Project ID** (ser ut som `abc123xyz`)
4. Öppna `public/index.html` i din editor
5. Hitta raden `"PASTE_YOUR_ID_HERE"` och byt ut mot ditt ID på båda ställena
6. `npm run build && npm run deploy`
7. Gå tillbaka till clarity.microsoft.com efter 30 min — du ser redan data

**Vad du tittar på:**
- **Recordings** → se exakt hur första 10 testarna klickar
- **Heatmaps** → var stirrar folk, var scrollar de förbi
- **Dead clicks** = de försökte klicka något som inte var en knapp → du har en UX-bug där

---

### Komponent 2 — Stripe Payment Link (revealed preference)

**Varför:** Det finns bara *en* validerings-signal som betyder något: en främling tar fram sitt Visa-kort och betalar 99 kr för något du inte har byggt klart. Allt annat är artighetsfeedback.

**Gör så här (10 min):**

1. Skapa Stripe-konto om du inte har ett: https://dashboard.stripe.com/register
2. Dashboard → **Payment Links** → **New** 
3. Produktnamn: `Arvo Pro — Reservation`
4. Pris: `99 SEK` (engångsbelopp)
5. Beskrivning (detta syns för kunden):
   > Reservera din plats när Arvo Pro lanserar: automatisk påminnelsesändning, bankkoppling för cash-runway i realtid, och månatlig analys. Pengarna återbetalas om du ångrar dig innan lansering. Om du blir kvar får du 50% rabatt första året.
6. **VIKTIGT — Advanced options:**
   - ✅ "Allow customers to provide their email" (obligatorisk)
   - ✅ "Automatic refunds" aktiv
   - Success URL: `https://arvo-flow.github.io/?reserved=1`
7. Spara. Kopiera länken (ser ut som `https://buy.stripe.com/xxx`)
8. Öppna `src/App.js`, hitta raden `const STRIPE_RESERVE_URL = "";` (rad 9)
9. Klistra in länken: `const STRIPE_RESERVE_URL = "https://buy.stripe.com/xxx";`
10. Medan du är där — uppdatera raden över: `const FOUNDER_EMAIL = "din@email.se";` till din riktiga mejl
11. `npm run build && npm run deploy`

**Refund-policyn är INTE valfri.** Du lovar återbetalning innan lansering, annars är det obehagligt nära "vaporware sale". Hedra det. Om någon ångrar sig — återbetala direkt i Stripe-dashboarden med ett klick.

**Stopp-regel:** Efter 50 besökare till sidan: **om 0 betalar, produkten säljer inte för 99 kr.** Det är den enda mätvärden du ska följa.

---

### Komponent 3 — Feedback-widgeten (redan inbyggd)

Finns längst ner i analys-vyn. Testare trycker 🔥 (älskade det), 🤔 (förstod inte), 😕 (inte för mig), skriver 2 rader och trycker skicka → ett färdigt mejl öppnas med all kontext till dig.

**Vad du gör:** Inget. Den fungerar redan när du har satt `FOUNDER_EMAIL` till din riktiga adress.

**Vad du ska mäta:**
- Antal 🔥 / 🤔 / 😕 per 100 besökare
- Förhållandet `upload → 🔥`. Om det är under 20%, dropzone-copyn eller analysvärdet är fel.

---

### Komponent 4 — Community-posterna

Se [community-posts.md](./community-posts.md). Du har 6 färdiga posts i 5 kanaler.

**Plan för publicering — sprid ut över 3 dagar för att inte brännas ut:**

| Dag | Kanal | Post | Tracker-param |
|---|---|---|---|
| **Dag 1 kl 08:00** | Reddit r/sweden eller r/entrepreneur | Post #1 (SV) | `?t=reddit-sv` |
| **Dag 1 kl 18:00** | LinkedIn personlig feed | Post #3 (SV) | `?t=linkedin` |
| **Dag 2 kl 09:00** | Indie Hackers | Post #4 (EN) | `?t=ih` |
| **Dag 2 kl 20:00** | Twitter/X tråd | Post #5 (SV) | `?t=twitter` |
| **Dag 3 kl 08:00** | Reddit r/freelance (EN) | Post #2 (EN) | `?t=reddit-en` |
| **Dag 3 kl 19:00** | Facebook-grupp(er) | Post #6 (SV) | `?t=fb` |

**Regler för community-posts:**

1. **Svara på ALLA kommentarer inom 1h under första 3 timmarna.** Det är då algoritmen bestämmer om posten dör eller växer.
2. **Tacka aldrig för positiva kommentarer med "tack!".** Istället: ställ en följdfråga. *"Snygg! Tack — vad får dig att bli mest nyfiken på det?"* Höjer engagemang + ger dig insight.
3. **Negativa kommentarer är guld.** Svara *"Det här vill jag höra mer om. Vad exakt stör dig?"*. Om de svarar — du har din nästa USP-ändring.
4. **Pushig-regeln:** Om en post underpresterar (< 5 klick efter 2h), återskriv titeln och försök igen imorgon i en annan kanal. Bränn inte samma post två gånger i samma kanal.

---

### Komponent 5 — (Valfritt) $50 Meta-annons

**Bara om du vill accelerera**. Inte nödvändigt.

1. Meta Ads Manager → ny kampanj → **Traffic**
2. Målgrupp: Sverige, 28–55 år, jobbtitel ∈ {Freelancer, Egen företagare, Konsult, Self-employed, Founder}, intresse ∈ {Fortnox, Visma, bokföring}
3. Budget: $10/dag i 5 dagar = $50
4. Creative: ta en screenshot av runway-chartet i appen (det obehagliga ögonblicket där krasch-linjen dyker) + headline: *"Jag byggde ett verktyg som säger exakt när kassan tar slut. Prova din CSV på 30 sek."* + URL `https://arvo-flow.github.io/?t=metaads`
5. Klart. Meta skickar trafiken, Clarity spelar in, Stripe loggar betalningar.

**Förväntat utfall på $50:** ~200 klick, 40 uploads, 8 🔥-ratings, 0–2 betalningar. Om du får **1 betalning från en total främling från annons** — produkten är valideringsgiltigt. Det är hög signal.

---

## Mät — dashboardet du behöver

Öppna ett Google Sheet, kolumnerna nedan. Uppdatera en gång per dag under testveckan.

| Datum | Kanal (?t=) | Besök (Clarity) | Uploads | 🔥 | 🤔 | 😕 | Reservationer (Stripe) | Anm. |
|---|---|---|---|---|---|---|---|---|
| 2026-04-09 | reddit-sv | 0 | 0 | 0 | 0 | 0 | 0 | Publicerad kl 08 |
| 2026-04-10 | linkedin | 0 | 0 | 0 | 0 | 0 | 0 | |
| ... | | | | | | | | |

**Källor:**
- **Besök:** Clarity → Projekt → Dashboard → "Sessions" → filtrera på URL-parameter `t=xxx`
- **Uploads, 🔥/🤔/😕:** Dina inbox-mejl från feedback-widgeten. Sortera på etikett i Gmail.
- **Reservationer:** Stripe Dashboard → Payments → `arvo-os-reservation`

---

## Beslutskriterierna (dag 7)

Räkna **totalerna** efter 7 dagar:

| Siffra | Tolkning | Beslut |
|---|---|---|
| **≥ 3 reservationer (99 kr) från främlingar** | Validerat. Riktiga människor betalar för en idé som inte ens finns än. | 🟢 **Bygg Stripe-integrerad auto-send. Lansera på riktigt.** |
| **1–2 reservationer + ≥ 15 🔥-ratings** | Smärtpunkten är verklig, priset är fel. | 🟡 **Höj priset till 299 kr eller sänk till 49 kr** och kör 5 dagar till. |
| **0 reservationer men > 30% upload-rate + > 20 🔥** | Folk gillar det men betalar inte → du har en "nice to have", inte "must-have". | 🟡 **Hitta smalare målgrupp** (bara fotografer, bara designers) + omarbeta värdet. |
| **0 reservationer + < 10% upload-rate** | Ingen tar sig igenom dropzonen. Antingen copyn eller förtroendet är trasigt. | 🔴 **Stoppa. Skriv om hero + dropzone. Testa igen.** |
| **0 besökare efter dag 3** | Dina community-posts syntes inte / dog i algoritmen. | 🔴 **Omskriv posterna. Prova nya subreddits/grupper.** |

**Det enda som absolut räknas: Stripe-reservationer.** Alla andra siffror är kontext för varför.

---

## Det du INTE gör (det här är där alla fuskar)

1. ❌ **Inte "be vänner att prova".** De ljuger för att vara snälla. Dina siffror blir förorenade.
2. ❌ **Inte poll-fråga "skulle du betala för det här?".** Folk säger alltid ja. Replaced by: riktig Stripe-knapp.
3. ❌ **Inte bygga nya funktioner under testveckan.** Du kommer vilja "förbättra" något baserat på första kommentaren. **Gör det inte.** Punkten är att mäta reaktion mot ett fast mål.
4. ❌ **Inte glömma att svara på community-kommentarer.** Första 3h av en post = allt. Om du postar och går till jobbet = posten dör.
5. ❌ **Inte jaga likes.** Likes är inte en köpsignal. Räkna bara klick + uploads + 🔥 + reservationer.

---

## Tidsstämpel för varje dag

**Dag 0 (30 min):** Sätt upp Clarity + Stripe + fyll i `FOUNDER_EMAIL` + `STRIPE_RESERVE_URL` i App.js + `npm run build && npm run deploy`.

**Dag 1 (30 min):** Publicera Reddit SV + LinkedIn. Svara aktivt på kommentarer under 3h.

**Dag 2 (30 min):** Publicera IH + Twitter-tråd. Svara aktivt.

**Dag 3 (30 min):** Publicera Reddit EN + Facebook. Svara aktivt.

**Dag 4–6 (15 min/dag):** Kolla Clarity-inspelningar. Anteckna var folk fastnar. **Ändra inget i koden.**

**Dag 7 (1h):** Räkna totalerna i ditt sheet. Fatta beslut enligt tabellen ovan. Om 🟢 → bygg auto-send. Om 🔴 → skriv om copyn och kör igen.

---

## Psykologisk garanti

Detta kommer göra ont. Dag 1 kommer du få 3 klick och känna att du misslyckats. Dag 4 kommer du få en 😕-rating från någon som inte förstod och du kommer vilja skriva om hela appen. **Gör det inte.**

Disciplinen är: **låta datan prata, inte dina känslor.** Efter 7 dagar har du antingen validering eller en tydlig anledning att pivotera. Båda är win.

Den enda förlusten är att inte köra alls.

---

**Klart. Stacken är byggd. Nu är det du + publicera-knappen.**
