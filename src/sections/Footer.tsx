import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Ship,
  Plane,
  Truck,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Transport Maritime', to: '/services#maritime' },
    { name: 'Transport Aérien', to: '/services#aerien' },
    { name: 'Logistique Terrestre', to: '/services#terrestre' },
    { name: 'Fret International', to: '/services#fret' },
    { name: 'Stockage & Warehouse', to: '/services#stockage' },
  ],
  company: [
    { name: 'À propos', to: '/qui-sommes-nous' },
    { name: 'Notre équipe', to: '/qui-sommes-nous#equipe' },
    { name: 'Carrières', to: '/carrieres' },
    { name: 'Contact', to: '/contact' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const contactInfo = [
  { icon: Mail, href: 'mailto:contact@triways.com', text: 'contact@triways.com' },
  { icon: Phone, href: 'tel:+33123456789', text: '+33 1 23 45 67 89' },
  { icon: MapPin, text: '123 Avenue des Champs-Élysées\n75008 Paris, France' },
];

const transportIcons = [
  { icon: Ship, label: 'Maritime' },
  { icon: Plane, label: 'Aérien' },
  { icon: Truck, label: 'Terrestre' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0d1526 0%, #0a1020 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Main footer content */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 48px 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://pttyxrnufnmrjtxiielr.supabase.co/storage/v1/object/sign/images/image-removebg-preview%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRlMGRiYy0xNmZiLTQ0NWEtOWM2Ni0yYTI0ZDYwMGFiZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2UtcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzc0NDk2NDQxLCJleHAiOjE4MDYwMzI0NDF9.TEzY_B6MDwPcPSUWKUthIUde3-0Xc3EQelONzVTNiTo"
                  alt="TRIWAYS"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                  }}
                >
                  TRIWAYS
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    color: '#4a5568',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginTop: '3px',
                  }}
                >
                  INTERNATIONAL
                </div>
              </div>
            </Link>

            {/* Description */}
            <p
              style={{
                color: '#8892a4',
                fontSize: '13.5px',
                lineHeight: '1.7',
                margin: '0 0 28px',
                maxWidth: '260px',
              }}
            >
              Votre partenaire logistique de confiance pour le transport international. Solutions complètes, expertise reconnue et accompagnement personnalisé .
            </p>

            {/* Transport icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {transportIcons.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} color="#3b82f6" />
                </div>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: 0,
                  letterSpacing: '0',
                }}
              >
                Services
              </h4>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(59,130,246,0.5) 0%, transparent 100%)',
                }}
              />
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    style={{
                      color: '#8892a4',
                      textDecoration: 'none',
                      fontSize: '13.5px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.target.style.color = '#8892a4')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                Entreprise
              </h4>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(59,130,246,0.5) 0%, transparent 100%)',
                }}
              />
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    style={{
                      color: '#8892a4',
                      textDecoration: 'none',
                      fontSize: '13.5px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.target.style.color = '#8892a4')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <h4
                style={{
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                Contact
              </h4>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(59,130,246,0.5) 0%, transparent 100%)',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactInfo.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={15} color="#3b82f6" />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        color: '#8892a4',
                        textDecoration: 'none',
                        fontSize: '13.5px',
                        paddingTop: '8px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                      onMouseLeave={(e) => (e.target.style.color = '#8892a4')}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span
                      style={{
                        color: '#8892a4',
                        fontSize: '13.5px',
                        whiteSpace: 'pre-line',
                        paddingTop: '8px',
                        lineHeight: '1.5',
                      }}
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Social links */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8892a4',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8892a4';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              <social.icon size={15} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            color: '#4a5568',
            fontSize: '13px',
            margin: 0,
          }}
        >
          © {currentYear} TRIWAYS International. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;