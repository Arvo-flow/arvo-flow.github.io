import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body,
  Summary, Clause, Table, TableRow, FineprintBar, Cta,
} from '../legal/styles';

const Cookies = () => (
  <Page>
    <Nav variant="public" />

    <Hero>
      <Eyebrow><span className="dot" /> Cookie-policy · Version 1.2 · Senast uppdaterad 2026-05-13</Eyebrow>
      <Headline>Vi använder bara <em>nödvändiga</em> cookies.</Headline>
      <Lede>
        Inga marknadsföringspixlar, inga remarketing-taggar, ingen försäljning av din surfdata till
        tredje part. Bara det som krävs för att Tjänsten ska fungera och vara säker.
      </Lede>
    </Hero>

    <Body>
      <Summary>
        <h2>Sammanfattning</h2>
        <p className="intro">Det här gäller cookies på arvo.flow och arvoflow.se:</p>
        <ul>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Nödvändiga cookies</strong> används alltid — utan dem fungerar inte
              inloggning eller säker session.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Anonymiserad statistik</strong> samlas in för att förstå hur Tjänsten används
              (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Inga marknadsföringscookies.</strong> Vi använder inte Facebook Pixel, Google Ads
              remarketing eller liknande spårning.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Inga cookies från tredje part</strong> sätts utan ditt aktiva samtycke.</div>
          </li>
        </ul>
      </Summary>

      <Clause>
        <h3>1. Vad är cookies?</h3>
        <p>Cookies är små textfiler som sparas i din webbläsare när du besöker en webbplats. De
          används för att webbplatsen ska fungera korrekt, för säkerhet och för att samla in
          anonymiserad användarstatistik.</p>
      </Clause>

      <Clause>
        <h3>2. Cookies vi använder</h3>
        <Table>
          <TableRow className="header">
            <div>Namn / typ</div>
            <div>Syfte &amp; livslängd</div>
          </TableRow>
          <TableRow>
            <div className="k">Session-cookie</div>
            <div className="v">Håller dig inloggad under besöket. Livslängd: tills du stänger
              webbläsaren. <strong>Nödvändig.</strong></div>
          </TableRow>
          <TableRow>
            <div className="k">CSRF-token</div>
            <div className="v">Skyddar mot förfalskade formulärinskick. Livslängd: tills sessionen
              avslutas. <strong>Nödvändig.</strong></div>
          </TableRow>
          <TableRow>
            <div className="k">Cookie-samtycke</div>
            <div className="v">Sparar ditt val gällande statistik-cookies. Livslängd: 12 månader.
              <strong> Nödvändig.</strong></div>
          </TableRow>
          <TableRow>
            <div className="k">Anonymiserad statistik</div>
            <div className="v">Aggregerad data om sidvisningar och fel. Ingen IP, ingen
              individidentifiering. Livslängd: 90 dagar. <strong>Statistik (samtycke).</strong></div>
          </TableRow>
        </Table>
      </Clause>

      <Clause>
        <h3>3. Hur du hanterar cookies</h3>
        <p>Du kan när som helst:</p>
        <ul>
          <li>Återkalla samtycke till statistik-cookies via inställningar i din profil när du är inloggad</li>
          <li>Radera alla cookies från arvo.flow via din webbläsares inställningar</li>
          <li>Blockera cookies helt — observera dock att inloggning då inte kommer fungera</li>
        </ul>
        <p>Vägledning för de vanligaste webbläsarna finns hos{' '}
          <a href="https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/"
             target="_blank" rel="noopener noreferrer">
            Integritetsskyddsmyndigheten (IMY)
          </a>.</p>
      </Clause>

      <Clause>
        <h3>4. Lagstöd</h3>
        <p>Vi följer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 §. Nödvändiga cookies sätts
          utan samtycke eftersom de krävs för att tillhandahålla den tjänst du aktivt efterfrågat.
          För övriga cookies inhämtar vi aktivt samtycke i enlighet med GDPR.</p>
      </Clause>

      <FineprintBar>
        <strong>Arvo Flow AB</strong> · Org.nr 559500-0000 · Stockholm · Cookie-policy v1.2 ·
        Senast uppdaterad 2026-05-13. <br />
        Frågor: <a href="mailto:gdpr@arvo.flow" style={{ color: 'inherit', textDecoration: 'underline' }}>gdpr@arvo.flow</a>.
      </FineprintBar>
    </Body>

    <Cta>
      <h2>Inga mörka mönster, inga dolda spårare.</h2>
      <p>
        Vi tycker att cookie-banners ska vara ärliga. Om du upptäcker att vi sätter en cookie som
        inte står med ovan — mejla <a className="mail" href="mailto:gdpr@arvo.flow">gdpr@arvo.flow</a>.
      </p>
      <div className="actions">
        <Button as={Link} to="/integritet" $variant="primary" $size="lg">
          Läs integritetspolicy
        </Button>
        <Button as={Link} to="/" $variant="secondary" $size="lg">
          Tillbaka till startsidan
        </Button>
      </div>
    </Cta>

    <Footer />
  </Page>
);

export default Cookies;
