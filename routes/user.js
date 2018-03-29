module.exports = [
  {
    path: '/api/getList',
    cb (res, req) {
      res.json([
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
        { label: 'c', value: 3 },
        { label: 'd', value: 4 },
      ])
    },
  },

]
