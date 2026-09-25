// lib/kundytor.js — YTINVENTERINGEN: varje ställe där Arvo talar till en människa utanför bolaget.
//
// ══ VARFÖR (grundarorder 2026-09-23) ═════════════════════════════════════════════════════════
// Lägesregistret (12c355f) gjorde rummet, fakturavyn och två mejl ärliga. Undersökningen samma
// kväll visade att det var fyra ytor av 37: 21 filer skickar mejl och 16 sidor är routade,
// och lögnerna bodde i de ytor ingen hade granskat — månadsbriefingen, bytesbekräftelsen,
// offertsvaret, prislarmen, mejlsvaret på inskickade fakturor. Varje granskning hittade «nästa»
// yta, därför att listan över ytor var en granskares minne.
//
// Här är listan en MASKINS: `tests/ytinventering.mjs` (YI) hittar själv varje fil som anropar
// `emails.send(` och varje `<Route path=…>` i src/ArvoFlow.js, och fäller sviten när något saknas
// här — eller när något här inte längre finns. Den trettioåttonde ytan hittas alltså av en maskin.
//
// ══ KLASSERNA — varje yta har en klass (YI-03) ═════════════════════════════════════════════════════════
//   registret     — varje påstående om pris, läge, besparing eller vad Arvo gör kommer ur
//                   lib/lagesregister.js eller lib/kundmeningar.js. YI kräver att filen importerar
//                   något av dem.
//   marknad       — allmän text om produkten eller villkoren, aldrig om KUNDENS pris eller läge.
//                   scripts/claims-audit.mjs vaktar den (förbjudna löften, pre-commit).
//   ingen_prisdom — når en kund/prospekt men gör inget sådant påstående (inloggning, enkät).
//                   YI prövar ett ordförråd som backstopp. Skälet måste stå skrivet.
//   intern        — når bara oss (ALERT_TO / grundaren). Skälet måste stå skrivet.
//   oreviderad    — gör påståenden som INTE kommer ur registret. `pastar` säger vad, mätt i koden
//                   2026-09-23. Det här är skulden Kundmeningsregistret betar av; en ny yta får
//                   aldrig födas oreviderad (YI-05).
//
// FÅNGAR: en ny mejlavsändare eller sida som ingen klassat; en klass som ljuger om sin import;
//   en «ingen_prisdom»-yta som börjar säga något om pris eller besparing (ordförrådet).
// BLIND: klassningen är en människas bedömning — maskinen ser att svaret finns, aldrig att det är
//   sant (samma gräns som vaktkontraktet). Och sidor ritar text ur API-svar: en sida kan vara
//   «registret» medan ett fält den renderar kommer ur fri modelltext. Det står per yta i `pastar`.

export const KLASSER = ['registret', 'marknad', 'ingen_prisdom', 'intern', 'oreviderad'];

/** Moduler som ÄR registret. En yta i klassen `registret` måste importera minst en av dem. */
export const REGISTERKALLOR = ['lib/lagesregister.js', 'lib/kundmeningar.js', 'lib/paminnelse.js', 'lib/contract-clock.js',
  // Månadsbriefens producent bygger varje insikt ur radLage och LOFTEN (KM-10); sidans läge ur briefinglage.
  'lib/briefing-generator.js', 'src/lib/briefinglage.js',
  'src/lib/rumstext.js', 'src/lib/diagnos.js', 'src/lib/loften.js'];

/** Mejlavsändare — varje fil som anropar emails.send( i api/, lib/, agents/, scripts/. */
export const MEJLYTOR = {
  'api/send-analysis.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Läget och etiketten ur lagesregistret; modelltexten passerar kundensMotivering (KM-08). «Arvo-pris» heter «Verifierat pris».' },
  'api/activate-intelligence.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Etiketten ur diagnosEtikett; den citerade modelltexten passerar kundensMotivering (KM-08).' },
  'api/cron/send-reminders.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Varsel 30/7 dagar före sista uppsägningsdag ur avtalsklockan; utfallsenkäten säger «Vi beräknade» om ett daterat tal.' },
  'api/cron/generate-briefings.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Insikterna ur briefing-generator: byten ur radLage med analysdatum, kostnadsökningar som faktum om två totalsummor; inga påhittade faktorer, inga förhandlingsknappar (KM-10).' },
  'api/cron/run-price-alerts.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Grindat av larmunderlaget; löftet är LOFTEN.prisbevakning; «X av Y avsändare» i stället för «bolag»; ingen påhittad besparing ur höjningen.' },
  'scripts/notify-price-changes.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Samma larm som run-price-alerts, samma registertexter; «Låt Arvo omförhandla» och ×0,85 borta.' },
  'api/send-confirmation.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Strikt förberedande (2026-09-24): bekräftar en beställning av ett besparingsunderlag (UNDERLAGET), varje mening om vem som säger upp/tecknar ur ANSVARSGRANS (KM-13), ångerrutan borta; LOFTEN.bytesunderlag + personligtSvar, mekanismen är det interna larmet — som går FÖRST, och ett Resend-fel är aldrig «ok» (KM-11); klientens text escapas, den föreslagna leverantören skrivs inte ut; arvodet som i villkoren §3.2.' },
  'api/quote-request.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'LOFTEN.offertrunda (Nivå 3, med fullmakt) — inget byte och ingen bytesavgift; «inom 1–2 arbetsdagar» är grundarens SLA.' },
  'api/inbound-email.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Svar per rutt: bevakade avtal pekar på avtalsklockan, övriga på LOFTEN.skalIRummet — «återkommer per mail» borta.' },
  'api/generate-prospect.mjs': { mottagare: 'prospekt', klass: 'registret',
    pastar: 'Omskrivet 2026-09-24: bara det som syns utifrån (DNS, Bolagsverket) och listprisankaret — lägsta verifierade publika listpris per enhet med produkt och datum (lib/listprisankare.js). Ingen kostnad, ingen besparing; orden ur PROSPEKT. Fynden granskas mot registret innan de lagras.' },
  'scripts/probe-lokaldelar.mjs': { mottagare: 'intern', klass: 'ingen_prisdom', skal: 'mätsond: tre mejl utan bilaga till Arvos egen mottagningsdomän (inbox.arvoflow.se), aldrig till en kund' },
  'api/auth/outlook-callback.mjs': { mottagare: 'kund', klass: 'marknad', skal: 'allmän text om vad kopplingen gör — ingen mening om kundens pris' },
  'api/founding-member.mjs': { mottagare: 'kund', klass: 'marknad', skal: 'förmånslista; «inom 48 timmar» är grundarens SLA, försäkringsförturen villkorad av ett tillstånd' },
  'api/auth/request-magic-link.mjs': { mottagare: 'kund', klass: 'ingen_prisdom', skal: 'inloggningslänk' },
  'api/admin/magic-link.mjs': { mottagare: 'kund', klass: 'ingen_prisdom', skal: 'demolänk som grundaren skickar' },
  'scripts/skicka-rumslank.mjs': { mottagare: 'kund', klass: 'ingen_prisdom', skal: 'rumslänk som grundaren skickar manuellt' },
  'api/test-invoice.mjs': { mottagare: 'intern', klass: 'intern', skal: 'granskningskö till ALERT_TO' },
  'api/briefing.mjs': { mottagare: 'intern', klass: 'intern', skal: 'notis till ALERT_TO när en kund agerar' },
  'lib/benchmark.js': { mottagare: 'intern', klass: 'intern', skal: 'avvikelselarm om prisboken till ALERT_TO' },
  'scripts/send-alert-email.mjs': { mottagare: 'intern', klass: 'intern', skal: 'verifierarens larm till grundaren' },
  'scripts/send-uploaded-bulk.mjs': { mottagare: 'intern', klass: 'intern', skal: 'testpass som grundaren skickar till inkorgen' },
};

/** Routade sidor — varje <Route path=…> i src/ArvoFlow.js. */
export const SIDYTOR = {
  '/': { klass: 'marknad', skal: 'marknadssida; bytet «förbereds», aldrig «genomförs»' },
  '/testa-faktura': { klass: 'registret',
    pastar: 'Läge, rubrik och etikett ur lagesregistret; modelltexten filtreras vid modellens utgång (KM-09); bytesmodalen ber om ett förberett byte (LOFTEN_TEXT) — låtsas-BankID borta; valutan redovisas för varje valuta.' },
  '/portfolio': { klass: 'registret', pastar: 'Rummets dom, räknare och radtexter ur rumLage/radLage.' },
  '/kontoret': { klass: 'ingen_prisdom', skal: 'omdirigering till /portfolio' },
  '/briefing/:token': { klass: 'registret', pastar: 'Renderar insikterna ur briefing-generator (KM-10); sidans läge ur briefinglage.' },
  '/prospect/:token': { klass: 'registret', pastar: 'Omskriven 2026-09-24: listprisankaret (räknat av servern vid läsning) och DNS-fynden; ingen premie, inga gissade abonnemang. Orden ur PROSPEKT_TEXT.' },
  '/aktivera': { klass: 'marknad', skal: 'aktiveringsformulär; talet ur URL:en visas och skickas inte längre' },
  '/intelligence': { klass: 'marknad', skal: 'produktsida; varje pelare lovar en mekanism som finns, citaten märks Exempel' },
  '/connect': { klass: 'marknad', skal: 'Fortnox-anslutning; raderingslöftet och «redan optimerat» borta' },
  '/utfall': { klass: 'ingen_prisdom', skal: 'enkät, frågar och påstår inget' },
  '/bias': { klass: 'marknad', skal: 'statisk transparenssida; Nivå 1 säger «Arvo förbereder bytet, ni signerar» — «genomför (BankID)» borta' },
  '/villkor': { klass: 'marknad', skal: 'avtalsvillkoren' },
  '/integritet': { klass: 'marknad', skal: 'integritetspolicy' },
  '/cookies': { klass: 'marknad', skal: 'cookiepolicy' },
  '/admin': { klass: 'intern', skal: 'intern admin bakom ADMIN_TOKEN' },
  '*': { klass: 'ingen_prisdom', skal: 'omdirigering till /' },
};

// ══ ENDPOINTS — VAD HTTP-SVARET SÄGER (registergranskningen 2026-09-24) ═══════════════════════════
// Mejl och sidor var inventerade; de 52 endpoints som matar dem var det inte. En sida kan vara
// «registret» medan endpointen den läser serverar text ur databasen som skrevs av gammal kod —
// därför klassas SVARET här, separat från mejlet och sidan.
//   mejlyta — svaret är en status; kundens text är mejlet, klassat i MEJLYTOR (YI-09 kräver det).
//   intern  — nås bara bakom en grind. `grind` är strängen som bär den, och YI-10 kräver att den
//             står i koden (mätt: två endpoints som ser interna ut saknar grind och står som vad de är).
// Övriga klasser betyder samma sak som för mejl och sidor. `grind` får anges för alla klasser och
// prövas då; för `intern` är den obligatorisk.
// BLIND: klassen är en bedömning av vad svaret SÄGER; den säger inget om vem som får anropa en
//   ogrindad endpoint. Det står i `skal` där det spelar roll.
export const ENDPOINTKLASSER = [...KLASSER, 'mejlyta'];

const ADMIN = (skal) => ({ klass: 'intern', grind: 'ADMIN_TOKEN', skal });

export const ENDPOINTYTOR = {
  'api/activate-intelligence.mjs': { klass: 'mejlyta', skal: 'svarar ok/id; kundens text är anmälningsmejlet' },
  'api/admin/benchmark-stats.mjs': ADMIN('prisbokens cellstatus för admin'),
  'api/admin/connections.mjs': ADMIN('inkorgskopplingar för admin'),
  'api/admin/corrections.mjs': ADMIN('flywheelns korrektioner'),
  'api/admin/dashboard.mjs': ADMIN('adminöversikt'),
  'api/admin/dorr-tratt.mjs': ADMIN('dörrens tratt'),
  'api/admin/magic-link.mjs': { klass: 'mejlyta', grind: 'ADMIN_TOKEN', skal: 'demolänk som grundaren skickar; mejlet är klassat' },
  'api/admin/preview-briefing.mjs': ADMIN('förhandsvisning av briefing för grundaren'),
  'api/admin/prospects.mjs': ADMIN('utgående prospekt för admin'),
  'api/admin/run-migration.mjs': ADMIN('migrering bakom admintoken'),
  'api/auth/outlook-callback.mjs': { klass: 'mejlyta', skal: 'OAuth-retur; kundens text är kopplingsmejlet (LOFTEN.inkorgskoppling)' },
  'api/auth/outlook-init.mjs': { klass: 'ingen_prisdom', skal: 'omdirigering till Microsofts samtycke' },
  'api/auth/request-magic-link.mjs': { klass: 'mejlyta', skal: 'inloggningslänk; svaret är en status' },
  'api/briefing.mjs': { klass: 'registret',
    pastar: 'Serverar lagrade insikter ur briefing_reports. Insikterna skrevs av briefing-generator, men en rad äldre än registret serveras som den skrevs — därför granskas varje lagrad insikt vid LÄSNING (granskaLagradText) och en insikt med förbjuden form visas inte.' },
  'api/contract-status.mjs': { klass: 'ingen_prisdom', skal: 'kundens egen markering (uppsagd/stannar/ångra) och felmeddelanden' },
  'api/contract-upload.mjs': { klass: 'ingen_prisdom', skal: 'avlästa avtalsvillkor och felmeddelanden; klockan ritas av rummet' },
  'api/corrections.mjs': ADMIN('korrektioner bakom admintoken'),
  'api/cron/arvodeskorning.mjs': { klass: 'intern', grind: 'cronAnropTillatet', skal: 'arvodesunderlag, aldrig en faktura' },
  'api/cron/drain-ingest.mjs': { klass: 'intern', grind: 'cronAnropTillatet', skal: 'köns drain; fail-closed sedan 2026-09-24 (samma grind som övriga cron)' },
  'api/cron/generate-briefings.mjs': { klass: 'mejlyta', grind: 'cronAnropTillatet', skal: 'månadsbriefen till premiumkretsen; svaret är statistik' },
  'api/cron/run-price-alerts.mjs': { klass: 'mejlyta', grind: 'CRON_SECRET', skal: 'prislarm till premiumkretsen; svaret är statistik' },
  'api/cron/send-reminders.mjs': { klass: 'mejlyta', grind: 'cronAnropTillatet', skal: 'avtalspåminnelser och utfallsenkät; grindad 2026-09-24 (samma grind som övriga cron)' },
  'api/cron/update-fx-rate.mjs': { klass: 'intern', grind: 'cronAnropTillatet', skal: 'valutakursen' },
  'api/cron/warm-ct.mjs': { klass: 'intern', grind: 'CRON_SECRET', skal: 'värmer certifikatcachen' },
  'api/dorr-handelse.mjs': { klass: 'ingen_prisdom', skal: 'tar emot dörrens händelser, svarar en status' },
  'api/el-prices.mjs': { klass: 'ingen_prisdom', skal: 'publika spotpriser per zon; inget om kundens pris' },
  'api/feedback.mjs': { klass: 'ingen_prisdom', skal: 'tumme upp/ned, svarar en status' },
  'api/fortnox/auth.mjs': { klass: 'ingen_prisdom', skal: 'omdirigering till Fortnox samtycke (503 utan klient-id)' },
  'api/fortnox/callback.mjs': { klass: 'ingen_prisdom', skal: 'OAuth-retur; omdirigerar till /scanning, som är avroutad — steg 1 i Fortnoxplanen' },
  'api/founding-member.mjs': { klass: 'mejlyta', skal: 'grundarmedlemskap; mejlen är klassade' },
  'api/generate-prospect.mjs': { klass: 'mejlyta', grind: 'ARVO_ADMIN_SECRET', skal: 'utgående prospekt; mejlet är klassat (oreviderat)' },
  'api/health.mjs': { klass: 'ingen_prisdom', skal: 'hälsokontroll: vilka variabler som saknas, inga värden' },
  'api/inbound-email.mjs': { klass: 'mejlyta', grind: 'INBOUND_WEBHOOK_SECRET', skal: 'Resends webhook; kundens text är svarsmejlet' },
  'api/ingest/retry.mjs': { klass: 'ingen_prisdom', skal: 'köar om ett jobb för rummets ägare; svarar en status' },
  'api/inkorgsadress.mjs': { klass: 'ingen_prisdom', skal: 'rummets egen adress och dess status (Gmail-kod, senast mottagen); bevisat ägarskap krävs' },
  'api/invoice-history.mjs': { klass: 'registret',
    pastar: 'Rummet: `rum` och `a.lage` ur lagesregistret; lagrade fynd via refineFinding; ingen lagrad modelltext serveras.' },
  'api/kontor-ingest.mjs': { klass: 'ingen_prisdom', skal: 'uppladdning till rummet; svarar köstatus och felmeddelanden' },
  'api/outcome-survey.mjs': { klass: 'ingen_prisdom', skal: 'tar emot enkätsvar' },
  'api/prospect.mjs': { klass: 'registret',
    pastar: 'prospektSvar: serverar bara avläst material ur den lagrade profilen, granskar fynden vid läsning och räknar listprisankaret färskt — lagrade premier och kostnader från den gamla estimatorn når aldrig en ny läsare.' },
  'api/quote-request.mjs': { klass: 'mejlyta', skal: 'offertförfrågan; mejlen är klassade' },
  'api/recompute-shelfware.mjs': { klass: 'ingen_prisdom', skal: 'räknar licensöverskott på kundens egna tal; svaret är tal utan mening, fakturavyn formulerar' },
  'api/reveal.mjs': { klass: 'registret',
    pastar: 'Dörrens fynd formuleras i lib/domain-intel.js och lib/business-intel.js och granskas mot registret innan de lämnar servern (granskadeFynd); generaliseringar utan grund är omskrivna och spärrade (2026-09-24).' },
  'api/save-contract.mjs': { klass: 'ingen_prisdom', skal: 'sparar ett avtalsdatum, svarar en status' },
  'api/send-analysis.mjs': { klass: 'mejlyta', skal: 'analysmejlet och dess PDF; båda är klassade i MEJLYTOR' },
  'api/send-confirmation.mjs': { klass: 'mejlyta', skal: 'beställning av besparingsunderlag; mejlen är klassade' },
  'api/test-invoice.mjs': { klass: 'registret',
    pastar: 'Fakturavyn: `lage` ur lagesregistret, modelltexten genom kundensMotivering/kundensSteg vid modellens utgång.' },
  'api/token.mjs': { klass: 'ingen_prisdom', skal: 'utfärdar en kortlivad sessionstoken' },
  'api/vakt-pulse.mjs': { klass: 'ingen_prisdom', skal: 'nattsvepets tidsstämpel och antal källor' },
  'api/validate-magic.mjs': { klass: 'ingen_prisdom', skal: 'validerar en inloggningslänk' },
  'api/waitlist.mjs': { klass: 'ingen_prisdom', skal: 'väntelista, svarar en status' },
};
