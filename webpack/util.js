// 工具

const path = require('path')

module.exports = {
  // 从根目录开始定位
  resolve (dir) {
    return path.join(__dirname, '../', dir)
  },
}
