import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = {
  pending: { bg: '#fff3e0', color: '#e65100', text: 'Pending' },
  confirmed: { bg: '#e3f2fd', color: '#1565c0', text: 'Confirmed' },
  'in-progress': { bg: '#e8f5e9', color: '#2e7d32', text: 'In Progress' },
  completed: { bg: '#e8f5e9', color: '#1b5e20', text: 'Completed' },
  cancelled: { bg: '#ffebee', color: '#c62828', text: 'Cancelled' },
};

export default function MyBookingsPage() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchBookings = async () => {
    try {
      const q = query(
        collection(db, 'bookings'),
        where('phone', '==', user.phoneNumber),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    setCancelling(id);
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Could not cancel booking');
    }
    setCancelling(null);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 40,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔐</div>
        <h2 style={{ marginBottom: 12 }}>Login to View Bookings</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: 300 }}>
          Please login with your phone number to see your booking history.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: 100, textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>⏳</div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 20px 60px' }}>
      <h1 style={{ marginBottom: 8 }}>My Bookings</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: 32 }}>
        {user?.phoneNumber}
      </p>

      {bookings.length === 0 ? (
        <div style={{ 
          padding: 60, textAlign: 'center', background: 'var(--warm-cream)',
          borderRadius: 'var(--radius-xl)'
        }}>
          <div style={{ fontSize: 50, marginBottom: 16 }}>📋</div>
          <h3>No bookings yet</h3>
          <p style={{ color: 'var(--text-light)' }}>
            Your service bookings will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bookings.map((booking) => {
            const status = STATUS_COLORS[booking.status] || STATUS_COLORS.pending;
            return (
              <div key={booking.id} style={{
                background: 'white', borderRadius: 'var(--radius-lg)',
                padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid var(--border)'
              }}>
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <div>
                    <span style={{
                      background: status.bg, color: status.color,
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600
                    }}>
                      {status.text}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
                    {booking.id.slice(0, 8).toUpperCase()}
                  </div>
                </div>

                <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>
                  {booking.service === 'housekeeping' && '🧹 Housekeeping'}
                  {booking.service === 'electrician' && '⚡ Electrician'}
                  {booking.service === 'ac' && '❄️ AC Repair'}
                  {booking.service === 'pest' && '🛡️ Pest Control'}
                  {booking.service === 'contractor' && '🏗️ Contractor'}
                  {booking.service === 'materials' && '🧱 Building Materials'}
                  {(booking.service === 'general' || !booking.service) && '🛠️ General Service'}
                </h3>

                <div style={{ fontSize: 14, color: 'var(--text-mid)', marginBottom: 8 }}>
                  📍 {booking.area} {booking.address && `- ${booking.address}`}
                </div>

                {booking.notes && (
                  <div style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 12 }}>
                    Note: {booking.notes}
                  </div>
                )}

                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    disabled={cancelling === booking.id}
                    style={{
                      background: 'none', border: '1px solid var(--border)',
                      padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                      fontSize: 13, color: '#c62828'
                    }}
                  >
                    {cancelling === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
