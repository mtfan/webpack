import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/home',
      component: resolve => require(['views/Home'], resolve)
    },
    {
      path: '/found',
      component: resolve => require(['views/Found'], resolve)
    },
    {
      path: '/mine',
      component: resolve => require(['views/Mine'], resolve)
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})