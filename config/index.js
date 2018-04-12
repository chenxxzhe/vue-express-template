// 自定义配置，一般改这个文件的内容就可以

// const path = require('path')

module.exports = {
  // 开发环境
  dev: {
    // host: '0.0.0.0',
    port: 8080,
    publicPath: '/', // 服务器相对路径
    // contentBase: ''
    open: true, // 自动打开浏览器
    openPage: 'home.html', // 自动打开的首页

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
  // 生产环境
  prod: {
    // express 服务器端口
    port: 9901,
    // 生成资源的路径前缀，默认 '/'
    // publicPath: '/',

    // 是否预渲染
    prerender: true,
  },
}
