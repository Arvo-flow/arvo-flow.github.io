# Ytkartan — varje ställe där Arvo talar till en människa utanför bolaget

*Genererad ur `lib/kundytor.js` av `scripts/ytkarta.mjs`. Redigera registret, inte den här filen.
`tests/ytinventering.mjs` (YI-01..07) hittar själv varje mejlavsändare och varje route och fäller
sviten när en yta saknas här.*

**37 ytor** — 2 oreviderad · 12 registret · 11 marknad · 6 ingen_prisdom · 6 intern.

| Yta | Kanal | Mottagare | Klass | Vad den påstår i dag (mätt i koden 2026-09-23) |
|---|---|---|---|---|
| `/prospect/:token` | sida | besökare | **oreviderad** | Samma estimat som prospektmejlet (outbound-estimator → livedata); etiketterna rättade, underlaget inte. |
| `api/generate-prospect.mjs` | mejl | prospekt | **oreviderad** | Etiketterna rättade 2026-09-23 («Verifierat publikt listpris», berättelserna borta) — men «Typisk marknadskostnad» och «Sannolik premie» kommer ur outbound-estimator, som läser prisbokens livedata (kohortens totalsummor). Kvar: estimatorn ska läsa verifierat listpris (getPublicListBenchmark), som bytesgolvet. |
| `/briefing/:token` | sida | besökare | **registret** | Renderar insikterna ur briefing-generator (KM-10); sidans läge ur briefinglage. |
| `/portfolio` | sida | besökare | **registret** | Rummets dom, räknare och radtexter ur rumLage/radLage. |
| `/testa-faktura` | sida | besökare | **registret** | Läge, rubrik och etikett ur lagesregistret; modelltexten filtreras vid modellens utgång (KM-09); bytesmodalen ber om ett förberett byte (LOFTEN_TEXT) — låtsas-BankID borta; valutan redovisas för varje valuta. |
| `api/activate-intelligence.mjs` | mejl | kund | **registret** | Etiketten ur diagnosEtikett; den citerade modelltexten passerar kundensMotivering (KM-08). |
| `api/cron/generate-briefings.mjs` | mejl | kund | **registret** | Insikterna ur briefing-generator: byten ur radLage med analysdatum, kostnadsökningar som faktum om två totalsummor; inga påhittade faktorer, inga förhandlingsknappar (KM-10). |
| `api/cron/run-price-alerts.mjs` | mejl | kund | **registret** | Grindat av larmunderlaget; löftet är LOFTEN.prisbevakning; «X av Y avsändare» i stället för «bolag»; ingen påhittad besparing ur höjningen. |
| `api/cron/send-reminders.mjs` | mejl | kund | **registret** | Varsel 30/7 dagar före sista uppsägningsdag ur avtalsklockan; utfallsenkäten säger «Vi beräknade» om ett daterat tal. |
| `api/inbound-email.mjs` | mejl | kund | **registret** | Svar per rutt: bevakade avtal pekar på avtalsklockan, övriga på LOFTEN.skalIRummet — «återkommer per mail» borta. |
| `api/quote-request.mjs` | mejl | kund | **registret** | LOFTEN.offertrunda (Nivå 3, med fullmakt) — inget byte och ingen bytesavgift; «inom 1–2 arbetsdagar» är grundarens SLA. |
| `api/send-analysis.mjs` | mejl | kund | **registret** | Läget och etiketten ur lagesregistret; modelltexten passerar kundensMotivering (KM-08). «Arvo-pris» heter «Verifierat pris». |
| `api/send-confirmation.mjs` | mejl | kund | **registret** | Strikt förberedande (2026-09-24): bekräftar en beställning av ett besparingsunderlag (UNDERLAGET), varje mening om vem som säger upp/tecknar ur ANSVARSGRANS (KM-13), ångerrutan borta; LOFTEN.bytesunderlag + personligtSvar, mekanismen är det interna larmet — som går FÖRST, och ett Resend-fel är aldrig «ok» (KM-11); klientens text escapas, den föreslagna leverantören skrivs inte ut; arvodet som i villkoren §3.2. |
| `scripts/notify-price-changes.mjs` | mejl | kund | **registret** | Samma larm som run-price-alerts, samma registertexter; «Låt Arvo omförhandla» och ×0,85 borta. |
| `/` | sida | besökare | **marknad** | marknadssida; bytet «förbereds», aldrig «genomförs» |
| `/aktivera` | sida | besökare | **marknad** | aktiveringsformulär; talet ur URL:en visas och skickas inte längre |
| `/bias` | sida | besökare | **marknad** | statisk transparenssida; Nivå 1 säger «Arvo förbereder bytet, ni signerar» — «genomför (BankID)» borta |
| `/connect` | sida | besökare | **marknad** | Fortnox-anslutning; raderingslöftet och «redan optimerat» borta |
| `/cookies` | sida | besökare | **marknad** | cookiepolicy |
| `/integritet` | sida | besökare | **marknad** | integritetspolicy |
| `/intelligence` | sida | besökare | **marknad** | produktsida; varje pelare lovar en mekanism som finns, citaten märks Exempel |
| `/villkor` | sida | besökare | **marknad** | avtalsvillkoren |
| `api/auth/gmail-callback.mjs` | mejl | kund | **marknad** | allmän text om vad analysen visar — ingen mening om kundens pris |
| `api/auth/outlook-callback.mjs` | mejl | kund | **marknad** | samma text som gmail-callback |
| `api/founding-member.mjs` | mejl | kund | **marknad** | förmånslista; «inom 48 timmar» är grundarens SLA, försäkringsförturen villkorad av ett tillstånd |
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
