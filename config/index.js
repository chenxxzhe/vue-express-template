// 开发环境配置

module.exports = {
  dev: {
    // host: '0.0.0.0',
    port: '10001',
    publicPath: '/', // 服务器相对路径
    staticPath: 'abc', // 服务器资源路径
    // contentBase: 'public/js' // 本地资源路径

    // 接口转发, 文档: https://github.com/chimurai/http-proxy-middleware#options
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true, //跨域
    //     pathRewrite: {'^/api': ''},
    //   },
    // },
  },
  prod: {
    publicPath: '/',
    staticPath: 'static',
  },
}
