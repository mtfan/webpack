import * as type from './mutation-types'

const mutations = {
  [type.SET_HOME](state, home) {
    state.home = home;
  }

}

export default mutations
