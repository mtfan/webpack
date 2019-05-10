import Vue from 'vue';
import fastclick from 'fastclick';
import Mint from 'mint-ui';
import Toast from './plugins';
import App from './App.vue';
import router from './router';
import store from './vuex';
import 'mint-ui/lib/style.css';

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV != 'production') {
	const Vconsole = require('vconsole');
	new Vconsole();
}

Vue.use(Mint);
Vue.use(Toast);
Vue.config.productionTip = false;

fastclick.attach(document.body);

import 'static/sass/common/_base';

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App,
	},
});
