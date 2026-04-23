import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Ship,
  Plane,
  Truck,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useLang } from './LangContext';
import { translations } from '@/lib/translations';

const iconMap = { mail: Mail, phone: Phone, location: MapPin };

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const { lang } = useLang();
  const footerData = translations[lang].footer;

  const footerLinks = footerData.links;
  const contactInfo = footerData.info.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap],
  }));

  const whatsappUrl = `https://wa.me/212660276334?text=${encodeURIComponent(
    '🚛 Need a reliable logistics partner?\nWe offer you:\n✔️ National & international transport\n✔️ Transit & customs clearance\n✔️ Consulting and training in international commerce\n🎯 Less stress, more efficiency\n📩 Write to us for quick handling!'
  )}`;

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/triways-logistcs-company/', label: footerData.social[0]?.label || 'LinkedIn', isWhatsApp: false },
    { icon: Instagram, href: 'https://www.instagram.com/triways_logistics', label: footerData.social[1]?.label || 'Instagram', isWhatsApp: false },
    { icon: null, href: whatsappUrl, label: 'WhatsApp', isWhatsApp: true },
  ];

  const transportIcons = [
    { icon: Ship, label: footerData.transport.maritime },
    { icon: Plane, label: footerData.transport.air },
    { icon: Truck, label: footerData.transport.land },
  ];

  return (
    <>
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

        .footer-social-btn.whatsapp {
          color: #22c55e;
        }

        .footer-social-btn.whatsapp:hover {
          background: rgba(34,197,94,0.1);
          border-color: rgba(34,197,94,0.3);
          color: #16a34a;
        }

        @media (max-width: 1024px) {
          .footer-inner { padding: 48px 32px 36px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .footer-bottom { padding: 20px 32px; }
        }

        @media (max-width: 640px) {
          .footer-inner { padding: 40px 20px 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom {
            padding: 16px 20px;
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
          }
          .footer-bottom p { width: 100%; text-align: center; }
        }
      `}</style>

      <footer className="footer-root">
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
                    {footerData.brand.name}
                  </div>
                  <div style={{ fontSize: '9px', color: '#4a5568', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '3px' }}>
                    {footerData.brand.tagline}
                  </div>
                </div>
              </Link>

              <p style={{ color: '#8892a4', fontSize: '13.5px', lineHeight: '1.7', margin: '0 0 28px', maxWidth: '260px' }}>
                {footerData.description}
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
                <h4>{footerData.services}</h4>
                <div className="footer-divider" />
              </div>
              <ul className="footer-link-list">
                {footerLinks.services.map((link: any) => (
                  <li key={link.name}>
                    <Link to={link.to} className="footer-link">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <div className="footer-section-heading">
                <h4>{footerData.company}</h4>
                <div className="footer-divider" />
              </div>
              <ul className="footer-link-list">
                {footerLinks.company.map((link: any) => (
                  <li key={link.name}>
                    <Link to={link.to} className="footer-link">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <div className="footer-section-heading">
                <h4>{footerData.contact}</h4>
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
                className={`footer-social-btn${social.isWhatsApp ? ' whatsapp' : ''}`}
              >
                {social.isWhatsApp
                  ? <WhatsAppIcon size={15} />
                  : social.icon && <social.icon size={15} />
                }
              </a>
            ))}
          </div>

          <p style={{ color: '#4a5568', fontSize: '13px', margin: 0 }}>
            {footerData.copyright}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;