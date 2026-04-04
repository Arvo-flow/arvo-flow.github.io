import { useState, useEffect, useRef } from "react";

const LANG = {
sv: {
overview:"Översikt",contacts:"Kontakter",projects:"Projekt",invoices:"Fakturor",time:"Tid",
dashTitle:"Din verksamhet just nu",dashSub:"Här ser du helheten — vad som går bra, vad som behöver din uppmärksamhet och vad som väntar.",
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
},
en: {
overview:"Overview",contacts:"Contacts",projects:"Projects",invoices:"Invoices",time:"Time",
dashTitle:"Your business right now",dashSub:"See the full picture — what's going well, what needs attention, and what's coming up.",
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
},
};

const CURRENCIES = { SEK:{symbol:"kr",rate:1,suffix:true},USD:{symbol:"$",rate:0.091,suffix:false},EUR:{symbol:"€",rate:0.084,suffix:false},GBP:{symbol:"£",rate:0.072,suffix:false} };
const THEMES = {
light:{name:"Ljus",nameEn:"Light",bg:"#ffffff",surface:"#ffffff",surfaceAlt:"#fafafa",border:"#e8e8e8",borderAccent:"#3a7d6e",text:"#1a1a1a",textSub:"#555550",textMuted:"#8a8780",textFaint:"#b0ada5",accent:"#3a7d6e",accentDark:"#2c5f54",accentLight:"#e8f2ef",accentGrad:"linear-gradient(135deg,#3a7d6e,#2c5f54)",danger:"#b83030",dangerLight:"#fdf0f0",success:"#2e7d4f",successLight:"#eef7f1",warn:"#c48820",warnLight:"#fdf6e8",cardBg:"#fff",cardBorder:"#e8e8e8",avatarBg:"#e0efeb",avatarText:"#3a7d6e",inputBg:"#f8f8f8",tagBg:"#f2f2f2",shadow:"0 1px 4px rgba(0,0,0,0.04)"},
dark:{name:"Mörk",nameEn:"Dark",bg:"#111110",surface:"#1a1a18",surfaceAlt:"#222220",border:"#2e2e2a",borderAccent:"#4a9a88",text:"#e8e5df",textSub:"#aaa8a0",textMuted:"#787570",textFaint:"#4a4840",accent:"#4a9a88",accentDark:"#3a7d6e",accentLight:"rgba(74,154,136,0.12)",accentGrad:"linear-gradient(135deg,#4a9a88,#3a7d6e)",danger:"#d45050",dangerLight:"rgba(212,80,80,0.12)",success:"#4aaa6a",successLight:"rgba(74,170,106,0.12)",warn:"#d4a030",warnLight:"rgba(212,160,48,0.12)",cardBg:"#1a1a18",cardBorder:"#2e2e2a",avatarBg:"rgba(74,154,136,0.15)",avatarText:"#4a9a88",inputBg:"#161614",tagBg:"#252522",shadow:"0 1px 4px rgba(0,0,0,0.3)"},
nordic:{name:"Nordic",nameEn:"Nordic",bg:"#171e2a",surface:"#1c2436",surfaceAlt:"#212a40",border:"#2a3450",borderAccent:"#5a9ec8",text:"#dce4f0",textSub:"#98a8c0",textMuted:"#6880a0",textFaint:"#3e5070",accent:"#5a9ec8",accentDark:"#4888b0",accentLight:"rgba(90,158,200,0.12)",accentGrad:"linear-gradient(135deg,#5a9ec8,#4888b0)",danger:"#d06060",dangerLight:"rgba(208,96,96,0.12)",success:"#50b080",successLight:"rgba(80,176,128,0.12)",warn:"#d0a040",warnLight:"rgba(208,160,64,0.12)",cardBg:"#1c2436",cardBorder:"#2a3450",avatarBg:"rgba(90,158,200,0.15)",avatarText:"#5a9ec8",inputBg:"#151c28",tagBg:"#222c42",shadow:"0 1px 4px rgba(0,0,0,0.3)"},
moss:{name:"Moss",nameEn:"Moss",bg:"#161c16",surface:"#1c241c",surfaceAlt:"#202a20",border:"#2a362a",borderAccent:"#6aaa60",text:"#d8e0d4",textSub:"#98a890",textMuted:"#688060",textFaint:"#3e5038",accent:"#6aaa60",accentDark:"#589050",accentLight:"rgba(106,170,96,0.12)",accentGrad:"linear-gradient(135deg,#6aaa60,#589050)",danger:"#c85050",dangerLight:"rgba(200,80,80,0.12)",success:"#5aaa60",successLight:"rgba(90,170,96,0.12)",warn:"#c8a040",warnLight:"rgba(200,160,64,0.12)",cardBg:"#1c241c",cardBorder:"#2a362a",avatarBg:"rgba(106,170,96,0.15)",avatarText:"#6aaa60",inputBg:"#141a14",tagBg:"#243024",shadow:"0 1px 4px rgba(0,0,0,0.3)"},
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
const [view,setView]=useState("dashboard");
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
const [forecastOpen,setForecastOpen]=useState(false);
const [autoReminders,setAutoReminders]=useState(true);
const [dash,setDash]=useState({pipeline:true,won:true,awaiting:true,weekHours:true,toDo:true,recentInv:true,activeProj:true,insights:true,forecast:true,health:true,digest:true});
const [scanState,setScanState]=useState("idle");
const [scanResult,setScanResult]=useState(null);
const [scanPreview,setScanPreview]=useState(null);
const [contacts,setContacts]=useState(INIT_CONTACTS);
const [projects,setProjects]=useState(INIT_PROJECTS);
const [invoices,setInvoices]=useState(INIT_INVOICES);
const [timeEntries,setTimeEntries]=useState(INIT_TIME_ENTRIES);
const [formData,setFormData]=useState({});
const tRef=useRef(null);
const fileRef=useRef(null);
const T=THEMES[theme], L=LANG[lang], CU=CURRENCIES[currency];
const serif="'Playfair Display',Georgia,serif";
const switchLang=l=>{setLang(l);setCurrency(l==="sv"?"SEK":"USD")};

useEffect(()=>{if(timerOn){tRef.current=setInterval(()=>setTimerSec(s=>s+1),1000)}else clearInterval(tRef.current);return()=>clearInterval(tRef.current)},[timerOn]);

const fmtT=s=>`${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const ini=n=>n.split(" ").map(w=>w[0]).join("");
const go=v=>{setView(v);setDetail(null);setSideOpen(false);setSearch("")};
const fmtMoney=sek=>{const v=Math.round(sek*CU.rate);const f=new Intl.NumberFormat(lang==="sv"?"sv-SE":"en-US").format(v);return CU.suffix?`${f} ${CU.symbol}`:`${CU.symbol}${f}`};
const sLabel=s=>{if(lang==="sv")return s;return{Kund:"Customer",Lead:"Lead",Prospekt:"Prospect","Pågående":"Ongoing",Planering:"Planning",Avslutad:"Completed",Betald:"Paid",Skickad:"Sent","Förfallen":"Overdue",Utkast:"Draft"}[s]||s};

const card={background:T.cardBg,border:`1.5px solid ${T.cardBorder}`,borderRadius:14,padding:18,marginBottom:14,boxShadow:T.shadow};
const cardA=c=>({...card,borderLeft:`3px solid ${c||T.borderAccent}`});
const sCard={...card,padding:"18px 16px"};
const hd={fontFamily:serif,fontWeight:700,fontSize:26,color:T.text,lineHeight:1.2,letterSpacing:"-0.02em"};
const subS={fontSize:14,color:T.textSub,lineHeight:1.5,marginTop:6,marginBottom:22};
const secS={fontFamily:serif,fontWeight:700,fontSize:15,color:T.accent,marginBottom:12};
const badgeS=(co,bgc)=>({display:"inline-block",padding:"3px 10px",borderRadius:100,fontSize:11,fontWeight:600,color:co,background:bgc});
const avS=(sz=40)=>({width:sz,height:sz,borderRadius:"50%",background:T.avatarBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*0.35,fontWeight:700,color:T.avatarText,flexShrink:0});
const ipS={width:"100%",padding:"11px 14px",background:T.inputBg,border:`1.5px solid ${T.border}`,borderRadius:10,color:T.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};
const bP={padding:"12px 24px",background:T.accentGrad,color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit"};
const bO={padding:"12px 24px",background:"transparent",color:T.textSub,border:`1.5px solid ${T.border}`,borderRadius:10,fontSize:14,fontWeight:500,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,fontFamily:"inherit"};
const bSP={...bP,padding:"8px 16px",fontSize:13};
const bSO={...bO,padding:"8px 16px",fontSize:13};
const lr={padding:"14px 16px",cursor:"pointer"};
const fB=a=>({padding:"6px 14px",borderRadius:100,fontSize:12,fontWeight:a?600:400,border:a?`1.5px solid ${T.accent}`:`1.5px solid ${T.border}`,background:a?T.accentLight:"transparent",color:a?T.accent:T.textMuted,cursor:"pointer",fontFamily:"inherit"});
const progBar={height:5,borderRadius:3,background:T.border,overflow:"hidden"};
const progFill=(pct,clr)=>({height:"100%",width:`${pct}%`,background:clr||T.accent,borderRadius:3,transition:"width 0.5s"});
const bigNum=clr=>({fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:32,fontWeight:300,color:clr,letterSpacing:"-0.01em",lineHeight:1.1});

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
zap:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
trendUp:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
alert:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
thermometer:<><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></>,
};
return <svg {...p}>{d[name]}</svg>;
};

const NAV=[{id:"dashboard",icon:"overview"},{id:"contacts",icon:"contacts"},{id:"projects",icon:"projects"},{id:"invoices",icon:"invoices"},{id:"time",icon:"time"}];
const nL=id=>({dashboard:L.overview,contacts:L.contacts,projects:L.projects,invoices:L.invoices,time:L.time}[id]);
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
const hColor=hScore>=75?T.success:hScore>=50?T.warn:T.danger;
const hBg=hScore>=75?T.successLight:hScore>=50?T.warnLight:T.dangerLight;
const visStats=[
  dash.pipeline&&{label:L.pipeline,value:fmtMoney(pipe),color:T.accentDark,bc:T.borderAccent},
  dash.won&&{label:L.won,value:fmtMoney(wonAmt),color:T.accentDark,bc:T.borderAccent},
  dash.awaiting&&{label:L.awaitingPayment,value:fmtMoney(pendAmt),color:pendAmt>0?T.danger:T.accentDark,bc:pendAmt>0?T.danger:T.borderAccent},
  dash.weekHours&&{label:L.loggedWeek,value:`${wH}h`,color:T.accentDark,bc:T.borderAccent},
].filter(Boolean);

return (
  <div>
    <h1 style={hd}>{L.dashTitle}</h1>
    <p style={subS}>{L.dashSub}</p>
    {dash.health&&(<div style={{...card,borderColor:hColor,cursor:"pointer"}} onClick={()=>setHealthOpen(!healthOpen)}>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:hBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontFamily:serif,fontSize:24,fontWeight:700,color:hColor}}>{hScore}</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600,color:T.text}}>{L.healthLabel}</div>
          <div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{hScore>=75?(lang==="sv"?"Verksamheten mår bra!":"Business is healthy!"):(hScore>=50?(lang==="sv"?"Behöver uppmärksamhet":"Needs attention"):(lang==="sv"?"Kräver åtgärd nu":"Requires action now"))}</div>
        </div>
        <Ic name={healthOpen?"up":"down"} size={18} color={T.textFaint}/>
      </div>
      {healthOpen&&(<div style={{marginTop:16,borderTop:`1px solid ${T.border}`,paddingTop:14}}>
        <div style={{fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:10}}>{L.healthDetail}</div>
        {factors.map((f,i)=>{
          const barColor=f.impact==="boost"?T.success:f.impact==="drag"?T.danger:T.warn;
          const impactLabel=f.impact==="boost"?L.boosts:f.impact==="drag"?L.drags:L.neutral;
          return (<div key={i} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
              <span style={{color:T.textSub}}>{f.label}</span>
              <span style={{color:barColor,fontWeight:600,fontSize:11}}>{impactLabel} · {f.value}/{f.max}</span>
            </div>
            <div style={progBar}><div style={progFill(Math.round((f.value/f.max)*100),barColor)}/></div>
          </div>)
        })}
      </div>)}
    </div>)}
    {visStats.length>0&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
      {visStats.map((s,i)=>(<div key={i} style={{...sCard,borderColor:s.bc}}><div style={{fontSize:12,color:T.textSub,marginBottom:10,fontWeight:500}}>{s.label}</div><div style={bigNum(s.color)}>{s.value}</div></div>))}
    </div>)}
    {dash.digest&&(<div style={{...card,borderColor:T.accent,background:T.accentLight}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <Ic name="zap" size={16} color={T.accent}/>
        <span style={{fontFamily:serif,fontWeight:700,fontSize:14,color:T.accent}}>{L.weekDigest}</span>
      </div>
      <div style={{fontSize:13,color:T.textSub,lineHeight:1.6}}>
        {L.weekDigestBody.replace("{hours}",wH.toString()).replace("{active}",actP.length.toString()).replace("{pipeline}",fmtMoney(pipe)).replace("{action}",ins.length>0?(lang==="sv"?`${ins.length} saker behöver din uppmärksamhet.`:`${ins.length} items need your attention.`):(lang==="sv"?"Allt ser bra ut!":"Everything looks good!"))}
      </div>
      {autoReminders&&(<div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,fontSize:11,color:T.accent}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:T.success}}/>
        {L.autopilot}: {L.autoReminders} {L.autoOn}
      </div>)}
    </div>)}
    {dash.insights&&ins.length>0&&(<>
      <div style={{display:"flex",alignItems:"center",gap:8,...secS}}><Ic name="zap" size={16} color={T.accent}/>{L.insights}</div>
      {ins.map((insItem,i)=>{const iC=insItem.type==="danger"?T.danger:insItem.type==="warning"?T.warn:T.accent;const iB=insItem.type==="danger"?T.dangerLight:insItem.type==="warning"?T.warnLight:T.accentLight;return (<div key={i} style={cardA(iC)}>
        <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{width:32,height:32,borderRadius:8,background:iB,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><Ic name={insItem.icon} size={16} color={iC}/></div>
          <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14,color:T.text,marginBottom:4}}>{insItem.title}</div><div style={{fontSize:13,color:T.textMuted,lineHeight:1.5}}>{insItem.body}</div>
            <button style={{...bSO,marginTop:10,borderColor:iC,color:iC,padding:"6px 14px",fontSize:12}} onClick={insItem.action}>{insItem.actionLabel} →</button>
          </div>
        </div>
      </div>)})}
    </>)}
    {dash.forecast&&(<>
      <div style={{display:"flex",alignItems:"center",gap:8,...secS,marginTop:8,cursor:"pointer"}} onClick={()=>setForecastOpen(!forecastOpen)}>
        <Ic name="trendUp" size={16} color={T.accent}/>{L.forecastTitle}
        <Ic name={forecastOpen?"up":"down"} size={14} color={T.textFaint}/>
      </div>
      <div style={{...card,borderColor:T.borderAccent}}>
        <div style={{textAlign:"center",padding:"12px 0 16px",borderBottom:`1px solid ${T.border}`,marginBottom:14}}>
          <div style={{fontSize:11,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{L.expected}</div>
          <div style={bigNum(T.accent)}>{fmtMoney(fc.expected)}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{l:L.winRate,v:`${fc.winRate}%`},{l:L.avgDeal,v:fmtMoney(fc.avgDeal)},{l:"Pipeline",v:fmtMoney(fc.pipeLine)}].map((st,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:600,fontFamily:serif,color:T.text}}>{st.v}</div><div style={{fontSize:10,color:T.textFaint,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:2}}>{st.l}</div></div>))}
        </div>
        {forecastOpen&&(<div style={{marginTop:16,borderTop:`1px solid ${T.border}`,paddingTop:14}}>
          <div style={{fontSize:12,fontWeight:600,color:T.textMuted,marginBottom:12}}>{lang==="sv"?"Scenarioanalys":"Scenario Analysis"}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{l:L.bestCase,v:fmtMoney(fc.bestCase),c:T.success,pct:85},{l:L.expected,v:fmtMoney(fc.expected),c:T.accent,pct:fc.winRate},{l:L.worstCase,v:fmtMoney(fc.worstCase),c:T.danger,pct:Math.round(fc.winRate*0.5)}].map((sc,i)=>(<div key={i}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                <span style={{color:T.textSub}}>{sc.l}</span>
                <span style={{fontWeight:600,color:sc.c}}>{sc.v}</span>
              </div>
              <div style={progBar}><div style={progFill(sc.pct,sc.c)}/></div>
            </div>))}
          </div>
          <div style={{marginTop:14,fontSize:12,color:T.textMuted,lineHeight:1.6,padding:12,background:T.surfaceAlt,borderRadius:8}}>
            {lang==="sv"
              ?`Prognosen baseras på ${fc.winRate}% win-rate (${invoices.filter(i=>i.status==="Betald").length} av ${invoices.length} affärer) multiplicerat med ${fmtMoney(fc.pipeLine)} i aktiv pipeline. Bästa fall antar 85% konvertering.`
              :`Forecast based on ${fc.winRate}% win rate (${invoices.filter(i=>i.status==="Betald").length} of ${invoices.length} deals) × ${fmtMoney(fc.pipeLine)} active pipeline. Best case assumes 85% conversion.`}
          </div>
        </div>)}
      </div>
    </>)}
    {dash.toDo&&odC.length>0&&(<div style={cardA(T.danger)}>
      <div style={{...secS,color:T.danger}}>{L.toDo}</div>
      {odC.map((c,i)=>(<div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<odC.length-1?`1px solid ${T.border}`:"none",cursor:"pointer"}} onClick={()=>{setDetail({type:"contact",data:c});setView("contacts")}}>
        <div style={avS(42)}>{ini(c.name)}</div>
        <TempDot contact={c}/>
        <div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{c.name}</div><div style={{fontSize:12,color:T.textMuted}}>{c.company}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:T.danger}}>{c.daysSince} {L.daysSince}</div><div style={{fontSize:11,color:T.textMuted}}>{L.sinceContact}</div></div>
      </div>))}
    </div>)}
    {dash.recentInv&&(<><div style={{...secS,marginTop:8}}>{L.recentInvoices}</div><div style={{...card,padding:0,overflow:"hidden"}}>
      {recInv.map((inv,i)=>(<div key={inv.id} style={{...lr,borderBottom:i<recInv.length-1?`1px solid ${T.border}`:"none"}} onClick={()=>go("invoices")}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontWeight:600,fontSize:14}}>{inv.id}</span><Badge status={inv.status}/></div><div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{inv.client}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:15,fontFamily:serif}}>{fmtMoney(inv.amount)}</div><div style={{fontSize:11,color:T.textFaint}}>{L.dueDate} {inv.due}</div></div>
        </div>
      </div>))}
    </div></>)}
    {dash.activeProj&&(<><div style={{...secS,marginTop:8}}>{L.activeProjects}</div>
      {actP.map(p=>(<div key={p.id} style={card} onClick={()=>{setDetail({type:"project",data:p});setView("projects")}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div><div style={{fontWeight:600,fontSize:14}}>{p.name}</div><div style={{fontSize:12,color:T.textMuted}}>{p.client}</div></div><Badge status={p.status}/></div>
        <div style={progBar}><div style={progFill(p.progress)}/></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:11,color:T.textFaint}}><span>{p.progress}% {L.complete}</span><span>{p.deadline}</span></div>
      </div>))}
    </>)}
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

const renderView=()=>{
switch(view){
case "dashboard": return <DashView />;
case "contacts": return <ConView />;
case "projects": return <ProjView />;
case "invoices": return <InvView />;
case "time": return <TimView />;
default: return <DashView />;
}
};

const dashToggles=[{key:"health",label:L.showHealth},{key:"pipeline",label:L.showPipeline},{key:"won",label:L.showWon},{key:"awaiting",label:L.showAwaiting},{key:"weekHours",label:L.showWeekHours},{key:"digest",label:L.showDigest},{key:"insights",label:L.showInsights},{key:"forecast",label:L.showForecast},{key:"toDo",label:L.showToDo},{key:"recentInv",label:L.showRecentInv},{key:"activeProj",label:L.showActiveProj}];

return (
<div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",fontSize:14,lineHeight:1.5}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{margin:0}input,select,textarea,button{font-family:inherit}::selection{background:${T.accentLight};color:${T.accent}}::-webkit-scrollbar{width:0}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}option{background:${T.surface};color:${T.text}}`}</style>

  <header style={{position:"fixed",top:0,left:0,right:0,height:56,background:T.surface,borderBottom:`1.5px solid ${T.border}`,display:"flex",alignItems:"center",padding:"0 16px",gap:10,zIndex:100}}>
    <button style={{background:"none",border:"none",cursor:"pointer",padding:6,color:T.textMuted}} onClick={()=>setSideOpen(!sideOpen)}><Ic name={sideOpen?"x":"menu"} size={22}/></button>
    <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}><ArvoLogo size={24}/><span style={{fontFamily:serif,fontSize:20,fontWeight:700,color:T.text,letterSpacing:"-0.02em"}}>Arvo</span></div>
    <div style={{display:"flex",gap:4,marginRight:4}}><Flag code="en" active={lang==="en"} onClick={()=>switchLang("en")}/><Flag code="sv" active={lang==="sv"} onClick={()=>switchLang("sv")}/></div>
    <div style={{display:"flex",gap:5}}>{Object.entries(TDOTS).map(([k,c])=>(<button key={k} onClick={()=>setTheme(k)} style={{width:18,height:18,borderRadius:"50%",background:c,border:theme===k?`2.5px solid ${T.text}`:"2px solid transparent",cursor:"pointer",transform:theme===k?"scale(1.2)":"scale(1)",boxShadow:theme===k?`0 0 0 1px ${c}`:"none"}} title={lang==="sv"?THEMES[k].name:THEMES[k].nameEn}/>))}</div>
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
    <div style={{padding:"16px 20px",borderTop:`1px solid ${T.border}`,marginTop:8}}><div style={{fontSize:11,color:T.textFaint,lineHeight:1.5}}>Arvo OS v3<br/>The OS for independents.</div></div>
  </nav>

  <main style={{paddingTop:72,paddingBottom:80,paddingLeft:18,paddingRight:18,maxWidth:640,margin:"0 auto"}}>
    <div style={{animation:"fadeUp 0.3s ease"}} key={view+lang+currency+(detail?.data?.id||"")}>{renderView()}</div>
  </main>

  <nav style={{position:"fixed",bottom:0,left:0,right:0,height:64,background:T.surface,borderTop:`1.5px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-around",zIndex:100}}>
    {NAV.map(n=>{const active=view===n.id;return (<button key={n.id} onClick={()=>go(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 12px",background:"none",border:"none",cursor:"pointer",color:active?T.accent:T.textFaint,fontSize:10,fontWeight:active?600:400,fontFamily:"inherit",position:"relative"}}>{active&&<div style={{position:"absolute",top:-2,left:"50%",transform:"translateX(-50%)",width:22,height:3,borderRadius:2,background:T.accent}}/>}<Ic name={n.icon} size={22} color={active?T.accent:T.textFaint}/><span>{nL(n.id)}</span></button>)})}
  </nav>

  <ModalView/>
</div>
);
}
