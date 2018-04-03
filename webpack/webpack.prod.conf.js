// 生产环境
// const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')

module.exports = merge(wpBaseConfig, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    publicPath: config.prod.publicPath,
  },
  plugins: [
    // 抽出css文件 https://www.npmjs.com/package/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash:6].css',
      // allChunks: true,
    }),
    // 压缩抽出的css文件
    new OptimizeCSSPlugin({safe: true}),
  ],
})
