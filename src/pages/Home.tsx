import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
} from 'lucide-react';

import Hero from '@/sections/Hero';
import ProcessSection from '@/sections/Process';
import {ServicesPreview} from '@/sections/ServicesPreview';
import AboutPreview from '@/sections/AboutPreview';
// ── Icon Components ────────────────────────────────────────────────────────────



// ── Data ───────────────────────────────────────────────────────────────────────

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