import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming there's a CSS file for global styles. If not, this line should be removed or replaced.
import App from './App'; // Assuming the main App component is in './App'. If not, adjust the import path accordingly.

// Register the service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registered: ', registration);
    }).catch(registrationError => {
      console.error('Service Worker registration failed: ', registrationError);
    });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);