import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  Globe,
  Shield,
  Clock,
  Target,
  Users,
  Leaf,
} from 'lucide-react';

import Hero from '@/sections/Hero';
import ProcessSection from '@/sections/Process';
import {ServicesPreview} from '@/sections/ServicesPreview';
import AboutPreview from '@/sections/AboutPreview';
// ── Icon Components ────────────────────────────────────────────────────────────



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

// ── Data ───────────────────────────────────────────────────────────────────────

const servicesPreview = [
  {
    title: 'Gestion Douanière',
    description: 'Formalités douanières simplifiées avec suivi en temps réel et transparence totale sur vos dossiers.',
    icon: Ship,
    color: 'from-amber-500 to-orange-600',
    accent: 'amber',
  },
  {
    title: 'Consulting Stratégique',
    description: 'Optimisez vos importations et minimisez vos coûts grâce à notre expertise personnalisée.',
    icon: Plane,
    color: 'from-indigo-500 to-purple-600',
    accent: 'indigo',
  },
  {
    title: 'Transport Global',
    description: 'Réseau mondial de partenaires pour des solutions de transport sur mesure à délais compétitifs.',
    icon: Truck,
    color: 'from-emerald-500 to-teal-600',
    accent: 'emerald',
  },
];

const whyChooseUs = [
  { icon: Shield, title: 'Expertise complète', description: 'Du transport à la douane, nous couvrons toute la chaîne logistique' },
  { icon: Target, title: 'Solutions sur mesure', description: 'Chaque service adapté précisément à vos besoins spécifiques' },
  { icon: Clock, title: 'Fiabilité et ponctualité', description: 'Livraisons sécurisées dans les délais convenus' },
  { icon: Globe, title: 'Approche intégrée', description: "Optimisation de chaque maillon de votre supply chain" },
  { icon: Leaf, title: 'Engagement écoresponsable', description: "Pratiques durables pour préserver l'environnement" },
  { icon: Users, title: 'Partenaire stratégique', description: 'Votre allié à chaque étape de vos projets' },
];

// ── Glass Card ─────────────────────────────────────────────────────────────────


// ── Sections ───────────────────────────────────────────────────────────────────



function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
              Découvrez-nous
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Notre Vision en Action
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Découvrez comment TRIWAYS transforme la logistique internationale
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
              alt="Logistics Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </motion.button>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-white font-semibold text-lg">TRIWAYS International</p>
                <p className="text-white/60 text-sm">Excellence en logistique</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80 text-sm">LIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// ── Page ───────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ProcessSection />
      <VideoSection />
      <AboutPreview />
    </>
  );
}