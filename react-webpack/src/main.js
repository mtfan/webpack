import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import fastclick from 'fastclick';

import storeConfig from './redux/store';
const { persistor, store } = storeConfig();
import { PersistGate } from 'redux-persist/integration/react';

import Router from './router';
import 'static/sass/common/_base';

import Vconsole from 'vconsole'
const vConsole = new Vconsole();
fastclick.attach(document.body);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
