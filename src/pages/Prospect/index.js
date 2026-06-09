import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PageWrap,
  HeaderBar, HeaderInner, HeaderMeta, ConfidentialLabel, HeaderDate,
  CompanyName, MetaLine, MetaDot,
  ContentArea,
  SectionEyebrow,
  SignalSection, SignalCard, SignalBullet, SignalText,
  DataCard, DataRow, DataDesc, DataVal,
  FinancialSection, BigNumber, BigNumberSub, BigNumberNote,
  EstimateCard, CategoryLabel, SavingBand, SavingLabel, SavingRange, SourceNote,
  MethodologyNote,
  CtaSection, PrimaryCtaWrap, PrimaryCta, PrimaryCtaSub,
  CtaGap, SecondaryCtaWrap, SecondaryCta, SecondaryCtaSub,
  Divider,
  PageFooter, FooterDomain, FooterBrand,
  LoadingWrap, Dots, Dot, LoadingText,
  ErrorWrap, ErrorIcon, ErrorTitle, ErrorBody, ErrorCta,
} from './styles';

const fmt = n => n != null ? new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) : '–';

const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
};

const SV_MONTHS = ['januari','februari','mars','april','maj','juni',
                   'juli','augusti','september','oktober','november','december'];

function swMonthYear(dateStr) {
  if (!dateStr) return null;
  const [y, m] = dateStr.split('-');
  return `${SV_MONTHS[parseInt(m) - 1]} ${y}`;
}

function monthsAgo(dateStr) {
  if (!dateStr) return 0;
  return Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
}

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
  const cats      = estimates?.categories ?? [];
  const hasSaving = estimates?.hasEstimates && (estimates?.totalSavingLow > 0 || cats.length > 0);

  const mxPlatform       = estimates?.mxPlatform;
  const mxSince          = estimates?.mxSince;
  const domainRegistered = estimates?.domainRegistered;
  const foundedYear      = estimates?.foundedYear;
  const findings         = estimates?.findings ?? [];
  const mxMonths         = monthsAgo(mxSince);
  const mxLabel          = MX_LABELS[mxPlatform] ?? mxPlatform;

  const hasFindings = findings.length > 0;

  // Build signal list — findings first, then derived data signals
  const signals = [];
  findings.forEach(f => signals.push({ text: f, key: f }));

  if (!hasFindings && mxSince) {
    signals.push({
      text: `${mxLabel}-konfiguration oförändrad sedan ${swMonthYear(mxSince)} — ${mxMonths} månader`,
      key: 'mxSince',
    });
  } else if (!hasFindings && mxPlatform) {
    signals.push({
      text: `${mxLabel} identifierat för er domän · ${employees} licenser i konsultbransch`,
      key: 'mxPlatform',
    });
  }

  const hasSignals = signals.length > 0;
  const eyebrow = hasFindings ? 'IDENTIFIERADE SIGNALER' : 'INFRASTRUKTURANALYS';

  return (
    <PageWrap>
      {/* ── Top header bar ───────────────────────────────────────────────── */}
      <HeaderBar>
        <HeaderInner>
          <HeaderMeta>
            <ConfidentialLabel>Konfidentiell analys</ConfidentialLabel>
            <HeaderDate>{formatDate(generatedAt)}</HeaderDate>
          </HeaderMeta>

          <CompanyName>{companyName}</CompanyName>
          <MetaLine>
            {industry && <span>{industry}</span>}
            {industry && employees && <MetaDot>·</MetaDot>}
            {employees && <span>{employees} anställda</span>}
            {foundedYear && <><MetaDot>·</MetaDot><span>Grundat {foundedYear}</span></>}
          </MetaLine>
        </HeaderInner>
      </HeaderBar>

      <ContentArea>
        {/* ── Signal section ─────────────────────────────────────────────── */}
        {hasSignals && (
          <SignalSection>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            {signals.map((s, i) => (
              <SignalCard key={s.key} $i={i}>
                <SignalBullet>★</SignalBullet>
                <SignalText>{s.text}</SignalText>
              </SignalCard>
            ))}

            {/* Secondary data points when we have findings and also mx data */}
            {hasFindings && (mxPlatform || domainRegistered) && (
              <DataCard>
                {mxPlatform && (
                  <DataRow>
                    <DataDesc>E-postplattform</DataDesc>
                    <DataVal>{mxLabel}</DataVal>
                  </DataRow>
                )}
                {mxSince && (
                  <DataRow>
                    <DataDesc>Konfiguration sedan</DataDesc>
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

        {/* ── Financial stakes ───────────────────────────────────────────── */}
        {hasSaving && (
          <FinancialSection>
            <SectionEyebrow>Beräknad kostnadspremie</SectionEyebrow>
            <BigNumber>
              {fmt(estimates.totalSavingLow)}–{fmt(estimates.totalSavingHigh)} kr/år
            </BigNumber>
            {mxPlatform && employees && (
              <BigNumberSub>
                Baserat på {employees} licenser × marknadspris {mxLabel}
              </BigNumberSub>
            )}
            <BigNumberNote>
              Ert faktiska avtalspris ser vi inte förrän ni delar er faktura
            </BigNumberNote>
          </FinancialSection>
        )}

        {/* ── Category estimate cards ────────────────────────────────────── */}
        {cats.map((cat, i) => (
          <EstimateCard key={i}>
            <CategoryLabel>{cat.label}</CategoryLabel>

            <DataRow>
              <DataDesc>Uppskattade abonnemang</DataDesc>
              <DataVal>{cat.estimatedSims} st</DataVal>
            </DataRow>
            <DataRow>
              <DataDesc>Typisk marknadskostnad</DataDesc>
              <DataVal>{fmt(cat.typicalLow)}–{fmt(cat.typicalHigh)} kr/år</DataVal>
            </DataRow>
            <DataRow>
              <DataDesc>Arvo-priset (verifierat listpris)</DataDesc>
              <DataVal $highlight>{fmt(cat.arvoAnnual)} kr/år</DataVal>
            </DataRow>
            <DataRow>
              <DataDesc>Pris per abonnemang</DataDesc>
              <DataVal>
                {cat.pricePerSim.arvo} kr/mån{' '}
                <span style={{ color: 'rgba(255,255,255,0.20)', fontWeight: 400, fontSize: 12 }}>
                  (typiskt {cat.pricePerSim.typical} kr/mån)
                </span>
              </DataVal>
            </DataRow>

            <SavingBand>
              <SavingLabel>Potentiell besparing</SavingLabel>
              <SavingRange>upp till {fmt(cat.savingHigh)} kr/år</SavingRange>
            </SavingBand>

            <SourceNote>{cat.sourceNote}</SourceNote>
          </EstimateCard>
        ))}

        {/* ── Methodology note ───────────────────────────────────────────── */}
        <MethodologyNote>
          Arvo har analyserat den publika DNS-konfigurationen för {companyName}s domän.
          Ingen data har inhämtats från er eller era leverantörer utan ert tillstånd.
          Er faktiska avtalskostnad känner vi inte till förrän ni visar oss er faktura.
        </MethodologyNote>

        {/* ── CTA section ────────────────────────────────────────────────── */}
        <CtaSection>
          <PrimaryCtaWrap>
            <PrimaryCta href="/testa-faktura" onClick={() => recordAction('upload')}>
              Verifiera er kostnad — ladda upp faktura
            </PrimaryCta>
            <PrimaryCtaSub>Kostnadsfritt · 2 minuter · Ingen registrering krävs</PrimaryCtaSub>
          </PrimaryCtaWrap>

          <CtaGap />

          <SecondaryCtaWrap>
            <SecondaryCta
              href="/intelligence#aktivera"
              onClick={() => recordAction('activate')}
            >
              Aktivera Arvo Intelligence — 1 995 kr/mån
            </SecondaryCta>
            <SecondaryCtaSub>
              Löpande bevakning · Ingen bindningstid · Arvo börjar bevaka er inom 24 timmar
            </SecondaryCtaSub>
          </SecondaryCtaWrap>
        </CtaSection>
      </ContentArea>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <PageFooter>
        <FooterDomain>arvoflow.se</FooterDomain>
        <FooterBrand>Arvo Intelligence</FooterBrand>
      </PageFooter>
    </PageWrap>
  );
}
