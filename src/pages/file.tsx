"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Enhanced service data with gradient colors
const servicesPreview = [
  {
    title: "Transport Maritime",
    description: "Solutions de fret maritime internationale avec tracking en temps réel et optimisation des routes commerciales.",
    icon: Ship,
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
  },
  {
    title: "Transport Aérien",
    description: "Livraison express par voie aérienne pour vos marchandises urgentes avec couverture mondiale.",
    icon: Plane,
    color: "from-violet-500 to-purple-600",
    accent: "violet",
  },
  {
    title: "Logistique Terrestre",
    description: "Réseau routier optimisé et solutions de stockage avec gestion d'entrepôt automatisée.",
    icon: Truck,
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
  },
];

// Glass Card Component
const GlassCard = ({ service, index }: { service: typeof servicesPreview[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glass Container */}
      <div className="relative h-full rounded-3xl overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated Border Glow */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${service.color} blur-xl opacity-20 group-hover:opacity-30`} />
        
        {/* Inner Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
        <div className="absolute inset-[1px] rounded-3xl border border-white/5" />

        {/* Content */}
        <div className="relative p-8 h-full flex flex-col">
          {/* Icon Container with Glass Effect */}
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <div className="relative w-full h-full rounded-2xl bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
              <service.icon size={28} className="text-white drop-shadow-lg" />
            </div>
          </motion.div>

          {/* Text Content */}
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
            {service.title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed mb-8 flex-grow group-hover:text-slate-300 transition-colors duration-500">
            {service.description}
          </p>

          {/* CTA Link */}
          <Link to="/services" className="inline-flex items-center gap-2 group/link">
            <span className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
              En savoir plus
            </span>
            <motion.div
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 4, y: -4 }}
              className={`p-2 rounded-full bg-gradient-to-br ${service.color} opacity-80 group-hover/link:opacity-100 transition-opacity`}
            >
              <ArrowUpRight size={16} className="text-white" />
            </motion.div>
          </Link>
        </div>

        {/* Hover Spotlight Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export function ServicesPreview() {
  return (
    <section id="services-preview" className="relative py-32 overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Nos Expertises
            </motion.span>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                Services
              </span>
            </h2>
            
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Des solutions logistiques complètes pour accompagner votre croissance internationale
            </p>
          </motion.div>

          {/* Glass Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {servicesPreview.map((service, index) => (
              <GlassCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 rounded-full overflow-hidden"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-gradient-x" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button Content */}
                <span className="relative flex items-center gap-3 text-white font-semibold text-lg">
                  Voir tous nos services
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

// Icon Components
function Ship({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </svg>
  );
}

function Plane({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12h20" />
      <path d="M13 2v20" />
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z" />
      <path d="m12 2 4 4" />
      <path d="m12 2-4 4" />
    </svg>
  );
}

function Truck({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}