# Ytkartan — varje ställe där Arvo talar till en människa utanför bolaget

*Genererad ur `lib/kundytor.js` av `scripts/ytkarta.mjs`. Redigera registret, inte den här filen.
`tests/ytinventering.mjs` (YI-01..11) hittar själv varje mejlavsändare, varje route och varje endpoint och fäller
sviten när en yta saknas här.*

**89 ytor** — 4 oreviderad · 15 registret · 11 marknad · 14 mejlyta · 26 ingen_prisdom · 19 intern.

| Yta | Kanal | Mottagare | Klass | Vad den påstår i dag (mätt i koden 2026-09-23/24) |
|---|---|---|---|---|
| `/prospect/:token` | sida | besökare | **oreviderad** | Samma estimat som prospektmejlet (outbound-estimator → livedata); etiketterna rättade, underlaget inte. |
| `api/generate-prospect.mjs` | mejl | prospekt | **oreviderad** | Etiketterna rättade 2026-09-23 («Verifierat publikt listpris», berättelserna borta) — men «Typisk marknadskostnad» och «Sannolik premie» kommer ur outbound-estimator, som läser prisbokens livedata (kohortens totalsummor). Kvar: estimatorn ska läsa verifierat listpris (getPublicListBenchmark), som bytesgolvet. |
| `api/prospect.mjs` | endpoint | anropare | **oreviderad** | Serverar prospektbriefingen: samma estimat som prospektmejlet (outbound-estimator → livedata), etiketterna rättade, underlaget inte. |
| `api/reveal.mjs` | endpoint | anropare | **oreviderad** | Dörrens avslöjande: fynden formuleras i lib/domain-intel.js och lib/business-intel.js, inte i registret. KM-05 skannar deras former (båda ligger i lib/), men meningarna är deras egna. |
| `/briefing/:token` | sida | besökare | **registret** | Renderar insikterna ur briefing-generator (KM-10); sidans läge ur briefinglage. |
| `/portfolio` | sida | besökare | **registret** | Rummets dom, räknare och radtexter ur rumLage/radLage. |
| `/testa-faktura` | sida | besökare | **registret** | Läge, rubrik och etikett ur lagesregistret; modelltexten filtreras vid modellens utgång (KM-09); bytesmodalen ber om ett förberett byte (LOFTEN_TEXT) — låtsas-BankID borta; valutan redovisas för varje valuta. |
| `api/activate-intelligence.mjs` | mejl | kund | **registret** | Etiketten ur diagnosEtikett; den citerade modelltexten passerar kundensMotivering (KM-08). |
| `api/briefing.mjs` | endpoint | anropare | **registret** | Serverar lagrade insikter ur briefing_reports. Insikterna skrevs av briefing-generator, men en rad äldre än registret serveras som den skrevs — därför granskas varje lagrad insikt vid LÄSNING (granskaLagradText) och en insikt med förbjuden form visas inte. |
| `api/cron/generate-briefings.mjs` | mejl | kund | **registret** | Insikterna ur briefing-generator: byten ur radLage med analysdatum, kostnadsökningar som faktum om två totalsummor; inga påhittade faktorer, inga förhandlingsknappar (KM-10). |
| `api/cron/run-price-alerts.mjs` | mejl | kund | **registret** | Grindat av larmunderlaget; löftet är LOFTEN.prisbevakning; «X av Y avsändare» i stället för «bolag»; ingen påhittad besparing ur höjningen. |
| `api/cron/send-reminders.mjs` | mejl | kund | **registret** | Varsel 30/7 dagar före sista uppsägningsdag ur avtalsklockan; utfallsenkäten säger «Vi beräknade» om ett daterat tal. |
| `api/inbound-email.mjs` | mejl | kund | **registret** | Svar per rutt: bevakade avtal pekar på avtalsklockan, övriga på LOFTEN.skalIRummet — «återkommer per mail» borta. |
| `api/invoice-history.mjs` | endpoint | anropare | **registret** | Rummet: `rum` och `a.lage` ur lagesregistret; lagrade fynd via refineFinding; ingen lagrad modelltext serveras. |
| `api/quote-request.mjs` | mejl | kund | **registret** | LOFTEN.offertrunda (Nivå 3, med fullmakt) — inget byte och ingen bytesavgift; «inom 1–2 arbetsdagar» är grundarens SLA. |
| `api/send-analysis.mjs` | mejl | kund | **registret** | Läget och etiketten ur lagesregistret; modelltexten passerar kundensMotivering (KM-08). «Arvo-pris» heter «Verifierat pris». |
| `api/send-confirmation.mjs` | mejl | kund | **registret** | Strikt förberedande (2026-09-24): bekräftar en beställning av ett besparingsunderlag (UNDERLAGET), varje mening om vem som säger upp/tecknar ur ANSVARSGRANS (KM-13), ångerrutan borta; LOFTEN.bytesunderlag + personligtSvar, mekanismen är det interna larmet — som går FÖRST, och ett Resend-fel är aldrig «ok» (KM-11); klientens text escapas, den föreslagna leverantören skrivs inte ut; arvodet som i villkoren §3.2. |
| `api/test-invoice.mjs` | endpoint | anropare | **registret** | Fakturavyn: `lage` ur lagesregistret, modelltexten genom kundensMotivering/kundensSteg vid modellens utgång. |
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
| `api/activate-intelligence.mjs` | endpoint | anropare | **mejlyta** | svarar ok/id; kundens text är anmälningsmejlet |
| `api/admin/magic-link.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **mejlyta** | demolänk som grundaren skickar; mejlet är klassat |
| `api/auth/gmail-callback.mjs` | endpoint | anropare | **mejlyta** | OAuth-retur; kundens text är kopplingsmejlet (LOFTEN.inkorgskoppling) |
| `api/auth/outlook-callback.mjs` | endpoint | anropare | **mejlyta** | OAuth-retur; kundens text är kopplingsmejlet (LOFTEN.inkorgskoppling) |
| `api/auth/request-magic-link.mjs` | endpoint | anropare | **mejlyta** | inloggningslänk; svaret är en status |
| `api/cron/generate-briefings.mjs` | endpoint · grind `cronAnropTillatet` | anropare | **mejlyta** | månadsbriefen till premiumkretsen; svaret är statistik |
| `api/cron/run-price-alerts.mjs` | endpoint · grind `CRON_SECRET` | anropare | **mejlyta** | prislarm till premiumkretsen; svaret är statistik |
| `api/cron/send-reminders.mjs` | endpoint | anropare | **mejlyta** | OGRINDAD, mätt 2026-09-24: vem som helst kan anropa loopen. Varje mejl skickas en gång per analys (sent_at), så ett anrop kan inte skicka ett mejl som inte redan är moget. Grindas med cronAnropTillatet när CRON_SECRET är bekräftad i Vercel — annars nekas Vercels egen cron och påminnelserna tystnar (skuld #8). |
| `api/founding-member.mjs` | endpoint | anropare | **mejlyta** | grundarmedlemskap; mejlen är klassade |
| `api/generate-prospect.mjs` | endpoint · grind `ARVO_ADMIN_SECRET` | anropare | **mejlyta** | utgående prospekt; mejlet är klassat (oreviderat) |
| `api/inbound-email.mjs` | endpoint · grind `INBOUND_WEBHOOK_SECRET` | anropare | **mejlyta** | Resends webhook; kundens text är svarsmejlet |
| `api/quote-request.mjs` | endpoint | anropare | **mejlyta** | offertförfrågan; mejlen är klassade |
| `api/send-analysis.mjs` | endpoint | anropare | **mejlyta** | analysmejlet och dess PDF; båda är klassade i MEJLYTOR |
| `api/send-confirmation.mjs` | endpoint | anropare | **mejlyta** | beställning av besparingsunderlag; mejlen är klassade |
| `*` | sida | besökare | **ingen_prisdom** | omdirigering till / |
| `/kontoret` | sida | besökare | **ingen_prisdom** | omdirigering till /portfolio |
| `/utfall` | sida | besökare | **ingen_prisdom** | enkät, frågar och påstår inget |
| `api/admin/magic-link.mjs` | mejl | kund | **ingen_prisdom** | demolänk som grundaren skickar |
| `api/auth/gmail-init.mjs` | endpoint | anropare | **ingen_prisdom** | omdirigering till Googles samtycke |
| `api/auth/outlook-init.mjs` | endpoint | anropare | **ingen_prisdom** | omdirigering till Microsofts samtycke |
| `api/auth/request-magic-link.mjs` | mejl | kund | **ingen_prisdom** | inloggningslänk |
| `api/contract-status.mjs` | endpoint | anropare | **ingen_prisdom** | kundens egen markering (uppsagd/stannar/ångra) och felmeddelanden |
| `api/contract-upload.mjs` | endpoint | anropare | **ingen_prisdom** | avlästa avtalsvillkor och felmeddelanden; klockan ritas av rummet |
| `api/dorr-handelse.mjs` | endpoint | anropare | **ingen_prisdom** | tar emot dörrens händelser, svarar en status |
| `api/el-prices.mjs` | endpoint | anropare | **ingen_prisdom** | publika spotpriser per zon; inget om kundens pris |
| `api/feedback.mjs` | endpoint | anropare | **ingen_prisdom** | tumme upp/ned, svarar en status |
| `api/fortnox/auth.mjs` | endpoint | anropare | **ingen_prisdom** | omdirigering till Fortnox samtycke (503 utan klient-id) |
| `api/fortnox/callback.mjs` | endpoint | anropare | **ingen_prisdom** | OAuth-retur; omdirigerar till /scanning, som är avroutad — steg 1 i Fortnoxplanen |
| `api/health.mjs` | endpoint | anropare | **ingen_prisdom** | hälsokontroll: vilka variabler som saknas, inga värden |
| `api/ingest/retry.mjs` | endpoint | anropare | **ingen_prisdom** | köar om ett jobb för rummets ägare; svarar en status |
| `api/kontor-ingest.mjs` | endpoint | anropare | **ingen_prisdom** | uppladdning till rummet; svarar köstatus och felmeddelanden |
| `api/outcome-survey.mjs` | endpoint | anropare | **ingen_prisdom** | tar emot enkätsvar |
| `api/recompute-shelfware.mjs` | endpoint | anropare | **ingen_prisdom** | räknar licensöverskott på kundens egna tal; svaret är tal utan mening, fakturavyn formulerar |
| `api/save-contract.mjs` | endpoint | anropare | **ingen_prisdom** | sparar ett avtalsdatum, svarar en status |
| `api/token.mjs` | endpoint | anropare | **ingen_prisdom** | utfärdar en kortlivad sessionstoken |
| `api/track-outcome.mjs` | endpoint | anropare | **ingen_prisdom** | OGRINDAD skrivväg till arvo_outcomes, mätt 2026-09-24: ingen kundyta och inget arvode läser tabellen (bara den oanropade getCalibrationData). Kandidat för borttagning. |
| `api/vakt-pulse.mjs` | endpoint | anropare | **ingen_prisdom** | nattsvepets tidsstämpel och antal källor |
| `api/validate-magic.mjs` | endpoint | anropare | **ingen_prisdom** | validerar en inloggningslänk |
| `api/waitlist.mjs` | endpoint | anropare | **ingen_prisdom** | väntelista, svarar en status |
| `scripts/skicka-rumslank.mjs` | mejl | kund | **ingen_prisdom** | rumslänk som grundaren skickar manuellt |
| `/admin` | sida | besökare | **intern** | intern admin bakom ADMIN_TOKEN |
| `api/admin/benchmark-stats.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | prisbokens cellstatus för admin |
| `api/admin/connections.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | inkorgskopplingar för admin |
| `api/admin/corrections.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | flywheelns korrektioner |
| `api/admin/dashboard.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | adminöversikt |
| `api/admin/dorr-tratt.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | dörrens tratt |
| `api/admin/preview-briefing.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | förhandsvisning av briefing för grundaren |
| `api/admin/prospects.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | utgående prospekt för admin |
| `api/admin/run-migration.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | migrering bakom admintoken |
| `api/briefing.mjs` | mejl | intern | **intern** | notis till ALERT_TO när en kund agerar |
| `api/corrections.mjs` | endpoint · grind `ADMIN_TOKEN` | anropare | **intern** | korrektioner bakom admintoken |
| `api/cron/arvodeskorning.mjs` | endpoint · grind `cronAnropTillatet` | anropare | **intern** | arvodesunderlag, aldrig en faktura |
| `api/cron/drain-ingest.mjs` | endpoint · grind `CRON_SECRET` | anropare | **intern** | köns drain; grinden är fail-open när hemligheten saknas (bibeln, skuld #8) |
| `api/cron/update-fx-rate.mjs` | endpoint · grind `cronAnropTillatet` | anropare | **intern** | valutakursen |
| `api/cron/warm-ct.mjs` | endpoint · grind `CRON_SECRET` | anropare | **intern** | värmer certifikatcachen |
| `api/test-invoice.mjs` | mejl | intern | **intern** | granskningskö till ALERT_TO |
| `lib/benchmark.js` | mejl | intern | **intern** | avvikelselarm om prisboken till ALERT_TO |
| `scripts/send-alert-email.mjs` | mejl | intern | **intern** | verifierarens larm till grundaren |
| `scripts/send-uploaded-bulk.mjs` | mejl | intern | **intern** | testpass som grundaren skickar till inkorgen |
