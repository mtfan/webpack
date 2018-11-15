import * as actionTypes from '../actionType';

export default function user(state = { username: '张某' }, action) {
  switch (action.type) {
    case actionTypes.USER:
      return action.data;
    case actionTypes.USER_INFO:
      return action.data;
    default:
      return state;
  }
}
