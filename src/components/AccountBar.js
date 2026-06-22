// src/components/AccountBar.js — riktig inloggning i kontoret: vem är inne, logga ut, byt konto.
// Ersätter fingerprint-gissningen och URL-hacken. Inloggad = en VARAKTIG session (lib/session),
// så kontoret följer kunden mellan enheter och överlever 24h-magic-token. Dossier-tokens (regel 6).
import React, { useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  margin: 0 0 20px; padding: 11px 16px;
  border: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark};
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.dossier.bgRaised};

  .ab-who { display: inline-flex; align-items: center; gap: 9px; min-width: 0;
    font-family: ${({ theme }) => theme.font.mono}; font-size: 12.5px; color: ${({ theme }) => theme.dossier.mutedOnDark}; }
  .ab-who b { color: ${({ theme }) => theme.dossier.inkOnDark}; font-weight: 600; overflow: hidden; text-overflow: ellipsis; }
  .ab-dot { width: 7px; height: 7px; border-radius: 50%; background: ${({ theme }) => theme.dossier.tealBright}; flex-shrink: 0; }
  button.ab-out {
    flex-shrink: 0; background: none; cursor: pointer; font-size: 12.5px; padding: 6px 12px;
    color: ${({ theme }) => theme.dossier.mutedOnDark};
    border: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark}; border-radius: ${({ theme }) => theme.size.radius.pill};
    transition: color .15s, border-color .15s;
    &:hover { color: ${({ theme }) => theme.dossier.inkOnDark}; border-color: ${({ theme }) => theme.dossier.teal}; }
  }

  form { display: flex; gap: 8px; flex: 1 1 320px; flex-wrap: wrap; }
  .ab-k { flex-basis: 100%; font-family: ${({ theme }) => theme.font.mono}; font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: ${({ theme }) => theme.dossier.teal}; }
  input {
    flex: 1 1 200px; min-width: 0; padding: 9px 13px; font-size: 14px;
    background: ${({ theme }) => theme.dossier.bg}; color: ${({ theme }) => theme.dossier.inkOnDark};
    border: 1px solid ${({ theme }) => theme.dossier.hairlineOnDark}; border-radius: ${({ theme }) => theme.size.radius.md};
    outline: none; &:focus { border-color: ${({ theme }) => theme.dossier.teal}; }
    &::placeholder { color: ${({ theme }) => theme.dossier.faintOnDark}; }
  }
  button.ab-in {
    flex: 0 0 auto; padding: 9px 16px; font-size: 14px; font-weight: 600; cursor: pointer; border: none;
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: ${({ theme }) => theme.dossier.tealBright}; color: ${({ theme }) => theme.dossier.bg};
    &:disabled { opacity: .5; cursor: default; }
  }
  .ab-msg { flex-basis: 100%; font-size: 12.5px; color: ${({ theme }) => theme.dossier.mutedOnDark}; }
`;

export default function AccountBar({ email, onLogout }) {
  const [val, setVal] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  if (email) {
    return (
      <Bar>
        <span className="ab-who"><span className="ab-dot" />Inloggad som <b>{email}</b></span>
        <button className="ab-out" onClick={onLogout}>Logga ut</button>
      </Bar>
    );
  }

  async function submit(e) {
    e.preventDefault();
    const addr = val.trim();
    if (!addr || busy) return;
    setBusy(true);
    try {
      await fetch('/api/auth/request-magic-link', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: addr, dest: 'portfolio' }),
      });
      setSent(true);                 // svaret är alltid ok (soft-fail) — visa neutralt besked
    } catch { setSent(true); }
    finally { setBusy(false); }
  }

  return (
    <Bar>
      <form onSubmit={submit}>
        <div className="ab-k">Redan kund?</div>
        {sent ? (
          <p className="ab-msg">Kolla er inkorg — en inloggningslänk är på väg till <b>{val.trim()}</b>. Den öppnar ert kontor på vilken enhet som helst.</p>
        ) : (
          <>
            <input type="email" inputMode="email" autoComplete="email"
              placeholder="Logga in med er företagsmejl" value={val} onChange={(e) => setVal(e.target.value)} disabled={busy} />
            <button className="ab-in" type="submit" disabled={busy || !val.trim()}>
              {busy ? 'Skickar…' : 'Skicka länk'}
            </button>
          </>
        )}
      </form>
    </Bar>
  );
}
