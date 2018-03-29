const express = require('express')
const glob = require('glob')
const router = express.Router()

// 自动生成的页面路由，生产环境下使用
if (process.env.NODE_EVN === 'production') {
  try {
    const pages = require('./routes_generated.js')
    pages.forEach(page => {
      router.get(page.path, (req, res) => {
        res.render(page.name)
      })
    })
  } catch (e) {
    console.log('No generated page file')
  }
}

// 遍历当前文件夹下所有非index路由，自动引入
const files = glob.sync('./!(index).js', {cwd: __dirname})
console.log('find route files:', files)
files.forEach(file => {
  require(file)(router)
})

module.exports = router
