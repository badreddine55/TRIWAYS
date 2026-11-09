import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Gestion Douanière Intégrée',
    description: 'Prise en charge complète des formalités douanières, dédouanement, documentation et conformité réglementaire pour une expédition sans souci.',
    stat: '100%',
    statLabel: 'Livraisons à temps',
  },
  {
    id: 2,
    name: 'Consulting Stratégique',
    description: 'Expertise et conseils personnalisés pour optimiser votre chaîne logistique, réduire les coûts et améliorer votre compétitivité.',
    stat: '95%',
    statLabel: 'Couverture réseau mondial',
  },
  {
    id: 3,
    name: 'Transport National et International',
    description: 'Solutions de transport adaptées à vos besoins : terrestre, maritime et aérien avec un réseau mondial de partenaires de confiance.',
    stat: '90%',
    statLabel: 'Efficacité transfrontalière',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Clients satisfaits' },
  { value: 50, suffix: '+', label: 'Pays desservis' },
  { value: 10, suffix: 'K+', label: 'Expéditions par an' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Services() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section id="nos-services" className="relative py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse-dot" />
              Nos Services
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              Ce que nous{' '}
              <span className="text-gradient">offrons</span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-xl">
              Des solutions logistiques complètes et sur mesure pour accompagner
              votre croissance internationale.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Voir tous nos services
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Services List */}
        <div className="space-y-4 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`relative group rounded-2xl border transition-all duration-300 cursor-pointer ${
                hoveredService === service.id
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-indigo-500 to-purple-600 transition-all duration-300 ${
                  hoveredService === service.id ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Number */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                      hoveredService === service.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    0{service.id}
                  </div>

                  {/* Name */}
                  <div className="flex-shrink-0 lg:w-1/3">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                      {service.name}
                    </h3>
                  </div>

                  {/* Description - expands on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: hoveredService === service.id ? 'auto' : 0,
                      opacity: hoveredService === service.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="lg:flex-1 overflow-hidden"
                  >
                    <p className="text-slate-600">{service.description}</p>
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    animate={{
                      x: hoveredService === service.id ? 5 : 0,
                      rotate: hoveredService === service.id ? -45 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 p-3 rounded-full transition-all ${
                      hoveredService === service.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="relative group rounded-2xl bg-white border border-slate-200 p-8 overflow-hidden"
            >
              {/* Top gradient border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <p className="text-5xl lg:text-6xl font-bold text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
