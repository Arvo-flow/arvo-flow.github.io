// src/components/RevealCard.js — "Avslöjandet": hur-visste-de-det-kortet vid första mötet.
// Varje rad bär sin KÄLLA (regel 3) — det är källan som bygger trovärdigheten: inte att vi
// påstår att vi är vassa, utan att vi visar exakt var vi läste av det. Dossier-mörkt (regel 6).
//
// DE TIO SEKUNDERNA (premium-lyftet 2026-07-13): väntetiden ÄR demonstrationen — maskinen
// arbetar synligt (verklig sekundräknare + de källor som faktiskt läses parallellt), raderna
// materialiseras en i taget, och kortet stängs med ett KVITTO på uppmätt tid. Integritets-
// linjen: inga fejkade per-stegs-bockar (klienten kan inte veta delmomentens status — att visa
// dem vore Potemkin); timern är performance.now()-mätt, aldrig ett önsketal.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  .rv-title {
    font-family: ${({ theme }) => theme.font.display}; font-weight: 600; font-size: 17px;
    color: ${({ theme }) => theme.dossier.inkOnDark}; line-height: 1.25;
  }
  .rv-detail { font-size: 13.5px; line-height: 1.5; color: ${({ theme }) => theme.dossier.mutedOnDark}; margin-top: 3px; }
  .rv-source {
    font-family: ${({ theme }) => theme.font.mono}; font-size: 11px; letter-spacing: .01em;
    color: ${({ theme }) => theme.dossier.faintOnDark}; margin-top: 6px; word-break: break-word;
  }
  .rv-source b { color: ${({ theme }) => theme.dossier.teal}; font-weight: 600; }

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
const REVEAL_SOURCES = 'e-postpostur · Bolagsverket · certifikatregistret · domänregistret · prisboken';

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

export function RevealPrompt({ email, setEmail, onSubmit, loading, reveal, note, elapsedS }) {
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
      {!loading && reveal && <RevealCard domain={reveal.domain} findings={reveal.findings} elapsedS={elapsedS} />}
    </>
  );
}

export default function RevealCard({ domain, findings, elapsedS }) {
  if (!domain || !findings?.length) return null;
  return (
    <Wrap>
      <div className="rv-eyebrow">Underlag · {domain}</div>
      {findings.map((f, i) => (
        <div className="rv-find" key={i} style={{ animationDelay: `${i * 0.14}s` }}>
          <div className="rv-title">{f.title}</div>
          {f.detail && <div className="rv-detail">{f.detail}</div>}
          <div className="rv-source"><b>Källa:</b> {f.source}</div>
        </div>
      ))}
      {/* Kvittot: uppmätt tid (performance.now() runt det verkliga anropet) — aldrig ett önsketal. */}
      {elapsedS > 0 && (
        <div className="rv-receipt">
          Sammanställt på <b>{elapsedS.toLocaleString('sv-SE', { maximumFractionDigits: 1 })} s</b> ur öppna källor · innan ni delat något
        </div>
      )}
      <p className="rv-foot">
        Allt ovan är <b>offentlig information</b>{elapsedS > 0 ? '' : ', sammanställd på sekunder'} — innan ni loggat in,
        utan att ni lämnat ifrån er något. Tänk er vad vakten ser den dag ni delar en faktura.
      </p>
    </Wrap>
  );
}
