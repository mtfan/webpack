import Vue from 'vue'
import fastclick from 'fastclick'
import Mint from 'mint-ui';

import App from './App'
import router from './router'
import store from './vuex'
import 'mint-ui/lib/style.css'
import 'util/axios';

// 全局注册mint
Vue.use(Mint);
Vue.config.productionTip = false


// 解决移动端点击延迟
fastclick.attach(document.body)

// 导入css
import 'static/css/reset'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})