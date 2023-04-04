import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ModalProvider } from './components/modals/provider/ModalProvider';

import App from './App';
import { ModalFactory } from './components/modals/factory/ModalFacotry';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
        <ModalFactory />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
