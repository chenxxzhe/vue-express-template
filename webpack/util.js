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

// 根据环境生成css-loader
function getCssLoader() {
  const useList = [
    'style-loader',
    'css-loader',
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {resources: resolve('src/styles/variable.scss')},
    },
  ]
  let ret = useList
  if (process.env.NODE_ENV === 'production') {
    useList.shift()
    ret = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: useList,
    })
  }
  return {
    test: /\.s[ac]ss$/,
    include: resolve('src'),
    use: ret,
  }
}

// 生成多个html
function getHtmlPluginList(distPath = '') {
  const entries = getEntries()
  const list = Object.keys(entries).map(key => {
    const pre = distPath ? distPath + '/' : ''
    const option = {
      filename: `${pre}${key}.html`,
      template: resolve('src/index.html'),
      chunks: [key],
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
  getCssLoader,
}
