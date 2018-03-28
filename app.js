var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

console.log('NODE_ENV: ', process.env.NODE_ENV)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// 整合webpack
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack/webpack.dev.conf')
  const config = require('./config')

  const compiler = webpack(webpackConfig)
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // noInfo: true,
    stats: {
      colors: true,
    },
  })

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
  })
  // // force page reload when html-webpack-plugin template changes
  // compiler.plugin('compilation', function (compilation) {
  //   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
  //     hotMiddleware.publish({ action: 'reload' })
  //     cb()
  //   })
  // })

  app.use(devMiddleware)
  app.use(hotMiddleware)

  if (config.dev.proxy) {
    const proxy = require('http-proxy-middleware')
    app.use(proxy(config.dev.proxy))
  }
  // proxy api requests
  // Object.keys(proxyTable).forEach(function (context) {
  //   var options = proxyTable[context]
  //   if (typeof options === 'string') {
  //     options = { target: options }
  //   }
  //   app.use(proxyMiddleware(options.filter || context, options))
  // })

  // 如果有其他静态资源，例如tinymce之类的，提供静态资源服务
  const assetsPath = path.join(config.dev.publicPath, config.dev.staticPath)
  console.log('static assets path: ', assetsPath)
  app.use(assetsPath || '/', express.static('./static')) // 不经打包的资源的地址
}

// 路由
app.use('/', require('./routes'))
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
