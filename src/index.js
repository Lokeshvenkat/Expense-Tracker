import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import store from './redux/Store';
import App from './App';
import './index.module.css'; 
import reportWebVitals from './reportWebVitals';

// DO NOT TOUCH THE BELOW 3 LINES
if (window.Cypress) {
  window.store = store;
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// DO NOT TOUCH THE BELOW LINE
reportWebVitals();
