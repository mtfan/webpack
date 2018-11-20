import axios from 'axios';
import { Toast } from 'antd-mobile';
import { GlobalParameters } from './config';

export default (function(config) {
  let locat = 'http://localhost:8080';
  locat = locat ? locat : location.origin;
  let instanceConfig = Object.assign(
    {
      timeout: 15000,
      baseURL: `${locat}/api`,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    config
  );

  let instance = axios.create(instanceConfig);

  instance.interceptors.request.use(
    function(config) {
      const method = config.method.toUpperCase();
      if (method == 'GET') {
        config.params = Object.assign(GlobalParameters, config.params);
      } else {
        config.data = Object.assign(GlobalParameters, config.data);
      }
      Toast.loading('加载中', 0);
      return config;
    },
    function(err) {
      Toast.hide();
      Toast.offline('服务器异常 !!!', 3);
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    function(res) {
      Toast.hide();
      if (!res.data.succeed) {
        Toast.info(res.errorMessage, 3);
      }
      return res.data;
    },
    function(err) {
      Toast.hide();
      Toast.offline('服务器异常 !!!', 3);
      return Promise.reject(err);
    }
  );
  return instance;
});
