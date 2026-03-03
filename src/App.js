import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';

// Pages
import HomePage from './components/home/HomePage';
import ServicesPage from './components/services/ServicesPage';
import BusinessPage from './components/business/BusinessPage';
import AreasPage from './components/areas/AreasPage';
import AboutPage from './components/about/AboutPage';

// Common
import BookingModal from './components/common/BookingModal';

// Styles
import './styles/global.css';

/**
 * ScrollToTop — resets scroll on route change.
 * This behavior maps to React Navigation's screenOptions in React Native.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

/**
 * AppContent — inner component that has access to Router context.
 * Separated so useLocation() works inside Router provider.
 */
function AppContent() {
  const [bookingType, setBookingType] = useState(null);

  const openBooking = (type) => setBookingType(type);
  const closeBooking = () => setBookingType(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Navbar onBooking={openBooking} />

      <main style={{ paddingTop: 'var(--nav-height)', flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage onBooking={openBooking} />} />
          <Route path="/services" element={<ServicesPage onBooking={openBooking} />} />
          <Route path="/business" element={<BusinessPage onBooking={openBooking} />} />
          <Route path="/areas" element={<AreasPage onBooking={openBooking} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />

      {bookingType && (
        <BookingModal type={bookingType} onClose={closeBooking} />
      )}
    </div>
  );
}

/**
 * App — Root component.
 * 
 * MOBILE CONVERSION NOTES:
 * ─────────────────────────
 * To convert this to React Native (Expo):
 * 1. Replace BrowserRouter → NavigationContainer
 * 2. Replace Routes/Route → Stack.Navigator/Stack.Screen
 * 3. Replace <div> → <View>, <p>/<span> → <Text>
 * 4. Replace CSS → StyleSheet.create() 
 * 5. Replace global.css vars → theme.js constants
 * 6. BookingModal → React Native Modal
 * 7. useScrollReveal → react-native-reanimated entering animations
 * 8. Ticker → react-native-reanimated marquee
 *
 * The component architecture (data layer, hooks, page structure)
 * stays exactly the same.
 */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
