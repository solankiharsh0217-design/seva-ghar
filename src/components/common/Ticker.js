import React from 'react';
import { TICKER_ITEMS } from '../../data/services';

export default function Ticker() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--deep-brown), var(--text-mid))',
      padding: '12px 0', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', animation: 'marquee 35s linear infinite', whiteSpace: 'nowrap' }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 40, paddingRight: 40 }}>
            {TICKER_ITEMS.map((item, j) => (
              <span key={j} style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
