import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export default function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] flex items-start justify-center pt-20"
      style={{ perspective: '1000px' }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-12"
        >
          {titleComponent}
        </motion.div>

        {/* Card with 3D transform */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-purple-600/20 pointer-events-none z-10" />
          {children}
        </motion.div>
      </div>
    </div>
  );
}
