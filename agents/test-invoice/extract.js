// agents/test-invoice/extract.js
// PDF → semantiskt klassificerade raddata via Claude Opus 4.7.
// Varje kostnadsrad klassificeras: recurring_subscription | variable_usage |
// one_time_fee | hardware. aggregateLineItems() summerar per typ och
// beräknar annualCost = recurringAmount × periodMultiplier.
//
// Model: claude-opus-4-8 — native PDF-support + högst tolkningsnoggrannhet.
// Output: tool_use + tool_choice för deterministisk strukturerad output.

import Anthropic from '@anthropic-ai/sdk';
import { judgeLineArithmetic } from '../../lib/extraction-integrity.js';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { FEWSHOT_EXAMPLES } from './fewshot-examples.js';

const MODEL = 'claude-opus-4-8';
const MAX_TOKENS = 2048;

export const CONFIDENCE_THRESHOLD = 0.70;

const PERIOD_MULTIPLIER = {
  monthly:   12,
  quarterly:  4,
  annual:     1,
  one_time:   0,
  unknown:   12,
};

/**
 * Beräkna faktureringsperiod deterministiskt från datum.
 * Returnerar null om datum saknas eller är ogiltiga — fallback till AI-värde.
 */
function computeBillingPeriodFromDates(start, end) {
  if (!start || !end) return null;
  try {
    const days = (Date.parse(end) - Date.parse(start)) / 86_400_000;
    if (!Number.isFinite(days) || days <= 0) return null;
    if (days < 50)  return 'monthly';
    if (days < 130) return 'quarterly';
    if (days < 400) return 'annual';
    return 'unknown';
  } catch { return null; }
}

export class ExtractorError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'ExtractorError';
    if (cause) this.cause = cause;
  }
}

const SYSTEM_PROMPT = `Du är en datauttagsexpert för svenska leverantörsfakturor.

Din uppgift är att läsa en PDF-faktura och returnera VARJE identifierad kostnadsrad som strukturerad data via verktyget "extract_invoice".

KLASSIFICERA VARJE RAD I EXAKT EN AV FYRA TYPER:

recurring_subscription
  Fasta, återkommande kostnader som gäller per period oavsett förbrukning.
  Exempel: månadsabonnemang, maskinleasing, fasta licensavgifter,
  fakturaavgifter som återkommer varje period, fasta paketavgifter,
  supportavtal, serviceavtal.
  OBS: "Fast månadsavgift", "Fast avgift", "Fast fakturaavgift" och liknande
  fasta löpande avgifter är ALLTID recurring_subscription — de återkommer varje
  period och ska alltid ingå i annualCost-beräkningen. Klassificera dem aldrig
  som one_time_fee.
  SAMT bas-fraktavgifter i transport/frakt-fakturor (pallfrakt, styckegods, fraktavgift per pall/paket/kg)
  — dessa representerar en löpande månatlig tjänsterelation oavsett att volymen varierar.
  SAMT elförbrukning / elhandel (kWh × pris) — el är en månadsvis återkommande kostnad även om
  förbrukningsvolymen varierar. Klassificera ALLTID rader som "Elhandel", "Elförbrukning",
  "Förbrukning X kWh", "Rörligt elpris", "Spotpris el" som recurring_subscription.
  OBS ELFAKTUROR — Energiskatt och elcertifikatsavgifter är INTE recurring_subscription.
  Klassificera ALLTID "Energiskatt", "Energiskatt (X kWh × Y kr/kWh)", "Elcertifikat",
  "elcertifikatsavgift" som one_time_fee. De är lagstadgade avgifter som är identiska
  oavsett elleverantör och ska ALDRIG ingå i jämförelsebasen (annualCost). Populera
  dessutom el_skatter_kr med deras sammanlagda belopp.
  OBS: Fast maskinhyra / leasingavgift för skrivare i Managed Print-avtal = recurring_subscription.
  OBS: Klickkostnader (kr/sida) i samma avtal = variable_usage (se nedan).
  OBS FASTA AVGIFTER: "Fast månadsavgift", "Månadsavgift fast", "Fast avgift" och liknande
  är ALLTID recurring_subscription — fasta avgifter som debiteras varje period utan undantag.
  Inkludera dem ALLTID i recurringAmount och annualCost.

variable_usage
  Rörliga kostnader som varierar med faktisk förbrukning.
  För mobiltelefoni: roaming utanför EU, övertrafik, extra datapåslag, SMS-paket utanför plan.
  KRITISKT MOBILREGEL: "Datatillägg X GB", "Extra data X GB", "GB-tillägg för abonnent",
  "Datapåslag X GB" och liknande temporära datapåköp är ALLTID variable_usage — aldrig
  recurring_subscription. De är köpta utöver inkluderad data och varierar period för period.
  Exempel: "Datatillägg 2 GB (abonnent 070-123-45-67)" → variable_usage, 49 kr.
  För Managed Print-avtal: klickkostnader (svart/vit-utskrift kr/sida, färgutskrift kr/sida).
  Klickkostnader beror på periodens utskriftsvolym — de ska ALDRIG läggas ihop med
  den fasta maskinhyran för annualisering.
  SAMT bränslebaserade transporttillägg som återkommer varje period: DMT (Drivmedelstillägg),
  drivmedelstillägg, bränslerelaterat tillägg, dieselindex-tillägg — dessa varierar med
  bränsleprisindex och debiteras på varje fraktfaktura. Klassificera dem som variable_usage.

one_time_fee
  Engångskostnader som inte återkommer regelbundet.
  Exempel: installationsavgift, uppstartsavgift, aktiveringsavgift,
  påminnelseavgift, konsultarvode, reparation.
  SAMT administrativ avgift för pappersfaktura/fakturaavgift — dessa är valfria avgifter,
  inte abonnemangstjänster, och ska ALDRIG klassificeras som recurring_subscription.
  SAMT oregelbundna fraktrelaterade avgifter (bomkörning, terminalavgift för misslyckad
  leverans, returfrakt engång) — dessa uppstår sporadiskt och är inte avtalade månadsposters.
  SAMT lagstadgade miljö- och avfallsskatter (Miljö- och Avfallsskatt, miljöavgift, avfallsskatt)
  på avfalls- och återvinningsfakturor — dessa är lagstadgade och ej förhandlingsbara.
  SAMT krediteringar och minusposter för avslutade, uppsagda eller justerade
  licenser/avtal — dessa är historiska korrigeringar som inte återkommer och
  ska ALDRIG klassificeras som recurring_subscription. Kundens framtida
  run-rate påverkas inte av sådana engångsjusteringar.
  SAMT pro-rata-avgifter för licenser eller abonnemang som TILLKOMMIT mitt i
  en period (t.ex. "Pro-rata: Tillagd 16 maj", "delsperiod", "Prorata tillägg").
  Dessa är periodjusteringar som inte återkommer — nästa period debiteras full avgift.
  Klassificera ALLTID sådana rader som one_time_fee OCH sätt is_prorata: true.
  Sätt ALLTID quantity och unitPrice korrekt på pro-rata-rader — koden beräknar
  framtida run-rate som quantity × unitPrice (inte det fakturerade deltidsbeloppet).

hardware
  Köpt hårdvara eller utrustning (ej leasing eller hyra).
  Exempel: köp av telefon, skrivare, server, nätverksutrustning.

TILLÄGGSTJÄNSTER — sätt på varje kostnadsrad:
  is_addon: true om raden är en kompletterande tjänst UTÖVER bastjänsten, INTE bastjänsten själv.
  addon_type: klassificera typen av tillägg (se värden nedan). null om is_addon är false.

  is_addon: true — klassificering:
    Molnväxel, cloud PBX, IP-PBX, Teams Direct Routing, PSTN-integration → addon_type: "pbx"
    Statisk IP-adress, fast IP → addon_type: "static_ip"
    Managed firewall, brandvägg-som-tjänst, UTM → addon_type: "firewall"
    Extra SLA-uppgradering, premium-support-avtal → addon_type: "sla"
    Molnbackup, säkerhetskopiering som tilläggsprodukt → addon_type: "cloud_backup"
    VOIP-tjänst (ej PBX) → addon_type: "voip"
    Övriga tilläggstjänster som inte passar ovan → addon_type: "other"

  is_addon: false (addon_type: null) för bastjänster:
    SIM-kort, mobilabonnemang, datapaketsplan
    Fiberanslutning, bredbandsabonnemang, internet
    SaaS-licenser (Microsoft 365, Google Workspace, Slack osv.)
    Maskinleasing, skrivarleasing
    Elavtal, elnät, distributionskostnad

AVTALSTID & UPPSÄGNING — extrahera BARA om fakturan innehåller ett explicit bindande avtal:
  KRITISKT: service_period_start och service_period_end avser AVTALETS bindningstid — INTE
  faktureringsperioden och INTE nästa förnyelsedag för ett löpande abonnemang.
  service_period_start: Startdatum för BINDNINGSPERIODEN i ISO-format (YYYY-MM-DD).
    Exempel: "Avtal: 2024-01-01 – 2026-12-31" → "2024-01-01". null om ej angivet.
    Sätt null om: fakturan är ett löpande månadsabonnemang, en SaaS-licens utan angiven
    bindningstid, eller om det enda datumet är nästa faktureringsdatum/förnyelsedag.
  service_period_end: Slutdatum för BINDNINGSPERIODEN i ISO-format (YYYY-MM-DD).
    Exempel: "Fast Pris 3 år (Gäller t.o.m 2027-12-31)" → "2027-12-31".
    Exempel: "Avtal gäller t.o.m. 2026-06-30" → "2026-06-30". null om ej angivet.
    Sätt ALLTID null om:
      - Fakturan är ett löpande månadsabonnemang (SaaS, mobil, bredband utan avtalstid).
      - Det enda "slutdatumet" är nästa faktureringsdatum (t.ex. 30 dagar fram).
      - Faktureringsperiod som "Period 260401-260430", "May 8 – Jun 7", "Renewal: Jun 7".
      - Ingen explicit text om bindningsperiod, avtalstid, eller kontraktstid finns.
    KONKRETA EXEMPEL på null:
      "Atlassian Jira Premium 110 users, period 2026-05-08 to 2026-06-07" → null (billing period)
      "Microsoft 365 Business Premium ×57, maj 2026" → null (ingen bindningstid angiven)
      "Telia Mobil 12 abonnemang, period 26-05-01–26-05-31" → null (faktureringsperiod)
    KONKRETA EXEMPEL på korrekt datum:
      "Fastprisavtal el, gäller t.o.m. 2027-12-31" → "2027-12-31"
      "Bredband Business 24 månader, avtal t.o.m. 2027-06-01" → "2027-06-01"
    Tumregel: om texten inte innehåller ord som "bindningstid", "avtalstid", "contract term",
    "fixed term", "gäller t.o.m." i kombination med ett datum som är >3 månader fram → null.
  cancellation_notice_days: Uppsägningstid i antal dagar som heltal.
    Exempel: "60 dagars uppsägningstid", "60 days notice", "notice period: 60 days" → 60.
    Exempel: "3 månaders uppsägningstid" → 90. null om ej angivet.
  cancellation_fee_explicit: Explicit text om lösenavgift / förtidsavgift om den framgår på
    fakturan eller i bilagda avtalsvillkor. Extrahera den EXAKTA formuleringen utan att förkorta.
    Exempel: "lösenavgift motsvarande 30 % av det fasta elpriset multiplicerat med den uppskattade
    återstående förbrukningen för avtalsperioden"
    null om ingen explicit lösenavgiftstext förekommer.

FAKTURERINGSPERIODDATUM — extrahera om perioddatum finns explicit på fakturan:
  billing_period_start: Startdatum för perioden fakturan AVSER i ISO-format YYYY-MM-DD.
    Extrahera från periodrubriker som "Period 2026-01-01 – 2026-01-31",
    "May 8 – Jun 7, 2026", "Faktureras för: 2026-01-01 till 2026-03-31" osv.
    null om inga perioddatum finns på fakturan.
  billing_period_end: Slutdatum för perioden fakturan avser i ISO-format YYYY-MM-DD.
    null om inga perioddatum finns på fakturan.
  OBS: Ange ALLTID båda eller ingen. Dessa avser faktureringsperioden (t.ex. jan-mars 2026),
  INTE avtalets bindningstid (service_period_start/end).

FAKTURERINGSPERIOD — används ENBART som fallback om billing_period_start/end saknas:
  monthly   = faktureras månadsvis (vanligast för abonnemang)
  quarterly = faktureras kvartalsvis. Välj ENDAST om fakturan explicit markerar
              FAKTURERINGSPERIODEN med "Q1", "Q2", "Q3", "Q4", "kvartal" eller "quarter".
              OBS: "uppsägningstid", "notice period", "cancellation period" och liknande
              villkorstexter är INTE faktureringsperiod.
  annual    = faktureras årsvis (t.ex. försäkringspremie, årslicens, 12-månadersfaktura)
  one_time  = engångsfaktura utan löpande abonnemang
  unknown   = kan ej avgöras med säkerhet

CONFIDENCE SCORE (0.0–1.0):
  1.0 = alla rader är tydligt beskrivna, period är otvetydig, inga antaganden krävdes.
  Sänk vid: otydliga radbeskrivningar, saknad periodinfo, blandade perioder,
  faktura på utländskt språk, skannad/handskriven faktura, antaganden som krävdes.
  Sänk alltid om du är osäker på klassificeringen av någon rad.
  KRITISKT: Sänk INTE confidence enbart för att fakturan har potentialMixedCategories: true.
  Om varje rad är tydligt beskriven och klassificerad utan antaganden, ska confidence
  spegla radkvaliteten — inte fakturans komplexitet. En Telia-faktura med mobil + bredband
  + roaming där alla rader är otvetydiga ska ha confidence ≥ 0.90.

OUT OF SCOPE — sätt outOfScope: true om fakturan avser tjänster utan
  förhandlingsbar volymstruktur: redovisningstjänster, juridik, restaurang/mat,
  rekrytering, marknadsföring, bemanning, utbildning, myndighetsavgifter.
  ALLTID out of scope: försäkringar av alla slag (företagsförsäkring, ansvarsförsäkring,
  sjukförsäkring, gruppförsäkring, sakförsäkring, fordonsförsäkring, pensionsförsäkring).
  Försäkringsförmedling kräver tillstånd från Finansinspektionen — Arvo hanterar ej detta.
  ALDRIG out of scope: elavtal (spotpris, rörligt el), mobilabonnemang, bredband,
  leasing (bil, IT, skrivare), SaaS-licenser, kortterminaler, larm & bevakning,
  löneadministration, städ, frakt — dessa har alltid förhandlingsbara volymer.
  Fakturan kan fortfarande extraheras men flaggas.

KRITISKT:
  — Alla belopp EXKLUSIVE moms (svensk B2B-standard). Om bara ink. moms: dividera med 1.25.
  — currency: Valuta som fakturan är utfärdad i. Ange ISO-kod: "SEK", "EUR", "USD", "GBP" o.s.v.
    Default "SEK" om valuta inte framgår explicit. Ange ALDRIG null.
  — potentialMixedCategories: Sätt true om fakturan innehåller kostnader som tydligt tillhör FLERA
    olika tjänstekategorier (t.ex. mobilabonnemang OCH bredband på samma faktura, eller
    SaaS-licenser OCH hårdvara på separata rader). false i övriga fall.
    TELEKOMREGEL (OBLIGATORISK): Mobiltjänster och bredbands-/fibertjänster är ALLTID separata
    kategorier — oavsett om de faktureras av SAMMA leverantör. Sätt ALLTID
    potentialMixedCategories: true om fakturan innehåller BÅDE rader med mobilabonnemang/SIM-kort
    OCH rader med bredband/fiber/fast internet. Typexempel: TeleKom, Tele2, Telenor, Telia,
    Com Hem och liknande som fakturerar mobil + bredband på samma faktura.
    OBS: En enskild leverantörs PROGRAMVARUPRODUKTER är INTE mixed — t.ex. "Atlassian Jira & Confluence",
    "Microsoft 365 + Teams", "Adobe Creative Cloud + Acrobat" är EN mjukvarusvit, sätt false.
  — Returnera VARJE synlig kostnadsrad — utelämna inga rader.
  — seatCount: Antal UNIKA ANVÄNDARE som licensieras. Summera rader med OLIKA TIERS av SAMMA
    produkt (t.ex. 45 Premium + 12 Basic = 57 unika användare). Räkna INTE ihop add-on-tjänster
    (backup, säkerhet, arkiv, e-signatur) med bastjänsten — om 57 M365-licenser + 57
    molnbackup-licenser är seatCount = 57, inte 114. Sätt null om fakturan inte avser
    per-användarlicenser.
    MULTI-MODUL SAAS (Fortnox, Visma, HubSpot m.fl.): Om fakturan har FLERA separata moduler
    med var och en sitt EGET antal användare (t.ex. Bokföring 5 usr, Lön 2 usr, Kvitto &
    Utlägg 60 usr), sätt seatCount = MAXIMALA antalet användare bland ALLA moduler.
    Exempel: max(5, 2, 60) = seatCount 60. Summera INTE modulernas användare (5+2+60≠67).
  — projectedRecurringAmount: Det belopp som faktiskt kommer att debiteras nästa FULLA period,
    efter att engångsjusteringar (pro-rata, krediteringar) är normaliserade.
    Exempel: Faktura visar 20 licenser × 500 kr (recurring) + 5 licenser × 250 kr (pro-rata tillagda
    16 maj). Nästa månads fulla debitering = 25 × 500 = 12 500 kr.
    projectedRecurringAmount = 12 500.
    Om inga pro-rata-justeringar eller krediteringar förekommer: sätt samma värde som summan
    av recurring_subscription-rader.
  — Returnera ALDRIG text utanför verktygsanropet.

MOBILFAKTUROR — extrahera dessa fält om fakturan innehåller mobilabonnemang:
  seatCount: Sätt seatCount till antalet aktiva SIM-kort / mobilabonnemang på fakturan.
    Räkna INTE med eventuell molnväxel- eller tilläggstjänst — räkna bara aktiva SIM-linjer.
    Exempel: "Telia Företag, 8 abonnemang" → seatCount: 8.
    Exempel: Faktura visar 12 Tele2-abonnemang med tre datatiernivåer → seatCount: 12.
    Exempel tabellrad med Antal-kolumn: "Företag Bas 50GB (Månadsavgift) | 5 | 349,00 | 1 745,00" → seatCount: 5.
    OBS: Antal-kolumnen i en fakturarad för mobilabonnemang anger antalet SIM-kort — extrahera alltid detta som seatCount.
  roaming_zone: Roamingzon för rörliga datatrafikkostnader på fakturan. Extrahera från radbeskrivning:
    1 = "Zon 1", "EU", "Norden", "Europa" — standard EU-roaming.
    2 = "Zon 2", "Europa+" — utökat europeiskt.
    3 = "Zon 3", "Världen", "Global" — globalt roaming.
    4 = "Zon 4", "Satellit", "Sjöfart" — satellit- eller maritim datatrafik.
    null om inga rörliga datatrafikkostnader förekommer eller zon ej kan fastställas.
  OBS: Molnväxel och liknande tilläggstjänster ska märkas is_addon: true, addon_type: "pbx" (se TILLÄGGSTJÄNSTER ovan).

BREDBANDSFAKTUROR — extrahera dessa fält om fakturan är från en bredbandsleverantör:
  connection_speed_mbit: Anslutningshastighet i Mbit/s som heltal.
    Runda till närmaste standardnivå: 100, 250, 500, 1000.
    Exempel: "1 Gbit", "1000/1000 Mbit", "1 Gbit/s symmetrisk" → 1000.
    Exempel: "500 Mbit", "500/500 Mbit" → 500. "250 Mbit" → 250. "100 Mbit" → 100.
    null om ej bredbandsfaktura eller hastighet ej angiven.
  OBS: Statisk IP, managed firewall, extra SLA och liknande tillägg ska märkas is_addon: true med rätt addon_type (se TILLÄGGSTJÄNSTER ovan).

SAAS-LICENSER — extrahera dessa fält om fakturan avser mjukvarulicenser eller SaaS:
  KRITISKT SAAS-SEATCOUNT-REGEL: Fakturor med FLERA FUNKTIONSMODULER (t.ex. Fortnox
  Bokföring, Fakturering, Lön, Kvitto & Utlägg; Visma Administration + Lön; Atlassian
  Jira + Confluence) har ofta OLIKA antal användare per modul. I detta fall:
  seatCount = MAXIMUM antal användare bland ALLA moduler.
  Exempel: Bokföring 5 anv. + Fakturering 5 anv. + Lön 2 anv. + Kvitto & Utlägg 60 anv.
  → seatCount = 60. Motivering: Arvo benchmarkar er totalkostnad mot marknaden
  utifrån volymen licensierade platser — det högsta modulantalet avgör volymen.
  UNDANTAG CRM-PRODUKTER (HubSpot, Salesforce): CRM-moduler som Marketing Hub, Sales Hub,
  Service Cloud, Einstein Analytics etc. används av HELT OLIKA team — inte samma användare.
  För dessa: seatCount = SUMMAN av alla modulers användare, inte maximum.
  Exempel HubSpot: Marketing Hub Pro 5 lic. + Sales Hub Pro 10 lic. → seatCount 15 (5+10=15).
  Exempel Salesforce: Sales Cloud 25 lic. + Service Cloud 10 lic. → seatCount 35 (25+10=35).
  UNDANTAG ARKIVERADE KONTON: "Archived User", "Archived license", "Arkiverad användare"
  och liknande nedgraderade lagringskonton räknas ALDRIG mot seatCount.
  De är inaktiva konton för f.d. anställdas data — de är inte aktiva användare.
  Exkludera dem alltid: om fakturan har 20 aktiva + 5 Archived → seatCount = 20.
  license_type: Det specifika licensplanets namn som det framgår av fakturan. Normalisera
    till kortform, t.ex. "Business Standard", "Business Premium", "E3", "E5",
    "Business Basic", "Google Workspace Business Starter", "Google Workspace Business Standard",
    "Google Workspace Business Plus". null om plannamnet inte framgår.
  billing_cycle_type: Faktureringsmodell för licensdelen:
    "monthly"  = månadsdebitering (löpande per månad)
    "annual"   = årsdebitering (annuell licens, 12-månadersfaktura, eller kvartalsvis mot årsavtal)
    "unknown"  = kan ej fastställas
    null       = ej SaaS/licensfaktura

  saas_product_family: Standardiserad produktfamiljidentifierare. Ange en av:
    "microsoft-365", "google-workspace", "slack", "zoom",
    "atlassian-jira", "atlassian-confluence", "adobe-creative-cloud",
    "salesforce", "hubspot", "docusign".
    null om okänt eller ej SaaS-faktura.
  saas_included_features: Array med plattformstjänster som INGÅR i den licenserade produkten.
    Fyll i ENBART för Microsoft 365 och Google Workspace.
    M365 Business Basic/Standard/Premium/E3/E5: alltid ["Microsoft Teams", "OneDrive", "SharePoint", "Exchange Online"]
    Lägg DESSUTOM till för Business Premium, E3, E5: "Microsoft Intune", "Microsoft Defender"
    Google Workspace (alla tiers): ["Google Meet", "Google Drive", "Gmail", "Google Docs", "Google Chat"]
    null för alla andra produkter.

STARTUP-KREDITER — om fakturan visar att ett startup-program, promotional credit eller
  liknande kreditpost reducerar totalsumman:
  startup_credit_balance: Kvarvarande kreditbalans som visas explicit på fakturan (positivt tal).
  startup_credit_monthly_burn: Faktisk månadsförbrukning INNAN krediten applicerades (summan av alla tjänstrader).
  startup_credit_currency: Valutakod, t.ex. "USD" eller "SEK".
  startup_credit_expiry_date: Datum då krediterna förfaller, i ISO-format YYYY-MM-DD. Extrahera från text som "expire on August 31, 2026" eller "gäller t.o.m. 2026-08-31". null om ej angivet.
  Sätt alla fyra till null om inga startup-/programkrediter förekommer på fakturan.

ELFAKTUROR — extrahera dessa fält om fakturan är från en elleverantör:
  el_invoice_type: Fakturatyp för elrelaterade fakturor — avgörande för om Arvo kan hjälpa.
    'elhandel'  = elleverantörens handelsfaktura. Innehåller spotpris, fastpris eller rörligt elpris
                  (förhandlingsbar — elleverantör kan bytas). Typiska signaler: rubriken "ELFAKTURA",
                  rader med "Förbrukning Spotpris", "Elhandel Fastprisavtal", "Handelspåslag", "Nord Pool".
    'natavgift' = nätägarens distributionsfaktura. Innehåller överföringsavgift, nättariff, effektavgift
                  (EJ förhandlingsbar — reglerat geografiskt monopol, kan inte bytas). Typiska signaler:
                  rubriken "NÄTFAKTURA", rader med "Överföringsavgift Elnät", "Nättariff", "Effektavgift",
                  leverantörsnamn som innehåller "Elnätet", "Nät AB", "Elnät".
    'kombinerad' = fakturan innehåller BÅDE elhandel och nätavgift på samma räkning.
    null         = ej elfaktura.
  el_kwh: Total förbrukning i kWh denna faktureringsperiod.
  el_billing_month: Månaden förbrukningen avser — extrahera ENBART månadsnamnet i gemener.
    Identifiera från alla förekommande format:
      "Elförbrukning Maj 2026" → "maj"
      "Avräkning Maj 2026" → "maj"
      "Period: 2026-05-01 – 2026-05-31" → "maj"
      Månadskolumnen "05" eller "2026-05" → "maj"
    KRITISKT: returnera ENBART månadsnamnet ("maj", "februari" osv.), ALDRIG med år eller annan text.
    null om ej elfaktura.
  el_omrade: Elområde SE1, SE2, SE3 eller SE4. Identifiera i första hand från anläggnings-ID
    eller explicit ort/adress. Defaulta till "SE3" om osäker. null om ej elfaktura.
    Zon per stad (OBS — memorera dessa):
      SE1: Luleå, Skellefteå, Piteå, Umeå, Kiruna, Gällivare, Arvidsjaur, Boden, Haparanda
      SE2: Sundsvall, Östersund, Härnösand, Örnsköldsvik, Kramfors, Sollefteå, Ånge, Ljusdal
      SE3: Stockholm, Göteborg, Jönköping, Uppsala, Linköping, Norrköping, Örebro, Västerås,
           Eskilstuna, Borås, Gävle, Karlstad, Kalmar, Växjö, Halmstad, Skövde, Falun, Borlänge
      SE4: Malmö, Lund, Helsingborg, Kristianstad, Karlskrona, Ystad, Trelleborg, Landskrona,
           Ängelholm, Karlshamn, Sölvesborg, Ronneby — hela Skåne och Blekinge
    KRITISKT: Jönköping = SE3. Göteborg = SE3. Helsingborg = SE4. Borås = SE3.
  el_contract_type: Typ av elavtal — avgör om kunden är bunden och om byte är möjligt.
    'fixed'   = fastprisavtal / bundet pris: "Fastprisavtal", "Fast pris X år", "Bunden",
                "fixed price", garanterat pris med angiven giltighetstid.
    'spot'    = rörligt spotprisavtal: "Spotpris", "Rörligt elpris", "Variabelt", "spot".
    'unknown' = ej fastställbart från fakturan.
    null      = ej elfaktura.
  el_fast_avgift_kr: ELHANDLARENS fasta månadsavgift (abonnemangsavgift) i kr exkl. moms.
    Enbart elhandlarens/elleverantörens avgift — ALDRIG nätägarens abonnemangsavgift/elnätsavgift.
    Typiskt 0–100 kr/mån. null om saknas eller ej elfaktura.
  el_nat_fast_avgift_kr: Nätägarens fasta månadsabonnemang i kr exkl. moms.
    Avser elnätets fasta kapacitets-/abonnemangsavgift (t.ex. "Elnät fast abonnemangsavgift",
    "Fast avgift elnät", "Kapacitetsavgift"). Ej förhandlingsbar — bestäms av regional nätoperatör.
    null om saknas eller ej elfaktura.
  el_energipris_per_kwh: Leverantörens energiavgift i kr/kWh exkl. moms
    och exkl. nätavgift, energiskatt och elcertifikat. Gäller oavsett avtalstyp
    (spot eller fast pris). null om ej elfaktura.
  el_skatter_kr: Summan av energiskatt och elcertifikatsavgifter för perioden i kr exkl. moms.
    Energiskatt och elcertifikat är lagstadgade avgifter som alltid syns explicit på elfakturan.
    null om saknas eller ej elfaktura.
  el_price_explicit: true ENBART om fakturan explicit visar ett pris per kWh (t.ex. "0,85 kr/kWh"
    eller en prisrad med kr/kWh). Sätt false om priset måste beräknas från totalbelopp / kWh.
    null om ej elfaktura.
  el_spot_price_kwh: Nordpool spotpris (råpris/inköpspris) i kr/kWh, ENBART om det framgår
    som en separat rad eller kolumn skild från handelspåslag/marginalavgift.
    Extrahera ENBART om spotpriset är tydligt identifierat — t.ex. "Spotpris (Vägt snitt): 0,42 kr/kWh",
    "Nord Pool Spot: 0,38 kr/kWh", "Inköpspris el: 0,41 kr". Sätts till null om:
    – Fakturan visar ett kombinerat energipris utan separation av spot vs. påslag.
    – Det är ett fastprisavtal (el_contract_type = 'fixed').
    – Spotpriset inte framgår explicit med ord som "spot", "inköp", "Nord Pool" o.d.
  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
    som "Att betala", "Totalt att betala", "Total", "Amount due", "Total amount due" eller
    liknande slutsumma längst ner på fakturan. Om enbart ink. moms anges: dividera med 1.25.
    Sätt null om totalsumman ej är tydligt angiven eller ej kan fastställas med säkerhet.${FEWSHOT_EXAMPLES ? '\n\n' + FEWSHOT_EXAMPLES : ''}`;

const EXTRACT_TOOL = {
  name: 'extract_invoice',
  description: 'Extrahera semantiskt klassificerade raddata från en svensk leverantörsfaktura.',
  input_schema: {
    type: 'object',
    properties: {
      supplier: {
        type: 'string',
        description: 'Leverantörens fullständiga registrerade namn som det står på fakturan',
      },
      date: {
        type: 'string',
        description: 'Fakturadatum i ISO-format YYYY-MM-DD',
      },
      description: {
        type: 'string',
        description: 'Kort övergripande beskrivning av fakturans huvudändamål, t.ex. "Mobilabonnemang mars 2025" eller "Skrivarleasing Q2 2025"',
      },
      billingPeriod: {
        type: 'string',
        enum: ['monthly', 'quarterly', 'annual', 'one_time', 'unknown'],
        description: 'Faktureringsperiod baserat på radernas karaktär',
      },
      lineItems: {
        type: 'array',
        description: 'Varje identifierad kostnadsrad på fakturan',
        items: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Radbeskrivning exakt som på fakturan',
            },
            amount: {
              type: 'integer',
              description: 'Belopp exkl. moms i SEK, heltal',
            },
            type: {
              type: 'string',
              enum: ['recurring_subscription', 'variable_usage', 'one_time_fee', 'hardware'],
              description: 'Semantisk klassificering av raden',
            },
            quantity: {
              type: ['integer', 'null'],
              description: 'Antal enheter/licenser/abonnemang på raden. null om ej angivet på fakturan.',
            },
            unitPrice: {
              type: ['integer', 'null'],
              description: 'Enhetspris exkl. moms i SEK, heltal. null om ej angivet.',
            },
            is_addon: {
              type: 'boolean',
              description: 'true om raden är en tilläggstjänst utöver bastjänsten (molnväxel, statisk IP, managed firewall osv.). false för bastjänster.',
            },
            addon_type: {
              type: ['string', 'null'],
              enum: ['pbx', 'static_ip', 'firewall', 'sla', 'cloud_backup', 'voip', 'other', null],
              description: 'Typ av tilläggstjänst. Obligatoriskt när is_addon är true. null annars.',
            },
            is_prorata: {
              type: 'boolean',
              description: 'true om raden är en pro-rata-debitering för licenser/abonnemang som tillkommit under pågående period (t.ex. "Prorata tillägg", "delsperiod", "aktiverad X datum"). Kräver att quantity och unitPrice är korrekt ifyllda — koden beräknar då framtida run-rate deterministiskt som quantity × unitPrice. false i övriga fall.',
            },
          },
          required: ['description', 'amount', 'type', 'is_addon', 'is_prorata'],
        },
      },
      confidenceScore: {
        type: 'number',
        description: 'Extraktionssäkerhet 0.0–1.0',
      },
      confidenceNotes: {
        type: ['string', 'null'],
        description: 'Förklaring om confidence understiger 0.85, annars null',
      },
      outOfScope: {
        type: 'boolean',
        description: 'true om fakturan avser en kategori utan förhandlingsbar volymstruktur',
      },
      outOfScopeReason: {
        type: ['string', 'null'],
        description: 'Specificerar varför outOfScope är true. Sätt "insurance" för försäkringsfakturor, annars null.',
      },
      seatCount: {
        type: ['integer', 'null'],
        description: 'Totalt antal seats/licenser. Summera alla licensrader oavsett tier. null om inte per-användarprenumeration.',
      },
      roaming_zone: {
        type: ['integer', 'null'],
        description: 'Roamingzon för rörliga datatrafikkostnader: 1=EU, 2=Europa+, 3=Global, 4=Satellit/Sjöfart. null om ej tillämpligt.',
      },
      projectedRecurringAmount: {
        type: 'integer',
        description: 'Beräknat recurring-belopp nästa fulla period i SEK, efter normalisering av pro-rata och krediteringar. Identisk med summan av recurring_subscription-rader om inga justeringar förekommer.',
      },
      account: {
        type: ['string', 'null'],
        description: 'Bokföringskonto om det framgår, t.ex. "5310". null om osäker.',
      },
      el_kwh: {
        type: ['integer', 'null'],
        description: 'Total elförbrukning i kWh för perioden. null om ej elfaktura.',
      },
      el_billing_month: {
        type: ['string', 'null'],
        description: 'Månaden förbrukningen avser — enbart månadsnamnet i gemener ("maj", "februari" osv.), ALDRIG med år. Identifieras från t.ex. "Elförbrukning Maj 2026" → "maj", period "2026-05-01" → "maj". null om ej elfaktura.',
      },
      el_omrade: {
        type: ['string', 'null'],
        description: 'Elområde SE1/SE2/SE3/SE4. Default SE3 om osäker. null om ej elfaktura.',
      },
      el_fast_avgift_kr: {
        type: ['integer', 'null'],
        description: 'ELHANDLARENS fasta månadsavgift i kr exkl. moms — ALDRIG nätägarens avgift. Typiskt 0–100 kr/mån. null om saknas/ej elfaktura.',
      },
      el_nat_fast_avgift_kr: {
        type: ['integer', 'null'],
        description: 'Nätägarens fasta månadsabonnemang i kr exkl. moms (t.ex. "Elnät fast abonnemangsavgift"). Ej förhandlingsbar. null om saknas/ej elfaktura.',
      },
      el_energipris_per_kwh: {
        type: ['number', 'null'],
        description: 'Rörlig energiavgift kr/kWh exkl. moms, nätavgift och skatter. null om ej elfaktura.',
      },
      el_price_explicit: {
        type: ['boolean', 'null'],
        description: 'true ENBART om fakturan explicit visar ett pris per kWh (t.ex. "0,85 kr/kWh" eller "Energipris: 0,85 kr/kWh"). false om priset beräknats från totalbelopp / förbrukning. null om ej elfaktura.',
      },
      el_contract_type: {
        type: ['string', 'null'],
        description: 'Elavtalstyp: "fixed" för fastprisavtal/bundet pris, "spot" för spotpris/rörligt avtal, "unknown" om ej fastställbart. null om ej elfaktura.',
      },
      el_skatter_kr: {
        type: ['integer', 'null'],
        description: 'Summa energiskatt + elcertifikat för perioden i kr exkl. moms. null om ej elfaktura.',
      },
      el_invoice_type: {
        type: ['string', 'null'],
        enum: ['elhandel', 'natavgift', 'kombinerad', null],
        description: '"elhandel" = elleverantörsfaktura (förhandlingsbar). "natavgift" = nätägarens distributionsfaktura (ej förhandlingsbar). "kombinerad" = båda. null om ej elfaktura.',
      },
      el_spot_price_kwh: {
        type: ['number', 'null'],
        description: 'Nordpool spotpris i kr/kWh om det är tydligt separerat från handelspåslag på fakturan. null om ej explicit, okänt eller fastprisavtal.',
      },

      connection_speed_mbit: {
        type: ['integer', 'null'],
        description: 'Anslutningshastighet i Mbit/s för bredbandsfakturor. Standardnivåer: 100, 250, 500, 1000. null om ej bredbandsfaktura.',
      },
      license_type: {
        type: ['string', 'null'],
        description: 'Normaliserat licensplanets namn, t.ex. "Business Standard", "E3", "Google Workspace Business Starter". null om ej per-användarlicenser eller plannamn saknas.',
      },
      billing_cycle_type: {
        type: ['string', 'null'],
        description: 'Faktureringsmodell: "monthly" (månadsvis), "annual" (årsvis), "unknown". null om ej SaaS-faktura.',
      },

      saas_product_family: {
        type: ['string', 'null'],
        description: 'Produktfamilj: "microsoft-365", "google-workspace", "slack", "zoom", "atlassian-jira", "atlassian-confluence", "adobe-creative-cloud", "salesforce", "hubspot". null om okänt.',
      },
      saas_included_features: {
        type: ['array', 'null'],
        items: { type: 'string' },
        description: 'Inkluderade plattformstjänster för M365 och Google Workspace. null för alla andra produkter.',
      },
      startup_credit_balance: {
        type: ['number', 'null'],
        description: 'Kvarvarande kreditbalans från startup-/kampanjprogram som visas på fakturan. null om ej tillämpligt.',
      },
      startup_credit_monthly_burn: {
        type: ['number', 'null'],
        description: 'Faktisk månadsförbrukning INNAN startup-kredit applicerades (summan av alla tjänstrader). null om ej tillämpligt.',
      },
      startup_credit_currency: {
        type: ['string', 'null'],
        description: 'Valutakod för krediten, t.ex. "USD" eller "SEK". null om ej tillämpligt.',
      },
      startup_credit_expiry_date: {
        type: ['string', 'null'],
        description: 'Datum då startup-krediterna förfaller, ISO-format YYYY-MM-DD. Extrahera från text som "expire on August 31, 2026". null om ej angivet.',
      },
      service_period_start: {
        type: ['string', 'null'],
        description: 'Startdatum för avtalets BINDNINGSPERIOD i ISO-format YYYY-MM-DD (t.ex. "Avtal 2024-01-01 – 2026-12-31" → "2024-01-01"). null om löpande abonnemang utan angiven bindningstid.',
      },
      service_period_end: {
        type: ['string', 'null'],
        description: 'Slutdatum för avtalets BINDNINGSPERIOD i ISO-format YYYY-MM-DD. null om löpande abonnemang utan angiven bindningstid.',
      },
      billing_period_start: {
        type: ['string', 'null'],
        description: 'Startdatum för perioden fakturan AVSER i ISO-format YYYY-MM-DD (t.ex. "Period 2026-01-01 – 2026-01-31" → "2026-01-01"). null om inga perioddatum finns på fakturan.',
      },
      billing_period_end: {
        type: ['string', 'null'],
        description: 'Slutdatum för perioden fakturan avser i ISO-format YYYY-MM-DD. null om inga perioddatum finns på fakturan.',
      },
      cancellation_notice_days: {
        type: ['integer', 'null'],
        description: 'Uppsägningstid i hela dagar. Konvertera månader till dagar (3 mån = 90). null om ej angivet.',
      },
      cancellation_fee_explicit: {
        type: ['string', 'null'],
        description: 'Explicit text om lösenavgift / förtidsavgift från fakturan. Extrahera exakt formulering. null om ej angivet.',
      },
      currency: {
        type: 'string',
        description: 'Valutakod som fakturan är utfärdad i, t.ex. "SEK", "EUR", "USD". Default "SEK".',
      },
      potential_mixed_categories: {
        type: 'boolean',
        description: 'true om fakturan tydligt innehåller tjänster från flera kategorier (t.ex. mobil + bredband). false annars.',
      },

      customer_org_number: {
        type: ['string', 'null'],
        description: 'Kundens (fakturamottagarens) organisationsnummer, t.ex. "556777-1111". null om ej angivet på fakturan.',
      },
      invoiceTotal: {
        type: ['integer', 'null'],
        description: 'Fakturans totala "Att betala"-belopp exkl. moms (dividera med 1.25 om enbart ink. moms visas). null om ej tydligt angivet.',
      },
    },
    required: [
      'supplier', 'date', 'description', 'billingPeriod',
      'lineItems', 'confidenceScore', 'outOfScope', 'outOfScopeReason',
      'projectedRecurringAmount',
    ],
  },
};

/**
 * Deterministic post-processing rules applied to raw AI output BEFORE aggregation.
 *
 * Every rule here encodes a previously discovered AI classification mistake so
 * it never repeats. When a new failure is found: add a rule, add a comment
 * with the source invoice, run stress-test.mjs on that file to verify, commit.
 *
 * Rules never touch amounts — only `type` and `seatCount`.
 */
function applyDeterministicRules(raw) {
  if (!Array.isArray(raw.lineItems)) return raw;

  const lineItems = raw.lineItems.map((item) => {
    const desc = item.description ?? '';

    // RULE: Fixed corporate data packages are always recurring_subscription.
    // "Datapaket X GB" = flat-rate upgrade included in all subscriptions — recurring cost.
    // Distinct from "Datatillägg X GB (abonnent 070-...)" which is per-user variable purchase.
    // Source: customer-telia — "Datapaket 50GB Extra" (6 705 kr for 45 subs) misclassified as variable.
    if (
      item.type === 'variable_usage' &&
      /\bdatapaket\b/i.test(desc) &&
      !/abonnent|070|073|076|072|\+46|\d{9,}/.test(desc)
    ) {
      return { ...item, type: 'recurring_subscription' };
    }

    // RULE: Mobile data add-ons are variable_usage, never recurring.
    // "Datatillägg X GB", "Extra data X GB", "tillägg X GB", "GB-tillägg"
    // Source: comviq-mobil-budget — 49 kr Datatillägg 2 GB classified as recurring_subscription.
    if (
      item.type === 'recurring_subscription' &&
      /datatillägg|extra[\s-]data\b|(?:\d+\s*GB\b|GB[-\s])tillägg|\btillägg\s+\d+\s*GB\b/i.test(desc)
    ) {
      return { ...item, type: 'variable_usage' };
    }

    // RULE: Fixed periodic fees are always recurring_subscription.
    // "Fast månadsavgift", "Fast avgift", "Fast fakturaavgift"
    // Source: tele2-mobil-enkel — 49 kr Fast månadsavgift sometimes excluded from annualCost.
    if (
      item.type !== 'recurring_subscription' &&
      item.type !== 'one_time_fee' &&
      /^\s*fast\s+(?:månads|dygns|vecko|faktura|admin)?avgift/i.test(desc)
    ) {
      return { ...item, type: 'recurring_subscription' };
    }

    return item;
  });

  // All rules below operate on non-addon subscription lines with explicit quantities.
  let seatCount = raw.seatCount ?? null;
  const subLineItems = lineItems.filter(
    (l) => l.type === 'recurring_subscription' && (l.quantity ?? 0) > 0 && !l.is_addon,
  );

  // Partition sub-lines into archived and active — archived accounts must never count.
  // "Archived User" = reduced-cost storage for ex-employees, not an active seat.
  // Source: google-workspace-arsbetalning — AI sometimes includes 5 archived in seatCount.
  const ARCHIVED_RE = /archived?\s+(user|licens|license|account)|arkiverad\s+an/i;
  const archivedSubLines = subLineItems.filter((l) => ARCHIVED_RE.test(l.description ?? ''));
  const activeSubLines   = subLineItems.filter((l) => !ARCHIVED_RE.test(l.description ?? ''));
  const effectiveLines   = activeSubLines.length > 0 ? activeSubLines : subLineItems;

  // RULE: Multi-module SaaS seatCount = max across active modules.
  // When line items have per-module quantities (Fortnox, Visma etc.), the
  // dominant module (most users) determines seatCount — not the sum of modules.
  // Source: customer-fortnox — AI returned 12 (5+5+2) ignoring K&U module (60 users).
  if (effectiveLines.length > 0) {
    const maxQty = Math.max(...effectiveLines.map((l) => l.quantity));
    if (seatCount == null || maxQty > seatCount) seatCount = maxQty;
  }

  // RULE: If archived lines were present, always recompute seatCount from active lines.
  // Prevents double-subtract when AI already excluded archived users per SYSTEM_PROMPT.
  // Source: google-workspace-arsbetalning — AI returns 20 (correct active count); rule
  // ensures seatCount = max(active line quantities) = 20, not affected by archived lines.
  if (archivedSubLines.length > 0 && activeSubLines.length > 0) {
    seatCount = Math.max(...activeSubLines.map((l) => l.quantity));
  }

  // RULE: CRM multi-module seatCount = SUM (not max).
  // HubSpot and Salesforce modules serve distinct teams — Marketing ≠ Sales ≠ Service.
  // Exception: Salesforce analytics/AI products (Einstein, Tableau CRM) share seats with primary
  // modules — they are feature add-ons, not additional headcount.
  // Also exclude credit/discount lines — they carry quantity=1 but represent no users.
  // Source: hubspot-marketing-pro (5+10=15, not max=10).
  // Source: salesforce-enterprise (25+10=35; Einstein Analytics 25 overlaps with Sales Cloud 25).
  // Source: customer-salesforce — Annual Discount sometimes recurring w/ quantity=1 → 26 instead of 25.
  if (/hubspot|salesforce/i.test(raw.supplier ?? '') && effectiveLines.length > 1) {
    const SFDC_ANALYTICS_RE = /einstein|tableau\s+crm|analytics\s+cloud/i;
    const CRM_CREDIT_RE = /rabatt|discount|kredit|credit|kreditering|avdrag/i;
    const headcountLines = /salesforce/i.test(raw.supplier ?? '')
      ? effectiveLines.filter((l) => !SFDC_ANALYTICS_RE.test(l.description ?? '') && !CRM_CREDIT_RE.test(l.description ?? '') && (l.amount ?? 0) >= 0)
      : effectiveLines.filter((l) => !CRM_CREDIT_RE.test(l.description ?? '') && (l.amount ?? 0) >= 0);
    const sumLines = headcountLines.length > 0 ? headcountLines : effectiveLines;
    seatCount = sumLines.reduce((s, l) => s + l.quantity, 0);
  }

  // RULE: For mobile invoices with cloud switchboard (pbx), SIM-card count wins.
  // PBX user licenses can exceed actual SIM subscriptions — benchmark is on mobile
  // subscriptions, not switchboard capacity.
  // Source: telenor-molnvaxel-stor — 45 SIM-kort men 50 molnväxelanvändare → seatCount 45.
  const simLines = lineItems.filter(
    (l) =>
      l.type === 'recurring_subscription' &&
      !l.is_addon &&
      (l.quantity ?? 0) > 0 &&
      /abonnemang|sim[-\s]?kort|mobilabonnemang|jobbmobil|företagsmobil/i.test(l.description ?? ''),
  );
  const pbxLines = lineItems.filter(
    (l) => l.is_addon && l.addon_type === 'pbx' && (l.quantity ?? 0) > 0,
  );
  if (simLines.length > 0 && pbxLines.length > 0) {
    const simCount = simLines.reduce((s, l) => s + l.quantity, 0);
    if (simCount > 0) seatCount = simCount;
  }

  return { ...raw, lineItems, seatCount };
}

/**
 * Summera lineItems per typ och beräkna annualCost deterministiskt.
 * Alla aggregerade fält som categorize.js och recommend.js förväntar sig
 * genereras här — modellen räknar aldrig ut dem själv.
 */
export function aggregateLineItems(rawInput) {
  const raw = applyDeterministicRules(rawInput);
  const sum = (type) =>
    (raw.lineItems ?? [])
      .filter((l) => l.type === type)
      .reduce((s, l) => s + l.amount, 0);

  const recurringAmount = sum('recurring_subscription');
  const variableCharges = sum('variable_usage');
  const oneTimeFees     = sum('one_time_fee') + sum('hardware');

  // Beräkna faktureringsperiod från datum i första hand — kan inte luras av fotnotstext.
  // AI-värdet används bara som fallback när inga datum finns på fakturan.
  const dateDerivedPeriod = computeBillingPeriodFromDates(
    raw.billing_period_start,
    raw.billing_period_end,
  );
  let billingPeriod = dateDerivedPeriod ?? raw.billingPeriod;
  let billingPeriodSource = dateDerivedPeriod ? 'dates' : 'ai';

  if (dateDerivedPeriod && dateDerivedPeriod !== raw.billingPeriod) {
    console.log(
      `[billing-period] date override: AI="${raw.billingPeriod}" → dates="${dateDerivedPeriod}" (${raw.billing_period_start} – ${raw.billing_period_end})`,
    );
  }

  // RULE: Fakturor med ≥2 recurring-rader med quantity ≥5 är nästan alltid månadsvis.
  // Mobilabonnemang (SIM-kort per rad) och SaaS faktureras i Sverige alltid månadsvis
  // när de har många per-enhet/per-seat-rader. Kvartalsfakturor har sällan denna struktur.
  // Skyddar mot AI-fel där footertext ("3 månaders uppsägningstid") eller annat triggar quarterly.
  // Source: customer-sveamobil — AI satte quarterly trots månadsvis mobilfaktura.
  if (!dateDerivedPeriod && billingPeriod === 'quarterly') {
    const perUnitLines = (raw.lineItems ?? []).filter(
      (l) => l.type === 'recurring_subscription' && (l.quantity ?? 0) >= 5,
    );
    if (perUnitLines.length >= 2) {
      console.log(
        `[billing-period] multi-unit quarterly override → monthly (${perUnitLines.length} rader med quantity≥5)`,
      );
      billingPeriod = 'monthly';
      billingPeriodSource = 'rule:multi-unit';
    }
  }

  const multiplier = PERIOD_MULTIPLIER[billingPeriod] ?? 12;

  // projectedRecurringAmount: beräknas deterministiskt om is_prorata-rader finns.
  // Pro-rata-rader representerar nya licenser som nästa period debiteras fullt —
  // koden räknar quantity × unitPrice per rad (inte det fakturerade deltidsbeloppet).
  // AI-aritmetik är opålitlig för detta steg; kodberäkning garanterar korrekt baseline.
  const proRataLines = (raw.lineItems ?? []).filter(
    (l) => l.type === 'one_time_fee' && l.is_prorata === true,
  );
  const proRataProjected = proRataLines.reduce((s, l) => {
    const fullMonthly =
      l.quantity != null && l.unitPrice != null
        ? l.quantity * l.unitPrice
        : l.amount;
    return s + fullMonthly;
  }, 0);

  const projected =
    proRataLines.length > 0
      ? recurringAmount + proRataProjected
      : typeof raw.projectedRecurringAmount === 'number' && raw.projectedRecurringAmount > 0
        ? raw.projectedRecurringAmount
        : recurringAmount;

  return {
    supplier:                 raw.supplier,
    date:                     raw.date,
    description:              raw.description,
    account:                  raw.account ?? null,
    billingPeriod,
    billingPeriodSource,
    lineItems: (raw.lineItems ?? []).map((li) => ({
      description: li.description,
      amount:      li.amount,
      type:        li.type,
      quantity:    li.quantity  ?? null,
      unitPrice:   li.unitPrice ?? null,
      is_addon:    li.is_addon   ?? false,
      addon_type:  li.addon_type  ?? null,
      is_prorata:  li.is_prorata  ?? false,
    })),
    amount:                   (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0),
    recurringAmount,
    projectedRecurringAmount: projected,
    variableCharges,
    oneTimeFees,
    annualCost:               projected * multiplier,
    recurring:                recurringAmount > 0,
    confidenceScore:          raw.confidenceScore,
    confidenceNotes:          raw.confidenceNotes ?? null,
    outOfScope:               raw.outOfScope ?? false,
    outOfScopeReason:         raw.outOfScopeReason ?? null,
    seatCount:                raw.seatCount ?? null,
    roamingZone:              raw.roaming_zone != null ? Number(raw.roaming_zone) : null,
    notes:                    raw.confidenceNotes ?? null,
    elKwh:            raw.el_kwh != null ? Number(raw.el_kwh) : null,
    elBillingMonth:   raw.el_billing_month ?? null,
    elOmrade:         raw.el_omrade ?? null,
    elFastAvgiftKr:    raw.el_fast_avgift_kr != null ? Number(raw.el_fast_avgift_kr) : null,
    elNatFastAvgiftKr: raw.el_nat_fast_avgift_kr != null ? Number(raw.el_nat_fast_avgift_kr) : null,
    elEnergiPerKwh:   raw.el_energipris_per_kwh != null ? Number(raw.el_energipris_per_kwh) : null,
    elSkatterKr:      raw.el_skatter_kr != null ? Number(raw.el_skatter_kr) : null,
    elPriceExplicit:  raw.el_price_explicit ?? null,
    elContractType:   raw.el_contract_type ?? null,
    elInvoiceType:    raw.el_invoice_type ?? null,
    elSpotPriceKwh:   raw.el_spot_price_kwh != null ? Number(raw.el_spot_price_kwh) : null,

    connectionSpeedMbit:       raw.connection_speed_mbit != null ? Number(raw.connection_speed_mbit) : null,
    licenseType:               raw.license_type ?? null,
    billingCycleType:          raw.billing_cycle_type ?? null,
    // Compute price per seat in code — more reliable than asking AI to do the arithmetic.
    // Täljaren är projected (run-rate inkl. prorata-licenser till fullt pris), eftersom
    // seatCount räknar SAMMA licensmängd. recurringAmount exkluderar prorata-rader →
    // 13 725 kr / 73 licenser = "188 kr/anv" när sanningen är 15 355 / 73 = 210 kr.
    pricePerSeatMonthly: (() => {
      const periodMonths = { monthly: 1, quarterly: 3, annual: 12, one_time: 1, unknown: 1 }[billingPeriod] ?? 1;
      const seats = raw.seatCount > 0 ? raw.seatCount : null;
      return (seats && periodMonths > 0 && projected > 0)
        ? Math.round(projected / seats / periodMonths * 100) / 100
        : null;
    })(),
    saasProductFamily:    raw.saas_product_family ?? null,
    saasIncludedFeatures: raw.saas_included_features ?? null,
    startupCreditBalance:      raw.startup_credit_balance != null ? Number(raw.startup_credit_balance) : null,
    startupCreditMonthlyBurn:  raw.startup_credit_monthly_burn != null ? Number(raw.startup_credit_monthly_burn) : null,
    startupCreditCurrency:     raw.startup_credit_currency ?? null,
    startupCreditExpiryDate:   raw.startup_credit_expiry_date ?? null,
    servicePeriodStart:        raw.service_period_start ?? null,
    servicePeriodEnd:          raw.service_period_end ?? null,
    billingPeriodStart:        raw.billing_period_start ?? null,
    billingPeriodEnd:          raw.billing_period_end ?? null,
    cancellationNoticeDays:    raw.cancellation_notice_days != null ? Number(raw.cancellation_notice_days) : null,
    cancellationFeeExplicit:   raw.cancellation_fee_explicit ?? null,
    currency:                  raw.currency ?? 'SEK',
    potentialMixedCategories:  raw.potential_mixed_categories ?? false,

    customerOrgNumber:         raw.customer_org_number ?? null,
    invoiceTotal:              raw.invoiceTotal != null ? Number(raw.invoiceTotal) : null,
  };
}


/**
 * Triagera extraktionsresultatet.
 * Returnerar route: 'auto' | 'review_queue' | 'unsupported'
 *
 * Kontroller körs i två lager:
 *   1. Sanity checks — fångar "confident wrong" oberoende av AI:ns self-reported confidence
 *   2. Confidence threshold — fångar fall där AI:n själv signalerar osäkerhet
 */
export function routeExtraction(extracted) {
  if (extracted.outOfScope) {
    return { route: 'unsupported', reason: extracted.outOfScopeReason ?? 'out_of_scope' };
  }

  // ── Ring 1: Matematisk ankartest ─────────────────────────────────────────
  // Om fakturan har ett "Att betala"-belopp ska summan av raderna stämma inom 3%.
  // Stor avvikelse indikerar missad rad, dubbel rad eller fel vid moms-hantering.
  // Tolerans: max(50 kr, 3 % av total) — absorberar avrundning och öresavrundning.
  if (extracted.invoiceTotal > 0 && (extracted.lineItems ?? []).length > 0) {
    const lineSum = (extracted.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0);
    if (lineSum > 0) {
      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
      const tolerance = Math.max(50, extracted.invoiceTotal * 0.03);
      if (diff > tolerance) {
        return {
          route:  'review_queue',
          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
        };
      }
    }
  }

  // ── Ring 2 (Balanskravet B2): per-rad-aritmetik — antal × à-pris = radbelopp ──
  // SKUGG-LÄGE tills falsklarmsfrekvensen är uppmätt i produktion:
  // utfall loggas alltid; stoppar enbart när BALANSKRAV_ENFORCE=1.
  {
    const b2 = judgeLineArithmetic(extracted);
    if (!b2.balanced) {
      const detail = b2.violations
        .map(v => `"${(v.line ?? '').slice(0, 48)}" förväntat ${Math.round(v.expected)} kr, fick ${v.actual} kr (${v.reason})`)
        .join(' · ');
      console.warn(`[balanskrav] B2 ${process.env.BALANSKRAV_ENFORCE === '1' ? 'STOPP' : 'SKUGGA'}: ${b2.violations.length}/${b2.judged} rader obalanserade — ${detail}`);
      if (process.env.BALANSKRAV_ENFORCE === '1') {
        return {
          route:  'review_queue',
          reason: `Balanskrav B2: ${b2.violations.length} rad(er) där antal × à-pris inte ger radbeloppet`,
        };
      }
    }
  }

  // ── Lager 1: Sanity checks ────────────────────────────────────────────────
  if (!extracted.supplier || extracted.supplier.trim() === '') {
    return { route: 'review_queue', reason: 'Leverantörsnamn saknas' };
  }

  if ((extracted.lineItems ?? []).length === 0) {
    return { route: 'review_queue', reason: 'Inga kostnadsrader extraherades' };
  }

  if (extracted.billingPeriod === 'unknown') {
    return { route: 'review_queue', reason: 'Faktureringsperiod okänd — annualisering otillförlitlig' };
  }

  if (extracted.annualCost === 0 && extracted.billingPeriod !== 'one_time') {
    return { route: 'review_queue', reason: 'Beräknad årskostnad är 0 kr trots återkommande fakturering' };
  }

  // ── Lager 2: AI:ns self-reported confidence ───────────────────────────────
  if (extracted.confidenceScore < CONFIDENCE_THRESHOLD) {
    return {
      route:  'review_queue',
      reason: `Confidence ${extracted.confidenceScore.toFixed(2)} under tröskel ${CONFIDENCE_THRESHOLD}`,
    };
  }

  return { route: 'auto' };
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ExtractorError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

/**
 * Extrahera och aggregera fakturadata från en PDF.
 *
 * @param {{ pdfPath?: string, pdfBytes?: Buffer }} input
 * @param {{ client?: Anthropic }} [opts]
 * @returns {Promise<ReturnType<aggregateLineItems> & { usage: object }>}
 */
export async function extractInvoice(input, opts = {}) {
  let pdfBytes;
  if (input.pdfBytes) {
    pdfBytes = input.pdfBytes;
  } else if (input.pdfPath) {
    if (extname(input.pdfPath).toLowerCase() !== '.pdf') {
      throw new ExtractorError(`Förväntade .pdf, fick: ${input.pdfPath}`);
    }
    pdfBytes = readFileSync(input.pdfPath);
  } else {
    throw new ExtractorError('Antingen pdfPath eller pdfBytes måste anges');
  }

  const pdfBase64 = pdfBytes.toString('base64');
  const client    = opts.client ?? getClient();

  const requestParams = {
    model:      MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools:      [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'extract_invoice' },
    messages: [
      {
        role: 'user',
        content: [
          {
            type:   'document',
            source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 },
          },
          {
            type: 'text',
            text: 'Extrahera alla kostnadsrader med semantisk klassificering via verktyget extract_invoice.',
          },
        ],
      },
    ],
  };

  let response;
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      response = await client.messages.create(requestParams);
      break;
    } catch (err) {
      const overloaded = err.status === 529;
      if (overloaded && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
        continue;
      }
      throw new ExtractorError(
        overloaded
          ? 'Tjänsten är tillfälligt överbelastad — försök igen om en stund.'
          : 'Analysen misslyckades — försök igen.',
        { cause: err }
      );
    }
  }

  const toolUseBlock = response.content.find(
    (b) => b.type === 'tool_use' && b.name === 'extract_invoice'
  );
  if (!toolUseBlock) {
    throw new ExtractorError(
      `Modellen returnerade inget verktygsanrop. stop_reason=${response.stop_reason}`
    );
  }

  const aggregated = aggregateLineItems(toolUseBlock.input);
  return { ...aggregated, usage: response.usage };
}
