// 开发环境配置

module.exports = {
  dev: {
    // host: '0.0.0.0',
    port: '9900',
    publicPath: '/', // 服务器相对路径

    // 接口转发, 文档: https://github.com/chimurai/http-proxy-middleware#options
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true, //跨域
    //     pathRewrite: {'^/api': ''},
    //   },
    // },

    // 移动端开启vconsole
    phoneConsole: false,
  },
  prod: {
    publicPath: '/',
  },
}
