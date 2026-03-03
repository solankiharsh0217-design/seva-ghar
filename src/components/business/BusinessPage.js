import React from 'react';
import { CORPORATE_SERVICES } from '../../data/services';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function RevealDiv({ children, style, className }) {
  const { ref, style: anim } = useScrollReveal();
  return <div ref={ref} className={className} style={{ ...style, ...anim }}>{children}</div>;
}

export default function BusinessPage({ onBooking }) {
  return (
    <>
      {/* Hero */}
      <section className="section--dark" style={{ padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 40%,rgba(232,114,42,0.1) 0%,transparent 60%)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="tag" style={{ background: 'rgba(232,114,42,0.2)', marginBottom: 18 }}>
            <span style={{ color: 'var(--turmeric)', fontWeight: 600 }}>🏢 SevaGhar for Business</span>
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12 }}>
            Office & Corporate<br />
            <span style={{ color: 'var(--turmeric)' }}>Facility Management</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Bahadurgarh ke IT offices, factories, housing societies, hospitals — sab ke liye customized maintenance solutions.
            Monthly contracts, dedicated staff, aur professional reporting.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn--primary" onClick={() => onBooking('corporate')}>Get Corporate Quote</button>
            <button className="btn btn--white-outline">📞 Talk to Sales Team</button>
          </div>
        </div>
      </section>

      {/* Active Services */}
      <RevealDiv style={{ padding: '60px 24px' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10, textAlign: 'center' }}>
            Current Corporate Services
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-mid)', textAlign: 'center', marginBottom: 36 }}>
            Ye services abhi available hain B2B clients ke liye
          </p>
          <div className="grid grid--3">
            {CORPORATE_SERVICES.active.map((s, i) => (
              <div key={i} className="card card--hover" style={{ padding: 22 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.6 }}>{s.desc}</p>
                <span className="tag" style={{ background: 'var(--green-light)', color: 'var(--green)', marginTop: 10 }}>
                  ✅ Available Now
                </span>
              </div>
            ))}
          </div>
        </div>
      </RevealDiv>

      {/* Coming Soon */}
      <RevealDiv style={{ padding: '0 24px 60px' }}>
        <div className="container">
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10, textAlign: 'center' }}>
            Jaldi Aa Raha Hai — <span className="hindi" style={{ color: 'var(--saffron)' }}>जल्दी आ रहा है</span>
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-light)', textAlign: 'center', marginBottom: 24 }}>
            In services ko hum future mein launch karenge. Stay tuned!
          </p>
          <div className="grid grid--4">
            {CORPORATE_SERVICES.upcoming.map((s, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, padding: 18,
                border: '1px dashed #E0D4C4', textAlign: 'center', opacity: 0.55,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--deep-brown)' }}>{s.title}</div>
                <div className="tag" style={{ background: 'var(--saffron-light)', color: 'var(--saffron)', marginTop: 8 }}>
                  🔜 {s.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealDiv>

      {/* Stats Bar */}
      <RevealDiv style={{ padding: '0 24px 60px' }}>
        <div className="container">
          <div className="card--dark" style={{ borderRadius: 'var(--radius-xl)', padding: 36 }}>
            <div className="grid grid--4">
              {[
                { num: '200+', label: 'Corporate Clients', icon: '🏢' },
                { num: '98%', label: 'Retention Rate', icon: '🔄' },
                { num: '₹0', label: 'Hidden Charges', icon: '💯' },
                { num: '15min', label: 'Emergency Response', icon: '⚡' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--turmeric)' }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealDiv>
    </>
  );
}
