// 生产环境
// const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

const { resolve, getHtmlPluginList } = require('./util')

console.log('NODE_ENV', process.env.NODE_ENV)

module.exports = merge(wpBaseConfig, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    publicPath: config.prod.publicPath,
  },
  plugins: [
    ...getHtmlPluginList(resolve('views')),
    new ExtractTextPlugin('css/[name]-[contenthash:6].css'),
  ],
})
