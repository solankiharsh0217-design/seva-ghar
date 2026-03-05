import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  getAuth,
  PhoneAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (window.recaptchaVerifier) {
      setRecaptchaReady(true);
    } else {
      const checkRecaptcha = setInterval(() => {
        if (window.recaptchaVerifier) {
          setRecaptchaReady(true);
          clearInterval(checkRecaptcha);
        }
      }, 500);
      return () => clearInterval(checkRecaptcha);
    }
  }, []);

  const sendOTP = async (phoneNumber) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        return { success: false, error: 'Recaptcha not ready' };
      }
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = result;
      return { success: true };
    } catch (error) {
      console.error('OTP error:', error);
      return { success: false, error: error.message };
    }
  };

  const verifyOTP = async (otp) => {
    try {
      if (!window.confirmationResult) {
        return { success: false, error: 'No OTP sent' };
      }
      await window.confirmationResult.confirm(otp);
      window.confirmationResult = null;
      return { success: true };
    } catch (error) {
      console.error('Verify error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      recaptchaReady,
      sendOTP, 
      verifyOTP, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
