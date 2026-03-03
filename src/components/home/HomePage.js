import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES, BUILDING_MATERIALS, BAHADURGARH_AREAS, TESTIMONIALS } from '../../data/services';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHeader from '../common/SectionHeader';
import ServiceCard from '../common/ServiceCard';
import StarRating from '../common/StarRating';
import Ticker from '../common/Ticker';

function RevealSection({ children, id, className, style }) {
  const { ref, style: animStyle } = useScrollReveal();
  return (
    <section ref={ref} id={id} className={className} style={{ ...style, ...animStyle }}>
      {children}
    </section>
  );
}

export default function HomePage({ onBooking }) {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState('');

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{
        padding: '60px 24px 50px', position: 'relative', overflow: 'hidden',
        backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(232,114,42,0.08) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(245,166,35,0.06) 0%,transparent 50%)',
      }}>
        <div style={{
          position: 'absolute', top: 60, right: -60, width: 280, height: 280,
          borderRadius: '50%', border: '2px dashed rgba(232,114,42,0.1)',
          animation: 'float 6s ease-in-out infinite', pointerEvents: 'none',
        }} />

        <div className="flex-hero" style={{
          maxWidth: 'var(--max-width)', margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 50,
        }}>
          <div style={{ flex: 1 }}>
            <div className="tag" style={{
              background: 'var(--saffron-light)', marginBottom: 18,
              border: '1px solid rgba(232,114,42,0.15)',
            }}>
              <span>🏠</span>
              <span style={{ color: 'var(--saffron)', fontWeight: 600 }}>Bahadurgarh's #1 Home Services</span>
              <span style={{ color: 'var(--text-light)' }}>· 4.8★</span>
            </div>

            <h1 style={{
              fontSize: 48, fontWeight: 900, color: 'var(--text-dark)',
              lineHeight: 1.12, marginBottom: 6, letterSpacing: -1,
            }}>
              Ghar Ho Ya Office,<br />
              <span className="gradient-text">Seva Hum Denge!</span>
            </h1>

            <p className="hindi" style={{ fontSize: 17, color: 'var(--earth)', marginBottom: 14, fontStyle: 'italic' }}>
              "घर हो या ऑफिस, सेवा हम देंगे!"
            </p>

            <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Housekeeping, electrician, plumber, AC repair, pest control,{' '}
              <strong style={{ color: 'var(--contractor)' }}>house construction</strong> aur{' '}
              <strong style={{ color: 'var(--contractor)' }}>building material</strong> — sab kuch ek app se.
              Poore Bahadurgarh mein.
            </p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
              <button className="btn btn--primary" onClick={() => onBooking('general')}>
                📱 Abhi Book Karein
              </button>
              <button className="btn btn--outline" onClick={() => navigate('/business')}>
                🏢 Corporate Enquiry
              </button>
            </div>

            <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
              {[
                { n: '50K+', l: 'Happy Customers' },
                { n: '2,500+', l: 'Verified Karigars' },
                { n: '30 min', l: 'Avg. Response' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--saffron)' }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="hide-mobile" style={{ flex: 1, position: 'relative', minHeight: 400 }}>
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
              <div className="card animate-float" style={{ padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--deep-brown)', marginBottom: 14 }}>
                  📍 Bahadurgarh mein service book karein
                </div>
                <select
                  className="select"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  style={{ marginBottom: 14 }}
                >
                  <option value="">Area choose karein...</option>
                  {BAHADURGARH_AREAS.map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {SERVICES.map((s) => (
                    <ServiceCard key={s.id} service={s} compact />
                  ))}
                </div>

                <button className="btn btn--primary btn--full" onClick={() => navigate('/services')}>
                  View All Services →
                </button>
              </div>

              {/* Floating badges */}
              <div style={{
                position: 'absolute', top: -12, right: 10, background: 'white',
                borderRadius: 14, padding: '8px 14px', boxShadow: '0 8px 30px rgba(61,31,0,0.12)',
                display: 'flex', alignItems: 'center', gap: 8, animation: 'float 4s ease-in-out infinite 1s',
              }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)' }}>Verified Karigar</div>
                  <div style={{ fontSize: 9, color: 'var(--text-light)' }}>Background checked</div>
                </div>
              </div>

              <div style={{
                position: 'absolute', bottom: 50, left: -20, background: 'white',
                borderRadius: 14, padding: '8px 14px', boxShadow: '0 8px 30px rgba(61,31,0,0.12)',
                animation: 'float 5s ease-in-out infinite 2s',
              }}>
                <div style={{ fontSize: 10, color: 'var(--text-light)' }}>Starting at</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--saffron)' }}>₹199</div>
                <div style={{ fontSize: 9, color: 'var(--green)', fontWeight: 600 }}>No hidden charges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ===== SERVICES OVERVIEW ===== */}
      <RevealSection style={{ padding: '70px 24px' }}>
        <div className="container">
          <SectionHeader
            badge="🔧 Humari Sevayen — हमारी सेवाएं"
            title="Ek App, "
            highlight="Saari Seva"
            subtitle="Safai se lekar ghar banana tak — trained professionals apke doorstep par, Bahadurgarh mein"
          />
          <div className="grid grid--5">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ===== BUILDING MATERIALS ===== */}
      <RevealSection className="section--cream">
        <div className="container">
          <SectionHeader
            badge="🧱 Building Material — निर्माण सामग्री"
            title="Ghar Banane Ka "
            highlight="Saara Saamaan"
            subtitle="Cement se lekar paint tak — top brands at best prices, delivered in Bahadurgarh"
          />
          <div className="grid grid--3">
            {BUILDING_MATERIALS.slice(0, 6).map((m, i) => (
              <div key={i} className="card card--hover" style={{ padding: 20, cursor: 'pointer' }}
                onClick={() => navigate('/services', { state: { expandId: 'materials' } })}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: `${m.color}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>
                    {m.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)' }}>{m.category}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{m.items.length} items</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {m.items.slice(0, 3).map((item, j) => (
                    <span key={j} style={{
                      fontSize: 11, background: `${m.color}10`, color: m.color,
                      padding: '3px 10px', borderRadius: 20, fontWeight: 500,
                    }}>
                      {item}
                    </span>
                  ))}
                  {m.items.length > 3 && (
                    <span style={{ fontSize: 11, color: 'var(--text-light)', padding: '3px 6px' }}>
                      +{m.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button className="btn btn--primary" onClick={() => navigate('/services', { state: { expandId: 'materials' } })}>
              View All Materials & Services →
            </button>
          </div>
        </div>
      </RevealSection>

      {/* ===== HOW IT WORKS ===== */}
      <RevealSection style={{ padding: '70px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10 }}>
            Kaise Kaam Karta Hai? <span className="hindi" style={{ color: 'var(--saffron)' }}>बहुत आसान!</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-mid)', marginBottom: 40 }}>
            Sirf 3 steps mein seva book karein
          </p>
          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { step: '01', icon: '📍', title: 'Area Choose Karein', desc: 'Apna Bahadurgarh area select karein' },
              { step: '02', icon: '📅', title: 'Service & Time Book Karein', desc: 'Service choose karein, date & time set karein' },
              { step: '03', icon: '🤝', title: 'Karigar Aayega!', desc: 'Verified professional doorstep par, on time!' },
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 240px', maxWidth: 280, position: 'relative' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', background: 'white',
                  margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, boxShadow: '0 8px 30px var(--saffron-glow)',
                }}>
                  {s.icon}
                </div>
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%) translateY(-6px)',
                  background: 'var(--saffron)', color: 'white', fontSize: 10, fontWeight: 800,
                  width: 26, height: 26, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ===== TESTIMONIALS ===== */}
      <RevealSection className="section--cream">
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 36, textAlign: 'center' }}>
            Bahadurgarh Ke Log Kya Kehte Hain ❤️
          </h2>
          <div className="grid grid--3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span className="tag" style={{
                    background: t.type === 'B2B' ? '#2A7DE810' : 'var(--green-light)',
                    color: t.type === 'B2B' ? 'var(--blue)' : 'var(--green)',
                  }}>
                    {t.type === 'B2B' ? '🏢 Business' : '🏠 Home'}
                  </span>
                  <StarRating rating={t.rating} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 14, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>📍 {t.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ===== CTA ===== */}
      <section className="section--gradient" style={{ padding: '70px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 10 }}>Abhi Seva Book Karein!</h2>
        <p className="hindi" style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>
          पहली बुकिंग पर 20% छूट — अभी बुक करें!
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn--white" onClick={() => onBooking('general')}>📱 Book for Home</button>
          <button className="btn btn--white-outline" onClick={() => navigate('/business')}>🏢 Corporate Enquiry</button>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 18 }}>
          📞 Helpline: 1800-SEVA-GHAR | WhatsApp: +91 98765 43210
        </p>
      </section>
    </>
  );
}
