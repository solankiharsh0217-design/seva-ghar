import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function RevealDiv({ children, style }) {
  const { ref, style: anim } = useScrollReveal();
  return <div ref={ref} style={{ ...style, ...anim }}>{children}</div>;
}

export default function AboutPage() {
  return (
    <>
      <section style={{ padding: '60px 24px', background: 'linear-gradient(180deg,var(--saffron-light),var(--warm-cream))' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: 'var(--text-dark)', marginBottom: 8 }}>
            Humari Kahani — <span className="hindi" style={{ color: 'var(--saffron)' }}>हमारी कहानी</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text-mid)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            SevaGhar Bahadurgarh ke logon ke liye, Bahadurgarh ke logon dwara banaya gaya ek trusted home services platform hai.
          </p>
        </div>
      </section>

      <RevealDiv style={{ padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Mission */}
          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 14 }}>🎯 Humara Mission</h2>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8 }}>
              Bahadurgarh tezi se badh raha hai — naye ghar ban rahe hain, offices khul rahe hain, industries badh rahi hain.
              Lekin reliable home services milna abhi bhi mushkil hai. Koi electrician time pe nahi aata, koi plumber zyada
              paisa maangta hai, koi painter kaam dhang se nahi karta.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8, marginTop: 12 }}>
              <strong style={{ color: 'var(--saffron)' }}>SevaGhar ka mission hai:</strong> Bahadurgarh ke har ghar aur office ko
              trained, verified, affordable service professionals se connect karna — with transparent pricing aur guaranteed quality.
              Hum sirf service nahi dete, bharosa dete hain.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid--2" style={{ marginBottom: 24 }}>
            {[
              { icon: '🤝', title: 'Bharosa (Trust)', desc: 'Har karigar background-verified hai. Koi bhi aapke ghar mein aaye, wo trusted hai.' },
              { icon: '💰', title: 'Seedhi Baat (Transparency)', desc: 'Jo price bola, wahi final. Koi hidden charge nahi, koi surprise bill nahi.' },
              { icon: '⏰', title: 'Samay Ka Maan (Punctuality)', desc: '30-minute response guarantee. Hum apka time waste nahi karte.' },
              { icon: '🏅', title: 'Quality Ka Vaada (Promise)', desc: '90-day service warranty. Kaam accha nahi laga? Hum dobara karenge, free mein.' },
            ].map((v, i) => (
              <div key={i} className="card card--hover" style={{ padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{v.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Why Bahadurgarh */}
          <div className="card card--dark" style={{ padding: 32, marginBottom: 24, borderRadius: 'var(--radius-xl)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 14 }}>📍 Kyun Bahadurgarh?</h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
              Bahadurgarh NCR ka sabse tezi se grow hone wala city hai. Delhi Metro se connected, 2800+ industries,
              lakhs of families — lekin organized home services ka koi bada platform yahan nahi hai.
              Urban Company aur NoBroker jaisi companies Delhi-Gurgaon-Noida pe focus karti hain, Bahadurgarh ko ignore karti hain.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginTop: 12 }}>
              <strong style={{ color: 'var(--turmeric)' }}>SevaGhar yahan ki local samajh ke saath kaam karta hai.</strong>{' '}
              Humari team Bahadurgarh se hai, yahan ke logon ko jaanti hai, yahan ki zarooratein samajhti hai.
              Isliye hum yahan se shuru kar rahe hain — aur yahan se poore NCR mein jayenge.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10 }}>
              Humse Judein — <span className="hindi" style={{ color: 'var(--saffron)' }}>हमसे जुड़ें</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-mid)', marginBottom: 24 }}>
              Karigar hain? Partner banana chahte hain? Business enquiry hai?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn--primary">🤝 Become a Karigar</button>
              <button className="btn btn--outline">📞 Contact Us</button>
            </div>
          </div>
        </div>
      </RevealDiv>
    </>
  );
}
