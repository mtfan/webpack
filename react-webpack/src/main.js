import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import fastclick from 'fastclick';

import configureStore from './redux/store';
import Router from './router';
import 'util/axios';
import 'static/css/reset';
import './registerSw';

fastclick.attach(document.body);

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);
