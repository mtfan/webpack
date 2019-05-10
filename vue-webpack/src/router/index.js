import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/home',
			// eslint-disable-next-line no-undef
			component: () => import(/* webpackChunkName:'home'*/ 'views/Home'),
		},
		{
			path: '/found',
			// eslint-disable-next-line no-undef
			component: () => import(/* webpackChunkName:'found'*/ 'views/Found'),
		},
		{
			path: '/mine',
			// eslint-disable-next-line no-undef
			component: () => import(/* webpackChunkName:'mine'*/ 'views/Mine'),
		},
		{
			path: '/',
			redirect: '/home',
		},
	],
});

router.beforeEach((to, from, next) => {
	let f = false;
	if (to.path != '/login') {
		if (f) {
			next({
				path: '/login',
			});
			return;
		}
	}
	next();
});
export default router;
