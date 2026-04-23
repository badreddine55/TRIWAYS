import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang } = useLang();
  const data = translations[lang].home.videoSection;

  // Update progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('durationchange', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('durationchange', updateDuration);
    };
  }, [isDragging]);

  // Auto-hide controls — only re-runs when play/drag state changes, NOT on every time update
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    if (isDragging) {
      setShowControls(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, isDragging]);

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && !isDragging) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.max(0, video.currentTime - 10);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.min(duration, video.currentTime + 10);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const restartVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setCurrentTime(0);
    video.play();
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group"
            onMouseMove={resetControlsTimer}
            onMouseLeave={() => {
              if (isPlaying && !isDragging) setShowControls(false);
            }}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src="/assets/IMG_1388.MOV"
              poster="/assets/vedio_tuhb.png"
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            />



            {/* Controls Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Top Bar */}
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <div>
                  <p className="text-white font-semibold text-lg">{data.company}</p>
                  <p className="text-white/60 text-sm">{data.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white/80 text-sm">{data.live}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                {/* Progress Bar */}
                <div className="mb-4 group/progress">
                  <div className="relative h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full transition-all duration-100"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-white/90 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                    </motion.button>

                    {/* Stop */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopVideo}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Stop"
                    >
                      <div className="w-3 h-3 bg-current rounded-sm" />
                    </motion.button>

                    {/* Skip Backward 10s */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={skipBackward}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Back 10s"
                    >
                      <SkipBack size={18} />
                    </motion.button>

                    {/* Skip Forward 10s */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={skipForward}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Forward 10s"
                    >
                      <SkipForward size={18} />
                    </motion.button>

                    {/* Restart */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={restartVideo}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Restart"
                    >
                      <RotateCcw size={18} />
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Volume */}
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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