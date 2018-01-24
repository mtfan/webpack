import * as actionTypes from '../actionType'

export default function home(state = {'react':'webpack'}, action) {
  switch (action.type) {
    case actionTypes.HOME:
      return action.data
    default:
      return state
  }
}