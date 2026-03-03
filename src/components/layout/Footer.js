import React from 'react';
import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Housekeeping', to: '/services' },
      { label: 'Electrician & Plumber', to: '/services' },
      { label: 'AC Repair', to: '/services' },
      { label: 'Pest Control & Painting', to: '/services' },
      { label: 'House Contractor', to: '/services' },
      { label: 'Building Material', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'For Business', to: '/business' },
      { label: 'Areas', to: '/areas' },
      { label: 'Become a Karigar', to: '/about' },
      { label: 'Blog', to: '/' },
      { label: 'Contact', to: '/about' },
    ],
  },
  {
    title: 'Bahadurgarh Areas',
    links: [
      { label: 'Sector 6', to: '/areas' },
      { label: 'Sector 7', to: '/areas' },
      { label: 'Mahavir Park', to: '/areas' },
      { label: 'Housing Board Colony', to: '/areas' },
      { label: 'MIE Industrial', to: '/areas' },
      { label: 'All Areas →', to: '/areas' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1A0E00', padding: '50px 24px 24px', color: 'rgba(255,255,255,0.6)' }}>
      <div className="footer-grid" style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 36,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: 'white',
            }}>
              से
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'white' }}>SevaGhar</div>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 280 }}>
            Bahadurgarh ka apna trusted home & office services platform. Affordable, reliable, humesha apki seva mein.
          </p>
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            {['WhatsApp', 'Instagram', 'YouTube'].map((s) => (
              <span key={s} style={{
                padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)',
                fontSize: 11, cursor: 'pointer',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 14 }}>
              {col.title}
            </div>
            {col.links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', marginBottom: 8,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        maxWidth: 'var(--max-width)', margin: '0 auto',
      }}>
        <div style={{ fontSize: 11 }}>© 2026 SevaGhar. Made with ❤️ in Bahadurgarh</div>
        <div style={{ fontSize: 11 }}>Privacy Policy · Terms of Service · Refund Policy</div>
      </div>
    </footer>
  );
}
