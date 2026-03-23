import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title: string;
  date: string;
  scrollToExpand: string;
  mediaType: 'image' | 'video';
  textBlend?: boolean;
  children?: React.ReactNode;
}

export default function ScrollExpandMedia({
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  mediaType,
  textBlend = true,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImageSrc})` }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80" />
      </div>

      {/* Content */}
      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sky-400 text-sm font-medium tracking-widest uppercase mb-4"
          >
            {date}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${
              textBlend ? 'text-white' : 'text-gradient'
            }`}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-slate-400 text-lg flex items-center justify-center gap-2"
          >
            <span className="w-8 h-px bg-slate-500" />
            {scrollToExpand}
            <span className="w-8 h-px bg-slate-500" />
          </motion.p>
        </div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none z-10" />
          {mediaType === 'image' ? (
            <img
              src={mediaSrc}
              alt={title}
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
          ) : (
            <video
              src={mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
          )}
        </motion.div>

        {/* Children Content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center max-w-3xl mx-auto"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
