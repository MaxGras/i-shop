import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/index.css"
import App from './App';
import { Provider } from 'react-redux'
import store from './features/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App  class="box-border  "/>
    </Provider>
  </React.StrictMode>
);


