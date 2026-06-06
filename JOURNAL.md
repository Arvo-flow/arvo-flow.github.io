# Arvo — Strategisk Journal

En löpande logg över insikter, vändpunkter och öppna frågor. Inte en bibel — ett levande minne av hur Arvo tänker och utvecklas.

---

## 2026-06-05

### Insikter

**Bygg aldrig innan 0,1%-bedömningen är gjord på konceptnivå.**
Outbound-systemet byggdes fullt ut — batch-pipeline, magic link, admin-panel, email-templates — innan vi ärligt bedömde om *konceptet* var 0,1%. Det var det inte (5/10). Infrastrukturen var solid men use caset fel. Lärdomen: utmana konceptet INNAN första raden kod. "KÖR!" är inte ett godkännande att hoppa över strategisk bedömning.

**Produkten är förvärvskanalen.**
Det proaktiva mailet med ett specifikt fynd om ett specifikt bolag ÄR marknadsföringen. En CFO som får "er årsredovisning visar 245 000 kr i IT-kostnader, marknad är 189 000 kr" behöver ingen varm introduktion. Intelligensen är introduktionen. Vi behöver aldrig be om uppmärksamhet om vi levererar ett konkret faktum.

**Svenska årsredovisningar är oexploaterad publik guld.**
Varje svensk AB måste lämna in årsredovisning — offentlig via Bolagsverket. Bolag med 50+ anställda har ofta specifika kostnadsrader för IT och telekommunikation. Det ger oss faktiska siffror om ett specifikt bolag att jämföra mot vår branchindex — utan estimat, utan gissningar.

**MX-records = omedelbar produktintelligens.**
En DNS-query på ett bolags domän avslöjar om de kör Microsoft 365 eller Google Workspace. Gratis, lagligt, millisekunder. Kombinerat med årsredovisning och branchindex ger det oss specificitet som känns omöjlig att ha utan tillgång till deras system.

**CLAUDE.md: offensiv, inte defensiv.**
700 rader ALDRIG-regler formade konservativt tänkande. Ny version: en sida. Vision, det enda måttet, affärsmodell, tre praktiska ramar. Rulebook → manifest.

### Öppna frågor

- Hur kombinerar vi årsredovisnings-parsing + MX-records + branchindex för maximalt specifik och trovärdig outreach?
- Vilken distributionskanal prioriteras: direkt (årsredovisningsdriven), revisorer, branschorganisationer, eller content?
- Är "gratis fakturagranskning som ingångserbjudande" rätt positionering för de första kunderna?
- Hur bygger vi en årsredovisnings-parser som är tillräckligt robust för att faktiskt lita på?

### Beslut tagna

- Outbound med generiska estimat: pausat tills vi har specifik intelligence-grund
- CLAUDE.md: totalomskriven som offensivt manifest
- Revisorer: ett kanal-alternativ, inte den enda vägen
- Strategisk journal (denna fil): skapad som levande produktminne

---

## 2026-06-06

### Insikter

**Det verkliga problemet är inte ineffektivitet — det är information.**
Leverantörer (Telia, Telenor, Ellevio) har fullständig prisbild per kund. Deras SMF-kunder vet ingenting om vad någon annan betalar. Den asymmetrin är inte en marknadsimperfection — det är affärsmodellen. Arvo:s revolutionära akt är att förstöra den asymmetrin permanent.

**Intelligence Compounding: en modell som skalerar med sig själv.**
Fas 1 (0–50 kunder): årsredovisningsbaserad precision-hunting — verkliga siffror, specifika fynd, inga estimat. Fas 2 (50–500): intern benchmarkdata gör intelligensen skarpare än något externt index. Fas 3 (500–1 000): kollektiv köpkraft — Arvo förhandlar med leverantörer som ett block, inte som enskilda kunder. Samma mekanism driver alla tre faserna. Det är inte en pivot, det är skalning.

**Årsredovisningar som PR-maskin.**
En annual rapport — "Svenska SMF:er betalade X miljarder för mycket förra året, dessa branscher värst drabbade" — är anskaffning utan försäljning. DI och SVT skriver om det. Varje CFO som läser det frågar sig omedelbart om de är ett av bolagen. Kostnaden: nära noll. Effekten: inbound som ett betalat kampanjteam inte kan matcha.

**Garantispråk underminerar premiumpositioneringen.**
"50 000 kr eller vi betalar er 5 000 kr" låter som en sliskig försäljare. Det är defensivt — det förutsätter att kunden inte litar på oss och försöker köpa sig förbi det. En riktig CFO-profil lovar inte. Den levererar beviset före pitchen. Beviset ÄR det specifika fyndet från årsredovisningen. Ingen garanti behövs när faktum talar.

**Switch-modellen är redan garantin — uttryckt med integritet.**
"Vi fakturerar aldrig förrän ni sparar. Om vi inte hittar något att åtgärda säger vi det." Samma sak som en garanti, utan säljteknikens desperation. Det är karaktären.

### Öppna frågor

- Vilken teknisk arkitektur för årsredovisnings-parsern? Bolagsverket-API vs. scraping vs. manuell för de första 50 bolagen?
- Vilket format och frekvens för den årliga kostnadsrapporten?
- Hur kvalificerar vi vilka bolag som är värda att kontakta (storlek, bransch, kostnadsnivå)?
- Hur ser Switch-avtalet ut juridiskt — fullmakt, inköpsombud, eller något annat?

### Beslut tagna

- Garantiformulering: borttagen. Ersatt med "vi fakturerar aldrig förrän ni sparar."
- Tillväxtmodell: Intelligence Compounding — samma mekanism, tre faser
- Anskaffningsstrategi fas 1: årsredovisningsbaserad precision-hunting
- Anskaffningsstrategi fas 2: annual kostnadssannolik som PR
- CLAUDE.md: uppdaterad med kreativ/innovativ/effektiv som explicita arbetsprinciper

---
