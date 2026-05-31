import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const Wrap = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`;

const LogoWrap = styled.div`
  margin-bottom: 36px;
`;

const Kicker = styled.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.color.brand};
  margin: 0 0 10px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
  margin: 0 0 10px;
  line-height: 1.3;
`;

const Sub = styled.p`
  font-size: 14.5px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
  margin: 0 0 32px;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const CostInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  font-size: 15px;
  color: ${({ theme }) => theme.color.ink};
  background: #fff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
  margin-bottom: 16px;
  &:focus { border-color: ${({ theme }) => theme.color.brand}; }
  &::placeholder { color: ${({ theme }) => theme.color.muted}; }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.brandSoft ?? '#DCEEEA'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`;

const BackLink = styled(Link)`
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
  text-decoration: none;
  &:hover { color: ${({ theme }) => theme.color.ink}; }
`;

export default function OutcomeSurvey() {
  const params     = new URLSearchParams(window.location.search);
  const analysisId = params.get('id');
  const svarParam  = params.get('svar'); // 'ja' eller 'nej' från e-postlänk

  const [step, setStep]     = useState(svarParam === 'ja' ? 'cost' : svarParam === 'nej' ? 'submitting-no' : 'question');
  const [cost, setCost]     = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [supplier, setSupplier] = useState('');

  // Om svar=nej kom via URL — skicka direkt
  useEffect(() => {
    if (svarParam === 'nej' && analysisId) {
      submit(false, null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function submit(switched, actualCost) {
    if (!analysisId) { setStatus('done'); return; }
    setStatus('submitting');
    try {
      const res = await fetch('/api/outcome-survey', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          analysisId,
          switched,
          actualAnnualCost: actualCost ? Number(String(actualCost).replace(/\s/g, '')) : null,
        }),
      });
      const data = await res.json();
      if (data.supplier) setSupplier(data.supplier);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <Wrap>
        <Card>
          <LogoWrap><Link to="/"><Logo /></Link></LogoWrap>
          <SuccessIcon>✓</SuccessIcon>
          <Title>Tack — det hjälper oss mycket.</Title>
          <Sub>
            Varje svar gör Arvo lite mer precis. Nästa kund som analyserar en{supplier ? ` ${supplier}` : ''}-faktura
            drar nytta av det ni just berättade.
          </Sub>
          <Button as={Link} to="/testa-faktura" $variant="gradient" $size="md">
            Analysera en ny faktura →
          </Button>
        </Card>
      </Wrap>
    );
  }

  if (step === 'submitting-no' || (svarParam === 'nej' && status !== 'done')) {
    return (
      <Wrap>
        <Card style={{ textAlign: 'center' }}>
          <LogoWrap style={{ textAlign: 'left' }}><Link to="/"><Logo /></Link></LogoWrap>
          <Sub style={{ margin: '32px 0 0' }}>Registrerar ert svar…</Sub>
        </Card>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Card>
        <LogoWrap><Link to="/"><Logo /></Link></LogoWrap>
        <Kicker>60-dagars uppföljning</Kicker>

        {step === 'question' && (
          <>
            <Title>Bytte ni leverantör efter analysen?</Title>
            <Sub>
              Det tar 30 sekunder och hjälper oss att bli mer precisa för er och alla
              kommande kunder.
            </Sub>
            <BtnRow>
              <Button $variant="gradient" $size="md" onClick={() => setStep('cost')}>
                Ja, vi bytte →
              </Button>
              <Button $variant="ghost" $size="md" onClick={() => submit(false, null)}>
                Inte än
              </Button>
            </BtnRow>
          </>
        )}

        {step === 'cost' && (
          <>
            <Title>Vad betalar ni nu per år?</Title>
            <Sub>Ange er nya årskostnad (kr/år) — vi jämför med vad vi förutspådde.</Sub>
            <InputLabel htmlFor="actual-cost">Ny årskostnad (kr)</InputLabel>
            <CostInput
              id="actual-cost"
              type="text"
              inputMode="numeric"
              placeholder="t.ex. 48 000"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              autoFocus
            />
            <BtnRow>
              <Button
                $variant="gradient"
                $size="md"
                disabled={status === 'submitting'}
                onClick={() => submit(true, cost)}
              >
                {status === 'submitting' ? 'Sparar…' : 'Skicka →'}
              </Button>
              <Button $variant="ghost" $size="sm" onClick={() => submit(true, null)}>
                Hoppa över kostnaden
              </Button>
            </BtnRow>
            {status === 'error' && (
              <p style={{ color: '#D94F3C', fontSize: 13, margin: '8px 0 0' }}>
                Något gick fel — försök igen.
              </p>
            )}
          </>
        )}

        <BackLink to="/">← Tillbaka till startsidan</BackLink>
      </Card>
    </Wrap>
  );
}
