import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AppProviders } from './contexts/AppProviders';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
