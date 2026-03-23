"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Ship, Plane, Truck, Package, Globe, Anchor } from "lucide-react";

// High-quality logistics images from Unsplash
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop",
    alt: "Container ship aerial view",
    position: "top-left",
  },
  {
    url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
    alt: "Cargo containers port",
    position: "top-right",
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    alt: "Shipping containers stacked",
    position: "mid-left",
  },
  {
    url: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2070&auto=format&fit=crop",
    alt: "Air cargo plane",
    position: "mid-right",
  },
  {
    url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    alt: "Truck logistics",
    position: "bottom-left",
  },
  {
    url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
    alt: "Warehouse interior",
    position: "bottom-right",
  },
  {
    url: "https://images.unsplash.com/photo-1542296332-2e44a3e4a3c1?q=80&w=2070&auto=format&fit=crop",
    alt: "Harbor cranes",
    position: "center",
  },
  {
    url: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=2070&auto=format&fit=crop",
    alt: "Container terminal",
    position: "floating",
  },
];

const servicesPreview = [
  {
    title: "Transport Maritime",
    description: "Solutions de fret maritime internationale avec tracking en temps réel et optimisation des routes commerciales.",
    icon: Ship,
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Transport Aérien",
    description: "Livraison express par voie aérienne pour vos marchandises urgentes avec couverture mondiale.",
    icon: Plane,
    color: "from-violet-500 to-purple-600",
    accent: "violet",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Logistique Terrestre",
    description: "Réseau routier optimisé et solutions de stockage avec gestion d'entrepôt automatisée.",
    icon: Truck,
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Stockage & Entreposage",
    description: "Solutions de stockage sécurisé et gestion d'inventaire en temps réel dans nos entrepôts modernes.",
    icon: Package,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    title: "Fret International",
    description: "Solutions complètes d'import/export avec gestion douanière et conformité réglementaire.",
    icon: Globe,
    color: "from-rose-500 to-pink-600",
    accent: "rose",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Port & Terminal",
    description: "Services portuaires complets avec manutention, transbordement et consolidation de conteneurs.",
    icon: Anchor,
    color: "from-indigo-500 to-blue-700",
    accent: "indigo",
    image: "https://images.unsplash.com/photo-1542296332-2e44a3e4a3c1?q=80&w=800&auto=format&fit=crop",
  },
];





// Glass Card Component with Image Preview
const GlassCard = ({ service, index }: { service: typeof servicesPreview[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
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

          {/* CTA */}
          <Link to="/services" className="inline-flex items-center gap-2 group/link mt-auto">
            <span className={`text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
              En savoir plus
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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



        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20 pointer-events-none" />
        
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
              Nos Expertises
            </motion.span>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Nos{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x">
                  Services
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
              Des solutions logistiques complètes pour accompagner votre croissance internationale, 
              avec une expertise reconnue dans le transport maritime, aérien et terrestre.
            </p>
          </motion.div>

          {/* Services Grid - Now 2x3 layout for more images visibility */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {servicesPreview.map((service, index) => (
              <GlassCard key={service.title} service={service} index={index} />
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
                  Voir tous nos services
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