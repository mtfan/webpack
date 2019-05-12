import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import fastclick from 'fastclick'

import storeConfig from './redux/store'
const { persistor, store } = storeConfig()
import { PersistGate } from 'redux-persist/integration/react'

import Router from './router'
import 'static/sass/common/_base'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV != 'production') {
  const Vconsole = require('vconsole')
  new Vconsole()
}

fastclick.attach(document.body)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
