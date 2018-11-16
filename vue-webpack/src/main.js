import Vue from 'vue';
import fastclick from 'fastclick';
import Mint from 'mint-ui';

import App from './App.vue';
import router from './router';
import store from './vuex';
import 'mint-ui/lib/style.css';

import Vconsole from 'vconsole'
const vConsole = new Vconsole();

Vue.use(Mint);
Vue.config.productionTip = false;

fastclick.attach(document.body);

import 'static/sass/common/_base';

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});