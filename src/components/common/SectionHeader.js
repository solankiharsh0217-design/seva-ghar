import React from 'react';

export default function SectionHeader({ badge, badgeIcon, title, highlight, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      {badge && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--saffron-light)', borderRadius: 'var(--radius-full)',
          padding: '6px 18px', marginBottom: 14,
        }}>
          {badgeIcon && <span style={{ fontSize: 13 }}>{badgeIcon}</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--saffron)' }}>{badge}</span>
        </div>
      )}
      <h2 style={{ fontSize: 34, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 10 }}>
        {title}{' '}
        {highlight && <span style={{ color: 'var(--saffron)' }}>{highlight}</span>}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 15, color: 'var(--text-mid)', maxWidth: 600, margin: '0 auto' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
