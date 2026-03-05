import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (window.firebase && window.firebase.auth) {
  window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible'
  });
}
