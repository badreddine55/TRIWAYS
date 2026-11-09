import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { LangProvider } from '@/sections/LangContext';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
const Home = lazy(() => import('@/pages/Home'));
const QuiSommesNous = lazy(() => import('@/pages/QuiSommesNous'));
const Services = lazy(() => import('@/pages/Services'));
const Contact = lazy(() => import('@/pages/Contact'));

function ScrollOnNavigation() {
  const location = useLocation();

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const serviceId = location.state?.openServiceId;
    const serviceHeader = location.pathname === '/services' && typeof serviceId === 'string'
      ? document.getElementById(`service-${serviceId}`)
      : null;

    if (serviceHeader) {
      serviceHeader.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-slate-950" aria-busy="true" />}>
          <ScrollOnNavigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}

export default App;
