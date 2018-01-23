import * as type from './mutation-types'

export const homeAction = function ({commit, state}, item) {

  commit(type.SET_HOME, item);
}
