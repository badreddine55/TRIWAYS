import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';

function WhatsAppIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

  const { number, message } = translations[lang].hero.whatsapp;
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  const navLinks = [
    { path: '/', label: navData.home },
    { path: '/qui-sommes-nous', label: navData.about },
    { path: '/services', label: navData.services },
    { path: '/contact', label: navData.contact },
  ];

  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/triways_logistics', label: 'Instagram', isWhatsApp: false },
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/triways-logistcs-company/', label: 'LinkedIn', isWhatsApp: false },
    { Icon: null, href: whatsappUrl, label: 'WhatsApp', isWhatsApp: true },
  ];

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
                      <p className="text-[10px] text-indigo-500 tracking-[0.25em]">LOGISTICS</p>
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
                  {socialLinks.map(({ Icon, href, label, isWhatsApp }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`p-2.5 rounded-full transition-colors ${
                        isWhatsApp
                          ? 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-600'
                          : 'bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      {isWhatsApp ? <WhatsAppIcon size={17} /> : Icon && <Icon size={17} />}
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