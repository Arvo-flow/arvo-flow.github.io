# Ytkartan — varje ställe där Arvo talar till en människa utanför bolaget

*Genererad ur `lib/kundytor.js` av `scripts/ytkarta.mjs`. Redigera registret, inte den här filen.
`tests/ytinventering.mjs` (YI-01..07) hittar själv varje mejlavsändare och varje route och fäller
sviten när en yta saknas här.*

**37 ytor** — 18 oreviderad · 2 registret · 5 marknad · 6 ingen_prisdom · 6 intern.

| Yta | Kanal | Mottagare | Klass | Vad den påstår i dag (mätt i koden 2026-09-23) |
|---|---|---|---|---|
| `/aktivera` | sida | besökare | **oreviderad** | «Vi identifierade redan X kr/år» där X läses ur URL:en (?savings=, Aktivera/index.js:31) — vem som helst kan skriva talet. |
| `/briefing/:token` | sida | besökare | **oreviderad** | Renderar månadsbriefens insikter — samma påhittade faktorer och «förhandla»-knappar som mejlet. |
| `/connect` | sida | besökare | **oreviderad** | «Vi raderar Fortnox-kopplingen och all din data automatiskt» — mekanismen är inte mätt. |
| `/intelligence` | sida | besökare | **oreviderad** | Exempelcitat («6 av 14 bolag i er bransch fick Telias prishöjning») utan märkningen «Exempel». |
| `/prospect/:token` | sida | besökare | **oreviderad** | «Arvo-pris, verifierat listpris» — samma som prospektmejlet. |
| `/testa-faktura` | sida | besökare | **oreviderad** | Läge, rubrik och etikett ur lagesregistret — men modellens reasoning renderas på fem ställen, och en USD-faktura visas i SEK utan att omräkningen syns (bara EUR redovisas). |
| `api/activate-intelligence.mjs` | mejl | kund | **oreviderad** | Etiketten ur diagnosEtikett — men modellens reasoning citeras ordagrant i briefingmejlet. |
| `api/auth/gmail-callback.mjs` | mejl | kund | **oreviderad** | «analysen … visar er exakta premie» — förutsätter en överbetalning vi inte mätt. |
| `api/auth/outlook-callback.mjs` | mejl | kund | **oreviderad** | Samma mening som gmail-callback: «visar er exakta premie». |
| `api/cron/generate-briefings.mjs` | mejl | kund | **oreviderad** | Månadsbrief: «Möjlig besparing X kr/år» och ämnesraden «kr/år identifierat» summerar påhittade faktorer (ökning × 0,85, överbetalning × 0,7); «höjde priset X %» ur två fakturors TOTAL; «Be Arvo granska och förhandla» — Arvo förhandlar aldrig (Switch-doktrinen). |
| `api/cron/run-price-alerts.mjs` | mejl | kund | **oreviderad** | Larmet grindas av larmunderlaget — men utan kr-påverkan lovar det «Arvo granskar om förändringen är befogad och kontaktar er med en rekommendation» — ingen utskicksväg som gör det hittad i kodbasen. |
| `api/founding-member.mjs` | mejl | kund | **oreviderad** | «Garanterad förtur till försäkringsbyten när FI-licensen är klar» — ett löfte om en licens som inte finns; «inom 48 timmar» är grundarens SLA. |
| `api/generate-prospect.mjs` | mejl | prospekt | **oreviderad** | «Arvo-priset (verifierat listpris)» — ett eget pris antyder en leverantörsrelation (neutralitetsmoaten); besparingsintervall ur estimat. |
| `api/inbound-email.mjs` | mejl | kund | **oreviderad** | Svarsmejlet: «Arvo återkommer till er per mail när analysen är verifierad» för varje faktura som inte prissattes — ingen utskicksväg som gör det hittad i kodbasen (admin skickar bara inloggningslänkar), och texten går även till bevakade avtal och fakturor utanför vårt område. |
| `api/quote-request.mjs` | mejl | kund | **oreviderad** | Skrivarleasing (Nivå 3): «Godkänner ni — sköter Arvo hela leverantörsbytet … Arvo tar 20 % av realiserad besparing» — Nivå 3 har ingen bytesavgift och inget byte. |
| `api/send-analysis.mjs` | mejl | kund | **oreviderad** | Läget och etiketten ur lagesregistret — men modellens fria reasoning-text står ordagrant i mejlet och PDF:en. |
| `api/send-confirmation.mjs` | mejl | kund | **oreviderad** | «Bytet är igångsatt … Vi skickar uppsägning … förväntat aktivt inom 2–4 veckor … Du behöver inte göra något mer» — bytesrälsen är mode:stub. Arvodet «faktureras när den syns i era böcker» motsäger §3.2. |
| `scripts/notify-price-changes.mjs` | mejl | kund | **oreviderad** | Samma larm som run-price-alerts (körs av price-monitor.yml): «Låt Arvo omförhandla», «Be Arvo granska och förhandla». |
| `/portfolio` | sida | besökare | **registret** | Rummets dom, räknare och radtexter ur rumLage/radLage. |
| `api/cron/send-reminders.mjs` | mejl | kund | **registret** | Varsel 30/7 dagar före sista uppsägningsdag ur avtalsklockan; utfallsenkäten säger «Vi beräknade» om ett daterat tal. |
| `/` | sida | besökare | **marknad** | marknadssida; bytet «förbereds», aldrig «genomförs» |
| `/bias` | sida | besökare | **marknad** | statisk transparenssida |
| `/cookies` | sida | besökare | **marknad** | cookiepolicy |
| `/integritet` | sida | besökare | **marknad** | integritetspolicy |
| `/villkor` | sida | besökare | **marknad** | avtalsvillkoren |
| `*` | sida | besökare | **ingen_prisdom** | omdirigering till / |
| `/kontoret` | sida | besökare | **ingen_prisdom** | omdirigering till /portfolio |
| `/utfall` | sida | besökare | **ingen_prisdom** | enkät, frågar och påstår inget |
| `api/admin/magic-link.mjs` | mejl | kund | **ingen_prisdom** | demolänk som grundaren skickar |
| `api/auth/request-magic-link.mjs` | mejl | kund | **ingen_prisdom** | inloggningslänk |
| `scripts/skicka-rumslank.mjs` | mejl | kund | **ingen_prisdom** | rumslänk som grundaren skickar manuellt |
| `/admin` | sida | besökare | **intern** | intern admin bakom ADMIN_TOKEN |
| `api/briefing.mjs` | mejl | intern | **intern** | notis till ALERT_TO när en kund agerar |
| `api/test-invoice.mjs` | mejl | intern | **intern** | granskningskö till ALERT_TO |
| `lib/benchmark.js` | mejl | intern | **intern** | avvikelselarm om prisboken till ALERT_TO |
| `scripts/send-alert-email.mjs` | mejl | intern | **intern** | verifierarens larm till grundaren |
| `scripts/send-uploaded-bulk.mjs` | mejl | intern | **intern** | testpass som grundaren skickar till inkorgen |
