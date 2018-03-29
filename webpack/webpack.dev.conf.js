// 开发环境
const webpack = require('webpack')
const merge = require('webpack-merge')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

const { getHtmlPluginList } = require('./util')

// hot-reload entries
const entry = {}
Object.keys(wpBaseConfig.entry).forEach(key => {
  entry[key] = ['webpack-hot-middleware/client?reload=true'].concat(wpBaseConfig.entry[key])
})

module.exports = merge(wpBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  entry,
  output: {
    publicPath: config.dev.publicPath,
  },

  plugins: [
    ...getHtmlPluginList(),
    new webpack.HotModuleReplacementPlugin(),
    // 是否需要 vconsole
  ],

  // 开发服务由express实现
  // devServer: {
  //   host: config.dev.host || '0.0.0.0', // 局域网可通过ip访问本地
  //   port: config.dev.port || '10001',
  //   publicPath: config.dev.publicPath,
  //   // contentBase: '/',
  //   proxy: config.dev.proxy,
  //   hot: true,
  //   inline: true,
  //   historyApiFallback: true,
  // },
})
