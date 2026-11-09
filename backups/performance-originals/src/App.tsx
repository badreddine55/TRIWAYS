import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { LangProvider } from '@/sections/LangContext';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import Home from '@/pages/Home';
import QuiSommesNous from '@/pages/QuiSommesNous';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';

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
      <ScrollOnNavigation />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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
