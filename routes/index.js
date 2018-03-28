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

// 数据接口
router.get('/api/getList', (req, res) => {
  res.json([
    { label: 'a', value: 1 },
    { label: 'b', value: 2 },
    { label: 'c', value: 3 },
    { label: 'd', value: 4 },
  ])
})

module.exports = router
