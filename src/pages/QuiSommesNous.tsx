import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import {
  Shield,
  Clock,
  Globe,
  Leaf,
  Users,
  Target,
  Quote,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react';
import SEO from '@/components/SEO';

// ── Noise utility ──────────────────────────────────────────────────────────────

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const NoiseOverlay = ({ opacity = 0.15 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 mix-blend-overlay pointer-events-none"
    style={{ backgroundImage: NOISE_SVG, opacity }}
  />
);

// ── 3D Gallery (UNCHANGED) ────────────────────────────────────────────────────

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}

interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  visibleCount?: number;
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce; uniform float time; uniform float isHovered;
      varying vec2 vUv; varying vec3 vNormal;
      void main() {
        vUv = uv; vNormal = normal; vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = sin(wavePhase) * 0.1 * dampening + sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
        }
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map; uniform float opacity; uniform float blurAmount; uniform float scrollForce;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0); float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + vec2(x, y) * texelSize * blurAmount) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        color.rgb += vec3(abs(scrollForce) * 0.005);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

function ImagePlane({ texture, position, scale, material }: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
}) {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => { if (material && texture) material.uniforms.map.value = texture; }, [material, texture]);
  useEffect(() => { if (material?.uniforms) material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0; }, [material, isHovered]);
  return (
    <mesh position={position} scale={scale} material={material}
      onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

interface PlaneData { index: number; z: number; imageIndex: number; x: number; y: number; }

function GalleryScene({ images, speed = 1, visibleCount = 8,
  fadeSettings = { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } },
  blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 },
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const lastInteraction = useRef(Date.now());
  const normalizedImages = useMemo(() => images.map(img => typeof img === 'string' ? { src: img, alt: '' } : img), [images]);
  const textures = useTexture(normalizedImages.map(img => img.src));
  const materials = useMemo(() => Array.from({ length: visibleCount }, () => createClothMaterial()), [visibleCount]);
  const spatialPositions = useMemo(() => Array.from({ length: visibleCount }, (_, i) => ({
    x: (Math.sin((i * 2.618) % (Math.PI * 2)) * (i % 3) * 1.2 * MAX_HORIZONTAL_OFFSET) / 3,
    y: (Math.cos((i * 1.618 + Math.PI / 3) % (Math.PI * 2)) * ((i + 1) % 4) * 0.8 * MAX_VERTICAL_OFFSET) / 4,
  })), [visibleCount]);
  const totalImages = normalizedImages.length;
  const depthRange = DEFAULT_DEPTH_RANGE;
  const planesData = useRef<PlaneData[]>(Array.from({ length: visibleCount }, (_, i) => ({
    index: i, z: ((depthRange / visibleCount) * i) % depthRange,
    imageIndex: i % totalImages, x: spatialPositions[i]?.x ?? 0, y: spatialPositions[i]?.y ?? 0,
  })));
  useEffect(() => {
    planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
      index: i, z: ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange,
      imageIndex: i % totalImages, x: spatialPositions[i]?.x ?? 0, y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, visibleCount]);
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); setScrollVelocity(p => p + e.deltaY * 0.01 * speed);
    setAutoPlay(false); lastInteraction.current = Date.now();
  }, [speed]);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { setScrollVelocity(p => p - 2 * speed); setAutoPlay(false); lastInteraction.current = Date.now(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { setScrollVelocity(p => p + 2 * speed); setAutoPlay(false); lastInteraction.current = Date.now(); }
  }, [speed]);
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) { canvas.addEventListener('wheel', handleWheel, { passive: false }); document.addEventListener('keydown', handleKeyDown); }
    return () => { canvas?.removeEventListener('wheel', handleWheel); document.removeEventListener('keydown', handleKeyDown); };
  }, [handleWheel, handleKeyDown]);
  useEffect(() => {
    const interval = setInterval(() => { if (Date.now() - lastInteraction.current > 3000) setAutoPlay(true); }, 1000);
    return () => clearInterval(interval);
  }, []);
  useFrame((state, delta) => {
    if (autoPlay) setScrollVelocity(p => p + 0.3 * delta);
    setScrollVelocity(p => p * 0.95);
    const time = state.clock.getElapsedTime();
    materials.forEach(m => { if (m?.uniforms) { m.uniforms.time.value = time; m.uniforms.scrollForce.value = scrollVelocity; } });
    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 10;
      let fw = 0, bw = 0;
      if (newZ >= depthRange) { fw = Math.floor(newZ / depthRange); newZ -= depthRange * fw; }
      else if (newZ < 0) { bw = Math.ceil(-newZ / depthRange); newZ += depthRange * bw; }
      if (fw > 0 && imageAdvance > 0) plane.imageIndex = (plane.imageIndex + fw * imageAdvance) % totalImages;
      if (bw > 0 && imageAdvance > 0) { const s = plane.imageIndex - bw * imageAdvance; plane.imageIndex = ((s % totalImages) + totalImages) % totalImages; }
      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      plane.x = spatialPositions[i]?.x ?? 0; plane.y = spatialPositions[i]?.y ?? 0;
      const np = plane.z / depthRange;
      let opacity = 1;
      if (np < fadeSettings.fadeIn.start) opacity = 0;
      else if (np <= fadeSettings.fadeIn.end) opacity = (np - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
      else if (np >= fadeSettings.fadeOut.start && np <= fadeSettings.fadeOut.end) opacity = 1 - (np - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
      else if (np > fadeSettings.fadeOut.end) opacity = 0;
      let blur = 0;
      if (np < blurSettings.blurIn.start) blur = blurSettings.maxBlur;
      else if (np <= blurSettings.blurIn.end) blur = blurSettings.maxBlur * (1 - (np - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
      else if (np >= blurSettings.blurOut.start && np <= blurSettings.blurOut.end) blur = blurSettings.maxBlur * ((np - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
      else if (np > blurSettings.blurOut.end) blur = blurSettings.maxBlur;
      const m = materials[i];
      if (m?.uniforms) { m.uniforms.opacity.value = Math.max(0, Math.min(1, opacity)); m.uniforms.blurAmount.value = Math.max(0, Math.min(blurSettings.maxBlur, blur)); }
    });
  });
  if (normalizedImages.length === 0) return null;
  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textures[plane.imageIndex]; const material = materials[i];
        if (!texture || !material) return null;
        const img = texture.image as { width: number; height: number } | undefined;
        const aspect = img && img.width > 0 && img.height > 0 ? img.width / img.height : 1;
        const scale: [number, number, number] = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];
        return <ImagePlane key={plane.index} texture={texture} position={[plane.x, plane.y, plane.z - depthRange / 2]} scale={scale} material={material} />;
      })}
    </>
  );
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
  const normalized = useMemo(() => images.map(img => typeof img === 'string' ? { src: img, alt: '' } : img), [images]);
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white/5 p-4">
      <p className="text-slate-400 mb-4">WebGL not supported.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {normalized.map((img, i) => <img key={i} src={img.src} alt={img.alt} className="w-full h-32 object-cover rounded-lg" />)}
      </div>
    </div>
  );
}

function InfiniteGallery({ images, className = 'h-96 w-full', style,
  fadeSettings = { fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.4, end: 0.43 } },
  blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.4, end: 0.43 }, maxBlur: 8.0 },
  speed, visibleCount,
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      if (!c.getContext('webgl') && !c.getContext('experimental-webgl')) setWebglSupported(false);
    } catch { setWebglSupported(false); }
  }, []);
  if (!webglSupported) return <div className={className} style={style}><FallbackGallery images={images} /></div>;
  return (
    <div className={className} style={style}>
      <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <GalleryScene images={images} speed={speed} visibleCount={visibleCount} fadeSettings={fadeSettings} blurSettings={blurSettings} />
      </Canvas>
    </div>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────

const GlassBadge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ size?: number }> }) => (
  <motion.span whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 text-indigo-300 text-xs md:text-sm font-medium">
    {Icon && <Icon size={14} />}{children}
  </motion.span>
);

const GlassButton = ({ children, to, onClick, variant = 'primary' }: {
  children: React.ReactNode; to?: string; onClick?: () => void; variant?: 'primary' | 'secondary';
}) => {
  const content = (
    <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`group relative px-6 py-3 md:px-8 md:py-4 rounded-full overflow-hidden font-semibold transition-all duration-300 text-sm md:text-base ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40'
          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
      }`}>
      <span className="relative flex items-center gap-2">
        {children}
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={18} /></motion.span>
      </span>
    </motion.button>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};

// ── Data (UNCHANGED) ───────────────────────────────────────────────────────────

const services = [
  {
    title: 'Gestion Douanière Intégrée',
    description: "Simplifiez vos formalités douanières avec notre expertise spécialisée, couvrant tous les aspects du dédouanement, des déclarations et des procédures nécessaires pour un transit fluide et efficace.",
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    features: ['Dédouanement complet', 'Suivi en temps réel', 'Conformité réglementaire', 'Documentation assurée'],
    icon: Shield,
    color: 'from-indigo-500 to-purple-600',
    accent: 'indigo',
  },
  {
    title: 'Consulting Stratégique',
    description: "Maximisez vos opportunités d'importation grâce à notre consulting personnalisé. Nous vous guidons à travers chaque étape, en optimisant les processus pour minimiser les coûts.",
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    features: ['Optimisation des coûts', 'Analyse des processus', 'Conseil personnalisé', 'Accompagnement continu'],
    icon: Target,
    color: 'from-purple-500 to-pink-600',
    accent: 'purple',
  },
  {
    title: 'Transport National et International',
    description: "Profitez de notre réseau mondial de partenaires pour des solutions de transport sur mesure, offrant des délais compétitifs et une fiabilité inégalée.",
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    features: ['Réseau mondial', 'Délais compétitifs', 'Multi-modal', 'Traçabilité complète'],
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    accent: 'cyan',
  },
];

const whyChooseUs = [
  { icon: Shield, title: 'Expertise complète', description: "Du transport international à la gestion d'entrepôts et aux formalités douanières, notre savoir-faire couvre l'ensemble de la chaîne logistique." },
  { icon: Target, title: 'Solutions sur mesure', description: 'Chaque service est conçu pour répondre précisément aux besoins spécifiques de votre entreprise, quelle que soit sa taille.' },
  { icon: Clock, title: 'Fiabilité et ponctualité', description: 'Nous garantissons des livraisons sécurisées, dans les délais convenus, pour que vos marchandises arrivent toujours à destination.' },
  { icon: Globe, title: 'Approche intégrée', description: "Nous optimisons chaque maillon de votre chaîne d'approvisionnement afin d'assurer une efficacité maximale." },
  { icon: Leaf, title: 'Engagement écoresponsable', description: "Nous adoptons des pratiques durables visant à réduire notre empreinte écologique et à préserver l'environnement." },
  { icon: Users, title: 'Partenaire stratégique', description: "Plus qu'un prestataire, nous sommes votre allié, vous accompagnant à chaque étape pour assurer la réussite de vos projets." },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80', alt: 'Container ship' },
  { src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80', alt: 'Port operations' },
  { src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', alt: 'Cargo containers' },
  { src: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80', alt: 'Air freight' },
  { src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80', alt: 'Truck logistics' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Harbor cranes' },
  { src: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80', alt: 'Container terminal' },
  { src: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80', alt: 'Logistics team' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', alt: 'Business meeting' },
  { src: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80', alt: 'Supply chain' },
];

// ── Ticker Data with Flags ─────────────────────────────────────────────────────

const tickerCities = [
  { name: 'CASABLANCA', flag: '🇲🇦', country: 'Maroc' },
  { name: 'PARIS', flag: '🇫🇷', country: 'France' },
  { name: 'DUBAI', flag: '🇦🇪', country: 'Émirats Arabes Unis' },
  { name: 'SHANGHAI', flag: '🇨🇳', country: 'Chine' },
  { name: 'MIAMI', flag: '🇺🇸', country: 'États-Unis' },
  { name: 'AMSTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
  { name: 'SINGAPORE', flag: '🇸🇬', country: 'Singapour' },
  { name: 'ROTTERDAM', flag: '🇳🇱', country: 'Pays-Bas' },
];

// ── Animation Utilities ───────────────────────────────────────────────────────

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};



// ── Sections (Redesigned with Home Page Colors) ───────────────────────────────

function Hero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x: x * 5, y: -y * 5 });
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 bg-slate-950">
      {/* Particle Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* Gradient overlays matching Home page */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-purple-900/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex justify-center lg:justify-start">
                <GlassBadge icon={CheckCircle}>À propos de nous</GlassBadge>
              </div>

              {/* Title */}
              <div className="mt-6 md:mt-8">
                {/* Eyebrow line */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-indigo-400 text-xs md:text-sm font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 flex items-center justify-center lg:justify-start gap-2 md:gap-3"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <span className="inline-block w-6 md:w-8 h-px bg-indigo-400" />
                  Qui Sommes Nous
                </motion.p>

                {/* Main display title */}
                <h1
                  className="leading-none tracking-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-extrabold uppercase text-white leading-none"
                    style={{ letterSpacing: '-0.03em', fontSize: 'clamp(28px,8vw,64px)' }}
                  >
                    TRIWAYS
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-extrabold uppercase leading-none mt-1 md:mt-2"
                    style={{
                      letterSpacing: '-0.03em',
                      fontSize: 'clamp(18px,4vw,40px)',
                      backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #c084fc 40%, #67e8f9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    INTERNATIONAL
                  </motion.span>
                </h1>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 origin-left mx-auto lg:mx-0"
                  style={{ width: '100%', maxWidth: '320px' }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="mt-6 md:mt-8 text-base md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Nous relions les mondes, nous livrons vos rêves. Découvrez l'histoire de TRIWAYS et notre engagement pour l'excellence logistique.
              </motion.p>
            </motion.div>
          </div>

          {/* Right - 3D Card with Parallax */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, rotateX: 15, rotateY: -15 }}
              animate={{ opacity: 1, rotateX: reduced ? 0 : mousePosition.y, rotateY: reduced ? 0 : mousePosition.x }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative max-w-md mx-auto lg:max-w-none"
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                  alt="Logistics"
                  className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <div className="text-indigo-400 text-xs md:text-sm font-mono uppercase tracking-widest mb-1 md:mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Global Logistics</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Ticker with Flags - Responsive */}
        <div className="mt-12 md:mt-16 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-4 md:gap-8 mr-4 md:mr-8">
                {tickerCities.map((city) => (
                  <span 
                    key={`${setIndex}-${city.name}`} 
                    className="flex items-center gap-2 md:gap-4 text-slate-500 text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <span className="text-lg md:text-2xl" title={city.country}>{city.flag}</span>
                    <span className="hidden sm:inline">{city.name}</span>
                    <span className="sm:hidden">{city.name.substring(0, 3)}</span>
                    <span className="text-indigo-400">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-ticker {
            animation: ticker 20s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}

function MissionStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const words = ['transparence', 'innovation', 'engagement'];
  const quoteLines = [
  "Chez Triways Logistique, notre histoire commence avec une ambition claire : offrir des solutions de transport et de logistique fiables, modernes et accessibles à tous.",
  "Fondée récemment, notre société est née de la volonté de répondre aux besoins croissants des entreprises en matière de gestion des flux, d'import-export et de transport national et international.",
  "Conscients des défis du secteur, nous avons réuni une équipe passionnée et qualifiée, déterminée à proposer un service efficace et personnalisé.",
  "Dès le départ, nous avons fait le choix de placer la qualité, la réactivité et la transparence au cœur de notre démarche.",
  "Chaque client est unique, c'est pourquoi nous nous engageons à offrir des solutions sur mesure, adaptées à ses exigences et à ses objectifs.",
  "Aujourd'hui, Triways Logistique poursuit son développement avec une vision claire : devenir un partenaire de confiance, capable d'accompagner ses clients à chaque étape de leur croissance, au niveau national et international."
];

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-12 md:mb-16 origin-left"
        />

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-16">
          {words.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 200 }}
              className="px-4 md:px-8 py-2 md:py-4 rounded-full border border-indigo-400/30 bg-indigo-400/5 backdrop-blur-sm"
            >
              <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xl md:text-2xl md:text-3xl text-indigo-400 font-semibold"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            HISTOIRE
          </motion.span>
          <div className="mt-4 md:mt-6 space-y-1 md:space-y-2">
            {quoteLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-xl lg:text-2xl text-slate-300 leading-relaxed px-4 sm:px-0"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CEOQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();

  const quoteText = "Triways Logistique est née de la volonté de trois personnes partageant la même vision : offrir un service logistique fiable, humain et performant. Aujourd'hui, nous mettons toute notre énergie et notre engagement au service de nos clients, avec une priorité claire : bâtir une relation de confiance durable et accompagner chaque projet avec sérieux et réactivité..";
  const words = quoteText.split(' ');

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1 h-1 md:h-auto bg-gradient-to-r md:bg-gradient-to-b from-indigo-400 to-purple-500 origin-left md:origin-top"
            />

            <div className="flex-1">
              <Quote className="w-10 h-10 md:w-16 md:h-16 text-indigo-400/20 mb-4 md:mb-6" />

              <p className="text-base md:text-xl lg:text-2xl text-slate-300 leading-relaxed mb-6 md:mb-8 italic" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                "{words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * (reduced ? 0 : 0.015), duration: 0.3 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}"
              </p>

              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-white text-base md:text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Directeur Général</p>
                  <p className="text-slate-400 text-sm md:text-base">TRIWAYS International</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes ping {
          0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          100% { box-shadow: 0 0 0 20px rgba(99,102,241,0); }
        }
      `}</style>
    </section>
  );
}



// ── NEW ServicesDetail Style ──────────────────────────────────────────────────

function ServicesDetail() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center">
            <GlassBadge icon={Zap}>Nos Expertises</GlassBadge>
          </div>
          <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Nos{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Services</span>
          </h2>
        </motion.div>

        {/* New Tabbed Interface */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Side - Service Navigation */}
          <div className="lg:col-span-4 space-y-3 md:space-y-4">
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveService(index)}
                className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 group ${
                  activeService === index
                    ? 'bg-indigo-500/10 border-indigo-400/30 shadow-lg shadow-indigo-500/10'
                    : 'bg-white/5 border-white/10 hover:border-indigo-400/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${service.color} transition-transform duration-300 ${activeService === index ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <service.icon size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-wider block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      0{index + 1}
                    </span>
                    <h3 className={`text-sm md:text-lg font-bold transition-colors truncate ${activeService === index ? 'text-white' : 'text-slate-300'}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                      {service.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Side - Active Service Display */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              {/* Large Image Card */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 group">
                <div className="aspect-video">
                  <img
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                {(() => {
                  const ActiveIcon = services[activeService].icon;

                  return (
                    <div
                      className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full bg-gradient-to-r ${services[activeService].color} text-white text-xs md:text-sm font-medium`}
                    >
                      <ActiveIcon size={14} className="md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Service Premium</span>
                      <span className="sm:hidden">Premium</span>
                    </div>
                  );
                })()}
              </div>

                {/* Large Number Overlay */}
                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                  <span className="text-6xl md:text-[120px] font-extrabold text-white/5 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                    0{activeService + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-base md:text-lg text-slate-300 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {services[activeService].description}
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {services[activeService].features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/30 transition-colors"
                    >
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-gradient-to-br ${services[activeService].color} flex items-center justify-center flex-shrink-0`}>
                        <CheckCircle size={14} className="text-white md:w-4 md:h-4" />
                      </div>
                      <span className="text-slate-300 text-sm md:text-base font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2 md:pt-4">
                  <GlassButton to="/contact">
                    Demander un devis
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex justify-center">
            <GlassBadge icon={Award}>Nos Atouts</GlassBadge>
          </div>
          <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Pourquoi nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">choisir</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {whyChooseUs.map((item, index) => {
            const isLarge = index === 0 || index === 5;
            const isCTA = index === 5;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative ${isLarge ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative p-6 md:p-8 rounded-xl md:rounded-2xl overflow-hidden h-full border transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] ${
                  isCTA 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400/30' 
                    : 'bg-white/5 border-white/10 hover:border-indigo-400/30'
                }`}>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-3 md:p-4 rounded-lg md:rounded-xl w-fit mb-4 md:mb-6 ${
                      isCTA ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    }`}
                  >
                    <item.icon size={24} className="text-white md:w-7 md:h-7" />
                  </motion.div>

                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{item.title}</h4>
                  <p className={`text-sm md:text-base leading-relaxed ${isCTA ? 'text-white/90' : 'text-slate-400 group-hover:text-slate-300'} transition-colors`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const titleChars = "L'univers".split('');
  const triwaysChars = "TRIWAYS".split('');

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex justify-center">
            <GlassBadge icon={TrendingUp}>Notre Galerie</GlassBadge>
          </div>
          <h2 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="flex flex-wrap justify-center">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className="text-white"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center">
              {triwaysChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (titleChars.length + i) * 0.03, duration: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <svg className="absolute -inset-2 md:-inset-4 w-[calc(100%+16px)] md:w-[calc(100%+32px)] h-[calc(100%+16px)] md:h-[calc(100%+32px)] pointer-events-none z-20">
            <motion.rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              rx="16"
              className="md:rounded-2xl"
              fill="none"
              stroke="rgba(99,102,241,0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          <div className="relative h-[300px] sm:h-[400px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
            <InfiniteGallery images={galleryImages} speed={1.2} visibleCount={12}
              fadeSettings={{ fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.4, end: 0.43 } }}
              blurSettings={{ blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.4, end: 0.43 }, maxBlur: 8.0 }}
              className="h-full w-full" />

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mix-blend-exclusion text-white opacity-80 italic" style={{ fontFamily: 'Syne, sans-serif' }}>TRIWAYS</h3>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-3 md:px-6 py-1.5 md:py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30"
          >
            <p className="text-indigo-300 text-[10px] md:text-xs font-mono uppercase tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Molette ou flèches • Auto-play après 3s</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function QuiSommesNous() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-slate-950">
      <SEO page="about" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>


      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full bg-indigo-600 blur-[150px] md:blur-[220px]"
        />

        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-purple-600 blur-[120px] md:blur-[200px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:50px_50px]" />

        <NoiseOverlay opacity={0.08} />
      </div>

      <main className="relative z-10">
        <Hero />
        <MissionStatement />
        <CEOQuote />
        <ServicesDetail />
        <WhyChooseUs />
        <GallerySection />
      </main>
    </div>
  );
}