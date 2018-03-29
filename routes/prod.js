// 子路由返回一个函数供index调用

module.exports = function genRoute (router) {
  const root = '/prod'
  router.get(root + '/list', (req, res) => {
    res.json([
      { name: 'gold', value: 1888 },
      { name: 'silver', age: 222 },
    ])
  })

  router.post(root + '/sell', (req, res) => {
    console.log('sell:', req.body)
    res.sendStatus(200)
  })
}
