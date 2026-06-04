import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {
  Page, Section, Inner,
  Eyebrow, EyebrowDot, EyebrowText,
  Headline, Sub,
  SavingsBanner, SavingsBannerIcon, SavingsBannerText,
  Card, CardHeadline, CardSub,
  OAuthBtn, OAuthBadge, OAuthLabel, OAuthArrow,
  Divider,
  EmailRow, EmailInput, SubmitBtn, ErrorMsg, Privacy,
  SuccessWrap, CheckRing, SuccessHeadline, SuccessSub, SuccessEmail, UpgradeLabel,
  NextStrip, NextItem, NextNum, NextText,
  RulesWrap, Rule,
} from './styles';

const fmt = n => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <polyline points="5,14 11,20 23,8" />
    </svg>
  );
}

export default function Aktivera() {
  const [params] = useSearchParams();
  const savings  = params.get('savings') ? Number(params.get('savings')) : null;
  const supplier = params.get('supplier') ?? null;
  const score    = params.get('score')    ? Number(params.get('score'))   : null;

  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState('idle'); // idle | submitting | sent | error
  const [errMsg, setErrMsg]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === 'submitting') return;
    setStatus('submitting');
    setErrMsg('');

    try {
      const res = await fetch('/api/activate-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          supplier:  supplier ?? undefined,
          netSaving: savings  ?? undefined,
          diagScore: score    ?? undefined,
          source:    'intelligence-page',
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? 'server_error');
      }
      setStatus('sent');
    } catch (err) {
      setErrMsg('Något gick fel — försök igen.');
      setStatus('error');
    }
  };

  const gmailUrl   = `/api/auth/gmail-init${email ? `?email=${encodeURIComponent(email)}` : ''}`;
  const outlookUrl = `/api/auth/outlook-init${email ? `?email=${encodeURIComponent(email)}` : ''}`;

  return (
    <Page>
      <Nav variant="public" />

      <Section>
        <Inner>

          <Eyebrow>
            <EyebrowDot />
            <EyebrowText>Arvo Intelligence</EyebrowText>
          </Eyebrow>

          {status !== 'sent' && (
            <>
              <Headline>
                Arvo börjar bevaka er<br />imorgon bitti.
              </Headline>
              <Sub>1&nbsp;995&nbsp;kr/mån &middot; Ingen bindningstid</Sub>
            </>
          )}

          {savings != null && status !== 'sent' && (
            <SavingsBanner>
              <SavingsBannerIcon>→</SavingsBannerIcon>
              <SavingsBannerText>
                {supplier
                  ? <>Vi identifierade redan <strong>{fmt(savings)}&nbsp;kr/år</strong> hos {supplier}. Den besparingen väntar.</>
                  : <>Vi identifierade redan <strong>{fmt(savings)}&nbsp;kr/år</strong> i besparing åt er. Den väntar på att aktiveras.</>
                }
              </SavingsBannerText>
            </SavingsBanner>
          )}

          <Card>
            {status === 'sent' ? (
              /* ── Success ── */
              <SuccessWrap>
                <CheckRing><CheckIcon /></CheckRing>
                <SuccessHeadline>Aktiverat.</SuccessHeadline>
                <SuccessSub>
                  Arvo börjar bevaka er inom 24&nbsp;timmar.<br />
                  Ni hör av oss när det finns något att agera på.
                </SuccessSub>
                <SuccessEmail>{email}</SuccessEmail>

                <UpgradeLabel>Koppla er inkorg — Arvo hittar allt</UpgradeLabel>
                <OAuthBtn href={gmailUrl} style={{ marginBottom: 9 }}>
                  <OAuthBadge $provider="google">G</OAuthBadge>
                  <OAuthLabel>Koppla Gmail</OAuthLabel>
                  <OAuthArrow>→</OAuthArrow>
                </OAuthBtn>
                <OAuthBtn href={outlookUrl}>
                  <OAuthBadge $provider="outlook">&#9632;</OAuthBadge>
                  <OAuthLabel>Koppla Outlook</OAuthLabel>
                  <OAuthArrow>→</OAuthArrow>
                </OAuthBtn>
                <Privacy>
                  Arvo läser bara faktura-mail — aldrig personlig korrespondens.
                </Privacy>
              </SuccessWrap>
            ) : (
              /* ── Default ── */
              <>
                <CardHeadline>Koppla er inkorg — en gång.</CardHeadline>
                <CardSub>Arvo söker igenom era leverantörsfakturor och kontaktar er när något hänt.</CardSub>

                <OAuthBtn href={gmailUrl}>
                  <OAuthBadge $provider="google">G</OAuthBadge>
                  <OAuthLabel>Koppla Gmail</OAuthLabel>
                  <OAuthArrow>→</OAuthArrow>
                </OAuthBtn>
                <OAuthBtn href={outlookUrl}>
                  <OAuthBadge $provider="outlook">&#9632;</OAuthBadge>
                  <OAuthLabel>Koppla Outlook</OAuthLabel>
                  <OAuthArrow>→</OAuthArrow>
                </OAuthBtn>

                <Divider><span>eller börja med e-post</span></Divider>

                <EmailRow onSubmit={handleSubmit}>
                  <EmailInput
                    type="email"
                    placeholder="er@foretag.se"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <SubmitBtn type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? '…' : 'Aktivera →'}
                  </SubmitBtn>
                </EmailRow>
                {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}

                <Privacy>
                  1&nbsp;995&nbsp;kr/mån &middot; Ingen bindningstid &middot; Arvo läser bara faktura-mail, aldrig personlig korrespondens.
                </Privacy>
              </>
            )}
          </Card>

          <NextStrip>
            <NextItem>
              <NextNum>24h</NextNum>
              <NextText>Arvo aktiverar er bevakning</NextText>
            </NextItem>
            <NextItem>
              <NextNum>Dag 7</NextNum>
              <NextText>Ni får er första analys</NextText>
            </NextItem>
            <NextItem>
              <NextNum>Löpande</NextNum>
              <NextText>Arvo kontaktar er om något hänt</NextText>
            </NextItem>
          </NextStrip>

        </Inner>
      </Section>

      <RulesWrap>
        <Rule><strong>Regel 1:</strong> Arvo vaktar er för 1&nbsp;995&nbsp;kr/mån.</Rule>
        <Rule><strong>Regel 2:</strong> Ni behåller 80% av allt vi sparar er.</Rule>
      </RulesWrap>

      <Footer />
    </Page>
  );
}
