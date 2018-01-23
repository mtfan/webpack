import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: resolve => require(['containers/home'], resolve)
    },
    {
      path: '/product',
      component: resolve => require(['containers/product'], resolve)
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})