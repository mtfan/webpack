import * as actionTypes from '../actionType';
import { userServer } from '../../api/UserServer';
export function userAction(data) {
  return {
    type: actionTypes.USER,
    data
  };
}

export function userInfo(data) {
  return {
    type: actionTypes.USER_INFO,
    data
  };
}

export const getUserInfo = () => {
  return dispatch => {
    userServer.getUserInfo().then(res => {
      if (res.succeed) {
        dispatch(userInfo(res.data));
      }
    });
  };
};
