import axios from '../utils/axios';
const http = axios();

export class UserServer {
  getUserInfo(params) {
    return http.get('/userInfo', {
      params: params
    });
  }

  userInfo(params) {
    return http.post('/userInfo', params);
  }
}

let userServer = new UserServer();
export { userServer };
