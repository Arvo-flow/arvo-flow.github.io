// src/components/RevealCard.js — "Avslöjandet": hur-visste-de-det-kortet vid första mötet.
// Varje rad bär sin KÄLLA (regel 3) — det är källan som bygger trovärdigheten: inte att vi
// påstår att vi är vassa, utan att vi visar exakt var vi läste av det. Dossier-mörkt (regel 6).
//
// VÄNTETIDEN ÄR DEMONSTRATIONEN (premium-lyftet 2026-07-13): maskinen arbetar synligt — verklig
// sekundräknare + de källor som faktiskt läses parallellt — och raderna materialiseras en i taget.
// Integritetslinjen: inga fejkade per-stegs-bockar (klienten kan inte veta delmomentens status —
// att visa dem vore Potemkin); timern är performance.now()-mätt, aldrig ett önsketal.
//
// KVITTOT MÄTER BREDD, INTE VÄNTAN (2026-08-07): tiden hörde hemma UNDER arbetet, aldrig i
// kvittot efteråt. Som slutrad blev den ett mått som försämrades varje gång produkten
// förbättrades (9,1 s → 21,9 s när fler register lades till). Kvittot namnger nu registren.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fmtOrgnr } from '../utils/format';

const Wrap = styled.section`
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid ${({ theme }) => theme.dossier.teal};
  background: ${({ theme }) => theme.dossier.bgRaised};
  padding: 22px 22px 18px;
  margin: 0 0 22px;

  .rv-eyebrow {
    display: inline-flex; align-items: center; gap: 9px; margin-bottom: 16px;
    font-family: ${({ theme }) => theme.font.mono}; font-size: 11px; letter-spacing: .18em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.teal};
  }
  .rv-eyebrow::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%;
    background: ${({ theme }) => theme.dossier.tealBright};
    box-shadow: 0 0 0 0 ${({ theme }) => theme.dossier.tealBright};
    animation: rvpulse 2.4s ease-out infinite;
  }
  @keyframes rvpulse { 0%{box-shadow:0 0 0 0 rgba(93,214,202,.5);} 70%{box-shadow:0 0 0 7px rgba(93,214,202,0);} 100%{box-shadow:0 0 0 0 rgba(93,214,202,0);} }

  .rv-find {
    padding: 13px 0; border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; padding-top: 0; }
    /* Raderna materialiseras en i taget — presentation av data som redan anlänt (ärlig stagger). */
    opacity: 0; animation: rvrise .55s cubic-bezier(.16,1,.3,1) forwards;
    @media (prefers-reduced-motion: reduce) { animation: none; opacity: 1; }
  }
  @keyframes rvrise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .rv-receipt {
    margin: 16px 0 0; padding: 11px 14px;
    border: 1px solid rgba(43,196,172,.28); border-radius: ${({ theme }) => theme.size.radius.md};
    background: rgba(43,196,172,.05);
    font-family: ${({ theme }) => theme.font.mono}; font-size: 10.5px; letter-spacing: .08em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.mutedOnDark};
    b { color: ${({ theme }) => theme.dossier.tealBright}; }
  }
  /* ── HIERARKIN (grundarbeslut 2026-08-07) ────────────────────────────────────────────────
     Fyra fynd låg tidigare som fyra IDENTISKA block — samma titelstorlek, samma vikt, samma
     hårlinje. Men "Ert bokslut 2025" är KONTEXT och "Ni kör Microsoft 365" är PENGAR; de får
     inte bära samma auktoritet. Rangordningen fanns redan i koden (RANK i mergeRevealFindings)
     men designen hedrade den inte. En lista där allt är lika högljutt är en lista där inget hörs.
     Första fyndet är ledet — det bär mest vikt eftersom rangordningen redan sagt att det ska. */
  .rv-title {
    font-family: ${({ theme }) => theme.font.display}; font-weight: 600; font-size: 16px;
    color: ${({ theme }) => theme.dossier.inkOnDark}; line-height: 1.25;
  }
  .rv-find:first-of-type .rv-title { font-size: 21px; line-height: 1.2; letter-spacing: -.01em; }
  .rv-find:first-of-type .rv-detail { font-size: 14.5px; }

  .rv-detail { font-size: 13.5px; line-height: 1.5; color: ${({ theme }) => theme.dossier.mutedOnDark}; margin-top: 3px; }

  /* ── KÄLLAN SOM FOTNOT, INTE SOM RAD ─────────────────────────────────────────────────────
     Källan var färgmässigt nedtonad men tog TVÅ RADER under varje påstående — alltså lika
     mycket lodrätt utrymme som fyndet självt. Tyst i färg, skrikig i volym. I en dossier ska
     källan vara TILLGÄNGLIG, inte närvarande. Vid breda mått flyttas den ur påståendets väg,
     till en egen spalt. Den döljs ALDRIG — regel 3: varje påstående bär sin proveniens. */
  .rv-source {
    font-family: ${({ theme }) => theme.font.mono}; font-size: 11px; letter-spacing: .01em;
    color: ${({ theme }) => theme.dossier.faintOnDark}; margin-top: 6px; word-break: break-word;
  }
  @media (min-width: 900px) {
    .rv-find { display: grid; grid-template-columns: minmax(0, 1fr) 236px; column-gap: 30px; align-items: start; }
    .rv-title  { grid-column: 1; grid-row: 1; }
    .rv-detail { grid-column: 1; grid-row: 2; }
    .rv-source { grid-column: 2; grid-row: 1 / span 2; margin-top: 4px; line-height: 1.45; }
  }
  .rv-source b { color: ${({ theme }) => theme.dossier.teal}; font-weight: 600; }

  /* ── BLÄNDAREN (grundarbeslut 2026-08-07) ────────────────────────────────────────────────
     Det uppenbara vore en sökruta. Men en sökruta är ett FORMULÄR, och formulär stänger flikar.
     Och vi hade redan svaret: när grinden tystnade hade den läst hela sökresultatet och sett
     exakt vilka bolag som rimligen kunde äga domänen — vi kastade bara bort kunskapen.
     "Byt" öppnar därför ingen sökning. Den VIDGAR BLÄNDAREN: kortet visar vad maskinen faktiskt
     såg. Ögonblicket vänds från "vi misslyckades, hjälp oss" till "vi läste 25 bolag, dessa tre
     kunde äga er domän, och vi vägrade gissa mellan dem". Tystnaden blir bevis på disciplin.
     Raderna materialiseras med SAMMA stagger som fynden — det läser som mer bevisning som
     anländer, aldrig som ett felmeddelande. */
  .rv-ident {
    margin: 14px 0 0; padding-top: 13px;
    border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    font-size: 12.5px; line-height: 1.6; color: ${({ theme }) => theme.dossier.mutedOnDark};
    b { color: ${({ theme }) => theme.dossier.inkOnDark}; font-weight: 600; }
    code { font-family: ${({ theme }) => theme.font.mono}; font-size: 11.5px; color: ${({ theme }) => theme.dossier.faintOnDark}; }
    button {
      background: none; border: none; padding: 0; margin-left: 6px; cursor: pointer;
      font: inherit; color: ${({ theme }) => theme.dossier.tealBright};
      border-bottom: 1px solid rgba(93,214,202,.35);
      &:hover { border-bottom-color: ${({ theme }) => theme.dossier.tealBright}; }
    }
  }
  .rv-aperture {
    margin: 14px 0 0; padding-top: 13px;
    border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    .ap-k {
      display: flex; justify-content: space-between; align-items: baseline; gap: 14px;
      font-family: ${({ theme }) => theme.font.mono}; font-size: 10px; letter-spacing: .22em;
      text-transform: uppercase; color: ${({ theme }) => theme.dossier.teal}; margin-bottom: 12px;
      span:last-child { color: ${({ theme }) => theme.dossier.faintOnDark}; letter-spacing: .14em; }
    }
    .ap-row {
      display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 14px; align-items: baseline;
      width: 100%; text-align: left; background: none; border: none; cursor: pointer;
      padding: 10px 8px; margin: 0 -8px; border-radius: 8px;
      opacity: 0; animation: rvrise .5s cubic-bezier(.16,1,.3,1) forwards;
      @media (prefers-reduced-motion: reduce) { animation: none; opacity: 1; }
      &:hover, &:focus-visible { background: rgba(93,214,202,.07); outline: none; }
      &:hover .ap-namn { color: ${({ theme }) => theme.dossier.tealBright}; }
    }
    .ap-org { font-family: ${({ theme }) => theme.font.mono}; font-size: 11.5px; color: ${({ theme }) => theme.dossier.faintOnDark}; }
    .ap-namn { display: block; font-family: ${({ theme }) => theme.font.display}; font-size: 15.5px; color: ${({ theme }) => theme.dossier.inkOnDark}; line-height: 1.3; }
    /* IGENKÄNNINGSRADEN — ort · verksamhet ur samma registerpost. Ersatte "närmast er domän",
       som var stavningslikhet förklädd till vägvisare (och på avida.se pekade fel). Den här
       raden pekar inte: den låter kunden känna igen sig själv. Inga tal — se identityCandidates. */
    .ap-var { display: block; margin-top: 4px; font-family: ${({ theme }) => theme.font.mono};
      font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; line-height: 1.5;
      color: ${({ theme }) => theme.dossier.faintOnDark}; }
    .ap-foot { margin: 12px 0 0; font-size: 12px; color: ${({ theme }) => theme.dossier.faintOnDark}; line-height: 1.6; }
    @media (max-width: 560px) {
      .ap-row { grid-template-columns: 1fr; gap: 5px; }
    }
  }

  .rv-foot {
    margin: 16px 0 0; padding-top: 14px; border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    font-size: 13px; line-height: 1.55; color: ${({ theme }) => theme.dossier.mutedOnDark};
    b { color: ${({ theme }) => theme.dossier.inkOnDark}; }
  }
`;

const Prompt = styled.form`
  margin: 32px 0 22px;
  .rp-k {
    font-family: ${({ theme }) => theme.font.mono}; font-size: 10px; letter-spacing: .24em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.teal}; margin-bottom: 12px;
  }
  .rp-lede { font-size: 14.5px; line-height: 1.55; color: ${({ theme }) => theme.dossier.mutedOnDark}; margin: 0 0 16px; max-width: 52ch;
    b { color: ${({ theme }) => theme.dossier.inkOnDark}; } }
  .rp-row { display: flex; gap: 10px; flex-wrap: wrap; }
  input {
    flex: 1 1 240px; min-width: 0; padding: 14px 16px; font-size: 15px;
    background: ${({ theme }) => theme.dossier.bgRaised};
    border: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    border-radius: ${({ theme }) => theme.size.radius.md};
    color: ${({ theme }) => theme.dossier.inkOnDark}; outline: none; transition: border-color .15s;
    &::placeholder { color: ${({ theme }) => theme.dossier.faintOnDark}; }
    &:focus { border-color: ${({ theme }) => theme.dossier.teal}; }
  }
  button {
    flex: 0 0 auto; padding: 14px 22px; font-size: 15px; font-weight: 600; cursor: pointer;
    border: none; border-radius: ${({ theme }) => theme.size.radius.md};
    color: ${({ theme }) => theme.dossier.bg}; background: ${({ theme }) => theme.dossier.tealBright};
    transition: opacity .15s; &:hover { opacity: .9; } &:disabled { opacity: .5; cursor: default; }
  }
  .rp-note { margin: 12px 0 0; font-size: 13px; color: ${({ theme }) => theme.dossier.mutedOnDark}; }
`;

// Redakterad FÖRHANDSVISNING av avslöjandet — visar FORMEN på magin innan man skrivit sin mejl.
// Ärlig: raderna är suddade (filter:blur), tydligt låsta, aldrig ett påstående om just denna besökare
// (claims-ok: förhandsvisning, blurrad + märkt "Förhandsvisning", ej kundpåstående). Skapar
// "hur visste de det?"-spänningen vid första ögonkastet istället för ett hopp i mörkret.
const Teaser = styled.div`
  position: relative; overflow: hidden;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px dashed ${({ theme }) => theme.dossier.hairlineOnDark};
  background: ${({ theme }) => theme.dossier.bgRaised};
  padding: 22px 22px 20px; margin: 0 0 22px;

  .tz-eyebrow { font-family: ${({ theme }) => theme.font.mono}; font-size: 10px; letter-spacing: .22em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.faintOnDark}; margin-bottom: 15px; }
  .tz-find { padding: 12px 0; border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; padding-top: 0; } }
  .blur { filter: blur(5.5px); opacity: .55; user-select: none; pointer-events: none; }
  .tz-title { font-family: ${({ theme }) => theme.font.display}; font-weight: 600; font-size: 17px;
    color: ${({ theme }) => theme.dossier.inkOnDark}; line-height: 1.25; }
  .tz-src { font-family: ${({ theme }) => theme.font.mono}; font-size: 11px;
    color: ${({ theme }) => theme.dossier.faintOnDark}; margin-top: 6px; }
  .tz-lock { margin: 15px 0 0; padding-top: 14px; border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    display: flex; gap: 9px; align-items: baseline;
    font-size: 13px; line-height: 1.5; color: ${({ theme }) => theme.dossier.mutedOnDark};
    b { color: ${({ theme }) => theme.dossier.inkOnDark}; }
    .tz-ico { flex-shrink: 0; color: ${({ theme }) => theme.dossier.teal}; transform: translateY(2px); } }
`;

// Två rader = formen anas, utan att bli ett stort dött suddblock (grundarbeslut 2026-07-01).
// Raderna speglar de VERKLIGA fyndens form — affärshjärnan (bokslutet) leder numera avslöjandet.
// Bara UPPTÄCKTA fakta i förhandsvisningen — aldrig en räknad rad (grundarbeslut 2026-07-01,
// samma princip som i själva avslöjandet: dörren visar vad vi VET, analysen visar vad det kostar).
const TEASER_ROWS = [
  ['Ert bokslut 2025: 52,9 mkr i omsättning, 30 anställda', 'Källa: offentliga årsredovisningsuppgifter (Bolagsverket)'],   // claims-ok: förhandsvisning, blurrad
  ['Ni kör Microsoft 365 — bekräftat på flera oberoende spår', 'Källa: er publika e-postuppsättning'],                       // claims-ok: förhandsvisning, blurrad
];

export function RevealTeaser() {
  return (
    <Teaser>
      <div className="tz-eyebrow">Förhandsvisning · ert underlag</div>
      {TEASER_ROWS.map(([t, s], i) => (
        <div className="tz-find" key={i} aria-hidden="true">
          <div className="tz-title blur">{t}</div>
          <div className="tz-src blur">{s}</div>
        </div>
      ))}
      <div className="tz-lock">
        <svg className="tz-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        <span>Detta är formen — inte ert faktiska underlag. <b>Skriv in er mejl ovan</b> så låser vi upp det på sekunder, innan ni delat något.</span>
      </div>
    </Teaser>
  );
}

// Arbetsläget — maskinen läser, synligt. Sekundräknaren är VERKLIG (tickar med klockan);
// källistan är de öppna källor /api/reveal faktiskt läser parallellt. Inga bockar, ingen
// påhittad sekvens — bara äkta arbete med ljuset på.
const Working = styled.section`
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid rgba(43,196,172,.30);
  background: ${({ theme }) => theme.dossier.bgRaised};
  padding: 22px 22px 18px; margin: 0 0 22px;

  .rw-eyebrow { font-family: ${({ theme }) => theme.font.mono}; font-size: 11px; letter-spacing: .18em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.teal}; margin-bottom: 16px; }
  .rw-beam { height: 2px; border-radius: 1px; overflow: hidden; background: ${({ theme }) => theme.dossier.hairlineOnDark};
    span { display: block; height: 100%; width: 38%; background: linear-gradient(90deg, transparent, ${({ theme }) => theme.dossier.tealBright}, transparent);
      animation: rwbeam 1.6s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { span { animation: none; width: 100%; opacity: .4; } } }
  @keyframes rwbeam { 0% { transform: translateX(-100%); } 100% { transform: translateX(280%); } }
  .rw-status { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;
    font-family: ${({ theme }) => theme.font.mono}; font-size: 11px; color: ${({ theme }) => theme.dossier.mutedOnDark};
    .rw-t { color: ${({ theme }) => theme.dossier.tealBright}; font-feature-settings: 'tnum'; } }
  .rw-sources { font-family: ${({ theme }) => theme.font.mono}; font-size: 10.5px; line-height: 2;
    color: ${({ theme }) => theme.dossier.faintOnDark}; margin-top: 4px; }
  .rw-skel { padding: 14px 0; border-top: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
    &:first-of-type { margin-top: 14px; }
    .l1 { height: 11px; border-radius: 4px; background: linear-gradient(90deg, rgba(157,184,175,.13), rgba(157,184,175,.05)); }
    .l2 { height: 8px; border-radius: 4px; background: rgba(157,184,175,.06); margin-top: 9px; } }
`;

// De öppna källor /api/reveal läser — EN sanning med backend-pipelinen (uppdateras ihop med den).
// De källor som FAKTISKT läses — en sanning (regel 1), konsumerad både av väntevyn och kvittot.
// Antalet härleds ur listan så att texten aldrig kan driva från verkligheten.
const REVEAL_SOURCE_LIST = ['e-postpostur', 'Bolagsverket', 'certifikatregistret', 'domänregistret', 'prisboken'];
const REVEAL_SOURCES = REVEAL_SOURCE_LIST.join(' · ');
const RAKNEORD = ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio'];
const antalKallor = RAKNEORD[REVEAL_SOURCE_LIST.length] ?? String(REVEAL_SOURCE_LIST.length);

export function RevealWorking({ email }) {
  const domain = (String(email || '').split('@')[1] || '').toLowerCase();
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const iv = setInterval(() => setT((performance.now() - start) / 1000), 100);
    return () => clearInterval(iv);
  }, []);
  return (
    <Working aria-live="polite">
      <div className="rw-eyebrow">Underlag{domain ? ` · ${domain}` : ''}</div>
      <div className="rw-beam"><span /></div>
      <div className="rw-status"><span>läser öppna källor</span><span className="rw-t">{t.toFixed(1)} s</span></div>
      <div className="rw-sources">{REVEAL_SOURCES}</div>
      <div className="rw-skel"><div className="l1" style={{ width: '72%' }} /><div className="l2" style={{ width: '92%' }} /></div>
      <div className="rw-skel"><div className="l1" style={{ width: '58%' }} /><div className="l2" style={{ width: '84%' }} /></div>
      <div className="rw-skel"><div className="l1" style={{ width: '66%' }} /><div className="l2" style={{ width: '78%' }} /></div>
    </Working>
  );
}

export function RevealPrompt({ email, setEmail, onSubmit, loading, reveal, note, pending, onValjBolag }) {
  return (
    <>
      <Prompt onSubmit={onSubmit}>
        <div className="rp-k">Innan första fakturan</div>
        <p className="rp-lede">Era leverantörer har redan bildat sig en uppfattning om er — och prissätter efter den. Skriv in er <b>företagsmejl</b>, så visar vi på sekunder vad de ser, ur öppna källor.</p>
        <div className="rp-row">
          <input
            type="email" inputMode="email" autoComplete="email"
            placeholder="namn@ertbolag.se" value={email}
            onChange={(e) => setEmail(e.target.value)} disabled={loading}
          />
          <button type="submit" disabled={loading || !email.trim()}>
            {loading ? 'Öppnar…' : 'Öppna underlaget →'}
          </button>
        </div>
        {note && <p className="rp-note">{note}</p>}
      </Prompt>
      {loading && <RevealWorking email={email} />}
      {!loading && reveal && <RevealCard domain={reveal.domain} findings={reveal.findings} pending={pending} identity={reveal.identity} onValjBolag={onValjBolag} />}
    </>
  );
}

export default function RevealCard({ domain, findings, pending, identity, onValjBolag }) {
  const [blandareOppen, setBlandareOppen] = React.useState(false);
  if (!domain || !findings?.length) return null;
  const kandidater = identity?.candidates ?? [];
  // Bländaren erbjuds bara när det FINNS något att välja mellan — aldrig som en tom gest.
  const kanByta = kandidater.length > 1 && typeof onValjBolag === 'function';
  return (
    <Wrap className="rv-card">
      <div className="rv-eyebrow">Underlag · {domain}</div>
      {findings.map((f, i) => (
        <div className="rv-find" key={i} style={{ animationDelay: `${i * 0.14}s` }}>
          <div className="rv-title">{f.title}</div>
          {f.detail && <div className="rv-detail">{f.detail}</div>}
          <div className="rv-source"><b>Källa:</b> {f.source}</div>
        </div>
      ))}
      {/* ── IDENTITETSTRÖSKELN (grundarbeslut 2026-08-07) ───────────────────────────────
          Låg tidigare EFTER kvittot. Men kvittot är en FULLBORDAN — "sammanställt på 15,9 s"
          sätter punkt. Att ställa identitetsfrågan efter den gjorde den till en fotnot på en
          färdig produkt, och tog tillbaka halva vinsten med bländaren.
          Frågan är inte en fotnot. Den är UPPLÅSNINGEN: svarar kunden får hen bokslut,
          tillväxt, koncern, ålder — allt det som gör kortet tjockt. Den hör därför hemma
          FÖRE kvittot, som en tröskel: "vi läste allt som går utan att veta vilka ni är —
          säg vilket bolag, så läser vi resten." */}
      {identity?.confirmedName && !blandareOppen && (
        <p className="rv-ident">
          Gäller <b>{identity.confirmedName}</b> <code>{fmtOrgnr(identity.confirmed)}</code>
          {identity.byHuman && ' · bekräftat av er'}
          {kanByta && <>. Inte ert bolag?<button type="button" onClick={() => setBlandareOppen(true)}>Byt →</button></>}
        </p>
      )}

      {!identity?.confirmedName && kanByta && !blandareOppen && (
        <p className="rv-ident">
          {/* Inte "ordstam" — det är lingvistjargong och en CFO tänker inte i ordstammar. */}
          Vi läste allt som går utan att veta vilka ni är. <b>Flera bolag heter något med
          {' '}{(() => { const d = domain.split('.')[0]; return d.charAt(0).toUpperCase() + d.slice(1); })()}</b>,
          och vi gissar aldrig vilket som är ert.
          <button type="button" onClick={() => setBlandareOppen(true)}>Säg vilket — så läser vi resten →</button>
        </p>
      )}

      {blandareOppen && (
        <div className="rv-aperture">
          <div className="ap-k">
            <span>Vilket bolag är ni?</span>
            <span>{identity.readCount ? `${identity.readCount} lästa · ` : ''}{kandidater.length} möjliga</span>
          </div>
          {kandidater.map((k, i) => (
            <button type="button" className="ap-row" key={k.orgnr}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => { setBlandareOppen(false); onValjBolag(k.orgnr); }}>
              <span className="ap-org">{fmtOrgnr(k.orgnr)}</span>
              <span>
                <span className="ap-namn">{k.legalName}</span>
                {(k.ort || k.bransch) && (
                  <span className="ap-var">{[k.ort, k.bransch].filter(Boolean).join(' · ')}</span>
                )}
              </span>
            </button>
          ))}
          <p className="ap-foot">
            Vi läste hela registret och lät bli att välja åt er — ett bolagsnamn som liknar en
            domän är inte ett ägarbevis. Ert svar är det.
          </p>
        </div>
      )}

      {/* Våg 2 pågår: de långsamma registren arbetar SYNLIGT vidare — sena rader är dramats
          höjdpunkt ("hur visste de det?"), aldrig en väntetid. Ärligt: bara källor vi faktiskt läser. */}
      {pending && (
        <div className="rv-receipt" style={{ borderStyle: 'dashed' }}>
          Djupare register arbetar fortfarande — certifikatregistret svarar långsamt. Fler rader kan landa här.
        </div>
      )}
      {/* ── KVITTOT MÄTER ARBETE, INTE VÄNTAN (grundarbeslut 2026-08-07, kväll) ─────────────────
          Kvittot bar den uppmätta sekundtiden. Ärligt — men fel storhet: talet var 9,1 s när
          kortet läste färre register och 21,9 s när det läste fler. Siffran blev alltså SÄMRE
          varje gång produkten blev BÄTTRE, och ett kvitto som skryter med en växande väntetid
          läser som en ursäkt. Vi slutade dessutom lova tid i hjärtat av sidan; att ändå
          rapportera den som prestation var en kvarleva.
          Rätt storhet är BREDD: vad maskinen hann läsa utan att kunden lämnat ifrån sig något.
          Samma verkliga fakta, den enda som växer åt rätt håll — och listan är densamma som
          väntevyn visar, aldrig en separat sanning. */}
      {!pending && (
        <div className="rv-receipt">
          <b>{antalKallor} öppna register</b> lästa — {REVEAL_SOURCES} · innan ni delat något
        </div>
      )}
      <p className="rv-foot">
        Allt ovan är <b>offentlig information</b> — innan ni loggat in,
        utan att ni lämnat ifrån er något. Tänk er vad vakten ser den dag ni delar en faktura.
      </p>
    </Wrap>
  );
}
