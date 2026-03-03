import React from 'react';
import { BAHADURGARH_AREAS } from '../../data/services';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function RevealDiv({ children, style }) {
  const { ref, style: anim } = useScrollReveal();
  return <div ref={ref} style={{ ...style, ...anim }}>{children}</div>;
}

export default function AreasPage({ onBooking }) {
  const areaTypes = ['Residential', 'Colony', 'Industrial'];
  const typeIcons = { Residential: '🏘️', Colony: '🏡', Industrial: '🏭' };

  return (
    <>
      <section style={{ padding: '50px 24px', background: 'linear-gradient(180deg,var(--saffron-light),var(--warm-cream))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: 'var(--text-dark)', marginBottom: 8 }}>
            📍 Service Areas — <span className="hindi" style={{ color: 'var(--saffron)' }}>बहादुरगढ़</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-mid)', maxWidth: 600, margin: '0 auto' }}>
            Hum Bahadurgarh ke har area mein available hain — Sectors, Colonies, Industrial Areas sab covered
          </p>
        </div>
      </section>

      <RevealDiv style={{ padding: '40px 24px 60px' }}>
        <div className="container">
          {areaTypes.map((type) => (
            <div key={type} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{typeIcons[type]}</span>
                {type} Areas
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-light)', marginLeft: 8 }}>
                  ({BAHADURGARH_AREAS.filter((a) => a.type === type).length} areas)
                </span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {BAHADURGARH_AREAS.filter((a) => a.type === type).map((area) => (
                  <div key={area.name} className="chip" onClick={() => onBooking('general')}>
                    📍 {area.name}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* City Info */}
          <div className="card" style={{ padding: 28, marginTop: 20 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 14 }}>
              🏙️ Bahadurgarh Ke Baare Mein — <span className="hindi">बहादुरगढ़ के बारे में</span>
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 16 }}>
              Bahadurgarh, jo ki "Haryana ka Gateway" ke naam se jaana jaata hai, Jhajjar district mein hai aur
              Delhi border se sirf 2 km ki doori par hai. Ye city 2018 se Delhi Metro Green Line se connected hai.
              Yahan 2800+ medium industries aur 200+ large-scale industries hain — Hindustan National Glass,
              Somany Ceramics, Surya Roshni, Parle Biscuits jaise bade naam yahan hain.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 16 }}>
              HUDA ne Sector 2, 6, 7, 9/9A aur 13 residential areas develop kiye hain. Omaxe, KLJ Heights jaise builders
              ne townships banayi hain. Naye construction aur renovation ki demand bahut tezi se badh rahi hai — isliye
              SevaGhar yahan apni services de raha hai.
            </p>
            <div className="grid grid--4">
              {[
                { icon: '🏭', label: '2,800+', desc: 'Industries' },
                { icon: '🚇', label: 'Metro', desc: 'Green Line Connected' },
                { icon: '🏘️', label: '5 HUDA', desc: 'Residential Sectors' },
                { icon: '👥', label: '4 Lakh+', desc: 'Population' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--saffron-light)', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--saffron)' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-mid)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 12 }}>Apka area list mein nahi hai?</p>
            <button className="btn btn--primary" onClick={() => onBooking('general')}>Request Your Area →</button>
          </div>
        </div>
      </RevealDiv>
    </>
  );
}
