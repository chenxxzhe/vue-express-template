// 封装请求函数

import axios from 'axios'

axios.interceptors.request.use(function (config) {
  console.log('get')
  if (process.env.NODE_ENV === 'development') {
    console.group('request', config.url)
    // console.log('url', config.url)
    console.log('params:', config.params)
    console.log('formData:', config.data)
    console.groupEnd()
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  if (process.env.NODE_ENV === 'development') {
    console.group('response', res.config.url)
    // console.log('url', config.url)
    console.log(res.data)
    console.groupEnd()
  }
  return res
})

const TIMEOUT = 8000

const api = {
  get (url, params, setting) {
    return axios({
      url,
      method: 'get',
      params,
      timeout: TIMEOUT,
      ...setting,
    })
  },

  post (url, data, params, setting) {
    return axios({
      url,
      method: 'post',
      params,
      data,
      timeout: TIMEOUT,
      ...setting,
    })
  },
}

export default api
