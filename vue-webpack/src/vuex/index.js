import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

// eslint-disable-next-line no-undef
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ?
		[
			createPersistedState({
				key: 'vuex',
				storage: window.sessionStorage
			}),
			createLogger()
		] :
		[createPersistedState({
			key: 'vuex',
			storage: window.sessionStorage
		})]
});
