const express = require('express')
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

// 遍历所有子路由
function getRoutes (r) {
  // 遍历所有文件
}

getRoutes(router)

module.exports = router
