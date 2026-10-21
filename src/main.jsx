import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { readConsent, injectFonts } from './consent.js';
import './source.css';
import './styles.css';

// Las tipografías solo se descargan si la persona las aceptó en el aviso de cookies.
if (readConsent() === 'granted') injectFonts();

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
