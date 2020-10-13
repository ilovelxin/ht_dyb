"use strict";

import Vue from 'vue';
import axios from "axios";

// 公共请求路径
// axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`;
// // 公共请求头携带token
// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
// post方法请求是携带的请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = sessionStorage.getItem('token')
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    if (response.data.meta.status == 200) {

    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios

// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// Vue.use(Plugin)

// export default Plugin;
