import React from 'react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20SevaGhar%2C%20I%20need%20a%20service"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 24, right: 24,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, color: 'white', textDecoration: 'none',
        boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
        zIndex: 90, animation: 'pulse 2s infinite',
        transition: 'transform 0.3s',
      }}
    >
      💬
    </a>
  );
}
