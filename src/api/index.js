// api层，写数据接口供ui层调用，请求工具用axios

import request from '../util/request'

// api根路径
const root = '/api'

const urlGetList = root + '/getList'

export default {
  getList (id) {
    const params = { id }
    return request.get(urlGetList, params)
  },
}
