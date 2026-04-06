import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isActive = (path: string) => location.pathname === path;
  const navData = translations[lang].nav;
  const navLinks = [
    { path: '/', label: navData.home },
    { path: '/qui-sommes-nous', label: navData.about },
    { path: '/services', label: navData.services },
    { path: '/contact', label: navData.contact },
  ];

  // Pill switcher — reused in desktop & mobile
  const LangSwitcher = ({ dark = false }: { dark?: boolean }) => (
    <div
      className={`flex items-center gap-0.5 p-1 rounded-full ${
        dark
          ? 'bg-slate-100 border border-slate-200'
          : 'bg-white/10 backdrop-blur-md border border-white/20'
      }`}
    >
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
            lang === l
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow'
              : dark
              ? 'text-slate-500 hover:text-slate-700'
              : 'text-white/60 hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? 'top-4 left-4 right-4' : 'top-0 left-0 right-0'
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20 px-6'
              : isHome
              ? 'bg-transparent px-4 sm:px-6 lg:px-12 xl:px-20'
              : 'bg-white/95 backdrop-blur-md shadow-lg px-4 sm:px-6 lg:px-12 xl:px-20'
          }`}
        >
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <Link to="/">
              <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.02 }}>
                <img
                  src="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
                  alt="TRIWAYS logo"
                  className={`w-20 h-20 object-contain transition-all duration-300 ${
                    isScrolled || !isHome ? 'brightness-75' : 'brightness-0 invert'
                  }`}
                />
              </motion.div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isScrolled || !isHome
                      ? isActive(link.path) ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                      : isActive(link.path) ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled || !isHome
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                          : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* ── Desktop Right: Lang Switcher + CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              <LangSwitcher dark={isScrolled || !isHome} />
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isScrolled || !isHome
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                      : 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
                  }`}
                >
                  {navData.cta}
                </motion.button>
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled || !isHome
                  ? 'text-slate-900 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`fixed left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden ${
                isScrolled ? 'top-28' : 'top-24'
              }`}
            >
              <div className="p-6">

                {/* Drawer header: logo + lang switcher */}
                <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
                      alt="TRIWAYS logo"
                      className="w-9 h-9 object-contain brightness-75"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">TRIWAYS</p>
                      <p className="text-[10px] text-indigo-500 tracking-[0.25em]">INTERNATIONAL</p>
                    </div>
                  </div>
                  <LangSwitcher dark />
                </div>

                {/* Links */}
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                          isActive(link.path)
                            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Social icons */}
                <div className="flex items-center justify-center gap-3 mt-6 pt-5 border-t border-slate-100">
                  {[
                    { Icon: Facebook, href: '#' },
                    { Icon: Instagram, href: '#' },
                    { Icon: Linkedin, href: '#' },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
                  >
                    {navData.cta}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}