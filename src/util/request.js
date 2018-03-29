// 封装请求函数

import axios from 'axios'

axios.interceptors.request.use(function (config) {
  if (process.env.NODE_ENV === 'development') {
    console.group('request')
    console.log('url', config.url)
    console.log('params:', config.params)
    console.log('data:', config.data)
    console.groupEnd()
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios.interceptors.response.use()

const TIMEOUT = 8000

const api = {
  get (url, params, setting) {
    return axios({
      method: 'get',
      params,
      timeout: TIMEOUT,
      ...setting,
    })
  },

  post (url, data, params, setting) {
    return axios({
      method: 'post',
      params,
      data,
      timeout: TIMEOUT,
      ...setting,
    })
  },
}

export default api
