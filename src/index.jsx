import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store.js';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);
