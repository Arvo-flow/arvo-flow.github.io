import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Wrap, Card, Step, Title, Lede,
  DataContract, DataCol, NoWaste, ScanCounter, Reassurance,
  BadgeStrip, Badge,
  ProfileSection, ProfileHeading, ProfileRow, ProfileField,
  ProviderRow, ProviderBtn, Actions, SmallNote, Spinner,
  ConsentRow, ConsentError,
} from './styles';

const Connect = () => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState('fortnox');
  const [connecting, setConnecting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [industry, setIndustry] = useState('konsult');
  const [employees, setEmployees] = useState(5);

  const start = () => {
    if (!consent) {
      setShowConsentError(true);
      return;
    }
    if (provider === 'fortnox') {
      const params = new URLSearchParams({
        industry,
        employees: String(employees),
      });
      window.location.href = `/api/fortnox/auth?${params}`;
      return;
    }
    // Visma OAuth not yet implemented — placeholder
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
            60 sekunders koppling via Fortnox eller Visma — och du kan stänga av den lika snabbt.
          </Lede>

          <DataContract>
            <DataCol $allow>
              <span className="head"><div className="dot">✓</div> Vi läser</span>
              <ul>
                <li><Icon name="check" size={14} stroke={2.4} /> Leverantörsfakturor (konton 4xxx–7xxx)</li>
                <li><Icon name="check" size={14} stroke={2.4} /> Avtalskategorier &amp; förfallodatum</li>
                <li><Icon name="check" size={14} stroke={2.4} /> Belopp &amp; betalningshistorik</li>
              </ul>
            </DataCol>
            <DataCol>
              <span className="head"><div className="dot">✗</div> Vi läser inte</span>
              <ul>
                <li><Icon name="lock" size={14} stroke={2} /> Kundfakturor &amp; intäkter</li>
                <li><Icon name="lock" size={14} stroke={2} /> Lönedata &amp; personnummer</li>
                <li><Icon name="lock" size={14} stroke={2} /> Bankkonton &amp; kassaflöde</li>
              </ul>
            </DataCol>
          </DataContract>

          <NoWaste>
            <div className="icon"><Icon name="check" size={16} stroke={2.4} /></div>
            <div>
              <strong>Vårt löfte — hittar vi inga överpriser på 30 dagar?</strong>
              <span>Då är ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt — du har inte betalat en krona.</span>
            </div>
          </NoWaste>

          <ProfileSection>
            <ProfileHeading>Berätta lite om bolaget</ProfileHeading>
            <ProfileRow>
              <ProfileField>
                <span className="label">Bransch</span>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value="ehandel">E-handel &amp; Detaljhandel</option>
                  <option value="tillverkning">Industri &amp; Tillverkning</option>
                  <option value="it-tech">IT, Tech &amp; Mjukvara</option>
                  <option value="bygg">Bygg, Hantverk &amp; Fastighet</option>
                  <option value="hotell">Hotell, Restaurang &amp; Event</option>
                  <option value="konsult">Konsult &amp; Företagstjänster</option>
                  <option value="transport">Transport &amp; Logistik</option>
                  <option value="vard">Vård, Omsorg &amp; Hälsa</option>
                  <option value="ovrigt">Övrigt / Annan bransch</option>
                </select>
              </ProfileField>
              <ProfileField>
                <span className="label">Antal anställda</span>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                />
              </ProfileField>
            </ProfileRow>
          </ProfileSection>

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

          <ScanCounter>
            <div className="live" />
            <span><strong>1 247</strong> leverantörsfakturor analyserade denna vecka</span>
          </ScanCounter>

          <ConsentRow $error={showConsentError && !consent}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setShowConsentError(false);
              }}
              aria-describedby="consent-text"
            />
            <span className="text" id="consent-text">
              Jag accepterar <Link to="/villkor">de allmänna villkoren</Link> och{' '}
              <Link to="/integritet">integritetspolicyn</Link> och bekräftar att jag
              har behörighet att utfärda fullmakt för företaget.
            </span>
          </ConsentRow>
          {showConsentError && !consent && (
            <ConsentError>
              <Icon name="lock" size={12} stroke={2.4} />
              Du måste godkänna villkoren innan du går vidare.
            </ConsentError>
          )}

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
            <Reassurance>
              <Icon name="lock" size={12} stroke={2.2} />
              Du skickas nu till {provider === 'fortnox' ? 'Fortnox' : 'Visma'} för att godkänna läsåtkomst. Inga ändringar görs i din bokföring.
            </Reassurance>
            <Button $variant="ghost" $size="md" onClick={() => navigate('/')}>
              Tillbaka
            </Button>
          </Actions>

          <SmallNote>
            Läs <Link to="/villkor" style={{ textDecoration: 'underline' }}>allmänna villkoren</Link>,
            vår <Link to="/integritet" style={{ textDecoration: 'underline' }}>integritetspolicy</Link>{' '}
            och <Link to="/cookies" style={{ textDecoration: 'underline' }}>cookie-policy</Link>.
          </SmallNote>
        </Card>
      </Wrap>
    </Page>
  );
};

export default Connect;
