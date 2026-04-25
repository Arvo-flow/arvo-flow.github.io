import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Wrap, Card, Step, Title, Lede,
  TrustBanner, BadgeStrip, Badge,
  ProviderRow, ProviderBtn, Actions, SmallNote, Spinner,
} from './styles';

const Connect = () => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState('fortnox');
  const [connecting, setConnecting] = useState(false);

  const start = () => {
    setConnecting(true);
    setTimeout(() => navigate('/scanning'), 900);
  };

  return (
    <Page>
      <Nav variant="public" />
      <Wrap>
        <Card>
          <Step><span className="dot" /> Steg 1 av 3 · Anslut bokföring</Step>
          <Title>Koppla din bokföring</Title>

          <TrustBanner>
            <div className="lock"><Icon name="lock" size={18} stroke={2.2} color="#FFFFFF" /></div>
            <div>
              <strong>Vi får bara läsrättigheter till dina leverantörsfakturor. Ingenting annat.</strong>
              <span>Vi kan inte ändra, skicka eller radera något i din bokföring. Du kan koppla bort i ett klick — då raderas all data inom 24 h.</span>
            </div>
          </TrustBanner>

          <Lede>
            60 sekunders koppling via Fortnox eller Visma — och du kan stänga av den lika snabbt.
          </Lede>

          <ProviderRow>
            <ProviderBtn $active={provider === 'fortnox'} onClick={() => setProvider('fortnox')}>
              <span className="badge">Vanligast</span>
              <Icon name="fortnox" size={22} color="#0F5132" />
              <strong>Fortnox</strong>
              <span>Direkt OAuth-koppling</span>
            </ProviderBtn>
            <ProviderBtn $active={provider === 'visma'} onClick={() => setProvider('visma')}>
              <Icon name="fortnox" size={22} color="#0F5132" />
              <strong>Visma eEkonomi</strong>
              <span>Direkt OAuth-koppling</span>
            </ProviderBtn>
          </ProviderRow>

          <BadgeStrip>
            <Badge>
              <div className="icon"><Icon name="bankid" size={16} stroke={2} /></div>
              <strong>BankID</strong>
              <span>Säker identifiering</span>
            </Badge>
            <Badge>
              <div className="icon"><Icon name="shield" size={16} stroke={2} /></div>
              <strong>GDPR</strong>
              <span>Fullt regelefterlevnad</span>
            </Badge>
            <Badge>
              <div className="icon"><Icon name="lock" size={16} stroke={2} /></div>
              <strong>AES-256</strong>
              <span>Krypterad i vila & i transport</span>
            </Badge>
            <Badge>
              <div className="icon"><Icon name="check" size={16} stroke={2.2} /></div>
              <strong>Sverige</strong>
              <span>Data hos Bahnhof, Stockholm</span>
            </Badge>
          </BadgeStrip>

          <Actions>
            <Button $variant="gradient" $size="lg" onClick={start} disabled={connecting} $full>
              {connecting ? (
                <>
                  <Spinner /> Ansluter till {provider === 'fortnox' ? 'Fortnox' : 'Visma'}…
                </>
              ) : (
                <>
                  Anslut {provider === 'fortnox' ? 'Fortnox' : 'Visma'} <Icon name="arrow" size={18} />
                </>
              )}
            </Button>
            <Button $variant="ghost" $size="md" onClick={() => navigate('/')}>
              Tillbaka
            </Button>
          </Actions>

          <SmallNote>
            Genom att fortsätta godkänner du våra <a href="#villkor" style={{ textDecoration: 'underline' }}>villkor</a> och vår <a href="#integritet" style={{ textDecoration: 'underline' }}>integritetspolicy</a>.
          </SmallNote>
        </Card>
      </Wrap>
    </Page>
  );
};

export default Connect;
