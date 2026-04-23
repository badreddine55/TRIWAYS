import { motion } from 'framer-motion';
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';



import { useState, useRef, useEffect } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Partner logos data - Using local assets
const partners = [
  { id: 1, name: 'Partner 1', logo: '/assets/logoC1.png' },
  { id: 2, name: 'Partner 2', logo: '/assets/logoC2.png' },
  { id: 3, name: 'Partner 3', logo: '/assets/logoC3.png' },
  { id: 4, name: 'Partner 4', logo: '/assets/logoC4.png' },
  { id: 5, name: 'Partner 5', logo: '/assets/logoC5.png' },
  { id: 6, name: 'Partner 6', logo: '/assets/logoC6.png' },
  { id: 7, name: 'Partner 7', logo: '/assets/logoC7.png' },
  { id: 8, name: 'Partner 8', logo: '/assets/logoC8.png' },
  { id: 9, name: 'Partner 9', logo: '/assets/logoC9.png' },
  { id: 11, name: 'Partner 11', logo: '/assets/logoC11.png' },
  { id: 12, name: 'Partner 12', logo: '/assets/logoC12.png' },
  { id: 13, name: 'Partner 13', logo: '/assets/logoC13.png' },
  { id: 14, name: 'Partner 14', logo: '/assets/logoC14.png' },
  { id: 15, name: 'Partner 15', logo: '/assets/logoC15.png' },
  { id: 16, name: 'Partner 16', logo: '/assets/logoC16.png' },
  { id: 17, name: 'Partner 17', logo: '/assets/logoC17.png' },
  { id: 18, name: 'Partner 18', logo: '/assets/logoC18.png' },
];

export default function Partners() {
  const { lang } = useLang();
  const t = translations[lang].partners || {
    badge: 'Global Network',
    heading: 'Trusted by Industry Leaders',
    description: 'We collaborate with the world\'s leading shipping lines and logistics providers to deliver exceptional service worldwide.',
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const LogoCard = ({ partner, index }: { partner: typeof partners[0], index: number }) => (
    <motion.div
      key={`${partner.id}-${index}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 group"
    >
      <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-24 sm:h-28 md:h-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/20">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-3xl group-hover:border-white/70 group-hover:bg-white/30 transition-all duration-300" />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 rounded-2xl sm:rounded-3xl transition-all duration-300" />
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-5 md:p-6">
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'text-white font-bold text-center text-xs sm:text-sm md:text-base px-2';
                fallback.textContent = partner.name;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/assets/backimage.jpeg)' }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/30" />
      </div>

      <div className="relative w-full px-0">
        <div className="w-full max-w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 px-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sky-400 text-sm font-medium mb-4 backdrop-blur-sm">
              {t.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.heading}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
              {t.description}
            </p>
          </motion.div>

          <div className="relative w-full group">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 ${canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 ${canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div 
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Desktop: CSS Infinite Animation */}
              <div className="hidden md:block">
                <div 
                  className={`flex gap-6 lg:gap-8 py-8 ${isPaused ? '' : 'animate-marquee'}`}
                  style={{
                    width: 'max-content',
                    animationPlayState: isPaused ? 'paused' : 'running'
                  }}
                >
                  {partners.map((partner, index) => (
                    <LogoCard key={`set1-${partner.id}`} partner={partner} index={index} />
                  ))}
                  {partners.map((partner, index) => (
                    <LogoCard key={`set2-${partner.id}`} partner={partner} index={index} />
                  ))}
                </div>
              </div>

              {/* Mobile: Manual Touch Scroll */}
              <div className="md:hidden flex gap-4 sm:gap-6 px-4 py-8 w-max">
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <LogoCard key={`mobile-${partner.id}-${index}`} partner={partner} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}