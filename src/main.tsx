import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/services/store';
import App from './components/App';

import './assets/styles/variables.scss';
import './assets/styles/global.scss';
import './assets/styles/typography.scss';

const root = document.getElementById('root')!;
createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
