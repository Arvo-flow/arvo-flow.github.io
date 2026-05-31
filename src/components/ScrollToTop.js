import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Direktanrop utan behavior — iOS Safari ignorerar 'instant' när
    // scroll-behavior: smooth är satt på html-elementet
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
