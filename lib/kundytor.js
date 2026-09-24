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
    pastar: 'Bekräftar mottagen begäran: LOFTEN.bytesunderlag + personligtSvar, mekanismen är det interna larmet — som går FÖRST, och ett Resend-fel är aldrig «ok» (KM-11); klientens text escapas, den föreslagna leverantören skrivs inte ut; arvodet som i villkoren §3.2.' },
  'api/quote-request.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'LOFTEN.offertrunda (Nivå 3, med fullmakt) — inget byte och ingen bytesavgift; «inom 1–2 arbetsdagar» är grundarens SLA.' },
  'api/inbound-email.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Svar per rutt: bevakade avtal pekar på avtalsklockan, övriga på LOFTEN.skalIRummet — «återkommer per mail» borta.' },
  'api/generate-prospect.mjs': { mottagare: 'prospekt', klass: 'oreviderad',
    pastar: 'Etiketterna rättade 2026-09-23 («Verifierat publikt listpris», berättelserna borta) — men «Typisk marknadskostnad» och «Sannolik premie» kommer ur outbound-estimator, som läser prisbokens livedata (kohortens totalsummor). Kvar: estimatorn ska läsa verifierat listpris (getPublicListBenchmark), som bytesgolvet.' },
  'api/auth/gmail-callback.mjs': { mottagare: 'kund', klass: 'marknad', skal: 'allmän text om vad analysen visar — ingen mening om kundens pris' },
  'api/auth/outlook-callback.mjs': { mottagare: 'kund', klass: 'marknad', skal: 'samma text som gmail-callback' },
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
  '/prospect/:token': { klass: 'oreviderad', pastar: 'Samma estimat som prospektmejlet (outbound-estimator → livedata); etiketterna rättade, underlaget inte.' },
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
