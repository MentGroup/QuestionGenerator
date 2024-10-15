import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Correct path to your index.css
import App from './App'; // Make sure App.js is in the same folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
