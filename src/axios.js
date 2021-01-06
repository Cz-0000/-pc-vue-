import axios from 'axios'
axios.defaults.baseURL = 'http://api.duyiedu.com';
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    appkey: '13597745233_1585825709118'
  }
  return config;
}, function (erro) {
  return Promise.reject(erro => {
    console.log(erro);
  })
})

export default axios;