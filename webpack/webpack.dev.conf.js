// 开发环境
const webpack = require('webpack')
const Html = require('html-webpack-plugin')
const merge = require('webpack-merge')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

const { resolve } = require('./util')

module.exports = merge(wpBaseConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  plugins: [
    new Html({
      template: resolve('src/index.html'),
      // filename: resolve('views/[name].html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: config.dev.host || '0.0.0.0', // 局域网可通过ip访问本地
    port: config.dev.port || '10001',
    publicPath: config.dev.publicPath,
    // contentBase: '/',
    proxy: config.dev.proxy,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
})
