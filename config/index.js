// 开发环境配置

module.exports = {
  dev: {
    // host: '0.0.0.0',
    // port: '10001',
    // publicPath: '/',
    // contentBase: 'public/js'

    // 接口转发, 文档: https://github.com/chimurai/http-proxy-middleware#options
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'^/api': ''},
    //   },
    // },
  },
  prod: {
    publicPath: '/',

  },
}
