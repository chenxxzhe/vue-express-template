// 生产环境
console.log('Production')

// const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const wpBaseConfig = require('./webpack.base.conf')
const config = require('../config')
const { resolve, getHtmlPluginList } = require('./util')

module.exports = merge(wpBaseConfig, {
  mode: 'production',
  devtool: 'source-map',

  plugins: [
    // 抽出css文件 https://www.npmjs.com/package/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash:6].css',
      // allChunks: true,
    }),
    // 压缩抽出的css文件
    new OptimizeCSSPlugin({safe: true}),

    // 复制静态文件夹
    new CopyPlugin([
      {
        from: resolve('static'),
        to: 'static',
        toType: 'dir',
      },
    ]),

    // 生成页面 dist / prerender
    ...getHtmlPluginList(resolve('views'), config.prod.prerender),
    new HtmlWebpackHarddiskPlugin(),
  ],
  stats: 'errors-only',
})
