import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVICES, BUILDING_MATERIALS } from '../../data/services';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function RevealDiv({ children, style }) {
  const { ref, style: anim } = useScrollReveal();
  return <div ref={ref} style={{ ...style, ...anim }}>{children}</div>;
}

export default function ServicesPage({ onBooking }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandId || null);

  useEffect(() => {
    if (location.state?.expandId) {
      setExpanded(location.state.expandId);
      setTimeout(() => {
        const el = document.getElementById(`svc-${location.state.expandId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [location.state]);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <>
      {/* Header */}
      <section style={{ padding: '50px 24px 30px', background: 'linear-gradient(180deg,var(--saffron-light),var(--warm-cream))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: 'var(--text-dark)', marginBottom: 8 }}>
            Humari <span style={{ color: 'var(--saffron)' }}>Services</span> — विस्तार से
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-mid)', maxWidth: 600, margin: '0 auto' }}>
            Har service ki poori detail — kya milega, kitne ka, aur kaise book karein
          </p>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div style={{
        padding: '16px 24px', position: 'sticky', top: 68, background: 'var(--warm-cream)',
        zIndex: 40, borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => { toggle(s.id); document.getElementById(`svc-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              style={{
                padding: '10px 20px', borderRadius: 'var(--radius-full)', border: 'none',
                background: expanded === s.id ? s.color : 'var(--saffron-light)',
                color: expanded === s.id ? 'white' : 'var(--text-mid)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.3s',
              }}
            >
              {s.icon} {s.title.split(' & ')[0]}
            </button>
          ))}
          <button
            onClick={() => { toggle('materials'); document.getElementById('svc-materials')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-full)', border: 'none',
              background: expanded === 'materials' ? '#8B5E3C' : 'var(--saffron-light)',
              color: expanded === 'materials' ? 'white' : 'var(--text-mid)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.3s',
            }}
          >
            🧱 Building Material
          </button>
        </div>
      </div>

      {/* Service Accordions */}
      <section style={{ padding: '30px 24px 60px' }}>
        <div className="container">
          {SERVICES.map((service) => (
            <RevealDiv key={service.id} style={{ marginBottom: 24 }}>
              <div id={`svc-${service.id}`} className="card" style={{ overflow: 'hidden' }}>
                {/* Header Bar */}
                <div
                  onClick={() => toggle(service.id)}
                  style={{
                    padding: '22px 24px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: expanded === service.id ? `${service.color}08` : 'white',
                    borderBottom: expanded === service.id ? `2px solid ${service.color}20` : 'none',
                    flexWrap: 'wrap', gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 16, background: `${service.color}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0,
                    }}>
                      {service.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark)' }}>{service.title}</h2>
                        <span className="tag" style={{ background: `${service.color}15`, color: service.color }}>
                          {service.tag}
                        </span>
                      </div>
                      <div className="hindi" style={{ fontSize: 13, color: service.color }}>{service.titleHindi}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-light)' }}>Starting from</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: service.color }}>{service.price}</div>
                    </div>
                    <span style={{
                      fontSize: 22, color: service.color,
                      transform: expanded === service.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                    }}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Expanded Detail */}
                {expanded === service.id && (
                  <div style={{ padding: '24px', animation: 'fadeInUp 0.4s ease' }}>
                    <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 20, maxWidth: 800 }}>
                      {service.longDesc}
                    </p>

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                      {service.features.map((f, i) => (
                        <span key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          background: `${service.color}08`, padding: '8px 16px',
                          borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 500, color: service.color,
                        }}>
                          <span style={{ color: 'var(--green)' }}>✓</span> {f}
                        </span>
                      ))}
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16 }}>
                      📋 Service List & Pricing:
                    </h3>
                    <div className="grid grid--2" style={{ marginBottom: 20 }}>
                      {service.subServices.map((sub, i) => (
                        <div key={i} style={{
                          background: 'var(--warm-cream)', borderRadius: 16, padding: 18,
                          border: '1px solid var(--border)',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dark)' }}>{sub.name}</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: service.color, whiteSpace: 'nowrap', marginLeft: 10 }}>
                              {sub.price}
                            </div>
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.5 }}>{sub.desc}</p>
                        </div>
                      ))}
                    </div>

                    <button className="btn btn--primary" onClick={() => onBooking(service.id)}>
                      Book {service.title} →
                    </button>
                  </div>
                )}
              </div>
            </RevealDiv>
          ))}

          {/* Building Materials */}
          <RevealDiv style={{ marginBottom: 24 }}>
            <div id="svc-materials" className="card" style={{ overflow: 'hidden' }}>
              <div
                onClick={() => toggle('materials')}
                style={{
                  padding: '22px 24px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: expanded === 'materials' ? '#8B5E3C08' : 'white',
                  flexWrap: 'wrap', gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, background: '#8B5E3C12',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                  }}>
                    🧱
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark)' }}>Building Material Supply</h2>
                      <span className="tag" style={{ background: '#D4732A15', color: 'var(--contractor)' }}>PARTNER NETWORK</span>
                    </div>
                    <div className="hindi" style={{ fontSize: 13, color: '#8B5E3C' }}>निर्माण सामग्री — बहादुरगढ़ डिलीवरी</div>
                  </div>
                </div>
                <span style={{
                  fontSize: 22, color: '#8B5E3C',
                  transform: expanded === 'materials' ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}>
                  ▾
                </span>
              </div>

              {expanded === 'materials' && (
                <div style={{ padding: '24px', animation: 'fadeInUp 0.4s ease' }}>
                  <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 20, maxWidth: 800 }}>
                    Bahadurgarh mein ghar bana rahe hain? Ab cement, bricks, steel, sand, tiles, paint — sab kuch ek jagah se mangwayein.
                    Humara partner network Bahadurgarh ke top building material suppliers se connected hai — Somany Ceramics,
                    Surya Roshni jaise local brands bhi available hain. Best prices, doorstep delivery.
                  </p>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    {['🚛 Doorstep Delivery', '💰 Wholesale Prices', '✅ Branded Materials Only', '📞 Free Consultation', '🔄 Easy Returns'].map((f, i) => (
                      <span key={i} style={{
                        background: '#8B5E3C08', padding: '8px 16px', borderRadius: 'var(--radius-full)',
                        fontSize: 13, fontWeight: 500, color: '#8B5E3C',
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid--3">
                    {BUILDING_MATERIALS.map((m, i) => (
                      <div key={i} style={{
                        background: 'var(--warm-cream)', borderRadius: 16, padding: 18, border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          <span style={{ fontSize: 24 }}>{m.icon}</span>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dark)' }}>{m.category}</div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {m.items.map((item, j) => (
                            <span key={j} style={{
                              fontSize: 11, background: `${m.color}10`, color: m.color,
                              padding: '3px 10px', borderRadius: 20, fontWeight: 500,
                            }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <button className="btn btn--primary" onClick={() => onBooking('materials')}>
                      Get Material Quote →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}
