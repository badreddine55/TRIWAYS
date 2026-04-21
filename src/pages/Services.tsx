import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';

// --- Components ---

function TickerStrip({ services, cities }: { services: string[]; cities: any[] }) {
  const structuredItems: Array<{ type: string; text?: string; name?: string; flag?: string; country?: string }> = [];
  services.forEach((service: string, i: number) => {
    structuredItems.push({ type: 'service', text: service });
    if (cities[i]) {
      structuredItems.push({ type: 'city', ...cities[i] });
    }
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-white/5 py-3 md:py-4 overflow-hidden">
      <div className="ticker-wrapper">
        <motion.div
          className="ticker-content flex items-center gap-4 md:gap-6"
          animate={{ x: [0, -3000] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-4 md:gap-6 shrink-0">
              {structuredItems.map((item, i) => (
                <div key={`${setIndex}-${i}`} className="flex items-center gap-1 md:gap-2 shrink-0">
                  {item.type === 'city' ? (
                    <>
                      <span className="text-base md:text-lg leading-none">{item.flag}</span>
                      <span className="text-indigo-300 text-xs uppercase whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {item.name}
                      </span>
                      <span className="text-white/30 text-[10px] uppercase hidden sm:inline">{item.country}</span>
                    </>
                  ) : (
                    <span className="text-indigo-400/70 text-xs uppercase whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {item.text}
                    </span>
                  )}
                  <span className="text-white/20 text-xs mx-1 md:mx-2">•</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <style>{`
        .ticker-wrapper {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  sections?: Array<{ title: string; items: string[] }>;
  subsections?: Array<{
    id: string;
    title: string;
    description: string;
    items: string[];
    action?: { navigate: string; state: { openServiceId: string } };
  }>;
}

function ServiceAccordion({ service, isOpen, onToggle }: { service: ServiceItem; isOpen: boolean; onToggle: () => void }) {
  const navigate = useNavigate();
  const hasSubsections = service.subsections && service.subsections.length > 0;

  const handleSubsectionClick = (sub: any) => {
    console.log('Subsection clicked:', sub);
    console.log('Action:', sub.action);
    if (sub.action?.navigate) {
      console.log('Navigating to:', sub.action.navigate);
      navigate(sub.action.navigate, { state: sub.action.state });
    } else {
      console.log('No action found, navigating to services');
      // Fallback navigation
      navigate('/services', { state: { openServiceId: '03' } });
    }
  };

  return (
    <div className="border-b border-white/10 last:border-b-0">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full py-5 md:py-8 lg:py-10 flex items-center justify-between group hover:bg-white/[0.02] transition-colors px-4 sm:px-6 lg:px-12 xl:px-20"
      >
        <div className="flex items-center gap-3 md:gap-8 lg:gap-12 min-w-0">
          {/* Number */}
          <span 
            className="text-slate-500 text-xs md:text-base font-mono tracking-widest w-8 md:w-12 shrink-0"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {service.id}
          </span>
          
          {/* Title with accent line */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <span className={`w-px h-5 md:h-8 transition-all duration-300 shrink-0 ${isOpen ? 'bg-indigo-500' : 'bg-slate-700 group-hover:bg-slate-600'}`} />
            <h3 
              className={`text-base md:text-2xl lg:text-3xl xl:text-4xl font-medium transition-colors duration-300 text-left truncate ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Toggle Icon */}
        <div className={`w-7 h-7 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-3 md:ml-4 ${isOpen ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 group-hover:border-slate-500'}`}>
          {isOpen ? (
            <Minus size={14} className="text-indigo-400 md:w-5 md:h-5" />
          ) : (
            <Plus size={14} className="text-slate-400 group-hover:text-white md:w-5 md:h-5" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 lg:px-12 xl:px-20 pb-10 md:pb-16 lg:pb-20">
              
              {hasSubsections ? (
                // Transport National et International - 3 subsections layout
                <div className="space-y-6 md:space-y-8">
                  {/* Main description */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                    className="max-w-4xl"
                  >
                    <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {service.shortDesc}
                    </p>
                    <p className="text-slate-300 text-sm md:text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {service.fullDesc}
                    </p>
                  </motion.div>

                  {/* 3 Subsections Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {service.subsections?.map((sub, sIndex) => (
                      <motion.button
                        type="button"
                        key={sub.id}
                        id={sub.id}
                        onClick={() => handleSubsectionClick(sub)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 0.2 + sIndex * 0.1 }}
                        className="relative p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group text-left cursor-pointer pointer-events-auto"
                      >
                        {/* Subsection number */}
                        <div className="absolute top-3 right-3 md:top-4 md:right-4 text-3xl md:text-5xl lg:text-6xl font-bold text-white/5" style={{ fontFamily: 'Syne, sans-serif' }}>
                          0{sIndex + 1}
                        </div>

                        <h4 className="text-lg md:text-xl lg:text-2xl text-white mb-3 md:mb-4 relative z-10" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
                          {sub.title}
                        </h4>
                        
                        <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 relative z-10 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {sub.description}
                        </p>

                        <ul className="space-y-2 md:space-y-3 relative z-10">
                          {sub.items.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 md:gap-3 text-slate-300 text-xs md:text-sm">
                              <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-indigo-400 rounded-full mt-1.5 md:mt-2 shrink-0" />
                              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Hover accent line */}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 md:h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-500 rounded-b-xl md:rounded-b-2xl" />
                      </motion.button>
                    ))}
                  </div>

                  {/* Commitments */}
                  {service.sections && service.sections.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.5 }}
                      className="mt-6 md:mt-8 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-white/10"
                    >
                      <h4 className="text-white font-semibold mb-3 md:mb-4 flex items-center gap-2 md:gap-3 text-sm md:text-base" style={{ fontFamily: 'Syne, sans-serif' }}>
                        <span className="w-6 md:w-8 h-px bg-indigo-500" />
                        {service.sections[0]?.title || 'Our Commitments'}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        {service.sections[0]?.items?.map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gradient-to-r from-indigo-400 to-cyan-400 rotate-45 shrink-0" />
                            <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{item}</span>
                          </div>
                        )) || []}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                // Regular 2-column layout for other services
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
                  {/* Image */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                    className="relative rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[16/10]"
                  >
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="space-y-4 md:space-y-6 lg:space-y-8"
                  >
                    <div>
                      <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {service.shortDesc}
                      </p>
                      <p className="text-slate-300 text-sm md:text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {service.fullDesc}
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {service.sections?.map((section, sIndex) => (
                        <div key={sIndex}>
                          <h4 className="text-white font-semibold mb-2 md:mb-3 flex items-center gap-2 md:gap-3 text-sm md:text-base" style={{ fontFamily: 'Syne, sans-serif' }}>
                            <span className="w-4 md:w-6 h-px bg-indigo-500" />
                            {section.title}
                          </h4>
                          <ul className="space-y-1.5 md:space-y-2 pl-6 md:pl-9">
                            {section.items.map((item: string, i: number) => (
                              <li key={i} className="text-slate-400 text-xs md:text-sm lg:text-base leading-relaxed flex items-start gap-2 md:gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-indigo-400 rounded-full mt-2 md:mt-2.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Page ---

export default function Services() {
  const { lang } = useLang();
  const data = translations[lang].services;
  const location = useLocation();
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(
    location.state?.openServiceId ?? '03'
  );

  const toggleService = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Auto-scroll to accordion when navigating with state
  useEffect(() => {
    if (location.state?.openServiceId && accordionRef.current) {
      setTimeout(() => {
        accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [location.state?.openServiceId]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO page="services" />
      
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:h-screen overflow-hidden">
        <img 
          src="/assets/backimage.jpeg" 
          alt="Services Hero" 
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 opacity-30 md:opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-transparent to-purple-900/20" />

        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 py-20 md:py-0">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6 }}
              className="inline-block w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-indigo-500/15 text-indigo-300 text-xs md:text-sm border border-indigo-500/20 mb-4 md:mb-6"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <motion.span animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                {data.badge}
              </motion.span>
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(36px,10vw,80px)] text-white font-bold leading-[0.9] mb-4 md:mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {data.heading}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-400 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {data.subtitle}
            </motion.p>

            <motion.div 
              className="mt-8 md:mt-12"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
            >
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 w-fit"
              >
                <span className="text-slate-500 text-xs uppercase tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{data.discover}</span>
                <ChevronDown className="text-indigo-400" size={24} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <TickerStrip services={data.tickerServices} cities={data.tickerCities} />
      </section>

      {/* Services Accordion Section */}
      <section className="w-full bg-[#0a0a0a] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
        
        <div className="relative z-10 w-full">
          {/* Section Header - Full width with padding */}
          <div className="px-4 sm:px-6 lg:px-12 xl:px-20 pt-12 md:pt-20 lg:pt-24 pb-6 md:pb-10 lg:pb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="w-8 md:w-12 h-px bg-indigo-500" />
                <span className="text-indigo-400 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {data.section.expertise}
                </span>
              </div>
              <h2 className="text-[clamp(28px,6vw,64px)] text-white font-bold leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                {data.section.what}
              </h2>
            </motion.div>
          </div>

          {/* Accordion - Full width */}
          <motion.div 
            ref={accordionRef}
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="border-t border-white/10 w-full"
          >
            {data.items.map((service: ServiceItem) => (
              <ServiceAccordion 
                key={service.id} 
                service={service} 
                isOpen={openId === service.id} 
                onToggle={() => toggleService(service.id)} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 relative bg-slate-950/30 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
            className="text-center mb-10 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-indigo-300 text-xs md:text-sm font-medium mb-4 md:mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.methodology}
            </span>
            <h2 className="text-[clamp(24px,5vw,48px)] text-white font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              {data.process}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {data.processSteps.map((step: any, index: number) => (
              <motion.div 
                key={step.number} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1, duration: 0.6 }} 
                className="relative flex flex-col items-center text-center p-4 md:p-6"
              >
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-indigo-500/30 flex items-center justify-center mb-3 md:mb-6">
                  <span className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {step.number}
                  </span>
                </div>
                <h4 className="text-sm md:text-lg text-white mb-1 md:mb-2 font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {step.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-indigo-500 opacity-10 blur-[100px] md:blur-[180px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(24px,6vw,56px)] text-white font-bold mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {data.cta}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg mb-6 md:mb-8 mt-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.ctaSubtitle}
            </p>
            
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-black text-sm md:text-base font-semibold hover:bg-indigo-400 transition-colors"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {data.ctaButton}
                <span className="hidden md:inline">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
