import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ service, compact = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/services', { state: { expandId: service.id } });
  };

  if (compact) {
    return (
      <div onClick={handleClick} style={{
        background: `${service.color}10`, borderRadius: 12, padding: '10px 8px',
        textAlign: 'center', cursor: 'pointer', border: `1.5px solid ${service.color}20`,
        transition: 'all 0.3s',
      }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>{service.icon}</div>
        <div style={{ fontSize: 9, fontWeight: 600, color: service.color, lineHeight: 1.3 }}>
          {service.title.split(' & ')[0]}
        </div>
      </div>
    );
  }

  return (
    <div
      className="card card--hover"
      onClick={handleClick}
      style={{ padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: `${service.color}15`, color: service.color,
        fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)',
        textTransform: 'uppercase',
      }}>
        {service.tag}
      </div>
      <div style={{
        fontSize: 36, marginBottom: 12, width: 60, height: 60, borderRadius: 16,
        background: `${service.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {service.icon}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 4 }}>
        {service.title}
      </h3>
      <div className="hindi" style={{ fontSize: 11, color: service.color, marginBottom: 8 }}>
        {service.titleHindi}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 14 }}>
        {service.shortDesc}
      </p>
      <div style={{
        borderTop: '1px solid var(--border)', paddingTop: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ fontSize: 10, color: 'var(--text-light)' }}>from </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: service.color }}>{service.price}</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: service.color }}>Details →</span>
      </div>
    </div>
  );
}
