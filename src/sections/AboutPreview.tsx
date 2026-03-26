"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Globe, Users, Award, Headphones } from "lucide-react";

// ── SVG Glass Filter ───────────────────────────────────────────────────────────

const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// ── Glass Effect Wrapper ───────────────────────────────────────────────────────

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const glassStyle: React.CSSProperties = {
    boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  return (
    <div
      className={`relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/* Glass distortion layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      {/* White tint */}
      <div
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />
      {/* Inner border shine */}
      <div
        className="absolute inset-0 z-20 rounded-[inherit] overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255,255,255,0.25), inset -1px -1px 1px 1px rgba(255,255,255,0.15)",
        }}
      />
      {/* Content */}
      <div className="relative z-30 w-full">{children}</div>
    </div>
  );
};

// ── Data ───────────────────────────────────────────────────────────────────────

const whyChooseUs = [
  {
    title: "Équipe qualifiée",
    description: "Des professionnels formésdans le domaine du transportet de la logistique.",
    icon: Award,
  },
  {
    title: "Disponibilité 24/7",
    description: "Une équipe dédiée à votre service jour et nuit pour Votre dossiers en temps réel.",
    icon: Clock,
  },
  {
    title: "Réseau Mondial",
    description: "Partenaires stratégiques dans plus de 20 pays pour une couverture logistique complète.",
    icon: Globe,
  },
  {
    title: "Sécurité",
    description: "Protection maximale de vos marchandises .",
    icon: Shield,
  },
  {
    title: "Solutions Sur Mesure",
    description: "Des stratégies logistiques adaptées à vos besoins spécifiques et contraintes métier.",
    icon: Users,
  },
  {
    title: "Support Dédié",
    description: "Un interlocuteur unique et expert pour accompagner chaque étape de votre projet.",
    icon: Headphones,
  },
];

// ── Feature Card with Glass Effect ────────────────────────────────────────────

const FeatureCard = ({
  item,
  index,
}: {
  item: (typeof whyChooseUs)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group h-full"
    >
      <GlassEffect className="rounded-2xl h-full border border-white/10 group-hover:border-white/20 transition-colors duration-500">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              <div className="relative w-full h-full flex items-center justify-center text-white">
                <item.icon size={24} strokeWidth={2} />
              </div>
            </motion.div>

            <div className="flex-1">
              <h4 className="font-bold text-white mb-2 text-lg group-hover:text-indigo-300 transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </GlassEffect>
    </motion.div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AboutPreview() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-950">

      {/* Glass SVG Filter — must be in DOM */}
      <GlassFilter />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              À propos
            </motion.span>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Pourquoi nous{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  choisir
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M2 10C50 4 100 4 150 6C200 8 250 4 298 10"
                    stroke="url(#underlineGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#818cf8" />
                      <stop offset="1" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {' '}?
            </h2>

            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Une expertise reconnue et des valeurs fortes au service de votre réussite
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {whyChooseUs.map((item, index) => (
              <FeatureCard key={item.title} item={item} index={index} />
            ))}
          </div>



          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/qui-sommes-nous">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden shadow-xl shadow-indigo-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-white font-semibold text-lg">
                  Découvrir notre histoire
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative text-white"
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}