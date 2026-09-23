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
  'src/lib/rumstext.js', 'src/lib/diagnos.js'];

/** Mejlavsändare — varje fil som anropar emails.send( i api/, lib/, agents/, scripts/. */
export const MEJLYTOR = {
  'api/send-analysis.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Läget och etiketten ur lagesregistret — men modellens fria reasoning-text står ordagrant i mejlet och PDF:en.' },
  'api/activate-intelligence.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Etiketten ur diagnosEtikett — men modellens reasoning citeras ordagrant i briefingmejlet.' },
  'api/cron/send-reminders.mjs': { mottagare: 'kund', klass: 'registret',
    pastar: 'Varsel 30/7 dagar före sista uppsägningsdag ur avtalsklockan; utfallsenkäten säger «Vi beräknade» om ett daterat tal.' },
  'api/cron/generate-briefings.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Månadsbrief: «Möjlig besparing X kr/år» och ämnesraden «kr/år identifierat» summerar påhittade faktorer (ökning × 0,85, överbetalning × 0,7); «höjde priset X %» ur två fakturors TOTAL; «Be Arvo granska och förhandla» — Arvo förhandlar aldrig (Switch-doktrinen).' },
  'api/cron/run-price-alerts.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Larmet grindas av larmunderlaget — men utan kr-påverkan lovar det «Arvo granskar om förändringen är befogad och kontaktar er med en rekommendation» — ingen utskicksväg som gör det hittad i kodbasen.' },
  'scripts/notify-price-changes.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Samma larm som run-price-alerts (körs av price-monitor.yml): «Låt Arvo omförhandla», «Be Arvo granska och förhandla».' },
  'api/send-confirmation.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: '«Bytet är igångsatt … Vi skickar uppsägning … förväntat aktivt inom 2–4 veckor … Du behöver inte göra något mer» — bytesrälsen är mode:stub. Arvodet «faktureras när den syns i era böcker» motsäger §3.2.' },
  'api/quote-request.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Skrivarleasing (Nivå 3): «Godkänner ni — sköter Arvo hela leverantörsbytet … Arvo tar 20 % av realiserad besparing» — Nivå 3 har ingen bytesavgift och inget byte.' },
  'api/inbound-email.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Svarsmejlet: «Arvo återkommer till er per mail när analysen är verifierad» för varje faktura som inte prissattes — ingen utskicksväg som gör det hittad i kodbasen (admin skickar bara inloggningslänkar), och texten går även till bevakade avtal och fakturor utanför vårt område.' },
  'api/generate-prospect.mjs': { mottagare: 'prospekt', klass: 'oreviderad',
    pastar: '«Arvo-priset (verifierat listpris)» — ett eget pris antyder en leverantörsrelation (neutralitetsmoaten); besparingsintervall ur estimat.' },
  'api/auth/gmail-callback.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: '«analysen … visar er exakta premie» — förutsätter en överbetalning vi inte mätt.' },
  'api/auth/outlook-callback.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: 'Samma mening som gmail-callback: «visar er exakta premie».' },
  'api/founding-member.mjs': { mottagare: 'kund', klass: 'oreviderad',
    pastar: '«Garanterad förtur till försäkringsbyten när FI-licensen är klar» — ett löfte om en licens som inte finns; «inom 48 timmar» är grundarens SLA.' },
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
  '/testa-faktura': { klass: 'oreviderad',
    pastar: 'Läge, rubrik och etikett ur lagesregistret — men modellens reasoning renderas på fem ställen, och en USD-faktura visas i SEK utan att omräkningen syns (bara EUR redovisas).' },
  '/portfolio': { klass: 'registret', pastar: 'Rummets dom, räknare och radtexter ur rumLage/radLage.' },
  '/kontoret': { klass: 'ingen_prisdom', skal: 'omdirigering till /portfolio' },
  '/briefing/:token': { klass: 'oreviderad', pastar: 'Renderar månadsbriefens insikter — samma påhittade faktorer och «förhandla»-knappar som mejlet.' },
  '/prospect/:token': { klass: 'oreviderad', pastar: '«Arvo-pris, verifierat listpris» — samma som prospektmejlet.' },
  '/aktivera': { klass: 'oreviderad', pastar: '«Vi identifierade redan X kr/år» där X läses ur URL:en (?savings=, Aktivera/index.js:31) — vem som helst kan skriva talet.' },
  '/intelligence': { klass: 'oreviderad', pastar: 'Exempelcitat («6 av 14 bolag i er bransch fick Telias prishöjning») utan märkningen «Exempel».' },
  '/connect': { klass: 'oreviderad', pastar: '«Vi raderar Fortnox-kopplingen och all din data automatiskt» — mekanismen är inte mätt.' },
  '/utfall': { klass: 'ingen_prisdom', skal: 'enkät, frågar och påstår inget' },
  '/bias': { klass: 'marknad', skal: 'statisk transparenssida' },
  '/villkor': { klass: 'marknad', skal: 'avtalsvillkoren' },
  '/integritet': { klass: 'marknad', skal: 'integritetspolicy' },
  '/cookies': { klass: 'marknad', skal: 'cookiepolicy' },
  '/admin': { klass: 'intern', skal: 'intern admin bakom ADMIN_TOKEN' },
  '*': { klass: 'ingen_prisdom', skal: 'omdirigering till /' },
};
