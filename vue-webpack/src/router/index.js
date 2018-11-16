import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
  routes: [
    {
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
});

router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (true) {
      next({ path: '/login' });
      return;
    }
  }
  next();
});
export default router;
