import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body,
  Summary, Clause, SectionTitle, SectionLede, Table, TableRow,
  FineprintBar, Cta,
} from '../legal/styles';

const Integritet = () => (
  <Page>
    <Nav variant="public" />

    <Hero>
      <Eyebrow><span className="dot" /> Integritetspolicy & DPA · Version 1.2 · Senast uppdaterad 2026-05-13</Eyebrow>
      <Headline>Du <em>äger</em> din data. Vi förvaltar den.</Headline>
      <Lede>
        Vi läser bara den fakturadata vi behöver för att hitta överpriser — inget annat.
        Vid avslut raderas allt inom 24 timmar. Det här är hur, var och varför.
      </Lede>
    </Hero>

    <Body>
      <Summary>
        <h2>Sammanfattning</h2>
        <p className="intro">Det här gäller för dig som kund hos Arvo Flow:</p>
        <ul>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Vi läser endast leverantörsfakturor</strong> via Fortnox eller Visma — inte kundfakturor,
              löner, bankkonton eller personnummer på anställda.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Data lagras i EU/EES</strong> hos Bahnhof, Stockholm. Krypterad i vila (AES-256)
              och i transport (TLS 1.3).</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Du kan när som helst</strong> begära utdrag, rättelse eller radering av dina
              personuppgifter via <a href="mailto:gdpr@arvo.flow" style={{ color: 'inherit', textDecoration: 'underline' }}>gdpr@arvo.flow</a>.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Vid avslut</strong> raderas all transaktionsdata inom 24 timmar.
              Bokföringsmässiga underlag (fakturor på vårt arvode) sparas i 7 år enligt bokföringslagen.</div>
          </li>
          <li>
            <Icon name="check" size={16} stroke={2.4} />
            <div><strong>Vi säljer aldrig din data.</strong> Vi delar den heller inte med leverantörer,
              annonsörer eller andra tredje parter — utöver de vi är bundna till för att leverera Tjänsten.</div>
          </li>
        </ul>
      </Summary>

      <SectionTitle>Integritetspolicy</SectionTitle>
      <SectionLede>
        Den här policyn beskriver hur Arvo Flow AB behandlar personuppgifter och företagsuppgifter
        i samband med att vi levererar Tjänsten.
      </SectionLede>

      <Clause>
        <h3>1. Personuppgiftsansvarig</h3>
        <p>
          <strong>Arvo Flow AB</strong>, org.nr 559500-0000, är personuppgiftsansvarig för de
          uppgifter vi samlar in om dig som kund eller besökare. Kontakt:{' '}
          <a href="mailto:gdpr@arvo.flow">gdpr@arvo.flow</a>.
        </p>
        <p>
          För personuppgifter som behandlas på Kundens uppdrag (t.ex. namn på Kundens kontaktpersoner
          och firmatecknare) är Arvo Flow personuppgiftsbiträde — se DPA längre ner.
        </p>
      </Clause>

      <Clause>
        <h3>2. Vilka uppgifter vi behandlar</h3>
        <Table>
          <TableRow className="header">
            <div>Kategori</div>
            <div>Syfte &amp; rättslig grund</div>
          </TableRow>
          <TableRow>
            <div className="k">Företagsuppgifter</div>
            <div className="v">Organisationsnummer, bolagsnamn, registreringsdatum.
              Rättslig grund: <em>fullgörande av avtal</em>.</div>
          </TableRow>
          <TableRow>
            <div className="k">Firmatecknarens uppgifter</div>
            <div className="v">Namn, personnummer (via BankID), behörighet enligt Bolagsverket.
              Rättslig grund: <em>fullgörande av avtal</em> samt rättslig förpliktelse vid signering.</div>
          </TableRow>
          <TableRow>
            <div className="k">Kontaktuppgifter</div>
            <div className="v">E-post, telefon, namn på kontaktpersoner.
              Rättslig grund: <em>berättigat intresse</em> för kundkommunikation, <em>samtycke</em> för marknadsföring.</div>
          </TableRow>
          <TableRow>
            <div className="k">Leverantörsfakturor</div>
            <div className="v">Belopp, leverantör, kategori, förfallodatum, fakturarader.
              Rättslig grund: <em>fullgörande av avtal</em>.</div>
          </TableRow>
          <TableRow>
            <div className="k">Tekniska data</div>
            <div className="v">IP-adress, webbläsare, sidvisningar (anonymiserat).
              Rättslig grund: <em>berättigat intresse</em> för säkerhet och drift.</div>
          </TableRow>
        </Table>
      </Clause>

      <Clause>
        <h3>3. Vad vi <em>inte</em> behandlar</h3>
        <p>Vi har medvetet begränsat datainsamlingen. Vi läser <strong>aldrig</strong>:</p>
        <ul>
          <li>Kundfakturor eller intäktsdata</li>
          <li>Lönedata eller personnummer på anställda</li>
          <li>Bankkontosaldon eller transaktionshistorik</li>
          <li>Kundregister eller CRM-data</li>
          <li>Innehållet i e-postkorrespondens</li>
        </ul>
        <p>OAuth-scopen mot Fortnox och Visma är konfigurerade så att vi tekniskt inte ens
          kan läsa kategorierna ovan, även om vi ville.</p>
      </Clause>

      <Clause>
        <h3>4. Hur länge vi sparar data</h3>
        <ul>
          <li><strong>Aktiv kund:</strong> Så länge avtalet löper.</li>
          <li><strong>Vid uppsägning:</strong> Transaktionsdata raderas inom 24 timmar.</li>
          <li><strong>Bokföringsunderlag:</strong> 7 år enligt bokföringslagen (2 kap. 1 § BFL).</li>
          <li><strong>Marknadsföringssamtycke:</strong> Tills du återkallar samtycket.</li>
          <li><strong>Anonymiserad statistik:</strong> Sparas obegränsat för produkt- och branschanalys.</li>
        </ul>
      </Clause>

      <Clause>
        <h3>5. Var data lagras &amp; säkerhet</h3>
        <p>All data lagras inom EU/EES, primärt hos Bahnhof i Stockholm. Vi använder:</p>
        <ul>
          <li>AES-256 kryptering i vila</li>
          <li>TLS 1.3 för all dataöverföring</li>
          <li>Tvåfaktorautentisering för all intern access</li>
          <li>Loggning av all access till kunddata (audit trail)</li>
          <li>Penetrationstester av oberoende part minst årligen</li>
        </ul>
      </Clause>

      <Clause>
        <h3>6. Dina rättigheter (GDPR)</h3>
        <p>Du har rätt att:</p>
        <ul>
          <li>Begära ut <strong>registerutdrag</strong> över dina personuppgifter</li>
          <li>Begära <strong>rättelse</strong> av felaktiga uppgifter</li>
          <li>Begära <strong>radering</strong> (rätten att bli glömd), inom de gränser bokföringslagen tillåter</li>
          <li>Begära <strong>begränsning</strong> av behandling</li>
          <li><strong>Invända</strong> mot behandling som sker på berättigat intresse</li>
          <li>Få ut din data i ett <strong>strukturerat, maskinläsbart format</strong> (dataportabilitet)</li>
          <li>Lämna in <strong>klagomål till Integritetsskyddsmyndigheten</strong> (IMY)</li>
        </ul>
        <p>Kontakta <a href="mailto:gdpr@arvo.flow">gdpr@arvo.flow</a> — vi svarar inom 30 dagar.</p>
      </Clause>

      <Clause>
        <h3>7. Underbiträden</h3>
        <p>Vi använder följande underbiträden för att leverera Tjänsten. Samtliga är bundna av
          DPA och behandlar uppgifter inom EU/EES eller under EU-godkända överföringsmekanismer:</p>
        <Table>
          <TableRow className="header">
            <div>Leverantör</div>
            <div>Funktion</div>
          </TableRow>
          <TableRow>
            <div className="k">Bahnhof AB</div>
            <div className="v">Hosting / databas — Sverige</div>
          </TableRow>
          <TableRow>
            <div className="k">Scrive AB</div>
            <div className="v">BankID-signering — Sverige</div>
          </TableRow>
          <TableRow>
            <div className="k">Fortnox / Visma</div>
            <div className="v">OAuth-koppling till bokföring — Sverige</div>
          </TableRow>
          <TableRow>
            <div className="k">Stripe Payments Europe</div>
            <div className="v">Betalningar &amp; fakturering — Irland</div>
          </TableRow>
          <TableRow>
            <div className="k">Bolagsverket</div>
            <div className="v">Verifiering av firmateckningsrätt — Sverige</div>
          </TableRow>
        </Table>
      </Clause>

      <SectionTitle>Personuppgiftsbiträdesavtal (DPA) — Bilaga</SectionTitle>
      <SectionLede>
        Detta avtal gäller automatiskt när du som Kund tecknar Tjänsten. Det reglerar Arvo Flows
        behandling av personuppgifter på Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner).
      </SectionLede>

      <Clause>
        <h3>1. Parter</h3>
        <p><strong>Personuppgiftsansvarig:</strong> Kunden.</p>
        <p><strong>Personuppgiftsbiträde:</strong> Arvo Flow AB, org.nr 559500-0000.</p>
      </Clause>

      <Clause>
        <h3>2. Omfattning</h3>
        <p>Biträdet behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer för
          firmateckning) för att utföra Tjänsten enligt Allmänna villkor.</p>
      </Clause>

      <Clause>
        <h3>3. Instruktion</h3>
        <p>Biträdet får endast behandla uppgifter för att optimera avtal och fakturera enligt
          de <Link to="/villkor">Allmänna villkoren</Link>. Ytterligare instruktioner från
          Kunden ska vara skriftliga.</p>
      </Clause>

      <Clause>
        <h3>4. Säkerhet</h3>
        <p>Biträdet ska vidta lämpliga tekniska och organisatoriska åtgärder för att skydda data
          mot oavsiktlig eller olaglig förstörelse, förlust, ändring, obehörigt röjande eller
          obehörig åtkomst (jfr GDPR art. 32). Detta inkluderar kryptering, åtkomstkontroll,
          loggning och regelbunden säkerhetsgranskning enligt § 5 i Integritetspolicyn ovan.</p>
      </Clause>

      <Clause>
        <h3>5. Underbiträden</h3>
        <p>Kunden godkänner att Biträdet använder underbiträden enligt listan under § 7 i
          Integritetspolicyn. Biträdet ska underrätta Kunden vid byte av underbiträde, varvid
          Kunden har rätt att invända inom 30 dagar.</p>
      </Clause>

      <Clause>
        <h3>6. Radering</h3>
        <p>Vid uppsägning av Tjänsten eller på Kundens begäran ska Biträdet radera eller
          anonymisera all transaktionsdata inom 24 timmar, såvida inte lag kräver lagring
          (t.ex. bokföringslagen för fakturaunderlag).</p>
      </Clause>

      <Clause>
        <h3>7. Personuppgiftsincident</h3>
        <p>Biträdet ska utan onödigt dröjsmål, dock senast 48 timmar efter det att Biträdet
          fått kännedom om en personuppgiftsincident som rör Kunden, meddela Kunden om
          incidenten samt vidtagna åtgärder.</p>
      </Clause>

      <FineprintBar>
        <strong>Arvo Flow AB</strong> · Org.nr 559500-0000 · Stockholm · Integritetspolicy &amp; DPA v1.2 ·
        Senast uppdaterad 2026-05-13. <br />
        Frågor: <a href="mailto:gdpr@arvo.flow" style={{ color: 'inherit', textDecoration: 'underline' }}>gdpr@arvo.flow</a>.
      </FineprintBar>
    </Body>

    <Cta>
      <h2>Vill du veta exakt vad vi har om dig?</h2>
      <p>
        Mejla <a className="mail" href="mailto:gdpr@arvo.flow">gdpr@arvo.flow</a> så får du ett
        komplett registerutdrag inom 30 dagar — utan kostnad.
      </p>
      <div className="actions">
        <Button as={Link} to="/villkor" $variant="primary" $size="lg">
          Läs allmänna villkor
        </Button>
        <Button as={Link} to="/" $variant="secondary" $size="lg">
          Tillbaka till startsidan
        </Button>
      </div>
    </Cta>

    <Footer />
  </Page>
);

export default Integritet;
