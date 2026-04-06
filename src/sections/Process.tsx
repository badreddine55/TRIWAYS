import { motion } from 'framer-motion';
import { Laptop, FolderOpen, Truck, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';
export default function Process() {
  const { lang } = useLang();
  const processData = translations[lang].process;

  const iconMap: Record<number, React.ComponentType<{ size?: number }>> = {
    1: Laptop,
    2: FolderOpen,
    3: Truck,
    4: PackageCheck,
  };

  const steps = processData.steps;
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Fixed Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/30" />
      </div>

      {/* Scrolling Marquee */}
      <div className="relative py-8 overflow-hidden border-y border-white/10">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mx-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"
            >
              {processData.marquee}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 lg:px-12 xl:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sky-400 text-sm font-medium mb-4 backdrop-blur-sm">
              {processData.methodology}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {processData.heading}
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              {processData.description}
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px">
                    <div className="w-full h-full border-t-2 border-dashed border-white/20" />
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
                >
                  {/* Top gradient glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/60">
                    0{step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-glow transition-shadow">
                      {(() => {
                        const IconComponent = iconMap[step.id as keyof typeof iconMap];
                        return IconComponent ? <IconComponent size={28} /> : null;
                      })()}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 mb-6">
              {processData.ctaText}
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-glow-lg transition-shadow"
              >
                {processData.cta}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
