import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';
// WhatsApp SVG icon (lucide doesn't have WhatsApp)
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EMAIL_ADDRESS = 'sales@triwayslogistics.ma';

export default function Hero() {
  const { lang } = useLang();
  const heroData = translations[lang].hero;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = heroData.slides.map((slide, index) => ({
    id: index + 1,
    image: [
      '/assets/International_Transport.jpeg',
      '/assets/gestion_.jpg',
      '/assets/consultation.jpeg',
    ][index],
    title: slide.title,
  }));

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${heroData.whatsapp.number}&text=${encodeURIComponent(heroData.whatsapp.message)}`;

  const emailSubject = lang === 'fr' ? 'Demande d\'informations' : 'Information request';
  const emailBody = lang === 'fr'
    ? 'Bonjour,\n\nJe souhaite avoir plus d\'informations sur vos services logistiques.\n\nCordialement,'
    : 'Hello,\n\nI would like more information about your logistics services.\n\nBest regards,';
  const emailUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;


  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden bg-slate-950">

      {/* Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: index === currentSlide ? 1.08 : 1 }}
              transition={{ duration: 6, ease: 'linear' }}
              className="absolute inset-0"
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-purple-900/40" />
        </motion.div>
      ))}

      {/* ── Left Side — Social Icons ── */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

        {[
          { href: '#', icon: <Facebook size={18} />, label: 'Facebook' },
          { href: 'https://www.instagram.com/triways_logistics', icon: <Instagram size={18} />, label: 'Instagram' },
          { href: 'https://www.linkedin.com/company/triways-logistics', icon: <Linkedin size={18} />, label: 'LinkedIn' },
          {
            href: whatsappUrl,
            icon: <WhatsAppIcon />,
            label: 'WhatsApp',
            isWhatsApp: true,
          },
        ].map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            aria-label={social.label}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              social.isWhatsApp
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/40 hover:text-green-300'
                : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
            }`}
          >
            {social.icon}
          </motion.a>
        ))}

        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              {heroData.badge}
            </span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight whitespace-pre-line"
            >
              {slides[currentSlide].title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto"
          >
            {heroData.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                {heroData.cta1}
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/20 transition-all"
              >
                {heroData.cta2}
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-gradient-to-r from-indigo-400 to-purple-500'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Right Side - Scroll Indicator */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20">
        <span className="text-xs font-medium text-white/50 tracking-[0.2em] rotate-90 origin-center whitespace-nowrap mb-8">
          {heroData.scrollText}
        </span>
        <motion.button
          onClick={() => scrollToSection('qui-sommes-nous')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all mt-8"
        >
          <ArrowDown size={20} />
        </motion.button>
      </div>

      <motion.a
        href={emailUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Send us an email"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-white shadow-lg hover:shadow-orange-500/40 transition-all group"
      >
        <Mail size={20} />
        <span className="text-sm font-semibold whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
          {heroData.emailCta}
        </span>
      </motion.a>

    </section>
  );
}