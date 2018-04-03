// 工具

const path = require('path')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

// 从根目录开始定位
function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

// 找到所有入口
function getEntries() {
  const entries = {}
  const files = glob.sync('src/pages/**/index.js')
  const reg = /pages\/(.+)\/index.js$/
  files.forEach(path => {
    const matched = path.match(reg)
    const key = matched[1]
    entries[key] = resolve(path)
  })
  return entries
}

// 根据环境生成css-loader, 分为vue-loader用的与其他css文件用的两种
function getSassLoader() {
  const useList = [
    'vue-style-loader',
    'css-loader',
    'sass-loader',
    {
      // 全局插入公共变量
      loader: 'sass-resources-loader',
      options: {resources: resolve('src/styles/variable.scss')},
    },
  ]
  if (process.env.NODE_ENV === 'production') {
    useList.shift()
    return ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: useList,
    })
  }
  return useList
}

// 生成多个html
function getHtmlPluginList(distPath = '', writeToDisk) {
  const entries = getEntries()
  const list = Object.keys(entries).map(key => {
    const pre = distPath ? distPath + '/' : ''
    const option = {
      filename: `${pre}${key}.html`,
      template: resolve('src/index.html'),
      chunks: [key],
      alwaysWriteToDisk: !!writeToDisk,
    }
    console.log('generate html:', option.filename)
    return new HtmlPlugin(option)
  })
  console.log('\r\n')
  return list
}

module.exports = {
  resolve,
  getEntries,
  getHtmlPluginList,
  getSassLoader,
}
