import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SEO from '@/components/SEO';
import Hero from '@/sections/Hero';
import Partners from '@/sections/Process';
import { ServicesPreview } from '@/sections/ServicesPreview';
import AboutPreview from '@/sections/AboutPreview';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';

function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLang();
  const data = translations[lang].home.videoSection;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
              {data.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {data.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900"
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src="/assets/IMG_1388.MOV"
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Overlay - hides when playing */}
            <div 
              className={`absolute inset-0 bg-slate-950/40 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
            />

            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <Play size={32} className="ml-1" />
            </motion.button>

            {/* Controls Bar */}
            <div className={`absolute bottom-6 left-6 right-6 flex items-end justify-between transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div>
                <p className="text-white font-semibold text-lg">{data.company}</p>
                <p className="text-white/60 text-sm">{data.tagline}</p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Mute Toggle */}
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                {/* Live Indicator */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white/80 text-sm">{data.live}</span>
                </div>
              </div>
            </div>

            {/* Pause Button (visible on hover when playing) */}
            <button
              onClick={togglePlay}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 ${isPlaying ? '' : 'hidden'}`}
            >
              <Pause size={24} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO page="home" />
      <Hero />
      <ServicesPreview />
      <Partners />
      <VideoSection />
      <AboutPreview />
    </>
  );
}