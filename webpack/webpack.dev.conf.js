// 开发环境
const webpack = require('webpack')
const merge = require('webpack-merge')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

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
    new webpack.HotModuleReplacementPlugin(),
    // 是否需要 vconsole
  ],
})
