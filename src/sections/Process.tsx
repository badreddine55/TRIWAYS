import { motion } from 'framer-motion';
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';

// Partner logos data - Using local assets
const partners = [
  { id: 1, name: 'Partner 1', logo: '/src/assets/logoC1.png' },
  { id: 2, name: 'Partner 2', logo: '/src/assets/logoC2.png' },
  { id: 3, name: 'Partner 3', logo: '/src/assets/logoC3.png' },
  { id: 4, name: 'Partner 4', logo: '/src/assets/logoC4.png' },
  { id: 5, name: 'Partner 5', logo: '/src/assets/logoC5.png' },
  { id: 6, name: 'Partner 6', logo: '/src/assets/logoC6.png' },
  { id: 7, name: 'Partner 7', logo: '/src/assets/logoC7.png' },
  { id: 8, name: 'Partner 8', logo: '/src/assets/logoC8.png' },
  { id: 9, name: 'Partner 9', logo: '/src/assets/logoC9.png' },
  { id: 11, name: 'Partner 11', logo: '/src/assets/logoC11.png' },
  { id: 12, name: 'Partner 12', logo: '/src/assets/logoC12.png' },
  { id: 13, name: 'Partner 13', logo: '/src/assets/logoC13.png' },
  { id: 14, name: 'Partner 14', logo: '/src/assets/logoC14.png' },
  { id: 15, name: 'Partner 15', logo: '/src/assets/logoC15.png' },
  { id: 16, name: 'Partner 16', logo: '/src/assets/logoC16.png' },
  { id: 17, name: 'Partner 17', logo: '/src/assets/logoC17.png' },
  { id: 18, name: 'Partner 18', logo: '/src/assets/logoC18.png' },
  { id: 19, name: 'Partner 19', logo: '/src/assets/logoC0.png' },
];

export default function Partners() {
  const { lang } = useLang();
  const t = translations[lang].partners || {
    badge: 'Global Network',
    heading: 'Trusted by Industry Leaders',
    description: 'We collaborate with the world\'s leading shipping lines and logistics providers to deliver exceptional service worldwide.',
  };

  // Triple the array for seamless infinite scroll
  const triplePartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950">
      {/* Fixed Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/src/assets/backimage.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/30" />
      </div>

      {/* Content */}
      <div className="relative w-full px-0">
        <div className="w-full max-w-full mx-auto">
          {/* Header */}
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

          {/* Logo Marquee Container - Full Width Responsive */}
          <div className="relative w-full">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* First Row - Left to Right (Slower) */}
            <div className="relative overflow-hidden py-8 sm:py-12">
              <motion.div
                animate={{ x: [0, -100 * (partners.length / 3) * 2] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                  },
                }}
                className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-max px-4"
              >
                {triplePartners.map((partner, index) => (
                  <motion.div
                    key={`row1-${partner.id}-${index}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 group"
                  >
                    <div className="relative w-32 sm:w-40 md:w-48 lg:w-56 h-24 sm:h-28 md:h-32 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/20">
                      {/* Glass Effect Background */}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-3xl group-hover:border-white/70 group-hover:bg-white/30 transition-all duration-300" />
                      
                      {/* Glow on hover */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 rounded-2xl sm:rounded-3xl transition-all duration-300" />
                      
                      {/* Logo Container */}
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
                ))}
              </motion.div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
