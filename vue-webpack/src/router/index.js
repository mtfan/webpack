import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
	routes: [{
		path: '/home',
		// eslint-disable-next-line no-undef
		component: resolve => require(['views/Home'], resolve)
	},
	{
		path: '/found',
		// eslint-disable-next-line no-undef
		component: resolve => require(['views/Found'], resolve)
	},
	{
		path: '/mine',
		// eslint-disable-next-line no-undef
		component: resolve => require(['views/Mine'], resolve)
	},
	{
		path: '/',
		redirect: '/home'
	}
	]
});

router.beforeEach((to, from, next) => {
	let f = false;
	if (to.path != '/login') {
		if (f) {
			next({
				path: '/login'
			});
			return;
		}
	}
	next();
});
export default router;
