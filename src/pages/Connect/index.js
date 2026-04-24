import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Wrap, Card, Step, Title, Lede,
  ProviderRow, ProviderBtn, Trust, Actions, SmallNote, Spinner,
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
          <Lede>
            Vi läser endast leverantörsfakturor — inget annat. Det tar 60 sekunder och du kan
            koppla bort när som helst i ett klick.
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

          <Trust>
            <li><Icon name="lock" size={16} stroke={2} /> Endast läs-rättigheter — vi kan inte ändra eller skicka något i din bokföring.</li>
            <li><Icon name="check" size={16} stroke={2} /> All data krypteras och lagras i Sverige (Bahnhof Stockholm).</li>
            <li><Icon name="check" size={16} stroke={2} /> Du kan koppla bort i ett klick — då raderas all data inom 24 h.</li>
          </Trust>

          <Actions>
            <Button $variant="primary" $size="lg" onClick={start} disabled={connecting} $full>
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
