import React from 'react';

export default function StarRating({ rating = 5, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? '#F59E0B' : '#D1D5DB', fontSize: size }}>
          ★
        </span>
      ))}
    </div>
  );
}
