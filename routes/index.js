const express = require('express')
const glob = require('glob')
const router = express.Router()

// 遍历当前文件夹下所有非index路由，自动引入
const files = glob.sync('./!(index).js', {cwd: __dirname})
console.log('find route files:', files)
files.forEach(file => {
  require(file)(router)
})

// 页面路由
router.get('/', (req, res) => {
  res.render('home')
})

router.get('/home', (req, res) => {
  res.render('home')
})

router.get('/img-page', (req, res) => {
  res.render('img-page')
})

module.exports = router
