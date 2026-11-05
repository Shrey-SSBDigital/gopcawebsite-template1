import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CMSProvider } from './context/CMSContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CMSProvider>
        <App />
      </CMSProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

