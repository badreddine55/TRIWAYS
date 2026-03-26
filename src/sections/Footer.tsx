import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';

// ── Footer Component ──────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Transport Maritime', to: '/services#maritime' },
      { name: 'Transport Aérien', to: '/services#aerien' },
      { name: 'Logistique Terrestre', to: '/services#terrestre' },
      { name: 'Stockage', to: '/services#stockage' },
      { name: 'Fret International', to: '/services#fret' },
    ],
    company: [
      { name: 'À propos', to: '/qui-sommes-nous' },
      { name: 'Notre équipe', to: '/qui-sommes-nous#equipe' },
      { name: 'Carrières', to: '/carrieres' },
      { name: 'Actualités', to: '/actualites' },
      { name: 'Partenaires', to: '/partenaires' },
    ],
    support: [
      { name: 'Contact', to: '/contact' },
      { name: 'FAQ', to: '/faq' },
      { name: 'Devis en ligne', to: '/devis' },
      { name: 'Suivi de colis', to: '/suivi' },
      { name: 'Assistance', to: '/assistance' },
    ],
    legal: [
      { name: 'Mentions légales', to: '/mentions-legales' },
      { name: 'Confidentialité', to: '/confidentialite' },
      { name: 'CGV', to: '/cgv' },
      { name: 'Cookies', to: '/cookies' },
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow bg-white flex items-center justify-center p-1.5">
                  <img
                    src="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
                    alt="TRIWAYS logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">TRIWAYS</span>
                  <span className="block text-xs text-slate-500 uppercase tracking-widest">International</span>
                </div>
              </Link>
              
              <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
                Votre partenaire logistique de confiance pour le transport international. 
                Solutions complètes, expertise reconnue et accompagnement personnalisé.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+33123456789" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Phone size={18} className="text-indigo-400" />
                  </div>
                  <span>+33 1 23 45 67 89</span>
                </a>
                
                <a href="mailto:contact@triways.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Mail size={18} className="text-indigo-400" />
                  </div>
                  <span>contact@triways.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin size={18} className="text-indigo-400" />
                  </div>
                  <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                Services
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent ml-2" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.to} 
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                Entreprise
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent ml-2" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.to} 
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                Support
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent ml-2" />
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.to} 
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                Newsletter
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent ml-2" />
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Recevez nos actualités et offres spéciales.
              </p>
              
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-sm"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                >
                  S'abonner
                </motion.button>
              </form>

              {/* Social Links */}
              <div className="mt-6">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Suivez-nous</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                © {currentYear} TRIWAYS International. Tous droits réservés.
              </p>
              
              <div className="flex items-center gap-6 text-sm">
                {footerLinks.legal.map((link, index) => (
                  <span key={link.name} className="flex items-center gap-6">
                    <Link 
                      to={link.to} 
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;