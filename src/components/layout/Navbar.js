import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollReveal';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../common/LoginModal';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'For Business', path: '/business' },
  { label: 'Areas', path: '/areas' },
  { label: 'About', path: '/about' },
];

export default function Navbar({ onBooking }) {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontSize: 14,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? 'var(--saffron)' : 'var(--text-mid)',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid var(--saffron)' : '2px solid transparent',
    paddingBottom: 4,
    transition: 'all 0.3s',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '12px 24px',
        background: 'rgba(255, 251, 245, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(232,114,42,0.1)',
        boxShadow: scrollY > 50 ? '0 4px 30px rgba(61,31,0,0.08)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--saffron), var(--turmeric))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 800, color: 'white',
              boxShadow: '0 4px 15px rgba(232,114,42,0.3)',
            }}>
              से
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--deep-brown)', lineHeight: 1.1 }}>
                SevaGhar
              </div>
              <div className="hindi" style={{ fontSize: 10, color: 'var(--text-light)' }}>
                सेवाघर — बहादुरगढ़
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} style={navLinkStyle} end={item.path === '/'}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {isAuthenticated ? (
              <button 
                className="btn btn--outline btn--small hide-mobile"
                onClick={() => navigate('/bookings')}
              >
                📋 My Bookings
              </button>
            ) : (
              <button 
                className="btn btn--outline btn--small hide-mobile"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            )}
            <button
              className="btn btn--primary btn--small"
              onClick={() => onBooking('general')}
            >
              Book Now
            </button>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                display: 'none', background: 'none', border: 'none',
                fontSize: 24, cursor: 'pointer', color: 'var(--deep-brown)', padding: 4,
              }}
              className="show-mobile-btn"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(255,251,245,0.98)',
          zIndex: 150, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 28,
          animation: 'fadeIn 0.3s ease',
        }}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'none', border: 'none', fontSize: 28, cursor: 'pointer',
            }}
          >
            ✕
          </button>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                fontSize: 22, fontWeight: 700, textDecoration: 'none',
                color: isActive ? 'var(--saffron)' : 'var(--deep-brown)',
              })}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            className="btn btn--primary"
            onClick={() => { setMobileOpen(false); onBooking('general'); }}
          >
            📱 Book Now
          </button>
        </div>
      )}

      {/* Mobile hamburger visibility style */}
      <style>{`
        .show-mobile-btn { display: none !important; }
        @media (max-width: 768px) {
          .show-mobile-btn { display: flex !important; }
        }
      `}</style>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
