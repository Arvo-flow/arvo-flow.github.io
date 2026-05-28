// agents/test-invoice/extract.js
// PDF → semantiskt klassificerade raddata via Claude Opus 4.7.
// Varje kostnadsrad klassificeras: recurring_subscription | variable_usage |
// one_time_fee | hardware. aggregateLineItems() summerar per typ och
// beräknar annualCost = recurringAmount × periodMultiplier.
//
// Model: claude-opus-4-7 — native PDF-support + högst tolkningsnoggrannhet.
// Output: tool_use + tool_choice för deterministisk strukturerad output.

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { FEWSHOT_EXAMPLES } from './fewshot-examples.js';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 2048;

export const CONFIDENCE_THRESHOLD = 0.70;

const PERIOD_MULTIPLIER = {
  monthly:   12,
  quarterly:  4,
  annual:     1,
  one_time:   0,
  unknown:   12,
};

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

variable_usage
  Rörliga kostnader som varierar med faktisk förbrukning.
  För mobiltelefoni: roaming utanför EU, övertrafik, extra datapåslag, SMS-paket utanför plan.
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
  en period (t.ex. "Pro-rata: Tillagd 16 maj", "delsperiod"). Dessa är
  periodjusteringar som inte återkommer — nästa period debiteras full avgift.
  Klassificera ALLTID sådana rader som one_time_fee.

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

FAKTURERINGSPERIOD — välj exakt ett värde baserat på fakturans rader:
  monthly   = faktureras månadsvis (vanligast för abonnemang)
  quarterly = faktureras kvartalsvis. Välj detta om fakturan explicit markeras "Q1", "Q2", "Q3",
              "Q4", "kvartal", "quarter", "3 månader" ELLER om perioddatumet täcker ≥ 60 dagar
              av löpande abonnemangstjänst. Multiplikatorn quarterly × 4 = årskostnad.
  annual    = faktureras årsvis (t.ex. försäkringspremie, årslicens, 12-månadersfaktura)
  one_time  = engångsfaktura utan löpande abonnemang
  unknown   = kan ej avgöras med säkerhet

CONFIDENCE SCORE (0.0–1.0):
  1.0 = alla rader är tydligt beskrivna, period är otvetydig, inga antaganden krävdes.
  Sänk vid: otydliga radbeskrivningar, saknad periodinfo, blandade perioder,
  faktura på utländskt språk, skannad/handskriven faktura, antaganden som krävdes.
  Sänk alltid om du är osäker på klassificeringen av någon rad.

OUT OF SCOPE — sätt outOfScope: true om fakturan avser tjänster utan
  förhandlingsbar volymstruktur: redovisningstjänster, juridik, restaurang/mat,
  rekrytering, marknadsföring, bemanning, utbildning, myndighetsavgifter.
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
  OBS: Molnväxel och liknande tilläggstjänster ska märkas is_addon: true, addon_type: "pbx" (se TILLÄGGSTJÄNSTER ovan).

BREDBANDSFAKTUROR — extrahera dessa fält om fakturan är från en bredbandsleverantör:
  connection_speed_mbit: Anslutningshastighet i Mbit/s som heltal.
    Runda till närmaste standardnivå: 100, 250, 500, 1000.
    Exempel: "1 Gbit", "1000/1000 Mbit", "1 Gbit/s symmetrisk" → 1000.
    Exempel: "500 Mbit", "500/500 Mbit" → 500. "250 Mbit" → 250. "100 Mbit" → 100.
    null om ej bredbandsfaktura eller hastighet ej angiven.
  OBS: Statisk IP, managed firewall, extra SLA och liknande tillägg ska märkas is_addon: true med rätt addon_type (se TILLÄGGSTJÄNSTER ovan).

SAAS-LICENSER — extrahera dessa fält om fakturan avser mjukvarulicenser eller SaaS:
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
  Sätt alla tre till null om inga startup-/programkrediter förekommer på fakturan.

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
  el_fast_avgift_kr: Leverantörens fasta månadsavgift (abonnemangsavgift) i kr exkl. moms.
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
    – Spotpriset inte framgår explicit med ord som "spot", "inköp", "Nord Pool" o.d.${FEWSHOT_EXAMPLES ? '\n\n' + FEWSHOT_EXAMPLES : ''}`;

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
          },
          required: ['description', 'amount', 'type', 'is_addon'],
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
      seatCount: {
        type: ['integer', 'null'],
        description: 'Totalt antal seats/licenser. Summera alla licensrader oavsett tier. null om inte per-användarprenumeration.',
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
        description: 'Fast månadsavgift hos elleverantören i kr exkl. moms. null om saknas/ej elfaktura.',
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
      service_period_start: {
        type: ['string', 'null'],
        description: 'Startdatum för fakturans tjänsteperiod i ISO-format YYYY-MM-DD. null om ej angivet.',
      },
      service_period_end: {
        type: ['string', 'null'],
        description: 'Slutdatum för fakturans tjänsteperiod i ISO-format YYYY-MM-DD. null om ej angivet.',
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
    },
    required: [
      'supplier', 'date', 'description', 'billingPeriod',
      'lineItems', 'confidenceScore', 'outOfScope',
      'projectedRecurringAmount',
    ],
  },
};

/**
 * Summera lineItems per typ och beräkna annualCost deterministiskt.
 * Alla aggregerade fält som categorize.js och recommend.js förväntar sig
 * genereras här — modellen räknar aldrig ut dem själv.
 */
export function aggregateLineItems(raw) {
  const sum = (type) =>
    (raw.lineItems ?? [])
      .filter((l) => l.type === type)
      .reduce((s, l) => s + l.amount, 0);

  const recurringAmount = sum('recurring_subscription');
  const variableCharges = sum('variable_usage');
  const oneTimeFees     = sum('one_time_fee') + sum('hardware');
  const multiplier      = PERIOD_MULTIPLIER[raw.billingPeriod] ?? 12;

  // projectedRecurringAmount: AI:ns beräkning av vad som faktiskt debiteras nästa fulla
  // period, normaliserat för pro-rata och krediteringar. Styr annualCost-beräkningen.
  // Sanity check: värdet måste vara ett positivt heltal. Annars fallback till recurringAmount
  // och sänkt confidence signaleras implicit via att annualCost matchar recurring-summan.
  const projected =
    typeof raw.projectedRecurringAmount === 'number' && raw.projectedRecurringAmount > 0
      ? raw.projectedRecurringAmount
      : recurringAmount;

  return {
    supplier:                 raw.supplier,
    date:                     raw.date,
    description:              raw.description,
    account:                  raw.account ?? null,
    billingPeriod:            raw.billingPeriod,
    lineItems: (raw.lineItems ?? []).map((li) => ({
      description: li.description,
      amount:      li.amount,
      type:        li.type,
      quantity:    li.quantity  ?? null,
      unitPrice:   li.unitPrice ?? null,
      is_addon:    li.is_addon  ?? false,
      addon_type:  li.addon_type ?? null,
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
    seatCount:                raw.seatCount ?? null,
    notes:                    raw.confidenceNotes ?? null,
    elKwh:            raw.el_kwh != null ? Number(raw.el_kwh) : null,
    elBillingMonth:   raw.el_billing_month ?? null,
    elOmrade:         raw.el_omrade ?? null,
    elFastAvgiftKr:   raw.el_fast_avgift_kr != null ? Number(raw.el_fast_avgift_kr) : null,
    elEnergiPerKwh:   raw.el_energipris_per_kwh != null ? Number(raw.el_energipris_per_kwh) : null,
    elSkatterKr:      raw.el_skatter_kr != null ? Number(raw.el_skatter_kr) : null,
    elPriceExplicit:  raw.el_price_explicit ?? null,
    elContractType:   raw.el_contract_type ?? null,
    elInvoiceType:    raw.el_invoice_type ?? null,
    elSpotPriceKwh:   raw.el_spot_price_kwh != null ? Number(raw.el_spot_price_kwh) : null,

    connectionSpeedMbit:       raw.connection_speed_mbit != null ? Number(raw.connection_speed_mbit) : null,
    licenseType:               raw.license_type ?? null,
    billingCycleType:          raw.billing_cycle_type ?? null,
    // Compute price per seat in code — more reliable than asking AI to do the arithmetic
    pricePerSeatMonthly: (() => {
      const periodMonths = { monthly: 1, quarterly: 3, annual: 12, one_time: 1, unknown: 1 }[raw.billingPeriod] ?? 1;
      const seats = raw.seatCount > 0 ? raw.seatCount : null;
      return (seats && periodMonths > 0 && recurringAmount > 0)
        ? Math.round(recurringAmount / seats / periodMonths * 100) / 100
        : null;
    })(),
    saasProductFamily:    raw.saas_product_family ?? null,
    saasIncludedFeatures: raw.saas_included_features ?? null,
    startupCreditBalance:      raw.startup_credit_balance != null ? Number(raw.startup_credit_balance) : null,
    startupCreditMonthlyBurn:  raw.startup_credit_monthly_burn != null ? Number(raw.startup_credit_monthly_burn) : null,
    startupCreditCurrency:     raw.startup_credit_currency ?? null,
    servicePeriodStart:        raw.service_period_start ?? null,
    servicePeriodEnd:          raw.service_period_end ?? null,
    cancellationNoticeDays:    raw.cancellation_notice_days != null ? Number(raw.cancellation_notice_days) : null,
    cancellationFeeExplicit:   raw.cancellation_fee_explicit ?? null,
    currency:                  raw.currency ?? 'SEK',
    potentialMixedCategories:  raw.potential_mixed_categories ?? false,

    customerOrgNumber:         raw.customer_org_number ?? null,
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
    return { route: 'unsupported' };
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
