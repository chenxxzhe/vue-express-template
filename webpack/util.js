// 工具

const path = require('path')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const PrerenderPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderPlugin.PuppeteerRenderer

const config = require('../config')

// 从根目录开始定位
function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

let memoryEntries = null

// 找到所有入口
function getEntries() {
  if (memoryEntries) return memoryEntries
  const entries = {}
  const files = glob.sync('src/pages/**/index.js')
  const reg = /pages\/(.+)\/index.js$/
  files.forEach(path => {
    const matched = path.match(reg)
    const key = matched[1]
    entries[key] = resolve(path)
  })
  memoryEntries = entries
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
function getHtmlPluginList(distPath = '', prerender) {
  const entries = getEntries()

  let parentPath = ''
  if (prerender) {
    console.log('use pre-render')
    // 预渲染要先生成到public，这样插件才能不经express访问
    parentPath = resolve('public')
  }
  // 统一删掉末尾的 /
  parentPath = parentPath.replace(/[/]+$/, '')

  const list = Object.keys(entries).map(key => {
    const option = {
      // 开发时直接生成，生产时首先生成到public
      filename: `${parentPath ? parentPath + '/' : ''}${key}.html`,
      template: resolve('src/index.html'),
      chunks: [key],
    }
    console.log('generate html:', option.filename)
    return new HtmlPlugin(option)
  })
  console.log('\r\n')
  // 生成插件
  if (prerender) {
    return list.concat(getPrerenderPlugin())
  }
  return list
}

/**
 * 生成预渲染插件列表，一个html对应一个插件, 原理是用浏览器访问一遍网页，渲染后保存
 * 由于不通过 express 来访问，所以 htmlPlugin 要生成在 public
 * @return
 ** */
function getPrerenderPlugin() {
  const entries = getEntries()
  const ret = []

  Object.keys(entries).forEach(en => {
    ret.push(new PrerenderPlugin({
      staticDir: resolve('public'),
      indexPath: resolve(`public/${en}.html`),
      // 由于不能改名字，先输出到缓存文件夹，再copy改名到views
      // update: express 可以访问到 views/xxx/index.html 或者 views/xxx.html
      outputDir: resolve('views/' + en),
      routes: ['/'],
      minify: {
        minifyCSS: true,
        removeComments: true,
      },
      renderer: new Renderer({
        renderAfterTime: 5000,
        // renderAfterDocumentEvent: 'vue-mounted',
        // renderAfterElementExists: '#app',
        // headless: false,
      }),
      server: {
        // 超坑，这里proxy是 Object.keys(proxy).forEach(key => app.use(key, proxy[key]))
        // express app.use() 使用 path-to-regexp 来解析
        proxy: {
          // 只代理除 / 外的路由
          '/:foo': {
            target: 'http://localhost:' + config.prod.port || 3050,
          },
        },
      },
    }))
  })
  console.log('\r\n')

  return ret
}

module.exports = {
  resolve,
  getEntries,
  getHtmlPluginList,
  getSassLoader,
}
