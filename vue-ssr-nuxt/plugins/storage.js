import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    storage: window.sessionStorage,
    key: 'ssr'
  })(store);
};
