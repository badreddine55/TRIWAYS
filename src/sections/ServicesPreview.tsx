"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Ship, Plane, Truck, Package, Globe, Anchor, ChevronDown } from "lucide-react";
import { useLang } from "./LangContext";
import { translations } from "@/lib/translations";

// Sub-services for Transport National et International
const transportSubServices = [
  {
    title: "Transport Maritime",
    description: "Solutions de fret maritime internationale avec tracking en temps réel.",
    icon: Ship,
    color: "from-cyan-500 to-blue-600",
    image: "/assets/s1.avif",
  },
  {
    title: "Transport Aérien",
    description: "Livraison express par voie aérienne pour vos marchandises urgentes.",
    icon: Plane,
    color: "from-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2ea5242?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Logistique Terrestre",
    description: "Réseau routier optimisé et solutions de stockage automatisée.",
    icon: Truck,
    color: "from-emerald-500 to-teal-600",
    image: "/assets/s2.avif",
  },
];

// Main services preview - now with expandable transport card and 2 new cards
const baseServicesPreview = [
  {
    titleKey: 'transport',
    descriptionKey: 'transportDesc',
    icon: Globe,
    color: "from-indigo-500 via-purple-500 to-cyan-500",
    accent: "indigo",
    image: "/assets/ss1.avif",
    isExpandable: true,
    subServices: transportSubServices,
  },
  {
    titleKey: 'customs',
    descriptionKey: 'customsDesc',
    icon: Package,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    image: "/assets/ss2.jpeg",
  },
  {
    titleKey: 'consulting',
    descriptionKey: 'consultingDesc',
    icon: Anchor,
    color: "from-rose-500 to-pink-600",
    accent: "rose",
    image: "/assets/ss2.avif",
  },
];

// Glass Card Component with Image Preview and Expandable Support
const GlassCard = ({ service, index, learnMore }: { service: (typeof baseServicesPreview[0]) & { title: any; description: any }; index: number; learnMore: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
      layout
    >
      <div className="relative h-full rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500">
        {/* Background Image Preview */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        </motion.div>

        {/* Animated Border */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700`}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon */}
          <motion.div 
            animate={{ rotate: isHovered ? 10 : 0, scale: isHovered ? 1.1 : 1 }}
            className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] overflow-hidden shadow-lg`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            <div className="relative w-full h-full rounded-2xl bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
              <service.icon size={28} className="text-white drop-shadow-md" />
            </div>
          </motion.div>

          {/* Text */}
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
            {service.title}
          </h3>
          
          <p className="text-slate-300 leading-relaxed mb-6 flex-grow group-hover:text-white transition-colors duration-500">
            {service.description}
          </p>

          {/* Expandable Section for Transport */}
          {service.isExpandable && (
            <div className="mb-4">
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r ${service.color} bg-opacity-10 border border-white/10 hover:border-white/30 transition-all`}
              >
                <span className="text-sm font-semibold text-white">Voir les types de transport</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-white" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3">
                      {service.subServices?.map((sub, idx) => (
                        <motion.div
                          key={sub.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group/sub"
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${sub.color} shrink-0`}>
                            <sub.icon size={16} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white group-hover/sub:text-indigo-300 transition-colors">
                              {sub.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* CTA */}
          <Link to="/services" className="inline-flex items-center gap-2 group/link mt-auto">
            <span className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
              {learnMore}
            </span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
              className={`p-2 rounded-full bg-gradient-to-br ${service.color} opacity-80 group-hover/link:opacity-100 transition-all shadow-lg`}
            >
              <ArrowUpRight size={16} className="text-white" />
            </motion.div>
          </Link>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
            transform: "translateX(-100%)",
          }}
          animate={isHovered ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export function ServicesPreview() {
  const { lang } = useLang();
  const servicesData = translations[lang].servicesPreview;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Build services with translations
  const servicesPreview = baseServicesPreview.map((service) => ({
    ...service,
    title: servicesData[service.titleKey as keyof typeof servicesData],
    description: servicesData[service.descriptionKey as keyof typeof servicesData],
  }));

  const badgeText = servicesData.badge;
  const headingPart1 = servicesData.headingPart1;
  const headingPart2 = servicesData.headingPart2;
  const servicesDescription = servicesData.description;
  const viewAllServices = servicesData.cta;
  const learnMore = servicesData.learnMore;

  return (
    <section 
      ref={containerRef}
      id="services-preview" 
      className="relative min-h-screen py-32 overflow-hidden bg-slate-950"
    >
      {/* Multi-Image Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark overlay base */}
        <div className="absolute inset-0 bg-slate-950/90 z-10" />
        
        {/* Animated gradient orbs behind images */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[150px] z-0"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] z-0"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] z-0"
        />




        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] z-20 pointer-events-none" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-30 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-sm font-medium mb-6 hover:bg-white/10 transition-colors cursor-default"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-indigo-400"
              />
              {badgeText}
            </motion.span>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {headingPart1}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
                  {headingPart2}
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 12" preserveAspectRatio="none">
                  <motion.path 
                    d="M0,6 Q100,0 200,6 T400,6" 
                    stroke="url(#service-gradient)" 
                    strokeWidth="3" 
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="service-gradient" x1="0" y1="0" x2="400" y2="0">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              {servicesDescription}
            </p>
          </motion.div>

          {/* Services Grid - Now 3 cards layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {servicesPreview.map((service, index) => (
              <GlassCard key={index} service={service} index={index} learnMore={learnMore} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 rounded-full overflow-hidden shadow-2xl shadow-indigo-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-x" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative flex items-center gap-3 text-white font-semibold text-lg">
                  {viewAllServices}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-40 pointer-events-none" />
    </section>
  );
}