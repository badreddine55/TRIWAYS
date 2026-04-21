import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';
import {
  Quote,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { ImageSwiper } from "../components/ui/image-swiper";

// ── Noise utility ──────────────────────────────────────────────────────────────

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const NoiseOverlay = ({ opacity = 0.15 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 mix-blend-overlay pointer-events-none"
    style={{ backgroundImage: NOISE_SVG, opacity }}
  />
);

// ── Shared Components ─────────────────────────────────────────────────────────

const GlassBadge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ size?: number }> }) => (
  <motion.span whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-indigo-300 text-xs md:text-sm font-medium">
    {Icon && <Icon size={14} />}{children}
  </motion.span>
);

const GlassButton = ({ children, to, onClick, variant = 'primary' }: {
  children: React.ReactNode; to?: string; onClick?: () => void; variant?: 'primary' | 'secondary';
}) => {
  const content = (
    <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`group relative px-6 py-3 md:px-8 md:py-4 rounded-full overflow-hidden font-semibold transition-all duration-300 text-sm md:text-base ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40'
          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
      }`}>
      <span className="relative flex items-center gap-2">
        {children}
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={18} /></motion.span>
      </span>
    </motion.button>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};

// ── Data (UNCHANGED) ───────────────────────────────────────────────────────────

const galleryImages = [
  { src: '/assets/gallery/image1.jpeg', alt: 'Image 1' },
  { src: '/assets/gallery/image2.jpeg', alt: 'Image 2' },
  { src: '/assets/gallery/image3.jpeg', alt: 'Image 3' },
  { src: '/assets/gallery/image4.jpeg', alt: 'Image 4' },
  { src: '/assets/gallery/image5.jpeg', alt: 'Image 5' },
  { src: '/assets/gallery/image6.jpeg', alt: 'Image 6' },
  { src: '/assets/gallery/image7.jpeg', alt: 'Image 7' },
  { src: '/assets/gallery/image8.jpeg', alt: 'Image 8' },
  { src: '/assets/gallery/image9.jpeg', alt: 'Image 9' },
  { src: '/assets/gallery/image10.jpeg', alt: 'Image 10' },
  { src: '/assets/gallery/image11.jpeg', alt: 'Image 11' },
  { src: '/assets/gallery/image12.jpeg', alt: 'Image 12' },
  { src: '/assets/gallery/image13.jpeg', alt: 'Image 13' },
  { src: '/assets/gallery/image14.jpeg', alt: 'Image 14' },
  { src: '/assets/gallery/image15.jpeg', alt: 'Image 15' },
  { src: '/assets/gallery/image16.jpeg', alt: 'Image 16' },
  { src: '/assets/gallery/image17.jpeg', alt: 'Image 17' },
  { src: '/assets/gallery/image18.jpeg', alt: 'Image 18' },
  { src: '/assets/gallery/image19.jpeg', alt: 'Image 19' },
  { src: '/assets/gallery/image20.jpeg', alt: 'Image 20' },
  { src: '/assets/gallery/image21.jpeg', alt: 'Image 21' },
  { src: '/assets/gallery/image22.jpeg', alt: 'Image 22' },
  { src: '/assets/gallery/image23.jpeg', alt: 'Image 23' },
  { src: '/assets/gallery/image24.jpeg', alt: 'Image 24' },
];

// ── Animation Utilities ───────────────────────────────────────────────────────

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};

// ── Sections (Redesigned with Home Page Colors) ───────────────────────────────

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const { lang } = useLang();
  const data = translations[lang].about;

  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x: x * 5, y: -y * 5 });
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-purple-900/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex justify-center lg:justify-start">
                <GlassBadge icon={CheckCircle}>{data.heroBadge}</GlassBadge>
              </div>

              <div className="mt-6 md:mt-8">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-indigo-400 text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 flex items-center justify-center lg:justify-start gap-2 md:gap-3"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <span className="inline-block w-6 md:w-8 h-px bg-indigo-400" />
                  {data.heroEyebrow}
                </motion.p>

                <h1 className="leading-none tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-extrabold uppercase text-white leading-none"
                    style={{ letterSpacing: '-0.03em', fontSize: 'clamp(28px,8vw,64px)' }}
                  >
                    TRIWAYS
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-extrabold uppercase leading-none mt-1 md:mt-2"
                    style={{
                      letterSpacing: '-0.03em',
                      fontSize: 'clamp(18px,4vw,40px)',
                      backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #c084fc 40%, #67e8f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    LOGISTICS
                  </motion.span>
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 origin-left mx-auto lg:mx-0"
                  style={{ width: '100%', maxWidth: '320px' }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="mt-6 md:mt-8 text-base md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {data.heroTagline}
              </motion.p>
            </motion.div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, rotateX: 15, rotateY: -15 }}
              animate={{ opacity: 1, rotateX: reduced ? 0 : mousePosition.y, rotateY: reduced ? 0 : mousePosition.x }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
                <img
                  src="/assets/about1.jpeg"
                  alt={data.heroImageAlt}
                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <div className="text-indigo-400 text-xs md:text-sm font-mono uppercase tracking-widest mb-1 md:mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {data.heroImageLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ticker */}
        <div className="mt-12 md:mt-16 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-4 md:gap-8 mr-4 md:mr-8">
                {data.tickerCities.map((city) => (
                  <span
                    key={`${setIndex}-${city.name}`}
                    className="flex items-center gap-2 md:gap-4 text-slate-500 text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <span className="text-lg md:text-2xl" title={city.country}>{city.flag}</span>
                    <span className="hidden sm:inline">{city.name}</span>
                    <span className="sm:hidden">{city.name.substring(0, 3)}</span>
                    <span className="text-indigo-400">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 30s linear infinite; }
        @media (max-width: 640px) { .animate-ticker { animation: ticker 20s linear infinite; } }
      `}</style>
    </section>
  );
}

function MissionStatement() {
  const { lang } = useLang();
  const data = translations[lang].about;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const words = data.missionWords;
  const quoteLines = data.mission.description;

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-12 md:mb-16 origin-left"
        />

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-16">
          {words.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 200 }}
              className="px-4 md:px-8 py-2 md:py-4 rounded-full border border-indigo-400/30 bg-indigo-400/5 backdrop-blur-sm"
            >
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xl md:text-2xl md:text-3xl text-indigo-400 font-semibold"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {data.mission.heading}
          </motion.span>
          <div className="mt-4 md:mt-6 space-y-1 md:space-y-2">
            {quoteLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-xl lg:text-2xl text-slate-300 leading-relaxed px-4 sm:px-0"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CEOQuote() {
  const { lang } = useLang();
  const data = translations[lang].about;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();

  const quoteText = data.ceoQuote.text;
  const words = quoteText.split(' ');

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1 h-1 md:h-auto bg-gradient-to-r md:bg-gradient-to-b from-indigo-400 to-purple-500 origin-left md:origin-top"
            />

            <div className="flex-1">
              <Quote className="w-10 h-10 md:w-16 md:h-16 text-indigo-400/20 mb-4 md:mb-6" />

              <p className="text-base md:text-xl lg:text-2xl text-slate-300 leading-relaxed mb-6 md:mb-8 italic" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                "{words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * (reduced ? 0 : 0.015), duration: 0.3 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}"
              </p>

              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-white text-base md:text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{data.ceoTitle}</p>
                  <p className="text-slate-400 text-sm md:text-base">{data.ceoCompany}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ping {
          0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          100% { box-shadow: 0 0 0 20px rgba(99,102,241,0); }
        }
      `}</style>
    </section>
  );
}



// ── NEW ServicesDetail Style ──────────────────────────────────────────────────

function ServicesDetail() {
  const { lang } = useLang();
  const data = translations[lang].about;
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center">
            <GlassBadge icon={Zap}>{data.servicesBadge}</GlassBadge>
          </div>
          <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            {data.servicesHeading}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">{data.servicesHeadingGradient}</span>
          </h2>
        </motion.div>

        {/* New Tabbed Interface */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Side - Service Navigation */}
          <div className="lg:col-span-4 space-y-3 md:space-y-4">
            {data.services.map((service, index) => (
              <motion.button
                key={service.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveService(index)}
                className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 group ${
                  activeService === index
                    ? 'bg-indigo-500/10 border-indigo-400/30 shadow-lg shadow-indigo-500/10'
                    : 'bg-white/5 border-white/10 hover:border-indigo-400/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-wider block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      0{index + 1}
                    </span>
                    <h3 className={`text-sm md:text-lg font-bold transition-colors truncate ${activeService === index ? 'text-white' : 'text-slate-300'}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                      {service.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Side - Active Service Display */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              {/* Large Image Card */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 group">
                <div className="aspect-video">
                  <img
                    src={data.services[activeService].src_imge}
                    alt={data.services[activeService].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />


                {/* Large Number Overlay */}
                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                  <span className="text-6xl md:text-[120px] font-extrabold text-white/5 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                    0{activeService + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-base md:text-lg text-slate-300 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {data.services[activeService].description}
                </p>


                {/* CTA */}
                <div className="pt-2 md:pt-4">
                  <GlassButton to="/contact">
                    {data.servicesCta}
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { lang } = useLang();
  const data = translations[lang].about;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex justify-center">
            <GlassBadge icon={Award}>{data.whyChooseBadge}</GlassBadge>
          </div>
          <h2 
            className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white" 
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {data.whyChooseHeading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              {lang === 'fr' ? 'choisir' : 'us'}
            </span>
            ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.whyChooseUs.map((item, index) => {
            const isCTA = index === 6; // Last item (Service après-vente)

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div 
                  className={`relative p-6 md:p-8 rounded-xl md:rounded-2xl overflow-hidden h-full border transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] ${
                    isCTA 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400/30' 
                      : 'bg-white/5 border-white/10 hover:border-indigo-400/30'
                  }`}
                >
                  <h4 
                    className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3" 
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {item.title}
                  </h4>
                  
                  <p 
                    className={`text-sm md:text-base leading-relaxed ${
                      isCTA ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-300'
                    } transition-colors`}
                  >
                    {item.description}
                  </p>

                  {/* CTA Button on last card */}
                  {isCTA && (
                    <motion.div 
                      className="mt-6"
                      whileHover={{ x: 5 }}
                    >
                      <Link 
                        to="/contact"
                        className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {data.whyChooseCtaText}
                        <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



export function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const data = translations.en.about;
  const titleChars = data.galleryTitle.split('');
  const gradientChars = data.galleryTitleGradient.split('');

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex justify-center">
            <GlassBadge icon={TrendingUp}>{data.galleryBadge}</GlassBadge>
          </div>
          <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="flex flex-wrap justify-center">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className="text-white"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center">
              {gradientChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (titleChars.length + i) * 0.03, duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>
        </motion.div>

        {/* Swiper Container with SVG Border Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Animated SVG Border */}
          <svg className="absolute -inset-2 md:-inset-4 w-[calc(100%+16px)] md:w-[calc(100%+32px)] h-[calc(100%+16px)] md:h-[calc(100%+32px)] pointer-events-none z-20">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="16"
              className="md:rounded-2xl"
              fill="none"
              stroke="rgba(99,102,241,0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* BIGGER ImageSwiper Container */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10 flex items-center justify-center">

            {/* Large ImageSwiper — centered and scaled up */}
            <ImageSwiper
              images={galleryImages.map((item) => item.src)}
              cardWidth={340}
              cardHeight={480}
              className="scale-100 sm:scale-110 md:scale-125 lg:scale-150"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mix-blend-exclusion text-white opacity-80 italic" 
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                TRIWAYS
              </h3>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function QuiSommesNous() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-slate-950">
      <SEO page="about" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>


      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full bg-indigo-600 blur-[150px] md:blur-[220px]"
        />

        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-purple-600 blur-[120px] md:blur-[200px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:50px_50px]" />

        <NoiseOverlay opacity={0.08} />
      </div>

      <main className="relative z-10">
        <Hero />
        <MissionStatement />
        <CEOQuote />
        <ServicesDetail />
        <WhyChooseUs />
        <GallerySection />
      </main>
    </div>
  );
}