// src/pages/Landing/styles.js — v5 "dossiern på skrivbordet" (grundarbeslut 2026-07-12).
// Dramaturgin: ljust löfte → mörk dossier (01 Avslöjandet · 02 Arvo-kontoret) → keyline-steg →
// pris → FAQ → sista ordet. Rörelse som TELEMETRI, aldrig dekor (regel 6 + prefers-reduced-motion).
// Föregående sida arkiverad: src/pages/LandingJuli26 (+ git-tagg landing-juli-26).
import styled, { css } from 'styled-components';
import theme from '../../theme';

const MONO = theme.font.mono;
const SERIF = theme.font.display;
const D = theme.dossier;

/* ── Rörelselagret: allt inträder när det observeras, inget rör sig för den som bett om ro ── */
const riseIn = css`
  opacity: 0; transform: translateY(22px);
  transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
  &.inview { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`;

export const Page = styled.main`
  background: ${theme.color.bg};
  color: ${theme.color.ink};
  overflow-x: hidden;
`;

/* ═══ HERO ═══ */
export const Hero = styled.section`
  max-width: 920px; margin: 0 auto; text-align: center;
  padding: 96px 24px 84px;
  @media (max-width: 640px) { padding: 64px 20px 60px; }

  .eyebrow {
    font-family: ${MONO}; font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
    color: ${theme.color.brand};
    ${riseIn}
  }
  h1 {
    font-family: ${SERIF}; font-weight: 500; letter-spacing: -.015em;
    font-size: clamp(42px, 7.2vw, 76px); line-height: 1.05;
    margin: 30px 0 0;
    em { font-style: italic; color: ${theme.color.brand}; }
    ${riseIn} transition-delay: .08s;
  }
  .lede {
    font-size: 16.5px; line-height: 1.75; color: ${theme.color.mutedSoft};
    max-width: 540px; margin: 30px auto 0;
    ${riseIn} transition-delay: .16s;
  }
  .actions { margin-top: 40px; ${riseIn} transition-delay: .24s; }
  .cta {
    display: inline-block; cursor: pointer; border: none; font-family: inherit;
    font-size: 15px; font-weight: 600; color: ${theme.color.surface}; padding: 17px 40px;
    border-radius: ${theme.size.radius.pill};
    background: ${theme.color.brandGradient};
    box-shadow: 0 16px 44px rgba(27,122,110,.30);
    transition: transform .18s ease, box-shadow .18s ease;
    &:hover { transform: translateY(-1px); box-shadow: 0 20px 52px rgba(27,122,110,.38); }
  }
  .sub {
    font-size: 12.5px; color: ${theme.color.mutedSoft}; margin-top: 15px;
    a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  }
  .proof {
    font-family: ${MONO}; font-size: 9.5px; letter-spacing: .22em; text-transform: uppercase;
    color: ${theme.color.mutedSoft}; margin-top: 50px;
    ${riseIn} transition-delay: .32s;
    @media (max-width: 640px) { line-height: 2.1; }
  }
`;

/* ═══ DOSSIERN — det mörka föremålet på skrivbordet ═══ */
export const DossierShell = styled.div`
  max-width: 1120px; margin: 0 auto; padding: 0 20px;
`;
export const Dossier = styled.section`
  background: ${D.bg};
  border-radius: 30px;
  position: relative; overflow: hidden;
  box-shadow: 0 60px 140px rgba(8,15,13,.38);
  padding: 72px 34px 88px;
  @media (max-width: 640px) { padding: 52px 20px 64px; border-radius: 22px; }

  /* Dossiern läggs på bordet: fade + lyft + lätt skalning */
  opacity: 0; transform: translateY(34px) scale(.985);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
  &.inview { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }

  /* Materialet (premium-lyftet 2026-07-13): korn + kantljus gör dossiern till ett FÖREMÅL.
     Kornets opacitet bor i SVG:n (0.04) — det ska kännas, inte ses. */
  &::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E"),
      radial-gradient(1100px 480px at 50% -8%, rgba(43,196,172,.13), transparent 65%);
  }
  /* Dubbel keyline — bokpärmen: en inre hårlinje 10px från kanten. */
  &::after {
    content: ''; position: absolute; inset: 10px; pointer-events: none;
    border: 1px solid rgba(157,184,175,.09); border-radius: 21px;
    @media (max-width: 640px) { inset: 7px; border-radius: 16px; }
  }
  /* ── MÅTTSYSTEMET (grundarbeslut 2026-08-07, kväll) ───────────────────────────────────────
     Dossiern bar FEM mått: regeln 680, rubrikerna 560, underlaget 880, rummets kort 640 — och
     ett negativt marginalpåhitt som skulle bryta ut underlaget ur prosakolumnen. Utbrottet
     räknade −100px mot .inner (680), men underlagets VERKLIGA förälder är DoorBlock (560).
     Kortet landade därför 60px höger om sidans mittlinje: mätt live 420..1300, mitt 860 mot
     sidans 800. Grundaren såg det med ögat; ingen maskin hade sagt ifrån.
     Felet var inte talet −100. Felet var att ett mått räknades FÖR HAND mot en förälder som
     antogs — samma sjukdom som en prisbok utan vakt. Botemedlet är inte ett rättat tal utan
     ett system utan aritmetik:
       bevismåttet — regeln OCH båda bilagorna (underlaget, rummets kort). Samma kant, alltid.
       prosamåttet — rubrik, ingress, formulär. Centrerat inuti bevismåttet.
     Ingen behållare har längre en egen marginal att räkna fel på: bilagan ÄR kolumnen.
     Maskinvakt: MITTLINJEN i scripts/live-door-lekia.mjs mäter kortets mitt mot sidans i DOM,
     i mobil och desktop, vid varje körning. */
  --matt-bevis: 880px;
  --matt-prosa: 560px;
  .inner { max-width: var(--matt-bevis); margin: 0 auto; position: relative; z-index: 1; }
`;

export const SectionKey = styled.div`
  display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
  border-bottom: 1px solid ${({ $light }) => ($light ? theme.color.border : D.hairlineOnDark)};
  padding-bottom: 15px;
  .k-num {
    font-family: ${MONO}; font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: ${({ $light }) => ($light ? theme.color.brand : D.teal)};
  }
  .k-note {
    font-family: ${MONO}; font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
    color: ${({ $light }) => ($light ? theme.color.mutedSoft : D.faintOnDark)}; text-align: right;
  }
`;

/* Dörren spänner bevismåttet — men bara BILAGAN får fylla det. Rubrik, ingress och formulär
   hålls på prosamåttet och centreras inuti; ett e-postfält på 880px är ett formulär, inte en
   fråga. Måtten kommer uppifrån (Dossier), aldrig som lokala tal här. */
/* 01 · Avslöjandet, sammanslaget med 02 (2026-08-13). Bilagan ÄR kolumnen — måttet kommer
   uppifrån (--matt-bevis via .inner), aldrig som ett tal här; bryggan hålls på prosamåttet.
   Ingen egen bakgrund, ingen egen ram: sektionen är en SIDA i dossiern, inte ett kort i den. */
export const Underlag = styled.div`
  margin-top: 34px;
  animation: uGrow .55s cubic-bezier(.16,1,.3,1) both;
  @keyframes uGrow { from { opacity: 0; transform: translateY(14px) scale(.99); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { animation: none; }

  .u-bridge {
    margin: 20px auto 0; max-width: var(--matt-prosa); text-align: center;
    font-size: 13.5px; line-height: 1.6; color: ${D.mutedOnDark};
    a { color: ${D.tealBright}; font-weight: 600; text-decoration: none; }
  }
`;

export const DoorBlock = styled.div`
  margin: 46px auto 0;
  ${riseIn}
  h3 {
    font-family: ${SERIF}; font-size: clamp(28px, 4.4vw, 38px); font-weight: 500;
    color: ${D.inkOnDark}; margin: 0 0 4px; line-height: 1.2; text-align: center;
    em { font-style: italic; }
  }
  > h3, > form, > .prosa { max-width: var(--matt-prosa); margin-left: auto; margin-right: auto; }
`;

export const RoomBlock = styled.div`
  margin-top: 104px;
  @media (max-width: 640px) { margin-top: 72px; }
  /* Centrerad som dörrens rubrik (grundarbeslut 2026-07-24) — de två akterna i dossiern
     ska bära samma typografiska hållning, inte en centrerad och en vänsterställd. */
  h2 {
    font-family: ${SERIF}; font-size: clamp(30px, 4.8vw, 44px); font-weight: 500;
    line-height: 1.18; margin: 46px auto 0; max-width: var(--matt-prosa); text-align: center;
    color: ${D.inkOnDark};
    em { font-style: italic; color: ${D.tealBright}; }
    ${riseIn}
  }
`;

/* Rummets instrument — den tysta veckan som hjälte (grundarbeslut 2026-07-21).
   Fyra takter i ETT föremål: vaktens hjärtslag → veckodomen → den levande fortsättningen
   från dörren → kalendern som återförsäkran. Materialet (korn + inre keyline) som dossiern. */
/* Rummets kort delar bevismåttet med underlaget — de två bilagorna har samma kant, och
   sektionsregeln ovanför dem båda ritar exakt den kanten. Låg tidigare på 640, 240px smalare än
   sin tvilling, vilket läste som två olika system.
   FOTNOT TILL MIG SJÄLV (2026-08-07): jag höll på att smalna tillbaka det till 640 på grundval
   av min egen skärmbild — men den bilden var tagen i reduced-motion med dagräknaren fryst på 0
   och nedskalad, alltså en bild av animationens startläge, inte av sidan. Grundaren såg den
   RIKTIGA sidan och godkände 880. Läxan är inte om bredden: ett QA-verktyg som ljuger genom
   utelämning är farligare än inget verktyg, för det får en att designa om fungerande arbete.
   scripts/shot-mattsystem.mjs larmar därför numera om räknaren står på 0. */
export const Artefakt = styled.div`
  max-width: var(--matt-bevis); margin: 56px auto 0;
  ${riseIn} transition-delay: .1s;

  .a-card {
    position: relative; overflow: hidden;
    border: 1px solid rgba(43,196,172,.30); border-radius: 20px;
    background: radial-gradient(560px 260px at 12% -18%, rgba(43,196,172,.13), transparent 60%), ${D.bgRaised};
    box-shadow: 0 50px 110px rgba(0,0,0,.6);
  }
  .a-card::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");
  }
  .a-card::after {
    content: ''; position: absolute; inset: 9px; pointer-events: none;
    border: 1px solid rgba(157,184,175,.08); border-radius: 13px;
  }
  .a-sec { position: relative; padding: 22px 30px; border-top: 1px solid ${D.hairlineOnDark};
    &:first-child { border-top: none; }
    @media (max-width: 640px) { padding: 18px 18px; } }

  /* Vaktens hjärtslag — beviset att en maskin var vaken i natt */
  .a-pulse { display: flex; align-items: center; gap: 15px; }
  .a-disc { position: relative; width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%;
    border: 1px solid rgba(93,232,210,.18);
    &::after { content: ''; position: absolute; inset: 8px; border-radius: 50%; border: 1px solid rgba(93,232,210,.12); } }
  .a-sweep { position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(93,232,210,.0) 250deg, rgba(93,232,210,.5) 360deg);
    mask: radial-gradient(circle, transparent 58%, #000 59%);
    -webkit-mask: radial-gradient(circle, transparent 58%, #000 59%);
    animation: asweep 3.4s linear infinite;
    @media (prefers-reduced-motion: reduce) { animation: none; opacity: .55; } }
  @keyframes asweep { to { transform: rotate(360deg); } }
  .a-plabel { display: block; font-family: ${MONO}; font-size: 9px; letter-spacing: .24em;
    text-transform: uppercase; color: ${D.faintOnDark}; margin-bottom: 3px; }
  .a-pline { font-size: 13px; line-height: 1.5; color: ${D.inkOnDark};
    b { font-weight: 600; } em { font-style: normal; color: ${D.tealBright}; } }

  /* Veckodomen — förtjänat lugn, metallic som i rummet */
  .a-dom { font-family: ${SERIF}; font-size: clamp(20px, 3.6vw, 25px); font-weight: 500;
    line-height: 1.3; margin-top: 12px;
    background: ${D.metallicText}; -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; }

  /* Den levande fortsättningen från dörren */
  .a-cont { font-size: 13.5px; line-height: 1.65; color: ${D.mutedOnDark};
    b { color: ${D.inkOnDark}; font-weight: 600; }
    em { font-style: normal; color: ${D.tealBright}; } }

  .a-sum { font-size: 12.5px; line-height: 1.55; color: ${D.mutedOnDark};
    padding-top: 12px; border-top: 1px solid ${D.hairlineOnDark}; }

  .a-foot { font-size: 13px; line-height: 1.6; color: ${D.mutedOnDark};
    b { color: ${D.inkOnDark}; font-weight: 600; } }

  .a-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .a-eyebrow { font-family: ${MONO}; font-size: 9.5px; letter-spacing: .24em; text-transform: uppercase; color: ${D.teal};
    display: inline-flex; align-items: center; gap: 8px;
    &::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: ${D.tealBright};
      animation: dotpulse 2.6s ease-out infinite; } }
  .a-count { font-family: ${MONO}; font-size: 9.5px; color: ${D.faintOnDark}; }
  @keyframes dotpulse { 0%{box-shadow:0 0 0 0 rgba(93,232,210,.45);} 70%{box-shadow:0 0 0 7px rgba(93,232,210,0);} 100%{box-shadow:0 0 0 0 rgba(93,232,210,0);} }
  @media (prefers-reduced-motion: reduce) { .a-eyebrow::before { animation: none; } }

  .a-row {
    display: flex; gap: 16px; align-items: baseline; padding: 13px 0;
    border-top: 1px solid ${D.hairlineOnDark};
    opacity: 0; transform: translateX(-14px);
    transition: opacity .55s ease, transform .55s ease;
    &.inview { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
  }
  .a-days { font-family: ${MONO}; font-size: 12px; width: 84px; flex-shrink: 0;
    font-feature-settings: 'tnum';
    color: ${D.tealBright}; &.akut { color: ${D.signal}; } }
  .a-sup { font-size: 14px; font-weight: 600; color: ${D.inkOnDark}; }
  .a-txt { font-size: 12px; color: ${D.mutedOnDark}; margin-top: 2px; line-height: 1.5; }
  .a-caption {
    text-align: center; font-family: ${MONO}; font-size: 9.5px; letter-spacing: .18em;
    text-transform: uppercase; color: ${D.faintOnDark}; margin-top: 18px; line-height: 1.9;
    b { color: ${D.mutedOnDark}; font-weight: 500; }
  }
`;

/* ═══ LJUSA SEKTIONERNA ═══ */
export const Light = styled.section`
  max-width: 820px; margin: 0 auto; padding: 88px 24px 0;
  @media (max-width: 640px) { padding: 64px 20px 0; }
`;

export const Steps = styled.div`
  display: flex; gap: 0; margin-top: 42px; flex-wrap: wrap;
  .step {
    flex: 1; min-width: 210px; padding: 2px 24px 8px 22px;
    border-left: 1px solid ${theme.color.border};
    ${riseIn}
    &:nth-child(2) { transition-delay: .1s; }
    &:nth-child(3) { transition-delay: .2s; }
    @media (max-width: 700px) { min-width: 100%; margin-bottom: 22px; }
  }
  .s-num { font-family: ${SERIF}; font-style: italic; font-size: 15px; color: ${theme.color.brand}; }
  .s-t { font-size: 15px; font-weight: 600; color: ${theme.color.ink}; margin: 8px 0 6px; }
  .s-d { font-size: 12.5px; line-height: 1.65; color: ${theme.color.mutedSoft}; }
`;

export const PriceSentence = styled.div`
  text-align: center; margin-top: 46px;
  ${riseIn}
  .p-serif {
    font-family: ${SERIF}; font-size: clamp(23px, 3.4vw, 31px); font-weight: 500;
    color: ${theme.color.ink}; line-height: 1.35;
    em { font-style: italic; color: ${theme.color.brand}; }
  }
  .p-sub { font-size: 13px; color: ${theme.color.mutedSoft}; max-width: 460px; margin: 15px auto 0; line-height: 1.7; }
`;

export const PriceCards = styled.div`
  display: flex; gap: 16px; margin-top: 42px; flex-wrap: wrap;
  .pc {
    flex: 1; min-width: 280px; border-radius: 20px; padding: 26px;
    ${riseIn}
  }
  .pc.dark { background: ${D.bgRaised}; box-shadow: 0 30px 70px rgba(8,15,13,.30); }
  .pc.lightc { border: 1px solid ${theme.color.border}; background: #fff; transition-delay: .1s; }
  .pc-k { font-family: ${MONO}; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; }
  .dark .pc-k { color: ${D.tealBright}; }
  .lightc .pc-k { color: ${theme.color.brand}; }
  .pc-pris { font-family: ${MONO}; font-size: 26px; margin: 14px 0 4px; }
  .pc-pris small { font-size: 11px; }
  .dark .pc-pris { color: ${D.inkOnDark}; }
  .dark .pc-pris small { color: ${D.faintOnDark}; }
  .lightc .pc-pris { color: ${theme.color.ink}; }
  .lightc .pc-pris small { color: ${theme.color.mutedSoft}; }
  .pc-lede { font-size: 12px; margin-bottom: 15px; line-height: 1.55; }
  .dark .pc-lede { color: ${D.mutedOnDark}; }
  .lightc .pc-lede { color: ${theme.color.mutedSoft}; }
  .pc-row { display: flex; gap: 8px; font-size: 12px; padding: 4px 0; line-height: 1.5; }
  .pc-row .tick { flex-shrink: 0; }
  .dark .pc-row { color: ${D.mutedOnDark}; }
  .dark .pc-row .tick { color: ${D.teal}; }
  .lightc .pc-row { color: ${theme.color.mutedSoft}; }
  .lightc .pc-row .tick { color: ${theme.color.brand}; }
  .pc-cta {
    display: block; text-align: center; margin-top: 18px; padding: 13px;
    border-radius: ${theme.size.radius.pill}; font-size: 13px; font-weight: 600;
    text-decoration: none; transition: opacity .15s, transform .15s;
    &:hover { opacity: .92; transform: translateY(-1px); }
  }
  .dark .pc-cta { color: ${theme.dossier.bg}; background: linear-gradient(135deg, ${D.tealBright}, ${D.teal}); }
  .lightc .pc-cta { color: ${theme.color.brand}; border: 1px solid ${theme.color.border}; }
`;

export const Faq = styled.div`
  margin-top: 8px;
  .f-item { border-bottom: 1px solid ${theme.color.border}; }
  .f-q {
    width: 100%; background: none; border: none; cursor: pointer; text-align: left;
    display: flex; justify-content: space-between; align-items: center; gap: 14px;
    padding: 19px 4px; font-size: 14.5px; font-weight: 500; color: ${theme.color.ink};
    font-family: inherit;
  }
  .f-q .f-plus { font-family: ${MONO}; color: ${theme.color.mutedSoft}; font-size: 15px; flex-shrink: 0;
    transition: transform .25s ease; }
  .f-q[aria-expanded='true'] .f-plus { transform: rotate(45deg); }
  .f-a {
    overflow: hidden; max-height: 0; transition: max-height .4s ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
  }
  .f-a.open { max-height: 420px; }
  .f-a p { margin: 0; padding: 0 4px 20px; font-size: 13px; line-height: 1.7; color: ${theme.color.mutedSoft}; max-width: 64ch; }
`;

export const LastWord = styled.section`
  max-width: 820px; margin: 0 auto; text-align: center; padding: 96px 24px 88px;
  @media (max-width: 640px) { padding: 68px 20px 64px; }
  .lw-serif {
    font-family: ${SERIF}; font-size: clamp(24px, 3.6vw, 30px); font-weight: 500;
    color: ${theme.color.ink}; line-height: 1.3;
    em { font-style: italic; color: ${theme.color.brand}; }
    ${riseIn}
  }
  .lw-cta {
    display: inline-block; margin-top: 30px; font-size: 15px; font-weight: 600; color: ${theme.color.surface};
    padding: 16px 38px; border-radius: ${theme.size.radius.pill}; text-decoration: none;
    background: ${theme.color.brandGradient};
    box-shadow: 0 16px 44px rgba(27,122,110,.30);
    transition: transform .18s ease;
    &:hover { transform: translateY(-1px); }
    ${riseIn} transition-delay: .1s;
  }
  .lw-sign { font-family: ${SERIF}; font-style: italic; font-size: 13px; color: ${theme.color.mutedSoft}; margin-top: 62px; }
`;
