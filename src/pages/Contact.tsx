import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Check, Send } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
                Contact
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Contactez-nous
              </h1>
              <p className="text-white/70 text-lg">
                Notre équipe est à votre écoute pour répondre à toutes vos questions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Parlons de votre projet
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Notre équipe est disponible pour répondre à toutes vos questions
                et vous accompagner dans vos projets logistiques.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10"
                >
                  <p className="text-slate-600 font-medium mb-4">Suivez-nous</p>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-colors"
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-[250px] bg-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                        <p className="text-slate-900 font-semibold text-center">Casablanca, Maroc</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
                        >
                          <Check className="w-10 h-10 text-emerald-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          Message envoyé !
                        </h3>
                        <p className="text-slate-600">
                          Nous vous répondrons dans les plus brefs délais.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nom complet *</Label>
                            <Input
                              id="name"
                              placeholder="Votre nom"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="votre@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="h-12"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+212 6XX-XXXXXX"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Sujet *</Label>
                            <Select
                              value={formData.subject}
                              onValueChange={(value) => setFormData({ ...formData, subject: value })}
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Sélectionnez un sujet" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="transport">Transport</SelectItem>
                                <SelectItem value="douane">Douane</SelectItem>
                                <SelectItem value="consulting">Consulting</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Décrivez votre projet..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            className="min-h-[150px] resize-none"
                          />
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                          >
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
