// 基础配置
console.log('NODE_ENV', process.env.NODE_ENV)

// express 渲染引擎需要实际文件的存在
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const { resolve, getEntries, getSassLoader, getHtmlPluginList } = require('./util')

module.exports = {
  context: resolve('./'),
  entry: getEntries(),
  output: {
    path: resolve('public'),
    filename: 'js/[name]-bundle-[hash:6].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js', // 使用这个才能编译template
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src')],
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', 'css-loader'],
            sass: getSassLoader(),
            scss: getSassLoader(),
          },
          // html里的哪种属性会使用require 例如 <img src=""> 会使用require加载
          // 默认 img.src
          // transformToRequire: { img: 'src' }
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.s[ac]ss$/,
        include: [resolve('src/styles')],
        use: getSassLoader(),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name]-[hash:6].[ext]', // 这里要用相对路径，在output.path 下
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:6].[ext]',
        },
      },
    ],
  },
  plugins: [
    // write to dist
    ...getHtmlPluginList(resolve('views'), true),
    new HtmlWebpackHarddiskPlugin(),
  ],
}
