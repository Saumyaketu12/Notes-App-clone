// src/Main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import ToastProvider from './components/UI/ToastProvider';
import './styles/index.css';
import 'highlight.js/styles/github.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);