import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PageWrap, TopFade,
  HeaderBar, HeaderInner, BrandMark, ConfidentialLabel, HeaderDate,
  CompanyName, MetaLine, MetaDot,
  SignalSection, SectionEyebrow, SignalCard, SignalBullet, SignalText,
  DataCard, DataRow, DataDesc, DataVal,
  ContentArea, BreakdownEyebrow, EstimateCard, CategoryLabel,
  EstimateRow, EstimateDesc, EstimateVal, EstimateValNote,
  SourceNote,
  CtaSection, MethodologyNote,
  PrimaryCtaWrap, PrimaryCta, PrimaryCtaSub,
  CtaGap, SecondaryLink, SecondaryCtaSub,
  PageFooter, FooterDomain, FooterBrand,
  LoadingWrap, Dots, Dot, LoadingText,
  ErrorWrap, ErrorIcon, ErrorTitle, ErrorBody, ErrorCta,
} from './styles';

import { fmtNumber as fmt, swMonthYear, monthsAgo, MX_LABELS } from '../../utils/format';
import { PROSPEKT_TEXT } from '../../lib/loften';


function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Prospect() {
  const { token } = useParams();
  const [status, setStatus]         = useState('loading');
  const [data, setData]             = useState(null);
  const [actionSent, setActionSent] = useState(false);

  useEffect(() => {
    if (!token) { setStatus('error'); return; }
    fetch(`/api/prospect?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(d => {
        if (!d.ok) { setStatus('error'); return; }
        setData(d.prospect);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  const recordAction = (action) => {
    if (actionSent) return;
    setActionSent(true);
    fetch(`/api/prospect?token=${encodeURIComponent(token)}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ action }),
    }).catch(() => {});
  };

  if (status === 'loading') {
    return (
      <LoadingWrap>
        <Dots>{[0,1,2].map(i => <Dot key={i} $i={i} />)}</Dots>
        <LoadingText>Hämtar er analys…</LoadingText>
      </LoadingWrap>
    );
  }

  if (status === 'error') {
    return (
      <ErrorWrap>
        <ErrorIcon>🔒</ErrorIcon>
        <ErrorTitle>Analysen hittades inte</ErrorTitle>
        <ErrorBody>
          Länken kan ha gått ut eller är ogiltig. Analysera er faktura direkt — det tar 2 minuter.
        </ErrorBody>
        <ErrorCta href="/testa-faktura">Analysera en faktura →</ErrorCta>
      </ErrorWrap>
    );
  }

  const { companyName, industry, employees, estimates, generatedAt } = data;
  // Listprisankaret räknas av servern vid läsning (api/prospect prospektSvar). Ingen kostnad och ingen
  // besparing: vi har inte sett prospektets faktura (PROSPEKT, registergranskningen 2026-09-24).
  const ankare = estimates?.ankare ?? [];

  const mxPlatform       = estimates?.mxPlatform;
  const mxSince          = estimates?.mxSince;
  const domainRegistered = estimates?.domainRegistered;
  const foundedYear      = estimates?.foundedYear;
  const findings         = estimates?.findings ?? [];
  const mxMonths         = monthsAgo(mxSince);
  const mxLabel          = MX_LABELS[mxPlatform] ?? mxPlatform;

  const hasFindings = findings.length > 0;

  const signals = [];
  // AFFÄRSHJÄRNAN LEDER (2026-07-02): bolagets eget bokslut som första signal — "vi gjorde
  // hemläxan innan vi hörde av oss". Källa: offentliga årsredovisningsuppgifter (Bolagsverket),
  // hämtade via exakt orgnr vid genereringen. fmtMkr: tkr → "221,9".
  const business = estimates?.business;
  if (business?.revenueTkr > 0) {
    const mkr = (business.revenueTkr / 1000).toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    signals.push({
      text: `Ert bokslut ${business.year}: ${mkr} mkr i omsättning, ${business.employees} anställda — offentliga uppgifter (Bolagsverket), inget ni delat`,
      key: 'business',
    });
  }
  findings.forEach(f => signals.push({ text: f, key: f }));

  if (!hasFindings && mxSince) {
    signals.push({
      text: `${mxLabel}-uppsättningen orörd sedan ${swMonthYear(mxSince)} — ${mxMonths} månader`,
      key: 'mxSince',
    });
  } else if (!hasFindings && mxPlatform) {
    signals.push({
      text: `Ni kör ${mxLabel} · ${employees} licenser`,
      key: 'mxPlatform',
    });
  }

  const hasSignals = signals.length > 0;
  const eyebrow    = (hasFindings || business) ? 'IDENTIFIERAT FYND' : 'INFRASTRUKTURANALYS';

  const showIntelMeta = (hasFindings || business) && (mxPlatform || domainRegistered || mxSince);

  return (
    <PageWrap>
      <TopFade />

      {/* ── Hero ── */}
      <HeaderBar>
        <HeaderInner>
          <BrandMark>ARVO</BrandMark>
          <ConfidentialLabel>Konfidentiell analys</ConfidentialLabel>

          <CompanyName>{companyName}</CompanyName>

          <MetaLine>
            {industry && <span>{industry}</span>}
            {industry && employees && <MetaDot>·</MetaDot>}
            {employees && <span>{employees} anställda</span>}
            {foundedYear && <><MetaDot>·</MetaDot><span>Grundat {foundedYear}</span></>}
          </MetaLine>

          <HeaderDate>{formatDate(generatedAt)}</HeaderDate>
        </HeaderInner>
      </HeaderBar>

      {/* ── Intelligence finding ── */}
      {hasSignals && (
        <SignalSection>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>

          {signals.map((s, i) => (
            <SignalCard key={s.key} $i={i}>
              {i > 0 && <SignalBullet />}
              <SignalText>{s.text}</SignalText>
            </SignalCard>
          ))}

          {showIntelMeta && (
            <DataCard>
              {mxPlatform && (
                <DataRow>
                  <DataDesc>E-postplattform</DataDesc>
                  <DataVal>{mxLabel}</DataVal>
                </DataRow>
              )}
              {mxSince && (
                <DataRow>
                  <DataDesc>Oförändrad sedan</DataDesc>
                  <DataVal $highlight>{swMonthYear(mxSince)} — {mxMonths} mån</DataVal>
                </DataRow>
              )}
              {domainRegistered && (
                <DataRow>
                  <DataDesc>Domän registrerad</DataDesc>
                  <DataVal>{swMonthYear(domainRegistered)}</DataVal>
                </DataRow>
              )}
            </DataCard>
          )}
        </SignalSection>
      )}

      {/* ── Listprisankaret — det lägsta vi kan belägga, per enhet, med produkt och datum ── */}
      {ankare.length > 0 && (
        <ContentArea>
          <BreakdownEyebrow>{PROSPEKT_TEXT.ankareRubrik}</BreakdownEyebrow>
          {ankare.map((a) => (
            <EstimateCard key={a.kategori}>
              <CategoryLabel>{a.referensProdukt}</CategoryLabel>
              <EstimateRow>
                <EstimateDesc>Lägsta publicerade pris</EstimateDesc>
                <EstimateVal $highlight>
                  {fmt(a.perEnhetAr)} kr
                  <EstimateValNote>{a.enhet}</EstimateValNote>
                </EstimateVal>
              </EstimateRow>
              <SourceNote>Verifierat {a.verifierad}{a.kraverBekraftadNiva ? ` · ${PROSPEKT_TEXT.nivaOkand}` : ''}</SourceNote>
            </EstimateCard>
          ))}
          <SourceNote>{PROSPEKT_TEXT.ingenKostnad}</SourceNote>
        </ContentArea>
      )}

      {/* ── CTA ── */}
      <CtaSection>
        <MethodologyNote>
          Arvo har gått igenom den publika digitala uppsättningen för {companyName}s domän.
          Ingen data har hämtats från er eller era leverantörer utan ert tillstånd.
        </MethodologyNote>

        <PrimaryCtaWrap>
          <PrimaryCta href="/testa-faktura" onClick={() => recordAction('upload')}>
            {PROSPEKT_TEXT.cta}
          </PrimaryCta>
          <PrimaryCtaSub>Ladda upp en faktura · Kostnadsfritt · 2 minuter · Ingen registrering</PrimaryCtaSub>
        </PrimaryCtaWrap>

        <CtaGap />

        <SecondaryLink
          href="/intelligence#aktivera"
          onClick={() => recordAction('activate')}
        >
          Eller låt Arvo bevaka er löpande — Arvo Intelligence, 1&nbsp;995 kr/mån →
        </SecondaryLink>
        <SecondaryCtaSub>
          Ingen bindningstid · En av grundarna hör av sig och startar abonnemanget
        </SecondaryCtaSub>
      </CtaSection>

      {/* ── Footer ── */}
      <PageFooter>
        <FooterDomain>arvoflow.se</FooterDomain>
        <FooterBrand>Arvo Intelligence</FooterBrand>
      </PageFooter>

    </PageWrap>
  );
}
