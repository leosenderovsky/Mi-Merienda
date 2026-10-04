import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { brandConfig } from './brand.config';
import './index.css';

const rootStyle = document.documentElement.style;
Object.entries(brandConfig.theme).forEach(([name, value]) => {
  rootStyle.setProperty(`--brand-${name}`, value);
});
rootStyle.setProperty('--font-brand-display', brandConfig.typography.displayFont);
rootStyle.setProperty('--font-brand-body', brandConfig.typography.bodyFont);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
