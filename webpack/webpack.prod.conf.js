// 生产环境
// const webpack = require('webpack')
const merge = require('webpack-merge')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

const { resolve, getHtmlPluginList } = require('./util')

module.exports = merge(wpBaseConfig, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    publicPath: config.prod.publicPath,
  },
  plugins: [
    ...getHtmlPluginList(resolve('views')),
  ],
})
