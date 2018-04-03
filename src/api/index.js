// api层，写数据接口供ui层调用，请求工具用axios

import request from '@/tools/request'

// api根路径
const root = '/user'

const urlGetList = root + '/list'

export default {
  getList(id) {
    const params = { id }
    return request.get(urlGetList, params)
  },
}
