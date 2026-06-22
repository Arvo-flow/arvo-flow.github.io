// src/components/RevealCard.js — "Avslöjandet": hur-visste-de-det-kortet vid första mötet.
// Varje rad bär sin KÄLLA (regel 3) — det är källan som bygger trovärdigheten: inte att vi
// påstår att vi är vassa, utan att vi visar exakt var vi läste av det. Dossier-mörkt (regel 6).
import React from 'react';
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

export function RevealPrompt({ email, setEmail, onSubmit, loading, reveal, note }) {
  return (
    <>
      <Prompt onSubmit={onSubmit}>
        <div className="rp-k">Innan ni laddar upp</div>
        <p className="rp-lede">Skriv er <b>jobbadress</b> — så visar Arvo vad vi redan kan läsa av om er, källbelagt, innan ni gett oss en enda faktura.</p>
        <div className="rp-row">
          <input
            type="email" inputMode="email" autoComplete="email"
            placeholder="namn@ertbolag.se" value={email}
            onChange={(e) => setEmail(e.target.value)} disabled={loading}
          />
          <button type="submit" disabled={loading || !email.trim()}>
            {loading ? 'Läser av…' : 'Se vad vi redan vet →'}
          </button>
        </div>
        {note && <p className="rp-note">{note}</p>}
      </Prompt>
      {reveal && <RevealCard domain={reveal.domain} findings={reveal.findings} />}
    </>
  );
}

export default function RevealCard({ domain, findings }) {
  if (!domain || !findings?.length) return null;
  return (
    <Wrap>
      <div className="rv-eyebrow">Arvo läste av {domain}</div>
      {findings.map((f, i) => (
        <div className="rv-find" key={i}>
          <div className="rv-title">{f.title}</div>
          {f.detail && <div className="rv-detail">{f.detail}</div>}
          <div className="rv-source"><b>Källa:</b> {f.source}</div>
        </div>
      ))}
      <p className="rv-foot">
        Allt ovan är <b>publik fakta</b> vi läste av på sekunder — innan ni ens loggat in, utan att
        ni gett oss något. Tänk vad vakten ser när ni delar er första faktura.
      </p>
    </Wrap>
  );
}
