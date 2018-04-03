// 子路由返回一个函数供index调用

// router 具体用法可查看express文档 http://www.expressjs.com.cn/4x/api.html#router

function genRoutes(router) {
  router.get('/user/list', (req, res) => {
    res.json([
      { name: 'chenzhe', age: 20 },
      { name: 'mae', age: 18 },
    ])
  })
  router.post('/user/create', (req, res) => {
    console.log('create user', req.data)
  })
}

module.exports = genRoutes
