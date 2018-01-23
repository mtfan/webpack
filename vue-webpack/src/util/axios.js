import axios from 'axios'
import {Indicator} from 'mint-ui';

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  Indicator.open('加载中...');
  return config;
}, function (err) {
  return Promise.reject(err);
});

//添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  Indicator.close();
  return res.data;
}, function (err) {
  return Promise.reject(err);
})
