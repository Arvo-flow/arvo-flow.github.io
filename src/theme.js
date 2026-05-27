const theme = {
  color: {
    bg: '#F1F6F3',
    surface: '#FFFFFF',
    surfaceAlt: '#E5EFEA',
    surfaceSunken: '#D8E6E0',
    ink: '#0E1A17',
    inkSoft: '#1F2E2A',
    muted: '#3F4B47',         // bumped from #5C6E68 — ~7.8:1 on bg (was ~4.85:1)
    mutedSoft: '#5C6E68',     // bumped from #8A988F — ~5.0:1 on bg (was ~3.0:1, failed AA)
    border: '#D5E2DC',
    borderStrong: '#BACBC2',

    brand: '#1B7A6E',
    brandLight: '#4FBFB3',
    brandSoft: '#DCEEEA',
    brandInk: '#0E4F47',
    brandGradient: 'linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)',
    brandGradientHover: 'linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)',

    accent: '#4FBFB3',
    accentSoft: '#E0F1ED',

    success: '#1B7A6E',
    successSoft: '#DCEEEA',
    danger: '#9F3B22',
    dangerSoft: '#F4DAD0',
    warning: '#A8761A',
    warningSoft: '#F3E5C7',
  },

  font: {
    display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
    xs: '0 1px 2px rgba(14, 26, 23, 0.04)',
    sm: '0 2px 8px rgba(14, 26, 23, 0.06)',
    md: '0 8px 24px rgba(14, 26, 23, 0.08)',
    lg: '0 24px 60px rgba(14, 26, 23, 0.12)',
    brand: '0 12px 32px rgba(27, 122, 110, 0.28)',
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
