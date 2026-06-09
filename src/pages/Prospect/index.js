import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  HeroSection, HeroInner,
  NotifCard, NotifHeader, NotifDot, NotifAppName, NotifTime,
  NotifTitle, NotifBody, NotifCta,
  HeroTagline, HeroSub, HeroCtaWrap, HeroCta, HeroPrice,
  HeroFooter, FooterDomain, FooterBrand,
  DetailSection, DetailInner, DetailEyebrow,
  CompanyName, MetaLine, MetaDot,
  IntelCard, IntelLabel, FindingsList, FindingItem, FindingBullet, FindingText,
  IntelDivider, DataRow, DataDesc, DataVal,
  EstimateCard, CategoryLabel, SavingBand, SavingLabel, SavingRange, SourceNote,
  Divider, Disclaimer, SecondaryCtaWrap, SecondaryCta, FreeNote,
  LoadingWrap, Dots, Dot, LoadingText,
  ErrorWrap, ErrorIcon, ErrorTitle, ErrorBody, ErrorCta,
} from './styles';

const ArvoMark = () => (
  <svg width="14" height="14" viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="prospGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ECDC4" />
        <stop offset="100%" stopColor="#1DB09A" />
      </linearGradient>
    </defs>
    <path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#prospGrad)" />
  </svg>
);

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
        <LoadingText>Hämtar er kostnadsbedömning…</LoadingText>
      </LoadingWrap>
    );
  }

  if (status === 'error') {
    return (
      <ErrorWrap>
        <ErrorIcon>🔒</ErrorIcon>
        <ErrorTitle>Bedömningen hittades inte</ErrorTitle>
        <ErrorBody>
          Länken kan ha gått ut eller är ogiltig. Analysera er faktura direkt — det tar 2 minuter.
        </ErrorBody>
        <ErrorCta href="/testa-faktura">Analysera en faktura →</ErrorCta>
      </ErrorWrap>
    );
  }

  const { companyName, industry, employees, estimates, generatedAt } = data;
  const cats      = estimates?.categories ?? [];
  const hasSaving = estimates?.hasEstimates && cats.length > 0;

  const mxPlatform       = estimates?.mxPlatform;
  const mxSince          = estimates?.mxSince;
  const domainRegistered = estimates?.domainRegistered;
  const foundedYear      = estimates?.foundedYear;
  const findings         = estimates?.findings ?? [];

  const hasFindings   = findings.length > 0;
  const hasDataPoints = mxPlatform && (mxSince || foundedYear || domainRegistered);
  const hasIntel      = hasFindings || hasDataPoints;
  const mxMonths      = monthsAgo(mxSince);

  const notifBody = () => {
    if (hasFindings) return findings[0];
    if (mxSince) {
      const platform = MX_LABELS[mxPlatform] ?? mxPlatform;
      return `Er ${platform}-konfiguration är oförändrad sedan ${swMonthYear(mxSince)} — ${mxMonths} månader.`;
    }
    if (hasSaving) {
      return `Vår analys identifierar en potentiell besparing på ${fmt(estimates.totalSavingLow)}–${fmt(estimates.totalSavingHigh)} kr/år baserat på branschdata.`;
    }
    return `Vi har analyserat kostnadsprofilen för bolag i er bransch med ${employees} anställda.`;
  };

  return (
    <>
      {/* ── Hero — above the fold ─────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>

          <NotifCard>
            <NotifHeader>
              <ArvoMark />
              <NotifDot />
              <NotifAppName>Arvo Intelligence</NotifAppName>
              <NotifTime>{formatDate(generatedAt)}</NotifTime>
            </NotifHeader>
            <NotifTitle>Arvo har analyserat {companyName}</NotifTitle>
            <NotifBody>{notifBody()}</NotifBody>
            <NotifCta href="/testa-faktura" onClick={() => recordAction('upload')}>
              Se vad det innebär för er →
            </NotifCta>
          </NotifCard>

          <HeroTagline>
            Arvo märkte det.<br />
            <em>Ni visste inte om det ännu.</em>
          </HeroTagline>

          <HeroSub>
            Ni ska inte behöva hålla koll. Det är Arvos jobb.
          </HeroSub>

          <HeroCtaWrap>
            <HeroCta href="/testa-faktura" onClick={() => recordAction('upload')}>
              Ladda upp er faktura — se exakt vad ni betalar
            </HeroCta>
            <HeroPrice>Kostnadsfritt · Tar 2 minuter · Ingen registrering krävs</HeroPrice>
          </HeroCtaWrap>

        </HeroInner>

        <HeroFooter>
          <FooterDomain>arvoflow.se</FooterDomain>
          <FooterBrand>Arvo Intelligence</FooterBrand>
        </HeroFooter>
      </HeroSection>

      {/* ── Detail — below the fold ───────────────────────────────────── */}
      {(hasIntel || hasSaving) && (
        <DetailSection>
          <DetailInner>
            <DetailEyebrow>Konfidentiell kostnadsbedömning</DetailEyebrow>

            <CompanyName>{companyName}</CompanyName>
            <MetaLine>
              <span>{industry}</span>
              <MetaDot>·</MetaDot>
              <span>{employees} anställda</span>
              {foundedYear && <><MetaDot>·</MetaDot><span>Grundat {foundedYear}</span></>}
            </MetaLine>

            {hasIntel && (
              <IntelCard>
                <IntelLabel>Arvo:s underlag</IntelLabel>

                {hasFindings && (
                  <FindingsList>
                    {findings.map((text, i) => (
                      <FindingItem key={i}>
                        <FindingBullet>★</FindingBullet>
                        <FindingText>{text}</FindingText>
                      </FindingItem>
                    ))}
                  </FindingsList>
                )}

                {hasDataPoints && (
                  <>
                    {hasFindings && <IntelDivider />}
                    {mxPlatform && (
                      <DataRow>
                        <DataDesc>E-postplattform</DataDesc>
                        <DataVal>{MX_LABELS[mxPlatform] ?? mxPlatform}</DataVal>
                      </DataRow>
                    )}
                    {mxSince && (
                      <DataRow>
                        <DataDesc>Konfiguration oförändrad sedan</DataDesc>
                        <DataVal $highlight>{swMonthYear(mxSince)} — {mxMonths} månader</DataVal>
                      </DataRow>
                    )}
                    {domainRegistered && (
                      <DataRow>
                        <DataDesc>Domän registrerad</DataDesc>
                        <DataVal>{swMonthYear(domainRegistered)}</DataVal>
                      </DataRow>
                    )}
                    {foundedYear && !mxSince && (
                      <DataRow style={{ marginBottom: 0 }}>
                        <DataDesc>Grundat</DataDesc>
                        <DataVal>{foundedYear}</DataVal>
                      </DataRow>
                    )}
                  </>
                )}
              </IntelCard>
            )}

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
                <DataRow style={{ marginBottom: 0 }}>
                  <DataDesc>Pris per abonnemang</DataDesc>
                  <DataVal>
                    {cat.pricePerSim.arvo} kr/mån{' '}
                    <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 400, fontSize: 12 }}>
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

            <Divider />

            <Disclaimer>
              Dessa siffror är uppskattningar baserade på er infrastruktur, branschdata och
              verifierade listpriser. Arvo känner inte till ert faktiska avtalspris — det ser vi
              när ni laddar upp er faktura. Exakt analys tar 2 minuter och är helt kostnadsfri.
            </Disclaimer>

            <SecondaryCtaWrap>
              <SecondaryCta
                href="/intelligence#aktivera"
                onClick={() => recordAction('activate')}
              >
                Aktivera Arvo Intelligence — 1 995 kr/mån
              </SecondaryCta>
              <FreeNote>Ingen bindningstid · Arvo börjar bevaka er inom 24 timmar</FreeNote>
            </SecondaryCtaWrap>
          </DetailInner>
        </DetailSection>
      )}
    </>
  );
}
