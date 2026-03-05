import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginModal({ onClose }) {
  const { sendOTP, verifyOTP, user, logout } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setError('Valid phone number required');
      return;
    }
    setLoading(true);
    setError('');
    
    const formatted = phone.startsWith('+') ? phone : '+91' + phone;
    const result = await sendOTP(formatted);
    
    if (result.success) {
      setOtpSent(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      setError('Enter 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    
    const result = await verifyOTP(otp);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div onClick={onClose} style={overlayStyle}>
        <div onClick={e => e.stopPropagation()} style={modalStyle}>
          <button onClick={onClose} style={closeBtnStyle}>×</button>
          
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={avatarStyle}>👤</div>
            <h3 style={{ margin: '12px 0 4px' }}>Welcome!</h3>
            <p style={{ color: 'var(--text-light)', margin: 0 }}>
              {user.phoneNumber}
            </p>
          </div>
          
          <button 
            onClick={() => { logout(); onClose(); }}
            className="btn btn--outline btn--full"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={e => e.stopPropagation()} style={modalStyle}>
        <button onClick={onClose} style={closeBtnStyle}>×</button>
        
        <h3 style={{ marginBottom: 20 }}>
          {otpSent ? 'Enter OTP' : 'Login with Phone'}
        </h3>
        
        {error && (
          <div style={{ 
            background: '#fee', color: '#c00', padding: '10px 14px', 
            borderRadius: 8, marginBottom: 16, fontSize: 13 
          }}>
            {error}
          </div>
        )}
        
        {!otpSent ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="label">Phone Number</label>
              <input
                className="input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </div>
            <button 
              className="btn btn--primary btn--full"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="label">OTP sent to {phone}</label>
              <input
                className="input"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="tel"
                maxLength={6}
              />
            </div>
            <button 
              className="btn btn--primary btn--full"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              onClick={() => { setOtpSent(false); setOtp(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--saffron)', cursor: 'pointer' }}
            >
              ← Change number
            </button>
          </div>
        )}
        
        <p style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center', marginTop: 16 }}>
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 200, padding: 24, backdropFilter: 'blur(4px)',
};

const modalStyle = {
  background: 'white', borderRadius: 'var(--radius-xl)', padding: 28,
  maxWidth: 380, width: '100%', position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute', top: 12, right: 12,
  background: 'var(--border)', border: 'none', borderRadius: 'var(--radius-sm)',
  width: 34, height: 34, fontSize: 18, cursor: 'pointer', color: 'var(--text-mid)',
};

const avatarStyle = {
  width: 60, height: 60, borderRadius: '50%',
  background: 'var(--saffron-light)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', fontSize: 28,
  margin: '0 auto',
};
