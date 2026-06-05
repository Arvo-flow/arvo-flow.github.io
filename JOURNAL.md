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
