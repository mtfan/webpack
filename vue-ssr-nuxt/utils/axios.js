import axios from '~/plugins/axios';
import { Indicator, Toast } from 'mint-ui';
import { GlobalParameters } from '~/utils/config';

export default (function(config) {
  let locat = 'http://localhost:3000';
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
      // Indicator.open('加载中...');
      return config;
    },
    function(err) {
      // Indicator.close();
      // Toast({
      //   message: '服务器异常!!!',
      //   duration: 3000
      // });
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    function(res) {
      // Indicator.close();
      if (!res.data.succeed) {
        // Toast.info(res.errorMessage, 3);
      }
      return res.data;
    },
    function(err) {
      // Indicator.close();
      // Toast({
      //   message: '服务器异常!!!',
      //   duration: 3000
      // });
      return Promise.reject(err);
    }
  );
  return instance;
});
