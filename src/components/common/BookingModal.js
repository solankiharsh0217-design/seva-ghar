import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { SERVICES, BAHADURGARH_AREAS } from '../../data/services';

const API_BASE = "https://us-central1-sevaghar.cloudfunctions.net/api";

export default function BookingModal({ type = 'general', onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: type !== 'general' && type !== 'corporate' && type !== 'materials' ? type : '',
    customerType: 'home',
    area: '',
    address: '',
    notes: '',
  });

  const isCorporate = type === 'corporate';
  const isMaterials = type === 'materials';

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.phone || !formData.area) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name || '',
        phone: formData.phone,
        service: formData.service || 'general',
        subService: '',
        customerType: formData.customerType,
        area: formData.area,
        address: formData.address || '',
        scheduledDate: new Date().toISOString(),
        scheduledTime: '10:00 AM',
        notes: formData.notes || '',
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'bookings'), payload);

      alert('Booking submitted! Hum aapko jaldi call karenge. 📞');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking create nahi ho paya. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: 24, backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 'var(--radius-xl)', padding: 28,
          maxWidth: 460, width: '100%', maxHeight: '90vh', overflow: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark)' }}>
            {isCorporate ? '🏢 Corporate Enquiry' : isMaterials ? '🧱 Material Quote' : '🛠️ Book a Service'}
          </h3>
          <button onClick={onClose} style={{
            background: 'var(--border)', border: 'none', borderRadius: 'var(--radius-sm)',
            width: 34, height: 34, fontSize: 18, cursor: 'pointer', color: 'var(--text-mid)',
          }}>
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="label">{isCorporate ? 'Company Name' : 'Full Name'}</label>
            <input
              className="input"
              placeholder={isCorporate ? 'Company name' : 'Apna naam'}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {!isCorporate && (
            <div>
              <label className="label">Service Type</label>
              <select
                className="select"
                value={formData.service}
                onChange={(e) => handleChange('service', e.target.value)}
              >
                <option value="">Select service...</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.icon} {s.title}</option>
                ))}
                <option value="materials">🧱 Building Material</option>
              </select>
            </div>
          )}

          {!isCorporate && (
            <div>
              <label className="label">Customer Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['home', 'office'].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleChange('customerType', t)}
                    style={{
                      flex: 1, padding: 10, borderRadius: 12,
                      border: `2px solid ${formData.customerType === t ? 'var(--saffron)' : 'var(--border)'}`,
                      background: formData.customerType === t ? 'var(--saffron-light)' : 'var(--warm-cream)',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      color: formData.customerType === t ? 'var(--saffron)' : 'var(--deep-brown)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {t === 'home' ? '🏠 Home' : '🏢 Office'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="label">Area (Bahadurgarh)</label>
            <select
              className="select"
              value={formData.area}
              onChange={(e) => handleChange('area', e.target.value)}
            >
              <option value="">Area select karein...</option>
              {BAHADURGARH_AREAS.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Full Address</label>
            <input
              className="input"
              placeholder="House No., Street, Landmark"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input
              className="input"
              placeholder="+91 98765 43210"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          {isMaterials && (
            <div>
              <label className="label">Kya chahiye? (Brief description)</label>
              <textarea
                className="input"
                placeholder="e.g. 50 bags cement, 1000 bricks, TMT bars..."
                rows={3}
                style={{ resize: 'vertical' }}
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>
          )}

          <button 
            className="btn btn--primary btn--full" 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ marginTop: 6, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Submitting...' : isCorporate ? 'Submit Enquiry →' : isMaterials ? 'Get Quote →' : 'Confirm Booking →'}
          </button>

          <p style={{ fontSize: 10, color: 'var(--text-light)', textAlign: 'center' }}>
            ✅ No advance payment · Free cancellation · Verified professionals
          </p>
        </div>
      </div>
    </div>
  );
}
