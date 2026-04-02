import React, { useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/global';

// ─── Theme Definitions ───────────────────────────────────────────────
const themes = {
  sand: {
    bg: '#f5f0e8',
    surface: '#ffffff',
    text: '#2d2d2d',
    textSecondary: '#6b6b6b',
    border: '#e0dcd4',
    tabBar: '#ffffff',
    sidebarBg: '#f5f0e8',
  },
  light: {
    bg: '#f7f7f7',
    surface: '#ffffff',
    text: '#1a1a1a',
    textSecondary: '#666666',
    border: '#e2e2e2',
    tabBar: '#ffffff',
    sidebarBg: '#f7f7f7',
  },
  dark: {
    bg: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#f0f0f0',
    textSecondary: '#aaaaaa',
    border: '#404040',
    tabBar: '#2d2d2d',
    sidebarBg: '#242424',
  },
};

const ACCENT = '#3a7d6e';
const DANGER = '#e53e3e';
const DARK_INDICATOR = '#888888';

const currencySymbols = { SEK: 'kr', EUR: '€', USD: '$', GBP: '£' };

// ─── Mock Data ───────────────────────────────────────────────────────
const mockContacts = [
  { id: 1, name: 'Anna Lindberg', email: 'anna@lindberg.se', phone: '+46 70 123 4567' },
  { id: 2, name: 'Erik Svensson', email: 'erik@svensson.com', phone: '+46 73 987 6543' },
  { id: 3, name: 'Maria Johansson', email: 'maria@johansson.se', phone: '+46 72 555 1234' },
  { id: 4, name: 'Oscar Nilsson', email: 'oscar@nilsson.com', phone: '+46 76 111 2233' },
  { id: 5, name: 'Sofia Berg', email: 'sofia@berg.se', phone: '+46 70 444 5566' },
];

const mockProjects = [
  { id: 1, name: 'Website Redesign', client: 'Anna Lindberg', status: 'active', budget: 45000 },
  { id: 2, name: 'Mobile App', client: 'Erik Svensson', status: 'active', budget: 120000 },
  { id: 3, name: 'Brand Identity', client: 'Maria Johansson', status: 'active', budget: 25000 },
  { id: 4, name: 'SEO Audit', client: 'Oscar Nilsson', status: 'completed', budget: 15000 },
];

const mockInvoices = [
  { id: 'INV-001', client: 'Anna Lindberg', amount: 15000, status: 'paid', due: '2026-03-15' },
  { id: 'INV-002', client: 'Erik Svensson', amount: 40000, status: 'unpaid', due: '2026-04-10' },
  { id: 'INV-003', client: 'Maria Johansson', amount: 25000, status: 'overdue', due: '2026-03-01' },
  { id: 'INV-004', client: 'Oscar Nilsson', amount: 15000, status: 'paid', due: '2026-03-20' },
  { id: 'INV-005', client: 'Sofia Berg', amount: 8500, status: 'unpaid', due: '2026-04-15' },
];

const mockTimeEntries = [
  { id: 1, project: 'Website Redesign', task: 'Homepage design', hours: 3.5, date: '2026-03-31' },
  { id: 2, project: 'Mobile App', task: 'API integration', hours: 5.0, date: '2026-03-31' },
  { id: 3, project: 'Brand Identity', task: 'Logo concepts', hours: 2.0, date: '2026-04-01' },
  { id: 4, project: 'Mobile App', task: 'UI components', hours: 4.0, date: '2026-04-01' },
  { id: 5, project: 'Website Redesign', task: 'Responsive layout', hours: 3.0, date: '2026-04-02' },
  { id: 6, project: 'Brand Identity', task: 'Color palette', hours: 1.5, date: '2026-04-02' },
];

// ─── Icons (inline SVG paths) ────────────────────────────────────────
const TabIcons = {
  overview: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  contacts: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  projects: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  invoices: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  time: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

// ─── Avatar Component ────────────────────────────────────────────────
function Avatar({ name, size = 40 }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase();
  const colors = ['#3a7d6e', '#6b8f71', '#d4a574', '#7c9eb2', '#b07d9e'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return (
    <AvatarCircle size={size} color={colors[colorIndex]}>
      {initials}
    </AvatarCircle>
  );
}

// ─── Overview Tab ────────────────────────────────────────────────────
function OverviewTab({ cardVisibility, currency }) {
  const sym = currencySymbols[currency];
  const activeProjects = mockProjects.filter((p) => p.status === 'active').length;
  const unpaidInvoices = mockInvoices.filter((i) => i.status === 'unpaid' || i.status === 'overdue');
  const unpaidTotal = unpaidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const hoursThisWeek = mockTimeEntries.reduce((sum, e) => sum + e.hours, 0);
  const totalContacts = mockContacts.length;
  const overdueInvoices = mockInvoices.filter((i) => i.status === 'overdue');

  return (
    <PageContainer>
      <PageTitle>Overview</PageTitle>
      <StatsGrid>
        {cardVisibility.activeProjects && (
          <StatCard>
            <StatLabel>Active Projects</StatLabel>
            <StatValue>{activeProjects}</StatValue>
          </StatCard>
        )}
        {cardVisibility.unpaidInvoices && (
          <StatCard>
            <StatLabel>Unpaid Invoices</StatLabel>
            <StatValue>{sym}{unpaidTotal.toLocaleString()}</StatValue>
            <StatSub>{unpaidInvoices.length} invoices</StatSub>
          </StatCard>
        )}
        {cardVisibility.hoursThisWeek && (
          <StatCard>
            <StatLabel>Hours This Week</StatLabel>
            <StatValue>{hoursThisWeek}h</StatValue>
          </StatCard>
        )}
        {cardVisibility.totalContacts && (
          <StatCard>
            <StatLabel>Total Contacts</StatLabel>
            <StatValue>{totalContacts}</StatValue>
          </StatCard>
        )}
      </StatsGrid>

      {overdueInvoices.length > 0 && (
        <Section>
          <SectionTitle>Overdue</SectionTitle>
          {overdueInvoices.map((inv) => (
            <ListItem key={inv.id} style={{ borderLeftColor: DANGER }}>
              <ListItemRow>
                <ListItemTitle style={{ color: DANGER }}>{inv.id}</ListItemTitle>
                <OverdueAmount>{sym}{inv.amount.toLocaleString()}</OverdueAmount>
              </ListItemRow>
              <ListItemSub>{inv.client} &middot; Due {inv.due}</ListItemSub>
            </ListItem>
          ))}
        </Section>
      )}

      <Section>
        <SectionTitle>Recent Activity</SectionTitle>
        {mockTimeEntries.slice(0, 3).map((entry) => (
          <ListItem key={entry.id}>
            <ListItemRow>
              <ListItemTitle>{entry.project}</ListItemTitle>
              <Badge>{entry.hours}h</Badge>
            </ListItemRow>
            <ListItemSub>{entry.task} &middot; {entry.date}</ListItemSub>
          </ListItem>
        ))}
      </Section>
    </PageContainer>
  );
}

// ─── Contacts Tab ────────────────────────────────────────────────────
function ContactsTab() {
  return (
    <PageContainer>
      <PageTitle>Contacts</PageTitle>
      {mockContacts.map((contact) => (
        <ContactItem key={contact.id}>
          <Avatar name={contact.name} />
          <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <ContactDetail>{contact.email}</ContactDetail>
            <ContactDetail>{contact.phone}</ContactDetail>
          </ContactInfo>
        </ContactItem>
      ))}
    </PageContainer>
  );
}

// ─── Projects Tab ────────────────────────────────────────────────────
function ProjectsTab({ currency }) {
  const sym = currencySymbols[currency];
  return (
    <PageContainer>
      <PageTitle>Projects</PageTitle>
      {mockProjects.map((project) => (
        <ListItem key={project.id}>
          <ListItemRow>
            <ListItemTitle>{project.name}</ListItemTitle>
            <StatusBadge active={project.status === 'active'}>{project.status}</StatusBadge>
          </ListItemRow>
          <ListItemSub>{project.client} &middot; Budget: {sym}{project.budget.toLocaleString()}</ListItemSub>
        </ListItem>
      ))}
    </PageContainer>
  );
}

// ─── Invoices Tab ────────────────────────────────────────────────────
function InvoicesTab({ currency }) {
  const sym = currencySymbols[currency];
  return (
    <PageContainer>
      <PageTitle>Invoices</PageTitle>
      {mockInvoices.map((inv) => (
        <ListItem key={inv.id} style={inv.status === 'overdue' ? { borderLeftColor: DANGER } : {}}>
          <ListItemRow>
            <div>
              <ListItemTitle style={inv.status === 'overdue' ? { color: DANGER } : {}}>{inv.id}</ListItemTitle>
              <ListItemSub>{inv.client}</ListItemSub>
            </div>
            <div style={{ textAlign: 'right' }}>
              <InvoiceAmount overdue={inv.status === 'overdue'}>{sym}{inv.amount.toLocaleString()}</InvoiceAmount>
              <InvoiceStatus status={inv.status}>{inv.status}</InvoiceStatus>
            </div>
          </ListItemRow>
          <ListItemSub>Due {inv.due}</ListItemSub>
        </ListItem>
      ))}
    </PageContainer>
  );
}

// ─── Time Tab ────────────────────────────────────────────────────────
function TimeTab() {
  const totalHours = mockTimeEntries.reduce((sum, e) => sum + e.hours, 0);
  return (
    <PageContainer>
      <PageTitle>Time Tracking</PageTitle>
      <StatCard style={{ marginBottom: 20 }}>
        <StatLabel>Total Logged</StatLabel>
        <StatValue>{totalHours}h</StatValue>
      </StatCard>
      {mockTimeEntries.map((entry) => (
        <ListItem key={entry.id}>
          <ListItemRow>
            <ListItemTitle>{entry.task}</ListItemTitle>
            <Badge>{entry.hours}h</Badge>
          </ListItemRow>
          <ListItemSub>{entry.project} &middot; {entry.date}</ListItemSub>
        </ListItem>
      ))}
    </PageContainer>
  );
}

// ─── Sidebar Menu ────────────────────────────────────────────────────
function Sidebar({ isOpen, onClose, themeName, setThemeName, currency, setCurrency, cardVisibility, setCardVisibility }) {
  const toggleCard = (key) => {
    setCardVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Arvo OS</SidebarTitle>
          <CloseButton onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </SidebarHeader>

        <SidebarSection>
          <SidebarSectionTitle>Dashboard Cards</SidebarSectionTitle>
          {[
            { key: 'activeProjects', label: 'Active Projects' },
            { key: 'unpaidInvoices', label: 'Unpaid Invoices' },
            { key: 'hoursThisWeek', label: 'Hours This Week' },
            { key: 'totalContacts', label: 'Total Contacts' },
          ].map(({ key, label }) => (
            <ToggleRow key={key}>
              <ToggleLabel>{label}</ToggleLabel>
              <Toggle active={cardVisibility[key]} onClick={() => toggleCard(key)}>
                <ToggleKnob active={cardVisibility[key]} />
              </Toggle>
            </ToggleRow>
          ))}
        </SidebarSection>

        <SidebarSection>
          <SidebarSectionTitle>Theme</SidebarSectionTitle>
          <OptionGroup>
            {['sand', 'light', 'dark'].map((t) => (
              <OptionButton key={t} active={themeName === t} onClick={() => setThemeName(t)}>
                {t === 'dark' && <DarkDot />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </OptionButton>
            ))}
          </OptionGroup>
        </SidebarSection>

        <SidebarSection>
          <SidebarSectionTitle>Currency</SidebarSectionTitle>
          <OptionGroup>
            {['SEK', 'EUR', 'USD', 'GBP'].map((c) => (
              <OptionButton key={c} active={currency === c} onClick={() => setCurrency(c)}>
                {c}
              </OptionButton>
            ))}
          </OptionGroup>
        </SidebarSection>
      </SidebarContainer>
    </>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
const tabs = ['overview', 'contacts', 'projects', 'invoices', 'time'];
const tabLabels = { overview: 'Overview', contacts: 'Contacts', projects: 'Projects', invoices: 'Invoices', time: 'Time' };

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [themeName, setThemeName] = useState('sand');
  const [currency, setCurrency] = useState('SEK');
  const [cardVisibility, setCardVisibility] = useState({
    activeProjects: true,
    unpaidInvoices: true,
    hoursThisWeek: true,
    totalContacts: true,
  });

  const theme = themes[themeName];

  const renderTab = useCallback(() => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab cardVisibility={cardVisibility} currency={currency} />;
      case 'contacts':
        return <ContactsTab />;
      case 'projects':
        return <ProjectsTab currency={currency} />;
      case 'invoices':
        return <InvoicesTab currency={currency} />;
      case 'time':
        return <TimeTab />;
      default:
        return <OverviewTab cardVisibility={cardVisibility} currency={currency} />;
    }
  }, [activeTab, cardVisibility, currency]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HamburgerButton onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </HamburgerButton>
          <HeaderTitle>Arvo OS</HeaderTitle>
          <HeaderSpacer />
        </Header>

        <Content>{renderTab()}</Content>

        <TabBar>
          {tabs.map((tab) => (
            <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {TabIcons[tab](activeTab === tab)}
              <TabLabel active={activeTab === tab}>{tabLabels[tab]}</TabLabel>
            </TabButton>
          ))}
        </TabBar>

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          themeName={themeName}
          setThemeName={setThemeName}
          currency={currency}
          setCurrency={setCurrency}
          cardVisibility={cardVisibility}
          setCardVisibility={setCardVisibility}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

// ─── Styled Components ───────────────────────────────────────────────

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 10;
`;

const HamburgerButton = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 4px;
`;

const HeaderTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  color: ${ACCENT};
`;

const HeaderSpacer = styled.div`
  width: 32px;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const PageContainer = styled.div`
  padding: 20px;
  padding-bottom: 100px;
`;

const PageTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 28px;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 16px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

const StatSub = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text};
`;

const ListItem = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 3px solid ${ACCENT};
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 8px;
`;

const ListItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ListItemTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const ListItemSub = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const Badge = styled.span`
  background: ${ACCENT}18;
  color: ${ACCENT};
  font-size: 13px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
`;

const OverdueAmount = styled.span`
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 400;
  font-size: 16px;
  color: ${DANGER};
`;

const StatusBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 12px;
  background: ${({ active }) => (active ? `${ACCENT}18` : '#88888818')};
  color: ${({ active }) => (active ? ACCENT : '#888')};
`;

const InvoiceAmount = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 400;
  font-size: 16px;
  color: ${({ overdue }) => (overdue ? DANGER : 'inherit')};
`;

const InvoiceStatus = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ status }) =>
    status === 'paid' ? ACCENT : status === 'overdue' ? DANGER : '#c89000'};
  margin-top: 2px;
`;

// Contacts
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const AvatarCircle = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ color }) => color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ size }) => size * 0.38}px;
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ContactName = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const ContactDetail = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Tab Bar
const TabBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  background: ${({ theme }) => theme.tabBar};
  border-top: 1px solid ${({ theme }) => theme.border};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  z-index: 10;
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${({ active, theme }) => (active ? ACCENT : theme.textSecondary)};
  padding: 4px 8px;
  transition: color 0.2s;
`;

const TabLabel = styled.span`
  font-size: 10px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: inherit;
`;

// Sidebar
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: ${({ theme }) => theme.sidebarBg};
  z-index: 101;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 0 20px 40px;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 20px;
`;

const SidebarTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  color: ${ACCENT};
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.textSecondary};
  padding: 4px;
`;

const SidebarSection = styled.div`
  margin-bottom: 28px;
`;

const SidebarSectionTitle = styled.h4`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 14px;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Toggle = styled.div`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${({ active }) => (active ? ACCENT : '#ccc')};
  padding: 2px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
`;

const ToggleKnob = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  transform: translateX(${({ active }) => (active ? '20px' : '0')});
`;

const OptionGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid ${({ active }) => (active ? ACCENT : 'transparent')};
  background: ${({ active, theme }) => (active ? `${ACCENT}15` : theme.surface)};
  color: ${({ active, theme }) => (active ? ACCENT : theme.text)};
  transition: all 0.2s;
`;

const DarkDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${DARK_INDICATOR};
  display: inline-block;
`;
