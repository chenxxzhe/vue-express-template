// 开发环境
console.log('Development')

const webpack = require('webpack')
const merge = require('webpack-merge')
const VConsole = require('vconsole-webpack-plugin')

const wpBaseConfig = require('./webpack.base.conf')
const { getHtmlPluginList } = require('./util')
const config = require('../config')

module.exports = merge(wpBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    // dist / prerender
    ...getHtmlPluginList(),

    new webpack.HotModuleReplacementPlugin(),
    // 是否需要 vconsole
    new VConsole({
      enable: !!config.dev.phoneConsole,
    }),
  ],
  devServer: {
    port: config.dev.port || 8080,
    host: config.dev.host || '0.0.0.0', // 只有0.0.0.0才能通过局域网访问
    hot: true,
    inline: true,
    publicPath: config.dev.publicPath || '/',
    historyApiFallback: true,
    open: !!config.dev.open,
    openPage: config.dev.openPage || 'index.html',
    noInfo: true,
    // contentBase: '',
    proxy: config.dev.proxy ||
    {
      '/': {
        target: 'http://localhost:' + config.prod.port || 3050,
        bypass(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('注意：多层级 url 会导致不能获取到对应的html文件', req.path)
            return req.path + '.html'
          }
        },
      },
    },
  },
})
