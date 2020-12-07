import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import './Utils/i18n';
import Store from './Redux/store'
import { Provider } from 'react-redux';
import Welcome from './Components/Welcome';

ReactDOM.render(
  <Provider store={Store}>
    <App />
    <Welcome/>
  </Provider>,
  document.getElementById('root')
);
