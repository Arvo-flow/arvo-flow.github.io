const theme = {
  color: {
    bg: '#FAFAF7',
    surface: '#FFFFFF',
    surfaceAlt: '#F2EEE5',
    surfaceSunken: '#EFEAE0',
    ink: '#0F0F0E',
    inkSoft: '#2A2925',
    muted: '#6F6C65',
    mutedSoft: '#9C9890',
    border: '#E7E2D6',
    borderStrong: '#D6D0C0',

    brand: '#0F5132',
    brandSoft: '#E5EFE9',
    brandInk: '#0A3320',

    accent: '#C8804A',
    accentSoft: '#F5E7D6',

    success: '#1F5C42',
    successSoft: '#DEEBE2',
    danger: '#9F3B22',
    dangerSoft: '#F4DAD0',
    warning: '#A8761A',
    warningSoft: '#F3E5C7',
  },

  font: {
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },

  size: {
    radius: {
      sm: '6px',
      md: '12px',
      lg: '20px',
      xl: '28px',
      pill: '999px',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '96px',
      10: '128px',
    },
    container: '1180px',
    containerNarrow: '960px',
  },

  shadow: {
    xs: '0 1px 2px rgba(15, 15, 14, 0.04)',
    sm: '0 2px 8px rgba(15, 15, 14, 0.06)',
    md: '0 8px 24px rgba(15, 15, 14, 0.08)',
    lg: '0 24px 60px rgba(15, 15, 14, 0.12)',
    inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
  },

  motion: {
    fast: '160ms cubic-bezier(0.2, 0, 0, 1)',
    base: '240ms cubic-bezier(0.2, 0, 0, 1)',
    slow: '420ms cubic-bezier(0.2, 0, 0, 1)',
    spring: '520ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  z: {
    base: 1,
    nav: 50,
    overlay: 80,
    modal: 100,
  },
};

export default theme;
