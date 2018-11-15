import * as type from './mutation-types'

const mutations = {
  [type.USER](state, data) {
    state.user = data;
  },
  [type.USER_INFO](state, data) {
    state.user = data;
  }

}

export default mutations