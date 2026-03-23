import { useState, useRef, type FormEvent } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Check, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ── Noise Overlay Component ─────────────────────────────────────────────────────

const NoiseOverlay = ({ opacity = 0.08 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity
    }}
  />
);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Casablanca, Maroc',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+212 5XX-XXXXXX',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@TRIWAYS.ma',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun–Ven, 8h–18h',
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setProgress(0);
    
    // Animate progress bar over 3 seconds
    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress(currentStep / steps);
      if (currentStep >= steps) clearInterval(progressInterval);
    }, interval);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setProgress(0);
    }, 3000);
  };

  // Character animation for title
  const titleLine1 = "Contactez-";
  const titleLine2 = "nous";

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Global Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        
        {/* Indigo orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[900px] h-[900px] rounded-full bg-indigo-600 blur-[220px]"
        />
        
        {/* Purple orb */}
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.12, 0.08], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-purple-600 blur-[200px]"
        />
        
        {/* Dot grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
        
        <NoiseOverlay opacity={0.08} />
      </div>


      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
        
        {/* Dot grid pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative z-10 max-w-[800px] mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >


            {/* Title - Line 1 */}
            <h1 
              className="text-white mb-0 leading-none mt-6"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              <span className="flex flex-wrap justify-center">
                {titleLine1.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Title - Line 2 (Gradient) */}
            <h1 
              className="leading-none mb-6"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              <span className="flex flex-wrap justify-center">
                {titleLine2.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: (titleLine1.length + i) * 0.02, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-slate-400 text-lg max-w-lg mx-auto"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="text-indigo-400/50" size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRef} className="py-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <NoiseOverlay opacity={0.05} />

        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <h2 
                className="text-[56px] text-white mb-4"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                Parlons de votre projet
              </h2>
              <motion.div
                className="h-[3px] w-[200px] mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 rounded-full"
                style={{ scaleX }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
              <p 
                className="text-slate-400 text-lg max-w-xl mx-auto mt-6"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Notre équipe est disponible pour répondre à toutes vos questions
                et vous accompagner dans vos projets logistiques.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className="grid gap-3">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:translate-x-1 transition-all duration-300 group"
                    >
                      <motion.div 
                        className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <item.icon size={22} />
                      </motion.div>
                      <div>
                        <p 
                          className="text-xs text-slate-600 uppercase tracking-widest mb-1"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {item.label}
                        </p>
                        <p 
                          className="text-lg text-white"
                          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10"
                >
                  <p 
                    className="text-indigo-400/50 text-xs uppercase tracking-widest mb-4"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Suivez-nous
                  </p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="w-11 h-11 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400/25 transition-all"
                        aria-label={social.label}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 rounded-2xl overflow-hidden relative"
                >
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-indigo-400/40 z-10" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-indigo-400/40 z-10" />
                  
                  <div className="relative h-[250px]">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/50" />
                    
                    {/* Glass card with pulsing pin */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                          animate={{ scale: [1, 2], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="bg-slate-950/70 backdrop-blur-md border border-indigo-400/20 rounded-xl p-4 flex items-center gap-3">
                          <MapPin className="w-6 h-6 text-indigo-400" />
                          <span 
                            className="text-white font-semibold"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            Casablanca, Maroc
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="relative bg-white/[0.03] border border-white/8 backdrop-blur-xl rounded-3xl p-8 md:p-10 overflow-hidden">
                  {/* Top gradient accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      {/* Success circle with rings */}
                      <div className="relative mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-24 h-24 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Check className="w-12 h-12 text-emerald-400" />
                        </motion.div>
                        {/* Animated rings */}
                        <motion.div
                          initial={{ scale: 1, opacity: 0.4 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-2 border-emerald-400"
                        />
                      </div>
                      
                      <h3 
                        className="text-white text-[28px] mb-2"
                        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                      >
                        Message envoyé !
                      </h3>
                      <p 
                        className="text-slate-400"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                      
                      {/* Progress bar */}
                      <div className="w-full max-w-[200px] mx-auto mt-4">
                        <div className="h-[2px] bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: progress }}
                            style={{ transformOrigin: 'left' }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <Label 
                            htmlFor="name" 
                            className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            Nom complet <span className="text-indigo-400">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all"
                            style={{ boxShadow: 'none' }}
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label 
                            htmlFor="email" 
                            className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            Email <span className="text-indigo-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <Label 
                            htmlFor="phone" 
                            className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            Téléphone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+212 6XX-XXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label 
                            htmlFor="subject" 
                            className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            Sujet <span className="text-indigo-400">*</span>
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          >
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-0 focus:border-indigo-400/50 [&>span]:text-slate-600 data-[state=open]:border-indigo-400/50">
                              <SelectValue placeholder="Sélectionnez un sujet" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0A1628] border-white/10 backdrop-blur-xl">
                              <SelectItem value="transport" className="text-slate-300 focus:text-white focus:bg-indigo-500/10">Transport</SelectItem>
                              <SelectItem value="douane" className="text-slate-300 focus:text-white focus:bg-indigo-500/10">Douane</SelectItem>
                              <SelectItem value="consulting" className="text-slate-300 focus:text-white focus:bg-indigo-500/10">Consulting</SelectItem>
                              <SelectItem value="autre" className="text-slate-300 focus:text-white focus:bg-indigo-500/10">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2 group">
                        <Label 
                          htmlFor="message" 
                          className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          Message <span className="text-indigo-400">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre projet..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-[150px] resize-none bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all"
                        />
                      </div>

                      <motion.div 
                        whileHover={{ scale: 1.01 }} 
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:via-purple-400 hover:to-cyan-400 text-white font-semibold text-lg border-0 shadow-none hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] transition-all group"
                          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                        >
                          <span className="flex items-center gap-2">
                            Envoyer le message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}