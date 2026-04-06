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
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';

const iconMap = { mail: Mail, phone: Phone, location: MapPin };

export function Footer() {
  const { lang } = useLang();
  const footerData = translations[lang].footer;
  const currentYear = new Date().getFullYear();

  const footerLinks = footerData.links;
  const contactInfo = footerData.info.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap],
  }));
  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const transportIcons = [
    { icon: Ship, label: 'Maritime' },
    { icon: Plane, label: 'Aérien' },
    { icon: Truck, label: 'Terrestre' },
  ];

  return (
    <>
      {/* Responsive styles injected via <style> tag */}
      <style>{`
        .footer-root {
          background: linear-gradient(180deg, #0d1526 0%, #0a1020 100%);
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'Inter', sans-serif;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 48px 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-section-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .footer-section-heading h4 {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          margin: 0;
          letter-spacing: 0;
          white-space: nowrap;
        }

        .footer-divider {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(59,130,246,0.5) 0%, transparent 100%);
        }

        .footer-link-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          color: #8892a4;
          text-decoration: none;
          font-size: 13.5px;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #ffffff;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-contact-text {
          color: #8892a4;
          text-decoration: none;
          font-size: 13.5px;
          padding-top: 8px;
          transition: color 0.2s;
          white-space: pre-line;
          line-height: 1.5;
        }

        a.footer-contact-text:hover {
          color: #ffffff;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8892a4;
          transition: all 0.2s;
          text-decoration: none;
        }

        .footer-social-btn:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.08);
        }

        /* ── Tablet: 2-column grid ── */
        @media (max-width: 1024px) {
          .footer-inner {
            padding: 48px 32px 36px;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .footer-bottom {
            padding: 20px 32px;
          }
        }

        /* ── Large mobile: single column ── */
        @media (max-width: 640px) {
          .footer-inner {
            padding: 40px 20px 28px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            padding: 16px 20px;
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
          }
          .footer-bottom p {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer-root">
        {/* Main footer content */}
        <div className="footer-inner">
          <div className="footer-grid">

            {/* Brand column */}
            <div>
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
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1 }}>
                    TRIWAYS
                  </div>
                  <div style={{ fontSize: '9px', color: '#4a5568', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '3px' }}>
                    INTERNATIONAL
                  </div>
                </div>
              </Link>

              <p style={{ color: '#8892a4', fontSize: '13.5px', lineHeight: '1.7', margin: '0 0 28px', maxWidth: '260px' }}>
                Votre partenaire logistique de confiance pour le transport international. Solutions complètes, expertise reconnue et accompagnement personnalisé.
              </p>

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
              <div className="footer-section-heading">
                <h4>Services</h4>
                <div className="footer-divider" />
              </div>
              <ul className="footer-link-list">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="footer-link">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise column */}
            <div>
              <div className="footer-section-heading">
                <h4>Entreprise</h4>
                <div className="footer-divider" />
              </div>
              <ul className="footer-link-list">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="footer-link">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <div className="footer-section-heading">
                <h4>Contact</h4>
                <div className="footer-divider" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {contactInfo.map((item: any, index: number) => (
                  <div key={index} className="footer-contact-item">
                    <div className="footer-contact-icon">
                      <item.icon size={15} color="#3b82f6" />
                    </div>
                    {item.href ? (
                      <a href={item.href} className="footer-contact-text">{item.text}</a>
                    ) : (
                      <span className="footer-contact-text">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', gap: '10px' }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-btn"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>

          <p style={{ color: '#4a5568', fontSize: '13px', margin: 0 }}>
            © {currentYear} TRIWAYS International. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;