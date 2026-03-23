import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Package, Target, Truck, ArrowRight, ArrowUpRight, Globe, Clock, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const mainServices = [
  {
    id: 1,
    icon: Package,
    title: 'Gestion Douanière Intégrée',
    shortDesc: 'Simplifiez vos formalités douanières avec notre expertise spécialisée',
    fullDesc: 'Notre service de gestion douanière couvre tous les aspects du dédouanement, des déclarations et des procédures nécessaires pour un transit fluide et efficace. Notre plateforme de suivi permet à nos clients de suivre en temps réel l\'avancement de leurs démarches douanières.',
    image: 'https://images.unsplash.com/photo-1542296332-2e44a996aa0d?w=800&q=80',
    color: 'from-amber-500 to-orange-600',
    features: [
      'Dédouanement complet et rapide',
      'Suivi en temps réel des dossiers',
      'Conformité réglementaire garantie',
      'Documentation professionnelle',
      'Conseil en classification tarifaire',
    ],
    stat: '100%',
    statLabel: 'Livraisons à temps',
  },
  {
    id: 2,
    icon: Target,
    title: 'Consulting Stratégique',
    shortDesc: 'Maximisez vos opportunités d\'importation avec notre expertise',
    fullDesc: 'Nous vous guidons à travers chaque étape de votre chaîne logistique, en optimisant les processus pour minimiser les coûts et garantir la sortie de vos marchandises sans encombre.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    color: 'from-indigo-500 to-purple-600',
    features: [
      'Analyse de la chaîne logistique',
      'Optimisation des coûts d\'importation',
      'Stratégie d\'approvisionnement',
      'Étude de faisabilité',
      'Accompagnement personnalisé',
    ],
    stat: '95%',
    statLabel: 'Couverture réseau mondial',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Transport National et International',
    shortDesc: 'Réseau mondial de partenaires pour vos expéditions',
    fullDesc: 'Profitez de notre réseau mondial de partenaires pour des solutions de transport sur mesure, offrant des délais compétitifs et une fiabilité inégalée.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    color: 'from-emerald-500 to-teal-600',
    features: [
      'Transport terrestre national',
      'Transport maritime FCL/LCL',
      'Transport aérien express',
      'Multimodal et intermodal',
      'Traçabilité en temps réel',
    ],
    stat: '90%',
    statLabel: 'Efficacité transfrontalière',
  },
];

const additionalServices = [
  {
    icon: Globe,
    title: 'Freight Forwarding',
    description: 'Organisation complète de vos expéditions internationales',
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description: 'Livraison express pour vos envois urgents',
  },
  {
    icon: Shield,
    title: 'Assurance Transport',
    description: 'Protection complète de vos marchandises',
  },
];

const processSteps = [
  { number: '01', title: 'Consultation', description: 'Analyse de vos besoins spécifiques' },
  { number: '02', title: 'Devis', description: 'Proposition personnalisée et transparente' },
  { number: '03', title: 'Exécution', description: 'Mise en œuvre de la solution choisie' },
  { number: '04', title: 'Suivi', description: 'Accompagnement jusqu\'à la livraison' },
];

function FloatingCards() {
  const cardServices = mainServices.slice(0, 3);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardServices.map((service, index) => {
        const rotations = [-4, 1, 5];
        const offsets = [0, 20, 40];
        
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 60, rotate: rotations[index] }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotate: isHovered ? 0 : rotations[index],
            }}
            transition={{
              delay: 0.8 + index * 0.15,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              rotate: { type: "spring", stiffness: 200, damping: 20 }
            }}
            className="absolute bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 w-64"
            style={{
              left: `${offsets[index]}px`,
              top: `${offsets[index]}px`,
              zIndex: index + 1,
            }}
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} text-white mb-4`}>
              <service.icon size={28} />
            </div>
            <h3 className="text-white text-lg" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              {service.title.split(' ').slice(0, 2).join(' ')}
            </h3>
          </motion.div>
        );
      })}
    </div>
  );
}

function AnimatedTitle() {
  const text = "Nos Services";
  
  return (
    <motion.h1 
      className="text-[88px] text-white mb-4"
      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.025,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function TickerStrip() {
  const tickerText = "DÉDOUANEMENT • CONSULTING • TRANSPORT • FREIGHT • EXPRESS • ASSURANCE • CASABLANCA • INTERNATIONAL •";
  
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md border-t border-white/5 py-4 overflow-hidden">
      <div className="ticker-wrapper">
        <motion.div 
          className="ticker-content flex gap-8"
          animate={{ x: [0, -2000] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span 
              key={i}
              className="text-amber-400/70 text-xs uppercase whitespace-nowrap"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {tickerText}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof mainServices[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="relative"
    >
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        {/* Background Number */}
        <div 
          className="absolute text-white/[0.03] text-[200px] pointer-events-none select-none"
          style={{ 
            fontFamily: 'Syne, sans-serif', 
            fontWeight: 800,
            [index % 2 === 0 ? 'right' : 'left']: '20px',
            bottom: '20px',
            zIndex: 0,
          }}
        >
          0{service.id}
        </div>
        
        {/* Image */}
        <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
          <motion.div style={{ y }} className="relative rounded-2xl overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[450px] object-cover"
            />
            {/* Scanline texture */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
                mixBlendMode: 'overlay'
              }}
            />
            
            {/* Stat Badge */}
            <div className="absolute bottom-6 left-6 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 rounded-xl p-4">
              <p 
                className="text-3xl text-amber-400"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {service.stat}
              </p>
              <p 
                className="text-slate-300 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {service.statLabel}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`relative z-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6`}>
            <service.icon size={32} />
          </div>
          
          <h3 
            className="text-[40px] text-white mb-4"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
          >
            {service.title}
          </h3>
          
          <p 
            className="text-slate-300 text-lg leading-relaxed mb-6"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {service.fullDesc}
          </p>

          <motion.ul 
            className="space-y-3 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {service.features.map((feature, i) => (
              <motion.li 
                key={feature} 
                className="flex items-center gap-3 group cursor-default"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 bg-amber-500 rotate-45"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <span 
                  className="text-slate-200 group-hover:text-white transition-colors"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
              >
                Demander un devis
                <motion.div
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </motion.button>
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              En savoir plus →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      {index < mainServices.length - 1 && (
        <div className="mt-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      )}
    </motion.div>
  );
}

export default function Services() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [lineInView, setLineInView] = useState(false);
  const [timelineInView, setTimelineInView] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050D1A' }}>
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-blue-500 origin-left z-[9999]" 
      />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
          alt="Services Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        <div className="absolute inset-0 grid lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block w-fit px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-sm border border-amber-500/20 mb-6"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Nos Solutions
              </motion.span>
            </motion.span>
            
            <AnimatedTitle />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/70 text-lg max-w-xl"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Explorez nos différents services et trouvez la solution adaptée à vos besoins logistiques
            </motion.p>
            
            {/* Scroll Cue */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="text-white" size={32} />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right: Floating Cards */}
          <div className="hidden lg:block">
            <FloatingCards />
          </div>
        </div>
        
        {/* Ticker Strip */}
        <TickerStrip />
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20"
            >
              <span 
                className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-sm border border-amber-500/20 mb-4"
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
              >
                Solutions Complètes
              </span>
              <h2 
                className="text-[64px] text-white mb-6"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                onViewportEnter={() => setLineInView(true)}
              >
                Ce que nous offrons
              </h2>
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-amber-500 to-transparent max-w-md"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: lineInView ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>

            <div className="space-y-24">
              {mainServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 relative" style={{ backgroundColor: '#F4F1EC' }}>
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span 
                className="inline-block px-4 py-1.5 rounded-full bg-slate-900/10 text-slate-700 text-sm border border-slate-300/50 mb-4"
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
              >
                Services Complémentaires
              </span>
              <h2 
                className="text-[56px] text-slate-900"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                Et bien plus encore
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400/60 hover:shadow-amber-100/80 transition-all duration-300 h-full"
                  >
                    <motion.div 
                      className="p-4 rounded-xl bg-amber-500/10 text-amber-600 w-fit mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <service.icon size={28} />
                    </motion.div>
                    <h4 
                      className="text-xl text-slate-900 mb-3"
                      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                    >
                      {service.title}
                    </h4>
                    <p 
                      className="text-slate-500"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {service.description}
                    </p>
                    
                    {/* Animated bottom line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24" style={{ backgroundColor: '#050D1A' }}>
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onViewportEnter={() => setTimelineInView(true)}
              className="text-center mb-16"
            >
              <span 
                className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-sm border border-amber-500/20 mb-4"
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
              >
                Comment ça marche
              </span>
              <h2 
                className="text-[56px] text-white"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                Notre Processus
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline connector */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-px">
                <motion.div 
                  className="h-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: timelineInView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Number Circle */}
                    <motion.div 
                      className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6 group"
                      initial={{ borderColor: 'rgba(71, 85, 105, 1)' }}
                      whileInView={{ borderColor: 'rgba(232, 168, 56, 0.4)' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span 
                        className="text-xl text-amber-400"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
                      >
                        {step.number}
                      </span>
                      
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-amber-500/20"
                        animate={{ 
                          scale: [1, 1.6],
                          opacity: [1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </motion.div>
                    
                    <h4 
                      className="text-xl text-white mb-2"
                      style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                    >
                      {step.title}
                    </h4>
                    <p 
                      className="text-slate-400"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#040B18' }}>
        {/* Orb blurs */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500 opacity-15 blur-[180px]"
        />
        <div 
          className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-10 blur-[150px]"
        />
        
        {/* Dot grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 
                className="text-[64px] text-white mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.1 }}
              >
                Prêt à optimiser
              </h2>
              <h2 
                className="text-[64px] mb-6"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.1 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  votre logistique
                </span>
                <span className="text-white"> ?</span>
              </h2>
              <p 
                className="text-slate-300 text-lg mb-8"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Contactez-nous dès maintenant pour obtenir un devis personnalisé
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 60px rgba(232,168,56,0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-lg transition-colors"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
                  >
                    <span className="inline-flex items-center gap-2">
                      Demander un devis gratuit
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight size={20} />
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(232,168,56,0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-full border border-white/15 text-white hover:border-amber-500/40 transition-colors"
                    style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
                  >
                    Voir nos références →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
