import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import useTheme from './hooks/useTheme';
import 'highlight.js/styles/github.css';
import { ThemeProvider } from './contexts/ThemeContext';
import ToastProvider from './components/UI/ToastProvider';



// function Root() {
//   useTheme(); // Initialize theme hook to apply theme styles
//   return <App />;
// }
// createRoot(document.getElementById('root')).render(<Root/>);



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);