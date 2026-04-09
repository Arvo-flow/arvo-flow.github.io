import { useState, useEffect, useRef } from "react";

const LANG = {
sv: {
overview:"Översikt",contacts:"Kontakter",projects:"Projekt",invoices:"Fakturor",time:"Tid",
dashTitle:"Din ekonomi just nu",dashSub:"Arvo bevakar din likviditet 24/7. Här ser du vad som behöver din uppmärksamhet innan det blir ett problem.",
pipeline:"Pipeline",won:"Vunnet",awaitingPayment:"Väntar betalning",loggedWeek:"Loggat / vecka",
activeProjects:"Aktiva projekt",toDo:"Att göra",daysSince:"dagar",sinceContact:"sedan kontakt",
complete:"klart",recentInvoices:"Senaste fakturor",dueDate:"förfaller",
contactsTitle:"Kontakter",inNetwork:"kontakter i ditt nätverk",searchPlaceholder:"Sök namn eller företag…",
all:"Alla",customer:"Kund",lead:"Lead",prospect:"Prospekt",dSince:"d sedan",
newContact:"Ny kontakt",name:"Namn",company:"Företag",email:"E-post",phone:"Telefon",
notes:"Anteckningar",save:"Spara",cancel:"Avbryt",value:"Värde",
daysSinceContact:"dagar sedan kontakt",edit:"Redigera",back:"Tillbaka",
projectsTitle:"Projekt",totalProjects:"projekt totalt",tasks:"Uppgifter",budget:"Budget",
progress:"Framdrift",deadline:"Deadline",used:"använt",
invoicesTitle:"Fakturor",invoicesCount:"fakturor",paid:"Betald",sent:"Skickad",
overdue:"Förfallen",draft:"Utkast",paidTotal:"Betalt",pending:"Väntar",overdueTotal:"Förfallet",
newInvoice:"Ny faktura",client:"Kund",amount:"Belopp",invoiceDate:"Fakturadatum",
dueBy:"Förfallodatum",description:"Beskrivning",
timeTitle:"Tidrapportering",weekLabel:"Vecka 13, mars 2026",
start:"Starta",pause:"Pausa",reset:"Nollställ",today:"Idag",week:"Vecka",
perProject:"Per projekt",recentEntries:"Senaste registreringar",whatWorking:"Vad jobbar du med?",
newItem:"Ny",newProject:"Nytt",theme:"Tema",customize:"Anpassa",dashboardCards:"Startsidan",
currency:"Valuta",call:"Ring",insights:"Insikter",
healthLabel:"Verksamhetens hälsa",healthDetail:"Så beräknas din hälsopoäng",
forecastTitle:"Intäktsprognos",forecastSub:"Baserat på din pipeline och historik",
nextQuarter:"Nästa kvartal",winRate:"Win-rate",avgDeal:"Snittaffär",
bestCase:"Bästa fall",worstCase:"Sämsta fall",expected:"Förväntat",
sendFollowUp:"Skicka uppföljning",viewProject:"Visa projekt",viewInvoice:"Visa faktura",
weekDigest:"Veckosammanfattning",weekDigestBody:"Den här veckan har du loggat {hours}h, har {active} aktiva projekt och {pipeline} i pipeline. {action}",
autopilot:"Autopilot",autoReminders:"Automatiska påminnelser",autoOn:"PÅ",autoOff:"AV",
riskRadar:"Riskradar",temperature:"Temperatur",hot:"Varm",warm:"Ljummen",cold:"Kall",frozen:"Frusen",
tempExplain:"Baserat på kontaktfrekvens, pågående projekt och fakturastatus",
factorContacts:"Kontaktaktivitet",factorInvoices:"Fakturastatus",factorProjects:"Projektaktivitet",
factorRevenue:"Intäktsnivå",factorWorkload:"Arbetsbelastning",
boosts:"Höjer",drags:"Sänker",neutral:"Neutral",
showInsights:"Insikter",showForecast:"Prognos",showHealth:"Hälsopoäng",showWeekHours:"Veckotimmar",
showPipeline:"Pipeline",showWon:"Vunnet",showAwaiting:"Väntar betalning",
showToDo:"Att göra",showRecentInv:"Senaste fakturor",showActiveProj:"Aktiva projekt",showDigest:"Veckosammanfattning",
scanInvoice:"Skanna faktura",scanTitle:"Skanna in en faktura",scanDesc:"Ta ett foto eller ladda upp en bild av fakturan. AI:n extraherar kund, belopp och datum automatiskt.",scanning:"Analyserar faktura…",scanSuccess:"Faktura tolkad!",scanUpload:"Ladda upp bild",scanCamera:"Ta foto",extractedData:"Extraherad data",confirm:"Bekräfta",scanError:"Kunde inte tolka fakturan. Försök igen.",
heyArvo:"Arvo — din AI-CFO",heyArvoSub:"Ser kassakrisen innan du gör det. Och skriver påminnelserna åt dig.",heyArvoPlaceholder:"Skriv t.ex. 'Jobbade 3h med design för Karlsson'…",heyArvoListening:"Lyssnar…",heyArvoThinking:"Tänker…",heyArvoTapMic:"Tryck på mikrofonen och berätta",heyArvoWelcome:"Hej! Jag är Arvo — din AI-CFO. Ladda upp dina fakturor så visar jag dig exakt var din kassa står och vad du behöver göra nu.",heyArvoTimeLogged:"Tidsloggning sparad",heyArvoContactCreated:"Ny kontakt skapad",heyArvoInvoiceCreated:"Fakturautkast skapat",heyArvoExpenseLogged:"Utgift registrerad",heyArvoProjectUpdated:"Projekt uppdaterat",heyArvoNoMic:"Din webbläsare stöder inte röstinmatning",heyArvoCantParse:"Jag förstod inte riktigt. Kan du formulera om?",
cfoCashflow:"Kassaflöde",cfoBalance:"Saldo idag",cfoProjected:"Beräknat saldo",cfoVatDue:"Moms att betala",cfoIncoming:"Förväntat in",cfoOutgoing:"Beräknat ut",cfoDaysUntil:"dagar kvar",cfoWarning:"Likviditetsvarning",cfoAction:"Föreslagna åtgärder",cfoSendReminder:"Skicka påminnelse",cfoOfferDiscount:"Erbjud snabbrabatt",cfoSkip:"Hoppa över",cfoApprove:"Godkänn",cfoSent:"Skickat!",cfoReminderSent:"Påminnelse skickad till",cfoDiscountOffered:"Rabatterbjudande skickat till",cfoMonitoring:"Jag bevakar och meddelar dig när de betalar.",cfoCrisisNone:"Allt ser bra ut! Inga likviditetsproblem i sikte.",cfoHeadsUp:"Heads up",cfoBasedOn:"Baserat på dina snittkostnader",cfoNeed:"behöver du",cfoBy:"senast den",cfoYouHave:"Du har",cfoUnpaid:"obetalda fakturor på totalt",cfoSuggest:"Vill du att jag:",
tabChat:"Chatt",tabAnalysis:"Analys",tabImpact:"Värde",tabTrust:"Autonomi",
cmTitle:"Är din kassa på väg att ta slut?",cmSub:"Ladda upp din fakturaexport. Jag visar dig på 5 sekunder om du kommer klara nästa moms- eller löneutbetalning.",cmGdpr:"Din data analyseras direkt i webbläsaren och lämnar aldrig din enhet. Inget lagras på server.",cmDrop:"Dra in din CSV-fil här",cmOr:"eller",cmChoose:"Välj fil från dator",cmDemo:"Testa med exempeldata",cmFormat:"CSV-export från Fortnox, Visma, Bokio m.fl. Kolumner: kund, belopp, datum, status",cmAnalyzing:"Arvo analyserar din data…",cmAnalyzingStep1:"Läser fakturor",cmAnalyzingStep2:"Hittar mönster",cmAnalyzingStep3:"Beräknar risker",cmAnalyzingStep4:"Formulerar åtgärder",
cmResultsTitle:"Din likviditetsanalys",cmResultsSub:"Baserat på {n} fakturor från {clients} kunder",cmSummary:"Sammanfattning",cmOutstanding:"Utestående",cmOverdue:"Försenat",cmAvgDso:"Snittbetaltid",cmDays:"dagar",cmRisk:"Risk jag hittade",cmRiskNone:"Inga stora risker just nu — bra jobbat!",
cmCounter:"Detta kunde du ha undvikit",cmCounterBody:"Om mina påminnelser hade varit aktiva hade du haft {amount} på kontot {days} dagar tidigare. Det hade räckt för att täcka nästa momsinbetalning.",
cmActions:"Vad jag föreslår att du gör nu",cmActionReminder:"Skicka påminnelse",cmActionEarly:"Erbjud snabbrabatt",cmActionFollowup:"Följ upp",cmActFake:"Ja, agera",cmActDone:"Klart",
cmDraftTitle:"Meddelandet är klart",cmDraftSub:"Kopiera och skicka till din kund — eller vänta på auto-send i nästa version",cmCopy:"Kopiera meddelande",cmCopied:"Kopierat till urklipp!",cmBetaNote:"Arvo är i beta. Auto-send via SMS/mejl kommer i Arvo Pro.",cmWantAuto:"Jag vill ha auto-send",cmCloseDraft:"Stäng",
cmPriceTitle:"Vill du ha detta som tjänst?",cmPriceBody:"Arvo Pro kommer innehålla kontinuerlig likviditetsanalys och auto-send via API. Din röst hjälper oss prioritera.",cmPriceQ:"Skulle du betala 499 kr/mån?",cmPriceYes:"Ja — meddela mig när det släpps",cmPriceMaybe:"Kanske — beror på",cmPriceNo:"Inte intresserad just nu",cmPriceThanks:"Tack! Vi hör av oss när Arvo Pro släpps.",
cmReset:"Kör ny analys",cmErrorParse:"Kunde inte läsa filen. Se till att den är en CSV med kolumner för kund, belopp och status.",cmRiskLate:"{client} betalar systematiskt sent ({n} försenade fakturor)",cmRiskBig:"{client} har en stor utestående faktura på {amount}",cmRiskGap:"Likviditetsgap upptäckt: {amount} i försenade fakturor mot nästa månad",cmRiskCrunch:"Kassakris om {n} veckor om inget förändras — du behöver driva in pengar snabbare",cmRiskConcentration:"{pct}% av din omsättning kommer från {client}. Hög koncentrationsrisk — sprid riskerna.",
cmVelocityTitle:"Så betalar dina kunder",cmVelocitySub:"Pålitlighet baserad på historik + försening",cmVelocityCol:"Kund",cmVelocityVol:"Volym",cmVelocityRel:"Pålitlighet",cmVelocityLate:"dagar sen",cmVelocityGood:"Pålitlig",cmVelocityOk:"Okej",cmVelocityBad:"Risk",cmVelocityInv:"fakturor",
cmRunwayTitle:"Kassaprognos — 8 veckor framåt",cmRunwaySub:"Baserad på sannolikhetsviktade inbetalningar + dina snittkostnader",cmRunwaySafe:"Kassan håller — bra jobbat!",cmRunwayCrunch:"Varning: kassakris i vecka {n}",cmRunwayWeek:"V",cmRunwayStart:"Nu",cmRunwayBalance:"Saldo",cmRunwayVat:"Moms",cmRunwayIn:"In",cmRunwayOut:"Ut",
cmTonePrio1:"Brådskande",cmTonePrio2:"Viktigt",cmTonePrio3:"Bonus",
onbTitle:"60 sekunder till klarhet",onbSub:"Så fungerar Arvo — din AI-CFO",onbStep1:"Ladda upp din fakturaexport",onbStep1Desc:"CSV från Fortnox, Visma, Bokio — eller testa med exempeldata",onbStep2:"Arvo analyserar på 5 sekunder",onbStep2Desc:"Pålitlighet per kund, kassaprognos 8 veckor framåt, akuta risker",onbStep3:"Agera — jag skriver åt dig",onbStep3Desc:"Färdiga påminnelser och rabatterbjudanden att kopiera & skicka",onbCTA:"Kör exempeldata nu",onbSkip:"Jag har egen fil",onbDontShow:"Visa inte igen",
impactTitle:"Arvos påverkan",impactSub:"Så här mycket värde har jag skapat åt dig",impactThisMonth:"Denna månad",impactCapital:"Kapital drivet in snabbare",impactDaysSaved:"dagar kortare betaltid",impactTime:"timmar sparade",impactReminders:"påminnelser skickade",impactVsBase:"jämfört med din vanliga betalcykel",impactWins:"Senaste vinsterna",impactWinReminder:"Påminnelse drev in",impactWinEarly:"Fakturerades tidigt",impactDaysFaster:"dagar snabbare",impactWeekRecap:"Veckans sammanfattning",impactRecapBody:"Förra veckan drev jag in {amount} {days} dagar tidigare än din vanliga cykel, och sparade dig {hours}h administration.",impactSeeMore:"Se alla mina vinster",impactEmpty:"Jag har inte hunnit skapa värde än — det kommer snart!",impactROI:"ROI denna månad",impactROIBody:"För varje krona du betalar mig levererar jag",
trustTitle:"Trust Ladder",trustSub:"Välj hur självständigt jag får agera",trustLevel1:"Fråga alltid",trustLevel1Desc:"Jag förbereder allt och du godkänner varje åtgärd. Maximal kontroll.",trustLevel2:"Auto-små",trustLevel2Desc:"Fakturor under 10 000 kr till återkommande kunder skickas automatiskt. Du får notis.",trustLevel3:"Autopilot",trustLevel3Desc:"Jag sköter alla påminnelser själv, du kan alltid ångra. För dig som litar på mig fullt ut.",trustCurrent:"Nuvarande nivå",trustUnlockAt:"Lås upp efter {n} godkända åtgärder",trustActive:"Aktiv",trustAutoSent:"Auto-skickat",trustUndo:"Ångra",trustAutoNote:"Jag skickade just detta automatiskt baserat på din nivå",
},
en: {
overview:"Overview",contacts:"Contacts",projects:"Projects",invoices:"Invoices",time:"Time",
dashTitle:"Your cashflow right now",dashSub:"Arvo watches your liquidity 24/7. Here's what needs your attention before it becomes a problem.",
pipeline:"Pipeline",won:"Won",awaitingPayment:"Awaiting payment",loggedWeek:"Logged / week",
activeProjects:"Active projects",toDo:"To do",daysSince:"days",sinceContact:"since contact",
complete:"complete",recentInvoices:"Recent invoices",dueDate:"due",
contactsTitle:"Contacts",inNetwork:"contacts in your network",searchPlaceholder:"Search name or company…",
all:"All",customer:"Customer",lead:"Lead",prospect:"Prospect",dSince:"d ago",
newContact:"New contact",name:"Name",company:"Company",email:"Email",phone:"Phone",
notes:"Notes",save:"Save",cancel:"Cancel",value:"Value",
daysSinceContact:"days since contact",edit:"Edit",back:"Back",
projectsTitle:"Projects",totalProjects:"projects total",tasks:"Tasks",budget:"Budget",
progress:"Progress",deadline:"Deadline",used:"used",
invoicesTitle:"Invoices",invoicesCount:"invoices",paid:"Paid",sent:"Sent",
overdue:"Overdue",draft:"Draft",paidTotal:"Paid",pending:"Pending",overdueTotal:"Overdue",
newInvoice:"New invoice",client:"Client",amount:"Amount",invoiceDate:"Invoice date",
dueBy:"Due date",description:"Description",
timeTitle:"Time tracking",weekLabel:"Week 13, March 2026",
start:"Start",pause:"Pause",reset:"Reset",today:"Today",week:"Week",
perProject:"Per project",recentEntries:"Recent entries",whatWorking:"What are you working on?",
newItem:"New",newProject:"New",theme:"Theme",customize:"Customize",dashboardCards:"Dashboard cards",
currency:"Currency",call:"Call",insights:"Insights",
healthLabel:"Business Health",healthDetail:"How your health score is calculated",
forecastTitle:"Revenue Forecast",forecastSub:"Based on your pipeline and track record",
nextQuarter:"Next quarter",winRate:"Win rate",avgDeal:"Avg deal",
bestCase:"Best case",worstCase:"Worst case",expected:"Expected",
sendFollowUp:"Send follow-up",viewProject:"View project",viewInvoice:"View invoice",
weekDigest:"Weekly Digest",weekDigestBody:"This week you logged {hours}h across {active} active projects with {pipeline} in pipeline. {action}",
autopilot:"Autopilot",autoReminders:"Auto-reminders",autoOn:"ON",autoOff:"OFF",
riskRadar:"Risk Radar",temperature:"Temperature",hot:"Hot",warm:"Warm",cold:"Cold",frozen:"Frozen",
tempExplain:"Based on contact frequency, active projects, and invoice status",
factorContacts:"Contact activity",factorInvoices:"Invoice health",factorProjects:"Project activity",
factorRevenue:"Revenue level",factorWorkload:"Workload balance",
boosts:"Boosts",drags:"Drags",neutral:"Neutral",
showInsights:"Insights",showForecast:"Forecast",showHealth:"Health Score",showWeekHours:"Week hours",
showPipeline:"Pipeline",showWon:"Won",showAwaiting:"Awaiting payment",
showToDo:"To do",showRecentInv:"Recent invoices",showActiveProj:"Active projects",showDigest:"Weekly Digest",
scanInvoice:"Scan invoice",scanTitle:"Scan an invoice",scanDesc:"Take a photo or upload an image of the invoice. AI will extract client, amount, and dates automatically.",scanning:"Analyzing invoice…",scanSuccess:"Invoice parsed!",scanUpload:"Upload image",scanCamera:"Take photo",extractedData:"Extracted data",confirm:"Confirm",scanError:"Could not parse invoice. Please try again.",
heyArvo:"Arvo — your AI CFO",heyArvoSub:"Sees the cash crunch before you do. And writes the reminders for you.",heyArvoPlaceholder:"E.g. 'Worked 3h on design for Karlsson'…",heyArvoListening:"Listening…",heyArvoThinking:"Thinking…",heyArvoTapMic:"Tap the mic and tell me",heyArvoWelcome:"Hi! I'm Arvo — your AI CFO. Upload your invoices and I'll show you exactly where your cash stands and what you need to do right now.",heyArvoTimeLogged:"Time entry saved",heyArvoContactCreated:"New contact created",heyArvoInvoiceCreated:"Invoice draft created",heyArvoExpenseLogged:"Expense logged",heyArvoProjectUpdated:"Project updated",heyArvoNoMic:"Your browser doesn't support voice input",heyArvoCantParse:"I didn't quite understand. Could you rephrase?",
cfoCashflow:"Cash Flow",cfoBalance:"Balance today",cfoProjected:"Projected balance",cfoVatDue:"VAT due",cfoIncoming:"Expected incoming",cfoOutgoing:"Estimated outgoing",cfoDaysUntil:"days left",cfoWarning:"Liquidity warning",cfoAction:"Suggested actions",cfoSendReminder:"Send reminder",cfoOfferDiscount:"Offer early-pay discount",cfoSkip:"Skip",cfoApprove:"Approve",cfoSent:"Sent!",cfoReminderSent:"Reminder sent to",cfoDiscountOffered:"Discount offer sent to",cfoMonitoring:"I'll monitor and notify you when they pay.",cfoCrisisNone:"All clear! No liquidity issues ahead.",cfoHeadsUp:"Heads up",cfoBasedOn:"Based on your average costs",cfoNeed:"you'll need",cfoBy:"by",cfoYouHave:"You have",cfoUnpaid:"unpaid invoices totaling",cfoSuggest:"Want me to:",
tabChat:"Chat",tabAnalysis:"Analysis",tabImpact:"Impact",tabTrust:"Autonomy",
cmTitle:"Is your cash running out?",cmSub:"Drop your invoice export. I'll show you in 5 seconds if you'll make rent, payroll, or tax deadlines.",cmGdpr:"Your data is analyzed directly in your browser and never leaves your device. Nothing is stored on a server.",cmDrop:"Drop your CSV file here",cmOr:"or",cmChoose:"Choose file from computer",cmDemo:"Try with sample data",cmFormat:"CSV export from QuickBooks, Xero, FreshBooks etc. Columns: customer, amount, date, status",cmAnalyzing:"Arvo is analyzing your data…",cmAnalyzingStep1:"Reading invoices",cmAnalyzingStep2:"Finding patterns",cmAnalyzingStep3:"Calculating risks",cmAnalyzingStep4:"Drafting actions",
cmResultsTitle:"Your liquidity analysis",cmResultsSub:"Based on {n} invoices from {clients} customers",cmSummary:"Summary",cmOutstanding:"Outstanding",cmOverdue:"Overdue",cmAvgDso:"Avg. DSO",cmDays:"days",cmRisk:"Risks I found",cmRiskNone:"No major risks right now — well done!",
cmCounter:"This could have been avoided",cmCounterBody:"If my reminders had been active, you would have had {amount} on your account {days} days earlier. Enough to cover the next VAT payment.",
cmActions:"What I suggest you do now",cmActionReminder:"Send reminder",cmActionEarly:"Offer early-pay discount",cmActionFollowup:"Follow up",cmActFake:"Yes, act",cmActDone:"Done",
cmDraftTitle:"Message is ready",cmDraftSub:"Copy and send to your customer — or wait for auto-send in next version",cmCopy:"Copy message",cmCopied:"Copied to clipboard!",cmBetaNote:"Arvo is in beta. Auto-send via SMS/email is coming in Arvo Pro.",cmWantAuto:"I want auto-send",cmCloseDraft:"Close",
cmPriceTitle:"Want this as a service?",cmPriceBody:"Arvo Pro will include continuous liquidity analysis and auto-send via API. Your vote helps us prioritize.",cmPriceQ:"Would you pay $49/month?",cmPriceYes:"Yes — notify me when it launches",cmPriceMaybe:"Maybe — depends",cmPriceNo:"Not interested right now",cmPriceThanks:"Thanks! We'll reach out when Arvo Pro launches.",
cmReset:"Run new analysis",cmErrorParse:"Could not read the file. Make sure it's a CSV with columns for customer, amount and status.",cmRiskLate:"{client} systematically pays late ({n} late invoices)",cmRiskBig:"{client} has a large outstanding invoice of {amount}",cmRiskGap:"Liquidity gap detected: {amount} in overdue invoices vs. next month",cmRiskCrunch:"Cash crunch in {n} weeks unless something changes — you need to collect faster",cmRiskConcentration:"{pct}% of your revenue comes from {client}. High concentration risk — diversify.",
cmVelocityTitle:"How your clients pay",cmVelocitySub:"Reliability based on history + delay",cmVelocityCol:"Client",cmVelocityVol:"Volume",cmVelocityRel:"Reliability",cmVelocityLate:"days late",cmVelocityGood:"Reliable",cmVelocityOk:"Okay",cmVelocityBad:"Risk",cmVelocityInv:"invoices",
cmRunwayTitle:"Cash runway — 8 weeks ahead",cmRunwaySub:"Based on probability-weighted inflows + your average burn",cmRunwaySafe:"Runway holds — well done!",cmRunwayCrunch:"Warning: cash crunch at week {n}",cmRunwayWeek:"W",cmRunwayStart:"Now",cmRunwayBalance:"Balance",cmRunwayVat:"Tax",cmRunwayIn:"In",cmRunwayOut:"Out",
cmTonePrio1:"Urgent",cmTonePrio2:"Important",cmTonePrio3:"Bonus",
onbTitle:"60 seconds to clarity",onbSub:"Here's how Arvo — your AI CFO — works",onbStep1:"Upload your invoice export",onbStep1Desc:"CSV from QuickBooks, Xero, FreshBooks — or try with sample data",onbStep2:"Arvo analyzes in 5 seconds",onbStep2Desc:"Per-client reliability, 8-week cash projection, urgent risks",onbStep3:"Act — I write the messages for you",onbStep3Desc:"Ready-to-send reminders and early-pay offers, copy & paste",onbCTA:"Try with sample data",onbSkip:"I have my own file",onbDontShow:"Don't show again",
impactTitle:"Arvo's Impact",impactSub:"How much value I've created for you",impactThisMonth:"This month",impactCapital:"Capital collected faster",impactDaysSaved:"days shorter payment cycle",impactTime:"hours saved",impactReminders:"reminders sent",impactVsBase:"vs. your normal payment cycle",impactWins:"Recent wins",impactWinReminder:"Reminder drove in",impactWinEarly:"Invoiced early",impactDaysFaster:"days faster",impactWeekRecap:"Weekly recap",impactRecapBody:"Last week I collected {amount} {days} days earlier than your normal cycle, and saved you {hours}h of admin.",impactSeeMore:"See all my wins",impactEmpty:"Haven't built value yet — coming soon!",impactROI:"ROI this month",impactROIBody:"For every dollar you pay me I deliver",
trustTitle:"Trust Ladder",trustSub:"Choose how autonomously I can act",trustLevel1:"Always ask",trustLevel1Desc:"I prepare everything and you approve every action. Maximum control.",trustLevel2:"Auto-small",trustLevel2Desc:"Invoices under $1,000 to recurring customers are sent automatically. You get a notice.",trustLevel3:"Autopilot",trustLevel3Desc:"I handle all reminders myself, you can always undo. For when you trust me fully.",trustCurrent:"Current level",trustUnlockAt:"Unlock after {n} approved actions",trustActive:"Active",trustAutoSent:"Auto-sent",trustUndo:"Undo",trustAutoNote:"I just sent this automatically based on your level",
},
};

const CURRENCIES = { SEK:{symbol:"kr",rate:1,suffix:true},USD:{symbol:"$",rate:0.091,suffix:false},EUR:{symbol:"€",rate:0.084,suffix:false},GBP:{symbol:"£",rate:0.072,suffix:false} };
const THEMES = {
light:{name:"Ljus",nameEn:"Light",bg:"#f7f8fa",surface:"#ffffff",surfaceAlt:"#f0f2f5",border:"#e9ecf0",borderAccent:"#2a6d5e",text:"#1a1d23",textSub:"#4a5060",textMuted:"#7a8090",textFaint:"#a0a8b4",accent:"#2a6d5e",accentDark:"#1e5446",accentLight:"#e6f0ed",accentGrad:"linear-gradient(135deg,#2a6d5e 0%,#1e5446 100%)",danger:"#c0392b",dangerLight:"#fdf0ee",success:"#27855a",successLight:"#edf7f1",warn:"#d4940a",warnLight:"#fdf6e6",cardBg:"#ffffff",cardBorder:"#e9ecf0",avatarBg:"#e0ede9",avatarText:"#2a6d5e",inputBg:"#f4f5f7",tagBg:"#eef0f3",shadow:"0 1px 3px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.03)"},
dark:{name:"Mörk",nameEn:"Dark",bg:"#0f1012",surface:"#18191c",surfaceAlt:"#1f2024",border:"#2a2b30",borderAccent:"#4a9a88",text:"#e8e9ed",textSub:"#a0a4b0",textMuted:"#6a6e7a",textFaint:"#44464e",accent:"#4a9a88",accentDark:"#3a7d6e",accentLight:"rgba(74,154,136,0.10)",accentGrad:"linear-gradient(135deg,#4a9a88 0%,#3a7d6e 100%)",danger:"#e05545",dangerLight:"rgba(224,85,69,0.10)",success:"#4aaa6a",successLight:"rgba(74,170,106,0.10)",warn:"#d4a030",warnLight:"rgba(212,160,48,0.10)",cardBg:"#18191c",cardBorder:"#2a2b30",avatarBg:"rgba(74,154,136,0.12)",avatarText:"#4a9a88",inputBg:"#131416",tagBg:"#222328",shadow:"0 1px 3px rgba(0,0,0,0.2),0 4px 12px rgba(0,0,0,0.15)"},
nordic:{name:"Nordic",nameEn:"Nordic",bg:"#141a26",surface:"#1a2236",surfaceAlt:"#1f2840",border:"#283450",borderAccent:"#5a9ec8",text:"#dce4f0",textSub:"#98a8c0",textMuted:"#6880a0",textFaint:"#3e5070",accent:"#5a9ec8",accentDark:"#4888b0",accentLight:"rgba(90,158,200,0.10)",accentGrad:"linear-gradient(135deg,#5a9ec8 0%,#4888b0 100%)",danger:"#d06060",dangerLight:"rgba(208,96,96,0.10)",success:"#50b080",successLight:"rgba(80,176,128,0.10)",warn:"#d0a040",warnLight:"rgba(208,160,64,0.10)",cardBg:"#1a2236",cardBorder:"#283450",avatarBg:"rgba(90,158,200,0.12)",avatarText:"#5a9ec8",inputBg:"#131824",tagBg:"#202a42",shadow:"0 1px 3px rgba(0,0,0,0.2),0 4px 12px rgba(0,0,0,0.15)"},
moss:{name:"Moss",nameEn:"Moss",bg:"#141a14",surface:"#1a221a",surfaceAlt:"#1f281f",border:"#283028",borderAccent:"#6aaa60",text:"#d8e0d4",textSub:"#98a890",textMuted:"#688060",textFaint:"#3e5038",accent:"#6aaa60",accentDark:"#589050",accentLight:"rgba(106,170,96,0.10)",accentGrad:"linear-gradient(135deg,#6aaa60 0%,#589050 100%)",danger:"#c85050",dangerLight:"rgba(200,80,80,0.10)",success:"#5aaa60",successLight:"rgba(90,170,96,0.10)",warn:"#c8a040",warnLight:"rgba(200,160,64,0.10)",cardBg:"#1a221a",cardBorder:"#283028",avatarBg:"rgba(106,170,96,0.12)",avatarText:"#6aaa60",inputBg:"#121812",tagBg:"#222c22",shadow:"0 1px 3px rgba(0,0,0,0.2),0 4px 12px rgba(0,0,0,0.15)"},
};
const TDOTS = {light:"#3a7d6e",dark:"#888888",nordic:"#5a9ec8",moss:"#6aaa60"};

const INIT_CONTACTS = [
{id:1,name:"Erik Johansson",company:"Johansson Konsult",email:"erik@johansson.se",phone:"070-123 45 67",status:"Kund",value:85000,daysSince:44,notes:"Ongoing advisory"},
{id:2,name:"Emma Karlsson",company:"Karlsson Foto",email:"emma@karlssonfoto.se",phone:"073-987 65 43",status:"Lead",value:45000,daysSince:28,notes:"Interested in website"},
{id:3,name:"Marcus Lindberg",company:"Lindberg Reklam",email:"marcus@lindbergreklam.se",phone:"076-555 12 34",status:"Kund",value:120000,daysSince:25,notes:"Key client, monthly retainer"},
{id:4,name:"Sofia Ekström",company:"Ekström Design",email:"sofia@ekstromdesign.se",phone:"070-444 33 22",status:"Prospekt",value:35000,daysSince:12,notes:"First meeting booked w14"},
{id:5,name:"Johan Åberg",company:"Åberg & Partners",email:"johan@abergpartners.se",phone:"072-111 22 33",status:"Kund",value:210000,daysSince:3,notes:"VIP — strategic partnership"},
{id:6,name:"Lisa Holm",company:"Holm Media",email:"lisa@holmmedia.se",phone:"070-222 44 55",status:"Lead",value:60000,daysSince:18,notes:"Wants quote on SoMe package"},
];
const INIT_PROJECTS = [
{id:1,name:"Website Redesign",client:"Johansson Konsult",status:"Pågående",progress:65,deadline:"2026-04-15",budget:85000,spent:52000,tasks:[{t:"Wireframes",done:true},{t:"Design",done:true},{t:"Development",done:false},{t:"Testing",done:false},{t:"Launch",done:false}]},
{id:2,name:"Brand Strategy",client:"Lindberg Reklam",status:"Pågående",progress:40,deadline:"2026-05-01",budget:120000,spent:42000,tasks:[{t:"Research",done:true},{t:"Positioning",done:true},{t:"Visual identity",done:false},{t:"Brand book",done:false}]},
{id:3,name:"SoMe Campaign Q2",client:"Karlsson Foto",status:"Planering",progress:10,deadline:"2026-04-20",budget:45000,spent:4500,tasks:[{t:"Strategy",done:true},{t:"Content plan",done:false},{t:"Production",done:false},{t:"Publishing",done:false}]},
{id:4,name:"Annual Report 2025",client:"Åberg & Partners",status:"Avslutad",progress:100,deadline:"2026-03-01",budget:35000,spent:33000,tasks:[{t:"Layout",done:true},{t:"Content",done:true},{t:"Print",done:true}]},
];
const INIT_INVOICES = [
{id:"F2026-001",client:"Johansson Konsult",amount:25000,status:"Betald",due:"2026-03-01"},
{id:"F2026-002",client:"Lindberg Reklam",amount:42000,status:"Skickad",due:"2026-04-10"},
{id:"F2026-003",client:"Åberg & Partners",amount:33000,status:"Betald",due:"2026-03-31"},
{id:"F2026-004",client:"Karlsson Foto",amount:15000,status:"Förfallen",due:"2026-03-10"},
{id:"F2026-005",client:"Johansson Konsult",amount:30000,status:"Skickad",due:"2026-04-20"},
{id:"F2026-006",client:"Ekström Design",amount:12000,status:"Utkast",due:"2026-04-24"},
{id:"F2026-007",client:"Holm Media",amount:18000,status:"Skickad",due:"2026-04-22"},
];
const INIT_TIME_ENTRIES = [
{id:1,project:"Website Redesign",task:"Frontend dev",date:"2026-03-26",hours:5.0},
{id:2,project:"Brand Strategy",task:"Client workshop",date:"2026-03-26",hours:2.5},
{id:3,project:"Website Redesign",task:"Responsive CSS",date:"2026-03-25",hours:6.0},
{id:4,project:"SoMe Campaign Q2",task:"Content plan",date:"2026-03-25",hours:3.0},
{id:5,project:"Brand Strategy",task:"Moodboard",date:"2026-03-24",hours:4.0},
{id:6,project:"Website Redesign",task:"API integration",date:"2026-03-24",hours:5.5},
{id:7,project:"SoMe Campaign Q2",task:"Briefing",date:"2026-03-23",hours:1.5},
{id:8,project:"Brand Strategy",task:"Competitor analysis",date:"2026-03-23",hours:3.0},
];

const ArvoLogo = ({size=24}) => (
<svg width={size} height={size} viewBox="0 0 100 100" fill="none">
<defs><linearGradient id="aG" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#4fb8a6"/><stop offset="100%" stopColor="#2a5f54"/></linearGradient></defs>
<path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#aG)"/>
</svg>
);

export default function ArvoOS() {
const [lang,setLang]=useState("en");
const [theme,setTheme]=useState("light");
const [currency,setCurrency]=useState("USD");
const [view,setView]=useState("heyarvo");
const [sideOpen,setSideOpen]=useState(false);
const [detail,setDetail]=useState(null);
const [modal,setModal]=useState(null);
const [cFilter,setCFilter]=useState("all");
const [iFilter,setIFilter]=useState("all");
const [search,setSearch]=useState("");
const [timerOn,setTimerOn]=useState(false);
const [timerSec,setTimerSec]=useState(0);
const [timerProj,setTimerProj]=useState("Website Redesign");
const [timerTask,setTimerTask]=useState("");
const [healthOpen,setHealthOpen]=useState(false);
const [autoReminders,setAutoReminders]=useState(true);
const [arvoTrust,setArvoTrust]=useState(1); // 1=ask all, 2=auto-small, 3=autopilot
const [arvoTab,setArvoTab]=useState("analysis"); // analysis|chat|impact|trust
const [approvedCount,setApprovedCount]=useState(0);
const [recapDismissed,setRecapDismissed]=useState(false);
const [conciergeStep,setConciergeStep]=useState("idle"); // idle|analyzing|results
const [conciergeAnalysis,setConciergeAnalysis]=useState(null);
const [conciergeActingOn,setConciergeActingOn]=useState(null);
const [priceModalOpen,setPriceModalOpen]=useState(false);
const [priceVote,setPriceVote]=useState(null);
const [actionClickCount,setActionClickCount]=useState(0);
const [copiedFlash,setCopiedFlash]=useState(false);
const [conciergeError,setConciergeError]=useState(null);
const [showOnboarding,setShowOnboarding]=useState(()=>{try{return !localStorage.getItem("arvo_onb_done")}catch(e){return true}});
const [dash,setDash]=useState({pipeline:true,won:true,awaiting:true,weekHours:true,toDo:true,recentInv:true,activeProj:true,insights:true,forecast:true,health:true,digest:true});
const [scanState,setScanState]=useState("idle");
const [scanResult,setScanResult]=useState(null);
const [scanPreview,setScanPreview]=useState(null);
const [contacts,setContacts]=useState(INIT_CONTACTS);
const [projects,setProjects]=useState(INIT_PROJECTS);
const [invoices,setInvoices]=useState(INIT_INVOICES);
const [timeEntries,setTimeEntries]=useState(INIT_TIME_ENTRIES);
const [formData,setFormData]=useState({});
const [chatMsgs,setChatMsgs]=useState([]);
const [chatInput,setChatInput]=useState("");
const [isListening,setIsListening]=useState(false);
const [arvoThinking,setArvoThinking]=useState(false);
const tRef=useRef(null);
const fileRef=useRef(null);
const chatEndRef=useRef(null);
const recognitionRef=useRef(null);
const T=THEMES[theme], L=LANG[lang], CU=CURRENCIES[currency];
const serif="'Playfair Display',Georgia,serif";
const switchLang=l=>{setLang(l);setCurrency(l==="sv"?"SEK":"USD")};

useEffect(()=>{if(timerOn){tRef.current=setInterval(()=>setTimerSec(s=>s+1),1000)}else clearInterval(tRef.current);return()=>clearInterval(tRef.current)},[timerOn]);
useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"})},[chatMsgs,arvoThinking]);

const fmtT=s=>`${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const ini=n=>n.split(" ").map(w=>w[0]).join("");
const go=v=>{setView(v);setDetail(null);setSideOpen(false);setSearch("")};
const fmtMoney=sek=>{const v=Math.round(sek*CU.rate);const f=new Intl.NumberFormat(lang==="sv"?"sv-SE":"en-US").format(v);return CU.suffix?`${f} ${CU.symbol}`:`${CU.symbol}${f}`};
const sLabel=s=>{if(lang==="sv")return s;return{Kund:"Customer",Lead:"Lead",Prospekt:"Prospect","Pågående":"Ongoing",Planering:"Planning",Avslutad:"Completed",Betald:"Paid",Skickad:"Sent","Förfallen":"Overdue",Utkast:"Draft"}[s]||s};

const card={background:T.cardBg,border:`1px solid ${T.cardBorder}`,borderRadius:16,padding:20,marginBottom:16,boxShadow:T.shadow,transition:"box-shadow 0.2s"};
const sCard={...card,padding:"20px 18px"};
const hd={fontFamily:serif,fontWeight:800,fontSize:28,color:T.text,lineHeight:1.15,letterSpacing:"-0.03em"};
const subS={fontSize:14,color:T.textMuted,lineHeight:1.6,marginTop:8,marginBottom:24};
const secS={fontFamily:serif,fontWeight:700,fontSize:14,color:T.accent,marginBottom:14,textTransform:"uppercase",letterSpacing:"0.04em"};
const badgeS=(co,bgc)=>({display:"inline-block",padding:"4px 12px",borderRadius:100,fontSize:11,fontWeight:600,color:co,background:bgc,letterSpacing:"0.01em"});
const avS=(sz=40)=>({width:sz,height:sz,borderRadius:"50%",background:T.avatarBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*0.34,fontWeight:700,color:T.avatarText,flexShrink:0,letterSpacing:"0.02em"});
const ipS={width:"100%",padding:"12px 16px",background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:12,color:T.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",transition:"border-color 0.2s"};
const bP={padding:"12px 24px",background:T.accentGrad,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit",boxShadow:"0 2px 8px rgba(42,109,94,0.18)",transition:"transform 0.15s,box-shadow 0.15s"};
const bO={padding:"12px 24px",background:"transparent",color:T.textSub,border:`1px solid ${T.border}`,borderRadius:12,fontSize:14,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit",transition:"border-color 0.2s"};
const bSP={...bP,padding:"9px 18px",fontSize:13,boxShadow:"0 2px 6px rgba(42,109,94,0.15)"};
const bSO={...bO,padding:"9px 18px",fontSize:13};
const lr={padding:"15px 18px",cursor:"pointer",transition:"background 0.15s"};
const fB=a=>({padding:"7px 16px",borderRadius:100,fontSize:12,fontWeight:a?600:500,border:a?"none":`1px solid ${T.border}`,background:a?T.accent:"transparent",color:a?"#fff":T.textMuted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"});
const progBar={height:6,borderRadius:4,background:T.surfaceAlt,overflow:"hidden"};
const progFill=(pct,clr)=>({height:"100%",width:`${pct}%`,background:clr||T.accentGrad,borderRadius:4,transition:"width 0.5s"});

const sC=s=>({Kund:[T.success,T.successLight],Lead:[T.accent,T.accentLight],Prospekt:[T.warn,T.warnLight],"Pågående":[T.accent,T.accentLight],Planering:[T.warn,T.warnLight],Avslutad:[T.success,T.successLight],Betald:[T.success,T.successLight],Skickad:[T.accent,T.accentLight],"Förfallen":[T.danger,T.dangerLight],Utkast:[T.textMuted,T.tagBg]}[s]||[T.textMuted,T.tagBg]);
const Badge=({status})=>{const[c,b]=sC(status);return <span style={badgeS(c,b)}>{sLabel(status)}</span>};

const getTemp=c=>{
const hasProject=projects.some(p=>p.client===c.company&&p.status!=="Avslutad");
if(c.daysSince<=7&&hasProject) return {level:"hot",color:T.success};
if(c.daysSince<=20||(hasProject&&c.daysSince<=30)) return {level:"warm",color:T.accent};
if(c.daysSince<=35) return {level:"cold",color:T.warn};
return {level:"frozen",color:T.danger};
};
const tempLabel=level=>({hot:L.hot,warm:L.warm,cold:L.cold,frozen:L.frozen}[level]);
const TempDot=({contact})=>{const t=getTemp(contact);return <div style={{width:8,height:8,borderRadius:"50%",background:t.color,flexShrink:0}} title={tempLabel(t.level)}/>};

const Ic=({name,size=20,color:co})=>{
const c=co||"currentColor";
const p={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:c,strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};
const d={
overview:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
contacts:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
projects:<><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
invoices:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
time:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
menu:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
check:<><polyline points="20 6 9 17 4 12"/></>,
search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
back:<><polyline points="15 18 9 12 15 6"/></>,
mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
phone:<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 2.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
play:<><polygon points="5 3 19 12 5 21 5 3"/></>,
pause:<><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
edit:<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
tag:<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
calendar:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
right:<><polyline points="9 18 15 12 9 6"/></>,
down:<><polyline points="6 9 12 15 18 9"/></>,
up:<><polyline points="18 15 12 9 6 15"/></>,
settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
mic:<><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
arvo:<><path d="M12 2L4 20h4l4-8 4 8h4L12 2z"/></>,
zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
trendUp:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
alert:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
thermometer:<><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></>,
shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
sparkles:<><path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17"/></>,
};
return <svg {...p}>{d[name]}</svg>;
};

const NAV=[{id:"heyarvo",icon:"arvo"},{id:"dashboard",icon:"overview"},{id:"invoices",icon:"invoices"},{id:"contacts",icon:"contacts"}];
const nL=id=>({dashboard:lang==="sv"?"Status":"Status",heyarvo:"Arvo",contacts:L.contacts,projects:L.projects,invoices:L.invoices,time:L.time}[id]);
const Flag=({code,active,onClick})=>(<button onClick={onClick} style={{width:28,height:20,borderRadius:4,border:active?`2px solid ${T.accent}`:`1.5px solid ${T.border}`,cursor:"pointer",overflow:"hidden",padding:0,background:T.surface,opacity:active?1:0.45}}>{code==="sv"?<svg viewBox="0 0 30 22" style={{display:"block",width:"100%",height:"100%"}}><rect width="30" height="22" fill="#005BAA"/><rect x="9" width="4" height="22" fill="#FECC00"/><rect y="9" width="30" height="4" fill="#FECC00"/></svg>:<svg viewBox="0 0 30 22" style={{display:"block",width:"100%",height:"100%"}}><rect width="30" height="22" fill="#012169"/><path d="M0,0 L30,22 M30,0 L0,22" stroke="#fff" strokeWidth="3.5"/><path d="M0,0 L30,22 M30,0 L0,22" stroke="#C8102E" strokeWidth="2"/><rect x="12" width="6" height="22" fill="#fff"/><rect y="8" width="30" height="6" fill="#fff"/><rect x="13" width="4" height="22" fill="#C8102E"/><rect y="9" width="30" height="4" fill="#C8102E"/></svg>}</button>);
const Toggle=({on,onToggle})=>(<button onClick={onToggle} style={{width:40,height:22,borderRadius:11,background:on?T.accent:T.border,border:"none",cursor:"pointer",position:"relative",flexShrink:0}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?21:3,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/></button>);

// SMART ENGINE
const computeHealth=()=>{
const factors=[];
let score=50;
const coldPct=contacts.filter(c=>c.daysSince>30).length/Math.max(contacts.length,1);
const contactScore=Math.round((1-coldPct)*25);
score+=(contactScore-12);
factors.push({label:L.factorContacts,value:contactScore,max:25,impact:coldPct<0.3?"boost":coldPct<0.5?"neutral":"drag"});
const odAmt=invoices.filter(i=>i.status==="Förfallen").reduce((s,i)=>s+i.amount,0);
const totAmt=invoices.reduce((s,i)=>s+i.amount,0);
const invScore=totAmt>0?Math.round((1-odAmt/totAmt)*20):20;
score+=(invScore-10);
factors.push({label:L.factorInvoices,value:invScore,max:20,impact:odAmt===0?"boost":"drag"});
const active=projects.filter(p=>p.status==="Pågående").length;
const projScore=Math.min(active*8,20);
score+=(projScore-8);
factors.push({label:L.factorProjects,value:projScore,max:20,impact:active>=2?"boost":active>=1?"neutral":"drag"});
const wonRev=invoices.filter(i=>i.status==="Betald").reduce((s,i)=>s+i.amount,0);
const revScore=wonRev>50000?20:wonRev>20000?12:5;
score+=(revScore-10);
factors.push({label:L.factorRevenue,value:revScore,max:20,impact:wonRev>50000?"boost":"neutral"});
const wH=timeEntries.reduce((s,e)=>s+e.hours,0);
const wlScore=wH>=20&&wH<=40?15:wH>40?8:5;
score+=(wlScore-8);
factors.push({label:L.factorWorkload,value:wlScore,max:15,impact:wH>=20&&wH<=40?"boost":wH>40?"drag":"neutral"});
return {score:Math.max(0,Math.min(100,score)),factors};
};

const computeForecast=()=>{
const pipeLine=contacts.filter(c=>c.status==="Lead"||c.status==="Prospekt").reduce((s,c)=>s+c.value,0);
const wonAmt=invoices.filter(i=>i.status==="Betald").reduce((s,i)=>s+i.amount,0);
const wonCount=invoices.filter(i=>i.status==="Betald").length;
const allCount=invoices.length;
const winRate=allCount>0?Math.round((wonCount/allCount)*100):0;
const avgDeal=wonCount>0?Math.round(wonAmt/wonCount):0;
const expected=Math.round(pipeLine*(winRate/100));
const bestCase=Math.round(pipeLine*0.85);
const worstCase=Math.round(pipeLine*(winRate/100)*0.5);
return {pipeLine,wonAmt,winRate,avgDeal,expected,bestCase,worstCase};
};

const computeInsights=()=>{
const ins=[];
const cold=contacts.filter(c=>c.daysSince>25);
if(cold.length>0){const v=cold.reduce((s,c)=>s+c.value,0);ins.push({type:"warning",icon:"alert",title:lang==="sv"?`${cold.length} kontakter har blivit kalla`:`${cold.length} contacts going cold`,body:lang==="sv"?`${fmtMoney(v)} i pipeline riskerar att kallna.`:`${fmtMoney(v)} in pipeline at risk.`,action:()=>{setView("contacts");setCFilter("all")},actionLabel:L.sendFollowUp})}
const od=invoices.filter(i=>i.status==="Förfallen");
if(od.length>0){const t=od.reduce((s,i)=>s+i.amount,0);ins.push({type:"danger",icon:"alert",title:lang==="sv"?`${fmtMoney(t)} förfallet`:`${fmtMoney(t)} overdue`,body:lang==="sv"?`${od.length} faktura har passerat förfallodatum.`:`${od.length} invoice(s) past due.`,action:()=>{setView("invoices");setIFilter("Förfallen")},actionLabel:L.viewInvoice})}
projects.filter(p=>p.status==="Pågående"&&(p.spent/p.budget)>0.8).forEach(p=>{const pct=Math.round((p.spent/p.budget)*100);ins.push({type:pct>95?"danger":"warning",icon:"trendUp",title:`${p.name} — ${pct}% ${lang==="sv"?"av budget":"of budget"}`,body:lang==="sv"?`${fmtMoney(p.budget-p.spent)} kvar.`:`${fmtMoney(p.budget-p.spent)} remaining.`,action:()=>{setDetail({type:"project",data:p});setView("projects")},actionLabel:L.viewProject})});
return ins;
};

// ── CFO ENGINE: Cashflow Prediction & Proactive Actions ─────────────
const computeCashflow=()=>{
const paidAmt=invoices.filter(i=>i.status==="Betald").reduce((s,i)=>s+i.amount,0);
const pendingInv=invoices.filter(i=>i.status==="Skickad");
const overdueInv=invoices.filter(i=>i.status==="Förfallen");

const pendingAmt=pendingInv.reduce((s,i)=>s+i.amount,0);
const overdueAmt=overdueInv.reduce((s,i)=>s+i.amount,0);
// Simulate monthly costs based on revenue pattern (30% of won revenue)
const avgMonthlyCost=Math.round(paidAmt*0.35);
// Current "balance" = paid - estimated costs so far
const currentBalance=Math.round(paidAmt*0.65);
// VAT liability (25% of revenue, due quarterly)
const vatDue=Math.round(paidAmt*0.25);
const vatDeadline="2026-04-12";
const daysToVat=Math.max(0,Math.round((new Date(vatDeadline)-new Date())/(1000*60*60*24)));
// Project 30-day cashflow
const expectedIn=Math.round(pendingAmt*0.7+overdueAmt*0.4);
const projectedBalance=currentBalance+expectedIn-avgMonthlyCost;
const shortfall=vatDue>projectedBalance?vatDue-projectedBalance:0;
// Build action suggestions
const actions=[];
overdueInv.forEach(inv=>{
actions.push({id:`remind_${inv.id}`,type:"reminder",client:inv.client,amount:inv.amount,invId:inv.id,
label:lang==="sv"?`${L.cfoSendReminder} till ${inv.client} (${fmtMoney(inv.amount)}, förfallen)`:`${L.cfoSendReminder} to ${inv.client} (${fmtMoney(inv.amount)}, overdue)`,
done:false});
});
pendingInv.filter(i=>i.amount>=20000).forEach(inv=>{
actions.push({id:`discount_${inv.id}`,type:"discount",client:inv.client,amount:inv.amount,invId:inv.id,discount:3,
label:lang==="sv"?`${L.cfoOfferDiscount} 3% till ${inv.client} vid betalning inom 48h (${fmtMoney(inv.amount)})`:`${L.cfoOfferDiscount} 3% to ${inv.client} for payment within 48h (${fmtMoney(inv.amount)})`,
done:false});
});
return {currentBalance,projectedBalance,vatDue,vatDeadline,daysToVat,expectedIn,avgMonthlyCost,shortfall,overdueAmt,pendingAmt,actions,overdueCount:overdueInv.length,pendingCount:pendingInv.length};
};

// ── ARVO IMPACT — counterfactual ROI engine ──
const computeImpact=()=>{
  const paid=invoices.filter(i=>i.status==="Betald");
  const pending=invoices.filter(i=>i.status==="Skickad"||i.status==="Förfallen");
  // Baseline: without Arvo, industry avg for solo consultants is 18 days DSO
  // With Arvo (simulated): reduced to 11 days via proactive reminders + early invoicing
  const baselineDSO=18;
  const arvoDSO=11;
  const daysSaved=paid.length*(baselineDSO-arvoDSO);
  // Capital velocity improvement = paid amount * (daysSaved/30) * opportunity cost factor
  // This represents money that was in user's account earlier than it would otherwise be
  const paidAmt=paid.reduce((s,i)=>s+i.amount,0);
  const capitalRescued=Math.round(paidAmt*0.12);
  // Time saved: 8 min per reminder + 4 min per status check
  const remindersSent=Math.max(2,Math.floor(paid.length*0.7));
  const timeSavedMin=remindersSent*8+paid.length*4;
  const timeSavedHours=Math.round(timeSavedMin/60*10)/10;
  // Recent wins (top paid invoices, attributed to Arvo action)
  const wins=paid.slice(-4).reverse().map((inv,i)=>({
    id:inv.id,
    client:inv.client,
    amount:inv.amount,
    daysSaved:6+(i%3)*2,
    action:i%2===0?"reminder":"early"
  }));
  // Monthly subscription cost (for ROI calc)
  const subscriptionCost=299;
  const roi=Math.round(capitalRescued/subscriptionCost);
  // Pending capital that Arvo can accelerate
  const pendingAmt=pending.reduce((s,i)=>s+i.amount,0);
  const potentialRescue=Math.round(pendingAmt*0.08);
  return {daysSaved,capitalRescued,remindersSent,timeSavedHours,wins,roi,potentialRescue,hasData:paid.length>0};
};

// ── CONCIERGE MVP: CSV parser + analysis engine ──
const CONCIERGE_DEMO_CSV=`Kund;Faktura;Fakturadatum;Förfallodatum;Belopp;Status
Lindberg Reklam;INV-2026-042;2026-02-15;2026-03-17;42000;Förfallen
Karlsson AB;INV-2026-043;2026-02-20;2026-03-22;18500;Skickad
Öberg Studio;INV-2026-044;2026-02-28;2026-03-30;67500;Skickad
Nordlöf Consulting;INV-2026-041;2026-02-10;2026-03-12;28000;Betald
Lindberg Reklam;INV-2026-038;2026-01-05;2026-02-04;35000;Betald
Karlsson AB;INV-2026-037;2026-01-12;2026-02-11;12000;Betald
Öberg Studio;INV-2026-036;2025-12-20;2026-01-19;55000;Betald
Lindberg Reklam;INV-2026-035;2025-12-15;2026-01-14;48000;Betald
Svensson Byrå;INV-2026-040;2026-02-05;2026-03-07;15500;Förfallen
Berg & Co;INV-2026-039;2026-01-28;2026-02-27;22000;Förfallen
Nordlöf Consulting;INV-2026-034;2025-11-20;2025-12-20;31000;Betald
Karlsson AB;INV-2026-033;2025-11-05;2025-12-05;14500;Betald`;

const parseConciergeCsv=(text)=>{
  const lines=text.trim().split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2)throw new Error("empty");
  // Detect separator
  const sep=lines[0].includes(";")?";":",";
  const headers=lines[0].split(sep).map(h=>h.trim().toLowerCase());
  // Flexible column mapping (SV + EN)
  const colMap={
    client:headers.findIndex(h=>["kund","kundnamn","customer","client","namn","name"].includes(h)),
    invoice:headers.findIndex(h=>["faktura","fakturanummer","invoice","invoice number","nr","id"].includes(h)),
    issueDate:headers.findIndex(h=>["fakturadatum","datum","issue date","date","issued"].includes(h)),
    dueDate:headers.findIndex(h=>["förfallodatum","forfallodatum","due date","due","förfallo"].includes(h)),
    amount:headers.findIndex(h=>["belopp","summa","amount","total","value","sum"].includes(h)),
    status:headers.findIndex(h=>["status","tillstånd","state"].includes(h)),
  };
  if(colMap.client===-1||colMap.amount===-1)throw new Error("missing-cols");
  const rows=[];
  for(let i=1;i<lines.length;i++){
    const parts=lines[i].split(sep).map(p=>p.trim().replace(/^"|"$/g,""));
    if(parts.length<2)continue;
    const amountRaw=parts[colMap.amount]||"0";
    const amount=parseFloat(amountRaw.replace(/\s/g,"").replace(",","."))||0;
    const statusRaw=(parts[colMap.status]||"").toLowerCase();
    let status="sent";
    if(statusRaw.includes("betald")||statusRaw.includes("paid"))status="paid";
    else if(statusRaw.includes("förfall")||statusRaw.includes("forfall")||statusRaw.includes("overdue")||statusRaw.includes("late"))status="overdue";
    else if(statusRaw.includes("utkast")||statusRaw.includes("draft"))status="draft";
    rows.push({
      client:parts[colMap.client]||"Unknown",
      invoice:colMap.invoice>=0?parts[colMap.invoice]:`ROW-${i}`,
      issueDate:colMap.issueDate>=0?parts[colMap.issueDate]:"",
      dueDate:colMap.dueDate>=0?parts[colMap.dueDate]:"",
      amount,
      status,
    });
  }
  return rows;
};

const analyzeConciergeData=(rows)=>{
  const clients=[...new Set(rows.map(r=>r.client))];
  const outstanding=rows.filter(r=>r.status==="sent"||r.status==="overdue");
  const overdue=rows.filter(r=>r.status==="overdue");
  const paid=rows.filter(r=>r.status==="paid");
  const outstandingAmt=outstanding.reduce((s,r)=>s+r.amount,0);
  const overdueAmt=overdue.reduce((s,r)=>s+r.amount,0);
  const paidAmt=paid.reduce((s,r)=>s+r.amount,0);
  const totalAmt=rows.reduce((s,r)=>s+r.amount,0);
  // DSO baseline
  const avgDso=rows.length>0?Math.round(18+(overdue.length/rows.length)*14):22;

  // ── PER-CLIENT VELOCITY ──
  const clientStats={};
  rows.forEach(r=>{
    if(!clientStats[r.client])clientStats[r.client]={client:r.client,total:0,paid:0,overdue:0,outstanding:0,totalAmt:0,paidAmt:0,overdueAmt:0,outstandingAmt:0};
    const s=clientStats[r.client];
    s.total++;s.totalAmt+=r.amount;
    if(r.status==="paid"){s.paid++;s.paidAmt+=r.amount;}
    if(r.status==="overdue"){s.overdue++;s.overdueAmt+=r.amount;}
    if(r.status==="sent"||r.status==="overdue"){s.outstanding++;s.outstandingAmt+=r.amount;}
  });
  const clientVelocity=Object.values(clientStats).map(s=>{
    const hist=s.paid+s.overdue;
    let reliability=hist>0?Math.round((s.paid/hist)*100):65;
    if(s.overdue>0)reliability=Math.max(0,reliability-8*s.overdue);
    if(s.paid>=3&&s.overdue===0)reliability=Math.min(100,reliability+5);
    const avgDaysLate=s.overdue>0?Math.round(9+s.overdue*5):0;
    let tier="good";
    if(reliability<40)tier="bad";
    else if(reliability<75)tier="ok";
    const shareOfRev=totalAmt>0?Math.round((s.totalAmt/totalAmt)*100):0;
    return {...s,reliability,avgDaysLate,tier,shareOfRev};
  }).sort((a,b)=>b.totalAmt-a.totalAmt);

  // ── CASH RUNWAY (8-week projection) ──
  const estMonthlyBurn=Math.max(25000,Math.round(paidAmt*0.30));
  const weeklyBurn=Math.round(estMonthlyBurn/4.33);
  const startingBalance=Math.round(estMonthlyBurn*0.8);
  const expectedInflowTotal=Math.round(outstanding.reduce((s,r)=>{
    const cs=clientStats[r.client]||{paid:0,overdue:0};
    const hist=cs.paid+cs.overdue;
    const rel=hist>0?cs.paid/hist:0.7;
    const prob=r.status==="overdue"?Math.max(0.3,rel*0.55):Math.max(0.55,rel*0.88);
    return s+r.amount*prob;
  },0));
  const weeklyInflow=Math.round(expectedInflowTotal/8);
  const vatLiability=Math.round(paidAmt*0.25);
  const runway=[];
  let bal=startingBalance;
  for(let w=1;w<=8;w++){
    const vatHit=w===4?vatLiability:0;
    bal=bal+weeklyInflow-weeklyBurn-vatHit;
    runway.push({week:w,balance:Math.round(bal),inflow:weeklyInflow,outflow:weeklyBurn+vatHit,vat:vatHit});
  }
  const crunchWeek=runway.find(r=>r.balance<0);

  // ── RISKS (prioritized) ──
  const risks=[];
  if(crunchWeek){
    risks.push({type:"crunch",severity:"high",text:L.cmRiskCrunch.replace("{n}",crunchWeek.week)});
  }
  const biggestClient=clientVelocity[0];
  if(biggestClient&&biggestClient.shareOfRev>=40){
    risks.push({type:"concentration",severity:"medium",text:L.cmRiskConcentration.replace("{pct}",biggestClient.shareOfRev).replace("{client}",biggestClient.client)});
  }
  if(overdueAmt>0){
    risks.push({type:"gap",severity:"high",text:L.cmRiskGap.replace("{amount}",fmtMoney(overdueAmt))});
  }
  clientVelocity.filter(c=>c.reliability<50&&c.total>=2).slice(0,2).forEach(c=>{
    risks.push({type:"late",severity:"medium",text:L.cmRiskLate.replace("{client}",c.client).replace("{n}",c.overdue||c.total)});
  });
  const bigOut=outstanding.filter(r=>r.amount>=40000).sort((a,b)=>b.amount-a.amount);
  if(bigOut.length>0&&risks.length<4){
    const r=bigOut[0];
    risks.push({type:"big",severity:"medium",text:L.cmRiskBig.replace("{client}",r.client).replace("{amount}",fmtMoney(r.amount))});
  }

  // ── COUNTERFACTUAL ──
  const counterfactualAmount=Math.round(paidAmt*0.15);
  const counterfactualDays=9;

  // ── SMARTER ACTIONS with tone variants ──
  const makeReminderDraft=(r,tone)=>{
    if(lang==="sv"){
      if(tone==="firm")return `Hej ${r.client.split(/\s+/)[0]},\n\nJag måste tyvärr skicka en andra påminnelse om faktura ${r.invoice} på ${fmtMoney(r.amount)}. Den förföll för ett tag sedan och jag har inte hört något från dig.\n\nKan du betala senast inom 5 dagar? Annars blir jag tvungen att lägga på dröjsmålsränta enligt räntelagen.\n\nHör av dig om det är något som behöver redas ut — jag hjälper gärna till att lösa det.\n\nMed vänlig hälsning`;
      return `Hej ${r.client.split(/\s+/)[0]}!\n\nJag vill bara påminna dig om faktura ${r.invoice} på ${fmtMoney(r.amount)} som förföll för några dagar sedan. Du har säkert bara glömt — kan du kolla när det går?\n\nOm det är något som strular med fakturan, säg bara till så löser vi det tillsammans.\n\nTack så mycket!`;
    }
    if(tone==="firm")return `Hi ${r.client.split(/\s+/)[0]},\n\nI'm sending a second reminder about invoice ${r.invoice} for ${fmtMoney(r.amount)}. It was due some time ago and I haven't heard back from you.\n\nCould you please settle it within the next 5 days? Otherwise I'll have to apply late payment interest according to our terms.\n\nIf there's something that needs to be resolved, please reach out — I'm happy to help sort it.\n\nBest regards`;
    return `Hi ${r.client.split(/\s+/)[0]}!\n\nJust a quick reminder about invoice ${r.invoice} for ${fmtMoney(r.amount)} which was due a few days ago. You've probably just forgotten — could you check when you get a moment?\n\nIf there's anything off with the invoice, just let me know and we'll sort it out.\n\nThanks!`;
  };
  const makeDiscountDraft=(r)=>{
    if(lang==="sv")return `Hej ${r.client.split(/\s+/)[0]}!\n\nJag har en liten förfrågan: om du kan betala faktura ${r.invoice} (${fmtMoney(r.amount)}) inom 48 timmar ger jag dig 5% rabatt. Det skulle hjälpa mig med kassaflödet denna månad.\n\nTacksam om du kan höra av dig med ett kort svar!`;
    return `Hi ${r.client.split(/\s+/)[0]}!\n\nI have a small request: if you can pay invoice ${r.invoice} (${fmtMoney(r.amount)}) within 48 hours, I'll give you a 5% discount. It would really help my cashflow this month.\n\nGrateful if you could send me a quick reply!`;
  };

  const actions=[];
  const overdueSorted=overdue.map(r=>{
    const cs=clientStats[r.client];
    const chronic=cs.overdue>1||cs.paid===0;
    return {...r,chronic,tone:chronic?"firm":"soft"};
  }).sort((a,b)=>{
    if(a.chronic!==b.chronic)return a.chronic?-1:1;
    return b.amount-a.amount;
  });
  overdueSorted.forEach((r,i)=>{
    actions.push({
      id:`act-remind-${i}`,type:"reminder",tone:r.tone,priority:r.chronic?1:2,
      client:r.client,amount:r.amount,invoice:r.invoice,
      label:`${L.cmActionReminder}: ${r.client} (${fmtMoney(r.amount)})`,
      draft:makeReminderDraft(r,r.tone)
    });
  });
  outstanding.filter(r=>{
    const cs=clientStats[r.client];
    return r.amount>=30000&&r.status==="sent"&&cs.overdue===0;
  }).sort((a,b)=>b.amount-a.amount).slice(0,2).forEach((r,i)=>{
    actions.push({
      id:`act-disc-${i}`,type:"discount",tone:"warm",priority:3,
      client:r.client,amount:r.amount,invoice:r.invoice,
      label:`${L.cmActionEarly}: ${r.client} (${fmtMoney(r.amount)})`,
      draft:makeDiscountDraft(r)
    });
  });
  actions.sort((a,b)=>a.priority-b.priority);

  return {
    rows,totalRows:rows.length,clientCount:clients.length,
    outstandingAmt,overdueAmt,paidAmt,avgDso,
    risks,actions:actions.slice(0,5),
    counterfactualAmount,counterfactualDays,
    clientVelocity,runway,crunchWeek,
    startingBalance,expectedInflowTotal,weeklyBurn,vatLiability,
  };
};

const runConciergeAnalysis=(csvText)=>{
  setConciergeError(null);
  setConciergeStep("analyzing");
  try{
    const rows=parseConciergeCsv(csvText);
    if(rows.length===0)throw new Error("empty");
    // Fake 2.5s "AI thinking" delay
    setTimeout(()=>{
      const analysis=analyzeConciergeData(rows);
      setConciergeAnalysis(analysis);
      setConciergeStep("results");
    },2500);
  }catch(e){
    setConciergeStep("idle");
    setConciergeError(L.cmErrorParse);
  }
};

const handleConciergeFile=(file)=>{
  const reader=new FileReader();
  reader.onload=(e)=>runConciergeAnalysis(e.target.result);
  reader.onerror=()=>{setConciergeError(L.cmErrorParse);setConciergeStep("idle")};
  reader.readAsText(file);
};

const handleConciergeAction=(action)=>{
  setConciergeActingOn(action);
  setActionClickCount(c=>c+1);
  // Log to localStorage for future analytics
  try{
    const log=JSON.parse(localStorage.getItem("arvo_concierge_log")||"[]");
    log.push({ts:Date.now(),type:action.type,client:action.client,amount:action.amount});
    localStorage.setItem("arvo_concierge_log",JSON.stringify(log));
  }catch(e){}
};

const handleCopyDraft=(text)=>{
  try{
    navigator.clipboard.writeText(text);
    setCopiedFlash(true);
    setTimeout(()=>setCopiedFlash(false),2000);
  }catch(e){}
};

const handlePriceVote=(vote)=>{
  setPriceVote(vote);
  try{
    const votes=JSON.parse(localStorage.getItem("arvo_price_votes")||"[]");
    votes.push({ts:Date.now(),vote});
    localStorage.setItem("arvo_price_votes",JSON.stringify(votes));
  }catch(e){}
};

const resetConcierge=()=>{
  setConciergeStep("idle");
  setConciergeAnalysis(null);
  setConciergeActingOn(null);
  setConciergeError(null);
  setPriceVote(null);
  setActionClickCount(0);
};

const dismissOnboarding=(runDemo=false)=>{
  try{localStorage.setItem("arvo_onb_done","1")}catch(e){}
  setShowOnboarding(false);
  if(runDemo)runConciergeAnalysis(CONCIERGE_DEMO_CSV);
};

const generateCfoMessage=()=>{
const cf=computeCashflow();
const lines=[];
if(cf.shortfall>0){
lines.push(`${L.cfoHeadsUp} — ${L.cfoBasedOn}, ${L.cfoNeed} ${fmtMoney(cf.vatDue)} ${L.cfoBy} ${cf.vatDeadline} (${L.cfoCashflow}: ${L.cfoVatDue}).`);
lines.push("");
lines.push(`${L.cfoBalance}: ${fmtMoney(cf.currentBalance)}`);
lines.push(`${L.cfoProjected}: ${fmtMoney(cf.projectedBalance)}`);
lines.push(`${lang==="sv"?"Brist":"Shortfall"}: ${fmtMoney(cf.shortfall)}`);
if(cf.overdueCount>0||cf.pendingCount>0){
lines.push("");
lines.push(`${L.cfoYouHave} ${cf.overdueCount+cf.pendingCount} ${L.cfoUnpaid} ${fmtMoney(cf.overdueAmt+cf.pendingAmt)}.`);
}
if(cf.actions.length>0){
lines.push("");
lines.push(L.cfoSuggest);
}
}else{
lines.push(`${L.cfoCashflow}: ${L.cfoCrisisNone}`);
lines.push("");
lines.push(`${L.cfoBalance}: ${fmtMoney(cf.currentBalance)}`);
lines.push(`${L.cfoIncoming}: ${fmtMoney(cf.expectedIn)}`);
lines.push(`${L.cfoProjected}: ${fmtMoney(cf.projectedBalance)}`);
lines.push(`${L.cfoVatDue} (${cf.vatDeadline}): ${fmtMoney(cf.vatDue)} — ${cf.daysToVat} ${L.cfoDaysUntil}`);
}
return {text:lines.join("\n"),actions:cf.actions,cashflow:cf};
};

// DASHBOARD
const DashView=()=>{
const pipe=contacts.reduce((s,c)=>s+c.value,0);
const wonAmt=invoices.filter(i=>i.status==="Betald").reduce((s,i)=>s+i.amount,0);
const pendAmt=invoices.filter(i=>i.status==="Skickad"||i.status==="Förfallen").reduce((s,i)=>s+i.amount,0);
const wH=timeEntries.reduce((s,e)=>s+e.hours,0);
const odC=contacts.filter(c=>c.daysSince>20).sort((a,b)=>b.daysSince-a.daysSince);
const actP=projects.filter(p=>p.status!=="Avslutad");
const recInv=invoices.filter(i=>i.status!=="Betald").slice(0,4);
const ins=computeInsights();
const {score:hScore,factors}=computeHealth();
const fc=computeForecast();
const visStats=[
  dash.pipeline&&{label:L.pipeline,value:fmtMoney(pipe),color:T.accentDark,bc:T.borderAccent},
  dash.won&&{label:L.won,value:fmtMoney(wonAmt),color:T.accentDark,bc:T.borderAccent},
  dash.awaiting&&{label:L.awaitingPayment,value:fmtMoney(pendAmt),color:pendAmt>0?T.danger:T.accentDark,bc:pendAmt>0?T.danger:T.borderAccent},
  dash.weekHours&&{label:L.loggedWeek,value:`${wH}h`,color:T.accentDark,bc:T.borderAccent},
].filter(Boolean);

const impact=computeImpact();

return (
  <div>
    <h1 style={hd}>{L.dashTitle}</h1>
    <p style={{...subS,marginBottom:16}}>{L.dashSub}</p>

    {/* ── Weekly Arvo recap (Monday ritual) ── */}
    {!recapDismissed&&impact.hasData&&(<div style={{...card,padding:0,overflow:"hidden",marginBottom:20,border:`1px solid ${T.borderAccent}`}}>
      <div style={{padding:"16px 18px 14px",display:"flex",alignItems:"flex-start",gap:12}}>
        <div style={{width:36,height:36,borderRadius:10,background:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="sparkles" size={18} color={T.accent}/></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:4}}>
            <div style={{fontSize:11,color:T.accent,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{L.impactWeekRecap}</div>
            <button onClick={()=>setRecapDismissed(true)} style={{background:"none",border:"none",cursor:"pointer",padding:2,color:T.textFaint}}><Ic name="x" size={14}/></button>
          </div>
          <div style={{fontSize:13,color:T.text,lineHeight:1.55}}>
            {L.impactRecapBody.replace("{amount}",fmtMoney(impact.capitalRescued)).replace("{days}",impact.daysSaved).replace("{hours}",impact.timeSavedHours)}
          </div>
          <button onClick={()=>{go("heyarvo");setArvoTab("impact")}} style={{marginTop:10,padding:"7px 14px",background:T.accent,color:"#fff",border:"none",borderRadius:100,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:6}}>{L.impactSeeMore}<Ic name="right" size={12} color="#fff"/></button>
        </div>
      </div>
    </div>)}

    {/* ── Hero: Health + Score ── */}
    {dash.health&&(<div style={{...card,padding:0,overflow:"hidden",marginBottom:20}}>
      <div style={{background:T.accentGrad,padding:"20px 20px 16px",display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontFamily:serif,fontSize:22,fontWeight:800,color:"#fff"}}>{hScore}</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{L.healthLabel}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>{hScore>=75?(lang==="sv"?"Verksamheten mår bra!":"Business is healthy!"):(hScore>=50?(lang==="sv"?"Behöver uppmärksamhet":"Needs attention"):(lang==="sv"?"Kräver åtgärd nu":"Requires action now"))}</div>
        </div>
        <button style={{background:"none",border:"none",cursor:"pointer",padding:4}} onClick={()=>setHealthOpen(!healthOpen)}><Ic name={healthOpen?"up":"down"} size={18} color="rgba(255,255,255,0.7)"/></button>
      </div>
      {healthOpen&&(<div style={{padding:"16px 20px"}}>
        {factors.map((f,i)=>{
          const barColor=f.impact==="boost"?T.success:f.impact==="drag"?T.danger:T.warn;
          return (<div key={i} style={{marginBottom:i<factors.length-1?12:0}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
              <span style={{color:T.textSub}}>{f.label}</span>
              <span style={{color:barColor,fontWeight:600,fontSize:11}}>{f.value}/{f.max}</span>
            </div>
            <div style={progBar}><div style={progFill(Math.round((f.value/f.max)*100),barColor)}/></div>
          </div>)
        })}
      </div>)}
    </div>)}

    {/* ── Stats Grid ── */}
    {visStats.length>0&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
      {visStats.map((s,i)=>(<div key={i} style={{background:T.cardBg,borderRadius:14,padding:"16px 16px 14px",boxShadow:T.shadow,border:`1px solid ${T.cardBorder}`}}>
        <div style={{fontSize:11,color:T.textMuted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8}}>{s.label}</div>
        <div style={{fontFamily:serif,fontSize:28,fontWeight:400,color:s.color,letterSpacing:"-0.02em",lineHeight:1}}>{s.value}</div>
      </div>))}
    </div>)}

    {/* ── Alerts (insights + CFO) ── */}
    {dash.insights&&ins.length>0&&ins.map((insItem,i)=>{const iC=insItem.type==="danger"?T.danger:T.warn;return (<div key={i} style={{...card,borderLeft:`3.5px solid ${iC}`,padding:"14px 16px",marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:8,background:iC+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name={insItem.icon} size={14} color={iC}/></div>
        <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:T.text}}>{insItem.title}</div><div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{insItem.body}</div></div>
        <button style={{background:"none",border:"none",cursor:"pointer",padding:4}} onClick={insItem.action}><Ic name="right" size={16} color={T.textFaint}/></button>
      </div>
    </div>)})}
    {(()=>{const cf=computeCashflow();return cf.shortfall>0?(
    <div style={{...card,borderLeft:`3.5px solid ${T.warn}`,padding:"14px 16px",marginBottom:10,cursor:"pointer"}} onClick={()=>go("heyarvo")}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:8,background:T.warn+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="alert" size={14} color={T.warn}/></div>
        <div style={{flex:1}}>
          <div style={{fontWeight:600,fontSize:13,color:T.text}}>{L.cfoWarning}</div>
          <div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{lang==="sv"?`Brist ${fmtMoney(cf.shortfall)} — tryck för förslag`:`Gap ${fmtMoney(cf.shortfall)} — tap for suggestions`}</div>
        </div>
        <Ic name="right" size={16} color={T.textFaint}/>
      </div>
    </div>):null})()}

    {/* ── Forecast ── */}
    {dash.forecast&&(<div style={{marginTop:20}}>
      <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.forecastTitle}</div>
      <div style={{...card,padding:"18px 20px",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{L.expected}</div>
            <div style={{fontFamily:serif,fontSize:30,fontWeight:400,color:T.accentDark,letterSpacing:"-0.02em",lineHeight:1}}>{fmtMoney(fc.expected)}</div>
          </div>
          <div style={{fontSize:12,fontWeight:600,color:T.success,background:T.successLight,padding:"5px 10px",borderRadius:100}}>{fc.winRate}% {lang==="sv"?"win":"win"}</div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:6}}>
          <div style={{flex:fc.winRate,height:6,borderRadius:3,background:T.accent}}/>
          <div style={{flex:100-fc.winRate,height:6,borderRadius:3,background:T.surfaceAlt}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:T.textFaint}}>
          <span>{L.avgDeal} {fmtMoney(fc.avgDeal)}</span>
          <span>Pipeline {fmtMoney(fc.pipeLine)}</span>
        </div>
      </div>
    </div>)}

    {/* ── To-do contacts ── */}
    {dash.toDo&&odC.length>0&&(<div style={{marginTop:20}}>
      <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.toDo}</div>
      <div style={{...card,padding:0,overflow:"hidden",marginBottom:10}}>
        {odC.slice(0,3).map((c,i)=>(<div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<Math.min(odC.length,3)-1?`1px solid ${T.border}`:"none",cursor:"pointer"}} onClick={()=>{setDetail({type:"contact",data:c});setView("contacts")}}>
          <div style={avS(38)}>{ini(c.name)}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:14,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
            <div style={{fontSize:12,color:T.textMuted,marginTop:1}}>{c.daysSince} {L.daysSince}</div>
          </div>
          <Ic name="right" size={16} color={T.textFaint}/>
        </div>))}
      </div>
    </div>)}

    {/* ── Recent invoices ── */}
    {dash.recentInv&&recInv.length>0&&(<div style={{marginTop:20}}>
      <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.recentInvoices}</div>
      <div style={{...card,padding:0,overflow:"hidden",marginBottom:10}}>
        {recInv.slice(0,3).map((inv,i)=>(<div key={inv.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<Math.min(recInv.length,3)-1?`1px solid ${T.border}`:"none",cursor:"pointer"}} onClick={()=>go("invoices")}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
              <span style={{fontWeight:600,fontSize:14,color:T.text}}>{inv.id}</span>
              <Badge status={inv.status}/>
            </div>
            <div style={{fontSize:12,color:T.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.client}</div>
          </div>
          <div style={{fontFamily:serif,fontSize:16,fontWeight:500,color:T.text,letterSpacing:"-0.01em"}}>{fmtMoney(inv.amount)}</div>
        </div>))}
      </div>
    </div>)}

    {/* ── Active projects ── */}
    {dash.activeProj&&actP.length>0&&(<div style={{marginTop:20}}>
      <div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.activeProjects}</div>
      {actP.slice(0,3).map(p=>(<div key={p.id} style={{...card,padding:"16px 18px",marginBottom:10,cursor:"pointer"}} onClick={()=>{setDetail({type:"project",data:p});setView("projects")}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{flex:1,minWidth:0,marginRight:12}}>
            <div style={{fontWeight:600,fontSize:14,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
            <div style={{fontSize:12,color:T.textMuted,marginTop:1}}>{p.client}</div>
          </div>
          <div style={{fontFamily:serif,fontSize:18,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{p.progress}<span style={{fontSize:12,color:T.textFaint}}>%</span></div>
        </div>
        <div style={progBar}><div style={progFill(p.progress)}/></div>
      </div>))}
    </div>)}
  </div>
);
};

// CONTACTS VIEW
const ConView=()=>{
if(detail?.type==="contact"){const c=detail.data;const temp=getTemp(c);return (<div>
<button style={{...bSO,marginBottom:16}} onClick={()=>setDetail(null)}><Ic name="back" size={16}/> {L.back}</button>
<div style={{...card,textAlign:"center",paddingTop:28,paddingBottom:24}}>
<div style={{...avS(56),margin:"0 auto 12px",fontSize:20}}>{ini(c.name)}</div>
<div style={{fontSize:20,fontWeight:700,fontFamily:serif}}>{c.name}</div>
<div style={{fontSize:14,color:T.textSub,marginTop:2}}>{c.company}</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:10}}>
<Badge status={c.status}/>
<span style={{...badgeS(temp.color,temp.color+"20"),display:"inline-flex",alignItems:"center",gap:4}}>
<div style={{width:6,height:6,borderRadius:"50%",background:temp.color}}/>{tempLabel(temp.level)}
</span>
</div>
</div>
<div style={card}>
{[{icon:"mail",text:c.email},{icon:"phone",text:c.phone},{icon:"tag",text:`${L.value}: ${fmtMoney(c.value)}`},{icon:"calendar",text:`${c.daysSince} ${L.daysSinceContact}`}].map((it,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}><Ic name={it.icon} size={16} color={T.textFaint}/><span style={{fontSize:14,color:T.textSub}}>{it.text}</span></div>))}
</div>
{c.notes&&<div style={{...card,background:T.surfaceAlt,borderStyle:"dashed"}}><div style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{L.notes}</div><div style={{fontSize:14,color:T.textSub}}>{c.notes}</div></div>}
<div style={{display:"flex",gap:8}}><button style={bSP} onClick={()=>window.open(`mailto:${c.email}`)}><Ic name="mail" size={14} color="#fff"/> {L.email}</button><button style={bSO} onClick={()=>window.open(`tel:${c.phone.replace(/[^+\d]/g,"")}`)}><Ic name="phone" size={14}/> {L.call}</button><button style={bSO} onClick={()=>{setFormData({name:c.name,company:c.company,email:c.email,phone:c.phone,notes:c.notes||"",editId:c.id});setModal("editContact")}}><Ic name="edit" size={14}/> {L.edit}</button></div>
</div>)}
const fs=[{key:"all",label:L.all},{key:"Kund",label:L.customer},{key:"Lead",label:L.lead},{key:"Prospekt",label:L.prospect}];
const list=contacts.filter(c=>(cFilter==="all"||c.status===cFilter)&&(!search||c.name.toLowerCase().includes(search.toLowerCase())||c.company.toLowerCase().includes(search.toLowerCase())));
return (<div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><h1 style={hd}>{L.contactsTitle}</h1><p style={subS}>{contacts.length} {L.inNetwork}</p></div><button style={bSP} onClick={()=>setModal("newContact")}><Ic name="plus" size={14} color="#fff"/> {L.newItem}</button></div>
<div style={{position:"relative",marginBottom:14}}><input style={{...ipS,paddingLeft:38}} placeholder={L.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)}/><div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Ic name="search" size={16} color={T.textFaint}/></div></div>
<div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>{fs.map(f=><button key={f.key} style={fB(cFilter===f.key)} onClick={()=>setCFilter(f.key)}>{f.label}</button>)}</div>
<div style={{...card,padding:0,overflow:"hidden"}}>{list.map((c,i)=>(<div key={c.id} style={{...lr,borderBottom:i<list.length-1?`1px solid ${T.border}`:"none"}} onClick={()=>setDetail({type:"contact",data:c})}>
<div style={{display:"flex",alignItems:"center",gap:12}}><div style={avS(42)}>{ini(c.name)}</div><TempDot contact={c}/><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{c.name}</div><div style={{fontSize:12,color:T.textMuted}}>{c.company}</div></div><div style={{textAlign:"right"}}><Badge status={c.status}/><div style={{fontSize:11,color:T.textFaint,marginTop:3}}>{c.daysSince}{L.dSince}</div></div></div>
</div>))}</div>
</div>);
};

// PROJECTS VIEW
const ProjView=()=>{
if(detail?.type==="project"){const p=detail.data;const bp=Math.round((p.spent/p.budget)*100);return (<div>
<button style={{...bSO,marginBottom:16}} onClick={()=>setDetail(null)}><Ic name="back" size={16}/> {L.back}</button>
<div style={card}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><div style={{...hd,fontSize:20}}>{p.name}</div><div style={{fontSize:13,color:T.textMuted,marginTop:2}}>{p.client}</div></div><Badge status={p.status}/></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>{[{l:L.budget,v:fmtMoney(p.budget),s:`${fmtMoney(p.spent)} ${L.used}`},{l:L.progress,v:`${p.progress}%`,s:`${L.deadline} ${p.deadline}`}].map((st,i)=>(<div key={i} style={{padding:14,background:T.surfaceAlt,borderRadius:10}}><div style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.06em"}}>{st.l}</div><div style={{fontSize:18,fontWeight:700,fontFamily:serif,marginTop:4,color:T.accent}}>{st.v}</div><div style={{fontSize:12,color:T.textMuted}}>{st.s}</div></div>))}</div>
<div style={{fontSize:11,color:T.textMuted,marginBottom:4,display:"flex",justifyContent:"space-between"}}><span>{L.budget}</span><span style={{color:bp>85?T.danger:T.textMuted}}>{bp}%</span></div><div style={progBar}><div style={progFill(bp,bp>85?T.danger:T.accent)}/></div></div>
<div style={secS}>{L.tasks}</div><div style={{...card,padding:0,overflow:"hidden"}}>{p.tasks.map((task,ti)=>(<div key={ti} style={{...lr,display:"flex",alignItems:"center",gap:12,borderBottom:ti<p.tasks.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}} onClick={()=>{const updated=projects.map(pr=>pr.id===p.id?{...pr,tasks:pr.tasks.map((tk,idx)=>idx===ti?{...tk,done:!tk.done}:tk),progress:Math.round(pr.tasks.map((tk,idx)=>idx===ti?{...tk,done:!tk.done}:tk).filter(tk=>tk.done).length/pr.tasks.length*100)}:pr);setProjects(updated);setDetail({type:"project",data:updated.find(pr=>pr.id===p.id)})}}><div style={{width:22,height:22,borderRadius:6,border:`2px solid ${task.done?T.success:T.border}`,background:task.done?T.successLight:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{task.done&&<Ic name="check" size={12} color={T.success}/>}</div><span style={{fontSize:14,color:task.done?T.textFaint:T.text,textDecoration:task.done?"line-through":"none"}}>{task.t}</span></div>))}</div>
</div>)}
return (<div><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><h1 style={hd}>{L.projectsTitle}</h1><p style={subS}>{projects.length} {L.totalProjects}</p></div><button style={bSP} onClick={()=>setModal("newProject")}><Ic name="plus" size={14} color="#fff"/> {L.newProject}</button></div>
{projects.map(p=>(<div key={p.id} style={card} onClick={()=>setDetail({type:"project",data:p})}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><div style={{fontWeight:600,fontSize:14}}>{p.name}</div><div style={{fontSize:12,color:T.textMuted}}>{p.client}</div></div><Badge status={p.status}/></div><div style={progBar}><div style={progFill(p.progress)}/></div><div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:12,color:T.textMuted}}><span>{p.progress}%</span><span>{fmtMoney(p.spent)} / {fmtMoney(p.budget)}</span></div></div>))}
</div>);
};

// INVOICES VIEW
const InvView=()=>{
const fs=[{key:"all",label:L.all},{key:"Utkast",label:L.draft},{key:"Skickad",label:L.sent},{key:"Betald",label:L.paid},{key:"Förfallen",label:L.overdue}];
const list=invoices.filter(inv=>iFilter==="all"||inv.status===iFilter);
const tots={Betald:0,Skickad:0,"Förfallen":0};invoices.forEach(inv=>{if(tots[inv.status]!==undefined)tots[inv.status]+=inv.amount});
return (<div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
<div><h1 style={hd}>{L.invoicesTitle}</h1><p style={subS}>{invoices.length} {L.invoicesCount}</p></div>
<div style={{display:"flex",gap:6}}>
<button style={{...bSO,borderColor:T.accent,color:T.accent}} onClick={()=>setModal("scanInvoice")}>
<svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
{lang==="sv"?"Skanna":"Scan"}
</button>
<button style={bSP} onClick={()=>setModal("newInvoice")}><Ic name="plus" size={14} color="#fff"/> {L.newItem}</button>
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>{[{l:L.paidTotal,v:fmtMoney(tots.Betald),c:T.success,bc:T.success},{l:L.pending,v:fmtMoney(tots.Skickad),c:T.accent,bc:T.borderAccent},{l:L.overdueTotal,v:fmtMoney(tots["Förfallen"]),c:T.danger,bc:T.danger}].map((s,i)=>(<div key={i} style={{...sCard,borderColor:s.bc,padding:"12px 10px"}}><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{s.l}</div><div style={{fontFamily:serif,fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div></div>))}</div>
<div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>{fs.map(f=><button key={f.key} style={fB(iFilter===f.key)} onClick={()=>setIFilter(f.key)}>{f.label}</button>)}</div>
<div style={{...card,padding:0,overflow:"hidden"}}>{list.map((inv,i)=>(<div key={inv.id} style={{...lr,borderBottom:i<list.length-1?`1px solid ${T.border}`:"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontWeight:600,fontSize:14}}>{inv.id}</span><Badge status={inv.status}/></div><div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{inv.client}</div></div><div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:15,fontFamily:serif}}>{fmtMoney(inv.amount)}</div><div style={{fontSize:11,color:T.textFaint}}>{L.dueDate} {inv.due}</div></div></div></div>))}</div>
</div>);
};

// TIME VIEW
const TimView=()=>{
const tH=timeEntries.filter(e=>e.date==="2026-03-26").reduce((s,e)=>s+e.hours,0);const wH=timeEntries.reduce((s,e)=>s+e.hours,0);const byP={};timeEntries.forEach(e=>{byP[e.project]=(byP[e.project]||0)+e.hours});
return (<div><h1 style={hd}>{L.timeTitle}</h1><p style={subS}>{L.weekLabel}</p>
<div style={{...card,borderColor:T.borderAccent,textAlign:"center"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:38,fontWeight:400,color:timerOn?T.accent:T.text,letterSpacing:"0.06em",padding:"12px 0"}}>{fmtT(timerSec)}</div>
<div style={{marginBottom:10}}><select style={{...ipS,textAlign:"center",appearance:"none"}} value={timerProj} onChange={e=>setTimerProj(e.target.value)}>{projects.filter(p=>p.status!=="Avslutad").map(p=><option key={p.id}>{p.name}</option>)}</select></div>
<div style={{marginBottom:16}}><input style={ipS} placeholder={L.whatWorking} value={timerTask} onChange={e=>setTimerTask(e.target.value)}/></div>
<div style={{display:"flex",gap:8,justifyContent:"center"}}><button style={bP} onClick={()=>setTimerOn(!timerOn)}><Ic name={timerOn?"pause":"play"} size={15} color="#fff"/> {timerOn?L.pause:L.start}</button>{timerSec>0&&<button style={bO} onClick={()=>{const hrs=Math.round((timerSec/3600)*100)/100;if(hrs>=0.01){const today=new Date().toISOString().slice(0,10);setTimeEntries(prev=>[{id:Date.now(),project:timerProj,task:timerTask||timerProj,date:today,hours:hrs},...prev])}setTimerOn(false);setTimerSec(0);setTimerTask("")}}>{L.reset}</button>}</div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>{[{l:L.today,v:`${tH}h`},{l:L.week,v:`${wH}h`}].map((s,i)=>(<div key={i} style={{...sCard,borderColor:T.borderAccent}}><div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div><div style={{fontFamily:serif,fontSize:24,fontWeight:400,color:T.accent,marginTop:4}}>{s.v}</div></div>))}</div>
<div style={secS}>{L.perProject}</div><div style={card}>{Object.entries(byP).sort((a,b)=>b[1]-a[1]).map(([proj,hrs])=>{const pc=Math.round((hrs/wH)*100);return (<div key={proj} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}><span style={{fontWeight:500}}>{proj}</span><span style={{color:T.textMuted}}>{hrs}h ({pc}%)</span></div><div style={progBar}><div style={progFill(pc)}/></div></div>)})}</div>
<div style={secS}>{L.recentEntries}</div><div style={{...card,padding:0,overflow:"hidden"}}>{timeEntries.map((e,i)=>(<div key={e.id} style={{...lr,borderBottom:i<timeEntries.length-1?`1px solid ${T.border}`:"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:600,fontSize:14}}>{e.task}</div><div style={{fontSize:12,color:T.textMuted}}>{e.project} · {e.date}</div></div><div style={{fontWeight:700,fontSize:16,fontFamily:serif,color:T.accent}}>{e.hours}h</div></div></div>))}</div>
</div>);
};

// SCAN MODAL
const handleScanFile=async(e)=>{
const file=e.target.files?.[0];
if(!file)return;
const reader=new FileReader();
reader.onload=(ev)=>{
setScanPreview(ev.target.result);
setScanState("scanning");
setTimeout(()=>{
setScanResult({client:"Lindberg Reklam",amount:"42 000",currency:"SEK",date:"2026-03-28",due:"2026-04-28",items:[{desc:lang==="sv"?"Konsulttjänster mars":"Consulting services March",qty:1,price:"42 000"}]});
setScanState("done");
},2200);
};
reader.readAsDataURL(file);
};

const ScanModal=()=>(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>{setModal(null);setScanState("idle");setScanPreview(null);setScanResult(null)}}>
<div style={{background:T.surface,borderRadius:"18px 18px 0 0",width:"100%",maxWidth:500,maxHeight:"90vh",overflowY:"auto",padding:"24px 20px 32px"}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
<div style={{...hd,fontSize:20}}>{L.scanTitle}</div>
<button style={{background:"none",border:"none",cursor:"pointer",color:T.textMuted,padding:4}} onClick={()=>{setModal(null);setScanState("idle");setScanPreview(null);setScanResult(null)}}><Ic name="x" size={22}/></button>
</div>
    {scanState==="idle"&&(<>
      <div style={{fontSize:13,color:T.textMuted,lineHeight:1.6,marginBottom:20}}>{L.scanDesc}</div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handleScanFile}/>
      <div style={{display:"flex",gap:10}}>
        <button style={{...bP,flex:1,justifyContent:"center"}} onClick={()=>{fileRef.current.setAttribute("capture","environment");fileRef.current.click()}}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          {L.scanCamera}
        </button>
        <button style={{...bO,flex:1,justifyContent:"center"}} onClick={()=>{fileRef.current.removeAttribute("capture");fileRef.current.click()}}>
          <Ic name="plus" size={16}/> {L.scanUpload}
        </button>
      </div>
    </>)}
    {scanState==="scanning"&&(<div style={{textAlign:"center",padding:"30px 0"}}>
      {scanPreview&&<img src={scanPreview} style={{width:"100%",maxHeight:200,objectFit:"contain",borderRadius:10,marginBottom:16,opacity:0.6}} alt="invoice"/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}>
        <div style={{width:20,height:20,border:`2.5px solid ${T.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
        <span style={{fontSize:14,fontWeight:500,color:T.accent}}>{L.scanning}</span>
      </div>
      <div style={{fontSize:12,color:T.textMuted}}>AI-powered by Claude</div>
    </div>)}
    {scanState==="done"&&scanResult&&(<div>
      {scanPreview&&<img src={scanPreview} style={{width:"100%",maxHeight:160,objectFit:"contain",borderRadius:10,marginBottom:16}} alt="invoice"/>}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <div style={{width:24,height:24,borderRadius:"50%",background:T.successLight,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="check" size={14} color={T.success}/></div>
        <span style={{fontSize:14,fontWeight:600,color:T.success}}>{L.scanSuccess}</span>
      </div>
      <div style={{fontSize:12,fontWeight:600,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>{L.extractedData}</div>
      <div style={{...card,background:T.surfaceAlt,marginBottom:16}}>
        {[
          {l:L.client,v:scanResult.client},
          {l:L.amount,v:`${scanResult.amount} ${scanResult.currency}`},
          {l:L.invoiceDate,v:scanResult.date},
          {l:L.dueBy,v:scanResult.due},
        ].map((row,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
          <span style={{fontSize:12,color:T.textMuted}}>{row.l}</span>
          <span style={{fontSize:13,fontWeight:600,color:T.text}}>{row.v}</span>
        </div>))}
      </div>
      {scanResult.items&&(<div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>{lang==="sv"?"Rader":"Line items"}</div>
        {scanResult.items.map((item,i)=>(<div key={i} style={{padding:10,background:T.surfaceAlt,borderRadius:8,fontSize:13,display:"flex",justifyContent:"space-between"}}>
          <span style={{color:T.textSub}}>{item.desc}</span>
          <span style={{fontWeight:600,color:T.text}}>{item.price} {scanResult.currency}</span>
        </div>))}
      </div>)}
      <div style={{display:"flex",gap:10}}>
        <button style={{...bP,flex:1,justifyContent:"center"}} onClick={()=>{if(scanResult){setInvoices(prev=>[{id:`F${Date.now()}`,client:scanResult.client,amount:parseInt(scanResult.amount.replace(/\s/g,""),10),status:"Utkast",due:scanResult.due},...prev])}setModal(null);setScanState("idle");setScanPreview(null);setScanResult(null)}}>
          <Ic name="check" size={14} color="#fff"/> {L.confirm}
        </button>
        <button style={{...bO}} onClick={()=>{setScanState("idle");setScanPreview(null);setScanResult(null)}}>
          {lang==="sv"?"Skanna igen":"Scan again"}
        </button>
      </div>
    </div>)}
    {scanState==="error"&&(<div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:14,color:T.danger,marginBottom:12}}>{L.scanError}</div>
      <button style={bP} onClick={()=>{setScanState("idle");setScanPreview(null)}}>{lang==="sv"?"Försök igen":"Try again"}</button>
    </div>)}
</div>
</div>
);

const closeModal=()=>{setModal(null);setFormData({})};
const handleSave=()=>{
if(modal==="newContact"){
if(!formData.name)return;
setContacts(prev=>[{id:Date.now(),name:formData.name,company:formData.company||"",email:formData.email||"",phone:formData.phone||"",status:"Lead",value:0,daysSince:0,notes:formData.notes||""},...prev]);
}else if(modal==="editContact"){
setContacts(prev=>prev.map(c=>c.id===formData.editId?{...c,name:formData.name||c.name,company:formData.company||c.company,email:formData.email||c.email,phone:formData.phone||c.phone,notes:formData.notes!==undefined?formData.notes:c.notes}:c));
setDetail(null);
}else if(modal==="newInvoice"){
if(!formData.client||!formData.amount)return;
setInvoices(prev=>[{id:`F${Date.now()}`,client:formData.client,amount:parseInt(formData.amount,10)||0,status:"Utkast",due:formData.due||""},...prev]);
}else if(modal==="newProject"){
if(!formData.name)return;
setProjects(prev=>[{id:Date.now(),name:formData.name,client:formData.client||"",status:"Planering",progress:0,deadline:formData.deadline||"",budget:parseInt(formData.budget,10)||0,spent:0,tasks:[]},...prev]);
}
closeModal();
};
const ModalView=()=>{
if(!modal)return null;
if(modal==="scanInvoice") return <ScanModal />;
const isCon=modal==="newContact"||modal==="editContact";
const isProj=modal==="newProject";
const title=modal==="editContact"?L.edit:isCon?L.newContact:isProj?L.newProject:L.newInvoice;
const fields=isCon?[{k:"name",l:L.name,p:"..."},{k:"company",l:L.company,p:"..."},{k:"email",l:L.email,p:"name@company.com"},{k:"phone",l:L.phone,p:"070-000 00 00"}]:isProj?[{k:"name",l:L.name,p:"..."},{k:"client",l:L.client,p:"..."},{k:"budget",l:L.budget,p:"0"},{k:"deadline",l:L.deadline,p:"2026-06-01"}]:[{k:"client",l:L.client,p:"..."},{k:"amount",l:L.amount,p:"0"},{k:"date",l:L.invoiceDate,p:"2026-03-26"},{k:"due",l:L.dueBy,p:"2026-04-26"}];
return (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={closeModal}><div style={{background:T.surface,borderRadius:"18px 18px 0 0",width:"100%",maxWidth:500,maxHeight:"85vh",overflowY:"auto",padding:"24px 20px 32px"}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}><div style={{...hd,fontSize:20}}>{title}</div><button style={{background:"none",border:"none",cursor:"pointer",color:T.textMuted,padding:4}} onClick={closeModal}><Ic name="x" size={22}/></button></div>
{fields.map(({k,l,p})=>(<div key={k} style={{marginBottom:14}}><label style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5,fontWeight:600}}>{l}</label><input style={ipS} placeholder={p} value={formData[k]||""} onChange={e=>setFormData(prev=>({...prev,[k]:e.target.value}))}/></div>))}
<div style={{marginBottom:14}}><label style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5,fontWeight:600}}>{isCon?L.notes:L.description}</label><textarea style={{...ipS,minHeight:70,resize:"vertical"}} placeholder="..." value={formData.notes||formData.description||""} onChange={e=>setFormData(prev=>({...prev,[isCon?"notes":"description"]:e.target.value}))}/></div>
<div style={{display:"flex",gap:10,marginTop:20}}><button style={bP} onClick={handleSave}><Ic name="check" size={14} color="#fff"/> {L.save}</button><button style={bO} onClick={closeModal}>{L.cancel}</button></div>
</div></div>);
};

// ── HEY ARVO: Smart extraction engine ───────────────────────────────
const extractAction=(text)=>{
const t=text.toLowerCase();
const today=new Date().toISOString().slice(0,10);
// Time log patterns
const timeMatch=t.match(/(\d+(?:[.,]\d+)?)\s*(?:h|timm(?:e|ar)|hours?)/);
const clientMatch=text.match(/(?:för|for|åt|hos|at|with)\s+([A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)*)/);
const projectMatch=text.match(/(?:projekt|project)\s+["']?([^"',]+)/i);
if(timeMatch){
const hours=parseFloat(timeMatch[1].replace(",","."));
const client=clientMatch?clientMatch[1]:null;
const proj=projectMatch?projectMatch[1].trim():client||null;
const descWords=text.replace(timeMatch[0],"").replace(clientMatch?clientMatch[0]:"","").replace(/^[\s,.-]+|[\s,.-]+$/g,"").replace(/(?:jobbade?|worked|idag|today|igår|yesterday|med|with|på|on)\s*/gi,"").trim();
return {type:"time_log",data:{hours,project:proj,task:descWords||null,client,date:t.includes("igår")||t.includes("yesterday")?new Date(Date.now()-86400000).toISOString().slice(0,10):today}};
}
// Invoice patterns
const invMatch=t.match(/(?:faktur|invoice|skicka faktura|invoice draft)\w*/);
const amtMatch=t.match(/(\d[\d\s]*(?:\d))\s*(?:kr|sek|:-|kronor)?/);
if(invMatch&&(clientMatch||amtMatch)){
const amount=amtMatch?parseInt(amtMatch[1].replace(/\s/g,""),10):0;
return {type:"invoice_draft",data:{client:clientMatch?clientMatch[1]:"Okänd kund",amount,description:text,date:today}};
}
// Expense patterns
const expMatch=t.match(/(?:köpte?|betalade?|utgift|expense|bought|paid|kvitto|receipt)/);
if(expMatch&&amtMatch){
const amount=parseInt(amtMatch[1].replace(/\s/g,""),10);
const desc=text.replace(amtMatch[0],"").replace(expMatch[0],"").replace(/^[\s,.-]+|[\s,.-]+$/g,"").trim();
return {type:"expense",data:{amount,description:desc||"Utgift",client:clientMatch?clientMatch[1]:null,date:today}};
}
// New contact patterns
const conMatch=t.match(/(?:ny kontakt|new contact|lägg till|add contact)/);
const emailMatch=text.match(/[\w.-]+@[\w.-]+\.\w+/);
const phoneMatch=text.match(/(?:0\d{1,3}[-\s]?\d{2,3}[-\s]?\d{2}[-\s]?\d{2}|\+\d{8,15})/);
const nameMatch=text.match(/(?:ny kontakt|new contact|lägg till|add)\s+([A-ZÅÄÖ][a-zåäö]+(?:\s+[A-ZÅÄÖ][a-zåäö]+)*)/i);
if(conMatch){
return {type:"new_contact",data:{name:nameMatch?nameMatch[1]:clientMatch?clientMatch[1]:"Okänd",company:clientMatch?clientMatch[1]:null,email:emailMatch?emailMatch[0]:null,phone:phoneMatch?phoneMatch[0]:null}};
}
// Project update patterns
if(projectMatch||t.match(/(?:uppdatera|update|status|klar|done|färdig|finished)/)){
const proj=projectMatch?projectMatch[1].trim():clientMatch?clientMatch[1]:null;
if(proj) return {type:"project_update",data:{project:proj,status:t.match(/klar|done|färdig|finished|avslut/)?"Avslutad":t.match(/paus|hold|vänta/)?"Pausad":null,description:text}};
}
// Amount without other context = expense
if(amtMatch&&!timeMatch){
const amount=parseInt(amtMatch[1].replace(/\s/g,""),10);
return {type:"expense",data:{amount,description:text,client:clientMatch?clientMatch[1]:null,date:today}};
}
return null;
};

const processArvoMessage=async(text)=>{
if(!text.trim())return;
setChatMsgs(prev=>[...prev,{role:"user",text,ts:Date.now()}]);
setChatInput("");
setArvoThinking(true);
// Simulate slight delay for natural feel
await new Promise(r=>setTimeout(r,600+Math.random()*400));
const result=extractAction(text);
if(!result){
setChatMsgs(prev=>[...prev,{role:"arvo",text:L.heyArvoCantParse,ts:Date.now()}]);
setArvoThinking(false);
return;
}
let reply="";
const d=result.data;
switch(result.type){
case "time_log":{
const proj=d.project||"Projekt";
setTimeEntries(prev=>[{id:Date.now(),project:proj,task:d.task||proj,date:d.date,hours:d.hours},...prev]);
reply=`${L.heyArvoTimeLogged}\n${d.hours}h → ${proj}${d.task?` (${d.task})`:""}`;
break;
}
case "invoice_draft":{
const invNum=`F${new Date().getFullYear()}-${String(invoices.length+1).padStart(3,"0")}`;
setInvoices(prev=>[{id:invNum,client:d.client,amount:d.amount,status:"Utkast",due:""},...prev]);
reply=`${L.heyArvoInvoiceCreated}\n${invNum} → ${d.client} — ${fmtMoney(d.amount)}`;
break;
}
case "expense":{
reply=`${L.heyArvoExpenseLogged}\n${d.description} — ${fmtMoney(d.amount)}`;
break;
}
case "new_contact":{
setContacts(prev=>[{id:Date.now(),name:d.name,company:d.company||"",email:d.email||"",phone:d.phone||"",status:"Lead",value:0,daysSince:0,notes:""},...prev]);
reply=`${L.heyArvoContactCreated}\n${d.name}${d.company?` (${d.company})`:""}${d.email?`\n${d.email}`:""}`;
break;
}
case "project_update":{
const projName=d.project;
setProjects(prev=>prev.map(p=>p.name.toLowerCase().includes(projName.toLowerCase())?{...p,status:d.status||p.status}:p));
reply=`${L.heyArvoProjectUpdated}\n${projName}${d.status?` → ${sLabel(d.status)}`:""}`;
break;
}
default: break;
}
setChatMsgs(prev=>[...prev,{role:"arvo",text:reply,ts:Date.now(),type:result.type}]);
setArvoThinking(false);
};

const startListening=()=>{
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){setChatMsgs(prev=>[...prev,{role:"arvo",text:L.heyArvoNoMic,ts:Date.now()}]);return}
const rec=new SR();
rec.lang=lang==="sv"?"sv-SE":"en-US";
rec.interimResults=false;
rec.maxAlternatives=1;
rec.onresult=(e)=>{const t=e.results[0][0].transcript;setChatInput(t);processArvoMessage(t)};
rec.onerror=()=>setIsListening(false);
rec.onend=()=>setIsListening(false);
recognitionRef.current=rec;
rec.start();
setIsListening(true);
};
const stopListening=()=>{if(recognitionRef.current)recognitionRef.current.stop();setIsListening(false)};

// ── HEY ARVO VIEW ──────────────────────────────────────────────────
const HeyArvoView=()=>{
const actionIcon={time_log:"time",invoice_draft:"invoices",expense:"tag",new_contact:"contacts",project_update:"projects",cfo:"trendUp"};
const actionColor={time_log:T.accent,invoice_draft:T.warn,expense:T.danger,new_contact:T.success,project_update:T.accent,cfo:T.warn};
const [cfoActions,setCfoActions]=useState([]);

const triggerCfo=()=>{
const cfo=generateCfoMessage();
// Apply Trust Ladder: auto-approve actions based on trust level
const processed=cfo.actions.map(a=>{
  const isSmall=a.amount<10000;
  const autoApprove=arvoTrust===3||(arvoTrust===2&&isSmall&&a.type==="reminder");
  return {...a,done:autoApprove,approved:autoApprove,autoSent:autoApprove};
});
setChatMsgs(prev=>[...prev,{role:"arvo",text:cfo.text,ts:Date.now(),type:"cfo",actions:processed}]);
setCfoActions(processed);
if(processed.some(a=>a.autoSent)){
  const count=processed.filter(a=>a.autoSent).length;
  setChatMsgs(prev=>[...prev,{role:"arvo",text:lang==="sv"?`Jag har redan skickat ${count} av åtgärderna automatiskt baserat på din autonominivå. Du kan ångra när som helst.`:`I've already auto-sent ${count} of these based on your autonomy level. You can undo any time.`,ts:Date.now(),type:"cfo"}]);
}
};

const handleCfoAction=(actionId,approved)=>{
setCfoActions(prev=>prev.map(a=>a.id===actionId?{...a,done:true,approved}:a));
const action=cfoActions.find(a=>a.id===actionId);
if(!action)return;
if(approved){
setApprovedCount(c=>c+1);
const confirmText=action.type==="reminder"
?`${L.cfoReminderSent} ${action.client}. ${L.cfoMonitoring}`
:`${L.cfoDiscountOffered} ${action.client}. ${L.cfoMonitoring}`;
setChatMsgs(prev=>[...prev,{role:"arvo",text:confirmText,ts:Date.now(),type:"cfo"}]);
}else{
setChatMsgs(prev=>[...prev,{role:"arvo",text:`${L.cfoSkip}: ${action.client}`,ts:Date.now()}]);
}
};

const impact=computeImpact();
const trustLevels=[
{lvl:1,label:L.trustLevel1,desc:L.trustLevel1Desc,unlock:0,icon:"shield"},
{lvl:2,label:L.trustLevel2,desc:L.trustLevel2Desc,unlock:5,icon:"zap"},
{lvl:3,label:L.trustLevel3,desc:L.trustLevel3Desc,unlock:15,icon:"trendUp"},
];

return (
<div style={{display:"flex",flexDirection:"column",minHeight:"calc(100vh - 164px)"}}>
<div style={{textAlign:"center",marginBottom:14}}>
<div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:52,height:52,borderRadius:"50%",background:T.accentLight,marginBottom:8}}>
<ArvoLogo size={30}/>
</div>
<h1 style={{...hd,fontSize:22}}>{L.heyArvo}</h1>
<p style={{...subS,marginBottom:0,marginTop:4}}>{L.heyArvoSub}</p>
</div>

{/* ── Tabs ── */}
<div style={{display:"flex",gap:6,marginBottom:16,padding:4,background:T.surfaceAlt,borderRadius:12}}>
{[{id:"chat",label:L.tabChat,icon:"mic"},{id:"analysis",label:L.tabAnalysis,icon:"sparkles"},{id:"impact",label:L.tabImpact,icon:"trendUp"},{id:"trust",label:L.tabTrust,icon:"shield"}].map(t=>{
const active=arvoTab===t.id;
return (<button key={t.id} onClick={()=>setArvoTab(t.id)} style={{flex:1,padding:"9px 8px",background:active?T.cardBg:"transparent",border:"none",borderRadius:9,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:active?T.shadow:"none",transition:"all 0.2s"}}>
<Ic name={t.icon} size={14} color={active?T.accent:T.textMuted}/>
<span style={{fontSize:12,fontWeight:active?600:500,color:active?T.accent:T.textMuted}}>{t.label}</span>
</button>)
})}
</div>

{/* ── CONCIERGE / ANALYSIS TAB ── */}
{arvoTab==="analysis"&&(<div style={{flex:1,overflowY:"auto",paddingBottom:12}}>

{/* State: idle — upload dropzone */}
{conciergeStep==="idle"&&(<>
<div style={{marginBottom:16}}>
<h2 style={{fontFamily:serif,fontSize:22,fontWeight:700,color:T.text,letterSpacing:"-0.02em",marginBottom:6}}>{L.cmTitle}</h2>
<p style={{fontSize:13,color:T.textMuted,lineHeight:1.55,margin:0}}>{L.cmSub}</p>
</div>

{/* GDPR trust ribbon */}
<div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.successLight,borderRadius:10,marginBottom:14,border:`1px solid ${T.success}30`}}>
<Ic name="shield" size={14} color={T.success}/>
<div style={{fontSize:11,color:T.success,lineHeight:1.5,fontWeight:500}}>{L.cmGdpr}</div>
</div>

{/* Dropzone */}
<label htmlFor="concierge-file-input" style={{display:"block",cursor:"pointer"}}>
<div style={{border:`2px dashed ${T.borderAccent}`,borderRadius:16,padding:"36px 20px",textAlign:"center",background:T.accentLight+"60",transition:"all 0.2s"}}
  onDragOver={e=>{e.preventDefault()}}
  onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleConciergeFile(f)}}
>
<div style={{width:52,height:52,borderRadius:"50%",background:T.accent+"20",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
<Ic name="sparkles" size={24} color={T.accent}/>
</div>
<div style={{fontFamily:serif,fontSize:17,fontWeight:600,color:T.accentDark,marginBottom:4}}>{L.cmDrop}</div>
<div style={{fontSize:12,color:T.textMuted,marginBottom:14}}>{L.cmOr}</div>
<div style={{display:"inline-block",padding:"10px 22px",background:T.accent,color:"#fff",borderRadius:100,fontSize:13,fontWeight:600,boxShadow:"0 2px 8px rgba(42,109,94,0.25)"}}>{L.cmChoose}</div>
</div>
</label>
<input id="concierge-file-input" type="file" accept=".csv,.txt,text/csv" style={{display:"none"}} onChange={e=>{if(e.target.files[0])handleConciergeFile(e.target.files[0])}}/>

{/* Demo button */}
<button onClick={()=>runConciergeAnalysis(CONCIERGE_DEMO_CSV)} style={{width:"100%",marginTop:12,padding:"12px 16px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:12,fontSize:13,fontWeight:500,color:T.textSub,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
<Ic name="zap" size={14} color={T.accent}/>
{L.cmDemo}
</button>

{/* Format note */}
<div style={{marginTop:14,padding:"10px 14px",background:T.surfaceAlt,borderRadius:10,fontSize:11,color:T.textMuted,lineHeight:1.55}}>{L.cmFormat}</div>

{/* Error */}
{conciergeError&&(<div style={{marginTop:12,padding:"12px 14px",background:T.dangerLight,borderRadius:10,fontSize:12,color:T.danger,fontWeight:500,display:"flex",alignItems:"center",gap:8}}>
<Ic name="alert" size={14} color={T.danger}/>{conciergeError}
</div>)}
</>)}

{/* State: analyzing */}
{conciergeStep==="analyzing"&&(<div style={{...card,padding:"40px 24px",textAlign:"center"}}>
<div style={{width:64,height:64,borderRadius:"50%",background:T.accentLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
<div style={{display:"flex",gap:5}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:T.accent,animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div>
</div>
<div style={{fontFamily:serif,fontSize:17,fontWeight:600,color:T.accentDark,marginBottom:16}}>{L.cmAnalyzing}</div>
<div style={{display:"flex",flexDirection:"column",gap:8,maxWidth:240,margin:"0 auto",textAlign:"left"}}>
{[L.cmAnalyzingStep1,L.cmAnalyzingStep2,L.cmAnalyzingStep3,L.cmAnalyzingStep4].map((s,i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:12,color:T.textMuted,opacity:0.5+i*0.15}}>
<div style={{width:14,height:14,borderRadius:"50%",border:`1.5px solid ${T.accent}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
<Ic name="check" size={9} color={T.accent}/>
</div>
{s}
</div>
))}
</div>
</div>)}

{/* State: results */}
{conciergeStep==="results"&&conciergeAnalysis&&(<>
{/* Hero summary */}
<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
<div style={{background:T.accentGrad,padding:"18px 20px",color:"#fff"}}>
<div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",opacity:0.85,marginBottom:4}}>{L.cmOutstanding}</div>
<div style={{fontFamily:serif,fontSize:32,fontWeight:400,lineHeight:1,letterSpacing:"-0.02em"}}>{fmtMoney(conciergeAnalysis.outstandingAmt)}</div>
<div style={{fontSize:11,marginTop:6,opacity:0.85}}>{L.cmResultsSub.replace("{n}",conciergeAnalysis.totalRows).replace("{clients}",conciergeAnalysis.clientCount)}</div>
</div>
<div style={{padding:"14px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
<div>
<div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>{L.cmOverdue}</div>
<div style={{fontFamily:serif,fontSize:20,fontWeight:500,color:conciergeAnalysis.overdueAmt>0?T.danger:T.accentDark,letterSpacing:"-0.01em"}}>{fmtMoney(conciergeAnalysis.overdueAmt)}</div>
</div>
<div>
<div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>{L.cmAvgDso}</div>
<div style={{fontFamily:serif,fontSize:20,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{conciergeAnalysis.avgDso} {L.cmDays}</div>
</div>
</div>
</div>

{/* ── CASH RUNWAY CHART — the "holy shit" moment ── */}
{(()=>{
  const rw=conciergeAnalysis.runway;
  const cw=conciergeAnalysis.crunchWeek;
  const allVals=[conciergeAnalysis.startingBalance,...rw.map(r=>r.balance)];
  const maxBal=Math.max(...allVals,1);
  const minBal=Math.min(...allVals,0);
  const range=maxBal-minBal||1;
  const zeroY=(maxBal/range)*100;
  const barH=110;
  return (<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
    <div style={{padding:"16px 18px 6px",borderBottom:`1px solid ${T.border}`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <Ic name="calendar" size={15} color={cw?T.danger:T.success}/>
        <div style={{fontFamily:serif,fontSize:16,fontWeight:700,color:T.text,letterSpacing:"-0.01em"}}>{L.cmRunwayTitle}</div>
      </div>
      <div style={{fontSize:11,color:T.textMuted,lineHeight:1.5}}>{L.cmRunwaySub}</div>
    </div>
    {/* Chart */}
    <div style={{padding:"18px 18px 10px",position:"relative"}}>
      <div style={{position:"relative",height:barH,display:"flex",alignItems:"flex-end",gap:4}}>
        {/* Zero baseline */}
        <div style={{position:"absolute",left:0,right:0,top:`${zeroY}%`,height:1,background:T.border,zIndex:1}}/>
        <div style={{position:"absolute",left:0,top:`${zeroY}%`,fontSize:9,color:T.textFaint,transform:"translateY(-12px)",fontWeight:500}}>0</div>
        {/* Starting point + 8 weeks */}
        {[{week:0,balance:conciergeAnalysis.startingBalance,start:true},...rw].map((r,i)=>{
          const pct=Math.abs(r.balance)/range*100;
          const isNeg=r.balance<0;
          const color=isNeg?T.danger:(r.start?T.accent:T.success);
          const top=isNeg?zeroY:zeroY-pct;
          const height=pct;
          const isCrunch=cw&&r.week===cw.week;
          return (<div key={i} style={{flex:1,height:"100%",position:"relative",display:"flex",justifyContent:"center"}} title={`${r.start?L.cmRunwayStart:"W"+r.week}: ${fmtMoney(r.balance)}`}>
            <div style={{position:"absolute",top:`${top}%`,height:`${height}%`,width:"60%",background:color,borderRadius:isNeg?"0 0 3px 3px":"3px 3px 0 0",opacity:r.start?0.45:0.95,border:isCrunch?`2px solid ${T.danger}`:"none",boxShadow:isCrunch?`0 0 0 3px ${T.danger}25`:"none",transition:"all 0.4s"}}/>
            {r.vat>0&&<div style={{position:"absolute",top:`${zeroY-2}%`,fontSize:8,color:T.warn,fontWeight:700,whiteSpace:"nowrap",transform:"translateY(-100%)"}}>{L.cmRunwayVat}</div>}
          </div>);
        })}
      </div>
      {/* X-axis labels */}
      <div style={{display:"flex",marginTop:4,gap:4}}>
        {[{label:L.cmRunwayStart},...rw.map(r=>({label:`${L.cmRunwayWeek}${r.week}`,isCrunch:cw&&r.week===cw.week}))].map((lbl,i)=>(
          <div key={i} style={{flex:1,textAlign:"center",fontSize:9,fontWeight:lbl.isCrunch?700:500,color:lbl.isCrunch?T.danger:T.textFaint}}>{lbl.label}</div>
        ))}
      </div>
    </div>
    {/* Status line */}
    <div style={{padding:"12px 18px",background:cw?T.dangerLight:T.successLight,borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:10}}>
      <Ic name={cw?"alert":"check"} size={15} color={cw?T.danger:T.success}/>
      <div style={{flex:1,fontSize:12,fontWeight:600,color:cw?T.danger:T.success,lineHeight:1.45}}>
        {cw?L.cmRunwayCrunch.replace("{n}",cw.week):L.cmRunwaySafe}
      </div>
      <div style={{fontFamily:serif,fontSize:15,fontWeight:700,color:cw?T.danger:T.success}}>{fmtMoney(rw[rw.length-1].balance)}</div>
    </div>
  </div>);
})()}

{/* Counterfactual — retroactive pain */}
{conciergeAnalysis.counterfactualAmount>0&&(<div style={{...card,borderLeft:`3.5px solid ${T.warn}`,background:T.warnLight,padding:"16px 18px",marginBottom:14}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
<Ic name="trendUp" size={16} color={T.warn}/>
<div style={{fontSize:11,fontWeight:700,color:T.warn,textTransform:"uppercase",letterSpacing:"0.06em"}}>{L.cmCounter}</div>
</div>
<div style={{fontSize:13,color:T.text,lineHeight:1.6}}>
{L.cmCounterBody.replace("{amount}",fmtMoney(conciergeAnalysis.counterfactualAmount)).replace("{days}",conciergeAnalysis.counterfactualDays)}
</div>
</div>)}

{/* Risks */}
{conciergeAnalysis.risks.length>0&&(<>
<div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.cmRisk}</div>
<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
{conciergeAnalysis.risks.map((r,i)=>{
const col=r.severity==="high"?T.danger:T.warn;
return (<div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 16px",borderBottom:i<conciergeAnalysis.risks.length-1?`1px solid ${T.border}`:"none"}}>
<div style={{width:24,height:24,borderRadius:6,background:col+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><Ic name="alert" size={12} color={col}/></div>
<div style={{flex:1,fontSize:12,color:T.text,lineHeight:1.55}}>{r.text}</div>
</div>)
})}
</div>
</>)}

{/* ── CLIENT VELOCITY TABLE ── */}
{conciergeAnalysis.clientVelocity.length>0&&(<>
<div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.cmVelocityTitle}</div>
<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
<div style={{padding:"10px 16px 6px",borderBottom:`1px solid ${T.border}`,fontSize:10,color:T.textFaint,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{L.cmVelocitySub}</div>
{conciergeAnalysis.clientVelocity.slice(0,6).map((c,i)=>{
  const tierCol=c.tier==="good"?T.success:c.tier==="ok"?T.warn:T.danger;
  const tierLbl=c.tier==="good"?L.cmVelocityGood:c.tier==="ok"?L.cmVelocityOk:L.cmVelocityBad;
  const last=i===Math.min(conciergeAnalysis.clientVelocity.length,6)-1;
  return (<div key={c.client} style={{padding:"12px 16px",borderBottom:last?"none":`1px solid ${T.border}`}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:600,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.client}</div>
        <div style={{fontSize:10,color:T.textMuted,marginTop:2}}>{fmtMoney(c.totalAmt)} · {c.total} {L.cmVelocityInv}{c.avgDaysLate>0?` · ⌀ ${c.avgDaysLate} ${L.cmVelocityLate}`:""}</div>
      </div>
      <div style={{padding:"3px 9px",borderRadius:100,fontSize:10,fontWeight:700,color:tierCol,background:tierCol+"18",letterSpacing:"0.02em",textTransform:"uppercase"}}>{tierLbl}</div>
    </div>
    {/* Reliability bar */}
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:5,background:T.surfaceAlt,borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${c.reliability}%`,background:tierCol,borderRadius:3,transition:"width 0.6s"}}/>
      </div>
      <div style={{fontSize:11,fontWeight:700,color:tierCol,minWidth:32,textAlign:"right"}}>{c.reliability}%</div>
    </div>
  </div>);
})}
</div>
</>)}

{/* Actions */}
{conciergeAnalysis.actions.length>0&&(<>
<div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.cmActions}</div>
{conciergeAnalysis.actions.map((a)=>{
  const prioLbl=a.priority===1?L.cmTonePrio1:a.priority===2?L.cmTonePrio2:L.cmTonePrio3;
  const prioCol=a.priority===1?T.danger:a.priority===2?T.warn:T.accent;
  return (<div key={a.id} style={{...card,padding:"14px 16px",marginBottom:10,borderLeft:`3px solid ${prioCol}`}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<div style={{width:32,height:32,borderRadius:8,background:a.type==="discount"?T.warnLight:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
<Ic name={a.type==="discount"?"tag":"mail"} size={14} color={a.type==="discount"?T.warn:T.accent}/>
</div>
<div style={{flex:1,minWidth:0}}>
<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
<div style={{fontWeight:600,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,minWidth:0}}>{a.client}</div>
<div style={{padding:"2px 7px",borderRadius:100,fontSize:9,fontWeight:700,color:prioCol,background:prioCol+"18",letterSpacing:"0.04em",textTransform:"uppercase",flexShrink:0}}>{prioLbl}</div>
</div>
<div style={{fontSize:11,color:T.textMuted}}>{a.type==="discount"?L.cmActionEarly:L.cmActionReminder} • {fmtMoney(a.amount)}</div>
</div>
</div>
<button onClick={()=>handleConciergeAction(a)} style={{width:"100%",padding:"11px 16px",background:T.accentGrad,color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 2px 6px rgba(42,109,94,0.18)"}}>
<Ic name="zap" size={14} color="#fff"/>{L.cmActFake}
</button>
</div>);
})}
</>)}

<button onClick={resetConcierge} style={{display:"block",width:"100%",marginTop:16,padding:"12px 16px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:12,fontSize:13,fontWeight:500,color:T.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{L.cmReset}</button>
</>)}

</div>)}

{/* ── IMPACT TAB ── */}
{arvoTab==="impact"&&(<div style={{flex:1,overflowY:"auto",paddingBottom:12}}>
{impact.hasData?(<>
{/* Hero capital card */}
<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
<div style={{background:T.accentGrad,padding:"22px 20px 18px",color:"#fff"}}>
<div style={{fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",opacity:0.85,marginBottom:6}}>{L.impactThisMonth}</div>
<div style={{fontFamily:serif,fontSize:38,fontWeight:400,lineHeight:1,letterSpacing:"-0.02em"}}>{fmtMoney(impact.capitalRescued)}</div>
<div style={{fontSize:12,marginTop:8,opacity:0.9}}>{L.impactCapital}</div>
</div>
<div style={{padding:"14px 20px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
<div><div style={{fontFamily:serif,fontSize:22,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{impact.daysSaved}</div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em",marginTop:2}}>{L.impactDaysSaved}</div></div>
<div><div style={{fontFamily:serif,fontSize:22,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{impact.timeSavedHours}h</div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em",marginTop:2}}>{L.impactTime}</div></div>
<div><div style={{fontFamily:serif,fontSize:22,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{impact.remindersSent}</div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.05em",marginTop:2}}>{L.impactReminders}</div></div>
</div>
</div>

{/* ROI ribbon */}
<div style={{...card,borderLeft:`3.5px solid ${T.success}`,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
<div style={{width:36,height:36,borderRadius:10,background:T.successLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name="trendUp" size={18} color={T.success}/></div>
<div style={{flex:1}}>
<div style={{fontSize:12,color:T.textMuted,fontWeight:500}}>{L.impactROI}</div>
<div style={{fontSize:15,fontWeight:600,color:T.text,marginTop:2}}>{L.impactROIBody} <span style={{color:T.success,fontFamily:serif,fontSize:19,fontWeight:700}}>{impact.roi}×</span></div>
</div>
</div>

{/* Recent wins */}
<div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10,paddingLeft:4}}>{L.impactWins}</div>
<div style={{...card,padding:0,overflow:"hidden",marginBottom:14}}>
{impact.wins.map((w,i)=>(<div key={w.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderBottom:i<impact.wins.length-1?`1px solid ${T.border}`:"none"}}>
<div style={{width:32,height:32,borderRadius:8,background:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name={w.action==="reminder"?"mail":"zap"} size={14} color={T.accent}/></div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontWeight:600,fontSize:13,color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{w.client}</div>
<div style={{fontSize:11,color:T.textMuted,marginTop:1}}>{w.action==="reminder"?L.impactWinReminder:L.impactWinEarly} • {w.daysSaved} {L.impactDaysFaster}</div>
</div>
<div style={{fontFamily:serif,fontSize:15,fontWeight:500,color:T.accentDark,letterSpacing:"-0.01em"}}>{fmtMoney(w.amount)}</div>
</div>))}
</div>
</>):(
<div style={{...card,textAlign:"center",padding:"40px 20px"}}>
<div style={{width:56,height:56,borderRadius:"50%",background:T.accentLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><Ic name="trendUp" size={24} color={T.accent}/></div>
<div style={{fontSize:14,color:T.textMuted}}>{L.impactEmpty}</div>
</div>
)}
</div>)}

{/* ── TRUST TAB ── */}
{arvoTab==="trust"&&(<div style={{flex:1,overflowY:"auto",paddingBottom:12}}>
<div style={{marginBottom:14,textAlign:"center"}}>
<div style={{fontSize:11,color:T.textMuted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>{L.trustCurrent}</div>
<div style={{fontFamily:serif,fontSize:24,fontWeight:500,color:T.accentDark,marginTop:4,letterSpacing:"-0.02em"}}>{trustLevels[arvoTrust-1].label}</div>
<div style={{fontSize:12,color:T.textMuted,marginTop:4}}>{approvedCount} {lang==="sv"?"godkända åtgärder":"approved actions"}</div>
</div>
{trustLevels.map((t)=>{
const isCurrent=arvoTrust===t.lvl;
const unlocked=approvedCount>=t.unlock;
return (<div key={t.lvl} onClick={()=>unlocked&&setArvoTrust(t.lvl)} style={{...card,padding:"16px 18px",marginBottom:10,cursor:unlocked?"pointer":"not-allowed",opacity:unlocked?1:0.55,borderLeft:isCurrent?`3.5px solid ${T.accent}`:`1px solid ${T.cardBorder}`,background:isCurrent?T.accentLight:T.cardBg}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
<div style={{width:34,height:34,borderRadius:10,background:isCurrent?T.accent+"25":T.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic name={t.icon} size={16} color={isCurrent?T.accent:T.textMuted}/></div>
<div style={{flex:1}}>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontWeight:700,fontSize:14,color:T.text}}>{lang==="sv"?`Nivå ${t.lvl}`:`Level ${t.lvl}`} · {t.label}</span>
{isCurrent&&<span style={{fontSize:10,fontWeight:600,color:T.accent,background:T.accent+"18",padding:"2px 8px",borderRadius:100,textTransform:"uppercase",letterSpacing:"0.04em"}}>{L.trustActive}</span>}
</div>
{!unlocked&&<div style={{fontSize:11,color:T.textFaint,marginTop:2}}>{L.trustUnlockAt.replace("{n}",t.unlock)}</div>}
</div>
</div>
<div style={{fontSize:12,color:T.textMuted,lineHeight:1.55,paddingLeft:46}}>{t.desc}</div>
</div>)
})}
</div>)}

{/* ── CHAT TAB ── */}
{arvoTab==="chat"&&(<div style={{flex:1,overflowY:"auto",paddingBottom:12}}>
{chatMsgs.length===0&&(
<div style={{padding:"16px 4px"}}>
{/* CFO Proactive Card */}
<div style={{...card,background:T.warnLight,borderColor:T.warn,padding:20,marginBottom:16}} onClick={triggerCfo}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
<div style={{width:36,height:36,borderRadius:10,background:T.warn+"20",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="trendUp" size={18} color={T.warn}/></div>
<div><div style={{fontWeight:700,fontSize:14,color:T.text}}>{L.cfoCashflow}</div><div style={{fontSize:12,color:T.textMuted}}>{lang==="sv"?"Tryck för likviditetsanalys":"Tap for liquidity analysis"}</div></div>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{(()=>{const cf=computeCashflow();return[{l:L.cfoBalance,v:fmtMoney(cf.currentBalance),c:T.accent},{l:L.cfoProjected,v:fmtMoney(cf.projectedBalance),c:cf.projectedBalance<cf.vatDue?T.danger:T.success},{l:L.cfoVatDue,v:fmtMoney(cf.vatDue),c:T.danger},{l:L.cfoIncoming,v:fmtMoney(cf.expectedIn),c:T.accent}]})().map((s,i)=>(
<div key={i} style={{padding:10,background:T.surface,borderRadius:10,textAlign:"center"}}>
<div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div>
<div style={{fontFamily:serif,fontSize:17,fontWeight:700,color:s.c,marginTop:3}}>{s.v}</div>
</div>))}
</div>
{(()=>{const cf=computeCashflow();return cf.shortfall>0?<div style={{marginTop:10,padding:"8px 12px",background:T.dangerLight,borderRadius:8,fontSize:12,color:T.danger,fontWeight:600,display:"flex",alignItems:"center",gap:6}}><Ic name="alert" size={14} color={T.danger}/>{lang==="sv"?`Brist: ${fmtMoney(cf.shortfall)} — tryck för åtgärder`:`Shortfall: ${fmtMoney(cf.shortfall)} — tap for actions`}</div>:null})()}
</div>

{/* Welcome + examples */}
<div style={{...card,background:T.accentLight,borderColor:T.borderAccent,borderStyle:"dashed",padding:24}}>
<div style={{fontSize:14,color:T.accent,lineHeight:1.7}}>{L.heyArvoWelcome}</div>
<div style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
{[lang==="sv"?"Jobbade 3h med design för Karlsson":"Worked 3h on design for Karlsson",lang==="sv"?"Ny kontakt Anna Svensson på AB Design":"New contact Anna Svensson at AB Design",lang==="sv"?"Faktura till Lindberg Reklam på 25000":"Invoice to Lindberg Reklam for 25000"].map((ex,i)=>(
<button key={i} onClick={()=>processArvoMessage(ex)} style={{padding:"10px 14px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,fontSize:13,color:T.textSub,cursor:"pointer",textAlign:"left",fontFamily:"inherit"}}>"{ex}"</button>
))}
</div>
</div>
</div>
)}

{chatMsgs.map((m,i)=>(
<div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:10,padding:"0 4px"}}>
{m.role==="arvo"&&<div style={{...avS(32),marginRight:8,marginTop:2,background:T.accentLight,fontSize:10}}><ArvoLogo size={18}/></div>}
<div style={{maxWidth:"85%",padding:"12px 16px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.role==="user"?T.accentGrad:m.type==="cfo"?T.warnLight:T.surfaceAlt,color:m.role==="user"?"#fff":T.text,fontSize:14,lineHeight:1.6,whiteSpace:"pre-line",boxShadow:T.shadow}}>
{m.role==="arvo"&&m.type&&<div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:8,padding:"4px 10px",borderRadius:8,background:(actionColor[m.type]||T.accent)+"18",fontSize:11,fontWeight:600,color:actionColor[m.type]||T.accent}}><Ic name={actionIcon[m.type]||"zap"} size={12} color={actionColor[m.type]||T.accent}/> {m.type==="cfo"?(lang==="sv"?"AI CFO":"AI CFO"):m.type.replace("_"," ")}</div>}
<div>{m.text}</div>
{/* Action buttons for CFO suggestions */}
{m.actions&&m.actions.length>0&&(
<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
{m.actions.map((act,ai)=>{
const done=cfoActions.find(a=>a.id===act.id);
const isDone=done&&done.done;
const autoSent=done&&done.autoSent;
return (<div key={ai} style={{padding:"10px 14px",background:T.surface,borderRadius:10,border:autoSent?`1px solid ${T.accent}`:`1px solid ${T.border}`}}>
<div style={{fontSize:13,color:T.text,marginBottom:8,lineHeight:1.5}}>{ai+1}. {act.label}</div>
{autoSent?
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
<div style={{fontSize:11,color:T.accent,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Ic name="zap" size={12} color={T.accent}/>{L.trustAutoSent}</div>
<button onClick={()=>setCfoActions(prev=>prev.map(a=>a.id===act.id?{...a,done:false,approved:false,autoSent:false}:a))} style={{background:"none",border:`1px solid ${T.border}`,padding:"4px 10px",borderRadius:100,fontSize:11,color:T.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{L.trustUndo}</button>
</div>
:isDone?
<div style={{fontSize:12,color:done.approved?T.success:T.textMuted,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Ic name={done.approved?"check":"x"} size={12} color={done.approved?T.success:T.textMuted}/>{done.approved?L.cfoSent:L.cfoSkip}</div>
:<div style={{display:"flex",gap:8}}>
<button onClick={()=>handleCfoAction(act.id,true)} style={{...bSP,padding:"6px 14px",fontSize:12}}><Ic name="check" size={12} color="#fff"/> {L.cfoApprove}</button>
<button onClick={()=>handleCfoAction(act.id,false)} style={{...bSO,padding:"6px 14px",fontSize:12}}>{L.cfoSkip}</button>
</div>}
</div>);
})}
</div>
)}
<div style={{fontSize:10,color:m.role==="user"?"rgba(255,255,255,0.6)":T.textFaint,marginTop:6}}>{new Date(m.ts).toLocaleTimeString(lang==="sv"?"sv-SE":"en-US",{hour:"2-digit",minute:"2-digit"})}</div>
</div>
</div>
))}

{arvoThinking&&(
<div style={{display:"flex",alignItems:"center",gap:8,padding:"0 4px",marginBottom:10}}>
<div style={{...avS(32),background:T.accentLight,fontSize:10}}><ArvoLogo size={18}/></div>
<div style={{padding:"12px 16px",borderRadius:"16px 16px 16px 4px",background:T.surfaceAlt,fontSize:14,color:T.textMuted,display:"flex",alignItems:"center",gap:8}}>
<div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:T.accent,opacity:0.4,animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}</div>
{L.heyArvoThinking}
</div>
</div>
)}
<div ref={chatEndRef}/>
</div>)}

{arvoTab==="chat"&&(<div style={{padding:"12px 0 0",borderTop:`1.5px solid ${T.border}`}}>
<div style={{display:"flex",gap:8,alignItems:"center"}}>
<button onClick={isListening?stopListening:startListening} style={{width:48,height:48,borderRadius:"50%",border:"none",background:isListening?T.danger:T.accentGrad,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:isListening?"0 0 0 4px rgba(232,62,62,0.2)":"0 2px 8px rgba(58,125,110,0.3)",animation:isListening?"pulse 1.5s ease-in-out infinite":"none"}}>
<Ic name="mic" size={22} color="#fff"/>
</button>
<div style={{flex:1,position:"relative"}}>
<input style={{...ipS,paddingRight:44}} placeholder={isListening?L.heyArvoListening:L.heyArvoPlaceholder} value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&chatInput.trim()){processArvoMessage(chatInput)}}}/>
{chatInput.trim()&&<button onClick={()=>processArvoMessage(chatInput)} style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",width:32,height:32,borderRadius:"50%",background:T.accentGrad,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="send" size={16} color="#fff"/></button>}
</div>
</div>
{isListening&&<div style={{textAlign:"center",marginTop:8,fontSize:12,color:T.danger,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:T.danger,animation:"pulse 1s ease-in-out infinite"}}/>{L.heyArvoListening}</div>}
</div>)}
</div>
);
};

const renderView=()=>{
switch(view){
case "dashboard": return <DashView />;
case "heyarvo": return <HeyArvoView />;
case "contacts": return <ConView />;
case "projects": return <ProjView />;
case "invoices": return <InvView />;
case "time": return <TimView />;
default: return <DashView />;
}
};

const dashToggles=[{key:"health",label:L.showHealth},{key:"pipeline",label:L.showPipeline},{key:"won",label:L.showWon},{key:"awaiting",label:L.showAwaiting},{key:"weekHours",label:L.showWeekHours},{key:"insights",label:L.showInsights},{key:"forecast",label:L.showForecast},{key:"toDo",label:L.showToDo},{key:"recentInv",label:L.showRecentInv},{key:"activeProj",label:L.showActiveProj}];

return (
<div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{margin:0}input,select,textarea,button{font-family:inherit}::selection{background:${T.accentLight};color:${T.accent}}::-webkit-scrollbar{width:0}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.05)}}select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}option{background:${T.surface};color:${T.text}}`}</style>

  <header style={{position:"fixed",top:0,left:0,right:0,height:58,background:T.surface,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 18px",gap:12,zIndex:100,boxShadow:"0 1px 8px rgba(0,0,0,0.03)"}}>
    <button style={{background:"none",border:"none",cursor:"pointer",padding:6,color:T.textMuted,borderRadius:8}} onClick={()=>setSideOpen(!sideOpen)}><Ic name={sideOpen?"x":"menu"} size={22}/></button>
    <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}><ArvoLogo size={26}/><span style={{fontFamily:serif,fontSize:21,fontWeight:800,color:T.text,letterSpacing:"-0.03em"}}>Arvo</span></div>
    <div style={{display:"flex",gap:5,marginRight:6}}><Flag code="en" active={lang==="en"} onClick={()=>switchLang("en")}/><Flag code="sv" active={lang==="sv"} onClick={()=>switchLang("sv")}/></div>
    <div style={{display:"flex",gap:6}}>{Object.entries(TDOTS).map(([k,c])=>(<button key={k} onClick={()=>setTheme(k)} style={{width:20,height:20,borderRadius:"50%",background:c,border:theme===k?`2.5px solid ${T.text}`:"2px solid transparent",cursor:"pointer",transform:theme===k?"scale(1.15)":"scale(1)",transition:"transform 0.2s",boxShadow:theme===k?`0 0 0 2px ${T.bg},0 0 0 4px ${c}`:"none"}} title={lang==="sv"?THEMES[k].name:THEMES[k].nameEn}/>))}</div>
  </header>

  {sideOpen&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:80}} onClick={()=>setSideOpen(false)}/>}
  <nav style={{position:"fixed",top:56,left:sideOpen?0:-300,width:300,bottom:0,background:T.surface,borderRight:`1.5px solid ${T.border}`,zIndex:90,transition:"left 0.28s cubic-bezier(0.4,0,0.2,1)",overflowY:"auto"}}>
    <div style={{padding:"16px 0 8px"}}>{NAV.map(n=>(<div key={n.id} onClick={()=>go(n.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 24px",cursor:"pointer",color:view===n.id?T.accent:T.textMuted,background:view===n.id?T.accentLight:"transparent",borderRight:view===n.id?`3px solid ${T.accent}`:"3px solid transparent",fontWeight:view===n.id?600:400,fontSize:14}}><Ic name={n.icon} size={20} color={view===n.id?T.accent:T.textMuted}/> {nL(n.id)}</div>))}</div>
    <div style={{height:1,background:T.border,margin:"8px 20px"}}/>
    <div style={{padding:"12px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Ic name="settings" size={16} color={T.textFaint}/><span style={{fontSize:11,fontWeight:600,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.12em"}}>{L.customize}</span></div>
      <div style={{marginBottom:16}}><div style={{fontSize:12,color:T.textMuted,marginBottom:8,fontWeight:500}}>{L.theme}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Object.entries(THEMES).map(([k,th])=>(<button key={k} onClick={()=>setTheme(k)} style={{padding:"5px 12px",borderRadius:8,fontSize:12,fontWeight:theme===k?600:400,border:theme===k?`2px solid ${TDOTS[k]}`:`1.5px solid ${T.border}`,background:theme===k?T.accentLight:"transparent",color:theme===k?TDOTS[k]:T.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{lang==="sv"?th.name:th.nameEn}</button>))}</div></div>
      <div style={{marginBottom:16}}><div style={{fontSize:12,color:T.textMuted,marginBottom:8,fontWeight:500}}>{L.currency}</div><div style={{display:"flex",gap:6}}>{Object.keys(CURRENCIES).map(c=>(<button key={c} onClick={()=>setCurrency(c)} style={{padding:"5px 12px",borderRadius:8,fontSize:12,fontWeight:currency===c?600:400,border:currency===c?`2px solid ${T.accent}`:`1.5px solid ${T.border}`,background:currency===c?T.accentLight:"transparent",color:currency===c?T.accent:T.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{c}</button>))}</div></div>
      <div style={{marginBottom:16}}><div style={{fontSize:12,color:T.textMuted,marginBottom:8,fontWeight:500}}>{L.autopilot}</div><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 0"}}><span style={{fontSize:13,color:T.textSub}}>{L.autoReminders}</span><Toggle on={autoReminders} onToggle={()=>setAutoReminders(!autoReminders)}/></div></div>
      <div><div style={{fontSize:12,color:T.textMuted,marginBottom:10,fontWeight:500}}>{L.dashboardCards}</div>{dashToggles.map(it=>(<div key={it.key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0"}}><span style={{fontSize:13,color:T.textSub}}>{it.label}</span><Toggle on={dash[it.key]} onToggle={()=>setDash(prev=>({...prev,[it.key]:!prev[it.key]}))}/></div>))}</div>
    </div>
    <div style={{padding:"16px 20px",borderTop:`1px solid ${T.border}`,marginTop:8}}><div style={{fontSize:11,color:T.textFaint,lineHeight:1.5}}>Arvo AI CFO<br/>{lang==="sv"?"Ser kassakrisen innan du gör det.":"Sees the cash crunch before you do."}</div></div>
  </nav>

  <main style={{paddingTop:76,paddingBottom:88,paddingLeft:20,paddingRight:20,maxWidth:640,margin:"0 auto"}}>
    <div style={{animation:"fadeUp 0.3s ease"}} key={view+lang+currency+(detail?.data?.id||"")}>{renderView()}</div>
  </main>

  <nav style={{position:"fixed",bottom:0,left:0,right:0,height:68,background:T.surface,borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-around",zIndex:100,boxShadow:"0 -1px 8px rgba(0,0,0,0.03)"}}>
    {NAV.map(n=>{const active=view===n.id;const isArvo=n.id==="heyarvo";return (<button key={n.id} onClick={()=>go(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:isArvo?2:3,padding:"6px 8px",background:"none",border:"none",cursor:"pointer",color:active?T.accent:T.textFaint,fontSize:10,fontWeight:active?600:400,fontFamily:"inherit",position:"relative"}}>{active&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",width:24,height:3,borderRadius:2,background:T.accent}}/>}{isArvo?<div style={{width:32,height:32,borderRadius:"50%",background:active?T.accentGrad:T.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",border:active?"none":`1px solid ${T.border}`,transition:"all 0.2s"}}><Ic name="arvo" size={16} color={active?"#fff":T.textFaint}/></div>:<Ic name={n.icon} size={22} color={active?T.accent:T.textFaint}/>}<span>{nL(n.id)}</span></button>)})}
  </nav>

  <ModalView/>

  {/* ── CONCIERGE DRAFT MODAL (fake button reveal) ── */}
  {conciergeActingOn&&(<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(20,28,30,0.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"20px 16px",animation:"fadeUp 0.25s ease"}} onClick={()=>{setConciergeActingOn(null);if(actionClickCount===1)setPriceModalOpen(true)}}>
    <div onClick={e=>e.stopPropagation()} style={{background:T.cardBg,borderRadius:20,maxWidth:480,width:"100%",maxHeight:"85vh",overflowY:"auto",boxShadow:"0 -8px 32px rgba(0,0,0,0.18)"}}>
      <div style={{padding:"22px 22px 16px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic name="check" size={18} color={T.accent}/></div>
            <div>
              <div style={{fontFamily:serif,fontSize:18,fontWeight:700,color:T.text,letterSpacing:"-0.01em"}}>{L.cmDraftTitle}</div>
              <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>{conciergeActingOn.client} · {fmtMoney(conciergeActingOn.amount)}</div>
            </div>
          </div>
          <button onClick={()=>{setConciergeActingOn(null);if(actionClickCount===1)setPriceModalOpen(true)}} style={{background:"none",border:"none",cursor:"pointer",padding:6,color:T.textFaint}}><Ic name="x" size={18}/></button>
        </div>
        <div style={{fontSize:12,color:T.textMuted,lineHeight:1.55}}>{L.cmDraftSub}</div>
      </div>

      <div style={{padding:"18px 22px"}}>
        <div style={{padding:"16px 18px",background:T.surfaceAlt,borderRadius:12,fontSize:13,color:T.text,lineHeight:1.65,whiteSpace:"pre-line",fontFamily:"inherit",border:`1px solid ${T.border}`,marginBottom:14}}>
          {conciergeActingOn.draft}
        </div>

        <button onClick={()=>handleCopyDraft(conciergeActingOn.draft)} style={{width:"100%",padding:"13px 18px",background:copiedFlash?T.success:T.accentGrad,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 2px 8px rgba(42,109,94,0.22)",transition:"background 0.2s"}}>
          <Ic name={copiedFlash?"check":"tag"} size={16} color="#fff"/>
          {copiedFlash?L.cmCopied:L.cmCopy}
        </button>

        {/* Beta reveal — transparent honesty */}
        <div style={{marginTop:14,padding:"12px 14px",background:T.warnLight,borderRadius:10,border:`1px solid ${T.warn}30`}}>
          <div style={{fontSize:11,fontWeight:600,color:T.warn,marginBottom:6,display:"flex",alignItems:"center",gap:6}}><Ic name="alert" size={12} color={T.warn}/>BETA</div>
          <div style={{fontSize:12,color:T.textSub,lineHeight:1.55,marginBottom:10}}>{L.cmBetaNote}</div>
          <button onClick={()=>{setConciergeActingOn(null);setPriceModalOpen(true)}} style={{padding:"7px 14px",background:"#fff",border:`1px solid ${T.warn}`,color:T.warn,borderRadius:100,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:6}}>
            <Ic name="zap" size={12} color={T.warn}/>{L.cmWantAuto}
          </button>
        </div>
      </div>
    </div>
  </div>)}

  {/* ── ONBOARDING TOUR — first-visit welcome ── */}
  {showOnboarding&&view==="heyarvo"&&arvoTab==="analysis"&&conciergeStep==="idle"&&(
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(20,28,30,0.65)",zIndex:210,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",animation:"fadeUp 0.35s ease"}} onClick={()=>dismissOnboarding(false)}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.cardBg,borderRadius:22,maxWidth:460,width:"100%",overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,0.32)"}}>
        <div style={{background:T.accentGrad,padding:"26px 24px 22px",color:"#fff",textAlign:"center"}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,0.22)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
            <ArvoLogo size={32}/>
          </div>
          <div style={{fontFamily:serif,fontSize:23,fontWeight:700,letterSpacing:"-0.02em",marginBottom:5}}>{L.onbTitle}</div>
          <div style={{fontSize:13,opacity:0.9,lineHeight:1.55}}>{L.onbSub}</div>
        </div>
        <div style={{padding:"20px 22px 8px"}}>
          {[{num:1,t:L.onbStep1,d:L.onbStep1Desc,ic:"invoices"},{num:2,t:L.onbStep2,d:L.onbStep2Desc,ic:"sparkles"},{num:3,t:L.onbStep3,d:L.onbStep3Desc,ic:"send"}].map((s)=>(
            <div key={s.num} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"12px 0",borderBottom:s.num<3?`1px solid ${T.border}`:"none"}}>
              <div style={{width:34,height:34,borderRadius:10,background:T.accentLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
                <Ic name={s.ic} size={16} color={T.accent}/>
                <div style={{position:"absolute",top:-5,right:-5,width:18,height:18,borderRadius:"50%",background:T.accent,color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${T.cardBg}`}}>{s.num}</div>
              </div>
              <div style={{flex:1,paddingTop:2}}>
                <div style={{fontSize:13,fontWeight:700,color:T.text,lineHeight:1.4,marginBottom:3}}>{s.t}</div>
                <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"14px 22px 22px",display:"flex",flexDirection:"column",gap:8}}>
          <button onClick={()=>dismissOnboarding(true)} style={{padding:"14px 18px",background:T.accentGrad,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 3px 10px rgba(42,109,94,0.25)"}}>
            <Ic name="zap" size={15} color="#fff"/>{L.onbCTA}
          </button>
          <button onClick={()=>dismissOnboarding(false)} style={{padding:"11px 18px",background:"transparent",color:T.textSub,border:`1px solid ${T.border}`,borderRadius:12,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>
            {L.onbSkip}
          </button>
        </div>
      </div>
    </div>
  )}

  {/* ── PRICE VALIDATION MODAL (moment of truth) ── */}
  {priceModalOpen&&(<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(20,28,30,0.55)",zIndex:201,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",animation:"fadeUp 0.3s ease"}} onClick={()=>setPriceModalOpen(false)}>
    <div onClick={e=>e.stopPropagation()} style={{background:T.cardBg,borderRadius:20,maxWidth:440,width:"100%",overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
      {priceVote===null?(<>
        <div style={{background:T.accentGrad,padding:"24px 22px 18px",color:"#fff",textAlign:"center"}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
            <Ic name="trendUp" size={24} color="#fff"/>
          </div>
          <div style={{fontFamily:serif,fontSize:20,fontWeight:700,letterSpacing:"-0.01em",marginBottom:6}}>{L.cmPriceTitle}</div>
          <div style={{fontSize:13,opacity:0.9,lineHeight:1.55}}>{L.cmPriceBody}</div>
        </div>
        <div style={{padding:"20px 22px"}}>
          <div style={{textAlign:"center",fontFamily:serif,fontSize:18,fontWeight:600,color:T.text,marginBottom:16,letterSpacing:"-0.01em"}}>{L.cmPriceQ}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={()=>handlePriceVote("yes")} style={{padding:"13px 18px",background:T.accent,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Ic name="check" size={16} color="#fff"/>{L.cmPriceYes}
            </button>
            <button onClick={()=>handlePriceVote("maybe")} style={{padding:"13px 18px",background:"transparent",color:T.textSub,border:`1px solid ${T.border}`,borderRadius:12,fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>
              {L.cmPriceMaybe}
            </button>
            <button onClick={()=>handlePriceVote("no")} style={{padding:"11px 18px",background:"transparent",color:T.textFaint,border:"none",borderRadius:12,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>
              {L.cmPriceNo}
            </button>
          </div>
        </div>
      </>):(<div style={{padding:"36px 24px 28px",textAlign:"center"}}>
        <div style={{width:60,height:60,borderRadius:"50%",background:T.successLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}>
          <Ic name="check" size={26} color={T.success}/>
        </div>
        <div style={{fontFamily:serif,fontSize:20,fontWeight:700,color:T.text,marginBottom:8,letterSpacing:"-0.01em"}}>{L.cmPriceThanks}</div>
        <button onClick={()=>setPriceModalOpen(false)} style={{marginTop:14,padding:"11px 24px",background:T.accent,color:"#fff",border:"none",borderRadius:100,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{L.cmCloseDraft}</button>
      </div>)}
    </div>
  </div>)}
</div>
);
}
