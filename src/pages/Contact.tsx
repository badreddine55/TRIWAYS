import { useState, useRef, type FormEvent } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Check, Send, Navigation, Truck, Plane, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SEO from '@/components/SEO';
import { useLang } from '@/sections/LangContext';
import { translations } from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

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



export default function Contact() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', transportType: '', message: '',
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const showTransportOptions = formData.subject === 'transport';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create email body with form data
    const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
${formData.transportType ? `Transport Type: ${formData.transportType}\n` : ''}
Message:
${formData.message}`;

    // Create mailto link
    const mailtoLink = `mailto:sales@triwayslogistics.ma?subject=${encodeURIComponent(`Contact Form - ${formData.subject}`)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;

    // Open email client in new tab
    window.open(mailtoLink, '_blank');

    // Show success state
    setIsSubmitted(true);
    setProgress(0);
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
      setFormData({ name: '', email: '', phone: '', subject: '', transportType: '', message: '' });
      setProgress(0);
    }, 3000);
  };

  // Map contact info icons to translation data
  const contactInfoWithIcons = [
    { icon: MapPin,  label: t.info[0]?.label || 'Location', value: t.info[0]?.value || '' },
    { icon: Phone,   label: t.info[1]?.label || 'Phone', value: t.info[1]?.value || '' },
    { icon: Mail,    label: t.info[2]?.label || 'Email', value: t.info[2]?.value || '' },
    { icon: Clock,   label: t.info[3]?.label || 'Hours', value: t.info[3]?.value || '' },
  ];

  const transportOptionsWithIcons = t.form.transportTypes.map((opt, i) => ({
    ...opt,
    icon: [Ship, Plane, Truck][i],
  }));

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <SEO page="contact" />

      {/* Global Background — unchanged */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[900px] h-[900px] rounded-full bg-indigo-600 blur-[220px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.12, 0.08], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-purple-600 blur-[200px]"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <NoiseOverlay opacity={0.08} />
      </div>

      <section ref={sectionRef} className="min-h-screen py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <NoiseOverlay opacity={0.05} />

        <div className="px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-indigo-500" />
                <span className="text-indigo-400 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {t.headerTag}
                </span>
              </div>
              <h2
                className="text-[clamp(36px,6vw,72px)] text-white mb-4 leading-none"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              >
                {t.heading.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                  {t.heading.split(' ').slice(-1)[0]}
                </span>
              </h2>
              <motion.div
                className="h-[3px] w-[200px] bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 rounded-full"
                style={{ scaleX }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
              <p className="text-slate-400 text-lg max-w-xl mt-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.subheading}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Contact Cards */}
                <div className="grid gap-3">
                  {contactInfoWithIcons.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:translate-x-1 transition-all duration-300 group"
                    >
                      <motion.div
                        className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <item.icon size={20} />
                      </motion.div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {item.label}
                        </p>
                        <p className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>


                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="rounded-2xl overflow-hidden relative group"
                >
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-400/50 z-20" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-400/50 z-20" />

                  <div className="relative h-[300px] md:h-[350px]">
                    <img
                      src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80"
                      alt="Dakhla Map"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border border-indigo-400/20"
                          animate={{ scale: [1, 3], opacity: [0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                        />
                        <motion.div
                          className="relative bg-indigo-500 text-white p-3 rounded-full shadow-lg shadow-indigo-500/40"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <MapPin className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <Navigation className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                              {t.location}
                            </p>
                            <p className="text-slate-400 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                              {t.mapCoordinates}
                            </p>
                          </div>
                        </div>
                        <motion.a
                          href="https://maps.google.com/?q=Dakhla,Morocco"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/30 transition-colors"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {t.viewOnMaps}
                        </motion.a>
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
                className="lg:col-span-3"
              >
                <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-10 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
                  <div className="absolute top-1/2 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-24 h-24 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Check className="w-12 h-12 text-emerald-400" />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 1, opacity: 0.4 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-full border-2 border-emerald-400"
                        />
                      </div>
                      <h3
                        className="text-white text-2xl md:text-[28px] mb-2"
                        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                      >
                        {t.successTitle}
                      </h3>
                      <p className="text-slate-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {t.successBody}
                      </p>
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
                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Name & Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                          <Label htmlFor="name" className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {t.form.name} <span className="text-indigo-400">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Jean Dupont"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all hover:border-white/20"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label htmlFor="email" className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {t.form.email} <span className="text-indigo-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jean@entreprise.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all hover:border-white/20"
                          />
                        </div>
                      </div>

                      {/* Phone & Subject */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2 group">
                          <Label htmlFor="phone" className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {t.form.phone}
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+212 6XX-XXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all hover:border-white/20"
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label htmlFor="subject" className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {t.form.subject} <span className="text-indigo-400">*</span>
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => setFormData({ ...formData, subject: value, transportType: '' })}
                          >
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-0 focus:border-indigo-400/50 [&>span]:text-slate-600 data-[state=open]:border-indigo-400/50 hover:border-white/20 transition-all">
                              <SelectValue placeholder={t.form.selectOption} />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0A1628] border-white/10 backdrop-blur-xl">
                              {Object.entries(t.form.subjectOptions).map(([key, label]) => (
                                <SelectItem key={key} value={key} className="text-slate-300 focus:text-white focus:bg-indigo-500/10">
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Transport Type - Conditional */}
                      <AnimatePresence>
                        {showTransportOptions && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 pt-2">
                              <Label className="text-slate-400 text-xs uppercase tracking-widest font-normal" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {t.form.subject} <span className="text-indigo-400">*</span>
                              </Label>
                              <RadioGroup
                                value={formData.transportType}
                                onValueChange={(value) => setFormData({ ...formData, transportType: value })}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                              >
                                {transportOptionsWithIcons.map((option) => (
                                  <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <label
                                      htmlFor={option.id}
                                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                        formData.transportType === option.id
                                          ? 'bg-indigo-500/20 border-indigo-400/50 text-white'
                                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/8'
                                      }`}
                                    >
                                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                      <option.icon className={`w-6 h-6 ${formData.transportType === option.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                                      <div className="text-center">
                                        <p className="font-medium text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{option.label}</p>
                                        <p className="text-xs opacity-70 mt-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{option.desc}</p>
                                      </div>
                                      {formData.transportType === option.id && (
                                        <motion.div
                                          layoutId="check"
                                          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        >
                                          <Check className="w-3 h-3 text-white" />
                                        </motion.div>
                                      )}
                                    </label>
                                  </motion.div>
                                ))}
                              </RadioGroup>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Message */}
                      <div className="space-y-2 group">
                        <Label htmlFor="message" className="text-slate-400 text-xs uppercase tracking-widest font-normal group-focus-within:text-indigo-400 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {t.form.message} <span className="text-indigo-400">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-[140px] resize-none bg-white/5 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-0 focus-visible:border-indigo-400/50 focus-visible:bg-white/8 transition-all hover:border-white/20"
                        />
                      </div>

                      {/* Submit */}
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-2">
                        <Button
                          type="submit"
                          className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:via-purple-400 hover:to-cyan-400 text-white font-semibold text-base border-0 shadow-none hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] transition-all group relative overflow-hidden"
                          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          />
                          <span className="relative flex items-center justify-center gap-2">
                            {t.form.send}
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </motion.div>

                      <p className="text-center text-slate-500 text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {t.privacyNote}
                      </p>
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