import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    color-scheme: light;
    --bg: ${({ theme }) => theme.color.bg};
    --surface: ${({ theme }) => theme.color.surface};
    --ink: ${({ theme }) => theme.color.ink};
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  html, body, #root {
    min-height: 100%;
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.ink};
  }

  @media (prefers-color-scheme: dark) {
    html, body, #root {
      background: ${({ theme }) => theme.color.bg} !important;
      color: ${({ theme }) => theme.color.ink} !important;
    }
    * {
      forced-color-adjust: none;
    }
  }

  body {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 16px;
    line-height: 1.55;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.font.display};
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.08;
    color: ${({ theme }) => theme.color.ink};
  }

  p { color: ${({ theme }) => theme.color.inkSoft}; }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    color: inherit;
  }

  ul { list-style: none; }

  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.brand};
    outline-offset: 2px;
    border-radius: 4px;
  }

  ::selection {
    background: ${({ theme }) => theme.color.brand};
    color: #FFFFFF;
  }

  .tabular { font-variant-numeric: tabular-nums; }
`;
