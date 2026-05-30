import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { getCategoryMeta } from '../../lib/categoryMeta';

// ─── helpers ────────────────────────────────────────────────────────────────

async function getBrowserFingerprint() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    `${window.screen.width}x${window.screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(navigator.hardwareConcurrency ?? ''),
  ].join('|');
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 24);
  } catch {
    return Math.random().toString(36).slice(2, 14);
  }
}

function fmtNum(n) {
  if (n == null) return '–';
  return Math.round(n).toLocaleString('sv-SE');
}

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' });
}

// ─── animations ─────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ─── styled components ───────────────────────────────────────────────────────

const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
  min-height: 100vh;
`;

const Hero = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 72px 28px 32px;
  animation: ${fadeUp} 0.55s ease both;
  @media (max-width: 600px) { padding: 48px 20px 20px; }
`;

const Eyebrow = styled.span`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 12px; border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.color.inkSoft};
  letter-spacing: .04em; text-transform: uppercase; margin-bottom: 20px;
  span.dot { width: 6px; height: 6px; border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft}; }
`;

const H1 = styled.h1`
  font-size: 34px; font-weight: 800; letter-spacing: -.03em;
  color: ${({ theme }) => theme.color.ink}; margin: 0 0 10px;
  @media (max-width: 600px) { font-size: 26px; }
`;

const Sub = styled.p`
  font-size: 16px; color: ${({ theme }) => theme.color.inkSoft};
  line-height: 1.65; margin: 0 0 32px;
`;

const Body = styled.section`
  max-width: 800px; margin: 0 auto; padding: 0 28px 80px;
  @media (max-width: 600px) { padding: 0 20px 60px; }
`;

const StatsRow = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 540px) { grid-template-columns: 1fr 1fr; }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(14,26,23,.04);
`;

const StatLabel = styled.p`
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.mutedSoft}; margin: 0 0 6px;
`;

const StatValue = styled.p`
  font-size: 22px; font-weight: 800; letter-spacing: -.025em;
  color: ${({ theme }) => theme.color.ink}; margin: 0;
  span.unit { font-size: 13px; font-weight: 500; color: ${({ theme }) => theme.color.inkSoft}; margin-left: 4px; }
`;

const SavingValue = styled(StatValue)`
  color: ${({ theme }) => theme.color.brand};
`;

const InvoiceList = styled.div`
  display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;
`;

const InvoiceCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 16px 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: 0 1px 3px rgba(14,26,23,.04);
  transition: box-shadow .15s ease;
  &:hover { box-shadow: 0 3px 12px rgba(14,26,23,.09); }
  @media (max-width: 540px) { flex-wrap: wrap; gap: 10px; }
`;

const InvoiceIcon = styled.div`
  width: 40px; height: 40px; border-radius: 10px;
  background: ${({ theme }) => theme.color.brandSoft};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: ${({ theme }) => theme.color.brand}; font-size: 18px;
`;

const InvoiceInfo = styled.div`
  flex: 1; min-width: 0;
`;

const InvoiceName = styled.p`
  font-size: 14.5px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
  margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const InvoiceMeta = styled.p`
  font-size: 12px; color: ${({ theme }) => theme.color.mutedSoft}; margin: 0;
`;

const InvoiceRight = styled.div`
  text-align: right; flex-shrink: 0;
  @media (max-width: 540px) { width: 100%; text-align: left; }
`;

const InvoiceCost = styled.p`
  font-size: 14px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
  margin: 0 0 3px;
`;

const SavingBadge = styled.span`
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 8px; border-radius: 100px; font-size: 11.5px; font-weight: 600;
  background: ${({ $pos, theme }) => $pos ? theme.color.brandSoft : theme.color.surfaceAlt};
  color: ${({ $pos, theme }) => $pos ? theme.color.brand : theme.color.mutedSoft};
`;

const OptimizedBadge = styled(SavingBadge)`
  background: ${({ theme }) => theme.color.successSoft ?? '#EDF7F1'};
  color: ${({ theme }) => theme.color.success ?? '#1B7A6E'};
`;

const ConversionCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(14,26,23,.06);
  @media (max-width: 580px) { padding: 22px 20px; }
`;

const ConversionLabel = styled.p`
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand}; margin: 0 0 6px;
`;

const ConversionHeading = styled.h3`
  font-size: 18px; font-weight: 800; color: ${({ theme }) => theme.color.ink};
  letter-spacing: -.02em; margin: 0 0 6px;
`;

const ConversionBody = styled.p`
  font-size: 13.5px; color: ${({ theme }) => theme.color.inkSoft};
  line-height: 1.65; margin: 0 0 18px;
`;

const ConversionRow = styled.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`;

const EmailInput = styled.input`
  flex: 1; padding: 11px 16px; border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  font-size: 14px; color: ${({ theme }) => theme.color.ink};
  outline: none; transition: border-color .15s;
  &:focus { border-color: ${({ theme }) => theme.color.brand}; }
  &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
`;

const GradientBtn = styled.button`
  padding: 11px 22px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap;
  transition: opacity .15s;
  &:disabled { opacity: .55; cursor: not-allowed; }
`;

const SuccessMsg = styled.p`
  font-size: 13.5px; color: ${({ theme }) => theme.color.brand};
  font-weight: 600; margin: 0; padding: 10px 0;
`;

const ErrorHint = styled.p`
  font-size: 12px; color: #C0392B; margin: 6px 0 0;
`;

const CtaCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px;
  display: flex; align-items: center; gap: 24px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05);
  @media (max-width: 580px) { flex-direction: column; align-items: flex-start; gap: 16px; padding: 22px 20px; }
`;

const CtaLeft = styled.div`
  flex: 1;
  h3 { font-size: 17px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
    margin: 0 0 6px; letter-spacing: -.015em;
    sup { font-size: 9px; font-weight: 800; color: ${({ theme }) => theme.color.brand}; vertical-align: super; } }
  p { font-size: 13.5px; color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.6; margin: 0; }
`;

const EmptyState = styled.div`
  text-align: center; padding: 64px 24px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  margin-bottom: 24px;
  h3 { font-size: 18px; font-weight: 700; color: ${({ theme }) => theme.color.ink}; margin: 0 0 10px; }
  p { font-size: 14px; color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 24px; line-height: 1.6; }
`;

const Spinner = styled.div`
  width: 32px; height: 32px; border: 3px solid ${({ theme }) => theme.color.border};
  border-top-color: ${({ theme }) => theme.color.brand};
  border-radius: 50%; animation: ${spin} .7s linear infinite; margin: 48px auto;
`;

const ErrorMsg = styled.p`
  text-align: center; color: ${({ theme }) => theme.color.inkSoft};
  font-size: 14px; padding: 32px;
`;

// ─── category icon (simple letter fallback) ──────────────────────────────────

const SEGMENT_EMOJI = ['🖨', '⚡', '📱', '💻', '🖥', '🚛', '🏢', '👥'];

function categoryIcon(category) {
  const meta = getCategoryMeta(category);
  const seg = meta?.segment ?? 0;
  return SEGMENT_EMOJI[seg] ?? '📄';
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [analyses, setAnalyses]     = useState(null); // null = loading
  const [error, setError]           = useState(null);
  const [fingerprint, setFingerprint] = useState('');
  const [email, setEmail]           = useState('');
  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fp = await getBrowserFingerprint();
        if (!cancelled) setFingerprint(fp);
        const res = await fetch(`/api/invoice-history?fingerprint=${encodeURIComponent(fp)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setAnalyses(data.analyses ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSendReport(e) {
    e.preventDefault();
    if (submitState === 'loading') return;
    setSubmitState('loading');
    setSubmitError('');
    try {
      const res = await fetch('/api/send-report', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ fingerprint, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setSubmitState('success');
    } catch (err) {
      setSubmitError(err.message);
      setSubmitState('error');
    }
  }

  const autoAnalyses = (analyses ?? []).filter((a) => a.route === 'auto');
  const totalAnnualCost = autoAnalyses.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
  const totalNetSaving  = autoAnalyses.reduce((s, a) => s + (a.net_saving ?? 0), 0);
  const switchCount     = autoAnalyses.filter((a) => a.should_switch).length;

  return (
    <Page>
      <Nav />
      <Hero>
        <Eyebrow><span className="dot" />Leverantörsportfölj</Eyebrow>
        <H1>Er Arvo Score™ — portfölj</H1>
        <Sub>
          Alla fakturor ni analyserat samlade på ett ställe. Koppla Fortnox eller Visma
          för att låsa upp hela er leverantörsbild och automatisera varje byte.
        </Sub>
      </Hero>

      <Body>
        {analyses === null && !error && <Spinner />}
        {error && <ErrorMsg>Kunde inte ladda portföljdata — försök igen om en stund.</ErrorMsg>}

        {analyses !== null && autoAnalyses.length > 0 && (
          <>
            <StatsRow>
              <StatCard>
                <StatLabel>Analyserade fakturor</StatLabel>
                <StatValue>{autoAnalyses.length}<span className="unit">st</span></StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Total årskkostnad</StatLabel>
                <StatValue>{fmtNum(totalAnnualCost)}<span className="unit">kr/år</span></StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Identifierad nettobesparing</StatLabel>
                <SavingValue>{fmtNum(totalNetSaving)}<span className="unit">kr/år</span></SavingValue>
              </StatCard>
            </StatsRow>

            <InvoiceList>
              {autoAnalyses.map((a) => {
                const meta = getCategoryMeta(a.category);
                const hasSaving = a.should_switch && (a.net_saving ?? 0) > 0;
                return (
                  <InvoiceCard key={a.id}>
                    <InvoiceIcon>{categoryIcon(a.category)}</InvoiceIcon>
                    <InvoiceInfo>
                      <InvoiceName>{a.supplier || a.normalized_supplier || 'Okänd leverantör'}</InvoiceName>
                      <InvoiceMeta>{meta.label} · {fmtDate(a.created_at)}</InvoiceMeta>
                    </InvoiceInfo>
                    <InvoiceRight>
                      {a.annual_cost != null && (
                        <InvoiceCost>{fmtNum(a.annual_cost)} kr/år</InvoiceCost>
                      )}
                      {hasSaving ? (
                        <SavingBadge $pos>−{fmtNum(a.net_saving)} kr/år möjligt</SavingBadge>
                      ) : (
                        <OptimizedBadge>Optimerat</OptimizedBadge>
                      )}
                    </InvoiceRight>
                  </InvoiceCard>
                );
              })}
            </InvoiceList>

            {switchCount > 0 && (
              <p style={{ fontSize: 13, color: '#5C6E68', marginBottom: 16 }}>
                {switchCount} av {autoAnalyses.length} leverantörer har besparingspotential.
                {' '}Arvo tar 20&nbsp;% av realiserad besparing — inga fasta avgifter.
              </p>
            )}

            <ConversionCard>
              <ConversionLabel>Arvo-rapport</ConversionLabel>
              <ConversionHeading>Få din kompletta Arvo-rapport</ConversionHeading>
              <ConversionBody>
                Vi sammanställer en PDF med alla besparingar och kontaktar dig inom 24h.
              </ConversionBody>
              {submitState === 'success' ? (
                <SuccessMsg>✓ Rapporten är skickad! Kolla din inkorg.</SuccessMsg>
              ) : (
                <>
                  <ConversionRow onSubmit={handleSendReport}>
                    <EmailInput
                      type="email"
                      placeholder="din@email.se"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={submitState === 'loading'}
                    />
                    <GradientBtn type="submit" disabled={submitState === 'loading' || !email}>
                      {submitState === 'loading' ? 'Skickar…' : 'Få din kompletta Arvo-rapport →'}
                    </GradientBtn>
                  </ConversionRow>
                  {submitState === 'error' && submitError && (
                    <ErrorHint>{submitError}</ErrorHint>
                  )}
                </>
              )}
            </ConversionCard>
          </>
        )}

        {analyses !== null && autoAnalyses.length === 0 && (
          <EmptyState>
            <h3>Inga analyserade fakturor ännu</h3>
            <p>
              Ladda upp din första leverantörsfaktura på PDF-format.
              Vi extraherar kostnad, kategori och sparar resultatet här automatiskt.
            </p>
            <Button as={Link} to="/testa-faktura" $variant="gradient" $size="md">
              Analysera din första faktura →
            </Button>
          </EmptyState>
        )}

        <CtaCard>
          <CtaLeft>
            <h3>Lås upp er fullständiga Arvo Score<sup>™</sup></h3>
            <p>
              Koppla Fortnox eller Visma — vi skannar hela er leverantörsreskontra,
              beräknar er totala Arvo Score och levererar en komplett Leverantörsrapport.
              Vi sköter varje byte från uppsägning till nytt avtal.
            </p>
          </CtaLeft>
          <Button as={Link} to="/connect" $variant="gradient" $size="md">
            Koppla Fortnox / Visma →
          </Button>
        </CtaCard>
      </Body>

      <Footer />
    </Page>
  );
}
