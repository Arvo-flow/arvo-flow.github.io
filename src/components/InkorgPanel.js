// src/components/InkorgPanel.js — RUMMETS EGEN ADRESS, GUIDEN OCH MASKINERIET I ARBETE (2026-09-24).
//
// Tre delar, alla ritade ur det servern säger (API:t dikterar, ytan renderar):
//   · InkorgGuide — plattformens guide (avkänd ur DNS i api/inkorgsadress, kunden kan byta) och Gmails
//     bekräftelsekod när den landat på adressen (fångad i api/inbound-email).
//   · IntagFlode  — varje fil i intaget: väntar, läses, klar (leverantör · rader · dom) eller föll.
//     Talen kommer ur kön och den lagrade analysen (lib/intagstelemetri.js); inget gissas.
// Löftestexterna kommer ur registret (LOFTEN_TEXT, speglat från lib/kundmeningar.js).

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { LOFTEN_TEXT } from '../lib/loften';

const d = ({ theme }) => theme.dossier;
const f = ({ theme }) => theme.font;

export const GUIDER = {
  microsoft365: {
    namn: 'Microsoft 365',
    steg: [
      'Öppna Outlook → Inställningar → E-post → Regler.',
      'Lägg till en regel med villkoret «Har bifogad fil» — gärna också era leverantörers avsändare.',
      'Välj åtgärden «Vidarebefordra till» och klistra in er adress. Spara.',
    ],
    not: 'Vissa organisationer stänger av automatisk vidarebefordran utanför bolaget. Stoppas regeln kan ni ange adressen som fakturaadress hos leverantören, eller vidarebefordra för hand.',
  },
  google_workspace: {
    namn: 'Google Workspace',
    steg: [
      'Öppna Gmail → Inställningar → Se alla inställningar → Vidarebefordran och POP/IMAP.',
      'Klicka «Lägg till en vidarebefordringsadress» och klistra in er adress. Gmail skickar en bekräftelsekod dit.',
      'Skapa ett filter: sök has:attachment filename:pdf och välj «Vidarebefordra till» er adress.',
    ],
    gmail: true,
  },
  gmail: {
    namn: 'Gmail',
    steg: [
      'Öppna Gmail → Inställningar → Se alla inställningar → Vidarebefordran och POP/IMAP.',
      'Klicka «Lägg till en vidarebefordringsadress» och klistra in er adress. Gmail skickar en bekräftelsekod dit.',
      'Skapa ett filter: sök has:attachment filename:pdf och välj «Vidarebefordra till» er adress.',
    ],
    gmail: true,
  },
  outlook_privat: {
    namn: 'Outlook.com',
    steg: [
      'Öppna Outlook.com → Inställningar → E-post → Regler.',
      'Lägg till en regel med villkoret «Har bifogad fil».',
      'Välj åtgärden «Vidarebefordra till» och klistra in er adress. Spara.',
    ],
  },
  annan: {
    namn: 'Annan e-post',
    steg: [
      'Skapa en regel i ert e-postprogram som vidarebefordrar mejl med PDF-bilaga till er adress.',
      'Eller markera fakturorna och vidarebefordra dem för hand — även 50 i ett mejl.',
    ],
  },
};
const ORDNING = ['microsoft365', 'google_workspace', 'gmail', 'outlook_privat', 'annan'];

export function InkorgGuide({ inkorg, plattform, onPlattform }) {
  const [kopierad, setKopierad] = useState(false);
  const vald = GUIDER[plattform] ? plattform : 'annan';
  const g = GUIDER[vald];
  const kopieraKod = async () => {
    try { await navigator.clipboard.writeText(inkorg?.gmailKod ?? ''); setKopierad(true); setTimeout(() => setKopierad(false), 1800); } catch { /* läsbar ändå */ }
  };
  return (
    <Guide>
      <p className="g-lofte">{LOFTEN_TEXT.egenAdress}</p>
      <div className="g-flikar" role="tablist" aria-label="Er e-postplattform">
        {ORDNING.map((k) => (
          <button key={k} type="button" role="tab" aria-selected={k === vald}
            className={k === vald ? 'on' : ''} onClick={() => onPlattform?.(k)}>
            {GUIDER[k].namn}{k === inkorg?.plattform ? <span className="g-avkand"> · avkänd</span> : null}
          </button>
        ))}
      </div>
      <ol className="g-steg">{g.steg.map((s) => <li key={s}>{s}</li>)}</ol>
      {g.not && <p className="g-not">{g.not}</p>}
      {g.gmail && (
        inkorg?.gmailKod ? (
          <Kod>
            <span className="k-rub">Gmails bekräftelsekod har landat</span>
            <button type="button" className="k-kod" onClick={kopieraKod} aria-label="Kopiera koden">
              <span>{inkorg.gmailKod}</span>
              <span className="k-kopiera">{kopierad ? 'Kopierad' : 'Kopiera'}</span>
            </button>
            <span className="k-hjalp">Klistra in den i Gmail för att slutföra vidarebefordran.</span>
          </Kod>
        ) : (
          <Vantar>
            <span className="v-puls" aria-hidden="true" />
            <span>Väntar på Gmails bekräftelsekod · {LOFTEN_TEXT.gmailKod}</span>
          </Vantar>
        )
      )}
    </Guide>
  );
}

const DOM = { auto: 'Prissatt', monitoring: 'Bevakad', review_queue: 'Granskas', unsupported: 'Utanför vårt område' };
const STATUSTEXT = { vantar: 'Väntar', lases: 'Läses…', klar: 'Klar', foll: 'Föll' };

export function IntagFlode({ intag, max = 12 }) {
  if (!intag || !Array.isArray(intag.filer) || intag.filer.length === 0) return null;
  const aktiv = intag.vantar + intag.lases > 0;
  return (
    <Flode aria-live="polite">
      <div className="f-huvud">
        {aktiv && <span className="f-puls" aria-hidden="true" />}
        <span className="f-rub">{aktiv ? 'Intaget arbetar' : 'Intaget · senaste dygnet'}</span>
        <span className="f-tal">
          {intag.klara} klara · {intag.lases} läses · {intag.vantar} väntar{intag.fallna ? ` · ${intag.fallna} föll` : ''}
        </span>
      </div>
      <ul>
        {intag.filer.slice(0, max).map((x, i) => (
          <li key={`${x.fil}-${i}`} className={`s-${x.status}`}>
            <span className="f-fil">{x.fil}</span>
            <span className="f-det">
              {x.status === 'klar'
                ? [x.leverantor, x.rader != null ? `${x.rader} rader` : null, DOM[x.rutt] ?? null].filter(Boolean).join(' · ') || 'Klar'
                : STATUSTEXT[x.status]}
            </span>
          </li>
        ))}
      </ul>
    </Flode>
  );
}

const puls = keyframes`0%{box-shadow:0 0 0 0 rgba(93,214,202,.55)}70%{box-shadow:0 0 0 8px rgba(93,214,202,0)}100%{box-shadow:0 0 0 0 rgba(93,214,202,0)}`;

const Guide = styled.div`
  margin-top: 14px;
  font-family: ${(p) => f(p).sans};
  .g-lofte { margin: 0 0 12px; font-size: 13px; line-height: 1.55; color: ${(p) => d(p).mutedOnDark}; }
  .g-flikar { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .g-flikar button {
    font: 600 12px ${(p) => f(p).sans}; padding: 6px 10px; border-radius: 999px; cursor: pointer;
    background: transparent; color: ${(p) => d(p).faintOnDark}; border: 1px solid ${(p) => d(p).hairlineOnDark};
  }
  .g-flikar button.on { color: ${(p) => d(p).inkOnDark}; border-color: ${(p) => d(p).teal}; }
  .g-avkand { color: ${(p) => d(p).teal}; font-weight: 500; }
  .g-steg { margin: 0; padding-left: 20px; color: ${(p) => d(p).inkOnDark}; font-size: 13.5px; line-height: 1.6; }
  .g-steg li { margin-bottom: 4px; }
  .g-not { margin: 10px 0 0; font-size: 12px; line-height: 1.55; color: ${(p) => d(p).faintOnDark}; }
`;

const Kod = styled.div`
  margin-top: 14px; padding: 14px 16px; border-radius: 12px;
  border: 1px solid ${(p) => d(p).teal}; background: ${(p) => d(p).bgRaised};
  display: flex; flex-direction: column; gap: 8px;
  .k-rub { font: 700 11px ${(p) => f(p).mono}; letter-spacing: .14em; text-transform: uppercase; color: ${(p) => d(p).teal}; }
  .k-kod {
    display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer;
    background: transparent; border: 0; padding: 0; color: ${(p) => d(p).inkOnDark};
    font: 700 28px ${(p) => f(p).mono}; letter-spacing: .08em;
  }
  .k-kopiera { font: 600 12px ${(p) => f(p).sans}; letter-spacing: 0; color: ${(p) => d(p).tealBright}; }
  .k-hjalp { font-size: 12.5px; color: ${(p) => d(p).mutedOnDark}; }
`;

const Vantar = styled.div`
  margin-top: 14px; display: flex; align-items: center; gap: 10px;
  font-size: 12.5px; line-height: 1.5; color: ${(p) => d(p).faintOnDark};
  .v-puls { flex: none; width: 8px; height: 8px; border-radius: 50%; background: ${(p) => d(p).tealBright}; animation: ${puls} 1.8s infinite; }
`;

const Flode = styled.div`
  margin-top: 16px; padding: 14px 16px; border-radius: 12px;
  border: 1px solid ${(p) => d(p).hairlineOnDark}; background: ${(p) => d(p).bgRaised};
  font-family: ${(p) => f(p).sans};
  .f-huvud { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-bottom: 10px; }
  .f-puls { width: 8px; height: 8px; border-radius: 50%; background: ${(p) => d(p).tealBright}; animation: ${puls} 1.8s infinite; }
  .f-rub { font: 700 11px ${(p) => f(p).mono}; letter-spacing: .14em; text-transform: uppercase; color: ${(p) => d(p).teal}; }
  .f-tal { font: 500 12px ${(p) => f(p).mono}; color: ${(p) => d(p).mutedOnDark}; }
  ul { list-style: none; margin: 0; padding: 0; }
  li {
    display: flex; justify-content: space-between; gap: 12px; padding: 7px 0;
    border-top: 1px solid ${(p) => d(p).hairlineOnDark}; font-size: 12.5px;
  }
  .f-fil { color: ${(p) => d(p).inkOnDark}; font-family: ${(p) => f(p).mono}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .f-det { flex: none; color: ${(p) => d(p).mutedOnDark}; text-align: right; }
  li.s-lases .f-det, li.s-vantar .f-det { color: ${(p) => d(p).tealBright}; }
  li.s-foll .f-det { color: ${(p) => d(p).signal}; }
`;
